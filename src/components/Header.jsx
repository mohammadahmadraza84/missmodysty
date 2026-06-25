import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, Search } from 'lucide-react'

const navLinks = [
  { to: '/discover',   label: 'Discover' },
  { to: '/ai-stylist', label: 'AI Stylist' },
  { to: '/try-on',     label: 'Virtual Try-On' },
  { to: '/about',      label: 'About' },
]

export default function Header() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [pathname])

  const headerBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-ivory shadow-sm'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-plum-900'
  const logoColor = isHome && !scrolled ? 'text-white' : 'text-plum-900'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className={`font-display text-2xl md:text-3xl font-light italic tracking-wide ${logoColor} transition-colors`}>
              Miss Modysty
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-gold-500'
                      : isHome && !scrolled
                        ? 'text-white/80 hover:text-white'
                        : 'text-plum-700 hover:text-gold-500'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className={`${isHome && !scrolled ? 'text-white/80 hover:text-white' : 'text-plum-700 hover:text-gold-500'} transition-colors`}>
              <Search size={20} />
            </button>
            <Link to="/ai-stylist" className="btn-gold text-sm flex items-center gap-2">
              <Sparkles size={14} />
              Style Me
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${textColor} transition-colors`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-ivory border-t border-blush">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-body text-base py-2 border-b border-blush/50 ${
                    isActive ? 'text-gold-500' : 'text-plum-800'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/ai-stylist" className="btn-gold text-sm flex items-center justify-center gap-2 mt-2">
              <Sparkles size={14} />
              Style Me with AI
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
