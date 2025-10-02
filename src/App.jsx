import Router from "./route";
import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DynamicModal } from "./components";
import ChangePassword from "./components/change-password";

function App() {
  const { user } = useSelector((state) => state?.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      if (!user?.isPasswordChanged) {
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
