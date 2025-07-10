import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DynamicTable, SearchBar, SubHeader } from "../../../components";
import { dashboardData } from "../../../constant";
import { columns } from "../../../columns/dashboard";
import AddDashboardModal from "./add-dashboard-modal";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(dashboardData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);

  const handleDelete = (item) => {
    console.log(item, "delete");
  };

  const handlePageChange = (page) => {
    setPage(page);
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
      />
      <AddDashboardModal
        open={open}
        handleClose={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
        handleAccept={() => console.log("success")}
      />
    </>
  );
};

export default Dashboard;
