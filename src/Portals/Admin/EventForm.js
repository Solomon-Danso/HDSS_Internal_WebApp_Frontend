import React, { useState } from 'react';
import axios from 'axios';
import { EventBanner, EventCard, SelectStageButton, SendButton, StudentListBanner } from '../../Designs/Styles/Profile';
import { FormInput, FormInputEvent } from "../../Designs/Styles/Styles";
import { colors } from '../../Designs/Colors';

const EventForm = ({ event, onSubmit }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [start, setStart] = useState(event ? new Date(event.start) : new Date());
  const [end, setEnd] = useState(event ? new Date(event.end) : new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, start, end };
    onSubmit(newEvent);
  };

  return (
    <EventBanner onSubmit={handleSubmit}>
  
        <FormInputEvent
        type="text"
        required
        placeholder="Event title"
        onChange={(e) => setTitle(e.target.value)}
       
        />
         <FormInputEvent
        type="datetime-local"
        required
        placeholder="Start Date"
        onChange={(e) => setStart(e.target.value)}
       
        />

    <FormInputEvent
        type="datetime-local"
        required
        placeholder="End Date"
        onChange={(e) => setEnd(e.target.value)}
       
        />

    <SendButton
      background={colors.darkBlue}
      color="white"
      border={colors.darkBlue}
      type="submit"
      >{event ? 'Update Event' : 'Create Event'}</SendButton>
     

    </EventBanner>
  );
};

export default EventForm;
