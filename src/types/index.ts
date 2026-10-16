export type UserRole = 'patient' | 'doctor' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  medicalId?: string;
  licenseNumber?: string; // for doctor
  department?: string;    // for doctor/admin
  createdDate: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  activeRole: UserRole;
  token?: string;
}

export interface TherapyExercise {
  id: string;
  name: string;
  category: 'physiotherapy' | 'hand_rehab' | 'acupressure' | 'massage' | 'mobility';
  targetArea: string;
  repsOrDuration: string;
  sets: number;
  frequency: string;
  restIntervalSeconds: number;
  prescribedRangeOfMotion?: string;
  instructions: string[];
  precautions: string[];
  mediaPlaceholder?: string;
}

export interface TherapyPlan {
  id: string;
  patientId: string;
  patientName: string;
  prescribedByDoctorId: string;
  prescribedByDoctorName: string;
  title: string;
  diagnosis: string;
  phase: string;
  status: 'active' | 'completed' | 'paused' | 'under_review';
  startDate: string;
  reviewDate: string;
  targetFrequency: string;
  exercises: TherapyExercise[];
  clinicalNotes: string;
}

export interface TherapySessionRecord {
  id: string;
  patientId: string;
  therapyPlanId: string;
  planTitle: string;
  date: string;
  durationMinutes: number;
  exercisesCompleted: number;
  totalExercises: number;
  adherencePercentage: number;
  patientReportedPainLevel: number; // 0-10 VAS scale
  observedRangeOfMotionAvg?: number; // degrees
  doctorReviewed: boolean;
  doctorNotes?: string;
  sessionType: 'guided_computer_vision' | 'sensor_assisted' | 'manual_log';
}

export interface PatientIntakeData {
  id: string;
  patientId: string;
  patientName: string;
  submittedDate: string;
  status: 'pending_review' | 'approved' | 'action_required';
  chiefComplaint: string;
  affectedAnatomy: string[];
  painBaseline: number; // 0-10
  mobilityLimitationNotes: string;
  surgicalHistory: string;
  currentMedications: string;
  contraindications: string[];
  consentGiven: boolean;
  consentTimestamp: string;
}

export interface DoctorReviewQueueItem {
  id: string;
  patientId: string;
  patientName: string;
  type: 'intake' | 'session_anomaly' | 'scheduled_followup' | 'plan_renewal';
  urgency: 'low' | 'medium' | 'high';
  dateFlagged: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
}

export interface ESP32DeviceStatus {
  deviceId: string;
  serialPort: string;
  baudRate: number;
  connectionState: 'disconnected' | 'connecting' | 'connected' | 'error';
  firmwareVersion: string;
  lcdFeedbackReady: boolean;
  ledIndicatorsReady: boolean;
  audioFeedbackReady: boolean;
  lastHeartbeat?: string;
}

export interface VisionModelMetadata {
  modelId: string;
  name: string;
  framework: 'MediaPipe Pose' | 'MediaPipe Hands' | 'OpenCV Kinematics';
  version: string;
  targetFPS: number;
  landmarkCount: number;
  accuracyBenchmark: string;
  status: 'ready' | 'experimental' | 'deprecated';
}

export interface DatasetItem {
  id: string;
  name: string;
  category: string;
  sampleCount: number;
  consentTier: 'Fully Anonymized - IRB 2024' | 'Research Permitted';
  format: string;
  lastUpdated: string;
  sizeMB: number;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  resource: string;
  ipAddress: string;
  complianceFlag: 'normal' | 'sensitive_access' | 'admin_override';
}
