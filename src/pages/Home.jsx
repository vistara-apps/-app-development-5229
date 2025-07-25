import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, Clock, CheckCircle, Zap, ArrowRight, Star } from 'lucide-react'
import { usePaymentContext } from '../hooks/usePaymentContext'
import Button from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import Badge from '../components/ui/Badge'

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
    <div className="space-y-20 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="space-y-6">
          <Badge variant="primary" className="mb-4">
            <Star className="h-3 w-3 mr-1" />
            Trusted by 1000+ businesses
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight">
            Seamless shift management and worker matching,<br />
            <span className="text-gradient">so your business runs like clockwork.</span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Fill open shifts instantly, automate approvals, and sync with payroll - all in one platform.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            className="group"
            rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
          >
            <Link to="/dashboard">Start Free Trial</Link>
          </Button>
          
          {!isPremium && (
            <Button 
              variant="outline"
              size="lg"
              onClick={handleUpgradeToPremium}
              loading={isPaymentLoading}
            >
              {isPaymentLoading ? 'Processing...' : 'Upgrade to Premium ($9/month)'}
            </Button>
          )}
        </div>
        
        {isPremium && (
          <div className="inline-flex items-center space-x-2 bg-success-50 text-success-700 px-4 py-2 rounded-full border border-success-200 animate-scale-in">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Premium Member</span>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Everything you need to manage shifts
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Powerful features to streamline your workforce management and boost productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isAccessible = feature.free || isPremium
            
            return (
              <Card 
                key={index} 
                className={`relative group hover:shadow-large transition-all duration-300 ${
                  !isAccessible ? 'opacity-75' : ''
                }`}
                interactive
              >
                <CardContent className="p-6 space-y-4">
                  {!isAccessible && (
                    <Badge variant="warning" className="absolute top-4 right-4">
                      Premium
                    </Badge>
                  )}
                  
                  <div className={`inline-flex p-3 rounded-xl transition-colors ${
                    isAccessible 
                      ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white' 
                      : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-3xl p-12 shadow-large">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-5xl font-bold animate-pulse-soft">90%</div>
            <div className="text-primary-100 text-lg">Faster shift filling</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold animate-pulse-soft">50+</div>
            <div className="text-primary-100 text-lg">Hours saved per week</div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-bold animate-pulse-soft">95%</div>
            <div className="text-primary-100 text-lg">Worker satisfaction rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-12 space-y-8 border border-neutral-200">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Ready to transform your shift management?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of businesses already using Shift Sync to streamline their operations
          </p>
        </div>
        
        <Button 
          size="lg" 
          className="group shadow-medium hover:shadow-large"
          rightIcon={<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
        >
          <Link to="/dashboard">Get Started Today</Link>
        </Button>
      </section>
    </div>
  )
}
