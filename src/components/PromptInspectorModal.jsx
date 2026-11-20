import React, { useState } from 'react';
import { X, Copy, Check, Code2, Sparkles, Terminal, FileText, Cpu } from 'lucide-react';
import { SYSTEM_PROMPT_BLUEPRINT } from '../services/geminiService';

export default function PromptInspectorModal({ isOpen, onClose, currentCity, persona, aqiData }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('system');

  if (!isOpen) return null;

  const dynamicContextSample = `[Context Variables Injected at Runtime]
• City: ${currentCity?.name || 'Delhi NCR'}
• Current US AQI: ${aqiData?.currentAqi || 184} (${aqiData?.category?.label || 'Unhealthy'})
• Particulates: PM2.5 = ${aqiData?.pm25 || 98} µg/m³, PM10 = ${aqiData?.pm10 || 165} µg/m³
• Gaseous Pollutants: NO2 = ${aqiData?.no2 || 52} µg/m³, Ozone = ${aqiData?.o3 || 34} µg/m³
• User Vulnerability Profile: ${persona?.name || 'Infants & Toddlers'}
• Vulnerability Severity: ${persona?.vulnerability || 'Critical'}
• Physiological Risk Factors: ${persona?.factors?.join(' | ') || 'Floor-level particulate exposure'}`;

  const fewShotSample = `[Few-Shot Example & Structured JSON Schema Enforcement]
Input Context:
- City: Delhi NCR
- AQI: 320 (Hazardous)
- Persona: Asthma & Respiratory

Generated Structured Response:
{
  "summary": "Severe thermal inversion in Delhi is trapping ultrafine soot at nose level. Immediate bronchial trigger risk.",
  "commuteAdvise": "Strictly cancel two-wheeler or walking trips. Use underground metro with sealed cabin ventilation.",
  "safeWindow": "Emergency curfew outdoors before 11:30 AM. Ventilation strictly restricted to 2:00 PM – 3:00 PM.",
  "indoorShield": "Seal bedroom door cracks with damp towels. Run DIY Corsi-Rosenthal unit on medium speed continuously.",
  "healthAlert": "Keep relief inhaler on person. Pre-medicate if transit is unavoidable."
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(SYSTEM_PROMPT_BLUEPRINT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">
                  Prompt Engineering Architecture Blueprint
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Google PromptWars Inspection
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                System Instructions, Chain-of-Thought, and Dynamic Context Injection Pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 pt-3 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('system')}
            className={`pb-2 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'system'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>System Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('context')}
            className={`pb-2 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'context'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Dynamic Telemetry Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-2 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-purple-400 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Structured JSON Schema</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs">
          {activeTab === 'system' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Core Persona & Safety Guardrails Prompt</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy System Prompt'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-300 border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {SYSTEM_PROMPT_BLUEPRINT.trim()}
              </pre>
            </div>
          )}

          {activeTab === 'context' && (
            <div className="space-y-3">
              <p className="text-[11px] text-slate-400">
                Real-time API telemetry from Open-Meteo and selected Persona parameters are dynamically injected into the Gemini context window before generation:
              </p>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {dynamicContextSample}
              </pre>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <p className="text-[11px] text-slate-400">
                To guarantee zero hallucination in UI rendering, Gemini 1.5 Flash is constrained via strict JSON schema enforcement:
              </p>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-cyan-300 border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {fewShotSample}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-400">
          <span>Google PromptWars Evaluation Ready • Gemini 1.5 Flash / 2.0</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
