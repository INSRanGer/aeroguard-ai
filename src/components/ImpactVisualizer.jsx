import React, { useState } from 'react';
import { Award, CheckSquare, Square, Cigarette, Heart, Leaf, Wind } from 'lucide-react';
import { calculateImpactMetrics } from '../services/impactCalculator';

export default function ImpactVisualizer({ currentPm25, personaId }) {
  const [actions, setActions] = useState({
    woreN95: true,
    avoidedMorningPeak: true,
    usedPurifier: true,
    tookPublicTransit: true,
    stoppedIncense: true
  });

  const toggleAction = (key) => {
    setActions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const metrics = calculateImpactMetrics({
    currentPm25: currentPm25 || 85,
    personaId,
    actionsCompleted: actions
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>Health & Environmental Impact</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            See the direct difference your daily choices make under smoggy conditions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Protection Score:</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold text-xs">
            {metrics.lungHealthScore}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Checklist */}
        <div className="lg:col-span-6 space-y-2">
          <span className="text-xs font-bold text-slate-300 block mb-2">
            Actions Taken Today:
          </span>

          <button
            onClick={() => toggleAction('woreN95')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
              actions.woreN95 
                ? 'bg-slate-950 border-emerald-500/50 text-slate-100' 
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {actions.woreN95 ? (
              <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Square className="h-4 w-4 text-slate-600 shrink-0" />
            )}
            <div className="text-xs">
              <span className="font-semibold block text-slate-200">Wore N95 / KN95 Mask</span>
              <span className="text-[11px] text-slate-400">Filters 95% of fine particulate soot</span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('avoidedMorningPeak')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
              actions.avoidedMorningPeak 
                ? 'bg-slate-950 border-emerald-500/50 text-slate-100' 
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {actions.avoidedMorningPeak ? (
              <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Square className="h-4 w-4 text-slate-600 shrink-0" />
            )}
            <div className="text-xs">
              <span className="font-semibold block text-slate-200">Avoided Morning Smog Peak (6–10 AM)</span>
              <span className="text-[11px] text-slate-400">Rescheduled errands to the afternoon</span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('usedPurifier')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
              actions.usedPurifier 
                ? 'bg-slate-950 border-emerald-500/50 text-slate-100' 
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {actions.usedPurifier ? (
              <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Square className="h-4 w-4 text-slate-600 shrink-0" />
            )}
            <div className="text-xs">
              <span className="font-semibold block text-slate-200">Ran Air Filter or Purifier Indoors</span>
              <span className="text-[11px] text-slate-400">Kept bedroom air clean during sleep</span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('tookPublicTransit')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
              actions.tookPublicTransit 
                ? 'bg-slate-950 border-emerald-500/50 text-slate-100' 
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {actions.tookPublicTransit ? (
              <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Square className="h-4 w-4 text-slate-600 shrink-0" />
            )}
            <div className="text-xs">
              <span className="font-semibold block text-slate-200">Used Metro / Public Transit</span>
              <span className="text-[11px] text-slate-400">Avoided solo car tailpipe emissions</span>
            </div>
          </button>

          <button
            onClick={() => toggleAction('stoppedIncense')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-colors ${
              actions.stoppedIncense 
                ? 'bg-slate-950 border-emerald-500/50 text-slate-100' 
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            {actions.stoppedIncense ? (
              <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <Square className="h-4 w-4 text-slate-600 shrink-0" />
            )}
            <div className="text-xs">
              <span className="font-semibold block text-slate-200">Used Damp Mopping & Avoided Incense</span>
              <span className="text-[11px] text-slate-400">Stopped indoor soot spikes</span>
            </div>
          </button>
        </div>

        {/* 4 Cards */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-3.5">
          
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-rose-300 font-bold">
              <span>Lung Protection</span>
              <Cigarette className="h-4 w-4 text-rose-400" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-extrabold text-white">
                {metrics.cigarettesEquivalent}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Cigarette Equivalents Avoided
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Based on Berkeley Earth PM2.5 lung exposure formula.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
              <span>Particulate Filtered</span>
              <Heart className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-extrabold text-white">
                {metrics.pm25AvoidedMicrograms.toLocaleString()} <span className="text-xs font-normal text-slate-400">µg</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                PM2.5 Kept Out of Lungs
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Blocks fine soot from bloodstream entry.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
              <span>Carbon Spared</span>
              <Leaf className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-extrabold text-white">
                {metrics.co2SavedKg} <span className="text-xs font-normal text-slate-400">kg</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                CO₂ Emissions Prevented
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Calculated for low-emission commute choices.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-bold">
              <span>Tailpipe Soot</span>
              <Wind className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-extrabold text-white">
                {metrics.pmEmissionsAvoidedGrams} <span className="text-xs font-normal text-slate-400">g</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Exhaust Kept Off Streets
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Direct community benefit from public transit.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
