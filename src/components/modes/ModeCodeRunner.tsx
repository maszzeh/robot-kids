'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUp,
  ArrowDown,
  RotateCcw,
  RotateCw,
  Volume2,
  Play,
  RefreshCw,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { CODING_LEVELS } from '../../data/codingLevelsData';
import { CommandAction, Direction, CustomRobotConfig } from '../../lib/types';
import {
  playPop,
  playMechanicalStep,
  playRobotBeep,
  playSuccessChime,
  playVictoryFanfare,
  playObstacleBump,
  speakIndonesian,
} from '../../lib/sounds';
import { ConfettiEffect } from '../ConfettiEffect';

interface ModeCodeRunnerProps {
  customConfig: CustomRobotConfig;
  onLevelComplete: (levelId: number) => void;
  completedLevels: number[];
}

export const ModeCodeRunner: React.FC<ModeCodeRunnerProps> = ({
  customConfig,
  onLevelComplete,
  completedLevels,
}) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const level = CODING_LEVELS[currentLevelIndex];

  // Game state
  const [robotPos, setRobotPos] = useState<[number, number]>(level.startPos);
  const [robotDir, setRobotDir] = useState<Direction>(level.startDirection);
  const [commands, setCommands] = useState<CommandAction[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [collectedItems, setCollectedItems] = useState<{ [key: string]: boolean }>({});
  const [showVictory, setShowVictory] = useState(false);
  const [statusMessage, setStatusMessage] = useState(level.instruction);

  // Sync state whenever level changes
  useEffect(() => {
    resetToStart();
  }, [currentLevelIndex]);

  const resetToStart = () => {
    setRobotPos(level.startPos);
    setRobotDir(level.startDirection);
    setCommands([]);
    setIsRunning(false);
    setActiveStepIndex(null);
    setCollectedItems({});
    setShowVictory(false);
    setStatusMessage(level.instruction);
  };

  const handleAddCommand = (cmd: CommandAction) => {
    if (isRunning) return;
    if (commands.length >= level.maxCommands) {
      speakIndonesian('Program sudah penuh! Jalankan kodemu atau hapus langkah.');
      return;
    }
    playPop();
    setCommands([...commands, cmd]);
  };

  const handleRemoveCommand = (index: number) => {
    if (isRunning) return;
    playPop();
    const updated = [...commands];
    updated.splice(index, 1);
    setCommands(updated);
  };

  const getRotatedDirection = (current: Direction, turn: 'TURN_LEFT' | 'TURN_RIGHT'): Direction => {
    const dirs: Direction[] = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
    const idx = dirs.indexOf(current);
    if (turn === 'TURN_RIGHT') {
      return dirs[(idx + 1) % 4];
    } else {
      return dirs[(idx + 3) % 4];
    }
  };

  const getNextPosition = (pos: [number, number], dir: Direction, isBackward = false): [number, number] => {
    let [r, c] = pos;
    const step = isBackward ? -1 : 1;
    if (dir === 'UP') r -= step;
    if (dir === 'DOWN') r += step;
    if (dir === 'LEFT') c -= step;
    if (dir === 'RIGHT') c += step;
    return [r, c];
  };

  const runCommands = async () => {
    if (commands.length === 0 || isRunning) return;

    setIsRunning(true);
    setStatusMessage('Bobi sedang bergerak menjalankan instruksimu...');

    let curPos: [number, number] = [...robotPos];
    let curDir: Direction = robotDir;
    const currentCollected = { ...collectedItems };

    for (let i = 0; i < commands.length; i++) {
      setActiveStepIndex(i);
      const cmd = commands[i];

      await new Promise((res) => setTimeout(res, 650));

      if (cmd === 'FORWARD' || cmd === 'BACKWARD') {
        const nextPos = getNextPosition(curPos, curDir, cmd === 'BACKWARD');
        const [nr, nc] = nextPos;

        // Check boundary
        if (nr < 0 || nr >= level.gridRows || nc < 0 || nc >= level.gridCols) {
          playObstacleBump();
          speakIndonesian('Aduh! Menabrak dinding pembatas lab!');
          setStatusMessage('Oops! Bobi terbentur tepi dinding!');
          break;
        }

        // Check obstacle
        const hitObstacle = level.obstacles.some(([or, oc]) => or === nr && oc === nc);
        if (hitObstacle) {
          playObstacleBump();
          speakIndonesian('Aduh! Ada batu karang menghalangi!');
          setStatusMessage('Oops! Bobi terhalang batu. Coba belokkan arahnya!');
          break;
        }

        // Move allowed
        curPos = nextPos;
        setRobotPos(curPos);
        playMechanicalStep();

        // Check item collection
        level.items.forEach((item, itemIdx) => {
          if (item.pos[0] === curPos[0] && item.pos[1] === curPos[1]) {
            currentCollected[`${item.pos[0]}-${item.pos[1]}`] = true;
            setCollectedItems({ ...currentCollected });
            playSuccessChime();
          }
        });
      } else if (cmd === 'TURN_LEFT' || cmd === 'TURN_RIGHT') {
        curDir = getRotatedDirection(curDir, cmd);
        setRobotDir(curDir);
        playMechanicalStep();
      } else if (cmd === 'BEEP') {
        playRobotBeep();
        speakIndonesian('Bip bop! Gerbang sensor mengenali sinyal!');
      }
    }

    setActiveStepIndex(null);
    setIsRunning(false);

    // Evaluate Win Condition
    const reachedTarget = curPos[0] === level.targetPos[0] && curPos[1] === level.targetPos[1];
    const allItemsCollected = level.items.every(
      (item) => currentCollected[`${item.pos[0]}-${item.pos[1]}`]
    );

    if (reachedTarget && allItemsCollected) {
      playVictoryFanfare();
      speakIndonesian('Hebat sekali! Misi robot berhasil diselesaikan!');
      setStatusMessage('🎉 YAY! Programmu berjalan sempurna!');
      setShowVictory(true);
      onLevelComplete(level.id);
    } else if (reachedTarget && !allItemsCollected) {
      speakIndonesian('Bobi sampai stasiun, tapi ada gear atau baterai yang terlewat!');
      setStatusMessage('Hampir! Jangan lupa pungut semua baterai/gear dulu ya!');
    } else {
      setStatusMessage('Belum sampai tujuan nih. Ubah atau tambahkan perintahnya!');
    }
  };

  const commandConfig: {
    [key in CommandAction]: { label: string; icon: React.ReactNode; color: string; desc: string };
  } = {
    FORWARD: {
      label: 'Maju',
      icon: <ArrowUp className="w-5 h-5 stroke-[3]" />,
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600',
      desc: 'Maju 1 kotak ke depan',
    },
    BACKWARD: {
      label: 'Mundur',
      icon: <ArrowDown className="w-5 h-5 stroke-[3]" />,
      color: 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600',
      desc: 'Mundur 1 kotak ke belakang',
    },
    TURN_LEFT: {
      label: 'Belok Kiri',
      icon: <RotateCcw className="w-5 h-5 stroke-[3]" />,
      color: 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
      desc: 'Putar badan 90° ke kiri',
    },
    TURN_RIGHT: {
      label: 'Belok Kanan',
      icon: <RotateCw className="w-5 h-5 stroke-[3]" />,
      color: 'bg-blue-500 hover:bg-blue-600 text-white border-blue-600',
      desc: 'Putar badan 90° ke kanan',
    },
    BEEP: {
      label: 'Bip Bop',
      icon: <Volume2 className="w-5 h-5 stroke-[3]" />,
      color: 'bg-purple-500 hover:bg-purple-600 text-white border-purple-600',
      desc: 'Klakson sinyal suara',
    },
    GRAB: {
      label: 'Capit',
      icon: <Sparkles className="w-5 h-5 stroke-[3]" />,
      color: 'bg-rose-500 hover:bg-rose-600 text-white border-rose-600',
      desc: 'Ambil benda dengan tangan capit',
    },
  };

  const getRotationDegree = (dir: Direction) => {
    switch (dir) {
      case 'UP':
        return 0;
      case 'RIGHT':
        return 90;
      case 'DOWN':
        return 180;
      case 'LEFT':
        return 270;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn relative">
      <ConfettiEffect active={showVictory} />

      {/* Level Selector Header */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              {level.title}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Maks: {level.maxCommands} Blok
            </span>
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-700">
            {level.story}
          </p>
        </div>

        {/* Level Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {CODING_LEVELS.map((lvl, idx) => {
            const isCompleted = completedLevels.includes(lvl.id);
            const isCurrent = currentLevelIndex === idx;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  playPop();
                  setCurrentLevelIndex(idx);
                }}
                className={`w-9 h-9 rounded-2xl font-black text-xs transition-all shadow flex items-center justify-center border-2 ${
                  isCurrent
                    ? 'bg-sky-500 text-white border-sky-400 scale-110 shadow-md ring-2 ring-sky-300'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {isCompleted ? '⭐' : idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Interactive 2D Grid Arena (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xl border-4 border-sky-100 flex flex-col items-center justify-center">
          {/* Status Message Pill */}
          <div className="w-full mb-4 bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="text-xs sm:text-sm font-bold text-sky-900">
                {statusMessage}
              </span>
            </div>
            <button
              onClick={() => speakIndonesian(statusMessage)}
              className="text-sky-600 hover:text-sky-800 p-1"
              title="Dengarkan instruksi"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {/* Arena Grid */}
          <div
            className="grid gap-2 bg-slate-100 p-3 rounded-3xl border-4 border-slate-300 shadow-inner select-none"
            style={{
              gridTemplateColumns: `repeat(${level.gridCols}, minmax(0, 1fr))`,
              width: '100%',
              maxWidth: '440px',
              aspectRatio: `${level.gridCols} / ${level.gridRows}`,
            }}
          >
            {Array.from({ length: level.gridRows }).map((_, r) =>
              Array.from({ length: level.gridCols }).map((__, c) => {
                const isRobotHere = robotPos[0] === r && robotPos[1] === c;
                const isTargetHere = level.targetPos[0] === r && level.targetPos[1] === c;
                const isObstacle = level.obstacles.some(([or, oc]) => or === r && oc === c);
                const item = level.items.find((it) => it.pos[0] === r && it.pos[1] === c);
                const isItemCollected = item ? collectedItems[`${r}-${c}`] : false;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`relative rounded-2xl flex items-center justify-center font-black transition-all border-2 ${
                      isTargetHere
                        ? 'bg-amber-100 border-amber-300 shadow-sm'
                        : isObstacle
                        ? 'bg-stone-300 border-stone-400'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Obstacle Rock */}
                    {isObstacle && (
                      <span className="text-2xl sm:text-3xl drop-shadow">🪨</span>
                    )}

                    {/* Target Station */}
                    {isTargetHere && !isRobotHere && (
                      <div className="flex flex-col items-center animate-pulse">
                        <span className="text-2xl sm:text-3xl">🏁</span>
                        <span className="text-[9px] font-extrabold text-amber-800">
                          FINISH
                        </span>
                      </div>
                    )}

                    {/* Collectible item */}
                    {item && !isItemCollected && !isRobotHere && (
                      <span className="text-2xl sm:text-3xl animate-bounce">
                        {item.type === 'battery' ? '⚡' : '⚙️'}
                      </span>
                    )}

                    {/* The Robot Character */}
                    {isRobotHere && (
                      <div
                        className="relative z-20 transition-all duration-300 flex items-center justify-center"
                        style={{
                          transform: `rotate(${getRotationDegree(robotDir)}deg)`,
                        }}
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-400 rounded-2xl border-3 border-slate-900 shadow-md flex items-center justify-center">
                          <span className="text-xl sm:text-2xl">🤖</span>
                          {/* Direction Indicator Nose/Arrow */}
                          <div className="absolute -top-1.5 w-3 h-3 bg-amber-400 border-2 border-slate-900 rotate-45" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Hint Footer */}
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500 bg-amber-50/80 px-4 py-2 rounded-2xl border border-amber-200">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{level.hint}</span>
          </div>
        </div>

        {/* Right: Code Programming Palette & Sequence Tray (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Command Blocks Palette */}
          <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 space-y-3">
            <h3 className="font-black text-slate-800 text-sm flex items-center justify-between">
              <span>Pilihan Blok Perintah (Klik untuk Menambahkan):</span>
              <span className="text-xs text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
                {commands.length}/{level.maxCommands}
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              {level.availableCommands.map((cmd) => {
                const cfg = commandConfig[cmd];
                return (
                  <button
                    key={cmd}
                    disabled={isRunning || commands.length >= level.maxCommands}
                    onClick={() => handleAddCommand(cmd)}
                    className={`p-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow border-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${cfg.color}`}
                  >
                    {cfg.icon}
                    <span>{cfg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Program Tray (Urutan Instruksi yang Disusun) */}
          <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-800 text-xs sm:text-sm">
                Urutan Program Bobi:
              </h4>
              {commands.length > 0 && !isRunning && (
                <button
                  onClick={() => {
                    playPop();
                    setCommands([]);
                  }}
                  className="text-xs text-red-500 font-bold hover:underline"
                >
                  Hapus Semua
                </button>
              )}
            </div>

            {/* Sequence Slot Container */}
            <div className="min-h-[140px] max-h-[190px] overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-1.5">
              {commands.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                  <span className="text-2xl mb-1">📋</span>
                  <p className="text-xs font-semibold">
                    Belum ada instruksi. Klik tombol di atas untuk mulai memprogram!
                  </p>
                </div>
              ) : (
                commands.map((cmd, idx) => {
                  const cfg = commandConfig[cmd];
                  const isActive = activeStepIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs font-black transition-all ${
                        isActive
                          ? 'bg-amber-300 text-slate-900 border-amber-400 shadow-md scale-102 ring-2 ring-amber-400'
                          : 'bg-white text-slate-700 border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{cfg.label}</span>
                      </div>
                      {!isRunning && (
                        <button
                          onClick={() => handleRemoveCommand(idx)}
                          className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-black text-xs flex items-center justify-center"
                          title="Hapus blok ini"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Control Run / Reset Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                disabled={commands.length === 0 || isRunning}
                onClick={runCommands}
                className="col-span-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{isRunning ? 'Berjalan...' : 'Jalankan!'}</span>
              </button>

              <button
                disabled={isRunning}
                onClick={() => {
                  playPop();
                  resetToStart();
                }}
                className="py-3.5 px-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1 transition-transform active:scale-95 disabled:opacity-50"
                title="Kembalikan posisi robot"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Ulang</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      {showVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border-4 border-amber-300 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-5xl shadow-inner animate-bounce">
              🏆
            </div>
            <h3 className="text-2xl font-black text-slate-800">
              Hebat Sekali, Programmer Cilik!
            </h3>
            <p className="text-slate-600 text-sm">
              Kamu berhasil menyusun logika algoritma yang membawa {customConfig.name || 'Bobi'} mencapai tujuan dengan selamat!
            </p>

            <div className="flex justify-center gap-2 py-2">
              <span className="text-3xl animate-bounce">⭐</span>
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0.15s' }}>⭐</span>
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0.3s' }}>⭐</span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {currentLevelIndex < CODING_LEVELS.length - 1 ? (
                <button
                  onClick={() => {
                    playPop();
                    setCurrentLevelIndex((prev) => prev + 1);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base shadow-lg transition-transform active:scale-95"
                >
                  Lanjut ke Level Berikutnya 🚀
                </button>
              ) : (
                <div className="text-sm font-black text-emerald-600 bg-emerald-50 p-3 rounded-2xl">
                  🎉 Selamat! Kamu telah menaklukkan SEMUA level coding robot!
                </div>
              )}
              <button
                onClick={() => {
                  playPop();
                  setShowVictory(false);
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
              >
                Coba Lagi Level Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
