import { useEffect, useState } from "react";
import { Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User, Badge, Wallet, FileText, Shield, CreditCard, ChevronRight, ArrowRight } from "lucide-react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { createContract } from "@/lib/firestore";
import { useNavigate } from "react-router-dom";
import { getAllContracts } from "../../lib/firestore";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import DeleteContractAction from "./actions/DeleteContract";
import TurnInWorkAction from "./actions/freelancer/TurnInWork";
import PayForWorkAction from "./actions/client/PayForWork";
import "@suiet/wallet-kit/style.css";
import ViewDataAction from "./actions/client/viewData";
import ViewObjectAction from "./actions/freelancer/ViewObject";

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const router = useNavigate();
  const { toast } = useToast();
  const [contractId, setContractId] = useState(null);
  const [isCreatingContract, setIsCreatingContract] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contracts, setContracts] = useState([]);
  const wallet = useWallet();

  const [forceRender, setForceRender] = useState(0);
  
  

  useEffect(() => {
    if (!loading && !user) {
      router(`/signin`);
      return;
    }

    const fetchAllContracts = async () => {
      try {
        const contractData = await getAllContracts(user.uid);
        console.log(contractData);
        setContracts(contractData);
      } catch (error) {
        console.error("Error fetching contract:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Failed to load contracts. It may not exist or you don't have access.",
        });
      }
    };

    if (user) {
      fetchAllContracts();
    }
  }, [user, loading, router, toast, forceRender]);

  const handleCreateContract = async (role) => {
    if (!user) return;

    setIsCreatingContract(true);
    try {
      const id = await createContract(user.uid, role, wallet.address);
      setContractId(id);
      setForceRender((i) => i + 1);
      toast({
        title: "Contract Created",
        description: `Your ${role} contract has been created successfully.`,
      });
    } catch (error) {
      console.error("Error creating contract:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create contract. Please try again.",
      });
    } finally {
      setIsCreatingContract(false);
    }
  };

  const copyToClipboard = () => {
    if (!contractId) return;

    const contractUrl = `${window.location.origin}/work?id=${contractId}`;
    navigator.clipboard.writeText(contractUrl);
    toast({
      title: "Link Copied",
      description: "Contract link copied to clipboard!",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              WorkFlow
            </h1>
            <p className="text-slate-400">Smart Contract Management Platform</p>
          </div>
          <Button variant="ghost" onClick={signOut} className="text-slate-300 hover:text-white hover:bg-slate-800">
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800 col-span-1 lg:col-span-2">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-xl font-medium text-white flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-400" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Full Name</p>
                    <p className="font-medium">{user.displayName || "Not provided"}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">Account Status</p>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className={`${user.emailVerified ? "bg-emerald-950 text-emerald-400 border-emerald-800" : "bg-amber-950 text-amber-400 border-amber-800"}`}
                      >
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">User ID</p>
                    <p className="font-medium text-xs truncate">{user.uid}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="border-b border-slate-800 pb-4">
              <CardTitle className="text-xl font-medium text-white flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-blue-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Dialog onOpenChange={(v) => !v && setContractId("")}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Contract
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white">Choose Your Role</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Select whether you are a client hiring or a freelancer providing services.
                    </DialogDescription>
                  </DialogHeader>
                  {contractId ? (
                    <div className="space-y-4">
                      <div className="rounded-md bg-slate-800 p-4">
                        <p className="mb-2 text-sm font-medium text-slate-300">Share this link with the other party:</p>
                        <div className="flex items-center gap-2 overflow-hidden rounded-md border border-slate-700 bg-slate-950 p-2">
                          <p className="truncate text-sm text-slate-300">{`${window.location.origin}/work?id=${contractId}`}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={copyToClipboard}
                            className="text-slate-300 hover:text-white hover:bg-slate-800"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={() => router(`/work?id=${contractId}`)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                      >
                        Go to Contract
                      </Button>
                    </div>
                  ) : (
                    <>
                      {!wallet.connected && (
                        <Button className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                          Connect Wallet to Continue
                        </Button>
                      )}
                      <div className="grid grid-cols-2 gap-4 relative">
                        {!wallet.connected && (
                          <div className="absolute inset-0 bg-slate-900 opacity-50 cursor-not-allowed z-10 rounded-lg"></div>
                        )}
                        <Card
                          className="cursor-pointer transition-all hover:shadow-md bg-slate-800 border-slate-700 hover:border-blue-500"
                          onClick={() => handleCreateContract("client")}
                        >
                          <CardHeader className="p-4">
                            <CardTitle className="text-center text-lg text-white">Client</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 text-center text-sm text-slate-300">
                            I want to hire someone
                          </CardContent>
                        </Card>

                        <Card
                          className="cursor-pointer transition-all hover:shadow-md bg-slate-800 border-slate-700 hover:border-purple-500"
                          onClick={() => handleCreateContract("freelancer")}
                        >
                          <CardHeader className="p-4">
                            <CardTitle className="text-center text-lg text-white">Freelancer</CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 text-center text-sm text-slate-300">
                            I want to offer my services
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  {isCreatingContract && (
                    <div className="flex justify-center text-slate-300">
                      <p>Creating contract...</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900 border-slate-800 mb-8">
          <CardHeader className="border-b border-slate-800 pb-4">
            <CardTitle className="text-xl font-medium text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-400" />
              Active Contracts
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative overflow-x-auto rounded-lg">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-800 text-slate-300">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-tl-lg">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Link
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.length > 0 ? (
                    contracts.map((contract, idx) => (
                      <tr
                        key={idx + 1}
                        className={`border-b border-slate-800 ${idx === contracts.length - 1 ? "rounded-b-lg" : ""}`}
                      >
                        <td className="px-6 py-4 text-slate-300">{contract.id}</td>
                        <td className="px-6 py-4">
                          <div
                            variant="outline"
                            className={`${contract.client.userId == user.uid ? "text-blue-400 border-blue-800" : "text-purple-400 border-purple-800"}`}
                          >
                            {contract.client.userId == user.uid ? "Client" : "Freelancer"}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`
                            ${
                              contract.status === "active"
                                ? "text-emerald-400 border-emerald-800"
                                : contract.status === "pending"
                                  ? "text-amber-400 border-amber-800"
                                  : "text-slate-400 border-slate-700"
                            }
                          `}
                          >
                            {contract.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            asChild
                            className="text-blue-400 hover:text-blue-300 hover:bg-slate-800 p-0"
                          >
                            <a href={"/work?id=" + String(contract.id)} className="flex items-center">
                              View <ArrowRight className="ml-1 h-3 w-3" />
                            </a>
                          </Button>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          {contract.freelancer?.userId == user.uid &&
                            !contract?.isWorkDone &&
                            contract.status == "active" && (
                              <TurnInWorkAction contract={contract} setForceRender={setForceRender} />
                            )}
                          {contract.client?.userId == user.uid && contract?.isWorkDone && contract.status === "reviewing" && (
                            <PayForWorkAction contract={contract} setForceRender={setForceRender} />
                          )}
                          {contract.freelancer?.userId == user.uid && contract?.isWorkDone && contract.status === "reviewing" && (
                            <ViewObjectAction contract={contract} setForceRender={setForceRender} />
                          )}
                          {contract.client?.userId == user.uid && contract?.isWorkDone && contract.status === "completed" && (
                            <ViewDataAction contractId={contract.id} setForceRender={setForceRender} />
                          )}
                          {contract.createdBy == user.uid && (
                            <DeleteContractAction contractId={contract.id} setForceRender={setForceRender} />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-slate-900">
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                        No contracts found. Create your first contract to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <Shield className="mr-2 h-4 w-4 text-blue-400" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Your contracts are secured with blockchain technology for maximum protection and transparency.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <CreditCard className="mr-2 h-4 w-4 text-blue-400" />
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Automated escrow payments ensure funds are only released when work is completed to satisfaction.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-white flex items-center">
                <ChevronRight className="mr-2 h-4 w-4 text-blue-400" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Create a new contract or manage your existing ones to track progress and payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


