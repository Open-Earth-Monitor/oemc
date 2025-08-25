import Script from 'next/script';

const WebTrafficMapContent = () => (
  <div className="max-h-[600px] min-h-[300px] w-full">
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Script
        id="clustrmaps"
        src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
        strategy="afterInteractive"
      />
    </div>
  </div>
);

export default WebTrafficMapContent;
