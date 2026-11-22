import test from 'node:test';
import assert from 'node:assert/strict';
import { getAqiCategory, searchCities } from '../src/services/airQualityService.js';
import { calculateImpactMetrics } from '../src/services/impactCalculator.js';

test('Edge Case: getAqiCategory covers full numerical spectrum without throwing', () => {
  const boundaryValues = [0, 25, 50, 51, 100, 101, 150, 151, 200, 201, 300, 301, 500, 999, -10];
  for (const val of boundaryValues) {
    const cat = getAqiCategory(val);
    assert.ok(cat.label, `Category label missing for AQI ${val}`);
    assert.ok(cat.color, `Color missing for AQI ${val}`);
    assert.ok(cat.themeKey, `Theme key missing for AQI ${val}`);
  }
});

test('Edge Case: searchCities handles short queries, empty strings, and special characters', async () => {
  const empty = await searchCities('');
  assert.deepEqual(empty, []);

  const singleChar = await searchCities('a');
  assert.deepEqual(singleChar, []);

  const nullQuery = await searchCities(null);
  assert.deepEqual(nullQuery, []);

  const results = await searchCities('delhi');
  assert.ok(Array.isArray(results));
  assert.ok(results.length > 0);
  assert.ok(results[0].name.toLowerCase().includes('delhi'));
});

test('Edge Case: calculateImpactMetrics handles extreme values and zero actions', () => {
  const zeroImpact = calculateImpactMetrics({
    currentPm25: 0,
    personaId: 'healthy_adult',
    actionsCompleted: {
      woreN95: false,
      usedPurifier: false,
      avoidedMorningPeak: false,
      tookPublicTransit: false,
      stoppedIncense: false
    }
  });
  assert.ok(typeof zeroImpact.cigarettesEquivalent === 'number');

  const extremeImpact = calculateImpactMetrics({
    currentPm25: 800,
    personaId: 'toddlers',
    actionsCompleted: {
      woreN95: true,
      usedPurifier: true,
      avoidedMorningPeak: true,
      tookPublicTransit: true,
      stoppedIncense: true
    }
  });
  assert.ok(extremeImpact.pm25AvoidedMicrograms > 0);
  assert.ok(extremeImpact.cigarettesEquivalent > 0);
  assert.ok(extremeImpact.lungHealthScore > 60);
});
