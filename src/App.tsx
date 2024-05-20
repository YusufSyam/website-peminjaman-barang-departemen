import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home.page";
import { MAINROUTES } from "./utils/const/routes";
import { MantineProvider } from "@mantine/core";
import Activity from "./pages/activity/Activity.page";
import { AuthProvider } from "./context/AuthContext.context";
import NotFound from "./pages/not-found/NotFound.page";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          "primary-text": [
            "#657387",
            "#5b697d",
            "#515f73",
            "#475569",
            "#3d4b5f",
            "#334155",
            "#29374b",
            "#1f2d41",
            "#152337",
            "#0b192d"
          ],
          "secondary-text": [
            "#c6d5ea",
            "#bccbe0",
            "#b2c1d6",
            "#a8b7cc",
            "#9eadc2",
            "#94a3b8",
            "#8a99ae",
            "#808fa4",
            "#76859a",
            "#6c7b90"
          ],
          secondary: [
            "#ffffff",
            "#ffffff",
            "#fcfbff",
            "#f2f1ff",
            "#e8e7fb",
            "#deddf1",
            "#d4d3e7",
            "#cac9dd",
            "#c0bfd3",
            "#b6b5c9"
          ],
          error: [
            "#ff5e88",
            "#ff547e",
            "#ff4a74",
            "#ff406a",
            "#ff3660",
            "#ff2c56",
            "#f5224c",
            "#eb1842",
            "#e10e38",
            "#d7042e"
          ],
          divider: [
            "#e7f4ff",
            "#ddeaf9",
            "#d3e0ef",
            "#c9d6e5",
            "#bfccdb",
            "#b5c2d1",
            "#abb8c7",
            "#a1aebd",
            "#97a4b3",
            "#8d9aa9"
          ],
          white: [
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF",
            "#FFFFFF"
          ],
          "dark-red": [
            "#970015",
            "#970015",
            "#970015",
            "#970015",
            "#970015",
            "#970015",
            "#970015",
            "#970015",
            "#970015",
            "#970015"
          ],
          red: [
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f",
            "#ce282f"
          ],
          green: [
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f",
            "#03873f"
          ],
          "light-red": [
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a",
            "#ea4d4a"
          ],
          orange: [
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08",
            "#FF8A08"
          ],
          yellow: [
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100",
            "#FFC100"
          ],
          black: [
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000"
          ]
        }
      }}
    >
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path={MAINROUTES.home} element={<Home />} />
              <Route path={MAINROUTES.activity} element={<Activity />} />
                    <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
