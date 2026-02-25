import { CATEGORIES_COLORS, DEFAULT_COLOR } from '@/constants/categories';
import type { CategoryId } from '@/constants/categories';

const PIN_SIZE = 16;
const STROKE_WIDTH = 1.5;
const STROKE_COLOR = '#000000';

const cache = new Map<string, string>();

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
