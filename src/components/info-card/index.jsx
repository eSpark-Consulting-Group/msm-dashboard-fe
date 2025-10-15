import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import OutlinedInput from "../input";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useUpdateNtpMutation } from "../../services/ntp";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateMqttMutation } from "../../services/mqtt";
import { useUpdateSftpMutation } from "../../services/sftp";
import { pen } from "../../assets";
import { useSelector } from "react-redux";
import DynamicModal from "../modal";
import EditMqtt from "../edit-mqtt-modal";
import NtpEditModal from "../ntp-edit-modal";
import SftpEditModal from "../sftp-edit-modal";
import dayjs from "dayjs";

const InfoCard = ({
  title,
  info,
  buttonLabel,
  onButtonClick,
  date,
  time,
  role,
  id,
  buttonLoading,
  type,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { currentDevice, selectedDevice } = useSelector(
    (state) => state?.devices
  );

  const { user } = useSelector((state) => state?.auth);

  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [newVal, setNewVal] = useState("");
  const [ntpData, { isLoading }] = useUpdateNtpMutation();
  const [mqtt, { isLoading: mqttLoading }] = useUpdateMqttMutation();
  const [sftp, { isLoading: sftpLoading }] = useUpdateSftpMutation();
  const [editValues, setEditValues] = useState({});
  const [mqttModal, setMqttModal] = useState(false);
  const [ntpModal, setNtpModal] = useState(false);
  const [sftpModal, setSftpModal] = useState(false);

  const handleEdit = (info) => {
    const result = info.reduce((acc, item) => {
      acc[item.key] = item.value2 ?? item.value;
      return acc;
    }, {});

    setEditValues({ ...result, id });

    if (type === "MQTTS") {
      setMqttModal(true);
    } else if (type === "NTP") {
      setNtpModal(true);
    } else if (type === "SFTP") {
      setSftpModal(true);
    }
  };

  const handleFinalEdit = async () => {
    const objToSend = { [editId]: newVal };

    const apiMap = {
      NTP: ntpData,
      MQTTS: mqtt,
      SFTP: sftp,
    };

    const apiFn = apiMap[type];
    if (!apiFn) return;

    let formData;
    if (type === "NTP") {
      formData = { data: objToSend };
    } else {
      formData = objToSend;
    }

    const res = await apiFn({
      formData,
      id,
    });

    if (res?.data) {
      toast.success(`${type} Configuration updated successfully`);
    }
    if (res?.error) {
      console.error(res?.error);
    }
    setEditId("");
    setIsEditMode(false);
    setNewVal("");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "space-between"}
        alignItems="center"
        mb={2}
        flexDirection={isSmallScreen ? "column" : "row"}
        gap={2}
        textAlign={isSmallScreen ? "center" : "left"}
      >
        <Typography variant="h6" fontWeight="bold" fontSize="25px" color="#000">
          {title}
        </Typography>
        {onButtonClick && buttonLabel && (
          <Button
            sx={{
              width: "103px",
              border: "1px solid #0C89E2",
              color: "#0C89E2",
              borderRadius: "10px",
              fontSize: "16px",
            }}
            variant="outlined"
            size="small"
            onClick={onButtonClick}
            loading={buttonLoading}
            disabled={
              selectedDevice !== null &&
              (user?.role?.name === "user"
                ? selectedDevice?.device_data?.device_data?.device_status ===
                  false
                : selectedDevice?.device_data?.device_status === false)
            }
          >
            {buttonLabel}
          </Button>
        )}
        {type !== "INFO" &&
          role !== "user" &&
          selectedDevice !== null &&
          selectedDevice?.device_data?.device_status === true && (
            // <img
            //   src={pen}
            //   alt="icon"
            //   style={{ width: 18, height: 18, cursor: "pointer" }}
            //   // onClick={() => handleEdit(info)}
            //   onClick={() => handleEdit(info)}
            // />
            <Button
              sx={{
                width: "103px",
                border: "1px solid #0C89E2",
                color: "#0C89E2",
                borderRadius: "10px",
                fontSize: "16px",
              }}
              variant="outlined"
              size="small"
              onClick={() => handleEdit(info)}
            >
              Edit
            </Button>
          )}
      </Box>

      <Box>
        <Grid
          container
          spacing={2}
          justifyContent={isSmallScreen ? "center" : "flex-start"}
        >
          {info.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                width: "100%",
                boxShadow: "none",
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              <Card
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  boxShadow: "none",
                  border: "1px solid #E4E4E4",
                  height: "100%",
                }}
              >
                <Box
                  display="flex"
                  justifyContent={isSmallScreen ? "center" : "space-between"}
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                  flexDirection={isSmallScreen ? "column" : "row"}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary !important"
                    fontSize="20px"
                    fontWeight="400"
                    sx={{ mr: isSmallScreen ? 0 : 2 }}
                  >
                    {item.label}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={{
                      xs: "8px",
                      sm: "70px",
                    }}
                    justifyContent={isSmallScreen ? "center" : "flex-start"}
                    sx={{ wordBreak: "break-word" }}
                  >
                    {isEditMode && item?.key === editId ? (
                      <OutlinedInput
                        name={item?.key}
                        value={newVal}
                        onInputChange={(e) => setNewVal(e.target.value)}
                        sx={{ width: "350px" }}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        fontSize="20px"
                      >
                        {item.value}
                      </Typography>
                    )}
                    {item.showIcon &&
                      role !== "user" &&
                      editId !== item?.key &&
                      selectedDevice !== null &&
                      selectedDevice?.device_data?.device_status === true && (
                        // <img
                        //   src={pen}
                        //   alt="icon"
                        //   style={{ width: 18, height: 18, cursor: "pointer" }}
                        //   // onClick={() => handleEdit(info)}
                        //   onClick={() => handleEdit(info)}
                        // />
                        <></>
                      )}
                    {item.showIcon &&
                      role !== "user" &&
                      editId === item?.key &&
                      !isLoading &&
                      !mqttLoading &&
                      !sftpLoading && (
                        <Box sx={{ display: "flex", columnGap: "10px" }}>
                          <CloseIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => {
                              setEditId("");
                              setIsEditMode(false);
                              setNewVal("");
                            }}
                          />
                          <CheckIcon
                            sx={{ color: "green", cursor: "pointer" }}
                            onClick={handleFinalEdit}
                          />
                        </Box>
                      )}
                    {item.showIcon &&
                      role !== "user" &&
                      editId === item?.key &&
                      (isLoading || mqttLoading || sftpLoading) && (
                        <CircularProgress size={15} />
                      )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {(date || time) && (
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mt={5}
          textAlign="center"
        >
          {date && (
            <Box
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E4E4E4",
                padding: "25px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: 400,
                color: "#000000",
                width: { xs: "100%", sm: "235px" },
                height: "113px",
              }}
            >
              Date:
              <div style={{ color: "#505050", marginTop: "8px" }}>
                {now.format("DD-MM-YYYY")}
              </div>
            </Box>
          )}
          {time && (
            <Box
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E4E4E4",
                padding: "25px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: 400,
                color: "#000000",
                width: { xs: "100%", sm: "235px" },
                height: "113px",
              }}
            >
              Time:
              <div style={{ color: "#505050", marginTop: "8px" }}>
                {now.format("HH:mm")}
              </div>
            </Box>
          )}
        </Box>
      )}
      <DynamicModal
        open={mqttModal}
        handleClose={() => {
          setMqttModal(false);
          setEditValues({});
        }}
      >
        <EditMqtt
          data={editValues}
          handleCancel={() => {
            setMqttModal(false);
            setEditValues({});
          }}
        />
      </DynamicModal>

      <DynamicModal
        open={ntpModal}
        handleClose={() => {
          setNtpModal(false);
          setEditValues({});
        }}
      >
        <NtpEditModal
          data={editValues}
          handleCancel={() => {
            setNtpModal(false);
            setEditValues({});
          }}
        />
      </DynamicModal>

      <DynamicModal
        open={sftpModal}
        handleClose={() => {
          setSftpModal(false);
          setEditValues({});
        }}
      >
        <SftpEditModal
          data={editValues}
          handleCancel={() => {
            setSftpModal(false);
            setEditValues({});
          }}
        />
      </DynamicModal>
    </>
  );
};

export default InfoCard;
