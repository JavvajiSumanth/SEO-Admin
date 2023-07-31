import { Routes, Route, Navigate } from "react-router-dom";
import MinimalLayout from "../layout/MinimalLayout";
import MainLayout from "../layout/MainLayout";

import Dashboard from "../Components/Dashboard/Dashboard";
import LoginModal from "../layout/MainLayout/Header/Login";

export default function ROUTES() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          exact
          path="/"
          element={
            <MinimalLayout>
              <Dashboard />
            </MinimalLayout>
          }
        />

        <Route exact path="/login" element={<LoginModal />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
