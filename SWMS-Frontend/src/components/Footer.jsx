import { Link } from "react-router-dom"

const Footer = () => {
  // Scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 py-12 text-sm text-gray-400">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="grid md:grid-cols-4 gap-8 mb-8 justify-center">
          
          <div className="text-center">
            <h3 className="text-white font-semibold mb-4">SWMS</h3>
            <p className="text-xs">
              Smart Waste Management System for a sustainable future.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-white font-medium mb-3">Features</h4>
            <div className="space-y-2">
              <Link to="/features" onClick={scrollToTop} className="block hover:text-lime-400 transition-colors">
                Waste Classifier
              </Link>
              <Link to="/learn" onClick={scrollToTop} className="block hover:text-lime-400 transition-colors">
                Learning Hub
              </Link>
              <Link to="/shop" onClick={scrollToTop} className="block hover:text-lime-400 transition-colors">
                Eco Store
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-white font-medium mb-3">Services</h4>
            <div className="space-y-2">
              <Link to="/sell-trash" onClick={scrollToTop} className="block hover:text-lime-400 transition-colors">
                Sell Recyclables
              </Link>
              <Link to="/nearby" onClick={scrollToTop} className="block hover:text-lime-400 transition-colors">
                Find Centers
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-white font-medium mb-3">About</h4>
            <div className="space-y-2">
              <Link to="/about-us" onClick={scrollToTop} className="block hover:text-lime-400 transition-colors">
                About Us
              </Link>
            </div>
          </div>
          
        </div>

        <div className="border-t border-white/5 pt-8">
          <p>Built with passion for a greener future © 2025 SWMS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
