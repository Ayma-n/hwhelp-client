import React, { useState, createRef, useEffect } from 'react'
import Peer from 'peerjs'
import { VideoPlayer } from './VideoPlayer';

type CallerProps = {
    callerPeerId: string,
    receiverPeerId: string
}

export default function Caller(props : CallerProps) {

    const [myStream, setMyStream] = useState<MediaStream>();
    const [callStream, setCallStream] = useState<MediaStream>();

    useEffect(() => {
        const peer = new Peer(props.callerPeerId);

        try {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((stream) => {
                setMyStream(stream)
                var call = peer.call(props.receiverPeerId, stream);
                call.on('stream', (remoteStream) => {
                    setCallStream(remoteStream);
                });
            })
        } catch {

        }
    }, [])


    return (<>
        <VideoPlayer stream={myStream as MediaStream}/>
        <VideoPlayer stream={callStream as MediaStream}/>
    </>)
}
