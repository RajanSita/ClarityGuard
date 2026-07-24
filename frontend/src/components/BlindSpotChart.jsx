import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AlertCircle, Target } from 'lucide-react';
import { MECHANISM_LABELS } from '../utils/constants';

export default function BlindSpotChart({ blindSpots }) {
  if (!blindSpots || blindSpots.length === 0) {
    return (
      <div
        className="glass-card"
        style={{
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
        }}
      >
        <Target size={28} color="var(--accent-primary)" style={{ marginBottom: '8px' }} />
        <p>No blind-spot data yet. Perform scans while logged in to build your personal manipulation profile!</p>
      </div>
    );
  }

  // Format data for Recharts bar chart
  const data = blindSpots.slice(0, 6).map((item) => ({
    name: MECHANISM_LABELS[item.mechanismName] || item.mechanismName,
    count: item.count || 0,
  }));

  const topBlindSpot = data[0];

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            🧠 Personal Blind-Spot Memory (§2.5)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Manipulation tricks you encounter most frequently
          </p>
        </div>
      </div>

      {topBlindSpot && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: 'var(--accent-primary-dim)',
            border: '1px solid rgba(62, 207, 142, 0.2)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            fontSize: '0.88rem',
            color: 'var(--accent-primary)',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>Your #1 Blind Spot:</strong> "{topBlindSpot.name}" (encountered {topBlindSpot.count} time
            {topBlindSpot.count > 1 ? 's' : ''})
          </span>
        </div>
      )}

      {/* Chart */}
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
            <XAxis type="number" stroke="var(--text-muted)" fontSize={12} allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="name"
              stroke="var(--text-secondary)"
              fontSize={12}
              width={140}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? 'var(--risk-red)' : index === 1 ? 'var(--risk-yellow)' : 'var(--accent-primary)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
