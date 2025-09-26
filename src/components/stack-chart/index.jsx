import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";

const ActiveEnergyChart = ({ data, type }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 250,
        // bgcolor: "white",
        // borderRadius: 2,
        // p: 2,
        // boxShadow: 1,
      }}
    >
      {/* Header */}

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10 }}
            padding={{ left: 0, right: 0 }}
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "11px" }} />

          {/* Active Energy (+) */}
          <Line
            type="monotone"
            dataKey={type === 1 ? "activePlus" : "reactivePlus"}
            stroke="#e63946"
            strokeWidth={2}
            dot={false}
            name={type === 1 ? "Active Energy (+)" : "Reactive Energy (+)"}
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey={type === 1 ? "activeMinus" : "reactiveMinus"}
            stroke="#457b9d"
            strokeWidth={2}
            dot={false}
            name={type === 1 ? "Active Energy (-)" : "Reactive Energy (-)"}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ActiveEnergyChart;
