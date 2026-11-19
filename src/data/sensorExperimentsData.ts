import { SensorInfo } from "../lib/types";

export const SENSOR_EXPERIMENTS: SensorInfo[] = [
  {
    type: "distance",
    title: "Mata Sonar Ultrasonik",
    subtitle: "Mendeteksi Jarak Benda Tanpa Menyentuh",
    organEquivalent: "Mirip Telinga & Suara Pantul Kelelawar 🦇",
    concept: "Sensor ini memancarkan suara berfrekuensi sangat tinggi yang tidak bisa didengar manusia. Suara ini memantul ke dinding lalu kembali lagi. Otak robot menghitung kecepatannya untuk tahu jarak!",
    color: "from-blue-500 to-indigo-600",
  },
  {
    type: "light",
    title: "Mata Sensor Cahaya (LDR)",
    subtitle: "Melihat Terang dan Gelapnya Ruangan",
    organEquivalent: "Mirip Pupil Mata Kita yang Membesar di Tempat Gelap 👁️",
    concept: "Saat ruangan gelap gulita, sensor memberitahu otak robot: 'Hei, gelap sekali!'. Otak robot langsung menyalakan lampu senter otomatis agar bisa melihat jalan.",
    color: "from-amber-400 to-yellow-600",
  },
  {
    type: "temperature",
    title: "Sensor Suhu & Panas",
    subtitle: "Merasa Dingin dan Gerahnya Mesin",
    organEquivalent: "Mirip Kulit Kita yang Merinding saat Dingin 🌡️",
    concept: "Komputer dan baterai robot tidak boleh terlalu panas. Sensor suhu bertugas menyalakan kipas angin pendingin jika robot bekerja terlalu keras!",
    color: "from-rose-500 to-red-600",
  },
  {
    type: "metal",
    title: "Sensor Logam & Magnet",
    subtitle: "Mencari Baut & Harta Karun Logam di Pasir",
    organEquivalent: "Kekuatan Super Magnetik Induktif 🧲",
    concept: "Sensor ini memancarkan medan magnet mini. Jika ada besi, baut, atau kaleng di dekatnya, sensor akan berbunyi kencang seperti radar pencari harta!",
    color: "from-emerald-500 to-teal-600",
  },
];
