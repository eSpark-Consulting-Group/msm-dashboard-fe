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
      headingSize: "18.05px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE B-Apparent Power",
      time: "Last update 3h ago",
      value: "0KVA",
      // valueColor: "green",
      headingSize: "18.05px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE C-Apparent Power",
      time: "Last update 3h ago",
      value: "0KVA",
      // valueColor: "green",
      headingSize: "18.05px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-Active Power",
      value: "0KW",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Active Power",
      value: "0KW",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Active Power",
      value: "0KW",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "C",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE A-Reactive Power",
      time: "Last update 3h ago",
      value: "0KVAR",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE B-Reactive Power",
      time: "Last update 3h ago",
      value: "0KVAR",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE C-Reactive Power",
      time: "Last update 3h ago",
      value: "0KVAR",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "C",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE A-Power factor",
      time: "Last update 3h ago",
      value: "0%",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "A",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE B-Power factor",
      time: "Last update 3h ago",
      value: "0%",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "B",
    },
    {
      icon: flashBlack,
      // color: "green",
      heading: "PHASE C-Power factor",
      time: "Last update 3h ago",
      value: "0%",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "C",
    },
  ],
  energyData: [
    {
      icon: energy,
      heading: "PHASE A-Active Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Active Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Active Energy (+)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "C",
    },
    {
      icon: energy,
      heading: "PHASE A-Active Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "A",
    },
    {
      icon: energy,
      heading: "PHASE B-Active Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "B",
    },
    {
      icon: energy,
      heading: "PHASE C-Active Energy (-)",
      value: "0KWh",
      // valueColor: "green",
      headingSize: "19.5px",
      phase: "C",
    },
  ],
  isSocketHasPower: false,
  isSocketHasEnergy: false,
};

const telemetrySlice = createSlice({
  name: "telemetry",
  initialState,
  reducers: {
    addPowerData: (state, action) => {
      const d = action.payload?.data;

      const phaseIndex = { a: 0, b: 1, c: 2 }[d.phase];
      if (phaseIndex === undefined) return;

      state.isSocketHasPower = true;

      state.powerCards[phaseIndex].value = `${d.apparent_power}KVA`;

      state.powerCards[phaseIndex].time = `Last update ${dayjs(
        d.timestamp
      ).fromNow()}`;
      state.powerCards[3 + phaseIndex].value = `${d.active_power}KW`;
      state.powerCards[6 + phaseIndex].value = `${d.reactive_power}KVAR`;

      state.powerCards[6 + phaseIndex].time = `Last update ${dayjs(
        d.timestamp
      ).fromNow()}`;
      state.powerCards[9 + phaseIndex].value = `${d.power_factor}%`;

      state.powerCards[9 + phaseIndex].time = `Last update ${dayjs(
        d.timestamp
      ).fromNow()}`;
    },
    addEnergyData: (state, action) => {
      const d = action.payload?.data;

      const phaseIndex = { a: 0, b: 1, c: 2 }[d.phase];
      if (phaseIndex === undefined) return;

      state.isSocketHasEnergy = true;

      state.energyData[phaseIndex].value = `${d.active_energy_positive}KWh`;
      state.energyData[3 + phaseIndex].value = `${d.active_energy_negative}KWh`;
    },
    handleUnsubscribe: (state) => {
      state.isSocketHasEnergy = false;
      state.isSocketHasPower = false;
    },
  },
});

export const { addPowerData, addEnergyData, handleUnsubscribe } =
  telemetrySlice.actions;
export default telemetrySlice.reducer;
