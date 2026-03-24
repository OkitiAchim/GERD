import { create } from "zustand";

const useAppStore = create((set) => ({
  locations: [],
  selectedLocation: null,
  filters: {
    riskLevels: [],
    categories: [],
  },
  loading: false,
  error: null,

  setLocations: (locations) => set({ locations }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  clearFilters: () => set({ filters: { riskLevels: [], categories: [] } }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useAppStore;
