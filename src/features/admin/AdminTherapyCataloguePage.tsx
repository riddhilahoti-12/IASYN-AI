import React from 'react';
import { BookOpen, Plus, Tag, Layers, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_THERAPY_PLAN } from '../../services/mockData';

export const AdminTherapyCataloguePage: React.FC = () => {
  const exercises = DEMO_THERAPY_PLAN.exercises;

  const categories = [
    { name: 'Physiotherapy & Orthopedics', count: 48, active: true },
    { name: 'Hand & Upper-Limb Rehabilitation', count: 24, active: true },
    { name: 'Pressure-Point / Acupressure Protocols', count: 16, active: true },
    { name: 'Manual Therapy & Myofascial Release', count: 12, active: true },
    { name: 'Chronic Pain Pacing Workflows', count: 18, active: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Taxonomy Master</span>
            <Badge variant="warning">Clinical Protocol Library</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Therapy Exercise & Protocol Catalogue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Standardized anatomical exercise definitions, kinematics landmarks, and clinical contraindications
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
          Register New Exercise (Catalogue)
        </Button>
      </div>

      {/* Modality Category Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c, i) => (
          <Card key={i} variant="default" className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900">{c.name}</span>
              <Badge variant="clinical" size="sm">{c.count} items</Badge>
            </div>
            <p className="text-[11px] text-slate-500">APTA & Evidence-based guideline aligned</p>
          </Card>
        ))}
      </div>

      {/* Catalog Table */}
      <Card variant="default">
        <CardHeader
          title="Standard Prescribed Exercises in Registry"
          subtitle="Pre-calibrated for MediaPipe BlazePose and Hand tracking"
        />

        <div className="space-y-3">
          {exercises.map((ex) => (
            <div key={ex.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{ex.name}</span>
                  <Badge variant="neutral" size="sm">{ex.category}</Badge>
                </div>
                <p className="text-slate-500">
                  Target: {ex.targetArea} • Kinematic Threshold: {ex.prescribedRangeOfMotion || 'Joint angle tracking'}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm">
                  View Joint Landmarks
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
