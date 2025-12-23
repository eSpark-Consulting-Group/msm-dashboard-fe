import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";

const MqttDataGrid = ({
  data = [],
  columns = [],
  loading = false,
  pageSize = 100,
}) => {
  const gridColumns = useMemo(() => {
    return columns.map((col) => ({
      field: col.key,
      headerName: col.name,
      minWidth: 200,
      flex: 1,
      sortable: false,
    }));
  }, [columns]);
  const gridRows = useMemo(() => {
    return data.map((row, index) => ({
      id: index,
      ...row,
    }));
  }, [data]);

  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        loading={loading}
        disableRowSelectionOnClick
        disableColumnMenu
        // 👇 THIS hides "Rows per page"
        pageSizeOptions={[pageSize]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
              page: 0,
            },
          },
        }}
        sx={{
          backgroundColor: "transparent",
          borderRadius: 2,
          border: "1px solid #D8D8D8",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F7F9FB",
            fontWeight: 700,
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
          },
        }}
      />
    </Box>
  );
};

export default MqttDataGrid;
