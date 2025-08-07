import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(dashboardData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);
  const [deviceDelete, setDeviceDelete] = useState(false);

  const navigate = useNavigate();

  const handleDelete = (item) => {
    console.log(item, "delete");
    setDeviceDelete(true);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowClick = (item) => {
    navigate(`/dashboard/${item?.id}/info`);
    // navigate(`/dashboard/${item?.title}`);
  };

  useEffect(() => {
    const filtered = dashboardData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setData(filtered);
    setPage(1);
  }, [search]);
  return (
    <>
      <SubHeader
        heading="Dashboard"
        subHeading="Here’s what’s happening with your device and users"
        buttonText="Add New Dashoard"
        onClick={() => setOpen(true)}
        variant="contained"
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
        isLoading={false}
        page={page}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        total={total}
        onRowClick={(item) => handleRowClick(item)}
      />
      <AddDashboardModal
        open={open}
        handleClose={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
        handleAccept={() => console.log("success")}
      />
      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Are you sure you want to Delete?"}
        handleAccept={() => setDeviceDelete(false)}
        handleCancel={() => setDeviceDelete(false)}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Delete is permanent and your Details will automatically be deleted
          after 30 days if you do not log in again.
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Dashboard;
