import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import AtmosphericBackground from './components/AtmosphericBackground';
import AqiHeroCard from './components/AqiHeroCard';
import AqiMapSection from './components/AqiMapSection';
import ProfileAdviceSection from './components/ProfileAdviceSection';
import SafeWindowTimeline from './components/SafeWindowTimeline';
import ImpactVisualizer from './components/ImpactVisualizer';
import IndoorHacksGallery from './components/IndoorHacksGallery';
import ChatCopilot from './components/ChatCopilot';

// Code-split modals for optimal initial page-load performance
const PromptInspectorModal = lazy(() => import('./components/PromptInspectorModal'));
const ApiKeyModal = lazy(() => import('./components/ApiKeyModal'));

import { PRESET_CITIES, fetchLiveAirQuality, getAqiCategory } from './services/airQualityService';
import { PERSONAS } from './data/personas';
import { generateActionPlanWithGemini } from './services/geminiService';
import { Sparkles, Map } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(PRESET_CITIES[0]); // Defaults to Gorakhpur
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[1]); // Asthma & Respiratory
  const [aqiData, setAqiData] = useState(null);
  const [dailyPlan, setDailyPlan] = useState(null);
  
  const [isLoadingAqi, setIsLoadingAqi] = useState(true);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  
  const [isPromptInspectorOpen, setIsPromptInspectorOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasCustomKey, setHasCustomKey] = useState(!!localStorage.getItem('gemini_api_key'));

  const activeCategory = getAqiCategory(aqiData?.currentAqi || 182);

  // Fetch real live air quality + weather telemetry
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoadingAqi(true);
      const data = await fetchLiveAirQuality(selectedCity.lat, selectedCity.lon);
      if (isMounted) {
        setAqiData(data);
        setIsLoadingAqi(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [selectedCity]);

  // Generate Action Plan when persona or city changes
  useEffect(() => {
    if (!aqiData) return;
    let isMounted = true;
    async function generatePlan() {
      setIsLoadingPlan(true);
      const plan = await generateActionPlanWithGemini({
        persona: selectedPersona,
        aqiData,
        cityName: selectedCity.name
      });
      if (isMounted) {
        setDailyPlan(plan);
        setIsLoadingPlan(false);
      }
    }
    generatePlan();
    return () => { isMounted = false; };
  }, [selectedPersona, aqiData, selectedCity]);

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedCity({
            name: 'Local GPS Location',
            country: 'Auto-Detected',
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
        },
        () => {
          alert('Could not access device location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleExportReport = () => {
    if (!aqiData || !dailyPlan) return;
    const reportText = `=========================================
AEROGUARD AI — DAILY AIR QUALITY & SMOG REPORT
Challenge 6 Submission • Google PromptWars
=========================================
City: ${selectedCity.name}
Air Quality Index: ${aqiData.currentAqi} (${activeCategory.label})
Atmospheric State: ${activeCategory.moodTag}
PM2.5: ${aqiData.pm25} µg/m³ | PM10: ${aqiData.pm10} µg/m³
Weather: ${aqiData.temperature}°C, ${aqiData.humidity}% Humidity, ${aqiData.windSpeed} km/h Wind

PROFILE: ${selectedPersona.name} (${selectedPersona.vulnerability} Risk)

TODAY'S GUIDANCE:
${dailyPlan.summary}

RECOMMENDATIONS:
• Travel: ${dailyPlan.commuteAdvise}
• Safe Timing: ${dailyPlan.safeWindow}
• Home Care: ${dailyPlan.indoorShield}
• Health Precaution: ${dailyPlan.healthAlert}

Generated with Gemini AI & Open-Meteo Air Telemetry.
=========================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AeroGuard_${selectedCity.name}_AirReport.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative transition-colors duration-1000 bg-gradient-to-b ${activeCategory.bgGradient}`}>
      
      {/* Dynamic Atmospheric Ambient Background */}
      <AtmosphericBackground category={activeCategory} />

      {/* Header */}
      <Header
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onDetectLocation={handleDetectLocation}
        onOpenPromptInspector={() => setIsPromptInspectorOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onExportReport={handleExportReport}
        hasCustomKey={hasCustomKey}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-7 relative z-10">
        
        {/* Dynamic Mood Status Bar */}
        <div className="flex items-center justify-between text-xs text-slate-300 px-1 py-1">
          <div className="flex items-center gap-2">
            <span className="text-base">{activeCategory.mascot}</span>
            <span className="font-semibold text-white">{activeCategory.moodTag}</span>
            <span className="hidden sm:inline text-slate-400">• Real-time atmospheric adaptation</span>
          </div>

          <button
            onClick={() => setIsPromptInspectorOpen(true)}
            className="flex items-center gap-1.5 text-purple-300 hover:text-white font-semibold transition-colors bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            <span>Prompt Blueprint</span>
          </button>
        </div>

        {/* 1. Hero Card + Mini AQI Map Widget (From Image 1) */}
        <AqiHeroCard
          aqiData={aqiData}
          cityName={selectedCity.name}
        />

        {/* 2. Full Interactive Dark-Mode AQI Map (From Image 2) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Map className="h-4 w-4 text-emerald-400" />
              <span>Interactive Air Quality Map & Monitoring Stations</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Live Sensor Bubbles
            </span>
          </div>
          <AqiMapSection
            cityName={selectedCity.name}
            lat={selectedCity.lat}
            lon={selectedCity.lon}
            currentAqi={aqiData?.currentAqi || 182}
            pm25={aqiData?.pm25 || 129}
            pm10={aqiData?.pm10 || 133}
            no2={aqiData?.no2 || 48}
            o3={aqiData?.o3 || 38}
          />
        </div>

        {/* 3. Profile Advice Section with Unrolling Paper Guide */}
        <ProfileAdviceSection
          selectedPersona={selectedPersona}
          onSelectPersona={setSelectedPersona}
          currentAqi={aqiData?.currentAqi || 0}
          plan={dailyPlan}
          cityName={selectedCity.name}
          isLoadingPlan={isLoadingPlan}
          onRegeneratePlan={() => {
            if (aqiData) {
              setIsLoadingPlan(true);
              generateActionPlanWithGemini({
                persona: selectedPersona,
                aqiData,
                cityName: selectedCity.name
              }).then(plan => {
                setDailyPlan(plan);
                setIsLoadingPlan(false);
              });
            }
          }}
        />

        {/* 4. Hourly Smog Forecast Graph (From previous image) */}
        <SafeWindowTimeline 
          hourlyForecast={aqiData?.hourlyForecast} 
          cityName={selectedCity.name} 
        />

        {/* 5. Health & Environmental Impact */}
        <ImpactVisualizer
          currentPm25={aqiData?.pm25}
          personaId={selectedPersona.id}
        />

        {/* 6. Budget-Friendly Indoor Air Hacks */}
        <IndoorHacksGallery />

        {/* 7. Conversational Air Assistant (Powered directly by Gemini) */}
        <ChatCopilot
          persona={selectedPersona}
          aqiData={aqiData}
          cityName={selectedCity.name}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md mt-12 py-6 text-xs text-slate-400 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">AeroGuard AI</span>
            <span>• Built for Google PromptWars Challenge 06</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Powered by Google Gemini AI • Open-Meteo Air Quality & Weather Telemetry
          </div>
        </div>
      </footer>

      {/* Modals with Suspense for code-splitting efficiency */}
      <Suspense fallback={null}>
        {isPromptInspectorOpen && (
          <PromptInspectorModal
            isOpen={isPromptInspectorOpen}
            onClose={() => setIsPromptInspectorOpen(false)}
            currentCity={selectedCity}
            persona={selectedPersona}
            aqiData={aqiData}
          />
        )}

        {isApiKeyModalOpen && (
          <ApiKeyModal
            isOpen={isApiKeyModalOpen}
            onClose={() => setIsApiKeyModalOpen(false)}
            onKeySaved={(hasKey) => setHasCustomKey(hasKey)}
          />
        )}
      </Suspense>
    </div>
  );
}
