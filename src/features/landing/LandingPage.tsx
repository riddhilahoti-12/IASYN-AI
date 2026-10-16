import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  UserCheck, 
  Shield, 
  Eye, 
  Cpu, 
  BrainCircuit, 
  Sparkles,
  FileText,
  Clock,
  HeartPulse
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DisclaimerBanner } from '../../components/feedback/DisclaimerBanner';
import { Footer } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handlePortalQuickAccess = (role: UserRole) => {
    switchRole(role);
    navigate(`/${role}`);
  };

  const capabilities = [
    {
      title: 'Physiotherapy & Movement Rehabilitation',
      desc: 'Targeted kinematic exercise protocols for rotator cuff, knee, lumbar, and cervical spine recovery.',
      badge: 'Clinician Directed',
      icon: HeartPulse,
    },
    {
      title: 'Hand & Upper-Limb Rehabilitation',
      desc: 'Fine motor articulation, tendon gliding tracking, and digital palmar range-of-motion assessment.',
      badge: '21-Point Landmark Tracking',
      icon: Eye,
    },
    {
      title: 'Pressure-Point & Acupressure Tracking',
      desc: 'Structured duration and pressure point logging mapped against anatomical meridians and pain scores.',
      badge: 'Manual Therapy Log',
      icon: Activity,
    },
    {
      title: 'Massage & Soft-Tissue Logging',
      desc: 'Session recording for myofascial release, trigger point therapy, and guided self-massage routines.',
      badge: 'Symptom Trajectory',
      icon: Sparkles,
    },
    {
      title: 'Chronic Pain & Mobility Support',
      desc: 'Graded exposure pacing, VAS pain tracking, and posture-load monitoring to prevent symptom flares.',
      badge: 'Pain VAS Scale',
      icon: Clock,
    },
    {
      title: 'Clinician-Supervised Supervision',
      desc: 'Remote oversight portal allowing physical therapists and physiatrists to review telemetry and adjust dosages.',
      badge: 'Doctor Portal',
      icon: Stethoscope,
    },
    {
      title: 'Live Camera-Based Movement Analysis',
      desc: 'Computer-vision kinematic joint angle and repetition tracking using MediaPipe and OpenCV.',
      badge: 'Phase 3 Pipeline',
      icon: BrainCircuit,
    },
    {
      title: 'Explainable AI Session Summaries',
      desc: 'Transparent, cited clinical explanations of movement trends without opaque black-box assertions.',
      badge: 'Cited References',
      icon: FileText,
    },
    {
      title: 'ESP32 Biofeedback Hardware',
      desc: 'USB serial integration with wearable or desk modules providing LCD cues, color LEDs, and pacing chimes.',
      badge: 'Phase 4 Sensor Ready',
      icon: Cpu,
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Clinical Assessment & Prescription',
      description: 'Supervising clinician conducts patient intake, screens contraindications, and defines a personalized rehabilitation plan with precise ROM thresholds and frequencies.',
    },
    {
      step: '02',
      title: 'Multimodal Guided Therapy',
      description: 'The patient engages in guided sessions with real-time audio-visual cues, step-by-step instructions, and sensor pacing to ensure proper technique.',
    },
    {
      step: '03',
      title: 'Kinematic & Biofeedback Analysis',
      description: 'Computer vision and ESP32 biofeedback observe joint angles, adherence, and symmetry while patient logs immediate post-session VAS comfort scores.',
    },
    {
      step: '04',
      title: 'Longitudinal Clinical Reporting',
      description: 'Objective telemetry and pain trajectories are aggregated into structured clinician dashboards for protocol progression or timely intervention.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-teal-800 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">IASYN</span>
              <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handlePortalQuickAccess('patient')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Explore Portals
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-white via-slate-50/70 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Phase 1 Architecture & Design System Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Personalized Physiotherapy, Guided Monitoring & Recovery Analysis
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              An AI-driven multimodal platform that connects patients with clinician-approved rehabilitation protocols, guided movement monitoring, explainable clinical progress insights, and hardware biofeedback.
            </p>

            {/* Quick Access Entry Points by Role */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => handlePortalQuickAccess('patient')}
                icon={<UserCheck className="w-4 h-4" />}
              >
                Patient Portal
              </Button>
              <Button
                variant="teal"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => handlePortalQuickAccess('doctor')}
                icon={<Stethoscope className="w-4 h-4" />}
              >
                Doctor Portal
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => handlePortalQuickAccess('admin')}
                icon={<Shield className="w-4 h-4" />}
              >
                Admin Portal
              </Button>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-4">
              <span>✓ Clinician Supervised</span>
              <span>•</span>
              <span>✓ Objective Kinematics</span>
              <span>•</span>
              <span>✓ SaMD Compliance Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Safety Disclaimer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DisclaimerBanner />
      </section>

      {/* Key Platform Capabilities Section */}
      <section className="py-12 lg:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-brand-700 tracking-widest uppercase">
              Multimodal Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              End-to-End Rehabilitation Modalities
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Designed to support physical therapists, physiatrists, and patients across comprehensive recovery journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <Card key={i} variant="default" className="hover:border-brand-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="clinical" size="sm">
                      {cap.badge}
                    </Badge>
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-1.5">{cap.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How the Platform Works Section */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-brand-700 tracking-widest uppercase">
              Clinical Workflow
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              How IASYN AI Operates
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Bridging in-clinic medical prescription with accurate home and remote therapy guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((ws, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle relative">
                <div className="font-mono text-2xl font-black text-brand-600/30 mb-2">
                  {ws.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{ws.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ws.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Portals Preview Cards */}
      <section className="py-12 lg:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold text-brand-700 tracking-widest uppercase">
              Application Portals
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Dedicated Roles & Interfaces
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Three segregated portal experiences tailored for patient adherence, clinician supervision, and platform governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Portal Card */}
            <Card variant="default" className="flex flex-col justify-between hover:shadow-card transition-all border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <Badge variant="active">Patient Portal</Badge>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Patient Recovery Journey</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Follow prescribed exercises, record session adherence, access the IASYN AI companion for exercise instructions, and view recovery trajectories.
                </p>
                <div className="space-y-1.5 text-xs text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>Active therapy plan & dosage view</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>Guided therapy studio launcher</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    <span>Explainable AI therapy assistant</span>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => handlePortalQuickAccess('patient')}
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Open Patient Shell
              </Button>
            </Card>

            {/* Doctor Portal Card */}
            <Card variant="default" className="flex flex-col justify-between hover:shadow-card transition-all border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <Badge variant="clinical">Doctor Portal</Badge>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Clinician Supervision</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Review patient intakes, prescribe targeted protocols, inspect session telemetry and joint angles, and manage follow-up triage.
                </p>
                <div className="space-y-1.5 text-xs text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-clinical-600" />
                    <span>Patient roster & risk status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-clinical-600" />
                    <span>Protocol & dosage prescription builder</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-clinical-600" />
                    <span>Clinical review and follow-up queue</span>
                  </div>
                </div>
              </div>
              <Button
                variant="teal"
                onClick={() => handlePortalQuickAccess('doctor')}
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Open Doctor Shell
              </Button>
            </Card>

            {/* Admin Portal Card */}
            <Card variant="default" className="flex flex-col justify-between hover:shadow-card transition-all border-slate-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <Badge variant="warning">Admin Portal</Badge>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Platform Administration</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Manage user credentials, verify clinical licenses, monitor ESP32 hardware devices, audit AI models, and review access logs.
                </p>
                <div className="space-y-1.5 text-xs text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>AI Model & dataset registry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>ESP32 biofeedback device status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>HIPAA compliant audit trails</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => handlePortalQuickAccess('admin')}
                className="w-full"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Open Admin Shell
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
