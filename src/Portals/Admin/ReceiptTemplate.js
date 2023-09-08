import React, { useEffect } from 'react';
import { ContentContainer, Paragraph } from '../../Designs/Styles/Letter';
import { apiServer } from '../../Constants /Endpoints';

const ReceiptTemplate = ({ data }) => {
console.log(apiServer+data.logo)
const link = apiServer+data.logo
  return (
    <ContentContainer background={data.logo}>
        <img src={link} style={{width:"10vw", height:"10vh",backgroundColor:"red"}}/>
        
    <Paragraph>{data.paragraph1}</Paragraph>
    <Paragraph>{data.paragraph2}</Paragraph>
    <Paragraph>{data.paragraph3}</Paragraph>
    <Paragraph>{data.paragraph4}</Paragraph>
    <Paragraph>{data.paragraph5}</Paragraph>
    <Paragraph>{data.paragraph6}</Paragraph>
  </ContentContainer>
  );
};

export default ReceiptTemplate;
