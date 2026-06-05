import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CodingScene } from "@/components/sections/CodingScene";
import { Work } from "@/components/sections/Work";
import { RoomScene } from "@/components/sections/RoomScene";
import { Playground } from "@/components/sections/Playground";
import { Contact } from "@/components/sections/Contact";
import { ShutdownFooter } from "@/components/sections/ShutdownFooter";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <CodingScene />
        <Work />
        <RoomScene />
        <Playground />
        <Contact />
      </main>
      <ShutdownFooter />
    </>
  );
}
