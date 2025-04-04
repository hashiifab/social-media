import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "1rem",
  boxShadow: theme.palette.mode === "dark" 
    ? "0 4px 12px rgba(0, 0, 0, 0.25)" 
    : "0 4px 12px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  marginBottom: "1.5rem",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.mode === "dark" 
      ? "0 8px 24px rgba(0, 0, 0, 0.3)" 
      : "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
  
  // Media queries untuk responsivitas
  "@media (max-width: 599px)": {
    padding: "1rem 1rem 0.5rem 1rem",
    borderRadius: "0.75rem",
    marginBottom: "1rem",
    "&:hover": {
      transform: "translateY(-2px)",
    }
  },
  
  "@media (min-width: 600px) and (max-width: 999px)": {
    padding: "1.25rem 1.25rem 0.6rem 1.25rem",
  } 
}));

export default WidgetWrapper;
