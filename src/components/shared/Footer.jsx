import { BriefcaseFill } from "@gravity-ui/icons";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const PinterestIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const Footer = () => {
  const productLinks = [
    { label: "Job discovery", href: "#" },
    { label: "Worker AI", href: "#" },
    { label: "Companies", href: "#" },
    { label: "Salary data", href: "#" },
  ];

  const navigationLinks = [
    { label: "Help center", href: "#" },
    { label: "Career library", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const resourceLinks = [
    { label: "Brand Guideline", href: "#" },
    { label: "Newsroom", href: "#" },
  ];

  return (
    <footer className="mt-25 text-white w-full lg:px-10">
      <div className=" px-6 py-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          {/* Brand Section */}
          <div className="flex flex-col gap-4 max-w-55">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="border p-2 rounded-xl bg-white">
                <BriefcaseFill fontSize="" className="text-violet-500" />
              </div>
              <span className="text-sm font-semibold leading-tight tracking-tight">
                Job
                <br />
                <span className="text-violet-500">Quest</span>
              </span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-gray-400 leading-relaxed">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            {/* Product */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-violet-400 mb-1">
                Product
              </h4>
              {productLinks.map((link) => (
                <p
                  key={link.label}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </p>
              ))}
            </div>

            {/* Navigations */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-violet-400 mb-1">
                Navigations
              </h4>
              {navigationLinks.map((link) => (
                <p
                  key={link.label}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </p>
              ))}
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-violet-400 mb-1">
                Resources
              </h4>
              {resourceLinks.map((link) => (
                <p
                  key={link.label}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <p className="w-8 h-8 rounded-md bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200">
              <FaFacebookF size={14} />
            </p>
            <p className="w-8 h-8 rounded-md bg-violet-600 flex items-center justify-center text-white hover:bg-violet-500 transition-all duration-200">
              <PinterestIcon />
            </p>
            <p className="w-8 h-8 rounded-md bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200">
              <FaLinkedinIn size={14} />
            </p>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>Copyright 2024 — Job Quest</span>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-2">
              <p className="hover:text-white transition-colors duration-200">
                Terms &amp; Policy
              </p>
              <span>-</span>
              <p className="hover:text-white transition-colors duration-200">
                Privacy Guideline
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
