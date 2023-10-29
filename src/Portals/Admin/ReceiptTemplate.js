import React, { useEffect } from 'react';
import { Center, ContentContainer, Paragraph, Salutation, SchoolLogo } from '../../Designs/Styles/Letter';
import { apiServer } from '../../Constants /Endpoints';
import school from "../../Designs/Images/download.png"

const ReceiptTemplate = ({ data }) => {

const link = apiServer+data.logo
  return (
    <ContentContainer >

      <SchoolLogo src={school}/>
    <Paragraph>{data.schoolName}</Paragraph>
    <Paragraph>{data.location}</Paragraph>

    <Paragraph><b>{data.name}</b></Paragraph>
    <Paragraph>{data.paragraph1}</Paragraph>
    <Paragraph>{data.paragraph2}</Paragraph>
    <Paragraph>{data.paragraph3}</Paragraph>
    <Paragraph>{data.paragraph4}</Paragraph>
    <Paragraph>{data.paragraph5}</Paragraph>
    <Paragraph>{data.paragraph6}</Paragraph>
    <Salutation>
    <Paragraph>Yours Faithfully,</Paragraph>
    <Paragraph>............................</Paragraph>
    <Paragraph>{data.adminName}</Paragraph>
    <Paragraph>{data.admissionDate}</Paragraph>
    </Salutation>
  </ContentContainer>
  );
};

export default ReceiptTemplate;
