import React from 'react'
// 1. Import your specific logo file
import myLogo from '../assets/lugo.png' 

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-container animate-in">
      <div className="welcome-content">
        
        <div className="logo-wrapper">
          {/* 2. Use the imported variable here */}
          <img 
            src={myLogo} 
            alt="App Logo" 
            className="app-logo" 
          />
        </div>

        <h1 className="hero-title">Ma, anong ulam? 🍳</h1>
        <p className="hero-tagline">Para sa araw-araw na tanong ng pamilya.</p>
        
        <button className="btn-start" onClick={onStart}>
          
Tara, kain tayo
 ➔
        </button>

      </div>
    </div>
  )
}

export default WelcomeScreen