// components/header.tsx
import Link from 'next/link';
import { Settings, Search } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link
        href="/image-tools"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Image Tools
      </Link>
      <Link
        href="/encoding"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Encoding
      </Link>
      <Link
        href="/developer"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Developer
      </Link>
      <Link
        href="/text"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Text
      </Link>
      <Link
        href="/design"
        className="text-foreground/80 hover:text-primary transition-colors"
      >
        Design
      </Link>
    </nav>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center mr-4 space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Nico-Tools
            </span>
          </Link>
        </div>
        <Navigation />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="flex items-center space-x-1">
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
