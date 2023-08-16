import React,{useState} from 'react'
import { EventBanner, EventCardList, EventDate, EventDateRow, EventDateRow2, EventDateTitleEnd, EventDateTitleStart, EventTitle, SelectStageButton, SendButton } from '../../Designs/Styles/Profile'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { DeleteEvents, UpdateEvents, apiServer } from '../../Constants /Endpoints';
import AnimateHeight from 'react-animate-height';
import EventForm from './EventForm';
import { FormInputEvent } from '../../Designs/Styles/Styles';


const formatDateTime = (dateTime) => {
   
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  return new Date(dateTime).toLocaleString('en-US', options);
};



const EventLiist = ({ event }) => {
  const navigate = useNavigate();


  const handleDelete = async (event) => {
    
    Show.showLoading("Processing Data");
      try {
  
    
        const response = await fetch(apiServer+DeleteEvents+event.id, {
          method: "DELETE",
         
        });
  console.log(apiServer+DeleteEvents+event.id)
    
        if (response.ok) {
          
          Show.hideLoading();
  
          Show.Success("Event Deleted Successfully ");
          window.location.reload();
           
        } else {
          Show.Attention("Failed");
        }
      } catch (error) {
  
        Show.Attention(error);
      }
  
  }


  return (
    <EventCardList>
      <EventTitle> {event.title}</EventTitle>
      
      <EventDateRow>
      
      <EventDate
       background={colors.darkBlue}
       color="white"
       border={colors.darkBlue}
      >
       <EventDateTitleStart>Start At</EventDateTitleStart>
      {formatDateTime(event.start)}
      </EventDate>

      <EventDate
       
      >
       <EventDateTitleEnd>End At</EventDateTitleEnd>
       {formatDateTime(event.end)}
      </EventDate>

      </EventDateRow>

      <EventDateRow2>

      <SelectStageButton
      background={colors.darkBlue}
      color="white"
      border={colors.darkBlue}
      type="submit"
      onClick={() => handleDelete(event)} 
      >Delete</SelectStageButton>

      </EventDateRow2>


    </EventCardList>
  )
}

export default EventLiist