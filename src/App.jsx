import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import LoginPage from "./pages/login";
import LandingPage from "./pages";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ResetPasswordPage from "./pages/reset-password";
import { AuthProvider } from "./lib/auth-context";
import WorkPage from "./pages/work";
import { WalletProvider, DefaultChains } from "@suiet/wallet-kit";
import DashboardLayout from "./components/dashboard/layout";


function App() {
  return (
    <>
      <AuthProvider>
        <WalletProvider chains={DefaultChains}>
          <BrowserRouter>
            <Routes>
              <Route path="/" index element={<LandingPage />} />
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/work" element={<WorkPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
