import React, { useEffect, useState } from 'react'
import { ChartsCard, HomeBanner, HomeCard, HomeCardColumn, HomeCardNumber, HomeCardText, HomeIcon, HomeStudentForm, HomeStudentSelect, SelectStage, SelectStageButton, StudentCardText, StudentInfoCard, StudentListBanner } from '../../Designs/Styles/Profile'
import { colors } from "../../Designs/Colors"
import { HiOutlineUserGroup,HiIdentification } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { AES, enc } from 'crypto-js';
import { BiSolidGroup } from "react-icons/bi";
import { BsPersonFillAdd,BsFillTelephoneOutboundFill,BsCameraFill } from "react-icons/bs";
import { FaMoneyBillAlt,FaBirthdayCake,FaUserGraduate } from "react-icons/fa";
import FeesBarChart from "./FeesBarCharts"
import FeesLineChart from "./FeesLineChart"
import { RiParentFill } from "react-icons/ri";




const Home = () => {
  
  const navigate = useNavigate();
  const [specificRole, setspecificRole] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);

  const handleStudentDataSubmit = () =>{
    alert("Student data submission form working ")
  }

  return (
<>
<HomeBanner>
{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/test") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.green}> <HiOutlineUserGroup/> </HomeIcon>
    <HomeCardText>Students</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> 500</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/test") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.blue}> <BiSolidGroup/> </HomeIcon>
    <HomeCardText>Teachers</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> 73</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/test") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.deepyellow}> <BsPersonFillAdd/> </HomeIcon>
    <HomeCardText>Parents</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> 180</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

{
   specificRole==="SuperiorUser"||specificRole==="SchoolDirector"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/test") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.aqua}> <FaMoneyBillAlt/> </HomeIcon>
    <HomeCardText>Total Earnings</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> 99456</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

</HomeBanner>

{
  specificRole==="SuperiorUser"||specificRole==="SchoolDirector"?(
  <>
 <HomeBanner>

<ChartsCard><FeesBarChart/></ChartsCard>

<ChartsCard><FeesLineChart/> </ChartsCard>
  
</HomeBanner> 
  
  </>
  ):(
  <>
  </>)
}


<StudentInfoCard >

<StudentListBanner
onSubmit={handleStudentDataSubmit}
>
<StudentCardText><HiIdentification/></StudentCardText>
<StudentCardText><BsCameraFill/></StudentCardText>
<StudentCardText><BiSolidGroup/></StudentCardText>
<StudentCardText><FaBirthdayCake/></StudentCardText>
<StudentCardText><FaUserGraduate/></StudentCardText>
<StudentCardText><RiParentFill/></StudentCardText>
<StudentCardText><BsFillTelephoneOutboundFill/></StudentCardText>



<SelectStage
background={colors.darkBlue}
color="white"
border={colors.darkBlue}
>
  <option>Basic 4A</option>
  <option>Basic 4B</option>
  <option>Basic 5A</option>
  <option>Basic 5B</option>
  <option>Basic 6</option>
</SelectStage>
<SelectStageButton  
background={colors.darkBlue}
color="white"
border={colors.darkBlue}
type="submit">Load
  
  </SelectStageButton>


</StudentListBanner>

</StudentInfoCard>







</>
  )
}

export default Home