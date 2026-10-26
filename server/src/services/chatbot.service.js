const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = require('../utils/prisma');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `Kamu adalah asisten virtual untuk perusahaan desain interior dan arsitektur. 
Tugasmu adalah menjawab pertanyaan umum seputar jasa desain, portofolio, dan proses kerja perusahaan.
Jawab dengan ramah, profesional, dan singkat dalam Bahasa Indonesia.

Jika ada pertanyaan tentang:
- Harga spesifik / estimasi biaya detail
- Negosiasi harga
- Kontrak atau perjanjian
- Pertanyaan yang sangat teknis dan spesifik tentang proyek tertentu
Maka katakan bahwa kamu tidak bisa menjawab pertanyaan tersebut dan arahkan mereka untuk menghubungi admin langsung melalui kontak yang tersedia di halaman kontak website.

Jangan pernah memberikan angka harga spesifik.`;

const chat = async ({ sessionId, message }) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent([
    { text: SYSTEM_PROMPT },
    { text: message },
  ]);

  const botResponse = result.response.text();

  // Deteksi apakah perlu eskalasi ke admin
  const escalationKeywords = ['harga', 'biaya', 'budget', 'nego', 'kontrak', 'bayar', 'dp', 'cicil'];
  const escalated = escalationKeywords.some((kw) => message.toLowerCase().includes(kw));

  // Simpan log
  await prisma.chatbotLog.create({
    data: { sessionId, userMessage: message, botResponse, escalated },
  });

  return { response: botResponse, escalated };
};

module.exports = { chat };