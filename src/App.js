import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ThemeSwitcher from './components/ThemeSwitcher';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import KanbanBoard from './pages/KanbanBoard';
import Tables from './pages/Tables';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <ThemeSwitcher>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        <main style={{ marginTop: '64px' }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/kanban" element={<KanbanBoard />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </ThemeSwitcher>
    </Router>
  );
}

export default App;
