import { Box, Typography } from "@mui/material";
import {
  DeleteModal,
  DynamicTable,
  SearchBar,
  SubHeader,
} from "../../../../components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { userDetails } from "../../../../constant";
import { columns } from "../../../../columns/userDetails";
import { useGetUserByIdQuery } from "../../../../services/users";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useDeleteUserDeviceMutation } from "../../../../services/devices";

const UserDetails = () => {
  const [search, setSearch] = useState("");
  const params = useParams();
  const { search: searchQuery } = useLocation();
  const [data, setData] = useState([]);
  const [deviceDelete, setDeviceDelete] = useState(false);

  const {
    data: userDetailsData,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(params?.id, { skip: !params?.id });

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

  const [deleteDashboard, { isLoading: deleteLoading }] =
    useDeleteUserDeviceMutation();

  const handleDeleteDevice = () => {
    deleteDashboard({
      id: deviceDelete?.device_data?.device_uuid,
      userId: params?.id,
    }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to delete device");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Device deleted successfully");
        setDeviceDelete(false);
      }
    });
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
      setData([]);
    }
  }, [isError, error]);

  useEffect(() => {
    if (userDetailsData) {
      const deviceData =
        userDetailsData?.data?.map((item) => {
          return {
            ...item,
            createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            deviceId: item?.device_data?.device_uuid || "-",
            deviceName: item?.deviceName || "-",
            label: item?.label || "-",
            mqtt_username: item?.mqtt_user || "-",
            groups: item?.groups_data?.name || "-",
            status: {
              label: item?.device_data?.mqtt_status ? "Active" : "Inactive",
              variant: item?.device_data?.mqtt_status ? "green" : "red",
            },
          };
        }) || [];
      setData(deviceData);
    }
  }, [userDetailsData]);

  return (
    <>
      <SubHeader
        userDetails={true}
        subHeading="Here’s what’s happening with your device and users"
        userName={searchQuery?.split("=")[1]?.replaceAll("%20", " ")}
      />
      <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
        <SearchBar value={search} onChange={(val) => setSearch(val)} />
      </Box>
      <DynamicTable
        data={data}
        columns={columns()}
        handleDelete={handleDelete}
        hideView={true}
        hideEdit={true}
        isLoading={isLoading}
      />

      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Delete"}
        handleAccept={handleDeleteDevice}
        handleCancel={() => setDeviceDelete(false)}
        loading={deleteLoading}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to Delete this device?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default UserDetails;
