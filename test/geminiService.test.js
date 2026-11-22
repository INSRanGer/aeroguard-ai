import test from 'node:test';
import assert from 'node:assert/strict';
import { SYSTEM_PROMPT_BLUEPRINT, generateActionPlanWithGemini, askAirDoctor } from '../src/services/geminiService.js';
import { PERSONAS } from '../src/data/personas.js';
import { getAqiCategory } from '../src/services/airQualityService.js';

test('Gemini Blueprint: contains required prompt engineering guidelines', () => {
  assert.ok(SYSTEM_PROMPT_BLUEPRINT.includes('AeroGuard'));
  assert.ok(SYSTEM_PROMPT_BLUEPRINT.includes('Google PromptWars Challenge 06'));
  assert.ok(SYSTEM_PROMPT_BLUEPRINT.includes('Google Gemini'));
  assert.ok(SYSTEM_PROMPT_BLUEPRINT.includes('CRITICAL RULES'));
});

test('Gemini Action Plan: generates valid structured plan with fallback support', async () => {
  const dummyAqiData = {
    currentAqi: 240,
    pm25: 180,
    pm10: 210,
    category: getAqiCategory(240)
  };

  const plan = await generateActionPlanWithGemini({
    persona: PERSONAS[0],
    aqiData: dummyAqiData,
    cityName: 'Test City',
    apiKey: 'invalid_dummy_key_to_test_fallback'
  });

  assert.ok(plan, 'Plan must be returned');
  assert.ok(plan.summary, 'Plan must have summary');
  assert.ok(plan.commuteAdvise, 'Plan must have commute advice');
  assert.ok(plan.safeWindow, 'Plan must have safe window');
  assert.ok(plan.indoorShield, 'Plan must have indoor shield advice');
  assert.ok(plan.healthAlert, 'Plan must have health alert');
});

test('Gemini Copilot: answers persona queries with accurate contextual guidance', async () => {
  const dummyAqiData = {
    currentAqi: 35,
    pm25: 12,
    pm10: 20,
    category: getAqiCategory(35)
  };

  const response = await askAirDoctor({
    userMessage: 'Should I wear a mask today?',
    persona: PERSONAS[1],
    aqiData: dummyAqiData,
    cityName: 'Zurich'
  });

  assert.ok(response.text, 'Copilot must return an answer');
  assert.ok(response.source, 'Copilot must cite the response source');
  assert.ok(response.text.toLowerCase().includes('not need') || response.text.toLowerCase().includes('clean'), 'Must detect clean air');
});
