import { useContext, useState, useEffect } from 'react'
import api from './services/api';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDetail from './pages/CourseDetail';
import Navbar from './components/layout/Navbar';
import { AuthContext } from './context/AuthContext';
import GuestRoute from './components/GuestRoute';
import { InstrumentProvider } from './context/InstrumentContext';
import Instruments from './pages/Instruments';
import Tuner from './pages/Tuner';
import Courses from './pages/Courses';
import Practice from './pages/Practice';
import AdminPanel from './pages/admin/AdminPanel';
import LessonDetail from './pages/LessonDetail';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <InstrumentProvider>

        {user && <Navbar />}

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            }
          />

          <Route path="/lessons/:id" 
            element={
              <ProtectedRoute>
                <LessonDetail />
              </ProtectedRoute>
            }
          />

          <Route path="/instruments"
            element={
              <ProtectedRoute>
                <Instruments />
              </ProtectedRoute>
            }
          />

          <Route path="/tuner"
            element={
              <ProtectedRoute>
                <Tuner />
              </ProtectedRoute>
            }
          />

          <Route path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />

          <Route path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

        </Routes>
      </InstrumentProvider>
    </BrowserRouter>
  );
}

export default App
