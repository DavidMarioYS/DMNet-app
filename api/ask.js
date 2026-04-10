// File: api/ask.js
const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
    // Vercel Serverless hanya menerima request POST untuk chatbot ini
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const userMessage = req.body.pertanyaan;
        const lang = req.body.lang || 'id';
        
        // Mengambil API Key dari Environment Variable Vercel
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API Key Groq belum disetting di Vercel!' });
        }

        const url = 'https://api.groq.com/openai/v1/chat/completions';
        const sysLang = lang === 'id' ? 'bahasa Indonesia' : 'English';
        const systemPrompt = `Kamu adalah asisten virtual 'MasterHub Bot'. Tugasmu membantu pengguna belajar jaringan komputer, IP Address, Subnetting, VLSM, dan FLSM. Jawab ramah, sangat ringkas. Tolak pertanyaan di luar IT. Jawab dalam ${sysLang}.`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile', 
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const replyText = data.choices[0].message.content;
        res.status(200).json({ jawaban: replyText });

    } catch (error) {
        console.error("Error Backend Vercel:", error);
        res.status(500).json({ error: 'Gagal menghubungi AI Groq' });
    }
};