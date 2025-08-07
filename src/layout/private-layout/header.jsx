import { useState } from "react";
import { Box } from "@mui/material";
import { DynamicModal, ProfileModal, SearchBar } from "../../components";
import { messageIcon, bellIcon, avatar, hamburger } from "../../assets";

const Notifications = ({ icon, count }) => {
  return (
    <Box sx={{ cursor: "pointer", position: "relative" }}>
      <img src={icon} alt="message" />
      <Box
        sx={{
          position: "absolute",
          top: "-3px",
          right: "-3px",
          width: "14px",
          height: "16px",
          background: "#0077FF",
          borderRadius: "50%",
          color: "#FFF",
          fontSize: "10px",
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {count}
      </Box>
    </Box>
  );
};

const Header = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const [profileModal, setProfileModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: "61px",
          width: "100%",
          background: "#fff",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Box
          onClick={() => setOpen(!open)}
          sx={{
            display: { xs: "block", md: "none" },
            cursor: "pointer",
          }}
        >
          <img src={hamburger} alt="menu" />
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { xs: "220px", md: "300px", lg: "665px" },
          }}
        >
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Notifications icon={messageIcon} count={2} />
          <Notifications icon={bellIcon} count={6} />
          <img
            style={{ cursor: "pointer" }}
            src={avatar}
            alt="avatar"
            onClick={() => setProfileModal(!profileModal)}
          />
        </Box>
      </Box>
      <DynamicModal
        open={profileModal}
        // handleAccept={() => setProfileModal(false)}
        // acceptButtonText={"Edit"}
        handleClose={() => setProfileModal(false)}
        hideClose={true}
        sx={{ width: { xs: "95%", md: "70%" }, maxWidth: "1110px" }}
      >
        <ProfileModal handleClose={() => setProfileModal(false)} />
      </DynamicModal>
    </>
  );
};

export default Header;
