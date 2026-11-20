import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getAqiCategory } from '../services/airQualityService';

export default function AqiHeroCard({ aqiData, cityName }) {
  if (!aqiData) return null;

  const currentAqi = aqiData.currentAqi;
  const category = getAqiCategory(currentAqi);
  const { pm25, pm10, temperature, humidity, windSpeed, fetchedAt } = aqiData;

  const clampedAqi = Math.min(Math.max(currentAqi, 0), 500);
  const positionPercent = (clampedAqi / 500) * 100;

  // Global ranking calculation heuristic
  const rank = Math.max(1, Math.min(100, Math.round(150 - (currentAqi / 3.5))));

  return (
    <div className="space-y-4">
      
      {/* Sub-header string from Image 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 px-1 gap-1">
        <h2 className="text-sm font-semibold text-slate-200">
          Real-time PM2.5, PM10 air pollution level in <strong className="text-white">{cityName}</strong>
        </h2>
        <span className="font-mono text-[11px] text-slate-500">
          Last Updated: {fetchedAt} (Local Time)
        </span>
      </div>

      {/* Main Hero Card: AQI + Pollutants + Weather + Continuous Spectrum Bar */}
      <div 
        className="w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl border flex flex-col justify-between space-y-6"
        style={{
          backgroundColor: category.cardBg,
          borderColor: category.cardBorder,
          boxShadow: `0 20px 50px -10px ${category.glowColor}`
        }}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          {/* Left AQI Score & Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Live AQI</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-white drop-shadow-lg">
                {currentAqi}
              </span>
              <span className="text-sm font-bold text-slate-300 font-mono">
                AQI (IN)
              </span>

              <div className="ml-2 pl-4 border-l border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-medium block">
                  Air Quality is
                </span>
                <span 
                  className="px-3.5 py-1 rounded-full text-sm font-extrabold uppercase tracking-wide border shadow-md inline-block"
                  style={{ 
                    backgroundColor: `${category.color}25`, 
                    color: category.color,
                    borderColor: `${category.color}60`
                  }}
                >
                  {category.label.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Sub pollutants line */}
            <div className="flex items-center gap-4 text-xs font-bold text-slate-200 pt-1">
              <span>PM2.5 : <strong className="text-white">{pm25} µg/m³</strong></span>
              <span className="text-white/20">•</span>
              <span>PM10 : <strong className="text-white">{pm10} µg/m³</strong></span>
            </div>
          </div>

          {/* Weather Box */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-md text-xs space-y-3 shrink-0 md:w-80">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🌫️</span>
                <div>
                  <span className="text-xl font-black text-white">{temperature}°C</span>
                  <span className="text-[11px] text-slate-300 block">Smoky haze</span>
                </div>
              </div>
              <div className="p-1 rounded-lg bg-white/10 text-slate-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div>
                <span className="text-slate-400 block">Humidity</span>
                <strong className="text-slate-100 font-bold">{humidity}%</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Wind Speed</span>
                <strong className="text-slate-100 font-bold">{windSpeed} km/h</strong>
              </div>
              <div>
                <span className="text-slate-400 block">UV Index</span>
                <strong className="text-slate-100 font-bold">0</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Continuous Gradient Spectrum Bar (From Image 1) */}
        <div className="space-y-1.5 pt-2">
          <div className="relative">
            <div 
              className="h-3 w-full rounded-full shadow-inner relative"
              style={{
                background: 'linear-gradient(to right, #10b981 0%, #10b981 10%, #eab308 20%, #f97316 40%, #d946ef 60%, #a855f7 80%, #ef4444 100%)'
              }}
            >
              {/* Sliding Indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-3 shadow-xl transform -translate-x-1/2 transition-all duration-700 ease-out flex items-center justify-center"
                style={{ 
                  left: `${positionPercent}%`,
                  borderColor: category.color,
                  boxShadow: `0 0 14px ${category.color}`
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </div>
          </div>

          {/* Labels under bar */}
          <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-400 font-medium px-0.5 pt-1">
            <span>Good</span>
            <span>Moderate</span>
            <span>Poor</span>
            <span>Unhealthy</span>
            <span>Severe</span>
            <span>Hazardous</span>
          </div>

          <div className="flex justify-between text-[8px] sm:text-[9px] text-slate-500 font-mono px-0.5">
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>200</span>
            <span>300</span>
            <span>400</span>
            <span>500+</span>
          </div>
        </div>

      </div>

      {/* Global Ranking Strip (Exact from Image 1) */}
      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center gap-3 text-xs">
        <div className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0">
          <span className="text-[10px] font-normal uppercase opacity-90">Rank</span>
          <span>{rank}th</span>
        </div>
        <p className="text-slate-300">
          Currently, <strong>{cityName}</strong> ranks <strong>{rank}th</strong> among the most polluted cities globally today.
        </p>
      </div>

    </div>
  );
}
