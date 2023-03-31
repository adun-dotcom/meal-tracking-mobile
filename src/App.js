import React, { Fragment } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { NotificationContainer } from "react-notifications";

// Create a client
const queryClient = new QueryClient();
function App() {
  const accessToken = localStorage.getItem("token");

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Fragment>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              exact
              path="/profile"
              element={
                !!accessToken ? <ProfilePage /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Fragment>
        <NotificationContainer />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
