import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ChatBubble from '../../components/common/ChatBubble'
import api from '../../services/api'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${slug}`)
        setProject(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  useEffect(() => {
    setImgLoaded(false)
  }, [activeImage])

  if (loading) return (
    <div style={{ background: '#111111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', letterSpacing: '0.05em' }}>
        Memuat...
      </span>
    </div>
  )

  if (!project) return (
    <div style={{ background: '#111111', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
        Proyek tidak ditemukan.
      </span>
    </div>
  )

  const images = project.images || []

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar variant="dark" />

      {/* ── FULL BLEED HERO ── */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#111111' }}>
        {images[activeImage] ? (
          <img
            key={activeImage}
            src={images[activeImage].imageUrl}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.5)',
              transition: 'opacity 0.6s ease',
              opacity: imgLoaded ? 1 : 0,
            }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#222222' }} />
        )}

        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)' }} />

        {/* Back */}
        <div style={{ position: 'absolute', top: '5.5rem', left: 'clamp(1.5rem, 5vw, 4rem)', zIndex: 10 }}>
          <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >
            ← Portfolio
          </Link>
        </div>

        {/* Title */}
        <div style={{ position: 'absolute', bottom: 'clamp(2.5rem, 5vw, 4.5rem)', left: 'clamp(1.5rem, 5vw, 4rem)', right: 'clamp(1.5rem, 5vw, 4rem)', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '2rem', height: '1px', background: 'rgba(255,255,255,0.45)' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.66rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
              {project.category?.name}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.01em', maxWidth: '750px', marginBottom: '1.5rem' }}>
            {project.title}
          </h1>

          {/* Thumbnail dots / strip — inside hero bottom */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: '72px', height: '48px', padding: 0,
                    border: '2px solid',
                    borderColor: activeImage === i ? '#ffffff' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer', overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    opacity: activeImage === i ? 1 : 0.5,
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { if (activeImage !== i) e.currentTarget.style.opacity = '0.8' }}
                  onMouseLeave={e => { if (activeImage !== i) e.currentTarget.style.opacity = '0.5' }}
                >
                  <img src={img.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(3rem, 8vw, 7rem)', alignItems: 'start' }}>

          {/* Left */}
          <div>
            {/* Meta info bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid #eeeeee', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbbbbb', marginBottom: '0.3rem' }}>Kategori</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 400, color: '#333333' }}>{project.category?.name}</div>
              </div>
              <div style={{ width: '1px', height: '2rem', background: '#eeeeee' }} />
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbbbbb', marginBottom: '0.3rem' }}>Oleh</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 400, color: '#333333' }}>nsa.artdesign</div>
              </div>
            </div>

            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#111111', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
              Tentang Proyek
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 2.1, color: '#666666', whiteSpace: 'pre-wrap' }}>
              {project.description || 'Tidak ada deskripsi.'}
            </p>

            {project.specifications && (
              <>
                <div style={{ width: '3rem', height: '1px', background: '#dddddd', margin: '3rem 0 2.5rem' }} />
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#111111', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
                  Spesifikasi
                </h2>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 2.1, color: '#666666', whiteSpace: 'pre-wrap' }}>
                  {project.specifications}
                </p>
              </>
            )}

            {/* Image grid jika ada lebih dari 1 foto */}
            {images.length > 1 && (
              <>
                <div style={{ width: '3rem', height: '1px', background: '#dddddd', margin: '3rem 0 2.5rem' }} />
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#111111', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
                  Galeri
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '0.75rem' }}>
                  {images.map((img, i) => (
                    <div
                      key={img.id}
                      onClick={() => { setActiveImage(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', border: activeImage === i ? '2px solid #111111' : '2px solid transparent', transition: 'border-color 0.2s ease' }}
                    >
                      <img src={img.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => { e.target.style.transform = 'scale(1.05)' }}
                        onMouseLeave={e => { e.target.style.transform = 'scale(1)' }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right — CTA */}
          <div style={{ position: 'sticky', top: '5.5rem' }}>
            <div style={{ background: '#111111', padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 300, color: '#ffffff', marginBottom: '0.85rem', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                Tertarik dengan proyek seperti ini?
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', marginBottom: '2rem' }}>
                Konsultasikan kebutuhan desain Anda bersama tim kami secara gratis.
              </p>
              <Link
                to="/contact"
                style={{ display: 'block', textAlign: 'center', fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111111', background: '#ffffff', padding: '1rem', textDecoration: 'none', transition: 'opacity 0.2s ease', marginBottom: '0.85rem' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                Konsultasi Gratis
              </Link>
              <Link
                to="/portfolio"
                style={{ display: 'block', textAlign: 'center', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', padding: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
              >
                ← Kembali ke Portfolio
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f8f8f8', border: '1px solid #eeeeee' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '✦', text: 'Konsultasi awal 100% gratis' },
                  { icon: '◎', text: 'Tim berpengalaman 8+ tahun' },
                  { icon: '✉', text: 'Respon dalam 1x24 jam' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.9rem', color: '#aaaaaa', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#666666' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </div>
  )
}