import React from 'react';
import { Settings, Server, Database, Shield, Sliders, Save, Cpu } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const AdminSystemSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">System Configuration</span>
            <Badge variant="warning">Environment Settings</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Platform Settings & Service Endpoints</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure target backend API URLs, SQLite/PostgreSQL connectors, and telemetry retention intervals
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>
          Save Settings (Local)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend & Database Endpoints */}
        <Card variant="default">
          <CardHeader
            title="Service Endpoints & Database Architecture"
            subtitle="Configured for Phase 2 FastAPI integration"
          />
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                FastAPI Backend URL
              </label>
              <input
                type="text"
                readOnly
                value="http://127.0.0.1:8000/api/v1 (Phase 2 Target)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-xs text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                Database Dialect & Storage
              </label>
              <input
                type="text"
                readOnly
                value="SQLite (Local Dev) • PostgreSQL Target Schema Ready"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-xs text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                CV Pose Processing Engine
              </label>
              <input
                type="text"
                readOnly
                value="MediaPipe WebAssembly + OpenCV Python Bridge (Phase 3)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-xs text-slate-700"
              />
            </div>
          </div>
        </Card>

        {/* Security & Regulatory Parameters */}
        <Card variant="default">
          <CardHeader
            title="Compliance & Data Retention"
            subtitle="SaMD & HIPAA policies"
          />
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">Session Telemetry Retention</span>
                <span className="text-[11px] text-slate-500">Raw keypoints anonymized and retained 90 days</span>
              </div>
              <Badge variant="active" size="sm">Active Policy</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">Clinician Audit Log Archival</span>
                <span className="text-[11px] text-slate-500">Immutable 7-year medical audit retention</span>
              </div>
              <Badge variant="active" size="sm">Enforced</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">ESP32 USB Auto-Pairing</span>
                <span className="text-[11px] text-slate-500">Explicit user grant required via Web Serial</span>
              </div>
              <Badge variant="neutral" size="sm">Required</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
