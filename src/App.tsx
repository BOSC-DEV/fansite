
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "./context/WalletContext";
import { Toaster } from "./components/ui/toaster";

import Index from "./pages/Index";
import MostWanted from "./pages/MostWanted";
import ScammerDetail from "./pages/ScammerDetail";
import CreateListing from "./pages/CreateListing";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
import Leaderboard from "./pages/Leaderboard";
import MyReportsPage from "./pages/MyReportsPage";
import MyBountiesPage from "./pages/MyBountiesPage";

// Create a QueryClient instance outside the component to prevent recreation on renders
const queryClient = new QueryClient();

// Define routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/most-wanted",
    element: <MostWanted />,
  },
  {
    path: "/scammer/:id",
    element: <ScammerDetail />,
  },
  {
    path: "/create-listing",
    element: <CreateListing />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/my-reports",
    element: <MyReportsPage />,
  },
  {
    path: "/my-bounties",
    element: <MyBountiesPage />,
  },
  {
    path: "/:username",
    element: <UserProfilePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <RouterProvider router={router} />
          <Toaster />
        </WalletProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
