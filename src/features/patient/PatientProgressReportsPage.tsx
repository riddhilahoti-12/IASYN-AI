import React from 'react';
import { TrendingUp, FileText, Download, Activity, Calendar } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const DEMO_LONGITUDINAL_DATA = [
  { week: 'Week 1', adherence: 80, activeROM: 95, targetROM: 140 },
  { week: 'Week 2', adherence: 85, activeROM: 104, targetROM: 140 },
  { week: 'Week 3', adherence: 90, activeROM: 112, targetROM: 140 },
  { week: 'Week 4', adherence: 95, activeROM: 118, targetROM: 140 },
  { week: 'Week 5', adherence: 100, activeROM: 124, targetROM: 140 },
  { week: 'Week 6 (Current)', adherence: 100, activeROM: 128, targetROM: 140 },
];

export const PatientProgressReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Longitudinal Demo Metrics</span>
            <Badge variant="clinical">Recovery Assessment</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Progress Reports & Kinematic Recovery</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Weekly trajectory for shoulder active flexion degrees compared to clinical recovery benchmarks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export Clinical Summary (PDF Placeholder)
          </Button>
        </div>
      </div>

      {/* Main Longitudinal Chart */}
      <Card variant="default">
        <CardHeader
          title="Observable Range of Motion Trajectory (Degrees)"
          subtitle="Weeks 1-6 Post-Decompression Rehab Evolution"
        />

        <div className="h-72 w-full p-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DEMO_LONGITUDINAL_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="romGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[80, 160]} stroke="#0d9488" fontSize={11} label={{ value: 'Degrees (°)', angle: -90, position: 'insideLeft', fill: '#0d9488', fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="activeROM"
                name="Observed Active Flexion (°)"
                stroke="#0d9488"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#romGradient)"
              />
              <Area
                type="monotone"
                dataKey="targetROM"
                name="Clinical Milestone Target (°)"
                stroke="#64748b"
                strokeDasharray="4 4"
                fillOpacity={0}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Clinician Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Weekly Adherence</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">98.5%</div>
          <p className="text-xs text-emerald-700 font-medium">Consistent routine completion</p>
        </Card>
        <Card variant="default">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">ROM Improvement</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">+33°</div>
          <p className="text-xs text-brand-700 font-medium">95° baseline to 128° week 6</p>
        </Card>
        <Card variant="default">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">VAS Pain Reduction</p>
          <div className="text-2xl font-bold text-slate-900 mb-1">-4 Points</div>
          <p className="text-xs text-slate-500">From 6/10 at intake to 2/10 current</p>
        </Card>
      </div>
    </div>
  );
};
