
import { HeroSection } from "@/components/homepage";
import HeaderMenu from "@/components/ui/header";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen px-20 py-5 gap-9">
      {/* Top Social & Nav Icons */}
      <HeaderMenu />
      <main className="flex flex-col h-full w-[80%] gap-[32px] row-start-2 items-center sm:items-start">
        
        <HeroSection />
      </main>
      
    </div>
  );
}