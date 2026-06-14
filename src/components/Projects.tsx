import React from "react";
import {
  projects,
  type ProjectItem,
  REPORTS_CONTACT_EMAIL,
} from "../data/portfolio";

type DisplayProject = ProjectItem & {
  locked?: boolean;
  summary?: string;
  description?: string;
  category?: string;
  tags?: string[];
  link?: string;
};

const icons: React.ReactNode[] = [
  <svg
    key="chip"
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
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7z"
    />
  </svg>,

  <svg
    key="code"
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
      d="M10 20l4-16M6 8L2 12l4 4m12-8l4 4-4 4"
    />
  </svg>,

  <svg
    key="library"
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
      d="M12 6.253v13M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
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
  const subject = encodeURIComponent(`Project Access Request: ${title}`);

  const body = encodeURIComponent(
    `Hi Keshav,\n\nI'm interested in getting access to / purchasing:\n"${title}"\n\nCould you share more details on pricing and access?\n\nThanks!`
  );

  return `mailto:${REPORTS_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

interface ProjectCardProps {
  project: DisplayProject;
  icon: React.ReactNode;
}

function ProjectCard({ project, icon }: ProjectCardProps) {
  const isLocked = Boolean(project.locked);
  const link = project.link || "#";
  const hasLink = link !== "#";

  const href = isLocked ? buildMailtoLink(project.title) : link;
  const opensExternally = !isLocked && hasLink && link.startsWith("http");

  const tags = Array.isArray(project.tags) ? project.tags : [];
  const summary = project.summary || project.description || "";

  return (
    <a
      href={href}
      target={opensExternally ? "_blank" : undefined}
      rel={opensExternally ? "noopener noreferrer" : undefined}
      onClick={(event) => {
        if (!isLocked && !hasLink) {
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
        {project.category && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-green-500/40 text-green-600 dark:text-green-400">
            {project.category}
          </span>
        )}

        {isLocked && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded border border-yellow-500/40 text-yellow-600 dark:text-yellow-400">
            Premium
          </span>
        )}
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {project.title}
      </h3>

      {summary && (
        <p className="mb-4 text-gray-500 dark:text-gray-400">{summary}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-auto mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <span
        className={
          isLocked
            ? "inline-flex items-center justify-center font-medium text-yellow-600 dark:text-yellow-500 group-hover:underline"
            : hasLink
              ? "inline-flex items-center justify-center font-medium text-green-600 dark:text-green-500 group-hover:underline"
              : "inline-flex items-center justify-center font-medium text-blue-600 dark:text-blue-500"
        }
      >
        {isLocked ? "Get Access" : hasLink ? "View Project" : "Coming Soon"}
        {(isLocked || hasLink) && arrowIcon}
      </span>
    </a>
  );
}

const Projects: React.FC = () => {
  const projectItems = Array.isArray(projects) ? projects : [];

  return (
    <section id="projects" className="bg-white dark:bg-black">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16 mx-auto text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Projects
          </h2>

          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Tools, labs, and automation built around offensive security,
            detection engineering, and AI-assisted workflows.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projectItems.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              icon={icons[idx % icons.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;