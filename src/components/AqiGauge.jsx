import React from 'react';
import { Wind, AlertTriangle, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AqiGauge({ aqiData, cityName }) {
  if (!aqiData) return null;

  const { currentAqi, pm25, pm10, no2, o3, category, fetchedAt } = aqiData;

  // Clamped percentage across 0 to 400 for the indicator pin
  const clampedAqi = Math.min(Math.max(currentAqi, 0), 400);
  const positionPercent = (clampedAqi / 400) * 100;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      
      {/* Top Header: Samsung Weather style */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <Wind className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-200 tracking-tight">Air Quality</h2>
            <p className="text-xs text-slate-400">{cityName} • Live Telemetry</p>
          </div>
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Updated {fetchedAt}
        </span>
      </div>

      {/* Main Metric Display: Samsung Style */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
              {currentAqi}
            </span>
            <span 
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: category.color }}
            >
              {category.label}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Primary Hazard</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            PM2.5 ({pm25} µg/m³)
          </span>
        </div>
      </div>

      {/* Samsung-Style Continuous Spectrum Gradient Bar */}
      <div className="space-y-2 pt-2">
        <div className="relative">
          {/* Continuous Gradient Bar */}
          <div 
            className="h-3 w-full rounded-full shadow-inner relative"
            style={{
              background: 'linear-gradient(to right, #10b981 0%, #10b981 12.5%, #f59e0b 25%, #f97316 37.5%, #ef4444 50%, #8b5cf6 75%, #881337 100%)'
            }}
          >
            {/* The Indicator Pin / Circle */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-3 shadow-lg transform -translate-x-1/2 transition-all duration-700 ease-out flex items-center justify-center"
              style={{ 
                left: `${positionPercent}%`,
                borderColor: category.color,
                boxShadow: `0 0 12px ${category.color}80`
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
          </div>
        </div>

        {/* Scale Numbers below bar */}
        <div className="flex justify-between text-[10px] text-slate-500 font-mono px-0.5 pt-1">
          <span>0 (Good)</span>
          <span className="hidden sm:inline">50</span>
          <span>100</span>
          <span className="hidden sm:inline">150</span>
          <span>200</span>
          <span>300</span>
          <span>400+ (Hazardous)</span>
        </div>
      </div>

      {/* 4 Clean Pollutant Cards (One UI Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>PM2.5</span>
            <span className="text-rose-400 font-bold">Fine Soot</span>
          </div>
          <div className="text-xl font-bold text-white">
            {pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400">Deep lung penetration</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>PM10</span>
            <span className="text-amber-400 font-bold">Dust</span>
          </div>
          <div className="text-xl font-bold text-white">
            {pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400">Coarse urban dust</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>NO₂</span>
            <span className="text-orange-400 font-bold">Exhaust</span>
          </div>
          <div className="text-xl font-bold text-white">
            {no2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400">Vehicular traffic emissions</p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>Ozone (O₃)</span>
            <span className="text-cyan-400 font-bold">Air</span>
          </div>
          <div className="text-xl font-bold text-white">
            {o3} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400">Ground-level photochemical</p>
        </div>

      </div>

      {/* Samsung Weather Quick Health Action Bar */}
      <div className="bg-slate-800/50 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">Recommended right now:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-medium">
            😷 Wear N95 outdoors
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-medium">
            🚪 Keep windows closed
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-medium">
            💨 Run indoor air filter
          </span>
        </div>
      </div>

    </div>
  );
}
