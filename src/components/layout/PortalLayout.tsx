import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { DisclaimerBanner } from '../feedback/DisclaimerBanner';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const PortalLayout: React.FC<{ expectedRole: UserRole }> = ({ expectedRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { activeRole } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex">
        {/* Portal-specific Sidebar */}
        <Sidebar
          role={expectedRole}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          <div className="max-w-7xl w-full mx-auto space-y-6">
            <DisclaimerBanner compact />
            <Outlet />
          </div>
          <div className="mt-8">
            <Footer fullWidth />
          </div>
        </main>
      </div>
    </div>
  );
};
