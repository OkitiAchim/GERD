const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-base">
      {/* Sidebar */}
      <aside className="w-72 bg-base border-r border-panel flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-sm font-semibold text-gray-800">
            Environmental Risk Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Geospatial Analysis</p>
        </div>
        <div className="flex-1 p-4 text-xs text-gray-400">
          Filter panel — Day 4
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 bg-base border-b border-gray-200 flex items-center px-5 shrink-0">
          <span className="text-xs text-gray-400">Analytics panel — Day 5</span>
        </header>

        {/* Map area */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <span className="text-sm text-gray-400">Map goes here — Day 3</span>
        </div>
      </main>
    </div>
  );
};

export default Layout;
