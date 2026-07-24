import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, LogIn, LogOut, Menu, X, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logOut } = useAuth();

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'var(--text-primary)',
            }}
          >
            <img
              src="/logo.png"
              alt="ClarityGuard Logo"
              style={{
                height: '34px',
                width: 'auto',
                borderRadius: '8px',
                objectFit: 'contain',
              }}
            />
            <span
              className="font-display"
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Clarity<span style={{ color: 'var(--accent-primary)' }}>Guard</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            className="mobile-hide"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive('/') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: isActive('/') ? 'var(--accent-primary-dim)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={16} />
              About
            </Link>
            <Link
              to="/scan"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive('/scan') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: isActive('/scan') ? 'var(--accent-primary-dim)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <Shield size={16} />
              Scan Tool
            </Link>
            <Link
              to="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive('/dashboard') ? 'var(--accent-primary)' : 'var(--text-secondary)',
                background: isActive('/dashboard') ? 'var(--accent-primary-dim)' : 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>

            {/* Auth Buttons */}
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '999px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <User size={14} color="var(--accent-primary)" />
                  <span>{currentUser.displayName || currentUser.email.split('@')[0]}</span>
                </div>
                <button
                  onClick={logOut}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  fontSize: '0.88rem',
                  marginLeft: '10px',
                }}
              >
                <LogIn size={15} />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-medium)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <Link
              to="/"
              onClick={closeMobileMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                color: isActive('/') ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: isActive('/') ? 'var(--accent-primary-dim)' : 'transparent',
              }}
            >
              <Sparkles size={18} />
              About
            </Link>

            <Link
              to="/scan"
              onClick={closeMobileMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                color: isActive('/scan') ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: isActive('/scan') ? 'var(--accent-primary-dim)' : 'transparent',
              }}
            >
              <Shield size={18} />
              Scan Tool
            </Link>

            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                color: isActive('/dashboard') ? 'var(--accent-primary)' : 'var(--text-primary)',
                background: isActive('/dashboard') ? 'var(--accent-primary-dim)' : 'transparent',
              }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

            {currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Signed in as: <strong>{currentUser.displayName || currentUser.email}</strong>
                </div>
                <button
                  onClick={() => {
                    logOut();
                    closeMobileMenu();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-medium)',
                    background: 'transparent',
                    color: 'var(--risk-red)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                  }}
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  closeMobileMenu();
                }}
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
                Sign In
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-hamburger-btn {
            display: block !important;
          }
        }
      `}</style>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
