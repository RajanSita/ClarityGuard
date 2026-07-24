"""
ClarityGuard — Fair Baseline Comparator Service

Loads static pre-written fair market clause baselines (§2.3).
Static reference data is used to ensure legal quality and prevent LLM hallucination (§3).
"""

import os
import json
from typing import Optional

FAIR_CLAUSES_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "fair_clauses.json")
_fair_clauses_cache = None


def load_fair_clauses() -> dict:
    """Load fair clause definitions from JSON file."""
    global _fair_clauses_cache
    if _fair_clauses_cache is not None:
        return _fair_clauses_cache

    try:
        if os.path.exists(FAIR_CLAUSES_FILE):
            with open(FAIR_CLAUSES_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                _fair_clauses_cache = data.get("clauses", {})
                return _fair_clauses_cache
    except Exception as e:
        print(f"[FAIR BASELINE] Error loading fair clauses: {e}")

    _fair_clauses_cache = {}
    return _fair_clauses_cache


def get_fair_baseline(mechanism_name: str) -> Optional[str]:
    """Retrieve the pre-written fair baseline version for a mechanism."""
    clauses = load_fair_clauses()
    item = clauses.get(mechanism_name)
    if item and isinstance(item, dict):
        return item.get("fair_version")
    return None
