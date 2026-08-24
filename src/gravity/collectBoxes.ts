const SKIP_IDS = new Set([
  'root',
  'app_root',
  'pixel_art_burst_canvas',
  'light_mode_denied_overlay',
  'gravity_layer',
  'gravity_restore_btn',
]);

export type CapturedBox = {
  key: string;
  source: HTMLElement;
  clone: HTMLElement;
  cx: number;
  cy: number;
  w: number;
  h: number;
  sourceId: string;
  previous: { visibility: string; pointerEvents: string };
};

function isVisible(el: HTMLElement) {
  const style = getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
    return false;
  }
  const rect = el.getBoundingClientRect();
  return rect.width >= 12 && rect.height >= 12;
}

function isBox(el: HTMLElement) {
  if (SKIP_IDS.has(el.id)) return false;
  const tag = el.tagName;
  if (
    tag === 'HTML' ||
    tag === 'BODY' ||
    tag === 'SCRIPT' ||
    tag === 'STYLE' ||
    tag === 'LINK' ||
    tag === 'SVG' ||
    tag === 'PATH' ||
    tag === 'IMG'
  ) {
    return false;
  }
  if (el.closest('#light_mode_denied_overlay, #gravity_layer, #gravity_restore_btn')) return false;
  if (!isVisible(el)) return false;

  const rect = el.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) {
    return false;
  }
  const viewW = window.innerWidth;
  const viewH = window.innerHeight;
  if (rect.width > viewW * 0.9 || rect.height > viewH * 0.55) return false;
  if (rect.width * rect.height > viewW * viewH * 0.4) return false;

  const style = getComputedStyle(el);
  const border =
    parseFloat(style.borderTopWidth) +
    parseFloat(style.borderRightWidth) +
    parseFloat(style.borderBottomWidth) +
    parseFloat(style.borderLeftWidth);
  const bg = style.backgroundColor;
  const hasBg = Boolean(bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)');
  const isButton = tag === 'BUTTON' || el.getAttribute('role') === 'button';
  const isField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  const className = typeof el.className === 'string' ? el.className : '';
  const looksBordered = className.includes('border');

  return border > 0 || isButton || isField || (hasBg && looksBordered);
}

function collectLeafBoxes() {
  const root = document.getElementById('app_root') || document.body;
  const found: HTMLElement[] = [];
  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (isBox(el)) found.push(el);
  });
  return found.filter((el) => !found.some((other) => other !== el && el.contains(other)));
}

export function captureUiBoxes(): CapturedBox[] {
  return collectLeafBoxes().map((source, index) => {
    const rect = source.getBoundingClientRect();
    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'));
    Object.assign(clone.style, {
      position: 'static',
      left: 'auto',
      top: 'auto',
      width: '100%',
      height: '100%',
      margin: '0',
      transform: 'none',
      pointerEvents: 'none',
    });
    const previous = {
      visibility: source.style.visibility,
      pointerEvents: source.style.pointerEvents,
    };
    source.style.visibility = 'hidden';
    source.style.pointerEvents = 'none';
    return {
      key: `${source.id || source.tagName}-${index}-${Math.round(rect.left)}-${Math.round(rect.top)}`,
      source,
      clone,
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      w: Math.max(12, rect.width),
      h: Math.max(12, rect.height),
      sourceId: source.id,
      previous,
    };
  });
}

export function restoreUiBoxes(boxes: CapturedBox[]) {
  for (const box of boxes) {
    box.source.style.visibility = box.previous.visibility;
    box.source.style.pointerEvents = box.previous.pointerEvents;
  }
}
