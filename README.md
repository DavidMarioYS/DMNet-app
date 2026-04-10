

# 🌐 IP DMNet - Professional Network Suite

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

**IP DMNet** adalah aplikasi web komprehensif yang dirancang untuk mempermudah kalkulasi jaringan bagi mahasiswa IT dan Network Engineer. Kini hadir dengan arsitektur **Serverless** untuk performa yang lebih cepat dan handal.

---

## 🚀 Live Preview

Aplikasi dapat diakses secara real-time melalui tautan permanen berikut:
👉 **[https://dm-net-app.vercel.app](https://dm-net-app.vercel.app)**

---

## ✨ Fitur Unggulan

- **🔢 Kalkulator IP Modern:** Analisis lengkap IPv4 dan IPv6 (Network ID, Broadcast, Range Host).
- **⚡ Smart Advisor:** Rekomendasi prefix paling efisien berdasarkan kebutuhan jumlah host.
- **🗺️ Planner Otomatis:** Mendukung pembagian jaringan menggunakan metode **VLSM** dan **FLSM**.
- **💾 Export Data:** Unduh hasil perencanaan jaringan langsung ke format `.csv`.
- **🤖 Asisten AI DMNet:** Chatbot pintar bertenaga **Groq Llama 3.3** yang siap menjawab pertanyaan seputar networking secara instan.
- **🌍 Multi-Bahasa:** Tersedia dalam Bahasa Indonesia dan English.

---

## 🛠️ Stack Teknologi

- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (Modern Glassmorphism UI).
- **Backend:** Node.js (Vercel Serverless Functions).
- **AI Engine:** [Groq Cloud API](https://groq.com/) dengan model `llama-3.3-70b-versatile`.

---

## 🚀 Instalasi Lokal

1. **Clone Repository:**
   ```bash
   git clone [https://github.com/DavidMarioYS/DMNet-app.git](https://github.com/DavidMarioYS/DMNet-app.git)
   ```


2. **Setup API Key:**
   Buat file `.env` dan masukkan key Groq Anda:
   **Code snippet**

   ```
   GROQ_API_KEY=gsk_xxx...
   ```
3. **Run Server:**
   **Bash**

   ```
   npm install
   npm start
   ```

---

## ☁️ Deployment ke Vercel

Proyek ini sudah dikonfigurasi untuk  **Vercel Serverless** :

1. Hubungkan GitHub ke Vercel.
2. Masukkan `GROQ_API_KEY` di tab **Environment Variables** pada dashboard Vercel.
3. Jalur API otomatis terarah ke `/api/ask`.

---

## 👨‍💻 Penulis

Developed with 🩵 by  **David Mario Yohanes** .

```

***

### Langkah Terakhir di Terminal:
Setelah menyimpan file tersebut, jalankan perintah ini agar tampilan di halaman utama GitHub kamu berubah menjadi keren:

```bash
git add README.md
git commit -m "final update: readme professional version"
git push origin main
```
