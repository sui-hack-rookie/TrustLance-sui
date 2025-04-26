import { ConnectButton } from "@suiet/wallet-kit";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

export default function DashboardLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}