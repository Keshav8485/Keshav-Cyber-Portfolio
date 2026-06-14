import React, { useState } from "react";
import { CONTACT_LINKS, REPORTS_CONTACT_EMAIL } from "../data/portfolio";

const icons: Record<string, React.ReactNode> = {
  Email: (
    <svg
      className="w-6 h-6 text-green-600 dark:text-green-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),

  GitHub: (
    <svg
      className="w-6 h-6 text-green-600 dark:text-green-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 01112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.523 2 12 2z" />
    </svg>
  ),

  LinkedIn: (
    <svg
      className="w-6 h-6 text-green-600 dark:text-green-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.339 18.337V9.7H5.667v8.637h2.672zM7.004 8.598c.93 0 1.512-.616 1.512-1.387-.017-.788-.583-1.387-1.495-1.387-.913 0-1.513.6-1.513 1.387 0 .77.582 1.387 1.479 1.387h.017zm4.908 9.739V13.16c0-.265.02-.53.098-.719.218-.532.71-1.083 1.535-1.083 1.083 0 1.518.824 1.518 2.022v4.957h2.672v-5.282c0-2.466-1.317-3.608-3.077-3.608-1.419 0-2.066.787-2.42 1.32v.022H12.16c.011-.218.027-.452 0-.022V9.7h-2.673c.014.225 0 8.637 0 8.637h2.673z" />
    </svg>
  ),

  "X / Twitter": (
    <svg
      className="w-6 h-6 text-green-600 dark:text-green-500"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactLinks = Array.isArray(CONTACT_LINKS) ? CONTACT_LINKS : [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio Contact from ${name || "Anonymous"}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${REPORTS_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-white dark:bg-black">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16 mx-auto text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Get In Touch
          </h2>

          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Have a project, report request, or just want to connect? Reach out
            through any of the channels below.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-screen-lg mx-auto mb-12">
          {contactLinks.map((link) => {
            const opensExternally = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={opensExternally ? "_blank" : undefined}
                rel={opensExternally ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center p-6 text-center bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-green-900/30 hover:border-green-500 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors duration-300">
                  {icons[link.label] || icons.Email}
                </div>

                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                  {link.label}
                </h3>

                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 break-all">
                  {link.value}
                </span>
              </a>
            );
          })}
        </div>

        <div className="max-w-screen-md mx-auto">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-green-500/40 transition-colors duration-300">
            <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-green-500/10 rounded-full blur-3xl" />

            <div className="relative flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />

              <span className="ml-3 font-mono text-xs text-gray-400 dark:text-gray-500">
                ./send_message.sh
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative p-6 sm:p-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block mb-2 font-mono text-sm text-green-600 dark:text-green-400"
                >
                  $ name --input
                </label>

                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block mb-2 font-mono text-sm text-green-600 dark:text-green-400"
                >
                  $ email --input
                </label>

                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block mb-2 font-mono text-sm text-green-600 dark:text-green-400"
                >
                  $ message --input
                </label>

                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 text-black font-semibold transition-colors duration-300"
              >
                Send Message

                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;