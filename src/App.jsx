import React from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'

function App() {
  return (
    <div className='App theme'>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
