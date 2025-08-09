import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
