import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContainer,MenuButtonOptionLink, } from '../../Designs/Styles'
import DropList from "../../Pages/DropList"
import { AES, enc } from 'crypto-js';

const MenuButtons = () => {
  const navigate = useNavigate();

 
  const [specificRole, setspecificRole] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);
  

  



  return (
<MenuContainer>
{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
  <>
  <DropList logo="S" title="Students">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Option 1</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Option 2</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Option 3</MenuButtonOptionLink>
    </DropList>
  </>
  ):(
  <></>
  )
}
    
         
{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
  <>
  <DropList logo="T" title="Teacher">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Option 1</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Option 2</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Option 3</MenuButtonOptionLink>
    </DropList>
  </>
  ):(
  <></>
  )
}

      
    
</MenuContainer>

  )
}

export default MenuButtons