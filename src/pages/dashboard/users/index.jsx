import { Box, Button, Typography } from "@mui/material";
import { DynamicTable, SearchBar, SubHeader } from "../../../components";
import { userTableData } from "../../../constant";
import { columns } from "../../../columns/users";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Users = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(userTableData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [total] = useState(7);

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
    const filtered = userTableData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setData(filtered);
    setPage(1);
  }, [search]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <SubHeader
        heading={"Users"}
        buttonText={"Add User"}
        subHeading={"Here’s what’s happening with your device and users"}
        onClick={() => navigate("/users/add")}
      />
      <Box sx={{ width: { xs: "100%", sm: "495px" } }}>
        <SearchBar onChange={(e) => setSearch(e)} />
      </Box>
      <DynamicTable
        data={data}
        columns={columns()}
        page={page}
        pageSize={pageSize}
        total={total}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default Users;
