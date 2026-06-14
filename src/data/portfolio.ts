// ============================
// Reports
// ============================

export interface ReportItem {
  title: string;
  type: string;
  level: string;
  summary: string;
  tags: string[];
  link: string;
  locked?: boolean;
  comingSoon?: boolean;
}

export interface ReportStat {
  value: string;
  label: string;
}

export const REPORTS_CONTACT_EMAIL = "keshavkacholiya007@gmail.com";

export const reportStats: ReportStat[] = [
  { value: "104+", label: "XBOW Benchmark Reports" },
  { value: "10+", label: "HTB / THM Walkthroughs" },
  { value: "10+", label: "Client Pentest Engagements" },
];

export const reports: ReportItem[] = [
  {
    title: "HackTheBox Era Walkthrough",
    type: "HTB / Linux Privilege Escalation",
    level: "Advanced",
    summary:
      "A professional walkthrough covering enumeration, IDOR discovery, credential recovery, SSRF-based access, and Linux privilege escalation on Era.",
    tags: ["HackTheBox", "Linux", "IDOR", "SSRF", "Privilege Escalation"],
    link: "/reports/era.html",
  },
  {
    title: "HTB Write-up: DarkZero",
    type: "HTB / Windows Active Directory",
    level: "Hard",
    summary:
      "A professional walkthrough exploiting a hard-rated Windows Active Directory machine, abusing a multihomed DNS configuration and a misconfigured linked server to enable xp_cmdshell and escalate via Meterpreter.",
    tags: [
      "HackTheBox",
      "Active Directory",
      "Windows",
      "xp_cmdshell",
      "Privilege Escalation",
    ],
    link: "/reports/darkzero.html",
  },
  {
    title: "TryHackMe: Brooklyn Nine Nine",
    type: "TryHackMe / Linux",
    level: "Beginner",
    summary:
      "A TryHackMe room focused on enumeration, web foothold discovery, and privilege escalation fundamentals on a Linux target.",
    tags: ["TryHackMe", "Linux", "Enumeration", "Privilege Escalation"],
    link: "/reports/brrokylyn.html",
  },
  {
    title: "XBOW Report 028-24: Encoder64 Blog",
    type: "XBOW Benchmark / Web App",
    level: "Professional",
    summary:
      "Demo report 1 of 104 XBOW benchmark assessments. Covers an insecure file upload in the Encoder64 Blog application that allowed uploading a malicious PHP shell, with null-byte testing used to confirm execution and retrieve the flag.",
    tags: ["XBOW", "File Upload", "RCE", "PHP", "Reporting"],
    link: "/reports/report-028-24.pdf",
  },
  {
    title: "Client Web Application Pentest Reports",
    type: "Client Engagement",
    level: "Professional",
    summary:
      "Engagement reports for real client web applications, including scoping, methodology, findings, risk ratings, and remediation steps. Confidential — redacted copies available under NDA.",
    tags: ["Web App Pentest", "Reporting", "Risk Rating", "Remediation"],
    link: "#",
    locked: true,
  },
];

// ============================
// Experience
// ============================

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
  stack?: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Founding Engineer – Pentesting & AI Automation",
    company: "Fenrir Security",
    period: "Aug 2025 – Present",
    points: [
      "Conducted web application pentests on client targets and practice labs.",
      "Documented 104 structured vulnerability reports mapped to XBOW benchmarks.",
      "Built an agentic AI pipeline for recon, scan orchestration, and report generation.",
      "Analyzed HTTP traffic, headers, and server logs to trace root causes and validate fixes.",
    ],
    stack: ["Burp Suite", "Nmap", "Python", "LLM APIs", "Linux"],
  },
  {
    role: "Cybersecurity Engineer",
    company: "Network Intelligence India",
    period: "Jul 2024 – Dec 2024",
    points: [
      "Monitored logs and correlated security events across multiple sources.",
      "Supported root cause analysis for suspicious login activity and intrusion indicators.",
      "Helped refine alerting rules, reduce false positives, and document incident findings.",
    ],
    stack: ["SIEM", "Log Analysis", "Linux"],
  },
];

// ============================
// Projects
// ============================

export interface ProjectItem {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  link: string;
  locked?: boolean;
}

// TODO: set this to your actual deployed portfolio URL
// (e.g. "https://yourname.dev" or "https://hak3r.getcyber.me")
export const PORTFOLIO_SITE_URL = "/";

export const projects: ProjectItem[] = [
  {
    title: "AI-Powered Penetration Testing Agent",
    category: "AI Automation",
    summary:
      "An end-to-end agentic pentesting pipeline that takes a target from initial recon through scanning, exploitation attempts, and final structured report generation — orchestrated by LLM-driven decision making at each stage.",
    tags: ["Python", "LLM APIs", "Nmap", "Burp Suite", "Automated Reporting", "Bash"],
    link: "#",
    locked: true,
  },
  {
    title: "Cybersecurity Portfolio",
    category: "Portfolio",
    summary:
      "A personal cybersecurity portfolio showcasing reports, write-ups, projects, and professional security work, built with a dark hacker-themed UI.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    link: PORTFOLIO_SITE_URL,
  },
  {
    title: "Security Reports Library",
    category: "Security",
    summary:
      "A collection of professional reports and walkthroughs covering web application testing, CTF machines, and benchmark assessments, with HTML and PDF report support.",
    tags: ["Reporting", "Pentesting", "Web Security"],
    link: "#",
    locked: true,
  },
];

// ============================
// Misc (skills / services)
// ============================

export const skills: string[] = [
  "Web Application Security",
  "Penetration Testing",
  "Burp Suite",
  "Nmap",
  "Linux",
  "Active Directory",
  "Python",
  "Reporting",
];

export const services = [
  {
    title: "Web Application Pentesting",
    description:
      "Security testing for web applications, APIs, authentication flows, and common vulnerability classes.",
  },
  {
    title: "Security Reporting",
    description:
      "Professional reports with clear findings, risk ratings, evidence, impact, and remediation guidance.",
  },
  {
    title: "CTF and Lab Write-ups",
    description:
      "Structured walkthroughs for HackTheBox, TryHackMe, and benchmark-style security labs.",
  },
];

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

// TODO: replace these with your real profiles
export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Email",
    value: REPORTS_CONTACT_EMAIL,
    href: `mailto:${REPORTS_CONTACT_EMAIL}`,
  },
  {
    label: "GitHub",
    value: "github.com/Keshav8485",
    href: "https://github.com/Keshav8485",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/keshav-kacholiya",
    href: "https://www.linkedin.com/in/keshav-kacholiya-b7559a246/",
  },
  {
    label: "Instagram",
    value: "@keshavkacholiya",
    href: "https://www.instagram.com/keshavkacholiya",
  },
];