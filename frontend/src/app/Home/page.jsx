import Feature from "@/components/layout/Feature";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/layout/HeroSection";
import InfoSection from "@/components/layout/InfoSection";
import Navbar from "@/components/layout/NavBar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <InfoSection />
      <Feature />
      <Footer />
    </>
  );
}
