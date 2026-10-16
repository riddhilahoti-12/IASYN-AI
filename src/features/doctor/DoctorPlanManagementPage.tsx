import React from 'react';
import { FolderKanban, Plus, CheckCircle2, Sliders, Shield } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_THERAPY_PLAN } from '../../services/mockData';

export const DoctorPlanManagementPage: React.FC = () => {
  const plan = DEMO_THERAPY_PLAN;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Prescription Editor Shell</span>
            <Badge variant="clinical">Protocol Dosage Controls</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Therapy Plan Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure exercise repetitions, range of motion constraints, and rest intervals for assigned patients
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="teal" size="sm" icon={<Plus className="w-4 h-4" />}>
            Add Custom Exercise
          </Button>
        </div>
      </div>

      <Card variant="default">
        <CardHeader
          title={`Active Protocol: ${plan.title}`}
          subtitle={`Assigned Patient: ${plan.patientName} (${plan.diagnosis})`}
        />

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">Target Frequency</span>
              <span className="font-semibold text-slate-900">{plan.targetFrequency}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">Protocol Phase</span>
              <span className="font-semibold text-slate-900">{plan.phase}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 block">Next Clinical Review</span>
              <span className="font-semibold text-slate-900">{plan.reviewDate}</span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
              Configured Exercises & Thresholds ({plan.exercises.length})
            </h3>
            <div className="space-y-3">
              {plan.exercises.map((ex, i) => (
                <div key={ex.id} className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{ex.name}</span>
                      <Badge variant="neutral" size="sm">{ex.category}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Target Area: {ex.targetArea} • Prescription: {ex.repsOrDuration} across {ex.sets} sets
                    </p>
                    {ex.prescribedRangeOfMotion && (
                      <p className="text-xs text-brand-700 font-medium mt-1">
                        ROM Threshold: {ex.prescribedRangeOfMotion}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm">
                      Adjust Dosage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
