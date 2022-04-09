import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext'
import { User } from 'firebase/auth';
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function FirstTime() {

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [valueA, setValueA] = useState("Student")

  useEffect(() => {

  }, [])

  const generateUniversityOptions = () => {

  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.value == "Student") {
    }

    setValueA((e.target as HTMLInputElement).value)
  }

  return (<>
    <div id="first-time-page">
      {/* {userInfo?.additionalInfo.isNewUser ? <div className="text-4xl">Welcome, {userInfo?.currentUser.displayName}!</div> : <Navigate to="/"></Navigate>} */}
      <div className="text-4xl">Welcome, {userInfo?.currentUser.displayName}!</div>
      <FormLabel>Are you using HW-Help as a:</FormLabel>
      <RadioGroup
      defaultValue={"student"}
      onChange={handleChange}
      >
        <FormControlLabel value="student" control={<Radio/>} label="Student"/>
        <FormControlLabel value="tutor" control={<Radio/>} label="Tutor"/>
      </RadioGroup>
      <FormLabel>Which university do you currently attend?</FormLabel>
    </div>
  </>)
}
