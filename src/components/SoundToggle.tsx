'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { toggleAudioMute, getAudioMuted, playPop } from '../lib/sounds';

export const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(getAudioMuted());
  }, []);

  const handleToggle = () => {
    playPop();
    const newMuted = toggleAudioMute();
    setMuted(newMuted);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-2xl font-bold transition-all shadow-md active:scale-95 ${
        muted
          ? 'bg-red-100 text-red-600 border-2 border-red-300'
          : 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300 hover:bg-emerald-200'
      }`}
      title={muted ? 'Nyalakan Suara Robot' : 'Bisukan Suara'}
    >
      {muted ? (
        <>
          <VolumeX className="w-5 h-5" />
          <span className="text-xs hidden sm:inline">Suara: Mati</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-emerald-600 animate-pulse" />
          <span className="text-xs hidden sm:inline">Suara: Aktif</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </>
      )}
    </button>
  );
};
