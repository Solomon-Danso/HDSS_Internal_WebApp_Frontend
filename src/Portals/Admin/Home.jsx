import React, { useEffect, useState } from 'react'
import { HomePage,  } from '../../Designs/Styles'
import { FaUserGraduate } from "react-icons/fa";
import { colors } from '../../Designs/Colors';
import pic1 from "../../Designs/Images/download.png"
import DropList from "../../Pages/DropList"
import { useNavigate } from 'react-router-dom'
import { BsGraphUpArrow} from "react-icons/bs";


const Home = () => {

  const navigate = useNavigate();
  function formatDate(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
  
    // Convert 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;
  
    const formattedDate = `${weekday}, ${day}${daySuffix} ${month}, ${year} ${formattedHours}:${String(minutes).padStart(2, '0')}${amOrPm}`;
  
    return formattedDate;
  }
  
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
const [sysDate, setSysDate] = useState("")

  
  useEffect(()=>{
 const date = new Date();
 setSysDate(formatDate(date))
  })
  const Twinkle =()=>{
    const date = new Date();
 setSysDate(formatDate(date))
  }

  setInterval(Twinkle,1000)
 
  


  return (
    <HomePage>

     

    </HomePage>
  )
}

export default Home