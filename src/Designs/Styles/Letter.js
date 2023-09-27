import styled from "styled-components";
import { colors } from "../Colors";

export const Paragraph = styled.div`
  font-family: OpenSans serif;
  color: ${colors.darkBlue};
  font-size: 0.75rem;
  width: 403.276px; /* 595.276px - 2 * 96px for margin */
  margin-right: 1rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

export const ContentContainer = styled.div`
  
width: 595.276px; /* A4 width in pixels */
height: 841.890px; /* A4 height in pixels */

  
`;

export const SchoolLogo = styled.img`
width:8vw;
height:8vh;
`;

export const Salutation = styled.div`
display:flex;
flex-direction:column;
font-family: OpenSans serif;
color: ${colors.darkBlue};

margin-left:50%;

`;
