import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X } from 'lucide-react'

export default function ShiftForm({ onClose }) {
  const { state, dispatch } = useApp()
  const { locations } = state
  
  const [formData, setFormData] = useState({
    locationId: '',
    startDate: '',
    startTime: '',
    endTime: '',
    position: '',
    payRate: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
    const endDateTime = new Date(`${formData.startDate}T${formData.endTime}`)
    
    dispatch({
      type: 'ADD_SHIFT',
      payload: {
        locationId: parseInt(formData.locationId),
        workerId: null,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        position: formData.position,
        payRate: parseFloat(formData.payRate),
        status: 'open'
      }
    })
    
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
          <h2 className="text-xl font-semibold text-gray-900">Create New Shift</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              name="locationId"
              value={formData.locationId}
              onChange={handleChange}
              required
              className="select"
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Customer Service Representative"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pay Rate ($/hour)
            </label>
            <input
              type="number"
              name="payRate"
              value={formData.payRate}
              onChange={handleChange}
              step="0.25"
              min="0"
              placeholder="18.00"
              required
              className="input"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn btn-primary flex-1">
              Create Shift
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