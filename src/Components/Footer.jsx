import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-400 py-4  w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Link
            to="/about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            to="/github"
            className="hover:text-white transition-colors duration-200"
          >
            View Github
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-center md:text-right">
          Created by <span className="font-semibold text-white">Bragosi</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
