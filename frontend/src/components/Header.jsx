import React from 'react'
import myLogo from '../assets/lugo.png'

const Header = () => {
    return (
        <header className="app-header">
            <div className="container">
                <div className="header-content">
                    {/* The Logo Image */}
                    <img src={myLogo} alt="Logo" className="header-logo" />
                    
                    {/* The Title and Tagline */}
                    <h1 className="app-title">Ma, anong ulam?</h1>
                    <p className="app-tagline">Para sa araw-araw na tanong ng pamilya.</p>
                </div>
            </div>
        </header>
    )
}

export default Header