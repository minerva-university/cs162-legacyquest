import './App.css'
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ThemeTestPage from './pages/ThemeTestPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from '@services/AuthContext.jsx';
import ProtectedRoute from '@services/ProtectedRoutes.jsx';

const theme = createTheme({
  palette: {
    shadowBrown: '#8B6B4C33',
    shadowGray: '#8B6B4C33'
  },
  typography:{
    fontFamily: 'Nunito, sans-serif',
    h1: {fontSize: '3rem', fontWeight: 700 },
    h2: {fontSize: '2.5rem', fontWeight: 600 },
    h3: {fontSize: '2rem', fontWeight: 600 },
    h4: {fontSize: '1.75rem', fontWeight: 500 },
    h5: {fontSize: '1.5rem', fontWeight: 500 },
    h6: {fontSize: '1.25rem', fontWeight: 500 },
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route 
                path='/dashboard' 
                element={
                  <ProtectedRoute requiredRole="user" redirectPath="/login">
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path='/admin' 
                element={
                  <ProtectedRoute requiredRole="admin" redirectPath="/login">
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/theme-test' element={<ThemeTestPage />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App