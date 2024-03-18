import styled from "styled-components";
import { colors } from "../Colors";

import {
  RiHomeLine,
  RiShoppingCartLine,
  RiSecurePaymentLine,
} from "react-icons/ri";
import {BsCashCoin} from  "react-icons/bs"
import { BsQuestionCircleFill } from "react-icons/bs";
import {
  HiOutlineDocumentText,
  HiChevronRight,
  HiOutlineLogout,
} from "react-icons/hi";
import {TbReceipt} from "react-icons/tb"
import {GoAlert} from "react-icons/go"
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiChevronDown, BiPowerOff } from "react-icons/bi";
import { MdHelp , MdEventNote} from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlineSetting } from "react-icons/ai";
import Menu, { Item as MenuItem } from "rc-menu";




export const HeadernSearchBanner = styled.div`

display:flex;
flex-direction: row;
height: 7vh;
background-color:${colors.card};
align-items: center;
justify-content: space-between;
`;

export const SearchBanner = styled.div`
align-items: center;
height:100%;
background-color: ${colors.card};
border:none;
display:flex;
flex-direction: row;

`;

export const Icon = styled.div`
display: flex;
color: ${colors.icon};
align-items: center;
justify-content: center;
padding-left:1.5rem;
font-size: 1.8rem;
`;
export const HText = styled.div`
display: flex;
color: ${colors.htext};
align-items: center;
justify-content: center;
padding-left:0.5rem;
font-size: 1.4rem;

`;

export const HImage = styled.img`
width:3vw;
height:5vh;
border-radius:50%;
padding:1.5rem;

`;
export const Breaker = styled.div`
display: flex;
flex-direction: row;
gap: 2rem;
align-items: center;
justify-content: center;

`;

export const BreakerM = styled.div`
display: flex;
flex-direction: row;
gap: 1.0rem;
align-items: center;
justify-content: center;

`;



export const NotificationIcon = styled.div`
  position: relative;
  display: inline-block;
  color: ${colors.icon};
align-items: center;
justify-content: center;

font-size: 2rem;
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  left: 20px;
  background-color: ${colors.red};
  color: white; /* Customize the badge text color */
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;


export const NotificationIconM = styled.div`
  position: relative;
  display: inline-block;
  color: ${colors.icon};
align-items: center;
justify-content: center;

font-size: 1.5rem;
`;

export const NotificationBadgeM = styled.div`
  position: absolute;
  top: -5px;
  left: 20px;
  background-color: ${colors.red};
  color: white; /* Customize the badge text color */
  border-radius: 50%;
  padding: 1px 3px;
  font-size: 10px;
`;



export const HeaderBanner = styled.div`
align-items: center;
height:100%;
background-color: ${colors.card};
border:none;
display:flex;




`; 

export const Searcher = styled.input`
width:100%;
height:5.5vh;
border-color:${colors.body};
border-radius: 0.5rem;
border-style: solid, 0.5rem;
color: ${colors.htext};
background-color: ${colors.card};
font-size: 1.3rem;
align-items: center;
padding: 0.3rem;
`;

export const CardRow = styled.div`
display:flex;
flex-direction:row;
gap:2rem;
flex-wrap: wrap;
`;



export const MediumCard = styled.div`
background: ${colors.card};
border: 1px solid ${colors.card};
width: 30vw;
height: 30vh;
opacity: 1;
display:flex;
flex-direction: row;
gap:1rem;
@media (max-width: 1600px) {
    width:100%;
  }
`;

export const CardTextDiv = styled.div`
width: 50%;
padding:0.5rem;
gap:0.5rem;
font-family: OpenSans;
word-wrap: break-word;
`;

export const CardImageDiv = styled.img`
width: 45%;
height:100%;


`;


export const LargeCard = styled.div`
background: ${colors.card};
border: 1px solid ${colors.card};
width: 52vw;
height: 30vh;
opacity: 1;
display:flex;
flex-direction: column;
gap:2rem;

@media (max-width: 1600px) {
    width:100%;
    height:auto;
    justify-content: space-between;
  }

`;


export const CText = styled.span`
color: ${colors.ctext};
font-size: 1.2rem;

`;

export const CTextLarge = styled.span`
font-size: 1.2rem;
padding:2rem;

`;

export const CNavText = styled.span`
color: ${colors.icon};
font-size: 0.8rem;

`;


export const StatCard = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  gap: 1rem;
  align-items: center;
`;

export const StatIcon = styled.div`
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  width: 1rem; /* Adjust the width for the reduced background */
  height: 1rem; /* Adjust the height for the reduced background */
  border-radius: 50%;
  padding: 0.75rem; /* Reduce the padding for the reduced background */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const StatText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StatBigText = styled.div`
  font-size: 1.4rem;
`;

export const StatSmallText = styled.div`
  font-size: 1.2rem;
`;



export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`;

export const DashboardNav = styled.div`
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

export const DashIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DashIconMenu = styled(HiOutlineMenuAlt2)`
  width: 35px;
  height: 35px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const IconDashHome = styled(GoAlert)`
  width: 25px;
  height: 25px;
  transition: 0.5s all ease-in-out;
  color: black;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const IconDashShops = styled(RiShoppingCartLine)`
  width: 25px;
  height: 25px;
  transition: 0.5s all ease-in-out;
  color: black;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const IconDashResources = styled(MdEventNote)`
  width: 25px;
  height: 25px;
  transition: 0.5s all ease-in-out;
  color: black;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const IconDashPayment = styled(BsCashCoin)`
  width: 23px;
  height: 23px;
  transition: 0.5s all ease-in-out;
  color: black;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const IconDashSettings = styled(AiOutlineSetting)`
  width: 25px;
  height: 25px;
  transition: 0.5s all ease-in-out;
  color: black;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const IconDashLogoutNav = styled(BiPowerOff)`
  width: 30px;
  height: 30px;
  transition: 0.5s all ease-in-out;
  color: black;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const DashboardSelectSection = styled.div`
  flex: 0.15;
  background-color: #f8f8fa;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;

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

export const DashboardWorkSection = styled.div`
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

export const DashSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  margin-top: 40px;
  font-family: OpenSans, NotoSans, sans-serif;
`;

export const DashIconSep = styled.span`
  display: flex;
  width: 100%;
  color: white;
  margin: 15px 0;
  cursor: pointer;
  transition: 0.5s all ease-in-out;
  border-radius: 30px;

  background-color: ${({ active }) =>
    active ? "white" : colors.primary};
  padding: 4px;
`;

export const DashSearchInput = styled.input`
  flex: 0.8;
  align-self: flex-end;
  font-size: 14px;
  margin-left: 5px;
  background: none;
  border: none;
  outline: none;
`;

export const IconDashRight = styled(HiChevronRight)`
  width: 20px;
  height: 20px;
  color: black;
`;

export const IconDashNotification = styled(IoNotificationsOutline)`
  width: 25px;
  height: 25px;
  color: black;
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  margin-right: 15px;

  :hover {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

export const IconDashProfile = styled(FaUserCircle)`
  width: 35px;
  height: 35px;
  color: black;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

export const IconDashDropDown = styled(BiChevronDown)`
  width: 20px;
  height: 20px;
  color: black;
  border-radius: 50%;
  padding: 2px;
  margin-left: 15px;
  background-color: #f8f8f8;
  transition: 0.5s all ease-in-out;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
    background-color: ${colors.ivory_dark};
  }
`;

export const DashProfileName = styled.span`
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const DashDropMenu = styled(Menu)`
  padding: 10px 15px !important;
  border-radius: 5px !important;
  overflow: hidden;
`;

export const DashDropMenuItem = styled(MenuItem)`
  cursor: pointer;
  transition: 0.5s all ease-in-out;
  display: flex !important;
  align-items: center !important;
  font-weight: lighter !important;

  :hover {
    color: ${colors.primary};
  }
`;

export const IconDashLogout = styled(HiOutlineLogout)`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

export const DashDate = styled.p`
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const DashboardDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: max-content;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DashboardDiv = styled.div`
  height: 200px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
  position: relative;
  margin-top: 40px;
  background-color: #f8f8f8;
  flex: ${({ width }) => width};
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    height: 200px;
    padding: 15px;
    width: 100%;
  }
`;

export const DashBoardDivRight = styled.div`
  border-radius: 15px;
  position: relative;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  position: relative;
  margin-top: 40px;
  height: max-content;
  flex: ${({ width }) => width};
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const DashWelcomeBg = styled.img`
  width: auto;
  height: 220px;
  right: 0;
  bottom: 0;
  object-fit: cover;
  position: absolute;
  z-index: 0;

  @media (max-width: 768px) {
    font-size: 12px;
    height: 120px;
  }
`;

export const DashWelcomeh3 = styled.h3`
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const DashWelcomeh1 = styled.h3`
  font-size: 44px;
  margin-top: 20px;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-top: 10px;
  }
`;

export const DashboardTitle = styled.div`
  display: flex;
  justify-content: center;
  padding: 5%;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 2.5%;
    font-size: 12px;
  }
`;

export const IconDashTour = styled(MdHelp)`
  width: 20px;
  height: 20px;
  color: ${colors.primary};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

export const IconDashReceipt = styled(TbReceipt)`
  width: 20px;
  height: 20px;
  color: ${colors.primary};
  margin-right: 5px;

  @media (max-width: 768px) {
    width: 12px;
    height: 12px;
  }
`;

export const HelpDashButton = styled.button`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14;
  margin-top: 10;
  cursor: pointer;
  overflow: hidden;
  padding: 2%;
  width: 100%;
  background: none;
  transition: 0.5s all ease-in-out;

  :hover{
    background-color: rgba(0, 0, 0, 0.1);
  }
`;






