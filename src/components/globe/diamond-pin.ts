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

export function createDiamondDataUrl(fillColor: string): string {
  const cached = cache.get(fillColor);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = PIN_SIZE;
  canvas.height = PIN_SIZE;
  const ctx = canvas.getContext('2d')!;

  const half = PIN_SIZE / 2;

  ctx.beginPath();
  ctx.moveTo(half, 1);
  ctx.lineTo(PIN_SIZE - 1, half);
  ctx.lineTo(half, PIN_SIZE - 1);
  ctx.lineTo(1, half);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();
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
