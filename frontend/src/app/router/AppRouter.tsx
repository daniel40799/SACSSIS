import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import StudentDashboardPage from "@/features/students/pages/StudentDashboardPage";
import FacultyDashboardPage from "@/features/faculty/pages/FacultyDashboardPage";
import RegistrarDashboardPage from "@/features/registrar/pages/RegistrarDashboardPage";
import BusinessOfficePage from "@/features/businessOffice/pages/BusinessOfficeDashboardPage";
import SuperAdminPage from "@/features/superAdmin/pages/SuperAdminDashboardPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                <Route path="/faculty/dashboard" element={<FacultyDashboardPage />} />
                <Route path="/registrar/dashboard" element={<RegistrarDashboardPage />} />
                <Route path="/businessOffice/dashboard" element={<BusinessOfficePage />} />
                <Route path="/superAdmin/dashboard" element={<SuperAdminPage />} />

            </Routes>
        </BrowserRouter>
    );
}