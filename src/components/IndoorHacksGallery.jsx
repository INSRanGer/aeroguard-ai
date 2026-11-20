import React, { useState } from 'react';
import { Wrench, ChevronRight, CheckCircle2, FlaskConical } from 'lucide-react';
import { INDOOR_HACKS } from '../data/indoorHacks';

export default function IndoorHacksGallery() {
  const [activeHack, setActiveHack] = useState(INDOOR_HACKS[0]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-emerald-400" />
            <span>Budget-Friendly Home Air Hacks</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Practical ways to keep your indoor air safe without expensive equipment
          </p>
        </div>

        <span className="text-xs text-emerald-400 font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
          6 Practical Solutions
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2.5">
          {INDOOR_HACKS.map((hack) => {
            const isSelected = activeHack.id === hack.id;
            return (
              <button
                key={hack.id}
                onClick={() => setActiveHack(hack)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400">
                      {hack.badge}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {hack.cost}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">{hack.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{hack.effectiveness}</p>
                </div>

                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Card */}
        <div className="lg:col-span-7 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-emerald-400">
                {activeHack.category}
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px]">
                  Cost: {activeHack.cost}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[11px]">
                  {activeHack.effectiveness}
                </span>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">
              {activeHack.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {activeHack.summary}
            </p>

            {/* Steps */}
            <div className="mt-4 space-y-2.5">
              <span className="text-xs font-bold text-slate-200 block">
                How to set this up:
              </span>
              {activeHack.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Science Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs">
            <FlaskConical className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-300 block text-[11px]">How it works scientifically:</span>
              <span className="text-slate-400 text-[11px] leading-relaxed">
                {activeHack.scienceNote}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
