import React from 'react';
import { ShieldCheck, Stethoscope, CheckCircle2, XCircle, FileText, AlertCircle } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const AdminDoctorVerificationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Credentialing Registry</span>
            <Badge variant="warning">Clinician Credentialing</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Doctor & Therapist Medical Verification</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit medical license numbers, clinical board certifications, and institutional affiliations before authorizing protocol issuance
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Verified Doctor Card */}
        <Card variant="default">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dr. Marcus Reynolds, MD, PT</h3>
                <p className="text-xs text-slate-500">License: PT-MD-99421-US • State Board of Physical Therapy</p>
              </div>
            </div>
            <Badge variant="active">Verified Active Practitioner</Badge>
          </div>
          <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>Specialty: Orthopedic Rehabilitation & Sports Medicine</span>
            <span>Verified On: 2023-04-18 by Credentialing Admin</span>
          </div>
        </Card>

        {/* Pending Verification Doctor Card */}
        <Card variant="default">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dr. Priya Sharma, PT, DPT</h3>
                <p className="text-xs text-slate-500">License: DPT-CA-88102 • California Physical Therapy Board</p>
              </div>
            </div>
            <Badge variant="pending">Pending Primary Source Verification</Badge>
          </div>
          <div className="pt-3 flex items-center justify-between text-xs">
            <span className="text-slate-500">Specialty: Neurological Rehabilitation & Stroke Recovery</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Inspect NPI Record
              </Button>
              <Button variant="teal" size="sm">
                Approve Credentials
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
