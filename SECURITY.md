# Security Policy — AeroGuard AI

## Overview
AeroGuard AI is an urban air quality and environmental health intelligence assistant developed for Google PromptWars Virtual Challenge 06. We take user privacy, client-side safety, and data integrity seriously.

## Security Architecture & Best Practices

### 1. Zero PII Storage
- AeroGuard AI does **not** collect, store, or transmit any Personally Identifiable Information (PII).
- User location coordinates (via browser Geolocation API) are processed strictly in-memory within the client's browser session. No geodata is ever persisted on external databases.

### 2. Client-Side API Key Hygiene
- Optional user-supplied Google Gemini API keys are held strictly in `localStorage` in the user's local browser sandbox.
- Keys are never logged, proxied through intermediary servers, or transmitted to third-party endpoints.
- Direct REST requests are dispatched strictly to official Google endpoints: `https://generativelanguage.googleapis.com`.

### 3. Content Security Policy (CSP) & HTTP Headers
AeroGuard AI enforces strict HTTP response headers configured via `vercel.json`:
- **Content-Security-Policy**: Enforces trusted script, style, and API domains.
- **X-Frame-Options: DENY**: Protects against clickjacking attacks.
- **X-Content-Type-Options: nosniff**: Prevents MIME-type sniffing vulnerabilities.
- **Strict-Transport-Security (HSTS)**: Mandates HTTPS for all sessions.
- **Referrer-Policy: strict-origin-when-cross-origin**: Prevents metadata leakage across domains.

### 4. Input Sanitization & Anti-XSS
- All dynamic inputs (city search queries, AI chat prompts) undergo strict client-side sanitization and type-checking before execution to prevent Cross-Site Scripting (XSS) and injection vectors.

## Reporting a Vulnerability
If you discover a security vulnerability in this project, please open a GitHub Security Advisory or report it directly via GitHub issues. Vulnerabilities will be addressed within 24 hours.
