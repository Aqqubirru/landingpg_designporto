import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ChatBubble from '../../components/common/ChatBubble'

const values = [
  {
    number: '01',
    title: 'Estetika Bermakna',
    desc: 'Kami percaya keindahan bukan sekadar tampilan — setiap elemen hadir dengan tujuan yang memperkuat karakter ruang.',
  },
  {
    number: '02',
    title: 'Detail yang Berbicara',
    desc: 'Keunggulan tersembunyi di detail terkecil. Kami mengerjakan setiap sudut dengan presisi dan kesungguhan.',
  },
  {
    number: '03',
    title: 'Kolaborasi Tulus',
    desc: 'Desain terbaik lahir dari pemahaman mendalam tentang klien. Kami mendengar sebelum merancang.',
  },
]

const teamMember = {
  name: 'Talitha Gilang Sastradiredja',
  role: 'Principal Designer',
  image: 'src/assets/thalita.png',
  bio: [
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum consequuntur iure placeat blanditiis est soluta harum quos labore, sed aliquam.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum consequuntur iure placeat blanditiis est soluta harum quos labore, sed aliquam.',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum consequuntur iure placeat blanditiis est soluta harum quos labore, sed aliquam.',
  ],
}

export default function AboutPage() {
  const lineRef = useRef(null)



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.style.transform = 'scaleX(1)'
        })
      },
      { threshold: 0.5 }
    )
    if (lineRef.current) observer.observe(lineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ background: '#f2f2f2', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar variant="light" />

      {/* ── HERO ── */}
      <section style={{ paddingTop: '5rem', maxWidth: '1200px', margin: '0 auto', padding: '5rem clamp(1.5rem, 5vw, 3rem) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '2rem', height: '1px', background: '#999999' }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#999999' }}>
            Tentang Kami
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '4rem', alignItems: 'end', paddingBottom: '4rem' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: '#111111', lineHeight: 1.12, letterSpacing: '-0.01em', margin: 0 }}>
            Kami Merancang<br />
            <em style={{ fontStyle: 'italic' }}>Pengalaman,</em><br />
            Bukan Sekadar Ruang
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 300, lineHeight: 2, color: '#777777', margin: 0 }}>
            <strong style={{ color: '#333333', fontWeight: 500 }}>nsa.artdesign</strong> adalah studio desain interior yang berdiri sejak xxxx. Kami mengkhususkan diri dalam menciptakan ruang hunian dan komersial yang memadukan fungsi, estetika, dan jiwa — ruang yang benar-benar mencerminkan penghuninya.
          </p>
        </div>

        <div ref={lineRef} style={{ height: '1px', background: 'linear-gradient(to right, #111111, #e8e8e8)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 1.2s ease' }} />
      </section>

      {/* ── IMAGE + DESC ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
              alt="Studio"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', transition: 'transform 0.7s ease' }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)' }}
            />
          </div>
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 300, lineHeight: 2.1, color: '#666666', marginBottom: '1.5rem' }}>
              Kami percaya bahwa setiap ruang memiliki potensi untuk mencerminkan kepribadian dan aspirasi penghuninya. Proses desain kami dimulai dari mendengar — memahami gaya hidup, kebutuhan, dan impian klien.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 300, lineHeight: 2.1, color: '#666666', marginBottom: '1.5rem' }}>
              Dengan pendekatan yang personal dan penuh perhatian terhadap detail, kami menghadirkan solusi desain yang tidak hanya estetis tetapi juga fungsional dan tahan waktu.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 300, lineHeight: 2.1, color: '#666666' }}>
              Setiap proyek adalah kolaborasi erat antara tim kami dan klien — sebuah perjalanan kreatif menuju ruang yang benar-benar bercerita.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: '5rem clamp(1.5rem, 5vw, 3rem)', borderTop: '1px solid #e8e8e8', borderBottom: '1px solid #e8e8e8', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '2rem', height: '1px', background: '#999999' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#999999' }}>
              Prinsip Kami
            </span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: '#111111', marginBottom: '3.5rem', letterSpacing: '-0.01em' }}>
            Nilai yang Kami Pegang
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '3rem' }}>
            {values.map((v) => (
              <div key={v.number}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300, color: '#dddddd', marginBottom: '1rem', lineHeight: 1 }}>
                  {v.number}
                </div>
                <div style={{ width: '1.5rem', height: '1px', background: '#333333', marginBottom: '1.25rem' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: '#111111', marginBottom: '0.85rem' }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', fontWeight: 300, lineHeight: 1.95, color: '#888888' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: '5rem clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '2rem', height: '1px', background: '#999999' }} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#999999' }}>
              Orang di Baliknya
            </span>
          </div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: '#111111', marginBottom: '3.5rem', letterSpacing: '-0.01em' }}>
            Tim Kami
          </h2>

          {/* Single member — foto kiri, bio kanan */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'start' }}>

            {/* Foto */}
            <TeamCard member={teamMember} />

            {/* Bio */}
            <div style={{ paddingTop: '0.5rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: '#111111', marginBottom: '0.4rem', letterSpacing: '-0.01em' }}>
                {teamMember.name}
              </h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999999', marginBottom: '2rem' }}>
                {teamMember.role}
              </p>

              <div style={{ width: '2rem', height: '1px', background: '#cccccc', marginBottom: '2rem' }} />

              {teamMember.bio.map((para, i) => (
                <p key={i} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', fontWeight: 300, lineHeight: 2.1, color: '#666666', marginBottom: i < teamMember.bio.length - 1 ? '1.25rem' : 0 }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#111111', margin: '0', padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 300, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
              Siap memulai proyek Anda?
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
              Kami siap mendengarkan dan mewujudkan visi Anda.
            </p>
          </div>
          <Link
            to="/contact"
            style={{ flexShrink: 0, fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111111', background: '#ffffff', padding: '1rem 2.5rem', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'opacity 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Mulai Konsultasi
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </div>
  )
}

function TeamCard({ member }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ maxWidth: '360px' }}
    >
      <div style={{ overflow: 'hidden', aspectRatio: '3/4', width: '100%', marginBottom: '1.25rem' }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: hovered ? 'brightness(0.85) grayscale(0)' : 'brightness(0.78) grayscale(0.2)',
            transition: 'transform 0.6s ease, filter 0.4s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>
    </div>
  )
}