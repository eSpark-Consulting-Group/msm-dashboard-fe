// useSocket.js
import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addEnergyData,
  addPowerData,
  handleUnsubscribe,
} from "./store/slices/telemetry";

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

      // if you want global telemetry
      // socketRef.current.on("telemetry", (data) => {
      //   dispatch(addPowerData(data?.data));
      //   dispatch(addEnergyData(data?.data));
      // });
    }

    return () => {
      // don't disconnect globally unless app fully unmounts
    };
  }, [dispatch]);

  // ✅ stable subscribe/unsubscribe with useCallback
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

  const unsubscribeFromTelemetry = useCallback((deviceId, channelId) => {
    const eventName = `telemetry:${deviceId}:channel:${channelId}`;
    dispatch(handleUnsubscribe());
    socketRef.current?.off(eventName);
  }, []);

  return { subscribeToTelemetry, unsubscribeFromTelemetry };
}
