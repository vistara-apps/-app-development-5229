import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Calendar, MapPin, DollarSign, Clock, User, Filter } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import ShiftForm from '../components/ShiftForm'

export default function Shifts() {
  const { state, dispatch } = useApp()
  const { shifts, locations, workers } = state
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredShifts = shifts.filter(shift => 
    filterStatus === 'all' || shift.status === filterStatus
  )

  const getLocationName = (locationId) => {
    const location = locations.find(l => l.id === locationId)
    return location ? location.name : 'Unknown Location'
  }

  const getWorkerName = (workerId) => {
    const worker = workers.find(w => w.id === workerId)
    return worker ? worker.name : 'Unassigned'
  }

  const handleClaimShift = (shiftId) => {
    // In a real app, this would show a worker selection modal
    const availableWorkers = workers.filter(worker => 
      !shifts.some(shift => shift.workerId === worker.id && shift.status !== 'open')
    )
    
    if (availableWorkers.length > 0) {
      dispatch({
        type: 'CLAIM_SHIFT',
        payload: {
          shiftId,
          workerId: availableWorkers[0].id
        }
      })
    }
  }

  const handleApproveShift = (shiftId) => {
    dispatch({
      type: 'APPROVE_SHIFT',
      payload: shiftId
    })
  }

  const handleDeleteShift = (shiftId) => {
    if (confirm('Are you sure you want to delete this shift?')) {
      dispatch({
        type: 'DELETE_SHIFT',
        payload: shiftId
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shifts</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Shift</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center space-x-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select"
          >
            <option value="all">All Shifts</option>
            <option value="open">Open</option>
            <option value="pending">Pending Approval</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>
      </div>

      {/* Shifts Grid */}
      <div className="grid gap-6">
        {filteredShifts.map(shift => (
          <div key={shift.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{shift.position}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{getLocationName(shift.locationId)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(parseISO(shift.startTime), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(parseISO(shift.startTime), 'h:mm a')} - 
                      {format(parseISO(shift.endTime), 'h:mm a')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${shift.payRate}/hr</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  shift.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                  shift.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {shift.status}
                </span>
                
                <button
                  onClick={() => handleDeleteShift(shift.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{getWorkerName(shift.workerId)}</span>
              </div>
              
              <div className="flex space-x-2">
                {shift.status === 'open' && (
                  <button
                    onClick={() => handleClaimShift(shift.id)}
                    className="btn btn-primary btn-sm"
                  >
                    Assign Worker
                  </button>
                )}
                {shift.status === 'pending' && (
                  <button
                    onClick={() => handleApproveShift(shift.id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredShifts.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No shifts found</p>
          <p className="text-gray-400">Create your first shift to get started</p>
        </div>
      )}

      {showForm && (
        <ShiftForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}