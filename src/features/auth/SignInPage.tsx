import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Eye, 
  EyeOff, 
  UserCheck, 
  Stethoscope, 
  Shield, 
  ArrowLeft, 
  Info, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { DEMO_PATIENT, DEMO_DOCTOR, DEMO_ADMIN } from '../../services/mockData';

export const SignInPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('patient.demo@iasyn.ai');
  const [password, setPassword] = useState('clinical-demo-pass');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setErrors({});
    if (newRole === 'patient') {
      setEmail(DEMO_PATIENT.email);
    } else if (newRole === 'doctor') {
      setEmail(DEMO_DOCTOR.email);
    } else {
      setEmail(DEMO_ADMIN.email);
    }
  };

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid medical email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login({ email, password, role });
      navigate(`/${role}`);
    } catch (err) {
      setErrors({ general: 'Authentication simulation encountered an error. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800">
      {/* Header bar */}
      <header className="px-4 py-4 sm:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900">
              Return to Landing Page
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-600" />
            <span className="font-bold text-slate-900 text-sm">IASYN AI</span>
          </div>
        </div>
      </header>

      {/* Main Form Center */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md space-y-6">
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 mx-auto shadow-sm">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sign In to IASYN AI
            </h1>
            <p className="text-xs text-slate-500">
              Select your role portal to access personalized therapy or clinical supervision
            </p>
          </div>

          {/* Development Notice Callout */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold">Phase 1 Development Shell: </span>
              This interface demonstrates client-side navigation and role routing. Backend JWT/OAuth2 authentication and role authorization will be attached in Phase 2 via FastAPI.
            </div>
          </div>

          <Card variant="elevated" padding="lg">
            {/* Role Switcher Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Select Portal Access Role
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleRoleChange('patient')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs font-medium transition-all ${
                    role === 'patient'
                      ? 'bg-white text-brand-700 shadow-sm border border-slate-200/60 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4 mb-1" />
                  <span>Patient</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('doctor')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs font-medium transition-all ${
                    role === 'doctor'
                      ? 'bg-white text-clinical-700 shadow-sm border border-slate-200/60 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 mb-1" />
                  <span>Doctor</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs font-medium transition-all ${
                    role === 'admin'
                      ? 'bg-white text-amber-700 shadow-sm border border-slate-200/60 font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className="w-4 h-4 mb-1" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Error banner */}
            {errors.general && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="name@clinical.org"
                autoComplete="email"
              />

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                placeholder="••••••••"
                autoComplete="current-password"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant={role === 'doctor' ? 'teal' : 'primary'}
                  className="w-full"
                  size="md"
                  isLoading={isLoading}
                >
                  Access {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                </Button>
              </div>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Demo accounts pre-populated</span>
              <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                Phase 1 Sandbox
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        IASYN AI Multimodal Platform • Phase 1 Evaluation Shell
      </footer>
    </div>
  );
};
