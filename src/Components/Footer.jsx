import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-400 py-4  w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Link
            to="https://my-portfolio-website-seven-lake.vercel.app/"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="mailto:oladejoboluwatife20003@gmail.com?subject=Hello%20Bragosi&body=I%20have%20a%20query%20about%20your%20Movie%20App."
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>

          <Link
            to="https://github.com/Bragosi/Movie-App"
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
