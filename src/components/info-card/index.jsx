import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import OutlinedInput from "../input";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useUpdateNtpMutation } from "../../services/ntp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateMqttMutation } from "../../services/mqtt";
import { useUpdateSftpMutation } from "../../services/sftp";
import { copy, edit, eye } from "../../assets";
import { useSelector } from "react-redux";
import DynamicModal from "../modal";
import EditMqtt from "../edit-mqtt-modal";
import NtpEditModal from "../ntp-edit-modal";
import SftpEditModal from "../sftp-edit-modal";
import dayjs from "dayjs";
import Dropdown from "../drop-down";
import { copyToClipboard, decrypt, formatLabel } from "../../utils";
import EditMqtts from "../edit-mqtts-modal";
import {
  useGetVersionsListQuery,
  useLazyCheckUpdatesQuery,
  useUpdateVersionMutation,
} from "../../services/ota";
import {
  useResetDevicePasswordMutation,
  useVerifyPasswordMutation,
} from "../../services/auth";
import { useFormik } from "formik";
import { devicePasswordScehma } from "../../schemas";
import ConfigurationEditModal from "../configuration-edit-modal";

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
  columns = [],
  data = [],
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentDevice, selectedDevice } = useSelector(
    (state) => state?.devices,
  );
  const { user } = useSelector((state) => state?.auth);

  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [openPermissionModal, setOpenPermissionModal] = useState(false);
  const [dashboardPw, setDashboardPw] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [modal, setModal] = useState(false);
  const [editPwModal, setEditPwModal] = useState(false);

  const startTimer = () => {
    setTimeLeft(15);
    setIsRunning(true);
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setDashboardPw("");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

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
  const [mqttsModal, setMqttsModal] = useState(false);
  const [configurationModal, setConfigurationModal] = useState(false);
  const [versionData, setversionData] = useState([]);

  const handleEdit = (info) => {
    const result = info.reduce((acc, item) => {
      acc[item.key] = item.value2 ?? item.value;
      return acc;
    }, {});

    setEditValues({ ...result, id });

    if (type === "MQTT") {
      setMqttModal(true);
    } else if (type === "NTP") {
      setNtpModal(true);
    } else if (type === "SFTP") {
      setSftpModal(true);
    } else if (type === "MQTTS") {
      setMqttsModal(true);
    } else if (type === "CONFIGURATION") {
      setConfigurationModal(true);
    }
  };

  const handleFinalEdit = async () => {
    const objToSend = { [editId]: newVal };

    const apiMap = {
      NTP: ntpData,
      MQTT: mqtt,
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

  const {
    data: versionsList,
    isLoading: versionLoading,
    isFetching: versionFetching,
    isError: isVersionError,
    error: versionError,
    isSuccess: versionSuccess,
    refetch: refetchVersionsList,
  } = useGetVersionsListQuery("", {
    skip: user?.role?.name === "user" || type !== "OTA",
    refetchOnMountOrArgChange: true,
  });

  const [
    checkUpdateQuery,
    { isLoading: updateLoading, data: updateData, isFetching: updateFetching },
  ] = useLazyCheckUpdatesQuery();

  useEffect(() => {
    if (isVersionError && versionError) {
      toast.error(versionError?.data?.message, { toastId: "VERSIONERROR" });
      return;
    }
  }, [isVersionError, versionError]);

  const [updateVersion, { isLoading: versionUpdateLoading }] =
    useUpdateVersionMutation();

  const handleUpdateVersion = () => {
    const payload = {
      devices: [
        { device_uuid: id, version: selectedVersion?.replace("MSM_", "") },
      ],
    };
    updateVersion(payload)
      .then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          setModal(false);
          navigate(`/dashboard`);
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message, { toastId: "OTAERROR" });
          setModal(false);
          return;
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setModal(false);
        console.log(err, "err");
      });
  };

  const [verify, { isLoading: passwordVerificationLoading }] =
    useVerifyPasswordMutation();

  const [resetPass, { isLoading: devicePwChangeLoading }] =
    useResetDevicePasswordMutation();

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema: devicePasswordScehma,
    onSubmit: async (values, { resetForm }) => {
      const body = {
        old_password: values.old_password,
        new_password: values.new_password,
      };
      const res = await resetPass({ id, body });
      if (res?.data) {
        resetForm();
        toast.success(res?.data?.message);
        setEditPwModal(false);
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    },
  });

  useEffect(() => {
    if (versionSuccess && Array.isArray(versionsList?.data)) {
      const data = versionsList.data.map((version) => ({
        label: version,
        value: version,
      }));
      setversionData(data);
    }
  }, [versionsList?.data, versionSuccess]);

  const isOTA = type === "OTA";
  const isOtaLoading = versionLoading || versionFetching;

  const isDeviceOffline =
    selectedDevice !== null &&
    (user?.role?.name === "user"
      ? selectedDevice?.device_data?.device_data?.device_status === false
      : selectedDevice?.device_data?.device_status === false);
  const isDisabled = isOTA ? isOtaLoading : isDeviceOffline;

  const handleUpdates = async () => {
    const res = await checkUpdateQuery();
    if (res?.data?.status) {
      await refetchVersionsList();
    } else if (res?.error) {
      setversionData([]);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "space-between"}
        alignItems="center"
        flexDirection={isSmallScreen ? "column" : "row"}
        textAlign={isSmallScreen ? "center" : "left"}
        gap={2}
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" fontSize="25px" color="#000">
          {title}
        </Typography>
        {onButtonClick && buttonLabel && (
          <Button
            sx={{
              width: "max-content",
              minWidth: "103px",
              border: "1px solid #0C89E2",
              color: "#0C89E2",
              borderRadius: "10px",
              fontSize: "16px",
            }}
            variant="outlined"
            size="small"
            // onClick={type === "OTA" ? refetchVersionsList : onButtonClick}
            onClick={type === "OTA" ? handleUpdates : onButtonClick}
            loading={buttonLoading || updateLoading || updateFetching}
            disabled={isDisabled}
          >
            {buttonLabel}
          </Button>
        )}
        {(type === "CC" ||
          type === "Voltage" ||
          type === "CTR" ||
          (type !== "INFO" &&
            type !== "OTA" &&
            role !== "user" &&
            selectedDevice !== null &&
            selectedDevice?.device_data?.device_status)) && (
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
            onClick={() => handleEdit(type === "CONFIGURATION" ? data : info)}
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
          {type === "OTA" && (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
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
                  alignItems="flex-end"
                  flexWrap="wrap"
                  gap={1}
                  flexDirection={isSmallScreen ? "column" : "row"}
                  sx={{ ".MuiFormControl-root ": { flex: 1 } }}
                >
                  <Dropdown
                    name="version"
                    customLabel="Available Versions"
                    variant="outlined"
                    placeholder="Select Version"
                    noLabel
                    loading={versionLoading || versionFetching}
                    options={versionData}
                    value={selectedVersion}
                    handleChange={(e) => setSelectedVersion(e.target.value)}
                    renderValueSx={{
                      color: "#000",
                      fontWeight: 400,
                    }}
                    selectSx={{
                      backgroundColor: "#FFF",
                      border: "1.38px solid #DBD6D6",
                      borderRadius: "6.92px",
                      height: "56px",
                    }}
                    disabled={
                      selectedDevice !== null &&
                      (user?.role?.name === "user"
                        ? selectedDevice?.device_data?.device_data
                            ?.device_status === false
                        : selectedDevice?.device_data?.device_status === false)
                    }
                  />
                  <Button
                    sx={{
                      width: "max-content",
                      minWidth: "103px",
                      border: "1px solid #0C89E2",
                      color: "#0C89E2",
                      borderRadius: "10px",
                      fontSize: "16px",
                      height: "56px",
                    }}
                    variant="outlined"
                    size="small"
                    onClick={() => setModal(true)}
                    loading={buttonLoading}
                    disabled={
                      selectedVersion === "" ||
                      (selectedDevice !== null &&
                        (user?.role?.name === "user"
                          ? selectedDevice?.device_data?.device_data
                              ?.device_status === false
                          : selectedDevice?.device_data?.device_status ===
                            false))
                    }
                  >
                    Start OTA
                  </Button>
                </Box>
              </Card>
            </Grid>
          )}

          {type === "CONFIGURATION" && (
            <Card
              elevation={1}
              sx={{
                px: 1,
                borderRadius: 1,
                boxShadow: "none",
                border: "1px solid #E4E4E4",
                width: "100%",
                height: "100%",
              }}
            >
              <TableContainer>
                <Table
                  sx={{
                    minWidth: { xs: 750, md: 850 },
                    width: "100%",
                    borderSpacing: "8px 8px",
                  }}
                >
                  <TableRow
                    sx={{
                      "& td": {
                        border: "0 !important",
                        boxShadow:
                          "0px 6px 20px rgba(0, 0, 0, 0.12) !important",
                      },
                    }}
                  >
                    {columns?.map((col) => (
                      <TableCell
                        key={col.key}
                        sx={{
                          width: "fit-content",
                          textAlign: col?.key === "name" ? "center" : "center",
                          fontSize: "16px",
                          textWrap: "nowrap",
                        }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableBody>
                    {data && data?.length > 0 ? (
                      data?.map((row, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          sx={{
                            "& td": {
                              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.12)",
                            },
                          }}
                        >
                          {columns?.map((col) => (
                            <TableCell
                              key={col?.key}
                              sx={{
                                width: "fit-content",
                                textAlign:
                                  col?.key === "name" ? "center" : "center",
                                color:
                                  col?.key === "status" && row?.status
                                    ? "#0ea709 !important"
                                    : col?.key === "status" && !row?.status
                                      ? "#ff0000 !important"
                                      : "inherit",
                              }}
                            >
                              {col?.key === "name"
                                ? formatLabel(row[col?.key])
                                : col?.key === "status"
                                  ? row?.status
                                    ? "Active"
                                    : "Inactive"
                                  : (row[col?.key] ?? "-")}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow
                        sx={{
                          "& td": {
                            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.12)",
                          },
                        }}
                      >
                        <TableCell
                          colSpan={columns?.length}
                          align="center"
                          sx={{ fontWeight: 500 }}
                        >
                          Not Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          )}

          {type === "CONFIGURATION"
            ? null
            : info
                .filter((i) => !i?.checkBox)
                ?.map((item, index) => (
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
                        justifyContent={
                          isSmallScreen ? "center" : "space-between"
                        }
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
                            sm: "20px",
                          }}
                          justifyContent={
                            isSmallScreen ? "center" : "flex-start"
                          }
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
                              {item?.password
                                ? item.value
                                    ?.slice(0, 6)
                                    ?.split("")
                                    .map((i) => "*")
                                    .join("")
                                : item.value}
                            </Typography>
                          )}
                          {item?.password && (
                            <img
                              onClick={() => setOpenPermissionModal(item.value)}
                              src={eye}
                              alt="Icon"
                              style={{
                                cursor: "pointer",
                                width: "24px",
                                height: "24px",
                                marginRight: "10px",
                                marginTop: "5px",
                              }}
                            />
                          )}
                          {item.showIcon &&
                            role !== "user" &&
                            editId !== item?.key &&
                            selectedDevice !== null &&
                            selectedDevice?.device_data?.device_status ===
                              true && (
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

          {type === "MQTTS" && (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
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
                  justifyContent={isSmallScreen ? "center" : "space-around"}
                  alignItems="flex-end"
                  flexWrap="wrap"
                  gap={1}
                  flexDirection={isSmallScreen ? "column" : "row"}
                  sx={{ ".MuiFormControl-root ": { flex: 1 } }}
                >
                  {info
                    ?.filter((i) => i?.checkBox)
                    .map((item) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled
                              checked={item?.value}
                              sx={{ color: "#151515" }}
                            />
                          }
                          label={item?.label}
                        />
                      );
                    })}
                </Box>
              </Card>
            </Grid>
          )}
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
        open={mqttsModal}
        handleClose={() => {
          setMqttsModal(false);
          setEditValues({});
        }}
      >
        <EditMqtts
          data={editValues}
          handleCancel={() => {
            setMqttsModal(false);
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
      <DynamicModal
        open={configurationModal}
        handleClose={() => {
          setConfigurationModal(false);
          setEditValues({});
        }}
      >
        <ConfigurationEditModal
          data={data}
          handleCancel={() => {
            setConfigurationModal(false);
            setEditValues({});
          }}
        />
      </DynamicModal>
      <DynamicModal
        open={openPermissionModal}
        handleClose={() => {
          setOpenPermissionModal(false);
        }}
        cancelButtonText={"Close"}
        acceptButtonText={"OK"}
        disabled={isRunning}
        handleCancel={() => setOpenPermissionModal(false)}
        handleAccept={() => {
          verify({ body: { password: dashboardPw } })
            .then((res) => {
              if (res?.data?.success) {
                toast.success("Password Verified");
                startTimer();
                const device_pass = info?.find(
                  (item) => item?.key === "device_pass",
                )?.value;
                setDashboardPw(decrypt(device_pass));
              } else {
                toast.error("Incorrect Password");
                return;
              }
            })
            .catch((err) => {
              toast.error("Something went wrong!");
              console.log(err, "err");
            });
        }}
        heading={"Permission!"}
        isLoading={passwordVerificationLoading}
      >
        <Typography textAlign={"center"} fontSize={"26px"}>
          {timeLeft > 0
            ? "Your device password"
            : "Enter you dashboard password"}
        </Typography>
        <OutlinedInput
          label="Password"
          name="password"
          type="text"
          placeholder="Enter your password"
          value={dashboardPw}
          disabled={isRunning}
          onInputChange={(e) => setDashboardPw(e.target.value)}
          sx={{ ".Mui-disabled": { "-webkit-text-fill-color": "#000000" } }}
          endAdornment={
            timeLeft > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => copyToClipboard(dashboardPw)}
                  src={copy}
                  alt="copy"
                />
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditPwModal(openPermissionModal);
                    setOpenPermissionModal(null);
                    setTimeLeft(0);
                  }}
                  src={edit}
                  alt="copy"
                />
              </Box>
            ) : null
          }
        />
        {timeLeft > 0 && (
          <Typography>Note the password within {timeLeft} seconds</Typography>
        )}
      </DynamicModal>
      <DynamicModal
        open={modal}
        handleClose={() => setModal(false)}
        cancelButtonText="Cancel"
        acceptButtonText="Start OTA"
        handleCancel={() => setModal(false)}
        handleAccept={handleUpdateVersion}
        heading={"Confirm OTA Start"}
        isLoading={versionUpdateLoading}
      >
        <Typography fontSize="24px">
          Are you sure you want to start OTA?
        </Typography>
      </DynamicModal>
      <DynamicModal
        open={editPwModal}
        handleClose={() => setEditPwModal(false)}
        cancelButtonText="Cancel"
        acceptButtonText="Update"
        handleCancel={() => setEditPwModal(false)}
        handleAccept={formik.handleSubmit}
        heading={"Update Device Password"}
        isLoading={devicePwChangeLoading}
      >
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <Typography my={2} fontSize="24px">
            Are you sure you want to update the device password?
          </Typography>
          <OutlinedInput
            label="Old Password"
            name="old_password"
            type="password"
            placeholder="Enter your old password"
            value={formik.values.old_password}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.old_password && Boolean(formik.errors.old_password)
            }
            helperText={
              formik.touched.old_password && formik.errors.old_password
            }
          />
          <OutlinedInput
            label="New Password"
            name="new_password"
            type="password"
            placeholder="Enter your new password"
            value={formik.values.new_password}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.new_password && Boolean(formik.errors.new_password)
            }
            helperText={
              formik.touched.new_password && formik.errors.new_password
            }
          />
          <OutlinedInput
            label="Confirm Password"
            name="confirm_new_password"
            type="password"
            placeholder="Confirm your new password"
            value={formik.values.confirm_new_password}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirm_new_password &&
              Boolean(formik.errors.confirm_new_password)
            }
            helperText={
              formik.touched.confirm_new_password &&
              formik.errors.confirm_new_password
            }
          />
        </Box>
      </DynamicModal>
    </>
  );
};

export default InfoCard;
