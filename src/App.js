import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect, Suspense, lazy } from 'react';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { AppProvider, AppContext } from './context/AppContext';

import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import AddPinForm from './components/AddPinForm';
import SavedPins from './components/SavedPins';
import CreatedPins from './components/CreatedPins';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import './App.css';

const PinDetail = lazy(() => import('./pages/PinDetail'));
const ProfileLayout = lazy(() => import('./pages/ProfileLayout'));

function PageLoader() {
  return <div className="page-message">Загрузка страницы...</div>;
}

function MainLayout() {
  const { user, openLogin } = useAuthContext();
  const { handleAddPin, showToast } = useContext(AppContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    if (!user) {
      openLogin();
      return;
    }
    setIsFormOpen(true);
  };

  const handleAdd = async (pin) => {
    const ok = await handleAddPin(pin);
    if (ok) setIsFormOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar onOpenForm={handleOpenForm} onComingSoon={(message) => showToast(message)} />

      <main className="main-content">
        <Outlet />
      </main>

      {isFormOpen && <AddPinForm onAdd={handleAdd} onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

function AppContent() {
  const { isLoginOpen, openLogin, closeLogin } = useAuthContext();
  const { toastMessage } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openLogin) {
      openLogin();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, openLogin, navigate]);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/pin/:id" element={<PinDetail />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="saved" replace />} />
                <Route path="saved" element={<SavedPins />} />
                <Route path="created" element={<CreatedPins />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {isLoginOpen && <Login onClose={closeLogin} />}

      <Toast message={toastMessage} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
