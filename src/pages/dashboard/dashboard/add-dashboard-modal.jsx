import { Typography } from "@mui/material";
import { DynamicModal } from "../../../components";

const AddDashboardModal = ({
  open,
  handleClose,
  handleCancel,
  handleAccept,
}) => {
  return (
    <DynamicModal
      open={open}
      handleClose={handleClose}
      cancelButtonText="Cancel"
      acceptButtonText="Add"
      handleCancel={handleCancel}
      handleAccept={handleAccept}
    >
      <Typography color="#147FCC" fontSize={34} fontWeight={900}>
        Add Dashboard
      </Typography>
    </DynamicModal>
  );
};

export default AddDashboardModal;
