import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Tentang', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Kontak', href: '/contact' },
]

export default function Navbar({ variant = 'dark' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setMenuOpen(false), 0)
    return () => clearTimeout(timer)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Warna teks: saat scroll selalu putih (bg hitam), saat atas tergantung variant
  const linkColor = scrolled
    ? 'rgba(255,255,255,0.65)'
    : variant === 'light' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.65)'

  const linkColorActive = scrolled
    ? '#f2f2f2'
    : variant === 'light' ? '#111111' : '#f2f2f2'

  // CTA button: saat scroll putih/hitam, saat atas tergantung variant
  const ctaBg = scrolled
    ? '#f2f2f2'
    : variant === 'light' ? '#111111' : '#f2f2f2'

  const ctaColor = scrolled
    ? '#111111'
    : variant === 'light' ? '#f2f2f2' : '#111111'

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        padding: '0 3rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.35s ease',
        background: scrolled ? 'rgba(17,17,17,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img
            src="/src/assets/nsaart.png"
            alt="nsa.artdesign"
            style={{
              height: '60px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              // Kalau logo putih: invert jadi hitam saat variant light & belum scroll
              filter: scrolled || variant === 'dark' ? 'none' : 'invert(1)',
              transition: 'filter 0.3s ease',
              marginTop: '10px',
              marginBottom: '5px'
            }}
          />
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: '#f2f2f2', letterSpacing: '0.05em', filter: scrolled || variant === 'dark' ? 'none' : 'invert(1)'}}>
            nsa.artdesign
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? linkColorActive : linkColor,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  borderBottom: isActive ? `1px solid ${linkColorActive}` : '1px solid transparent',
                  paddingBottom: '2px',
                }}
              >
                {link.label}
              </Link>
            )
          })}

          <Link
            to="/contact"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.74rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: ctaColor,
              background: ctaBg,
              padding: '0.55rem 1.4rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: `1px solid ${ctaBg}`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            Konsultasi Gratis
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: scrolled ? '#f2f2f2' : variant === 'light' ? '#111111' : '#f2f2f2',
              transition: 'all 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)' : 'none'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: '#111111',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: menuOpen ? 'all' : 'none',
      }}>
        {navLinks.map((link) => (
          <Link key={link.href} to={link.href} style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2.5rem',
            fontWeight: 300,
            color: '#f2f2f2',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact" style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#111111',
          background: '#f2f2f2',
          padding: '0.8rem 2rem',
          textDecoration: 'none',
          marginTop: '1rem',
        }}>
          Konsultasi Gratis
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}