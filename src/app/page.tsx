import VideoBackground from "@/components/VideoBackground";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <VideoBackground>
      <Header />
      <main>
        <section id="home" aria-label="Home section">
          <LandingPage />
        </section>
        <section id="timeline" aria-label="Professional timeline">
          <Timeline />
        </section>
        <section id="contact" aria-label="Contact information">
          <Contact />
        </section>
      </main>
    </VideoBackground>
  );
}
