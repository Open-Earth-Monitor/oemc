import WebTrafficMapContent from './map';
import WebTrafficRankingContent from './list';

const WebTrafficContent = () => {
  return (
    <div className="!flex w-full grow flex-col">
      {/* <WebTrafficMapContent /> */}
      <div className="flex justify-between">
        <WebTrafficRankingContent type="monitors" />
        <WebTrafficRankingContent type="geostories" />
      </div>
    </div>
  );
};

export default WebTrafficContent;
