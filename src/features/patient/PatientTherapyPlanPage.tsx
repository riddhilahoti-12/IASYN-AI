import React from 'react';
import { CalendarCheck, Stethoscope, CheckCircle2, AlertTriangle, Play, Sparkles } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { DEMO_THERAPY_PLAN } from '../../services/mockData';

export const PatientTherapyPlanPage: React.FC = () => {
  const plan = DEMO_THERAPY_PLAN;

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge-demo">Demo Plan Data</span>
            <Badge variant="active">Active Prescribed Care Plan</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{plan.title}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Supervising Physiatrist: <strong className="text-slate-700">{plan.prescribedByDoctorName}</strong> • Target: {plan.targetFrequency}
          </p>
        </div>

        <Link to="/patient/therapy-studio">
          <Button variant="primary" size="md" icon={<Play className="w-4 h-4 fill-current" />}>
            Launch Therapy Studio
          </Button>
        </Link>
      </div>

      {/* Clinical Diagnosis & Protocol Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Diagnosis</p>
          <p className="text-sm font-semibold text-slate-900">{plan.diagnosis}</p>
        </Card>
        <Card variant="default">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Protocol Phase</p>
          <p className="text-sm font-semibold text-slate-900">{plan.phase}</p>
        </Card>
        <Card variant="default">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Scheduled Review</p>
          <p className="text-sm font-semibold text-slate-900">{plan.reviewDate} (In clinic)</p>
        </Card>
      </div>

      {/* Exercises List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Prescribed Movement Sequence ({plan.exercises.length} Exercises)
          </h2>
          <span className="text-xs text-slate-500">Perform in sequential order</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {plan.exercises.map((ex, idx) => (
            <Card key={ex.id} variant="default" className="hover:border-slate-300 transition-all">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{ex.name}</h3>
                    <Badge variant="neutral" size="sm">{ex.category}</Badge>
                  </div>

                  <p className="text-xs text-slate-500">
                    <strong className="text-slate-700">Target Area: </strong>{ex.targetArea} •{' '}
                    <strong className="text-slate-700">Prescription: </strong>{ex.repsOrDuration} across {ex.sets} sets
                  </p>

                  {ex.prescribedRangeOfMotion && (
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
                      <strong>Kinematic Target: </strong>{ex.prescribedRangeOfMotion}
                    </div>
                  )}

                  {/* Step instructions */}
                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-700 mb-1">Execution Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600">
                      {ex.instructions.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Precautions box */}
                <div className="md:w-72 bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex-shrink-0 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Safety Precautions</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-800 text-[11px]">
                    {ex.precautions.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
