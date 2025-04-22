import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "./pages/login";
import LandingPage from "./pages";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ResetPasswordPage from "./pages/reset-password";
import { AuthProvider } from "./lib/auth-context";
import WorkPage from "./pages/work";
import { WalletProvider } from "@suiet/wallet-kit";

function App() {
  return (
    <>
      <AuthProvider>
        <WalletProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/work" element={<WorkPage />} />
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
