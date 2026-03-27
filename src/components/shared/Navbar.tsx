/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // TODO: replace with real auth state later
//   const isLoggedIn = false;
//   const userRole = "USER"; // or "ADMIN"

//   return (
//     <nav className="w-full border-b bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-primary">
//           Planora
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <Link href="/" className="hover:text-primary transition">
//             Home
//           </Link>
//           <Link href="/events" className="hover:text-primary transition">
//             Events
//           </Link>
//           <Link href="/about" className="hover:text-primary transition">
//             About
//           </Link>

//           {isLoggedIn && (
//             <Link href="/dashboard" className="hover:text-primary transition">
//               Dashboard
//             </Link>
//           )}

//           {/* Auth Buttons */}
//           {!isLoggedIn ? (
//             <div className="flex items-center gap-2">
//               <Link href="/login">
//                 <Button variant="outline">Login</Button>
//               </Link>
//               <Link href="/register">
//                 <Button>Register</Button>
//               </Link>
//             </div>
//           ) : (
//             <Button variant="destructive">Logout</Button>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-3 bg-white border-t">
//           <Link href="/" className="block">
//             Home
//           </Link>
//           <Link href="/events" className="block">
//             Events
//           </Link>
//           <Link href="/about" className="block">
//             About
//           </Link>

//           {isLoggedIn && (
//             <Link href="/dashboard" className="block">
//               Dashboard
//             </Link>
//           )}

//           {!isLoggedIn ? (
//             <div className="flex flex-col gap-2">
//               <Link href="/login">
//                 <Button variant="outline" className="w-full">
//                   Login
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button className="w-full">Register</Button>
//               </Link>
//             </div>
//           ) : (
//             <Button variant="destructive" className="w-full">
//               Logout
//             </Button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUser, UserLogOut } from "@/services/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const userdata = await getUser();
      setUser(userdata);
    };
    fetchUser();
  }, []);

  const handleLogOut = async () => {
    await UserLogOut();
    setUser(null);
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Planora
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition">
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {user?.name || "User"}
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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-6 mt-6">
                {/* Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:text-primary transition">
                    {link.name}
                  </Link>
                ))}

                {/* Auth */}
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      {user?.name || "User"}
                    </span>
                    <Button
                      onClick={() => {
                        handleLogOut();
                        setOpen(false);
                      }}
                      className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full">Signup</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
