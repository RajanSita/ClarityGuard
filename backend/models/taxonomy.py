"""
ClarityGuard — Fixed Manipulation Taxonomy

These are the ONLY categories the system will assign. Using a fixed taxonomy
(not free-text) ensures consistency across scans and enables the blind-spot
memory feature (§2.5) — you can't track patterns over time with random labels.
"""

from enum import Enum


class ContractMechanism(str, Enum):
    """Manipulation mechanisms found in contracts and legal documents."""

    UNILATERAL_TERMINATION = "unilateral_termination"
    LIABILITY_WAIVER = "liability_waiver"
    INDEMNITY_SHIFT = "indemnity_shift"
    AUTO_RENEWAL_TRAP = "auto_renewal_trap"
    NON_COMPETE_OVERREACH = "non_compete_overreach"
    IP_ASSIGNMENT_OVERREACH = "ip_assignment_overreach"
    ARBITRATION_NO_SUE = "arbitration_no_sue"
    PAYMENT_TIMING_RISK = "payment_timing_risk"
    SCOPE_CREEP = "scope_creep"
    HIDDEN_FEE = "hidden_fee"


class ScamMechanism(str, Enum):
    """Manipulation mechanisms found in scam/phishing messages."""

    FALSE_URGENCY = "false_urgency"
    FALSE_AUTHORITY = "false_authority"
    TOO_GOOD_TO_BE_TRUE = "too_good_to_be_true"
    INFO_PHISHING = "info_phishing"
    PAYMENT_REDIRECT = "payment_redirect"
    LINK_OBFUSCATION = "link_obfuscation"
    EMOTIONAL_FEAR = "emotional_fear"
    RECIPROCITY_BAIT = "reciprocity_bait"


# Human-readable labels for UI display
MECHANISM_LABELS = {
    # Contract mechanisms
    "unilateral_termination": "Unilateral Termination",
    "liability_waiver": "Liability Waiver",
    "indemnity_shift": "Indemnity Shift",
    "auto_renewal_trap": "Auto-Renewal Trap",
    "non_compete_overreach": "Non-Compete Overreach",
    "ip_assignment_overreach": "IP Assignment Overreach",
    "arbitration_no_sue": "Arbitration / No-Sue Clause",
    "payment_timing_risk": "Payment Timing Risk",
    "scope_creep": "Scope Creep",
    "hidden_fee": "Hidden Fee Clause",
    # Scam mechanisms
    "false_urgency": "False Urgency",
    "false_authority": "False Authority (Impersonation)",
    "too_good_to_be_true": "Too Good to Be True",
    "info_phishing": "Information Phishing",
    "payment_redirect": "Payment Redirect",
    "link_obfuscation": "Link Obfuscation",
    "emotional_fear": "Emotional / Fear Manipulation",
    "reciprocity_bait": "Reciprocity Bait",
}

# Icon identifiers for frontend mapping
MECHANISM_ICONS = {
    "unilateral_termination": "scissors",
    "liability_waiver": "shield-off",
    "indemnity_shift": "arrow-right-left",
    "auto_renewal_trap": "refresh-cw",
    "non_compete_overreach": "lock",
    "ip_assignment_overreach": "file-lock",
    "arbitration_no_sue": "gavel",
    "payment_timing_risk": "clock",
    "scope_creep": "expand",
    "hidden_fee": "eye-off",
    "false_urgency": "alarm-clock",
    "false_authority": "user-x",
    "too_good_to_be_true": "gift",
    "info_phishing": "key",
    "payment_redirect": "credit-card",
    "link_obfuscation": "link-2",
    "emotional_fear": "alert-triangle",
    "reciprocity_bait": "hand-coins",
}

# All valid mechanism names (union of both enums)
ALL_MECHANISMS = {m.value for m in ContractMechanism} | {m.value for m in ScamMechanism}
CONTRACT_MECHANISMS = {m.value for m in ContractMechanism}
SCAM_MECHANISMS = {m.value for m in ScamMechanism}
