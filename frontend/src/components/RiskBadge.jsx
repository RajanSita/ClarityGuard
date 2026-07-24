import { SEVERITY_COLORS } from '../utils/constants';

export default function RiskBadge({ severity, size = 'default' }) {
  const config = SEVERITY_COLORS[severity] || SEVERITY_COLORS.yellow;

  const padding = size === 'large' ? '6px 16px' : '4px 12px';
  const fontSize = size === 'large' ? '0.85rem' : '0.75rem';

  return (
    <span
      className="risk-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding,
        borderRadius: '999px',
        fontSize,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: config.color,
        }}
      />
      {config.label}
    </span>
  );
}
