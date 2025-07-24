import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X } from 'lucide-react'

export default function WorkerForm({ worker, onClose }) {
  const { state, dispatch } = useApp()
  const isEditing = !!worker
  
  const [formData, setFormData] = useState({
    name: worker?.name || '',
    phone: worker?.phone || '',
    email: worker?.email || '',
    location: worker?.location || '',
    skills: worker?.skills?.join(', ') || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const workerData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      businessId: 1 // In a real app, this would come from the current business context
    }

    if (isEditing) {
      dispatch({
        type: 'UPDATE_WORKER',
        payload: { ...workerData, id: worker.id }
      })
    } else {
      dispatch({
        type: 'ADD_WORKER',
        payload: workerData
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
            {isEditing ? 'Edit Worker' : 'Add New Worker'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="555-0123"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              required
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Customer Service, Cash Handling, Management"
              required
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate skills with commas (e.g., "Customer Service, Cash Handling")
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn btn-primary flex-1">
              {isEditing ? 'Update Worker' : 'Add Worker'}
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