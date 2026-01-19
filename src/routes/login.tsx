import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const token = localStorage.getItem("logged-in-token");
    if (token) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Login,
});

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useLoginMutation } from "@/lib/api/auth-api";
import { setCredentials } from "@/lib/store/slices/auth-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { RiLoader4Line } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function Login() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ user: userData, accessToken: userData.accessToken }));
      navigate({ to: "/" });
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>

            {isError && (
              <p className="text-destructive text-xs text-center font-medium bg-destructive/10 p-2 rounded">
                Invalid username or password
              </p>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <RiLoader4Line className="animate-spin" size={16} />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

        
        </CardContent>
      </Card>
    </div>
  );
}
