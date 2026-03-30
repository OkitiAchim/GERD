import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import { createColoredMarker, heatWeight } from "../utils/mapMarkers";
import MapLegend from "./MapLegend";
import "../utils/leafletIconFix";

// ─── Risk badge colors ────────────────────────────────────────────────────────
const riskColor = {
  low: "#22c55e",
  moderate: "#3b82f6",
  high: "#f59e0b",
  critical: "#ef4444",
};
const riskLabel = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  critical: "Critical",
};

// ─── Auto-fit bounds ──────────────────────────────────────────────────────────
const FitBounds = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = locations.map((l) => [l.coordinates.lat, l.coordinates.lng]);
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [locations, map]);
  return null;
};

// ─── Heatmap layer ────────────────────────────────────────────────────────────
const HeatmapLayer = ({ locations, visible }) => {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    import("leaflet.heat").then(() => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      if (!visible || locations.length === 0) return;

      const points = locations.map((l) => [
        l.coordinates.lat,
        l.coordinates.lng,
        heatWeight(l.riskLevel),
      ]);

      layerRef.current = window.L.heatLayer(points, {
        radius: 28,
        blur: 18,
        maxZoom: 10,
        max: 1.0,
        gradient: {
          0.0: "#22c55e",
          0.4: "#3b82f6",
          0.7: "#f59e0b",
          1.0: "#ef4444",
        },
      }).addTo(map);
    });

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [locations, visible, map]);

  return null;
};

// ─── Layer toggle buttons ─────────────────────────────────────────────────────
const LayerToggle = ({ showHeatmap, onToggle }) => (
  <div
    style={{
      position: "absolute",
      bottom: "20px",
      right: "14px",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }}
  >
    <button
      title="Markers"
      onClick={() => showHeatmap && onToggle("markers")}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s ease",
        background: !showHeatmap
          ? "rgba(56,189,248,0.15)"
          : "rgba(17,24,39,0.85)",
        border: !showHeatmap
          ? "1px solid rgba(56,189,248,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle
          cx="8"
          cy="7"
          r="3"
          fill={!showHeatmap ? "#38bdf8" : "#475569"}
        />
        <path
          d="M8 14s5-4.5 5-7a5 5 0 10-10 0c0 2.5 5 7 5 7z"
          stroke={!showHeatmap ? "#38bdf8" : "#475569"}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </button>

    <button
      title="Heatmap"
      onClick={() => !showHeatmap && onToggle("heatmap")}
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s ease",
        background: showHeatmap
          ? "rgba(239,68,68,0.15)"
          : "rgba(17,24,39,0.85)",
        border: showHeatmap
          ? "1px solid rgba(239,68,68,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle
          cx="8"
          cy="8"
          r="5"
          fill={showHeatmap ? "rgba(239,68,68,0.4)" : "rgba(71,85,105,0.4)"}
        />
        <circle
          cx="8"
          cy="8"
          r="3"
          fill={showHeatmap ? "#ef4444" : "#475569"}
        />
        <circle
          cx="8"
          cy="8"
          r="1.5"
          fill={showHeatmap ? "#fca5a5" : "#64748b"}
        />
      </svg>
    </button>
  </div>
);

// ─── MapView ──────────────────────────────────────────────────────────────────
const MapView = () => {
  const { locations, loading, setSelectedLocation } = useAppStore();
  const [showHeatmap, setShowHeatmap] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            background: "rgba(13,21,32,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#64748b", fontSize: "13px" }}>
            Loading locations…
          </span>
        </div>
      )}

      {!loading && locations.length === 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(22,27,39,0.9)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              padding: "18px 26px",
              color: "#475569",
              fontSize: "13px",
            }}
          >
            No locations match your filters
          </div>
        </div>
      )}

      <MapLegend showHeatmap={showHeatmap} />
      <LayerToggle
        showHeatmap={showHeatmap}
        onToggle={(m) => setShowHeatmap(m === "heatmap")}
      />

      <MapContainer
        center={[9.082, 8.6753]}
        zoom={6}
        style={{ height: "100%", width: "100%", background: "#0d1520" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <FitBounds locations={locations} />
        <HeatmapLayer locations={locations} visible={showHeatmap} />

        {!showHeatmap &&
          locations.map((location) => (
            <Marker
              key={location.id}
              position={[location.coordinates.lat, location.coordinates.lng]}
              icon={createColoredMarker(location.riskLevel)}
              eventHandlers={{ click: () => setSelectedLocation(location) }}
            >
              <Popup className="geo-popup" closeButton={false} offset={[0, -6]}>
                <div
                  style={{
                    background: "#161b27",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    minWidth: "200px",
                  }}
                >
                  {/* Name + badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#f1f5f9",
                      }}
                    >
                      {location.name}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: riskColor[location.riskLevel] ?? "#94a3b8",
                        background: `${riskColor[location.riskLevel] ?? "#94a3b8"}18`,
                        border: `1px solid ${riskColor[location.riskLevel] ?? "#94a3b8"}40`,
                        borderRadius: "4px",
                        padding: "2px 6px",
                      }}
                    >
                      {riskLabel[location.riskLevel] ?? location.riskLevel}
                    </span>
                  </div>

                  {/* Data rows */}
                  {[
                    ["Region", location.region],
                    ["Pollution index", location.pollutionIndex],
                    ["Soil score", location.soilScore],
                    ["Water quality", location.waterQuality],
                  ].map(([label, val]) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#64748b" }}>
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#cbd5e1",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {val ?? "—"}
                      </span>
                    </div>
                  ))}

                  {/* Action — navigates to detail page */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      marginTop: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <button
                      onClick={() => navigate(`/location/${location.id}`)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#38bdf8",
                        fontSize: "11px",
                      }}
                    >
                      View full details →
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
