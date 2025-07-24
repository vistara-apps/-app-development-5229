import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, User, Phone, Mail, MapPin, Award } from 'lucide-react'
import WorkerForm from '../components/WorkerForm'

export default function Workers() {
  const { state, dispatch } = useApp()
  const { workers } = state
  const [showForm, setShowForm] = useState(false)
  const [editingWorker, setEditingWorker] = useState(null)

  const handleEditWorker = (worker) => {
    setEditingWorker(worker)
    setShowForm(true)
  }

  const handleDeleteWorker = (workerId) => {
    if (confirm('Are you sure you want to delete this worker?')) {
      dispatch({
        type: 'DELETE_WORKER',
        payload: workerId
      })
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingWorker(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Workers</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Worker</span>
        </button>
      </div>

      {/* Workers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map(worker => (
          <div key={worker.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                  <p className="text-sm text-gray-600">ID: {worker.id}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditWorker(worker)}
                  className="text-primary hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteWorker(worker.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{worker.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{worker.email}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{worker.location}</span>
              </div>
              
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Award className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Skills:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {worker.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {workers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No workers found</p>
          <p className="text-gray-400">Add your first worker to get started</p>
        </div>
      )}

      {showForm && (
        <WorkerForm 
          worker={editingWorker}
          onClose={handleCloseForm} 
        />
      )}
    </div>
  )
}