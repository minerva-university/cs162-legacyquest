import './App.css'
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ThemeTestPage from './pages/ThemeTestPage';
import LoginPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';

const theme = createTheme({
  typography:{
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/sign-up' element={<LoginPage />} />
            <Route path='/theme-test' element={<ThemeTestPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
