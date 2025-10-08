// useSocket.js
import { useEffect, useCallback, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
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
import {
  handleUpdateAssignDevice,
  handleUpdateDevice,
} from "./store/slices/devices";

let socketInstance = null; // Singleton socket

export function useSocket() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { selectedDevice } = useSelector((state) => state?.devices);
  const [deviceid, setDeviceId] = useState("");

  // ✅ Track currently selected device UUID
  useEffect(() => {
    if (selectedDevice) {
      setDeviceId(selectedDevice?.device_data?.device_uuid);
    }
  }, [selectedDevice]);

  // ✅ Initialize socket only once
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected:", socketInstance.id);
    });

    // ✅ MQTT data listener (general)
    socketInstance.on("mqtt_protocol", (obj) => {
      const transformed = {
        timestamp: dayjs(obj.timestamp).format("DD-MM-YYYY\nHH:mm"),
        date: obj?.date,
        time: obj?.time?.replace("-", ":"),
        device_ID: obj.ofp_uid,
        ...obj.data,
      };
      dispatch(addMqttData(transformed));
    });

    // ✅ Device status update event
    socketInstance.on("device_status_updated", (data) => {
      console.log("📡 device_status_updated from server:", data);
      if (user?.role?.name !== "user") {
        dispatch(handleUpdateDevice(data));
      } else if (user?.role?.name !== "user") {
        dispatch(handleUpdateAssignDevice(data));
      }
    });
  }

  // ✅ Device-specific info events (re-attach when deviceid changes)
  useEffect(() => {
    if (!deviceid || !socketInstance) return;

    console.log("🔗 Subscribing to device info events for:", deviceid);

    const handleDeviceInfo = (data) => {
      console.log("📥 device_info:", data);
      dispatch(updateDeviceInfo(data));
    };
    const handleNtpInfo = (data) => {
      console.log("📥 ntp_info:", data);
      dispatch(updateNtpInfo(data));
    };
    const handleMqttInfo = (data) => {
      console.log("📥 mqtt_info:", data);
      dispatch(updateMqttInfo(data));
    };
    const handleSftpInfo = (data) => {
      console.log("📥 sftp_info:", data);
      dispatch(updateSftpInfo(data));
    };

    socketInstance.on(`device_info:${deviceid}`, handleDeviceInfo);
    socketInstance.on(`ntp_info:${deviceid}`, handleNtpInfo);
    socketInstance.on(`mqtt_info:${deviceid}`, handleMqttInfo);
    socketInstance.on(`sftp_info:${deviceid}`, handleSftpInfo);

    // Cleanup when device changes or unmounts
    return () => {
      console.log("🧹 Cleaning up listeners for:", deviceid);
      socketInstance.off(`device_info:${deviceid}`, handleDeviceInfo);
      socketInstance.off(`ntp_info:${deviceid}`, handleNtpInfo);
      socketInstance.off(`mqtt_info:${deviceid}`, handleMqttInfo);
      socketInstance.off(`sftp_info:${deviceid}`, handleSftpInfo);
    };
  }, [deviceid, dispatch]);

  // ✅ Subscribe to telemetry
  const subscribeToTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      socketInstance?.on(eventName, (data) => {
        if (data?.data?.channel_id) {
          // console.log(data?.data?.channel_id, data);
          dispatch(addPowerData(data));
          dispatch(addEnergyData(data));
        }
      });
    },
    [dispatch]
  );

  // ✅ Unsubscribe from telemetry
  const unsubscribeFromTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      console.log("🛑 Unsubscribing:", eventName);
      dispatch(handleUnsubscribe());
      socketInstance?.off(eventName);
    },
    [dispatch]
  );

  // ✅ Emit helper (auto on reconnect)
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

  // ✅ Info request helpers (consistent naming)
  const requestDeviceInfo = (id) => emitEvent(`device_info:${id}`, {});
  const requestNtpInfo = (id) => emitEvent(`ntp_info:${id}`, {});
  const requestMqttInfo = (id) => emitEvent(`mqtt_info:${id}`, {});
  const requestSftpInfo = (id) => emitEvent(`sftp_info:${id}`, {});

  // ✅ Ensure socket connects as soon as the app renders
  useEffect(() => {
    if (socketInstance && !socketInstance.connected) {
      socketInstance.connect();
    }
  }, []);

  return {
    socket: socketInstance,
    subscribeToTelemetry,
    unsubscribeFromTelemetry,
    emitEvent,
    requestDeviceInfo,
    requestNtpInfo,
    requestMqttInfo,
    requestSftpInfo,
  };
}
