import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ChatBubble from '../../components/common/ChatBubble'
import api from '../../services/api'

export default function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, catRes] = await Promise.all([
          api.get('/projects?status=published'),
          api.get('/categories'),
        ])
        setProjects(projRes.data)
        setCategories(catRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category.slug === activeCategory)

  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
      <Navbar variant="light" />

      {/* ── HEADER ── */}
      <section style={{ paddingTop: '5rem', paddingBottom: 0, background: '#f2f2f2' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem clamp(1.5rem, 5vw, 3rem) 0' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '2rem', height: '1px', background: '#999999' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#999999', fontWeight: 400 }}>
              Karya Kami
            </span>
          </div>

          {/* Title + desc side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '2rem', alignItems: 'end', paddingBottom: '2.5rem', borderBottom: '1px solid #e0e0e0' }}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 300, color: '#111111', lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0 }}>
              Portfolio
            </h1>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#777777', maxWidth: '380px', lineHeight: 1.95, fontWeight: 300, margin: 0 }}>
              Setiap proyek adalah sebuah perjalanan — dari konsep hingga ruang yang menghidupkan cerita penghuninya.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER ── */}
      <section style={{ background: '#f2f2f2', position: 'sticky', top: '64px', zIndex: 30, borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem clamp(1.5rem, 5vw, 3rem)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[{ id: 'all', name: 'Semua' }, ...categories].map((cat) => {
              const isActive = activeCategory === (cat.slug || 'all')
              return (
                <button
                  key={cat.id || 'all'}
                  onClick={() => setActiveCategory(cat.slug || 'all')}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.45rem 1.1rem',
                    border: '1px solid',
                    borderColor: isActive ? '#111111' : '#cccccc',
                    background: isActive ? '#111111' : 'transparent',
                    color: isActive ? '#f2f2f2' : '#777777',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = '#888888'; e.currentTarget.style.color = '#333333' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = '#cccccc'; e.currentTarget.style.color = '#777777' } }}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section style={{ padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)', maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#bbbbbb', fontStyle: 'italic' }}>
              Memuat karya...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#bbbbbb', fontStyle: 'italic' }}>
              Belum ada proyek di kategori ini.
            </span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
      <ChatBubble />
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const cover = project.images?.[0]?.imageUrl

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: index % 3 === 0 ? '4/5' : '3/2', background: '#e0e0e0', cursor: 'pointer' }}>
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#cccccc', fontSize: '3rem', fontFamily: 'Cormorant Garamond, serif' }}>✦</span>
          </div>
        )}

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 50%, transparent 75%)', transition: 'opacity 0.4s ease', opacity: hovered ? 1 : 0.6 }} />

        {/* Info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem 1.5rem', transform: hovered ? 'translateY(0)' : 'translateY(5px)', transition: 'transform 0.4s ease' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '0.3rem' }}>
            {project.category?.name}
          </div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 300, color: '#ffffff', lineHeight: 1.2, marginBottom: '0.4rem' }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
              Lihat Detail
            </span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>→</span>
          </div>
        </div>
      </div>

      {/* Caption below image */}
      <div style={{ padding: '0.85rem 0.25rem 1.25rem', borderBottom: '1px solid #e4e4e4' }}>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#aaaaaa', marginBottom: '0.25rem' }}>
          {project.category?.name}
        </div>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 300, color: '#222222', transition: 'opacity 0.2s ease', opacity: hovered ? 0.6 : 1 }}>
          {project.title}
        </h3>
      </div>
    </Link>
  )
}