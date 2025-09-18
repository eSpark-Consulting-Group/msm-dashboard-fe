import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addEnergyData, addPowerData } from "./store/slices/telemetry";

export default function SocketTest() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("http://51.20.89.127:5000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
      socket.emit("hello", { msg: "Hi from React FE!" });
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection Error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.warn("❌ Disconnected:", reason);
    });

    socket.on("telemetry", (data) => {
      // console.log("📡 telemetry:", data?.data);
      dispatch(addPowerData(data?.data));
      dispatch(addEnergyData(data?.data));
    });

    socket.onAny((event, ...args) => {
      // console.log("🌐 [ANY EVENT]", event, args);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
}
