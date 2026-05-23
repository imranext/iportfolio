type FooterProps = {
  siteName: string;
  copyright?: string | null;
  showUnsplashAttribution?: boolean;
};

export function Footer({ siteName, copyright, showUnsplashAttribution }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {copyright || `All rights reserved by ${siteName}`}
        </p>
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground md:items-end">
          <p>Built with Next.js & Payload CMS</p>
          {showUnsplashAttribution && (
            <p className="text-[10px]">
              Demo imagery via{" "}
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Unsplash
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
