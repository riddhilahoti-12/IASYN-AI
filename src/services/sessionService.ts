import { TherapySessionRecord } from '../types';
import { DEMO_SESSIONS } from './mockData';

export const sessionService = {
  async getSessionsForPatient(patientId: string): Promise<TherapySessionRecord[]> {
    await new Promise((r) => setTimeout(r, 200));
    return DEMO_SESSIONS;
  },

  async logSession(record: Omit<TherapySessionRecord, 'id'>): Promise<TherapySessionRecord> {
    await new Promise((r) => setTimeout(r, 300));
    const newSession: TherapySessionRecord = {
      ...record,
      id: `ses_${Date.now()}`
    };
    return newSession;
  }
};
