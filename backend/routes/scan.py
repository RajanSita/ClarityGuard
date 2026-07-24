"""
ClarityGuard — Scan Route

Core analysis endpoint. Accepts text, runs it through the LLM,
validates the output against our Pydantic schemas, and returns
structured manipulation flags.
"""

from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from models.schemas import ScanRequest, ScanResponse, Flag, Severity, ScanType
from models.taxonomy import ALL_MECHANISMS
from services.llm_client import analyze_text

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/api/scan", response_model=ScanResponse)
@limiter.limit("10/hour")
async def scan_text(request: Request, scan_request: ScanRequest):
    """
    Analyze text for manipulation mechanisms.

    - Validates input length (enforced by Pydantic, max 8000 chars)
    - Sends to Groq LLM for analysis
    - Validates LLM output against fixed taxonomy
    - Returns structured flags with severity and explanations
    """

    # Call the LLM
    raw_result = await analyze_text(
        text=scan_request.text,
        scan_type=scan_request.type.value,
    )

    # Check for fallback response
    if raw_result.get("_fallback"):
        return ScanResponse(
            overall_risk=Severity.MEDIUM,
            flags=[],
            entity_checks=[],
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
            # Only accept flags with valid taxonomy mechanisms
            mechanism = raw_flag.get("mechanism_name", "")
            if mechanism not in ALL_MECHANISMS:
                continue  # Skip invalid mechanisms silently

            flag = Flag(
                quoted_text=str(raw_flag.get("quoted_text", ""))[:500],  # Truncate long quotes
                category=scan_request.type,
                severity=Severity(raw_flag.get("severity", "yellow")),
                mechanism_name=mechanism,
                plain_explanation=str(raw_flag.get("plain_explanation", "")),
                fair_baseline=raw_flag.get("fair_baseline"),
                action_draft=raw_flag.get("action_draft"),
            )
            validated_flags.append(flag)
        except (ValueError, KeyError) as e:
            # Skip malformed flags — never crash on bad LLM output
            continue

    # Determine overall risk
    overall_risk_str = raw_result.get("overall_risk", "green")
    try:
        overall_risk = Severity(overall_risk_str)
    except ValueError:
        # Compute from flags if LLM gave invalid value
        if any(f.severity == Severity.HIGH for f in validated_flags):
            overall_risk = Severity.HIGH
        elif any(f.severity == Severity.MEDIUM for f in validated_flags):
            overall_risk = Severity.MEDIUM
        else:
            overall_risk = Severity.LOW

    return ScanResponse(
        overall_risk=overall_risk,
        flags=validated_flags,
        entity_checks=[],  # Entity check added in Phase 4
        scan_type=scan_request.type,
    )
