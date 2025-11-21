import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import SignInScreen from "./pages/SignInScreen";
import SignUpScreen from "./pages/SignUpScreen";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import Authenticated from "./middlewares/Authenticated";
import Guest from "./middlewares/Guest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Guest>
              <SignUpScreen />
            </Guest>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Guest>
              <SignInScreen />
            </Guest>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Guest>
              <SignUpScreen />
            </Guest>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/dashboard"
          element={
            <Authenticated>
              <Dashboard />
            </Authenticated>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
