import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1520",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        color: "#475569",
      }}
    >
      <MapPin size={32} color="#1e293b" style={{ marginBottom: "16px" }} />
      <div style={{ fontSize: "13px", marginBottom: "20px" }}>
        Page not found
      </div>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "rgba(56,189,248,0.08)",
          border: "1px solid rgba(56,189,248,0.2)",
          borderRadius: "8px",
          padding: "8px 18px",
          color: "#38bdf8",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        Back to dashboard
      </button>
    </div>
  );
};

export default NotFound;
