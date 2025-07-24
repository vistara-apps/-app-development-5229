import React, { useState } from 'react'
import { Settings as SettingsIcon, Bell, DollarSign, Users, MapPin } from 'lucide-react'
import { usePaymentContext } from '../hooks/usePaymentContext'

export default function Settings() {
  const [isPremium, setIsPremium] = useState(false)
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: true,
      push: true,
      shiftChanges: true,
      newWorkers: false
    },
    payroll: {
      defaultPayRate: 18.00,
      overtimeMultiplier: 1.5,
      autoSync: false,
      provider: 'none'
    },
    approval: {
      autoApprove: false,
      requireManagerApproval: true,
      maxShiftsPerWorker: 5
    }
  })

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

  const handleSettingChange = (section, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: value
      }
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <button onClick={handleSave} className="btn btn-primary">
          Save Changes
        </button>
      </div>

      {/* Premium Upgrade */}
      {!isPremium && (
        <div className="card p-6 border-warning bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Upgrade to Premium</h3>
              <p className="text-gray-600 mt-1">
                Unlock advanced features including automated approvals, payroll sync, and location-based matching.
              </p>
            </div>
            <button 
              onClick={handleUpgradeToPremium}
              disabled={isPaymentLoading}
              className="btn btn-primary disabled:opacity-50"
            >
              {isPaymentLoading ? 'Processing...' : 'Upgrade ($9/month)'}
            </button>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Settings
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Notification Types</h4>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                className="mr-2"
              />
              Email notifications
            </label>
            
            <label className={`flex items-center ${!isPremium ? 'opacity-50' : ''}`}>
              <input
                type="checkbox"
                checked={settings.notifications.sms && isPremium}
                onChange={(e) => isPremium && handleSettingChange('notifications', 'sms', e.target.checked)}
                disabled={!isPremium}
                className="mr-2"
              />
              SMS notifications {!isPremium && <span className="text-xs text-warning ml-1">(Premium)</span>}
            </label>
            
            <label className={`flex items-center ${!isPremium ? 'opacity-50' : ''}`}>
              <input
                type="checkbox"
                checked={settings.notifications.push && isPremium}
                onChange={(e) => isPremium && handleSettingChange('notifications', 'push', e.target.checked)}
                disabled={!isPremium}
                className="mr-2"
              />
              Push notifications {!isPremium && <span className="text-xs text-warning ml-1">(Premium)</span>}
            </label>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Notification Events</h4>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.shiftChanges}
                onChange={(e) => handleSettingChange('notifications', 'shiftChanges', e.target.checked)}
                className="mr-2"
              />
              Shift changes and updates
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.notifications.newWorkers}
                onChange={(e) => handleSettingChange('notifications', 'newWorkers', e.target.checked)}
                className="mr-2"
              />
              New worker registrations
            </label>
          </div>
        </div>
      </div>

      {/* Payroll Settings */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Payroll Settings
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Pay Rate ($/hour)
              </label>
              <input
                type="number"
                value={settings.payroll.defaultPayRate}
                onChange={(e) => handleSettingChange('payroll', 'defaultPayRate', parseFloat(e.target.value))}
                step="0.25"
                min="0"
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overtime Multiplier
              </label>
              <input
                type="number"
                value={settings.payroll.overtimeMultiplier}
                onChange={(e) => handleSettingChange('payroll', 'overtimeMultiplier', parseFloat(e.target.value))}
                step="0.1"
                min="1"
                className="input"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-1 ${!isPremium ? 'opacity-50' : ''}`}>
                Payroll Provider {!isPremium && <span className="text-xs text-warning">(Premium)</span>}
              </label>
              <select
                value={settings.payroll.provider}
                onChange={(e) => isPremium && handleSettingChange('payroll', 'provider', e.target.value)}
                disabled={!isPremium}
                className="select"
              >
                <option value="none">None</option>
                <option value="quickbooks">QuickBooks</option>
                <option value="adp">ADP</option>
                <option value="paychex">Paychex</option>
              </select>
            </div>
            
            <label className={`flex items-center ${!isPremium ? 'opacity-50' : ''}`}>
              <input
                type="checkbox"
                checked={settings.payroll.autoSync && isPremium}
                onChange={(e) => isPremium && handleSettingChange('payroll', 'autoSync', e.target.checked)}
                disabled={!isPremium}
                className="mr-2"
              />
              Auto-sync with payroll {!isPremium && <span className="text-xs text-warning ml-1">(Premium)</span>}
            </label>
          </div>
        </div>
      </div>

      {/* Approval Settings */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Shift Approval Settings
        </h3>
        
        <div className="space-y-6">
          <label className={`flex items-center ${!isPremium ? 'opacity-50' : ''}`}>
            <input
              type="checkbox"
              checked={settings.approval.autoApprove && isPremium}
              onChange={(e) => isPremium && handleSettingChange('approval', 'autoApprove', e.target.checked)}
              disabled={!isPremium}
              className="mr-2"
            />
            <div>
              <span className="font-medium">Auto-approve shifts</span>
              {!isPremium && <span className="text-xs text-warning ml-1">(Premium)</span>}
              <p className="text-sm text-gray-600">Automatically approve shifts when workers meet all requirements</p>
            </div>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.approval.requireManagerApproval}
              onChange={(e) => handleSettingChange('approval', 'requireManagerApproval', e.target.checked)}
              className="mr-2"
            />
            <div>
              <span className="font-medium">Require manager approval</span>
              <p className="text-sm text-gray-600">All shift requests must be approved by a manager</p>
            </div>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum shifts per worker per week
            </label>
            <input
              type="number"
              value={settings.approval.maxShiftsPerWorker}
              onChange={(e) => handleSettingChange('approval', 'maxShiftsPerWorker', parseInt(e.target.value))}
              min="1"
              max="7"
              className="input w-24"
            />
          </div>
        </div>
      </div>
    </div>
  )
}