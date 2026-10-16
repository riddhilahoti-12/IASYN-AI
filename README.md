# IASYN AI — Multimodal Physiotherapy & Recovery Platform

> **Phase 1: Project Foundation, Clinical UI Design System & Navigation Architecture**

IASYN AI is an AI-driven multimodal platform for personalized physiotherapy, guided therapy monitoring, movement analysis, and longitudinal recovery assessment. The platform bridges clinician-directed care and patient rehabilitation through objective kinematic metrics, explainable clinical intelligence, and hardware biofeedback.

---

## 1. Phase 1 Architecture Overview

- **Frontend Core**: React 18 + TypeScript + Vite
- **UI Design System**: Tailwind CSS configured with a dedicated Light-Themed Healthcare Design System (white/soft slate surfaces, deep charcoal typography, clinical teal `#0D9488` and medical blue `#0284C7` primary accents, mint `#10B981` and lavender `#8B5CF6` chart accents).
- **Client Routing**: React Router v6 with separated portal shells:
  - **Public Landing Page** (`/`)
  - **Sign-In Development Shell** (`/signin`)
  - **Patient Portal Shell** (`/patient/*`)
  - **Doctor Portal Shell** (`/doctor/*`)
  - **Admin Portal Shell** (`/admin/*`)
- **Iconography**: Lucide React
- **Longitudinal Charts**: Recharts with observable joint range of motion (ROM) and patient pain VAS trajectories.
- **Future Integration Readiness**: Clean, typed domain models in `src/types/` and service boundary stubs in `src/services/` (prepared for Phase 2 FastAPI, Phase 3 MediaPipe/OpenCV, and Phase 4 ESP32 serial communication).

---

## 2. Directory & Component Structure

```
src/
├── app/
├── components/
│   ├── feedback/
│   │   ├── DisclaimerBanner.tsx     # Clinical & investigational safety disclosure
│   │   ├── FeaturePlaceholder.tsx   # Transparent future-phase contract component
│   │   └── EmptyState.tsx           # Standardized clinical empty state
│   ├── layout/
│   │   ├── Header.tsx               # Top navigation with role switcher & user menu
│   │   ├── Sidebar.tsx              # Portal-specific navigation sidebar
│   │   ├── Footer.tsx               # Clinical safety notes & regulatory alignment
│   │   └── PortalLayout.tsx         # Composite shell wrapper
│   └── ui/
│       ├── Badge.tsx                # Status indicators (active, pending, warning, clinical)
│       ├── Button.tsx               # Accessible primary, secondary, teal, outline buttons
│       ├── Card.tsx                 # Consistent card panels with subtle borders & shadow
│       └── Input.tsx                # Accessible input with labels, validation, and icons
├── context/
│   └── AuthContext.tsx              # Phase 1 demonstration auth & portal switching
├── features/
│   ├── auth/
│   │   └── SignInPage.tsx           # Sign-in form with Patient/Doctor/Admin role toggling
│   ├── landing/
│   │   └── LandingPage.tsx          # Public product landing, modalities, workflow
│   ├── patient/
│   │   ├── PatientDashboard.tsx     # Patient home, active plan, next session, ROM chart
│   │   ├── PatientProfilePage.tsx   # Demographics, MRN, rehabilitation goals
│   │   ├── PatientIntakePage.tsx    # Baseline mobility survey, contraindications
│   │   ├── PatientTherapyPlanPage.tsx # Detailed prescribed exercises & dosage
│   │   ├── PatientTherapyStudioPage.tsx # Studio launcher shell & pre-flight hardware checks
│   │   ├── PatientSessionHistoryPage.tsx # Audit log of past sessions & clinician notes
│   │   ├── PatientProgressReportsPage.tsx # Longitudinal ROM & adherence area charts
│   │   └── PatientAIAssistantPage.tsx   # Explainable assistant with cited clinical guidelines
│   ├── doctor/
│   │   ├── DoctorDashboard.tsx      # Assigned patient metrics, triage queues
│   │   ├── DoctorPatientListPage.tsx # Searchable patient roster & risk stratification
│   │   ├── DoctorIntakeReviewPage.tsx # Intake clearance & contraindication screening
│   │   ├── DoctorPlanManagementPage.tsx # Prescription editor & protocol builder
│   │   ├── DoctorSessionAnalysisPage.tsx # Session kinematic inspection & notes
│   │   ├── DoctorProgressReportsPage.tsx # Cohort analytics & recovery comparison
│   │   └── DoctorFollowUpQueuePage.tsx # Clinical intervention queue
│   └── admin/
│       ├── AdminDashboard.tsx       # System health, fleet status, audit summary
│       ├── AdminUserManagementPage.tsx # User accounts & permission administration
│       ├── AdminDoctorVerificationPage.tsx # Medical board credential verification
│       ├── AdminTherapyCataloguePage.tsx # Standardized exercise taxonomy
│       ├── AdminDeviceManagementPage.tsx # ESP32 biofeedback fleet & USB serial
│       ├── AdminAIModelRegistryPage.tsx # MediaPipe & OpenCV vision model zoo
│       ├── AdminDatasetRegistryPage.tsx # Anonymized kinematic cohorts & IRB consent
│       ├── AdminAuditLogsPage.tsx    # HIPAA compliant audit trail
│       └── AdminSystemSettingsPage.tsx # Platform endpoints & retention policies
├── routes/
│   └── AppRoutes.tsx                # Full application routing configuration
├── services/
│   ├── authService.ts               # Phase 1 mock authentication provider
│   ├── therapyService.ts            # Therapy plan and exercise queries
│   ├── sessionService.ts            # Session record persistence stub
│   ├── visionService.ts             # Web camera check & vision model metadata
│   ├── hardwareService.ts           # Web Serial capability check & ESP32 status
│   ├── aiAssistantService.ts        # Explainable clinical guidance with citations
│   └── mockData.ts                  # Clinically realistic demo datasets
├── types/
│   └── index.ts                     # Strict TypeScript domain interfaces
├── utils/
│   └── lodash-shims.js              # Standalone lodash helper library for Recharts
├── App.tsx                          # App root with BrowserRouter and AuthProvider
├── index.css                        # Tailwind directives & healthcare design tokens
└── main.tsx                         # Client application entry point
```

---

## 3. Installation & Running Locally

### Prerequisites
- Node.js (v18.0.0 or later, v24 recommended)
- npm (v9.0.0 or later)

### Install Dependencies
```powershell
npm install
```

### Start Development Server
```powershell
npm run dev
```
The application will launch at `http://127.0.0.1:5173/`.

### Run TypeScript Type Check & Production Build
```powershell
npm run build
```

---

## 4. Acceptance Criteria Checklist & Phase 1 Verification

| Requirement | Status | Notes |
|---|---|---|
| Starts using documented commands | Verified | Runs via `npm run dev` and `npm run build` |
| Builds without TypeScript errors | Verified | Clean compilation with 0 TS errors |
| Navigation items route to correct pages | Verified | 24 working routes configured |
| Three portal shells separated | Verified | Patient, Doctor, and Admin layouts with custom nav |
| Light healthcare theme consistent | Verified | Clean slate/white palette, teal/blue accents, no dark mode default |
| Responsive desktop & mobile layouts | Verified | Mobile drawer menus, responsive grid layouts |
| Form labels, validation & feedback | Verified | Sign-in form validates email/password with error states |
| Honest feature placeholders | Verified | Every future capability is transparently identified with target phase |
| No fake live camera or fake AI claims | Verified | Pre-flight camera checks exist without fabricating live joint angles |
| No broken imports or console errors | Verified | Aliased modules and shims compile cleanly |

---

## 5. Next Steps (Phase 2 Roadmap)
- Implement Python FastAPI backend (`/api/v1`)
- Establish real SQLite / PostgreSQL database schemas for Users, TherapyPlans, and Sessions
- Connect secure JWT / OAuth2 authentication replacing the Phase 1 demonstration auth shell
- Build REST and WebSocket endpoints for live session coordination
