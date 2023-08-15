import React, { useState } from "react";
import "../../Designs/Card/DuesTable.scss";
import "../../Designs/Card/PendingRegistrations.scss";
import AnimateHeight from "react-animate-height";
import { GlobalButton } from "../../Designs/Card/Global";
import {
  PendingFullContainer,
  PendingFullDiv,
} from "../../Designs/Card/PendingRegistrations";

import {colors} from "../../Designs/Colors"
import {DashSearchContainer} from "../../Designs/Card/Dashboard"
import { ClipLoader } from "react-spinners";
import { apiServer } from "../../Constants /Endpoints";
import { Show } from "../../Constants /Alerts";
import { NewStudentListCard } from "../../Designs/Styles/Profile";



const Eachrow = (rowdata) =>(
    <div
        style={{
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            marginBottom: 5,
        }}
    >
        <div style={{ flex: 0.3, color: "gray" }}>{rowdata?.title}</div>
        <div style={{ flex: 0.7, paddingLeft: 3 }}>{rowdata?.content}</div>
    </div>
)

const MainRow = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState(false);
  
   
 
    


    const handledelete = async () => {
       const url  = `api/StuSection/removeStudent?email=${data?.email}`
    
      try {
  
        const response = await fetch(apiServer + url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
  
    
        if (response.ok) {
          Show.Success("Deleted")
          window.location.reload();
         
        } else {
          Show.Attention("Failed to Delete")
        }
      } catch (error) {
          console.error(error);
      }
    };





      
        
      
      

    return (
        <NewStudentListCard>
        <li class="table-row">
            <div
                class="col col-d-1"
                data-label="Student Index Number"
                style={{
                    display: "flex",
                    alignItems: "center",
                    
                }}
            >
                {data?.studentId}
            </div>

            <div
                class="col col-d-2"
                data-label="Full Name"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                
                {data?.firstName} {data?.otherName} {data?.lastName} 
                  
                
            </div>

            <div
                class="col col-d-1"
                data-label="Start At"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {data?.dateOfBirth}
            </div>

            <div
                class="col col-d-1"
                data-label="End Date"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {data?.level}
            </div>



            <div
                class="col col-d-4"
                data-label="Status"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
               {data?.internshipStatus}
           
            <GlobalButton
                background={"green"}
                color={"white"}
                style={{
                margin: 0,
                borderRadius: 5,
                padding: "10px 20px",
                width: "max-content",
                marginTop: 10,
                }}
                type="submit"
                onClick={() => setDetails(!details)}
            >
                {details ? "View less" : "View more"}
            </GlobalButton>
            </div>
        </li>
        <AnimateHeight height={details ? "auto" : 0}>
            {loading ? (
            <DashSearchContainer
                style={{
                margin: "10px 0",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.09)",
                }}
            >
                Please wait, deleting fee..
                <ClipLoader color={colors.primary} loading={true} size={15} />
            </DashSearchContainer>
            ) : (
            <PendingFullContainer>
                <PendingFullDiv width={0.7} direction="row">
                <span style={{ flex: 1, paddingLeft: 10 }}>
                    <Eachrow
                        title = {"Company Name"}
                        content = {data?.companyName}
                    />
                    <Eachrow
                        title = {"Industry"}
                        content =  {
                            data?.industry==null?(
                            <>Private</>
                            ):(
                            <>
                            {data?.industry}
                            </>
                            )
                                 
                            }
                    />
                    <Eachrow
                        title = {"Requested Course"}
                        content = {data?.courseId}
                    />
                    <Eachrow
                        title="Student Name"
                        content= {data?.studentName}
                        />

                    <Eachrow
                        title = {"Sex"}
                        content = {data?.sex}
                    />
                    <Eachrow
                        title = {"Programme"}
                        content = {data?.programme}
                    />
                    <Eachrow
                        title = {"Level"}
                        content = {data?.uniLevel}
                    />
                    <Eachrow
                        title = {"Index Number"}
                        content = {data?.studentIndexNumber}
                    />
                    <Eachrow
                        title = {"Student Email"}
                        content = {data?.email}
                    />
                    <Eachrow
                        title = {"Phone Number"}
                        content = {data?.phoneNumber}
                    />
                    <Eachrow
                        title = {"Total Grade Point"}
                        content = {data?.currentTotalGP}
                    />
                    <Eachrow
                        title = {"Internship Branch"}
                        content = {data?.branch}
                    />
                    <Eachrow
                        title = {"Internship Department"}
                        content = {data?.department}
                    />
                    <Eachrow
                        title = {"Internship Location"}
                        content = {data?.digitalAddress}
                    />
                    <Eachrow
                        title = {"Internship Supervisor"}
                        content = {data?.supervisor}
                    />
                     <Eachrow
                        title = {"Job Title"}
                        content = {data?.jobTitle}
                    />
                    <Eachrow
                        title = {"Duties"}
                        content = {data?.duties}
                    />
                    <Eachrow
                        title = {"Total Score"}
                        content = {data?.totalScore}
                    />
                    <Eachrow
                        title = {"General Remarks"}
                        content = {data?.generalRemarks}
                    />
               


                





                </span>
                </PendingFullDiv>
                <PendingFullDiv width={0.3} style={{ justifyContent: "flex-end" }}>
                
                <span style={{ marginTop: 20, display: "flex", flexDirection:"column" }}>

                <GlobalButton
                    background={"#f06040"}
                    color={"white"}
                    style={{
                    margin: 0,
                    marginRight: 20,
                    borderRadius: 5,
                    padding: "10px 20px",
                    width: 100,
                    height:50
                    }}
                    type="button"
                    onClick={() => {
                    
                   
                      handledelete()
                    }}
                >
                    Delete
                </GlobalButton>
                </span>

                </PendingFullDiv>
            </PendingFullContainer>
            )}
        </AnimateHeight>
        </NewStudentListCard>
    );
};

export default MainRow;
