import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext'
import { User } from 'firebase/auth';

export default function FirstTime() {

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  return (<>
    <div id="first-time-page">
      {userInfo?.additionalInfo.isNewUser ? <div>Welcome, {userInfo?.currentUser.displayName}!</div> : <Navigate to="/"></Navigate>}
    </div>
  </>)
}
