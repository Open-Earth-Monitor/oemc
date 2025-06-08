import Script from 'next/script';

const WebTrafficMapContent = () => (
  <div className="!absolute !left-0 !top-0 !h-[200px] w-full grow flex-col">
    <Script
      id="clustrmaps"
      src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    />
  </div>
);

export default WebTrafficMapContent;
