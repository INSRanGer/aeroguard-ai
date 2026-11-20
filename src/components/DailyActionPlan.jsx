import React from 'react';
import { Sparkles, RefreshCw, Compass, ShieldCheck, HeartPulse, Clock, Bike } from 'lucide-react';

export default function DailyActionPlan({
  plan,
  persona,
  cityName,
  isLoading,
  onRegenerate
}) {
  if (!plan) return null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span>Today's Action Guide</span>
            <span className="text-xs font-normal text-slate-400">for {persona.name} in {cityName}</span>
          </h3>
        </div>

        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{isLoading ? 'Updating...' : 'Refresh Guide'}</span>
        </button>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
        <p className="text-xs text-slate-200 leading-relaxed">
          {plan.summary}
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        
        {/* Commute */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
            <Bike className="h-4 w-4" />
            <span>Travel & Commute</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {plan.commuteAdvise}
          </p>
        </div>

        {/* Safe Window */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <Clock className="h-4 w-4" />
            <span>Best Timing Outdoors</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {plan.safeWindow}
          </p>
        </div>

        {/* Home Shield */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>Home Air Protection</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {plan.indoorShield}
          </p>
        </div>

        {/* Health Precaution */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
            <HeartPulse className="h-4 w-4" />
            <span>Health Precaution</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {plan.healthAlert}
          </p>
        </div>

      </div>

    </div>
  );
}
