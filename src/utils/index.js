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
    let heading = `PHASE ${phase}-RME VOLTAGE`;
    return {
      icon: flashBlack,
      // color: "red",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.rms_voltage}V`,
      // valueColor: "red",
      headingSize: "20px",
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
    };
  });
  const rms_current = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-RMS CURRENT`;
    return {
      icon: energy,
      heading,
      value: `${item?.rms_voltage}A`,
      // valueColor: "green",
      headingSize: "20px",
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
      value: `${item?.avg_apparent_power}KVA`,
      // valueColor: "green",
      headingSize: "18.05px",
    };
  });
  const active_power = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Apparent Power`;
    return {
      icon: energy,
      heading,
      value: `${item?.avg_active_power}KW`,
      // valueColor: "green",
      headingSize: "19.5px",
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
      value: `${item?.avg_reactive_power}KVAR`,
      // valueColor: "green",
      headingSize: "19.5px",
    };
  });
  const power_factor = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Reactive Power`;
    return {
      icon: flashBlack,
      // color: "green",
      heading,
      time: `Last update ${dayjs(item?.updatedAt).fromNow()}`,
      value: `${item?.avg_power_factor}%`,
      // valueColor: "green",
      headingSize: "19.5px",
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
      value: `${item?.avg_active_energy_positive}KWh`,
      // valueColor: "green",
      headingSize: "19.5px",
    };
  });
  const active_energyNeg = data?.map((item) => {
    let phase = item?.phase?.toUpperCase() || "";
    let heading = `PHASE ${phase}-Active Energy (-)`;
    return {
      icon: energy,
      heading,
      value: `${item?.avg_active_energy_negative}KWh`,
      // valueColor: "green",
      headingSize: "19.5px",
    };
  });
  return [...active_energyPos, ...active_energyNeg];
};
