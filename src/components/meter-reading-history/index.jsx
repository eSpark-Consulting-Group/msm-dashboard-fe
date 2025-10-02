import {
  Stack,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Slider,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  METER_READING_MODAL_DATA,
  METER_READING_MODAL_STYLE,
} from "../meter-reading-modal";

const HistoryConfig = ({
  historyConfig,
  updateHistoryConfig,
  timeWindowTab,
  handleTabChangeOfTimeWindow,
}) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={2} sx={METER_READING_MODAL_STYLE.sectionBox}>
        <Typography variant="body1">Time Window</Typography>
        <Stack
          width={"100%"}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "auto", sm: "center" }}
        >
          <Tabs
            value={timeWindowTab}
            onChange={handleTabChangeOfTimeWindow}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={METER_READING_MODAL_STYLE.tabPill}
          >
            <Tab label="Last" />
            <Tab label="Range" />
          </Tabs>
          <Select
            value={historyConfig.timezone}
            onChange={(e) => updateHistoryConfig("timezone", e.target.value)}
            size="small"
            MenuProps={METER_READING_MODAL_STYLE.selectMenuProps}
          >
            {METER_READING_MODAL_DATA.timezones.map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        {timeWindowTab === 0 && (
          <Select
            value={`${historyConfig.range_value}_${historyConfig.range_unit}`}
            onChange={(e) => {
              const [value, unit] = e.target.value.split("_");
              updateHistoryConfig("range_value", Number(value));
              updateHistoryConfig("range_unit", unit);
            }}
            size="small"
            MenuProps={METER_READING_MODAL_STYLE.selectMenuProps}
          >
            {METER_READING_MODAL_DATA.historyOptions.map((opt) => (
              <MenuItem
                key={`${opt.value}_${opt.unit}`}
                value={`${opt.value}_${opt.unit}`}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        )}
        {timeWindowTab === 1 && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack
              width={"100%"}
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="space-between"
            >
              <Stack width={{ xs: "100%", sm: "48%" }}>
                <Typography ml={0.5} mb={0.5}>
                  From
                </Typography>
                <DateTimePicker
                  value={historyConfig.fromDate}
                  onChange={(val) => updateHistoryConfig("fromDate", val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="From"
                      size="small"
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Stack>
              <Stack width={{ xs: "100%", sm: "48%" }}>
                <Typography ml={0.5} mb={0.5}>
                  To
                </Typography>
                <DateTimePicker
                  value={historyConfig.toDate}
                  onChange={(val) => updateHistoryConfig("toDate", val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        shrink: true,
                        style: { color: "red" },
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </LocalizationProvider>
        )}
      </Stack>

      <Stack
        spacing={2}
        sx={{ ...METER_READING_MODAL_STYLE.sectionBox, py: 1 }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          spacing={{ xs: 0.9, sm: 2 }}
          justifyContent="space-between"
        >
          <Stack
            width={"100%"}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "center", sm: "center" }}
            spacing={{ xs: 0.2, sm: 2 }}
          >
            <Typography variant="body1">Max Values</Typography>
            <Slider
              value={historyConfig.limit}
              onChange={(_, val) => updateHistoryConfig("limit", val)}
              step={5}
              min={0}
              max={METER_READING_MODAL_DATA.maxValues.history}
              sx={METER_READING_MODAL_STYLE.slider}
            />
          </Stack>
          <TextField
            type="number"
            value={historyConfig.limit}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value < 0) value = 0;
              if (value > 1000) value = 1000;
              updateHistoryConfig("limit", value);
            }}
            size="small"
            sx={METER_READING_MODAL_STYLE.numberInputHistory}
            inputProps={{
              min: 0,
              max: 1000,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HistoryConfig;
