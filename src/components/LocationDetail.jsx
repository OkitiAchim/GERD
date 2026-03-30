import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLocationById } from "../services/environmentService";
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Droplets,
  Wind,
  Layers,
  Calendar,
  Activity,
} from "lucide-react";

// ─── Risk config ──────────────────────────────────────────────────────────────
const riskConfig = {
  critical: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    label: "Critical",
  },
  high: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    label: "High",
  },
  moderate: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
    label: "Moderate",
  },
  low: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    label: "Low",
  },
};

// ─── Score bar ────────────────────────────────────────────────────────────────
const ScoreBar = ({ label, value, max = 100, color }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontSize: "12px", color: "#64748b" }}>{label}</span>
        <span
          style={{
            fontSize: "12px",
            color: "#cbd5e1",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
      </div>
      <div
        style={{
          height: "4px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: "2px",
            transition: "width 0.6s ease",
            boxShadow: `0 0 6px ${color}88`,
          }}
        />
      </div>
    </div>
  );
};

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "10px",
      padding: "14px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <Icon size={13} color={color ?? "#475569"} strokeWidth={1.8} />
      <span
        style={{
          fontSize: "10px",
          color: "#334155",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
    <span
      style={{
        fontSize: "22px",
        fontWeight: 600,
        color: color ?? "#f1f5f9",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {value ?? "—"}
    </span>
  </div>
);

// ─── LocationDetail ───────────────────────────────────────────────────────────
const LocationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLocationById(id)
      .then(setLocation)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const risk = location
    ? (riskConfig[location.riskLevel] ?? riskConfig.moderate)
    : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1520",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f1f5f9",
      }}
    >
      {/* Header */}
      <header
        style={{
          height: "52px",
          background: "#111827",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: "12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "7px",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748b",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={13} />
          Back
        </button>
        <span style={{ fontSize: "12px", color: "#334155" }}>Dashboard</span>
        <span style={{ fontSize: "12px", color: "#1e293b" }}>/</span>
        <span style={{ fontSize: "12px", color: "#64748b" }}>
          {loading ? "Loading…" : (location?.name ?? "Not found")}
        </span>
      </header>

      {/* Body */}
      <div
        style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 20px" }}
      >
        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              paddingTop: "80px",
              color: "#334155",
            }}
          >
            Loading location data…
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "10px",
              padding: "20px",
              color: "#f87171",
              fontSize: "13px",
            }}
          >
            {error} —{" "}
            <button
              onClick={() => navigate(-1)}
              style={{
                color: "#38bdf8",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              go back
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && location && (
          <>
            {/* Title row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "28px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#f1f5f9",
                    margin: "0 0 6px",
                  }}
                >
                  {location.name}
                </h1>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <MapPin size={12} color="#475569" />
                  <span style={{ fontSize: "12px", color: "#475569" }}>
                    {location.region}
                  </span>
                  {location.lastUpdated && (
                    <>
                      <span style={{ color: "#1e293b" }}>·</span>
                      <Calendar size={12} color="#334155" />
                      <span style={{ fontSize: "12px", color: "#334155" }}>
                        Updated {location.lastUpdated}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Risk badge */}
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  background: risk.bg,
                  border: `1px solid ${risk.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <AlertTriangle size={13} color={risk.color} />
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: risk.color,
                  }}
                >
                  {risk.label} Risk
                </span>
              </div>
            </div>

            {/* Stat cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <StatCard
                icon={Wind}
                label="Pollution index"
                value={location.pollutionIndex}
                color={risk.color}
              />
              <StatCard
                icon={Layers}
                label="Soil score"
                value={location.soilScore}
                color="#94a3b8"
              />
              <StatCard
                icon={Droplets}
                label="Water quality"
                value={location.waterQuality}
                color="#38bdf8"
              />
              <StatCard
                icon={Activity}
                label="Category"
                value={location.category}
                color="#a78bfa"
              />
            </div>

            {/* Score bars */}
            <div
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#334155",
                  marginBottom: "18px",
                }}
              >
                Environmental indicators
              </div>
              <ScoreBar
                label="Pollution index"
                value={location.pollutionIndex}
                max={100}
                color={risk.color}
              />
              <ScoreBar
                label="Soil score"
                value={location.soilScore}
                max={10}
                color="#94a3b8"
              />
              <ScoreBar
                label="Water quality"
                value={location.waterQuality}
                max={100}
                color="#38bdf8"
              />
            </div>

            {/* Coordinates */}
            <div
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "16px 24px",
                display: "flex",
                gap: "32px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#334155",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Latitude
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {location.coordinates?.lat}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#334155",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Longitude
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#94a3b8",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {location.coordinates?.lng}
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#334155",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Region
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  {location.region}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LocationDetail;
