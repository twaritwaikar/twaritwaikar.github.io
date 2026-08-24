export const ACCENTS = [
  { id: 'phosphor', hex: '#5CE883', label: 'PHOSPHOR' },
  { id: 'cyan', hex: '#3EE0E8', label: 'CYAN' },
  { id: 'amber', hex: '#FFD24A', label: 'AMBER' },
  { id: 'magenta', hex: '#FF5EC8', label: 'MAGENTA' },
  { id: 'azure', hex: '#5CA8FF', label: 'AZURE' },
  { id: 'orange', hex: '#FF8C42', label: 'ORANGE' },
] as const;

export type AccentHex = (typeof ACCENTS)[number]['hex'];

let currentAccent: AccentHex | null = null;

function randomAccent(): AccentHex {
  return ACCENTS[Math.floor(Math.random() * ACCENTS.length)].hex;
}

export function applyAccent(hex: string) {
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  root.style.setProperty('--color-accent', hex);
}

export function initAccent(): AccentHex {
  if (!currentAccent) {
    currentAccent = randomAccent();
    applyAccent(currentAccent);
  }
  return currentAccent;
}

export function cycleAccent(current: string): AccentHex {
  const index = ACCENTS.findIndex((accent) => accent.hex === current);
  const next = ACCENTS[(index + 1) % ACCENTS.length];
  currentAccent = next.hex;
  applyAccent(next.hex);
  return next.hex;
}

export function accentLabel(hex: string): string {
  return ACCENTS.find((accent) => accent.hex === hex)?.label ?? ACCENTS[0].label;
}
