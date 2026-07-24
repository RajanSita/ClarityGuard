import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 20px',
        background: 'rgba(245, 158, 11, 0.06)',
        border: '1px solid rgba(245, 158, 11, 0.15)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.82rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
      }}
    >
      <AlertTriangle
        size={16}
        color="var(--risk-yellow)"
        style={{ flexShrink: 0 }}
      />
      <span>
        <strong style={{ color: 'var(--risk-yellow)' }}>Disclaimer:</strong>{' '}
        ClarityGuard is not a substitute for legal or financial advice. For
        binding agreements, consult a licensed professional.
      </span>
    </div>
  );
}
