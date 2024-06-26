import styled from "styled-components";
import LoginBackground from "../Images/2.jpg"
import { colors } from "../Colors";

export const LoginPage = styled.div`

padding: 7.5% 20%;
height: 100vh;
background: url(${LoginBackground}) no-repeat center center
  fixed;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
display: flex;
flex-direction: column;
background-color: ${colors.ivory_dark};

@media (max-width: 768px) {
  padding: 5%;
}

`;

export const MainDashboardContainer = styled.div`
display: flex;
flex-direction: row;
gap:1.0rem;
margin-top: 0.5rem;
height:100vh;
overflow: hidden;
`;

export const MainDashboardMobileContainer = styled.div`
display: flex;
flex-direction: column;
gap:1.0rem;
margin-top: 0.5rem;
height:100vh;

`;


export const MenuContainer = styled.div`

flex: 0.15;
  background-color: ${colors.card};
  colors:${colors.white};
  overflow: hidden;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  height: 100vh;
 

  @media (max-width: 768px) {
    position: fixed;
    z-index: 999;
    width: 85%;
    height: 100%;
    top: 0;
    right: 0;
    transition: all 0.5s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    overflow-y: scroll;
    &::-webkit-scrollbar {
      --webkit-appearance: none;
    }
  }

`;





export const DashboardContainer = styled.div`
flex: 1;
  
  overflow: auto;
   overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
 min-height: 100vh;
  padding: 5px;

  @media (max-width: 768px) {
    flex: 1;
  }
`;





export const MenuButtonDiv = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;

`;


export const SMenuButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: transparent;
  transition: background-color 0.3s;
  margin-bottom:1.4rem;

  &:hover {
    background-color: #B6965D; /* Change this to the desired hover background color */
    border-radius: 3px;
  }

  &:active {
    background-color: ${colors.body}; /* Change this to the desired background color when selected */
  }
`;


export const SingleButtonDiv = styled.div`
display: flex;
flex-direction: column;

`;

export const MenuButtonDivInner = styled.div`
display: flex;
flex-direction: column;

`;



export const MenuButtonIcon = styled.div`
border-radius: 50%;
  font-size: 1.5rem;
  height: 2rem;
  width: 2rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:${colors.icon}

`;

export const NavButtonIcon = styled.div`
border-radius: 50%;

  height: 2rem;
  width: 2rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:${colors.icon}

`;

export const MenuButtonIconAgain = styled.div`

  font-size: 1.5rem;
  height: 2rem;
  width: 2rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:${colors.icon}

`;



export const MenuButtonIconInner = styled.div`
border-radius: 50%;
  font-size: 1.5rem;
  height: 2rem;
  width: 2rem; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color:${colors.icon}
  

`;

export const MenuButtonLink = styled.div`
color: ${colors.white};
font-size:1.3rem;
cursor: pointer;
padding-top:0.3rem;


`;
export const MenuButtonLinkInner = styled.div`
font-size:1.2rem;
cursor: pointer;
cursor: pointer;
font-weight: 500;
color: ${colors.white};

`;

export const MenuButtonOptionLink = styled.div`
font-size:1rem;
cursor: pointer;
cursor: pointer;
margin-bottom:0.5rem;

&:hover {
  color: ${colors.yellow};
  font-size:1.1rem;
}

`;



export const ProfileButtonOptionLink = styled.div`
font-size:1.2rem
cursor: pointer;
cursor: pointer;
margin-bottom:1rem;
color: ${colors.card};

&:hover {
  color: ${colors.darkBlue};
  font-size:1.25rem;
}

`;



export const MenuButtonMain = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: ${colors.card};


`;
export const MenuButtonMainInner = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
colors:${colors.white};
`;


export const MenuButtonOption = styled.div`
display:flex
flex-direction: column;
flex-wrap : wrap;
justify-content: space-evenly;
align-items: center;
padding: 0.5rem;
margin-top:0;
gap:1rem;

`;






export const LoginWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  border-radius: 5px;


  box-shadow: 0px 20px 40px rgb(10 33 65 / 5%), 0px 0px 2px rgb(0 0 0 / 13%);
`;

export const LoginDiv = styled.div`
  flex: ${({ flex }) => flex};
  display: flex;
  justify-content: center;
  background-color: ${({ background }) => background};
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
    height:80vh;

  @media (max-width: 768px) {
    flex: 1;
    display: ${(props) => (props.hide ? "none" : "flex")};
  }
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 15px 10px;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
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

export const FormInputEvent = styled.input`
  width: 20vw;
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

export const FormInputEvent2 = styled.input`
  width: 27vw;
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



export const HDSS_Form = styled.form`
display: flex;
width: 80%;
flex-direction: column;

`;

export const HDSS_Label = styled.label`
font-size: 16px;
color:${colors.htext}

`


export const SchoolLogo = styled.img`
  width: 110px;
  height: 110px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;


export const RSchoolLogo = styled.img`
  width: 10vw;
  height: 15vh;
  align-self: center;

`;

export const RSSchoolLogo = styled.img`
  width: 8vw;
  height: 15vh;
 border-radius:50%;

`;



export const AppName = styled.h3`
  font-size: 20px;
  margin-top: 10%;
  margin-bottom:10%
  font-weight: normal;
  color: white;
  font-size: 18px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

export const AppDesc = styled.p`
  font-size: 13px;
  color: ${colors.ivory};
  text-align: center;
  font-weight: lighter;
`;



export const Button  = styled.button`
  border: none;
  border: 30px;
  border-radius: ${({radius})=>radius};
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
    color: gray;
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }
`;


export const School = styled.div`
background-color:#f0ebea;
height: 15vh;
display:flex;
align-items: center;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
padding: 10px;
flex-direction: row;
gap:0.5rem;


`;

export const SchoolDashboardLogo = styled.img`
width: 50px;
height: 50px;

`;

export const SchoolNameNMotto = styled.div`
display: flex;
flex-direction: column;

`;

export const SchoolName = styled.div`
font-size: 1.5rem;

`;

export const MenuInfo = styled.div`

background-color: ${colors.card};
height:7vh;
font-size: 1.4rem;
color: ${colors.white};
margin-bottom: 5px;
align-items: center;
display:flex;
justify-content: center;
word-wrap: break-word;
text-align: center;
padding: 0.5rem;
`;
export const CompanyLogo = styled.img`
width: 6vw;
height:7vh;
   

`;



export const HomePageBanner = styled.div`

display:flex;
flex-direction: row;
height: auto;
background-color:${colors.card};
align-items: center;
justify-content: space-evenly;
`;
export const HomeLogo = styled.img`
height:7vh;
width:7vh;
`;
export const HomeLogoM = styled.img`
height:7vh;
width:7vh;
`;




export const HomeLogoL = styled.img`
height:20%;
width:100%;
`;

export const HomeSchoolName = styled.div`
font-size: 30px;
text-align: center;
color: ${colors.white};
@media (max-width: 450px) {
  font-size: 1.5rem;
}
`;

export const HomeSchoolNameM = styled.div`
font-size: 1.2rem;
text-align: center;
color: ${colors.white};
@media (max-width: 450px) {
  font-size: 1.5rem;
}
`;

export const FixedTop = styled.div`
background-color: ${colors.card};
border-right: 0.5px solid rgba(0, 0, 0, 0.1);
display: flex;
flex-direction: row;
gap:1rem;
align-items: center;
padding: 10px 5px;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: auto;
z-index: 1000; 

 
`;

export const HomeGrouper = styled.div`
display: flex;
flex-direction:row;
gap:0.1rem;


`;

export const HomeUserPic = styled.img`
height:7vh;
width:7vh;
border-radius:50%;
cursor:pointer;
`;

export const HomeDetailsGrouper = styled.div`
display: flex;
flex-direction:column;
gap:0.1rem;
`;

export const HomeUserName = styled.div`
font-size: 1rem;

color: ${colors.white};
padding: 0.5rem;
cursor:pointer;
`;

export const HomeUserSpecificRole = styled.div`
font-size: 0.8rem;
text-align:center;
cursor:pointer;
color: ${colors.white};
`;

export const DateNTime = styled.div`
font-size: 1rem;
margin: 1rem;
`;

export const ProfileNDate = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

`;

export const ProfileDetails = styled.div`
width:10vw;
height:auto;
display: flex;
justify-content: center;
margin-top: 0.5rem;



`;