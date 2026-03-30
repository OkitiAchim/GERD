// ─── Base shimmer block ───────────────────────────────────────────────────────
const Shimmer = ({
  width = "100%",
  height = "12px",
  radius = "4px",
  style = {},
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background:
        "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.6s infinite",
      ...style,
    }}
  />
);

// ─── Sidebar skeleton ─────────────────────────────────────────────────────────
export const SidebarSkeleton = () => (
  <div
    style={{
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}
  >
    {/* Stat rows */}
    {[80, 60, 50, 60, 50].map((w, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "7px 0",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Shimmer width={`${w}%`} height="10px" />
        <Shimmer width="20px" height="10px" />
      </div>
    ))}

    {/* Filter section */}
    <div style={{ marginTop: "12px" }}>
      <Shimmer width="40%" height="9px" style={{ marginBottom: "12px" }} />
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <Shimmer width="14px" height="14px" radius="3px" />
          <Shimmer width="6px" height="6px" radius="50%" />
          <Shimmer width={`${50 + i * 8}%`} height="10px" />
        </div>
      ))}
    </div>
  </div>
);

// ─── Map skeleton ─────────────────────────────────────────────────────────────
export const MapSkeleton = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "#0d1520",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 5,
    }}
  >
    {/* Fake map grid lines */}
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, opacity: 0.04 }}
    >
      {[...Array(8)].map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={`${i * 14}%`}
          x2="100%"
          y2={`${i * 14}%`}
          stroke="#fff"
          strokeWidth="0.5"
        />
      ))}
      {[...Array(12)].map((_, i) => (
        <line
          key={`v${i}`}
          x1={`${i * 9}%`}
          y1="0"
          x2={`${i * 9}%`}
          y2="100%"
          stroke="#fff"
          strokeWidth="0.5"
        />
      ))}
    </svg>

    {/* Fake location blobs */}
    {[
      { x: "25%", y: "35%", size: 8 },
      { x: "55%", y: "28%", size: 10 },
      { x: "42%", y: "55%", size: 7 },
      { x: "68%", y: "48%", size: 9 },
      { x: "33%", y: "65%", size: 8 },
      { x: "72%", y: "65%", size: 7 },
    ].map((dot, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: dot.x,
          top: dot.y,
          width: dot.size,
          height: dot.size,
          borderRadius: "50%",
          background: "rgba(56,189,248,0.15)",
          border: "1px solid rgba(56,189,248,0.25)",
          animation: `shimmer 1.6s infinite ${i * 0.2}s`,
        }}
      />
    ))}

    {/* Center loading indicator */}
    <div style={{ textAlign: "center", zIndex: 2 }}>
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "2px solid rgba(56,189,248,0.15)",
          borderTop: "2px solid #38bdf8",
          animation: "spin 0.9s linear infinite",
          margin: "0 auto 10px",
        }}
      />
      <div
        style={{ fontSize: "12px", color: "#334155", letterSpacing: "0.04em" }}
      >
        Loading map…
      </div>
    </div>
  </div>
);

// ─── Analytics strip skeleton ─────────────────────────────────────────────────
export const AnalyticsStripSkeleton = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "0 20px",
      height: "100%",
    }}
  >
    <Shimmer width="12px" height="12px" radius="2px" />
    {[90, 70, 120].map((w, i) => (
      <Shimmer key={i} width={`${w}px`} height="18px" radius="4px" />
    ))}
  </div>
);

export default Shimmer;
