import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext'
import { useDb } from './contexts/DatabaseContext'
import { FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Autocomplete, createFilterOptions, Checkbox, FormGroup, Button } from '@mui/material';
import { Person } from './types/DBTypes';

import usInstitutions from "./local-data/us_institutions_list.json"

interface IFormData {
  role: string,
  institution: string,
  expertise: string[]
}

export default function FirstTime() {

  const { userInfo } = useAuth();
  const { createUser } = useDb();

  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormData>({role: "student", institution: "", expertise: []});

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  })

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newFormData = formData;
    newFormData.role = e.target.value;
    setFormData(newFormData);


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
  }

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = formData;
    if (e.target.checked) {
      newFormData.expertise.push(e.target.name)
    } else {
      newFormData.expertise.splice(newFormData.expertise.indexOf(e.target.name));
    }  
    setFormData(newFormData);
  }

  const handleUniSelection = (e: React.SyntheticEvent, value : any) => {
    const newFormData = formData;
    newFormData.institution = value;
    setFormData(newFormData);
  }

  const submitUserInfo = async () => {

    const personObject : Person = {
      displayName: userInfo?.currentUser.displayName,
      email: userInfo?.currentUser.email,
      institution: formData.institution,
      role: formData.role,
      expertise: formData.expertise,
      uid: userInfo?.currentUser.uid
    }
    await createUser(personObject);
    navigate("/waiting-room");
  }

  return (<>
    <div id="first-time-page">
      {userInfo?.additionalInfo.isNewUser ? <div className="text-4xl">Welcome, {userInfo?.currentUser.displayName}!</div> : <Navigate to="/waiting-room"></Navigate>}
      {/* <div className="text-4xl">Welcome, {userInfo?.currentUser.displayName}!</div> */}
      <FormLabel>Are you using HW-Help as a:</FormLabel>
      <RadioGroup
        defaultValue={"student"}
        onChange={handleRoleChange}
        id="user-role"
      >
        <FormControlLabel value="student" control={<Radio />} label="Student" />
        <FormControlLabel value="tutor" control={<Radio />} label="Tutor" />
      </RadioGroup>

      <div id="student-options">
        <FormLabel>Which university do you currently attend?</FormLabel>
        <Autocomplete
          disablePortal
          filterOptions={filterOptions}
          onChange={handleUniSelection}
          id="uni-list"
          options={usInstitutions.sort()}
          renderInput={(params) => <TextField {...params} label="College or University" />}
        />
      </div>

      <div className="hidden" id="tutor-options">
        <FormLabel>Select your areas of expertise:</FormLabel>
        <FormGroup
        onChange={handleOptionsChange}>
          <FormControlLabel control={<Checkbox name="math" />} label="Mathematics" />
          <FormControlLabel control={<Checkbox name="cs" />} label="Computer Science" />
          <FormControlLabel control={<Checkbox name="phys" />} label="Physics" />
          <FormControlLabel control={<Checkbox name="chem" />} label="Chemistry" />
          <FormControlLabel control={<Checkbox name="econ" />} label="Economics" />
          <FormControlLabel control={<Checkbox name="soc" />} label="Sociology" />
        </FormGroup>
      </div>

      <Button onClick={submitUserInfo} style={{
        borderRadius: 10,
        backgroundColor: "#22c55e",
        color: "white",
      }}>Complete Registration</Button>
    </div>
  </>)
}
