import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/admin/ProtectedRoute'

import HomePage from './pages/public/HomePage'
import PortfolioPage from './pages/public/PortfolioPage'
import ProjectDetailPage from './pages/public/ProjectDetailPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'

import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App