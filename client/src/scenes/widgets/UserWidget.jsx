import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [socialProfiles, setSocialProfiles] = useState({
    twitter: { url: "", username: "" },
    linkedin: { url: "", username: "" }
  });
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    
    // Get social profiles
    const socialResponse = await fetch(`http://localhost:3001/users/${userId}/social-profiles`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (socialResponse.ok) {
      const socialData = await socialResponse.json();
      setSocialProfiles(socialData);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
        sx={{
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-3px)",
          },
        }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="600"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
                textShadow: palette.mode === "dark" ? "0 0 1px rgba(255,255,255,0.1)" : "none",
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium} fontWeight="500">{friends.length} teman</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ color: palette.primary.main }} />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Pengunjung profil</Typography>
          <Typography color={main} fontWeight="600" sx={{ 
            backgroundColor: palette.primary.light,
            color: palette.mode === "dark" ? "white" : "black",
            borderRadius: "1rem",
            padding: "0.2rem 0.8rem",
            fontSize: "0.9rem"
          }}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impresi postingan</Typography>
          <Typography color={main} fontWeight="600" sx={{ 
            backgroundColor: palette.primary.light,
            color: palette.mode === "dark" ? "white" : "black",
            borderRadius: "1rem",
            padding: "0.2rem 0.8rem",
            fontSize: "0.9rem"
          }}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1.1rem" color={main} fontWeight="600" mb="1rem">
          Profil Sosial
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>
                {socialProfiles.twitter.username || "Not Connected"}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined 
            sx={{ color: main, cursor: "pointer" }} 
            onClick={async () => {
              const username = prompt("Enter your Twitter username:");
              if (username) {
                const response = await fetch(
                  `http://localhost:3001/users/${userId}/social-profiles`,
                  {
                    method: "PATCH",
                    headers: { 
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      platform: "twitter",
                      username,
                      url: `https://twitter.com/${username}`
                    })
                  }
                );
                if (response.ok) {
                  const updatedProfiles = await response.json();
                  setSocialProfiles(updatedProfiles);
                }
              }
            }}
          />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>
                {socialProfiles.linkedin.username || "Not Connected"}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined 
            sx={{ color: main, cursor: "pointer" }} 
            onClick={async () => {
              const username = prompt("Enter your LinkedIn username:");
              if (username) {
                const response = await fetch(
                  `http://localhost:3001/users/${userId}/social-profiles`,
                  {
                    method: "PATCH",
                    headers: { 
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      platform: "linkedin",
                      username,
                      url: `https://linkedin.com/in/${username}`
                    })
                  }
                );
                if (response.ok) {
                  const updatedProfiles = await response.json();
                  setSocialProfiles(updatedProfiles);
                }
              }
            }}
          />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
