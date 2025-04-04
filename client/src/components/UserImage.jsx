import { Box } from "@mui/material";
import { useTheme } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const { palette } = useTheme();
  return (
    <Box width={size} height={size}>
      <img
        style={{ 
          objectFit: "cover", 
          borderRadius: "50%",
          border: `3px solid ${palette.primary.main}`,
          boxShadow: palette.mode === "dark" ? "0 0 10px rgba(0,0,0,0.3)" : "0 0 10px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          '&:hover': {
            transform: "scale(1.05)",
            boxShadow: palette.mode === "dark" ? "0 0 15px rgba(0,0,0,0.4)" : "0 0 15px rgba(0,0,0,0.2)",
          }
        }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
