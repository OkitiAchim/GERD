import { useEffect, useState } from "react";

// ─── Pulse ring logo ──────────────────────────────────────────────────────────
const PulseLogo = ({ size = 64, animate = true }) => (
  <div
    style={{ position: "relative", width: size, height: size, flexShrink: 0 }}
  >
    {/* Outer pulse rings */}
    {animate && (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1.5px solid rgba(56,189,248,0.35)",
            animation: "pulseRing 2s ease-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1.5px solid rgba(56,189,248,0.2)",
            animation: "pulseRing 2s ease-out infinite 0.6s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1.5px solid rgba(56,189,248,0.1)",
            animation: "pulseRing 2s ease-out infinite 1.2s",
          }}
        />
      </>
    )}
    {/* Core circle */}
    <div
      style={{
        position: "absolute",
        inset: "18%",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 20px rgba(56,189,248,0.4)",
      }}
    >
      {/* Center dot */}
      <div
        style={{
          width: "30%",
          height: "30%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
        }}
      />
    </div>
    {/* Inner ring */}
    <div
      style={{
        position: "absolute",
        inset: "10%",
        borderRadius: "50%",
        border: "1px solid rgba(56,189,248,0.5)",
      }}
    />
  </div>
);

// ─── SplashScreen ─────────────────────────────────────────────────────────────
const LETTERS = ["G", "E", "R", "D"];
const SUBTITLE = "Geospatial Environmental Risk Dashboard";

const SplashScreen = ({ onComplete }) => {
  const [lettersDone, setLettersDone] = useState(0); // how many letters typed
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Type each letter with a staggered delay
    LETTERS.forEach((_, i) => {
      setTimeout(
        () => {
          setLettersDone(i + 1);
        },
        300 + i * 220,
      );
    });

    // Show subtitle after all letters
    setTimeout(() => setShowSubtitle(true), 300 + LETTERS.length * 220 + 100);

    // Show progress bar
    setTimeout(() => setShowBar(true), 300 + LETTERS.length * 220 + 350);

    // Animate bar to 100%
    setTimeout(() => setBarWidth(100), 300 + LETTERS.length * 220 + 450);

    // Fade out splash
    setTimeout(() => setFadeOut(true), 300 + LETTERS.length * 220 + 1600);

    // Unmount and hand off
    setTimeout(() => onComplete?.(), 300 + LETTERS.length * 220 + 2000);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0d1520",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "28px",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.4s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Pulse logo */}
      <PulseLogo size={80} animate />

      {/* Typed letters */}
      <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
        {LETTERS.map((letter, i) => (
          <span
            key={letter}
            style={{
              fontSize: "52px",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#f1f5f9",
              opacity: i < lettersDone ? 1 : 0,
              transform: i < lettersDone ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
              textShadow:
                i < lettersDone ? "0 0 30px rgba(56,189,248,0.3)" : "none",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#64748b",
          opacity: showSubtitle ? 1 : 0,
          transform: showSubtitle ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {SUBTITLE}
      </div>

      {/* Progress bar */}
      {showBar && (
        <div
          style={{
            width: "160px",
            height: "2px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${barWidth}%`,
              background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
              borderRadius: "1px",
              transition: "width 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 0 8px rgba(56,189,248,0.6)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export { PulseLogo };
export default SplashScreen;
