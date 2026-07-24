import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  FileText,
  MessageSquareWarning,
  Globe,
  Scale,
  Zap,
  Brain,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Eye,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import MechanismIcon from '../components/MechanismIcon';
import { MECHANISM_LABELS } from '../utils/constants';

export default function About() {
  const [activeTaxonomyTab, setActiveTaxonomyTab] = useState('contract');

  const contractMechanisms = [
    { id: 'unilateral_termination', title: 'Unilateral Termination', desc: 'One party can end the contract instantly without cause or notice.' },
    { id: 'liability_waiver', title: 'Liability Waiver', desc: 'Shields the company from responsibility for damages or negligence.' },
    { id: 'indemnity_shift', title: 'Indemnity Shift', desc: 'Forces you to pay for third-party legal claims against the company.' },
    { id: 'auto_renewal_trap', title: 'Auto-Renewal Trap', desc: 'Locks you into long multi-year renewals unless cancelled far in advance.' },
    { id: 'non_compete_overreach', title: 'Non-Compete Overreach', desc: 'Restricts your future employment across broad regions or long periods.' },
    { id: 'ip_assignment_overreach', title: 'IP Overreach', desc: 'Claims ownership over ideas or work created outside engagement.' },
  ];

  const scamMechanisms = [
    { id: 'false_urgency', title: 'False Urgency', desc: 'Forces fast panic actions ("Account locked in 10 minutes!").' },
    { id: 'false_authority', title: 'False Authority', desc: 'Impersonates trusted banks, government agencies, or law enforcement.' },
    { id: 'too_good_to_be_true', title: 'Too Good to Be True', desc: 'Promises huge rewards, lottery wins, or unearned payouts.' },
    { id: 'info_phishing', title: 'Information Phishing', desc: 'Requests sensitive OTPs, PINs, passwords, or personal details.' },
    { id: 'payment_redirect', title: 'Payment Redirect', desc: 'Tricks you into sending money to an unverified third-party account.' },
    { id: 'link_obfuscation', title: 'Link Obfuscation', desc: 'Hides suspicious URLs behind shorteners or domain misspellings.' },
  ];

  return (
    <div className="bg-grid" style={{ flex: 1, color: 'var(--text-primary)' }}>
      {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'var(--accent-primary-dim)',
              border: '1px solid rgba(62, 207, 142, 0.25)',
              color: 'var(--accent-primary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              marginBottom: '24px',
            }}
          >
            <Sparkles size={16} />
            "We built the someone who explains the fine print."
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}
          >
            Never Sign or Reply in the <br />
            <span className="text-gradient">Dark Again</span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto 36px',
            }}
          >
            People sign contracts they can't parse and receive scam messages designed to exploit that exact confusion.
            <strong> ClarityGuard</strong> X-rays any text in seconds — exposing manipulation tricks, verifying real-world entities, showing fair alternatives, and auto-drafting your next move.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/scan"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                fontSize: '1.05rem',
                textDecoration: 'none',
              }}
            >
              <Search size={20} />
              Scan a Document Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/dashboard"
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 28px',
                fontSize: '1.05rem',
                textDecoration: 'none',
              }}
            >
              <Brain size={20} />
              Explore Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 2. THE PROBLEM VS SOLUTION ──────────────────────────────────────── */}
      <section
        style={{
          padding: '60px 24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>
            Why ClarityGuard Exists
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            The people most exposed to bad clauses and fraudulent messages are those with the least access to a lawyer.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Unfair / Old Way */}
          <div
            className="glass-card"
            style={{
              padding: '32px',
              borderLeft: '4px solid var(--risk-red)',
              background: 'rgba(239, 68, 68, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--risk-red)' }}>
              <AlertTriangle size={24} />
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                The Fine Print Trap
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--risk-red)', fontWeight: 'bold' }}>✕</span>
                Dense legal jargon written by corporate legal teams to shift all risk onto you.
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--risk-red)', fontWeight: 'bold' }}>✕</span>
                SMS/email scams leveraging artificial urgency and impersonation to bypass critical thinking.
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--risk-red)', fontWeight: 'bold' }}>✕</span>
                Asking ChatGPT gives generic summary text without naming the actual legal trick being used.
              </li>
            </ul>
          </div>

          {/* ClarityGuard Way */}
          <div
            className="glass-card"
            style={{
              padding: '32px',
              borderLeft: '4px solid var(--accent-primary)',
              background: 'var(--accent-primary-dim)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--accent-primary)' }}>
              <ShieldCheck size={24} />
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                The ClarityGuard Advantage
              </h3>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              <li style={{ display: 'flex', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <strong>Fixed Manipulation Taxonomy:</strong> Names the exact legal/psychological trick being used.
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <strong>Real-World Entity Check:</strong> Live Tavily web search verifies if sender/company is legitimate or a reported scam.
              </li>
              <li style={{ display: 'flex', gap: '10px' }}>
                <CheckCircle2 size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <strong>Fair-Baseline & Action Layer:</strong> Shows standard market clauses side-by-side and auto-drafts your counter-offer.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. HERO FEATURES GRID ────────────────────────────────────────────── */}
      <section
        style={{
          padding: '60px 24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '12px' }}>
            5 Hero Features
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            Built specifically to solve legal ambiguity and digital fraud.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Feature 1 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--risk-red)', display: 'inline-flex', marginBottom: '16px' }}>
              <Eye size={24} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
              1. Manipulation X-Ray
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Instead of vague summaries, we flag exact quotes and categorize them against a 18-tactic taxonomy (e.g. Unilateral Termination, Indemnity Shift, False Urgency).
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--accent-secondary-dim)', color: 'var(--accent-secondary)', display: 'inline-flex', marginBottom: '16px' }}>
              <Globe size={24} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
              2. Real-World Entity Check
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Live Tavily search queries public business registries, review portals, and cybercrime databases to verify if the named company or sender ID has a reported scam history.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--risk-green-bg)', color: 'var(--risk-green)', display: 'inline-flex', marginBottom: '16px' }}>
              <Scale size={24} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
              3. Fair-Baseline Comparator
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Compares predatory contract clauses side-by-side against standard, balanced market baselines from our static reference dataset to show you what "fair" looks like.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'var(--accent-primary-dim)', color: 'var(--accent-primary)', display: 'inline-flex', marginBottom: '16px' }}>
              <Zap size={24} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
              4. Defensive Action Layer
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Generates ready-to-send pushback negotiation messages for contracts, and formal cybercrime portal report drafts for scam messages.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--risk-yellow)', display: 'inline-flex', marginBottom: '16px' }}>
              <Brain size={24} />
            </div>
            <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
              5. Personal Blind-Spot Memory
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Persists your scan history in Firestore to discover which manipulation techniques you repeatedly encounter, warning you earlier next time.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. FIXED TAXONOMY INTERACTIVE EXPLORER ──────────────────────────── */}
      <section
        style={{
          padding: '60px 24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div className="glass-card" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>
              Explore the Fixed Manipulation Taxonomy
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              ClarityGuard uses a strict, closed taxonomy so categories remain consistent across all scans.
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveTaxonomyTab('contract')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: activeTaxonomyTab === 'contract' ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                background: activeTaxonomyTab === 'contract' ? 'var(--accent-primary-dim)' : 'transparent',
                color: activeTaxonomyTab === 'contract' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
              }}
            >
              <FileText size={18} />
              Contract Tactics (10)
            </button>

            <button
              onClick={() => setActiveTaxonomyTab('scam')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: activeTaxonomyTab === 'scam' ? '1px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                background: activeTaxonomyTab === 'scam' ? 'var(--accent-secondary-dim)' : 'transparent',
                color: activeTaxonomyTab === 'scam' ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
              }}
            >
              <MessageSquareWarning size={18} />
              Scam Tactics (8)
            </button>
          </div>

          {/* Grid of tactics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {(activeTaxonomyTab === 'contract' ? contractMechanisms : scamMechanisms).map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <MechanismIcon mechanism={item.id} size={16} />
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.title}</strong>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRIVACY & NO-LOOPHOLE GUARANTEES ────────────────────────────── */}
      <section
        style={{
          padding: '60px 24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>
            🔒 Built-In Abuse Proofing & Privacy
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Designed strictly to protect users without creating legal or security risks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            <Lock size={20} color="var(--accent-primary)" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>Zero Document Logging</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Full raw original text is never logged or saved to any database. Only risk metadata and excerpts are stored.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <ShieldCheck size={20} color="var(--accent-primary)" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>Anti-Prompt Injection</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Input text is strictly isolated inside system delimiters and validated against Pydantic server-side schemas.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px' }}>
            <Scale size={20} color="var(--accent-primary)" style={{ marginBottom: '8px' }} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px' }}>No Hallucinated Law</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Fair baselines come only from static pre-written reference data — never live LLM generated language.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL BOTTOM CTA ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: '60px 24px 80px',
          textAlign: 'center',
        }}
      >
        <div
          className="glass-card"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '48px 32px',
            background: 'linear-gradient(135deg, rgba(62, 207, 142, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%)',
            border: '1px solid var(--border-accent)',
          }}
        >
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
            Ready to See Through the Fine Print?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '540px', margin: '0 auto 28px' }}>
            Paste your lease, agreement, or suspicious message right now and get an instant plain-English breakdown.
          </p>

          <Link
            to="/scan"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              fontSize: '1.1rem',
              textDecoration: 'none',
            }}
          >
            <Search size={20} />
            Start Free Scan
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
