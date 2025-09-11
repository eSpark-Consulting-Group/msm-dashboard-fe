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
import { useGetAllDevicesQuery } from "../../../services/devices";
import { useDeleteGroupMutation, useGetAllGroupsQuery } from "../../../services/groups";

const Devices = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [total] = useState(9);
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
  }, [activeTab]);

  const {
    data: devicesData,
    isLoading: deviceLoading,
    isError: isGroupError,
    error: groupError,
  } = useGetAllDevicesQuery();

  const {
    data: groupData,
    isLoading: groupLoading,
    isError,
    error,
  } = useGetAllGroupsQuery();

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
      return
    }
    const deviceData = devicesData?.data?.map(item => {
      return {
        ...item,
        createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        deviceId: item?.device_uuid || "-",
        deviceName: item?.deviceName || "-",
        label: item?.label || "-",
        userName: item?.userName || "-",
        group: item?.group || "-",
        status: {
          label: item?.mqtt_status ? "Active" : "Inactive",
          variant: item?.mqtt_status ? "green" : "red"
        }
      }
    }) || []
    setDeviceData(deviceData)
    if (activeTab === 0) {
      setData(deviceData);
    }
  }, [isError, error, devicesData]);

  useEffect(() => {
    if (isGroupError && groupError) {
      toast.error(groupError?.data?.message);
      return
    }
    const deviceGroupData = groupData?.data?.map(item => {
      return {
        ...item,
        createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        deviceId: item?.device_uuid
      }
    }) || []
    setDeviceGroupData(deviceGroupData)
    if (activeTab === 1) {
      setData(deviceGroupData);
    }
  }, [isGroupError, groupError, groupData]);

  const handleEdit = (item) => {
    setEditDeviceValues(item);
    setOpenEditModal(activeTab);
  };

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

  const handleDeleteDevice = (id) => {
    console.log(id, "delete device")
  }

  const [deleteGroup, { isLoading: deleteGroupLoading }] = useDeleteGroupMutation();

  const handleDeleteGroup = (id) => {
    deleteGroup(id)
      .then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to delete group");
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "Group deleted successfully");
          setDeviceDelete(false)
        }
      })
  }

  const handleDeleteAction = () => {
    if (activeTab === 0) {
      handleDeleteDevice(deviceDelete?._id);
    } else {
      handleDeleteGroup(deviceDelete?._id);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSubHeaderClick = () => {
    setOpenAddModal(activeTab)
  };

  const tabs = [
    { label: "All", component: <></> },
    { label: "Group", component: <></> },
  ];

  const handleAddDeviceAccept = () => {
    setImportDeviceModal(true);
  };

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
        <DynamicTabs tabs={tabs} />
        <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
          <SearchBar value={search} onChange={(val) => setSearch(val)} />
        </Box>
      </Box>
      <DynamicTable
        data={data}
        columns={activeTab === 0 ? columns() : deviceGroupColumns()}
        isLoading={deviceLoading || groupLoading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        page={page}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        total={total}
        hideView={true}
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
          values={openEditModal === 0}
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
        loading={deleteGroupLoading}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          {`Are you sure you want to delete this ${activeTab === 0 ? "device" : "group"}`}
        </Typography>
      </DeleteModal>
      <DynamicModal
        open={openAddModal === 0}
        handleClose={() => setOpenAddModal(false)}
        acceptButtonText={"Next"}
        heading={"Add New Device"}
        handleAccept={handleAddDeviceAccept}
      >
        <AddDeviceModal />
      </DynamicModal>
      <DynamicModal
        open={openAddModal === 1}
        handleClose={() => setOpenAddModal(null)}
        heading={"Add Entity Group"}
      >
        <AddGroupModal
          handleCancel={() => setOpenAddModal(null)}
        />
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
