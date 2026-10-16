# IASYN AI — Multimodal Physiotherapy & Recovery Platform

> **Phase 2 Complete: Backend Architecture, Secure Authentication & Database Persistence**

IASYN AI is an AI-driven multimodal platform for personalized physiotherapy, guided therapy monitoring, movement analysis, and longitudinal recovery assessment. The platform bridges clinician-directed care and patient rehabilitation through objective kinematic metrics, explainable clinical intelligence, and hardware biofeedback.

---

## 1. Architecture Overview

### Frontend Core
- **Framework**: React 18 + TypeScript + Vite
- **UI Design System**: Tailwind CSS configured with a dedicated Light-Themed Healthcare Design System (white/soft slate surfaces, deep charcoal typography, clinical teal `#0D9488` and medical blue `#0284C7` primary accents, mint `#10B981` and lavender `#8B5CF6` chart accents).
- **Client Routing & RBAC Guards**: React Router v6 with strict permission-based portal wrappers:
  - **Public Landing Page** (`/`)
  - **Secure Sign-In** (`/signin`)
  - **Patient Portal Shell** (`/patient/*`) — strictly for role `PATIENT`
  - **Doctor Portal Shell** (`/doctor/*`) — strictly for role `DOCTOR`
  - **Admin Portal Shell** (`/admin/*`) — strictly for role `ADMIN`
- **Iconography**: Lucide React
- **Longitudinal Charts**: Recharts with observable joint range of motion (ROM) and patient pain VAS trajectories.
- **Typed API Client**: Fetch-based client with HttpOnly cookie handling, Bearer token fallback, automatic session-expiration interception (401 redirection), and Vite reverse-proxy integration.

### Backend Core (Phase 2)
- **Framework**: FastAPI (Python 3.11 / 3.12 compatible)
- **Validation & Serialization**: Pydantic v2 with `ConfigDict(from_attributes=True)`
- **ORM & Database**: SQLAlchemy 2 + Alembic schema migrations
- **Storage Target**: SQLite default for local development (`backend/iasyn_dev.db`), PostgreSQL connection string compatible for cloud staging/production.
- **Security & Cryptography**: Direct `bcrypt` password hashing, signed JWT session tokens, and secure `HttpOnly`, `SameSite=Lax` cookies.
- **Clinical Governance**: HIPAA-aligned audit log stream (`AuditLog`) capturing security and clinical events.
- **Tenant & Clinical Isolation**: Strict backend enforcement preventing cross-patient record access and barring clinicians from unassigned patient dossiers.

---

## 2. Directory Structure

```
IASYN AI/
├── backend/
│   ├── alembic/                 # Alembic migration environment & scripts
│   │   ├── versions/            # Migration revisions (e.g., initial_schema)
│   │   └── env.py
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py          # DB session, JWT decode & role dependencies
│   │   │   └── v1/
│   │   │       ├── admin.py     # User status, doctor verification, audit logs, system stats
│   │   │       ├── auth.py      # /login, /logout, /me with role derivation
│   │   │       ├── doctors.py   # Assigned patients, clinical reviews, session feedback
│   │   │       ├── patients.py  # Self-profile, assigned plans, session logs
│   │   │       ├── router.py    # Master v1 router
│   │   │       ├── sessions.py  # Rehab session records
│   │   │       └── therapy_plans.py # Prescription CRUD & clinician approval
│   │   ├── core/
│   │   │   ├── config.py        # Pydantic Settings & environment variables
│   │   │   └── security.py      # Bcrypt hashing & PyJWT token generator
│   │   ├── db/
│   │   │   ├── base.py          # Base model registry for Alembic
│   │   │   ├── seed.py          # Fictional demonstration account seeder
│   │   │   └── session.py       # SQLAlchemy 2 engine & session factory
│   │   ├── models/              # SQLAlchemy 2 models (User, PatientProfile, DoctorProfile, etc.)
│   │   ├── schemas/             # Pydantic v2 DTOs & validation schemas
│   │   ├── services/            # Clinical audit service
│   │   └── main.py              # FastAPI app lifespan, CORS, healthcheck
│   ├── tests/                   # Pytest test suite (15 automated tests)
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_roles.py
│   │   └── test_therapy_plans.py
│   ├── requirements.txt         # Pinned backend dependencies
│   └── .env.example             # Backend configuration template
├── src/                         # React 18 Frontend
│   ├── components/              # UI components, layout shells, feedback banners
│   ├── context/                 # AuthContext (real backend session tracking)
│   ├── features/                # Portals (Patient, Doctor, Admin, Auth, Landing)
│   ├── routes/                  # AppRoutes with ProtectedRoute wrappers
│   ├── services/                # apiClient, authService, therapyService, sessionService
│   └── types/                   # TypeScript clinical models & interfaces
├── package.json
├── vite.config.ts               # Vite bundler with /api proxy to FastAPI
└── README.md
```

---

## 3. Quick Start & Setup

### Prerequisites
- Node.js (v18+ or v20+)
- Python 3.11 or 3.12 (or `uv` package manager)

### Backend Setup

1. **Navigate to the backend directory and create virtual environment**:
   ```bash
   cd backend
   # Using uv:
   uv venv .venv --python 3.12
   # Or using standard python:
   python -m venv .venv
   ```

2. **Activate the virtual environment**:
   - **Windows**:
     ```powershell
     .venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source .venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   # Or with uv:
   uv pip install -r requirements.txt
   ```

4. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```

5. **Run database migrations**:
   ```bash
   alembic upgrade head
   ```

6. **Seed demonstration clinical accounts**:
   ```bash
   python -m app.db.seed
   ```

7. **Start the FastAPI backend server**:
   ```bash
   uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   - Interactive OpenAPI documentation available at: `http://127.0.0.1:8000/api/v1/docs`
   - Healthcheck: `http://127.0.0.1:8000/health`

---

### Frontend Setup

1. **In the root directory, install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   - Application runs at: `http://127.0.0.1:5173/`
   - Requests to `/api/*` are automatically reverse-proxied to `http://127.0.0.1:8000/api/*`.

3. **Verify TypeScript compilation and production build**:
   ```bash
   npm run build
   ```

---

## 4. Demonstration Accounts & Credentials

The seed command creates clearly fictional, non-PHI demonstration accounts:

| Portal | Email | Password | Role | Description |
|---|---|---|---|---|
| **Patient** | `patient.demo@iasyn.ai` | `ClinicalPass2026!` | `PATIENT` | Elena Rostova (Right MCA Stroke Recovery, MRN `IAS-2026-9042`) |
| **Doctor** | `doctor.demo@iasyn.ai` | `ClinicalPass2026!` | `DOCTOR` | Dr. Marcus Vance, PT, DPT (Licence `PT-NY-98421-DEMO`) |
| **Admin** | `admin.demo@iasyn.ai` | `ClinicalPass2026!` | `ADMIN` | Clinical Administrator (Governance & Compliance Registry) |

*Note: On the Sign-In page (`/signin`), quick demonstration buttons pre-populate credentials for convenience. The authenticated role is strictly derived from the backend database user record upon login.*

---

## 5. Automated Tests

Run the complete backend automated test suite:
```bash
cd backend
.venv\Scripts\pytest -v
```

### Verified Test Cases:
1. `test_correct_login`: Validates password hash, returns JWT token and sets secure HttpOnly cookie.
2. `test_incorrect_password`: Rejects invalid credentials with 401 Unauthorized.
3. `test_unregistered_email`: Rejects unregistered accounts with 401 Unauthorized.
4. `test_get_current_user_me`: Verifies `/api/v1/auth/me` with Bearer token.
5. `test_expired_session_handling`: Validates expired tokens are rejected with 401 Unauthorized.
6. `test_logout`: Verifies `/api/v1/auth/logout` and clearing of session cookies.
7. `test_patient_route_protection`: Ensures non-patients cannot access `/patients/me`.
8. `test_doctor_route_protection`: Ensures non-doctors cannot access `/doctors/patients`.
9. `test_admin_route_protection`: Ensures non-admins cannot access `/admin/users` or `/admin/stats`.
10. `test_patient_cross_access_isolation`: Ensures Patient A cannot access Patient B's therapy plan (403 Forbidden).
11. `test_doctor_unassigned_patient_access_isolation`: Ensures Doctor B cannot view records of an unassigned patient (403 Forbidden).
12. `test_doctor_creates_plan_for_assigned_patient`: Validates prescription creation.
13. `test_doctor_cannot_create_plan_for_unassigned_patient`: Forbids prescription for unassigned patients.
14. `test_invalid_therapy_plan_input`: Enforces Pydantic v2 input validations (422 Unprocessable Entity).
15. `test_doctor_approves_plan`: Verifies plan lifecycle state transition to `APPROVED`.

---

## 6. Regulatory & Clinical Safety Disclosure

> **Clinical Notice**: IASYN AI is an investigational software platform designed for evaluation and paired clinician-directed therapy. Kinematic estimations and biofeedback telemetry do not constitute autonomous medical diagnoses. Clinical treatment plans must be authored, reviewed, and approved by a licensed healthcare professional.
