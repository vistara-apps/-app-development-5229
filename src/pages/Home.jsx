import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, Clock, CheckCircle, Zap } from 'lucide-react'
import { usePaymentContext } from '../hooks/usePaymentContext'

export default function Home() {
  const [isPremium, setIsPremium] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const { createSession } = usePaymentContext()

  const handleUpgradeToPremium = async () => {
    try {
      setIsPaymentLoading(true)
      await createSession()
      setIsPremium(true)
      alert('Successfully upgraded to Premium! You now have access to all features.')
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsPaymentLoading(false)
    }
  }

  const features = [
    {
      icon: Calendar,
      title: 'Instant Shift Posting',
      description: 'Post open shifts and get them filled within minutes by qualified workers.',
      free: true
    },
    {
      icon: Users,
      title: 'Smart Worker Matching',
      description: 'Automatically match shifts with workers based on skills, location, and availability.',
      free: false
    },
    {
      icon: MapPin,
      title: 'Location-Based Optimization',
      description: 'Find the closest available workers to minimize travel time and costs.',
      free: false
    },
    {
      icon: Clock,
      title: 'Automated Payroll Sync',
      description: 'Hours are tracked and synced with your payroll system automatically.',
      free: false
    },
    {
      icon: CheckCircle,
      title: 'Smart Approvals',
      description: 'Automated shift approvals based on your business rules and preferences.',
      free: true
    },
    {
      icon: Zap,
      title: 'Real-time Notifications',
      description: 'Instant SMS and push notifications for all shift updates and changes.',
      free: false
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Seamless shift management and worker matching,<br />
          <span className="text-primary">so your business runs like clockwork.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fill open shifts instantly, automate approvals, and sync with payroll - all in one platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/dashboard" className="btn btn-primary btn-lg">
            Start Free Trial
          </Link>
          {!isPremium && (
            <button 
              onClick={handleUpgradeToPremium}
              disabled={isPaymentLoading}
              className="btn btn-secondary btn-lg disabled:opacity-50"
            >
              {isPaymentLoading ? 'Processing...' : 'Upgrade to Premium ($9/month)'}
            </button>
          )}
        </div>
        {isPremium && (
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Premium Member</span>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Everything you need to manage shifts</h2>
          <p className="text-lg text-gray-600 mt-2">Powerful features to streamline your workforce management</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isAccessible = feature.free || isPremium
            
            return (
              <div 
                key={index} 
                className={`card p-6 space-y-4 relative ${!isAccessible ? 'opacity-60' : ''}`}
              >
                {!isAccessible && (
                  <div className="absolute top-4 right-4 bg-warning text-white text-xs px-2 py-1 rounded">
                    Premium
                  </div>
                )}
                <div className={`inline-flex p-3 rounded-lg ${isAccessible ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white rounded-2xl p-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">90%</div>
            <div className="text-blue-100 mt-2">Faster shift filling</div>
          </div>
          <div>
            <div className="text-4xl font-bold">50+</div>
            <div className="text-blue-100 mt-2">Hours saved per week</div>
          </div>
          <div>
            <div className="text-4xl font-bold">95%</div>
            <div className="text-blue-100 mt-2">Worker satisfaction rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gray-50 rounded-2xl p-12 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Ready to transform your shift management?</h2>
        <p className="text-lg text-gray-600">Join thousands of businesses already using Shift Sync</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Get Started Today
        </Link>
      </section>
    </div>
  )
}