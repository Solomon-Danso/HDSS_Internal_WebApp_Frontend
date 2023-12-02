import styled from "styled-components";
import { colors } from "../Colors";



export const Container = styled.div`
background: white;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  margin:1rem;
 height: 141vh;
   width: 70vw; 
   padding:2rem;
  
`;

export const ContainerT = styled.div`
background: white;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  margin:1rem;
 height: auto;
   width: 70vw; 
   padding:2rem;
  
`;

export const HomeContainer = styled.div`

border: 0.5rem solid black;
padding:1rem;
 height: 135vh;
   width: 66vw; 
  
`;

export const HomeContainerT = styled.div`

border: 0.5rem solid black;
padding:1rem;
 height: auto;
   width: 66vw; 
  
`;


export const GeneralInfoContainer = styled.div`

border: 0.2rem solid black;
 padding:1rem;
 height: 12vh;
   width: 100%; 
   border-radius:1.5rem;
  
`;

export const PerformanceInfoContainer = styled.div`

border: 0.2rem solid black;
 padding:1rem;
 height: 25vh;
   width: 100%; 
   border-radius:1.5rem;
   margin-top:2rem;
   gap:2rem;
  
`;

export const PerformanceInfoContainerT = styled.div`

border: 0.2rem solid black;
 padding:1rem;
 height: auto;
   width: 100%; 
   border-radius:1.5rem;
   margin-top:2rem;
   gap:2rem;
  
`;

export const PerformanceText = styled.span`
font-size:1.2rem;
font-weight:500;
`;

export const PerformanceRow = styled.div`
display:flex;
flex-direction:row;
justify-content:space-evenly;
font-size:1.2rem;
color:${colors.rcolor}
`;



export const GInfoRow = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`;

export const GInfoMiniRow = styled.div`
display:flex;
flex-direction:row;
gap:0.5rem;
color: ${colors.rcolor};
font-size:1.2rem;

`;

export const GInfoMiniRowT = styled.div`
display:flex;
flex-direction:row;
gap:0.5rem;
color: ${colors.rcolor};
font-size:1.2rem;
align-items:center;
`;



export const RSchoolName = styled.div`
text-align: center;
font-size: 3.5rem;
font-family: Times New Roman,;
color:${colors.rcolor};
font-weight: bold;

`;

export const RSchoolNameS = styled.div`
text-align: center;
font-size: 2rem;
font-family: Times New Roman,;
font-weight: bold;
color:${colors.rcolor}

`;

export const RStudCenter = styled.div`
display: flex;
flex-direction: row;


`;












