const servers = {
    iceServers:{
        urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
    },
    iceCandidatePoolSize:10,
}

let pc = RTCPeerConnection();
let localStream = null;
let remoteStream = null;


const webcamButton = document.getElementById('webcamButton');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');



webcamButton.onclick = async () =>{
    localStream = await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
    });
    remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) =>{
        pc.addTrack(track,localStream);
    }) 

  pc.ontrack = event => {
    event.streams[0]
  }
}


















