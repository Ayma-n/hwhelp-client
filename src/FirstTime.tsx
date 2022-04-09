import React from 'react'

import { useAuth } from './contexts/AuthContext'

export default function FirstTime() {

    const { currentUser } = useAuth();

  return (
    <div>Welcome, {currentUser.email}</div>
  )
}
