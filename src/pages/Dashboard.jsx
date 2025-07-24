import React from 'react'
import { useApp } from '../context/AppContext'
import { Calendar, Users, MapPin, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import { format, isToday, isTomorrow } from 'date-fns'

export default function Dashboard() {
  const { state } = useApp()
  const { shifts, workers, locations } = state

  const stats = {
    totalWorkers: workers.length,
    totalLocations: locations.length,
    openShifts: shifts.filter(shift => shift.status === 'open').length,
    pendingApprovals: shifts.filter(shift => shift.status === 'pending').length,
    todayShifts: shifts.filter(shift => isToday(new Date(shift.startTime))).length,
    tomorrowShifts: shifts.filter(shift => isTomorrow(new Date(shift.startTime))).length
  }

  const upcomingShifts = shifts
    .filter(shift => new Date(shift.startTime) > new Date())
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 5)

  const getWorkerName = (workerId) => {
    const worker = workers.find(w => w.id === workerId)
    return worker ? worker.name : 'Unassigned'
  }

  const getLocationName = (locationId) => {
    const location = locations.find(l => l.id === locationId)
    return location ? location.name : 'Unknown Location'
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {format(new Date(), 'PPp')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Workers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalWorkers}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Locations</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalLocations}</p>
            </div>
            <MapPin className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Shifts</p>
              <p className="text-3xl font-bold text-warning">{stats.openShifts}</p>
            </div>
            <Calendar className="h-8 w-8 text-warning" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-3xl font-bold text-danger">{stats.pendingApprovals}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-danger" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Today's Schedule ({stats.todayShifts} shifts)
          </h3>
          <div className="space-y-3">
            {shifts
              .filter(shift => isToday(new Date(shift.startTime)))
              .map(shift => (
                <div key={shift.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{shift.position}</p>
                    <p className="text-sm text-gray-600">{getLocationName(shift.locationId)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(shift.startTime), 'h:mm a')} - 
                      {format(new Date(shift.endTime), 'h:mm a')}
                    </p>
                    <p className="text-sm text-gray-600">{getWorkerName(shift.workerId)}</p>
                  </div>
                </div>
              ))}
            {stats.todayShifts === 0 && (
              <p className="text-gray-500 text-center py-4">No shifts scheduled for today</p>
            )}
          </div>
        </div>

        {/* Upcoming Shifts */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Upcoming Shifts
          </h3>
          <div className="space-y-3">
            {upcomingShifts.map(shift => (
              <div key={shift.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{shift.position}</p>
                  <p className="text-sm text-gray-600">{getLocationName(shift.locationId)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(shift.startTime), 'MMM d, h:mm a')}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    shift.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                    shift.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {shift.status}
                  </span>
                </div>
              </div>
            ))}
            {upcomingShifts.length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming shifts</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary flex items-center justify-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Create New Shift</span>
          </button>
          <button className="btn btn-secondary flex items-center justify-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Add Worker</span>
          </button>
          <button className="btn btn-secondary flex items-center justify-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Add Location</span>
          </button>
        </div>
      </div>
    </div>
  )
}