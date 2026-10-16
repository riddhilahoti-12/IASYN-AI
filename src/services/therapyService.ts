import { TherapyPlan, TherapyExercise, PatientIntakeData } from '../types';
import { DEMO_THERAPY_PLAN, DEMO_PATIENT_INTAKE } from './mockData';
import { apiClient } from './apiClient';

interface BackendTherapyPlan {
  id: string;
  patient_id: string;
  doctor_id: string;
  title: string;
  therapy_type: string;
  diagnosis: string;
  exercise_definitions: Array<{
    id?: string;
    name: string;
    target_joint?: string;
    target_rom?: number;
    target_reps?: number;
    hold_sec?: number;
    starting_position?: string;
  }>;
  prescribed_reps_sets: {
    sets_per_session?: number;
    repetitions_per_set?: number;
    hold_duration_sec?: number;
    sessions_per_week?: number;
  };
  clinical_targets: {
    target_rom_degrees?: number;
    max_trunk_compensation_degrees?: number;
    target_form_adherence_percent?: number;
  };
  restrictions: string[];
  approval_status: string;
  created_at: string;
  updated_at: string;
}

export const therapyService = {
  /**
   * Fetches the active therapy plan from backend API with fallback to demo data.
   */
  async getActivePlanForPatient(patientId?: string): Promise<TherapyPlan> {
    try {
      const plans = await apiClient.get<BackendTherapyPlan[]>('/patients/me/plans');
      if (plans && plans.length > 0) {
        const p = plans[0];
        return {
          id: p.id,
          patientId: p.patient_id,
          patientName: 'Elena Rostova',
          prescribedByDoctorId: p.doctor_id,
          prescribedByDoctorName: 'Dr. Marcus Vance, PT, DPT',
          title: p.title,
          diagnosis: p.diagnosis,
          phase: 'Phase 2: Active Dynamic Range & Motor Control',
          status: p.approval_status.toLowerCase() as 'active' | 'completed' | 'paused' | 'under_review',
          startDate: '2026-08-20',
          reviewDate: '2026-10-30',
          targetFrequency: `${p.prescribed_reps_sets?.sessions_per_week || 5} sessions/week`,
          exercises: (p.exercise_definitions || []).map((ex, idx) => ({
            id: ex.id || `ex-${idx + 1}`,
            name: ex.name,
            category: 'physiotherapy',
            targetArea: ex.target_joint || 'Glenohumeral Joint',
            repsOrDuration: `${ex.target_reps || 10} reps`,
            sets: p.prescribed_reps_sets?.sets_per_session || 3,
            frequency: 'Daily (Morning)',
            restIntervalSeconds: 60,
            prescribedRangeOfMotion: `${ex.target_rom || 90}° target`,
            instructions: [
              ex.starting_position || 'Seated upright with neutral spine posture.',
              'Initiate movement slowly in coronal plane without scapular hiking.',
              `Hold terminal position for ${ex.hold_sec || 3} seconds before controlled descent.`,
            ],
            precautions: p.restrictions || ['Avoid jerking motion', 'Do not push through sharp pain'],
          })),
          clinicalNotes: `Clinical Protocol: ${p.therapy_type}. Restrictions: ${(p.restrictions || []).join('; ')}`,
        };
      }
    } catch {
      // Fallback to rich demo data
    }
    return DEMO_THERAPY_PLAN;
  },

  async getPatientIntake(patientId: string): Promise<PatientIntakeData> {
    try {
      const profile = await apiClient.get<{ demographics?: Record<string, unknown>; rehab_goals?: string[] }>('/patients/me');
      if (profile) {
        return {
          ...DEMO_PATIENT_INTAKE,
          rehabilitationGoals: profile.rehab_goals || DEMO_PATIENT_INTAKE.rehabilitationGoals,
        };
      }
    } catch {
      // Fallback
    }
    return DEMO_PATIENT_INTAKE;
  },

  async getAllExercisesCatalogue(): Promise<TherapyExercise[]> {
    return DEMO_THERAPY_PLAN.exercises;
  },
};
