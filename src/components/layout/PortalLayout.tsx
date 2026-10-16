import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { DisclaimerBanner } from '../feedback/DisclaimerBanner';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Activity, ShieldAlert } from 'lucide-react';

export const PortalLayout: React.FC<{ expectedRole: UserRole }> = ({ expectedRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  // 1. Loading state during session restoration
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 animate-pulse">
            <Activity className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Authenticating Clinical Session</h3>
            <p className="text-xs text-slate-500 mt-1">
              Verifying cryptographic credentials and clinical permissions with IASYN backend...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated check
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 3. Role authorization check: redirect to authorized portal if trying to access unauthorized portal
  if (currentUser.role !== expectedRole) {
    return <Navigate to={`/${currentUser.role}`} replace />;
  }

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
