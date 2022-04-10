import React, { useState, useEffect } from 'react'
import Peer from 'peerjs'
import { VideoPlayer } from './VideoPlayer';


type ReceiverProps = {
    receiverPeerId: string
}

export default function Receiver(props : ReceiverProps) {

    const [myStream, setMyStream] = useState<MediaStream>();
    const [callStream, setCallStream] = useState<MediaStream>();


    useEffect(() => {
        const peer = new Peer(props.receiverPeerId);
        peer.on('call', (call) => {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((stream) => {
                setMyStream(stream)
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    setCallStream(remoteStream)
                })
            })
        })
    }, [])

    return (<>
        <VideoPlayer stream={myStream as MediaStream}/>
        <VideoPlayer stream={callStream as MediaStream}/>
    </>)
}
