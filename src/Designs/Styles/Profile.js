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
gap:1rem;
flex-wrap: wrap;
padding:1rem;

`;

export const HomeCard = styled.div`
/* From https://css.glass */
background: ${colors.card};
border-radius: 16px;
border: 1px solid ${colors.card};
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

display:flex;
flex-direction:row;
gap:1rem;
padding:2rem;

`;

export const ChartsCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

width:38vw;
height:38vh;
padding:1rem;

`;


export const StudentInfoCard = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  height: 50vh;
  padding: 1rem;
  overflow: hidden; /* Change to hidden */

  /* Position relative for proper stacking context */
  position: relative;
`;


export const StudentInfoCard2 = styled.div`
  background: ${colors.card};
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(19.7px);
  -webkit-backdrop-filter: blur(19.7px);
  
  min-height: 100vh;
  padding: 1rem;
  overflow: hidden; /* Change to hidden */

  /* Position relative for proper stacking context */
  position: relative;
`;



export const AdmitStudentCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

padding:2rem;
overflow:hidden;
margin: 2rem;
border: 1px solid ${({ border }) => border};;


`;

export const AdmitStudentCard2 = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

padding:2rem;
overflow:hidden;
margin: 2rem;
border: 1px solid ${({ border }) => border};


`;
export const EventCard = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

height:auto;
padding:1rem;
overflow:hidden;

`;

export const EventCardSingle = styled.div`
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

height:auto;
padding:1rem;
overflow:hidden;
width: 20vw;
height:auto;

`;

export const EventCardList = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
flex-wrap: wrap;
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
border: 0.5px solid ${colors.white};
height:auto;
padding:0.5rem;
overflow:hidden;
width: 20vw;
@media (max-width: 1500px){
  width:80vw;
}

`;

export const EventCardListHome = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
flex-wrap: wrap;
background: ${colors.card};
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);

height:auto;
padding:2rem;
overflow:hidden;
width: 20vw;

@media (max-width: 1500px){
  width:80vw;
}

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

export const HomeCardTextEvent = styled.div`
font-size: 1.3rem;
text-wrap: break-word;
font-weight: 600;
text-align: center;
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



export const SendButton = styled.button`
 width: 20vw;
  padding: 15px 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.5s ease-in-out;

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
  width:15vw;

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 6vw;
  padding-right: 2rem;
  height: 3rem;
  align-items: center;

  /* Fixed position with respect to the viewport */
  position: fixed;
  top: 4;
  left: 0;
  right: 0;
  color: ${colors.white};
  z-index: 1; /* Ensure it's above the scrolling content */
`;


export const EventBanner = styled.form`
display:flex;
flex-direction: row;
gap:1rem;
padding-left:2rem;
padding-right:2rem;
height: 3rem;
align-items:center;

`


export const StudentCardText = styled.div`
font-size: 1.2rem;
text-wrap: break-word;
font-weight: 600;
flex:1;

color:${colors.darkBlue};
`;

export const EventTitle = styled.div`
text-align: center;
font-size: 1.1rem;
color: ${colors.lightBlue};
font-family:Helvetica

`;

export const EventDateRow = styled.div`
display: flex;
flex-direction: row;
gap:1rem;
@media (max-width: 768px){
  width:80vw;
}
`;
export const EventDateRow2 = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
`;

export const EventDate = styled.div`
display: flex;
flex-direction: column;
gap: 0.1rem;
flex-wrap: wrap;
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(19.7px);
-webkit-backdrop-filter: blur(19.7px);
height:auto;
padding:0.5rem;
overflow:hidden;
border: 1px solid ${({ border }) => border};
  background-color: ${({ background }) => background};
  color: ${({ color }) => color};

  

`;

export const EventDateTitleStart = styled.h3`
text-align: center;
font-size: 1rem;
color: ${colors.green};
font-family:Helvetica

`;

export const EventDateTitleEnd = styled.h3`
text-align: center;
font-size: 1rem;
color: ${colors.red};
font-family:Helvetica

`;

export const MainTitle = styled.div`
font-size: 1.5rem;
color: ${colors.white};
font-family:Helvetica;
font-weight: 700;

`;

export const HeaderTitle = styled.div`
font-size: 1.3rem;
color: ${colors.white};
font-family:Helvetica,
font-weight: 600;


`;

export const FormLable = styled.div`
font-size: 1.1rem;
color: ${colors.white};
font-family:OpenSans

`;

export const AdmitStudentRole = styled.div`
display: flex;
flex-direction: row;
margin: 1rem;
padding: 1rem;
gap:1rem;
flex-wrap: wrap;


`;


export const FormInputStudent = styled.input`
  width: 16vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
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

export const FormInputStudent2 = styled.input`
  width: 60vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
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

export const FeesRow = styled.div`
display: flex;
flex-direction: row;
gap:1rem;
align-items: center;
margin-bottom:1.5rem;

`;

export const FeesIcons = styled.div`
font-size: 3rem;
height:100%
flex:1;

`;



export const FormInputStudent3 = styled.input`
  width: 27vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  color: ${colors.white};
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;

export const FormInputStudent4 = styled.input`
  width: 27vw;
  padding: 15px 10px;
  border: 0.01px solid ${colors.aqua};
  border-radius: 5px;
  font-size: 1.4rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  
  text-align: left;

  
  :hover {
    border: 0.5px solid ${colors.primary};
  }

  :focus {
    border: 0.5px solid ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width:100%;
  }
   @media (max-width: 1500px) {
    font-size: 12px;
    width:100%;
  }
`;


export const FormInputSearch = styled.input`
  width: 100vw;
 background: ${({ background }) => background};
  padding: 15px 10px;
  border: 0.1rem solid ${({ border }) => border};;
  margin-top: 10px;
  font-size: 1.5rem;
  outline: none;
  transition: all 0.5s ease-in-out;
  text-align: center;
  color:${colors.darkBlue};
  /* From https://css.glass */
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);


::placeholder {
    color: white;
  }

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




export const FormTextAreaStudent = styled.textarea`
  min-width: 50vw;
  padding: 15px 10px;
  border: 1px solid ${({ border }) => border};;
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



export const SelectForStudent = styled.select`
width: 17vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
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

export const SelectForStudentRel = styled.select`
width: 16vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
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



export const PaySelector = styled.select`
width: 28vw;
padding: 15px 10px;
border: 1px solid ${({ border }) => border};;
background-color: ${({background})=>background};
color: ${({color})=>color};
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





export const AdmitButton = styled.button`
border: none;
  width: 16vw;
  height: 10vh;
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
  font-size: 1.5rem;

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


export const AdmitButton2 = styled.button`
border: none;
  width: 10vw;
  height: 6.5vh;
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
  font-size: 1.3rem;
  font-family: OpenSans;

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


export const NewStudentListCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 3rem;
  align-items: center;
  color: ${colors.white};
  position: relative;
  z-index: 0;
`;


export const NewStudentListCard2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  height: 3rem;
  align-items: center;
 
  color: ${colors.white};
  position: relative;
  z-index: 1;
`;



export const StudentListResult = styled.div`
  overflow: auto; /* Use auto to allow scrolling when content overflows */

  /* Adjust height to fill available space and leave room for the fixed header */
  height: calc(100% - 3rem);
  margin-top: 3rem; /* Space for the fixed header */
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;


export const CardText = styled.div`
  font-size: 1rem;
  color: ${colors.lightBlue};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
`;

export const CardText2 = styled.div`
  font-size: 1rem;
  color: ${colors.lightBlue};
  text-align: right;
 
   /* Allow each text element to take equal space */
`;

export const CardTextHeader = styled.div`
  font-size: 1.1rem;
  color: ${colors.lightBlue};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextHeader2 = styled.div`
  font-size: 1.1rem;
  color: ${colors.lightBlue};
  text-align: center;
  /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextDateHeader = styled.div`
  font-size: 1.1rem;
  color: ${colors.maingreen};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextActionHeader = styled.div`
  font-size: 1.0rem;
  color: ${colors.maingreen};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

   export const CardTextCreditHeader = styled.div`
  font-size: 1.3rem;
  color: ${colors.mainsecondgreen};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextPayHeader = styled.div`
  font-size: 1.3rem;
  color: ${colors.yellow};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;

  export const CardTextBillHeader = styled.div`
  font-size: 1.3rem;
  color: ${colors.mainred};
  text-align: center;
  flex: 1; /* Allow each text element to take equal space */
  font-weight: 600;
  `;


export const CardImage = styled.img`
width: 7vw;
height: 10vh;
border-radius: 0.5rem;


`;

export const FormLoaders = styled.form`
display: flex;
flex-direction: row;
justify-content: space-between;


`;


export const StudDetails = styled.div`
display: flex;
flex-direction: row;
gap:1rem;
height:auto;


`;

export const StudLeft = styled.div`
display: flex;
flex-direction: column;
`;

export const StudRight = styled.div`
display: flex;
flex-direction: column;

`;
export const StudCenter = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`;

export const BiggerImage = styled.img`
width: 40vw;
height: 73vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;


export const BiggerImage3 = styled.img`
width: 50vw;
height: 100vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;

export const BiggerImage4 = styled.img`
width: 30vw;
height: 35vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;


export const BiggerImage2 = styled.img`
width: 35vw;
height: 80vh;
padding:2rem;


@media (max-width: 768px) {
    width: 20vw;
    height: 30vh;

  }
`;



export const StudDetailRow = styled.div`
gap: 1rem;
display: flex;
flex-direction: row;
margin: 1rem;
width: 30vw;
align-items:center;


:hover{
  font-size:1.6rem;
 
}
`;

export const AboutHeader = styled.div`
font-size: 1.4rem;
font-weight: bold;
color: ${colors.white};
text-decoration: underline;
`;

export const AboutHeader2 = styled.div`
font-size: 1.6rem;
font-weight: bold;
color: ${colors.white};
text-decoration: underline;
text-align: center;
`;



export const StudDetailField = styled.div`
font-size: 1.2rem;
color: #979797

`;

export const StudDetailData = styled.div`
font-size: 1rem;
color: ${colors.white}

`;

