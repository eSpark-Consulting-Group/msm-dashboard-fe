import { Box, Typography } from "@mui/material";
import {
  addOption,
  deleteOption,
  dummyUser,
  uploadIcon,
} from "../../../../assets";
import Button from "../../../../components/buttons";
import { Dropdown, OutlinedInput } from "../../../../components";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddUser = () => {
  const navigate = useNavigate();

  const [sets, setSets] = useState([
    { id: uuidv4(), device: "", access: "", isConfirmed: false },
    { id: uuidv4(), device: "", access: "", isConfirmed: false },
  ]);
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isGeneralConfirmed, setIsGeneralConfirmed] = useState(false);
  const inputRef = useRef(null);

  const handleProfileChange = (e) => setProfileFile(e.target.files[0]);
  const handleUpload = () => inputRef.current.click();
  const HandleAddSet = () =>
    setSets([...sets, { id: uuidv4(), device: "", access: "" }]);
  const HandleRemoveSet = (id) => {
    console.log(id);
    setSets(sets.filter((item) => item.id !== id));
  };

  const handleChange = (id, field, value) =>
    setSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [field]: value } : set))
    );

  const hanleConfirmDevice = (id) => {
    const item = sets.find((item) => item.id === id);
    if (item?.access && item?.device) {
      setSets((prev) =>
        prev.map((set) =>
          set.id === id ? { ...set, isConfirmed: !set.isConfirmed } : set
        )
      );
    } else toast.error("Select options");
  };

  const handlePassword = () => {
    if (password?.length < 5)
      return toast.error("Password must have length of 5 characters");
    if (conPassword !== password) return toast.error("Password must match");
    setIsPasswordConfirmed(!isPasswordConfirmed);
  };

  const handleGeneral = () => {
    if (!username) return toast.error("Username is required");
    if (!email) return toast.error("Email is required");
    setIsGeneralConfirmed(!isGeneralConfirmed);
  };

  useEffect(() => {
    if (!profileFile) return;
    const objectUrl = URL.createObjectURL(profileFile);
    return () => URL.revokeObjectURL(objectUrl);
  }, [profileFile]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography
          sx={{ fontSize: "40px", color: "#454545", fontWeight: "900" }}
        >
          Add User
        </Typography>
        <Box sx={{ width: { xs: "100%", sm: "160px" } }}>
          <Button
            variant="outlined"
            sx={{ height: "45px", backgroundColor: "white" }}
            disableRipple
            onClick={() => navigate("/users")}
          >
            Go Back
          </Button>
        </Box>
      </Box>
      <Typography sx={{ color: "#A1A1AA", fontSize: "20px" }}>
        Here's what's happening with your device and users
      </Typography>

      <Box sx={{ px: { xs: "5px", md: "10px", lg: "20px" } }}>
        <Typography sx={{ color: "#454545", fontSize: "16px" }}>
          Profile Picture
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: "15px",
            mt: "30px",
            alignItems: "center",
          }}
        >
          {profileFile ? (
            <img
              src={URL.createObjectURL(profileFile)}
              style={{ borderRadius: "50%", height: "50px", width: "50px" }}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: "#F8F8F8",
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={dummyUser}
                alt="Icon"
                width={"26.5px"}
                height={"26.5px"}
              />
            </Box>
          )}
          <Box sx={{ width: "190px" }}>
            <Button
              variant="contained"
              sx={{
                fontSize: "16px",
                height: "45px",
                backgroundColor: "#0C89E2",
                display: "flex",
                columnGap: "10px",
                "&:hover": {
                  background: "#0C89E2",
                  boxShadow: "none",
                  border: "none",
                },
                borderRadius: "5px",
              }}
              disableRipple
              onClick={handleUpload}
            >
              <img src={uploadIcon} alt="Icon" /> Upload Picture
            </Button>
          </Box>
        </Box>

        {["General", "Set User Password"].map((section, i) => (
          <Box
            key={i}
            sx={{
              mt: "30px",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
          >
            <Typography sx={{ color: "#454545", fontSize: "16px" }}>
              {section}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "100%", lg: "790px", xl: "65%" },
                flexDirection: { xs: "column", lg: "row" },
                gap: "30px",
              }}
            >
              <Box sx={{ width: { xs: "100%", lg: "300px" } }}>
                <OutlinedInput
                  label={i ? "Set Password" : "Username"}
                  name={i ? "password" : "username"}
                  placeholder={`Enter ${i ? "password" : "user full name"}`}
                  type={i ? "password" : "text"}
                  value={i ? password : username}
                  onInputChange={
                    i
                      ? (e) => setPassword(e.target.value)
                      : (e) => setUsername(e.target.value)
                  }
                  readOnly={i ? isPasswordConfirmed : isGeneralConfirmed}
                />
              </Box>
              <Box sx={{ width: { xs: "100%", lg: "300px" } }}>
                <OutlinedInput
                  label={i ? "Confirm New Password" : "Email"}
                  name={i ? "conPassword" : "email"}
                  placeholder={`Enter ${i ? "password" : "email"}`}
                  type={i ? "password" : "text"}
                  value={i ? conPassword : email}
                  onInputChange={
                    i
                      ? (e) => setConPassword(e.target.value)
                      : (e) => setEmail(e.target.value)
                  }
                  readOnly={i ? isPasswordConfirmed : isGeneralConfirmed}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", lg: "120px" },
                  mt: { xs: "0px", lg: "25px" },
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#888888",
                    height: "40px",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={i ? handlePassword : handleGeneral}
                >
                  {i && isPasswordConfirmed
                    ? "Edit"
                    : i && !isPasswordConfirmed
                    ? "Confirm"
                    : isGeneralConfirmed
                    ? "Edit"
                    : "Confirm"}
                </Button>
              </Box>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  display: { xs: "none", lg: "block" },
                }}
              />
            </Box>
          </Box>
        ))}

        <Typography sx={{ color: "#454545", fontSize: "16px", mt: "30px" }}>
          Device
        </Typography>
        {sets.map((item, index) => (
          <Box
            key={index}
            sx={{
              mt: index ? "30px" : "10px",
              display: "flex",
              rowGap: "10px",

              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "100%", lg: "790px", xl: "65%" },
                flexDirection: { xs: "column", lg: "row" },
                columnGap: "30px",
              }}
            >
              {["device", "access"].map((field) => (
                <Box
                  key={field}
                  sx={{
                    width: { xs: "100%", lg: "300px" },
                    // border: "1px solid red",
                  }}
                >
                  {item.isConfirmed ? (
                    <OutlinedInput
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={item[field]}
                      readOnly
                    />
                  ) : (
                    <Dropdown
                      variant="outlined"
                      options={[
                        { label: "Ten", value: "ten" },
                        { label: "Twenty", value: "twenty" },
                      ]}
                      customLabel={field === "device" ? "Device ID" : "Access"}
                      noLabel
                      placeholder={
                        field === "device"
                          ? "Select or enter device"
                          : "Select access level"
                      }
                      name={field}
                      handleChange={(e) =>
                        handleChange(item.id, field, e.target.value)
                      }
                      value={item[field]}
                    />
                  )}
                </Box>
              ))}
              <Box
                sx={{
                  width: { xs: "100%", lg: "120px" },
                  mt: "25px",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#888888",
                    height: "40px",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={() => hanleConfirmDevice(item.id)}
                >
                  {item.isConfirmed ? "Edit" : "Confirm"}
                </Button>
              </Box>
              {item.isConfirmed && sets?.length > 1 ? (
                <img
                  src={deleteOption}
                  alt="Delete"
                  style={{
                    marginTop: "25px",
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={() => HandleRemoveSet(item.id)}
                />
              ) : index === sets.length - 1 ? (
                <img
                  src={addOption}
                  alt="Add"
                  style={{
                    marginTop: "25px",
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={HandleAddSet}
                />
              ) : (
                <Box sx={{ width: "40px", height: "40px" }} />
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <input
        type="file"
        ref={inputRef}
        onChange={handleProfileChange}
        accept=".jpeg, .jpg, .tiff, .png, .webp"
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default AddUser;
