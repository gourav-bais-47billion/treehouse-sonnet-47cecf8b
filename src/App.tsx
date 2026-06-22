import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppDispatch, useAppSelector } from './store';
import { setUser, logout } from './store/authSlice';
import treehouseTheme from './theme';
import Shell from './components/Shell';

// Page imports
import LoginViaAimPortalSso from './pages/LoginViaAimPortalSso';
import EmergencyLogin from './pages/EmergencyLogin';
import FrontOfficeHome from './pages/FrontOfficeHome';
import DataGovernanceAdminHome from './pages/DataGovernanceAdminHome';
import ReadOnlyUserHome from './pages/ReadOnlyUserHome';
import AuditUserHome from './pages/AuditUserHome';
import SystemAdminHome from './pages/SystemAdminHome';
import SubmitPortfolioRequest from './pages/SubmitPortfolioRequest';
import PortfolioSubmissionResults from './pages/PortfolioSubmissionResults';
import ViewPortfolioDetail from './pages/ViewPortfolioDetail';
import SearchAndListPortfolios from './pages/SearchAndListPortfolios';
import ReclassifyPortfolio from './pages/ReclassifyPortfolio';
import MyRequestsDashboard from './pages/MyRequestsDashboard';
import ViewMappingTables from './pages/ViewMappingTables';
import QueryAuditTrail from './pages/QueryAuditTrail';
import PortfolioSetupTimeReport from './pages/PortfolioSetupTimeReport';
import AuditComplianceReport from './pages/AuditComplianceReport';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Check session on mount.
  // PREVIEW MOCK: no backend is running, so skip the real /auth/me call and
  // log in as a mock system-admin so all routes/pages are reachable for preview.
  useEffect(() => {
    dispatch(
      setUser({
        id: 'mock-user-1',
        email: 'preview.user@treehouse.local',
        name: 'Preview Admin',
        role: 'system-admin',
        groups: ['system-admin'],
      })
    );
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <ThemeProvider theme={treehouseTheme}>
      <CssBaseline />
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginViaAimPortalSso />} />
          <Route path="/emergency-login" element={<EmergencyLogin />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  {auth.user?.role === 'front-office' && (
                    <FrontOfficeHome />
                  )}
                  {auth.user?.role === 'data-governance-admin' && (
                    <DataGovernanceAdminHome />
                  )}
                  {auth.user?.role === 'read-only' && (
                    <ReadOnlyUserHome />
                  )}
                  {auth.user?.role === 'audit' && (
                    <AuditUserHome />
                  )}
                  {auth.user?.role === 'system-admin' && (
                    <SystemAdminHome />
                  )}
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/submit-portfolio"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <SubmitPortfolioRequest />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/portfolio-results/:portfolioId"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <PortfolioSubmissionResults />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/portfolio/:portfolioId"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <ViewPortfolioDetail />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/portfolios"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <SearchAndListPortfolios />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reclassify/:portfolioId"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <ReclassifyPortfolio />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-requests"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <MyRequestsDashboard />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/mapping-tables"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <ViewMappingTables />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/audit-trail"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <QueryAuditTrail />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/setup-time-report"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <PortfolioSetupTimeReport />
                </Shell>
              </ProtectedRoute>
            }
          />

          <Route
            path="/compliance-report"
            element={
              <ProtectedRoute>
                <Shell user={auth.user} onLogout={handleLogout}>
                  <AuditComplianceReport />
                </Shell>
              </ProtectedRoute>
            }
          />

          {/* Redirect root to home or login */}
          <Route
            path="/"
            element={
              auth.isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
