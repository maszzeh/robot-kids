'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Volume2, Printer, Sparkles, Heart } from 'lucide-react';
import { ROBOT_QUIZ_QUESTIONS } from '../../data/robotQuizData';
import {
  playPop,
  playSuccessChime,
  playObstacleBump,
  playVictoryFanfare,
  speakIndonesian,
} from '../../lib/sounds';
import { ConfettiEffect } from '../ConfettiEffect';

interface ModeQuizCertificationProps {
  playerName: string;
  onUpdatePlayerName: (name: string) => void;
  onCompleteQuiz: () => void;
}

export const ModeQuizCertification: React.FC<ModeQuizCertificationProps> = ({
  playerName,
  onUpdatePlayerName,
  onCompleteQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const curQ = ROBOT_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOptionId(optId);
    setIsAnswered(true);

    if (isCorrect) {
      playSuccessChime();
      setScore((prev) => prev + 1);
      speakIndonesian('Tepat sekali! ' + curQ.explanation);
    } else {
      playObstacleBump();
      speakIndonesian('Kurang tepat. ' + curQ.explanation);
    }
  };

  const handleNextQuestion = () => {
    playPop();
    if (currentIdx < ROBOT_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setShowCertificate(true);
      playVictoryFanfare();
      onCompleteQuiz();
    }
  };

  const handleResetQuiz = () => {
    playPop();
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setShowCertificate(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <ConfettiEffect active={showCertificate} />

      {/* Header */}
      <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-sky-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl text-2xl">
            🏆
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800">
              Kuis Juara Robotika & Lencana Prestasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Uji pengetahuanmu dan raih Sertifikat Insinyur Robot Cilik!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 px-3.5 py-1.5 rounded-2xl border border-amber-200">
          <span className="text-amber-500 text-lg">⭐</span>
          <span className="font-black text-amber-900 text-sm">
            {score} / {ROBOT_QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {!showCertificate ? (
        /* Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-sky-100 space-y-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-black text-slate-500">
            <span>PERTANYAAN {currentIdx + 1} DARI {ROBOT_QUIZ_QUESTIONS.length}</span>
            <button
              onClick={() => speakIndonesian(curQ.question)}
              className="flex items-center gap-1 text-sky-600 hover:text-sky-800"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Soal</span>
            </button>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-sky-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / ROBOT_QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
            {curQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {curQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let style = 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50';

              if (isAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-100 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-100 border-rose-400 text-rose-900';
                } else {
                  style = 'bg-slate-50 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                  className={`w-full p-4 rounded-2xl border-3 font-bold text-left text-sm sm:text-base flex items-center justify-between gap-3 transition-all duration-200 shadow-sm ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <span>{opt.text}</span>
                  </div>

                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 animate-fadeIn space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-xl">💡</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {curQ.explanation}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm shadow-md transition-transform active:scale-95"
                >
                  {currentIdx < ROBOT_QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya ➡️' : 'Lihat Sertifikat Juara 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Certificate View */
        <div className="space-y-6">
          <div
            id="robot-certificate"
            className="bg-gradient-to-b from-amber-50 via-white to-sky-50 rounded-3xl p-8 sm:p-12 shadow-2xl border-8 border-amber-300 text-center relative overflow-hidden"
          >
            {/* Background Corner Decors */}
            <div className="absolute top-4 left-4 text-4xl opacity-30">⚙️</div>
            <div className="absolute top-4 right-4 text-4xl opacity-30">🤖</div>
            <div className="absolute bottom-4 left-4 text-4xl opacity-30">🚀</div>
            <div className="absolute bottom-4 right-4 text-4xl opacity-30">⚡</div>

            <div className="space-y-4 max-w-xl mx-auto">
              {/* Badge Icon */}
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 border-4 border-amber-300 flex items-center justify-center text-4xl shadow-xl animate-float">
                🏅
              </div>

              <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-200/80 px-4 py-1 rounded-full inline-block">
                SERTIFIKAT RESMI KELULUSAN
              </span>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
                INSINYUR ROBOTIKA CILIK
              </h2>

              <p className="text-xs sm:text-sm text-slate-500">
                Diberikan dengan penuh rasa bangga dan apresiasi kepada:
              </p>

              {/* Editable Name Field */}
              <div className="py-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => onUpdatePlayerName(e.target.value)}
                  placeholder="Ketik Namamu di Sini..."
                  className="text-2xl sm:text-3xl font-black text-center text-sky-700 border-b-4 border-sky-400 pb-1 bg-transparent focus:outline-none w-full max-w-sm tracking-wide"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Telah berhasil mempelajari cara kerja komponen robot, merakit robot impian, memprogram logika langkah, dan menaklukkan Laboratorium Sensor Pintar dengan nilai:
              </p>

              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 font-black text-base px-5 py-2 rounded-2xl border border-emerald-300">
                <span>Skor Prestasi: {score} / {ROBOT_QUIZ_QUESTIONS.length} Bintang Juara! 🌟</span>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-200 text-xs text-slate-400 font-bold">
                <span>Mentor: Bobi si Robot Pintar 🤖</span>
                <span>Laboratorium Robot Cilik 2026</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                playPop();
                window.print();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Sertifikat</span>
            </button>

            <button
              onClick={handleResetQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
