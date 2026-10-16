import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Camera, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Sliders, 
  Info,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_THERAPY_PLAN, DEMO_ESP32_DEVICE } from '../../services/mockData';
import { visionService } from '../../services/visionService';

export const PatientTherapyStudioPage: React.FC = () => {
  const plan = DEMO_THERAPY_PLAN;
  const [cameraStatus, setCameraStatus] = useState<{ checked: boolean; available: boolean; label?: string }>({
    checked: false,
    available: false,
  });
  const [isCheckingCamera, setIsCheckingCamera] = useState(false);

  const checkWebcam = async () => {
    setIsCheckingCamera(true);
    const res = await visionService.checkCameraAvailability();
    setCameraStatus({ checked: true, available: res.available, label: res.label });
    setIsCheckingCamera(false);
  };

  useEffect(() => {
    checkWebcam();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="clinical">Phase 3 & 4 Architectural Shell</Badge>
            <span className="badge-demo">Pre-Flight Readiness Check</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Guided Therapy Studio</h1>
          <p className="text-xs text-slate-500 mt-1">
            Active Routine: <strong className="text-slate-700">{plan.title}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="md">
            Phase 1 UI Shell
          </Badge>
        </div>
      </div>

      {/* Honest Phase 1 Disclaimer */}
      <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-sky-950">
            Phase 1 Integration Architecture Notice:
          </p>
          <p className="leading-relaxed">
            This studio shell demonstrates the pre-session hardware checks, exercise selection, and stream viewport layouts. In strict accordance with Phase 1 criteria, <strong>no live camera video stream, fake joint angles, or fabricated repetitions</strong> are simulated. Full real-time MediaPipe BlazePose keypoint estimation and OpenCV kinematics will be compiled and validated in Phase 3.
          </p>
        </div>
      </div>

      {/* Grid: Viewport Placeholder & Pre-Flight Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Studio Viewport (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video w-full bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-card">
            
            {/* Overlay grid simulating optical calibration guidelines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 max-w-md space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 mx-auto shadow-inner">
                <Video className="w-8 h-8" />
              </div>
              
              <h3 className="text-base font-semibold text-white">
                Kinematic Stream Canvas Ready
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Position your camera 5 to 7 feet away with your upper torso fully visible. Ensure adequate front lighting without strong backlighting.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] text-slate-300">
                <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span>MediaPipe 33-Point Model Assigned: Ready for Phase 3</span>
              </div>
            </div>

            {/* Bottom Status Bar inside Canvas */}
            <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 backdrop-blur-xs border-t border-slate-800 px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Camera Stream Idle (Phase 1 Sandbox)</span>
              </div>
              <div className="font-mono text-slate-500">
                Resolution: 1280x720 @ 30 FPS Planned
              </div>
            </div>
          </div>

          {/* Current Exercise Details */}
          <Card variant="default">
            <CardHeader
              title="First Prescribed Exercise"
              subtitle="Dr. Reynolds Post-Op Week 6 Protocol"
            />
            <div className="text-xs sm:text-sm space-y-2">
              <h4 className="font-bold text-slate-900">{plan.exercises[0].name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {plan.exercises[0].instructions[0]}
              </p>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                <strong>Prescription: </strong>{plan.exercises[0].repsOrDuration} • {plan.exercises[0].sets} sets
              </div>
            </div>
          </Card>
        </div>

        {/* Pre-Flight Checklist Panel (1 Col) */}
        <div className="space-y-4">
          <Card variant="default">
            <CardHeader
              title="Pre-Flight Device Readiness"
              subtitle="Multimodal hardware status"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={checkWebcam}
                  isLoading={isCheckingCamera}
                  icon={<RefreshCw className="w-3.5 h-3.5" />}
                >
                  Recheck
                </Button>
              }
            />

            <div className="space-y-4 text-xs">
              {/* Webcam Hardware Detection */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-slate-600" /> Web Camera
                  </span>
                  {cameraStatus.checked ? (
                    cameraStatus.available ? (
                      <Badge variant="active" size="sm">Available</Badge>
                    ) : (
                      <Badge variant="neutral" size="sm">Permission Pending</Badge>
                    )
                  ) : (
                    <Badge variant="neutral" size="sm">Checking...</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {cameraStatus.label || 'Detecting local video input device...'}
                </p>
              </div>

              {/* ESP32 Biofeedback Sensor Module */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-slate-600" /> ESP32 Biofeedback
                  </span>
                  <Badge variant="pending" size="sm">Phase 4 USB</Badge>
                </div>
                <p className="text-[11px] text-slate-500">
                  Hardware Model: {DEMO_ESP32_DEVICE.deviceId}. Serial driver placeholder initialized.
                </p>
              </div>

              {/* Protocol Authorization */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Plan Approval
                  </span>
                  <Badge variant="active" size="sm">Authorized</Badge>
                </div>
                <p className="text-[11px] text-slate-500">
                  Verified by Dr. Marcus Reynolds for home guided therapy.
                </p>
              </div>
            </div>
          </Card>

          {/* Session Safety Instructions */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Exercise Safety Rules</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-amber-800 text-[11px] leading-relaxed">
              <li>Cease immediately if sudden sharp joint pain occurs.</li>
              <li>Keep movements slow, controlled, and within comfortable limits.</li>
              <li>Log actual pain VAS scores after each session for your clinician.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
