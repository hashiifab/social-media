import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import Sidebar from "components/Sidebar";
import { useState } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isTabletScreens = useMediaQuery("(min-width:600px) and (max-width:999px)");
  const isSmallScreens = useMediaQuery("(max-width:599px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar isMobile={!isNonMobileScreens} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Navbar toggleDrawer={toggleDrawer} />
        <Box
          width="100%"
          padding={isNonMobileScreens ? "2rem 6%" : isTabletScreens ? "1.5rem 4%" : "1rem 3%"}
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
          sx={{
            background: palette.mode === "dark" ? 
              "linear-gradient(180deg, rgba(33,37,41,0.8) 0%, rgba(33,37,41,1) 100%)" : 
              "linear-gradient(180deg, rgba(248,249,250,0.8) 0%, rgba(248,249,250,1) 100%)",
            minHeight: "calc(100vh - 64px)",
          }}
        >

          <Box
            flexBasis={isNonMobileScreens ? "50%" : undefined}
            mt={isNonMobileScreens ? undefined : "1rem"}
            className="fade-in"
            sx={{ 
              animationDelay: "0.2s",
              width: "100%",
              margin: isNonMobileScreens ? "0 auto" : undefined,
            }}
          >
            <MyPostWidget picturePath={picturePath} />
            <Box sx={{ mt: isSmallScreens ? "1rem" : "1.5rem" }}>
              <PostsWidget userId={_id} />
            </Box>
          </Box>
          {isNonMobileScreens && (
            <Box 
              flexBasis="30%"
              className="fade-in"
              sx={{ 
                animationDelay: "0.3s",
                padding: "1rem",
                backgroundColor: palette.background.alt,
                borderRadius: "0.75rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <AdvertWidget />
              <Box m="2rem 0" />
              <FriendListWidget userId={_id} />
            </Box>
          )}
          
          {/* Tampilkan FriendListWidget di bawah untuk layar tablet */}
          {isTabletScreens && (
            <Box 
              className="fade-in"
              sx={{ 
                animationDelay: "0.3s",
                marginTop: "1.5rem",
              }}
            >
              <FriendListWidget userId={_id} />
            </Box>
          )}
          
          {/* Tombol untuk menampilkan sidebar di layar kecil */}
          {isSmallScreens && !drawerOpen && (
            <Box 
              sx={{ 
                position: "fixed", 
                bottom: "20px", 
                right: "20px", 
                zIndex: 1000,
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
              onClick={toggleDrawer}
            >
              <Typography variant="h6">+</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
