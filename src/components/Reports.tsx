import React from "react";
import { reports, REPORTS_CONTACT_EMAIL, type ReportItem } from "../data/portfolio";

const icons: React.ReactNode[] = [
  <svg
    key="terminal"
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
      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>,
  <svg
    key="document"
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
      d="M9 12h6m-6 4h6M9 8h1m5 12H7a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V18a2 2 0 01-2 2z"
    />
  </svg>,
  <svg
    key="server"
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
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2M7 8h.01M7 16h.01"
    />
  </svg>,
];

const lockIcon = (
  <svg
    className="w-6 h-6 text-yellow-500"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z"
    />
  </svg>
);

const arrowIcon = (
  <svg
    className="ml-2 w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

function buildMailtoLink(title: string): string {
  const subject = encodeURIComponent(`Report Access Request: ${title}`);
  const body = encodeURIComponent(
    `Hi Keshav,\n\nI'd like to request access to the redacted/sample version of:\n"${title}"\n\nThanks!`
  );

  return `mailto:${REPORTS_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

interface ReportCardProps {
  report: ReportItem;
  icon: React.ReactNode;
}

function ReportCard({ report, icon }: ReportCardProps) {
  const isLocked = Boolean(report.locked);
  const isComingSoon = Boolean(report.comingSoon);

  const href = isComingSoon
    ? "#"
    : isLocked
      ? buildMailtoLink(report.title)
      : report.link || "#";

  const opensExternally = !isLocked && !isComingSoon && report.link && report.link !== "#";

  return (
    <a
      href={href}
      target={opensExternally ? "_blank" : undefined}
      rel={opensExternally ? "noopener noreferrer" : undefined}
      aria-disabled={isComingSoon ? true : undefined}
      onClick={(event) => {
        if (isComingSoon) {
          event.preventDefault();
        }
      }}
      className="group flex flex-col p-6 text-center bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm hover:shadow-lg dark:hover:shadow-green-900/30 hover:border-green-500 hover:scale-105 transition-all duration-300"
    >
      <div
        className={
          isLocked
            ? "flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-50 dark:bg-yellow-900/20 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/30 transition-colors duration-300"
            : "flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors duration-300"
        }
      >
        {isLocked ? lockIcon : icon}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-3">
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-green-500/40 text-green-600 dark:text-green-400">
          {report.type}
        </span>

        <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
          {report.level}
        </span>

        {isLocked && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-yellow-500/40 text-yellow-600 dark:text-yellow-400">
            Confidential
          </span>
        )}

        {isComingSoon && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-500/40 text-blue-600 dark:text-blue-400">
            Coming Soon
          </span>
        )}
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {report.title}
      </h3>

      <p className="mb-4 text-gray-500 dark:text-gray-400">
        {report.summary}
      </p>

      <div className="flex flex-wrap justify-center gap-2 mt-auto mb-4">
        {report.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <span
        className={
          isLocked
            ? "inline-flex items-center justify-center font-medium text-yellow-600 dark:text-yellow-500 group-hover:underline"
            : isComingSoon
              ? "inline-flex items-center justify-center font-medium text-blue-600 dark:text-blue-500"
              : "inline-flex items-center justify-center font-medium text-green-600 dark:text-green-500 group-hover:underline"
        }
      >
        {isLocked ? "Request Access" : isComingSoon ? "Coming Soon" : "View Report"}
        {!isComingSoon && arrowIcon}
      </span>
    </a>
  );
}

const Reports: React.FC = () => {
  return (
    <section id="reports" className="bg-white dark:bg-black">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16 mx-auto text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Reports
          </h2>

          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Write-ups, walkthroughs, benchmark reports, and confidential client
            assessment summaries.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, idx) => (
            <ReportCard
              key={report.title}
              report={report}
              icon={icons[idx % icons.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reports;