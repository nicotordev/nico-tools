import { Link } from '@/src/i18n/navigation';
import { FeatureCardProps } from '@/src/types/home';
import { ArrowRight } from 'lucide-react';

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border border-border p-4 transition-all hover:bg-accent hover:text-accent-foreground">
      <div className="p-2">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary hover:underline"
      >
        Learn more <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}

export { FeatureCard };
