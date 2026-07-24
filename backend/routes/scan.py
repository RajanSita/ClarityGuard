"""
ClarityGuard — Scan Route

Core analysis endpoint. Accepts text, runs it through the LLM,
executes real-world entity checks via Tavily, populates fair-baseline
clauses, validates output against Pydantic schemas, and returns structured flags.
"""

from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from models.schemas import ScanRequest, ScanResponse, Flag, Severity, ScanType
from models.taxonomy import ALL_MECHANISMS
from services.llm_client import analyze_text
from services.entity_checker import run_entity_checks
from services.fair_baseline import get_fair_baseline

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/api/scan", response_model=ScanResponse)
@limiter.limit("10/hour")
async def scan_text(request: Request, scan_request: ScanRequest):
    """
    Analyze text for manipulation mechanisms and real-world entity checks.

    - Validates input length (enforced by Pydantic, max 8000 chars)
    - Sends to Groq LLM for analysis
    - Runs Tavily search entity verification
    - Validates LLM output against fixed taxonomy
    - Attaches fair baseline comparator text for contract flags
    - Returns structured response
    """

    # Call LLM and Tavily entity checks concurrently/sequentially
    raw_result = await analyze_text(
        text=scan_request.text,
        scan_type=scan_request.type.value,
    )

    entity_checks = await run_entity_checks(scan_request.text)

    # Check for fallback response
    if raw_result.get("_fallback"):
        return ScanResponse(
            overall_risk=Severity.MEDIUM,
            flags=[],
            entity_checks=entity_checks,
            scan_type=scan_request.type,
            disclaimer=(
                "ClarityGuard was unable to fully analyze this text. "
                "Please try again, or proceed with caution. "
                "This is not legal or financial advice."
            ),
        )

    # Validate and build flags from LLM output
    validated_flags = []
    for raw_flag in raw_result.get("flags", []):
        try:
            mechanism = raw_flag.get("mechanism_name", "")
            if mechanism not in ALL_MECHANISMS:
                continue  # Skip invalid mechanisms silently

            # Match static pre-written fair baseline for contracts
            fair_baseline_text = raw_flag.get("fair_baseline")
            if not fair_baseline_text and scan_request.type == ScanType.CONTRACT:
                fair_baseline_text = get_fair_baseline(mechanism)

            flag = Flag(
                quoted_text=str(raw_flag.get("quoted_text", ""))[:500],
                category=scan_request.type,
                severity=Severity(raw_flag.get("severity", "yellow")),
                mechanism_name=mechanism,
                plain_explanation=str(raw_flag.get("plain_explanation", "")),
                fair_baseline=fair_baseline_text,
                action_draft=raw_flag.get("action_draft"),
            )
            validated_flags.append(flag)
        except (ValueError, KeyError) as e:
            continue

    # Determine overall risk
    overall_risk_str = raw_result.get("overall_risk", "green")
    try:
        overall_risk = Severity(overall_risk_str)
    except ValueError:
        if any(f.severity == Severity.HIGH for f in validated_flags):
            overall_risk = Severity.HIGH
        elif any(f.severity == Severity.MEDIUM for f in validated_flags):
            overall_risk = Severity.MEDIUM
        else:
            overall_risk = Severity.LOW

    # If entity search found scam reports, elevate overall risk to RED
    if any(ec.found and "scam" in ec.summary.lower() for ec in entity_checks):
        overall_risk = Severity.HIGH

    return ScanResponse(
        overall_risk=overall_risk,
        flags=validated_flags,
        entity_checks=entity_checks,
        scan_type=scan_request.type,
    )
