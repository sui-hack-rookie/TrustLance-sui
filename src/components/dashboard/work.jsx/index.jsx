import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getContract, joinContract } from "@/lib/firestore"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function WorkContract() {
  const [searchParams, _] = useSearchParams()
  const router = useNavigate()
  const { user, loading } = useAuth()
  const { toast } = useToast()
  const [contract, setContract] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)

  const contractId = searchParams.get("id")

  useEffect(() => {
    if (!loading && !user) {
      router(`/signin?redirect=/work?id=${contractId}`)
      return
    }

    if (!contractId) {
      router("/dashboard")
      return
    }

    const fetchContract = async () => {
      try {
        const contractData = await getContract(contractId)
        setContract(contractData)
      } catch (error) {
        console.error("Error fetching contract:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load contract. It may not exist or you don't have access.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user && contractId) {
      fetchContract()
    }
  }, [contractId, user, loading, router, toast])

  const handleJoinContract = async (role) => {
    if (!user || !contractId) return

    setIsJoining(true)
    try {
      await joinContract(contractId, user.uid, role)
      toast({
        title: "Contract Joined",
        description: `You have successfully joined as a ${role}.`,
      })
      // Refresh contract data
      const updatedContract = await getContract(contractId)
      setContract(updatedContract)
    } catch (error) {
      console.error("Error joining contract:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to join contract.",
      })
    } finally {
      setIsJoining(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!contract) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Contract Not Found</CardTitle>
            <CardDescription>
              The contract you're looking for doesn't exist or you don't have access to it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router("/dashboard")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userRole =
    contract.client?.userId === user?.uid ? "client" : contract.freelancer?.userId === user?.uid ? "freelancer" : null

  const canJoin =
    !userRole &&
    ((contract.client?.userId && !contract.freelancer?.userId) ||
      (!contract.client?.userId && contract.freelancer?.userId))

  const availableRole =
    contract.client?.joined && !contract.freelancer?.joined
      ? "freelancer"
      : !contract.client?.joined && contract.freelancer?.joined
        ? "client"
        : null

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Work Contract</CardTitle>
          <CardDescription>
            {contract.status === "pending"
              ? "This contract is waiting for all parties to join"
              : contract.status === "active"
                ? "This contract is active"
                : contract.status === "completed"
                  ? "This contract has been completed"
                  : "This contract has been cancelled"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium">Contract Details</h3>
            <p>
              <strong>Contract ID:</strong> {contractId}
            </p>
            <p>
              <strong>Created:</strong> {contract.createdAt?.toDate().toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {contract.status}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Client</h3>
              {contract.client?.joined ? (
                <p>{contract.client.userId === user?.uid ? "You" : `${contract.client.userId} has joined as client`}</p>
              ) : (
                <p>Waiting for client to join...</p>
              )}
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Freelancer</h3>
              {contract.freelancer?.joined ? (
                <p>{contract.freelancer.userId === user?.uid ? "You" : `${contract.freelancer.userId} has joined as freelancer`}</p>
              ) : (
                <p>Waiting for freelancer to join...</p>
              )}
            </div>
          </div>

          {canJoin && availableRole && (
            <div className="rounded-lg border bg-muted p-4 text-center">
              <h3 className="mb-2 font-medium">Join this Contract</h3>
              <p className="mb-4">You can join this contract as a {availableRole}.</p>
              <Button onClick={() => handleJoinContract(availableRole)} disabled={isJoining}>
                {isJoining ? "Joining..." : `Join as ${availableRole}`}
              </Button>
            </div>
          )}

          {userRole && (
            <div className="rounded-lg border bg-muted p-4 text-center">
              <h3 className="mb-2 font-medium">Your Role</h3>
              <p>You are participating in this contract as a {userRole}.</p>
            </div>
          )}

          <Button onClick={() => router("/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
