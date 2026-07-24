/**
 * ClarityGuard — Constants
 *
 * Taxonomy labels, colors, and icon mappings used throughout the UI.
 * Must stay in sync with backend taxonomy.py.
 */

// Mechanism human-readable labels
export const MECHANISM_LABELS = {
  // Contract mechanisms
  unilateral_termination: 'Unilateral Termination',
  liability_waiver: 'Liability Waiver',
  indemnity_shift: 'Indemnity Shift',
  auto_renewal_trap: 'Auto-Renewal Trap',
  non_compete_overreach: 'Non-Compete Overreach',
  ip_assignment_overreach: 'IP Assignment Overreach',
  arbitration_no_sue: 'Arbitration / No-Sue Clause',
  payment_timing_risk: 'Payment Timing Risk',
  scope_creep: 'Scope Creep',
  hidden_fee: 'Hidden Fee Clause',
  // Scam mechanisms
  false_urgency: 'False Urgency',
  false_authority: 'False Authority',
  too_good_to_be_true: 'Too Good to Be True',
  info_phishing: 'Information Phishing',
  payment_redirect: 'Payment Redirect',
  link_obfuscation: 'Link Obfuscation',
  emotional_fear: 'Emotional / Fear Manipulation',
  reciprocity_bait: 'Reciprocity Bait',
};

// Lucide icon names for each mechanism
export const MECHANISM_ICONS = {
  unilateral_termination: 'Scissors',
  liability_waiver: 'ShieldOff',
  indemnity_shift: 'ArrowRightLeft',
  auto_renewal_trap: 'RefreshCw',
  non_compete_overreach: 'Lock',
  ip_assignment_overreach: 'FileLock',
  arbitration_no_sue: 'Gavel',
  payment_timing_risk: 'Clock',
  scope_creep: 'Maximize2',
  hidden_fee: 'EyeOff',
  false_urgency: 'AlarmClock',
  false_authority: 'UserX',
  too_good_to_be_true: 'Gift',
  info_phishing: 'KeyRound',
  payment_redirect: 'CreditCard',
  link_obfuscation: 'Link2',
  emotional_fear: 'AlertTriangle',
  reciprocity_bait: 'HandCoins',
};

// Risk severity colors (matching CSS variables)
export const SEVERITY_COLORS = {
  green: {
    label: 'Low Risk',
    color: '#22C55E',
    bg: 'rgba(34, 197, 94, 0.1)',
    border: 'rgba(34, 197, 94, 0.2)',
  },
  yellow: {
    label: 'Medium Risk',
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  red: {
    label: 'High Risk',
    color: '#EF4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    border: 'rgba(239, 68, 68, 0.2)',
  },
};

// Scan types
export const SCAN_TYPES = {
  contract: {
    label: 'Contract / Lease',
    placeholder:
      'Paste your contract, lease, freelance agreement, or terms of service here...\n\nExample: "The Company may terminate this agreement at any time without notice or cause. You agree to indemnify the Company from all claims..."',
    icon: 'FileText',
  },
  message: {
    label: 'SMS / Email / Message',
    placeholder:
      'Paste the suspicious message here...\n\nExample: "URGENT: Your bank account has been compromised! Click here immediately to verify your identity: bit.ly/x7k9..."',
    icon: 'MessageSquareWarning',
  },
};
