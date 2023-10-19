import React,{useEffect, useState} from 'react'
import { EventBanner, EventCardList, EventDate, EventDateRow, EventDateRow2, EventDateTitleEnd, EventDateTitleStart, EventTitle, SelectStageButton, SendButton } from '../../Designs/Styles/Profile'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { DeleteEvents, UpdateEvents, apiServer } from '../../Constants /Endpoints';
import AnimateHeight from 'react-animate-height';
import EventForm from './EventForm';
import { FormInputEvent } from '../../Designs/Styles/Styles';
import { AES,enc } from 'crypto-js';


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

  const [specificRole, setspecificRole] = useState("");
  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);



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
     <h3> {formatDateTime(event.start)} </h3>
      </EventDate>

      <EventDate
       
      >
       <EventDateTitleEnd>End At</EventDateTitleEnd>
       <h3>{formatDateTime(event.end)}</h3>
      </EventDate>

      </EventDateRow>

{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
       <EventDateRow2>

<SelectStageButton
background={colors.darkBlue}
color="white"
border={colors.darkBlue}
type="submit"
onClick={() => handleDelete(event)} 
>Delete</SelectStageButton>

</EventDateRow2>  
   </>):(<></>)
}




    </EventCardList>
  )
}

export default EventLiist