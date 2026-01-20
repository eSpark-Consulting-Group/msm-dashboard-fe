import { Box, Typography } from "@mui/material";
import {
  DeleteModal,
  DynamicTable,
  SearchBar,
  SubHeader,
} from "../../../../components";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { columns } from "../../../../columns/userDetails";
import { useGetUserByIdQuery } from "../../../../services/users";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  useDeleteUserDeviceMutation,
  useGetUserDevicesQuery,
} from "../../../../services/devices";

const UserDetails = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [deviceDelete, setDeviceDelete] = useState(false);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const params = useParams();
  const { search: searchQuery } = useLocation();
  const queryParams = new URLSearchParams(searchQuery);

  const userName = queryParams.get("name") || "-";
  const role = queryParams.get("role") || "-";

  const {
    data: userDetailsData,
    isLoading,
    isError,
    error,
    isFetching: userDetailsFetching,
  } = useGetUserByIdQuery(
    { id: params?.id, page, limit: pageSize, search },
    { skip: !params?.id || role === "user" }
  );

  const {
    data: userDetailsData2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
    isFetching: userDetailsFetching2,
  } = useGetUserDevicesQuery(
    { id: params?.id, page, limit: pageSize, search },
    {
      skip: !params?.id || role !== "user",
    }
  );

  const [deleteDashboard, { isLoading: deleteLoading }] =
    useDeleteUserDeviceMutation();

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

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
    if (isError2 && error2) {
      toast.error(error2?.data?.message);
      setData([]);
    }
  }, [isError, error, error2, isError2]);

  useEffect(() => {
    if (userDetailsData) {
      const deviceData =
        userDetailsData?.data?.map((item) => ({
          ...item,
          createdAt: dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm"),
          deviceId: item?.device_data?.device_uuid || "-",
          name: item?.name || "-",
          label: item?.label || "-",
          mqtt_username: item?.mqtt_user || "-",
          groups: item?.groups_data?.name || "-",
          status: {
            label: item?.device_data?.device_status ? "Active" : "Inactive",
            variant: item?.device_data?.device_status ? "green" : "red",
          },
        })) || [];
      setData(deviceData);
      setTotal(userDetailsData?.count || 0);
    }
  }, [userDetailsData]);

  useEffect(() => {
    if (userDetailsData2) {
      const deviceData =
        userDetailsData2?.data?.map((item) => ({
          ...item,
          createdAt: dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm"),
          deviceId: item?.device_data?.device_data?.device_uuid || "-",
          name: item?.device_data?.name || "-",
          label: item?.label || "-",
          mqtt_username: item?.mqtt_user || "-",
          groups: item?.device_data?.groups_data?.name || "-",
          status: {
            label: item?.device_data?.device_data?.device_status
              ? "Active"
              : "Inactive",
            variant: item?.device_data?.device_data?.device_status
              ? "green"
              : "red",
          },
          // status: {
          //   label: !item?.device_data?.device_data?.device_imei
          //     ? "Unassigned"
          //     : item?.device_data?.device_data?.device_status
          //     ? "Active"
          //     : "Inactive",
          //   variant: !item?.device_data?.device_data?.device_imei
          //     ? "simple2"
          //     : item?.device_data?.device_data?.device_status
          //     ? "green"
          //     : "red",
          // },
        })) || [];
      setData(deviceData);
      setTotal(userDetailsData2?.count || 0);
    }
  }, [userDetailsData2]);

  return (
    <>
      <SubHeader
        userDetails
        subHeading="Here’s what’s happening with your device and users"
        userName={userName}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
          <SearchBar value={search} onChange={(val) => setSearch(val)} />
        </Box>
      </Box>

      <DynamicTable
        data={data}
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        handlePageChange={handlePageChange}
        columns={columns()}
        handleDelete={handleDelete}
        hideView
        hideEdit
        isLoading={
          isLoading || isLoading2 || userDetailsFetching || userDetailsFetching2
        }
      />

      <DeleteModal
        open={!!deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading="Delete"
        handleAccept={handleDeleteDevice}
        handleCancel={() => setDeviceDelete(false)}
        loading={deleteLoading}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to delete this device?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default UserDetails;
