import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Maximize2, Minimize2, ZoomIn, ZoomOut, Compass, Layers } from 'lucide-react';
import { getMonitoringStations, getAqiCategory } from '../services/airQualityService';

export default function AqiMapSection({ cityName, lat, lon, currentAqi, pm25, pm10, no2, o3 }) {
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const [selectedStation, setSelectedStation] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const stations = getMonitoringStations(lat, lon, currentAqi, cityName);
  const activeStation = selectedStation || stations[0];
  const activeCategory = getAqiCategory(activeStation.aqi);

  // 1. Initialize and update Leaflet map with clean, watermark-free dark tiles (0 API Key required)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: 11,
        zoomControl: false,
        attributionControl: false
      });

      // Base: High-performance Dark Gray Canvas (Completely free, no API key, no watermarks)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        attribution: 'Esri Canvas Dark'
      }).addTo(map);

      // Overlay: High-contrast Dark Reference Labels (district names, roads, landmarks)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([lat, lon], 11);
    }

    // Render regional sensor bubble markers
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      stations.forEach(st => {
        const cat = getAqiCategory(st.aqi);

        // Circular bubble marker with embedded AQI score
        const customIcon = L.divIcon({
          className: 'custom-aqi-bubble',
          html: `
            <div style="
              background-color: ${cat.color};
              color: #ffffff;
              width: 38px;
              height: 38px;
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 800;
              font-size: 11px;
              font-family: monospace;
              box-shadow: 0 0 16px ${cat.color}aa, inset 0 0 5px rgba(255,255,255,0.4);
              border: 2px solid rgba(255,255,255,0.85);
              cursor: pointer;
              transition: transform 0.2s ease;
            ">
              ${st.aqi}
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19]
        });

        const marker = L.marker([st.lat, st.lon], { icon: customIcon });
        marker.bindTooltip(`<strong>${st.name}</strong><br/>${st.cityName} • AQI: ${st.aqi}`, {
          direction: 'top',
          offset: [0, -20],
          className: 'leaflet-dark-tooltip'
        });
        marker.on('click', () => {
          setSelectedStation(st);
          mapInstanceRef.current?.panTo([st.lat, st.lon]);
        });

        marker.addTo(markersLayerRef.current);
      });
    }
  }, [lat, lon, currentAqi, cityName]);

  // 2. ResizeObserver: Guarantees map tiles NEVER disappear or break on size change
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    resizeObserver.observe(mapContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // 3. Listen for browser native fullscreen change events
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(isFs);
      [50, 150, 350].forEach(delay => {
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, delay);
      });
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  // 4. Safe Fullscreen Toggle with automatic fallback
  const handleToggleFullscreen = () => {
    const el = sectionRef.current;
    if (!el) return;

    if (!document.fullscreenElement && !isFullscreen) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }

    [50, 150, 350].forEach(delay => {
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, delay);
    });
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleRecenter = () => {
    mapInstanceRef.current?.setView([lat, lon], 11);
    setSelectedStation(stations[0]);
  };

  return (
    <div 
      ref={sectionRef}
      id="aqi-map-section" 
      className={`overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 bg-[#0a0f1d] ${
        isFullscreen 
          ? 'fixed inset-0 z-[9999] rounded-none w-screen h-screen' 
          : 'relative rounded-3xl h-[580px] w-full'
      }`}
    >
      {/* 1. Leaflet Interactive Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 2. Floating Left Info Panel */}
      <div className="absolute top-4 left-4 z-20 w-80 max-w-[calc(100%-2rem)] bg-[#0f172a]/92 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 text-slate-100 pointer-events-auto">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold uppercase tracking-wider">
            <span>AQI Air Quality Map</span>
          </div>
          <div className="flex items-center gap-1.5 text-white font-bold text-sm mt-0.5 truncate">
            <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
            <span className="truncate">{activeStation.name || cityName}</span>
          </div>
          <p className="text-[11px] text-slate-400 pl-5 truncate">
            {activeStation.cityName || cityName} • Live Monitoring Station
          </p>
        </div>

        {/* Main AQI Score & Status Pill */}
        <div className="pt-2 pb-1 border-t border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Air Quality Index
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {activeStation.aqi}
            </span>
            <span 
              className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border shadow-sm"
              style={{
                backgroundColor: `${activeCategory.color}25`,
                color: activeCategory.color,
                borderColor: `${activeCategory.color}50`
              }}
            >
              {activeCategory.label.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Pollutant Metrics List */}
        <div className="space-y-1.5 text-xs pt-1 border-t border-slate-800/80 font-mono">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-slate-400 font-sans flex items-center gap-1">
              PM2.5 <span className="text-[10px] text-slate-500">↗</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">{activeStation.pm25 ?? pm25} µg/m³</span>
              <span className="h-1.5 w-6 rounded-full bg-rose-500" />
            </div>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-slate-400 font-sans flex items-center gap-1">
              PM10 <span className="text-[10px] text-slate-500">↗</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">{activeStation.pm10 ?? pm10} µg/m³</span>
              <span className="h-1.5 w-6 rounded-full bg-amber-500" />
            </div>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-slate-400 font-sans flex items-center gap-1">
              NO₂ <span className="text-[10px] text-slate-500">↗</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">{activeStation.no2 ?? no2} ppb</span>
              <span className="h-1.5 w-6 rounded-full bg-orange-400" />
            </div>
          </div>

          <div className="flex items-center justify-between py-0.5">
            <span className="text-slate-400 font-sans flex items-center gap-1">
              Ozone (O₃) <span className="text-[10px] text-slate-500">↗</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">{activeStation.o3 ?? o3} ppb</span>
              <span className="h-1.5 w-6 rounded-full bg-cyan-400" />
            </div>
          </div>
        </div>

        {/* Mini 24h Trend Sparkline */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-sans">
            <span>AQI Trend (Last 24 Hours)</span>
            <span className="font-mono text-emerald-400 font-bold">Live</span>
          </div>
          <svg className="w-full h-9 overflow-visible" viewBox="0 0 100 24">
            <path
              d="M 0,16 Q 20,4 40,8 T 70,18 T 100,6"
              fill="none"
              stroke={activeCategory.color}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom Color Scale Legend */}
        <div className="space-y-1 pt-1">
          <div 
            className="h-2 w-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #10b981 0%, #eab308 20%, #f97316 40%, #ec4899 60%, #a855f7 80%, #b91c1c 100%)'
            }}
          />
          <div className="flex justify-between text-[8px] font-mono text-slate-400">
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

      {/* 3. Floating Right Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleToggleFullscreen}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition-colors"
          title={isFullscreen ? "Exit Fullscreen (Esc)" : "Toggle Fullscreen"}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

        <button
          onClick={handleRecenter}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 shadow-lg backdrop-blur-md transition-colors"
          title="Recenter Map"
        >
          <Compass className="h-4 w-4" />
        </button>

        <div className="flex flex-col bg-slate-900/90 border border-slate-700/80 rounded-xl overflow-hidden shadow-lg backdrop-blur-md">
          <button
            onClick={handleZoomIn}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 border-b border-slate-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
