import React, { useState, createRef, useEffect } from 'react'
import Peer from 'peerjs'
import { VideoPlayer } from './VideoPlayer';

export default function AVRoom() {

    const [myStream, setMyStream] = useState<MediaStream>();
    const [callStream, setCallStream] = useState<MediaStream>();

    useEffect(() => {
        const peer = new Peer('73802004359592263484');

        try {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((stream) => {
                setMyStream(stream)
                var call = peer.call('36896595768453696577', stream);
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
