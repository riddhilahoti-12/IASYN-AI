import { UserProfile, UserRole } from '../types';
import { DEMO_PATIENT, DEMO_DOCTOR, DEMO_ADMIN } from './mockData';

export interface LoginCredentials {
  email: string;
  password?: string;
  role: UserRole;
}

export const authService = {
  /**
   * Phase 1 Mock Authentication Service.
   * NOTE: This is a front-end demonstration shell. Secure JWT/OAuth2 authentication
   * will be integrated in Phase 2 with the FastAPI backend.
   */
  async login(credentials: LoginCredentials): Promise<UserProfile> {
    // Simulated network latency
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (credentials.role === 'patient') {
      return { ...DEMO_PATIENT, email: credentials.email || DEMO_PATIENT.email };
    } else if (credentials.role === 'doctor') {
      return { ...DEMO_DOCTOR, email: credentials.email || DEMO_DOCTOR.email };
    } else {
      return { ...DEMO_ADMIN, email: credentials.email || DEMO_ADMIN.email };
    }
  },

  getDemoUserByRole(role: UserRole): UserProfile {
    switch (role) {
      case 'patient':
        return DEMO_PATIENT;
      case 'doctor':
        return DEMO_DOCTOR;
      case 'admin':
        return DEMO_ADMIN;
    }
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
};
