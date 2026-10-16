import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC<{ fullWidth?: boolean }> = ({ fullWidth = false }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
      <div className={`${fullWidth ? 'px-4 sm:px-6 lg:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} py-6`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-600" />
            <span className="font-semibold text-slate-700">IASYN AI</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 text-[11px]">
              AI-Driven Multimodal Physiotherapy & Recovery Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              HIPAA & SaMD Alignment Architecture
            </span>
            <Link to="/signin" className="hover:text-slate-800 transition-colors">
              Role Access
            </Link>
            <span className="text-slate-300">•</span>
            <span>Phase 1 Architecture Foundation</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
          <p>© {new Date().getFullYear()} IASYN AI Platform. All rights reserved.</p>
          <p>Strictly for clinical trial & investigational support use. Not for emergency medical guidance.</p>
        </div>
      </div>
    </footer>
  );
};
