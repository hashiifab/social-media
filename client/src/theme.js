// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F8F9FA",
    50: "#F1F3F5",
    100: "#E9ECEF",
    200: "#DEE2E6",
    300: "#CED4DA",
    400: "#ADB5BD",
    500: "#868E96",
    600: "#495057",
    700: "#343A40",
    800: "#212529",
    900: "#121212",
    1000: "#000000",
  },
  primary: {
    50: "#E3F6F5",
    100: "#C4F0EE",
    200: "#92E6E2",
    300: "#67D9D3",
    400: "#3DCCC7",
    500: "#2AB7B2",
    600: "#1F8A86",
    700: "#17615E",
    800: "#0F3A38",
    900: "#071D1C",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "Rubik", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 42,
        fontWeight: 700,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 34,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 26,
        fontWeight: 600,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 22,
        fontWeight: 500,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 500,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
