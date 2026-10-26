import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import api from '../../services/api'

const sidebarLinks = [
  { label: 'Overview', icon: '◈', key: 'overview' },
  { label: 'Projects', icon: '✦', key: 'projects' },
  { label: 'Categories', icon: '◎', key: 'categories' },
  { label: 'Inquiries', icon: '✉', key: 'inquiries' },
]

export default function DashboardPage() {
  const [active, setActive] = useState('overview')
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f2f2f2' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        flexShrink: 0,
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
      }}>
        <div style={{ padding: '0 1.5rem 2rem', borderBottom: '1px solid #e0e0e0' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: '#111111' }}>
              <img
              src="/src/assets/nsaart.png"
              alt="nsa.artdesign"
              style={{
                marginLeft: '0.2rem',
                height: '90px',
                justifyContent: 'center',
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%)', // convert jadi hitam
              }}
            />
            </div>
          </Link>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888888', marginTop: '0.25rem', marginLeft: '0.2rem'}}>
            Admin Panel
          </div>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0' }}>
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => setActive(link.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%',
                padding: '0.85rem 1.5rem',
                background: active === link.key ? '#f5f5f5' : 'transparent',
                border: 'none',
                borderLeft: active === link.key ? '2px solid #111111' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
            >
              <span style={{ color: active === link.key ? '#111111' : '#888888', fontSize: '0.9rem' }}>
                {link.icon}
              </span>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 300,
                letterSpacing: '0.05em',
                color: active === link.key ? '#111111' : '#888888',
              }}>
                {link.label}
              </span>
            </button>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#111111', marginBottom: '0.25rem' }}>
            {user?.name}
          </div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            {user?.role?.replace('_', ' ')}
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#888888',
              background: 'transparent',
              border: '1px solid #e0e0e0',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#111111'; e.target.style.color = '#111111' }}
            onMouseLeave={e => { e.target.style.borderColor = '#e0e0e0'; e.target.style.color = '#888888' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>
        {active === 'overview' && <OverviewPanel />}
        {active === 'projects' && <ProjectsPanel />}
        {active === 'categories' && <CategoriesPanel />}
        {active === 'inquiries' && <InquiriesPanel />}
      </main>
    </div>
  )
}

// OVERVIEW
function OverviewPanel() {
  const [stats, setStats] = useState({ projects: 0, categories: 0, inquiries: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proj, cat, inq] = await Promise.all([
          api.get('/projects'),
          api.get('/categories'),
          api.get('/inquiries'),
        ])
        setStats({ projects: proj.data.length, categories: cat.data.length, inquiries: inq.data.length })
      } catch {}
    }
    fetchStats()
  }, [])

  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, color: '#111111', marginBottom: '0.5rem' }}>
        Selamat Datang
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: '#888888', marginBottom: '3rem' }}>
        Kelola konten website nsa.artdesign Studio dari sini.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {[
          { label: 'Total Projects', value: stats.projects, icon: '✦' },
          { label: 'Categories', value: stats.categories, icon: '◎' },
          { label: 'Inquiries', value: stats.inquiries, icon: '✉' },
        ].map((s) => (
          <div key={s.label} style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', padding: '2rem' }}>
            <span style={{ color: '#111111', fontSize: '1.2rem' }}>{s.icon}</span>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', fontWeight: 300, color: '#111111', lineHeight: 1, marginTop: '1rem' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888888', marginTop: '0.5rem' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// PROJECTS
function ProjectsPanel() {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', specifications: '', categoryId: '', status: 'draft' })
  const [images, setImages] = useState([])
  const [saving, setSaving] = useState(false)

  const fetchAll = async () => {
    try {
      const [p, c] = await Promise.all([api.get('/projects'), api.get('/categories')])
      setProjects(p.data)
      setCategories(c.data)
    } catch {} finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      images.forEach((img) => fd.append('images', img))
      await api.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setShowForm(false)
      setForm({ title: '', description: '', specifications: '', categoryId: '', status: 'draft' })
      setImages([])
      fetchAll()
    } catch {} finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus project ini?')) return
    try { await api.delete(`/projects/${id}`); fetchAll() } catch {}
  }

  const inputStyle = { width: '100%', background: '#f2f2f2', border: '1px solid #e0e0e0', padding: '0.75rem', color: '#111111', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', outline: 'none' }
  const labelStyle = { display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888888', marginBottom: '0.5rem' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#111111' }}>Projects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f2f2f2', background: '#111111', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
        >
          {showForm ? 'Batal' : '+ Tambah Project'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', padding: '2rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: '#111111' }}>Project Baru</h3>

          <div>
            <label style={labelStyle}>Judul</label>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Deskripsi</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>Spesifikasi</label>
            <textarea value={form.specifications} onChange={e => setForm(p => ({ ...p, specifications: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Kategori</label>
              <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))} required style={inputStyle}>
                <option value="">Pilih kategori</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={inputStyle}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Foto (maks. 10)</label>
            <input type="file" multiple accept="image/*" onChange={e => setImages(Array.from(e.target.files))} style={{ color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }} />
          </div>

          <button type="submit" disabled={saving} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f2f2f2', background: saving ? '#9a7a50' : '#111111', border: 'none', padding: '0.85rem', cursor: saving ? 'not-allowed' : 'pointer', alignSelf: 'flex-start' }}>
            {saving ? 'Menyimpan...' : 'Simpan Project'}
          </button>
        </form>
      )}

      {loading ? (
        <p style={{ color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>Memuat...</p>
      ) : (
        <div style={{ border: '1px solid #e0e0e0' }}>
          {projects.length === 0 ? (
            <p style={{ padding: '2rem', color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', textAlign: 'center' }}>Belum ada project.</p>
          ) : projects.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 1.5rem', borderBottom: i < projects.length - 1 ? '1px solid #e0e0e0' : 'none', background: '#f5f5f5' }}>
              {p.images?.[0] && (
                <img src={p.images[0].imageUrl} alt="" style={{ width: '60px', height: '45px', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#111111' }}>{p.title}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: '#888888', marginTop: '0.2rem' }}>{p.category?.name}</div>
              </div>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: p.status === 'published' ? '#111111' : '#888888', border: `1px solid ${p.status === 'published' ? '#111111' : '#e0e0e0'}`, padding: '0.25rem 0.75rem' }}>
                {p.status}
              </span>
              <button onClick={() => handleDelete(p.id)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e07070', background: 'transparent', border: '1px solid #e07070', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// CATEGORIES
function CategoriesPanel() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '' })
  const [saving, setSaving] = useState(false)

  const fetchAll = async () => {
    try { const res = await api.get('/categories'); setCategories(res.data) } catch {}
  }

  useEffect(() => { fetchAll() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('/categories', form)
      setForm({ name: '', description: '' })
      fetchAll()
    } catch {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori ini?')) return
    try { await api.delete(`/categories/${id}`); fetchAll() } catch {}
  }

  const inputStyle = { width: '100%', background: '#f2f2f2', border: '1px solid #e0e0e0', padding: '0.75rem', color: '#111111', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', outline: 'none' }
  const labelStyle = { display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888888', marginBottom: '0.5rem' }

  return (
    <div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#111111', marginBottom: '2rem' }}>Categories</h2>

      <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', padding: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Nama Kategori</label>
          <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required style={inputStyle} />
        </div>
        <div style={{ flex: 2 }}>
          <label style={labelStyle}>Deskripsi</label>
          <input type="text" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={inputStyle} />
        </div>
        <button type="submit" disabled={saving} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f2f2f2', background: '#111111', border: 'none', padding: '0.75rem 1.5rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          + Tambah
        </button>
      </form>

      <div style={{ border: '1px solid #e0e0e0' }}>
        {categories.length === 0 ? (
          <p style={{ padding: '2rem', color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', textAlign: 'center' }}>Belum ada kategori.</p>
        ) : categories.map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 1.5rem', borderBottom: i < categories.length - 1 ? '1px solid #e0e0e0' : 'none', background: '#f5f5f5' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#111111' }}>{c.name}</div>
              {c.description && <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: '#888888', marginTop: '0.2rem' }}>{c.description}</div>}
            </div>
            <button onClick={() => handleDelete(c.id)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e07070', background: 'transparent', border: '1px solid #e07070', padding: '0.35rem 0.75rem', cursor: 'pointer' }}>
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// INQUIRIES
function InquiriesPanel() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    try { const res = await api.get('/inquiries'); setInquiries(res.data) } catch {} finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  const handleRead = async (id) => {
    try { await api.patch(`/inquiries/${id}/read`); fetchAll() } catch {}
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus pesan ini?')) return
    try { await api.delete(`/inquiries/${id}`); fetchAll() } catch {}
  }

  return (
    <div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 300, color: '#111111', marginBottom: '2rem' }}>Inquiries</h2>
      {loading ? (
        <p style={{ color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem' }}>Memuat...</p>
      ) : inquiries.length === 0 ? (
        <p style={{ color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', textAlign: 'center', padding: '3rem' }}>Belum ada pesan masuk.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {inquiries.map((inq) => (
            <div key={inq.id} style={{ background: '#f5f5f5', border: `1px solid ${inq.status === 'unread' ? '#111111' : '#e0e0e0'}`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#111111' }}>{inq.name}</div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: '#888888', marginTop: '0.2rem' }}>{inq.email}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: inq.status === 'unread' ? '#111111' : '#888888' }}>
                    {inq.status}
                  </span>
                  {inq.status === 'unread' && (
                    <button onClick={() => handleRead(inq.id)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#111111', background: 'transparent', border: '1px solid #e0e0e0', padding: '0.3rem 0.6rem', cursor: 'pointer' }}>
                      Tandai Dibaca
                    </button>
                  )}
                  <button onClick={() => handleDelete(inq.id)} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e07070', background: 'transparent', border: '1px solid #e07070', padding: '0.3rem 0.6rem', cursor: 'pointer' }}>
                    Hapus
                  </button>
                </div>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.8, color: '#666666' }}>
                {inq.message}
              </p>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: '#888888', marginTop: '1rem' }}>
                {new Date(inq.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
