import test from 'node:test';
import assert from 'node:assert';
import { PERSONAS } from '../src/data/personas.js';

test('Personas: exactly 6 physiological vulnerability profiles defined', () => {
  assert.strictEqual(PERSONAS.length, 6, 'Must define exactly 6 personas for Challenge 06');
});

test('Personas: each profile contains required schema fields and physiological metadata', () => {
  const expectedIds = ['toddlers', 'asthma', 'elderly', 'commuters', 'athletes', 'general'];

  PERSONAS.forEach((p, idx) => {
    assert.strictEqual(p.id, expectedIds[idx], `Persona at index ${idx} must have id ${expectedIds[idx]}`);
    assert.ok(p.name && typeof p.name === 'string', 'Persona must have a string name');
    assert.ok(p.icon && typeof p.icon === 'string', 'Persona must have an icon identifier');
    assert.ok(p.vulnerability && typeof p.vulnerability === 'string', 'Persona must have vulnerability tier');
    assert.ok(p.tagline && typeof p.tagline === 'string', 'Persona must have a tagline');
    assert.ok(typeof p.riskThreshold === 'number', 'Persona must define an AQI risk threshold');
    assert.ok(Array.isArray(p.factors) && p.factors.length >= 2, 'Persona must have at least 2 risk factors');
    assert.ok(Array.isArray(p.priorityTips) && p.priorityTips.length >= 2, 'Persona must have at least 2 key actionable tips');
  });
});
