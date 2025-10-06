import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import {
  DeleteModal,
  DynamicModal,
  DynamicTable,
  SearchBar,
  SubHeader,
} from "../../../components";
import { columns } from "../../../columns/dashboard";
import { useNavigate } from "react-router-dom";
import {
  useDeleteDeviceMutation,
  useDeleteUserDeviceMutation,
  useGetAllAssignDevicesQuery,
  useGetAllDevicesQuery,
} from "../../../services/devices";
import { useDispatch, useSelector } from "react-redux";
import MeterReadingConfigPopover from "../../../components/meter-reading-modal";
import { addDeviceStatus } from "../../../store/slices/devices";
import { addCurrentData, addMqttDataState } from "../../../store/slices/mqtt";

const Dashboard = () => {
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(11);
  const [total] = useState(11);
  const [deviceDelete, setDeviceDelete] = useState(false);
  const token = localStorage.getItem("msm_token");

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { isLoading, isError, error } = useGetAllDevicesQuery(
    {
      page,
      limit: pageSize,
      search,
      sortKey,
      sortOrder,
    },
    {
      skip: !token || user?.role?.name === "user",
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useGetAllAssignDevicesQuery(
    {
      page,
      limit: pageSize,
      search,
      sortKey,
      sortOrder,
    },
    {
      skip: !token || user?.role?.name !== "user",
      refetchOnMountOrArgChange: true,
    }
  );

  const { devices: dashboardData, assignDevices: dashboardData2 } = useSelector(
    (state) => state.devices
  );

  const [deleteDashboard, { isLoading: deleteLoading }] =
    useDeleteDeviceMutation();

  const [deleteDashboard2, { isLoading: deleteLoading2 }] =
    useDeleteUserDeviceMutation();

  const handleDeleteDashboard = () => {
    if (user?.role?.name === "super_admin") {
      deleteDashboard2({
        id: deviceDelete?.device_data?.device_uuid,
        userId: deviceDelete?.user_id,
      }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to delete device");
          setDeviceDelete(false);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "Device deleted successfully");
          setDeviceDelete(false);
        }
      });
    } else {
      deleteDashboard(deviceDelete?.device_data?.device_uuid).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to delete device");
          setDeviceDelete(false);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "Device deleted successfully");
          setDeviceDelete(false);
        }
      });
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message, { toastId: "Device" });
      return;
    }

    if (isError2 && error2) {
      toast.error(error2?.data?.message, { toastId: "assign" });
      return;
    }

    const sourceData =
      user?.role?.name === "user" ? dashboardData2 : dashboardData;

    let mappedData =
      sourceData?.map((item) => {
        const status =
          user?.role?.name === "user"
            ? item?.device_data?.device_data?.device_status
            : item?.device_data?.device_status;

        return {
          ...item,
          createdAt: dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          deviceId:
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_uuid
              : item?.device_data?.device_uuid || "-",
          group:
            user?.role?.name === "user"
              ? item?.device_data?.groups_data?.name
              : item?.groups_data?.name || "-",
          name:
            user?.role?.name === "user" ? item?.device_data?.name : item?.name,
          createdBy:
            user?.role?.name === "user"
              ? item?.device_data?.user_id
              : item?.user_id,
          status: {
            label: status ? "Active" : "Inactive",
            variant: status ? "green" : "red",
          },
        };
      }) || [];

    // ✅ apply client-side sorting
    if (sortKey && sortOrder) {
      mappedData = mappedData.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (sortKey === "status") {
          return sortOrder === "asc"
            ? aVal.label.localeCompare(bVal.label)
            : bVal.label.localeCompare(aVal.label);
        }

        if (sortKey === "createdAt") {
          return sortOrder === "asc"
            ? new Date(aVal) - new Date(bVal)
            : new Date(bVal) - new Date(aVal);
        }

        return sortOrder === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    setData(mappedData);
  }, [
    isError,
    error,
    dashboardData,
    sortKey,
    sortOrder,
    dashboardData2,
    user,
    isError2,
    error2,
  ]);

  const navigate = useNavigate();

  const handleDelete = (item) => {
    setDeviceDelete(item);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowClick = (item) => {
    if (user?.role?.name === "user") {
      dispatch(
        addCurrentData(
          item?.device_data?.device_data?.device_status === false ? 1 : 0
        )
      );
      dispatch(
        addMqttDataState(
          item?.device_data?.device_data?.device_status === false ? 1 : 0
        )
      );
      dispatch(addDeviceStatus(item?.device_data?.device_data?.device_status));
      item?.device_data?.device_data?.device_uuid &&
        navigate(
          `/dashboard/${item?.device_data?.device_data?.device_uuid}/info`
        );
    } else {
      dispatch(
        addCurrentData(item?.device_data?.device_status === false ? 1 : 0)
      );
      dispatch(
        addMqttDataState(item?.device_data?.device_status === false ? 1 : 0)
      );
      dispatch(addDeviceStatus(item?.device_data?.device_status));
      item?.device_data?.device_uuid &&
        navigate(`/dashboard/${item?.device_data?.device_uuid}/info`);
    }
  };

  return (
    <>
      <SubHeader
        heading="Dashboard"
        subHeading="Here’s what’s happening with your device and users"
        // buttonText="Add New Dashoard"
        // onClick={() => setOpen(true)}
        // variant="contained"
      />
      <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
        <SearchBar value={search} onChange={(val) => setSearch(val)} />
      </Box>

      <DynamicTable
        data={data}
        columns={columns(user?.role?.name)}
        hideView
        hideEdit
        handleDelete={handleDelete}
        isLoading={isLoading || isLoading2}
        page={page}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        total={total}
        onRowClick={handleRowClick}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={(key, order) => {
          setSortKey(key);
          setSortOrder(order);
        }}
      />

      {/* <AddDashboardModal
        open={open}
        handleClose={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
        handleAccept={() => console.log("success")}
      /> */}

      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Delete"}
        handleAccept={handleDeleteDashboard}
        handleCancel={() => setDeviceDelete(false)}
        loading={deleteLoading || deleteLoading2}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to delete this dashboard?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Dashboard;
