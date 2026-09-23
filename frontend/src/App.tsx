import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ResourcePage } from "./pages/ResourcePage";
import { ReservationPage } from "./pages/ReservationPage";
import ResourceDetailPage from "./pages/ResourceDetailPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminResourcePage from "./pages/AdminResourcePage";
import AdminResourceDetailPage from "./pages/AdminResourceDetailPage";
import AdminResourceEditPage from "./pages/AdminResourceEditPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route element={<AdminRoute />}>
            <Route path="/admin/resources" element={<AdminResourcePage />} />
            <Route path="/admin/resources/:id" element={<AdminResourceDetailPage />} />
            <Route path="/admin/resources/:id/edit" element={<AdminResourceEditPage />} />
          </Route>
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/reservations" element={<ReservationPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
