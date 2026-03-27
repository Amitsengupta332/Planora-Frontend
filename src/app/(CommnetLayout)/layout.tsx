import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">{children}</div>
      <Footer/>
    </div>
  );
};

export default CommonLayout;