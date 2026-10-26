import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Tentang', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Kontak', href: '/contact' },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/nsa.artdesign' },
  { label: 'WhatsApp', href: 'https://wa.me/6281234567890' },
  { label: 'Email', href: 'mailto:hello@nsaartdesign.id' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e0e0e0', background: '#f2f2f2' }}>
      {/* Top */}
      <div style={{
        padding: '4rem 3rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '4rem',
      }}>
        {/* Brand */}
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2rem',
              fontWeight: 300,
              color: '#111111',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}>
              nsa.artdesign<span style={{ color: '#111111' }}>.</span>
            </div>
          </Link>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 300,
            lineHeight: 1.9,
            color: '#888888',
            maxWidth: '280px',
          }}>
            Studio desain interior & arsitektur yang merancang ruang bermakna melampaui estetika, mencerminkan jiwa penghuninya.
          </p>
        </div>

        {/* Nav */}
        <div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#111111',
            marginBottom: '1.5rem',
          }}>
            Menu
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  color: '#888888',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { e.target.style.color = '#111111' }}
                onMouseLeave={e => { e.target.style.color = '#888888' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#111111',
            marginBottom: '1.5rem',
          }}>
            Kontak
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  color: '#888888',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { e.target.style.color = '#111111' }}
                onMouseLeave={e => { e.target.style.color = '#888888' }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{
        padding: '1.5rem 3rem',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.72rem',
          color: '#888888',
          letterSpacing: '0.05em',
        }}>
          2026 nsa.artdesign. All rights reserved.
        </span>
        <Link
          to="/admin/login"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#e0e0e0',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => { e.target.style.color = '#888888' }}
          onMouseLeave={e => { e.target.style.color = '#e0e0e0' }}
        >
          Admin
        </Link>
      </div>
    </footer>
  )
}