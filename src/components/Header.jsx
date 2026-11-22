import React, { useState } from 'react';
import { Wind, MapPin, Search, Sparkles, Code2, Key, Download, Crosshair } from 'lucide-react';
import { PRESET_CITIES, searchCities } from '../services/airQualityService';

export default function Header({
  selectedCity,
  onSelectCity,
  onDetectLocation,
  onOpenPromptInspector,
  onOpenApiKeyModal,
  onExportReport,
  hasCustomKey
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length >= 2) {
      setIsSearching(true);
      const results = await searchCities(query);
      setSearchResults(results);
      setIsSearching(false);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectResult = (item) => {
    onSelectCity({
      name: item.name,
      country: item.country,
      lat: item.lat,
      lon: item.lon
    });
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Wind className="h-5 w-5 text-emerald-400 animate-pulse-slow" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                    AeroGuard <span className="text-emerald-400">AI</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                    Challenge 06
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Urban Smog & IAQ Copilot • Google PromptWars</p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenApiKeyModal}
                aria-label="Google AI Studio Key Configuration"
                className={`p-2 rounded-lg border text-xs ${hasCustomKey ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-slate-700 text-slate-400 hover:text-white'}`}
                title="Google AI Studio Key"
              >
                <Key className="h-4 w-4" />
              </button>
              <button
                onClick={onOpenPromptInspector}
                aria-label="View GenAI Prompt Blueprint and System Instructions"
                className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:text-emerald-400 text-xs"
                title="Prompt Inspector"
              >
                <Code2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Search & Location Bar */}
          <div className="relative w-full md:w-80 lg:w-96">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                placeholder={`Search city (e.g. Delhi, London, Beijing)...`}
                aria-label="Search global cities for real-time air quality data"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-10 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <button
                onClick={onDetectLocation}
                aria-label="Auto-detect current GPS location"
                className="absolute right-2 top-2 p-1 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Detect My Location"
              >
                <Crosshair className="h-4 w-4" />
              </button>
            </div>

            {/* Dropdown Results */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectResult(item)}
                    className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-slate-800 flex items-center justify-between border-b border-slate-800/60 last:border-0 transition-colors"
                  >
                    <span className="font-semibold text-slate-200">{item.displayName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.lat.toFixed(2)}, {item.lon.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions: AI Studio Key, Prompt Blueprint, Export */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                hasCustomKey 
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20' 
                  : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              <Key className="h-3.5 w-3.5" />
              <span>{hasCustomKey ? 'Gemini API Active' : 'Gemini Key'}</span>
            </button>

            <button
              onClick={onOpenPromptInspector}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 text-xs font-semibold transition-all shadow-sm"
              title="Inspect Prompt Architecture & Chain-of-Thought"
            >
              <Code2 className="h-3.5 w-3.5 text-purple-400" />
              <span>Prompt Inspector</span>
            </button>

            <button
              onClick={onExportReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
              title="Export Daily Smog Safety Card"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Card</span>
            </button>
          </div>

        </div>

        {/* Hot Preset Cities Bar */}
        <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-800/60 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-500 text-[11px] font-medium flex items-center gap-1 mr-1 shrink-0">
            <MapPin className="h-3 w-3 text-slate-400" /> Smog Hotspots:
          </span>
          {PRESET_CITIES.map((c) => {
            const isActive = selectedCity.name === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onSelectCity(c)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
