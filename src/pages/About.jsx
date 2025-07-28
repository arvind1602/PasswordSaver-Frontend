import { FaLock, FaUserSecret, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          About PasswordSaver 🔐
        </h1>

        {/* What it is */}
        <section className="bg-white/5 border border-gray-700 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-2 text-cyan-400">What is PasswordSaver?</h2>
          <p className="text-gray-300">
            PasswordSaver is a secure, easy-to-use password management application
            that allows users to store and organize their service credentials in a personal encrypted vault.
            Built for privacy, speed, and simplicity — it’s your one-stop password solution.
          </p>
        </section>

        {/* How it's secure */}
        <section className="bg-white/5 border border-gray-700 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-2 text-fuchsia-400">How We Protect Your Data</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <FaLock size={40} className="text-cyan-500" />
            <p className="text-gray-300">
              All passwords are encrypted using strong cryptographic techniques (bcrypt, AES, or more).
              Your private data never leaves your control — no third-party access, no analytics, no compromise.
            </p>
          </div>
        </section>

        {/* Why it's built */}
        <section className="bg-white/5 border border-gray-700 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-2 text-yellow-300">Why I Built It</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <FaUserSecret size={40} className="text-yellow-400" />
            <p className="text-gray-300">
              I built PasswordSaver to solve a real-world problem — managing dozens of logins across apps
              and devices. This app empowers users to take control of their security, without complexity or cost.
            </p>
          </div>
        </section>

        {/* Built By */}
        <section className="text-center space-y-3 mt-10">
          <h3 className="text-xl font-semibold text-gray-300">Crafted with ❤️ by</h3>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            Arvind Nagpure
          </p>
          <a
            href="https://github.com/arvind1602"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
          >
            <FaGithub size={20} />
            @arvind1602
          </a>
        </section>
      </div>
    </div>
  );
}
