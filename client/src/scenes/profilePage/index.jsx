import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import Sidebar from "components/Sidebar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isTabletScreens = useMediaQuery("(min-width:600px) and (max-width:999px)");
  const isSmallScreens = useMediaQuery("(max-width:599px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { palette } = useTheme();
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
            minHeight: "calc(100vh - 64px)",
            background: palette.mode === "dark" ? 
              "linear-gradient(180deg, rgba(33,37,41,0.8) 0%, rgba(33,37,41,1) 100%)" : 
              "linear-gradient(180deg, rgba(248,249,250,0.8) 0%, rgba(248,249,250,1) 100%)",
          }}
        >
        <Box 
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          className="fade-in"
          sx={{ 
            animationDelay: "0.1s",
            marginBottom: isNonMobileScreens ? 0 : "1.5rem",
          }}
        >
          <UserWidget userId={userId} picturePath={user.picturePath} />
          {isNonMobileScreens && (
            <>
              <Box m="2rem 0" />
              <FriendListWidget userId={userId} />
            </>
          )}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
          className="fade-in"
          sx={{ 
            animationDelay: "0.2s",
            width: "100%",
          }}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m={isSmallScreens ? "1rem 0" : "2rem 0"} />
          <PostsWidget userId={userId} isProfile />
        </Box>
        
        {/* Tampilkan FriendListWidget di bawah untuk layar tablet */}
        {isTabletScreens && (
          <Box 
            className="fade-in"
            sx={{ 
              animationDelay: "0.3s",
              marginTop: "1.5rem",
            }}
          >
            <FriendListWidget userId={userId} />
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

export default ProfilePage;
