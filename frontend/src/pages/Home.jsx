import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX, Sparkles, LogIn } from 'lucide-react';
import ScanInput from '../components/ScanInput';
import ResultCard from '../components/ResultCard';
import RiskBadge from '../components/RiskBadge';
import Disclaimer from '../components/Disclaimer';
import EntityCheck from '../components/EntityCheck';
import AuthModal from '../components/AuthModal';
import { scanText } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { saveScanToHistory } from '../firebase';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { currentUser } = useAuth();

  const handleScan = async (text, type) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await scanText(text, type);
      setResult(response);

      // Save to Firestore if user is authenticated
      if (currentUser && currentUser.uid) {
        await saveScanToHistory(currentUser.uid, response, type);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'green': return <ShieldCheck size={28} color="var(--risk-green)" />;
      case 'yellow': return <ShieldAlert size={28} color="var(--risk-yellow)" />;
      case 'red': return <ShieldX size={28} color="var(--risk-red)" />;
      default: return <ShieldAlert size={28} />;
    }
  };

  return (
    <div
      className="bg-grid"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px 80px',
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          maxWidth: '640px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'var(--accent-primary-dim)',
            border: '1px solid rgba(62, 207, 142, 0.2)',
            color: 'var(--accent-primary)',
            fontSize: '0.82rem',
            fontWeight: 500,
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} />
          AI-powered manipulation detection
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          See through the{' '}
          <span className="text-gradient">fine print</span>
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
          }}
        >
          Paste any contract, lease, or suspicious message. We'll name the exact
          manipulation trick, verify real-world entities, and tell you what to do
          next.
        </p>

        {/* Priority Login Callout if Logged Out */}
        {!currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setAuthModalOpen(true)}
            style={{
              marginTop: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-primary-dim)',
              border: '1px solid var(--border-accent)',
              color: 'var(--accent-primary)',
              fontSize: '0.88rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <LogIn size={16} />
            <span>Sign in required to run legal & fraud scans</span>
          </motion.div>
        )}
      </motion.div>

      {/* Scan Input */}
      <ScanInput
        onScan={handleScan}
        isLoading={isLoading}
        onRequireAuth={() => setAuthModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: '24px',
              padding: '16px 20px',
              background: 'var(--risk-red-bg)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--risk-red)',
              fontSize: '0.9rem',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: '40px',
              maxWidth: '800px',
              width: '100%',
            }}
          >
            {/* Overall Risk Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                marginBottom: '24px',
              }}
            >
              {getRiskIcon(result.overall_risk)}
              <div style={{ flex: 1 }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}
                >
                  Analysis Complete
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {result.flags.length === 0
                    ? 'No manipulation mechanisms detected.'
                    : `Found ${result.flags.length} potential issue${result.flags.length > 1 ? 's' : ''}.`}
                </p>
              </div>
              <RiskBadge severity={result.overall_risk} size="large" />
            </motion.div>

            {/* Real-World Entity Check */}
            <EntityCheck entityChecks={result.entity_checks} />

            {/* Flag Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {result.flags.map((flag, i) => (
                <ResultCard key={i} flag={flag} index={i} />
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{ marginTop: '24px' }}>
              <Disclaimer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
