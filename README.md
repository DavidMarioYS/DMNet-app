# 🌐 IP DMNet - Professional Network Suite

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
