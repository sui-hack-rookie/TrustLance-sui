import { ConnectButton } from "@suiet/wallet-kit";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <header className="flex py-3 px-2 justify-between border-b items-center bg-background sticky top-0">
        <h1 className="font-bold text-[2rem]">Dashboard</h1>
        <ConnectButton />
      </header>
      <Outlet />
    </div>
  );
}