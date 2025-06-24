import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DynamicTable, SearchBar, SubHeader } from "../../../components";
import { columns } from "../../../columns/devices";
import { deviceData } from "../../../constant";

const Devices = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(deviceData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [total] = useState(20);

  const handleView = (item) => {
    console.log(item, "view");
  };

  const handleEdit = (item) => {
    console.log(item, "edit");
  };

  const handleDelete = (item) => {
    console.log(item, "delete");
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const filtered = deviceData.filter((item) =>
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
        heading="Your Devices"
        subHeading="Here’s what’s happening with your device and users"
        buttonText="Add Device"
      />
      <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
        <SearchBar value={search} onChange={(val) => setSearch(val)} />
      </Box>
      <DynamicTable
        data={data}
        columns={columns()}
        isLoading={false}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        page={page}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        total={total}
      />
    </>
  );
};

export default Devices;
