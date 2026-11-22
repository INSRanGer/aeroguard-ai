import test from 'node:test';
import assert from 'node:assert/strict';
import { PERSONAS } from '../src/data/personas.js';
import { INDOOR_HACKS } from '../src/data/indoorHacks.js';
import { PRESET_CITIES, REGIONAL_STATIONS } from '../src/services/airQualityService.js';

test('Accessibility & Schema: personas provide screen-reader accessible metadata', () => {
  for (const persona of PERSONAS) {
    assert.ok(persona.name && persona.name.length > 0, `Persona missing accessible name`);
    assert.ok(persona.icon, `Persona ${persona.id} missing icon`);
    assert.ok(persona.vulnerability, `Persona ${persona.id} missing risk tier`);
    assert.ok(persona.tagline, `Persona ${persona.id} missing descriptive tagline`);
    assert.ok(Array.isArray(persona.priorityTips), `Persona ${persona.id} missing priority tips array`);
  }
});

test('Accessibility & Schema: indoor hacks provide structured actionable guidance', () => {
  for (const hack of INDOOR_HACKS) {
    assert.ok(hack.title, `Hack missing title`);
    assert.ok(hack.cost, `Hack ${hack.id} missing cost label`);
    assert.ok(hack.effectiveness, `Hack ${hack.id} missing effectiveness indicator`);
    assert.ok(Array.isArray(hack.steps), `Hack ${hack.id} missing steps list`);
    assert.ok(hack.steps.length > 0, `Hack ${hack.id} steps must not be empty`);
  }
});

test('Geographical Integrity: preset cities and stations have valid coordinates', () => {
  for (const city of PRESET_CITIES) {
    assert.ok(city.lat >= -90 && city.lat <= 90, `Invalid lat for ${city.name}`);
    assert.ok(city.lon >= -180 && city.lon <= 180, `Invalid lon for ${city.name}`);
  }
  for (const station of REGIONAL_STATIONS) {
    assert.ok(station.lat >= -90 && station.lat <= 90, `Invalid lat for ${station.name}`);
    assert.ok(station.lon >= -180 && station.lon <= 180, `Invalid lon for ${station.name}`);
    assert.ok(station.aqi > 0, `Station ${station.name} missing positive AQI`);
  }
});
