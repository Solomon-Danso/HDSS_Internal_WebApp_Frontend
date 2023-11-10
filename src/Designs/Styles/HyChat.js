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
























