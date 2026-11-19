'use client';

import React, { useState } from 'react';
import { Eye, Brain, Zap, Footprints, Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { playPop, playRobotBeep, speakIndonesian } from '../../lib/sounds';
import { BobiMascot } from '../BobiMascot';

interface ModeIntroStoryProps {
  onStartBuilding: () => void;
  onExploreSensors: () => void;
}

export const ModeIntroStory: React.FC<ModeIntroStoryProps> = ({
  onStartBuilding,
  onExploreSensors,
}) => {
  const [activePart, setActivePart] = useState<'brain' | 'sensor' | 'battery' | 'actuator'>('brain');

  const partsInfo = {
    brain: {
      title: '1. Otak Robot (Mikroprosesor)',
      humanPair: 'Mirip Otak Kita 🧠',
      desc: 'Otak robot adalah sebuah chip komputer kecil yang sangat pintar. Ia membaca semua perintah atau kode dari kita dan memutuskan kapan robot harus maju, belok, atau berhenti!',
      soundDesc: 'Bip-bop! Aku sedang memikirkan jalur terbaik!',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Pusat Berpikir',
    },
    sensor: {
      title: '2. Panca Indra (Sensor-Sensor)',
      humanPair: 'Mirip Mata, Telinga & Kulit Kita 👁️👂',
      desc: 'Robot tidak punya mata biologis, tapi punya kamera, sensor jarak ultrasonik, dan sensor cahaya. Dengan sensor ini, robot tahu ada dinding di depannya dan bisa melihat dalam gelap!',
      soundDesc: 'Sensor mendeteksi ada jalan di depan sejauh 50 cm!',
      color: 'from-cyan-500 to-blue-600',
      badge: 'Pusat Melihat & Merasa',
    },
    battery: {
      title: '3. Tenaga & Makanan (Baterai Listrik)',
      humanPair: 'Mirip Makanan Bergizi & Minum Air ⚡🍎',
      desc: 'Kalau kita butuh nasi dan buah untuk bertenaga, robot membutuhkan aliran listrik! Baterai isi ulang atau panel surya memberi energi ke seluruh kabel di tubuh robot.',
      soundDesc: 'Baterai terisi penuh 100%! Siap menjelajah!',
      color: 'from-amber-400 to-yellow-500',
      badge: 'Sumber Energi',
    },
    actuator: {
      title: '4. Otot & Gerak (Aktuator / Motor)',
      humanPair: 'Mirip Kaki & Tangan Kita 🦾🦶',
      desc: 'Agar bisa meluncur atau memegang barang, robot memakai motor listrik kecil bernama motor servo. Ada yang punya roda cepat, kaki melangkah, lengan penjepit, sampai sayap drone!',
      soundDesc: 'Wuzz! Motor berputar, robot siap meluncur!',
      color: 'from-rose-500 to-pink-600',
      badge: 'Pusat Bergerak',
    },
  };

  const handleSelectPart = (part: 'brain' | 'sensor' | 'battery' | 'actuator') => {
    playPop();
    setActivePart(part);
    playRobotBeep();
    speakIndonesian(partsInfo[part].title + '. ' + partsInfo[part].desc);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              PETUALANGAN ROBOT SAHABAT PINTAR
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Kenalan Dulu, Yuk! <br className="hidden sm:inline" />
              <span className="text-amber-300 underline decoration-wavy decoration-amber-400">
                Apa Sebenarnya Robot Itu?
              </span>
            </h1>
            <p className="text-sky-100 text-sm sm:text-base max-w-xl font-medium">
              Robot bukan monster jahat, lho! Robot adalah mesin pembantu pintar ciptaan manusia yang dibuat dari komponen hebat di bawah ini.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-inner">
            <BobiMascot
              size="lg"
              mood="excited"
              message="Klik 4 bagian tubuh robot di bawah untuk melihat kehebatannya!"
            />
          </div>
        </div>

        {/* Background circuit grid decorative */}
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Pilar Anatomi Robot Interaktif */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(
          [
            { id: 'brain', label: '1. Otak Robot', icon: Brain, color: 'bg-purple-100 text-purple-700 border-purple-300' },
            { id: 'sensor', label: '2. Sensor Indra', icon: Eye, color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
            { id: 'battery', label: '3. Baterai Listrik', icon: Zap, color: 'bg-amber-100 text-amber-700 border-amber-300' },
            { id: 'actuator', label: '4. Motor & Gerak', icon: Footprints, color: 'bg-rose-100 text-rose-700 border-rose-300' },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isSelected = activePart === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectPart(tab.id)}
              className={`p-3.5 sm:p-4 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 flex flex-col items-center gap-2 border-2 text-center shadow-md ${
                isSelected
                  ? 'bg-slate-900 text-white border-amber-400 scale-105 shadow-xl ring-4 ring-amber-400/30'
                  : `${tab.color} hover:brightness-95 active:scale-95`
              }`}
            >
              <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-400 text-slate-900' : 'bg-white/80'}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span>{tab.label}</span>
              {isSelected && <span className="text-[10px] text-amber-300">● Sedang Dilihat</span>}
            </button>
          );
        })}
      </div>

      {/* Kartu Detail Anatomi Terpilih */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Visual Showcase Box */}
          <div className={`w-full md:w-1/3 aspect-square rounded-3xl bg-gradient-to-br ${partsInfo[activePart].color} p-6 flex flex-col items-center justify-center text-white text-center shadow-lg relative overflow-hidden group`}>
            <div className="text-6xl mb-3 group-hover:scale-125 transition-transform duration-300">
              {activePart === 'brain' && '🧠'}
              {activePart === 'sensor' && '👁️'}
              {activePart === 'battery' && '⚡'}
              {activePart === 'actuator' && '🦾'}
            </div>
            <span className="font-black text-sm uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full mb-1">
              {partsInfo[activePart].badge}
            </span>
            <span className="text-xs text-white/90 font-bold">
              {partsInfo[activePart].humanPair}
            </span>
          </div>

          {/* Penjelasan Interaktif */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="inline-block px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-black">
              {partsInfo[activePart].humanPair}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              {partsInfo[activePart].title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {partsInfo[activePart].desc}
            </p>

            <div className="bg-sky-50 border-2 border-dashed border-sky-200 rounded-2xl p-3.5 flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <p className="text-xs sm:text-sm font-bold text-sky-800 italic">
                &quot;{partsInfo[activePart].soundDesc}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button
          onClick={() => {
            playPop();
            onStartBuilding();
          }}
          className="flex items-center justify-between p-5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-black rounded-3xl shadow-lg border-2 border-amber-300 transition-all hover:scale-[1.02] active:scale-95 group"
        >
          <div className="text-left">
            <span className="text-xs uppercase tracking-wider font-extrabold text-amber-900 block">Langkah 1</span>
            <span className="text-lg sm:text-xl">🛠️ Masuk Bengkel Robot</span>
            <p className="text-xs text-amber-950/80 font-medium">Rakit robot impianmu sendiri!</p>
          </div>
          <ArrowRight className="w-7 h-7 text-amber-950 group-hover:translate-x-1.5 transition-transform" />
        </button>

        <button
          onClick={() => {
            playPop();
            onExploreSensors();
          }}
          className="flex items-center justify-between p-5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-black rounded-3xl shadow-lg border-2 border-cyan-300 transition-all hover:scale-[1.02] active:scale-95 group"
        >
          <div className="text-left">
            <span className="text-xs uppercase tracking-wider font-extrabold text-cyan-100 block">Langkah 2</span>
            <span className="text-lg sm:text-xl">🔬 Uji Coba Lab Sensor</span>
            <p className="text-xs text-cyan-100 font-medium">Bermain dengan radar suara & cahaya!</p>
          </div>
          <ArrowRight className="w-7 h-7 text-white group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
