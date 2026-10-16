import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Cpu, 
  BrainCircuit, 
  Database, 
  ScrollText, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  ChevronRight,
  Server,
  HardDrive
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_AUDIT_LOGS, DEMO_ESP32_DEVICE, DEMO_VISION_MODELS, DEMO_DATASETS } from '../../services/mockData';

import { apiClient } from '../../services/apiClient';

interface SystemStats {
  total_users: number;
  total_patients: number;
  total_doctors: number;
  total_active_plans: number;
  total_sessions_completed: number;
  total_audit_events: number;
  environment: string;
  version: string;
}

export const AdminDashboard: React.FC = () => {
  const [statsData, setStatsData] = React.useState<SystemStats | null>(null);
  const auditLogs = DEMO_AUDIT_LOGS;

  React.useEffect(() => {
    let isMounted = true;
    apiClient.get<SystemStats>('/admin/stats')
      .then((data) => {
        if (isMounted) setStatsData(data);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const totalUsersStr = statsData ? `${statsData.total_users}` : '142';
  const usersSub = statsData 
    ? `${statsData.total_patients} Patients, ${statsData.total_doctors} Clinicians, 1 Admin`
    : '118 Patients, 21 Clinicians, 3 Admins';

  const adminStats = [
    { label: 'Active Platform Users', value: totalUsersStr, sub: usersSub, icon: Users, color: 'text-brand-700 bg-brand-50' },
    { label: 'Biofeedback Modules', value: '18', sub: 'ESP32 firmware v1.4.2 active', icon: Cpu, color: 'text-sky-700 bg-sky-50' },
    { label: 'Registered AI Models', value: '3', sub: 'MediaPipe BlazePose & OpenCV Kinematics', icon: BrainCircuit, color: 'text-purple-700 bg-purple-50' },
    { label: 'Clinical Audit Events', value: statsData ? `${statsData.total_audit_events}` : '48', sub: 'Immutable HIPAA governance stream', icon: Database, color: 'text-emerald-700 bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Welcome Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              FastAPI Authenticated
            </span>
            <Badge variant="warning">Governance & Compliance</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Platform Infrastructure & Registries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            IASYN AI Multimodal Core • System status: <span className="text-emerald-700 font-semibold">Healthy (FastAPI v2.0.0 Production Core)</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/audit-logs">
            <Button variant="outline" size="sm" icon={<ScrollText className="w-3.5 h-3.5" />}>
              Review Audit Logs
            </Button>
          </Link>
          <Link to="/admin/devices">
            <Button variant="primary" size="sm" icon={<Cpu className="w-3.5 h-3.5" />}>
              Hardware Registry
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} variant="default" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
              <p className="text-[11px] text-slate-500 leading-snug">{stat.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* Grid: System Status & Recent Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Audit Log Stream (2 Cols) */}
        <Card variant="default" className="lg:col-span-2">
          <CardHeader
            title="Recent Administrative & Access Logs"
            subtitle="Immutable HIPAA access trail and role mutations"
            action={
              <Link to="/admin/audit-logs">
                <Button variant="ghost" size="sm" icon={<ChevronRight className="w-4 h-4" />} iconPosition="right">
                  View Full Audit Log
                </Button>
              </Link>
            }
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                  <th className="py-2.5 px-4 font-semibold">Actor & Role</th>
                  <th className="py-2.5 px-4 font-semibold">Action</th>
                  <th className="py-2.5 px-4 font-semibold">Resource Target</th>
                  <th className="py-2.5 px-4 font-semibold">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div>{log.actor}</div>
                      <span className="text-[10px] text-slate-400 capitalize">{log.role}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">{log.action}</td>
                    <td className="py-3 px-4 text-slate-600 truncate max-w-xs">{log.resource}</td>
                    <td className="py-3 px-4">
                      <Badge variant={log.complianceFlag === 'normal' ? 'active' : 'warning'} size="sm">
                        {log.complianceFlag}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Infrastructure & Registry Summary (1 Col) */}
        <div className="space-y-4">
          <Card variant="default">
            <CardHeader
              title="Infrastructure Health"
              subtitle="Planned service runtimes"
            />
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="flex items-center gap-2 text-slate-700">
                  <Server className="w-3.5 h-3.5 text-slate-500" /> Frontend Client (Vite)
                </span>
                <span className="badge-status-active">Online</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="flex items-center gap-2 text-slate-700">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" /> Python FastAPI Backend
                </span>
                <span className="badge-status-pending">Phase 2 Target</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="flex items-center gap-2 text-slate-700">
                  <BrainCircuit className="w-3.5 h-3.5 text-slate-500" /> MediaPipe Pose Engine
                </span>
                <span className="badge-status-clinical">Phase 3 Target</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="flex items-center gap-2 text-slate-700">
                  <Cpu className="w-3.5 h-3.5 text-slate-500" /> ESP32 Serial Daemon
                </span>
                <span className="badge-status-neutral">Phase 4 Target</span>
              </div>
            </div>
          </Card>

          {/* Device & Model Quick Links */}
          <Card variant="default">
            <CardHeader
              title="Registry Quick Links"
              subtitle="Admin catalogues"
            />
            <div className="space-y-2 text-xs">
              <Link to="/admin/models" className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium">
                <span>AI Model Registry ({DEMO_VISION_MODELS.length} registered)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link to="/admin/datasets" className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium">
                <span>Validation Datasets ({DEMO_DATASETS.length} active)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link to="/admin/devices" className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium">
                <span>ESP32 Device Fleet</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
