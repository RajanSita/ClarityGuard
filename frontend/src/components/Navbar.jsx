import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
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
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={20} color="var(--bg-primary)" strokeWidth={2.5} />
          </div>
          <span
            className="font-display"
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Clarity<span style={{ color: 'var(--accent-primary)' }}>Guard</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="desktop-nav"
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
            <Shield size={16} />
            Scan
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
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          className="mobile-nav"
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              color: isActive('/') ? 'var(--accent-primary)' : 'var(--text-secondary)',
              background: isActive('/') ? 'var(--accent-primary-dim)' : 'transparent',
            }}
          >
            <Shield size={16} />
            Scan
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              color: isActive('/dashboard') ? 'var(--accent-primary)' : 'var(--text-secondary)',
              background: isActive('/dashboard') ? 'var(--accent-primary-dim)' : 'transparent',
            }}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
