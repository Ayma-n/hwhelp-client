import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext'
import { User } from 'firebase/auth';
import { FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Autocomplete, createFilterOptions, Checkbox, FormGroup } from '@mui/material';

import usInstitutions from "./local-data/us_institutions_list.json"

export default function FirstTime() {

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [valueA, setValueA] = useState("Student")

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  })

  //useEffect(generateUniversityOptions, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    console.log("THERE WAS A CHNAGE AHAHHAHAHAHA")
    console.log(e.target.value);

    const studentOptions = document.getElementById("student-options");
    const tutorOptions = document.getElementById("tutor-options")
    
    if (e.target.value == "student") {
      if (studentOptions && tutorOptions) {
        studentOptions.classList.add("block")
        studentOptions.classList.remove("hidden")
        tutorOptions.classList.remove("block")
        tutorOptions.classList.add("hidden")
      }
    } else if (e.target.value == "tutor") {
      if (studentOptions && tutorOptions) {
        tutorOptions.classList.add("block")
        tutorOptions.classList.remove("hidden")
        studentOptions.classList.remove("block")
        studentOptions.classList.add("hidden")
      }
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
        <FormControlLabel value="student" control={<Radio />} label="Student" />
        <FormControlLabel value="tutor" control={<Radio />} label="Tutor" />
      </RadioGroup>

      <div id="student-options">
        <FormLabel>Which university do you currently attend?</FormLabel>
        <Autocomplete
          disablePortal
          filterOptions={filterOptions}
          id="uni-list"
          options={usInstitutions.sort()}
          renderInput={(params) => <TextField {...params} label="College or University" />}
        />
      </div>

      <div className="hidden" id="tutor-options">
        <FormLabel>Select your areas of expertise:</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Mathematics"/>
            <FormControlLabel control={<Checkbox />} label="Computer Science"/>
            <FormControlLabel control={<Checkbox />} label="Physics"/>
            <FormControlLabel control={<Checkbox />} label="Chemistry"/>
            <FormControlLabel control={<Checkbox />} label="Economics"/>
            <FormControlLabel control={<Checkbox />} label="Sociology"/>
          </FormGroup>
      </div>
    </div>
  </>)
}
