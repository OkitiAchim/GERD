import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MapView from "./mapView";
import FilterPanel from "./FilterPanel";
import { PulseLogo } from "./SplashScreen";
import { SidebarSkeleton, AnalyticsStripSkeleton } from "./SkeletonLoaders";
import {
  LayoutDashboard,
  MapPin,
  SlidersHorizontal,
  Activity,
  ChevronRight,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";
import useAppStore from "../store/useAppStore";
import useLocations from "../hooks/useLocations";

// ─── Breakpoint hook ──────────────────────────────────────────────────────────
const useBreakpoint = () => {
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    return w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  });
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return bp;
};

// ─── Nav item ─────────────────────────────────────────────────────────────────
const NavItem = ({ icon: Icon, label, to = "/", compact = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <button
      onClick={() => navigate(to)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: compact ? "0" : "10px",
        justifyContent: compact ? "center" : "flex-start",
        padding: compact ? "8px" : "7px 10px",
        borderRadius: "7px",
        marginBottom: "2px",
        border: active
          ? "1px solid rgba(56,189,248,0.15)"
          : "1px solid transparent",
        background: active ? "rgba(56,189,248,0.08)" : "transparent",
        color: active ? "#38bdf8" : "#475569",
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <Icon size={14} strokeWidth={1.8} />
      {!compact && (
        <span style={{ fontWeight: active ? 500 : 400 }}>{label}</span>
      )}
      {!compact && active && (
        <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.4 }} />
      )}
    </button>
  );
};

// ─── Stat chip ────────────────────────────────────────────────────────────────
const StatChip = ({ label, value, color, compact }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "7px 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      justifyContent: compact ? "center" : "space-between",
      flexDirection: compact ? "column" : "row",
      gap: compact ? "2px" : "0",
    }}
  >
    {!compact && (
      <span style={{ fontSize: "11px", color: "#334155" }}>{label}</span>
    )}
    <span
      style={{
        fontSize: compact ? "13px" : "12px",
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        color: color ?? "#64748b",
      }}
    >
      {value}
    </span>
    {compact && (
      <span style={{ fontSize: "9px", color: "#1e293b" }}>{label}</span>
    )}
  </div>
);

// ─── Analytics strip ──────────────────────────────────────────────────────────
const AnalyticsStrip = () => {
  const { locations, _allLocations, loading } = useAppStore();

  if (loading) return <AnalyticsStripSkeleton />;

  const avg = locations.length
    ? (
        locations.reduce((s, l) => s + l.pollutionIndex, 0) / locations.length
      ).toFixed(1)
    : "—";

  const worst = locations.length
    ? locations.reduce((a, b) => (a.pollutionIndex > b.pollutionIndex ? a : b))
    : null;

  const pill = (label, value, color = "#64748b") => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: "11px", color: "#334155" }}>{label}</span>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color,
          fontVariantNumeric: "tabular-nums",
          background: `${color}14`,
          border: `1px solid ${color}30`,
          borderRadius: "4px",
          padding: "1px 6px",
        }}
      >
        {value}
      </span>
    </div>
  );

  return (
    <>
      <Activity size={12} color="#334155" style={{ flexShrink: 0 }} />
      {pill("Visible", `${locations.length} / ${_allLocations.length}`)}
      {pill("Avg pollution", avg, "#f59e0b")}
      {worst && pill("Highest risk", worst.name, "#ef4444")}
    </>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────
const Layout = () => {
  const { getStats, loading } = useAppStore();
  const stats = getStats();
  const bp = useBreakpoint();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useLocations();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const compact = isTablet;

  useEffect(() => {
    if (bp === "desktop") setSidebarOpen(false);
  }, [bp]);

  const sidebar = (
    <aside
      style={{
        width: isMobile ? "280px" : isTablet ? "200px" : "256px",
        background: "#111827",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
        scrollbarWidth: "none",
        ...(isMobile
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              zIndex: 2000,
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.25s ease",
              boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.5)" : "none",
            }
          : {}),
      }}
    >
      {/* ── Brand mark ── */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: compact ? "0" : "10px",
          justifyContent: compact ? "center" : "flex-start",
        }}
      >
        <PulseLogo size={32} animate={false} />

        {!compact && (
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.2em",
                color: "#f1f5f9",
                textShadow: "0 0 20px rgba(56,189,248,0.25)",
              }}
            >
              GERD
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "#64748b",
                letterSpacing: "0.08em",
                marginTop: "3px",
                textTransform: "uppercase",
              }}
            >
              Environmental Risk Dashboard
            </div>
          </div>
        )}

        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "#475569",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav style={{ padding: "12px 10px" }}>
        <NavItem
          icon={LayoutDashboard}
          label="Overview"
          to="/"
          compact={compact}
        />
        <NavItem
          icon={MapPin}
          label="Locations"
          to="/locations"
          compact={compact}
        />
        <NavItem
          icon={Activity}
          label="Analytics"
          to="/analytics"
          compact={compact}
        />
        <NavItem
          icon={SlidersHorizontal}
          label="Filters"
          to="/filters"
          compact={compact}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          to="/settings"
          compact={compact}
        />
      </nav>

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.05)",
          margin: "0 14px",
        }}
      />

      {/* ── Stats — skeleton while loading ── */}
      {loading ? (
        <SidebarSkeleton />
      ) : (
        <div style={{ padding: "14px 16px" }}>
          {!compact && (
            <div
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#334155",
                marginBottom: "6px",
              }}
            >
              Quick stats
            </div>
          )}
          <StatChip label="Total" value={stats.total} compact={compact} />
          <StatChip
            label="Critical"
            value={stats.critical}
            color="#ef4444"
            compact={compact}
          />
          <StatChip
            label="High"
            value={stats.high}
            color="#f59e0b"
            compact={compact}
          />
          <StatChip
            label="Moderate"
            value={stats.moderate}
            color="#3b82f6"
            compact={compact}
          />
          <StatChip
            label="Low"
            value={stats.low}
            color="#22c55e"
            compact={compact}
          />
        </div>
      )}

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.05)",
          margin: "0 14px",
        }}
      />

      {/* ── Filters ── */}
      {!compact && (
        <div style={{ padding: "14px 16px", flex: 1 }}>
          <FilterPanel />
        </div>
      )}
    </aside>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#0d1520",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1999,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {sidebar}

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Header */}
        <header
          style={{
            height: "52px",
            background: "#111827",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "#475569",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <Menu size={18} />
            </button>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flex: 1,
            }}
          >
            <span style={{ fontSize: "12px", color: "#334155" }}>
              Dashboard
            </span>
            <ChevronRight size={11} color="#1e293b" />
            <span
              style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}
            >
              Map View
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "20px",
              padding: "3px 10px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                background: "#22c55e",
                borderRadius: "50%",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            <span
              style={{ fontSize: "11px", color: "#22c55e", fontWeight: 500 }}
            >
              Live
            </span>
          </div>

          <button
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#475569",
            }}
          >
            <Bell size={14} strokeWidth={1.8} />
          </button>
        </header>

        {/* Map */}
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <MapView />
        </div>

        {/* Analytics strip */}
        <div
          style={{
            height: "40px",
            background: "#111827",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: "20px",
            flexShrink: 0,
            overflowX: "auto",
          }}
        >
          <AnalyticsStrip />
        </div>
      </main>
    </div>
  );
};

export default Layout;
