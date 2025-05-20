import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContext } from './contexts/AppContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MeetingsPage from './pages/MeetingsPage';

function App() {
  const { currentUser } = useContext(AppContext);

  return (
    <Routes>
      <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/meetings" />} />
      <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/meetings" />} />
      <Route path="/meetings" element={currentUser ? <MeetingsPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={currentUser ? "/meetings" : "/login"} />} />
    </Routes>
  );
}

export default App;

