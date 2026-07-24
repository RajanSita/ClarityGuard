"""
ClarityGuard — Pydantic Schemas

Strict schema enforcement is the "no loophole" layer (§3). If the LLM returns
anything outside this schema, the backend rejects it and retries or falls back
to a safe generic response.
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, field_validator

from models.taxonomy import ALL_MECHANISMS


# ─── Request Models ───────────────────────────────────────────────────────────

class ScanType(str, Enum):
    CONTRACT = "contract"
    MESSAGE = "message"


class ScanRequest(BaseModel):
    """Incoming scan request from the frontend."""
    text: str = Field(..., min_length=10, max_length=8000, description="Text to analyze")
    type: ScanType = Field(..., description="Type of text: 'contract' or 'message'")


# ─── Response Models ──────────────────────────────────────────────────────────

class Severity(str, Enum):
    LOW = "green"
    MEDIUM = "yellow"
    HIGH = "red"


class Flag(BaseModel):
    """A single flagged manipulation mechanism found in the text."""
    quoted_text: str = Field(..., description="Exact quoted excerpt from the input")
    category: ScanType = Field(..., description="Whether this is a contract or message flag")
    severity: Severity = Field(..., description="Risk severity: green, yellow, or red")
    mechanism_name: str = Field(..., description="Mechanism from the fixed taxonomy")
    plain_explanation: str = Field(..., description="Plain-English explanation of the trick")
    fair_baseline: Optional[str] = Field(None, description="Fair version of the clause (contracts only)")
    action_draft: Optional[str] = Field(None, description="Suggested action or pushback message")

    @field_validator("mechanism_name")
    @classmethod
    def validate_mechanism(cls, v: str) -> str:
        if v not in ALL_MECHANISMS:
            raise ValueError(
                f"Invalid mechanism '{v}'. Must be one of: {', '.join(sorted(ALL_MECHANISMS))}"
            )
        return v


class EntityCheckResult(BaseModel):
    """Result of a real-world entity verification search."""
    entity_name: str = Field(..., description="Name of the entity checked")
    entity_type: str = Field(default="unknown", description="Type: company, phone, website, etc.")
    found: bool = Field(..., description="Whether public records were found")
    summary: str = Field(..., description="Human-readable summary of findings")


class ScanResponse(BaseModel):
    """Complete scan result returned to the frontend."""
    overall_risk: Severity = Field(..., description="Overall risk assessment")
    flags: list[Flag] = Field(default_factory=list, description="List of flagged mechanisms")
    entity_checks: list[EntityCheckResult] = Field(
        default_factory=list, description="Entity verification results"
    )
    disclaimer: str = Field(
        default="ClarityGuard is not a substitute for legal or financial advice. "
                "For binding agreements, consult a licensed professional.",
        description="Legal disclaimer"
    )
    scan_type: ScanType = Field(..., description="Type of scan performed")


# ─── Database / History Models ────────────────────────────────────────────────

class ScanHistoryItem(BaseModel):
    """A past scan stored in user's history (no raw text — PII protection)."""
    scan_id: str
    scan_type: ScanType
    overall_risk: Severity
    flags_count: int
    mechanism_names: list[str]
    created_at: str  # ISO timestamp string


class BlindSpotEntry(BaseModel):
    """A single mechanism in the user's blind-spot profile."""
    mechanism_name: str
    count: int
    last_seen_at: str  # ISO timestamp string


class BlindSpotResponse(BaseModel):
    """User's blind-spot analysis."""
    blind_spots: list[BlindSpotEntry] = Field(default_factory=list)
    top_blind_spot: Optional[str] = None
    total_scans: int = 0
