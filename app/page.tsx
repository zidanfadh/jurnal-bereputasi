import NavbarDemo from "@/components/home/navbar2";
import { FooterSection } from "@/components/home/footer2";
import HeroLanding from "@/components/landing/hero";
import SectionTwo from "@/components/landing/section-two";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden font-sans bg-white dark:bg-gray-950">
      {/* Header */}
      <NavbarDemo />

      {/* Main */}
      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20 lg:space-y-24">
          <HeroLanding />
          <SectionTwo />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <FooterSection />
        </div>
      </footer>
    </div>
  );
}
