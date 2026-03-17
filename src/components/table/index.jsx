import {
  Avatar,
  Box,
  Chip,
  Checkbox,
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
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { copyToClipboard, getValue } from "../../utils";
import { view, edit, trash, copy, unassign } from "../../assets";

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
  showUnAssign,
  handleUnAssign,
  page,
  pageSize,
  setPageSize,
  handlePageChange,
  total,
  onRowClick,
  mqttTable,
  onSortChange,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  minWidth = "1200px",
}) => {
  // keep key as string for sorting, arrows
  // add keyPath for nested object access
  const extendedColumns = columns?.map((column) => ({
    ...column,
    keyPath: column.key.split("."),
  }));

  const getNextSortDir = (current) => {
    if (current === "") return 1;
    if (current === 1) return -1;
    return "";
  };

  const enabledRows = data.filter((item) => item?.status?.label);

  const selectableRows = enabledRows.filter((item) => {
    const otaStatus1 = item?.device_data?.ota?.[0]?.ota_status;
    const otaStatus2 = item?.device_data?.device_data?.ota?.[0]?.ota_status;

    const otaStatus = otaStatus1 || otaStatus2;

    return otaStatus !== "started";
  });

  const allSelected =
    selectableRows.length > 0 &&
    selectableRows.every((item) => selectedRows.includes(item._id));

  const generateCell = (column, item) => {
    const cell = column.component
      ? column.component(item)
      : getValue(item, column.keyPath);

    if (column.key === "action") {
      const disabled =
        item?.device_data?.ota?.[0]?.ota_status === "started" ||
        item?.device_data?.device_data?.ota?.[0]?.ota_status === "started";
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{
            opacity: disabled ? 0.4 : 1,
            pointerEvents: disabled ? "none" : "auto",
          }}
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
          {showUnAssign && (
            <img
              src={unassign}
              alt="Unassign"
              style={{ cursor: "pointer", width: "19px", height: "19px" }}
              onClick={(e) => {
                e.stopPropagation();
                handleUnAssign(item);
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
      const filtered = cell.filter(
        (val) => val !== undefined && val !== null && val !== "",
      );
      const maxVisible = 3; // show 3 chips max
      const visibleChips = filtered.slice(0, maxVisible);
      const hiddenCount = filtered.length - maxVisible;

      return (
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1}>
          {visibleChips?.length === 0 ? (
            <Typography>-</Typography>
          ) : (
            <>
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
            </>
          )}
        </Stack>
      );
    }

    if (typeof cell === "number" && !Number.isInteger(cell)) {
      return cell.toFixed(2);
    }

    return <Typography sx={{ whiteSpace: "pre-line" }}>{cell}</Typography>;
  };

  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  return (
    <>
      {total > 0 && !isLoading && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2, px: 2 }}
        >
          {/* Left: Item info */}
          <Typography fontSize={14} color="#555">
            Showing <b>{startItem}</b> – <b>{endItem}</b> of <b>{total}</b>{" "}
            items &nbsp; (Page <b>{page}</b>)
          </Typography>
        </Stack>
      )}
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
          <Table
            sx={{
              minWidth: !isLoading ? minWidth : "auto",
            }}
          >
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
                {onSelectRow && (
                  <TableCell sx={{ width: "40px", textAlign: "center" }}>
                    <Checkbox
                      sx={{ color: "#000" }}
                      checked={allSelected}
                      indeterminate={allSelected}
                      onChange={(e) => onSelectAll?.(e.target.checked)}
                    />
                  </TableCell>
                )}

                {extendedColumns?.map((column, index) => (
                  <TableCell
                    key={`${index}`}
                    onClick={() => {
                      if (column.sortable && onSortChange) {
                        const newOrder = getNextSortDir(column.sortDir);
                        onSortChange(column.key, newOrder);
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
                      {column.sortable && (
                        <>
                          {column.sortDir === "" && (
                            <SwapVertIcon sx={{ fontSize: 16, opacity: 0.5 }} />
                          )}

                          {column.sortDir === 1 && (
                            <ArrowUpward sx={{ fontSize: 16 }} />
                          )}

                          {column.sortDir === -1 && (
                            <ArrowDownward sx={{ fontSize: 16 }} />
                          )}
                        </>
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
                {data?.map((item, index) => {
                  const otaStarted =
                    item?.device_data?.ota?.[0]?.ota_status === "started" ||
                    item?.device_data?.device_data?.ota?.[0]?.ota_status ===
                      "started";

                  const status =
                    item?.device_data?.device_status ||
                    item?.status?.label === "Active"
                      ? true
                      : false;

                  return (
                    <TableRow key={index}>
                      {/* Row Checkbox */}
                      {onSelectRow && (
                        <TableCell
                          sx={{
                            textAlign: "center",
                            backgroundColor:
                              status === false ? "#f0f8ff" : "inherit",
                          }}
                        >
                          <Checkbox
                            sx={{ color: "#000" }}
                            checked={selectedRows.includes(item._id)}
                            onChange={(e) =>
                              onSelectRow?.(item._id, e.target.checked)
                            }
                            disabled={otaStarted}
                          />
                        </TableCell>
                      )}
                      {extendedColumns?.map((column) => (
                        <TableCell
                          sx={{
                            textAlign: "center",
                            pl: "0px",
                            whiteSpace: "pre-line",
                            backgroundColor:
                              status === false ? "#f0f8ff" : "inherit",
                            cursor: !onRowClick
                              ? "auto"
                              : status
                                ? "pointer"
                                : "not-allowed",
                          }}
                          key={column.key}
                          onClick={
                            onRowClick && status
                              ? () => onRowClick(item)
                              : () => {}
                          }
                        >
                          {generateCell(column, item)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
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
      {!mqttTable && data?.length > 0 && !isLoading ? (
        <Stack
          sx={{ marginTop: { xs: "20px", sm: "10px" } }}
          p={{ xs: 0, sm: 2 }}
          alignItems="center"
          justifyContent={"center"}
          spacing={2}
          direction={"row"}
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
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            sx={{ width: 80, background: "transparent" }}
          >
            {[10, 20, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      ) : null}
    </>
  );
};

export default DynamicTable;
