

# 🌐 IP DMNet - Professional Network Suite

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**IP DMNet** (sebelumnya IP MasterHub) adalah aplikasi web komprehensif yang dirancang khusus untuk mahasiswa IT, pelajar, dan teknisi jaringan (Network Engineer). Aplikasi ini menyediakan berbagai alat mulai dari kalkulator jaringan presisi hingga asisten AI (Artificial Intelligence) untuk membantu memecahkan masalah seputar pengalamatan IP.

---

## 🚀 Live Preview

Anda dapat langsung mencoba dan menggunakan aplikasi ini secara online melalui tautan berikut:
👉 **[dmnet-app-production.up.railway.app/cal-ip.html](https://dmnet-app-production.up.railway.app/cal-ip.html)**

---

## ✨ Fitur Utama

- **🔢 Kalkulator IP Presisi (IPv4 & IPv6)**
  Analisis jaringan lengkap yang menampilkan Network ID, Broadcast, Subnet Mask, dan Range Usable Host. Telah mendukung perhitungan skalabilitas tinggi IPv6 (BigInt).
- **✨ Smart Advisor**
  Sistem cerdas yang dapat merekomendasikan Prefix (Subnet Mask) paling efisien berdasarkan jumlah host yang dibutuhkan, lengkap dengan visualisasi persentase efisiensi IP.
- **⚡ VLSM Planner (Variable Length Subnet Mask)**
  Kalkulator otomatis untuk merancang arsitektur jaringan berbagai divisi tanpa membuang-buang (waste) IP.
- **🗂️ FLSM Divider (Fixed Length Subnet Mask)**
  Pemecah jaringan utama menjadi beberapa subnet dengan ukuran yang sama rata.
- **💾 Export to CSV**
  Setiap hasil tabel VLSM dan FLSM dapat langsung diunduh dalam format `.csv` untuk laporan atau dokumentasi topologi jaringan.
- **📖 Ensiklopedia Jaringan**
  Modul edukasi terintegrasi yang menjelaskan teori dasar IP, Anatomi Subnetting, IP Khusus (Loopback, APIPA), Protokol (DNS, DHCP, NAT), dan studi kasus dunia nyata.
- **🤖 Asisten AI DMNet (Powered by Groq Llama-3)**
  Chatbot pintar yang terintegrasi di pojok layar untuk menjawab segala pertanyaan seputar jaringan komputer secara instan (*real-time*).
- **🌍 Dukungan Bilingual**
  Sistem dapat diubah bahasanya antara Bahasa Indonesia dan Bahasa Inggris dengan sekali klik.

---

## 🛠️ Teknologi yang Digunakan

**Frontend:**

- HTML5 & CSS3
- Vanilla JavaScript
- [Tailwind CSS](https://tailwindcss.com/) (via CDN) untuk UI/UX modern ala *glassmorphism*.
- Font: *Plus Jakarta Sans* (Google Fonts).

**Backend & API:**

- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (Menangani *routing* dan komunikasi API aman).
- [Groq API](https://groq.com/) (Menggunakan model AI `llama3-8b-8192` yang super cepat).

---

## 🚀 Cara Instalasi & Menjalankan di Komputer Lokal

Jika Anda ingin menjalankan atau mengembangkan proyek ini di komputer Anda sendiri, ikuti langkah-langkah berikut:

### Prasyarat

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### Langkah-langkah

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/DavidMarioYS/DMNet-app.git](https://github.com/DavidMarioYS/DMNet-app.git)
   cd DMNet-app
   ```


2. **Instal dependensi (library backend):**
   **Bash**

```
   npm install
```

3. **Atur API Key rahasia:**
   Buat sebuah file bernama `.env` di direktori utama proyek, lalu tambahkan API Key Groq Anda:
   **Code snippet**

   ```
   GROQ_API_KEY=gsk_masukkan_api_key_groq_anda_disini
   ```
4. **Jalankan Server:**
   **Bash**

   ```
   npm start
   ```
5. Buka browser web dan kunjungi:
   👉 `http://localhost:3000/cal-ip.html`

---

## ☁️ Panduan Deployment (Hosting)

Proyek ini telah dikonfigurasi agar siap di-*deploy* ke layanan hosting Node.js seperti  **Railway** , Render, atau Vercel.

**Untuk Railway:**

1. Hubungkan akun GitHub Anda ke [Railway](https://railway.app/).
2. Buat proyek baru -> *Deploy from GitHub Repo* -> Pilih `DMNet-app`.
3. Masuk ke menu Service -> Tab **Variables** -> Tambahkan:
   * `GROQ_API_KEY` : `[isi dengan API Key Anda]`
4. Masuk ke tab **Settings** -> **Networking** -> Klik  *Generate Domain* .
5. Aplikasi Anda akan hidup secara otomatis.

---

## 🔒 Catatan Keamanan

File `.env` yang berisi *API Key* **TIDAK BOLEH** di-*commit* atau di-push ke GitHub demi keamanan akun Anda. Proyek ini sudah menyertakan konfigurasi `.gitignore` yang secara otomatis mengabaikan file `.env` dan folder `node_modules/`.

---

## 👨‍💻 Penulis

Dikembangkan dengan 🩵 oleh  **David Mario Yohanes** .

```

```

2. **Instal dependensi (library backend):**
   **Bash**

   ```
   npm install
   ```
3. **Atur API Key rahasia:**
   Buat sebuah file bernama `.env` di direktori utama proyek, lalu tambahkan API Key Groq Anda:
   **Code snippet**

   ```
   GROQ_API_KEY=gsk_masukkan_api_key_groq_anda_disini
   ```
4. **Jalankan Server:**
   **Bash**

   ```
   npm start
   ```
5. Buka browser web dan kunjungi:
   👉 `http://localhost:3000/cal-ip.html`

---

## ☁️ Panduan Deployment (Hosting)

Proyek ini telah dikonfigurasi agar siap di-*deploy* ke layanan hosting Node.js seperti  **Railway** , Render, atau Vercel.

**Untuk Railway:**

1. Hubungkan akun GitHub Anda ke [Railway](https://railway.app/).
2. Buat proyek baru -> *Deploy from GitHub Repo* -> Pilih `DMNet-app`.
3. Masuk ke menu Service -> Tab **Variables** -> Tambahkan:
   * `GROQ_API_KEY` : `[isi dengan API Key Anda]`
4. Masuk ke tab **Settings** -> **Networking** -> Klik  *Generate Domain* .
5. Aplikasi Anda akan hidup secara otomatis.

---

## 🔒 Catatan Keamanan

File `.env` yang berisi *API Key* **TIDAK BOLEH** di-*commit* atau di-push ke GitHub demi keamanan akun Anda. Proyek ini sudah menyertakan konfigurasi `.gitignore` yang secara otomatis mengabaikan file `.env` dan folder `node_modules/`.

---

## 👨‍💻 Penulis

Dikembangkan dengan 🩵 oleh  **David Mario Yohanes** .
