import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Calendar, Users, MapPin, Settings, BarChart3 } from 'lucide-react'
import { cn } from '../utils/cn'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Shifts', href: '/shifts', icon: Calendar },
    { name: 'Workers', href: '/workers', icon: Users },
    { name: 'Locations', href: '/locations', icon: MapPin },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-white shadow-large z-50 transform transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <Link
              to="/"
              className="text-xl font-bold text-primary-600"
              onClick={closeMenu}
            >
              Shift Sync
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                      isActive
                        ? 'text-primary-600 bg-primary-50 border border-primary-200'
                        : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200">
            <div className="text-sm text-neutral-500 text-center">
              Shift Sync v1.0
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileNav

