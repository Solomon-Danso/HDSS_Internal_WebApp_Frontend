import styled from "styled-components";
import { colors } from "../Colors";


export const HeaderCard = styled.div`
  background: ${colors.card};
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
gap: 1rem;
display:flex;
flex-direction:row;
`;
