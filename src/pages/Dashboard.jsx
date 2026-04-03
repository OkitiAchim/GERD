import { useState } from "react";
import Layout from "../components/Layout";
import SplashScreen from "../components/SplashScreen";

const Dashboard = () => {
  // splashDone gates the dashboard reveal
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Splash sits on top until complete */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Dashboard fades in after splash — dark bg ensures no white flash */}
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "#0d1520",
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.5s ease",
          // Keep it in the DOM so Layout mounts, but invisible until splash done
          pointerEvents: splashDone ? "auto" : "none",
        }}
      >
        {/* Only mount Layout (and trigger useLocations fetch) once splash is done */}
        {splashDone && <Layout />}
      </div>
    </>
  );
};

export default Dashboard;
