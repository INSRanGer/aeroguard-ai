import test from 'node:test';
import assert from 'node:assert';
import { calculateImpactMetrics } from '../src/services/impactCalculator.js';

test('Impact Calculator: Berkeley Earth cigarette formula verification', () => {
  const result = calculateImpactMetrics({
    currentPm25: 150,
    personaId: 'general',
    actionsCompleted: {
      woreN95: true,
      usedPurifier: true,
      avoidedMorningPeak: true,
      tookPublicTransit: true,
      stoppedIncense: true
    }
  });

  assert.ok(result.pm25AvoidedMicrograms > 0, 'Prevented PM2.5 must be greater than 0');
  assert.ok(result.cigarettesEquivalent >= 0.5, 'Cigarettes equivalent must be calculated');
  assert.ok(result.co2SavedKg > 0, 'CO2 saved should reflect public transit usage');
  assert.ok(result.pmEmissionsAvoidedGrams > 0, 'Tailpipe PM emissions saved should be positive');
  assert.ok(result.lungHealthScore >= 60 && result.lungHealthScore <= 100, 'Score must be between 60-100');
});

test('Impact Calculator: persona breathing rates scale exposure appropriately', () => {
  const athleteResult = calculateImpactMetrics({
    currentPm25: 100,
    personaId: 'athletes',
    actionsCompleted: { woreN95: true }
  });

  const generalResult = calculateImpactMetrics({
    currentPm25: 100,
    personaId: 'general',
    actionsCompleted: { woreN95: true }
  });

  // Athletes breathe at ~1.4 m3/hr vs general adult ~0.65 m3/hr, so avoided exposure should be higher
  assert.ok(
    athleteResult.pm25AvoidedMicrograms > generalResult.pm25AvoidedMicrograms,
    'Athletes should have higher calculated exposure prevented due to higher respiratory volume'
  );
});

test('Impact Calculator: zero actions returns baseline minimums safely', () => {
  const zeroResult = calculateImpactMetrics({
    currentPm25: 50,
    personaId: 'general',
    actionsCompleted: {
      woreN95: false,
      usedPurifier: false,
      avoidedMorningPeak: false,
      tookPublicTransit: false,
      stoppedIncense: false
    }
  });

  assert.strictEqual(zeroResult.pm25AvoidedMicrograms, 0);
  assert.strictEqual(zeroResult.co2SavedKg, 0);
  assert.strictEqual(zeroResult.pmEmissionsAvoidedGrams, 0);
  assert.ok(zeroResult.lungHealthScore >= 50);
});
