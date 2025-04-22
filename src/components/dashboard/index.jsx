import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      router("/signin")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto max-w-2xl">
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
              <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
            </p>
            <p>
              <strong>User ID:</strong> {user.uid}
            </p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
