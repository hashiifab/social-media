import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, CssBaseline, Link, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>

          {/* Footer Copyright */}
          <Box sx={{ 
            mt: 'auto', 
            py: 3, 
            backgroundColor: (theme) => theme.palette.background.paper,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`
          }}>
            <Typography variant="body2" color="text.secondary" align="center">
              Developed by{" "}      
              <Link 
                href="https://www.linkedin.com/in/hashiif-abdillah-665373297" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: (theme) => theme.palette.primary.main,
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                 Hasseeve
              </Link>
            </Typography>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
