import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { connectToServerAndEnterQueue } from "./logic/sockets";
import { useAuth } from "./contexts/AuthContext";
import { useDb } from "./contexts/DatabaseContext";
import { Person } from "./types/DBTypes";
import { useNavigate } from "react-router-dom";

export default function WaitingRoom() {
  const { userInfo } = useAuth();
  const { getProfileData } = useDb();
  const navigate = useNavigate();

  const [matchedPerson, setMatchedPerson] = useState<any>();

  useEffect(() => {
    if (!userInfo) {
        navigate("/")
        return;
    }
    getProfileData(userInfo?.currentUser.uid).then((profileData: any) => {
      connectToServerAndEnterQueue(profileData)
      .then((personObject) => {
          setMatchedPerson(personObject);
      })
    });
  }, []);

  useEffect(() => {
    if (matchedPerson) {
      setTimeout(() => navigate("/chat"), 1000);
    }
  }, [matchedPerson]);

  return (<>
    {!matchedPerson && <div
      id="WaitingRoom"
      className="m-auto h-screen flex flex-col text-center justify-center items-center"
    >
      <div className="text-3xl mb-4">
        Please wait while we match you with a tutor...
      </div>
      <CircularProgress />
      <Button
        sx={{ mt: 3 }}
        style={{
          borderRadius: 10,
        }}
        variant="contained"
        className="pt-5"
      >
        Leave Queue
      </Button>
    </div>}

    {matchedPerson && <div
        id="MatchedNotice"
        className="m-auto h-screen flex flex-col text-center justify-center items-center"
    >
        <div className="text-5xl mb-4">
        You were matched with {matchedPerson.displayName}!
      </div>
    </div>}

    </>);
}
