// useSocket.js
import { useEffect, useCallback, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  addEnergyData,
  addGeneralData,
  addPowerData,
  handleAllChannels,
  handleFirstSixChannels,
  handleLastSixChannels,
  handleUnsubscribe,
  resetChannelFlags,
} from "./store/slices/telemetry";
import { addMqttData } from "./store/slices/mqtt";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  updateDeviceInfo,
  updateMqttInfo,
  updateNtpInfo,
  updateSftpInfo,
  updateMqttsInfo,
  updateOtaInfo,
} from "./store/slices/info";
import {
  handleUpdateAssignDevice,
  handleUpdateDevice,
} from "./store/slices/devices";
import { updateDeviceMeasurements } from "./store/slices/measurements";

dayjs.extend(utc);
let socketInstance = null;

export function useSocket() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { selectedDevice } = useSelector((state) => state?.devices);
  const [deviceid, setDeviceId] = useState("");
  const activeSubscriptions = useRef([]);
  const lastSubscribedDevice = useRef(null); // ✅ Prevent duplicate listeners

  // Track selected device
  useEffect(() => {
    if (selectedDevice) {
      setDeviceId(
        user?.role?.name === "user"
          ? selectedDevice?.device_data?.device_data?.device_uuid
          : selectedDevice?.device_data?.device_uuid
      );
    }
  }, [selectedDevice, user]);

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

      // 🔁 Re-emit all remembered subscriptions
      if (activeSubscriptions.current.length > 0) {
        activeSubscriptions.current.forEach(({ event, payload }) => {
          socketInstance.emit(event, payload);
        });
      }
    });

    // MQTT listener
    socketInstance.on("mqtt_protocol", (obj) => {
      if (obj) {
        const transformed = {
          timestamp: dayjs(obj?.timestamp).format("DD-MM-YYYY\nHH:mm:ss"),
          date: dayjs(obj?.created_at).format("DD/MM/YYYY"),
          time: dayjs(obj?.created_at).format("HH:mm"),
          ...obj?.data,
        };
        dispatch(addMqttData(transformed));
      }
    });
  }

  // Device status updates
  useEffect(() => {
    if (!socketInstance) return;

    socketInstance.off("device_status_updated");
    socketInstance.on("device_status_updated", (data) => {
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

    const handleDeviceInfo = (data) => dispatch(updateDeviceInfo(data));
    const handleNtpInfo = (data) => dispatch(updateNtpInfo(data));
    const handleMqttInfo = (data) => dispatch(updateMqttInfo(data));
    const handleSftpInfo = (data) => dispatch(updateSftpInfo(data));
    const handleMqttsInfo = (data) => dispatch(updateMqttsInfo(data));
    const handleOtaInfo = (data) => dispatch(updateOtaInfo(data));
    const handleMeasurementsInfo = (data) => dispatch(updateDeviceMeasurements(data));

    socketInstance.on(`device_info:${deviceid}`, handleDeviceInfo);
    socketInstance.on(`ntp_info:${deviceid}`, handleNtpInfo);
    socketInstance.on(`mqtt_info:${deviceid}`, handleMqttInfo);
    socketInstance.on(`sftp_info:${deviceid}`, handleSftpInfo);
    socketInstance.on(`mqtts_info:${deviceid}`, handleMqttsInfo);
    socketInstance.on(`ota_info:${deviceid}`, handleOtaInfo);
    socketInstance.on(`measurements:${deviceid}`, handleMeasurementsInfo);

    return () => {
      socketInstance.off(`device_info:${deviceid}`, handleDeviceInfo);
      socketInstance.off(`ntp_info:${deviceid}`, handleNtpInfo);
      socketInstance.off(`mqtt_info:${deviceid}`, handleMqttInfo);
      socketInstance.off(`sftp_info:${deviceid}`, handleSftpInfo);
      socketInstance.off(`mqtts_info:${deviceid}`, handleMqttsInfo);
      socketInstance.off(`ota_info:${deviceid}`, handleOtaInfo);
      socketInstance.off(`measurements:${deviceid}`, handleMeasurementsInfo);
    };
  }, [deviceid, dispatch]);

  // Telemetry listeners
  useEffect(() => {
    if (!deviceid || !socketInstance) return;

    // ✅ Prevent duplicate subscription for same device
    if (lastSubscribedDevice.current === deviceid) return;
    lastSubscribedDevice.current = deviceid;

    // const handleChannels1to6 = (data) => {
    //   dispatch(handleFirstSixChannels(data?.data));
    // };
    // const handleChannels7to12 = (data) => {
    //   dispatch(handleLastSixChannels(data?.data));
    // };
    const handleAll = (data) => {
      if (deviceid === data?.deviceUuid) {
        dispatch(handleAllChannels(data?.data));
      }
    };

    // socketInstance.on(
    //   `telemetry:${deviceid}:channels:1to6`,
    //   handleChannels1to6
    // );
    // socketInstance.on(
    //   `telemetry:${deviceid}:channels:7to12`,
    //   handleChannels7to12
    // );
    socketInstance.on(`telemetry:${deviceid}:channels:all`, handleAll);

    console.log(`✅ Subscribed telemetry for ${deviceid}`);

    return () => {
      console.log(`🧹 Cleaning telemetry for ${deviceid}`);
      // socketInstance.off(
      //   `telemetry:${deviceid}:channels:1to6`,
      //   handleChannels1to6
      // );
      // socketInstance.off(
      //   `telemetry:${deviceid}:channels:7to12`,
      //   handleChannels7to12
      // );
      socketInstance.off(`telemetry:${deviceid}:channels:all`, handleAll);
      dispatch(resetChannelFlags());
      lastSubscribedDevice.current = null;
    };
  }, [deviceid, dispatch]);

  // Per-channel telemetry subscribe
  const subscribeToTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      socketInstance?.on(eventName, (data) => {
        if (data?.data?.channel_id) {
          // console.log(data?.data?.channel_id, data?.data);
          dispatch(addPowerData(data));
          dispatch(addEnergyData(data));
          dispatch(addGeneralData(data));
        }
      });
      console.log(`✅ Subscribed to ${eventName}`);
    },
    [dispatch]
  );

  const unsubscribeFromTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      console.log(`🛑 Unsubscribed from ${eventName}`);
      dispatch(handleUnsubscribe());
      socketInstance?.off(eventName);
    },
    [dispatch]
  );

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

  // ✅ Improved emitEvent — remembers subscriptions
  const emitEvent = useCallback((eventName, payload, remember = false) => {
    if (!socketInstance) return;

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
