// useSocket.js
import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addEnergyData,
  addPowerData,
  handleUnsubscribe,
} from "./store/slices/telemetry";
import { addMqttData } from "./store/slices/mqtt";

let socketInstance = null; // 🔑 global singleton socket

export function useSocket() {
  const dispatch = useDispatch();
  const socketRef = useRef(socketInstance);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
        transports: ["websocket"],
      });
      socketInstance = socketRef.current;

      socketRef.current.on("connect", () => {
        console.log("✅ Connected:", socketRef.current.id);
      });

      // 🔹 Listen for mqtt_protocol event from server
      socketRef.current.on("mqtt_protocol", (obj) => {
        const transformed = {
          timestamp: obj.timestamp,
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
    }
  }, [dispatch]);

  // ✅ subscribe/unsubscribe for telemetry
  const subscribeToTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      socketRef.current?.on(eventName, (data) => {
        dispatch(addPowerData(data));
        dispatch(addEnergyData(data));
      });
    },
    [dispatch]
  );

  const unsubscribeFromTelemetry = useCallback(
    (deviceId, channelId) => {
      const eventName = `telemetry:${deviceId}:channel:${channelId}`;
      dispatch(handleUnsubscribe());
      socketRef.current?.off(eventName);
    },
    [dispatch]
  );

  // ✅ emit (send) event to server
  const emitEvent = useCallback((eventName, payload) => {
    if (!socketRef.current) return;

    if (socketRef.current.connected) {
      // already connected → send immediately
      socketRef.current.emit(eventName, payload);
      // console.log(`📤 Sent ${eventName}:`, payload);
    } else {
      // not connected yet → wait for connection, then send once
      socketRef.current.once("connect", () => {
        socketRef.current.emit(eventName, payload);
        // console.log(`📤 Sent (after connect) ${eventName}:`, payload);
      });
    }
  }, []);

  return {
    subscribeToTelemetry,
    unsubscribeFromTelemetry,
    emitEvent, // 🔹 expose sending function
  };
}
