import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import brandIcon from '../assets/logo.png'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/collections', label: 'Collections' },
  { path: '/poetry', label: 'Poetry' },
  { path: '/equipment', label: 'Equipment' },
  { path: '/phone-shots', label: 'Phone Shots' },
  { path: '/about', label: 'About' },
]

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <NavLink
          to="/"
          className="brand"
          aria-label="Cataphract Visuals home"
          onClick={closeMobileMenu}
        >
          <img
            src={brandIcon}
            alt=""
            className="brand-logo"
            aria-hidden="true"
          />
          <span className="brand-text">Cataphract Visuals</span>
        </NavLink>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={getNavLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={getNavLinkClass}
            onClick={closeMobileMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}

export default Navbar
