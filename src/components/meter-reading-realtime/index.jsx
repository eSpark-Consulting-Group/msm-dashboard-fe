import {
  Stack,
  Typography,
  Select,
  MenuItem,
  Slider,
  TextField,
} from "@mui/material";
import {
  METER_READING_MODAL_DATA,
  METER_READING_MODAL_STYLE,
} from "../meter-reading-modal";

const RealtimeConfig = ({ realtimeConfig, updateRealtimeConfig }) => {
  return (
    <Stack spacing={2}>
      <Stack
        flexDirection={{ xs: "column", sm: "row" }}
        sx={METER_READING_MODAL_STYLE.sectionBox}
        alignItems={"center"}
        gap={2}
      >
        <Typography variant="body1">Interval</Typography>
        <Select
          value={realtimeConfig.interval}
          onChange={(e) =>
            updateRealtimeConfig("interval", Number(e.target.value))
          }
          size="small"
          MenuProps={METER_READING_MODAL_STYLE.selectMenuProps}
        >
          {METER_READING_MODAL_DATA.realtimeOptions.map((val) => (
            <MenuItem key={val} value={val}>
              {val < 60
                ? `${val} sec`
                : `${Math.floor(val / 60)} min ${
                    val % 60 ? (val % 60) + " sec" : ""
                  }`}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack
        spacing={2}
        sx={{ ...METER_READING_MODAL_STYLE.sectionBox, py: 1 }}
      >
        <Stack
          width={"100%"}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "center" }}
          spacing={{ xs: 0.2, sm: 2 }}
          justifyContent="space-between"
        >
          <Typography variant="body1">Max Values</Typography>
          <Slider
            value={realtimeConfig.limit}
            onChange={(_, val) => updateRealtimeConfig("limit", val)}
            step={5}
            min={0}
            max={METER_READING_MODAL_DATA.maxValues.realtime}
            sx={METER_READING_MODAL_STYLE.slider}
          />
          <TextField
            type="number"
            value={realtimeConfig.limit}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value < 0) value = 0;
              if (value > 200) value = 200;
              updateRealtimeConfig("limit", value);
            }}
            size="small"
            sx={METER_READING_MODAL_STYLE.numberInput}
            inputProps={{
              min: 0,
              max: 200,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RealtimeConfig;
