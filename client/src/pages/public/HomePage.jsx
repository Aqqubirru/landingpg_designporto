import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import api from '../../services/api'
import ChatBubble from '../../components/common/ChatBubble'

export default function HomePage() {
  const heroRef = useRef(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      el.style.transform = `translate(${x}px, ${y}px) scale(1.05)`
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects?status=published')
        setProjects(res.data.slice(0, 3))
      } catch (_e) { void _e }
    }
    fetchProjects()
  }, [])

  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div
          ref={heroRef}
          style={{
            position: 'absolute',
            inset: '-5%',
            backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.1s ease-out',
            filter: 'brightness(0.38)',
          }}
        />
        {/* Multi-layer gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.15) 100%)' }} />
        {/* Bottom fade to white */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08))' }} />

        <div style={{ position: 'relative', zIndex: 10, padding: '0 clamp(1.5rem, 5vw, 5rem)', maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.15s' }}>
            <div style={{ width: '2.5rem', height: '1px', background: 'rgba(255,255,255,0.5)' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
              Design Studio
            </span>
          </div>

          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 1.05, color: '#f2f2f2', marginBottom: '1.75rem', animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.3s', letterSpacing: '-0.01em' }}>
            Ruang yang<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Bercerita</em>
          </h1>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.95, color: 'rgba(255,255,255,0.62)', marginBottom: '2.75rem', maxWidth: '420px', animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.45s' }}>
            Kami merancang interior yang melampaui estetika — setiap detail mencerminkan karakter dan kehidupan penghuninya.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.6s', flexWrap: 'wrap' }}>
            <Link to="/portfolio" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111111', background: '#f2f2f2', padding: '0.95rem 2.25rem', textDecoration: 'none', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0f0f0' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f2f2f2' }}
            >
              Lihat Portfolio
            </Link>
            <Link to="/contact" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.25s ease', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '2px' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f2f2f2' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            >
              Konsultasi Gratis <span>→</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
          <div style={{ width: '1px', height: '2.5rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)', animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── HERO → CONTENT TRANSITION ── */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #e0e0e0 30%, #e0e0e0 70%, transparent)' }} />

      {/* ── STATS ── */}
      <section style={{ padding: '4rem 3rem', background: '#f2f2f2' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { number: '150+', label: 'Proyek Selesai' },
            { number: '8+', label: 'Tahun Pengalaman' },
            { number: '98%', label: 'Klien Puas' },
          ].map((stat, i) => (
            <div key={stat.label} style={{ textAlign: 'center', padding: '2rem 1rem', borderRight: i < 2 ? '1px solid #eeeeee' : 'none' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 300, color: '#111111', lineHeight: 1, marginBottom: '0.5rem' }}>
                {stat.number}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaaaaa', fontWeight: 400 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section style={{ padding: '5rem clamp(1.5rem, 5vw, 3rem) 6rem', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaaaaa', fontWeight: 400, marginBottom: '0.6rem' }}>
              Karya Terbaru
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#111111', lineHeight: 1.1 }}>
              Portfolio Pilihan
            </h2>
          </div>
          <Link to="/portfolio" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999999', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.25s ease', borderBottom: '1px solid #dddddd', paddingBottom: '2px' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#111111'; e.currentTarget.style.borderBottomColor = '#111111' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#999999'; e.currentTarget.style.borderBottomColor = '#dddddd' }}
          >
            Lihat Semua <span>→</span>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#aaaaaa', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontStyle: 'italic' }}>
            Belum ada proyek yang dipublikasikan.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: projects.length === 1 ? '1fr' : projects.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr', gap: '1.25rem' }}>
            {projects.map((project, i) => (
              <PreviewCard key={project.id} project={project} featured={i === 0} />
            ))}
          </div>
        )}
      </section>

      {/* ── ABOUT TEASER ── */}
      <section style={{ padding: '6rem clamp(1.5rem, 5vw, 3rem)', background: '#f2f2f2' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(2rem, 6vw, 5rem)', alignItems: 'center', maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaaaaa', fontWeight: 400, marginBottom: '0.8rem' }}>
              Tentang Kami
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300, color: '#111111', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Lebih dari Sekadar<br />
              <em style={{ fontStyle: 'italic' }}>Desain Interior</em>
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 2, color: '#888888', marginBottom: '2.25rem' }}>
              Sejak xxxx, nsa.artdesign telah merancang lebih dari 150 ruang yang mencerminkan identitas dan aspirasi klien kami di seluruh Indonesia.
            </p>
            <Link to="/about" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #111111', paddingBottom: '2px', transition: 'opacity 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.6' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Kenali Kami <span>→</span>
            </Link>
          </div>

          {/* Image with bottom fade */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                alt="About nsa.artdesign"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', filter: 'brightness(0.92)' }}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.target.style.transform = 'scale(1)' }}
              />
            </div>
            {/* Bottom gradient fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.85))' }} />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: '#111111', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem' }}>
            Mulai Sekarang
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontWeight: 300, color: '#f2f2f2', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            Siap Mewujudkan Ruang<br />Impian Anda?
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.45)', marginBottom: '3rem', maxWidth: '380px', margin: '0 auto 3rem', lineHeight: 2 }}>
            Konsultasi awal gratis. Ceritakan visi Anda, kami wujudkan.
          </p>
          <Link to="/contact" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111111', background: '#f2f2f2', padding: '1.1rem 2.75rem', textDecoration: 'none', transition: 'all 0.25s ease', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e8e8e8' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f2f2f2' }}
          >
            Konsultasi Gratis
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBubble />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
        @media (max-width: 640px) {
          section[data-stats] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function PreviewCard({ project, featured }) {
  const [hovered, setHovered] = useState(false)
  const cover = project.images?.[0]?.imageUrl

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: featured ? '4/3' : '3/2', background: '#eeeeee', cursor: 'pointer' }}>
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#eeeeee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#cccccc', fontSize: '3rem', fontFamily: 'Cormorant Garamond, serif' }}>✦</span>
          </div>
        )}

        {/* Permanent subtle bottom gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)', transition: 'opacity 0.4s ease', opacity: hovered ? 1 : 0.7 }} />

        {/* Bottom fade to white — gradasi ke bawah */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, transparent, rgba(250,250,250,0.12))', pointerEvents: 'none' }} />

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'transform 0.4s ease' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '0.35rem' }}>
            {project.category?.name}
          </div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 300, color: '#f2f2f2', lineHeight: 1.2 }}>
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}