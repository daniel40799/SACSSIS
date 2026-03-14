import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import AuthCallbackPage from "@/features/auth/pages/AuthCallbackPage";
import StudentDashboardPage from "@/features/students/pages/StudentDashboardPage";
import FacultyDashboardPage from "@/features/faculty/pages/FacultyDashboardPage";
import RegistrarDashboardPage from "@/features/registrar/pages/RegistrarDashboardPage";
import BusinessOfficePage from "@/features/businessOffice/pages/BusinessOfficeDashboardPage";
import SuperAdminPage from "@/features/superAdmin/pages/SuperAdminDashboardPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                <Route path="/faculty/dashboard" element={<FacultyDashboardPage />} />
                <Route path="/registrar/dashboard" element={<RegistrarDashboardPage />} />
                <Route path="/businessOffice/dashboard" element={<BusinessOfficePage />} />
                <Route path="/superAdmin/dashboard" element={<SuperAdminPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}