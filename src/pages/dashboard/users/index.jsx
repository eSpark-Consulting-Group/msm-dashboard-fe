import { Box, Button, Typography } from "@mui/material";
import { DynamicTable, SearchBar } from "../../../components";
import { userTableData } from "../../../constant";
import { columns } from "../../../columns/users";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography
          sx={{ fontSize: "40px", color: "#454545", fontWeight: "900" }}
        >
          Users
        </Typography>
        <Box sx={{ width: { xs: "100%", sm: "160px" } }}>
          <Button
            variant="outlined"
            sx={{ height: "45px", backgroundColor: "white" }}
            disableRipple
            onClick={() => navigate("/users/add")}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <Typography sx={{ color: "#A1A1AA", fontSize: "20px" }}>
        Here’s what’s happening with your device and users
      </Typography>
      <Box sx={{ width: { xs: "100%", sm: "495px" } }}>
        <SearchBar />
      </Box>
      <DynamicTable
        data={userTableData}
        columns={columns()}
        page={1}
        pageSize={7}
      />
    </Box>
  );
};

export default Users;
