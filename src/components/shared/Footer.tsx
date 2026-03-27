"use client";

import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-primary">Planora</h2>
          <p className="mt-2 text-sm text-gray-600">
            A modern platform to create, manage, and participate in events.
            Discover amazing events and connect with people.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
            <li><Link href="/events" className="hover:text-primary transition">Events</Link></li>
            <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
            <li><Link href="/login" className="hover:text-primary transition">Login</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-600">Email: support@planora.com</p>
          <p className="text-sm text-gray-600">Phone: +880 1234-567890</p>

          <div className="flex gap-4 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaGithub size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 border-t py-4">
        © {new Date().getFullYear()} Planora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;