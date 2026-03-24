import { useEffect } from "react";
import { getFilteredLocations } from "../services/environmentService";
import useAppStore from "../store/useAppStore";

const useLocations = () => {
  const { filters, setLocations, setLoading, setError } = useAppStore();

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFilteredLocations(filters);
        setLocations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [filters]);
};

export default useLocations;
