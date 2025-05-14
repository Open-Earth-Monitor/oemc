import Script from 'next/script';

const WebTrafficMapContent = () => (
  <div className="!flex w-full grow flex-col">
    <Script
      id="clustrmaps"
      src="//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=a&t=tt&d=e9bF-yBRaYPXvvGpxTgq-74ob4nqMoaLjIgTO-UoDyQ&co=092539"
    />
  </div>
);

export default WebTrafficMapContent;
