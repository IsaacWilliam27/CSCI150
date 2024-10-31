import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Login from './Login'
import Register from './Register'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const { user } = useAuth()

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  // Dashboard layout wrapper
  const DashboardLayout = () => (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Home />
    </div>
  )

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        user ? <Navigate to="/" replace /> : <Login />
      } />
      <Route path="/register" element={
        user ? <Navigate to="/" replace /> : <Register />
      } />

      {/* Protected dashboard route */}
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />

      {/* Add any other routes your app needs */}
    </Routes>
  )
}

export default App