import React, { useState } from 'react';
import { ScrollText, Search, Download, ShieldAlert, Filter, Clock } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_AUDIT_LOGS } from '../../services/mockData';

export const AdminAuditLogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const logs = DEMO_AUDIT_LOGS;

  const filtered = logs.filter(l =>
    l.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Audit Trail</span>
            <Badge variant="warning">HIPAA Compliance Logging</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">System Audit Logs & Access Trail</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable records of all PHI accesses, clinical plan alterations, and system configuration modifications
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
          Export Audit Trail (CSV)
        </Button>
      </div>

      {/* Search Toolbar */}
      <div className="flex items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor, action, or resource..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <Card variant="default" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Actor</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Action Performed</th>
                <th className="py-3 px-4 font-semibold">Resource Affected</th>
                <th className="py-3 px-4 font-semibold">Client IP</th>
                <th className="py-3 px-4 font-semibold">Compliance Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-900">{log.actor}</td>
                  <td className="py-3 px-4 font-sans capitalize">{log.role}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{log.action}</td>
                  <td className="py-3 px-4 text-slate-600 truncate max-w-xs">{log.resource}</td>
                  <td className="py-3 px-4 text-slate-400">{log.ipAddress}</td>
                  <td className="py-3 px-4 font-sans">
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
    </div>
  );
};
