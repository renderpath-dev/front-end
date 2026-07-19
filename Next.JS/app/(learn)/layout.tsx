import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteMobileNav } from "@/components/site/SiteMobileNav";
import { SiteSidebar } from "@/components/site/SiteSidebar";
import { chapters } from "@/content/chapters";

export default function LearningLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mobileChapters = chapters.map(
    ({ slug, chapterNumber, shortTitle }) => ({
      slug,
      chapterNumber,
      shortTitle,
    }),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <SiteMobileNav chapters={mobileChapters} />
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <SiteSidebar />
        <main className="min-w-0 px-4 py-10 sm:px-8 lg:px-10" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
