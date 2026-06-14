import React, { useEffect, useRef, useState } from "react";
import BootScreen from "./components/BootScreen";
import Contact from "./components/Contact";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reports from "./components/Reports";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

const services = [
  {
    title: "Penetration Testing",
    description:
      "Comprehensive security assessment simulating real-world attacks to identify vulnerabilities in your systems, networks, and applications before malicious actors can exploit them.",
    icon: (
      <svg
        className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-500 group-hover:scale-125"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z"
        />
      </svg>
    ),
  },
  {
    title: "Web App Security",
    description:
      "In-depth analysis and testing of web applications to uncover security flaws, injection vulnerabilities, authentication weaknesses, and other critical risks affecting your platforms.",
    icon: (
      <svg
        className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-500 group-hover:scale-125"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 15v3c0 .5523.44772 1 1 1h8v-8m-9 4v-4m0 4h9m-9-4V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v4M3 11h11m6.25 5c0 1.2426-1.0073 2.25-2.25 2.25M20.25 16c0-1.2426-1.0073-2.25-2.25-2.25M20.25 16H21m-3 2.25c-1.2426 0-2.25-1.0074-2.25-2.25M18 18.25V19m-2.25-3c0-1.2426 1.0074-2.25 2.25-2.25M15.75 16H15m3-2.25V13"
        />
      </svg>
    ),
  },
  {
    title: "Network Infrastructure",
    description:
      "Thorough evaluation of network architecture, firewall configurations, access controls, and routing protocols to ensure robust security across your entire digital infrastructure.",
    icon: (
      <svg
        className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-500 group-hover:scale-125"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
        />
      </svg>
    ),
  },
  {
    title: "Security Consultation",
    description:
      "Strategic guidance and expert recommendations to strengthen your security posture, implement industry best practices, and develop effective incident response procedures.",
    icon: (
      <svg
        className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-500 group-hover:scale-125"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M14.7141 15h4.268c.4043 0 .732-.3838.732-.8571V3.85714c0-.47338-.3277-.85714-.732-.85714H6.71411c-.55228 0-1 .44772-1 1v4m10.99999 7v-3h3v3h-3Zm-3 6H6.71411c-.55228 0-1-.4477-1-1 0-1.6569 1.34315-3 3-3h2.99999c1.6569 0 3 1.3431 3 3 0 .5523-.4477 1-1 1Zm-1-9.5c0 1.3807-1.1193 2.5-2.5 2.5s-2.49999-1.1193-2.49999-2.5S8.8334 9 10.2141 9s2.5 1.1193 2.5 2.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Bug Hunting",
    description:
      "Discovered and responsibly disclosed vulnerabilities while helping organizations improve their security through ethical hacking and responsible reporting.",
    icon: (
      <svg
        className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-500 group-hover:scale-125"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M10 5 9 4V3m5 2 1-1V3m-3 6v11m0-11a5 5 0 0 1 5 5m-5-5a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H15V8a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 12 9Zm-5 5H5m2 0v2a5 5 0 0 0 10 0v-2m2.025 0H17m-9.975 4H6a1 1 0 0 0-1 1v2m12-3h1.025a1 1 0 0 1 1 1v2M16 11h1a1 1 0 0 0 1-1V8m-9.975 3H7a1 1 0 0 1-1-1V8"
        />
      </svg>
    ),
  },
  {
    title: "Security Training",
    description:
      "Customized training programs to educate teams about current security threats, defensive techniques, secure coding practices, and cybersecurity best practices.",
    icon: (
      <svg
        className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-colors duration-300 group-hover:text-green-500 group-hover:scale-125"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M14.6144 7.19994c.3479.48981.5999 1.15357.5999 1.80006 0 1.6569-1.3432 3-3 3-1.6569 0-3.00004-1.3431-3.00004-3 0-.67539.22319-1.29865.59983-1.80006M6.21426 6v4m0-4 6.00004-3 6 3-6 2-2.40021-.80006M6.21426 6l3.59983 1.19994M6.21426 19.8013v-2.1525c0-1.6825 1.27251-3.3075 2.95093-3.6488l3.04911 2.9345 3-2.9441c1.7026.3193 3 1.9596 3 3.6584v2.1525c0 .6312-.5373 1.1429-1.2 1.1429H7.41426c-.66274 0-1.2-.5117-1.2-1.1429Z"
        />
      </svg>
    ),
  },
];

interface CounterProps {
  target: number;
  active: boolean;
  duration?: number;
}

interface CounterProps {
  target: number;
  duration?: number;
}

function Counter({ target, duration = 2400 }: CounterProps) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (started) return;

    const element = counterRef.current;
    if (!element) return;

    const runAnimation = () => {
      setStarted(true);
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setValue(Math.round(target * easedProgress));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started, target, duration]);

  return <span ref={counterRef}>{value.toLocaleString()}</span>;
}

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!booted) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [booted]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setBooted(true);
    }, 8000);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <BootScreen onComplete={() => setBooted(true)} />

      <Nav />

      <main id="home" className="w-full">
        {/* Floating light elements */}
        <div className="light x1" />
        <div className="light x2" />
        <div className="light x3" />
        <div className="light x4" />
        <div className="light x5" />
        <div className="light x6" />
        <div className="light x7" />
        <div className="light x8" />
        <div className="light x9" />

        {/* #### HERO SECTION #### */}
        <section className="pt-20 md:pt-0 bg-white dark:bg-black">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-32 lg:grid-cols-12 relative z-10">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1
                id="dynamicHeadline"
                className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
              >
                Secure Your Future with{" "}
                <span id="dynamicWords" className="text-green-500 font-bold">
                  Ethical Hacking Done Right
                </span>
              </h1>

              <p className="max-w-2xl mb-6 font-bold text-gray-500 lg:mb-8 text-3xl dark:text-gray-400">
                From deep-dive penetration testing to proactive threat
                monitoring, I provide tailored solutions to secure your network
                and protect your business.
              </p>

              <a
                href="#about"
                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                More About Me
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-4 text-base font-medium text-center text-gray-900 border-4 border-green-300 hover:bg-green-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-green-700 dark:hover:bg-green-700 dark:focus:ring-gray-800"
              >
                Contact Me!
              </a>
            </div>

            <div
              id="hacker-logo"
              className="lg:mt-0 lg:col-span-5 lg:flex relative z-10"
              style={{ opacity: 0 }}
            >
              <img src="/assets/images/hacker.png" alt="hacker" />
            </div>
          </div>
        </section>

        {/* #### ACCOLADES SECTION #### */}
        <section className="bg-white dark:bg-black">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-28 lg:px-6 border-4 border-solid border-green-700 bg-white dark:bg-black relative z-20">
            <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-5xl md:text-7xl font-extrabold">
                  <Counter target={4} active={booted} />+
                </dt>
                <dd className="font-light text-2xl text-gray-500 dark:text-gray-400">
                  Years of Experience
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-5xl md:text-7xl font-extrabold">
                  <Counter target={450} active={booted} />+
                </dt>
                <dd className="font-light text-2xl text-gray-500 dark:text-gray-400">
                  Engagements Completed
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-5xl md:text-7xl font-extrabold">
                  <Counter target={10000} active={booted} />
                </dt>
                <dd className="font-light text-2xl text-gray-500 dark:text-gray-400">
                  Cups of Dark Roast Coffee
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* #### SERVICES SECTION #### */}
        <section
          id="services"
          className="pt-8 pb-12 bg-white dark:bg-black flex justify-center items-center"
        >
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 text-center">
            <div className="max-w-screen-md mb-8 lg:mb-12 mx-auto">
              <h2 className="mb-4 text-4xl md:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Breaking Systems, Building Security
              </h2>

              <p className="text-gray-500 text-2xl dark:text-gray-400">
                Specialized in uncovering critical security vulnerabilities
                through advanced penetration testing, helping organizations
                fortify their digital infrastructure before real threats emerge.
              </p>
            </div>

            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="transform transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex justify-center mx-auto items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    {service.icon}
                  </div>

                  <h3 className="mb-2 text-3xl font-bold dark:text-white">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-xl dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* #### PORTFOLIO SECTIONS #### */}
        <Reports />
        <Experience />
        <Projects />

        {/* #### ABOUT SECTION #### */}
        <section id="about" className="bg-white dark:bg-black pt-8">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-8 lg:px-6">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                About Me, Keshav
              </h2>

              <p className="mb-4 text-3xl">
                I've dedicated my career to finding the vulnerabilities that
                others miss. My journey began with CTF competitions and evolved
                into a full-time commitment to making digital spaces more
                secure.
              </p>

              <p className="text-xl">
                My approach combines creative problem-solving with rigorous
                methodology, ensuring no stone is left unturned in the pursuit
                of robust security.
              </p>

              <a
                href="#contact"
                className="inline-flex mt-8 items-center justify-center px-5 py-4 text-base font-medium text-center text-gray-900 border-4 border-green-300 hover:bg-green-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-green-700 dark:hover:bg-green-700 dark:focus:ring-gray-800"
              >
                Work With Me
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="w-full transition-all duration-300 hover:saturate-150 hover:brightness-75 hover:hue-rotate-15"
                src="/assets/images/office-long-2.png"
                alt="office content 1"
              />

              <img
                className="mt-4 w-full lg:mt-10 transition-all duration-300 hover:saturate-150 hover:brightness-75 hover:hue-rotate-15"
                src="/assets/images/office-long-1.png"
                alt="office content 2"
              />
            </div>
          </div>

          <div className="max-w-screen-xl px-4 pb-8 mx-auto text-center lg:pb-16 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>

              <blockquote className="transform transition-all duration-300 hover:scale-105">
                <p className="text-2xl font-medium py-8 text-gray-900 dark:text-white">
                  "Working with Keshav transformed our security posture
                  completely. His methodical approach to penetration testing
                  uncovered critical vulnerabilities that our internal team had
                  missed for months."
                </p>
              </blockquote>

              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full transition-opacity duration-300 hover:opacity-70"
                  src="/assets/images/michael-gouch.png"
                  alt="profile"
                />

                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white">
                    Confidential Client
                  </div>

                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    CEO at Confidential Client
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* #### CONTACT SECTION #### */}
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;