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
  Typography,
} from "@mui/material";
import { copyToClipboard, getValue } from "../../utils";
import { view, edit, trash, copy } from "../../assets";

const DynamicTable = ({
  data,
  columns,
  isLoading,
  handleView,
  handleEdit,
  handleDelete,
  page,
  pageSize,
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
            handleView(item);
          }}
        />
        <img
          src={edit}
          alt="Icon"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(item);
          }}
        />
        <img
          src={trash}
          alt="Icon"
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(item);
          }}
        />
      </Stack>
    ) : column?.chip ? (
      <Chip label={cell?.label} variant={cell?.variant} />
    ) : column?.copy ? (
      <Stack
        onClick={() => copyToClipboard(cell)}
        sx={{ cursor: "pointer" }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap="5px"
      >
        <Typography>{cell}</Typography>
        <img src={copy} alt="copy" />
      </Stack>
    ) : (
      cell
    );
  };
  return (
    <>
      {data?.length === 0 && !isLoading ? (
        <Typography fontSize={20} fontWeight={900} mt="100px" textAlign="center">No Data Found</Typography>
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
      {data?.length >= pageSize && !isLoading ? (
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
            count={Math.ceil((total || 1) / pageSize)}
          />
        </Stack>
      ) : null}
    </>
  );
};

export default DynamicTable;
