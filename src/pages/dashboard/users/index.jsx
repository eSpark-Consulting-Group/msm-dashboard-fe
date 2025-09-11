import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
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
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../../services/users";

const Users = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [total] = useState(7);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserValues, setEditUserValues] = useState();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery();

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
      return
    }
    setData(userData?.data?.map(item => {
      return {
        ...item,
        createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"), customer_name: item?.customer_name || "-",
        userName: {
          image: `${import.meta.env.VITE_IMAGE_BASE_URL}${item?.profile_image}`,
          name: item?.name,
        },
        status: {
          label: item?.status === "active" ? "Active" : "Inactive",
          variant: item?.status === "active" ? "green" : "red",
        },
        deviceId: "-",
      }
    }) || [])
  }, [isError, error, userData]);

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDeleteUser = () => {
    deleteUser(selectedUserToDelete?._id).then(res => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to delete user");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "User deleted successfully")
        setSelectedUserToDelete(null);
      }
    })
  }

  const handleEdit = (item) => {
    setEditUserValues(item);
  };

  const handleDelete = (item) => {
    setSelectedUserToDelete(item);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

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
          isLoading={isLoading}
          data={data}
          columns={columns()}
          page={page}
          pageSize={pageSize}
          total={total}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePageChange={handlePageChange}
          hideView={true}
          onRowClick={handleUserClick}
        />
      </Box>
      <DynamicModal
        open={addUserModal}
        handleClose={() => setAddUserModal(false)}
        heading={"Add New User"}
      >
        <AddUserModal onCancel={() => setAddUserModal(false)} />
      </DynamicModal>
      <DynamicModal
        open={editUserValues}
        handleClose={() => setEditUserValues(false)}
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
          user={editUserValues}
          handleCancel={() => setEditUserValues(false)}
        />
      </DynamicModal>

      <DeleteModal
        loading={deleteLoading}
        open={selectedUserToDelete}
        handleClose={() => setSelectedUserToDelete(false)}
        heading={"Delete"}
        handleAccept={handleDeleteUser}
        handleCancel={() => {
          setSelectedUserToDelete(null);
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to delete this User?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Users;
