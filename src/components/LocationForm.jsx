import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X } from 'lucide-react'

export default function LocationForm({ location, onClose }) {
  const { dispatch } = useApp()
  const isEditing = !!location
  
  const [formData, setFormData] = useState({
    name: location?.name || '',
    address: location?.address || '',
    timezone: location?.timezone || 'PST'
  })

  const timezones = [
    'PST', 'MST', 'CST', 'EST',
    'AKST', 'HST', 'GMT', 'CET'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const locationData = {
      ...formData,
      businessId: 1 // In a real app, this would come from the current business context
    }

    if (isEditing) {
      dispatch({
        type: 'UPDATE_LOCATION',
        payload: { ...locationData, id: location.id, shifts: location.shifts }
      })
    } else {
      dispatch({
        type: 'ADD_LOCATION',
        payload: locationData
      })
    }
    
    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Location' : 'Add New Location'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Main Office"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main Street, City, State, ZIP"
              required
              rows="3"
              className="input resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              required
              className="select"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn btn-primary flex-1">
              {isEditing ? 'Update Location' : 'Add Location'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}