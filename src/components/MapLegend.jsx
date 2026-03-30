// MapLegend.jsx — floating top-right overlay on the map

const LEGEND_ITEMS = [
  { color: "#ef4444", label: "Critical", range: "80 – 100" },
  { color: "#f59e0b", label: "High", range: "60 – 79" },
  { color: "#3b82f6", label: "Moderate", range: "40 – 59" },
  { color: "#22c55e", label: "Low", range: "0 – 39" },
];

const MapLegend = () => (
  <div
    style={{
      position: "absolute",
      top: "14px",
      right: "14px",
      zIndex: 1000,
      background: "rgba(17,24,39,0.92)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "10px",
      padding: "12px 14px",
      backdropFilter: "blur(8px)",
      minWidth: "160px",
      pointerEvents: "none", // let map interactions pass through
    }}
  >
    {/* Title */}
    <div
      style={{
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#334155",
        marginBottom: "10px",
      }}
    >
      Pollution index
    </div>

    {/* Items */}
    {LEGEND_ITEMS.map(({ color, label, range }) => (
      <div
        key={label}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "7px",
        }}
      >
        {/* Color swatch */}
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}80`,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "12px", color: "#94a3b8", flex: 1 }}>
          {label}
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "#334155",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {range}
        </span>
      </div>
    ))}

    {/* Divider + note */}
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        marginTop: "8px",
        paddingTop: "8px",
        fontSize: "10px",
        color: "#1e293b",
      }}
    >
      Click a marker for details
    </div>
  </div>
);

export default MapLegend;
