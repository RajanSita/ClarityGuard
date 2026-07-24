import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import RiskBadge from './RiskBadge';
import MechanismIcon from './MechanismIcon';
import { MECHANISM_LABELS, SEVERITY_COLORS } from '../utils/constants';

export default function ResultCard({ flag, index }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const label = MECHANISM_LABELS[flag.mechanism_name] || flag.mechanism_name;
  const severityConfig = SEVERITY_COLORS[flag.severity] || SEVERITY_COLORS.yellow;

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card"
      style={{
        padding: '24px',
        borderLeft: `3px solid ${severityConfig.color}`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <div
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: severityConfig.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MechanismIcon
              mechanism={flag.mechanism_name}
              size={20}
              color={severityConfig.color}
            />
          </div>
          <div>
            <h3
              className="font-display"
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '2px',
              }}
            >
              {label}
            </h3>
            <RiskBadge severity={flag.severity} />
          </div>
        </div>
      </div>

      {/* Quoted Text */}
      <div
        style={{
          padding: '12px 16px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 'var(--radius-sm)',
          borderLeft: `2px solid ${severityConfig.color}`,
          marginBottom: '12px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}
      >
        "{flag.quoted_text}"
      </div>

      {/* Plain Explanation */}
      <p
        style={{
          fontSize: '0.92rem',
          color: 'var(--text-primary)',
          lineHeight: 1.7,
          marginBottom: expanded ? '16px' : '0',
        }}
      >
        {flag.plain_explanation}
      </p>

      {/* Expandable Section: Fair Baseline + Action Draft */}
      {(flag.fair_baseline || flag.action_draft) && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              padding: '6px 0',
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? 'Show less' : 'See fair version & suggested action'}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {/* Fair Baseline */}
              {flag.fair_baseline && (
                <div style={{ marginTop: '12px' }}>
                  <h4
                    className="font-display"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--risk-green)',
                      marginBottom: '8px',
                    }}
                  >
                    ✦ Fair Version
                  </h4>
                  <div
                    style={{
                      padding: '12px 16px',
                      background: 'var(--risk-green-bg)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '2px solid var(--risk-green)',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {flag.fair_baseline}
                  </div>
                </div>
              )}

              {/* Action Draft */}
              {flag.action_draft && (
                <div style={{ marginTop: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <h4
                      className="font-display"
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--accent-primary)',
                      }}
                    >
                      ✦ Suggested Action
                    </h4>
                    <button
                      onClick={() => handleCopy(flag.action_draft)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'transparent',
                        color: copied ? 'var(--risk-green)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div
                    style={{
                      padding: '12px 16px',
                      background: 'var(--accent-primary-dim)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '2px solid var(--accent-primary)',
                      fontSize: '0.88rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {flag.action_draft}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}
