import L from "leaflet";

const markerColors = {
  critical: "#ef4444",
  high: "#f59e0b",
  moderate: "#3b82f6",
  medium: "#3b82f6", // alias — normalized in store but kept here as fallback
  low: "#22c55e",
};

export const createColoredMarker = (riskLevel) => {
  const color = markerColors[riskLevel] ?? "#94a3b8";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid rgba(255,255,255,0.25);
        box-shadow: 0 0 8px ${color}99;
        transition: transform 0.15s ease;
      "></div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -10],
  });
};

// Heatmap intensity weights per risk level (0–1 scale for Leaflet.heat)
export const heatWeight = (riskLevel) => {
  const weights = {
    critical: 1.0,
    high: 0.75,
    moderate: 0.45,
    medium: 0.45,
    low: 0.2,
  };
  return weights[riskLevel] ?? 0.3;
};
