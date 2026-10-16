import React, { useState } from 'react';
import { Users, Search, Shield, UserCheck, Stethoscope, UserPlus } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_PATIENT, DEMO_DOCTOR, DEMO_ADMIN } from '../../services/mockData';

const ALL_DEMO_USERS = [
  { ...DEMO_PATIENT, status: 'active', department: 'Outpatient Physical Therapy' },
  { ...DEMO_DOCTOR, status: 'verified', department: 'Orthopedic Rehabilitation' },
  { ...DEMO_ADMIN, status: 'active', department: 'Clinical Health IT' },
  { id: 'usr_pat_7712', name: 'Robert Martinez', email: 'robert.m@example.org', role: 'patient', status: 'pending_intake', createdDate: '2024-10-14' },
  { id: 'usr_doc_4401', name: 'Dr. Priya Sharma, PT, DPT', email: 'dr.sharma@iasyn.ai', role: 'doctor', status: 'pending_verification', createdDate: '2024-10-12' },
];

export const AdminUserManagementPage: React.FC = () => {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_DEMO_USERS.filter((u) => {
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Directory Service</span>
            <Badge variant="warning">Access Management</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">User Management & Permissions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage patient, clinician, and administrative accounts, role assignments, and authentication states
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<UserPlus className="w-3.5 h-3.5" />}>
          Invite User (Phase 2 Auth)
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-subtle">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Filter:</span>
          {['all', 'patient', 'doctor', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-2.5 py-1 text-xs rounded-md capitalize font-medium transition-colors ${
                filterRole === r
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card variant="default" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">User Details</th>
                <th className="py-3 px-4 font-semibold">System Role</th>
                <th className="py-3 px-4 font-semibold">Department / Group</th>
                <th className="py-3 px-4 font-semibold">Account Status</th>
                <th className="py-3 px-4 font-semibold">Created Date</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div>{user.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{user.email}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={user.role === 'doctor' ? 'clinical' : user.role === 'admin' ? 'warning' : 'active'} size="sm">
                      {user.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{user.department || 'General Patient'}</td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize font-medium text-slate-700">{user.status}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{user.createdDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Edit Permissions
                    </Button>
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
