import React, { useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { connectToServerAndEnterQueue } from "./logic/sockets";
import { useAuth } from "./contexts/AuthContext";
import { useDb } from "./contexts/DatabaseContext";

export default function WaitingRoom() {
  const { userInfo } = useAuth();
  const { getProfileData } = useDb();

  useEffect(() => {
    console.log("user info", userInfo);
    console.log(getProfileData(userInfo?.currentUser.uid));
    getProfileData(userInfo?.currentUser.uid).then((profileData: any) => {
      console.log("profile data ", profileData);
      connectToServerAndEnterQueue(profileData);
    });
  }, []);

  return (
    <div
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
    </div>
  );
}
