import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import { DynamicModal, LogoutModal, ProfileModal, SearchBar } from "../../components";
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
  const { user } = useSelector((state) => state.auth);
  console.log(user, "user")
  const [query, setQuery] = useState("");
  const [profileModal, setProfileModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setProfileModal(true);
    handleMenuClose();
  };

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
          <Avatar
            sx={{ cursor: "pointer" }}
            alt="User"
            onClick={handleAvatarClick}
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${user?.profile_image}` || null}

          />
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={() => {
          setLogoutModal(true)
          handleMenuClose()
        }}>Logout</MenuItem>
      </Menu>

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
      <LogoutModal
        open={logoutModal}
        handleClose={() => setLogoutModal(false)}
      >
      </LogoutModal>
    </>
  );
};

export default Header;
