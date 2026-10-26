import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import useAuthStore from '../../store/authStore'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/login', form)
      setAuth(res.data.token, res.data.user)
      navigate('/admin/dashboard')
    } catch {
      setError('Email atau password salah.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#f2f2f2',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Left decorative */}
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '40%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3)',
      }} />

      {/* Form */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        marginLeft: '40%',
        width: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo */}
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2rem',
            fontWeight: 300,
            color: '#111111',
            marginBottom: '0.5rem',
            letterSpacing: '0.05em',
          }}>
            <img
              src="/src/assets/nsaart.png"
              alt="nsa.artdesign"
              style={{
                height: '90px',
                justifyContent: 'center',
                objectFit: 'contain',
                filter: 'brightness(0) saturate(100%)', // convert jadi hitam
              }}
            />
          </div>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#888888',
            marginBottom: '3rem',
          }}>
            Admin Panel
          </p>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2.2rem',
            fontWeight: 300,
            color: '#111111',
            marginBottom: '2.5rem',
          }}>
            Masuk ke Dashboard
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '0.6rem',
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  padding: '0.75rem 0',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: '#111111',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={e => { e.target.style.borderBottomColor = '#111111' }}
                onBlur={e => { e.target.style.borderBottomColor = '#e0e0e0' }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '0.6rem',
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  padding: '0.75rem 0',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: '#111111',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={e => { e.target.style.borderBottomColor = '#111111' }}
                onBlur={e => { e.target.style.borderBottomColor = '#e0e0e0' }}
              />
            </div>

            {error && (
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.8rem',
                color: '#e07070',
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f2f2f2',
                background: loading ? '#9a7a50' : '#111111',
                border: 'none',
                padding: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: '0.5rem',
                transition: 'background 0.3s ease',
              }}
            >
              {loading ? 'Memuat...' : 'Masuk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}