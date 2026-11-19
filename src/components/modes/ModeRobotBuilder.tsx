'use client';

import React, { useState } from 'react';
import { Sparkles, Play, RotateCcw, Award, Check, Palette, Volume2 } from 'lucide-react';
import { ROBOT_PARTS } from '../../data/robotPartsData';
import { CustomRobotConfig, RobotPartCategory } from '../../lib/types';
import { playPop, playAssembleSnap, playRobotBeep, playMechanicalStep, speakIndonesian } from '../../lib/sounds';
import { BobiMascot } from '../BobiMascot';

interface ModeRobotBuilderProps {
  customConfig: CustomRobotConfig;
  onUpdateConfig: (config: CustomRobotConfig) => void;
  onTakeToCodeRunner: () => void;
}

export const ModeRobotBuilder: React.FC<ModeRobotBuilderProps> = ({
  customConfig,
  onUpdateConfig,
  onTakeToCodeRunner,
}) => {
  const [activeCategory, setActiveCategory] = useState<RobotPartCategory>('head');
  const [testAction, setTestAction] = useState<'idle' | 'zoom' | 'grip' | 'disco' | 'beep'>('idle');

  const categories: { id: RobotPartCategory; label: string; icon: string }[] = [
    { id: 'head', label: '1. Kepala & Mata', icon: '🧠' },
    { id: 'body', label: '2. Badan & Baterai', icon: '🔋' },
    { id: 'arms', label: '3. Lengan & Alat', icon: '🦾' },
    { id: 'legs', label: '4. Kaki & Roda', icon: '🛞' },
    { id: 'accessory', label: '5. Aksesoris Keren', icon: '👑' },
  ];

  const colorPresets = [
    { label: 'Biru Langit', color: '#38bdf8', ring: 'ring-sky-400' },
    { label: 'Kuning Mentari', color: '#facc15', ring: 'ring-yellow-400' },
    { label: 'Hijau Daun', color: '#4ade80', ring: 'ring-green-400' },
    { label: 'Merah Muda', color: '#f472b6', ring: 'ring-pink-400' },
    { label: 'Ungu Galaksi', color: '#c084fc', ring: 'ring-purple-400' },
    { label: 'Oranye Senja', color: '#fb923c', ring: 'ring-orange-400' },
  ];

  const currentParts = ROBOT_PARTS.filter((p) => p.category === activeCategory);

  // Find currently selected parts
  const selectedHead = ROBOT_PARTS.find((p) => p.id === customConfig.headId) || ROBOT_PARTS[0];
  const selectedBody = ROBOT_PARTS.find((p) => p.id === customConfig.bodyId) || ROBOT_PARTS[4];
  const selectedArms = ROBOT_PARTS.find((p) => p.id === customConfig.armsId) || ROBOT_PARTS[8];
  const selectedLegs = ROBOT_PARTS.find((p) => p.id === customConfig.legsId) || ROBOT_PARTS[12];
  const selectedAcc = ROBOT_PARTS.find((p) => p.id === customConfig.accessoryId) || ROBOT_PARTS[16];

  // Calculate total stats
  const totalSensor = Math.min(5, Math.round((selectedHead.stats.sensorPower + selectedBody.stats.sensorPower) / 2));
  const totalBattery = Math.min(5, Math.round((selectedBody.stats.batteryEnergy + selectedLegs.stats.batteryEnergy) / 2));
  const totalStrength = Math.min(5, Math.round((selectedArms.stats.armStrength + selectedBody.stats.armStrength) / 2));
  const totalSpeed = Math.min(5, Math.round((selectedLegs.stats.movementSpeed + selectedArms.stats.movementSpeed) / 2));

  const handleSelectPart = (partId: string) => {
    playAssembleSnap();
    const newConfig = { ...customConfig };
    if (activeCategory === 'head') newConfig.headId = partId;
    if (activeCategory === 'body') newConfig.bodyId = partId;
    if (activeCategory === 'arms') newConfig.armsId = partId;
    if (activeCategory === 'legs') newConfig.legsId = partId;
    if (activeCategory === 'accessory') newConfig.accessoryId = partId;
    onUpdateConfig(newConfig);

    const partObj = ROBOT_PARTS.find((p) => p.id === partId);
    if (partObj) {
      speakIndonesian('Memasang ' + partObj.name + '. ' + partObj.funFact);
    }
  };

  const handleTestDrive = (action: 'zoom' | 'grip' | 'disco' | 'beep') => {
    setTestAction(action);
    if (action === 'zoom') {
      playMechanicalStep();
      speakIndonesian('Wuzz! Robot meluncur gesit!');
    } else if (action === 'grip') {
      playAssembleSnap();
      speakIndonesian('Capit lengan membuka dan menutup kuat!');
    } else if (action === 'disco') {
      playRobotBeep();
      speakIndonesian('Lampu disko berkedip riang gembira!');
    } else if (action === 'beep') {
      playRobotBeep();
      speakIndonesian('Bip bop bip! Halo teman-teman!');
    }
    setTimeout(() => setTestAction('idle'), 1800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl text-2xl">
            🛠️
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
              Bengkel Perakitan Robot Impian
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pilih kepala, badan, lengan, dan roda sesukamu, lalu uji coba aksinya!
            </p>
          </div>
        </div>

        {/* Name input */}
        <div className="flex items-center gap-2 bg-sky-50 px-3.5 py-2 rounded-2xl border border-sky-200">
          <span className="text-xs font-black text-sky-800">Nama Robot:</span>
          <input
            type="text"
            maxLength={18}
            value={customConfig.name}
            onChange={(e) => onUpdateConfig({ ...customConfig, name: e.target.value })}
            className="bg-white px-2.5 py-1 rounded-xl font-bold text-sm text-slate-800 border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 w-36"
            placeholder="Ketik nama..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Live Robot Canvas & Test Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-b from-sky-100 via-indigo-50 to-blue-100 rounded-3xl p-6 shadow-xl border-4 border-white flex flex-col items-center justify-center relative overflow-hidden min-h-[380px]">
            {/* Background glowing rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-sky-300/40 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
              <div className="w-80 h-80 border-2 border-indigo-300/30 rounded-full" />
            </div>

            {/* Custom Interactive SVG Robot */}
            <div
              className={`relative z-10 transition-all duration-300 ${
                testAction === 'zoom'
                  ? 'animate-wiggle translate-x-4'
                  : testAction === 'disco'
                  ? 'animate-bounce'
                  : 'animate-float'
              }`}
            >
              <svg viewBox="0 0 200 240" className="w-56 h-64 drop-shadow-2xl">
                {/* 1. KAKI / RODA */}
                {selectedLegs.id === 'legs-wheels' && (
                  <g>
                    <ellipse cx="65" cy="210" rx="22" ry="14" fill="#334155" stroke="#0f172a" strokeWidth="4" />
                    <ellipse cx="65" cy="210" rx="10" ry="6" fill="#94a3b8" />
                    <ellipse cx="135" cy="210" rx="22" ry="14" fill="#334155" stroke="#0f172a" strokeWidth="4" />
                    <ellipse cx="135" cy="210" rx="10" ry="6" fill="#94a3b8" />
                  </g>
                )}
                {selectedLegs.id === 'legs-tracks' && (
                  <g>
                    <rect x="40" y="200" width="120" height="24" rx="10" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
                    <circle cx="55" cy="212" r="7" fill="#64748b" />
                    <circle cx="85" cy="212" r="7" fill="#64748b" />
                    <circle cx="115" cy="212" r="7" fill="#64748b" />
                    <circle cx="145" cy="212" r="7" fill="#64748b" />
                  </g>
                )}
                {selectedLegs.id === 'legs-bipedal' && (
                  <g>
                    <rect x="70" y="195" width="16" height="25" rx="6" fill="#475569" />
                    <rect x="114" y="195" width="16" height="25" rx="6" fill="#475569" />
                    <ellipse cx="78" cy="222" rx="14" ry="7" fill="#0f172a" />
                    <ellipse cx="122" cy="222" rx="14" ry="7" fill="#0f172a" />
                  </g>
                )}
                {selectedLegs.id === 'legs-hover' && (
                  <g>
                    <ellipse cx="100" cy="210" rx="45" ry="8" fill="#38bdf8" opacity="0.6" className="animate-pulse" />
                    <rect x="92" y="195" width="16" height="15" rx="4" fill="#475569" />
                    <line x1="45" y1="210" x2="155" y2="210" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                  </g>
                )}

                {/* 2. LENGAN KIRI & KANAN */}
                {selectedArms.id === 'arms-gripper' && (
                  <g className={testAction === 'grip' ? 'animate-pulse' : ''}>
                    {/* Lengan Kiri Capit */}
                    <path d="M 52 140 Q 25 155 22 175" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M 16 170 Q 22 188 32 180" stroke="#e11d48" strokeWidth="5" fill="none" />
                    {/* Lengan Kanan Capit */}
                    <path d="M 148 140 Q 175 155 178 175" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <path d="M 184 170 Q 178 188 168 180" stroke="#e11d48" strokeWidth="5" fill="none" />
                  </g>
                )}
                {selectedArms.id === 'arms-brush' && (
                  <g>
                    <path d="M 52 140 Q 25 150 20 170" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <rect x="12" y="168" width="16" height="10" rx="3" fill="#eab308" />
                    <path d="M 12 178 L 20 190 L 28 178 Z" fill="#3b82f6" />
                    <path d="M 148 140 Q 175 150 180 170" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <circle cx="184" cy="176" r="8" fill="#10b981" />
                  </g>
                )}
                {selectedArms.id === 'arms-tools' && (
                  <g>
                    <path d="M 52 140 Q 20 145 15 165" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <rect x="8" y="160" width="14" height="22" rx="4" fill="#f59e0b" />
                    <path d="M 148 140 Q 180 145 185 165" stroke="#475569" strokeWidth="8" strokeLinecap="round" fill="none" />
                    <circle cx="188" cy="170" r="10" fill="#64748b" stroke="#334155" strokeWidth="3" />
                  </g>
                )}
                {selectedArms.id === 'arms-highfive' && (
                  <g>
                    <path d="M 52 140 Q 15 120 18 95" stroke={customConfig.primaryColor} strokeWidth="10" strokeLinecap="round" fill="none" />
                    <circle cx="18" cy="92" r="10" fill="#fda4af" />
                    <path d="M 148 140 Q 185 120 182 95" stroke={customConfig.primaryColor} strokeWidth="10" strokeLinecap="round" fill="none" />
                    <circle cx="182" cy="92" r="10" fill="#fda4af" />
                  </g>
                )}

                {/* 3. BADAN UTAMA */}
                <rect
                  x="50"
                  y="120"
                  width="100"
                  height="75"
                  rx="18"
                  fill={customConfig.primaryColor}
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                {/* Detail Badan */}
                {selectedBody.id === 'body-solar' && (
                  <g>
                    <rect x="64" y="132" width="72" height="48" rx="8" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="88" y1="132" x2="88" y2="180" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="112" y1="132" x2="112" y2="180" stroke="#38bdf8" strokeWidth="2" />
                    <line x1="64" y1="156" x2="136" y2="156" stroke="#38bdf8" strokeWidth="2" />
                  </g>
                )}
                {selectedBody.id === 'body-crystal' && (
                  <g>
                    <rect x="68" y="132" width="64" height="48" rx="10" fill="#0f172a" />
                    <polygon points="100,138 120,156 100,174 80,156" fill="#ec4899" className="animate-pulse" />
                  </g>
                )}
                {selectedBody.id === 'body-titanium' && (
                  <g>
                    <rect x="65" y="134" width="70" height="46" rx="8" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
                    <circle cx="75" cy="144" r="3" fill="#cbd5e1" />
                    <circle cx="125" cy="144" r="3" fill="#cbd5e1" />
                    <circle cx="75" cy="170" r="3" fill="#cbd5e1" />
                    <circle cx="125" cy="170" r="3" fill="#cbd5e1" />
                  </g>
                )}
                {selectedBody.id === 'body-gearbox' && (
                  <g>
                    <rect x="66" y="134" width="68" height="46" rx="8" fill="#0f172a" />
                    <circle cx="88" cy="157" r="14" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
                    <circle cx="112" cy="157" r="10" fill="#3b82f6" stroke="#2563eb" strokeWidth="3" />
                  </g>
                )}

                {/* 4. KEPALA */}
                <rect x="92" y="112" width="16" height="10" fill="#64748b" />
                <rect
                  x="56"
                  y="48"
                  width="88"
                  height="64"
                  rx="18"
                  fill={customConfig.primaryColor}
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                {/* Layar Muka */}
                <rect x="66" y="58" width="68" height="44" rx="12" fill="#0f172a" />

                {/* Mata Khusus per Pilihan Kepala */}
                {selectedHead.id === 'head-camera' && (
                  <g>
                    <circle cx="85" cy="76" r="10" fill="#06b6d4" stroke="#22d3ee" strokeWidth="3" />
                    <circle cx="115" cy="76" r="10" fill="#06b6d4" stroke="#22d3ee" strokeWidth="3" />
                    <circle cx="85" cy="76" r="4" fill="#ffffff" />
                    <circle cx="115" cy="76" r="4" fill="#ffffff" />
                  </g>
                )}
                {selectedHead.id === 'head-sonar' && (
                  <g>
                    <rect x="75" y="66" width="18" height="20" rx="5" fill="#a855f7" stroke="#d8b4fe" strokeWidth="2" />
                    <rect x="107" y="66" width="18" height="20" rx="5" fill="#a855f7" stroke="#d8b4fe" strokeWidth="2" />
                    <circle cx="84" cy="76" r="4" fill="#f3e8ff" />
                    <circle cx="116" cy="76" r="4" fill="#f3e8ff" />
                  </g>
                )}
                {selectedHead.id === 'head-screen' && (
                  <g>
                    {testAction === 'disco' ? (
                      <>
                        <path d="M 76 74 Q 85 64 94 74" stroke="#ec4899" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M 106 74 Q 115 64 124 74" stroke="#ec4899" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </>
                    ) : (
                      <>
                        <circle cx="84" cy="74" r="6" fill="#22c55e" />
                        <circle cx="116" cy="74" r="6" fill="#22c55e" />
                      </>
                    )}
                    <path d="M 90 88 Q 100 95 110 88" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </g>
                )}
                {selectedHead.id === 'head-antenna' && (
                  <g>
                    <line x1="100" y1="48" x2="100" y2="24" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="100" cy="22" r="7" fill="#ef4444" className="animate-ping" style={{ transformOrigin: '100px 22px' }} />
                    <circle cx="100" cy="22" r="6" fill="#ef4444" />
                    <circle cx="85" cy="78" r="6" fill="#38bdf8" />
                    <circle cx="115" cy="78" r="6" fill="#38bdf8" />
                  </g>
                )}

                {/* 5. AKSESORIS */}
                {selectedAcc.id === 'acc-crown' && (
                  <path d="M 72 48 L 78 30 L 90 40 L 100 24 L 110 40 L 122 30 L 128 48 Z" fill="#facc15" stroke="#b45309" strokeWidth="2" />
                )}
                {selectedAcc.id === 'acc-chef' && (
                  <g>
                    <ellipse cx="100" cy="46" rx="28" ry="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                    <circle cx="85" cy="34" r="14" fill="#ffffff" />
                    <circle cx="100" cy="26" r="16" fill="#ffffff" />
                    <circle cx="115" cy="34" r="14" fill="#ffffff" />
                  </g>
                )}
                {selectedAcc.id === 'acc-glasses' && (
                  <g>
                    <rect x="74" y="70" width="22" height="14" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
                    <rect x="104" y="70" width="22" height="14" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" opacity="0.85" />
                    <line x1="96" y1="77" x2="104" y2="77" stroke="#38bdf8" strokeWidth="3" />
                  </g>
                )}
                {selectedAcc.id === 'acc-star' && (
                  <g>
                    <polygon points="100,5 104,18 118,18 107,26 111,39 100,31 89,39 93,26 82,18 96,18" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  </g>
                )}
              </svg>
            </div>

            {/* Nama & Label Robot */}
            <div className="mt-4 text-center z-10">
              <span className="text-xl font-black text-slate-800 tracking-wide bg-white/80 px-4 py-1 rounded-full shadow border border-sky-200">
                {customConfig.name || 'Robot Hebat'}
              </span>
            </div>
          </div>

          {/* Color Palettes Picker */}
          <div className="bg-white rounded-2xl p-4 shadow border border-slate-200">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5 mb-2.5">
              <Palette className="w-4 h-4 text-indigo-500" />
              Pilih Warna Cat Utama Robot:
            </span>
            <div className="flex items-center justify-between gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => {
                    playPop();
                    onUpdateConfig({ ...customConfig, primaryColor: preset.color });
                  }}
                  className={`w-9 h-9 rounded-full transition-transform border-2 border-white shadow-md active:scale-90 ${
                    customConfig.primaryColor === preset.color
                      ? `scale-125 ring-4 ${preset.ring}`
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.label}
                />
              ))}
            </div>
          </div>

          {/* Uji Coba Tombol Aksi (Test Drive) */}
          <div className="bg-white rounded-2xl p-4 shadow border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <Play className="w-4 h-4 text-emerald-500" />
              Uji Coba Aksi Robot di Tempat:
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleTestDrive('zoom')}
                className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <span>🏎️ Meluncur Cepat</span>
              </button>
              <button
                onClick={() => handleTestDrive('grip')}
                className="p-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <span>🦾 Gerak Capit</span>
              </button>
              <button
                onClick={() => handleTestDrive('disco')}
                className="p-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <span>✨ Lampu Disko</span>
              </button>
              <button
                onClick={() => handleTestDrive('beep')}
                className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <span>🔊 Bunyi Klakson</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Part Selection Catalog & Stats (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playPop();
                  setActiveCategory(cat.id);
                }}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all shadow border-2 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-sky-500 text-white border-sky-400 scale-105 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto p-1">
            {currentParts.map((part) => {
              const isSelected =
                (activeCategory === 'head' && customConfig.headId === part.id) ||
                (activeCategory === 'body' && customConfig.bodyId === part.id) ||
                (activeCategory === 'arms' && customConfig.armsId === part.id) ||
                (activeCategory === 'legs' && customConfig.legsId === part.id) ||
                (activeCategory === 'accessory' && customConfig.accessoryId === part.id);

              return (
                <div
                  key={part.id}
                  onClick={() => handleSelectPart(part.id)}
                  className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 border-3 relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-400 shadow-lg ring-4 ring-amber-300/40 scale-[1.02]'
                      : 'bg-white border-slate-200 hover:border-sky-300 shadow hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 rounded-full p-1 shadow">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  <div>
                    <h3 className="font-black text-slate-800 text-sm sm:text-base pr-6">
                      {part.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                      {part.description}
                    </p>
                  </div>

                  {/* Fun Fact Pill */}
                  <div className="mt-3 bg-sky-50 rounded-xl p-2 border border-sky-100 flex items-start gap-1.5">
                    <span className="text-xs">💡</span>
                    <p className="text-[11px] font-medium text-sky-800 leading-tight">
                      {part.funFact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Robot Stats Meter */}
          <div className="bg-white rounded-3xl p-5 shadow border border-slate-200 space-y-3">
            <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Kemampuan Robot Rakitanmu:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-blue-50 p-2.5 rounded-2xl border border-blue-100">
                <span className="text-xs font-bold text-blue-700 block mb-1">Mata Sensor</span>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-xs ${i <= totalSensor ? 'text-amber-400' : 'text-slate-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-100">
                <span className="text-xs font-bold text-amber-700 block mb-1">Daya Baterai</span>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-xs ${i <= totalBattery ? 'text-amber-400' : 'text-slate-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-rose-50 p-2.5 rounded-2xl border border-rose-100">
                <span className="text-xs font-bold text-rose-700 block mb-1">Kekuatan Lengan</span>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-xs ${i <= totalStrength ? 'text-amber-400' : 'text-slate-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 p-2.5 rounded-2xl border border-emerald-100">
                <span className="text-xs font-bold text-emerald-700 block mb-1">Kecepatan Gerak</span>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className={`text-xs ${i <= totalSpeed ? 'text-amber-400' : 'text-slate-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tombol Lanjut ke Coding */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playPop();
                  onTakeToCodeRunner();
                }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-black text-base sm:text-lg shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>🚀 Bawa {customConfig.name || 'Robot'} ke Arena Coding!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
