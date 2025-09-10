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

const UserDetails = () => {
  const [search, setSearch] = useState("");
  const params = useParams();
  const { search: searchQuery } = useLocation();

  const [allData, setAllData] = useState(userDetails || []);
  const [data, setData] = useState(userDetails || []);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(7);
  const [total, setTotal] = useState(userDetails?.length || 0);
  const [deviceDelete, setDeviceDelete] = useState(false);

  const {
    data: userDetailsData,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(params?.id, { skip: !params?.id });

  const handleDelete = (item) => {
    console.log(item);
    setDeviceDelete(true);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (userDetailsData) {
      console.log("API data:", userDetailsData);
    }
  }, [userDetailsData]);

  useEffect(() => {
    if (!search.trim()) {
      setData(allData);
    } else {
      const filtered = allData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
      setData(filtered);
    }
    setPage(1);
  }, [search, allData]);

  return (
    <>
      <SubHeader
        userDetails={true}
        subHeading="Here’s what’s happening with your device and users"
        userName={searchQuery?.split("=")[1]}
      />
      <Box sx={{ my: "27px", width: { xs: "100%", lg: "495px" } }}>
        <SearchBar value={search} onChange={(val) => setSearch(val)} />
      </Box>
      <DynamicTable
        data={data}
        columns={columns()}
        page={page}
        pageSize={pageSize}
        total={total}
        handleDelete={handleDelete}
        handlePageChange={handlePageChange}
        hideView={true}
        hideEdit={true}
        isLoading={isLoading}
      />

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
    </>
  );
};

export default UserDetails;
