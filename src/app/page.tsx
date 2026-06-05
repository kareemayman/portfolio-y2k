import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Playground } from "@/components/sections/Playground";
import { Contact } from "@/components/sections/Contact";
import { ShutdownFooter } from "@/components/sections/ShutdownFooter";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Work />
        <Playground />
        <Contact />
      </main>
      <ShutdownFooter />
    </>
  );
}
