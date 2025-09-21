import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Waves, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent",
        isActive && "bg-primary/10 text-primary"
      )
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-xl">
          <div className="h-8 w-8 grid place-items-center rounded-md bg-primary/10 text-primary">
            <Waves className="h-5 w-5" />
          </div>
          <span className="hidden sm:inline">Marine Data Platform</span>
          <span className="sm:hidden">MDP</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/" label="Home" />
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/data-explorer" label="Data Explorer" />
          <NavItem to="/ai-insights" label="AI Insights" />
          <NavItem to="/upload" label="Upload Data" />
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserIcon className="h-5 w-5" />
                <span className="hidden sm:inline">{user.email}</span>
              </div>
              <Button variant="outline" className="hidden sm:inline-block" onClick={logout}>Logout</Button>
              <Button variant="outline" size="icon" className="sm:hidden" onClick={logout} aria-label="Logout">
                ⎋
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost"><Link to="/login">Login</Link></Button>
              <Button asChild><Link to="/signup">Sign up</Link></Button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden border-t">
        <div className="container py-2 flex flex-wrap gap-2">
          <NavItem to="/" label="Home" />
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/data-explorer" label="Data Explorer" />
          <NavItem to="/ai-insights" label="AI Insights" />
          <NavItem to="/upload" label="Upload Data" />
        </div>
      </div>
    </header>
  );
}
