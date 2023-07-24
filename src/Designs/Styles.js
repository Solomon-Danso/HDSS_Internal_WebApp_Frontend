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








