const MYSTERY_SOUNDS = [
  '/assets/sfx/shotgun.mp3',
  '/assets/sfx/sonic-ring.mp3',
  '/assets/sfx/undertale-encounter.mp3',
  '/assets/sfx/burp.mp3',
] as const;

let current: HTMLAudioElement | null = null;

export function playRandomMysterySfx() {
  const src = MYSTERY_SOUNDS[Math.floor(Math.random() * MYSTERY_SOUNDS.length)];
  current?.pause();
  current = new Audio(src);
  current.volume = 0.85;
  void current.play().catch(() => undefined);
}
