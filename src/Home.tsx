import React from 'react'
import Button from '@mui/material/Button'

type HomeProps = {
    signedIn: boolean;
}

export default function Home(props: HomeProps) {
  return (<>
    <div>Home</div>
    <Button>Sign In</Button>
  </>)
}
