import React, { useEffect, useRef, useState } from "react";
import { experience } from "../data/portfolio";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractYear(period: string): number {
  const match = period.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : new Date().getFullYear();
}

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        const start = performance.now();
        const duration = 900;

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(value);
        };

        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [copied, setCopied] = useState(false);
  const active = experience[activeIndex];

  // Typewriter effect for the active role title
  useEffect(() => {
    setTypedRole("");
    const text = active.role;
    let i = 0;

    const interval = setInterval(() => {
      i += 1;
      setTypedRole(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 28);

    return () => clearInterval(interval);
  }, [activeIndex, active.role]);

  // Reset "copied" state when switching tabs
  useEffect(() => {
    setCopied(false);
  }, [activeIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % experience.length);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + experience.length) % experience.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(experience.length - 1);
    }
  };

  const handleCopy = () => {
    const command = `cat ~/experience/${slugify(active.company)}.log`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(command).catch(() => undefined);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Derived stats
  const currentYear = new Date().getFullYear();
  const startYear = Math.min(...experience.map((item) => extractYear(item.period)));
  const yearsActive = Math.max(currentYear - startYear, 1);
  const uniqueTech = new Set<string>();
  experience.forEach((item) => item.stack?.forEach((t) => uniqueTech.add(t)));
  const totalHighlights = experience.reduce((sum, item) => sum + item.points.length, 0);

  return (
    <section id="experience" className="bg-white dark:bg-black relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl" />

      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 relative">
        <div className="max-w-screen-md mb-8 lg:mb-12 mx-auto text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Experience
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Hands-on experience in offensive security, detection engineering,
            and AI-driven security automation.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-screen-md mx-auto mb-10 lg:mb-14">
          <div className="text-center px-3 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="text-2xl sm:text-3xl font-extrabold text-green-500">
              <Counter value={yearsActive} suffix="+" />
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Years Active
            </p>
          </div>
          <div className="text-center px-3 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="text-2xl sm:text-3xl font-extrabold text-green-500">
              <Counter value={experience.length} />
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Roles
            </p>
          </div>
          <div className="text-center px-3 py-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
            <div className="text-2xl sm:text-3xl font-extrabold text-green-500">
              <Counter value={totalHighlights} suffix="+" />
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Key Highlights
            </p>
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Tab list */}
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Experience timeline"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="relative flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0 lg:pl-5 focus:outline-none"
            >
              {/* Timeline rail (desktop only) */}
              <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 w-px bg-green-500 transition-all duration-500 ease-out"
                  style={{
                    height: `${((activeIndex + 1) / experience.length) * 100}%`,
                  }}
                />
              </div>

              {experience.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.role}
                    id={`exp-tab-${idx}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`exp-panel-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative flex-shrink-0 lg:flex-shrink text-left w-64 lg:w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "border-green-500 bg-green-50 dark:bg-green-900/10 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                        : "border-gray-200 dark:border-gray-800 hover:border-green-500/40 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {/* Timeline dot (desktop only) */}
                    <span
                      className={`hidden lg:block absolute -left-[27px] top-4 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-green-500 border-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                          : "bg-white dark:bg-black border-gray-300 dark:border-gray-700 group-hover:border-green-500/60"
                      }`}
                    />

                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs tracking-widest ${
                          isActive
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-400 dark:text-gray-500 group-hover:text-green-500"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                    </div>
                    <p
                      className={`mt-1 font-bold leading-snug ${
                        isActive
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {item.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.company}
                    </p>
                    <p className="mt-1 text-xs font-mono text-gray-400 dark:text-gray-500">
                      {item.period}
                    </p>
                  </button>
                );
              })}
            </div>

            <p className="hidden lg:block mt-4 text-xs text-gray-400 dark:text-gray-600 font-mono">
              ↑ / ↓ to navigate
            </p>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-8">
            <div
              key={activeIndex}
              id={`exp-panel-${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`exp-tab-${activeIndex}`}
              className="exp-fade-in relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-green-500/40 transition-colors duration-300"
            >
              {/* glow blob */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-green-500/10 rounded-full blur-3xl" />

              {/* scanline overlay */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.06] dark:opacity-[0.1]">
                <div className="scanline absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-green-400 to-transparent" />
              </div>

              {/* terminal title bar */}
              <div className="relative flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-3 font-mono text-xs text-gray-400 dark:text-gray-500 truncate">
                  cat ~/experience/{slugify(active.company)}.log
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-auto flex-shrink-0 font-mono text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:text-green-600 hover:border-green-500/40 transition-colors duration-300"
                >
                  {copied ? "copied!" : "copy"}
                </button>
              </div>

              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white min-h-[1.75rem] sm:min-h-[2rem]">
                    {typedRole}
                    <span className="inline-block w-[2px] h-5 sm:h-6 bg-green-500 ml-1 align-middle blink-cursor" />
                  </h3>
                  <span className="inline-flex w-fit items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded border border-green-500/40 text-green-600 dark:text-green-400">
                    <span className="text-gray-400 dark:text-gray-500">$</span>
                    {active.period}
                  </span>
                </div>

                <p className="mb-6 font-medium text-green-600 dark:text-green-500">
                  {active.company}
                </p>

                <ul className="space-y-3 mb-6">
                  {active.points.map((point, i) => (
                    <li
                      key={point}
                      style={{ animationDelay: `${i * 70}ms` }}
                      className="exp-fade-in flex items-start gap-3 text-gray-600 dark:text-gray-300 group"
                    >
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.8)] transition-shadow duration-300" />
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                {active.stack && active.stack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400 hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* progress dots (mobile-friendly quick nav) */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {experience.map((item, idx) => (
                <button
                  key={item.role}
                  type="button"
                  aria-label={`View ${item.role}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-8 bg-green-500"
                      : "w-3 bg-gray-300 dark:bg-gray-700 hover:bg-green-500/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes exp-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .exp-fade-in {
          animation: exp-fade-in 0.35s ease-out both;
        }

        @keyframes exp-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .scanline {
          animation: exp-scan 6s linear infinite;
        }

        @keyframes exp-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .blink-cursor {
          animation: exp-blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
};

export default Experience;