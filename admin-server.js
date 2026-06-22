import express  from 'express'
import multer   from 'multer'
import cors     from 'cors'
import path     from 'path'
import fs       from 'fs'
import { exec } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app  = express()
const PORT = 7642

// ── Change this password ──────────────────────────────────────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'agzus@admin'

// ── Directories ───────────────────────────────────────────────────────────────
const IMAGES_DIR    = path.join(__dirname, 'assets', 'images', 'products')
const VIDEOS_DIR    = path.join(__dirname, 'assets', 'videos')
const DATA_DIR      = path.join(__dirname, 'data')
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json')

for (const d of [IMAGES_DIR, VIDEOS_DIR, DATA_DIR]) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
}
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]')

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// Serve admin panel HTML
app.get('/',      (req, res) => res.sendFile(path.join(__dirname, 'admin-panel.html')))
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin-panel.html')))

// Serve uploaded files for preview inside the admin panel
app.use('/preview/images', express.static(IMAGES_DIR))
app.use('/preview/videos', express.static(VIDEOS_DIR))

// ── Auth ──────────────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.headers['x-admin-token'] === ADMIN_PASSWORD) return next()
  res.status(401).json({ error: 'Unauthorized' })
}

app.post('/api/login', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.json({ success: true })
  } else {
    res.status(401).json({ error: 'Wrong password' })
  }
})

// ── Images ────────────────────────────────────────────────────────────────────
// Use memory storage so we can name the file from req.query.slot safely
const memUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } })

app.get('/api/images', requireAuth, (req, res) => {
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
    .map(f => ({ name: f, url: `/preview/images/${f}`, size: fs.statSync(path.join(IMAGES_DIR, f)).size }))
  res.json(files)
})

app.post('/api/upload/image', requireAuth, memUpload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' })
  const slot     = (req.query.slot || 'image').replace(/[^a-z0-9_-]/gi, '')
  const ext      = path.extname(req.file.originalname).toLowerCase() || '.png'
  const filename = slot + ext
  fs.writeFileSync(path.join(IMAGES_DIR, filename), req.file.buffer)
  res.json({ success: true, filename })
})

app.delete('/api/image/:filename', requireAuth, (req, res) => {
  const fp = path.join(IMAGES_DIR, req.params.filename)
  if (!fs.existsSync(fp)) return res.status(404).json({ error: 'Not found' })
  fs.unlinkSync(fp)
  res.json({ success: true })
})

// ── Video ─────────────────────────────────────────────────────────────────────
const videoUpload = multer({
  storage: multer.diskStorage({
    destination: VIDEOS_DIR,
    filename:    (req, file, cb) => cb(null, 'ats-software-tutorial.mp4'),
  }),
  limits: { fileSize: 500 * 1024 * 1024 },
})

app.get('/api/video/status', requireAuth, (req, res) => {
  const fp = path.join(VIDEOS_DIR, 'ats-software-tutorial.mp4')
  if (fs.existsSync(fp)) {
    res.json({ exists: true, size: fs.statSync(fp).size })
  } else {
    res.json({ exists: false })
  }
})

app.post('/api/upload/video', requireAuth, videoUpload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file received' })
  res.json({ success: true })
})

// ── Messages ──────────────────────────────────────────────────────────────────
const readMsgs  = () => { try { return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8')) } catch { return [] } }
const writeMsgs = msgs => fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2))

app.get('/api/messages', requireAuth, (req, res) => res.json(readMsgs()))

// Public — contact form can post here (no auth needed)
app.post('/api/messages', (req, res) => {
  const msgs = readMsgs()
  msgs.unshift({ id: Date.now().toString(), date: new Date().toISOString(), followedUp: false, notes: '', ...req.body })
  writeMsgs(msgs)
  res.json({ success: true })
})

app.patch('/api/messages/:id', requireAuth, (req, res) => {
  const msgs = readMsgs()
  const idx  = msgs.findIndex(m => m.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
  msgs[idx] = { ...msgs[idx], ...req.body }
  writeMsgs(msgs)
  res.json({ success: true })
})

app.delete('/api/messages/:id', requireAuth, (req, res) => {
  writeMsgs(readMsgs().filter(m => m.id !== req.params.id))
  res.json({ success: true })
})

// ── Build ─────────────────────────────────────────────────────────────────────
app.post('/api/build', requireAuth, (req, res) => {
  exec('npm run build', { cwd: __dirname, timeout: 120000 }, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr || err.message })
    res.json({ success: true, output: stdout.slice(-2000) })
  })
})

app.listen(PORT, () => {
  console.log('\n  AGZUS Admin Panel')
  console.log(`  http://localhost:${PORT}/admin`)
  console.log(`\n  Password: ${ADMIN_PASSWORD}`)
  console.log('  (Change ADMIN_PASSWORD in admin-server.js to set a custom password)\n')
})
