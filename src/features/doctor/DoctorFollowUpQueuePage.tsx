import React from 'react';
import { Clock, AlertCircle, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_DOCTOR_QUEUE } from '../../services/mockData';

export const DoctorFollowUpQueuePage: React.FC = () => {
  const queue = DEMO_DOCTOR_QUEUE;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Clinical Triage</span>
            <Badge variant="clinical">{queue.length} Active Items</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Clinical Follow-up & Intervention Queue</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Patients requiring telehealth consultation, protocol renewals, or contraindication re-evaluations
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {queue.map((item) => (
          <Card key={item.id} variant="default" className="hover:border-slate-300 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{item.patientName}</h3>
                  <Badge variant={item.urgency === 'high' ? 'danger' : item.urgency === 'medium' ? 'warning' : 'neutral'} size="sm">
                    {item.urgency.toUpperCase()}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-mono">ID: {item.patientId}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Flagged on {item.dateFlagged}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm">
                  Schedule Telehealth
                </Button>
                <Button variant="teal" size="sm">
                  Resolve Item
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
