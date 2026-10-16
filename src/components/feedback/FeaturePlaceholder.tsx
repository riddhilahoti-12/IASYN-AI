import React from 'react';
import { Layers, ShieldCheck, Cpu, Code2, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface FeaturePlaceholderProps {
  title: string;
  category: string;
  targetPhase: 'Phase 2 (FastAPI & Auth Backend)' | 'Phase 3 (OpenCV & MediaPipe Kinematics)' | 'Phase 4 (ESP32 USB Biofeedback)' | 'Phase 5 (Longitudinal Clinical Analytics)';
  description: string;
  architectureDetails: {
    serviceName: string;
    backendStack: string;
    hardwareOrModelDependencies?: string;
    clinicalSafetyRequirement: string;
  };
  keyPlannedCapabilities: string[];
}

export const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({
  title,
  category,
  targetPhase,
  description,
  architectureDetails,
  keyPlannedCapabilities,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="clinical">{category}</Badge>
              <Badge variant="pending">Architecture Ready • Under Development</Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h1>
          </div>
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Target Integration: </span>
            {targetPhase}
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-4xl">
          {description}
        </p>

        {/* Phase 1 Status Clarification */}
        <div className="mt-5 flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200/90 rounded-lg text-xs text-slate-600">
          <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-700">Phase 1 Specification: </span>
            This view establishes the route shell, domain data models, and typed service interfaces. Action triggers and backend data synchronization are deliberately inactive to prevent unverified medical assertions.
          </div>
        </div>
      </div>

      {/* Grid of Planned Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Planned Capabilities */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Planned Clinical Capabilities
            </h2>
          </div>
          <ul className="space-y-2.5">
            {keyPlannedCapabilities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Architecture Contract */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <Code2 className="w-4 h-4 text-clinical-600" />
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Service Boundary & Stack Readiness
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Service Boundary</span>
              <span className="font-mono text-slate-800 font-medium">{architectureDetails.serviceName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Backend Component</span>
              <span className="text-slate-800 font-medium">{architectureDetails.backendStack}</span>
            </div>
            {architectureDetails.hardwareOrModelDependencies && (
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Dependencies</span>
                <span className="text-slate-800 font-medium">{architectureDetails.hardwareOrModelDependencies}</span>
              </div>
            )}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Safety & Compliance Prerequisite:
              </div>
              <p className="text-xs text-slate-500 leading-normal pl-5">
                {architectureDetails.clinicalSafetyRequirement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
