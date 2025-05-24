import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Badge, User, Briefcase, FileEdit, FileWarning } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { getContract, joinContract, updateContract } from "@/lib/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Animation configurations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const gradientVariants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: "100% 50%",
    transition: { duration: 4, repeat: Infinity, repeatType: "reverse" },
  },
};

const hoverVariants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
};

export default function WorkContract() {
  const [searchParams, _] = useSearchParams();
  const router = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const wallet = useWallet();
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [terms, setTerms] = useState({
    title: "",
    dueDate: "",
    rate: "",
  });

  const contractId = searchParams.get("id");

  useEffect(() => {
    if (!loading && !user) {
      router(`/signin?redirect=/work?id=${contractId}`);
      return;
    }

    if (!contractId) {
      router("/dashboard");
      return;
    }

    const fetchContract = async () => {
      try {
        const contractData = await getContract(contractId);
        setContract(contractData);
      } catch (error) {
        console.error("Error fetching contract:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Failed to load contract. It may not exist or you don't have access.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user && contractId) {
      fetchContract();
    }
  }, [contractId, user, loading, router, toast]);

  const handleJoinContract = async (role) => {
    if (!user || !contractId) return;

    setIsJoining(true);
    try {
      await joinContract(contractId, user.uid, role, wallet.address);
      toast({
        title: "Contract Joined",
        description: `You have successfully joined as a ${role}.`,
      });
      const updatedContract = await getContract(contractId);
      setContract(updatedContract);
    } catch (error) {
      console.error("Error joining contract:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to join contract.",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleSubmitTerms = async () => {
    try {
      await updateContract(contractId, {
        title: terms.title,
        dueDate: new Date(terms.dueDate),
        rate: terms.rate,
      });
      toast({
        title: "Terms Updated",
        description: "Contract terms have been updated successfully",
      });
      setShowTermsDialog(false);
      const updatedContract = await getContract(contractId);
      setContract(updatedContract);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update contract terms",
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex items-center text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          <span className="ml-3">Loading contract...</span>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0  animate-pulse" />
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileWarning className="mr-2 h-5 w-5 text-blue-400 animate-pulse" />
                Contract Not Found
              </CardTitle>
              <CardDescription className="text-slate-400">
                The contract doesn't exist or you don't have access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router("/dashboard")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full"
                >
                  Back to Dashboard
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const userRole =
    contract.client?.userId === user?.uid
      ? "client"
      : contract.freelancer?.userId === user?.uid
      ? "freelancer"
      : null;

  const canJoin =
    !userRole &&
    ((contract.client?.userId && !contract.freelancer?.userId) ||
      (!contract.client?.userId && contract.freelancer?.userId));

  const availableRole =
    contract.client?.joined && !contract.freelancer?.joined
      ? "freelancer"
      : !contract.client?.joined && contract.freelancer?.joined
      ? "client"
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="mx-auto max-w-4xl"
        >
          <Card className="bg-slate-900 border-slate-800 relative group">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000 pointer-events-none"
              variants={gradientVariants}
              initial="initial"
              animate="animate"
            />
            <CardHeader className="border-b border-slate-800 pb-4">
              <motion.div
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <div>
                  <CardTitle className="text-white flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FileText className="mr-2 h-5 w-5 text-blue-400" />
                    </motion.div>
                    Work Contract
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {contract.status}
                  </CardDescription>
                </div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge
                    variant="outline"
                    className={`text-sm font-semibold transition-colors ${
                      contract.status === "active"
                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-800 hover:bg-emerald-900"
                        : contract.status === "pending"
                        ? "bg-amber-950/50 text-amber-400 border-amber-800 hover:bg-amber-900 animate-pulse"
                        : "bg-slate-800/50 text-slate-400 border-slate-700"
                    }`}
                  >
                    {contract.status}
                  </Badge>
                </motion.div>
              </motion.div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-slate-800 p-4 border border-slate-700 backdrop-blur-sm"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="mb-3 font-medium text-white flex items-center">
                  <motion.span
                    className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Contract Details
                  </motion.span>
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300">
                    <span className="text-slate-400">ID:</span> {contractId}
                  </p>
                  <p className="text-slate-300">
                    <span className="text-slate-400">Created:</span>{" "}
                    {contract.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid gap-4 md:grid-cols-2"
              >
                <motion.div
                  className="rounded-lg bg-slate-800 p-4 border border-slate-700 hover:border-blue-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="mb-3 font-medium text-white flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <User className="mr-2 h-4 w-4 text-blue-400" />
                    </motion.div>
                    Client
                  </h3>
                  {contract.client?.joined ? (
                    <p className="text-slate-300">
                      {contract.client.userId === user?.uid ? (
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          You (Client)
                        </span>
                      ) : (
                        `${contract.client.userId.slice(0, 6)}... joined`
                      )}
                    </p>
                  ) : (
                    <div className="flex items-center space-x-2 text-slate-400">
                      <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse" />
                      <span>Waiting for client...</span>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  className="rounded-lg bg-slate-800 p-4 border border-slate-700 hover:border-purple-500 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="mb-3 font-medium text-white flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 20, -20, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Briefcase className="mr-2 h-4 w-4 text-purple-400" />
                    </motion.div>
                    Freelancer
                  </h3>
                  {contract.freelancer?.joined ? (
                    <p className="text-slate-300">
                      {contract.freelancer.userId === user?.uid ? (
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          You (Freelancer)
                        </span>
                      ) : (
                        `${contract.freelancer.userId.slice(0, 6)}... joined`
                      )}
                    </p>
                  ) : (
                    <div className="flex items-center space-x-2 text-slate-400">
                      <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse" />
                      <span>Waiting for freelancer...</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {canJoin && availableRole && (
                <motion.div
                  variants={itemVariants}
                  className="rounded-lg bg-slate-800 p-4 border border-slate-700 backdrop-blur-sm"
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="mb-3 font-medium text-white">Join Contract</h3>
                  <p className="mb-4 text-slate-400">
                    Available role:{" "}
                    <span className="font-semibold text-blue-400">
                      {availableRole}
                    </span>
                  </p>
                  {!wallet.connected && (
                    <span className="w-full mb-4 text-white">
                      (Connect Wallet to Continue)
                    </span>
                  )}
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={hoverVariants}
                  >
                    <Button
                      onClick={() => handleJoinContract(availableRole)}
                      disabled={isJoining || !wallet.connected}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {isJoining ? (
                        <div className="flex items-center">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Joining...
                        </div>
                      ) : (
                        `Join as ${availableRole}`
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {userRole && (
                <motion.div
                  variants={itemVariants}
                  className="rounded-lg bg-slate-800 p-4 border border-slate-700 backdrop-blur-sm"
                  whileHover={{ y: -2 }}
                >
                  <h3 className="mb-2 font-medium text-white">Your Role</h3>
                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Badge
                        variant="outline"
                        className={`text-sm font-semibold transition-colors ${
                          userRole === "client"
                            ? "bg-blue-950/50 text-blue-400 border-blue-800 hover:bg-blue-900"
                            : "bg-purple-950/50 text-purple-400 border-purple-800 hover:bg-purple-900"
                        }`}
                      >
                        {userRole}
                      </Badge>
                    </motion.div>
                    <p className="text-slate-300">
                      Participating in this contract
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <motion.div whileHover={{ x: -5 }}>
                  <Button
                    onClick={() => router("/dashboard")}
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    ← Back to Dashboard
                  </Button>
                </motion.div>

                {contract.freelancer?.joined && contract.client?.joined && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setShowTermsDialog(true)}
                      disabled={contract.status !== "pending"}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Propose Terms ✍️
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <DialogHeader>
              <DialogTitle className="text-white flex items-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FileEdit className="mr-2 h-5 w-5 text-blue-400" />
                </motion.div>
                Propose Contract Terms
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {[
                { label: "Title", name: "title" },
                { label: "Due Date", name: "dueDate" },
                { label: "Price (USD)", name: "rate" }
              ].map(({ label, name }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <Label className="text-slate-300">{label}</Label>
                  <Input
                    type={
                      label === "Due Date"
                        ? "date"
                        : label === "Price (USD)"
                        ? "number"
                        : "text"
                    }
                    className="bg-slate-800 border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={terms[label.toLowerCase().replace(/[()]/g, "")]}
                    onChange={(e) =>
                      setTerms({
                        ...terms,
                        [name]:
                          e.target.value,
                      })
                    }
                  />
                </motion.div>
              ))}
            </div>
            <DialogFooter className="mt-4">
              <motion.div whileHover={{ x: -5 }}>
                <Button
                  variant="ghost"
                  onClick={() => setShowTermsDialog(false)}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSubmitTerms}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Submit Terms 🚀
                </Button>
              </motion.div>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}