import { mockLocations } from "../data/mockLocations";

const simulateDelay = () =>
  new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 400) + 200),
  );

const simulateError = () => Math.random() < 0.05;

export const getLocations = async () => {
  await simulateDelay();
  if (simulateError()) throw new Error("Failed to fetch locations");
  return mockLocations;
};

export const getLocationById = async (id) => {
  await simulateDelay();
  if (simulateError()) throw new Error("Failed to fetch location");
  const location = mockLocations.find((l) => l.id === id);
  if (!location) throw new Error(`Location ${id} not found`);
  return location;
};

export const getFilteredLocations = async (filters = {}) => {
  await simulateDelay();
  if (simulateError()) throw new Error("Failed to fetch filtered locations");

  let results = [...mockLocations];

  if (filters.riskLevels && filters.riskLevels.length > 0) {
    results = results.filter((l) => filters.riskLevels.includes(l.riskLevel));
  }

  if (filters.categories && filters.categories.length > 0) {
    results = results.filter((l) => filters.categories.includes(l.category));
  }

  return results;
};
