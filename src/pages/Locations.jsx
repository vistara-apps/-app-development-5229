import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, MapPin, Clock } from 'lucide-react'
import LocationForm from '../components/LocationForm'

export default function Locations() {
  const { state, dispatch } = useApp()
  const { locations, shifts } = state
  const [showForm, setShowForm] = useState(false)
  const [editingLocation, setEditingLocation] = useState(null)

  const getLocationShifts = (locationId) => {
    return shifts.filter(shift => shift.locationId === locationId)
  }

  const handleEditLocation = (location) => {
    setEditingLocation(location)
    setShowForm(true)
  }

  const handleDeleteLocation = (locationId) => {
    if (confirm('Are you sure you want to delete this location?')) {
      dispatch({
        type: 'DELETE_LOCATION',
        payload: locationId
      })
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingLocation(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Locations Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {locations.map(location => {
          const locationShifts = getLocationShifts(location.id)
          
          return (
            <div key={location.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-600">ID: {location.id}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditLocation(location)}
                    className="text-primary hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLocation(location.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{location.address}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Timezone: {location.timezone}</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">Shifts</p>
                    <span className="text-sm text-gray-500">{locationShifts.length} total</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-yellow-50 p-2 rounded">
                      <p className="text-lg font-semibold text-yellow-800">
                        {locationShifts.filter(s => s.status === 'open').length}
                      </p>
                      <p className="text-xs text-yellow-600">Open</p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <p className="text-lg font-semibold text-orange-800">
                        {locationShifts.filter(s => s.status === 'pending').length}
                      </p>
                      <p className="text-xs text-orange-600">Pending</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <p className="text-lg font-semibold text-green-800">
                        {locationShifts.filter(s => s.status === 'confirmed').length}
                      </p>
                      <p className="text-xs text-green-600">Confirmed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {locations.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No locations found</p>
          <p className="text-gray-400">Add your first location to get started</p>
        </div>
      )}

      {showForm && (
        <LocationForm 
          location={editingLocation}
          onClose={handleCloseForm} 
        />
      )}
    </div>
  )
}