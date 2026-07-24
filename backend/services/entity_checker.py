"""
ClarityGuard — Real-World Entity Check Service (Tavily API)

Extracts company names, phone numbers, URLs, and sender IDs from text,
then queries Tavily API to verify public records, scam reports, or registration.

SAFETY RULE (§3): Frame search findings as SIGNALS, never absolute verdicts.
"No public record found" is reported as "Caution — no public record found",
never as "Confirmed scam".
"""

import re
import json
import httpx
from typing import List
from config import settings
from models.schemas import EntityCheckResult


PHONE_REGEX = re.compile(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b')
URL_REGEX = re.compile(r'\b(?:https?://)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:/[^\s]*)?\b')
EMAIL_REGEX = re.compile(r'\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b')


async def extract_entities(text: str) -> List[dict]:
    """
    Extract entity candidates from input text.
    Combines regex (urls, emails, phone numbers) and Groq LLM for company names.
    """
    entities = []

    # 1. Regex extraction
    urls = URL_REGEX.findall(text)
    for url in set(urls):
        if not any(ignored in url for ignored in ["bit.ly", "t.co", "tinyurl"]):
            entities.append({"name": url, "type": "website"})
        else:
            entities.append({"name": url, "type": "shortened_link"})

    emails = EMAIL_REGEX.findall(text)
    for email in set(emails):
        entities.append({"name": email, "type": "email"})

    phones = PHONE_REGEX.findall(text)
    for phone in set(phones):
        entities.append({"name": phone, "type": "phone"})

    # 2. LLM extraction for company / organization names
    if settings.GROQ_API_KEY:
        try:
            prompt = (
                "Extract any company names, bank names, brand names, or organization names mentioned in this text.\n"
                "Return ONLY a JSON array of strings containing exact names found, e.g. [\"Company Name\"].\n"
                "If no company names are found, return []. Do not include generic words like 'the company' or 'party'."
            )
            payload = {
                "model": settings.GROQ_MODEL,
                "messages": [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": text},
                ],
                "temperature": 0.0,
                "response_format": {"type": "json_object"},
            }
            headers = {
                "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                "Content-Type": "application/json",
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(settings.GROQ_API_URL, json=payload, headers=headers)
                if resp.status_code == 200:
                    content = resp.json()["choices"][0]["message"]["content"]
                    data = json.loads(content)
                    # Extract list from json object (e.g. {"companies": [...]} or raw array)
                    names = data if isinstance(data, list) else list(data.values())[0] if isinstance(data, dict) and data else []
                    for name in names:
                        if isinstance(name, str) and len(name) > 3 and name.lower() not in ["the company", "party"]:
                            entities.append({"name": name.strip(), "type": "company"})
        except Exception as e:
            print(f"[ENTITY CHECK] LLM extraction error: {e}")

    # Deduplicate by entity name
    seen = set()
    unique_entities = []
    for e in entities:
        if e["name"].lower() not in seen:
            seen.add(e["name"].lower())
            unique_entities.append(e)

    return unique_entities[:3]  # Limit to top 3 entities to keep Tavily quota fast and lean


async def check_entity_reputation(entity_name: str, entity_type: str) -> EntityCheckResult:
    """
    Search Tavily API for public records or scam signals related to entity.
    """
    if not settings.TAVILY_API_KEY:
        return EntityCheckResult(
            entity_name=entity_name,
            entity_type=entity_type,
            found=False,
            summary="Entity check skipped — Tavily API key not configured.",
        )

    query = f'"{entity_name}" scam OR reviews OR registration OR legitimate'

    payload = {
        "api_key": settings.TAVILY_API_KEY,
        "query": query,
        "search_depth": "basic",
        "max_results": 4,
        "include_answer": True,
    }

    try:
        async with httpx.AsyncClient(timeout=12.0) as client:
            resp = await client.post(settings.TAVILY_API_URL, json=payload)
            if resp.status_code != 200:
                return EntityCheckResult(
                    entity_name=entity_name,
                    entity_type=entity_type,
                    found=False,
                    summary=f"Search service returned status {resp.status_code}.",
                )

            data = resp.json()
            results = data.get("results", [])
            answer = data.get("answer")

            if not results and not answer:
                return EntityCheckResult(
                    entity_name=entity_name,
                    entity_type=entity_type,
                    found=False,
                    summary=f"Caution — no public search records or registration found for '{entity_name}'.",
                )

            # Analyze search snippets for risk keywords
            snippets_text = " ".join([r.get("content", "") for r in results]).lower()
            has_scam_reports = any(w in snippets_text for w in ["scam", "fraud", "complaint", "phishing", "fake", "warning"])

            if has_scam_reports:
                summary = (
                    f"⚠️ Scam reports or complaints found online for '{entity_name}'. "
                    f"Verified {len(results)} search sources."
                )
                found = True
            elif answer:
                summary = f"Public record found: {answer[:180]}..."
                found = True
            else:
                top_domain = results[0].get("url", "").split("/")[2] if results and "url" in results[0] else "web"
                summary = f"Public presence detected on {top_domain} ({len(results)} relevant search results found)."
                found = True

            return EntityCheckResult(
                entity_name=entity_name,
                entity_type=entity_type,
                found=found,
                summary=summary,
            )

    except Exception as e:
        print(f"[TAVILY SEARCH] Error searching entity '{entity_name}': {e}")
        return EntityCheckResult(
            entity_name=entity_name,
            entity_type=entity_type,
            found=False,
            summary=f"Unable to complete entity check for '{entity_name}'.",
        )


async def run_entity_checks(text: str) -> List[EntityCheckResult]:
    """
    Full entity check pipeline: extract entities -> query Tavily -> return findings.
    """
    entities = await extract_entities(text)
    if not entities:
        return []

    results = []
    for ent in entities:
        check = await check_entity_reputation(ent["name"], ent["type"])
        results.append(check)

    return results
