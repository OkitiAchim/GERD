import Layout from "../components/Layout";
import useLocations from "../hooks/useLocations";
import useAppStore from "../store/useAppStore";

const Dashboard = () => {
  useLocations();

  const { locations, loading, error } = useAppStore();

  console.log("locations:", locations);
  console.log("loading:", loading);
  console.log("error:", error);

  return <Layout />;
};

export default Dashboard;
