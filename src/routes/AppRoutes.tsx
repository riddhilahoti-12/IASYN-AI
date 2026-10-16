import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/landing/LandingPage';
import { SignInPage } from '../features/auth/SignInPage';
import { PortalLayout } from '../components/layout/PortalLayout';

// Patient Portal Views
import { PatientDashboard } from '../features/patient/PatientDashboard';
import { PatientProfilePage } from '../features/patient/PatientProfilePage';
import { PatientIntakePage } from '../features/patient/PatientIntakePage';
import { PatientTherapyPlanPage } from '../features/patient/PatientTherapyPlanPage';
import { PatientTherapyStudioPage } from '../features/patient/PatientTherapyStudioPage';
import { PatientSessionHistoryPage } from '../features/patient/PatientSessionHistoryPage';
import { PatientProgressReportsPage } from '../features/patient/PatientProgressReportsPage';
import { PatientAIAssistantPage } from '../features/patient/PatientAIAssistantPage';

// Doctor Portal Views
import { DoctorDashboard } from '../features/doctor/DoctorDashboard';
import { DoctorPatientListPage } from '../features/doctor/DoctorPatientListPage';
import { DoctorIntakeReviewPage } from '../features/doctor/DoctorIntakeReviewPage';
import { DoctorPlanManagementPage } from '../features/doctor/DoctorPlanManagementPage';
import { DoctorSessionAnalysisPage } from '../features/doctor/DoctorSessionAnalysisPage';
import { DoctorProgressReportsPage } from '../features/doctor/DoctorProgressReportsPage';
import { DoctorFollowUpQueuePage } from '../features/doctor/DoctorFollowUpQueuePage';

// Admin Portal Views
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { AdminUserManagementPage } from '../features/admin/AdminUserManagementPage';
import { AdminDoctorVerificationPage } from '../features/admin/AdminDoctorVerificationPage';
import { AdminTherapyCataloguePage } from '../features/admin/AdminTherapyCataloguePage';
import { AdminDeviceManagementPage } from '../features/admin/AdminDeviceManagementPage';
import { AdminAIModelRegistryPage } from '../features/admin/AdminAIModelRegistryPage';
import { AdminDatasetRegistryPage } from '../features/admin/AdminDatasetRegistryPage';
import { AdminAuditLogsPage } from '../features/admin/AdminAuditLogsPage';
import { AdminSystemSettingsPage } from '../features/admin/AdminSystemSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* Patient Portal */}
      <Route path="/patient" element={<PortalLayout expectedRole="patient" />}>
        <Route index element={<PatientDashboard />} />
        <Route path="profile" element={<PatientProfilePage />} />
        <Route path="intake" element={<PatientIntakePage />} />
        <Route path="therapy-plan" element={<PatientTherapyPlanPage />} />
        <Route path="therapy-studio" element={<PatientTherapyStudioPage />} />
        <Route path="history" element={<PatientSessionHistoryPage />} />
        <Route path="reports" element={<PatientProgressReportsPage />} />
        <Route path="assistant" element={<PatientAIAssistantPage />} />
      </Route>

      {/* Doctor Portal */}
      <Route path="/doctor" element={<PortalLayout expectedRole="doctor" />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="patients" element={<DoctorPatientListPage />} />
        <Route path="intakes" element={<DoctorIntakeReviewPage />} />
        <Route path="plans" element={<DoctorPlanManagementPage />} />
        <Route path="sessions" element={<DoctorSessionAnalysisPage />} />
        <Route path="reports" element={<DoctorProgressReportsPage />} />
        <Route path="queue" element={<DoctorFollowUpQueuePage />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<PortalLayout expectedRole="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserManagementPage />} />
        <Route path="verification" element={<AdminDoctorVerificationPage />} />
        <Route path="catalogue" element={<AdminTherapyCataloguePage />} />
        <Route path="devices" element={<AdminDeviceManagementPage />} />
        <Route path="models" element={<AdminAIModelRegistryPage />} />
        <Route path="datasets" element={<AdminDatasetRegistryPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
        <Route path="settings" element={<AdminSystemSettingsPage />} />
      </Route>

      {/* Fallback to Landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
