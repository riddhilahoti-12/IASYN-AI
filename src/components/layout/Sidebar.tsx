import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  ClipboardList,
  CalendarCheck,
  Video,
  History,
  TrendingUp,
  MessageSquareHeart,
  Users,
  FileCheck2,
  FolderKanban,
  FileSearch,
  Clock,
  ShieldCheck,
  BookOpen,
  Cpu,
  BrainCircuit,
  Database,
  ScrollText,
  Settings,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../../types';

interface SidebarProps {
  role: UserRole;
  isOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onCloseMobile }) => {
  const location = useLocation();

  const patientNav: NavItem[] = [
    { label: 'Dashboard', to: '/patient', icon: LayoutDashboard },
    { label: 'My Profile', to: '/patient/profile', icon: User },
    { label: 'Health Intake', to: '/patient/intake', icon: ClipboardList },
    { label: 'My Therapy Plan', to: '/patient/therapy-plan', icon: CalendarCheck },
    { label: 'Therapy Studio', to: '/patient/therapy-studio', icon: Video, badge: 'Guided' },
    { label: 'Session History', to: '/patient/history', icon: History },
    { label: 'Progress Reports', to: '/patient/reports', icon: TrendingUp },
    { label: 'IASYN AI Assistant', to: '/patient/assistant', icon: MessageSquareHeart },
  ];

  const doctorNav: NavItem[] = [
    { label: 'Dashboard', to: '/doctor', icon: LayoutDashboard },
    { label: 'Patient List', to: '/doctor/patients', icon: Users },
    { label: 'Intake Review', to: '/doctor/intakes', icon: FileCheck2, badge: '2 New' },
    { label: 'Therapy Plan Mgmt', to: '/doctor/plans', icon: FolderKanban },
    { label: 'Session Analysis', to: '/doctor/sessions', icon: FileSearch },
    { label: 'Progress Reports', to: '/doctor/reports', icon: TrendingUp },
    { label: 'Follow-up Queue', to: '/doctor/queue', icon: Clock, badge: '3 Pending' },
  ];

  const adminNav: NavItem[] = [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { label: 'User Management', to: '/admin/users', icon: Users },
    { label: 'Doctor Verification', to: '/admin/verification', icon: ShieldCheck },
    { label: 'Therapy Catalogue', to: '/admin/catalogue', icon: BookOpen },
    { label: 'Device Management', to: '/admin/devices', icon: Cpu },
    { label: 'AI Model Registry', to: '/admin/models', icon: BrainCircuit },
    { label: 'Dataset Registry', to: '/admin/datasets', icon: Database },
    { label: 'Audit Logs', to: '/admin/audit-logs', icon: ScrollText },
    { label: 'System Settings', to: '/admin/settings', icon: Settings },
  ];

  const currentNav = role === 'patient' ? patientNav : role === 'doctor' ? doctorNav : adminNav;

  const getPortalTitle = () => {
    switch (role) {
      case 'patient':
        return 'Patient Recovery';
      case 'doctor':
        return 'Clinician Supervision';
      case 'admin':
        return 'System Administration';
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Section Header */}
          <div className="px-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {getPortalTitle()}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? role === 'doctor'
                        ? 'bg-clinical-50 text-clinical-800 font-semibold border-l-4 border-clinical-600 pl-2'
                        : role === 'admin'
                        ? 'bg-amber-50 text-amber-800 font-semibold border-l-4 border-amber-600 pl-2'
                        : 'bg-brand-50 text-brand-800 font-semibold border-l-4 border-brand-600 pl-2'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? role === 'doctor'
                            ? 'text-clinical-600'
                            : role === 'admin'
                            ? 'text-amber-600'
                            : 'text-brand-600'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        isActive
                          ? 'bg-white text-slate-700 shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 text-slate-400 transition-opacity" />
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60 m-2 rounded-lg text-[11px] text-slate-500">
          <div className="flex items-center justify-between font-medium text-slate-700 mb-1">
            <span>IASYN Core</span>
            <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-1 rounded">v0.1.0</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Phase 1 Foundation & UI System
          </p>
        </div>
      </aside>
    </>
  );
};
