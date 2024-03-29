import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Card from './components/Card/Card'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { useTheme } from './context/ThemeContext'
import Home from './pages/Home/Home'

function App() {
  const { theme } = useTheme()

  return (
    <div className={`App`} style={{ backgroundColor: `${theme}` }}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/event/:id' element={<Card />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
