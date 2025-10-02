import {
  Avatar,
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
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { copyToClipboard, getValue } from "../../utils";
import { view, edit, trash, copy } from "../../assets";

const DynamicTable = ({
  data,
  columns,
  isLoading,
  handleView,
  handleEdit,
  handleDelete,
  hideView,
  hideEdit,
  hideDelete,
  page,
  pageSize,
  handlePageChange,
  total,
  onRowClick,
  mqttTable,
  sortKey,
  sortOrder,
  onSortChange,
}) => {
  // keep key as string for sorting, arrows
  // add keyPath for nested object access
  const extendedColumns = columns?.map((column) => ({
    ...column,
    keyPath: column.key.split("."),
  }));

  const generateCell = (column, item) => {
    const cell = column.component
      ? column.component(item)
      : getValue(item, column.keyPath);

    if (column.key === "action") {
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {!hideView && (
            <img
              src={view}
              alt="View"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleView(item);
              }}
            />
          )}
          {!hideEdit && (
            <img
              src={edit}
              alt="Edit"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(item);
              }}
            />
          )}
          {!hideDelete && (
            <img
              src={trash}
              alt="Delete"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
            />
          )}
        </Stack>
      );
    }

    if (column.chip) {
      return (
        <Chip onClick={() => {}} label={cell?.label} variant={cell?.variant} />
      );
    }

    if (column.copy) {
      return (
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
      );
    }

    if ("image" in column) {
      return (
        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {column.image && (
            <Avatar
              src={cell?.image}
              alt={cell?.name}
              sx={{ width: "30px", height: "30px" }}
            />
          )}
          <Typography sx={{ fontSize: "16px", color: "#505050" }}>
            {cell?.name}
          </Typography>
        </Box>
      );
    }

    if (column.chipArray && Array.isArray(cell)) {
      const maxVisible = 3; // show 3 chips max
      const visibleChips = cell.slice(0, maxVisible);
      const hiddenCount = cell.length - maxVisible;

      return (
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
          {visibleChips.map((val, idx) => (
            <Chip
              key={idx}
              label={val}
              sx={{
                backgroundColor: "#e0e0e0",
                color: "#333",
                fontSize: "12px",
                height: "24px",
              }}
            />
          ))}
          {hiddenCount > 0 && (
            <Chip
              label={`+${hiddenCount} more`}
              sx={{
                backgroundColor: "#ccc",
                color: "#333",
                fontSize: "12px",
                height: "24px",
              }}
            />
          )}
        </Stack>
      );
    }

    return cell;
  };

  return (
    <>
      {data?.length === 0 && !isLoading ? (
        <Typography
          fontSize={20}
          fontWeight={900}
          mt={mqttTable ? 0 : "100px"}
          textAlign="center"
        >
          No Data Found
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                ...(mqttTable && {
                  "& .MuiTableRow-root": {
                    background: "#F7F9FB",
                    border: "1px solid #E9E9EA",
                  },
                  "& .MuiTableCell-root": {
                    padding: "8px 8px",
                    color: "#454545",
                  },
                }),
              }}
            >
              <TableRow>
                {extendedColumns?.map((column, index) => (
                  <TableCell
                    key={`${index}`}
                    onClick={() => {
                      if (column.sortable && onSortChange) {
                        if (sortKey !== column.key) {
                          // clicked a NEW column → start with ascending
                          onSortChange(column.key, "asc");
                        } else {
                          // clicked SAME column → toggle asc ↔ desc only
                          const newOrder = sortOrder === "asc" ? "desc" : "asc";
                          onSortChange(column.key, newOrder);
                        }
                      }
                    }}
                    sx={{
                      cursor: column.sortable ? "pointer" : "default",
                      userSelect: "none",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      gap={0.5}
                    >
                      {column.name}
                      {sortKey === column.key && sortOrder === "asc" && (
                        <ArrowUpward sx={{ fontSize: 16 }} />
                      )}
                      {sortKey === column.key && sortOrder === "desc" && (
                        <ArrowDownward sx={{ fontSize: 16 }} />
                      )}
                    </Stack>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody
                sx={{
                  ...(mqttTable && {
                    "& .MuiTableRow-root": {
                      backgroundColor: "#F7F9FB",
                    },
                    "& .MuiTableCell-root": {
                      padding: "20px 8px",
                      color: "#454545",
                    },
                  }),
                }}
              >
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    {extendedColumns?.map((column) => (
                      <TableCell
                        sx={{
                          textAlign: "center",
                          pl: "0px",
                          cursor: onRowClick ? "pointer" : "auto",
                        }}
                        key={column.key}
                        onClick={onRowClick ? () => onRowClick(item) : () => {}}
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
