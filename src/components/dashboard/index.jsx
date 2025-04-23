import { useEffect, useState } from "react";
import { Copy, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import "@suiet/wallet-kit/style.css";
import DeleteContractAction from "./actions/DeleteContract";
import TurnInWorkAction from "./actions/freelancer/TurnInWork";
import PayForWorkAction from "./actions/client/PayForWork";

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
    <div className="container mx-auto p-4">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium">User Information</h3>
            <p>
              <strong>Name:</strong> {user.displayName || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Email Verified:</strong>{" "}
              {user.emailVerified ? "Yes" : "No"}
            </p>
            <p>
              <strong>User ID:</strong> {user.uid}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Start a Work Contract
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Choose Your Role</DialogTitle>
                  <DialogDescription>
                    Select whether you are a client hiring or a freelancer
                    providing services.
                  </DialogDescription>
                </DialogHeader>
                {contractId ? (
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-3">
                      <p className="mb-2 text-sm font-medium">
                        Share this link with the other party:
                      </p>
                      <div className="flex items-center gap-2 overflow-hidden rounded-md border bg-background p-2">
                        <p className="truncate text-sm">{`${window.location.origin}/work?id=${contractId}`}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button onClick={() => router(`/work?id=${contractId}`)}>
                      Go to Contract
                    </Button>
                  </div>
                ) : (
                  <>
                    {!wallet.connected && (
                      <ConnectButton
                        label="Connect Wallet to Continue"
                        className="!w-full"
                      />
                    )}
                    <div className="grid grid-cols-2 gap-4 relative">
                      {!wallet.connected && (
                        <div className="absolute inset-0 bg-white opacity-50 cursor-not-allowed"></div>
                      )}
                      <Card
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleCreateContract("client")}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-center text-lg">
                            Client
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-center text-sm">
                          I want to hire someone
                        </CardContent>
                      </Card>

                      <Card
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleCreateContract("freelancer")}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-center text-lg">
                            Freelancer
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-center text-sm">
                          I want to offer my services
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                {isCreatingContract && (
                  <div className="flex justify-center">
                    <p>Creating contract...</p>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card className="mx-auto max-w-4xl mt-8">
        <CardHeader>
          <CardTitle>Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-6 py-3">
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
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, idx) => (
                  <tr key={idx + 1} className="bg-white border-b">
                    <td className="px-6 py-4">{contract.id}</td>
                    <td className="px-6 py-4">
                      {contract.client.userId == user.uid
                        ? "Client"
                        : "Freelancer"}
                    </td>
                    <td className="px-6 py-4">{contract.status}</td>
                    <td className="px-6 py-4">
                      <Button
                        variant="link"
                        asChild
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <a href={"/work?id=" + String(contract.id)}>
                          View Contract
                        </a>
                      </Button>
                    </td>
                    <td>
                      {contract.freelancer?.userId == user.uid &&
                        !contract?.isWorkDone &&
                        contract.status == "active" && (
                          <TurnInWorkAction
                            contract={contract}
                            setForceRender={setForceRender}
                          />
                        )}
                      {contract.client?.userId == user.uid &&
                        contract?.isWorkDone && (
                          <PayForWorkAction
                            contractId={contract.id}
                            setForceRender={setForceRender}
                          />
                        )}
                      {contract.createdBy == user.uid &&
                        contract.status === "pending" && (
                          <DeleteContractAction
                            contractId={contract.id}
                            setForceRender={setForceRender}
                          />
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
