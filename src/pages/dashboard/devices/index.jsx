import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AddDeviceModal,
  AddGroupModal,
  DeleteModal,
  Dropdown,
  DynamicModal,
  DynamicTable,
  DynamicTabs,
  EditGroupModal,
  ImportDeviceModal,
  SearchBar,
  SubHeader,
} from "../../../components";
import { columns } from "../../../columns/devices";
import { useSearchParams } from "react-router-dom";
import { deviceGroupColumns } from "../../../columns/deviceGroupColumns";
import { EditDeviceModal } from "../../../components";
import {
  useDeleteDeviceMutation,
  useGetAllAssignDevicesQuery,
  useGetAllDevicesQuery,
  useUnAssignDeviceMutation,
} from "../../../services/devices";
import {
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
} from "../../../services/groups";
import { useSelector } from "react-redux";

const Devices = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState();
  const tab = searchParams.get("tab");
  const [data, setData] = useState([]);
  const [editDeviceValues, setEditDeviceValues] = useState({});
  const [deviceData, setDeviceData] = useState([]);
  const [deviceGroupData, setDeviceGroupData] = useState([]);
  const [deviceDelete, setDeviceDelete] = useState(false);
  const [deviceUnAssign, setDeviceUnAssign] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const [importDeviceModal, setImportDeviceModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [statusSort, setStatusSort] = useState("");
  const [createdSort, setCreatedSort] = useState("");
  const [updatedSort, setUpdatedSort] = useState("");
  const [nameSort, setNameSort] = useState("");
  const [groupNameSort, setGroupNameSort] = useState("");

  const tabFromQuery = searchParams.get("tab");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSort = (key, dir) => {
    if (key === "status") {
      setStatusSort(dir);
    } else if (key === "createdAt") {
      setCreatedSort(dir);
      setUpdatedSort("");
      setNameSort("");
      setGroupNameSort("");
    } else if (key === "lastUpdated") {
      setUpdatedSort(dir);
      setCreatedSort("");
      setNameSort("");
      setGroupNameSort("");
    } else if (key === "name") {
      setNameSort(dir);
      setCreatedSort("");
      setUpdatedSort("");
      setGroupNameSort("");
    } else if (key === "group" || key === "groups") {
      setGroupNameSort(dir);
      setCreatedSort("");
      setUpdatedSort("");
      setNameSort("");
    }
  };

  // Sorting state
  // const [sortKey, setSortKey] = useState(null);
  // const [sortOrder, setSortOrder] = useState(null); // "asc" | "desc"

  useEffect(() => {
    if (tab) {
      setActiveTab(Number(tab));
    } else {
      setActiveTab(0);
    }
  }, [tab]);

  useEffect(() => {
    if (activeTab === 0) {
      setData(deviceData);
    } else {
      setData(deviceGroupData);
    }
    setPage(1);
    setSearch("");
    // setSortKey(null);
    // setSortOrder(null);
  }, [activeTab]);

  const sortParams = {
    ...(createdSort && { createdSort }),
    ...(updatedSort && { updatedSort }),
    ...(nameSort && { nameSort }),
    ...(groupNameSort && { groupNameSort }),
  };

  const {
    data: assignDevicesData,
    isLoading: deviceLoading,
    isError: isError,
    error: error,
    isFetching,
  } = useGetAllDevicesQuery(
    {
      page,
      limit: pageSize,
      search,
      statusSort,
      ...sortParams,
    },
    {
      skip: activeTab !== 0 || user?.role?.name === "user",
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: assignDevicesData2,
    isLoading: deviceLoading2,
    isFetching: isFetching2,
    isError: isError2,
    error: error2,
  } = useGetAllAssignDevicesQuery(
    {
      page,
      limit: pageSize,
      search,
      statusSort,
      ...sortParams,
    },
    {
      skip: user?.role?.name !== "user",
      refetchOnMountOrArgChange: true,
    },
  );

  const { devices: devicesData, assignDevices: devicesData2 } = useSelector(
    (state) => state.devices,
  );
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: isGroupError,
    isFetching: isGroupFetching,
    error: groupError,
  } = useGetAllGroupsQuery(
    { page, limit: pageSize, search },
    { skip: activeTab !== 1 },
  );

  useEffect(() => {
    if (
      error?.data?.message === "Devices Not Found" ||
      error2?.data?.message === "Devices Not Found"
    ) {
      setData([]);
      setTotal(0);
      return;
    }

    if (isError && error) {
      toast.error(error?.data?.message, { toastId: "DeviceEror" });
      return;
    }

    if (isError2 && error2) {
      toast.error(error2?.data?.message, { toastId: "DeviceEror" });
      return;
    }

    const totalCount =
      user?.role?.name === "user"
        ? assignDevicesData2?.count
        : assignDevicesData?.count;

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
              ? item?.device_data?.groups_data[0]?.name
              : item?.groups_data[0]?.name || "-",
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

          lastUpdated: dayjs(
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_status_updated_at
              : item?.device_data?.device_status_updated_at,
          ).format("DD-MM-YYYY HH:mm"),
        };
      }) || [];
    setDeviceData(deviceData);
    if (activeTab === 0) {
      setData(deviceData);
      setTotal(totalCount);
    }
  }, [
    isError,
    error,
    isError2,
    error2,
    user,
    devicesData,
    devicesData2,
    statusSort,
    createdSort,
    updatedSort,
    nameSort,
    groupNameSort,
  ]);

  useEffect(() => {
    if (isGroupError && groupError) {
      toast.error(groupError?.data?.message, { toastId: "GROUPERROR" });
      setData([]);
      return;
    }

    const deviceGroupData =
      groupData?.data?.map((item) => {
        return {
          ...item,
          createdAt: dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm"),
        };
      }) || [];

    const totalCount =
      user?.role?.name === "user"
        ? assignDevicesData2?.count
        : assignDevicesData?.count;

    setDeviceGroupData(deviceGroupData);
    if (activeTab === 1 && user?.role?.name !== "user") {
      setData(deviceGroupData);
      setTotal(groupData?.count);
    } else if (activeTab === 1 && user?.role?.name === "user") {
      const temp = devicesData2?.map((item) => item?.device_data?.groups_data);
      const result = temp?.flat()?.map((item) => ({
        createdAt: dayjs(item?.createdAt)?.format("DD-MM-YYYY HH:mm"),
        name: item?.name,
        description: item?.description,
      }));
      setData(result);
      setTotal(result?.length);
    } else if (activeTab === 0) {
      setTotal(totalCount);
    }
  }, [isGroupError, groupError, groupData, user, devicesData2, activeTab]);

  const handleEdit = (item) => {
    setEditDeviceValues(item);
    setOpenEditModal(activeTab);
  };

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

  const [deleteDashboard, { isLoading: deleteLoading }] =
    useDeleteDeviceMutation();

  const handleDeleteDevice = (id) => {
    deleteDashboard(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to delete device");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Device deleted successfully");
        setDeviceDelete(false);
      }
    });
  };

  const [deleteGroup, { isLoading: deleteGroupLoading }] =
    useDeleteGroupMutation();

  const handleDeleteGroup = (id) => {
    deleteGroup(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to delete group");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Group deleted successfully");
        setDeviceDelete(false);
      }
    });
  };

  const handleDeleteAction = () => {
    if (activeTab === 0) {
      handleDeleteDevice(deviceDelete?.device_data?.device_uuid);
    } else {
      handleDeleteGroup(deviceDelete?._id);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSubHeaderClick = () => {
    setOpenAddModal(activeTab);
  };

  const tabs = [
    { label: "All", component: <></> },
    { label: "Group", component: <></> },
  ];

  const handleAddDeviceAccept = () => {
    setImportDeviceModal(true);
  };

  const [unassign, { isLoading: unassignLoading }] =
    useUnAssignDeviceMutation();

  const handleUnAssign = (item) => {
    setDeviceUnAssign(item);
  };

  const handleUnassignDevice = () => {
    unassign(deviceUnAssign?.device_data?.device_uuid).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to unassign device");
        setDeviceUnAssign(false);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Device unassigned successfully");
        setDeviceUnAssign(false);
      }
    });
  };

  const handleTabChange = (event, newIndex) => {
    setSelectedIndex(newIndex);
    setSearchParams({ tab: newIndex });
  };

  // Sorting function
  // const handleSortChange = (key, order) => {
  //   setSortKey(key);
  //   setSortOrder(order);
  // };

  // const getSortedData = () => {
  //   if (!sortKey || !sortOrder) return data;

  //   return [...data].sort((a, b) => {
  //     let aVal = a[sortKey];
  //     let bVal = b[sortKey];

  //     // Special handling for status (Active/Inactive)
  //     if (sortKey === "status") {
  //       aVal = aVal?.label || "";
  //       bVal = bVal?.label || "";
  //     }

  //     if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
  //     if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
  //     return 0;
  //   });
  // };

  return (
    <>
      <SubHeader
        heading="Device"
        subHeading="Here’s what’s happening with your device and users"
        buttonText={activeTab === 0 ? "Add New Device" : "Add New Entity Group"}
        onClick={handleSubHeaderClick}
        variant="contained"
      />
      <Stack
        direction={"row"}
        py={2}
        justifyContent={{ xs: "start", lg: "space-between" }}
        alignItems={"center"}
        gap={1.5}
        flexWrap={"wrap"}
      >
        <Tabs
          key={isMobile ? "mobile" : "desktop"}
          value={selectedIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            padding: "5px",
            backgroundColor: "#EFEFEF",
            border: "1px solid #DBD6D6",
            borderRadius: "8px",
            width: "fit-content",
            "& .MuiTabs-scroller": {
              overflowX: "auto",
              scrollSnapType: "x mandatory",
            },
            "& .MuiTabs-flexContainer": {
              display: "inline-flex",
              scrollSnapType: "x mandatory",
              scrollPadding: "5px",
              margin: 0,
              gap: "5px",
            },
          }}
          slotProps={{
            indicator: {
              style: { display: "none" },
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                minHeight: 0,
                height: 36,
                width: {
                  xs: "80px",
                  sm: "131px",
                },
                minWidth: 80,
                px: 0,
                mx: 0,
                color: selectedIndex === index ? "#fff !important" : "#888",
                bgcolor: selectedIndex === index ? "#0C89E2" : "transparent",
                border: selectedIndex === index ? "2px solid #2383C8" : "none",
                "&:hover": {
                  bgcolor: selectedIndex === index ? "" : "#e0e0e0",
                },
                flexShrink: 0,
                scrollSnapAlign: "start",
              }}
            />
          ))}
        </Tabs>
        {(user?.role?.name === "super_admin" ||
          (user?.role?.name === "user" && activeTab === 0)) && (
          <Box
            sx={{ my: "0", width: { xs: "100%" }, maxWidth: { md: "495px" } }}
          >
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              placeholder={
                activeTab === 0 ? "Enter device name" : "Enter group name"
              }
            />
          </Box>
        )}
      </Stack>
      {activeTab === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "start", lg: "end" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{ width: { xs: "100%", lg: "30%" }, maxWidth: { md: "495px" } }}
          >
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
      )}
      <DynamicTable
        data={data}
        columns={
          activeTab === 0
            ? columns(
                user?.role?.name,
                statusSort,
                createdSort,
                updatedSort,
                nameSort,
                groupNameSort,
              )
            : deviceGroupColumns(user?.role?.name)
        }
        isLoading={
          deviceLoading ||
          groupLoading ||
          deviceLoading2 ||
          isFetching ||
          isGroupFetching ||
          isFetching2
        }
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        showUnAssign={user?.role?.name === "super_admin"}
        handleUnAssign={handleUnAssign}
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handlePageChange={handlePageChange}
        total={total}
        hideView={true}
        // sortKey={sortKey}
        // sortOrder={sortOrder}
        // onSortChange={handleSortChange}
        onSortChange={handleSort}
      />
      <DynamicModal
        open={openEditModal === 0}
        handleClose={() => setOpenEditModal(false)}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "30%",
          },
        }}
        heading={"Edit Device ’s Details"}
      >
        <EditDeviceModal
          data={editDeviceValues}
          handleModalClose={() => setOpenEditModal(false)}
          handleCancel={() => setOpenEditModal(false)}
        />
      </DynamicModal>

      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Delete"}
        handleAccept={handleDeleteAction}
        handleCancel={() => setDeviceDelete(false)}
        loading={deleteGroupLoading || deleteLoading}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          {`Are you sure you want to delete this ${
            activeTab === 0 ? "device" : "group"
          }`}
        </Typography>
      </DeleteModal>
      <DynamicModal
        open={openAddModal === 0}
        handleClose={() => setOpenAddModal(false)}
        heading={"Add New Device"}
      >
        <AddDeviceModal onCancel={() => setOpenAddModal(false)} />
      </DynamicModal>
      <DynamicModal
        open={openAddModal === 1}
        handleClose={() => setOpenAddModal(null)}
        heading={"Add Entity Group"}
      >
        <AddGroupModal handleCancel={() => setOpenAddModal(null)} />
      </DynamicModal>
      <DynamicModal
        open={openEditModal === 1}
        handleClose={() => setOpenEditModal(false)}
        heading={"Edit Entity Groups"}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "30%",
          },
        }}
      >
        <EditGroupModal
          data={editDeviceValues}
          handleCancel={() => setOpenEditModal(false)}
        />
      </DynamicModal>
      <DynamicModal
        open={importDeviceModal}
        handleClose={() => setImportDeviceModal(false)}
        acceptButtonText={"Add"}
        heading={"Import Device"}
        cancelButtonText={"Cancel "}
        handleAccept={() => setImportDeviceModal(false)}
        handleCancel={() => setImportDeviceModal(false)}
      >
        <ImportDeviceModal />
      </DynamicModal>
      <DeleteModal
        open={deviceUnAssign}
        handleClose={() => setDeviceUnAssign(false)}
        heading={"Unassign Device"}
        handleAccept={handleUnassignDevice}
        handleCancel={() => setDeviceUnAssign(false)}
        loading={unassignLoading}
        btnText="Unassign"
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to unassign this device?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Devices;
