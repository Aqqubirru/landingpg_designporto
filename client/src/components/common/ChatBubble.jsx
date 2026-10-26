import { useState, useRef, useEffect } from 'react'
import api from '../../services/api'

const ADMIN_WA = '6281234567890' // ganti nomor WA admin disini

export default function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(null) // null | 'chat' | 'contact'
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Ada yang ingin kamu tanyakan seputar desain interior di tim kami? Aku siap membantu 😊' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const sessionId = useRef(`session-`)
    useEffect(() => {
    sessionId.current = `session-${Date.now()}`
    }, [])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => setMode(null), 300)
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await api.post('/chatbot', {
        sessionId: sessionId.current,
        message: userMsg,
      })
      setMessages(prev => [...prev, { from: 'bot', text: res.data.response }])
      if (res.data.escalated) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            from: 'bot',
            text: 'Untuk pertanyaan ini, lebih baik kamu hubungi admin kami langsung ya!',
            action: 'wa'
          }])
        }, 500)
      }
    } catch {
      setMessages(prev => [...prev, {
        from: 'bot',
        text: 'Maaf, sepertinya ada gangguan. Coba hubungi admin kami langsung ya!'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const waUrl = `https://wa.me/${ADMIN_WA}?text=Halo, saya tertarik dengan jasa desain nsa.artdesign`

  return (
    <>
      {/* Bubble button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#111111',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(201,169,110,0.4)',
          transition: 'transform 0.3s ease, background 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f2f2f2" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Modal popup */}
      <div style={{
        position: 'fixed',
        bottom: '5.5rem',
        right: '2rem',
        zIndex: 99,
        width: '320px',
        background: '#f5f5f5',
        border: '1px solid #e0e0e0',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        transition: 'all 0.3s ease',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
        pointerEvents: open ? 'all' : 'none',
        transformOrigin: 'bottom right',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111111', flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', color: '#111111', fontWeight: 300 }}>
              nsa.artdesign assistant
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: '#888888', letterSpacing: '0.1em' }}>
              Siap membantu Anda
            </div>
          </div>
        </div>

        {/* Content */}
        {!mode ? (
          // Main menu
          <div style={{ padding: '1.25rem' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#666666', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Halo! Ada yang bisa kami bantu? Pilih salah satu opsi di bawah:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Option 1 - Chat AI */}
              <button
                onClick={() => setMode('chat')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f2f2f2',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#111111' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0' }}
              >
                <div style={{ width: '36px', height: '36px', background: '#f5f5f5', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#111111', marginBottom: '0.2rem' }}>
                    Tanya Seputar Desain
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: '#888888', fontWeight: 300 }}>
                    Dijawab oleh AI Assistant
                  </div>
                </div>
              </button>

              {/* Option 2 - WA Admin */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f2f2f2',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#25d366' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0' }}
              >
                <div style={{ width: '36px', height: '36px', background: '#f5f5f5', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#111111', marginBottom: '0.2rem' }}>
                    Hubungi Admin
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: '#888888', fontWeight: 300 }}>
                    Chat langsung via WhatsApp
                  </div>
                </div>
              </a>
            </div>
          </div>
        ) : mode === 'chat' ? (
          // Chat mode
          <div style={{ display: 'flex', flexDirection: 'column', height: '380px' }}>
            {/* Back button */}
            <button
              onClick={() => setMode(null)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', background: 'transparent', border: 'none', borderBottom: '1px solid #e0e0e0', cursor: 'pointer', color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              ← Kembali
            </button>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '0.6rem 0.9rem',
                    background: msg.from === 'user' ? '#111111' : '#f2f2f2',
                    border: msg.from === 'user' ? 'none' : '1px solid #e0e0e0',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: msg.from === 'user' ? '#f2f2f2' : '#111111',
                  }}>
                    {msg.text}
                    {msg.action === 'wa' && (
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '0.5rem', color: '#25d366', fontSize: '0.75rem', fontWeight: 400 }}>
                        Chat via WhatsApp →
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{ padding: '0.6rem 0.9rem', background: '#f2f2f2', border: '1px solid #e0e0e0', color: '#888888', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    Mengetik...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.75rem', borderTop: '1px solid #e0e0e0', display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pertanyaan..."
                style={{
                  flex: 1,
                  background: '#f2f2f2',
                  border: '1px solid #e0e0e0',
                  padding: '0.6rem 0.75rem',
                  color: '#111111',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{
                  background: input.trim() ? '#111111' : '#e0e0e0',
                  border: 'none',
                  padding: '0.6rem 0.9rem',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#f2f2f2' : '#888888'} strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}