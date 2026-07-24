import { motion } from 'framer-motion';
import { Globe, AlertTriangle, CheckCircle2, Search } from 'lucide-react';

export default function EntityCheck({ entityChecks }) {
  if (!entityChecks || entityChecks.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card"
      style={{
        padding: '20px 24px',
        marginBottom: '24px',
        borderLeft: '3px solid var(--accent-secondary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            padding: '6px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--accent-secondary-dim)',
            color: 'var(--accent-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Globe size={18} />
        </div>
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Real-World Entity Check (Tavily Search)
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Live web search verification of named companies, links, or contacts
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {entityChecks.map((item, index) => {
          const isWarning = item.summary.toLowerCase().includes('scam') || item.summary.toLowerCase().includes('caution');
          const isVerified = item.found && !isWarning;

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: isWarning
                  ? 'var(--risk-yellow-bg)'
                  : isVerified
                  ? 'var(--accent-primary-dim)'
                  : 'rgba(0, 0, 0, 0.2)',
                border: `1px solid ${
                  isWarning
                    ? 'rgba(245, 158, 11, 0.2)'
                    : isVerified
                    ? 'rgba(62, 207, 142, 0.2)'
                    : 'var(--border-subtle)'
                }`,
                fontSize: '0.88rem',
                lineHeight: 1.6,
              }}
            >
              {isWarning ? (
                <AlertTriangle size={16} color="var(--risk-yellow)" style={{ marginTop: '2px', flexShrink: 0 }} />
              ) : isVerified ? (
                <CheckCircle2 size={16} color="var(--accent-primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
              ) : (
                <Search size={16} color="var(--text-muted)" style={{ marginTop: '2px', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <strong style={{ color: 'var(--text-primary)' }}>{item.entity_name}</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{item.summary}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
