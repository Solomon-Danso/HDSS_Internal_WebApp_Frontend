import React, { useState } from 'react'
import { MenuButtonDiv,MenuButtonIcon,MenuButtonLink,MenuContainer,MenuButtonOptionLink, MenuButtonMain, MenuButtonOption, MenuButtonIconAgain, SMenuButtonDiv } from '../../Designs/Styles/Styles'
import { useNavigate } from 'react-router-dom'


const MenuButtons = ({logo, title, path}) => {

const navigate = useNavigate()




  return (

        <SMenuButtonDiv onClick={()=>{navigate(path)}}> 

            <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
          <MenuButtonIcon >{logo}</MenuButtonIcon>
          <MenuButtonLink >{title} </MenuButtonLink>
          </div>
          
      

        </SMenuButtonDiv>



  )
}

export default MenuButtons