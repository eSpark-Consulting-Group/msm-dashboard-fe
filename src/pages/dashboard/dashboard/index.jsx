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
import { dashboardData } from "../../../constant";
import { columns } from "../../../columns/dashboard";
import AddDashboardModal from "./add-dashboard-modal";
import { useNavigate } from "react-router-dom";
import { useDeleteDashboardMutation, useGetAllDashboardsQuery } from "../../../services/dashboard";

const Dashboard = () => {
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);
  const [deviceDelete, setDeviceDelete] = useState(false);

  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
  } = useGetAllDashboardsQuery();

  const [deleteDashboard, { isLoading: deleteLoading }] = useDeleteDashboardMutation();

  const handleDeleteDashboard = () => {
    deleteDashboard(deviceDelete?._id).then(res => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to delete user");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "User deleted successfully")
        setDeviceDelete(false);
      }
    })
  }

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
      return
    }
    setData(dashboardData?.data?.map(item => {
      return {
        ...item,
        createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        customer_name: item?.customer_name || "-",
        group: item?.customer_name || "-",
      }
    }) || [])
  }, [isError, error, dashboardData]);

  const navigate = useNavigate();

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowClick = (item) => {
    navigate(`/dashboard/${item?.id}/info`);
    // navigate(`/dashboard/${item?.title}`);
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
