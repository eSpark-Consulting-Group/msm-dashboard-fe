import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import {
  DeleteModal,
  DynamicTable,
  SearchBar,
  SubHeader,
} from "../../../components";
import { columns } from "../../../columns/dashboard";
import { useNavigate } from "react-router-dom";
import { useDeleteDeviceMutation, useGetAllDevicesQuery } from "../../../services/devices";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);
  const [deviceDelete, setDeviceDelete] = useState(false);

  const { isLoading, isError, error } = useGetAllDevicesQuery({
    page,
    limit: pageSize,
    search,
  });

  const { devices: dashboardData } = useSelector((state) => state.devices);

  const [deleteDashboard, { isLoading: deleteLoading }] = useDeleteDeviceMutation();

  const handleDeleteDashboard = () => {
    deleteDashboard(deviceDelete?.device_data?.device_uuid).then(res => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to delete device");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Device deleted successfully")
        setDeviceDelete(false);
      }
    })
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
      return;
    }
    setData(
      dashboardData?.map((item) => {
        return {
          ...item,
          createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          deviceId: item?.device_data?.device_uuid || "-",
          group: item?.groups_data?.name || "-",
        };
      }) || []
    );
  }, [isError, error, dashboardData]);

  const navigate = useNavigate();

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowClick = (item) => {
    item?.device_data?.device_uuid &&
      navigate(`/dashboard/${item?.device_data?.device_uuid}/info`);
  };

  return (
    <>
      <SubHeader
        heading="Dashboard"
        subHeading="Here’s what’s happening with your device and users"
      // buttonText="Add New Dashoard"
      // onClick={() => setOpen(true)}
      // variant="contained"
      />
      <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
        <SearchBar value={search} onChange={(val) => setSearch(val)} />
      </Box>
      <DynamicTable
        data={data}
        columns={columns()}
        hideView
        hideEdit
        handleDelete={handleDelete}
        isLoading={isLoading}
        page={page}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        total={total}
        onRowClick={(item) => handleRowClick(item)}
      />
      {/* <AddDashboardModal
        open={open}
        handleClose={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
        handleAccept={() => console.log("success")}
      /> */}
      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Delete"}
        handleAccept={handleDeleteDashboard}
        handleCancel={() => setDeviceDelete(false)}
        loading={deleteLoading}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to delete this dashboard?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Dashboard;
