// useSocket.js
import { useEffect, useCallback, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addEnergyData,
  addPowerData,
  handleUnsubscribe,
} from "./store/slices/telemetry";
import { addMqttData } from "./store/slices/mqtt";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
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

dayjs.extend(utc);
let socketInstance = null;

export function useSocket() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { selectedDevice } = useSelector((state) => state?.devices);
  const [deviceid, setDeviceId] = useState("");
  const activeSubscriptions = useRef([]); // ✅ Store re-emittable events

  // Track selected device
  useEffect(() => {
    if (selectedDevice) {
      setDeviceId(
        user?.role?.name === "user"
          ? selectedDevice?.device_data?.device_data?.device_uuid
          : selectedDevice?.device_data?.device_uuid
      );
    }
  }, [selectedDevice]);

  // ✅ Create singleton socket
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
    });

    socketInstance.on("connect", () => {
      console.log("✅ Connected:", socketInstance.id);

      // 🔁 Re-emit all previous protocol subscriptions
      if (activeSubscriptions.current.length > 0) {
        console.log("🔁 Re-sending subscriptions after reconnect...");
        activeSubscriptions.current.forEach(({ event, payload }) => {
          console.log("↩️ Re-emitting:", event, payload);
          socketInstance.emit(event, payload);
        });
      }
    });

    // General MQTT data listener
    socketInstance.on("mqtt_protocol", (obj) => {
      console.log("📥 Received: mqtt_protocol", obj);
      const transformed = {
        timestamp: dayjs(obj.timestamp).format("DD-MM-YYYY\nHH:mm:ss"),
        date: dayjs(obj?.created_at).format("DD/MM/YYYY"),
        time: dayjs(obj?.created_at).format("HH:mm"),
        ...obj.data,
      };
      dispatch(addMqttData(transformed));
    });
  }

  // Device status updates
  useEffect(() => {
    if (!socketInstance) return;

    socketInstance.off("device_status_updated");
    socketInstance.on("device_status_updated", (data) => {
      console.log("📥 Received: device_status_updated", data);
      if (user?.role?.name !== "user") {
        dispatch(handleUpdateDevice(data));
      } else {
        dispatch(handleUpdateAssignDevice(data));
      }
    });
  }, [user, dispatch]);

  // Device info listeners
  useEffect(() => {
    if (!deviceid || !socketInstance) return;

    const handleDeviceInfo = (data) => {
      console.log(`📥 Received: device_info:${deviceid}`, data);
      dispatch(updateDeviceInfo(data));
    };
    const handleNtpInfo = (data) => {
      console.log(`📥 Received: ntp_info:${deviceid}`, data);
      dispatch(updateNtpInfo(data));
    };
    const handleMqttInfo = (data) => {
      console.log(`📥 Received: mqtt_info:${deviceid}`, data);
      dispatch(updateMqttInfo(data));
    };
    const handleSftpInfo = (data) => {
      console.log(`📥 Received: sftp_info:${deviceid}`, data);
      dispatch(updateSftpInfo(data));
    };

    socketInstance.on(`device_info:${deviceid}`, handleDeviceInfo);
    socketInstance.on(`ntp_info:${deviceid}`, handleNtpInfo);
    socketInstance.on(`mqtt_info:${deviceid}`, handleMqttInfo);
    socketInstance.on(`sftp_info:${deviceid}`, handleSftpInfo);

    return () => {
      socketInstance.off(`device_info:${deviceid}`, handleDeviceInfo);
      socketInstance.off(`ntp_info:${deviceid}`, handleNtpInfo);
      socketInstance.off(`mqtt_info:${deviceid}`, handleMqttInfo);
      socketInstance.off(`sftp_info:${deviceid}`, handleSftpInfo);
    };
  }, [deviceid, dispatch]);

  // Telemetry subscription
  const subscribeToTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      socketInstance?.on(eventName, (data) => {
        console.log(`📥 Received: ${eventName}`, data);
        if (data?.data?.channel_id) {
          dispatch(addPowerData(data));
          dispatch(addEnergyData(data));
        }
      });
    },
    [dispatch]
  );

  // Stop event (unsubscribe type)
  const stopEvent = useCallback((eventName, payload) => {
    if (!socketInstance) return;
    console.log(`🛑 Stop event emit: ${eventName}`, payload);

    activeSubscriptions.current = activeSubscriptions.current.filter(
      (e) =>
        !(
          e.event === eventName &&
          JSON.stringify(e.payload) === JSON.stringify(payload)
        )
    );

    socketInstance.emit(eventName, payload);
  }, []);

  const unsubscribeFromTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      console.log(`🛑 Unsubscribed from ${eventName}`);
      dispatch(handleUnsubscribe());
      socketInstance?.off(eventName);
    },
    [dispatch]
  );

  // ✅ Improved emitEvent — remembers subscriptions
  const emitEvent = useCallback((eventName, payload, remember = false) => {
    if (!socketInstance) return;

    console.log(
      `📤 Emitting event: ${eventName}`,
      payload,
      "remember:",
      remember
    );

    if (remember) {
      const exists = activeSubscriptions.current.some(
        (e) =>
          e.event === eventName &&
          JSON.stringify(e.payload) === JSON.stringify(payload)
      );
      if (!exists)
        activeSubscriptions.current.push({ event: eventName, payload });
    }

    if (socketInstance.connected) {
      socketInstance.emit(eventName, payload);
    } else {
      socketInstance.once("connect", () => {
        console.log(`🔁 Deferred emit on connect: ${eventName}`, payload);
        socketInstance.emit(eventName, payload);
      });
    }
  }, []);

  // Info request helpers
  const requestDeviceInfo = (id) => emitEvent(`device_info:${id}`, {});
  const requestNtpInfo = (id) => emitEvent(`ntp_info:${id}`, {});
  const requestMqttInfo = (id) => emitEvent(`mqtt_info:${id}`, {});
  const requestSftpInfo = (id) => emitEvent(`sftp_info:${id}`, {});

  useEffect(() => {
    if (socketInstance && !socketInstance.connected) socketInstance.connect();
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
    stopEvent,
  };
}
