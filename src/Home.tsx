import React from 'react'
import Button from '@mui/material/Button'
import './HomeStyle.css'

type HomeProps = {
    signedIn: boolean;
}

export default function Home(props: HomeProps) {
  return (<>
  <div id="text-and-login" className="m-auto h-screen flex flex-col text-center justify-center items-center" >
    <div className="text-5xl mb-4">Welcome to HW-Help!</div>
    <Button style={{
        borderRadius: 10,
        backgroundColor: "#22c55e",
    }}variant="contained" className="w-30 h-16">Sign In With Google</Button>
  </div>
  </>)
}
