import {
  Box,
  Chip,
  LinearProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getValue } from "../../utils";
import { view, edit, trash } from "../../assets";

const DynamicTable = ({
  data,
  columns,
  isLoading,
  handleView,
  handleEdit,
  handleDelete,
  page,
  handlePageChange,
  total,
}) => {
  const extendedColumns = columns?.map((column) => {
    return { ...column, key: column.key.split(".") };
  });
  const generateCell = (column, item) => {
    const cell = column.component
      ? column.component(item)
      : getValue(item, column.key);
    return column.key[0] === "action" ? (
      <Stack
        direction="row"
        justifyContent={"center"}
        justifyItems="center"
        alignItems="center"
        spacing={1}
      >
        <img
          src={view}
          alt="Icon"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleView(column);
          }}
        />
        <img
          src={edit}
          alt="Icon"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(column);
          }}
        />
        <img
          src={trash}
          alt="Icon"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(column);
          }}
        />
      </Stack>
    ) : column.key[0] === "chip" ? (
      <Chip label={item?.chip?.label} variant={item?.chip?.variant} />
    ) : (
      cell
    );
  };
  return (
    <>
      {data?.length === 0 && !isLoading ? (
        <Box>No Data Found</Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {extendedColumns?.map((column, index) => (
                  <TableCell key={`${index}`}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Stack direction="row">{column.name}</Stack>
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    {extendedColumns?.map((column) => (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          pl: "0px",
                        }}
                        key={column.key.join(".")}
                      >
                        {generateCell(column, item)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          {isLoading && (
            <Box>
              <LinearProgress />
            </Box>
          )}
        </TableContainer>
      )}
      {data?.length >= 7 && !isLoading ? (
        <Stack
          sx={{ marginTop: { xs: "20px", sm: "10px" } }}
          p={{ xs: 0, sm: 2 }}
          alignItems="center"
        >
          <Pagination
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={
              handlePageChange ? (_, page) => handlePageChange(page) : () => {}
            }
            count={Math.ceil((total || 1) / 7)}
          />
        </Stack>
      ) : null}
    </>
  );
};

export default DynamicTable;
