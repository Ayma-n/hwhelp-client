import React from 'react'
import Button from '@mui/material/Button'
import './HomeStyle.css'

import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

type HomeProps = {
    signedIn: boolean;
}

export default function Home(props: HomeProps) {

    const { login, userInfo } = useAuth();
    const navigate = useNavigate()

    async function handleLoginPressed() {
        await login();
        //if (userInfo?.additionalInfo.isNewUser) navigate("/first-time");
        navigate("/first-time");
    }

    return (<>
        <div id="text-and-login" className="m-auto h-screen flex flex-col text-center justify-center items-center" >
            <div className="text-5xl mb-4">Welcome to HW-Help!</div>
            <Button style={{
                borderRadius: 10,
                backgroundColor: "#22c55e",
            }} variant="contained" className="w-30 h-16" onClick={handleLoginPressed}>Sign In With Google</Button>
        </div>
    </>)
}


