import { CATEGORIES_COLORS, DEFAULT_COLOR } from '@/constants/categories';
import type { CategoryId } from '@/constants/categories';

const PIN_SIZE = 16;
const STROKE_WIDTH = 1.5;
const STROKE_COLOR = '#000000';

const cache = new Map<string, string>();
const pulseCache = new Map<string, string>();

export function colorForCategory(category?: CategoryId | 'Unknown'): string {
  const key = category ?? 'Unknown';
  return CATEGORIES_COLORS[key]?.base ?? DEFAULT_COLOR;
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '').trim();
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function createDiamondDataUrl(fillColor: string): string {
  const cached = cache.get(fillColor);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = PIN_SIZE;
  canvas.height = PIN_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, PIN_SIZE, PIN_SIZE);

  const half = PIN_SIZE / 2;

  const drawDiamondPath = () => {
    ctx.beginPath();
    ctx.moveTo(half, 1);
    ctx.lineTo(PIN_SIZE - 1, half);
    ctx.lineTo(half, PIN_SIZE - 1);
    ctx.lineTo(1, half);
    ctx.closePath();
  };

  // 1) HALO: same diamond, scaled from the center
  const haloScale = 1.25; // tweak: 1.15–1.35
  ctx.save();
  ctx.translate(half, half);
  ctx.scale(haloScale, haloScale);
  ctx.translate(-half, -half);

  ctx.fillStyle = fillColor.startsWith('#') ? hexToRgba(fillColor, 0.25) : fillColor;
  ctx.save();
  ctx.rotate(90 * (Math.PI / 180));
  ctx.scale(haloScale, haloScale);
  ctx.translate(-half, -half);
  drawDiamondPath();
  ctx.strokeStyle = hexToRgba(fillColor, 0.25);
  ctx.lineWidth = STROKE_WIDTH + 2;
  ctx.stroke();
  ctx.restore();
  if (!fillColor.startsWith('#')) ctx.globalAlpha = 0.25;

  drawDiamondPath();
  ctx.fill();
  ctx.restore();

  // 2) MAIN diamond
  ctx.globalAlpha = 1;
  ctx.fillStyle = fillColor;
  drawDiamondPath();
  ctx.fill();

  // 3) crisp outline (no halo)
  ctx.strokeStyle = STROKE_COLOR;
  ctx.lineWidth = STROKE_WIDTH;
  ctx.stroke();

  const dataUrl = canvas.toDataURL('image/png');
  cache.set(fillColor, dataUrl);
  return dataUrl;
}

const PULSE_SIZE = 32;

/**
 * Creates a larger, stroke-free diamond sprite used for the pulse animation.
 * The larger size gives room for Cesium to scale it up (1x -> 3x) without
 * visible pixelation at the base scale.
 */
export function createPulseDiamondDataUrl(fillColor: string): string {
  const cached = pulseCache.get(fillColor);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = PULSE_SIZE;
  canvas.height = PULSE_SIZE;
  const ctx = canvas.getContext('2d')!;

  const half = PULSE_SIZE / 2;

  ctx.beginPath();
  ctx.moveTo(half, 0);
  ctx.lineTo(PULSE_SIZE, half);
  ctx.lineTo(half, PULSE_SIZE);
  ctx.lineTo(0, half);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();

  const dataUrl = canvas.toDataURL('image/png');
  pulseCache.set(fillColor, dataUrl);
  return dataUrl;
}
