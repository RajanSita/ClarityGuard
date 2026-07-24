import { useState } from 'react';
import { FileText, MessageSquareWarning, Search, Loader2 } from 'lucide-react';
import { SCAN_TYPES } from '../utils/constants';

export default function ScanInput({ onScan, isLoading }) {
  const [text, setText] = useState('');
  const [scanType, setScanType] = useState('contract');

  const maxLength = 8000;
  const charCount = text.length;
  const canSubmit = text.trim().length >= 10 && !isLoading;

  const handleSubmit = () => {
    if (canSubmit) {
      onScan(text, scanType);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey && canSubmit) {
      handleSubmit();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      {/* Type Toggle */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {Object.entries(SCAN_TYPES).map(([type, config]) => {
          const isSelected = scanType === type;
          const Icon = type === 'contract' ? FileText : MessageSquareWarning;
          return (
            <button
              key={type}
              onClick={() => setScanType(type)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                border: isSelected
                  ? '1px solid var(--accent-primary)'
                  : '1px solid var(--border-subtle)',
                background: isSelected
                  ? 'var(--accent-primary-dim)'
                  : 'var(--bg-secondary)',
                color: isSelected
                  ? 'var(--accent-primary)'
                  : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.25s ease',
              }}
            >
              <Icon size={18} />
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Text Input Area */}
      <div
        className={`scan-line-container ${isLoading ? 'scanning' : ''}`}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-secondary)',
          transition: 'border-color 0.3s ease',
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxLength))}
          onKeyDown={handleKeyDown}
          placeholder={SCAN_TYPES[scanType].placeholder}
          disabled={isLoading}
          style={{
            width: '100%',
            minHeight: '240px',
            padding: '20px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            resize: 'vertical',
            opacity: isLoading ? 0.5 : 1,
          }}
        />

        {/* Character Count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}
          >
            Ctrl+Enter to scan
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              color:
                charCount > maxLength * 0.9
                  ? 'var(--risk-yellow)'
                  : 'var(--text-muted)',
            }}
          >
            {charCount.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="btn-primary"
        style={{
          width: '100%',
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '14px 28px',
          fontSize: '1rem',
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            Analyzing...
          </>
        ) : (
          <>
            <Search size={20} />
            Scan for Manipulation
          </>
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
