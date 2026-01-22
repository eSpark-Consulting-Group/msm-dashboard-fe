import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Autocomplete,
  Box,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import {
  Button,
  Dropdown,
  DynamicModal,
  DynamicTable,
  SearchBar,
  SubHeader,
} from "../../../components";
import { columns } from "../../../columns/ota";
import {
  useGetAllAssignDevicesQuery,
  useGetAllDevicesQuery,
} from "../../../services/devices";
import { useDispatch, useSelector } from "react-redux";
import {
  useExportSelectedVersionMutation,
  useGetVersionsListQuery,
  useImportVersionMutation,
  useLazyCheckUpdatesQuery,
  useUpdateVersionMutation,
} from "../../../services/ota";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { setExportLoading, setImportLoading } from "../../../store/slices/ota";

const Devices = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [statusSort, setStatusSort] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  // const [createdSort, setCreatedSort] = useState(-1);
  const [updatedSort, setUpdatedSort] = useState(-1);
  const [OTA_ImportFileModal, Set_OTA_ImportFileModal] = useState(false);
  const [OTA_ExportFileModal, Set_OTA_ExportFileModal] = useState(false);
  const fileInputRef = useRef(null);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleSort = (key, dir) => {
    if (key === "status") {
      setStatusSort(dir);
      // } else if (key === "createdAt") {
      //     setCreatedSort(dir);
    } else if (key === "lastUpdated") {
      setUpdatedSort(dir);
    }
  };

  // Sorting state
  // const [sortKey, setSortKey] = useState(null);
  // const [sortOrder, setSortOrder] = useState(null); // "asc" | "desc"

  const {
    data: versionsList,
    isLoading: versionLoading,
    isFetching: versionFetching,
    isError: isVersionError,
    error: versionError,
    refetch: refetchVersionsList,
    isSuccess: versionSuccess,
  } = useGetVersionsListQuery("", {
    skip: user?.role?.name === "user",
    refetchOnMountOrArgChange: true,
  });

  const [
    checkUpdateQuery,
    { isLoading: updateLoading, data: updateData, isFetching: updateFetching },
  ] = useLazyCheckUpdatesQuery();

  const [exportSelectedVersion, { isLoading: exportSelectedVersionLoading }] =
    useExportSelectedVersionMutation();

  const [importVersion, { isLoading: importVersionLoading }] =
    useImportVersionMutation();

  const dispatch = useDispatch();
  const { OTA_file_import_loading, OTA_file_export_loading } = useSelector(
    (state) => state?.ota,
  );

  useEffect(() => {
    if (isVersionError && versionError) {
      toast.error(versionError?.data?.message, { toastId: "VERSIONERROR" });
      return;
    }
  }, [isVersionError, versionError]);

  const {
    isFetching: deviceFetching,
    isLoading: deviceLoading,
    isError: isError,
    error: error,
    data: assignDevicesData2,
    refetch,
  } = useGetAllDevicesQuery(
    { page, limit: pageSize, search, statusSort, updatedSort },
    {
      skip: user?.role?.name === "user",
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    isFetching: deviceFetching2,
    isLoading: deviceLoading2,
    isError: isError2,
    error: error2,
    refetch: refetch2,
    data: assignDevicesData,
  } = useGetAllAssignDevicesQuery(
    { page, limit: pageSize, search, statusSort, updatedSort },
    {
      skip: user?.role?.name !== "user",
      refetchOnMountOrArgChange: true,
    },
  );

  const { devices: devicesData, assignDevices: devicesData2 } = useSelector(
    (state) => state.devices,
  );

  useEffect(() => {
    if (isError && error) {
      const message = error?.data?.message;
      if (message && message !== "Devices Not Found") {
        toast.error(message, { toastId: "DEVICEERROR" });
      } else {
        setData([]);
      }
      return;
    }
    if (isError2 && error2) {
      toast.error(error2?.data?.message, { toastId: "DEVICEERROR" });
      return;
    }

    const totalCount =
      user?.role?.name === "user"
        ? assignDevicesData?.count
        : assignDevicesData2?.count;
    const sourceData = user?.role?.name === "user" ? devicesData2 : devicesData;
    const deviceData =
      sourceData?.map((item) => {
        const status =
          user?.role?.name === "user"
            ? item?.device_data?.device_data?.device_status
            : item?.device_data?.device_status;
        return {
          ...item,
          createdAt: dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm"),
          deviceId:
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_uuid
              : item?.device_data?.device_uuid || "-",
          name:
            user?.role?.name === "user" ? item?.device_data?.name : item?.name,
          label: item?.label || "-",
          userName: item?.userName || "-",
          groups:
            user?.role?.name === "user"
              ? item?.device_data?.groups_data?.name
              : item?.groups_data?.name || "-",

          status: {
            label: status ? "Active" : "Inactive",
            variant: status ? "green" : "red",
          },
          imei_status: !(
            (user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_imei
              : item?.device_data?.device_imei) &&
            (user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_imei || "-"
              : item?.device_data?.device_imei || "-"
            )
              .toString()
              .trim() !== "" &&
            (user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_imei || "-"
              : item?.device_data?.device_imei || "-"
            )
              .toString()
              .toLowerCase() !== "unknown"
          )
            ? "Unknown"
            : "Available",
          version:
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.ota[0]?.current_version
              : item?.device_data?.ota[0]?.current_version || "-",
          lastUpdated:
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.ota?.length > 0
                ? `${item?.device_data?.device_data?.ota[0]?.last_update_date} ${item?.device_data?.device_data?.ota[0]?.last_update_time}`
                : "-"
              : item?.device_data?.ota?.length > 0
                ? `${item?.device_data?.ota[0]?.last_update_date} ${item?.device_data?.ota[0]?.last_update_time}`
                : "-",
        };
      }) || [];
    setData(deviceData);
    setTotal(totalCount);
  }, [
    isError,
    error,
    isError2,
    error2,
    devicesData,
    statusSort,
    updatedSort,
    assignDevicesData,
    assignDevicesData2,
  ]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  // Sorting function
  // const handleSortChange = (key, order) => {
  //     setSortKey(key);
  //     setSortOrder(order);
  // };

  // const getSortedData = () => {
  //     if (!sortKey || !sortOrder) return data;

  //     return [...data].sort((a, b) => {
  //         let aVal = a[sortKey];
  //         let bVal = b[sortKey];

  //         // Special handling for status (Active/Inactive)
  //         if (sortKey === "status") {
  //             aVal = aVal?.label || "";
  //             bVal = bVal?.label || "";
  //         }

  //         if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
  //         if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
  //         return 0;
  //     });
  // };

  const [selectedVersion, setSelectedVersion] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [versionData, setversionData] = useState([]);
  const [selectedVersions, setSelectedVersions] = useState([]);

  const versionOptions =
    versionsList?.data?.map((item) => ({
      label: item,
      value: item,
    })) || [];

  const handleSelectRow = (id, checked) => {
    setSelectedRows((prev) => {
      if (checked) {
        return prev.includes(id) ? prev : [...prev, id];
      } else {
        return prev.filter((rowId) => rowId !== id);
      }
    });
  };
  const handleSelectAll = (checked) => {
    if (!checked) {
      setSelectedRows([]);
      return;
    }

    const enabledIds = data
      .filter((item) => {
        const otaStatus1 = item?.device_data?.ota?.[0]?.ota_status;
        const otaStatus2 = item?.device_data?.device_data?.ota?.[0]?.ota_status;

        const otaStatus = otaStatus1 || otaStatus2;

        const isOtaStarted = otaStatus === "started";

        return !isOtaStarted;
      })
      .map((item) => item._id);

    setSelectedRows(enabledIds);
  };

  const [updateVersion, { isLoading }] = useUpdateVersionMutation();

  const handleUpdateVersion = () => {
    const payloadArr = data
      .filter((item) => selectedRows.includes(item._id))
      .map((i) => {
        return {
          device_uuid: i.deviceId,
          version: selectedVersion?.replace("MSM_", ""),
        };
      });
    const payload = { devices: payloadArr };
    updateVersion(payload)
      .then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          setSelectedRows([]);
          setSelectedVersion(null);
          setModal(false);
          if (user?.role?.name !== "user") {
            refetch();
          } else {
            refetch2();
          }
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

  useEffect(() => {
    if (versionSuccess && Array.isArray(versionsList?.data)) {
      const data = versionsList.data.map((version) => ({
        label: version,
        value: version,
      }));
      setversionData(data);
    }
  }, [versionsList?.data, versionSuccess]);

  const handleUpdates = async () => {
    const res = await checkUpdateQuery();
    if (res?.data?.status) {
      await refetchVersionsList();
    } else if (res?.error) {
      setversionData([]);
    }
  };

  const handleExportVersion = async (selectedVersion) => {
    if (!selectedVersion?.length) {
      toast.info("Please select at least one version");
      return;
    }

    const versions = selectedVersion.map((v) => v.value);

    Set_OTA_ExportFileModal(false);

    dispatch(setExportLoading(true));

    try {
      const payload = { names: versions };
      const blob = await exportSelectedVersion(payload).unwrap();

      const fileBlob =
        blob instanceof Blob
          ? blob
          : new Blob([blob], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "OTA_file.zip";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Exported Successfully");
    } catch (error) {
      toast.error("Export failed", error);
    } finally {
      dispatch(setExportLoading(false));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.info("Please select a file first");
      return;
    }

    Set_OTA_ImportFileModal(false);

    const formData = new FormData();
    formData.append("versionFile", selectedFile);

    dispatch(setImportLoading(true));

    try {
      await importVersion(formData).unwrap();
      toast.success("File uploaded successfully");
      setSelectedFile(null); // optional reset
    } catch (err) {
      toast.error(err || "Upload failed");
    } finally {
      dispatch(setImportLoading(false));
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <SubHeader
        heading="OTA"
        subHeading="Here’s what’s happening with your device and users"
        buttonText={"Check updates"}
        onClick={handleUpdates}
        variant="contained"
        btnLoading={updateLoading || updateFetching}
        disabled={versionLoading || versionFetching}
        OTA_Files_Download_Button={true}
        importButtonLoading={importVersionLoading || OTA_file_import_loading}
        exportButtonLoading={
          exportSelectedVersionLoading || OTA_file_export_loading
        }
        onExportClick={() => Set_OTA_ExportFileModal(true)}
        onImportClick={() => Set_OTA_ImportFileModal(true)}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          flexWrap="wrap"
          gap={1}
          sx={{
            flexDirection: { xs: "row", lg: "row" },
            width: { xs: "100%", lg: "auto" },
            ".MuiFormControl-root ": { flex: 1 },
          }}
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
            disabled={selectedRows.length === 0 || !selectedVersion}
          >
            Start OTA
          </Button>
        </Box>
        <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
            placeholder="Enter device name"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "100%", lg: "30%" } }}>
          <Dropdown
            name="status"
            variant="outlined"
            placeholder="Select Status"
            noLabel
            options={
              user?.role?.name === "user"
                ? [
                    { label: "All", value: "" },
                    { label: "Active", value: -1 },
                    { label: "In Active", value: 1 },
                  ]
                : [
                    { label: "All", value: "" },
                    { label: "Active", value: -1 },
                    { label: "In Active", value: 1 },
                  ]
            }
            value={statusSort}
            handleChange={(e) => setStatusSort(e.target.value)}
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
          />
        </Box>
      </Box>
      <DynamicTable
        data={data}
        columns={columns(statusSort, updatedSort)}
        isLoading={
          deviceLoading || deviceLoading2 || deviceFetching || deviceFetching2
        }
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handlePageChange={handlePageChange}
        total={total}
        hideView={true}
        hideEdit={true}
        hideDelete={true}
        // sortKey={sortKey}
        // sortOrder={sortOrder}
        // onSortChange={handleSortChange}
        onSortChange={handleSort}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onSelectAll={handleSelectAll}
      />
      <DynamicModal
        open={modal}
        handleClose={() => setModal(false)}
        cancelButtonText="Cancel"
        acceptButtonText="Start OTA"
        handleCancel={() => setModal(false)}
        handleAccept={handleUpdateVersion}
        heading={"Confirm OTA Start"}
        isLoading={isLoading}
      >
        <Typography fontSize="24px">
          Are you sure you want to start OTA?
        </Typography>
      </DynamicModal>
      <DynamicModal
        open={OTA_ImportFileModal}
        handleClose={() => {
          setSelectedFile(null);
          Set_OTA_ImportFileModal(false);
        }}
        acceptButtonText="Import"
        handleAccept={handleUpload}
        handleCancel={() => Set_OTA_ImportFileModal(false)}
        heading="Import OTA File"
        isLoading={importVersionLoading}
        disabled={!selectedFile}
      >
        <Box
          onClick={handleBoxClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: "2px dashed",
            borderColor:
              selectedFile !== null || isDragging ? "#147FCC" : "grey.400",
            borderRadius: 2,
            mt: 2,
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragging ? "action.hover" : "transparent",
          }}
        >
          <Typography variant="body1">Drag & drop file here</Typography>

          <Typography variant="body2">
            or click anywhere to select file
          </Typography>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="*/*"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <Typography mt={2} variant="body2">
              Selected: <b>{selectedFile.name}</b>
            </Typography>
          )}
        </Box>
      </DynamicModal>

      <DynamicModal
        open={OTA_ExportFileModal && !exportSelectedVersionLoading}
        handleClose={() =>
          !exportSelectedVersionLoading && Set_OTA_ExportFileModal(false)
        }
        acceptButtonText="Export"
        handleCancel={() => Set_OTA_ExportFileModal(false)}
        handleAccept={() => handleExportVersion(selectedVersions)}
        heading={"Export OTA Files"}
        isLoading={exportSelectedVersionLoading}
        disabled={selectedVersions?.length === 0}
      >
        <Autocomplete
          multiple
          disabled={exportSelectedVersionLoading}
          disableCloseOnSelect
          options={versionOptions}
          value={selectedVersions}
          onChange={(_, newValue) => {
            setSelectedVersions(newValue);
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.value}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                sx={{ mr: 1 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select OTA Files" />
          )}
          sx={{ mt: 2 }}
        />
      </DynamicModal>
    </>
  );
};

export default Devices;
