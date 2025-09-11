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
import { 
  useGetAllUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from "../../../services/users";

const Users = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [editUserValues, setEditUserValues] = useState({});
  const [deviceDelete, setDeviceDelete] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  // RTK Query hooks
  const { data: usersData, isLoading, error, refetch } = useGetAllUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (usersData) {
      const usersArray = usersData?.data || usersData || [];
      setData(usersArray);
      setTotal(usersArray.length);
      
      // Filter data based on search
      if (search) {
        const filtered = usersArray.filter((item) =>
          Object.values(item).some((val) =>
            String(val).toLowerCase().includes(search.toLowerCase())
          )
        );
        setData(filtered);
        setTotal(filtered.length);
      }
    }
  }, [usersData, search]);

  const handleAddUserAccept = (newUserData) => {
    createUser(newUserData)
      .unwrap()
      .then(() => {
        console.log("User created successfully");
        setAddUserModal(false);
        refetch();
      })
      .catch((error) => {
        console.error("Failed to create user:", error);
      });
  };

  const handleView = (item) => {
    console.log(item, "view");
  };

  const handleEdit = (item) => {
    setEditUserValues(item);
    setEditGroup(true);
  };

  const handleUpdateUser = (updatedUserData) => {
    updateUser({ id: editUserValues.id, formData: updatedUserData })
      .unwrap()
      .then(() => {
        console.log("User updated successfully");
        setEditGroup(false);
        refetch();
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  const handleDelete = (item) => {
    setSelectedUserToDelete(item);
    setDeviceDelete(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserToDelete) {
      deleteUser(selectedUserToDelete.id)
        .unwrap()
        .then(() => {
          console.log("User deleted successfully");
          setDeviceDelete(false);
          setSelectedUserToDelete(null);
          refetch();
        })
        .catch((error) => {
          console.error("Failed to delete user:", error);
        });
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading users: {error.message}</Typography>;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
        <SubHeader
          heading={"Users"}
          buttonText={"Add New User"}
          subHeading={"Here's what's happening with your device and users"}
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
        />
      </Box>
      
      <DynamicModal
        open={addUserModal}
        handleClose={() => setAddUserModal(false)}
        heading={"Add New User"}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "60%",
          },
        }}
      >
        <AddUserModal 
          onSubmit={handleAddUserAccept} 
          onCancel={() => setAddUserModal(false)} 
        />
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
          onSubmit={handleUpdateUser}
          handleModalClose={() => setEditGroup(false)}
          handleCancel={() => setEditGroup(false)}
        />
      </DynamicModal>

      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Are you sure you want to Delete?"}
        handleAccept={handleConfirmDelete}
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