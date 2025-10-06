// useSocket.js
import { useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addEnergyData,
  addPowerData,
  handleUnsubscribe,
} from "./store/slices/telemetry";
import { addMqttData } from "./store/slices/mqtt";
import dayjs from "dayjs";
import {
  updateDeviceInfo,
  updateMqttInfo,
  updateNtpInfo,
  updateSftpInfo,
} from "./store/slices/info";

let socketInstance = null; // Singleton

export function useSocket() {
  const dispatch = useDispatch();

  // ✅ Ensure only one socket is ever created
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected:", socketInstance.id);
    });

    socketInstance.on("mqtt_protocol", (obj) => {
      const transformed = {
        timestamp: dayjs(obj.timestamp).format("DD-MM-YYYY HH:mm"),
        date: new Date(obj.timestamp).toISOString().split("T")[0],
        time: new Date(obj.timestamp)
          .toISOString()
          .split("T")[1]
          .replace("Z", ""),
        device_ID: obj.ofp_uid,
        ...obj.data,
      };
      dispatch(addMqttData(transformed));
    });

    // ✅ New backend events
    socketInstance.on("device_info", (data) => {
      console.log("📥 device_info:", data);
      dispatch(updateDeviceInfo(data));
    });

    socketInstance.on("ntp_info", (data) => {
      console.log("📥 ntp_info:", data);
      dispatch(updateNtpInfo(data));
    });

    socketInstance.on("mqtt_info", (data) => {
      console.log("📥 mqtt_info:", data);
      dispatch(updateMqttInfo(data));
    });

    socketInstance.on("sftp_info", (data) => {
      console.log("📥 sftp_info:", data);
      dispatch(updateSftpInfo(data));
    });
  }

  // ✅ subscribe/unsubscribe for telemetry
  const subscribeToTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      socketInstance?.on(eventName, (data) => {
        dispatch(addPowerData(data));
        dispatch(addEnergyData(data));
      });
    },
    [dispatch]
  );

  const unsubscribeFromTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      console.log("🛑 Unsubscribing:", eventName);
      dispatch(handleUnsubscribe());
      socketInstance?.off(eventName);
    },
    [dispatch]
  );

  const emitEvent = useCallback((eventName, payload) => {
    if (!socketInstance) return;

    if (socketInstance.connected) {
      socketInstance.emit(eventName, payload);
    } else {
      socketInstance.once("connect", () => {
        socketInstance.emit(eventName, payload);
      });
    }
  }, []);

  // ✅ Helper methods for your new events
  const requestDeviceInfo = (id) => emitEvent(`device_info/${id}`, {});
  const requestNtpInfo = (id) => emitEvent(`ntp_info/${id}`, {});
  const requestMqttInfo = (id) => emitEvent(`mqtt_info/${id}`, {});
  const requestSftpInfo = (id) => emitEvent(`sftp_info/${id}`, {});

  return {
    subscribeToTelemetry,
    unsubscribeFromTelemetry,
    emitEvent,
    requestDeviceInfo,
    requestNtpInfo,
    requestMqttInfo,
    requestSftpInfo,
    socket: socketInstance,
  };
}
