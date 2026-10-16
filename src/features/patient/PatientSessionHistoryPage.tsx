import React from 'react';
import { History, Calendar, CheckCircle2, Clock, FileText, Download } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_SESSIONS } from '../../services/mockData';

export const PatientSessionHistoryPage: React.FC = () => {
  const sessions = DEMO_SESSIONS;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Demo Session Records</span>
            <Badge variant="clinical">Clinician Supervised Logs</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Therapy Session History</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete audit record of completed movement routines, reported comfort levels, and doctor feedback
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
          Export PDF Log (Planned Phase 2)
        </Button>
      </div>

      <div className="space-y-4">
        {sessions.map((ses) => (
          <Card key={ses.id} variant="default" className="hover:border-slate-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900 text-sm">{ses.planTitle}</span>
                  <Badge variant={ses.doctorReviewed ? 'active' : 'pending'} size="sm">
                    {ses.doctorReviewed ? 'Clinician Verified' : 'Awaiting Review'}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(ses.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ses.durationMinutes} minutes
                  </span>
                  <span>•</span>
                  <span>Session Type: <strong className="text-slate-700 capitalize">{ses.sessionType.replace(/_/g, ' ')}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="text-slate-500 block">Adherence</span>
                  <span className="font-bold text-slate-900">{ses.adherencePercentage}% ({ses.exercisesCompleted}/{ses.totalExercises})</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Reported Pain</span>
                  <span className="font-bold text-rose-600">{ses.patientReportedPainLevel} / 10 VAS</span>
                </div>
              </div>
            </div>

            {/* Doctor Note Section if available */}
            {ses.doctorNotes ? (
              <div className="mt-3 p-3 bg-brand-50/70 border border-brand-200/80 rounded-lg text-xs text-brand-950">
                <span className="font-semibold text-brand-900">Dr. Reynolds Review Note: </span>
                {ses.doctorNotes}
              </div>
            ) : (
              <div className="mt-3 text-xs text-slate-400 italic">
                Pending doctor sign-off on next routine review cycle.
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
