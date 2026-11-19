'use client';

import React, { useState } from 'react';
import { Volume2, Sparkles, Smile } from 'lucide-react';
import { playRobotBeep, speakIndonesian } from '../lib/sounds';

interface BobiMascotProps {
  message?: string;
  mood?: 'happy' | 'excited' | 'thinking' | 'waving';
  size?: 'sm' | 'md' | 'lg';
  showSpeech?: boolean;
}

export const BobiMascot: React.FC<BobiMascotProps> = ({
  message = 'Halo teman cilik! Aku Bobi si Robot Pintar! Ayo bermain denganku!',
  mood = 'happy',
  size = 'md',
  showSpeech = true,
}) => {
  const [isWaving, setIsWaving] = useState(false);

  const handleClickBobi = () => {
    setIsWaving(true);
    playRobotBeep();
    if (message) {
      speakIndonesian(message);
    }
    setTimeout(() => setIsWaving(false), 1200);
  };

  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-28',
    lg: 'w-36 h-44',
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Robot Mascot SVG */}
      <div
        onClick={handleClickBobi}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
          isWaving ? 'animate-bounce' : 'animate-float'
        } ${sizeClasses}`}
        title="Klik aku untuk mendengar suaraku!"
      >
        <svg
          viewBox="0 0 120 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Antena */}
          <line x1="60" y1="26" x2="60" y2="8" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="8" r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" className="animate-ping" style={{ transformOrigin: '60px 8px', animationDuration: '2s' }} />
          <circle cx="60" cy="8" r="6" fill="#fbbf24" />

          {/* Telinga Baut Kiri & Kanan */}
          <rect x="14" y="44" width="8" height="14" rx="3" fill="#94a3b8" />
          <rect x="98" y="44" width="8" height="14" rx="3" fill="#94a3b8" />

          {/* Kepala Robot */}
          <rect x="20" y="24" width="80" height="54" rx="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
          {/* Layar Muka Kaca Gelap */}
          <rect x="28" y="32" width="64" height="38" rx="10" fill="#0f172a" />

          {/* Mata LED Berbinar */}
          {mood === 'happy' || mood === 'waving' ? (
            <>
              {/* Mata Melengkung Bahagia */}
              <path d="M 40 48 Q 46 41 52 48" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 68 48 Q 74 41 80 48" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'excited' ? (
            <>
              {/* Mata Bintang */}
              <circle cx="46" cy="48" r="6" fill="#fbbf24" />
              <circle cx="74" cy="48" r="6" fill="#fbbf24" />
            </>
          ) : (
            <>
              {/* Mata Normal Berkedip */}
              <circle cx="46" cy="48" r="5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="74" cy="48" r="5" fill="#38bdf8" className="animate-pulse" />
            </>
          )}

          {/* Pipi Merona Pink */}
          <circle cx="36" cy="56" r="3.5" fill="#f43f5e" opacity="0.8" />
          <circle cx="84" cy="56" r="3.5" fill="#f43f5e" opacity="0.8" />

          {/* Mulut LED */}
          <path d="M 52 58 Q 60 64 68 58" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Leher Magnet */}
          <rect x="52" y="78" width="16" height="6" rx="2" fill="#64748b" />

          {/* Badan Robot */}
          <rect x="26" y="84" width="68" height="42" rx="12" fill="#0284c7" stroke="#0369a1" strokeWidth="3" />
          {/* Layar Dada / Baterai */}
          <rect x="40" y="92" width="40" height="20" rx="6" fill="#0f172a" />
          {/* Indikator Energi Hijau */}
          <rect x="44" y="97" width="9" height="10" rx="2" fill="#22c55e" />
          <rect x="55" y="97" width="9" height="10" rx="2" fill="#22c55e" />
          <rect x="66" y="97" width="9" height="10" rx="2" fill="#22c55e" />

          {/* Tangan Kiri */}
          <path
            d={isWaving ? "M 26 94 Q 10 70 8 50" : "M 26 94 Q 14 104 18 116"}
            stroke="#38bdf8"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tangan Kanan */}
          <path
            d="M 94 94 Q 106 104 102 116"
            stroke="#38bdf8"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />

          {/* Roda / Kaki Meluncur */}
          <ellipse cx="44" cy="130" rx="10" ry="7" fill="#475569" stroke="#334155" strokeWidth="2" />
          <ellipse cx="76" cy="130" rx="10" ry="7" fill="#475569" stroke="#334155" strokeWidth="2" />
        </svg>

        {/* Floating badge info */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow border border-amber-300 whitespace-nowrap">
          BOBI
        </span>
      </div>

      {/* Speech Bubble Interaktif */}
      {showSpeech && message && (
        <div className="relative bg-white/95 backdrop-blur-sm border-2 border-sky-300 rounded-2xl p-3 shadow-lg max-w-xs md:max-w-md animate-popIn">
          {/* Segitiga Bubble Pointer */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-sky-300" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-white" />

          <p className="text-sm md:text-base font-bold text-slate-800 leading-snug">
            {message}
          </p>

          <button
            onClick={handleClickBobi}
            className="mt-2 flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded-xl transition-all"
          >
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Dengarkan Bobi</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </button>
        </div>
      )}
    </div>
  );
};
