import test from 'node:test';
import assert from 'node:assert';
import { getAqiCategory, getMonitoringStations, PRESET_CITIES } from '../src/services/airQualityService.js';

test('AQI Category: correct categorization across all 6 health tiers', () => {
  // Level 1: Good (0-50)
  const c1 = getAqiCategory(25);
  assert.strictEqual(c1.level, 1);
  assert.strictEqual(c1.themeKey, 'good');

  // Level 2: Moderate (51-100)
  const c2 = getAqiCategory(80);
  assert.strictEqual(c2.level, 2);
  assert.strictEqual(c2.themeKey, 'moderate');

  // Level 3: Sensitive Groups (101-150)
  const c3 = getAqiCategory(135);
  assert.strictEqual(c3.level, 3);
  assert.strictEqual(c3.themeKey, 'sensitive');

  // Level 4: Unhealthy (151-200)
  const c4 = getAqiCategory(180);
  assert.strictEqual(c4.level, 4);
  assert.strictEqual(c4.themeKey, 'unhealthy');

  // Level 5: Very Unhealthy (201-300)
  const c5 = getAqiCategory(260);
  assert.strictEqual(c5.level, 5);
  assert.strictEqual(c5.themeKey, 'veryUnhealthy');

  // Level 6: Hazardous (301+)
  const c6 = getAqiCategory(420);
  assert.strictEqual(c6.level, 6);
  assert.strictEqual(c6.themeKey, 'hazardous');
});

test('AQI Category: handles boundaries and edge cases gracefully', () => {
  // Negative or zero AQI
  assert.strictEqual(getAqiCategory(0).level, 1);
  assert.strictEqual(getAqiCategory(-10).level, 1);

  // Exact boundary values
  assert.strictEqual(getAqiCategory(50).level, 1);
  assert.strictEqual(getAqiCategory(51).level, 2);
  assert.strictEqual(getAqiCategory(100).level, 2);
  assert.strictEqual(getAqiCategory(101).level, 3);
  assert.strictEqual(getAqiCategory(150).level, 3);
  assert.strictEqual(getAqiCategory(151).level, 4);
  assert.strictEqual(getAqiCategory(200).level, 4);
  assert.strictEqual(getAqiCategory(201).level, 5);
  assert.strictEqual(getAqiCategory(300).level, 5);
  assert.strictEqual(getAqiCategory(301).level, 6);

  // Extreme high AQI
  assert.strictEqual(getAqiCategory(999).level, 6);
  assert.strictEqual(getAqiCategory(null).level, 1);
  assert.strictEqual(getAqiCategory(undefined).level, 1);
});

test('Monitoring Stations: regional network density and data validity', () => {
  const stations = getMonitoringStations(26.7606, 83.3732, 350, 'Gorakhpur');
  
  // Must return dense network (local + regional)
  assert.ok(stations.length >= 25, 'Expected 25+ stations across region');

  stations.forEach(st => {
    assert.ok(st.name, 'Station must have a valid name');
    assert.ok(typeof st.lat === 'number' && !isNaN(st.lat), 'Latitude must be a valid number');
    assert.ok(typeof st.lon === 'number' && !isNaN(st.lon), 'Longitude must be a valid number');
    assert.ok(st.aqi >= 0, 'AQI must be non-negative');
    assert.ok(st.pm25 >= 0, 'PM2.5 must be non-negative');
    assert.ok(st.pm10 >= 0, 'PM10 must be non-negative');
    assert.ok(st.category && st.category.color, 'Category must contain a color hex');
  });
});

test('Preset Cities: contains valid coordinates and default selection', () => {
  assert.ok(PRESET_CITIES.length >= 8, 'Expected at least 8 preset global cities');
  const defaultCity = PRESET_CITIES.find(c => c.default);
  assert.ok(defaultCity, 'Must define a default city');
  assert.strictEqual(defaultCity.name, 'Gorakhpur');

  PRESET_CITIES.forEach(city => {
    assert.ok(city.name, 'City must have a name');
    assert.ok(typeof city.lat === 'number' && city.lat >= -90 && city.lat <= 90);
    assert.ok(typeof city.lon === 'number' && city.lon >= -180 && city.lon <= 180);
  });
});
