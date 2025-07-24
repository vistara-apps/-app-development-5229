import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Shifts from './pages/Shifts'
import Workers from './pages/Workers'
import Locations from './pages/Locations'
import Settings from './pages/Settings'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shifts" element={<Shifts />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}

export default App