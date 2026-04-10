require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Melayani file HTML statis
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.pertanyaan;
        const lang = req.body.lang || 'id';
        
        // MENGAMBIL API KEY GROQ DARI FILE .env
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API Key Groq belum disetting di file .env!' });
        }

        // Endpoint resmi Groq
        const url = 'https://api.groq.com/openai/v1/chat/completions';
        const sysLang = lang === 'id' ? 'bahasa Indonesia' : 'English';
        const systemPrompt = `Kamu adalah asisten virtual 'DMNet Bot'. Tugasmu membantu pengguna belajar jaringan komputer, IP Address, Subnetting, VLSM, dan FLSM. Jawab ramah, sangat ringkas. Tolak pertanyaan di luar IT. Jawab dalam ${sysLang}.`;

        // Format Request khusus Groq / OpenAI
        const response = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Autentikasi Groq
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant', 
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });

        const data = await response.json();
        
        // Menangkap error dari Groq (jika ada)
        if (data.error) throw new Error(data.error.message);

        // Parsing jawaban dari struktur JSON Groq
        const replyText = data.choices[0].message.content;
        
        res.status(200).json({ jawaban: replyText });

    } catch (error) {
        console.error("Error Backend:", error);
        res.status(500).json({ error: 'Gagal menghubungi AI Groq' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server DMNet (Powered by Groq Llama 3) berjalan dengan aman!`);
    console.log(`➡️  Buka browser dan kunjungi: http://localhost:${PORT}/cal-ip.html`);
});