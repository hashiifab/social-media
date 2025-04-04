import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsor Pilihan
        </Typography>
        <Typography color={medium}>Buat Iklan</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ 
          borderRadius: "1rem", 
          margin: "0.75rem 0",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease",
          '&:hover': {
            transform: "scale(1.02)"
          }
        }}
      />
      <FlexBetween>
        <Typography color={main} fontWeight="500">HashiiStore</Typography>
        <Typography color={medium}>hashiistore.com</Typography>
      </FlexBetween>
      <Typography color={main} m="0.5rem 0">
        Temukan produk digital terbaik untuk kebutuhan Anda. Kualitas premium dengan harga terjangkau, hanya di HashiiStore.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
