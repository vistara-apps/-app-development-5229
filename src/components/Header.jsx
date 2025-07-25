import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Calendar, Users, MapPin, Settings, BarChart3 } from 'lucide-react'
import MobileNav from './MobileNav'
import { cn } from '../utils/cn'

export default function Header() {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Shifts', href: '/shifts', icon: Calendar },
    { name: 'Workers', href: '/workers', icon: Users },
    { name: 'Locations', href: '/locations', icon: MapPin },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-neutral-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
            >
              Shift Sync
            </Link>
            
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105',
                      isActive
                        ? 'text-primary-600 bg-primary-50 shadow-soft border border-primary-200'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ConnectButton />
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
