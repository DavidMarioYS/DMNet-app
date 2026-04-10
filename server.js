require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Melayani file HTML statis
app.use(express.static(__dirname));

// UBAH NAMA JALUR MENJADI /api/ask AGAR LOLOS DARI ADBLOCKER
app.post('/api/ask', async (req, res) => {
    try {
        const userMessage = req.body.pertanyaan;
        const lang = req.body.lang || 'id';
        
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API Key Groq belum disetting!' });
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
                model: 'llama3-8b-8192', // Menggunakan model Groq yang sangat cepat
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
        console.error("Error Backend:", error);
        res.status(500).json({ error: 'Gagal menghubungi AI Groq' });
    }
});

// UBAH KE PORT DINAMIS MILIK RAILWAY
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server MasterHub berjalan di port ${PORT}!`);
});