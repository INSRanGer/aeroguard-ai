export const PERSONAS = [
  {
    id: 'toddlers',
    name: 'Infants & Toddlers',
    icon: 'Baby',
    color: 'from-pink-500 to-rose-500',
    tagline: 'High respiratory rate & floor-level exposure',
    vulnerability: 'Critical',
    riskThreshold: 100, // AQI over 100 poses heightened danger
    factors: [
      'Breathe 2x-3x more air per pound of body weight than adults',
      'Floor crawling places them directly in settled micro-particulate zones',
      'Airway passages are narrower, leading to acute wheezing and bronchitis'
    ],
    priorityTips: [
      'Keep indoor relative humidity between 45-50% to prevent aerosol suspension',
      'Do not take strollers along main traffic corridors or during morning inversion fog',
      'Elevate sleeping cots at least 18 inches above the floor'
    ]
  },
  {
    id: 'asthma',
    name: 'Asthma & Respiratory',
    icon: 'Stethoscope',
    color: 'from-amber-500 to-red-500',
    tagline: 'Bronchial hyper-reactivity & PM2.5 triggers',
    vulnerability: 'Severe',
    riskThreshold: 75,
    factors: [
      'Fine PM2.5 bypasses nasal cilia and directly triggers bronchospasms',
      'Morning thermal inversion traps cold, dense toxic particulates at nose level',
      'Nitrogen Dioxide (NO2) irritates airways and increases susceptibility to viral infection'
    ],
    priorityTips: [
      'Strictly wear certified N95 / FFP2 masks when stepping out',
      'Pre-medicate with prescribed preventive inhaler before leaving home if AQI > 150',
      'Seal room perimeters with weather stripping and run HEPA purifier on medium-high'
    ]
  },
  {
    id: 'elderly',
    name: 'Elderly Parents',
    icon: 'HeartPulse',
    color: 'from-purple-500 to-indigo-500',
    tagline: 'Cardiovascular strain & reduced lung reserve',
    vulnerability: 'High',
    riskThreshold: 100,
    factors: [
      'PM2.5 enters bloodstream triggering vascular inflammation and BP spikes',
      'Reduced mucociliary clearance in aging lungs',
      'Higher susceptibility to secondary pneumonia and stroke during smog peaks'
    ],
    priorityTips: [
      'Shift morning garden walks to late afternoon (2 PM - 4 PM) when smog lifts',
      'Hydrate regularly with warm fluids and herbal steam to clear mucus',
      'Keep blood pressure logs during hazardous AQI episodes'
    ]
  },
  {
    id: 'commuters',
    name: 'Outdoor Commuters',
    icon: 'Bike',
    color: 'from-blue-500 to-cyan-500',
    tagline: 'Direct vehicular exhaust & stop-and-go exposure',
    vulnerability: 'Moderate to High',
    riskThreshold: 150,
    factors: [
      'Direct inhalation of unburned hydrocarbons, black carbon, and diesel soot',
      'Stop-and-go traffic red lights represent peak micro-exposure hotspots',
      'Heavy ventilation while riding bikes or open autorickshaws'
    ],
    priorityTips: [
      'Switch car cabin air circulation to "Recirculation Mode" (not fresh intake)',
      'Use multi-layered N95 respirator with exhalation valve for cycling/biking',
      'Shift commute 30 mins earlier or take underground metro line where air is filtered'
    ]
  },
  {
    id: 'athletes',
    name: 'Athletes & Runners',
    icon: 'Activity',
    color: 'from-emerald-500 to-teal-500',
    tagline: 'Deep oral breathing & 5x pulmonary volume',
    vulnerability: 'Moderate',
    riskThreshold: 120,
    factors: [
      'Mouth breathing during high heart-rate bypasses natural nasal filtration',
      'Minute ventilation jumps from 6L/min to 60-100L/min during intense workouts',
      'Deep alveolar deposition of nanoparticles impairs VO2 max and arterial dilation'
    ],
    priorityTips: [
      'Replace outdoor road runs with indoor treadmill or indoor gym workouts if AQI > 120',
      'If running outdoors, restrict workouts to 1:00 PM – 4:00 PM (optimal smog dispersion)',
      'Take high-antioxidant recovery smoothies (Vitamin C, E, and Curcumin) post-workout'
    ]
  },
  {
    id: 'general',
    name: 'General Family / WFH',
    icon: 'Home',
    color: 'from-emerald-600 to-sky-600',
    tagline: 'Indoor air hygiene & community sustainability',
    vulnerability: 'Standard',
    riskThreshold: 150,
    factors: [
      'Indoor air can be up to 5x more polluted than outdoor air without proper hygiene',
      'Cooking, incense, dry brooming, and aerosol sprays multiply particulate counts',
      'Prolonged indoor stagnation increases carbon dioxide (CO2) causing fatigue'
    ],
    priorityTips: [
      'Perform brief 10-minute purge ventilation during lowest AQI hour of the day',
      'Use exhaust hoods while cooking; avoid deep frying during high smog days',
      'Place NASA-proven air purifying plants (Snake Plant, Areca Palm) in bedrooms'
    ]
  }
];
