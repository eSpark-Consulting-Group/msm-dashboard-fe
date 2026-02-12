import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import {
  DynamicModal,
  LogoutModal,
  ProfileModal,
  SearchBar,
} from "../../components";
import { messageIcon, bellIcon, avatar, hamburger } from "../../assets";
import Notifications from "./notification";

const Header = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
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
          justifyContent: { xs: "space-between", md: "flex-end" },
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
        {/* <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: { xs: "220px", md: "300px", lg: "665px" },
          }}
        >
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "13px",
          }}
        >
          {/* <Notifications icon={messageIcon} count={2} /> */}
          <Notifications icon={bellIcon} count={6} />
          <Avatar
            sx={{ cursor: "pointer" }}
            alt={user?.name ?? "User"}
            onClick={handleAvatarClick}
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
              user?.profile_image
            }`}
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
        <MenuItem
          onClick={() => {
            setLogoutModal(true);
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
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
      ></LogoutModal>
    </>
  );
};

export default Header;
