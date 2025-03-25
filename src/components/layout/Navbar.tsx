"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "../Logo";
import { ProjectMenu } from "../ProjectMenu";
import { Button } from "../ui/button";
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
  ];

  return (
    <nav
      className={`flex w-4/5 ${isScrolled ? "opacity-25" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-center flex-1">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center justify-around w-4/5 mx-auto">
        <ProjectMenu />
        {links.map((link, idx) => (
          <Link key={idx} href={link.href}>
            <Button className="rounded-none" variant="outline">
              {link.name}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex">
        <ToggleMode />
      </div>
    </nav>
  );
}
