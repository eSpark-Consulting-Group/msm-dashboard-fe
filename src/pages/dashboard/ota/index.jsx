import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import {
    Button,
    Dropdown,
    DynamicModal,
    DynamicTable,
    SearchBar,
    SubHeader,
} from "../../../components";
import { columns } from "../../../columns/ota";
import {
    useGetAllAssignDevicesQuery,
    useGetAllDevicesQuery,
} from "../../../services/devices";
import { useSelector } from "react-redux";

const Devices = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(9);
    const [total] = useState(9);
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => state.auth);

    // Sorting state
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null); // "asc" | "desc"

    const {
        isLoading: deviceLoading,
        isError: isError,
        error: error,
    } = useGetAllDevicesQuery(
        { page, limit: pageSize, search },
        {
            skip: user?.role?.name === "user",
            refetchOnMountOrArgChange: true,
        }
    );

    const {
        isLoading: deviceLoading2,
        isError: isError2,
        error: error2,
    } = useGetAllAssignDevicesQuery(
        { page, limit: pageSize, search },
        {
            skip: user?.role?.name !== "user",
            refetchOnMountOrArgChange: true,
        }
    );

    const { devices: devicesData, assignDevices: devicesData2 } = useSelector(
        (state) => state.devices
    );

    useEffect(() => {
        if (isError && error && isError2 && error2) {
            toast.error(error?.data?.message, { toastId: "DEVICEERROR" });
            return;
        }
        const sourceData = user?.role?.name === "user" ? devicesData2 : devicesData;
        const deviceData =
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
                    name:
                        user?.role?.name === "user" ? item?.device_data?.name : item?.name,
                    label: item?.label || "-",
                    userName: item?.userName || "-",
                    groups:
                        user?.role?.name === "user"
                            ? item?.device_data?.groups_data?.name
                            : item?.groups_data?.name || "-",
                    status: {
                        label: status ? "Active" : "Inactive",
                        variant: status ? "green" : "red",
                    },
                    version: "1.1.2",
                    lastUpdated: "15-10-2024 14:23",
                };
            }) || [];
        setData(deviceData);
    }, [isError, error, isError2, error2, devicesData]);

    const handlePageChange = (page) => {
        setPage(page);
    };

    // Sorting function
    const handleSortChange = (key, order) => {
        setSortKey(key);
        setSortOrder(order);
    };

    const getSortedData = () => {
        if (!sortKey || !sortOrder) return data;

        return [...data].sort((a, b) => {
            let aVal = a[sortKey];
            let bVal = b[sortKey];

            // Special handling for status (Active/Inactive)
            if (sortKey === "status") {
                aVal = aVal?.label || "";
                bVal = bVal?.label || "";
            }

            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    };

    const [selectedVersion, setSelectedVersion] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectRow = (id, checked) => {
        setSelectedRows((prev) => {
            if (checked) {
                return prev.includes(id) ? prev : [...prev, id];
            } else {
                return prev.filter((rowId) => rowId !== id);
            }
        });
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            const enabledIds = data
                .filter((item) => item.status?.label !== "Inactive")
                .map((item) => item.id);
            setSelectedRows(enabledIds);
        } else {
            setSelectedRows([]);
        }
    };

    return (
        <>
            <SubHeader
                heading="OTA"
                subHeading="Here’s what’s happening with your device and users"
                buttonText={"Check updates"}
                onClick={() => console.log("Check updates clicked")}
                variant="contained"
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: { xs: "column", lg: "row" }
                }}
            >
                <Box
                    display="flex"
                    alignItems="flex-end"
                    flexWrap="wrap"
                    gap={1}
                    sx={{ width: { xs: "100%", lg: "auto" }, ".MuiFormControl-root ": { flex: 1 } }}
                >
                    <Dropdown
                        name="version"
                        customLabel="Available Versions"
                        variant="outlined"
                        placeholder="Select Version"
                        noLabel
                        options={[{ label: "1.1.1", value: "1.1.1" }, { label: "1.2.0", value: "1.2.0" }, { label: "1.2.1", value: "1.2.1" }]}
                        value={selectedVersion}
                        handleChange={(e) => setSelectedVersion(e.target.value)}
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
                    <Button
                        sx={{
                            width: "max-content",
                            minWidth: "103px",
                            border: "1px solid #0C89E2",
                            color: "#0C89E2",
                            borderRadius: "10px",
                            fontSize: "16px",
                            height: "56px"
                        }}
                        variant="outlined"
                        size="small"
                        onClick={() => setModal(true)}
                        disabled={selectedRows.length === 0 || !selectedVersion}
                    >
                        Start OTA
                    </Button>
                </Box>
                <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
                    <SearchBar
                        value={search}
                        onChange={(val) => setSearch(val)}
                        label={"Type Device Name to Search"}
                        placeholder="Enter Device Name"
                    />
                </Box>
            </Box>
            <DynamicTable
                data={getSortedData()}
                columns={columns()}
                isLoading={deviceLoading || deviceLoading2}
                page={page}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                total={total}
                hideView={true}
                hideEdit={true}
                hideDelete={true}
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                selectedRows={selectedRows}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
            />
            <DynamicModal
                open={modal}
                handleClose={() => setModal(false)}
                cancelButtonText="Cancel"
                acceptButtonText="Update"
                handleCancel={() => setModal(false)}
                handleAccept={() => console.log("Update accepted")}
                heading={"Confirm OTA Start"}
            >
                <Typography fontSize="24px">Are you sure you want to start OTA?</Typography>
            </DynamicModal>
        </>
    );
};

export default Devices;
