'use client';

import React, { useState, useEffect } from 'react';
import {
  Radio,
  Sun,
  Moon,
  Thermometer,
  Magnet,
  Sparkles,
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { SENSOR_EXPERIMENTS } from '../../data/sensorExperimentsData';
import { SensorLabType } from '../../lib/types';
import {
  playPop,
  playSonarPing,
  playMetalBeep,
  playSuccessChime,
  playRobotBeep,
  speakIndonesian,
} from '../../lib/sounds';

interface ModeSensorLabProps {
  onSensorDiscovered: (sensor: SensorLabType) => void;
  discoveredSensors: SensorLabType[];
}

export const ModeSensorLab: React.FC<ModeSensorLabProps> = ({
  onSensorDiscovered,
  discoveredSensors,
}) => {
  const [activeTab, setActiveTab] = useState<SensorLabType>('distance');

  // Experiment 1: Sonar
  const [distanceCm, setDistanceCm] = useState(65);

  // Experiment 2: Light
  const [lightLux, setLightLux] = useState(80); // 0 (Night) to 100 (Sun)

  // Experiment 3: Temperature
  const [tempMode, setTempMode] = useState<'cold' | 'normal' | 'hot'>('normal');

  // Experiment 4: Metal Detector
  const [metalGrid, setMetalGrid] = useState<{ [key: string]: boolean }>({
    '0-2': true, // Gir Emas
    '2-1': true, // Baut Baja
    '3-3': true, // Kunci Pas
  });
  const [dugItems, setDugItems] = useState<{ [key: string]: string }>({});
  const [probePos, setProbePos] = useState<[number, number]>([0, 0]);

  // Mark discovered
  useEffect(() => {
    onSensorDiscovered(activeTab);
  }, [activeTab]);

  // 1. Distance Sonar handler
  const handleDistanceChange = (val: number) => {
    setDistanceCm(val);
    const ratio = Math.max(0.1, val / 120);
    playSonarPing(ratio);
  };

  // 2. Metal detector grid click
  const handleProbeMove = (r: number, c: number) => {
    setProbePos([r, c]);
    const key = `${r}-${c}`;

    // calculate distance to nearest metal
    let minDist = 999;
    Object.keys(metalGrid).forEach((k) => {
      const [mr, mc] = k.split('-').map(Number);
      const d = Math.hypot(mr - r, mc - c);
      if (d < minDist) minDist = d;
    });

    const proximity = Math.max(0, 1 - minDist / 3);
    playMetalBeep(proximity);

    if (minDist === 0 && !dugItems[key]) {
      speakIndonesian('Bip kencang! Ada benda logam tepat di bawah sini!');
    }
  };

  const handleDigMetal = () => {
    const key = `${probePos[0]}-${probePos[1]}`;
    if (metalGrid[key] && !dugItems[key]) {
      playSuccessChime();
      let itemName = 'Baut Baja Logam';
      if (key === '0-2') itemName = 'Roda Gigi Emas';
      if (key === '3-3') itemName = 'Kunci Pas Robotik';

      setDugItems({ ...dugItems, [key]: itemName });
      speakIndonesian('Hebat! Kamu menemukan ' + itemName + '!');
    } else {
      playPop();
      speakIndonesian('Hanya ada pasir di sini. Coba geser ke kotak lain!');
    }
  };

  const curSensor = SENSOR_EXPERIMENTS.find((s) => s.type === activeTab)!;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Title Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl text-2xl">
            🔬
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
              Laboratorium Eksperimen Sensor Robot
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Lihat bagaimana mata, telinga, dan kulit robot mengenali dunia sekitarnya!
            </p>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {(
            [
              { type: 'distance', label: 'Sonar Jarak', icon: Radio },
              { type: 'light', label: 'Cahaya (LDR)', icon: Sun },
              { type: 'temperature', label: 'Suhu Panas', icon: Thermometer },
              { type: 'metal', label: 'Detektor Logam', icon: Magnet },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.type;
            return (
              <button
                key={tab.type}
                onClick={() => {
                  playPop();
                  setActiveTab(tab.type);
                }}
                className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shadow border-2 flex items-center gap-1.5 whitespace-nowrap ${
                  isSel
                    ? 'bg-purple-600 text-white border-purple-500 scale-105 shadow-md'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sensor Concept Info Card */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-sky-50 rounded-3xl p-5 border-2 border-purple-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-purple-700 tracking-wide bg-purple-100 px-3 py-1 rounded-full inline-block mb-1">
            {curSensor.organEquivalent}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-800">
            {curSensor.title}: {curSensor.subtitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            {curSensor.concept}
          </p>
        </div>
        <button
          onClick={() => speakIndonesian(curSensor.title + '. ' + curSensor.concept)}
          className="px-3 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-purple-700 shrink-0 shadow"
        >
          <Volume2 className="w-4 h-4" />
          <span>Dengarkan Penjelasan</span>
        </button>
      </div>

      {/* Main Interactive Experiment Canvas */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 min-h-[420px] flex flex-col justify-center">
        {/* EXPERIMENT 1: SONAR DISTANCE */}
        {activeTab === 'distance' && (
          <div className="space-y-6">
            <div className="relative w-full h-64 bg-slate-900 rounded-3xl p-6 overflow-hidden flex items-center justify-between border-4 border-slate-800 shadow-inner">
              {/* Bobi Robot on left */}
              <div className="flex flex-col items-center z-10">
                <div className="w-20 h-24 bg-sky-400 rounded-2xl border-4 border-sky-300 shadow-lg flex flex-col items-center justify-center relative">
                  {/* Eyes with sonar beam */}
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-400 border-2 border-white animate-ping" />
                    <div className="w-4 h-4 rounded-full bg-purple-400 border-2 border-white animate-ping" />
                  </div>
                  <span className="text-xl mt-1">🤖</span>
                </div>
                <span className="text-[11px] font-black text-sky-300 mt-1">Bobi</span>
              </div>

              {/* Dynamic Sound Waves */}
              <div className="flex-1 flex items-center justify-around px-4 pointer-events-none">
                {[1, 2, 3, 4].map((wave) => (
                  <div
                    key={wave}
                    className="w-1.5 h-16 rounded-full bg-purple-400/80 animate-pulse"
                    style={{
                      height: `${30 + wave * 18}px`,
                      animationDelay: `${wave * 0.15}s`,
                    }}
                  />
                ))}
              </div>

              {/* Movable Obstacle Wall */}
              <div
                className="z-10 transition-all duration-300 flex flex-col items-center"
                style={{
                  transform: `translateX(-${(120 - distanceCm) * 1.8}px)`,
                }}
              >
                <div className="w-16 h-36 bg-amber-600 rounded-2xl border-4 border-amber-400 flex flex-col items-center justify-center text-white shadow-2xl">
                  <span className="text-3xl">🧱</span>
                  <span className="text-[10px] font-black mt-1">DINDING</span>
                </div>
              </div>

              {/* Sonar Ping HUD readout */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-purple-400/40 text-purple-300 font-mono text-xs font-bold">
                JARAK: {distanceCm} CM
              </div>

              {/* Status Indicator */}
              <div
                className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow ${
                  distanceCm < 30
                    ? 'bg-red-500 text-white animate-bounce'
                    : distanceCm < 70
                    ? 'bg-yellow-400 text-slate-900'
                    : 'bg-emerald-500 text-white'
                }`}
              >
                {distanceCm < 30 ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>AWAS! TERLALU DEKAT! REM!</span>
                  </>
                ) : distanceCm < 70 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Waspada, Siap-Siap Belok</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Jalanan Depan Luas & Aman!</span>
                  </>
                )}
              </div>
            </div>

            {/* Slider Control */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Dekat Sekali (15 cm)</span>
                <span className="text-purple-700 font-black text-sm">
                  Geser Jarak Dinding: {distanceCm} cm
                </span>
                <span>Jauh (120 cm)</span>
              </div>
              <input
                type="range"
                min={15}
                max={120}
                value={distanceCm}
                onChange={(e) => handleDistanceChange(Number(e.target.value))}
                className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>
        )}

        {/* EXPERIMENT 2: LIGHT SENSOR */}
        {activeTab === 'light' && (
          <div className="space-y-6">
            <div
              className="relative w-full h-64 rounded-3xl p-6 transition-colors duration-700 flex items-center justify-around border-4 border-slate-300 shadow-inner overflow-hidden"
              style={{
                backgroundColor: `rgb(${Math.round(15 + lightLux * 2.2)}, ${Math.round(23 + lightLux * 2.1)}, ${Math.round(42 + lightLux * 1.8)})`,
              }}
            >
              {/* Sun or Moon in sky */}
              <div className="absolute top-4 left-6">
                {lightLux > 40 ? (
                  <div className="flex items-center gap-2 text-yellow-300 animate-spin" style={{ animationDuration: '20s' }}>
                    <Sun className="w-12 h-12" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-indigo-200 animate-pulse">
                    <Moon className="w-12 h-12" />
                  </div>
                )}
              </div>

              {/* Robot with Auto Headlight */}
              <div className="relative flex flex-col items-center z-10">
                <div className="w-24 h-28 bg-sky-400 rounded-2xl border-4 border-slate-900 shadow-xl flex flex-col items-center justify-center relative">
                  {/* Lampu Senter Kepala */}
                  <div
                    className={`w-10 h-6 rounded-md border-2 border-slate-900 transition-all ${
                      lightLux < 45 ? 'bg-yellow-300 shadow-[0_0_30px_#fde047]' : 'bg-slate-700'
                    }`}
                  />
                  <span className="text-2xl mt-1">🤖</span>
                </div>

                {/* Sorot Cahaya Senter saat Gelap */}
                {lightLux < 45 && (
                  <div
                    className="absolute top-10 left-20 w-44 h-24 bg-gradient-to-r from-yellow-300/60 to-transparent pointer-events-none"
                    style={{ clipPath: 'polygon(0% 30%, 100% 0%, 100% 100%, 0% 70%)' }}
                  />
                )}
              </div>

              {/* HUD Sensor Readout */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow border font-bold text-xs">
                {lightLux < 45 ? (
                  <span className="text-amber-800">
                    💡 Ruangan Gelap &rarr; Lampu Kepala MENYALA Otomatis!
                  </span>
                ) : (
                  <span className="text-emerald-800">
                    ☀️ Terang Benderang &rarr; Panel Surya Mengisi Baterai!
                  </span>
                )}
              </div>
            </div>

            {/* Slider Lux */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>🌑 Gelap Malam (0%)</span>
                <span className="text-amber-700 font-black text-sm">
                  Tingkat Terang Cahaya: {lightLux}%
                </span>
                <span>☀️ Siang Terik (100%)</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={lightLux}
                onChange={(e) => setLightLux(Number(e.target.value))}
                className="w-full h-3 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        )}

        {/* EXPERIMENT 3: TEMPERATURE SENSOR */}
        {activeTab === 'temperature' && (
          <div className="space-y-6">
            <div
              className={`w-full h-64 rounded-3xl p-6 transition-all duration-500 flex flex-col items-center justify-center border-4 shadow-inner relative overflow-hidden ${
                tempMode === 'cold'
                  ? 'bg-blue-100 border-blue-400'
                  : tempMode === 'hot'
                  ? 'bg-red-100 border-red-400'
                  : 'bg-emerald-50 border-emerald-300'
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-28 h-32 bg-sky-400 rounded-3xl border-4 border-slate-900 shadow-xl flex flex-col items-center justify-center transition-transform ${
                    tempMode === 'cold' ? 'animate-wiggle' : tempMode === 'hot' ? 'animate-bounce' : ''
                  }`}
                >
                  {/* Fan indicator when hot */}
                  {tempMode === 'hot' && (
                    <div className="absolute -top-6 text-3xl animate-spin">
                      🌀
                    </div>
                  )}
                  <span className="text-4xl">
                    {tempMode === 'cold' ? '🥶' : tempMode === 'hot' ? '🥵' : '😊'}
                  </span>
                  <span className="text-xs font-black text-slate-900 mt-2 bg-white/80 px-2 py-0.5 rounded-full">
                    {tempMode === 'cold' ? '-5°C' : tempMode === 'hot' ? '65°C' : '24°C'}
                  </span>
                </div>
              </div>

              {/* Status explanation */}
              <div className="mt-4 bg-white/95 px-4 py-2 rounded-2xl shadow border text-xs sm:text-sm font-bold text-center">
                {tempMode === 'cold' && '❄️ Sensor Suhu Dingin Aktif! Robot menyalakan penghangat baterai agar tidak beku.'}
                {tempMode === 'normal' && '🌿 Suhu Ideal! Semua sistem prosesor bekerja dengan kecepatan maksimal.'}
                {tempMode === 'hot' && '🔥 Sensor Terlalu Panas! Kipas pendingin turbo berputar kencang untuk melindungi chip.'}
              </div>
            </div>

            {/* Mode switch buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  playPop();
                  setTempMode('cold');
                  speakIndonesian('Dingin sekali! Sensor mendeteksi suhu minus lima derajat.');
                }}
                className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all ${
                  tempMode === 'cold'
                    ? 'bg-blue-500 text-white border-blue-600 scale-105 shadow-md'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}
              >
                ❄️ Kulkas Es (-5°C)
              </button>
              <button
                onClick={() => {
                  playPop();
                  setTempMode('normal');
                  speakIndonesian('Suhu kamar nyaman dua puluh empat derajat.');
                }}
                className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all ${
                  tempMode === 'normal'
                    ? 'bg-emerald-500 text-white border-emerald-600 scale-105 shadow-md'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                🌿 Nyaman (24°C)
              </button>
              <button
                onClick={() => {
                  playPop();
                  setTempMode('hot');
                  speakIndonesian('Panas sekali! Sensor menyalakan kipas turbo!');
                }}
                className={`p-3.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all ${
                  tempMode === 'hot'
                    ? 'bg-red-500 text-white border-red-600 scale-105 shadow-md'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                🔥 Tungku Api (65°C)
              </button>
            </div>
          </div>
        )}

        {/* EXPERIMENT 4: METAL DETECTOR */}
        {activeTab === 'metal' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Sandbox Grid 4x4 */}
              <div className="grid grid-cols-4 gap-2 bg-amber-200 p-4 rounded-3xl border-4 border-amber-400 shadow-inner w-full max-w-xs aspect-square">
                {Array.from({ length: 4 }).map((_, r) =>
                  Array.from({ length: 4 }).map((__, c) => {
                    const key = `${r}-${c}`;
                    const isProbeHere = probePos[0] === r && probePos[1] === c;
                    const foundItem = dugItems[key];

                    return (
                      <div
                        key={key}
                        onClick={() => handleProbeMove(r, c)}
                        className={`rounded-2xl flex items-center justify-center font-black cursor-pointer border-2 transition-transform active:scale-90 ${
                          isProbeHere
                            ? 'bg-amber-400 border-slate-900 ring-4 ring-amber-500 scale-105 shadow-lg'
                            : foundItem
                            ? 'bg-emerald-100 border-emerald-300'
                            : 'bg-amber-100/80 border-amber-300 hover:bg-amber-200'
                        }`}
                      >
                        {foundItem ? (
                          <span className="text-2xl animate-popIn">
                            {key === '0-2' ? '⚙️' : key === '3-3' ? '🔧' : '🔩'}
                          </span>
                        ) : isProbeHere ? (
                          <span className="text-2xl animate-bounce">🧲</span>
                        ) : (
                          <span className="text-xs text-amber-500">⏳</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Detector Control & Status */}
              <div className="flex-1 space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-black text-slate-800 text-sm mb-1 flex items-center gap-1.5">
                    <Magnet className="w-4 h-4 text-emerald-600" />
                    Radar Magnetik Robot:
                  </h4>
                  <p className="text-xs text-slate-600">
                    Klik kotak pasir di samping untuk mengarahkan tongkat magnet. Dengarkan suara bip yang semakin rapat jika dekat logam!
                  </p>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    Logam Ditemukan: {Object.keys(dugItems).length} / 3
                  </span>
                  <div className="flex gap-1.5">
                    <span className={dugItems['0-2'] ? 'text-xl' : 'text-xl opacity-30'}>⚙️</span>
                    <span className={dugItems['2-1'] ? 'text-xl' : 'text-xl opacity-30'}>🔩</span>
                    <span className={dugItems['3-3'] ? 'text-xl' : 'text-xl opacity-30'}>🔧</span>
                  </div>
                </div>

                <button
                  onClick={handleDigMetal}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>⛏️ Gali dan Ambil Logam di Sini!</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
