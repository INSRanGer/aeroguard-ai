import React, { useState } from 'react';
import { Baby, Stethoscope, HeartPulse, Bike, Activity, Home, Sparkles, RefreshCw, ShieldAlert, Clock, ShieldCheck, Heart, Scroll } from 'lucide-react';
import { PERSONAS } from '../data/personas';

const ICON_MAP = {
  Baby,
  Stethoscope,
  HeartPulse,
  Bike,
  Activity,
  Home
};

export default function ProfileAdviceSection({
  selectedPersona,
  onSelectPersona,
  currentAqi,
  plan,
  cityName,
  isLoadingPlan,
  onRegeneratePlan
}) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 transition-all">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Choose Who You're Protecting</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a profile to unroll personalized daily smog routines and precautions
          </p>
        </div>

        <span className="text-xs text-emerald-400 font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 self-start sm:self-auto">
          Active: {selectedPersona.name}
        </span>
      </div>

      {/* 6 Profile Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PERSONAS.map((p) => {
          const Icon = ICON_MAP[p.icon] || Home;
          const isSelected = selectedPersona.id === p.id;
          const isAtRisk = currentAqi >= p.riskThreshold;

          return (
            <button
              key={p.id}
              onClick={() => onSelectPersona(p)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between space-y-3 relative group ${
                isSelected
                  ? 'bg-slate-800 border-2 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl transition-colors ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 group-hover:text-white'}`}>
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

              {/* Triangle pointer indicator under active card */}
              {isSelected && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-emerald-500 z-20" />
              )}
            </button>
          );
        })}
      </div>

      {/* UNROLLING PAPER ACTION GUIDE */}
      <div className="pt-2">
        <div 
          className="rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl relative transition-all duration-700 ease-out"
          style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 4%, #0f172a 96%, #1e293b 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 2px 6px rgba(255, 255, 255, 0.1), inset 0 -2px 6px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Top Paper Rolled Cylinder / Header */}
          <div 
            className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20"
            style={{
              background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)'
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Scroll className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Daily Action Guide for {selectedPersona.name}</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedPersona.vulnerability} Sensitivity
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Calibrated to {cityName}'s live pollution density (AQI {currentAqi})
                </p>
              </div>
            </div>

            <button
              onClick={onRegeneratePlan}
              disabled={isLoadingPlan}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all disabled:opacity-50 self-start sm:self-auto"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoadingPlan ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isLoadingPlan ? 'Updating...' : 'Re-Analyze Guide'}</span>
            </button>
          </div>

          {/* Paper Content Body (Rolled Sheet) */}
          <div className="p-6 sm:p-7 space-y-6">
            
            {/* Situational Summary on Parchment */}
            {plan && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                {plan.summary}
              </div>
            )}

            {/* Why This Profile is At Risk (Key Factors) */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Physiological Vulnerabilities:</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {selectedPersona.factors.map((factor, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-snug flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Action Pillars */}
            {plan && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                
                {/* Commute */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                    <Bike className="h-4 w-4" />
                    <span>Travel & Commute Routine</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {plan.commuteAdvise}
                  </p>
                </div>

                {/* Safe Timing */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <Clock className="h-4 w-4" />
                    <span>Best Timing Outdoors</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {plan.safeWindow}
                  </p>
                </div>

                {/* Home Air Protection */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Home Air Protection</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {plan.indoorShield}
                  </p>
                </div>

                {/* Health Alert */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <Heart className="h-4 w-4" />
                    <span>Critical Health Warning</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {plan.healthAlert}
                  </p>
                </div>

              </div>
            )}

            {/* Bottom Priority Checklist */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-amber-300 block">Top Rule for {selectedPersona.name} Today:</span>
                <span className="text-slate-200">
                  {selectedPersona.priorityTips[0]}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                Medical & Environmental Guideline
              </span>
            </div>

          </div>

          {/* Bottom Paper Rolled Edge Curl */}
          <div 
            className="h-3 w-full border-t border-amber-500/20"
            style={{
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(245, 158, 11, 0.15) 100%)'
            }}
          />

        </div>
      </div>

    </div>
  );
}
