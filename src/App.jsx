import Router from "./route";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DynamicModal } from "./components";
import ChangePassword from "./components/change-password";
import { useSocket } from "./SocketTest";

function App() {
  const { user } = useSelector((state) => state?.auth);
  const [open, setOpen] = useState(false);

  // ✅ Initialize socket connection immediately when App renders
  useSocket();

  useEffect(() => {
    if (user) {
      if (user?.isPasswordChanged === false) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [user]);

  return (
    <>
      <Router />
      <DynamicModal open={open} handleClose={() => {}} hideClose={true}>
        <ChangePassword handleClose={() => {}} />
      </DynamicModal>
    </>
  );
}

export default App;
