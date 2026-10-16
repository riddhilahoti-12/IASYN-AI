import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  User, 
  LogOut, 
  ChevronDown, 
  Shield, 
  Stethoscope, 
  UserCheck, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Badge } from '../ui/Badge';

export const Header: React.FC<{ onToggleSidebar?: () => void; isSidebarOpen?: boolean }> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const { currentUser, activeRole, login, logout } = useAuth();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = async (newRole: UserRole) => {
    setIsRoleMenuOpen(false);
    try {
      const creds = authService.getDemoCredentials(newRole);
      const user = await login(creds);
      navigate(`/${user.role}`);
    } catch (err) {
      navigate('/signin');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return 'clinical';
      case 'admin':
        return 'warning';
      default:
        return 'active';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-subtle">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-teal-800 flex items-center justify-center text-white shadow-sm group-hover:shadow transition-shadow">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-slate-900">IASYN</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
                  Multimodal Therapy
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Phase 1 Dev Portal Switcher Bar */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => handleRoleSwitch('patient')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeRole === 'patient'
                  ? 'bg-white text-brand-700 shadow-sm border border-slate-200/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Patient Portal
            </button>
            <button
              onClick={() => handleRoleSwitch('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeRole === 'doctor'
                  ? 'bg-white text-clinical-700 shadow-sm border border-slate-200/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Portal
            </button>
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeRole === 'admin'
                  ? 'bg-white text-amber-700 shadow-sm border border-slate-200/60 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>

          {/* Right: User Profile & Public Site Link */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-2.5 rounded-md hover:bg-slate-50"
              title="Visit Public Landing Page"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Profile Dropdown / Card */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors"
                aria-haspopup="true"
                aria-expanded={isRoleMenuOpen}
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-semibold">
                  {currentUser?.name.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 truncate max-w-[130px]">
                    {currentUser?.name || 'User'}
                  </span>
                  <span className="text-[10px] text-slate-500 capitalize">
                    {activeRole} view
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-elevated border border-slate-200 py-2 z-50 text-slate-700">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                    <div className="mt-1.5">
                      <Badge variant={getRoleBadgeVariant(activeRole)} size="sm">
                        {activeRole.toUpperCase()} ROLE
                      </Badge>
                    </div>
                  </div>

                  {/* Switch Portal Section */}
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
                      Switch Portal (Phase 1 Demo)
                    </p>
                    <button
                      onClick={() => handleRoleSwitch('patient')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-md ${
                        activeRole === 'patient' ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-brand-600" /> Patient View
                      </span>
                      {activeRole === 'patient' && <span className="text-[10px]">● Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('doctor')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-md ${
                        activeRole === 'doctor' ? 'bg-clinical-50 text-clinical-700 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Stethoscope className="w-3.5 h-3.5 text-clinical-600" /> Doctor View
                      </span>
                      {activeRole === 'doctor' && <span className="text-[10px]">● Active</span>}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('admin')}
                      className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded-md ${
                        activeRole === 'admin' ? 'bg-amber-50 text-amber-700 font-medium' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-amber-600" /> Admin View
                      </span>
                      {activeRole === 'admin' && <span className="text-[10px]">● Active</span>}
                    </button>
                  </div>

                  <div className="p-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-md font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
