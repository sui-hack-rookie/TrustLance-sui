import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  BookOpen,
  Handshake,
  DollarSign,
  Shield,
  CheckCircle,
  Lock,
  Brain,
  Zap,
  Code,
  Palette,
  Wrench,
  Building,
  Star,
  Github,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Deep Space Background */}
      <div className="fixed inset-0 z-0">
        {/* Deep space gradient with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 via-blue-950/30 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-violet-950/30 via-transparent to-cyan-950/20"></div>

        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 opacity-12">
          <div className="relative w-full h-full">{/* Galaxy core */}</div>
        </div>

        {/* Cosmic Nebula Clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-blue-500/12 via-cyan-500/8 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-[400px] h-[250px] bg-gradient-radial from-indigo-500/10 via-violet-500/6 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "6s" }}
          ></div>
        </div>

        {/* Distant Planets */}
        <div className="absolute top-1/6 right-1/4 w-16 h-16 bg-gradient-radial from-orange-400/60 to-red-500/40 rounded-full blur-sm opacity-70 animate-pulse"></div>
        <div
          className="absolute bottom-1/5 left-1/3 w-12 h-12 bg-gradient-radial from-blue-400/50 to-cyan-500/30 rounded-full blur-sm opacity-60 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/6 w-8 h-8 bg-gradient-radial from-purple-400/40 to-pink-500/20 rounded-full blur-sm opacity-50 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Advanced Starfield with different star types */}
        <div className="absolute inset-0">
          {/* Bright main sequence stars */}
          {[...Array(80)].map((_, i) => (
            <div
              key={`bright-${i}`}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.9 + 0.3,
                boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255,255,255,0.8)`,
              }}
            />
          ))}

          {/* Blue giant stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`blue-${i}`}
              className="absolute bg-blue-200 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 2}px`,
                height: `${Math.random() * 2 + 2}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                opacity: Math.random() * 0.8 + 0.4,
                boxShadow: `0 0 ${Math.random() * 6 + 3}px rgba(147,197,253,0.7)`,
              }}
            />
          ))}

          {/* Red dwarf stars */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`red-${i}`}
              className="absolute bg-red-300 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.5}px`,
                height: `${Math.random() * 1.5 + 0.5}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.6 + 0.2,
                boxShadow: `0 0 ${Math.random() * 3 + 1}px rgba(252,165,165,0.6)`,
              }}
            />
          ))}

          {/* Distant dim stars */}
          {[...Array(100)].map((_, i) => (
            <div
              key={`dim-${i}`}
              className="absolute bg-gray-300 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1 + 0.5}px`,
                height: `${Math.random() * 1 + 0.5}px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          ))}
        </div>

        {/* Trust Network - Cosmic Connection replacing handshaking */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[800px] h-[400px] opacity-25">
            {/* Central Trust Hub */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-24 h-24">
                {/* Core trust symbol */}
                <div className="absolute inset-0 bg-gradient-radial from-white/40 via-blue-300/30 to-purple-300/20 rounded-full animate-pulse blur-sm"></div>
                <div className="absolute inset-2 bg-gradient-radial from-white/60 via-cyan-400/40 to-transparent rounded-full animate-ping"></div>
                <div className="absolute inset-4 flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
            </div>

            {/* Orbiting Trust Nodes */}
            {[...Array(8)].map((_, i) => {
              const angle = i * 45 * (Math.PI / 180);
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={i}
                  className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    animation: `orbit 20s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-radial from-blue-400/60 to-purple-400/40 rounded-full animate-pulse blur-sm"></div>
                </div>
              );
            })}

            {/* Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ overflow: "visible" }}
            >
              {[...Array(8)].map((_, i) => {
                const angle = i * 45 * (Math.PI / 180);
                const radius = 150;
                const x = Math.cos(angle) * radius + 400;
                const y = Math.sin(angle) * radius + 200;

                return (
                  <line
                    key={i}
                    x1="400"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                );
              })}
            </svg>

            {/* Energy Pulses */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/60 rounded-full animate-ping"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Cosmic Dust Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `cosmicDrift ${15 + Math.random() * 25}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for space animations */}
      <style jsx>{`
        @keyframes cosmicDrift {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-20px) translateX(10px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes orbit {
          0% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg)
              translateX(150px) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) rotate(360deg)
              translateX(150px) rotate(-360deg);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(6, 182, 212, 0.5);
          }
          50% {
            box-shadow:
              0 0 20px rgba(6, 182, 212, 0.8),
              0 0 30px rgba(6, 182, 212, 0.6);
          }
        }

        @keyframes dataFlow {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes hexagonSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .cyber-card {
          clip-path: polygon(
            0 0,
            calc(100% - 20px) 0,
            100% 20px,
            100% 100%,
            20px 100%,
            0 calc(100% - 20px)
          );
        }

        .cyber-border {
          position: relative;
        }

        .cyber-border::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(6, 182, 212, 0.5),
            transparent
          );
          clip-path: polygon(
            0 0,
            calc(100% - 20px) 0,
            100% 20px,
            100% 100%,
            20px 100%,
            0 calc(100% - 20px)
          );
          z-index: -1;
          animation: dataFlow 3s infinite;
        }

        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(6, 182, 212, 1),
            transparent
          );
          transition: left 0.5s ease;
        }

        .nav-link:hover::before {
          left: 100%;
        }

        .logo-glow {
          animation: glowPulse 2s infinite;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10">
        {/* Animated Header */}
        <header className="border-b border-cyan-500/20 backdrop-blur-md bg-black/30 relative overflow-hidden">
          {/* Animated background lines */}
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                style={{
                  top: `${30 + i * 20}%`,
                  width: "200%",
                  animation: `dataFlow ${4 + i}s infinite`,
                  animationDelay: `${i * 1.5}s`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-4 relative z-10">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center space-x-2"
                style={{ animation: "slideInFromLeft 1s ease-out" }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center logo-glow border border-cyan-400/30 relative">
                  <Handshake className="w-5 h-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-300 rounded-full animate-ping"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  TrustLance.sui
                </span>
              </div>

              <nav
                className="hidden md:flex items-center space-x-8"
                style={{ animation: "slideInFromRight 1s ease-out" }}
              >
                <a
                  href="#features"
                  className="nav-link text-gray-300 hover:text-cyan-300 transition-all duration-300 px-2 py-1"
                >
                  Features
                </a>
                <a
                  href="#why-trustlance"
                  className="nav-link text-gray-300 hover:text-cyan-300 transition-all duration-300 px-2 py-1"
                >
                  Why TrustLance
                </a>
                <a
                  href="#use-cases"
                  className="nav-link text-gray-300 hover:text-cyan-300 transition-all duration-300 px-2 py-1"
                >
                  Use Cases
                </a>
                <a
                  href="#pricing"
                  className="nav-link text-gray-300 hover:text-cyan-300 transition-all duration-300 px-2 py-1"
                >
                  Pricing
                </a>
              </nav>

              <div
                className="flex items-center space-x-4"
                style={{ animation: "slideInFromRight 1s ease-out 0.2s both" }}
              >
                <Link to="/signin">
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-6 py-2 rounded-lg border border-cyan-400/50 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-400/40 hover:shadow-xl group">
                  <Link to="/signin">
                    <span className="relative z-10">Get Started</span>
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/40 backdrop-blur-sm shadow-lg shadow-cyan-500/20">
              Built on SUI Blockchain
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-400 to-white bg-clip-text text-transparent">
              Work. Trade. Trust — Without Middlemen.
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              TrustLance.sui is a decentralized work & service exchange platform
              built on the SUI blockchain, powered by Seal: A secret management
              server — no escrow, no compromise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg px-8 py-4 rounded-xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-400/50 hover:shadow-2xl hover:scale-105 group"
              >
                <Link to="/signin">
                  <span className="relative z-10 flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <div className="absolute top-0 left-0 w-full h-full">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/80 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="relative overflow-hidden border-2 border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-cyan-500/10 text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 group"
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Key Features Pills */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105">
                <Shield className="w-4 h-4 mr-2 text-cyan-400" />
                Built on SUI blockchain
              </div>
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-500/40 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-300 hover:scale-105">
                <Handshake className="w-4 h-4 mr-2 text-blue-400" />
                Direct service exchange
              </div>
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-500/40 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 transition-all duration-300 hover:scale-105">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-400" />
                No intermediary fees
              </div>
              <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-500/40 shadow-lg shadow-orange-500/20 hover:shadow-orange-400/30 transition-all duration-300 hover:scale-105">
                <CheckCircle className="w-4 h-4 mr-2 text-orange-400" />
                Fully on-chain verification
              </div>
            </div>
          </div>
        </section>

        {/* Why TrustLance Section - Cyber Cards */}
        <section
          id="why-trustlance"
          className="py-20 bg-black/40 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Trust is Built-In, Not Rented
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Cyber Card 1 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-emerald-400/30 p-6 transition-all duration-500 hover:border-emerald-400/60 hover:scale-105 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-emerald-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-emerald-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-400/60"></div>

                  {/* Hexagon icon container */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto relative">
                      <div className="absolute inset-0 bg-emerald-400/20 transform rotate-45 rounded-lg animate-pulse"></div>
                      <div
                        className="absolute inset-2 bg-emerald-400/10 transform -rotate-45 rounded-lg"
                        style={{ animation: "hexagonSpin 8s linear infinite" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors duration-300">
                    Zero Middlemen
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    Say goodbye to delays and hidden fees from centralized
                    platforms.
                  </p>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Cyber Card 2 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-cyan-400/30 p-6 transition-all duration-500 hover:border-cyan-400/60 hover:scale-105 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60"></div>

                  {/* Hexagon icon container */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto relative">
                      <div className="absolute inset-0 bg-cyan-400/20 transform rotate-45 rounded-lg animate-pulse"></div>
                      <div
                        className="absolute inset-2 bg-cyan-400/10 transform -rotate-45 rounded-lg"
                        style={{
                          animation: "hexagonSpin 8s linear infinite reverse",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                    Powered by Seal
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    Uses Seal for on-chain secrets — only the rightful data
                    owner can access sensitive task info.
                  </p>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Cyber Card 3 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-blue-400/30 p-6 transition-all duration-500 hover:border-blue-400/60 hover:scale-105 shadow-xl shadow-blue-500/10 hover:shadow-blue-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/60"></div>

                  {/* Hexagon icon container */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto relative">
                      <div className="absolute inset-0 bg-blue-400/20 transform rotate-45 rounded-lg animate-pulse"></div>
                      <div
                        className="absolute inset-2 bg-blue-400/10 transform -rotate-45 rounded-lg"
                        style={{ animation: "hexagonSpin 8s linear infinite" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Brain className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                    Smart Contract Logic
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    Every deal is enforced by transparent, tamper-proof code.
                  </p>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Cyber Card 4 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-orange-400/30 p-6 transition-all duration-500 hover:border-orange-400/60 hover:scale-105 shadow-xl shadow-orange-500/10 hover:shadow-orange-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-orange-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-orange-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-orange-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-400/60"></div>

                  {/* Hexagon icon container */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 mx-auto relative">
                      <div className="absolute inset-0 bg-orange-400/20 transform rotate-45 rounded-lg animate-pulse"></div>
                      <div
                        className="absolute inset-2 bg-orange-400/10 transform -rotate-45 rounded-lg"
                        style={{
                          animation: "hexagonSpin 8s linear infinite reverse",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-100 transition-colors duration-300">
                    Fast & Scalable
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    Leveraging SUI's object-centric model for lightning-fast
                    operations and low gas.
                  </p>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seal Integration Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                On-Chain Secrets By Seal
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                TrustLance leverages Seal, an on-chain secrets management
                solution, to ensure that private data like credentials, task
                instructions, or delivery content remains hidden — even from the
                platform itself. Only the designated owner can decrypt and
                access the secret, making your data truly yours.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section - Cyber Cards */}
        <section id="use-cases" className="py-20 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Who's It For?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Use Case Card 1 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-cyan-400/30 p-6 text-center transition-all duration-500 hover:border-cyan-400/60 hover:scale-105 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60"></div>

                  {/* Large icon container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto relative">
                      <div className="absolute inset-0 bg-cyan-400/20 transform rotate-45 rounded-xl animate-pulse"></div>
                      <div
                        className="absolute inset-3 bg-cyan-400/10 transform -rotate-45 rounded-xl"
                        style={{ animation: "hexagonSpin 10s linear infinite" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
                    Freelancers & Developers
                  </h3>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Use Case Card 2 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-blue-400/30 p-6 text-center transition-all duration-500 hover:border-blue-400/60 hover:scale-105 shadow-xl shadow-blue-500/10 hover:shadow-blue-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/60"></div>

                  {/* Large icon container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto relative">
                      <div className="absolute inset-0 bg-blue-400/20 transform rotate-45 rounded-xl animate-pulse"></div>
                      <div
                        className="absolute inset-3 bg-blue-400/10 transform -rotate-45 rounded-xl"
                        style={{
                          animation: "hexagonSpin 10s linear infinite reverse",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Palette className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                    Designers & Creatives
                  </h3>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Use Case Card 3 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-emerald-400/30 p-6 text-center transition-all duration-500 hover:border-emerald-400/60 hover:scale-105 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-emerald-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-emerald-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-400/60"></div>

                  {/* Large icon container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto relative">
                      <div className="absolute inset-0 bg-emerald-400/20 transform rotate-45 rounded-xl animate-pulse"></div>
                      <div
                        className="absolute inset-3 bg-emerald-400/10 transform -rotate-45 rounded-xl"
                        style={{ animation: "hexagonSpin 10s linear infinite" }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Wrench className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-100 transition-colors duration-300">
                    Remote Taskers & Gig Workers
                  </h3>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Use Case Card 4 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-orange-400/30 p-6 text-center transition-all duration-500 hover:border-orange-400/60 hover:scale-105 shadow-xl shadow-orange-500/10 hover:shadow-orange-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-orange-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-orange-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-orange-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-400/60"></div>

                  {/* Large icon container */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto relative">
                      <div className="absolute inset-0 bg-orange-400/20 transform rotate-45 rounded-xl animate-pulse"></div>
                      <div
                        className="absolute inset-3 bg-orange-400/10 transform -rotate-45 rounded-xl"
                        style={{
                          animation: "hexagonSpin 10s linear infinite reverse",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building className="w-10 h-10 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-orange-100 transition-colors duration-300">
                    DAOs & Web3 Projects
                  </h3>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Cyber Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                What Our Users Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-cyan-400/30 p-6 transition-all duration-500 hover:border-cyan-400/60 hover:scale-105 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60"></div>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-orange-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300 mb-6">
                    "Finally, a platform where I can work directly with clients
                    without worrying about platform fees eating into my
                    earnings."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-cyan-500/30 relative">
                      <span className="text-white font-bold">A</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Alex Chen</p>
                      <p className="text-gray-400 text-sm">
                        Full-Stack Developer
                      </p>
                    </div>
                  </div>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-blue-400/30 p-6 transition-all duration-500 hover:border-blue-400/60 hover:scale-105 shadow-xl shadow-blue-500/10 hover:shadow-blue-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/60"></div>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-orange-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300 mb-6">
                    "The security and transparency of blockchain combined with
                    the ease of traditional freelancing platforms. Perfect!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-blue-500/30 relative">
                      <span className="text-white font-bold">S</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Sarah Johnson</p>
                      <p className="text-gray-400 text-sm">UI/UX Designer</p>
                    </div>
                  </div>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-emerald-400/30 p-6 transition-all duration-500 hover:border-emerald-400/60 hover:scale-105 shadow-xl shadow-emerald-500/10 hover:shadow-emerald-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-emerald-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-emerald-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-emerald-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-emerald-400/60"></div>

                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-orange-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300 mb-6">
                    "TrustLance has revolutionized how our DAO manages freelance
                    work. The smart contracts ensure everyone gets paid fairly."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 shadow-lg shadow-emerald-500/30 relative">
                      <span className="text-white font-bold">M</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300/60 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        Marcus Rodriguez
                      </p>
                      <p className="text-gray-400 text-sm">DAO Coordinator</p>
                    </div>
                  </div>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Cyber Cards */}
        <section id="pricing" className="py-20 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-300">
                No hidden fees, no middleman cuts
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Pricing Card 1 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-cyan-400/30 p-8 transition-all duration-500 hover:border-cyan-400/60 hover:scale-105 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/60"></div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                    Freelancer
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                    Perfect for individual freelancers
                  </p>
                  <div className="text-4xl font-bold text-white mt-4 mb-6 group-hover:text-cyan-100 transition-colors duration-300">
                    Free
                  </div>

                  <ul className="space-y-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Unlimited projects
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Basic smart contracts
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Community support
                    </li>
                  </ul>
                  <Link to="/signin">
                    <Button className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg border border-cyan-400/50 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-400/40 hover:shadow-xl group/btn">
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Pricing Card 2 - Most Popular */}
              <div className="relative group">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/30 z-10">
                  Most Popular
                </Badge>
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-orange-400/50 p-8 transition-all duration-500 hover:border-orange-400/70 hover:scale-105 shadow-xl shadow-orange-500/20 hover:shadow-orange-400/40">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-orange-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-orange-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-orange-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-400/60"></div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-100 transition-colors duration-300">
                    Professional
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                    For growing freelance businesses
                  </p>
                  <div className="text-4xl font-bold text-white mt-4 mb-6 group-hover:text-orange-100 transition-colors duration-300">
                    $19<span className="text-lg text-gray-400">/month</span>
                  </div>

                  <ul className="space-y-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Everything in Freelancer
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Custom contract templates
                    </li>
                  </ul>

                  <Button className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold rounded-lg border border-orange-400/50 shadow-lg shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-400/40 hover:shadow-xl group/btn">
                    <span className="relative z-10">Upgrade Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </Button>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Pricing Card 3 */}
              <div className="relative group">
                <div className="cyber-card cyber-border bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-sm border-2 border-blue-400/30 p-8 transition-all duration-500 hover:border-blue-400/60 hover:scale-105 shadow-xl shadow-blue-500/10 hover:shadow-blue-400/30">
                  {/* Animated corner elements */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/60"></div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                    Enterprise
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                    For teams and organizations
                  </p>
                  <div className="text-4xl font-bold text-white mt-4 mb-6 group-hover:text-blue-100 transition-colors duration-300">
                    Custom
                  </div>

                  <ul className="space-y-3 text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-8">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Everything in Professional
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      White-label solution
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Dedicated support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                      Custom integrations
                    </li>
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full border-2 border-blue-500/50 text-blue-300 hover:text-white hover:bg-blue-500/10 transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    Contact Sales
                  </Button>

                  {/* Data flow lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Ready to Work Without Middlemen?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers and clients who trust TrustLance for
              secure, direct collaboration.
            </p>
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg px-12 py-4 rounded-xl border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-400/50 hover:shadow-2xl hover:scale-105 group"
            >
              <span className="relative z-10 flex items-center">
                <Rocket className="w-6 h-6 mr-2" />
                Start Your Journey
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/80 rounded-full animate-ping"
                    style={{
                      left: `${15 + i * 20}%`,
                      top: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 bg-black/40 backdrop-blur-md">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/30">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    TrustLance.sui
                  </span>
                </div>
                <p className="text-gray-400 mb-4">
                  © 2025 TrustLance.sui. Built on SUI. Powered by Seal.
                </p>
                <div className="flex space-x-4">
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-cyan-300 transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-cyan-300 transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      Docs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="hover:text-cyan-300 transition-colors"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
