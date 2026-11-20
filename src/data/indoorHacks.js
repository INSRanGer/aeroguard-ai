export const INDOOR_HACKS = [
  {
    id: 'box-fan-filter',
    title: 'DIY Corsi-Rosenthal Box / HEPA Hack',
    category: 'Hardware & Filtration',
    cost: '$15 - $25 (Low)',
    difficulty: 'Easy (10 mins)',
    effectiveness: '92% PM2.5 Reduction',
    badge: 'Top Community Hack',
    summary: 'A proven DIY air purifier that rivals $300 commercial units using a standard box fan and a MERV 13 or HEPA furnace filter.',
    steps: [
      'Get a standard 20-inch box fan and a 20x20 MERV 13 / HEPA furnace filter.',
      'Place the filter on the back (intake) of the fan with the airflow arrow pointing towards the fan.',
      'Seal the edges airtight with duct tape or painter’s tape so air is pulled through the filter pleats.',
      'Run on medium speed in your bedroom 45 minutes before sleeping.'
    ],
    scienceNote: 'Tested by UC Davis researchers: delivers Clean Air Delivery Rates (CADR) of over 200 CFM at 1/10th the commercial cost.'
  },
  {
    id: 'nasa-plants',
    title: 'NASA Bio-Purifying Plant Trio',
    category: 'Natural Bio-Filters',
    cost: '$10 - $20',
    difficulty: 'Very Easy',
    effectiveness: 'Continuous Benzene & CO2 Trapping',
    badge: 'Zero Electricity',
    summary: 'Specific plants that release oxygen at night (Crassulacean Acid Metabolism) and absorb volatile organic compounds.',
    steps: [
      'Snake Plant (Sansevieria): Absorbs NO2 and releases oxygen at night; place 2 pots per bedroom.',
      'Areca Palm: Natural living humidifier that settles airborne particulate dust in dry winter air.',
      'Spider Plant: Thrives in low light and clears carbon monoxide and formaldehyde from furniture.',
      'Wipe plant leaves weekly with a damp microfiber cloth to keep their stomatic pores open.'
    ],
    scienceNote: 'Derived from NASA Clean Air Study. Keeps night-time room CO2 lower when windows are tightly sealed.'
  },
  {
    id: 'inversion-ventilation',
    title: 'Thermal Inversion Ventilation Window',
    category: 'Routine & Physics',
    cost: 'Free ($0)',
    difficulty: 'Daily Habit',
    effectiveness: 'Prevents 80% Smog Ingress',
    badge: 'Critical Rule',
    summary: 'Winter smog is worst at dawn and night due to ground-level cold air trapping pollutants. Ventilate only during solar lift.',
    steps: [
      'NEVER open doors or windows between 5:30 AM and 10:00 AM (Cold inversion layer traps heavy vehicle soot at street level).',
      'The "Golden Airing Window" is usually 1:30 PM to 3:30 PM when solar heat breaks the inversion and wind disperses particulates.',
      'Crack windows open for just 10-15 minutes with room exhaust fan running to flush out CO2.',
      'Seal window crevices with damp towels or foam weather-stripping foam during the night.'
    ],
    scienceNote: 'Atmospheric boundary layer drops from 1500m in daylight to 100m at night in winter, multiplying toxic concentration 15x.'
  },
  {
    id: 'wet-mopping-hygiene',
    title: 'Wet-Mopping & Micro-Mist Protocol',
    category: 'Home Hygiene',
    cost: 'Free ($0)',
    difficulty: 'Daily Habit',
    effectiveness: 'Stops Resuspension',
    badge: 'Essential',
    summary: 'Dry sweeping / brooming shoots settled hazardous PM2.5 and PM10 straight back into breathing air for 3-4 hours.',
    steps: [
      'Ban traditional dry brooms inside during high AQI weeks.',
      'Use a microfiber damp mop with lukewarm water and a drop of eucalyptus or tea-tree oil.',
      'Lightly spray a fine water mist into the air before sweeping to cause floating particulates to settle.',
      'Change bed linens weekly and wash curtains that absorb fine particulate soot.'
    ],
    scienceNote: 'Stanford aerosol studies found dry sweeping spikes indoor PM10 to over 600 µg/m³ within 5 minutes.'
  },
  {
    id: 'kitchen-smog-shield',
    title: 'Kitchen Thermal Chimney & Oil Trap',
    category: 'Indoor Source Control',
    cost: 'Free ($0)',
    difficulty: 'Easy',
    effectiveness: 'Prevents Indoor PM Spikes of 500+',
    badge: 'Source Control',
    summary: 'Indoor cooking with oils, tadka, or frying can create PM2.5 levels higher than the outdoor smog highway.',
    steps: [
      'Always seal the kitchen door from the living/sleeping area before lighting the stove.',
      'Run kitchen exhaust fan or chimney on maximum 2 minutes BEFORE starting to cook.',
      'Switch from open high-temperature frying to covered boiling, steaming, or pressure cooking during red-alert smog days.',
      'Strictly avoid burning incense (agarbatti), dhoop, or scented candles during winter smog.'
    ],
    scienceNote: 'A single stick of burning incense produces PM2.5 equivalent to 4 cigarettes in an unventilated room.'
  },
  {
    id: 'humidity-barrier',
    title: '45-50% Humidity Particulate Barrier',
    category: 'Aerosol Physics',
    cost: '$0 - $15',
    difficulty: 'Easy',
    effectiveness: 'Accelerates Particle Deposition',
    badge: 'Physics Hack',
    summary: 'Dry winter air keeps fine particles suspended for 8+ hours. Maintaining 45-50% relative humidity forces them to drop to surfaces.',
    steps: [
      'Place a wide ceramic bowl of warm water near radiators or in sunlit corners to naturally humidify dry air.',
      'Hang a clean damp cotton towel near your bedroom fan.',
      'Keep humidity between 40% and 50% (do not exceed 55% to prevent mold growth).',
      'The micro-moisture binds to electrostatic PM2.5, weighting it down onto floors where damp mopping cleans it.'
    ],
    scienceNote: 'Particles <2.5µm stay suspended indefinitely in air <30% RH, but agglomerate and drop 3x faster at 45% RH.'
  }
];
