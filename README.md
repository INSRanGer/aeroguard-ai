# 🌫️ AeroGuard AI — Urban Smog & Family IAQ Copilot
### Google PromptWars Virtual — Challenge 06 Submission
> **Live Demo:** [https://aeroguard-ai-sooty.vercel.app](https://aeroguard-ai-sooty.vercel.app)  
> **Repository:** [https://github.com/INSRanger/aeroguard-ai](https://github.com/INSRanger/aeroguard-ai)  
> **Track:** Intent-Driven Development & AI Vibe Coding  
> **Challenge:** [Challenge 06] Urban Air Quality Assistant  
> **Powered by:** Google Gemini • Open-Meteo Air API • React • Vite • Tailwind CSS

---

## 🎯 Problem Statement
Severe winter smog and urban air pollution (PM2.5, PM10, thermal inversion fog) cause acute respiratory distress, cardiovascular strain, and long-term health degradation for urban families. Standard weather apps simply display an AQI number without actionable, persona-aware guidance.

**AeroGuard AI** bridges this gap: a Generative AI copilot that translates real-time meteorological and pollutant telemetry into personalized, low-emission daily routines, indoor air quality (IAQ) hacks, and quantified health protection metrics.

---

## ✨ Key Features

1. 🌍 **Real-Time Global AQI & Pollutant Telemetry:**
   * Free Open-Meteo Air Quality API integration (no API key required).
   * Tracks US AQI, PM2.5, PM10, Nitrogen Dioxide (NO₂), Ground Ozone (O₃), and Carbon Monoxide (CO).
   * Geocoding search for any city in the world + GPS auto-detection.

2. 👥 **Physiological Persona Vulnerability Profiles:**
   * 👶 **Infants & Toddlers**: High respiratory rate & floor-level particulate risks.
   * 🫁 **Asthma & Respiratory**: Bronchial sensitivity & morning inversion triggers.
   * 🧓 **Elderly Parents**: Cardiovascular strain & blood pressure spikes.
   * 🚴 **Outdoor Commuters**: Stop-and-go vehicular exhaust & direct soot inhalation.
   * 🏃 **Athletes & Runners**: High minute-ventilation & deep alveolar particle deposition.
   * 🏡 **General Household / WFH**: Indoor air hygiene & source control.

3. 🕒 **24-Hour Smog Curve & Safe Window Predictor:**
   * Visualizes the thermal inversion cycle across 24 hours.
   * Pinpoints the **"Golden Window"** (1:00 PM – 4:00 PM) for safe 15-minute home ventilation and errands.
   * Warns against high-risk morning inversion fog (6:00 AM – 9:30 AM).

4. 🌿 **Field-Tested Low-Cost Indoor Air Quality (IAQ) Hacks:**
   * **DIY Corsi-Rosenthal Box / HEPA Filter Hack** (cuts indoor PM2.5 by 92% for under $25).
   * **NASA Bio-Purifying Plants** (Snake Plant, Areca Palm, Spider Plant).
   * **Thermal Inversion Ventilation Timing** (zero cost).
   * **Wet-Mopping & Micro-Mist Protocol** (eliminates secondary dust resuspension).
   * **Kitchen Thermal Chimney & Oil Trap** (prevents indoor 500+ PM spikes).
   * **45-50% Humidity Particulate Barrier** (accelerates electrostatic particle settling).

5. 📊 **Dual Impact Visualizer (Health vs Environment):**
   * **Cigarette Exposure Spared**: Berkeley Earth equivalence formula ($22 \mu\text{g/m}^3 \approx 1\text{ cigarette/day}$).
   * **PM2.5 Lung Ingestion Avoided**: Micrograms of toxic soot filtered.
   * **Civic Carbon & Tailpipe Spared**: kg of CO₂ and grams of exhaust PM saved by public transit.

6. 💬 **Interactive "Air Doctor" Copilot:**
   * Conversational assistant grounded in local real-time telemetry and user persona.
   * Built-in prompt chips for immediate answers.

7. 🧠 **In-App Prompt Architecture Inspector:**
   * An on-screen modal showcasing the exact **System Prompt**, **Chain-of-Thought**, **Runtime Context Injection**, and **JSON Schema**—designed specifically for PromptWars evaluators.

---

## 🏗️ Architecture & Prompt Engineering Blueprint

```
┌────────────────────────────────────────────────────────┐
│                   AeroGuard AI Client                  │
│       (Vite + React 18 + Tailwind CSS + Lucide)        │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    [Live AQI Engine]           [Gemini 1.5 Flash]
   (Open-Meteo Air API)        Prompt Engine:
   • PM2.5, PM10, NO2, O3     • Persona Context
   • 24h Hourly Forecast      • Telemetry Injection
             │                 • Structured JSON Schema
             └─────────────┬─────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│  • Dynamic Smog Speedometer Gauge                      │
│  • 24h Safe Outdoor & Ventilation Window               │
│  • Tailored Action Plan & Low-Emission Commute         │
│  • DIY Indoor Air Quality Hacks Gallery                │
│  • Impact Meter (Cigarettes Spared vs Carbon Saved)    │
│  • Conversational Air Doctor Copilot                   │
└────────────────────────────────────────────────────────┘
```

### System Prompt Design:
```text
You are AeroGuard, an expert Urban Environmental Epidemiologist and Indoor Air Quality (IAQ) Copilot.
Your mission is to protect families, vulnerable individuals, and urban communities from dangerous winter smog
and empower low-emission civic habits.

CORE RESPONSIBILITIES:
1. Ground every recommendation in the user's specific persona vulnerability.
2. Use atmospheric science principles (thermal inversion, diurnal particulate accumulation).
3. Offer practical, low-cost, immediately actionable indoor hacks.
4. Quantify health protection (estimated PM2.5 lung exposure avoided) and eco-impact (carbon spared).
5. Maintain strict JSON schema adherence for zero UI hallucinations.
```

---

## 🚀 Getting Started

### Prerequisites:
* Node.js (v18 or higher)
* npm

### Installation:
```bash
# Clone the repository
git clone https://github.com/your-username/aeroguard-ai.git
cd aeroguard-ai

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Using Gemini API (Optional):
The app works **100% out of the box** using its intelligent built-in reasoning engine. To connect live Gemini 1.5 Flash:
1. Click the **"Gemini Key"** button in the header.
2. Enter your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3. The key is saved strictly in your browser's `localStorage`.

---

## 🌐 1-Click Deployment (Vercel / Netlify)
You can deploy this repository to **Vercel** or **Netlify** with zero configuration:
1. Push code to GitHub.
2. Import repo into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Build Command: `npm run build`
4. Output Directory: `dist`

---

## 🏆 Submission Info
* **Participant:** Built for Google PromptWars Virtual Challenge 06
* **Host:** Google for Developers & Hack2skill
* **Theme:** Urban Air Quality Assistant
