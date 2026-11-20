// Health Exposure and Environmental Impact Calculator
// Based on Berkeley Earth PM2.5 cigarette equivalence and EPA urban emission factors

export function calculateImpactMetrics({
  currentPm25 = 85,
  personaId = 'general',
  actionsCompleted = {
    woreN95: true,
    usedPurifier: true,
    avoidedMorningPeak: true,
    tookPublicTransit: true,
    stoppedIncense: true
  }
}) {
  // Baseline daily air intake: Average adult breathes ~15 m3 of air/day (approx 0.62 m3/hr)
  // Sensitive/children have higher ventilation per body mass
  const breathingRatePerHr = personaId === 'athletes' ? 1.4 : personaId === 'toddlers' ? 0.35 : 0.65; // m3/hr

  // Baseline outdoor exposure without mitigation (assuming 4 hours outdoors in current PM2.5)
  const outdoorHours = 4;
  const rawOutdoorPm25Inhaled = currentPm25 * breathingRatePerHr * outdoorHours; // in micrograms (µg)

  let preventedPm25 = 0;

  // 1. Wearing N95 mask filters 95% of fine particulates
  if (actionsCompleted.woreN95) {
    preventedPm25 += rawOutdoorPm25Inhaled * 0.90;
  }

  // 2. Avoiding morning thermal inversion (smog is ~40% higher at dawn)
  if (actionsCompleted.avoidedMorningPeak) {
    preventedPm25 += (currentPm25 * 0.40) * breathingRatePerHr * 2;
  }

  // 3. Running indoor DIY filter or HEPA unit (cleans 80% indoor air over 12 hours)
  if (actionsCompleted.usedPurifier) {
    const indoorHours = 14;
    const indoorUnfilteredIntake = (currentPm25 * 0.70) * breathingRatePerHr * indoorHours;
    preventedPm25 += indoorUnfilteredIntake * 0.85;
  }

  // 4. Stopping incense / agarbatti burning indoors saves ~110 µg/m3 equivalent
  if (actionsCompleted.stoppedIncense) {
    preventedPm25 += 110 * breathingRatePerHr * 3;
  }

  // Berkeley Earth formula: ~22 µg/m3 daily PM2.5 exposure equals roughly 1 cigarette in lung toxicity
  // Over a day, inhaling 22 * 15 m3 ≈ 330 µg of PM2.5 is equivalent to 1 cigarette
  const cigaretteEquivalentsAvoided = (preventedPm25 / 330).toFixed(1);

  // Environmental Civic Savings (from choosing low-emission commute and routines)
  let co2SavedKg = 0;
  let pmEmissionsAvoidedGrams = 0;

  if (actionsCompleted.tookPublicTransit) {
    // 15 km urban commute by metro vs petrol car
    co2SavedKg += 2.4; // kg CO2
    pmEmissionsAvoidedGrams += 14.5; // grams of tailpipe PM
  }

  if (actionsCompleted.stoppedIncense) {
    co2SavedKg += 0.2;
    pmEmissionsAvoidedGrams += 3.2;
  }

  return {
    pm25AvoidedMicrograms: Math.round(preventedPm25),
    cigarettesEquivalent: Math.max(0.2, parseFloat(cigaretteEquivalentsAvoided)),
    co2SavedKg: parseFloat(co2SavedKg.toFixed(1)),
    pmEmissionsAvoidedGrams: parseFloat(pmEmissionsAvoidedGrams.toFixed(1)),
    lungHealthScore: Math.min(100, Math.round(60 + (preventedPm25 / 25)))
  };
}
