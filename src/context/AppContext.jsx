import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  businesses: [
    {
      id: 1,
      name: 'Tech Solutions Inc',
      address: '123 Tech Street, San Francisco, CA',
      industry: 'Technology',
      size: 'Medium',
      locations: [1, 2],
      workers: [1, 2, 3]
    }
  ],
  locations: [
    {
      id: 1,
      businessId: 1,
      name: 'Main Office',
      address: '123 Tech Street, San Francisco, CA',
      timezone: 'PST',
      shifts: [1, 2, 3]
    },
    {
      id: 2,
      businessId: 1,
      name: 'Warehouse',
      address: '456 Industrial Blvd, Oakland, CA',
      timezone: 'PST',
      shifts: [4]
    }
  ],
  workers: [
    {
      id: 1,
      businessId: 1,
      name: 'John Doe',
      phone: '555-0123',
      email: 'john@example.com',
      skills: ['Customer Service', 'Cash Handling'],
      location: 'San Francisco, CA',
      shifts: [1]
    },
    {
      id: 2,
      businessId: 1,
      name: 'Jane Smith',
      phone: '555-0124',
      email: 'jane@example.com',
      skills: ['Management', 'Training'],
      location: 'San Francisco, CA',
      shifts: [2]
    },
    {
      id: 3,
      businessId: 1,
      name: 'Mike Johnson',
      phone: '555-0125',
      email: 'mike@example.com',
      skills: ['Warehouse Operations', 'Forklift'],
      location: 'Oakland, CA',
      shifts: []
    }
  ],
  shifts: [
    {
      id: 1,
      locationId: 1,
      workerId: 1,
      startTime: '2024-01-15T09:00:00',
      endTime: '2024-01-15T17:00:00',
      position: 'Customer Service Representative',
      payRate: 18.00,
      status: 'confirmed'
    },
    {
      id: 2,
      locationId: 1,
      workerId: 2,
      startTime: '2024-01-15T14:00:00',
      endTime: '2024-01-15T22:00:00',
      position: 'Shift Manager',
      payRate: 22.00,
      status: 'confirmed'
    },
    {
      id: 3,
      locationId: 1,
      workerId: null,
      startTime: '2024-01-16T09:00:00',
      endTime: '2024-01-16T17:00:00',
      position: 'Customer Service Representative',
      payRate: 18.00,
      status: 'open'
    },
    {
      id: 4,
      locationId: 2,
      workerId: null,
      startTime: '2024-01-16T06:00:00',
      endTime: '2024-01-16T14:00:00',
      position: 'Warehouse Associate',
      payRate: 16.00,
      status: 'open'
    }
  ]
}

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_WORKER':
      return {
        ...state,
        workers: [...state.workers, { ...action.payload, id: Date.now() }]
      }
    case 'UPDATE_WORKER':
      return {
        ...state,
        workers: state.workers.map(worker => 
          worker.id === action.payload.id ? action.payload : worker
        )
      }
    case 'DELETE_WORKER':
      return {
        ...state,
        workers: state.workers.filter(worker => worker.id !== action.payload)
      }
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, { ...action.payload, id: Date.now(), shifts: [] }]
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        locations: state.locations.map(location => 
          location.id === action.payload.id ? action.payload : location
        )
      }
    case 'DELETE_LOCATION':
      return {
        ...state,
        locations: state.locations.filter(location => location.id !== action.payload)
      }
    case 'ADD_SHIFT':
      return {
        ...state,
        shifts: [...state.shifts, { ...action.payload, id: Date.now() }]
      }
    case 'UPDATE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map(shift => 
          shift.id === action.payload.id ? action.payload : shift
        )
      }
    case 'CLAIM_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map(shift => 
          shift.id === action.payload.shiftId 
            ? { ...shift, workerId: action.payload.workerId, status: 'pending' }
            : shift
        )
      }
    case 'APPROVE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map(shift => 
          shift.id === action.payload ? { ...shift, status: 'confirmed' } : shift
        )
      }
    case 'DELETE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.filter(shift => shift.id !== action.payload)
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}