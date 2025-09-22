import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { FormEvent, useMemo, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

export default function Signup() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const redirectTo = useMemo(() => {
    const raw = params.get("redirect") || "/";
    if (!raw.startsWith("/")) return "/";
    return raw;
  }, [params]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email || "user@example.com");
    navigate(redirectTo);
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>
      <p className="text-muted-foreground mb-6">
        Start exploring marine data in minutes.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
      <p className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to={redirectTo === "/" ? "/login" : `/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
