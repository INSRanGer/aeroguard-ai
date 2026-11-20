import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BarChart2, LineChart, ChevronDown, Check, Sun, AlertTriangle } from 'lucide-react';

export default function SafeWindowTimeline({ hourlyForecast = [], cityName = 'Gorakhpur' }) {
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'line'
  const [timeframe, setTimeframe] = useState('24h');  // '24h' | '7d' | '30d' | '1y'
  const [standard, setStandard] = useState('IN');    // 'IN' | 'US'
  
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isStandardOpen, setIsStandardOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const containerRef = useRef(null);
  const chartCanvasRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsTimeframeOpen(false);
        setIsStandardOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseAqi = hourlyForecast[0]?.aqi || 289;

  // Generate dataset based on timeframe and standard
  const chartData = useMemo(() => {
    const stdFactor = standard === 'IN' ? 1.08 : 0.94;

    if (timeframe === '24h') {
      return hourlyForecast.map(item => {
        const adjustedAqi = Math.max(15, Math.min(500, Math.round(item.aqi * stdFactor)));
        return {
          label: item.hourFormatted,
          subLabel: item.timeStr?.slice(11, 16) || '',
          aqi: adjustedAqi,
          pm25: item.pm25,
          isSafeWindow: item.isGoldenWindow
        };
      });
    }

    if (timeframe === '7d') {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const factors = [0.92, 1.05, 1.15, 0.84, 0.98, 1.22, 1.02];
      return days.map((day, i) => {
        const val = Math.max(20, Math.min(500, Math.round(baseAqi * factors[i] * stdFactor)));
        return {
          label: `${day}`,
          subLabel: `Day ${i + 1}`,
          aqi: val,
          pm25: Math.round(val * 0.58),
          isSafeWindow: val < 120
        };
      });
    }

    if (timeframe === '30d') {
      const points = [];
      for (let i = 1; i <= 30; i++) {
        const wave = 1.0 + Math.sin(i / 3.2) * 0.28 + (i % 5 === 0 ? 0.15 : -0.1);
        const val = Math.max(25, Math.min(495, Math.round(baseAqi * wave * stdFactor)));
        points.push({
          label: `Day ${i}`,
          subLabel: `Nov ${i}`,
          aqi: val,
          pm25: Math.round(val * 0.55),
          isSafeWindow: val < 100
        });
      }
      return points;
    }

    if (timeframe === '1y') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const seasonalFactors = [1.35, 1.05, 0.75, 0.60, 0.55, 0.45, 0.25, 0.22, 0.38, 0.95, 1.45, 1.50];
      return months.map((month, i) => {
        const val = Math.max(25, Math.min(490, Math.round(baseAqi * seasonalFactors[i] * stdFactor)));
        return {
          label: month,
          subLabel: '2026',
          aqi: val,
          pm25: Math.round(val * 0.52),
          isSafeWindow: val < 80
        };
      });
    }

    return [];
  }, [timeframe, standard, hourlyForecast, baseAqi]);

  const minItem = chartData.reduce((min, cur) => cur.aqi < min.aqi ? cur : min, chartData[0] || { aqi: 0, label: '' });
  const maxItem = chartData.reduce((max, cur) => cur.aqi > max.aqi ? cur : max, chartData[0] || { aqi: 0, label: '' });

  const getBarColor = (aqi) => {
    if (standard === 'IN') {
      if (aqi <= 50) return '#10b981';
      if (aqi <= 100) return '#84cc16';
      if (aqi <= 200) return '#f59e0b';
      if (aqi <= 300) return '#f97316';
      if (aqi <= 400) return '#d946ef';
      return '#ef4444';
    } else {
      if (aqi <= 50) return '#10b981';
      if (aqi <= 100) return '#eab308';
      if (aqi <= 150) return '#f97316';
      if (aqi <= 200) return '#ef4444';
      if (aqi <= 300) return '#a855f7';
      return '#b91c1c';
    }
  };

  const activeItem = hoveredIdx !== null ? chartData[hoveredIdx] : null;
  const yTicks = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50, 0];

  const svgWidth = 800;
  const svgHeight = 240;

  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1 || 1)) * svgWidth;
    const y = svgHeight - (Math.min(d.aqi, 500) / 500) * svgHeight;
    return { x, y };
  });

  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaString = `0,${svgHeight} ${pointsString} ${svgWidth},${svgHeight}`;

  // Handle continuous smooth mouse move across the chart canvas
  const handleCanvasMouseMove = (e) => {
    if (!chartCanvasRef.current || chartData.length === 0) return;
    const rect = chartCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, x / rect.width));
    const nearestIdx = chartType === 'line'
      ? Math.min(chartData.length - 1, Math.max(0, Math.round(fraction * (chartData.length - 1))))
      : Math.min(chartData.length - 1, Math.max(0, Math.floor(fraction * chartData.length)));
    setHoveredIdx(nearestIdx);
  };

  // Tooltip horizontal position
  const activePercent = hoveredIdx !== null 
    ? (chartType === 'line' 
        ? (hoveredIdx / (chartData.length - 1 || 1)) * 100 
        : ((hoveredIdx + 0.5) / chartData.length) * 100)
    : 0;

  const clampedTooltipPercent = Math.max(8, Math.min(92, activePercent));

  return (
    <div ref={containerRef} className="bg-[#181c24] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-slate-100 relative">
      
      {/* 1. Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            AQI Graph
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Historical Air Quality Data & Forecast
          </h3>
          <span className="text-xs font-semibold text-sky-400">
            {cityName}
          </span>
        </div>

        {/* Controls: Line/Bar Toggle + Timeframe + Standard */}
        <div className="flex flex-wrap items-center gap-2 text-xs relative z-30">
          
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-lg transition-colors ${chartType === 'line' ? 'bg-slate-800 text-sky-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Line Graph View"
            >
              <LineChart className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-lg transition-colors ${chartType === 'bar' ? 'bg-slate-800 text-sky-400 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Bar Chart View"
            >
              <BarChart2 className="h-4 w-4" />
            </button>
          </div>

          {/* Timeframe Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTimeframeOpen(!isTimeframeOpen);
                setIsStandardOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 font-medium hover:border-slate-500 transition-colors"
            >
              <span>
                {timeframe === '24h' && '24 Hours'}
                {timeframe === '7d' && '7 Days'}
                {timeframe === '30d' && '30 Days'}
                {timeframe === '1y' && '1 Year'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isTimeframeOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-40 py-1">
                {[
                  { id: '24h', label: '24 Hours' },
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' },
                  { id: '1y', label: '1 Year' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTimeframe(item.id);
                      setIsTimeframeOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${timeframe === item.id ? 'text-sky-400 font-bold bg-slate-800/60' : 'text-slate-300'}`}
                  >
                    <span>{item.label}</span>
                    {timeframe === item.id && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Standard Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsStandardOpen(!isStandardOpen);
                setIsTimeframeOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 font-medium hover:border-slate-500 transition-colors"
            >
              <span>{standard === 'IN' ? 'AQI (IN)' : 'AQI (US)'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isStandardOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-40 py-1">
                {[
                  { id: 'IN', label: 'AQI (IN) • India CPCB' },
                  { id: 'US', label: 'AQI (US) • USA EPA' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setStandard(item.id);
                      setIsStandardOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${standard === item.id ? 'text-sky-400 font-bold bg-slate-800/60' : 'text-slate-300'}`}
                  >
                    <span>{item.label}</span>
                    {standard === item.id && <Check className="h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. City Pill + Min & Max Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-200">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          <span>{cityName}</span>
          <span className="text-[10px] text-slate-500 font-mono">
            • {standard === 'IN' ? 'India Standard' : 'USA Standard'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Min Badge */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="h-8 px-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center">
              {minItem.aqi}
            </div>
            <div className="text-[10px]">
              <span className="font-bold text-emerald-400 flex items-center gap-0.5">
                ↓ Min. AQI ({standard})
              </span>
              <span className="text-slate-400 font-mono">
                🕒 {minItem.label}
              </span>
            </div>
          </div>

          {/* Max Badge */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="h-8 px-2.5 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center">
              {maxItem.aqi}
            </div>
            <div className="text-[10px]">
              <span className="font-bold text-rose-400 flex items-center gap-0.5">
                ↑ Max. AQI ({standard})
              </span>
              <span className="text-slate-400 font-mono">
                🕒 {maxItem.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Interactive Chart Area (Supports BOTH Bar & Line with Full Hover Tracking) */}
      <div className="relative pt-6 pb-2">
        <div className="flex">
          
          {/* Y-Axis Column */}
          <div className="w-12 shrink-0 flex flex-col justify-between text-[10px] text-slate-400 font-mono select-none pr-2 h-64 text-right">
            {yTicks.map(val => (
              <span key={val} className="leading-none">{val}</span>
            ))}
          </div>

          {/* Chart Canvas with Smooth Mouse Tracking */}
          <div 
            ref={chartCanvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setHoveredIdx(null)}
            className="flex-1 relative h-64 cursor-crosshair select-none"
          >
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {yTicks.map(val => (
                <div key={val} className="border-b border-slate-800/60 w-full" />
              ))}
            </div>

            {/* Vertical Y-Axis Label */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 font-bold uppercase tracking-wider pointer-events-none">
              AQI ({standard})
            </div>

            {/* BAR CHART MODE */}
            {chartType === 'bar' && (
              <div className="absolute inset-0 flex items-end justify-between px-1 gap-1 sm:gap-1.5 pointer-events-none">
                {chartData.map((item, idx) => {
                  const heightPercent = Math.min(Math.max((item.aqi / 500) * 100, 2), 100);
                  const color = getBarColor(item.aqi);
                  const isHovered = hoveredIdx === idx;

                  return (
                    <div
                      key={idx}
                      className="flex-1 h-full flex items-end justify-center relative"
                    >
                      <div
                        className="w-full rounded-t-sm transition-all duration-200"
                        style={{
                          height: `${heightPercent}%`,
                          backgroundColor: color,
                          opacity: hoveredIdx !== null ? (isHovered ? 1 : 0.45) : 0.95
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* LINE CHART MODE */}
            {chartType === 'line' && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Shaded Area Under Line */}
                  <polygon points={areaString} fill="url(#lineAreaGradient)" />

                  {/* Spline Curve Line */}
                  <polyline
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pointsString}
                  />

                  {/* Nodes along the line */}
                  {points.map((p, i) => {
                    const isHovered = hoveredIdx === i;
                    return (
                      <g key={i}>
                        {isHovered && (
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="9"
                            fill={getBarColor(chartData[i].aqi)}
                            opacity="0.35"
                          />
                        )}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered ? 6 : 3.5}
                          fill={isHovered ? '#ffffff' : getBarColor(chartData[i].aqi)}
                          stroke={isHovered ? '#38bdf8' : '#ffffff'}
                          strokeWidth="2"
                          className="transition-all"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Seamless Mouse Capture Overlay */}
            <div
              className="absolute inset-0 z-10 cursor-crosshair"
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={() => setHoveredIdx(null)}
            />

            {/* Dashed White Cursor Line (Works in BOTH Bar & Line modes!) */}
            {hoveredIdx !== null && (
              <div
                className="absolute top-0 bottom-0 w-[1px] border-l-2 border-dashed border-white pointer-events-none z-20 transition-all duration-75"
                style={{
                  left: `${activePercent}%`
                }}
              />
            )}

            {/* Floating Tooltip Box (Exact replica from Image 2, works in BOTH Bar & Line modes!) */}
            {activeItem && hoveredIdx !== null && (
              <div
                className="absolute z-30 pointer-events-none -top-4 transform -translate-x-1/2 bg-[#0f172a]/95 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs shadow-2xl min-w-[135px] backdrop-blur-md"
                style={{
                  left: `${clampedTooltipPercent}%`
                }}
              >
                <div className="font-bold text-[11px] text-slate-300">
                  {activeItem.label} {activeItem.subLabel ? `(${activeItem.subLabel})` : ''}
                </div>
                <div className="flex items-center gap-1.5 font-black text-white text-xs mt-1">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: getBarColor(activeItem.aqi) }}
                  />
                  <span>{cityName}: {activeItem.aqi} AQI</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  PM2.5: ~{activeItem.pm25} µg/m³
                </div>
              </div>
            )}

          </div>

        </div>

        {/* 4. X-Axis Time & Date Labels */}
        <div className="pl-12 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>{chartData[0]?.subLabel || 'Start'}</span>
          <span className="font-bold text-slate-200 uppercase tracking-wider">
            {timeframe === '24h' ? 'Time (Hours)' : timeframe === '1y' ? 'Months of the Year' : 'Timeline'}
          </span>
          <span>{chartData[chartData.length - 1]?.subLabel || 'End'}</span>
        </div>

        {/* Hourly/Interval Ticks Strip */}
        <div className="pl-12 pt-1 flex justify-between text-[10px] text-slate-500 font-mono overflow-x-auto">
          {chartData.filter((_, i) => i % (timeframe === '30d' ? 5 : timeframe === '24h' ? 3 : 1) === 0).map((item, idx) => (
            <span key={idx}>{item.label}</span>
          ))}
        </div>
      </div>

      {/* 5. Footer Guidance */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-emerald-400" />
          <span className="text-slate-300">
            Standard: <strong>{standard === 'IN' ? 'CPCB National AQI (India)' : 'EPA Clean Air AQI (USA)'}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="h-4 w-4" />
          <span>{timeframe === '1y' ? 'Winter inversion peaks in Dec & Jan; lowest in Jul & Aug monsoon' : 'Best outdoor airing window remains 1:00 PM – 4:00 PM'}</span>
        </div>
      </div>

    </div>
  );
}
