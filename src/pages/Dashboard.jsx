import React from 'react'
import { useApp } from '../context/AppContext'
import { Calendar, Users, MapPin, Clock, TrendingUp, AlertCircle, Plus } from 'lucide-react'
import { format, isToday, isTomorrow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'

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
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          Last updated: {format(new Date(), 'PPp')}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 font-medium">Total Workers</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1">{stats.totalWorkers}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 font-medium">Locations</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1">{stats.totalLocations}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-xl">
                <MapPin className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 font-medium">Open Shifts</p>
                <p className="text-3xl font-bold text-warning-600 mt-1">{stats.openShifts}</p>
              </div>
              <div className="p-3 bg-warning-100 rounded-xl">
                <Calendar className="h-6 w-6 text-warning-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 font-medium">Pending Approvals</p>
                <p className="text-3xl font-bold text-danger-600 mt-1">{stats.pendingApprovals}</p>
              </div>
              <div className="p-3 bg-danger-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-danger-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-600" />
              Today's Schedule ({stats.todayShifts} shifts)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shifts
                .filter(shift => isToday(new Date(shift.startTime)))
                .map(shift => (
                  <div key={shift.id} className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-neutral-100 transition-colors">
                    <div>
                      <p className="font-medium text-neutral-900">{shift.position}</p>
                      <p className="text-sm text-neutral-600">{getLocationName(shift.locationId)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-neutral-900">
                        {format(new Date(shift.startTime), 'h:mm a')} - 
                        {format(new Date(shift.endTime), 'h:mm a')}
                      </p>
                      <p className="text-sm text-neutral-600">{getWorkerName(shift.workerId)}</p>
                    </div>
                  </div>
                ))}
              {stats.todayShifts === 0 && (
                <EmptyState
                  icon={<Clock />}
                  title="No shifts today"
                  description="You have a clear schedule for today."
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Shifts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              Upcoming Shifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingShifts.map(shift => (
                <div key={shift.id} className="flex justify-between items-center p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-neutral-100 transition-colors">
                  <div>
                    <p className="font-medium text-neutral-900">{shift.position}</p>
                    <p className="text-sm text-neutral-600">{getLocationName(shift.locationId)}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {format(new Date(shift.startTime), 'MMM d, h:mm a')}
                    </p>
                    <Badge 
                      variant={
                        shift.status === 'open' ? 'warning' :
                        shift.status === 'pending' ? 'secondary' :
                        'success'
                      }
                    >
                      {shift.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {upcomingShifts.length === 0 && (
                <EmptyState
                  icon={<Calendar />}
                  title="No upcoming shifts"
                  description="All shifts are scheduled and assigned."
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-12"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Create New Shift
            </Button>
            <Button 
              variant="secondary"
              className="h-12"
              leftIcon={<Users className="h-4 w-4" />}
            >
              Add Worker
            </Button>
            <Button 
              variant="secondary"
              className="h-12"
              leftIcon={<MapPin className="h-4 w-4" />}
            >
              Add Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
