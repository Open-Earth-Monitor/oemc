import WebTrafficMapContent from './map';
import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="relative flex w-full grow flex-col">
      <div className="relative flex h-[500px] justify-between bg-green-500">
        <WebTrafficMapContent />
      </div>
      <div className="flex justify-between">
        <WebTrafficRankingContent type="monitors" />
        <WebTrafficRankingContent type="geostories" />
      </div>
    </div>
  );
};

export default WebTrafficContent;
