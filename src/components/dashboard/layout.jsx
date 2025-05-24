import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const wallet = useWallet();
  const [isTestnet, setIsTestnet] = useState(true);
  
  useEffect(() => {
      if (!wallet.connected) return;
      console.log('current connected chain (network)', wallet.chain?.name) 
      setIsTestnet(wallet.chain?.name === "Sui Testnet")
    }, [wallet.connected])
  
  if (isTestnet)
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  else
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please switch to Sui Testnet and reconnect again.</h1>
        <br />
        <ConnectButton />
      </div>
    );
}