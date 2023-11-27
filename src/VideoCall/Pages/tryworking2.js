import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { io } from 'socket.io-client'; // Import socket.io-client if not already imported

const Room = ({ Id }) => {
  const [myVideoStream, setMyVideoStream] = useState(null);
  const [peers, setPeers] = useState({}); // State for managing peer connections

  //const socket = io('http://localhost:4000'); // Initialize socket.io connection

  const videoGridRef = useRef(null);
  const myVideoRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '3001',
    });

    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyVideoStream(stream);

        const myVideo = myVideoRef.current;
        if (myVideo) {
          myVideo.srcObject = stream;
          myVideo.addEventListener('loadedmetadata', () => {
            myVideo.play();
          });
        }

        myPeer.on('open', (id) => {
          socket.emit('join-room', Id, id);
        });

        myPeer.on('call', (call) => {
          call.answer(stream);

          call.on('stream', (userVideoStream) => {
            // Add new user video stream
            const newUserVideo = document.createElement('video');
            newUserVideo.srcObject = userVideoStream;
            newUserVideo.addEventListener('loadedmetadata', () => {
              newUserVideo.play();
            });
            videoGridRef.current.appendChild(newUserVideo);

            setPeers((prevPeers) => ({
              ...prevPeers,
              [call.peer]: call,
            }));
          });
        });

        socket.on('user-connected', (userId) => {
          const call = myPeer.call(userId, stream);

          call.on('stream', (userVideoStream) => {
            // Handle incoming stream from a new user
            const newUserVideo = document.createElement('video');
            newUserVideo.srcObject = userVideoStream;
            newUserVideo.addEventListener('loadedmetadata', () => {
              newUserVideo.play();
            });
            videoGridRef.current.appendChild(newUserVideo);

            setPeers((prevPeers) => ({
              ...prevPeers,
              [userId]: call,
            }));
          });
        });
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getMediaStream();

    return () => {
      // Cleanup function: close peer connections, stop streams, etc. on component unmount
      // Implement necessary cleanup actions for Peer connections and media streams
    };
  }, [Id]);

  return (
    <div>
      Room Id is {Id}
      <div ref={videoGridRef}>
        <video ref={myVideoRef} muted={true} autoPlay playsInline />
      </div>
    </div>
  );
};

export default Room;
