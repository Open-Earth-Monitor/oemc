import Script from 'next/script';

const WebTrafficMapContent = () => (
  <div style={{ width: '100%', height: '400px', position: 'relative' }}>
    {/* <script
      type="text/javascript"
      id="clustrmaps"
      src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
    /> */}

    <Script
      id="clustrmaps"
      src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
    />
  </div>
);

export default WebTrafficMapContent;
