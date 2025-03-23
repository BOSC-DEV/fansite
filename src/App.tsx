
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

const queryClient = new QueryClient();

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
