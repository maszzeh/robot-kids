# 🤖 Robo-Kids Lab: Petualangan Sains & Robotika Ceria

Game edukasi web interaktif berbasis Next.js, React, Tailwind CSS, dan Web Audio API untuk mengenalkan dunia robotika, komponen robot, cara kerja sensor, dan logika pemrograman algoritma secara menyenangkan bagi anak-anak usia 4–10 tahun.

---

## 🌟 Fitur Utama & Mode Permainan

### 1. 📖 Pengantar: Apa Sebenarnya Robot Itu?
- **Konsep Anatomi Robot vs Tubuh Manusia**:
  - **Otak (Mikroprosesor)** = Pusat berpikir & eksekusi kode instruksi.
  - **Panca Indra (Sensor)** = Kamera penglihatan, telinga sonar ultrasonik, pendeteksi cahaya.
  - **Sumber Tenaga (Baterai & Panel Surya)** = "Makanan" dan energi listrik robot.
  - **Otot & Gerak (Motor Servo / Aktuator)** = Roda balap, kaki melangkah, lengan capit.
- Interaktif: Mengklik tiap organ menampilkan analogi manusia, visual animasi, dan suara penjelasan narator berbahasa Indonesia.

### 2. 🛠️ Bengkel Perakitan Robot (Build-A-Bot Workshop)
- Anak dapat merancang robot impian mereka sendiri:
  - **Pilihan Kepala**: Kamera Cerdas, Sonar Ultrasonik Kelelawar, Layar Emosi LED, Antena Satelit.
  - **Pilihan Badan**: Panel Surya, Pelindung Titanium, Kristal Turbo, Gearbox Mekanik.
  - **Pilihan Lengan**: Capit Magnetik, Kuas Pelukis Ajaib, Multi-Alat Obeng/Kunci Pas, Tangan Silikon Halus Ramah.
  - **Pilihan Penggerak**: Dua Roda Balap Seimbang, Rantai Roda Tank (Tracks), Dua Kaki Bipedal, Baling-Baling Drone.
  - **Aksesoris Keren**: Topi Koki, Kacamata Pelindung Silau, Mahkota Juara, Bintang Insinyur.
  - **Palet Warna Cat Utama**: 6 pilihan warna pastel ceria.
- **Uji Coba Aksi di Tempat (Test Drive)**:
  - Meluncur Cepat 🏎️
  - Gerak Capit 🦾
  - Lampu Disko ✨
  - Bunyi Klakson Robot 🔊
- **Meteran Kemampuan**: Menghitung kekuatan Sensor, Baterai, Lengan, dan Kecepatan secara dinamis.

### 3. 🧩 Simulator Kode & Gerak (Code & Go Puzzle)
- Mengenalkan prinsip bahwa **robot bergerak mengikuti instruksi (algoritma)** yang disusun manusia:
  - Arena Grid interaktif 5x5 dan 6x6.
  - Blok perintah ramah anak: `[Maju]`, `[Mundur]`, `[Belok Kiri]`, `[Belok Kanan]`, `[Bip Bop]`.
  - Eksekusi langkah demi langkah dengan highlight visual per blok dan efek suara mekanik langkah servo.
  - Misi mengumpulkan baterai & roda gigi emas serta menghindari rintangan batu karang.
  - Tersedia 6 level berjenjang dengan tantangan seru dan efek confetti perayaan kemenangan.

### 4. 🔬 Laboratorium Sensor Pintar
Eksperimen langsung dengan 4 sensor utama robot:
1. **Sensor Sonar Ultrasonik (Pengukur Jarak)**:
   - Geser jarak dinding (15 cm - 120 cm).
   - Suara sonar frekuensi tinggi berubah rapat seiring dekatnya rintangan.
   - Lampu indikator: Merah (Awas rem darurat!), Kuning (Siap belok), Hijau (Aman melaju).
2. **Sensor Cahaya (LDR / Fotodiode)**:
   - Geser suasana dari Siang Terik (100%) ke Gelap Malam (0%).
   - Saat gelap, lampu senter kepala robot otomatis menyala terang benderang.
   - Saat siang, panel surya robot mengisi daya baterai dengan animasi partikel surya.
3. **Sensor Suhu (Termometer Digital)**:
   - Uji coba suhu Kulkas Es (-5°C), Kamar Nyaman (24°C), dan Tungku Api Panas (65°C).
   - Animasi robot menggigil vs kipas pendingin turbo berputar kencang.
4. **Detektor Logam & Magnet (Treasure Hunt)**:
   - Kotak pasir interaktif 4x4 untuk mencari harta karun (Mur Emas, Baut Baja, Kunci Pas).
   - Suara radar detektor semakin kencang saat probe digerakkan mendekati lokasi logam.

### 5. 🌍 Galeri Robot di Kehidupan Nyata
Memperkenalkan robot nyata yang membantu manusia di dunia:
- **Perseverance Rover**: Robot penjelajah Planet Mars sejauh jutaan kilometer.
- **Robot Bedah Da Vinci**: Membantu dokter melakukan operasi dengan presisi bebas getaran.
- **Robot Vacuum (Roomba)**: Menyapu debu dan mengingat denah kamar dengan laser lidar.
- **Spot si Robot Anjing**: Menyelamatkan korban bencana dan menjelajahi terowongan berbahaya.
- **Lengan Robot Industri**: Merakit mobil di pabrik secara cepat dan presisi.
- **Robot Selam Palung Laut (ROV)**: Menyelam ke dasar samudra gelap meneliti makhluk laut dalam.

### 6. 🏆 Kuis Juara Robotika & Cetak Sertifikat
- 6 pertanyaan interaktif bergambar dengan umpan balik langsung yang mendidik.
- Menghitung bintang prestasi.
- **Sertifikat Insinyur Robotika Cilik**:
  - Anak dapat mengetik namanya sendiri.
  - Tampilan sertifikat berfigura resmi lengkap dengan stempel bintang dan tanggal.
  - Tombol **Cetak / Simpan PDF** yang dioptimalkan dengan CSS media print.

---

## 🔊 Audio & Aksesibilitas Ramah Anak
- **Synthesized Web Audio API**: Suara bip-bop lucu, bunyi servo motor, klik tombol, radar geiger, dan fanfare juara tanpa memerlukan file MP3 eksternal (100% offline & instan).
- **Text-to-Speech Bahasa Indonesia**: Narator ramah anak yang dapat membacakan nama bagian robot, penjelasan sensor, dan instruksi level.
- **Tombol Kontrol Audio**: Tombol bisu/nyala (mute/unmute) suara yang selalu dapat diakses di bagian atas.
- **Maskot Interaktif (Bobi)**: Dapat diklik kapan saja untuk bersuara, melambaikan tangan, dan menyapa anak.

---

## 🚀 Cara Menjalankan Aplikasi

Buka terminal di folder project `robot-kids`:

```bash
cd "d:\myCode\Next js\robot-kids"
npm run dev
```

Buka peramban (browser) di alamat:
👉 **http://localhost:3000**
