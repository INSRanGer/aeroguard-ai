import React from 'react';

export default function AtmosphericBackground({ category }) {
  if (!category) return null;

  // Particle color based on particleType
  const particleColorMap = {
    nature: 'rgba(52, 211, 153, 0.4)', // emerald
    haze: 'rgba(251, 191, 36, 0.35)',   // amber
    dust: 'rgba(251, 146, 60, 0.4)',   // orange
    smog: 'rgba(248, 113, 113, 0.45)', // red
    toxic: 'rgba(192, 132, 252, 0.45)', // purple
    ash: 'rgba(244, 63, 94, 0.55)'      // crimson ash
  };

  const pColor = particleColorMap[category.particleType] || 'rgba(255,255,255,0.2)';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000">
      
      {/* Top Main Radial Atmosphere Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[140px] opacity-35 transition-all duration-1000 ease-out"
        style={{ backgroundColor: category.color }}
      />

      {/* Secondary Bottom Ambient Glow */}
      <div
        className="absolute -bottom-32 right-10 w-[600px] h-[500px] rounded-full blur-[160px] opacity-20 transition-all duration-1000 ease-out"
        style={{ backgroundColor: category.accentColor }}
      />

      {/* Floating Ambient Particulate Layer */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(16)].map((_, i) => {
          const size = (i % 4) * 2 + 3;
          const left = (i * 6.25 + 3) % 100;
          const top = ((i * 13) + 7) % 100;
          const animDuration = 12 + (i % 8) * 3;
          const animDelay = (i % 5) * 1.5;

          return (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: pColor,
                boxShadow: `0 0 ${size * 2}px ${pColor}`,
                animation: `floatParticle ${animDuration}s ease-in-out infinite alternate`,
                animationDelay: `${animDelay}s`
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-25px) translateX(15px) scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-50px) translateX(-10px) scale(0.9);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
