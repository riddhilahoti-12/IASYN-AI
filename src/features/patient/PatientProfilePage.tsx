import React from 'react';
import { User, Phone, Mail, FileText, Heart, Shield, Bell } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { DEMO_PATIENT } from '../../services/mockData';

export const PatientProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const patient = currentUser || DEMO_PATIENT;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 font-bold text-xl">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{patient.name}</h1>
              <Badge variant="active">Active Patient</Badge>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Medical Record ID: {patient.medicalId || 'MED-PT-2024-889'}
            </p>
          </div>
        </div>
        <span className="badge-demo">Demo Profile</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal & Contact Information */}
        <Card variant="default">
          <CardHeader
            title="Personal & Clinical Details"
            subtitle="Verified against institutional electronic health record"
          />
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
              </span>
              <span className="font-medium text-slate-800">{patient.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone
              </span>
              <span className="font-medium text-slate-800">{patient.phone || '+1 (555) 234-5678'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" /> Supervising Clinician
              </span>
              <span className="font-medium text-slate-800">Dr. Marcus Reynolds, MD</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-slate-400" /> Consent Status
              </span>
              <span className="font-medium text-emerald-700">Informed Consent Signed (IRB-24)</span>
            </div>
          </div>
        </Card>

        {/* Rehabilitation Goals */}
        <Card variant="default">
          <CardHeader
            title="Rehabilitation Goals & Milestones"
            subtitle="Co-authored with clinician"
          />
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>Pain-Free Active Flexion</span>
                <span className="text-brand-600">Target: 145°</span>
              </div>
              <p className="text-xs text-slate-500">
                Current: 128° (Week 6 post-subacromial decompression).
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>Activities of Daily Living (ADL)</span>
                <span className="text-emerald-700">80% Reached</span>
              </div>
              <p className="text-xs text-slate-500">
                Comfortable overhead cupboard reaching and unassisted jacket dressing without compensatory scapular hitching.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
