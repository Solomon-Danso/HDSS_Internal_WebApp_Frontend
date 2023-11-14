import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { GradeInput } from '../../../Designs/Styles/Profile';
import { HeaderText } from '../../../Designs/Styles/HyChat';

const StudentTableRow = ({ data, idx, handleChangeX }) => {
  const [Id, setId] = useState("");
  const [studName, setStudName] = useState("");

  useEffect(() => {
    if (data) {
      setId(data.studentId);
      setStudName(`${data.firstName} ${data.otherName} ${data.lastName}`);
  
      // Trigger handleChangeX for studentId
      handleChangeX({ target: { value: data.studentId } }, idx, 'studentId');
  
      // Trigger handleChangeX for studentName
      handleChangeX(
        {
          target: { value: `${data.firstName} ${data.otherName} ${data.lastName}` },
        },
        idx,
        'studentName'
      );
    }
  }, );
  

  return (
    <Table.Row>
      <Table.Cell>
        <HeaderText
          name="studentId"
          //onChange={(e) => handleChangeX(e, idx, 'studentId')}
          value={Id}
        >
          {Id}
        </HeaderText>
      </Table.Cell>

      <Table.Cell width={"30vw"}>
        <HeaderText
          name="studentName"
          onChange={(value) => handleChangeX(value, idx, 'studentName')}
          value={studName}
        >
          {studName}
        </HeaderText>
      </Table.Cell>

      <Table.Cell>
      <GradeInput
  type="number"
  step="0.01"
  name="classScore"
  onChange={(e) => handleChangeX(e, idx, 'classScore')}
  max="100"  // Set the maximum value to 100
  required
/>
      </Table.Cell>

      <Table.Cell>
      <GradeInput
  type="number"
  step="0.01"
  name="examScore"
  onChange={(e) => handleChangeX(e, idx, 'examScore')}
  max="100"  // Set the maximum value to 100
  required
/>
      </Table.Cell>

      
    </Table.Row>
  );
};

export default StudentTableRow;
