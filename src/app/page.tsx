import AchievementsEducation from "@/components/AchievementsEducation";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import Timeline from "@/components/Timeline";
import VideoBackground from "@/components/VideoBackground";

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
        <section
          id="achievements-education"
          aria-label="Achievements and education"
        >
          <AchievementsEducation />
        </section>
        <section id="contact" aria-label="Contact information">
          <Contact />
        </section>
      </main>
    </VideoBackground>
  );
}
