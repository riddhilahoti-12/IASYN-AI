import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`bg-amber-50/90 border border-amber-200/80 rounded-lg text-amber-900 ${compact ? 'p-2.5 text-xs' : 'p-3.5 sm:p-4 text-xs sm:text-sm'}`}>
      <div className="flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-amber-950">Clinical & Investigational Notice: </span>
          IASYN AI is an assistive digital therapy support system designed to augment clinician-prescribed rehabilitation protocols. It does not replace independent clinical diagnosis, emergency medical care, or the physical presence of a licensed healthcare practitioner. All movement analysis and protocol adjustments must be reviewed by the supervising clinician.
        </div>
      </div>
    </div>
  );
};
