interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function PageHero({
  title,
  subtitle,
  description,
}: PageHeroProps): React.JSX.Element {
  return (
    <section className="bg-primary px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        {subtitle && (
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground/70">
            {subtitle}
          </p>
        )}
        <h1 className="text-balance font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
