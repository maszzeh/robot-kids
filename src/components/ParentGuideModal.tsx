'use client';

import React from 'react';
import { X, BookOpen, Brain, Cpu, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { playPop } from '../lib/sounds';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-4 border-sky-300 p-6 sm:p-8">
        {/* Tombol Tutup */}
        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              Panduan Edukasi Orang Tua & Guru
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Konsep Sains & Robotika untuk Anak Usia Dini (4 - 10 Tahun)
            </p>
          </div>
        </div>

        {/* Isi Panduan */}
        <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Pilar Edukatif */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-4">
            <h3 className="font-bold text-sky-900 flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-sky-600" />
              Tujuan Pembelajaran (Computational Thinking & STEAM)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Game ini dirancang untuk mematahkan mitos bahwa robot itu rumit atau menakutkan. Anak diajak memahami prinsip dasar logika:
              <strong> Input (Sensor) &rarr; Proses (Otak Komputer) &rarr; Output (Gerak/Aksi)</strong> melalui pengalaman langsung yang visual dan menyenangkan.
            </p>
          </div>

          {/* 4 Mode Pembelajaran */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                <Cpu className="w-4 h-4 text-amber-600" />
                <span>1. Bengkel Anatomi Robot</span>
              </div>
              <p className="text-xs text-slate-600">
                Mengenal bagian fisik: sensor di kepala, baterai di badan, aktuator penjepit di tangan, dan lokomosi roda/kaki. Melatih kreativitas dan estetika teknik.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>2. Logika Perintah (Coding)</span>
              </div>
              <p className="text-xs text-slate-600">
                Menyusun urutan instruksi (sekuensial), merencanakan rute pemecahan masalah, dan memahami konsep debugging jika robot salah melangkah.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 font-bold text-purple-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>3. Laboratorium Sensor</span>
              </div>
              <p className="text-xs text-slate-600">
                Eksperimen interaktif sensor jarak ultrasonik, sensor cahaya terang/gelap, suhu, dan detektor logam dengan analogi panca indra manusia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
                <HeartHandshake className="w-4 h-4 text-rose-600" />
                <span>4. Robot di Dunia Nyata</span>
              </div>
              <p className="text-xs text-slate-600">
                Mengikis rasa takut anak dengan memperlihatkan robot penyelamat gempa, robot penjelajah Mars, hingga robot bedah medis yang membantu manusia.
              </p>
            </div>
          </div>

          {/* Tips Pendampingan */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-bold text-slate-800 mb-2">Tips untuk Pendamping (Orang Tua / Pendidik):</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>
                <strong>Tanyakan pada anak:</strong> &quot;Menurutmu, kalau ruangan gelap apa yang dilihat mata robot?&quot; atau &quot;Perintah apa yang harus kita tambahkan agar Bobi tidak menabrak batu?&quot;
              </li>
              <li>
                <strong>Dukung eksperimen bebas:</strong> Biarkan anak mencoba kombinasi tangan kuas atau roda balap unik di Bengkel Robot.
              </li>
              <li>
                <strong>Gunakan Audio Berbicara:</strong> Anak yang belum lancar membaca dapat mengklik ikon suara atau maskot Bobi untuk mendengarkan instruksi lisan.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black shadow-lg transition-transform active:scale-95"
          >
            Siap, Ayo Bermain! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
