import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthProvider";
import { pages } from "../../utils/pages";
import DropList from "../Navigation/DropList";
import {
  DashboardSelectSection,
  DashSearchContainer,
  DashSearchInput,
  IconDashRight,
} from "../styles/Dashboard";
import { RowDivSpace } from "../styles/Global";

const MenuButtons = ({ navOpen, page, setNavOpen }) => {
  const [pagename, setPagename] = useState("");
  const { navigate } = useAuth();

  useEffect(() => {
    // console.log("Url: ", page);
    pages?.forEach((element) => {
      if (element?.path === page) setPagename(element?.name);
    });
  }, [page]);

  const direct = (url) => {
    setNavOpen(false);
    navigate(url);
  };

  return (
    <DashboardSelectSection isOpen={navOpen}>
      <h1 style={{ fontSize: 16, textTransform: "capitalize" }}>
        {pagename || page}
      </h1>
      <DashSearchContainer>
        <RiSearchLine color={"black"} size={20} />
        <DashSearchInput placeholder="search.." />
      </DashSearchContainer>
      <DropList title="Dashboard">
        <>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard")}
          >
            Homepage
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/dev")}
          >
            News Updates (o)
          </RowDivSpace>
        </>
      </DropList>
      {/* <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/profile")}
      >
        Profile
        <IconDashRight />
      </RowDivSpace> */}
      <DropList title="Profile">
        <>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/profile")}
          >
            View Profile
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/editprofile")}
          >
            Edit Profile
          </RowDivSpace>
        </>
      </DropList>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        Apply to do Pupilage
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        Apply to do Internship
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        Event Registration
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        Online Store
        <IconDashRight />
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        License Renewal
      </RowDivSpace>
      <DropList title="Dues">
        <>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/dues")}
          >
            Pay
          </RowDivSpace>
          <RowDivSpace
            style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
            onClick={() => direct("/dashboard/receipts")}
          >
            Receipts
          </RowDivSpace>
        </>
      </DropList>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/donations")}
      >
        Donation
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        Pupilage License
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        {"Forum"}
      </RowDivSpace>
      <RowDivSpace
        style={{ fontSize: 14, marginTop: 20, cursor: "pointer" }}
        onClick={() => direct("/dashboard/dev")}
      >
        {"Settings & Privacy"}
      </RowDivSpace>
    </DashboardSelectSection>
  );
};

export default MenuButtons;
