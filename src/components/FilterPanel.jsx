import useAppStore from "../store/useAppStore";

// ─── Risk level config ────────────────────────────────────────────────────────
const RISK_CONFIG = [
  {
    value: "critical",
    label: "Critical",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
  },
  {
    value: "high",
    label: "High",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    value: "moderate",
    label: "Moderate",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
  },
  {
    value: "low",
    label: "Low",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
  },
];

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div
    style={{
      fontSize: "10px",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "#334155",
      marginBottom: "8px",
    }}
  >
    {children}
  </div>
);

// ─── Risk level checkbox row ──────────────────────────────────────────────────
const RiskCheckbox = ({ config, checked, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      padding: "6px 8px",
      borderRadius: "6px",
      border: checked ? `1px solid ${config.border}` : "1px solid transparent",
      background: checked ? config.bg : "transparent",
      cursor: "pointer",
      transition: "all 0.15s ease",
      marginBottom: "3px",
    }}
  >
    {/* Custom checkbox */}
    <div
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "3px",
        border: checked ? `2px solid ${config.color}` : "2px solid #1e293b",
        background: checked ? config.color : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "all 0.15s ease",
      }}
    >
      {checked && (
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path
            d="M1.5 4L3 5.5L6.5 2"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>

    {/* Dot + label */}
    <span
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: config.color,
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontSize: "12px",
        color: checked ? "#cbd5e1" : "#475569",
        fontWeight: checked ? 500 : 400,
        transition: "color 0.15s ease",
      }}
    >
      {config.label}
    </span>
  </button>
);

// ─── Range slider ─────────────────────────────────────────────────────────────
const RangeSlider = ({ min, max, value, onChange, label, unit = "" }) => (
  <div style={{ marginBottom: "4px" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}
    >
      <span style={{ fontSize: "11px", color: "#475569" }}>{label}</span>
      <span
        style={{
          fontSize: "11px",
          color: "#94a3b8",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value[0]}
        {unit} – {value[1]}
        {unit}
      </span>
    </div>
    {/* Min slider */}
    <input
      type="range"
      min={min}
      max={max}
      value={value[0]}
      onChange={(e) => {
        const v = Number(e.target.value);
        if (v < value[1]) onChange([v, value[1]]);
      }}
      style={{ width: "100%", accentColor: "#38bdf8", marginBottom: "4px" }}
    />
    {/* Max slider */}
    <input
      type="range"
      min={min}
      max={max}
      value={value[1]}
      onChange={(e) => {
        const v = Number(e.target.value);
        if (v > value[0]) onChange([value[0], v]);
      }}
      style={{ width: "100%", accentColor: "#38bdf8" }}
    />
  </div>
);

// ─── Main FilterPanel ─────────────────────────────────────────────────────────
const FilterPanel = () => {
  const {
    filters,
    toggleRiskLevel,
    setRegion,
    setPollutionRange,
    clearFilters,
    getRegions,
    locations,
    _allLocations,
  } = useAppStore();

  const regions = getRegions();
  const activeFilterCount =
    filters.riskLevels.length +
    (filters.region !== "all" ? 1 : 0) +
    (filters.pollutionRange[0] > 0 || filters.pollutionRange[1] < 100 ? 1 : 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* ── Risk level ── */}
      <div>
        <SectionLabel>Risk level</SectionLabel>
        {RISK_CONFIG.map((config) => (
          <RiskCheckbox
            key={config.value}
            config={config}
            checked={filters.riskLevels.includes(config.value)}
            onToggle={() => toggleRiskLevel(config.value)}
          />
        ))}
      </div>

      {/* ── Region ── */}
      <div>
        <SectionLabel>Region</SectionLabel>
        <select
          value={filters.region}
          onChange={(e) => setRegion(e.target.value)}
          style={{
            width: "100%",
            padding: "7px 10px",
            background: "#0d1520",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
            color: filters.region === "all" ? "#475569" : "#cbd5e1",
            fontSize: "12px",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {regions.map((r) => (
            <option key={r} value={r} style={{ background: "#111827" }}>
              {r === "all" ? "All regions" : r}
            </option>
          ))}
        </select>
      </div>

      {/* ── Pollution index ── */}
      <div>
        <SectionLabel>Pollution index</SectionLabel>
        <RangeSlider
          min={0}
          max={100}
          value={filters.pollutionRange}
          onChange={setPollutionRange}
          label="Range"
        />
      </div>

      {/* ── Footer: results count + clear ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "12px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span style={{ fontSize: "11px", color: "#334155" }}>
          {locations.length} / {_allLocations.length} sites
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "5px",
              padding: "3px 8px",
              fontSize: "11px",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
