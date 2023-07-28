import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuButtonDivInner,MenuButtonIcon,MenuButtonIconInner,MenuButtonLinkInner, MenuButtonMainInner, MenuButtonOption } from '../Designs/Styles/Styles'
import AnimateHeight from 'react-animate-height';
import { BsFillArrowRightCircleFill,BsFillArrowUpRightCircleFill } from "react-icons/bs";


const MenuButtons = ({logo, title, children}) => {


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle the value of dropdownOpen
  };





  return (

        <MenuButtonDivInner>

          <MenuButtonMainInner>
          <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
          <MenuButtonLinkInner onClick={toggleDropdown}>{title} </MenuButtonLinkInner>
                  </div>

          <div>
          <MenuButtonIconInner onClick={toggleDropdown}
           style={{
            transform: dropdownOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
          ><BsFillArrowUpRightCircleFill />
          
          </MenuButtonIconInner>
          </div>

          </MenuButtonMainInner>

          <MenuButtonOption>
          <AnimateHeight height={dropdownOpen ? "auto" : 0} duration={500}>    
          <div style={{ marginLeft: "10%" }}>{children}</div>
         </AnimateHeight>
          </MenuButtonOption>

        </MenuButtonDivInner>



  )
}

export default MenuButtons