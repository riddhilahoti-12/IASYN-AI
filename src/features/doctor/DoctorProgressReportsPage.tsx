import React from 'react';
import { TrendingUp, Users, Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const DEMO_COHORT_DATA = [
  { group: 'Rotator Cuff (N=10)', avgAdherence: 94, avgGainDegrees: 28 },
  { group: 'Patellofemoral (N=6)', avgAdherence: 88, avgGainDegrees: 22 },
  { group: 'Cervical Spine (N=5)', avgAdherence: 82, avgGainDegrees: 18 },
  { group: 'Hand/Wrist Glides (N=3)', avgAdherence: 96, avgGainDegrees: 34 },
];

export const DoctorProgressReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Cohort Analytics</span>
            <Badge variant="clinical">Clinician Outcome Metrics</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Cohort Progress & Clinical Outcomes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregated recovery trajectories, compliance distributions, and functional improvement across assigned patients
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
          Export Cohort Report (CSV)
        </Button>
      </div>

      <Card variant="default">
        <CardHeader
          title="Protocol Cohort Comparison: Adherence vs. Mobility Gain"
          subtitle="Observable kinematic gain across diagnostic categories"
        />

        <div className="h-72 w-full p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DEMO_COHORT_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="group" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="avgAdherence" name="Average Protocol Adherence (%)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgGainDegrees" name="Average ROM Gain (°)" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
