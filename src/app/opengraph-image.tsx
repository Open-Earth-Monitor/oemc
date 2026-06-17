import { ImageResponse } from 'next/og';

import { SITE_NAME } from '@/lib/seo';

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 0% 0%, rgba(30,237,191,0.25), transparent 45%), radial-gradient(circle at 100% 100%, rgba(117,161,255,0.25), transparent 45%)',
        }}
      >
        <div
          style={{
            fontSize: 34,
            color: '#1EEDBF',
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Open Earth Monitor
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#ffffff',
            maxWidth: 1000,
          }}
        >
          A cyberinfrastructure to accelerate uptake of environmental information
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: '#75A1FF' }}>earthmonitor.org</div>
      </div>
    ),
    { ...size }
  );
}
