import test from 'node:test';
import assert from 'node:assert';
import { getAqiCategory, getMonitoringStations } from '../src/services/airQualityService.js';
import { calculateImpactMetrics } from '../src/services/impactCalculator.js';

test('getAqiCategory returns correct thresholds for CPCB & EPA standard', () => {
  const good = getAqiCategory(30);
  assert.strictEqual(good.level, 1);
  assert.strictEqual(good.label, 'Good (Clean Nature)');

  const moderate = getAqiCategory(75);
  assert.strictEqual(moderate.level, 2);
  assert.strictEqual(moderate.label, 'Moderate');

  const sensitive = getAqiCategory(120);
  assert.strictEqual(sensitive.level, 3);

  const unhealthy = getAqiCategory(175);
  assert.strictEqual(unhealthy.level, 4);

  const veryUnhealthy = getAqiCategory(250);
  assert.strictEqual(veryUnhealthy.level, 5);

  const hazardous = getAqiCategory(400);
  assert.strictEqual(hazardous.level, 6);
});

test('getMonitoringStations generates station network with valid coordinates and metrics', () => {
  const stations = getMonitoringStations(26.76, 83.37, 300, 'Gorakhpur');
  assert.ok(stations.length > 20, 'Should return comprehensive regional stations network');
  
  const first = stations[0];
  assert.ok(first.name, 'Station must have a name');
  assert.ok(typeof first.lat === 'number', 'Station must have latitude');
  assert.ok(typeof first.lon === 'number', 'Station must have longitude');
  assert.ok(typeof first.aqi === 'number', 'Station must have an aqi number');
});

test('calculateImpactMetrics computes Berkeley Earth cigarette equivalence correctly', () => {
  const impact = calculateImpactMetrics({
    currentPm25: 110,
    personaId: 'asthma',
    actionsCompleted: {
      woreN95: true,
      usedPurifier: true,
      avoidedMorningPeak: true,
      tookPublicTransit: true,
      stoppedIncense: true
    }
  });

  assert.ok(impact.cigarettesEquivalent > 0, 'Cigarettes spared must be positive');
  assert.ok(impact.pm25AvoidedMicrograms > 0, 'PM2.5 avoided must be positive');
  assert.ok(impact.co2SavedKg > 0, 'CO2 saved must be positive');
});
