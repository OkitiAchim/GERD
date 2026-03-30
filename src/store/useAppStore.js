import { create } from "zustand";

// ─── Unique regions derived at runtime ───────────────────────────────────────
export const ALL_RISK_LEVELS = ["low", "moderate", "high", "critical"];

const useAppStore = create((set, get) => ({
  // ── Raw data ──────────────────────────────────────────────────────────────
  _allLocations: [],
  locations: [], // filtered view — what the map renders
  selectedLocation: null,

  // ── Filters ───────────────────────────────────────────────────────────────
  filters: {
    riskLevels: [], // [] = show all
    region: "all",
    pollutionRange: [0, 100],
  },

  loading: false,
  error: null,

  // ── Setters ───────────────────────────────────────────────────────────────
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Load locations and normalize riskLevel casing
  setLocations: (locations) => {
    const normalized = locations.map((l) => ({
      ...l,
      // normalize MEDIUM → moderate, keep others lowercase
      riskLevel:
        l.riskLevel === "medium" || l.riskLevel === "MEDIUM"
          ? "moderate"
          : String(l.riskLevel).toLowerCase(),
    }));
    set({ _allLocations: normalized });
    get()._applyFilters();
  },

  // ── Filter actions ────────────────────────────────────────────────────────
  toggleRiskLevel: (level) => {
    const current = get().filters.riskLevels;
    const next = current.includes(level)
      ? current.filter((r) => r !== level)
      : [...current, level];
    set((state) => ({ filters: { ...state.filters, riskLevels: next } }));
    get()._applyFilters();
  },

  setRegion: (region) => {
    set((state) => ({ filters: { ...state.filters, region } }));
    get()._applyFilters();
  },

  setPollutionRange: (range) => {
    set((state) => ({ filters: { ...state.filters, pollutionRange: range } }));
    get()._applyFilters();
  },

  clearFilters: () => {
    set({
      filters: { riskLevels: [], region: "all", pollutionRange: [0, 100] },
    });
    get()._applyFilters();
  },

  // ── Internal: recompute filtered locations ────────────────────────────────
  _applyFilters: () => {
    const { _allLocations, filters } = get();
    const { riskLevels, region, pollutionRange } = filters;

    const filtered = _allLocations.filter((loc) => {
      if (riskLevels.length > 0 && !riskLevels.includes(loc.riskLevel))
        return false;
      if (region !== "all" && loc.region !== region) return false;
      if (
        loc.pollutionIndex < pollutionRange[0] ||
        loc.pollutionIndex > pollutionRange[1]
      )
        return false;
      return true;
    });

    set({ locations: filtered });
  },

  // ── Derived helpers ───────────────────────────────────────────────────────
  getRegions: () => {
    const all = get()._allLocations.map((l) => l.region);
    return ["all", ...Array.from(new Set(all)).sort()];
  },

  getStats: () => {
    const locs = get()._allLocations;
    return {
      total: locs.length,
      critical: locs.filter((l) => l.riskLevel === "critical").length,
      high: locs.filter((l) => l.riskLevel === "high").length,
      moderate: locs.filter((l) => l.riskLevel === "moderate").length,
      low: locs.filter((l) => l.riskLevel === "low").length,
    };
  },
}));

export default useAppStore;
