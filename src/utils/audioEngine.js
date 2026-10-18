/**
 * Web Audio API Cinematic Ambient Drone Synthesizer
 * Zero external audio files, pure browser oscillator synthesis
 * Ambient low frequency chord with soft filtered resonance
 */
class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.gainNode.connect(filter);
    filter.connect(this.ctx.destination);

    // Frequencies: Deep D Minor architectural harmonic chord (D1, A1, D2, F2)
    const freqs = [36.71, 55.00, 73.42, 87.31];
    
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.18 / freqs.length, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1.2);
      }
      this.isPlaying = false;
    } else {
      if (this.gainNode && this.ctx) {
        this.gainNode.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 2.0);
      }
      this.isPlaying = true;
    }
    return this.isPlaying;
  }
}

export const audioEngine = new AmbientAudioEngine();
