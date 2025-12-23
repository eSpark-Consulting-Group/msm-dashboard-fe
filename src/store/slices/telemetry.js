import { createSlice } from "@reduxjs/toolkit";
import { energy, flashBlack } from "../../assets";
import dayjs from "dayjs";

const initialState = {
  powerCards: [
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE A-Apparent Power",
      time: "Last update 3h ago",
      value: "0KVA",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE B-Apparent Power",
      time: "Last update 3h ago",
      value: "0KVA",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE C-Apparent Power",
      time: "Last update 3h ago",
      value: "0KVA",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-Active Power",
      value: "0KW",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Active Power",
      value: "0KW",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Active Power",
      value: "0KW",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE A-Reactive Power",
      time: "Last update 3h ago",
      value: "0KVAR",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE B-Reactive Power",
      time: "Last update 3h ago",
      value: "0KVAR",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE C-Reactive Power",
      time: "Last update 3h ago",
      value: "0KVAR",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE A-Power factor",
      time: "Last update 3h ago",
      value: "0%",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE B-Power factor",
      time: "Last update 3h ago",
      value: "0%",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE C-Power factor",
      time: "Last update 3h ago",
      value: "0%",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
  ],
  energyData: [
    {
      icon: energy,
      heading: "PHASE A-Active Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Active Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Active Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-Active Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Active Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Active Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-Reactive Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Reactive Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Reactive Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-Reactive Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Reactive Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Reactive Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "20px",
      phase: "C",
    },
  ],
  isSocketHasPower: false,
  isSocketHasEnergy: false,
  isSocketHasGeneral: false,
  totalChannels: 0,
  temperatureValue: null,
  generalData: [
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE A-RMS VOLTAGE",
      time: "Last update 3h ago",
      value: "0V",
      // valueColor: "red",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE B-RMS VOLTAGE",
      time: "Last update 3h ago",
      value: "0V",
      // valueColor: "red",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE C-RMS VOLTAGE",
      time: "Last update 3h ago",
      value: "0V",
      // valueColor: "red",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE A-LINE VOLTAGE",
      time: "Last update 3h ago",
      value: "0V",
      // valueColor: "red",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE B-LINE VOLTAGE",
      time: "Last update 3h ago",
      value: "0V",
      // valueColor: "red",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE C-LINE VOLTAGE",
      time: "Last update 3h ago",
      value: "0V",
      // valueColor: "red",
      headingSize: "20px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-RMS CURRENT",
      value: "0A",
      // valueColor: "green",
      headingSize: "20px",
      time: "Last update 3h ago",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-RMS CURRENT",
      value: "0A",
      // valueColor: "green",
      headingSize: "20px",
      time: "Last update 3h ago",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-RMS CURRENT",
      value: "0A",
      // valueColor: "green",
      headingSize: "20px",
      time: "Last update 3h ago",
      phase: "C",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE A-LINE FREQUENCY",
      time: "Last update 3h ago",
      value: "0Hz",
      // valueColor: "red",
      headingSize: "20px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE B-LINE FREQUENCY",
      time: "Last update 3h ago",
      value: "0Hz",
      // valueColor: "red",
      headingSize: "20px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "red",
      heading: "PHASE C-LINE FREQUENCY",
      time: "Last update 3h ago",
      value: "0Hz",
      // valueColor: "red",
      headingSize: "20px",
      phase: "C",
    },
  ],
  firstSixChannels: [],
  lastSixChannels: [],
  gotFirstSix: false,
  gotLastSix: false,
  allChannels: [],
  getAllChannels: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    addPowerData: (state, action) => {
      const d = action.payload?.data;
      // console.log(d.timestamp, "TIMESTAMP");
      const timestamp = d?.timestamp;
      let myTimeString = "";

      if (!timestamp || isNaN(new Date(timestamp).getTime())) {
        myTimeString = "Last update unknown";
      } else {
        const diffMs = new Date() - new Date(timestamp);
        const diffMinutes = Math.floor(diffMs / 60000);

        if (diffMinutes <= 0) {
          myTimeString = "Last update a few seconds ago";
        } else {
          myTimeString = `Last update ${diffMinutes} minute${
            diffMinutes > 1 ? "s" : ""
          } ago`;
        }
      }

      const phaseIndex = { a: 0, b: 1, c: 2 }[d.phase];
      if (phaseIndex === undefined) return;

      state.isSocketHasPower = true;

      state.powerCards[phaseIndex].value = `${d.apparent_power}kVA`;

      state.powerCards[phaseIndex].time = myTimeString;
      state.powerCards[3 + phaseIndex].value = `${d.active_power}kW`;
      state.powerCards[3 + phaseIndex].time = myTimeString;
      state.powerCards[6 + phaseIndex].value = `${d.reactive_power}kVAR`;

      state.powerCards[6 + phaseIndex].time = myTimeString;
      state.powerCards[9 + phaseIndex].value = `${d.power_factor}%`;

      state.powerCards[9 + phaseIndex].time = myTimeString;
    },
    addEnergyData: (state, action) => {
      const d = action.payload?.data;
      const timestamp = d?.timestamp;
      let myTimeString = "";

      if (!timestamp || isNaN(new Date(timestamp).getTime())) {
        myTimeString = "Last update unknown";
      } else {
        const diffMs = new Date() - new Date(timestamp);
        const diffMinutes = Math.floor(diffMs / 60000);

        if (diffMinutes <= 0) {
          myTimeString = "Last update a few seconds ago";
        } else {
          myTimeString = `Last update ${diffMinutes} minute${
            diffMinutes > 1 ? "s" : ""
          } ago`;
        }
      }

      const phaseIndex = { a: 0, b: 1, c: 2 }[d.phase];
      if (phaseIndex === undefined) return;

      state.isSocketHasEnergy = true;

      state.energyData[phaseIndex].value = `${d.active_energy_positive}kWh`;

      state.energyData[phaseIndex].time = myTimeString;

      state.energyData[3 + phaseIndex].value = `${d.active_energy_negative}kWh`;

      state.energyData[3 + phaseIndex].time = myTimeString;

      state.energyData[
        6 + phaseIndex
      ].value = `${d.reactive_energy_positive}kWh`;

      state.energyData[6 + phaseIndex].time = myTimeString;

      state.energyData[
        9 + phaseIndex
      ].value = `${d.reactive_energy_negative}kWh`;

      state.energyData[9 + phaseIndex].time = myTimeString;
    },
    addGeneralData: (state, action) => {
      const d = action.payload?.data;
      state.temperatureValue = d.temperature;
      const timestamp = d?.timestamp;
      let myTimeString = "";

      if (!timestamp || isNaN(new Date(timestamp).getTime())) {
        myTimeString = "Last update unknown";
      } else {
        const diffMs = new Date() - new Date(timestamp);
        const diffMinutes = Math.floor(diffMs / 60000);

        if (diffMinutes <= 0) {
          myTimeString = "Last update a few seconds ago";
        } else {
          myTimeString = `Last update ${diffMinutes} minute${
            diffMinutes > 1 ? "s" : ""
          } ago`;
        }
      }

      const phaseIndex = { a: 0, b: 1, c: 2 }[d.phase];
      if (phaseIndex === undefined) return;

      state.isSocketHasGeneral = true;

      state.generalData[phaseIndex].value = `${d.rms_voltage}V`;

      state.generalData[phaseIndex].time = myTimeString;

      state.generalData[3 + phaseIndex].value = `${d.line_voltage}V`;

      state.generalData[3 + phaseIndex].time = myTimeString;

      state.generalData[6 + phaseIndex].value = `${d.current}A`;

      state.generalData[6 + phaseIndex].time = myTimeString;

      state.generalData[9 + phaseIndex].value = `${d.frequency}Hz`;

      state.generalData[9 + phaseIndex].time = myTimeString;
    },
    handleUnsubscribe: (state) => {
      state.isSocketHasEnergy = false;
      state.isSocketHasPower = false;
      state.isSocketHasGeneral = false;
    },
    handleTotalChannels: (state, action) => {
      state.totalChannels = action.payload;
    },
    handleFirstSixChannels: (state, action) => {
      state.gotFirstSix = true;
      const payload = Array.isArray(action.payload) ? action.payload : [];
      const data = [];

      for (let index = 1; index <= 6; index++) {
        const element = payload[index - 1];
        data.push({
          id: index,
          variant: element
            ? element.status
              ? "connected"
              : "unfilled"
            : "disable",
          name: `Channel ${index > 9 ? index : `0${index}`}`,
        });
      }

      state.firstSixChannels = data;
    },

    handleLastSixChannels: (state, action) => {
      state.gotLastSix = true;
      const payload = Array.isArray(action.payload) ? action.payload : [];
      const data = [];

      for (let index = 7; index <= 12; index++) {
        const element = payload[index - 7];
        data.push({
          id: index,
          variant: element
            ? element.status
              ? "connected"
              : "unfilled"
            : "disable",
          name: `Channel ${index > 9 ? index : `0${index}`}`,
        });
      }

      state.lastSixChannels = data;
    },
    handleAllChannels: (state, action) => {
      state.getAllChannels = true;
      const payload = Array.isArray(action.payload) ? action.payload : [];
      const data = [];

      for (let index = 1; index <= 12; index++) {
        const element = payload.find((ch) => ch.ID === index);
        data.push({
          id: index,
          variant: element
            ? element.status
              ? "connected"
              : "unfilled"
            : "disable",
          name: `Channel ${index > 9 ? index : `0${index}`}`,
        });
      }

      state.allChannels = data;
    },

    resetChannelFlags: (state) => {
      state.gotFirstSix = false;
      state.gotLastSix = false;
      state.firstSixChannels = [];
      state.lastSixChannels = [];
      state.allChannels = [];
      state.getAllChannels = false;
    },
  },
});

export const {
  addPowerData,
  addEnergyData,
  handleUnsubscribe,
  handleTotalChannels,
  addGeneralData,
  handleFirstSixChannels,
  handleLastSixChannels,
  resetChannelFlags,
  handleAllChannels,
} = telemetrySlice.actions;
export default telemetrySlice.reducer;
