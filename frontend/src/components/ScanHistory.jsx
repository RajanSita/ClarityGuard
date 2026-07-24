import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, FileText, MessageSquareWarning, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import RiskBadge from './RiskBadge';
import MechanismIcon from './MechanismIcon';
import { MECHANISM_LABELS } from '../utils/constants';

export default function ScanHistory({ scans }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!scans || scans.length === 0) {
    return (
      <div
        className="glass-card"
        style={{
          padding: '40px 24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
        }}
      >
        <History size={36} color="var(--accent-primary)" style={{ marginBottom: '12px' }} />
        <h4 className="font-display" style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
          No past scans found
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Your scan history will be saved here automatically when you analyze text while logged in.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <h3
        className="font-display"
        style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <History size={18} color="var(--accent-primary)" />
        Recent Scan History
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scans.map((scan, i) => {
          const isExpanded = expandedId === scan.scanId;
          const isContract = scan.scanType === 'contract';

          return (
            <motion.div
              key={scan.scanId || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card"
              style={{ padding: '18px 20px' }}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : scan.scanId)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      background: isContract ? 'var(--accent-primary-dim)' : 'var(--accent-secondary-dim)',
                      color: isContract ? 'var(--accent-primary)' : 'var(--accent-secondary)',
                    }}
                  >
                    {isContract ? <FileText size={18} /> : <MessageSquareWarning size={18} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {isContract ? 'Contract / Lease Scan' : 'Suspicious Message Scan'}
                      </span>
                      <RiskBadge severity={scan.overallRisk} />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginTop: '2px',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {new Date(scan.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span>• {scan.flagsCount} flag{scan.flagsCount !== 1 ? 's' : ''} found</span>
                    </div>
                  </div>
                </div>

                <div style={{ color: 'var(--text-muted)' }}>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && scan.flags && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <h5 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      FLAGGED MECHANISMS IN THIS SCAN:
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {scan.flags.map((flag, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '10px 14px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.85rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <MechanismIcon mechanism={flag.mechanism_name} size={14} />
                            <strong style={{ color: 'var(--text-primary)' }}>
                              {MECHANISM_LABELS[flag.mechanism_name] || flag.mechanism_name}
                            </strong>
                          </div>
                          {flag.quoted_snippet && (
                            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.82rem' }}>
                              "{flag.quoted_snippet}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
