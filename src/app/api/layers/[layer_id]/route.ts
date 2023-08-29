import { NextResponse } from 'next/server';

import { LAYERS } from 'constants/api-payloads/layers';

export function GET(request, { params }: { params: { layer_id: string } }) {
  const { layer_id: id } = params;
  return NextResponse.json(LAYERS.find(({ layer_id }) => id === layer_id));
}
