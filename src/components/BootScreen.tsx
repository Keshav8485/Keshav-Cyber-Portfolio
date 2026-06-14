// BootScreen.tsx
import React, { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

interface BootLine {
  tag: string;
  text: string;
  status?: "OK" | "READY" | "WARN";
}

const BOOT_LINES: BootLine[] = [
  { tag: "[SYSTEM]", text: "Initializing secure environment..." },
  { tag: "[BOOT]", text: "Loading core modules" },
  { tag: "[INIT]", text: "Mounting file systems", status: "OK" },
  { tag: "[SCAN]", text: "Checking open ports", status: "OK" },
  { tag: "[WARN]", text: "Unauthorized access attempts blocked", status: "WARN" },
  { tag: "[EXEC]", text: "Loading portfolio.sh" },
  { tag: "[AUTH]", text: "Verifying access credentials", status: "OK" },
  { tag: "[DONE]", text: "System ready", status: "READY" },
];

const ASCII_ART = `  _  __         _                 
 | |/ /___  ___| |__   __ ___   __
 | ' // _ \\/ __| '_ \\ / _\` \\ \\ / /
 | . \\  __/\\__ \\ | | | (_| |\\ V / 
 |_|\\_\\___||___/_| |_|\\__,_| \\_/`;

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Reveal boot lines one at a time
  useEffect(() => {
    if (visibleLines >= BOOT_LINES.length) return;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 180);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 2));
    }, 28);
    return () => clearInterval(interval);
  }, []);

  // Trigger the fade-out once everything has loaded
  useEffect(() => {
    if (progress >= 100 && visibleLines >= BOOT_LINES.length && !exiting) {
      const exitTimer = setTimeout(() => setExiting(true), 350);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, visibleLines, exiting]);

  // Once exiting starts: unlock the page immediately (the overlay is
  // already opacity-0 + pointer-events-none at this point), then fully
  // remove the overlay from the DOM once the fade transition finishes.
  useEffect(() => {
    if (!exiting) return;

    onComplete();

    const removeTimer = setTimeout(() => setRemoved(true), 500);
    return () => clearTimeout(removeTimer);
  }, [exiting, onComplete]);

  // Allow skipping with any key press or click
  useEffect(() => {
    const skip = () => {
      if (!exiting) {
        setExiting(true);
      }
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, [exiting]);

  if (removed) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black px-4 font-mono transition-opacity duration-500 ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* scanline overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
        <div className="boot-scanline absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-green-400 to-transparent" />
      </div>

      <div className="relative w-full max-w-xl">
        <pre className="text-green-500 text-[7px] sm:text-xs leading-tight overflow-x-auto mb-6 text-center sm:text-left">
          {ASCII_ART}
        </pre>

        <div className="space-y-1.5 mb-6 min-h-[180px] sm:min-h-[210px]">
          {BOOT_LINES.slice(0, visibleLines).map((line) => (
            <p key={line.tag + line.text} className="text-xs sm:text-sm text-gray-400">
              <span className="text-green-500">{line.tag}</span>{" "}
              <span>{line.text}</span>
              {line.status === "OK" && (
                <span className="ml-2 text-green-500">[OK]</span>
              )}
              {line.status === "READY" && (
                <span className="ml-2 text-green-400 font-bold">[READY]</span>
              )}
              {line.status === "WARN" && (
                <span className="ml-2 text-yellow-500">[WARN]</span>
              )}
            </p>
          ))}
        </div>

        <div className="h-1.5 w-full rounded-full bg-gray-900 border border-gray-800 overflow-hidden mb-3">
          <div
            className="h-full bg-green-500 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
          <span>booting system — {progress}%</span>
          <span className="hidden sm:inline-flex items-center">
            press any key to continue
            <span className="inline-block w-[6px] h-3 bg-green-500 ml-1 boot-blink" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes boot-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .boot-scanline {
          animation: boot-scan 4s linear infinite;
        }
        @keyframes boot-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .boot-blink {
          animation: boot-blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default BootScreen;