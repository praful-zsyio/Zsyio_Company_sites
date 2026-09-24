
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutUs from './pages/AboutUs'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ServicesPage from './pages/ServicesPage'
// import LoginPage from './pages/LoginPage'
import BackToTopButton from './components/BackToTopButton'
import ScrollToTop from './components/ScrollToTop'
import ContactPage from './pages/ContactPage'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { AuthProvider } from './context/AuthContext'
// import Chatbot from './components/Chatbot'

const App = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/login' element={<LoginPage />} /> */}
          <Route path='/about' element={<AboutUs />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:projectId' element={<ProjectDetailPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTopButton />
      {/* <Chatbot /> */}
    </AuthProvider>
  )
}

export default App