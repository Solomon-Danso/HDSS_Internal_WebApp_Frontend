import styled from "styled-components";
import { colors } from "../Colors";


export const HeaderCard = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  margin-top:1rem;
 height: 100%;

   width: 100%; 
   @media (max-width: 800px){
    width: 100%;

  }
  `;

  export const AppName = styled.div`
  padding:1.5rem;
  font-size:1.5rem;
  `;
export const RowSB = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`;

export const AppRow = styled.div`
padding:1.5rem;
font-size:1.5rem;
gap:0.2rem;
display:flex;
flex-direction:row;
`;

export const HeaderRow = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
width:90%;

`;

export const ChatImage = styled.img`
width:10vw;
height:15vh;
@media (max-width: 768px){
  width:15vw;
height:7.5vh;
border-radius:50%;
}

`;

export const ChatImageGroup = styled.img`
width:10vw;
height:15vh;
@media (max-width: 768px){
  width:8vw;
height:4vh;
border-radius:50%;
}

`;

export const ChatImagePreview = styled.img`
width:10vw;
height:15vh;
@media (max-width: 768px){
  width:15vw;
  height:auto;

border-radius:50%;
}

`;

export const RowNameandMember2 = styled.div`
display:flex;
flex-direction:column;
padding: 0.5rem;
justify-content:space-between;

`;

export const RowNameandMember = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;

`;


export const ChatName = styled.div`
font-size: 1.1rem;
font-weight:bold;

`;

export const LastMessage = styled.div`
font-size: 1.3rem;

@media (max-width: 768px){
  font-size: 0.7rem;
}

`;

export const Counter = styled.div`
border-radius: 50%
color: ${colors.maingreen}
font-size: 0.7rem;
`;

export const ChatImageUpload = styled.div`

width:5vw;
height:8vh;
background-color: ${colors.maingreen};

padding:0.5rem;
border-radius:50%;


@media (max-width: 768px){
  width:18vw;
  height:auto;
border-radius:50%;

}

`;

export const ChatUploads = styled.div`

width:5vw;
height:8vh;
background-color: ${colors.maingreen};

padding:0.5rem;
border-radius:50%;


@media (max-width: 768px){
  width:30vw;
  height:auto;
border-radius:50%;

}

`;



export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* Additional styles here */
  overflow: hidden;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`;

export const MyMessage = styled.div`
  align-self: flex-end; /* Align to the right */
  width: 80vw;
  margin-bottom: 0.5rem;
  /* Additional styles for MyMessage */
`;

export const OtherMessage = styled.div`
  width: 80vw;
  margin-bottom: 0.5rem;
  /* Additional styles for OtherMessage */
`;

export const ChatCardGroup = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  /* Additional styles here */
 

  @media (max-width: 768px) {
    width: 100%;
    gap:0.5rem;
    padding: 1rem;
    overflow: hidden;
    overflow-y: auto;
   -ms-overflow-style: none; /* IE and Edge */
   scrollbar-width: none;
  }
};
`;





export const ChatMessageInput = styled.input`
  width: 80%;
  height: auto;
  padding: 15px 10px;
  border: 0.3px solid ${colors.maingreen};
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;




export const OptionCard = styled.div`
  background: ${colors.body};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  height: 40vh;
  padding: 1rem;
 
 
  z-index: 1; /* Set a positive z-index value */

  /* You might need to adjust the width if needed */
   width: 20%; 

   position:fixed;
   bottom:0;
   left:0;
   margin-bottom:2.7rem;
   margin-left: 1rem;
@media (max-width: 768px){
  width: 50%;
}
   overflow: hidden;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

`;

export const HeaderText = styled.div`
font-size: 1.1rem;
color:${colors.rcolor};


`;

export const GradeImage = styled.img`
width: 7vw;
height:10vh;


`;










