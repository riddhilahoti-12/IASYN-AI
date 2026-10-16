import React from 'react';
import { Database, ShieldCheck, Download, FileSpreadsheet, HardDrive } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_DATASETS } from '../../services/mockData';

export const AdminDatasetRegistryPage: React.FC = () => {
  const datasets = DEMO_DATASETS;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Research Data Lake</span>
            <Badge variant="warning">IRB Anonymized Registries</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Kinematic Dataset Registry</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Anonymized rehabilitation motion cohorts, joint trajectory benchmarks, and patient consent tiers
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
          Export Data Catalog (JSON)
        </Button>
      </div>

      <div className="space-y-4">
        {datasets.map((ds) => (
          <Card key={ds.id} variant="default" className="hover:border-slate-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{ds.name}</h3>
                  <Badge variant="clinical" size="sm">{ds.category}</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  {ds.sampleCount} recorded patient trials • Size: {ds.sizeMB} MB • Format: {ds.format}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Consent Tier: {ds.consentTier}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm">
                  Inspect Schema
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
