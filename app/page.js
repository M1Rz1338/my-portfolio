import Footer from "@/components/Footer";
import LoaderOverlay from "@/components/LoaderOverlay";
import Navigation from "@/components/Navigation";
import SectionGlideController from "@/components/SectionGlideController";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import EducationSection from "@/components/sections/EducationSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import { sectionVisibility } from "@/data/resumeContent";

export default function HomePage() {
    const show = (id) => sectionVisibility[id] !== false;

    return (
        <main className="relative overflow-x-clip text-silver">
            <LoaderOverlay />
            <div className="cv2-main">
                <Navigation />
                <SectionGlideController />
                <div className="relative z-10">
                    {show("hero") && <HeroSection />}
                    {show("about") && <AboutSection />}
                    {show("journey") && <TimelineSection />}
                    {show("skills") && <SkillsSection />}
                    {show("education") && <EducationSection />}
                    {show("projects") && <ProjectsSection />}
                    {show("contact") && <ContactSection />}
                    <Footer />
                </div>
            </div>
        </main>
    );
}