import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { RiLoader4Line } from "@remixicon/react";

function Login() {
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ user: userData, token: userData.token }));
      navigate({ to: "/" });
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-background">
      <div className="w-full max-w-sm p-6 bg-card border border-border rounded-lg shadow-none">
        <h2 className="text-2xl font-bold text-foreground mb-1 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-xs text-muted-foreground mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-background border border-border focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground text-foreground text-sm"
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-background border border-border focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground text-foreground text-sm"
              placeholder="Enter password"
            />
          </div>

          {isError && (
            <p className="text-destructive text-xs text-center font-bold bg-destructive/10 p-2 rounded-md">
              Invalid username or password
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:opacity-90 transition-all disabled:opacity-50 flex justify-center text-sm"
          >
            {isLoading ? (
              <RiLoader4Line className="animate-spin" size={16} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          Use <b>kminchelle</b> / <b>0lelplR</b> to test
        </p>
      </div>
    </div>
  );
}
