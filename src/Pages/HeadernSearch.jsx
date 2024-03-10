import React, { useEffect, useState } from 'react'
import { Breaker, HImage, HText, HeaderBanner, HeadernSearchBanner, Icon, NotificationBadge, NotificationIcon, SearchBanner, Searcher } from '../Designs/Styles/Dashboard'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {BsGlobe} from 'react-icons/bs'
import {CiSettings,CiGlobe} from 'react-icons/ci'
import { FormInput, HomeSchoolName } from '../Designs/Styles/Styles'
import { apiServer } from '../Constants /Endpoints'

const HeadernSearch = ({pic, name, toggle, toggler}) => {

     const [search, setSearch] = useState("")
     const [SchoolData, SetSchoolData] = useState({})
     useEffect(()=>{
       fetch(apiServer+"api/Setup/GetSchoolData")
       .then(res=>res.json())
       .then(data=>SetSchoolData(data))
       .catch(error=>console.error(error))
       },[])


  return (
    <div  >
    {
        toggle?(
        <>
        <HeadernSearchBanner>
       

            <SearchBanner
           onClick={()=>toggler()}
            >
                <Icon >
                <AiOutlineSearch/> 
                </Icon>
                <HText>
                    Search...
                </HText>
           
            </SearchBanner>
          
           

            <HeaderBanner>

                <Breaker>
                
        <NotificationIcon>
      <CiSettings  />
       <NotificationBadge>15</NotificationBadge>
        </NotificationIcon>

        <NotificationIcon>
      <CiGlobe  />
       <NotificationBadge>507</NotificationBadge>
        </NotificationIcon>
            
            <NotificationIcon>
      <IoIosNotificationsOutline  />
       <NotificationBadge>5</NotificationBadge>
        </NotificationIcon>


                </Breaker>



            </HeaderBanner>

        </HeadernSearchBanner>
        </>
        ):(
        <>
        <HeadernSearchBanner>

           <Searcher
            type="text"
            required
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
           
           />
        </HeadernSearchBanner>
        </>
        )
    }
    
    </div>
  )
}

export default HeadernSearch