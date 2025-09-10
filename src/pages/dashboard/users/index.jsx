import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { columns } from "../../../columns/users";
import {
  DeleteModal,
  DynamicModal,
  DynamicTable,
  SearchBar,
  SubHeader,
} from "../../../components";
import AddUserModal from "../../../components/add-user-modal";
import EditUserModal from "../../../components/edit-user-modal";
import { userTableData } from "../../../constant";

const Users = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(userTableData || []);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [total] = useState(7);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [editUserValues, setEditUserValues] = useState({});
  const [deviceDelete, setDeviceDelete] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  const handleAddUserAccept = () => {
    console.log("User added or next step triggered");
    setAddUserModal(false);
  };

  const handleView = (item) => {
    console.log(item, "view");
  };

  const handleEdit = (item) => {
    setEditUserValues(item);
    setEditGroup(true);
    console.log("Editing user:", item);
  };

  const handleDelete = (item) => {
    setSelectedUserToDelete(item);
    setDeviceDelete(true);
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

  const handleUserClick = (item) => {
    console.log(item);
    navigate(`/user/${item?.id}?name=${item?.userName?.name}`);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
        <SubHeader
          heading={"Users"}
          buttonText={"Add New User"}
          subHeading={"Here’s what’s happening with your device and users"}
          onClick={() => setAddUserModal(true)}
          variant="blue"
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
          hideView={true}
          onRowClick={handleUserClick}
        />
      </Box>
      <DynamicModal
        open={addUserModal}
        handleClose={() => setAddUserModal(false)}
        acceptButtonText={"Add"}
        cancelButtonText={"Confirm"}
        heading={"Add New User"}
        handleAccept={handleAddUserAccept}
      >
        <AddUserModal />
      </DynamicModal>
      <DynamicModal
        open={editGroup}
        handleClose={() => setEditGroup(false)}
        heading={"Edit User"}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "30%",
          },
        }}
      >
        <EditUserModal
          values={editUserValues}
          handleModalClose={() => setEditGroup(false)}
          handleCancel={() => setEditGroup(false)}
        />
      </DynamicModal>

      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Are you sure you want to Delete?"}
        handleAccept={() => {
          console.log("Deleting user:", selectedUserToDelete);

          setData((prevData) =>
            prevData.filter((user) => user !== selectedUserToDelete)
          );

          setDeviceDelete(false);
          setSelectedUserToDelete(null);
        }}
        handleCancel={() => {
          setDeviceDelete(false);
          setSelectedUserToDelete(null);
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Delete is permanent and your details will automatically be deleted
          after 30 days if you do not log in again.
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Users;
