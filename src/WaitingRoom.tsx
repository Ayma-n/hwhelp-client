import React from 'react'
import { Button, CircularProgress } from '@mui/material'

export default function WaitingRoom() {
  return (
    <div id="WaitingRoom" className="m-auto h-screen flex flex-col text-center justify-center items-center" >
            <div className="text-3xl mb-4">Please wait while we match you with a tutor...</div>
            <CircularProgress/>
            <Button sx={{mt: 3}} style={{
                borderRadius: 10,
            }} variant="contained" className="pt-5">Leave Queue</Button>
        </div>
  )
}
