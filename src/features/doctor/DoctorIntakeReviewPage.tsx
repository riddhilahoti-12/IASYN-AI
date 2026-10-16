import React from 'react';
import { FileCheck2, User, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_PATIENT_INTAKE } from '../../services/mockData';

export const DoctorIntakeReviewPage: React.FC = () => {
  const intake = DEMO_PATIENT_INTAKE;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Intake Review Queue</span>
            <Badge variant="pending">Awaiting Clinician Clearance</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Patient Intake Assessment & Screening</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review reported surgical histories, anatomy mappings, and contraindicated movements prior to care plan activation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<XCircle className="w-3.5 h-3.5" />}>
            Request Revision
          </Button>
          <Button variant="teal" size="sm" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
            Approve & Authorize Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default" className="md:col-span-2">
          <CardHeader
            title="Intake Submission Summary"
            subtitle={`Patient: ${intake.patientName} • Submitted ${intake.submittedDate}`}
          />
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <p className="font-semibold text-slate-700 mb-1">Chief Functional Complaint:</p>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                {intake.chiefComplaint}
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-700 mb-1">Mobility Limitation Notes:</p>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                {intake.mobilityLimitationNotes}
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-700 mb-1">Prior Surgical Interventions:</p>
              <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                {intake.surgicalHistory}
              </p>
            </div>
          </div>
        </Card>

        {/* Clinical Checklist Panel */}
        <Card variant="default">
          <CardHeader
            title="Contraindication Flags"
            subtitle="Safety constraints"
          />
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
              <span className="font-semibold text-rose-800 block mb-1">Protocol Exclusion Rule:</span>
              <p className="text-rose-700">
                {intake.contraindications[0]}
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-semibold text-slate-800 block">Baseline Metrics:</span>
              <div className="flex justify-between">
                <span className="text-slate-500">Intake Pain VAS:</span>
                <span className="font-bold text-slate-900">{intake.painBaseline}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Informed Consent:</span>
                <span className="text-emerald-700 font-medium">Verified Signed</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
