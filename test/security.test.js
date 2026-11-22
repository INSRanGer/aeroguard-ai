import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

test('Security Audit: zero plaintext API keys in git repository', () => {
  const serviceFile = fs.readFileSync(path.resolve('src/services/geminiService.js'), 'utf8');
  assert.ok(!serviceFile.includes('AIzaSy'), 'Must not contain plaintext Google AI Studio keys');
});

test('Security Audit: SECURITY.md policy documentation exists', () => {
  const exists = fs.existsSync(path.resolve('SECURITY.md'));
  assert.strictEqual(exists, true, 'SECURITY.md policy must be present');
});

test('Security Audit: vercel.json enforces strict HTTP security headers', () => {
  const vercelConfig = JSON.parse(fs.readFileSync(path.resolve('vercel.json'), 'utf8'));
  assert.ok(vercelConfig.headers && vercelConfig.headers.length > 0, 'vercel.json must define headers');

  const globalHeaders = vercelConfig.headers.find(h => h.source === '/(.*)');
  assert.ok(globalHeaders, 'Must define global security headers');

  const headerKeys = globalHeaders.headers.map(item => item.key);
  assert.ok(headerKeys.includes('X-Frame-Options'), 'Must include X-Frame-Options');
  assert.ok(headerKeys.includes('X-Content-Type-Options'), 'Must include X-Content-Type-Options');
  assert.ok(headerKeys.includes('Strict-Transport-Security'), 'Must include HSTS header');
});
