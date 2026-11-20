import React from 'react';
import { Baby, Stethoscope, HeartPulse, Bike, Activity, Home } from 'lucide-react';
import { PERSONAS } from '../data/personas';

const ICON_MAP = {
  Baby,
  Stethoscope,
  HeartPulse,
  Bike,
  Activity,
  Home
};

export default function PersonaSelector({ selectedPersona, onSelectPersona, currentAqi }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-100">
            Who is this advice for?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a profile to customize health alerts and daily routines
          </p>
        </div>
        <span className="text-xs text-emerald-400 font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
          {selectedPersona.name}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PERSONAS.map((p) => {
          const Icon = ICON_MAP[p.icon] || Home;
          const isSelected = selectedPersona.id === p.id;
          const isAtRisk = currentAqi >= p.riskThreshold;

          return (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-800 border-2 border-emerald-500 shadow-md'
                  : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                {isAtRisk && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/20">
                    High Risk
                  </span>
                )}
              </div>

              <div>
                <div className="font-bold text-xs text-slate-100 truncate">{p.name}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.tagline}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
