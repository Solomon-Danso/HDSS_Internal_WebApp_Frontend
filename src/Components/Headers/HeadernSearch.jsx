import React, { useState } from 'react'
import { Breaker, CText, HImage, HText, HeaderBanner, HeadernSearchBanner, Icon, NotificationBadge, NotificationIcon, SearchBanner, Searcher } from '../../Designs/Styles/Dashboard'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosNotificationsOutline } from 'react-icons/io'
import {BsGlobe} from 'react-icons/bs'
import {DashBoardettings,CiGlobe} from 'react-icons/ci'
import { FormInput } from '../../Designs/Styles/Styles'

const HeadernSearch = ({pic, name, toggle, toggler}) => {

     const [search, setSearch] = useState("")


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
      <DashBoardettings  />
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

         
            <HImage src={pic}/>
            <CText>{name}</CText>
            

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