import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import SignInScreen from "./pages/SignInScreen";
import SignUpScreen from "./pages/SignUpScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
