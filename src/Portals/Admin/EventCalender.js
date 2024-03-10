import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import EventForm from './EventForm';
import EventListItem from './EventLiist';
import { AddEvents, Events, UpdateEvents, apiServer } from '../../Constants /Endpoints';
import { EventCardList, EventCardListHome, HomeBanner, HomeCardText, HomeCardTextEvent } from '../../Designs/Styles/Profile';
import { AES,enc } from 'crypto-js';


const EventCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get(apiServer + Events)
      .then(response => {
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const [isMobile, setIsMobile] = useState(false);
const [active, setActive] = useState(null);

useEffect(() => {
  setActive(1);
   window.addEventListener("resize", handleResize);
    handleResize();
}, []);

//choose the screen size
const handleResize = () => {
  if (window.innerWidth < 768) {
    setIsMobile(true);
  } else {
    setIsMobile(false);
  }
};


  const handleCreateEvent = (newEvent) => {
    axios.post(apiServer+AddEvents, newEvent)
      .then(response => {
        
        setEvents([...events, response.data]);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error creating event:', error);
      });
  };


  const [specificRole, setspecificRole] = useState("");
 

  return (
    <div className="event-calendar">
      <h2>Event Calendar</h2>
      {
        specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
         <div className="event-form">
        <h3>Create Event</h3>
        <EventForm event={selectedEvent} onSubmit={handleCreateEvent} />
      </div>
        </>):(<></>)
      }
     

<HomeBanner>
   
   <EventCardListHome>
    <HomeCardTextEvent>Upcoming Events</HomeCardTextEvent>
        {events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
           
          />
        ))}
      </EventCardListHome>

{
  isMobile?(<></>):(<>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh", width: "50vw" }} // Adjust as needed
      />
  </>)
}


    
    </HomeBanner>      
    

    </div>
  );
};

export default EventCalendar;
