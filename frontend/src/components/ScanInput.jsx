import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquareWarning, Search, Loader2 } from 'lucide-react';

export default function ScanInput({ onScan, isLoading }) {
  const [text, setText] = useState('');
  const [scanType, setScanType] = useState('contract');

  const maxChars = 8000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onScan(text.trim(), scanType);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Mode Selector Toggle */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => setScanType('contract')}
          style={{
            flex: 1,
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: scanType === 'contract' ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
            background: scanType === 'contract' ? 'var(--accent-primary-dim)' : 'var(--bg-card)',
            color: scanType === 'contract' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <FileText size={18} />
          Contract / Lease
        </button>

        <button
          type="button"
          onClick={() => setScanType('message')}
          style={{
            flex: 1,
            minWidth: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: scanType === 'message' ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
            background: scanType === 'message' ? 'var(--accent-secondary-dim)' : 'var(--bg-card)',
            color: scanType === 'message' ? 'var(--accent-secondary)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <MessageSquareWarning size={18} />
          SMS / Email / Message
        </button>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit}>
        <div
          className={`glass-card scan-line-container ${isLoading ? 'scanning' : ''}`}
          style={{
            padding: '20px',
            position: 'relative',
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxChars))}
            onKeyDown={handleKeyDown}
            placeholder={
              scanType === 'contract'
                ? 'Paste your contract, lease, freelance agreement, or terms of service here...\n\nExample: "The Company may terminate this agreement at any time without notice or cause. You agree to indemnify the Company from all claims..."'
                : 'Paste the suspicious SMS, WhatsApp message, email, or offer here...\n\nExample: "URGENT: Your account has been suspended. Click here to verify your identity within 10 minutes or your funds will be seized..."'
            }
            disabled={isLoading}
            style={{
              width: '100%',
              height: '180px',
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              resize: 'vertical',
            }}
          />

          {/* Controls Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <span>Ctrl+Enter to scan</span>
            <span
              style={{
                color: text.length > maxChars * 0.9 ? 'var(--risk-red)' : 'var(--text-muted)',
              }}
            >
              {text.length.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="btn-primary"
          style={{
            width: '100%',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px',
            fontSize: '1rem',
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Scanning for Manipulation...
            </>
          ) : (
            <>
              <Search size={20} />
              Scan
            </>
          )}
        </button>
      </form>
    </div>
  );
}
