type FooterProps = {
  siteName: string;
  copyright?: string | null;
};

export function Footer({ siteName, copyright }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {copyright || `All rights reserved by ${siteName}`}
        </p>
        <p className="text-xs text-muted-foreground">
          Built with Next.js & Payload CMS.
        </p>
      </div>
    </footer>
  );
}
