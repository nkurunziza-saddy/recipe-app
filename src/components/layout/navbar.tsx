import { Link } from "@tanstack/react-router";
import {
  RiSearchLine,
  RiShoppingBasketLine,
  RiUserLine,
  RiLogoutBoxLine,
} from "@remixicon/react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCurrentUser, logout } from "@/features/auth/authSlice";

export function Navbar() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background border-b border-border shadow-none">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-primary/60 skew-x-12"
        >
          Rec
        </Link>
        <div className="flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
      </div>

      <div className="flex items-center gap-4 text-foreground">
        <button className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground">
          <RiSearchLine size={18} />
        </button>
        <div className="relative">
          <button className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground">
            <RiShoppingBasketLine size={18} />
          </button>
          <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-sm">
            2
          </span>
        </div>

        {user ? (
          <div className="flex items-center gap-3 pl-2 border-l border-border">
            <span className="text-sm font-semibold hidden md:block text-foreground">
              {user.username}
            </span>
            <img
              src={user.image}
              alt={user.username}
              className="w-7 h-7 rounded-full border border-border"
            />
            <button
              onClick={() => dispatch(logout())}
              className="p-1.5 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-destructive"
            >
              <RiLogoutBoxLine size={18} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
          >
            <RiUserLine size={18} />
          </Link>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      activeProps={{ className: "text-primary" }}
      className={`text-sm font-medium text-muted-foreground hover:text-foreground transition-all ${className}`}
    >
      {children}
    </Link>
  );
}
