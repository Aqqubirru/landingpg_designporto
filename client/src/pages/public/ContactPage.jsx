import { useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ChatBubble from '../../components/common/ChatBubble'
import api from '../../services/api'

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #d8d8d8',
  padding: '0.75rem 0',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.88rem',
  fontWeight: 300,
  color: '#111111',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle = {
  display: 'block',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '0.63rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#999999',
  marginBottom: '0.5rem',
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      await api.post('/inquiries', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh' }}>
      <Navbar variant="light" />

      {/* ── HEADER ── */}
      <section style={{ paddingTop: '5rem', background: '#f2f2f2' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem clamp(1.5rem, 5vw, 3rem) 3rem', borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '2rem', height: '1px', background: '#999999' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#999999' }}>
              Hubungi Kami
            </span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#111111', lineHeight: 1.1, maxWidth: '650px', letterSpacing: '-0.01em' }}>
            Mari Wujudkan{' '}
            <em style={{ fontStyle: 'italic' }}>Ruang Impian</em>{' '}
            Anda
          </h1>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem clamp(1.5rem, 5vw, 3rem) 6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>

        {/* Left */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 2, color: '#777777', marginBottom: '2.5rem' }}>
            Konsultasi awal kami lakukan secara{' '}
            <strong style={{ color: '#111111', fontWeight: 500 }}>gratis</strong>.
            Ceritakan kebutuhan dan visi Anda — tim kami akan menghubungi dalam 1x24 jam.
          </p>

          {/* Contact items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { icon: '◎', label: 'Lokasi', value: 'Bandung, Jawa Barat' },
              { icon: '✉', label: 'Email', value: 'hello@nsaart.id' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: '1.25rem 0',
                borderBottom: '1px solid #e0e0e0',
                borderTop: i === 0 ? '1px solid #e0e0e0' : 'none',
              }}>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: '#555555', flexShrink: 0, marginTop: '2px' }}>
                  {item.icon}
                </span>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#aaaaaa', marginBottom: '0.3rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: '#222222', fontWeight: 300 }}>
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat hint */}
          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', background: '#111111' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
              Butuh jawaban cepat?{' '}
              <span style={{ color: '#ffffff', fontWeight: 400 }}>Gunakan chat bubble</span>{' '}
              di pojok kanan bawah untuk tanya langsung atau hubungi admin via WhatsApp.
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ background: '#ffffff', padding: 'clamp(2rem, 4vw, 3rem)', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#111111', marginBottom: '2rem', letterSpacing: '-0.01em' }}>
            Kirim Pesan
          </h2>

          {status === 'success' ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', border: '1px solid #e8e8e8' }}>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: '#111111', marginBottom: '1rem', lineHeight: 1 }}>✦</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 300, color: '#111111', marginBottom: '0.75rem' }}>
                Pesan Terkirim!
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: '#888888', fontWeight: 300, marginBottom: '2rem', lineHeight: 1.9 }}>
                Tim kami akan menghubungi Anda dalam 1x24 jam.
              </p>
              <button
                onClick={() => setStatus(null)}
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#111111', background: 'transparent', border: '1px solid #111111', padding: '0.75rem 1.5rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#ffffff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#111111' }}
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <label style={labelStyle}>Nama Lengkap</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="John Doe" required style={inputStyle}
                  onFocus={e => { e.target.style.borderBottomColor = '#111111' }}
                  onBlur={e => { e.target.style.borderBottomColor = '#d8d8d8' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Alamat Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="john@example.com" required style={inputStyle}
                  onFocus={e => { e.target.style.borderBottomColor = '#111111' }}
                  onBlur={e => { e.target.style.borderBottomColor = '#d8d8d8' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Pesan</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Ceritakan kebutuhan desain Anda — ruang apa, ukuran, gaya yang diinginkan, atau pertanyaan lainnya..."
                  required rows={6} style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => { e.target.style.borderBottomColor = '#111111' }}
                  onBlur={e => { e.target.style.borderBottomColor = '#d8d8d8' }}
                />
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: '#d05050', marginTop: '-0.5rem' }}>
                  Terjadi kesalahan. Silakan coba lagi.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#f2f2f2',
                  background: status === 'loading' ? '#666666' : '#111111',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  alignSelf: 'flex-start',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.opacity = '0.75' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan →'}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </div>
  )
}