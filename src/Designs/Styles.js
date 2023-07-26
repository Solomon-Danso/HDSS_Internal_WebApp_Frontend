import styled from "styled-components";
import LoginBackground from "./Images/1.jpg"
import { colors } from "./Colors";

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
padding: 0.5%;
border-radius: 2rem;

`;
export const MenuContainer = styled.div`

flex: 0.15;
  background-color: #f4f4f4;
  padding: 15px;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  min-height: 100vh;

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
    padding-bottom: 20px;
    &::-webkit-scrollbar {
      --webkit-appearance: none;
    }
  }

`;


export const DashboardContainer = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  padding: 15px;

  @media (max-width: 768px) {
    flex: 0.9;
  }
`;

export const Navigators = styled.div`
background-color: white;
  border-right: 0.5px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;

  @media (max-width: 768px) {
    flex: 0.1;
  }
  `;



export const MenuButtonDiv = styled.div`
display: flex;
flex-direction: column;
gap: 1rem

`;
export const MenuButtonIcon = styled.div`
border-radius: 50%;
  font-size: 1.5rem;
  background-color: white;
  height: 2rem; /* Adjust the height as needed */
  width: 2rem; /* Adjust the width as needed */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

`;
export const MenuButtonLink = styled.div`
color: #131313;
font-size:1.5rem
`;

export const MenuButtonOptionLink = styled.div`
color: #131313;
font-size:1.2rem
cursor: pointer;

`;

export const MenuButtonMain = styled.div`
display: flex;
flex-direction: row;
gap: 1rem
`;

export const MenuButtonOption = styled.div`
display:flex
flex-direction: column;
flex-wrap : wrap;
justify-content: space-evenly;
align-items: center;
padding: 0.5rem;

`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 1%;
  left: 0;
  background-color: red;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: ${({ open }) => (open==true ? 'block' : 'none')};
`;

export const DropdownOption = styled.div`
  margin: 0.5rem 0;
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

export const HDSS_Form = styled.form`
display: flex;
width: 80%;
flex-direction: column;

`;

export const HDSS_Label = styled.label`
font-size: 16px;

`


export const SchoolLogo = styled.img`
  width: 110px;
  height: 110px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
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
    color: gray;
    border: 1px solid ${colors.ivory_dark};
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 4px 18px;
    padding: 11px 25px;
  }
`;








