import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0c29] text-gray-300 px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
        {/* Brand + Description */}
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-3">
            PasswordSaver 🔐
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            PasswordSaver helps you securely store, manage, and access all your
            passwords in one encrypted vault — with simplicity and style.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-white mb-3">Follow Me</h3>
          <div className="flex space-x-5">
            <a
              href="https://github.com/arvind1602"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transform hover:scale-125 transition duration-300"
              title="GitHub"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://www.instagram.com/aayush.2k05/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-white transform hover:scale-125 transition duration-300"
              title="Instagram"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="http://www.linkedin.com/in/arvind-nagpure"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-white transform hover:scale-125 transition duration-300"
              title="LinkedIn"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>

        {/* Author Info */}
        <div className="text-sm text-center lg:text-right">
          <p className="text-gray-400">© {currentYear} PasswordSaver</p>
          <p className="mt-2">
            Built by{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 animate-pulse">
              Arvind Nagpure
            </span>
          </p>
          <p className="text-gray-500 mt-1 text-xs">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
