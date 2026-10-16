import { UserProfile, UserRole } from '../types';
import { apiClient, setApiAuthToken } from './apiClient';

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: UserRole; // Optional hint for UI convenience, but role is strictly derived from backend
}

interface BackendLoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    role: string;
    display_name: string;
    is_active: boolean;
    medical_id?: string;
    license_number?: string;
    verification_status?: string;
  };
}

interface BackendMeResponse {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  display_name: string;
  profile?: Record<string, unknown>;
}

function mapBackendUserToProfile(backendUser: BackendLoginResponse['user']): UserProfile {
  const roleLower = backendUser.role.toLowerCase() as UserRole;
  return {
    id: backendUser.id,
    name: backendUser.display_name,
    email: backendUser.email,
    role: roleLower,
    medicalId: backendUser.medical_id,
    licenseNumber: backendUser.license_number,
    department: roleLower === 'patient' ? 'Physical Rehabilitation' : 'Neuro-Motor Rehabilitation',
    createdDate: '2026-08-14',
  };
}

export const authService = {
  /**
   * Real backend authentication against FastAPI POST /api/v1/auth/login.
   * Derives role strictly from the database user record.
   */
  async login(credentials: LoginCredentials): Promise<UserProfile> {
    const payload = {
      email: credentials.email.trim(),
      password: credentials.password || 'ClinicalPass2026!',
    };

    const data = await apiClient.post<BackendLoginResponse>('/auth/login', payload);

    // Save token in memory / session
    if (data.access_token) {
      setApiAuthToken(data.access_token);
    }

    return mapBackendUserToProfile(data.user);
  },

  /**
   * Fetches currently authenticated user record from FastAPI GET /api/v1/auth/me.
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    try {
      const data = await apiClient.get<BackendMeResponse>('/auth/me');
      const roleLower = data.role.toLowerCase() as UserRole;
      return {
        id: data.id,
        name: data.display_name,
        email: data.email,
        role: roleLower,
        medicalId: (data.profile?.medical_id as string) || undefined,
        licenseNumber: (data.profile?.license_number as string) || undefined,
        department: (data.profile?.department as string) || (roleLower === 'patient' ? 'Physical Rehabilitation' : 'Clinical Governance'),
        createdDate: '2026-08-14',
      };
    } catch {
      return null;
    }
  },

  /**
   * Logs out current session and clears cookies and tokens via POST /api/v1/auth/logout.
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {});
    } catch {
      // Ignore network errors on logout
    } finally {
      setApiAuthToken(null);
    }
  },

  /**
   * Fictional demo credentials for quick convenience testing.
   */
  getDemoCredentials(role: UserRole) {
    switch (role) {
      case 'patient':
        return {
          email: 'patient.demo@iasyn.ai',
          password: 'ClinicalPass2026!',
        };
      case 'doctor':
        return {
          email: 'doctor.demo@iasyn.ai',
          password: 'ClinicalPass2026!',
        };
      case 'admin':
        return {
          email: 'admin.demo@iasyn.ai',
          password: 'ClinicalPass2026!',
        };
    }
  },
};
