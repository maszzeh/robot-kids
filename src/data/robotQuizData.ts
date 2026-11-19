import { QuizQuestion } from "../lib/types";

export const ROBOT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Bagian robot mana yang berfungsi seperti 'OTAK' manusia untuk memproses perintah?",
    hint: "Tempat memasukkan kode dan memori pintar robot!",
    options: [
      { id: "a", text: "Mikroprosesor / Komputer di Kepala", emoji: "🧠", isCorrect: true },
      { id: "b", text: "Baut di Roda Kaki", emoji: "🔩", isCorrect: false },
      { id: "c", text: "Stiker Warna-Warni", emoji: "🎨", isCorrect: false },
    ],
    explanation: "Hebat! Mikroprosesor (chip komputer) adalah otak robot yang membaca kode instruksi dan mengatur semua gerakan!",
  },
  {
    id: 2,
    question: "Apa 'makanan' atau sumber energi utama robot agar bisa menyala?",
    hint: "Tanpa ini, layar robot akan padam dan motor tidak bisa berputar.",
    options: [
      { id: "a", text: "Es Krim Cokelat & Biskuit", emoji: "🍦", isCorrect: false },
      { id: "b", text: "Baterai & Listrik / Sinar Matahari", emoji: "⚡", isCorrect: true },
      { id: "c", text: "Air Sirup Manis", emoji: "🧃", isCorrect: false },
    ],
    explanation: "Tepat sekali! Robot adalah mesin elektronik, jadi mereka membutuhkan arus listrik dari baterai atau panel surya.",
  },
  {
    id: 3,
    question: "Alat apa yang dipakai robot untuk 'MELIHAT' jarak dinding agar tidak menabrak?",
    hint: "Bekerja mirip telinga kelelawar dengan gelombang suara atau kamera!",
    options: [
      { id: "a", text: "Mata Sensor (Kamera / Sonar Ultrasonik)", emoji: "👁️", isCorrect: true },
      { id: "b", text: "Kipas Angin Pendingin", emoji: "💨", isCorrect: false },
      { id: "c", text: "Klakson Suara Keras", emoji: "📢", isCorrect: false },
    ],
    explanation: "Pintar! Sensor ultrasonik menembakkan pantulan suara untuk mengukur jarak benda sebelum robot menyentuhnya.",
  },
  {
    id: 4,
    question: "Apakah robot bisa bergerak sendiri tanpa ada perintah atau program dari manusia?",
    hint: "Ingat, manusia adalah pencipta dan programmer robot!",
    options: [
      { id: "a", text: "Bisa, robot punya sihir ajaib", emoji: "🪄", isCorrect: false },
      { id: "b", text: "Tidak bisa, robot butuh kode (program) buatan manusia", emoji: "💻", isCorrect: true },
      { id: "c", text: "Bisa, jika robot tidur nyenyak", emoji: "😴", isCorrect: false },
    ],
    explanation: "Luar biasa! Robot hanya menjalankan instruksi (algoritma / kode) yang dirancang oleh insinyur pintar seperti kamu!",
  },
  {
    id: 5,
    question: "Robot apa yang dikirim manusia sampai ke Planet Mars yang jauh di luar angkasa?",
    hint: "Punya 6 roda kuat dan antena satelit komunikasi!",
    options: [
      { id: "a", text: "Robot Mars Rover (Perseverance)", emoji: "🚀", isCorrect: true },
      { id: "b", text: "Robot Pembuat Es Krim Keliling", emoji: "🍧", isCorrect: false },
      { id: "c", text: "Robot Kipas Angin Ruang Tamu", emoji: "🌀", isCorrect: false },
    ],
    explanation: "Keren! Mars Rover menjelajahi planet merah Mars jutaan kilometer dari Bumi untuk meneliti bebatuan!",
  },
  {
    id: 6,
    question: "Jika sensor cahaya mendeteksi ruangan tiba-tiba gelap gulita, apa reaksi robot pintar?",
    hint: "Agar jalannya terlihat jelas!",
    options: [
      { id: "a", text: "Menyalakan lampu senter kepala otomatis", emoji: "💡", isCorrect: true },
      { id: "b", text: "Menangis ketakutan di pojokan", emoji: "😭", isCorrect: false },
      { id: "c", text: "Membuang rodanya ke lantai", emoji: "🚗", isCorrect: false },
    ],
    explanation: "Benar sekali! Dengan sensor cahaya, robot tahu kapan harus menyalakan lampu sendiri tanpa disuruh!",
  },
];
