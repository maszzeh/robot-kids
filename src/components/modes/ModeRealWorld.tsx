'use client';

import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { REAL_ROBOTS } from '../../data/realRobotsData';
import { RealRobot } from '../../lib/types';
import { playPop, playRobotBeep, speakIndonesian } from '../../lib/sounds';

interface ModeRealWorldProps {
  onGoToQuiz: () => void;
}

export const ModeRealWorld: React.FC<ModeRealWorldProps> = ({ onGoToQuiz }) => {
  const [selectedRobot, setSelectedRobot] = useState<RealRobot>(REAL_ROBOTS[0]);

  const handleSelectRobot = (bot: RealRobot) => {
    playPop();
    setSelectedRobot(bot);
    speakIndonesian(bot.name + '. ' + bot.tagline + ' ' + bot.description);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Title Bar */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl text-2xl">
            🌍
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
              Galeri Robot di Kehidupan Nyata
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Lihat di mana saja robot-robot hebat membantu pekerjaan manusia setiap hari!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playPop();
            onGoToQuiz();
          }}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
        >
          <span>Uji Kuis Juara Robotika 🏆</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Robot Selection Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {REAL_ROBOTS.map((bot) => {
            const isSel = selectedRobot.id === bot.id;
            return (
              <div
                key={bot.id}
                onClick={() => handleSelectRobot(bot)}
                className={`p-4 rounded-3xl cursor-pointer border-3 transition-all duration-300 flex flex-col items-center text-center justify-between gap-2 shadow-sm ${
                  isSel
                    ? 'bg-sky-500 text-white border-sky-400 scale-105 shadow-xl ring-4 ring-sky-300/40'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:shadow-md'
                }`}
              >
                <div className="text-4xl sm:text-5xl my-1 animate-float">
                  {bot.emoji}
                </div>
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    isSel ? 'bg-sky-600 text-sky-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {bot.field}
                  </span>
                  <h3 className="font-black text-xs sm:text-sm mt-1 leading-snug">
                    {bot.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Robot Showcase Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-slate-100 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center text-4xl shadow-inner border border-sky-200">
                {selectedRobot.emoji}
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  {selectedRobot.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                  {selectedRobot.name}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                playRobotBeep();
                speakIndonesian(selectedRobot.name + '. ' + selectedRobot.description);
              }}
              className="px-3.5 py-2 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Dengarkan cerita robot"
            >
              <Volume2 className="w-4 h-4 text-sky-600" />
              <span>Dengarkan Cerita</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            {selectedRobot.description}
          </p>

          {/* Superpowers list */}
          <div className="space-y-2.5">
            <h4 className="font-black text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Kemampuan Super Robot Ini:
            </h4>
            <div className="space-y-1.5">
              {selectedRobot.superPowers.map((power, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{power}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real World Impact */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs font-black text-emerald-800 block mb-1">
              ❤️ Manfaat Nyata untuk Kita:
            </span>
            <p className="text-xs sm:text-sm text-emerald-950">
              {selectedRobot.realWorldImpact}
            </p>
          </div>

          {/* Trivia Fact */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <span className="text-xs font-black text-amber-900 block">Tahukah Kamu?</span>
              <p className="text-xs sm:text-sm text-amber-800 mt-0.5">
                {selectedRobot.quizFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
