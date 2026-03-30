import { useState } from "react";
import Layout from "../components/Layout";
import SplashScreen from "../components/SplashScreen";

const Dashboard = () => {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Layout />
      </div>
    </>
  );
};

export default Dashboard;
