import styled from "styled-components";
import { colors } from "../Colors";


export const ProfileDiv = styled.div`
min-height:100vh;
width: 100%

`;

export const CoverImage = styled.img` 
width: 100vw;
height:20vh;
border-top-left-radius:30px;


`;

export const BasicInfo = styled.div`
position: absolute; /* Position the BasicInfo element */
  bottom: -80px; /* Adjust this value to control the overflow amount */
  left: 20px; /* Adjust this value to control the horizontal position */

    
`;

export const ProfileContainer = styled.div`
position: relative;
`;

export const ProfileImage = styled.img` 
width: 15vw;
height:15vh;

`;

export const HomeBanner = styled.div`
display:flex;
flex-direction: row;
gap:2rem;
flex-wrap: wrap;
padding:1rem;

`;

export const HomeCard = styled.div`
/* From https://css.glass */
background: rgba(255, 255, 255, 1);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
border: 1px solid rgba(255, 255, 255, 1);
display:flex;
flex-direction:row;
gap:1rem;
padding:2rem;
`;

export const ChartsCard = styled.div`
background: rgba(255, 255, 255, 1);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
border: 1px solid rgba(255, 255, 255, 1);
width:38vw;
height:38vh;
padding:1rem;

`;


export const StudentInfoCard = styled.div`
background: rgba(255, 255, 255, 1);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
border: 1px solid rgba(255, 255, 255, 1);
height:50vh;
padding:1rem;
overflow:hidden;

`;



export const HomeIcon = styled.div`
font-size: 3rem;
color: ${({ color }) => color};


`;

export const HomeCardColumn = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export const HomeCardText = styled.div`
font-size: 1.3rem;
text-wrap: break-word;
font-weight: 600;
`;

export const HomeCardNumber = styled.div`
font-size: 3rem;
display:flex;
justify-content: center;
padding: 1rem;
`;

export const HomeStudentForm = styled.form`
height:50vh;
display:flex;
flex-direction: row;
justify-content: space-between;

`;

export const SelectStage = styled.select`
border: none;
  border: 30px;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;

export const SelectStageButton = styled.button`
border: none;
  border: 30px;
  border-radius: 20px;
  border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  padding: 10px 30px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  :hover {
    background-color: ${colors.ivory_dark};
    color: ${colors.primary};
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }


`;


export const StudentListBanner = styled.form`
display:flex;
flex-direction: row;
justify-content:space-between;
padding-left:2rem;
padding-right:2rem;
height: 3rem;
align-items:center;

`

export const StudentCardText = styled.div`
font-size: 1.8rem;
text-wrap: break-word;
font-weight: 600;
color:${colors.darkBlue};
`;



