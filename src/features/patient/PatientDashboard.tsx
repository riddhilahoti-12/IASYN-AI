import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle, 
  TrendingUp, 
  Sparkles,
  Activity,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { DEMO_THERAPY_PLAN, DEMO_SESSIONS } from '../../services/mockData';

// Chart Demo Data (Labeled as demo)
const DEMO_PROGRESS_DATA = [
  { day: 'Oct 01', romFlexion: 95, painVAS: 6 },
  { day: 'Oct 05', romFlexion: 104, painVAS: 5 },
  { day: 'Oct 08', romFlexion: 112, painVAS: 4 },
  { day: 'Oct 11', romFlexion: 118, painVAS: 4 },
  { day: 'Oct 13', romFlexion: 124, painVAS: 3 },
  { day: 'Oct 15', romFlexion: 128, painVAS: 2 },
];

export const PatientDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const plan = DEMO_THERAPY_PLAN;
  const recentSessions = DEMO_SESSIONS;

  return (
    <div className="space-y-6">
      {/* Welcome Header & Action Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="badge-demo">Demo Dataset Active</span>
            <span className="text-xs text-slate-500 font-mono">Patient ID: {currentUser?.medicalId || 'PT-8941'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {currentUser?.name || 'Eleanor'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Your rehabilitation plan is currently in <strong className="text-slate-800">{plan.phase}</strong> under the supervision of <strong>{plan.prescribedByDoctorName}</strong>.
          </p>
        </div>

        {/* Start Approved Session Quick Action */}
        <div className="flex-shrink-0">
          <Link to="/patient/therapy-studio">
            <Button
              variant="primary"
              size="lg"
              icon={<Play className="w-5 h-5 fill-current" />}
              className="shadow-sm w-full md:w-auto"
            >
              Start Approved Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid: Current Plan Status & Next Scheduled Session */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Clinician-Approved Therapy Plan Card (2 Cols) */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader
            title="Clinician-Approved Therapy Plan"
            subtitle="Prescribed by Dr. Marcus Reynolds • Updated Oct 01, 2024"
            action={
              <Link to="/patient/therapy-plan">
                <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                  View Full Protocol
                </Button>
              </Link>
            }
          />

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-900">{plan.title}</h4>
                <Badge variant="active" size="sm">
                  Active Clinical Protocol
                </Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Diagnosis: </strong>{plan.diagnosis}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                <strong>Target Frequency: </strong>{plan.targetFrequency}
              </p>
            </div>

            {/* Prescribed Exercises Snapshot */}
            <div>
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                Prescribed Exercises Today ({plan.exercises.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plan.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="p-3 bg-white border border-slate-200 rounded-lg flex items-start gap-2.5 hover:border-slate-300 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{ex.name}</p>
                      <p className="text-[11px] text-slate-500">{ex.repsOrDuration} • {ex.sets} Sets</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Note Callout */}
            <div className="p-3 bg-brand-50/60 border border-brand-200/70 rounded-lg text-xs text-brand-900 flex items-start gap-2">
              <HeartPulse className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-950">Clinician Note: </span>
                {plan.clinicalNotes}
              </div>
            </div>
          </div>
        </Card>

        {/* Next Scheduled Session Placeholder Card (1 Col) */}
        <Card variant="default">
          <CardHeader
            title="Next Session"
            subtitle="Follow prescribed routine"
          />

          <div className="space-y-4">
            <div className="p-4 bg-clinical-50/50 border border-clinical-200 rounded-xl">
              <div className="flex items-center gap-2 text-clinical-800 text-xs font-semibold mb-1">
                <Calendar className="w-4 h-4" />
                <span>Today's Afternoon Routine</span>
              </div>
              <p className="text-base font-bold text-slate-900 mt-1">Guided Movement & ROM</p>
              <p className="text-xs text-slate-500 mt-0.5">Est. Duration: ~20-25 mins</p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Supervising Physio</span>
                <span className="font-medium text-slate-800">Dr. M. Reynolds</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Pose Camera Check</span>
                <span className="text-emerald-700 font-medium">Ready</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Biofeedback Module</span>
                <span className="text-slate-500">ESP32 (Optional)</span>
              </div>
            </div>

            <Link to="/patient/therapy-studio" className="block w-full">
              <Button variant="primary" className="w-full" size="md">
                Launch Therapy Studio
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Progress Overview Section (Charts ready for future integration) */}
      <Card variant="default">
        <CardHeader
          title="Recovery Progress Overview"
          subtitle="Observable Shoulder Active Flexion (Degrees) vs. Patient Pain VAS (0-10 Scale)"
          action={
            <div className="flex items-center gap-2">
              <span className="badge-demo">Sample Cohort Telemetry</span>
              <Link to="/patient/reports">
                <Button variant="ghost" size="sm">
                  View Detailed Analytics
                </Button>
              </Link>
            </div>
          }
        />

        <div className="p-2">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DEMO_PROGRESS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis yAxisId="left" stroke="#0d9488" fontSize={11} domain={[80, 160]} label={{ value: 'ROM (°)', angle: -90, position: 'insideLeft', fill: '#0d9488', fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={11} domain={[0, 10]} label={{ value: 'VAS Pain', angle: 90, position: 'insideRight', fill: '#f43f5e', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="romFlexion"
                  name="Active Flexion ROM (°)"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#0d9488' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="painVAS"
                  name="Pain Score (VAS 0-10)"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3, fill: '#f43f5e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            *Demonstration recovery trajectory. Live joint kinematics will be calculated in Phase 3 by the OpenCV/MediaPipe pipeline.
          </p>
        </div>
      </Card>

      {/* Recent Therapy Sessions Table */}
      <Card variant="default">
        <CardHeader
          title="Recent Recorded Sessions"
          subtitle="Historical logs verified by clinician"
          action={
            <Link to="/patient/history">
              <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                View All History
              </Button>
            </Link>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Date & Time</th>
                <th className="py-2.5 px-4 font-semibold">Protocol Focus</th>
                <th className="py-2.5 px-4 font-semibold">Duration</th>
                <th className="py-2.5 px-4 font-semibold">Exercises</th>
                <th className="py-2.5 px-4 font-semibold">Pain (VAS)</th>
                <th className="py-2.5 px-4 font-semibold">Clinician Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentSessions.map((ses) => (
                <tr key={ses.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {new Date(ses.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-4 text-slate-700">{ses.planTitle}</td>
                  <td className="py-3 px-4">{ses.durationMinutes} mins</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{ses.exercisesCompleted}</span> / {ses.totalExercises} ({ses.adherencePercentage}%)
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{ses.patientReportedPainLevel}/10</span>
                  </td>
                  <td className="py-3 px-4">
                    {ses.doctorReviewed ? (
                      <Badge variant="active" size="sm">
                        Verified by Dr. Reynolds
                      </Badge>
                    ) : (
                      <Badge variant="pending" size="sm">
                        Pending Clinician Sign-off
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
