import { useState, useEffect, useCallback } from 'react'

// ── Config ────────────────────────────────────────────────────────────────────
const PASS     = import.meta.env.VITE_ADMIN_PASSWORD || 'agzus@admin'
const API      = 'http://localhost:7642'
const MSGS_KEY = 'agzus_messages'

const SLOTS = [
  { id: 'dashboard', label: 'Dashboard'            },
  { id: 'pos',       label: 'POS / Cashier'        },
  { id: 'invoices',  label: 'Invoices'             },
  { id: 'inventory', label: 'Inventory'            },
  { id: 'customers', label: 'Customers & Follow Ups'},
  { id: 'employees', label: 'Employees'            },
  { id: 'payroll',   label: 'Payroll'              },
  { id: 'reports',   label: 'Reports'              },
  { id: 'settings',  label: 'Settings'             },
  { id: 'updates',   label: 'Updates'              },
]

// Check if a URL resolves to a real image
function checkImg(src) {
  return new Promise(resolve => {
    const i = new Image()
    i.onload  = () => resolve(true)
    i.onerror = () => resolve(false)
    i.src = src + '?_=' + Date.now()
  })
}

// ── Messages helpers (localStorage) ──────────────────────────────────────────
function readMsgs()       { try { return JSON.parse(localStorage.getItem(MSGS_KEY) || '[]') } catch { return [] } }
function saveMsgs(msgs)   { localStorage.setItem(MSGS_KEY, JSON.stringify(msgs)) }

// ── Toast hook ────────────────────────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = useState(null)
  const show = useCallback((text, type = 'ok') => {
    setMsg({ text, type })
    setTimeout(() => setMsg(null), 3200)
  }, [])
  return [msg, show]
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('agzus_adm') === PASS)
  const [pw, setPw]         = useState('')
  const [pwErr, setPwErr]   = useState('')

  const [tab, setTab]           = useState('media')
  const [serverUp, setServerUp] = useState(false)
  const [imgStatus, setImgStatus] = useState({})   // { dashboard: true/false }
  const [videoOk, setVideoOk]   = useState(false)
  const [messages, setMessages] = useState([])
  const [filter, setFilter]     = useState('all')
  const [building, setBuilding] = useState(false)
  const [buildLog, setBuildLog] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]         = useState({ name: '', email: '', phone: '', company: '', services: '', message: '' })
  const [toast, showToast]      = useToast()

  // ── Load data on auth ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!authed) return
    loadMessages()
    checkServerAndMedia()
  }, [authed])

  async function checkServerAndMedia() {
    // Ping admin server
    try {
      await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: '' }),
        signal: AbortSignal.timeout(2000),
      })
      setServerUp(true)
    } catch {
      setServerUp(false)
    }

    // Check images
    const results = {}
    await Promise.all(SLOTS.map(async s => {
      results[s.id] = await checkImg(`/images/products/${s.id}.png`)
        || await checkImg(`/images/products/${s.id}.jpg`)
        || await checkImg(`/images/products/${s.id}.webp`)
    }))
    setImgStatus(results)

    // Check video
    setVideoOk(await checkImg('/videos/ats-software-tutorial.mp4').catch(() => false)
      .then(() => true).catch(() => false))
    // Use fetch HEAD for video since Image won't load video
    try {
      const r = await fetch('/videos/ats-software-tutorial.mp4', { method: 'HEAD', cache: 'no-cache' })
      setVideoOk(r.ok)
    } catch { setVideoOk(false) }
  }

  function loadMessages() {
    setMessages(readMsgs())
  }

  // ── Login ───────────────────────────────────────────────────────────────────
  function login(e) {
    e.preventDefault()
    if (pw === PASS) {
      sessionStorage.setItem('agzus_adm', pw)
      setAuthed(true)
    } else {
      setPwErr('Wrong password.')
    }
  }

  function logout() {
    sessionStorage.removeItem('agzus_adm')
    setAuthed(false)
    setPw('')
  }

  // ── Media uploads (requires admin server) ──────────────────────────────────
  async function uploadImage(file, slot) {
    if (!serverUp) { showToast('Admin server not running. Run: npm run admin', 'err'); return }
    const fd = new FormData()
    fd.append('image', file)
    try {
      const r = await fetch(`${API}/api/upload/image?slot=${slot}`, {
        method: 'POST',
        headers: { 'x-admin-token': PASS },
        body: fd,
      })
      if (r.ok) { showToast(`✓ ${slot} uploaded`, 'ok'); checkServerAndMedia() }
      else showToast('Upload failed', 'err')
    } catch { showToast('Cannot reach admin server', 'err') }
  }

  async function uploadVideo(file) {
    if (!serverUp) { showToast('Admin server not running. Run: npm run admin', 'err'); return }
    const fd = new FormData()
    fd.append('video', file)
    showToast('Uploading video…', '')
    try {
      const r = await fetch(`${API}/api/upload/video`, {
        method: 'POST',
        headers: { 'x-admin-token': PASS },
        body: fd,
      })
      if (r.ok) { showToast('✓ Video uploaded', 'ok'); checkServerAndMedia() }
      else showToast('Upload failed', 'err')
    } catch { showToast('Cannot reach admin server', 'err') }
  }

  async function runBuild() {
    if (!serverUp) { showToast('Admin server not running. Run: npm run admin', 'err'); return }
    setBuilding(true)
    setBuildLog('Building…')
    try {
      const r = await fetch(`${API}/api/build`, { method: 'POST', headers: { 'x-admin-token': PASS, 'Content-Type': 'application/json' } })
      const d = await r.json()
      if (r.ok) { setBuildLog(d.output || 'Build successful!'); showToast('✓ Build complete!', 'ok') }
      else       { setBuildLog(d.error  || 'Build failed');     showToast('Build failed', 'err') }
    } catch { setBuildLog('Cannot reach admin server') }
    setBuilding(false)
  }

  // ── Messages ────────────────────────────────────────────────────────────────
  function toggleDone(id) {
    const updated = messages.map(m => m.id === id ? { ...m, followedUp: !m.followedUp } : m)
    saveMsgs(updated)
    setMessages(updated)
  }

  function saveNote(id, notes) {
    const updated = messages.map(m => m.id === id ? { ...m, notes } : m)
    saveMsgs(updated)
    setMessages(updated)
  }

  function deleteMsg(id) {
    if (!confirm('Delete this message?')) return
    const updated = messages.filter(m => m.id !== id)
    saveMsgs(updated)
    setMessages(updated)
  }

  function addMsg(e) {
    e.preventDefault()
    const msgs = readMsgs()
    msgs.unshift({ id: Date.now().toString(), date: new Date().toISOString(), followedUp: false, notes: '', ...form })
    saveMsgs(msgs)
    setMessages(msgs)
    setForm({ name: '', email: '', phone: '', company: '', services: '', message: '' })
    setShowModal(false)
    showToast('✓ Message saved', 'ok')
  }

  // ── Derived ─────────────────────────────────────────────────────────────────
  const filtered  = filter === 'new' ? messages.filter(m => !m.followedUp)
                  : filter === 'done' ? messages.filter(m => m.followedUp)
                  : messages
  const newCount  = messages.filter(m => !m.followedUp).length
  const doneCount = messages.filter(m => m.followedUp).length

  // ── Render ──────────────────────────────────────────────────────────────────
  if (!authed) return <LoginScreen pw={pw} setPw={setPw} err={pwErr} onSubmit={login} />

  return (
    <div style={{ minHeight: '100vh', background: '#050917', color: '#e2e8f0', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* Topbar */}
      <div style={{ background: '#0a1225', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '13px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ef4444' }}>AGZUS Admin</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {['media', 'messages'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '6px 18px', borderRadius: 7, border: 'none', background: tab === t ? 'rgba(239,68,68,.12)' : 'transparent', color: tab === t ? '#fff' : '#64748b', fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
              {t === 'media' ? '📁 Media' : `💬 Messages${newCount > 0 ? ` (${newCount})` : ''}`}
            </button>
          ))}
        </div>
        <button onClick={logout} style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>Log Out</button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '30px 24px' }}>

        {/* Server banner */}
        <div style={{ marginBottom: 24, padding: '10px 16px', borderRadius: 10, border: `1px solid ${serverUp ? 'rgba(34,197,94,.25)' : 'rgba(251,146,60,.25)'}`, background: serverUp ? 'rgba(34,197,94,.05)' : 'rgba(251,146,60,.05)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
          <span style={{ color: serverUp ? '#22c55e' : '#fb923c' }}>{serverUp ? '● Admin server connected' : '● Admin server offline'}</span>
          {!serverUp && <span style={{ color: '#64748b' }}>— Run <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: 4 }}>npm run admin</code> in terminal to enable file uploads &amp; build</span>}
          <button onClick={checkServerAndMedia} style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#64748b', fontSize: 11, cursor: 'pointer' }}>Refresh</button>
        </div>

        {/* ── MEDIA TAB ── */}
        {tab === 'media' && (
          <div>
            {/* Video */}
            <Section label="/ Tutorial Video" title="ATS Software Tutorial Video" sub={<>Saved as <code style={codeStyle}>/videos/ats-software-tutorial.mp4</code></>}>
              <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(14,165,233,.1)', border: '1px solid rgba(14,165,233,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>ats-software-tutorial.mp4</div>
                    <div style={{ fontSize: 12, color: videoOk ? '#22c55e' : '#fb923c', marginTop: 2 }}>{videoOk ? '● Uploaded' : '● Not found'}</div>
                  </div>
                </div>
                <label style={btnStyle}>
                  Upload / Replace
                  <input type="file" accept="video/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) uploadVideo(e.target.files[0]) }} />
                </label>
              </div>
            </Section>

            {/* Screenshots */}
            <Section label="/ Product Screenshots" title="Upload Screenshots" sub="Each slot maps to a screen in the Software Screenshots section.">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px,1fr))', gap: 12 }}>
                {SLOTS.map(slot => (
                  <div key={slot.id} style={{ background: '#0a1225', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ width: '100%', aspectRatio: '16/9', background: '#07101f', position: 'relative', overflow: 'hidden' }}>
                      {imgStatus[slot.id]
                        ? <img src={`/images/products/${slot.id}.png`} alt={slot.label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} onError={e => { e.target.style.display = 'none' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'rgba(255,255,255,0.12)', fontSize: 11, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 5-5 4 4 3-3 5 5"/></svg>
                            Not uploaded
                          </div>
                      }
                    </div>
                    <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{slot.label}</div>
                        <div style={{ fontSize: 11, color: imgStatus[slot.id] ? '#22c55e' : '#fb923c', marginTop: 2 }}>{imgStatus[slot.id] ? '● Live' : '● Missing'}</div>
                      </div>
                      <label style={{ ...iconBtnStyle, cursor: 'pointer' }} title="Upload">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) uploadImage(e.target.files[0], slot.id) }} />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Build */}
            <Section label="/ Publish" title="">
              <div style={cardStyle}>
                <div>
                  <div style={{ fontSize: 15, color: '#fff', fontWeight: 700 }}>Build &amp; Publish Website</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>After uploading files, run a build to update the live site.</div>
                </div>
                <button onClick={runBuild} disabled={building} style={{ ...btnStyle, background: '#ef4444', border: 'none', color: '#fff', opacity: building ? 0.6 : 1, cursor: building ? 'not-allowed' : 'pointer' }}>
                  {building ? 'Building…' : '▶ Build Website'}
                </button>
              </div>
              {buildLog && (
                <pre style={{ marginTop: 12, background: '#020812', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '14px 16px', fontFamily: 'monospace', fontSize: 12, color: '#22c55e', whiteSpace: 'pre-wrap', maxHeight: 220, overflowY: 'auto' }}>
                  {buildLog}
                </pre>
              )}
            </Section>
          </div>
        )}

        {/* ── MESSAGES TAB ── */}
        {tab === 'messages' && (
          <div>
            {/* Stats + Add */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[['Total', messages.length, '#fff'], ['New', newCount, '#fb923c'], ['Followed Up', doneCount, '#22c55e']].map(([l, n, c]) => (
                  <span key={l} style={{ padding: '4px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#64748b' }}>
                    {l} <span style={{ color: c }}>{n}</span>
                  </span>
                ))}
              </div>
              <button onClick={() => setShowModal(true)} style={{ ...btnStyle, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', color: '#ef4444', fontWeight: 700 }}>
                + Add Message
              </button>
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              {[['all','All'], ['new','New'], ['done','Followed Up']].map(([f, l]) => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 14px', borderRadius: 20, border: `1px solid ${filter===f ? '#0ea5e9' : 'rgba(255,255,255,0.08)'}`, background: filter===f ? 'rgba(14,165,233,.08)' : 'transparent', color: filter===f ? '#0ea5e9' : '#64748b', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>{l}</button>
              ))}
            </div>

            {/* Message list */}
            {filtered.length === 0
              ? <div style={{ textAlign: 'center', padding: '52px 20px', color: '#64748b', fontSize: 14 }}>No messages here yet.</div>
              : <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {filtered.map(m => <MsgCard key={m.id} msg={m} onToggle={toggleDone} onNote={saveNote} onDelete={deleteMsg} />)}
                </div>
            }
          </div>
        )}
      </div>

      {/* Add Message Modal */}
      {showModal && (
        <div onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
          <form onSubmit={addMsg} style={{ background: '#0a1225', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: 30, width: '100%', maxWidth: 480, maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Log Client Message</div>
            {[['name','Name'],['email','Email'],['phone','Phone / WhatsApp'],['company','Company'],['services','Services Interested']].map(([k,l]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 11, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</label>
                <input value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} style={inputStyle} placeholder={l} />
              </div>
            ))}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</label>
              <textarea value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="What did the client say?" />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: 11, borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: '#64748b', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: 11, borderRadius: 8, border: 'none', background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Save Message</button>
            </div>
          </form>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#0a1225', border: `1px solid ${toast.type==='ok'?'rgba(34,197,94,.35)':toast.type==='err'?'rgba(239,68,68,.35)':'rgba(255,255,255,0.08)'}`, borderRadius: 10, padding: '12px 18px', fontSize: 13, color: '#fff', zIndex: 200, animation: 'fadeUp .2s ease' }}>
          {toast.text}
        </div>
      )}

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Section({ label, title, sub, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {label && <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#0ea5e9', marginBottom: 6 }}>{label}</div>}
      {title && <div style={{ fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{title}</div>}
      {sub   && <div style={{ fontSize: 13, color: '#64748b', marginBottom: 14 }}>{sub}</div>}
      {children}
    </div>
  )
}

function MsgCard({ msg, onToggle, onNote, onDelete }) {
  const [note, setNote] = useState(msg.notes || '')
  const dt = new Date(msg.date).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  const contact = [msg.email, msg.phone].filter(Boolean).join(' · ')

  return (
    <div style={{ background: '#0a1225', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 18px', opacity: msg.followedUp ? 0.6 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{msg.name || 'Unknown'}</div>
          {contact && <div style={{ fontSize: 12, color: '#0ea5e9', marginTop: 2 }}>{contact}</div>}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>{dt}</div>
          <span style={{ display: 'inline-block', marginTop: 4, padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: msg.followedUp ? 'rgba(34,197,94,.12)' : 'rgba(251,146,60,.12)', color: msg.followedUp ? '#22c55e' : '#fb923c' }}>
            {msg.followedUp ? '✓ Done' : 'New'}
          </span>
        </div>
      </div>
      {msg.company  && <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Company: {msg.company}</div>}
      {msg.services && <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Services: {msg.services}</div>}
      <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.55 }}>{msg.message || '—'}</div>
      {msg.notes && <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginTop: 6 }}>📝 {msg.notes}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <button onClick={() => onToggle(msg.id)} style={{ padding: '5px 12px', borderRadius: 6, border: msg.followedUp ? '1px solid rgba(34,197,94,.3)' : '1px solid rgba(255,255,255,0.08)', background: msg.followedUp ? 'rgba(34,197,94,.06)' : 'transparent', color: msg.followedUp ? '#22c55e' : '#64748b', fontSize: 12, cursor: 'pointer' }}>
          {msg.followedUp ? '✓ Followed Up' : 'Mark as Followed Up'}
        </button>
        <input value={note} onChange={e => setNote(e.target.value)} onBlur={() => onNote(msg.id, note)} placeholder="Add note…" style={{ flex: 1, minWidth: 150, maxWidth: 260, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '5px 10px', color: '#fff', fontSize: 12, outline: 'none' }} />
        <button onClick={() => onDelete(msg.id)} style={{ padding: '5px 12px', borderRadius: 6, border: 'none', background: 'transparent', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>Delete</button>
      </div>
    </div>
  )
}

function LoginScreen({ pw, setPw, err, onSubmit }) {
  return (
    <div style={{ minHeight: '100vh', background: '#050917', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <form onSubmit={onSubmit} style={{ background: '#0a1225', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '40px 36px', width: '100%', maxWidth: 380 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#ef4444', marginBottom: 10 }}>AGZUS Technology</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Admin Panel</div>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>Sign in to manage your website</div>
        <label style={{ display: 'block', fontSize: 11, color: '#64748b', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Password</label>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter admin password" autoComplete="current-password" style={{ ...inputStyle, marginBottom: 6 }} />
        {err && <div style={{ fontSize: 12, color: '#ef4444', marginBottom: 8 }}>{err}</div>}
        <button type="submit" style={{ width: '100%', background: '#ef4444', border: 'none', borderRadius: 9, padding: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 6 }}>Sign In</button>
      </form>
    </div>
  )
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const cardStyle = {
  background: '#0a1225', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 13,
  padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap',
}
const btnStyle = {
  padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 13, fontWeight: 500,
  cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 7,
}
const iconBtnStyle = {
  width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
  background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b',
}
const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 9, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none',
}
const codeStyle = {
  background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontSize: '0.9em', fontFamily: 'monospace',
}
