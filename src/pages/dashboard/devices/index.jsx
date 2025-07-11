import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  AddDeviceModal,
  AddGroupModal,
  DeleteModal,
  DynamicModal,
  DynamicTable,
  DynamicTabs,
  EditGroupModal,
  ImportDeviceModal,
  SearchBar,
  SubHeader,
} from "../../../components";
import { columns } from "../../../columns/devices";
import { deviceData, deviceGroupData } from "../../../constant";
import { useSearchParams } from "react-router-dom";
import { deviceGroupColumns } from "../../../columns/deviceGroupColumns";
import { EditDeviceModal } from "../../../components";

const Devices = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [total] = useState(9);
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState();
  const tab = searchParams.get("tab");
  const [data, setData] = useState([]);
  const [deviceEditModal, setDeviceEditModal] = useState(false);
  const [editDevicevalues, setEditDeviceValues] = useState({});
  const [deviceDelete, setDeviceDelete] = useState(false);
  const [addDeviceModal, setAddDeviceModal] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [editGroup, setEditGroup] = useState(false);
  const [importDeviceModal, setImportDeviceModal] = useState(false);

  useEffect(() => {
    if (tab) {
      setActiveTab(Number(tab));
    } else {
      setActiveTab(0);
    }
  }, [tab]);

  useEffect(() => {
    if (activeTab === 0) {
      setData(deviceData);
    } else {
      setData(deviceGroupData);
    }
  }, [activeTab]);

  const handleView = (item) => {
    console.log(item, "view");
  };

  const handleEdit = (item) => {
    setEditDeviceValues(item);
    if (activeTab === 0) {
      setDeviceEditModal(true);
    } else {
      setEditGroup(true);
    }
  };

  const handleDelete = (item) => {
    console.log(item, "delete");
    if (activeTab === 0) {
      setDeviceDelete(true);
    } else {
      setDeviceDelete(true);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSubHeaderClick = () => {
    if (activeTab === 0) {
      setAddDeviceModal(true);
    } else {
      setAddGroup(true);
    }
  };

  useEffect(() => {
    const filtered =
      activeTab === 0
        ? deviceData
        : deviceGroupData.filter((item) =>
            Object.values(item).some((val) =>
              String(val).toLowerCase().includes(search.toLowerCase())
            )
          );
    setData(filtered);
    setPage(1);
  }, [search, activeTab, deviceData, deviceGroupData]);

  const tabs = [
    { label: "All", component: <></> },
    { label: "Group", component: <></> },
  ];

  const handleAddDeviceAccept = () => {
    setAddDeviceModal(false);
    setImportDeviceModal(true);
  };

  return (
    <>
      <SubHeader
        heading="Device"
        subHeading="Here’s what’s happening with your device and users"
        buttonText={activeTab === 0 ? "Add New Device" : "Add New Entity Group"}
        onClick={handleSubHeaderClick}
        variant="contained"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DynamicTabs tabs={tabs} />
        <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
          <SearchBar value={search} onChange={(val) => setSearch(val)} />
        </Box>
      </Box>
      <DynamicTable
        data={data}
        columns={activeTab === 0 ? columns() : deviceGroupColumns()}
        isLoading={false}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        page={page}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        total={total}
        hideView={true}
      />
      <DynamicModal
        open={deviceEditModal}
        handleClose={() => setDeviceEditModal(false)}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "30%",
          },
        }}
        heading={"Edit Device ’s Details"}
      >
        <EditDeviceModal
          values={editDevicevalues}
          handleModalClose={() => setDeviceEditModal(false)}
          handleCancel={() => setDeviceEditModal(false)}
        />
      </DynamicModal>

      <DeleteModal
        open={deviceDelete}
        handleClose={() => setDeviceDelete(false)}
        heading={"Are you sure you want to Delete?"}
        handleAccept={() => setDeviceDelete(false)}
        handleCancel={() => setDeviceDelete(false)}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
          Delete is permanent and your Details will automatically be deleted
          after 30 days if you do not log in again.
        </Typography>
      </DeleteModal>
      <DynamicModal
        open={addDeviceModal}
        handleClose={() => setAddDeviceModal(false)}
        acceptButtonText={"Next"}
        heading={"Add New Device"}
        handleAccept={handleAddDeviceAccept}
      >
        <AddDeviceModal />
      </DynamicModal>
      <DynamicModal
        open={addGroup}
        handleClose={() => setAddGroup(false)}
        heading={"Add Entity Group"}
      >
        <AddGroupModal
          handleCancel={() => setAddGroup(false)}
          handleAccept={() => setAddGroup(false)}
        />
      </DynamicModal>
      <DynamicModal
        open={editGroup}
        handleClose={() => setEditGroup(false)}
        heading={"Edit Entity Groups"}
        sx={{
          width: {
            xs: "95%",
            md: "70%",
            lg: "30%",
          },
        }}
      >
        <EditGroupModal
          values={editDevicevalues}
          handleModalClose={() => setEditGroup(false)}
          handleCancel={() => setEditGroup(false)}
        />
      </DynamicModal>
      <DynamicModal
        open={importDeviceModal}
        handleClose={() => setImportDeviceModal(false)}
        acceptButtonText={"Add"}
        heading={"Import Device"}
        cancelButtonText={"Cancel "}
        handleAccept={() => setImportDeviceModal(false)}
        handleCancel={() => setImportDeviceModal(false)}
      >
        <ImportDeviceModal />
      </DynamicModal>
    </>
  );
};

export default Devices;
