"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { ToggleMode } from "../ui/toggle-mode";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      href: "#about-me",
      name: "À propos de moi",
    },
    {
      href: "#contact-me",
      name: "Mes contacts",
    },
    {
      href: "/projets",
      name: "Projets",
    },
  ];

  return (
    <nav
      className={`flex w-full ${isScrolled ? "opacity-25" : "bg-transparent"}`}
    >
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex items-center justify-evenly w-2/3 mx-auto">
        {links.map((link, idx) => (
          <Link key={idx} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
      <div>
        <label className="swap swap-flip">
          <input type="text" />
          <ToggleMode />
        </label>
      </div>
    </nav>
  );
}
