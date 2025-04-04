import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Menu,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isSmallScreens = useMediaQuery("(max-width: 599px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  return (
    <FlexBetween 
      padding={isSmallScreens ? "0.75rem 3%" : "1rem 6%"} 
      backgroundColor={alt}
      sx={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <FlexBetween gap={isSmallScreens ? "0.5rem" : "1.75rem"}>
        {!isNonMobileScreens && (
          <IconButton onClick={toggleDrawer} size={isSmallScreens ? "small" : "medium"}>
            <Menu />
          </IconButton>
        )}
        <Typography
          fontWeight="bold"
          fontSize={isSmallScreens ? "clamp(0.8rem, 1.5rem, 1.75rem)" : "clamp(1rem, 2rem, 2.25rem)"}
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
            display: "flex",
            alignItems: "center",
            gap: isSmallScreens ? "0.3rem" : "0.5rem",
          }}
        >
          <Box
            component="span"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              borderRadius: "50%",
              width: isSmallScreens ? "25px" : "30px",
              height: isSmallScreens ? "25px" : "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isSmallScreens ? "0.8rem" : "1rem",
              fontWeight: "bold",
            }}
          >
            H
          </Box>
          {isSmallScreens ? "HS" : "Hinstagram"}
        </Typography>
      </FlexBetween>

      {/* SEARCH BAR */}
      <FlexBetween
        backgroundColor={neutralLight}
        borderRadius="9px"
        gap={isSmallScreens ? "0.5rem" : "3rem"}
        padding={isSmallScreens ? "0.1rem 0.5rem" : "0.1rem 1.5rem"}
        sx={{
          maxWidth: isSmallScreens ? "120px" : "unset",
        }}
      >
        <InputBase 
          placeholder="Cari..." 
          sx={{
            fontSize: isSmallScreens ? "0.8rem" : "1rem",
            width: isSmallScreens ? "60px" : "auto",
          }}
        />
        <IconButton size={isSmallScreens ? "small" : "medium"}>
          <Search fontSize={isSmallScreens ? "small" : "medium"} />
        </IconButton>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
