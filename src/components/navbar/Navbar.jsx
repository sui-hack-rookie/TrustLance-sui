import { Link } from "react-router-dom";
import { ConnectButton } from "@suiet/wallet-kit";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-8">
        <h1 className="text-3xl font-extrabold text-primary">Dashboard</h1>

        <nav className="flex items-center justify-evenly space-x-6">
          <Link
            to="/dashboard"
            className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/signin"
            className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </div>

      <div>
        <ConnectButton>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
            <span>Connect Wallet</span>
          </div>
        </ConnectButton>
      </div>
    </header>
  );
}
