import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Home,
  Person,
  Settings,
  Logout,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Sidebar = ({ isMobile, drawerOpen, toggleDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const drawerWidth = isNonMobileScreens ? 250 : 240;

  const menuItems = [
    {
      text: "Beranda",
      icon: <Home />,
      onClick: () => navigate("/home"),
    },
    {
      text: "Profil",
      icon: <Person />,
      onClick: () => navigate(`/profile/${user._id}`),
    },
    {
      text: "Pesan",
      icon: <Message />,
      onClick: () => {},
    },
    {
      text: "Notifikasi",
      icon: <Notifications />,
      onClick: () => {},
    },
    {
      text: "Bantuan",
      icon: <Help />,
      onClick: () => {},
    },
    {
      text: "Pengaturan",
      icon: <Settings />,
      onClick: () => {},
    },
  ];

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        backgroundColor: alt,
      }}
    >
      {/* USER PROFILE */}
      <Box p="1.5rem">
        <FlexBetween gap="1rem" pb="1.5rem">
          <FlexBetween gap="1rem">
            <UserImage image={user.picturePath} size="50px" />
            <Box>
              <Typography
                variant="h5"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate(`/profile/${user._id}`)}
              >
                {fullName}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {user.occupation}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        {/* THEME TOGGLE */}
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Mode {theme.palette.mode === "dark" ? "Terang" : "Gelap"}</Typography>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        </FlexBetween>
      </Box>

      <Divider />

      {/* MENU ITEMS */}
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={item.onClick}>
            <ListItemIcon sx={{ color: main }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography color={main} fontWeight="500">
                  {item.text}
                </Typography>
              }
            />
          </ListItem>
        ))}

        {/* LOGOUT */}
        <ListItem button onClick={() => dispatch(setLogout())}>
          <ListItemIcon sx={{ color: main }}>
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography color={main} fontWeight="500">
                Keluar
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isNonMobileScreens ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "none",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;