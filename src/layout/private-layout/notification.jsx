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

const Notifications = ({ icon }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isPending, isLoading, isFetching, refetch } =
    useGetNotificationQuery({
      page,
      limit,
      unread_only: false,
    });

  const [markAsAllRead] = useMarkAsAllReadMutation();

  const notifications = useMemo(() => {
    if (!data?.data) return [];
    return data.data;
  }, [data]);

  const open = Boolean(anchorEl);
  const totalCount = data?.count || 0;
  const hasMore = notifications.length < totalCount;

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications],
  );

  const handleOpen = async (event) => {
    setAnchorEl(event.currentTarget);
    setPage(1);

    if (unreadCount > 0) {
      await markAsAllRead();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

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

        <Box
          sx={{
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {isLoading && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <CircularProgress size={20} />
            </Box>
          )}

          {!isLoading && notifications.length === 0 && (
            <MenuItem>No notifications</MenuItem>
          )}

          {!isLoading &&
            notifications?.map((item) => (
              <MenuItem
                key={item?._id}
                onClick={handleClose}
                sx={{
                  alignItems: "flex-start",
                  whiteSpace: "normal",
                  bgcolor: item?.is_read ? "#FFF" : "#F0F6FF",
                }}
              >
                <Box>
                  <Typography fontSize="13px">{item?.message}</Typography>
                  <Typography
                    fontSize="11px"
                    sx={{ color: "#A1A1A1" }}
                    mt={0.3}
                  >
                    {dayjs(item?.createdAt)?.fromNow()}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
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
