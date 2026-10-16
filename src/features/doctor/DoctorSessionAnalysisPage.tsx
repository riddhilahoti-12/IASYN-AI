import React, { useState } from 'react';
import { FileSearch, Activity, CheckCircle2, AlertCircle, Save, Calendar, Clock } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_SESSIONS, DEMO_PATIENT } from '../../services/mockData';

export const DoctorSessionAnalysisPage: React.FC = () => {
  const session = DEMO_SESSIONS[0];
  const [clinicianNote, setClinicianNote] = useState(session.doctorNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNote = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Session Telemetry Review</span>
            <Badge variant="clinical">Kinematic Inspection Shell</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Session Kinematic Analysis</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Patient: <strong className="text-slate-800">{DEMO_PATIENT.name}</strong> • Routine: {session.planTitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={session.doctorReviewed ? 'active' : 'pending'} size="md">
            {session.doctorReviewed ? 'Clinician Verified' : 'Awaiting Review'}
          </Badge>
        </div>
      </div>

      {/* Grid: Metrics Overview & Kinematic Data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="default" className="p-4">
          <span className="text-xs text-slate-500 block">Session Date</span>
          <span className="text-sm font-bold text-slate-900">
            {new Date(session.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </Card>
        <Card variant="default" className="p-4">
          <span className="text-xs text-slate-500 block">Duration & Completion</span>
          <span className="text-sm font-bold text-slate-900">
            {session.durationMinutes} mins • {session.exercisesCompleted}/{session.totalExercises} exercises
          </span>
        </Card>
        <Card variant="default" className="p-4">
          <span className="text-xs text-slate-500 block">Observed Active ROM</span>
          <span className="text-sm font-bold text-brand-700">
            {session.observedRangeOfMotionAvg}° Avg Flexion
          </span>
        </Card>
        <Card variant="default" className="p-4">
          <span className="text-xs text-slate-500 block">Patient Reported Pain</span>
          <span className="text-sm font-bold text-rose-600">
            {session.patientReportedPainLevel} / 10 VAS
          </span>
        </Card>
      </div>

      {/* Kinematic Telemetry Architecture Notice */}
      <Card variant="default">
        <CardHeader
          title="Observable Movement & Telemetry Pipeline"
          subtitle="Target Integration: Phase 3 (MediaPipe BlazePose 33-Keypoint Stream)"
        />

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Activity className="w-4 h-4 text-brand-600" />
              <span>Phase 3 Kinematics Integration Interface</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              In Phase 3, this viewer renders 3D joint coordinate vectors, scapulohumeral rhythm graphs, and Bilateral Symmetry Deviation percentages derived from client-side MediaPipe landmark buffers. Phase 1 provides the telemetry contracts and schema validation.
            </p>
          </div>

          {/* Clinician Annotation & Notes Input */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Clinician Progress Annotation & Prescription Notes
            </label>
            <textarea
              rows={4}
              value={clinicianNote}
              onChange={(e) => setClinicianNote(e.target.value)}
              className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-clinical-500 focus:border-clinical-500"
              placeholder="Enter clinical observations, protocol adjustments, or instructions for the patient..."
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {isSaved ? '✓ Note saved to electronic session log' : 'Changes will be linked to patient audit history'}
              </span>
              <Button
                variant="teal"
                size="sm"
                onClick={handleSaveNote}
                icon={<Save className="w-3.5 h-3.5" />}
              >
                Save Annotation
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
