import test from 'node:test';
import assert from 'node:assert';
import { INDOOR_HACKS } from '../src/data/indoorHacks.js';

test('Indoor Hacks: contains practical low-cost hacks for urban families', () => {
  assert.ok(INDOOR_HACKS.length >= 6, 'Must provide at least 6 indoor hacks');
  
  INDOOR_HACKS.forEach(hack => {
    assert.ok(hack.id, 'Hack must have an id');
    assert.ok(hack.title, 'Hack must have a title');
    assert.ok(hack.cost, 'Hack must specify estimated cost');
    assert.ok(hack.difficulty, 'Hack must specify difficulty tier');
    assert.ok(hack.effectiveness, 'Hack must specify PM2.5 particulate reduction efficiency');
    assert.ok(hack.summary, 'Hack must have a descriptive summary');
    assert.ok(Array.isArray(hack.steps) && hack.steps.length >= 2, 'Hack must have step-by-step instructions');
  });

  // Verify core challenge hacks exist
  const corsiBox = INDOOR_HACKS.find(h => h.id === 'box-fan-filter' || h.title.includes('Corsi-Rosenthal'));
  assert.ok(corsiBox, 'Must include Corsi-Rosenthal DIY box hack');

  const plants = INDOOR_HACKS.find(h => h.id === 'nasa-plants' || h.title.includes('NASA'));
  assert.ok(plants, 'Must include NASA bio-purifying plants');

  const inversion = INDOOR_HACKS.find(h => h.id === 'inversion-ventilation' || h.title.includes('Inversion'));
  assert.ok(inversion, 'Must include thermal inversion ventilation hack');
});
