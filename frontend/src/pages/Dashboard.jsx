import { Construction } from 'lucide-react';

export default function Dashboard() {
  return (
    <div
      className="bg-grid"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--accent-primary-dim)',
          marginBottom: '24px',
        }}
      >
        <Construction size={48} color="var(--accent-primary)" />
      </div>
      <h1
        className="font-display"
        style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '12px',
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '400px',
          lineHeight: 1.6,
        }}
      >
        Your personal scan history, blind-spot patterns, and trend analysis will
        appear here once authentication is set up.
      </p>
    </div>
  );
}
