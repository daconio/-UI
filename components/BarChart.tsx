import React from 'react';

interface ChartData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
  color: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, color }) => {
  if (!data || data.length === 0 || data.every(d => d.value === 0)) {
    return <div className="flex items-center justify-center h-full text-center text-sm text-text-muted">NO DATA AVAILABLE</div>;
  }
  
  const maxValue = Math.max(...data.map(d => d.value), 0);
  const chartHeight = 150;
  const barWidth = 40;
  const barMargin = 30;
  const chartWidth = data.length * (barWidth + barMargin) - barMargin;

  return (
    <div className="flex justify-center overflow-x-auto pb-2 text-text-main">
      <svg width={chartWidth} height={chartHeight + 40} role="img" aria-label="Bar chart">
        <g>
          {data.map((item, index) => {
            const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
            const x = index * (barWidth + barMargin);
            const y = chartHeight - barHeight;

            return (
              <g key={index} className="group cursor-default">
                <title>{`${item.label}: ${item.value} 팀`}</title>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  className={`${color} transition-all duration-200 ease-in-out group-hover:brightness-125 group-hover:shadow-hard-sm`}
                  fill="currentColor"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 8}
                  textAnchor="middle"
                  className="fill-current font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out group-hover:-translate-y-2"
                >
                  {item.value}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="fill-current text-xs font-bold"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default BarChart;