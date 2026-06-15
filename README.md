# Keshav Cyber Portfolio

A modern cybersecurity portfolio website built to showcase projects, technical skills, certifications, experience, and contact information in a clean, responsive interface.

## Overview

This portfolio is designed for cybersecurity professionals, students, and enthusiasts who want to present their work online. It can be customized with personal details, security projects, write-ups, achievements, and links to GitHub, LinkedIn, TryHackMe, Hack The Box, or other platforms.

## Features

- Responsive design for desktop, tablet, and mobile
- Clean portfolio layout for cybersecurity-focused content
- Sections for About, Skills, Projects, Experience, Certifications, and Contact
- Easy customization through the source files
- Tailwind CSS styling
- Vite-based development workflow
- TypeScript support

## Tech Stack

- Vite
- TypeScript
- Tailwind CSS
- PostCSS
- HTML
- ESLint
- Prettier

## Project Structure

```text
Keshav-Cyber-Portfolio/
├── public/                 # Static assets
├── src/                    # Main source code
├── index.html              # App entry HTML file
├── package.json            # Project scripts and dependencies
├── package-lock.json       # Dependency lock file
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # Node TypeScript configuration
├── vite.config.ts          # Vite configuration
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignored files
├── LICENSE                 # Project license
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone https://github.com/leshav8485/Keshav-Cyber-Portfolio.git
cd Keshav-Cyber-Portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in your terminal.

## Available Scripts

```bash
npm run dev
```

Runs the project locally in development mode.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs linting checks if configured in `package.json`.

## Customization

Update the content inside the `src` directory to personalize the portfolio. Common items to customize include:

- Name and headline
- About section
- Skills and tools
- Projects and descriptions
- Certifications
- Resume link
- Contact details
- Social profile links

Static images, icons, resumes, or other files can be placed in the `public` directory.

## Deployment

This project can be deployed on platforms such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

A typical production build command is:

```bash
npm run build
```

The output folder is usually:

```text
dist/
```

Upload or connect this build output to your hosting provider.

## Recommended Portfolio Sections

- Hero section with name, role, and call-to-action buttons
- About section describing cybersecurity interests and background
- Skills section for tools, languages, frameworks, and security domains
- Projects section with links to GitHub repositories or live demos
- Certifications section for completed credentials
- Contact section with email and professional profiles

## License

This project includes a `LICENSE` file. Review it before using, modifying, or distributing the project.

## Author

**Keshav**

Cybersecurity portfolio project maintained by Keshav.
