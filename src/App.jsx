import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const DATA = {
  total: 43199, total_yt: 22960, total_music: 20239,
  by_year: [
    { year: '2024', yt: 3336, music: 892, total: 4228 },
    { year: '2025', yt: 17759, music: 16189, total: 33948 },
    { year: '2026', yt: 1865, music: 3158, total: 5023 },
  ],
  monthly: [
    { label: 'Nov 24', count: 916 }, { label: 'Dec 24', count: 2420 },
    { label: 'Jan 25', count: 2096 }, { label: 'Feb 25', count: 2221 },
    { label: 'Mar 25', count: 1298 }, { label: 'Apr 25', count: 2098 },
    { label: 'May 25', count: 2143 }, { label: 'Jun 25', count: 1771 },
    { label: 'Jul 25', count: 1278 }, { label: 'Aug 25', count: 1137 },
    { label: 'Sep 25', count: 1235 }, { label: 'Oct 25', count: 951 },
    { label: 'Nov 25', count: 821 }, { label: 'Dec 25', count: 710 },
    { label: 'Jan 26', count: 540 }, { label: 'Feb 26', count: 1077 },
    { label: 'Mar 26', count: 248 },
  ],
  hours: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    count: [1370,677,320,337,278,286,492,640,1017,1221,1285,1358,
            837,1902,2158,2097,1608,1587,2047,3543,3032,4494,6596,4017][i]
  })),
  top_channels: [
    { name: 'NANAKE555', count: 385 },
    { name: 'ช่อง one31', count: 316 },
    { name: 'GRAMMY GOLD', count: 301 },
    { name: 'ATIME', count: 290 },
    { name: 'บ่าวหมี.', count: 205 },
    { name: 'Netflix Thailand', count: 192 },
    { name: 'ดูวนไป', count: 182 },
    { name: 'Ghost Radio', count: 172 },
    { name: 'อมรินทร์ทีวี', count: 151 },
    { name: 'รอบโลก', count: 151 },
  ],
  top_music: [
    { name: 'Release', count: 423 },
    { name: 'WanMai', count: 246 },
    { name: 'Vieng Naruemon', count: 232 },
    { name: 'KWANG', count: 209 },
    { name: 'Linkin Park', count: 195 },
    { name: 'Silly Fools', count: 184 },
    { name: 'LBI', count: 174 },
    { name: 'DID KITTY', count: 172 },
    { name: 'กระต่าย', count: 167 },
    { name: 'Only Monday', count: 166 },
  ],
}

const ACCENT = '#ff3d6b'
const PURPLE = '#7c5cfc'
const TEAL = '#00d4aa'

function StatCard({ label, value, color, sub }) {
  return (
    <div style={{
      background: '#12121a', border: '1px solid #2a2a3d',
      borderRadius: 16, padding: '24px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${ACCENT}, ${PURPLE})` }} />
      <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
        color: '#6b6b8a', marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: color || '#f0f0f8',
        letterSpacing: -1, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#6b6b8a', marginTop: 6 }}>{sub}</div>}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%',
        background: `linear-gradient(135deg, ${ACCENT}, ${PURPLE})` }} />
      <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: 0.5 }}>{children}</span>
    </div>
  )
}

function Card({ children, style }) {
  return (
    <div style={{
      background: '#12121a', border: '1px solid #2a2a3d',
      borderRadius: 16, padding: 24, ...style
    }}>
      {children}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1a1a26', border: '1px solid #2a2a3d',
        borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#f0f0f8' }}>
        <div style={{ color: '#6b6b8a', marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</div>
        ))}
      </div>
    )
  }
  return null
}

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f8',
      fontFamily: "'Sarabun', sans-serif", fontSize: 15
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        borderBottom: '1px solid #2a2a3d', padding: '20px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, margin: 0,
            background: `linear-gradient(135deg, #fff, ${ACCENT})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            YouTube For Me
          </h1>
          <p style={{ color: '#6b6b8a', fontSize: 12, margin: '4px 0 0' }}>
            Noona's Personal Analytics · Nov 2024 – Mar 2026
          </p>
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${PURPLE})`,
          borderRadius: 20, padding: '6px 14px', fontSize: 11,
          fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase'
        }}>Dashboard V1</div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 32px', borderBottom: '1px solid #2a2a3d',
        display: 'flex', gap: 0 }}>
        {['overview', 'channels', 'music'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '16px 20px', fontSize: 13, fontWeight: 600,
            color: activeTab === tab ? ACCENT : '#6b6b8a',
            borderBottom: activeTab === tab ? `2px solid ${ACCENT}` : '2px solid transparent',
            textTransform: 'capitalize', letterSpacing: 0.5,
            transition: 'color 0.2s'
          }}>
            {tab === 'overview' ? '📊 ภาพรวม' : tab === 'channels' ? '🎬 Channels' : '🎵 Music'}
          </button>
        ))}
      </div>

      <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>

        {activeTab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16, marginBottom: 24 }}>
              <StatCard label="รวมทั้งหมด" value={DATA.total.toLocaleString()} color={ACCENT} sub="รายการทั้งหมด" />
              <StatCard label="🎬 YouTube" value={DATA.total_yt.toLocaleString()} color={PURPLE} sub="วิดีโอที่ดู" />
              <StatCard label="🎵 Music" value={DATA.total_music.toLocaleString()} color={TEAL} sub="เพลงที่ฟัง" />
              <StatCard label="🌙 ดึกที่สุด" value="22:00" color={ACCENT} sub="6,596 ครั้ง" />
              <StatCard label="📅 ปีที่ดูมากสุด" value="2025" color={PURPLE} sub="33,948 รายการ" />
              <StatCard label="🏆 Channel ยอดนิยม" value="NANAKE555" sub="385 วิดีโอ" />
            </div>

            {/* Year Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <Card>
                <SectionTitle>จำนวนต่อปี</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={DATA.by_year}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
                    <XAxis dataKey="year" stroke="#6b6b8a" fontSize={12} />
                    <YAxis stroke="#6b6b8a" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="yt" name="YouTube" fill={ACCENT} radius={[4,4,0,0]} />
                    <Bar dataKey="music" name="Music" fill={PURPLE} radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card>
                <SectionTitle>แนวโน้มรายเดือน</SectionTitle>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={DATA.monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
                    <XAxis dataKey="label" stroke="#6b6b8a" fontSize={10} interval={2} />
                    <YAxis stroke="#6b6b8a" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="count" name="วิดีโอ"
                      stroke={ACCENT} strokeWidth={2} dot={{ fill: ACCENT, r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Hour Chart */}
            <Card style={{ marginBottom: 20 }}>
              <SectionTitle>ดูช่วงไหนมากที่สุด?</SectionTitle>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={DATA.hours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3d" />
                  <XAxis dataKey="hour" stroke="#6b6b8a" fontSize={10} interval={2} />
                  <YAxis stroke="#6b6b8a" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="ครั้ง" radius={[3,3,0,0]}>
                    {DATA.hours.map((entry, i) => (
                      <Cell key={i}
                        fill={entry.count > 4000 ? ACCENT : entry.count > 2000 ? PURPLE : '#2a2a4d'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 12, padding: '12px 16px',
                background: 'rgba(255,61,107,0.08)', border: '1px solid rgba(255,61,107,0.2)',
                borderRadius: 10, fontSize: 13, color: '#6b6b8a' }}>
                ⚡ <strong style={{ color: '#f0f0f8' }}>Night Owl!</strong> — Noona ดูหนักที่สุดช่วง
                <strong style={{ color: ACCENT }}> 22:00 น. (6,596 ครั้ง)</strong> 🌙
              </div>
            </Card>
          </>
        )}

        {activeTab === 'channels' && (
          <Card>
            <SectionTitle>Top 10 YouTube Channels</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {DATA.top_channels.map((ch, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${ACCENT}, ${PURPLE})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 13, width: 160, flexShrink: 0 }}>{ch.name}</div>
                  <div style={{ flex: 1, height: 8, background: '#1a1a26', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 4,
                      background: `linear-gradient(90deg, ${ACCENT}, ${PURPLE})`,
                      width: `${(ch.count / 385 * 100).toFixed(0)}%` }} />
                  </div>
                  <div style={{ fontSize: 13, width: 36, textAlign: 'right', color: ACCENT, fontWeight: 700 }}>
                    {ch.count}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'music' && (
          <Card>
            <SectionTitle>Top 10 ศิลปิน (YouTube Music)</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {DATA.top_music.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${PURPLE}, ${TEAL})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 13, width: 160, flexShrink: 0 }}>{m.name}</div>
                  <div style={{ flex: 1, height: 8, background: '#1a1a26', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 4,
                      background: `linear-gradient(90deg, ${PURPLE}, ${TEAL})`,
                      width: `${(m.count / 423 * 100).toFixed(0)}%` }} />
                  </div>
                  <div style={{ fontSize: 13, width: 36, textAlign: 'right', color: PURPLE, fontWeight: 700 }}>
                    {m.count}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

      </div>
    </div>
  )
}