import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6"></div>
    </header>
  );
}

export default Header;
