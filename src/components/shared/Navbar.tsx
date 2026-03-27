/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { getCurrentUser, logoutUser } from "@/services/auth";
import { logoutUser, getCurrentUserClient } from "@/services/auth";

type TUser = {
  id?: string;
  email?: string;
  role?: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  useEffect(() => {
    setMounted(true);
    const userData = getCurrentUserClient();
    setUser(userData);
  }, []);

  const handleLogOut = () => {
    logoutUser();
    setUser(null);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          Planora
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

          {!mounted ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>
                Login
              </Button>
              <Button disabled>Signup</Button>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <Button variant="outline" onClick={handleLogOut}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Signup</Button>
              </Link>
            </div>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-5">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-lg font-bold text-primary"
                >
                  Planora
                </Link>

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-4">
                  {!mounted ? (
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full" disabled>
                        Login
                      </Button>
                      <Button className="w-full" disabled>
                        Signup
                      </Button>
                    </div>
                  ) : user ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLogOut}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setOpen(false)}>
                        <Button className="w-full">Signup</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}