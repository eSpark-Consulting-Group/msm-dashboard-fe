import { Box, Button, Modal, Typography } from "@mui/material";
import { modalClose } from "../../assets";

const DynamicModal = ({
  open,
  handleClose,
  sx,
  children,
  cancelButtonText,
  acceptButtonText,
  handleCancel,
  handleAccept,
  heading,
  hideClose,
  disabled,
  isLoading,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        sx: {
          backdropFilter: "blur(0.5px)",
          backgroundColor: "#A49D9D7A",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "95%",
            md: "70%",
            lg: "50%",
          },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "35px",
          padding: "20px 20px 30px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:focus-visible": { border: "none", outline: "none" },
          ...sx,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: "#147FCC",
              fontSize: { xs: "26px", md: "30px", lg: "34.55px" },
            }}
          >
            {heading}
          </Typography>
          {!hideClose && (
            <img
              src={modalClose}
              alt="Icon"
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            height: "calc(100% - 130px)",
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {children}
        </Box>
        {(acceptButtonText || cancelButtonText) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              columnGap: "15px",
              mt: "30px",
            }}
          >
            <Box
              sx={{ width: { xs: "150px", md: "203.70px" }, height: "50px" }}
            >
              {cancelButtonText && (
                <Button
                  variant="outlined"
                  disableRipple
                  disabled={isLoading}
                  onClick={handleCancel}
                  sx={{
                    fontSize: { xs: "14px", md: "16px", lg: "18px" },
                  }}
                >
                  {cancelButtonText}
                </Button>
              )}
            </Box>
            <Box
              sx={{ width: { xs: "150px", md: "203.70px" }, height: "50px" }}
            >
              {acceptButtonText && (
                <Button
                  variant="contained"
                  disableRipple
                  onClick={handleAccept}
                  disabled={disabled}
                  loading={isLoading}
                  sx={{
                    fontSize: { xs: "14px", md: "16px", lg: "18px" },
                  }}
                >
                  {acceptButtonText}
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
