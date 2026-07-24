import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Shield, Plus, LogIn, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserScanHistory, getUserBlindSpots } from '../firebase';
import BlindSpotChart from '../components/BlindSpotChart';
import ScanHistory from '../components/ScanHistory';
import AuthModal from '../components/AuthModal';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [scans, setScans] = useState([]);
  const [blindSpots, setBlindSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (currentUser) {
        setLoading(true);
        const [historyData, blindSpotsData] = await Promise.all([
          getUserScanHistory(currentUser.uid),
          getUserBlindSpots(currentUser.uid),
        ]);
        setScans(historyData);
        setBlindSpots(blindSpotsData);
        setLoading(false);
      } else {
        setScans([]);
        setBlindSpots([]);
        setLoading(false);
      }
    }
    loadData();
  }, [currentUser]);

  if (!currentUser) {
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ maxWidth: '440px', padding: '40px 32px' }}
        >
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--accent-primary-dim)',
              display: 'inline-flex',
              marginBottom: '20px',
            }}
          >
            <LayoutDashboard size={40} color="var(--accent-primary)" />
          </div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>
            Personal Security Dashboard
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            Sign in to track your past scans, discover which manipulation tricks caught you, and build your personal blind-spot memory profile over time.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="btn-primary"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
            }}
          >
            <LogIn size={18} />
            Sign In to Unlock Dashboard
          </button>
        </motion.div>

        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  const totalFlags = scans.reduce((acc, scan) => acc + (scan.flagsCount || 0), 0);

  return (
    <div
      className="bg-grid"
      style={{
        flex: 1,
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        padding: '36px 24px 80px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '4px' }}>
            Security Dashboard
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Welcome back, {currentUser.displayName || currentUser.email.split('@')[0]}
          </p>
        </div>

        <Link
          to="/"
          className="btn-primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            padding: '10px 20px',
            fontSize: '0.9rem',
          }}
        >
          <Plus size={18} />
          New Scan
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Scans Performed
          </span>
          <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, marginTop: '4px' }}>
            {scans.length}
          </h3>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Mechanisms Flagged
          </span>
          <h3 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, marginTop: '4px', color: 'var(--risk-yellow)' }}>
            {totalFlags}
          </h3>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Top Blind Spot Category
          </span>
          <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '8px', color: 'var(--accent-primary)' }}>
            {blindSpots.length > 0 ? blindSpots[0].mechanismName.replace('_', ' ') : 'None yet'}
          </h3>
        </div>
      </div>

      {/* Blind-spot memory section */}
      <BlindSpotChart blindSpots={blindSpots} />

      {/* Scan History section */}
      <ScanHistory scans={scans} />
    </div>
  );
}
