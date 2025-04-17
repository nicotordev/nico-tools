// app/page.tsx
import { Header } from '@/src/components/layout/header';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Palette,
  Code,
  Image,
  FileText,
  Database,
  Workflow,
  Lock,
} from 'lucide-react';
import { FeatureCard } from '@/src/components/home/featureCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Simplified Web Tools for Developers
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A comprehensive suite of modern utilities for developers and
                  designers built for 2025
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/all-tools"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Browse All Tools
                </Link>
                <Link
                  href="#features"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Image className="h-10 w-10 text-primary" />}
                title="Image Tools"
                description="Optimize, convert, and edit images with our powerful suite of image utilities."
                href="/image-tools"
              />
              <FeatureCard
                icon={<Code className="h-10 w-10 text-primary" />}
                title="Developer Essentials"
                description="JSON formatter, regex tester, API builder, and many more tools for everyday coding tasks."
                href="/developer"
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Text Processing"
                description="Markdown preview, text diff, character counter, and other text manipulation tools."
                href="/text"
              />
              <FeatureCard
                icon={<Palette className="h-10 w-10 text-primary" />}
                title="Design Resources"
                description="Color palettes, gradients, shadows, and more tools for modern UI design."
                href="/design"
              />
              <FeatureCard
                icon={<Database className="h-10 w-10 text-primary" />}
                title="Data Transformation"
                description="Convert between CSV, JSON, XML and other data formats with ease."
                href="/data"
              />
              <FeatureCard
                icon={<Lock className="h-10 w-10 text-primary" />}
                title="Security Tools"
                description="Password checkers, SSL validators, and encryption utilities for secure applications."
                href="/security"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Nico-Tools. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="https://github.com/your-username/nico-tools"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}