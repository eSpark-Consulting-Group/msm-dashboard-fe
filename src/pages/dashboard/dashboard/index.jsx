import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import {
  DeleteModal,
  Dropdown,
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
  useUnAssignDeviceMutation,
} from "../../../services/devices";
import { useDispatch, useSelector } from "react-redux";
import MeterReadingConfigPopover from "../../../components/meter-reading-modal";
import {
  addDeviceStatus,
  handleSelectedDevice,
} from "../../../store/slices/devices";
import { addCurrentData, addMqttDataState } from "../../../store/slices/mqtt";

const Dashboard = () => {
  // const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [deviceDelete, setDeviceDelete] = useState(false);
  const [deviceUnAssign, setDeviceUnAssign] = useState(false);
  const token = localStorage.getItem("msm_token");

  const [statusSort, setStatusSort] = useState("");
  const [createdSort, setCreatedSort] = useState(-1);
  const [updatedSort, setUpdatedSort] = useState(-1);

  const handleSort = (key, dir) => {
    if (key === "status") {
      // setStatusSort(dir);
    } else if (key === "createdAt") {
      setCreatedSort(dir);
    } else if (key === "lastUpdated") {
      setUpdatedSort(dir);
    }
  };

  // const [sortKey, setSortKey] = useState(null);
  // const [sortOrder, setSortOrder] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    data: assignDevicesData2,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllDevicesQuery(
    {
      page,
      limit: pageSize,
      search,
      statusSort,
      createdSort,
      updatedSort,
    },
    {
      skip: !token || user?.role?.name === "user",
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: assignDevicesData,
    isLoading: isLoading2,
    isFetching: isFetching2,
    isError: isError2,
    error: error2,
  } = useGetAllAssignDevicesQuery(
    {
      page,
      limit: pageSize,
      search,
      statusSort,
      createdSort,
      updatedSort,
    },
    {
      skip: !token || user?.role?.name !== "user",
      refetchOnMountOrArgChange: true,
    },
  );

  const { devices: dashboardData, assignDevices: dashboardData2 } = useSelector(
    (state) => state.devices,
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
    if (
      error?.data?.message === "Devices Not Found" ||
      error2?.data?.message === "Devices Not Found"
    ) {
      setData([]);
      setTotal(0);
      return;
    }

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
    const totalCount =
      user?.role?.name === "user"
        ? assignDevicesData?.count
        : assignDevicesData2?.count;

    let mappedData =
      sourceData?.map((item) => {
        const status =
          user?.role?.name === "user"
            ? item?.device_data?.device_data?.device_status
            : item?.device_data?.device_status;

        return {
          ...item,
          createdAt: dayjs(item?.createdAt).format("DD-MM-YYYY HH:mm"),
          deviceId:
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_uuid
              : item?.device_data?.device_uuid || "-",
          group:
            user?.role?.name === "user"
              ? item?.device_data?.groups_data[0]?.name
              : item?.groups_data[0]?.name || "-",
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
          imei_status: !(
            (user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_imei
              : item?.device_data?.device_imei) &&
            (user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_imei || "-"
              : item?.device_data?.device_imei || "-"
            )
              .toString()
              .trim() !== "" &&
            (user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_imei || "-"
              : item?.device_data?.device_imei || "-"
            )
              .toString()
              .toLowerCase() !== "unknown"
          )
            ? "Unknown"
            : "Available",
          lastUpdated: dayjs(
            user?.role?.name === "user"
              ? item?.device_data?.device_data?.device_status_updated_at
              : item?.device_data?.device_status_updated_at,
          ).format("DD-MM-YYYY HH:mm"),
        };
      }) || [];

    // // ✅ apply client-side sorting
    // if (sortKey && sortOrder) {
    //   mappedData = mappedData.sort((a, b) => {
    //     const aVal = a[sortKey];
    //     const bVal = b[sortKey];

    //     if (sortKey === "status") {
    //       return sortOrder === "asc"
    //         ? aVal.label.localeCompare(bVal.label)
    //         : bVal.label.localeCompare(aVal.label);
    //     }

    //     if (sortKey === "createdAt") {
    //       return sortOrder === "asc"
    //         ? new Date(aVal) - new Date(bVal)
    //         : new Date(bVal) - new Date(aVal);
    //     }

    //     return sortOrder === "asc"
    //       ? String(aVal).localeCompare(String(bVal))
    //       : String(bVal).localeCompare(String(aVal));
    //   });
    // }

    setData(mappedData);
    setTotal(totalCount);
  }, [
    isError,
    error,
    dashboardData,
    statusSort,
    createdSort,
    updatedSort,
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
    dispatch(handleSelectedDevice(item));
    if (user?.role?.name === "user") {
      dispatch(
        addCurrentData(
          item?.device_data?.device_data?.device_status === false ? 1 : 0,
        ),
      );
      dispatch(
        addMqttDataState(
          item?.device_data?.device_data?.device_status === false ? 1 : 0,
        ),
      );
      dispatch(addDeviceStatus(item?.device_data?.device_data?.device_status));
      item?.device_data?.device_data?.device_uuid &&
        navigate(
          `/dashboard/${item?.device_data?.device_data?.device_uuid}/info`,
        );
    } else {
      dispatch(
        addCurrentData(item?.device_data?.device_status === false ? 1 : 0),
      );
      dispatch(
        addMqttDataState(item?.device_data?.device_status === false ? 1 : 0),
      );
      dispatch(addDeviceStatus(item?.device_data?.device_status));
      item?.device_data?.device_uuid &&
        navigate(`/dashboard/${item?.device_data?.device_uuid}/info`);
    }
  };

  const [unassign, { isLoading: unassignLoading }] =
    useUnAssignDeviceMutation();

  const handleUnAssign = (item) => {
    setDeviceUnAssign(item);
  };

  const handleUnassignDevice = () => {
    unassign(deviceUnAssign?.device_data?.device_uuid).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Failed to unassign device");
        setDeviceUnAssign(false);
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Device unassigned successfully");
        setDeviceUnAssign(false);
      }
    });
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box sx={{ my: "27px", width: { xs: "100%", md: "495px" } }}>
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "200px" } }}>
          <Dropdown
            name="status"
            variant="outlined"
            placeholder="Select Status"
            noLabel
            options={
              user?.role?.name === "user"
                ? [
                    { label: "All", value: "" },
                    { label: "Active", value: -1 },
                    { label: "In Active", value: 1 },
                  ]
                : [
                    { label: "All", value: "" },
                    { label: "Active", value: -1 },
                    { label: "In Active", value: 1 },
                  ]
            }
            value={statusSort}
            handleChange={(e) => setStatusSort(e.target.value)}
            renderValueSx={{
              color: "#000",
              fontWeight: 400,
            }}
            selectSx={{
              backgroundColor: "#FFF",
              border: "1.38px solid #DBD6D6",
              borderRadius: "6.92px",
              height: "56px",
            }}
          />
        </Box>
      </Box>

      <DynamicTable
        data={data}
        columns={columns(
          user?.role?.name,
          statusSort,
          createdSort,
          updatedSort,
        )}
        hideView
        hideEdit
        handleDelete={handleDelete}
        showUnAssign={user?.role?.name === "super_admin"}
        handleUnAssign={handleUnAssign}
        isLoading={isLoading || isLoading2 || isFetching || isFetching2}
        page={page}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handlePageChange={handlePageChange}
        total={total}
        onRowClick={handleRowClick}
        // sortKey={sortKey}
        // sortOrder={sortOrder}
        onSortChange={handleSort}
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
      <DeleteModal
        open={deviceUnAssign}
        handleClose={() => setDeviceUnAssign(false)}
        heading={"Unassign Device"}
        handleAccept={handleUnassignDevice}
        handleCancel={() => setDeviceUnAssign(false)}
        loading={unassignLoading}
        btnText="Unassign"
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Are you sure you want to unassign this device?
        </Typography>
      </DeleteModal>
    </>
  );
};

export default Dashboard;
