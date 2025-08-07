import { Tooltip, defaultStyles } from '@visx/tooltip';
import { TooltipData } from './types';
import { format } from 'd3-format';
import { COMPARE_DATA_COLOR, DATA_COLOR, formatDate } from './utils';

const numberFormat = format(',.0f');

type ChartTooltipProps = {
  tooltipTop: number;
  tooltipLeft: number;
  tooltipData: TooltipData;
  dataTitle?: string;
  dataCompareTitle?: string;
};

const ChartTooltip = ({
  tooltipData,
  tooltipLeft,
  tooltipTop,
  dataCompareTitle,
  dataTitle,
}: ChartTooltipProps) => {
  return (
    <Tooltip
      top={tooltipTop - 12}
      left={tooltipLeft + 60}
      key={Math.random()}
      className="TOOLTIP"
      style={{
        ...defaultStyles,
        backgroundColor: 'transparent',
        color: 'white',
        borderRadius: '4px',
      }}
    >
      <div className="bg-brand-500/80 p-2">
        <div>
          <p className="font-satoshi text-[10px] font-bold">
            {!!tooltipData && formatDate(tooltipData.x)}
          </p>
          <div className="flex items-center justify-between gap-3">
            {dataCompareTitle && (
              <>
                <div
                  style={{
                    backgroundColor: DATA_COLOR,
                  }}
                  className="h-px w-5"
                />
                <p className="font-inter text-xs">{dataTitle}</p>
              </>
            )}
            <p className="flex-1 text-end font-inter text-xs font-bold">
              {!!tooltipData && numberFormat(tooltipData.y)}
            </p>
          </div>
          {!!dataCompareTitle && (
            <div className="mt-1 flex items-center justify-between gap-3">
              <>
                <div
                  style={{
                    backgroundColor: COMPARE_DATA_COLOR,
                  }}
                  className="h-px w-5"
                />
                <p className="font-inter text-xs">{dataCompareTitle}</p>
              </>

              <p className="flex-1 text-end font-inter text-xs font-bold">
                {!!tooltipData.compare && numberFormat(tooltipData.compare.y)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
};

export default ChartTooltip;
