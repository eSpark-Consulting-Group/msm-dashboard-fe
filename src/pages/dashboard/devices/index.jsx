import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import {
  AddDeviceModal,
  AddGroupModal,
  DeleteModal,
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
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState();
  const tab = searchParams.get("tab");
  const [data, setData] = useState([]);
  const [editDeviceValues, setEditDeviceValues] = useState({});
  const [deviceData, setDeviceData] = useState([]);
  const [deviceGroupData, setDeviceGroupData] = useState([]);
  const [deviceDelete, setDeviceDelete] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const [importDeviceModal, setImportDeviceModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [statusSort, setStatusSort] = useState(-1);
  const [createdSort, setCreatedSort] = useState(-1);
  const [updatedSort, setUpdatedSort] = useState(-1);

  const handleSort = (key, dir) => {
    if (key === "status") {
      setStatusSort(dir);
    } else if (key === "createdAt") {
      setCreatedSort(dir);
    } else if (key === "lastUpdated") {
      setUpdatedSort(dir);
    }
  }

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
      createdSort,
      updatedSort,
    },
    {
      skip: activeTab !== 0 || user?.role?.name === "user",
      refetchOnMountOrArgChange: true,
    }
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
      createdSort,
      updatedSort,
    },
    {
      skip: user?.role?.name !== "user",
      refetchOnMountOrArgChange: true,
    }
  );

  const { devices: devicesData, assignDevices: devicesData2 } = useSelector(
    (state) => state.devices
  );
  const {
    data: groupData,
    isLoading: groupLoading,
    isError: isGroupError,
    isFetching: isGroupFetching,
    error: groupError,
  } = useGetAllGroupsQuery(
    { page, limit: pageSize, search },
    { skip: activeTab !== 1 || user?.role?.name === "user" }
  );

  useEffect(() => {
    if (error?.data?.message === "Devices Not Found" || error2?.data?.message === "Devices Not Found") {
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
      user?.role?.name === "user" ? assignDevicesData2?.count : assignDevicesData?.count;

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
          lastUpdated: dayjs(
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_status_updated_at
              : item?.device_data?.device_status_updated_at
          ).format("DD-MM-YYYY HH:mm"),
        };
      }) || [];
    setDeviceData(deviceData);
    if (activeTab === 0) {
      setData(deviceData);
      setTotal(totalCount)
    }
  }, [isError, error, isError2, error2, user, devicesData, devicesData2, statusSort, createdSort, updatedSort]);

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
    setTotal(groupData?.count)
    setDeviceGroupData(deviceGroupData);
    if (activeTab === 1 && user?.role?.name !== "user") {
      setData(deviceGroupData);
    } else if (activeTab === 1 && user?.role?.name === "user") {
      const data = devicesData2?.map((item) => ({
        createdAt: dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm"),
        name: item?.device_data?.groups_data?.name,
        description: item?.device_data?.groups_data?.description,
      }));
      setData(data);
      setTotal(assignDevicesData2?.count);
    }
  }, [
    isGroupError,
    groupError,
    groupData,
    user,
    devicesData2,
    activeTab,
  ]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicTabs tabs={tabs} width="fit-content" maxWidth={650} />
        <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            label={activeTab === 0 ? "Type Device Name to Search" : null}
            placeholder="Enter Device Name"
          />
        </Box>
      </Box>
      <DynamicTable
        data={data}
        columns={
          activeTab === 0
            ? columns(user?.role?.name, statusSort, createdSort, updatedSort)
            : deviceGroupColumns(user?.role?.name)
        }
        isLoading={deviceLoading || groupLoading || deviceLoading2 || isFetching || isGroupFetching || isFetching2}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
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
          {`Are you sure you want to delete this ${activeTab === 0 ? "device" : "group"
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
    </>
  );
};

export default Devices;
