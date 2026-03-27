"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: replace with real auth state later
  const isLoggedIn = false;
  const userRole = "USER"; // or "ADMIN"

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Planora
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link href="/events" className="hover:text-primary transition">
            Events
          </Link>
          <Link href="/about" className="hover:text-primary transition">
            About
          </Link>

          {isLoggedIn && (
            <Link href="/dashboard" className="hover:text-primary transition">
              Dashboard
            </Link>
          )}

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          ) : (
            <Button variant="destructive">Logout</Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/events" className="block">
            Events
          </Link>
          <Link href="/about" className="block">
            About
          </Link>

          {isLoggedIn && (
            <Link href="/dashboard" className="block">
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          ) : (
            <Button variant="destructive" className="w-full">
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;