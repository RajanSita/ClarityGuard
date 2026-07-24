import {
  Scissors, ShieldOff, ArrowRightLeft, RefreshCw, Lock, FileLock2,
  Gavel, Clock, Maximize2, EyeOff, AlarmClock, UserX, Gift,
  KeyRound, CreditCard, Link2, AlertTriangle, HandCoins, HelpCircle,
} from 'lucide-react';

const ICON_MAP = {
  unilateral_termination: Scissors,
  liability_waiver: ShieldOff,
  indemnity_shift: ArrowRightLeft,
  auto_renewal_trap: RefreshCw,
  non_compete_overreach: Lock,
  ip_assignment_overreach: FileLock2,
  arbitration_no_sue: Gavel,
  payment_timing_risk: Clock,
  scope_creep: Maximize2,
  hidden_fee: EyeOff,
  false_urgency: AlarmClock,
  false_authority: UserX,
  too_good_to_be_true: Gift,
  info_phishing: KeyRound,
  payment_redirect: CreditCard,
  link_obfuscation: Link2,
  emotional_fear: AlertTriangle,
  reciprocity_bait: HandCoins,
};

export default function MechanismIcon({ mechanism, size = 18, color }) {
  const IconComponent = ICON_MAP[mechanism] || HelpCircle;

  return (
    <IconComponent
      size={size}
      color={color || 'var(--accent-primary)'}
      strokeWidth={2}
    />
  );
}
