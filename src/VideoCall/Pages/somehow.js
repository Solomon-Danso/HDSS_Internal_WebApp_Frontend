import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiServer } from '../../Constants /Endpoints';
import { Show } from '../../Constants /Alerts';
import { AES, enc } from 'crypto-js';
import { api } from '../Component/Master';
import Peer from 'peerjs'

const Room = () => {

  const {Id} = useParams()

  
  const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);
  
  
  const [PId, setPId] = useState({})

const navigate = useNavigate()

  const studentDetails = async () => {

  const URL = `api/LMS/CheckWhetherVideoCallIsCorrect?url=${Id}`

    try {
      
  
      const response = await fetch(apiServer + URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
       
        
      });
      
      const data  = await response.json();
      if (response.ok) {
       setPId(data)
        
      } else {
        Show.Attention("Dont try to edit the live video call")
        navigate("/VideoCall")
      }
    } catch (err) {
      Show.Attention(err);
    }
  };


  const videoGridRef = useRef(null);
  const myVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const uservideoGridRef = useRef(null);

  // State to hold the stream for myVideo
  const [myVideoStream, setMyVideoStream] = useState(null);
  let screenStream;

  const peers = {};

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    });
    videoGridRef.current.append(video)
    }

    function adduserVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata',()=>{
          video.play();
      });
      uservideoGridRef.current.append(video)
      }
  


      function connectToNewUser(userId, stream){
        const call = myPeer.call(userId, stream)
        const userVideo = document.createElement('video');
    
        call.on('stream', userVideoStream =>{
            addVideoStream(myVideoRef.current, userVideoStream)
        })
    
        call.on('close',()=>{
            myVideoRef.current.remove();
        })
    
    peers[userId] = call
    
    }
    const socket = api;

 var myPeer = new Peer(undefined,{
    host:'/',
    port:"3001"
});
    


useEffect(()=>{
  studentDetails()


myPeer.on('open',id=>{
  socket.emit('join-room', Id, id)
  smsg("Join room")
 
})

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      setMyVideoStream(stream);

        addVideoStream(myVideoRef.current, stream);



        myPeer.on('call', call => {
          call.answer(stream);


          if (screenStream) {
              return ""
          }else{

              call.on('stream', userVideoStream => {
                  addVideoStream(userVideoRef.current, userVideoStream);
              });
          }
          
        
      });



      socket.on('user-connected', userId => {
        smsg("User Connected")
        connectToNewUser(userId, stream);
       
    });



    })
    .catch(error => {
        console.error('Error accessing media devices:', error);
    });

    socket.on('user-disconnected', userId =>{
      if( peers[userId])  peers[userId].close();
     })
   













},[Id])


const [msg,smsg]  =useState("")






  return (
    <div>
      <div onClick={()=>{navigate("/VideoCall"); window.location.reload()}}>Stop Video</div>
      Room Id is {Id}<br/>
      {msg}
      <div ref={videoGridRef}></div> 
      <video ref={myVideoRef} muted={true} autoPlay playsInline /> 
      <video ref={userVideoRef} muted={false} autoPlay playsInline /> 
      <div ref={uservideoGridRef}></div> 
   
    
    
    </div>
  )
}

export default Room