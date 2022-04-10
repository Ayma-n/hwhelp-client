import React, { useState, useEffect, useRef, createRef } from 'react'
import Peer, { MediaConnection } from 'peerjs'
import { VideoPlayer } from './VideoPlayer';

export default function AVRoomPeer() {

    const [myStream, setMyStream] = useState<MediaStream>();
    const [callStream, setCallStream] = useState<MediaStream>();


    useEffect(() => {
        const peer = new Peer('36896595768453696577');
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
