import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FileCheck2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Stethoscope, 
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { DEMO_DOCTOR_QUEUE, DEMO_PATIENT, DEMO_SESSIONS } from '../../services/mockData';

export const DoctorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const queue = DEMO_DOCTOR_QUEUE;

  const stats = [
    { label: 'Assigned Active Patients', value: '24', icon: Users, change: '+2 this month', color: 'text-clinical-700 bg-clinical-50' },
    { label: 'Intakes Awaiting Review', value: '2', icon: FileCheck2, change: '1 high priority', color: 'text-amber-700 bg-amber-50' },
    { label: 'Sessions Requiring Review', value: '5', icon: Activity, change: '3 today', color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Follow-up Triage Queue', value: '3', icon: Clock, change: '1 scheduled today', color: 'text-purple-700 bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Clinician Welcome Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-demo">Clinician Dashboard</span>
            <Badge variant="clinical">Supervisory Access</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {currentUser?.name || 'Dr. Marcus Reynolds, MD'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Orthopedic Rehabilitation & Sports Medicine • License: PT-MD-99421-US
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/doctor/plans">
            <Button variant="teal" size="md">
              Create Therapy Prescription
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} variant="default" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mb-1">{s.value}</div>
              <p className="text-[11px] text-slate-500">{s.change}</p>
            </Card>
          );
        })}
      </div>

      {/* Grid: Follow-up Queue & Recent Patient Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Clinician Review & Triage Queue (2 Cols) */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader
            title="Clinician Action & Review Queue"
            subtitle="Prioritized list of intakes, protocol renewals, and reported pain anomalies"
            action={
              <Link to="/doctor/queue">
                <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                  View All ({queue.length})
                </Button>
              </Link>
            }
          />

          <div className="space-y-3">
            {queue.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.patientName}</span>
                    <Badge variant={item.urgency === 'high' ? 'danger' : item.urgency === 'medium' ? 'warning' : 'neutral'} size="sm">
                      {item.urgency.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-[11px] text-slate-400 font-mono">Flagged {item.dateFlagged}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link to={`/doctor/${item.type === 'intake' ? 'intakes' : item.type === 'plan_renewal' ? 'plans' : 'sessions'}`}>
                    <Button variant="outline" size="sm">
                      Inspect
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Patient Activity Summary (1 Col) */}
        <Card variant="default">
          <CardHeader
            title="Recent Telemetry Feed"
            subtitle="Live session logs from cohort"
          />

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{DEMO_PATIENT.name}</span>
                <span className="text-[10px] text-slate-400">Oct 15, 09:30</span>
              </div>
              <p className="text-slate-600">Completed 4/4 exercises. Average active shoulder flexion: 128° (VAS: 2/10).</p>
              <Badge variant="active" size="sm">Verified</Badge>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Robert Martinez</span>
                <span className="text-[10px] text-slate-400">Oct 14, 15:20</span>
              </div>
              <p className="text-slate-600">New digital intake submitted with cervical MRI summary.</p>
              <Badge variant="pending" size="sm">Needs Review</Badge>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Anita Desai</span>
                <span className="text-[10px] text-slate-400">Oct 14, 11:10</span>
              </div>
              <p className="text-slate-600">Session adherence 75%. Patient reported elevated pain (6/10).</p>
              <Badge variant="warning" size="sm">Pain Flag</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
