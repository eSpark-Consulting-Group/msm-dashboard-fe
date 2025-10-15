import { useEffect } from "react";
import { toast } from "react-toastify";
import { flashBlack, energy } from "../assets";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export function getValue(item, keys) {
  if (keys.length === 1) {
    return item[keys[0]];
  }
  let value = item;

  keys.forEach((key) => {
    value = value[key];
  });

  return value;
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    return true;
  } catch (error) {
    toast.error("Failed to copy to clipboard");
    return false;
  }
};

export const mapGeneralData = (telemetryData) => {
  const data = telemetryData || [];

  const rme_voltage = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-RMS VOLTAGE`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.rms_voltage}V`,
      // valueColor: "red",
      headingSize: "20px",
      phase,
    };
  });
  const line_voltage = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-LINE VOLTAGE`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.line_voltage}V`,
      // valueColor: "red",
      headingSize: "20px",
      phase,
    };
  });
  const rms_current = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-RMS CURRENT`;
    return {
      icon: energy,
      heading,
      value: `${item?.current}A`,
      // valueColor: "green",
      headingSize: "20px",
      phase,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
    };
  });
  const line_frequency = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-LINE FREQUENCY`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.frequency}Hz`,
      // valueColor: "red",
      headingSize: "17px",
      phase,
    };
  });
  return [...rme_voltage, ...line_voltage, ...rms_current, ...line_frequency];
};

export const mapPowerData = (telemetryData) => {
  const data = telemetryData || [];

  const apparent_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Apparent Power`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_apparent_power}kVA`,
      // valueColor: "green",
      headingSize: "18.05px",
      phase,
    };
  });
  const active_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Power`;
    return {
      icon: energy,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      heading,
      value: `${item?.avg_active_power}kW`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const reactive_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Power`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_reactive_power}kVAR`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const power_factor = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Power factor`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_power_factor}%`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  return [
    ...apparent_power,
    ...active_power,
    ...reactive_power,
    ...power_factor,
  ];
};

export const mapEnergyData = (telemetryData) => {
  const data = telemetryData || [];

  const active_energyPos = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Energy (+)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_active_energy_positive}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const active_energyNeg = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Energy (-)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_active_energy_negative}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const reactive_energyPos = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Energy (+)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_reactive_energy_positive}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const reactive_energyNeg = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Energy (-)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_reactive_energy_negative}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  return [
    ...active_energyPos,
    ...active_energyNeg,
    ...reactive_energyPos,
    ...reactive_energyNeg,
  ];
};

export const mapGeneralRTData = (telemetryData) => {
  const data = telemetryData || [];

  const rme_voltage = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-RMS VOLTAGE`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.rms_voltage}V`,
      // valueColor: "red",
      headingSize: "20px",
      phase,
    };
  });
  const line_voltage = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-LINE VOLTAGE`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.line_voltage}V`,
      // valueColor: "red",
      headingSize: "20px",
      phase,
    };
  });
  const rms_current = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-RMS CURRENT`;
    return {
      icon: energy,
      heading,
      value: `${item?.current}A`,
      // valueColor: "green",
      headingSize: "20px",
      phase,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
    };
  });
  const line_frequency = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-LINE FREQUENCY`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.frequency}Hz`,
      // valueColor: "red",
      headingSize: "17px",
      phase,
    };
  });
  return [...rme_voltage, ...line_voltage, ...rms_current, ...line_frequency];
};

export const mapPowerRTData = (telemetryData) => {
  const data = telemetryData || [];

  const apparent_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Apparent Power`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.apparent_power}kVA`,
      // valueColor: "green",
      headingSize: "18.05px",
      phase,
    };
  });
  const active_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Power`;
    return {
      icon: energy,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      heading,
      value: `${item?.active_power}kW`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const reactive_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Power`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.reactive_power}kVAR`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const power_factor = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Power factor`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.power_factor}%`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  return [
    ...apparent_power,
    ...active_power,
    ...reactive_power,
    ...power_factor,
  ];
};

export const mapEnergyRTData = (telemetryData) => {
  const data = telemetryData || [];

  const active_energyPos = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Energy (+)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.active_energy_positive}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const active_energyNeg = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Energy (-)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.active_energy_negative}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const reactive_energyPos = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Energy (+)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.reactive_energy_positive}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  const reactive_energyNeg = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Energy (-)`;
    return {
      icon: energy,
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.reactive_energy_negative}kWh`,
      // valueColor: "green",
      headingSize: "19.5px",
      phase,
    };
  });
  return [
    ...active_energyPos,
    ...active_energyNeg,
    ...reactive_energyPos,
    ...reactive_energyNeg,
  ];
};
