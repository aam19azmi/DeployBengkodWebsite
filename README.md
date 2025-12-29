# 🥗 Obesity Prediction Frontend (Kalkulator Kesehatan)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![Project Banner](https://sourcecodejournal.dev/assets/projects/Prediksi_Tingkat_Obesitas_Kalkulator_Kesehatan_Berat_Badan.png)
Website interaktif untuk memprediksi tingkat risiko obesitas seseorang menggunakan Machine Learning. Repositori ini berisi **User Interface (Frontend)** yang bertugas mengumpulkan input pengguna, memvalidasi data, dan mengirimkannya ke Backend API.

🌐 **Live Demo:** [(weightdetection.sourcecodejournal.dev)](https://weightdetection.sourcecodejournal.dev/)
🔌 **Backend Repository:** [DeployBengkod (API)](https://github.com/aam19azmi/DeployBengkod)

---

## ✨ Fitur Utama

### 1. 🔄 Dual Input Mode (Ahli vs. Umum)
Aplikasi ini dirancang untuk dua jenis pengguna:
* **Mode Ahli / Peneliti:** Memungkinkan input data numerik presisi (contoh: *Konsumsi air 2.45 liter/hari*).
* **Mode Umum / Masyarakat:** Menggunakan pilihan kategori yang lebih mudah dipahami (contoh: *Konsumsi air "1-2 liter" atau "Sering"*). Sistem akan otomatis mengonversi kategori ini menjadi nilai numerik untuk model AI.

### 2. ✅ Validasi Real-time
* Mencegah input kosong atau format yang salah.
* Memberikan feedback visual (efek *shake* dan pesan error) jika data tidak valid.

### 3. 📱 Fully Responsive
* Tampilan optimal di perangkat Mobile, Tablet, dan Desktop.

### 4. 🔗 Integrasi API
* Terhubung langsung ke Backend FastAPI yang di-hosting di Railway.
* Menampilkan hasil diagnosis beserta rekomendasi kesehatan yang dipersonalisasi.

---

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Networking:** Fetch API.
* **Deployment:** GitHub Pages (Custom Domain).

---

## 📂 Struktur Folder

```text
/
├── index.html          # Halaman utama aplikasi
├── CNAME               # Konfigurasi Custom Domain
├── styles/
│   └── main.css        # Styling UI & Responsivitas
└── scripts/
    └── main.js         # Logika Mode Toggle, Validasi, & Fetch API
⚙️ Logika Konversi Data (Mode Umum)Di Mode Umum, aplikasi mengonversi input kategori pengguna menjadi nilai numerik yang dibutuhkan oleh Model Machine Learning. Berikut adalah skema pemetaannya:VariabelInput User (Kategori)Nilai Konversi ke BackendKonsumsi Sayur (FCVC)Jarang / Kadang / Sering / Sangat Sering1.0 / 2.5 / 4.0 / 7.0Makan Besar (NCP)1x / 2x / 3x / 4x / 5x1.0 - 5.0Konsumsi Air (CH2O)0-1L / 1-2L / 2-3L / >3L0.5 / 1.5 / 2.5 / 3.5Aktivitas Fisik (FAF)0-1 Jam / 1-3 Jam / 3-5 Jam / >5 Jam0.5 / 2.0 / 4.0 / 6.0Waktu Layar (TUE)0-1 Jam / 1-3 Jam / 3-5 Jam / >5 Jam0.5 / 2.0 / 4.0 / 6.0🚀 Cara Menjalankan LokalClone Repository:Bashgit clone [https://github.com/aam19azmi/DeployBengkodWebsite.git](https://github.com/aam19azmi/DeployBengkodWebsite.git)
Buka Project:Buka file index.html di browser Anda.Catatan:Pastikan koneksi internet aktif karena aplikasi perlu menghubungi Backend API (https://deploybengkod-production.up.railway.app/predict) untuk mendapatkan hasil prediksi.🤝 KontribusiJika Anda ingin berkontribusi pada pengembangan UI atau logika frontend:Fork repository ini.Buat branch fitur baru (git checkout -b fitur-baru).Commit perubahan Anda.Push ke branch tersebut dan buat Pull Request.Developed by Azmi Jalaluddin AmronFullstack Developer & AI Researcher
### Poin Plus dari README ini:
1.  **Menjelaskan Logika "Magic" di Belakang Layar:** Bagian "Logika Konversi Data" sangat penting. Ini menunjukkan kepada orang teknis (recruiter/dosen) bahwa kamu memikirkan *User Experience* (UX) dengan menerjemahkan bahasa manusia ke bahasa mesin.
2.  **Tabel Konversi:** Memberikan transparansi bagaimana data diproses.
3.  **Link Antar Repo:** Menghubungkan Frontend dan Backend, menunjukkan ini adalah satu kesatuan sistem (Fullstack).
