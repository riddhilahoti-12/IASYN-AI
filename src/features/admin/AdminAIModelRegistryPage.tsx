import React from 'react';
import { BrainCircuit, Cpu, CheckCircle2, Sliders, Activity, Sparkles } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_VISION_MODELS } from '../../services/mockData';

export const AdminAIModelRegistryPage: React.FC = () => {
  const models = DEMO_VISION_MODELS;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Model Zoo</span>
            <Badge variant="warning">Computer Vision & Kinematics</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">AI Model Registry & Validation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered neural architectures, landmark topological graphs, and inference performance benchmarks
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Activity className="w-3.5 h-3.5" />}>
          Run Latency Benchmark
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {models.map((m) => (
          <Card key={m.modelId} variant="default" className="hover:border-slate-300 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
                  <Badge variant={m.status === 'ready' ? 'active' : 'pending'} size="sm">
                    {m.status.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-xs text-slate-500">
                  Framework: <strong className="text-slate-700">{m.framework}</strong> • Version: {m.version} • Target FPS: {m.targetFPS}
                </p>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                  <div>
                    <strong>Landmarks Tracked: </strong>{m.landmarkCount} Anatomical Keypoints
                  </div>
                  <div>
                    <strong>Clinical Benchmark: </strong>{m.accuracyBenchmark}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="sm">
                  Inspect Keypoint Config
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
