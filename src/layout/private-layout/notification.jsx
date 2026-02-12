import { useState, useMemo } from "react";
import {
  Box,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Fade,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import dayjs from "dayjs";
import {
  useGetNotificationQuery,
  useMarkAsAllReadMutation,
} from "../../services/notification";
import { useEffect } from "react";
import { useSocket } from "../../SocketTest";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlertData,
  addNotificationData,
  markAllReadInStore,
  prependAlert,
  prependNotification,
} from "../../store/slices/notification";
import { Tabs, Tab } from "@mui/material";

const Notifications = ({ icon }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("alert");
  const limit = 10;
  const { socket } = useSocket();

  const { data, isPending, isFetching, refetch, isSuccess } =
    useGetNotificationQuery({
      page,
      limit,
      unread_only: false,
      ...(tab ? { type: tab } : {}),
    });

  const [markAsAllRead] = useMarkAsAllReadMutation();

  const {
    alert: alerts,
    notification: notifications,
    alertLoading,
    notificationLoading,
  } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const totalCount =
    (data?.total_alerts || 0) + (data?.total_notification || 0);
  const hasMore =
    tab == "alert"
      ? alerts.length < totalCount && data?.data?.length === limit
      : notifications.length < totalCount && data?.data?.length === limit;

  const unreadCount = useMemo(() => {
    if (tab === "alert") {
      return alerts.filter((item) => !item.is_read).length;
    }

    return notifications.filter((item) => !item.is_read).length;
  }, [tab, alerts, notifications]);

  const handleOpen = async (event) => {
    setAnchorEl(event.currentTarget);
    setPage(1);
    if (unreadCount > 0) {
      try {
        markAsAllRead({ type: tab });

        dispatch(markAllReadInStore({ type: tab }));
      } catch (err) {
        console.error("Failed to mark notifications as read:", err);
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoadMore = async () => {
    setPage((prev) => prev + 1);
    if (unreadCount > 0) {
      try {
        markAsAllRead({ type: tab });

        dispatch(markAllReadInStore({ type: tab }));
      } catch (err) {
        console.error("Failed to mark notifications as read:", err);
      }
    }
  };

  const handleTabChange = async (event, newValue) => {
    if (newValue === tab) return;

    setTab(newValue);
    setPage(1);

    if (unreadCount > 0) {
      try {
        markAsAllRead({ type: tab });

        dispatch(markAllReadInStore({ type: tab }));
      } catch (err) {
        console.error("Failed to mark notifications as read:", err);
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleSocketEvent = (data) => {
      if (data.type === "alert") {
        dispatch(prependAlert(data));
      } else if (data.type === "notification") {
        dispatch(prependNotification(data));
      }
    };

    socket.on("new_notification", handleSocketEvent);

    return () => {
      socket.off("new_notification", handleSocketEvent);
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (isSuccess && data?.data && tab === "alert") {
      dispatch(addAlertData(data?.data));
    } else if (isSuccess && data?.data && tab === "notification") {
      dispatch(addNotificationData(data?.data));
    }
  }, [data, dispatch, page, isSuccess]);

  useEffect(() => {
    if (!anchorEl) return;

    if (unreadCount === 0) return;

    let timer = setTimeout(async () => {
      try {
        await markAsAllRead({ type: tab });
        dispatch(markAllReadInStore({ type: tab }));
      } catch (err) {
        console.error("Auto mark as read failed:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [unreadCount, anchorEl, tab]);

  return (
    <>
      <Box
        sx={{ cursor: "pointer", mt: unreadCount === 0 ? 0 : 1 }}
        onClick={handleOpen}
      >
        <Badge
          badgeContent={unreadCount}
          color={"secondary"}
          invisible={unreadCount === 0}
        >
          <img src={icon} alt="notifications" />
        </Badge>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            width: 240,
            borderRadius: 2,
            mt: 1,
          },
        }}
        sx={{
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            pt: 0,
            pb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontWeight={600}>Notifications</Typography>

          <IconButton
            size="small"
            onClick={refetch}
            disabled={isFetching}
            sx={{
              transition: "transform 0.3s",
              animation: isFetching ? "spin 0.5s linear infinite" : "none",
            }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ px: 1, pb: 1 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="standard"
            centered
            TabIndicatorProps={{
              style: { backgroundColor: "#0C89E2", height: "3px" },
            }}
            sx={{
              borderBottom: "1px solid #D9D9D9",
              minHeight: "40px",
            }}
          >
            <Tab
              label="Alerts"
              value="alert"
              sx={{
                textTransform: "none",
                minHeight: "40px",
                color: "#A6A7A7",
                "&.Mui-selected": { color: "#0C89E2" },
              }}
              disableRipple
            />
            <Tab
              label="Notifications"
              value="notification"
              sx={{
                textTransform: "none",
                minHeight: "40px",
                color: "#A6A7A7",
                "&.Mui-selected": { color: "#0C89E2" },
              }}
              disableRipple
            />
          </Tabs>
        </Box>

        <Box
          sx={{
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {notificationLoading && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <CircularProgress size={20} />
            </Box>
          )}

          {tab === "alert" ? (
            <>
              {alerts?.length === 0 && !alertLoading && (
                <MenuItem
                  sx={{
                    justifyContent: "center",
                    cursor: "default",
                    color: "#505050",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  disableRipple
                >
                  {"No alert"}
                </MenuItem>
              )}
            </>
          ) : (
            <>
              {notifications?.length === 0 && !notificationLoading && (
                <MenuItem
                  sx={{
                    justifyContent: "center",
                    cursor: "default",
                    color: "#505050",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                  disableRipple
                >
                  {"No notification"}
                </MenuItem>
              )}
            </>
          )}

          {tab === "alert" ? (
            <>
              {alerts?.slice(0, limit)?.map((item) => (
                <MenuItem
                  key={item._id}
                  onClick={handleClose}
                  sx={{
                    alignItems: "flex-start",
                    whiteSpace: "normal",
                    bgcolor: item.is_read ? "#FFF" : "#F0F6FF",
                  }}
                >
                  <Box>
                    <Typography fontSize="13px">{item.message}</Typography>
                    <Typography
                      fontSize="11px"
                      sx={{ color: "#A1A1A1" }}
                      mt={0.3}
                    >
                      {dayjs(item.createdAt).fromNow()}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </>
          ) : (
            <>
              {notifications?.map((item) => (
                <MenuItem
                  key={item._id}
                  onClick={handleClose}
                  sx={{
                    alignItems: "flex-start",
                    whiteSpace: "normal",
                    bgcolor: item.is_read ? "#FFF" : "#F0F6FF",
                  }}
                >
                  <Box>
                    <Typography fontSize="13px">{item.message}</Typography>
                    <Typography
                      fontSize="11px"
                      sx={{ color: "#A1A1A1" }}
                      mt={0.3}
                    >
                      {dayjs(item.createdAt).fromNow()}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </>
          )}
        </Box>

        {hasMore && (
          <Box sx={{ pt: 1, textAlign: "center" }}>
            <IconButton
              size="small"
              disableRipple
              disabled={isFetching}
              onClick={handleLoadMore}
            >
              {isPending ? (
                <CircularProgress size={18} />
              ) : (
                <Typography fontSize="12px">Load more</Typography>
              )}
            </IconButton>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default Notifications;
