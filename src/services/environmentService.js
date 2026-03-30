import { mockLocations } from "../data/mockLocations";

const simulateDelay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 400) + 200),
  );

const simulateError = () => Math.random() < 0.05;

// ─── Normalize riskLevel so "medium" → "moderate" everywhere ─────────────────
const normalize = (locations) =>
  locations.map((l) => ({
    ...l,
    riskLevel:
      l.riskLevel === "medium" || l.riskLevel === "MEDIUM"
        ? "moderate"
        : String(l.riskLevel).toLowerCase(),
  }));

export const getLocations = async () => {
  await simulateDelay();
  if (simulateError()) throw new Error("Failed to fetch locations");
  return normalize(mockLocations);
};

export const getLocationById = async (id) => {
  await simulateDelay();
  if (simulateError()) throw new Error("Failed to fetch location");
  const location = mockLocations.find((l) => l.id === id);
  if (!location) throw new Error(`Location ${id} not found`);
  return normalize([location])[0];
};

export const getFilteredLocations = async (filters = {}) => {
  await simulateDelay();
  if (simulateError()) throw new Error("Failed to fetch filtered locations");

  let results = normalize(mockLocations);

  // Risk levels
  if (filters.riskLevels?.length > 0) {
    results = results.filter((l) => filters.riskLevels.includes(l.riskLevel));
  }

  // Region
  if (filters.region && filters.region !== "all") {
    results = results.filter((l) => l.region === filters.region);
  }

  // Pollution index range
  if (filters.pollutionRange) {
    const [min, max] = filters.pollutionRange;
    results = results.filter(
      (l) => l.pollutionIndex >= min && l.pollutionIndex <= max,
    );
  }

  // Categories (legacy support)
  if (filters.categories?.length > 0) {
    results = results.filter((l) => filters.categories.includes(l.category));
  }

  return results;
};
