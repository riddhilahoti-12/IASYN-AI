import React, { useState } from 'react';
import { Users, Search, Filter, ChevronRight, UserPlus, FileText } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';

const DEMO_PATIENTS_LIST = [
  {
    id: 'usr_pat_8941',
    name: 'Eleanor Vance',
    mrn: 'MED-PT-2024-889',
    diagnosis: 'Rotator Cuff & Subacromial Decompression',
    protocol: 'Phase 2: Scapular Stabilization',
    adherence: 98,
    lastActive: 'Today, 09:30 AM',
    riskLevel: 'low',
    status: 'active'
  },
  {
    id: 'usr_pat_7712',
    name: 'Robert Martinez',
    mrn: 'MED-PT-2024-912',
    diagnosis: 'Cervical Radiculopathy & Lumbar Sprain',
    protocol: 'Intake Evaluation Protocol',
    adherence: 0,
    lastActive: 'Yesterday',
    riskLevel: 'high',
    status: 'pending_intake'
  },
  {
    id: 'usr_pat_5509',
    name: 'Anita Desai',
    mrn: 'MED-PT-2024-744',
    diagnosis: 'Patellofemoral Pain Syndrome (Right Knee)',
    protocol: 'Closed Kinetic Chain Quadriceps Strengthening',
    adherence: 74,
    lastActive: '2 days ago',
    riskLevel: 'medium',
    status: 'active'
  },
  {
    id: 'usr_pat_4110',
    name: 'David Kim',
    mrn: 'MED-PT-2024-630',
    diagnosis: 'Carpal Tunnel Release & Flexor Tendon Rehab',
    protocol: 'Digital Palmar Tendon Gliding',
    adherence: 92,
    lastActive: '3 days ago',
    riskLevel: 'low',
    status: 'active'
  }
];

export const DoctorPatientListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = DEMO_PATIENTS_LIST.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Supervised Cohort</span>
            <Badge variant="clinical">{DEMO_PATIENTS_LIST.length} Patients Active</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Patient Roster & Case Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervise rehabilitation protocols, adherence metrics, and clinical escalation thresholds
          </p>
        </div>

        <Link to="/doctor/plans">
          <Button variant="teal" size="sm" icon={<UserPlus className="w-4 h-4" />}>
            Assign New Protocol
          </Button>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, MRN, or diagnosis..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-clinical-500 focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-400">
          Displaying {filtered.length} of {DEMO_PATIENTS_LIST.length} cohort cases
        </div>
      </div>

      {/* Patient Table */}
      <Card variant="default" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Patient Name & MRN</th>
                <th className="py-3 px-4 font-semibold">Clinical Diagnosis</th>
                <th className="py-3 px-4 font-semibold">Current Protocol</th>
                <th className="py-3 px-4 font-semibold">Adherence</th>
                <th className="py-3 px-4 font-semibold">Risk Stratification</th>
                <th className="py-3 px-4 font-semibold">Last Active</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pt) => (
                <tr key={pt.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div>{pt.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{pt.mrn}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{pt.diagnosis}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{pt.protocol}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <span>{pt.adherence}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={pt.riskLevel === 'high' ? 'danger' : pt.riskLevel === 'medium' ? 'warning' : 'active'} size="sm">
                      {pt.riskLevel.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{pt.lastActive}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link to="/doctor/sessions">
                      <Button variant="outline" size="sm">
                        View Care Plan
                      </Button>
                    </Link>
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
