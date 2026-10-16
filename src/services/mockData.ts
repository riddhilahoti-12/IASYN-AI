import { 
  UserProfile, 
  TherapyPlan, 
  TherapySessionRecord, 
  PatientIntakeData, 
  DoctorReviewQueueItem, 
  ESP32DeviceStatus, 
  VisionModelMetadata, 
  DatasetItem, 
  SystemAuditLog 
} from '../types';

export const DEMO_PATIENT: UserProfile = {
  id: 'usr_pat_8941',
  name: 'Eleanor Vance',
  email: 'patient.demo@iasyn.ai',
  role: 'patient',
  medicalId: 'MED-PT-2024-889',
  phone: '+1 (555) 234-5678',
  createdDate: '2024-09-12',
};

export const DEMO_DOCTOR: UserProfile = {
  id: 'usr_doc_3012',
  name: 'Dr. Marcus Reynolds, MD, PT',
  email: 'doctor.demo@iasyn.ai',
  role: 'doctor',
  licenseNumber: 'PT-MD-99421-US',
  department: 'Orthopedic Rehabilitation & Sports Medicine',
  createdDate: '2023-04-18',
};

export const DEMO_ADMIN: UserProfile = {
  id: 'usr_adm_0001',
  name: 'Sarah Chen, Clinical Systems Admin',
  email: 'admin.demo@iasyn.ai',
  role: 'admin',
  department: 'Digital Health Infrastructure & Compliance',
  createdDate: '2023-01-10',
};

export const DEMO_THERAPY_PLAN: TherapyPlan = {
  id: 'tp_shld_2024_01',
  patientId: 'usr_pat_8941',
  patientName: 'Eleanor Vance',
  prescribedByDoctorId: 'usr_doc_3012',
  prescribedByDoctorName: 'Dr. Marcus Reynolds, MD',
  title: 'Post-Subacromial Decompression Phase II Protocol',
  diagnosis: 'Right Shoulder Impingement & Rotator Cuff Tendinopathy (Post-Op Week 6)',
  phase: 'Phase 2: Controlled Active Range of Motion & Scapular Stabilization',
  status: 'active',
  startDate: '2024-10-01',
  reviewDate: '2024-11-01',
  targetFrequency: '5 days / week (1-2 daily sessions)',
  clinicalNotes: 'Ensure patient stops if acute anterior glenohumeral pain exceeds 4/10 VAS. Emphasize scapular retraction before initiation of abduction.',
  exercises: [
    {
      id: 'ex_scap_retract',
      name: 'Scapular Retraction & Setting in Neutral',
      category: 'physiotherapy',
      targetArea: 'Rhomboids, Middle & Lower Trapezius',
      repsOrDuration: '10 repetitions (5-second hold)',
      sets: 3,
      frequency: 'Daily (Morning & Evening)',
      restIntervalSeconds: 45,
      prescribedRangeOfMotion: 'Symmetric bilateral pinch without shoulder elevation',
      instructions: [
        'Stand tall with arms relaxed at your sides.',
        'Gently draw shoulder blades backward and down toward your spine.',
        'Hold position firmly for 5 seconds without shrugging upward.',
        'Release steadily with controlled eccentric return.'
      ],
      precautions: [
        'Avoid hyperextending lower lumbar spine.',
        'Do not hold breath during contraction phase.'
      ]
    },
    {
      id: 'ex_pendulum',
      name: 'Codman Pendulum Oscillations',
      category: 'physiotherapy',
      targetArea: 'Glenohumeral Joint Decompression',
      repsOrDuration: '60 seconds clockwise, 60 seconds counter-clockwise',
      sets: 2,
      frequency: 'Daily before active exercises',
      restIntervalSeconds: 30,
      prescribedRangeOfMotion: 'Passive swing within comfort limit (radius < 25cm)',
      instructions: [
        'Lean forward resting non-affected hand on a sturdy table.',
        'Allow affected right arm to hang completely slack like a pendulum.',
        'Use gentle torso momentum to sway the relaxed arm in circular arcs.'
      ],
      precautions: [
        'Do not use shoulder muscles to generate the motion; rely on trunk swaying.'
      ]
    },
    {
      id: 'ex_wand_flexion',
      name: 'Assisted Cane/Wand Shoulder Flexion in Supine',
      category: 'physiotherapy',
      targetArea: 'Anterior Deltoid & Glenohumeral Capsule',
      repsOrDuration: '12 repetitions',
      sets: 3,
      frequency: '5 days per week',
      restIntervalSeconds: 60,
      prescribedRangeOfMotion: 'Target 0° to 135° elevation without arching back',
      instructions: [
        'Lie supine on an exercise mat with knees slightly bent.',
        'Grasp a light wand or cane with both hands shoulder-width apart.',
        'Use unaffected left arm to guide right arm overhead toward comfortable end-range.',
        'Pause for 2 seconds at comfortable ceiling point, then lower smoothly.'
      ],
      precautions: [
        'Cease motion if sharp pinching occurs at superior acromion.'
      ]
    },
    {
      id: 'ex_hand_extensor',
      name: 'Hand & Finger Tendon Gliding Sequence',
      category: 'hand_rehab',
      targetArea: 'Flexor Digitorum Superficialis & Profundus',
      repsOrDuration: '5 repetitions per gliding position',
      sets: 2,
      frequency: 'Daily',
      restIntervalSeconds: 30,
      prescribedRangeOfMotion: 'Full active fist to table-top position',
      instructions: [
        'Move fingers progressively through straight, hook, fist, and flat-fist configurations.',
        'Maintain gentle, continuous movement without forceful squeezing.'
      ],
      precautions: [
        'Perform slowly without jerking joint angles.'
      ]
    }
  ]
};

export const DEMO_SESSIONS: TherapySessionRecord[] = [
  {
    id: 'ses_20241015_01',
    patientId: 'usr_pat_8941',
    therapyPlanId: 'tp_shld_2024_01',
    planTitle: 'Post-Subacromial Decompression Phase II',
    date: '2024-10-15T09:30:00Z',
    durationMinutes: 24,
    exercisesCompleted: 4,
    totalExercises: 4,
    adherencePercentage: 100,
    patientReportedPainLevel: 2,
    observedRangeOfMotionAvg: 128,
    doctorReviewed: true,
    doctorNotes: 'Consistent scapular stabilization observed. Ready to progress to light theraband resistance in next clinic visit.',
    sessionType: 'guided_computer_vision'
  },
  {
    id: 'ses_20241013_02',
    patientId: 'usr_pat_8941',
    therapyPlanId: 'tp_shld_2024_01',
    planTitle: 'Post-Subacromial Decompression Phase II',
    date: '2024-10-13T16:15:00Z',
    durationMinutes: 22,
    exercisesCompleted: 4,
    totalExercises: 4,
    adherencePercentage: 100,
    patientReportedPainLevel: 3,
    observedRangeOfMotionAvg: 124,
    doctorReviewed: true,
    doctorNotes: 'Good session completion. Patient maintained good trunk posture during supine wand exercise.',
    sessionType: 'guided_computer_vision'
  },
  {
    id: 'ses_20241011_03',
    patientId: 'usr_pat_8941',
    therapyPlanId: 'tp_shld_2024_01',
    planTitle: 'Post-Subacromial Decompression Phase II',
    date: '2024-10-11T10:00:00Z',
    durationMinutes: 18,
    exercisesCompleted: 3,
    totalExercises: 4,
    adherencePercentage: 75,
    patientReportedPainLevel: 4,
    observedRangeOfMotionAvg: 118,
    doctorReviewed: false,
    sessionType: 'manual_log'
  }
];

export const DEMO_PATIENT_INTAKE: PatientIntakeData = {
  id: 'intk_8941_init',
  patientId: 'usr_pat_8941',
  patientName: 'Eleanor Vance',
  submittedDate: '2024-09-28',
  status: 'approved',
  chiefComplaint: 'Post-operative right shoulder stiffness, mild persistent ache along anterolateral acromion during overhead reaching.',
  affectedAnatomy: ['Right Shoulder', 'Right Scapular Region', 'Right Upper Arm'],
  painBaseline: 4,
  mobilityLimitationNotes: 'Difficulty putting on coat or reaching back pockets. Sleeps best with pillow support under right elbow.',
  surgicalHistory: 'Right arthroscopic subacromial decompression (Aug 2024). No prior joint replacements.',
  currentMedications: 'Acetaminophen 500mg PRN for post-exercise discomfort; daily multivitamin.',
  contraindications: ['No heavy unassisted resistance training > 5 lbs until Week 8 clearance'],
  consentGiven: true,
  consentTimestamp: '2024-09-28T14:22:10Z'
};

export const DEMO_DOCTOR_QUEUE: DoctorReviewQueueItem[] = [
  {
    id: 'dq_101',
    patientId: 'usr_pat_8941',
    patientName: 'Eleanor Vance',
    type: 'plan_renewal',
    urgency: 'medium',
    dateFlagged: '2024-10-16',
    description: 'Phase II protocol reaches 3-week completion mark. Review range-of-motion progression and approve Phase III resistance addition.',
    status: 'open'
  },
  {
    id: 'dq_102',
    patientId: 'usr_pat_7712',
    patientName: 'Robert Martinez',
    type: 'intake',
    urgency: 'high',
    dateFlagged: '2024-10-15',
    description: 'New cervical spine & lumbar intake submitted. Awaiting clinician contraindication screening.',
    status: 'open'
  },
  {
    id: 'dq_103',
    patientId: 'usr_pat_5509',
    patientName: 'Anita Desai',
    type: 'session_anomaly',
    urgency: 'medium',
    dateFlagged: '2024-10-14',
    description: 'Patient logged elevated VAS pain score (6/10) following eccentric quad loading session.',
    status: 'in_progress'
  }
];

export const DEMO_ESP32_DEVICE: ESP32DeviceStatus = {
  deviceId: 'ESP32-MED-BIOFEED-04',
  serialPort: 'COM3 / /dev/ttyUSB0',
  baudRate: 115200,
  connectionState: 'disconnected',
  firmwareVersion: 'v1.4.2-iasyn-biofeedback',
  lcdFeedbackReady: true,
  ledIndicatorsReady: true,
  audioFeedbackReady: true,
  lastHeartbeat: '2024-10-16T08:15:20Z'
};

export const DEMO_VISION_MODELS: VisionModelMetadata[] = [
  {
    modelId: 'vis_mp_pose_heavy',
    name: 'MediaPipe BlazePose 3D Kinematics',
    framework: 'MediaPipe Pose',
    version: '0.10.14-clinical-eval',
    targetFPS: 30,
    landmarkCount: 33,
    accuracyBenchmark: '98.4% joint angle repeatability in lab trials',
    status: 'ready'
  },
  {
    modelId: 'vis_mp_hands_dual',
    name: 'MediaPipe Dual Hand Landmark Pipeline',
    framework: 'MediaPipe Hands',
    version: '0.10.14',
    targetFPS: 30,
    landmarkCount: 21,
    accuracyBenchmark: 'Palmar flexion / extension resolution ~2°',
    status: 'ready'
  },
  {
    modelId: 'vis_cv_rom_analyzer',
    name: 'IASYN Real-Time Dynamic ROM & Symmetry Estimator',
    framework: 'OpenCV Kinematics',
    version: '1.2.0-beta',
    targetFPS: 60,
    landmarkCount: 33,
    accuracyBenchmark: 'Bilateral asymmetry detection threshold ±4°',
    status: 'experimental'
  }
];

export const DEMO_DATASETS: DatasetItem[] = [
  {
    id: 'ds_shld_kinematics_v2',
    name: 'Subacromial & Rotator Cuff Kinematic Validation Cohort',
    category: 'Upper-limb kinematics',
    sampleCount: 1240,
    consentTier: 'Fully Anonymized - IRB 2024',
    format: 'JSON 3D coordinates + anonymized video keypoints',
    lastUpdated: '2024-09-15',
    sizeMB: 384
  },
  {
    id: 'ds_hand_rehab_glides',
    name: 'Post-Surgical Finger Tendon Gliding Benchmark',
    category: 'Hand & wrist rehabilitation',
    sampleCount: 650,
    consentTier: 'Fully Anonymized - IRB 2024',
    format: 'HDF5 joint trajectories',
    lastUpdated: '2024-08-30',
    sizeMB: 195
  },
  {
    id: 'ds_pressure_point_logs',
    name: 'Guided Acupressure & Manual Trigger-Point Session Trajectories',
    category: 'Acupressure / Manual therapy',
    sampleCount: 420,
    consentTier: 'Research Permitted',
    format: 'Time-series sensor & pain feedback telemetry',
    lastUpdated: '2024-10-02',
    sizeMB: 78
  }
];

export const DEMO_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'aud_9981',
    timestamp: '2024-10-16 11:42:19',
    actor: 'Dr. Marcus Reynolds',
    role: 'doctor',
    action: 'REVIEW_SESSION_RECORD',
    resource: 'session:ses_20241015_01 (patient:usr_pat_8941)',
    ipAddress: '192.168.1.104',
    complianceFlag: 'normal'
  },
  {
    id: 'aud_9980',
    timestamp: '2024-10-16 09:15:02',
    actor: 'Eleanor Vance',
    role: 'patient',
    action: 'ACCESS_THERAPY_PLAN',
    resource: 'plan:tp_shld_2024_01',
    ipAddress: '74.125.19.82',
    complianceFlag: 'normal'
  },
  {
    id: 'aud_9979',
    timestamp: '2024-10-15 17:30:11',
    actor: 'Sarah Chen',
    role: 'admin',
    action: 'UPDATE_AI_MODEL_METADATA',
    resource: 'model:vis_mp_pose_heavy',
    ipAddress: '10.0.0.12',
    complianceFlag: 'normal'
  },
  {
    id: 'aud_9978',
    timestamp: '2024-10-15 14:02:44',
    actor: 'Sarah Chen',
    role: 'admin',
    action: 'EXPORT_AUDIT_SUMMARY',
    resource: 'compliance:monthly_irb_access',
    ipAddress: '10.0.0.12',
    complianceFlag: 'sensitive_access'
  }
];
