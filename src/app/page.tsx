'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Cpu,
  Play,
  Award,
  Radio,
  Globe,
  HelpCircle,
  Star,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { GameMode, CustomRobotConfig, SensorLabType } from '../lib/types';
import { playPop, playRobotBeep, speakIndonesian } from '../lib/sounds';
import { SoundToggle } from '../components/SoundToggle';
import { BobiMascot } from '../components/BobiMascot';
import { ParentGuideModal } from '../components/ParentGuideModal';
import { ModeIntroStory } from '../components/modes/ModeIntroStory';
import { ModeRobotBuilder } from '../components/modes/ModeRobotBuilder';
import { ModeCodeRunner } from '../components/modes/ModeCodeRunner';
import { ModeSensorLab } from '../components/modes/ModeSensorLab';
import { ModeRealWorld } from '../components/modes/ModeRealWorld';
import { ModeQuizCertification } from '../components/modes/ModeQuizCertification';

export default function HomePage() {
  const [activeMode, setActiveMode] = useState<GameMode>('welcome');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [playerName, setPlayerName] = useState('Insinyur Cilik');
  const [completedLevels, setCompletedLevels] = useState<number[]>([1]);
  const [discoveredSensors, setDiscoveredSensors] = useState<SensorLabType[]>(['distance']);
  const [isQuizDone, setIsQuizDone] = useState(false);

  // Custom Robot Builder State
  const [customRobot, setCustomRobot] = useState<CustomRobotConfig>({
    name: 'Bobi Ceria',
    headId: 'head-camera',
    bodyId: 'body-solar',
    armsId: 'arms-gripper',
    legsId: 'legs-wheels',
    accessoryId: 'acc-star',
    primaryColor: '#38bdf8',
  });

  // Calculate total stars
  const totalStars = completedLevels.length * 2 + discoveredSensors.length + (isQuizDone ? 5 : 0);

  const handleModeChange = (mode: GameMode) => {
    playPop();
    setActiveMode(mode);
    if (mode === 'intro-story') {
      speakIndonesian('Ayo kenalan dengan bagian tubuh robot!');
    } else if (mode === 'robot-builder') {
      speakIndonesian('Selamat datang di bengkel rakit robot!');
    } else if (mode === 'code-runner') {
      speakIndonesian('Mari susun perintah agar robot melangkah!');
    } else if (mode === 'sensor-lab') {
      speakIndonesian('Laboratorium sensor pintar!');
    } else if (mode === 'real-world') {
      speakIndonesian('Robot-robot hebat di dunia nyata!');
    } else if (mode === 'quiz') {
      speakIndonesian('Uji kuis juara robotika!');
    }
  };

  const navItems: { id: GameMode; label: string; icon: string; badge?: string }[] = [
    { id: 'intro-story', label: '1. Apa itu Robot?', icon: '📖' },
    { id: 'robot-builder', label: '2. Bengkel Rakit', icon: '🛠️' },
    { id: 'code-runner', label: '3. Kode & Gerak', icon: '🧩' },
    { id: 'sensor-lab', label: '4. Lab Sensor', icon: '🔬' },
    { id: 'real-world', label: '5. Robot Nyata', icon: '🌍' },
    { id: 'quiz', label: '6. Kuis Juara', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between">
      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => handleModeChange('welcome')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-800">
                  ROBO-KIDS
                </span>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase">
                  LAB
                </span>
              </div>
              <p className="text-[11px] font-bold text-sky-600 hidden sm:block">
                Petualangan Sains & Robotika Ceria
              </p>
            </div>
          </div>

          {/* Quick Nav Pills (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = activeMode === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleModeChange(item.id)}
                  className={`px-3 py-1.5 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 scale-105'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Star Counter */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl shadow-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-black text-amber-900">
                {totalStars} ⭐
              </span>
            </div>

            {/* Sound Mute/Unmute */}
            <SoundToggle />

            {/* Parent Guide Modal Button */}
            <button
              onClick={() => {
                playPop();
                setIsGuideOpen(true);
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              title="Panduan Orang Tua & Guru"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden md:inline">Panduan Ortu/Guru</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Horizontal Bar */}
        <div className="xl:hidden border-t border-slate-100 px-4 py-2 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleModeChange(item.id)}
                className={`px-3 py-1.5 rounded-xl font-black text-xs whitespace-nowrap flex items-center gap-1 transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 bg-slate-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 2. Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex-1 w-full">
        {activeMode === 'welcome' && (
          <div className="space-y-8 animate-fadeIn pb-12">
            {/* Big Welcome Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 p-6 sm:p-10 text-white shadow-2xl">
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center lg:text-left max-w-xl">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-wide text-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    GAME EDUKASI INTERAKTIF ROBOTIKA UNTUK ANAK
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    Halo Sahabat Cilik! <br />
                    Ayo Masuk ke <br />
                    <span className="text-amber-300 underline decoration-wavy decoration-amber-400">
                      Dunia Robot Cerdas! 🚀
                    </span>
                  </h1>

                  <p className="text-sky-100 text-sm sm:text-base font-medium leading-relaxed">
                    Tahukah kamu bagaimana robot bisa melihat tanpa mata manusia? Bagaimana robot tahu harus berbelok? Yuk, kita rakit robotmu sendiri, uji coba panca indra sensornya, dan susun kodenya!
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                    <button
                      onClick={() => handleModeChange('intro-story')}
                      className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm sm:text-base shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <span>Mulai Petualangan 🌟</span>
                    </button>
                    <button
                      onClick={() => handleModeChange('robot-builder')}
                      className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-black text-sm sm:text-base border border-white/30 transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <span>🛠️ Langsung Rakit Robot</span>
                    </button>
                  </div>
                </div>

                {/* Animated Bobi Mascot Greeting */}
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl">
                  <BobiMascot
                    size="lg"
                    mood="excited"
                    message="Halo! Aku Bobi! Klik salah satu kartu petualangan di bawah untuk mulai bermain bersamaku!"
                  />
                </div>
              </div>

              {/* Decorative background circles */}
              <div className="absolute -top-16 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* 6 Feature Discovery Cards */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
                <span>Pilih Mode Petualangan Favoritmu:</span>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  6 Mode Interaktif
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* 1. Intro */}
                <div
                  onClick={() => handleModeChange('intro-story')}
                  className="group p-6 rounded-3xl bg-white border-3 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      📖
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                      PENGANTAR DASAR
                    </span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">
                      1. Apa Sebenarnya Robot Itu?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Pelajari 4 organ utama robot: Otak, Panca Indra Sensor, Baterai Energi, dan Motor Gerak.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-600">
                    <span>Mulai Belajar &rarr;</span>
                    <span>Anatomi Robot</span>
                  </div>
                </div>

                {/* 2. Builder */}
                <div
                  onClick={() => handleModeChange('robot-builder')}
                  className="group p-6 rounded-3xl bg-white border-3 border-amber-100 hover:border-amber-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      🛠️
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      KREASI & SENI TEKNIK
                    </span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">
                      2. Bengkel Rakit Robot Impian
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Pilih kepala kamera, badan solar, tangan capit, dan roda balap sesukamu, lalu uji aksinya!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
                    <span>Masuk Bengkel &rarr;</span>
                    <span>Custom Robot</span>
                  </div>
                </div>

                {/* 3. Coding */}
                <div
                  onClick={() => handleModeChange('code-runner')}
                  className="group p-6 rounded-3xl bg-white border-3 border-emerald-100 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      🧩
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      LOGIKA CODING
                    </span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">
                      3. Jalankan Perintah (Code & Go)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Bantu robot mengumpulkan baterai dan menghindari rintangan menggunakan blok perintah berurutan!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
                    <span>Main Puzzle &rarr;</span>
                    <span>6 Level Seru</span>
                  </div>
                </div>

                {/* 4. Sensors */}
                <div
                  onClick={() => handleModeChange('sensor-lab')}
                  className="group p-6 rounded-3xl bg-white border-3 border-purple-100 hover:border-purple-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      🔬
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                      LABORATORIUM SAINS
                    </span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">
                      4. Lab Panca Indra Sensor
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Eksperimen langsung dengan gelombang sonar suara, sensor cahaya malam/siang, suhu, dan detektor logam.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-600">
                    <span>Mulai Uji Coba &rarr;</span>
                    <span>4 Eksperimen</span>
                  </div>
                </div>

                {/* 5. Real World */}
                <div
                  onClick={() => handleModeChange('real-world')}
                  className="group p-6 rounded-3xl bg-white border-3 border-teal-100 hover:border-teal-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      🌍
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                      ENSIKLOPEDIA DUNIA
                    </span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">
                      5. Robot di Kehidupan Nyata
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Kenali robot penjelajah Mars, robot bedah rumah sakit, robot vacuum penyedot debu, hingga robot kapal selam!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-teal-600">
                    <span>Jelajahi Galeri &rarr;</span>
                    <span>6 Robot Hebat</span>
                  </div>
                </div>

                {/* 6. Quiz */}
                <div
                  onClick={() => handleModeChange('quiz')}
                  className="group p-6 rounded-3xl bg-white border-3 border-rose-100 hover:border-rose-400 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                      🏆
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                      PRESTASI & SERTIFIKAT
                    </span>
                    <h3 className="text-lg font-black text-slate-800 mt-2">
                      6. Kuis Juara Robotika
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Jawab pertanyaan seru dan dapatkan Sertifikat Resmi Insinyur Robot Cilik yang bisa kamu cetak!
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-rose-600">
                    <span>Mulai Kuis &rarr;</span>
                    <span>Raih Sertifikat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mode 1: Intro Story */}
        {activeMode === 'intro-story' && (
          <ModeIntroStory
            onStartBuilding={() => handleModeChange('robot-builder')}
            onExploreSensors={() => handleModeChange('sensor-lab')}
          />
        )}

        {/* Mode 2: Robot Builder */}
        {activeMode === 'robot-builder' && (
          <ModeRobotBuilder
            customConfig={customRobot}
            onUpdateConfig={setCustomRobot}
            onTakeToCodeRunner={() => handleModeChange('code-runner')}
          />
        )}

        {/* Mode 3: Code Runner */}
        {activeMode === 'code-runner' && (
          <ModeCodeRunner
            customConfig={customRobot}
            completedLevels={completedLevels}
            onLevelComplete={(lvlId) => {
              if (!completedLevels.includes(lvlId)) {
                setCompletedLevels((prev) => [...prev, lvlId]);
              }
            }}
          />
        )}

        {/* Mode 4: Sensor Lab */}
        {activeMode === 'sensor-lab' && (
          <ModeSensorLab
            discoveredSensors={discoveredSensors}
            onSensorDiscovered={(sensor) => {
              if (!discoveredSensors.includes(sensor)) {
                setDiscoveredSensors((prev) => [...prev, sensor]);
              }
            }}
          />
        )}

        {/* Mode 5: Real World Robots */}
        {activeMode === 'real-world' && (
          <ModeRealWorld onGoToQuiz={() => handleModeChange('quiz')} />
        )}

        {/* Mode 6: Quiz Certification */}
        {activeMode === 'quiz' && (
          <ModeQuizCertification
            playerName={playerName}
            onUpdatePlayerName={setPlayerName}
            onCompleteQuiz={() => setIsQuizDone(true)}
          />
        )}
      </main>

      {/* 3. Footer */}
      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur py-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-bold text-center">
          <div className="flex items-center gap-2">
            <span>🤖 Robo-Kids Lab</span>
            <span>•</span>
            <span>Belajar Robotika & Sains untuk Anak Indonesia</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleModeChange('welcome')}
              className="text-sky-600 hover:underline"
            >
              Halaman Depan
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playPop();
                setIsGuideOpen(true);
              }}
              className="text-sky-600 hover:underline"
            >
              Panduan Edukasi
            </button>
          </div>
        </div>
      </footer>

      {/* 4. Parent Guide Modal */}
      <ParentGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
