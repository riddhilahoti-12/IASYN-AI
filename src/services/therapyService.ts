import { TherapyPlan, TherapyExercise, PatientIntakeData } from '../types';
import { DEMO_THERAPY_PLAN, DEMO_PATIENT_INTAKE } from './mockData';

export const therapyService = {
  async getActivePlanForPatient(patientId: string): Promise<TherapyPlan> {
    await new Promise((r) => setTimeout(r, 200));
    return DEMO_THERAPY_PLAN;
  },

  async getPatientIntake(patientId: string): Promise<PatientIntakeData> {
    await new Promise((r) => setTimeout(r, 200));
    return DEMO_PATIENT_INTAKE;
  },

  async getAllExercisesCatalogue(): Promise<TherapyExercise[]> {
    await new Promise((r) => setTimeout(r, 200));
    return DEMO_THERAPY_PLAN.exercises;
  }
};
