import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "../components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Navbar />
      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Toaster/>
      <TanStackRouterDevtools />
    </div>
  ),
});
