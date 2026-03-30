import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import LocationDetail from "./pages/LocationDetail";
import NotFound from "./pages/NotFound";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Location detail */}
        <Route path="/location/:id" element={<LocationDetail />} />

        {/* Stub routes — nav items that will get their own pages later */}
        <Route path="/locations" element={<Dashboard />} />
        <Route path="/analytics" element={<Dashboard />} />
        <Route path="/filters" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
