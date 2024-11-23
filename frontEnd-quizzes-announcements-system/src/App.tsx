import React from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Layout from "./components/share/Layout";
import Dashboard from "./pages/Dashboard";
import i18n from "./utils/i18n";
import { I18nextProvider } from "react-i18next";
import LanguageProvider from "./providers/LanguageContext";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { login, logout } from "./slices/authSlice";
import PrivateRoute from "./privateRoute/PrivateRoute";
import PublicRoute from "./privateRoute/PublicRoute";
import NotFound from "./components/share/NotFound";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = location.pathname.split("/")[1] || "en";

  const handleLogin = () => {
    dispatch(login("samarAli"));
    navigate(`en/dashboard`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(`${currentLang}/home`);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/en/home" replace />} />
          <Route
            path=":lang/home"
            element={
              <PublicRoute redirectTo={`/en/dashboard`}>
                <Home handleLogin={handleLogin} />
              </PublicRoute>
            }
          />
          <Route
            path=":lang/dashboard"
            element={
              <PrivateRoute redirectTo="/en/home">
                <Layout handleLogout={handleLogout}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path=":lang/schedule"
            element={
              <PrivateRoute redirectTo="/en/home">
                <Layout handleLogout={handleLogout}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path=":lang/courses"
            element={
              <PrivateRoute redirectTo="/en/home">
                <Layout handleLogout={handleLogout}>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path=":lang/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </I18nextProvider>
  );
};

export default App;
