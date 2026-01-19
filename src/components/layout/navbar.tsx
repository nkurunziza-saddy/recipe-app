import { Link } from "@tanstack/react-router";
import { RiLogoutBoxLine } from "@remixicon/react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectCurrentUser, logout } from "@/lib/store/slices/auth-slice";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background border-b border-border">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-base font-bold text-foreground">
          Recipes
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          {user && <NavLink to="/dashboard">Dashboard</NavLink>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"w-64"}>
              <DropdownMenuGroup>

              <DropdownMenuLabel className={"flex gap-1"}>
                 <Avatar>
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.username}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={() => dispatch(logout())}
              >
                <RiLogoutBoxLine size={16} />
                <span>Log out</span>
              </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      activeProps={{ className: "text-primary" }}
      className="text-[12px] font-medium text-muted-foreground hover:text-foreground"
    >
      {children}
    </Link>
  );
}
