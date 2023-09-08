import styled from "styled-components";
import { colors } from "../Colors";

export const Paragraph = styled.div`
  font-family: OpenSans serif;
  color: ${colors.darkBlue};
  font-size: 0.8rem;
  width: 403.276px; /* 595.276px - 2 * 96px for margin */

  margin: 1rem;
`;

export const ContentContainer = styled.div`
  
  width: 595.276px; /* A4 width in pixels */
  height: 841.890px; /* A4 height in pixels */
  
`;