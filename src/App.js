import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useContext } from 'react'; 
import { AppProvider, AppContext } from './context/AppContext'; 

import PinDetail from './pages/PinDetail';       
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AddPinForm from './components/AddPinForm';
import ProfileLayout from './pages/ProfileLayout'; 
import SavedPins from './components/SavedPins';     
import Login from './pages/Login'; // Импорт компонента логина
import ProtectedRoute from './components/ProtectedRoute'; 
import './App.css';

function AppContent() {
  // Достали isLoginOpen из контекста
  const { theme, toggleTheme, handleAddPin, isLoginOpen } = useContext(AppContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar onOpenForm={() => setIsFormOpen(true)} theme={theme} toggleTheme={toggleTheme} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* РОУТ /login МЫ УДАЛИЛИ ОТСЮДА */}
        <Route path="/pin/:id" element={<PinDetail />} />
        
        {/* ЗАЩИЩАЕМ РОУТ СОЗДАНИЯ */}
        <Route path="/create" element={
          <ProtectedRoute>
            <div className="create-page-wrapper">
              <AddPinForm onAdd={handleAddPin} onClose={() => window.history.back()} />
            </div>
          </ProtectedRoute>
        } />
        
        {/* ЗАЩИЩАЕМ РОУТ ПРОФИЛЯ */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="saved" replace />} />
          <Route path="saved" element={<SavedPins />} />
        </Route>

        <Route path="*" element={<div style={{padding: "100px"}}><h2>404 - Страница не найдена</h2></div>} />
      </Routes>
      
      {/* МОДАЛЬНЫЕ ОКНА: они рендерятся поверх всех страниц */}
      {isFormOpen && (
        <ProtectedRoute>
          <AddPinForm onClose={() => setIsFormOpen(false)} onAdd={handleAddPin} />
        </ProtectedRoute>
      )}

      {/* НАША НОВАЯ МОДАЛКА ЛОГИНА */}
      {isLoginOpen && <Login />}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}