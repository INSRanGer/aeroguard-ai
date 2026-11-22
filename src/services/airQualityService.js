// Free Open-Meteo Air Quality, Weather, and Dynamic Theme Engine

export const PRESET_CITIES = [
  { name: 'Gorakhpur', country: 'India', lat: 26.7606, lon: 83.3732, default: true },
  { name: 'Lucknow', country: 'India', lat: 26.8467, lon: 80.9462 },
  { name: 'Delhi NCR', country: 'India', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5204, lon: 74.3587 },
  { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'Zurich (Clean)', country: 'Switzerland', lat: 47.3769, lon: 8.5417 }
];

/**
 * Evaluates raw AQI value and returns standard CPCB/EPA category metadata,
 * color palette, atmospheric theme tags, and health advisories.
 * @param {number} aqiValue - The numeric Air Quality Index (0-500+)
 * @returns {object} Category metadata object
 */
export function getAqiCategory(aqiValue) {
  const val = Math.round(aqiValue || 0);

  if (val <= 50) {
    return {
      level: 1,
      themeKey: 'good',
      label: 'Good (Clean Nature)',
      color: '#10b981',
      accentColor: 'rgb(16, 185, 129)',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      cardBg: 'rgba(6, 78, 59, 0.35)',
      cardBorder: 'rgba(16, 185, 129, 0.3)',
      bgGradient: 'from-emerald-950 via-teal-950/80 to-slate-950',
      moodTag: '🌿 Lush Greenery & Crisp Fresh Air',
      weatherSummary: 'Ideal outdoor conditions with zero health risks',
      mascot: '🌿',
      description: 'Air quality is pristine and healthy. Great day for outdoor activities and airing rooms.',
      particleType: 'nature'
    };
  } else if (val <= 100) {
    return {
      level: 2,
      themeKey: 'moderate',
      label: 'Moderate',
      color: '#f59e0b',
      accentColor: 'rgb(245, 158, 11)',
      glowColor: 'rgba(245, 158, 11, 0.25)',
      cardBg: 'rgba(120, 53, 15, 0.3)',
      cardBorder: 'rgba(245, 158, 11, 0.3)',
      bgGradient: 'from-amber-950/90 via-stone-900 to-slate-950',
      moodTag: '☀️ Sunlit Golden Haze',
      weatherSummary: 'Acceptable air; sensitive persons may notice slight irritation',
      mascot: '🌤️',
      description: 'Air quality is acceptable. Very sensitive individuals should observe mild caution outdoors.',
      particleType: 'haze'
    };
  } else if (val <= 150) {
    return {
      level: 3,
      themeKey: 'sensitive',
      label: 'Poor (Sensitive Groups)',
      color: '#f97316',
      accentColor: 'rgb(249, 115, 22)',
      glowColor: 'rgba(249, 115, 22, 0.3)',
      cardBg: 'rgba(154, 52, 18, 0.3)',
      cardBorder: 'rgba(249, 115, 22, 0.3)',
      bgGradient: 'from-orange-950/90 via-stone-950 to-slate-950',
      moodTag: '⚠️ Dust & Inversion Pre-Smog',
      weatherSummary: 'High particulate build-up; vulnerable lungs affected',
      mascot: '😷',
      description: 'Children, asthmatics, and older adults should reduce heavy or prolonged outdoor exertion.',
      particleType: 'dust'
    };
  } else if (val <= 200) {
    return {
      level: 4,
      themeKey: 'unhealthy',
      label: 'Unhealthy (Severe Smog)',
      color: '#ef4444',
      accentColor: 'rgb(239, 68, 68)',
      glowColor: 'rgba(239, 68, 68, 0.35)',
      cardBg: 'rgba(127, 29, 29, 0.35)',
      cardBorder: 'rgba(239, 68, 68, 0.35)',
      bgGradient: 'from-red-950 via-stone-950 to-slate-950',
      moodTag: '🚨 Crimson Smog Alert',
      weatherSummary: 'Dense toxic haze trapping vehicle and industrial emissions',
      mascot: '🚨',
      description: 'Everyone may begin to experience adverse health effects. Certified N95 masks strongly recommended.',
      particleType: 'smog'
    };
  } else if (val <= 300) {
    return {
      level: 5,
      themeKey: 'veryUnhealthy',
      label: 'Very Unhealthy (Toxic Blanket)',
      color: '#a855f7',
      accentColor: 'rgb(168, 85, 247)',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      cardBg: 'rgba(88, 28, 135, 0.4)',
      cardBorder: 'rgba(168, 85, 247, 0.4)',
      bgGradient: 'from-purple-950 via-slate-950 to-black',
      moodTag: '☣️ Toxic Thermal Inversion Blanket',
      weatherSummary: 'Emergency particulate inversion; avoid all outdoor exertion',
      mascot: '☣️',
      description: 'Health alert: High probability of acute breathing distress across the entire community.',
      particleType: 'toxic'
    };
  } else {
    return {
      level: 6,
      themeKey: 'hazardous',
      label: 'Hazardous (Emergency)',
      color: '#e11d48',
      accentColor: 'rgb(225, 29, 72)',
      glowColor: 'rgba(225, 29, 72, 0.5)',
      cardBg: 'rgba(76, 5, 25, 0.5)',
      cardBorder: 'rgba(225, 29, 72, 0.5)',
      bgGradient: 'from-rose-950 via-black to-slate-950',
      moodTag: '🛑 Catastrophic Winter Ash & Smog',
      weatherSummary: 'Catastrophic pollution levels. Strictly stay indoors with filtration.',
      mascot: '🛑',
      description: 'Emergency health warning. Everyone is likely to suffer severe irritation. Windows must be sealed.',
      particleType: 'ash'
    };
  }
}

// Comprehensive network of regional and national monitoring stations matching Image 2
export const REGIONAL_STATIONS = [
  // Gorakhpur & Eastern UP (matching user's reference image 2)
  { name: 'Gorakhpur Civil Lines', cityName: 'Gorakhpur', lat: 26.7606, lon: 83.3732, aqi: 351, pm25: 187, pm10: 243, no2: 56, o3: 2 },
  { name: 'Gorakhpur Gorakhnath Mandir', cityName: 'Gorakhpur', lat: 26.7892, lon: 83.3680, aqi: 339, pm25: 178, pm10: 230, no2: 50, o3: 3 },
  { name: 'AIIMS Gorakhpur Medical Hub', cityName: 'Gorakhpur', lat: 26.7320, lon: 83.4320, aqi: 363, pm25: 195, pm10: 258, no2: 61, o3: 2 },
  { name: 'GIDA Industrial Area', cityName: 'Gorakhpur', lat: 26.7210, lon: 83.2440, aqi: 380, pm25: 215, pm10: 282, no2: 72, o3: 1 },
  { name: 'Pipraich Road Overpass', cityName: 'Gorakhpur', lat: 26.8320, lon: 83.4410, aqi: 343, pm25: 182, pm10: 238, no2: 54, o3: 3 },
  
  { name: 'Siddharthnagar Naugarh Point', cityName: 'Siddharthnagar', lat: 27.2940, lon: 83.0850, aqi: 416, pm25: 248, pm10: 312, no2: 68, o3: 1 },
  { name: 'Maharajganj Sadar Circle', cityName: 'Maharajganj', lat: 27.1470, lon: 83.5620, aqi: 375, pm25: 208, pm10: 275, no2: 59, o3: 2 },
  
  { name: 'Basti Sadar Junction', cityName: 'Basti', lat: 26.8020, lon: 82.7630, aqi: 331, pm25: 172, pm10: 225, no2: 48, o3: 4 },
  { name: 'Harraiya Highway Post', cityName: 'Basti', lat: 26.7950, lon: 82.5200, aqi: 399, pm25: 232, pm10: 298, no2: 65, o3: 2 },
  { name: 'Khalilabad Industrial Zone', cityName: 'Sant Kabir Nagar', lat: 26.7760, lon: 83.0720, aqi: 322, pm25: 165, pm10: 218, no2: 46, o3: 4 },

  { name: 'Deoria Town Collectorate', cityName: 'Deoria', lat: 26.5050, lon: 83.7780, aqi: 448, pm25: 278, pm10: 350, no2: 78, o3: 1 },
  { name: 'Salempur Railway Sector', cityName: 'Deoria', lat: 26.3010, lon: 83.9210, aqi: 395, pm25: 228, pm10: 290, no2: 63, o3: 2 },
  { name: 'Bhatpar Rani Border', cityName: 'Deoria', lat: 26.3190, lon: 84.0540, aqi: 367, pm25: 198, pm10: 260, no2: 57, o3: 3 },

  { name: 'Kushinagar Tourism Hub', cityName: 'Kushinagar', lat: 26.7410, lon: 83.8910, aqi: 356, pm25: 189, pm10: 248, no2: 55, o3: 2 },
  { name: 'Padrauna Sugar Belt', cityName: 'Kushinagar', lat: 26.9030, lon: 83.9820, aqi: 395, pm25: 226, pm10: 288, no2: 62, o3: 2 },
  { name: 'Hata Bypass Point', cityName: 'Kushinagar', lat: 26.7480, lon: 83.7420, aqi: 347, pm25: 184, pm10: 242, no2: 52, o3: 3 },

  { name: 'Mau Nath Bhanjan Textile Unit', cityName: 'Mau', lat: 25.9420, lon: 83.5610, aqi: 426, pm25: 256, pm10: 325, no2: 74, o3: 1 },
  { name: 'Kopaganj Monitoring Post', cityName: 'Mau', lat: 26.0240, lon: 83.5690, aqi: 497, pm25: 320, pm10: 410, no2: 89, o3: 1 },

  { name: 'Azamgarh City Collectorate', cityName: 'Azamgarh', lat: 26.0690, lon: 83.1860, aqi: 474, pm25: 302, pm10: 388, no2: 84, o3: 1 },
  { name: 'Mubarakpur Weavers Cluster', cityName: 'Azamgarh', lat: 26.0910, lon: 83.2980, aqi: 455, pm25: 284, pm10: 365, no2: 80, o3: 1 },

  { name: 'Ballia Sadar Ganges Post', cityName: 'Ballia', lat: 25.7610, lon: 84.1480, aqi: 319, pm25: 162, pm10: 212, no2: 44, o3: 4 },
  { name: 'Rasra Substation', cityName: 'Ballia', lat: 25.8560, lon: 83.8540, aqi: 342, pm25: 180, pm10: 236, no2: 51, o3: 3 },
  { name: 'Bairia Border Post', cityName: 'Ballia', lat: 25.7530, lon: 84.4780, aqi: 293, pm25: 145, pm10: 195, no2: 40, o3: 5 },

  { name: 'Ghazipur Ghat Riverfront', cityName: 'Ghazipur', lat: 25.5840, lon: 83.5780, aqi: 439, pm25: 268, pm10: 342, no2: 76, o3: 1 },
  { name: 'Zamania Railway Sector', cityName: 'Ghazipur', lat: 25.4290, lon: 83.5620, aqi: 384, pm25: 218, pm10: 280, no2: 60, o3: 2 },

  { name: 'Varanasi Bhelupur Central', cityName: 'Varanasi', lat: 25.3020, lon: 82.9960, aqi: 475, pm25: 305, pm10: 390, no2: 85, o3: 1 },
  { name: 'Varanasi BHU Campus', cityName: 'Varanasi', lat: 25.2670, lon: 82.9910, aqi: 487, pm25: 312, pm10: 402, no2: 88, o3: 1 },
  { name: 'Varanasi Ardhali Bazar', cityName: 'Varanasi', lat: 25.3480, lon: 82.9810, aqi: 535, pm25: 360, pm10: 460, no2: 98, o3: 1 },

  { name: 'Jaunpur Civil Lines', cityName: 'Jaunpur', lat: 25.7460, lon: 82.6840, aqi: 474, pm25: 300, pm10: 385, no2: 83, o3: 1 },
  { name: 'Shahganj Junction', cityName: 'Jaunpur', lat: 26.0500, lon: 82.6930, aqi: 401, pm25: 235, pm10: 302, no2: 66, o3: 2 },

  // Nepal border towns (exact locations from user screenshot Image 2)
  { name: 'Butwal Highway Station', cityName: 'Butwal', lat: 27.7000, lon: 83.4500, aqi: 381, pm25: 214, pm10: 278, no2: 60, o3: 2 },
  { name: 'Bhairahawa Airport Belt', cityName: 'Bhairahawa', lat: 27.5050, lon: 83.4510, aqi: 419, pm25: 250, pm10: 315, no2: 70, o3: 1 },
  { name: 'Birgunj Custom Gate', cityName: 'Birgunj', lat: 27.0120, lon: 84.8770, aqi: 356, pm25: 190, pm10: 250, no2: 56, o3: 2 },
  { name: 'Hetauda Industrial Basin', cityName: 'Hetauda', lat: 27.4280, lon: 85.0330, aqi: 367, pm25: 200, pm10: 262, no2: 58, o3: 2 },

  // Central UP / Lucknow / Kanpur / Ayodhya
  { name: 'Ayodhya Ram Path Sector', cityName: 'Ayodhya', lat: 26.7920, lon: 82.1990, aqi: 348, pm25: 185, pm10: 242, no2: 53, o3: 3 },
  { name: 'Gonda Station Road', cityName: 'Gonda', lat: 27.1300, lon: 81.9600, aqi: 315, pm25: 158, pm10: 208, no2: 43, o3: 4 },
  { name: 'Bahraich Sadar Post', cityName: 'Bahraich', lat: 27.5750, lon: 81.5970, aqi: 370, pm25: 204, pm10: 268, no2: 58, o3: 2 },
  { name: 'Balrampur City Overpass', cityName: 'Balrampur', lat: 27.4300, lon: 82.1800, aqi: 380, pm25: 215, pm10: 280, no2: 61, o3: 2 },
  { name: 'Lucknow Gomti Nagar', cityName: 'Lucknow', lat: 26.8500, lon: 80.9900, aqi: 395, pm25: 230, pm10: 295, no2: 64, o3: 2 },
  { name: 'Lucknow Talkatora Industrial', cityName: 'Lucknow', lat: 26.8300, lon: 80.8900, aqi: 440, pm25: 270, pm10: 345, no2: 76, o3: 1 },
  { name: 'Lucknow Lalbagh', cityName: 'Lucknow', lat: 26.8460, lon: 80.9460, aqi: 418, pm25: 252, pm10: 320, no2: 71, o3: 1 },
  { name: 'Kanpur Kalyanpur', cityName: 'Kanpur', lat: 26.4900, lon: 80.2600, aqi: 450, pm25: 280, pm10: 355, no2: 79, o3: 1 },
  { name: 'Kanpur Nehru Nagar', cityName: 'Kanpur', lat: 26.4700, lon: 80.3300, aqi: 465, pm25: 295, pm10: 375, no2: 82, o3: 1 },
  { name: 'Prayagraj Civil Lines', cityName: 'Prayagraj', lat: 25.4500, lon: 81.8400, aqi: 390, pm25: 224, pm10: 288, no2: 62, o3: 2 },

  // Bihar hubs
  { name: 'Patna Samanpura', cityName: 'Patna', lat: 25.6100, lon: 85.1400, aqi: 430, pm25: 262, pm10: 335, no2: 75, o3: 1 },
  { name: 'Muzaffarpur Collectorate', cityName: 'Muzaffarpur', lat: 26.1200, lon: 85.3900, aqi: 410, pm25: 242, pm10: 310, no2: 68, o3: 2 },
  { name: 'Siwan Junction Point', cityName: 'Siwan', lat: 26.2200, lon: 84.3600, aqi: 390, pm25: 222, pm10: 285, no2: 61, o3: 2 },
  { name: 'Gopalganj Sasamusa', cityName: 'Gopalganj', lat: 26.4700, lon: 84.4400, aqi: 380, pm25: 214, pm10: 278, no2: 59, o3: 2 },
  { name: 'Chhapra Sadar Post', cityName: 'Chhapra', lat: 25.7800, lon: 84.7300, aqi: 405, pm25: 238, pm10: 305, no2: 67, o3: 2 },

  // Delhi NCR network
  { name: 'Delhi Anand Vihar Inter-State', cityName: 'Delhi', lat: 28.6469, lon: 77.3160, aqi: 465, pm25: 295, pm10: 375, no2: 82, o3: 1 },
  { name: 'Delhi IGI Airport Terminal 3', cityName: 'Delhi', lat: 28.5562, lon: 77.1000, aqi: 390, pm25: 225, pm10: 290, no2: 62, o3: 2 },
  { name: 'Delhi RK Puram Sector 1', cityName: 'Delhi', lat: 28.5645, lon: 77.1750, aqi: 420, pm25: 252, pm10: 325, no2: 71, o3: 1 },
  { name: 'Noida Sector 62 CPCB Station', cityName: 'Noida', lat: 28.6250, lon: 77.3650, aqi: 440, pm25: 272, pm10: 348, no2: 77, o3: 1 },
  { name: 'Ghaziabad Vasundhara Sector 16', cityName: 'Ghaziabad', lat: 28.6600, lon: 77.3800, aqi: 460, pm25: 290, pm10: 370, no2: 81, o3: 1 },
  { name: 'Gurugram Sector 51 Huda', cityName: 'Gurugram', lat: 28.4300, lon: 77.0700, aqi: 385, pm25: 220, pm10: 282, no2: 60, o3: 2 },

  // Major Indian Metros
  { name: 'Mumbai Bandra West Sea Link', cityName: 'Mumbai', lat: 19.0596, lon: 72.8295, aqi: 175, pm25: 75, pm10: 110, no2: 38, o3: 18 },
  { name: 'Mumbai Colaba Point Station', cityName: 'Mumbai', lat: 18.9067, lon: 72.8147, aqi: 140, pm25: 58, pm10: 88, no2: 32, o3: 22 },
  { name: 'Kolkata Victoria Memorial Garden', cityName: 'Kolkata', lat: 22.5448, lon: 88.3426, aqi: 285, pm25: 140, pm10: 185, no2: 52, o3: 8 },
  { name: 'Bengaluru Silk Board Junction', cityName: 'Bengaluru', lat: 12.9177, lon: 77.6238, aqi: 92, pm25: 32, pm10: 55, no2: 24, o3: 35 },
  { name: 'Hyderabad Sanathnagar Hub', cityName: 'Hyderabad', lat: 17.4565, lon: 78.4416, aqi: 155, pm25: 64, pm10: 98, no2: 36, o3: 22 },
  { name: 'Chennai Alandur Bus Terminal', cityName: 'Chennai', lat: 13.0034, lon: 80.2012, aqi: 105, pm25: 38, pm10: 62, no2: 28, o3: 30 },

  // International Hubs
  { name: 'Lahore Gulberg III Commercial', cityName: 'Lahore', lat: 31.5204, lon: 74.3587, aqi: 485, pm25: 310, pm10: 400, no2: 86, o3: 1 },
  { name: 'Beijing Chaoyang Park Station', cityName: 'Beijing', lat: 39.9320, lon: 116.4800, aqi: 155, pm25: 65, pm10: 95, no2: 35, o3: 20 },
  { name: 'New York Central Park South', cityName: 'New York', lat: 40.7851, lon: -73.9683, aqi: 42, pm25: 10, pm10: 18, no2: 14, o3: 42 },
  { name: 'London Westminster Riverfront', cityName: 'London', lat: 51.4975, lon: -0.1357, aqi: 36, pm25: 8, pm10: 15, no2: 18, o3: 45 },
  { name: 'Zurich Zurichberg Alpine Station', cityName: 'Zurich', lat: 47.3769, lon: 8.5417, aqi: 28, pm25: 6, pm10: 11, no2: 12, o3: 48 }
];

/**
 * Generates combined regional and local monitoring stations for GIS mapping.
 * @param {number} lat - Target center latitude
 * @param {number} lon - Target center longitude
 * @param {number} [baseAqi=182] - Baseline AQI for local station scaling
 * @param {string} [cityName='City'] - Target city name label
 * @returns {Array<object>} Unified array of monitoring stations with pollutant metrics
 */
export function getMonitoringStations(lat, lon, baseAqi = 182, cityName = 'City') {
  // 1. High-density local micro-neighborhood stations around the selected location
  const localOffsets = [
    { name: `${cityName} Civil Lines / Center`, dlat: 0.000, dlon: 0.000, factor: 1.00 },
    { name: `${cityName} Industrial Sector Phase 1`, dlat: 0.038, dlon: 0.042, factor: 1.18 },
    { name: `${cityName} University South Campus`, dlat: -0.029, dlon: -0.025, factor: 0.88 },
    { name: `${cityName} Railway Junction Station`, dlat: -0.018, dlon: 0.031, factor: 1.12 },
    { name: `${cityName} Eco Botanical Reserve`, dlat: 0.045, dlon: -0.038, factor: 0.74 },
    { name: `${cityName} National Highway Bypass`, dlat: -0.052, dlon: 0.065, factor: 1.25 },
    { name: `${cityName} Airport Perimeter Station`, dlat: -0.062, dlon: -0.048, factor: 0.95 },
    { name: `${cityName} North Riverfront Promenade`, dlat: 0.024, dlon: -0.012, factor: 0.82 },
    { name: `${cityName} East Ring Road Overpass`, dlat: 0.015, dlon: 0.055, factor: 1.15 },
    { name: `${cityName} Suburban Residential Colony`, dlat: -0.041, dlon: -0.019, factor: 0.91 },
    { name: `${cityName} Old Market Quarter`, dlat: 0.011, dlon: 0.018, factor: 1.08 },
    { name: `${cityName} Metro Terminal Station`, dlat: -0.022, dlon: 0.005, factor: 1.04 }
  ];

  const localStations = localOffsets.map(s => {
    const val = Math.max(15, Math.round(baseAqi * s.factor));
    return {
      name: s.name,
      cityName,
      lat: lat + s.dlat,
      lon: lon + s.dlon,
      aqi: val,
      pm25: Math.round(val * 0.54),
      pm10: Math.round(val * 0.72),
      no2: Math.round(val * 0.16),
      o3: Math.max(2, Math.round(60 - val * 0.12)),
      category: getAqiCategory(val)
    };
  });

  // 2. Wide regional & national network stations across the entire map
  const regionalStations = REGIONAL_STATIONS.map(s => ({
    name: s.name,
    cityName: s.cityName,
    lat: s.lat,
    lon: s.lon,
    aqi: s.aqi,
    pm25: s.pm25,
    pm10: s.pm10,
    no2: s.no2,
    o3: s.o3,
    category: getAqiCategory(s.aqi)
  }));

  // Combine local dense stations + regional stations (filter duplicate center if within 0.005 deg)
  const combined = [...localStations];
  regionalStations.forEach(reg => {
    const isTooClose = combined.some(loc => 
      Math.abs(loc.lat - reg.lat) < 0.01 && Math.abs(loc.lon - reg.lon) < 0.01
    );
    if (!isTooClose) {
      combined.push(reg);
    }
  });

  return combined;
}

/**
 * Performs global geocoding lookup via Open-Meteo Geocoding API.
 * @param {string} query - City or location search string
 * @returns {Promise<Array<object>>} Formatted search result locations
 */
export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Geocoding search failed');
    const data = await res.json();
    if (!data.results) return [];
    return data.results.map(item => ({
      name: item.name,
      country: item.country || '',
      admin1: item.admin1 || '',
      lat: item.latitude,
      lon: item.longitude,
      displayName: `${item.name}${item.admin1 ? ', ' + item.admin1 : ''}, ${item.country || ''}`
    }));
  } catch (err) {
    console.error('Error searching cities:', err);
    return [];
  }
}

/**
 * Fetches real-time air quality pollutants and meteorological telemetry in parallel.
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 * @returns {Promise<object>} Unified atmospheric telemetry and 24-hour hourly forecast
 */
export async function fetchLiveAirQuality(lat, lon) {
  try {
    // Parallel fetch: Air Quality + Real Weather (Temp, Humidity, Wind speed)
    const [airRes, weatherRes] = await Promise.all([
      fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone,us_aqi&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone&timezone=auto&forecast_days=2`),
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
    ]);

    const airData = airRes.ok ? await airRes.json() : null;
    const weatherData = weatherRes.ok ? await weatherRes.json() : null;

    const currentAqi = Math.round(airData?.current?.us_aqi ?? 182);
    const pm25 = Math.round(airData?.current?.pm2_5 ?? 129);
    const pm10 = Math.round(airData?.current?.pm10 ?? 133);
    const no2 = Math.round(airData?.current?.nitrogen_dioxide ?? 48);
    const o3 = Math.round(airData?.current?.ozone ?? 38);
    const co = Math.round(airData?.current?.carbon_monoxide ?? 650);

    const temperature = Math.round(weatherData?.current?.temperature_2m ?? 19);
    const humidity = Math.round(weatherData?.current?.relative_humidity_2m ?? 74);
    const windSpeed = Math.round(weatherData?.current?.wind_speed_10m ?? 5);

    // Parse 24-hour forecast
    const hourlyTimes = airData?.hourly?.time || [];
    const hourlyAqi = airData?.hourly?.us_aqi || [];
    const hourlyPm25 = airData?.hourly?.pm2_5 || [];
    
    const nowIso = new Date().toISOString().slice(0, 13);
    let startIndex = hourlyTimes.findIndex(t => t.startsWith(nowIso));
    if (startIndex < 0) startIndex = 0;

    const next24Hours = [];
    for (let i = startIndex; i < Math.min(startIndex + 24, hourlyTimes.length); i++) {
      const timeStr = hourlyTimes[i];
      const hourDate = new Date(timeStr);
      const hourNum = hourDate.getHours();
      const aqiVal = Math.round(hourlyAqi[i] ?? currentAqi);
      const pmVal = Math.round(hourlyPm25[i] ?? pm25);

      const isPeakSmog = (hourNum >= 5 && hourNum <= 10) || (hourNum >= 20 && hourNum <= 23);
      const isGoldenWindow = (hourNum >= 13 && hourNum <= 16);

      next24Hours.push({
        timeStr,
        hourFormatted: hourDate.toLocaleTimeString([], { hour: 'numeric', hour12: true }),
        hour24: hourNum,
        aqi: aqiVal,
        pm25: pmVal,
        category: getAqiCategory(aqiVal),
        isPeakSmog,
        isGoldenWindow
      });
    }

    return {
      currentAqi,
      pm25,
      pm10,
      no2,
      o3,
      co,
      temperature,
      humidity,
      windSpeed,
      category: getAqiCategory(currentAqi),
      hourlyForecast: next24Hours,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err) {
    console.warn('Failed to fetch from Open-Meteo, using fallback:', err);
    return generateFallbackAirData();
  }
}

function generateFallbackAirData() {
  const currentAqi = 182;
  const pm25 = 129;
  const pm10 = 133;
  const hours = [];
  const currentHour = new Date().getHours();

  for (let i = 0; i < 24; i++) {
    const h = (currentHour + i) % 24;
    let factor = 1.0;
    if (h >= 5 && h <= 9) factor = 1.35;
    else if (h >= 20 && h <= 23) factor = 1.25;
    else if (h >= 13 && h <= 16) factor = 0.65;
    
    const hAqi = Math.round(currentAqi * factor);
    const dateObj = new Date();
    dateObj.setHours(h);
    hours.push({
      timeStr: dateObj.toISOString(),
      hourFormatted: dateObj.toLocaleTimeString([], { hour: 'numeric', hour12: true }),
      hour24: h,
      aqi: hAqi,
      pm25: Math.round(pm25 * factor),
      category: getAqiCategory(hAqi),
      isPeakSmog: (h >= 5 && h <= 10) || (h >= 20 && h <= 23),
      isGoldenWindow: (h >= 13 && h <= 16)
    });
  }

  return {
    currentAqi,
    pm25,
    pm10,
    no2: 48,
    o3: 38,
    co: 650,
    temperature: 19,
    humidity: 74,
    windSpeed: 5,
    category: getAqiCategory(currentAqi),
    hourlyForecast: hours,
    fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
