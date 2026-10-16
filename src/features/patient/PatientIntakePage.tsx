import React from 'react';
import { ClipboardList, CheckCircle2, ShieldAlert, FileText, Calendar, Activity } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DEMO_PATIENT_INTAKE } from '../../services/mockData';

export const PatientIntakePage: React.FC = () => {
  const intake = DEMO_PATIENT_INTAKE;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Demonstration Intake</span>
            <Badge variant="active">Clinician Reviewed & Approved</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Health Intake & Baseline Survey</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Submitted on {intake.submittedDate} • Intake ID: {intake.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chief Complaint & Symptoms */}
        <Card variant="default">
          <CardHeader
            title="Chief Complaint & Baseline Mobility"
            subtitle="Initial patient report prior to therapy initiation"
          />
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">Chief Complaint</span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                {intake.chiefComplaint}
              </p>
            </div>

            <div>
              <span className="font-semibold text-slate-700 block mb-1">Affected Anatomical Zones</span>
              <div className="flex flex-wrap gap-2">
                {intake.affectedAnatomy.map((zone, i) => (
                  <span key={i} className="px-2.5 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-md text-xs font-medium">
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-700 block mb-1">Baseline Pain Score (VAS 0-10)</span>
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-xl font-bold text-slate-900">{intake.painBaseline} / 10</div>
                <p className="text-xs text-slate-500">
                  Moderate resting discomfort exacerbated by terminal elevation or sleeping on right side.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Surgical History & Contraindications */}
        <Card variant="default">
          <CardHeader
            title="Clinical History & Contraindication Screening"
            subtitle="Verified against clinician protocol constraints"
          />
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">Surgical / Interventional History</span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                {intake.surgicalHistory}
              </p>
            </div>

            <div>
              <span className="font-semibold text-slate-700 block mb-1">Active Prescribed Medications</span>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                {intake.currentMedications}
              </p>
            </div>

            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg">
              <div className="flex items-center gap-2 text-rose-800 font-semibold mb-1">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Protocol Contraindications & Precautions</span>
              </div>
              <ul className="list-disc list-inside text-xs text-rose-700 space-y-1">
                {intake.contraindications.map((contra, i) => (
                  <li key={i}>{contra}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Digital Telehealth Consent & IRB Telemetry Authorization Recorded</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
