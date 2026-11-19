// Web Audio API Synthesizer & Indonesian SpeechSynthesis for Kids

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

export const toggleAudioMute = () => {
  isAudioMuted = !isAudioMuted;
  if (typeof window !== "undefined" && isAudioMuted && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  return isAudioMuted;
};

export const getAudioMuted = () => isAudioMuted;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined" || isAudioMuted) return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Tombol Pop
export const playPop = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
};

// 2. Suara Robot Lucu (Chirp Bip-Bop)
export const playRobotBeep = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [659.25, 880, 587.33, 1174.66]; // E5, A5, D5, D6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

    gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.06);
    osc.stop(ctx.currentTime + idx * 0.06 + 0.07);
  });
};

// 3. Suara Langkah Robot Mekanik (Servo Motor)
export const playMechanicalStep = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(280, ctx.currentTime + 0.06);
  osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.12);
};

// 4. Suara Perakitan Komponen (Welding Sparkle / Click snap)
export const playAssembleSnap = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = [523.25, 783.99, 1046.5]; // C5, G5, C6
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);

    gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.04);
    osc.stop(ctx.currentTime + i * 0.04 + 0.14);
  });
};

// 5. Suara Sonar Ultrasonic (Pitch naik bila jarak makin dekat)
export const playSonarPing = (distanceRatio: number) => {
  // distanceRatio between 0.1 (very close) and 1.0 (far away)
  const ctx = getAudioContext();
  if (!ctx) return;

  const freq = 1200 - distanceRatio * 700; // closer = higher frequency (e.g. 1130Hz vs 500Hz)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.15);
};

// 6. Suara Detektor Logam (Metal Detector Geiger / Beep)
export const playMetalBeep = (proximity: number) => {
  // proximity: 0 to 1
  const ctx = getAudioContext();
  if (!ctx) return;

  const freq = 300 + proximity * 800;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.08 + proximity * 0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.06);
};

// 7. Suara Sukses & Bintang (Chime)
export const playSuccessChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.08);
    osc.stop(ctx.currentTime + idx * 0.08 + 0.36);
  });
};

// 8. Suara Fanfare Juara (Victory)
export const playVictoryFanfare = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const melody = [
    { freq: 523.25, time: 0, dur: 0.12 },
    { freq: 659.25, time: 0.12, dur: 0.12 },
    { freq: 783.99, time: 0.24, dur: 0.12 },
    { freq: 1046.5, time: 0.36, dur: 0.35 },
    { freq: 880, time: 0.72, dur: 0.15 },
    { freq: 1046.5, time: 0.9, dur: 0.5 },
  ];

  melody.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

    gain.gain.setValueAtTime(0.25, ctx.currentTime + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + note.time);
    osc.stop(ctx.currentTime + note.time + note.dur + 0.02);
  });
};

// 9. Suara Rintangan / Uh-Oh
export const playObstacleBump = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.2);
};

// 10. Suara Narator Bahasa Indonesia Ramah Anak
export const speakIndonesian = (text: string) => {
  if (typeof window === "undefined" || isAudioMuted) return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = 0.95; // Sedikit lebih lambat agar jelas untuk anak
  utterance.pitch = 1.25; // Ceria dan bersahabat
  window.speechSynthesis.speak(utterance);
};
