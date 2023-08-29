import { NextResponse } from 'next/server';

import { LAYERS } from 'constants/api-payloads/layers';

export function GET() {
  return NextResponse.json(LAYERS);
}
