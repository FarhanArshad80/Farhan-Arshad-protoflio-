import { Skill, Project, Experience, Education, Certification, Testimonial } from '../types';

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Farhan Arshad',
    title: 'Full-Stack MERN Engineer',
    tagline: 'Building high-performance MERN web apps and backend microservices that scale your business revenue.',
    bio: 'I am a Full-Stack Engineer focused on building fast, maintainable, and production-ready web applications. My core expertise spans React, Node.js, Express, and MongoDB, along with building scalable microservices using NestJS.',
    bioSecondary: 'I bridge the gap between clean frontend interfaces and solid backend architecture. Whether it\'s building a complete web application from scratch, optimizing database performance, or integrating third-party APIs, I deliver reliable code that scales smoothly as your business grows.',
    location: 'Lahore, Pakistan (Available Remote Worldwide)',
    email: 'farhanarshad15926@gmail.com',
    phone: '0326 4082349',
    whatsapp: 'https://wa.me/923264082349',
    github: 'https://github.com/FarhanArshad80',
    linkedin: 'https://www.linkedin.com/in/farhan-arshad-aa5991370/',
    twitter: 'https://twitter.com/farhanarshad_dev',
    resumeUrl: '#resume',
    availability: 'Open for Select Contracts, Hire Me & Full-Time Roles',
    timeZone: 'PKT (UTC+5)',
  },
  stats: [
    { label: 'Year Experience', value: '1+', suffix: '' },
    { label: 'Projects', value: '10+', suffix: '' },
    { label: 'Client Satisfaction', value: '95%', suffix: '' },
    { label: 'Network', value: '1K+', suffix: '' },
  ],
  skills: [
    { id: 'full-stack-web-development', name: 'Full-Stack Web Development', category: 'frontend', iconName: 'Code2', description: 'Building custom, end-to-end web applications tailored to your business needs. Focus on high performance, SEO optimization, intuitive design, and clean, scalable architecture from frontend to database.', techTags: ['React', 'Next.js', 'Node.js', 'MongoDB'] },
    { id: 'backend-microservices', name: 'Backend & Microservices Architecture', category: 'backend', iconName: 'Server', description: 'Designing secure RESTful APIs, microservices, and database systems that handle complex business logic. Built with optimized queries, reliable authentication, and zero-downtime maintenance.', techTags: ['NestJS', 'Express.js', 'MongoDB', 'REST APIs'] },
    { id: 'ui-performance', name: 'UI Refactoring & Performance Tuning', category: 'frontend', iconName: 'Gauge', description: 'Transforming slow or outdated web applications into fast, modern digital products. Improving page load speed, fixing layout responsiveness, and upgrading legacy codebases.', techTags: ['Tailwind CSS', 'TypeScript', 'Web Vitals', 'Refactoring'] },
    { id: 'api-integration', name: 'API Development & Integration', category: 'backend', iconName: 'Plug', description: 'Designing secure RESTful APIs with clean, modular architecture, JWT authentication, smooth third-party integrations, and structured Postman documentation.', techTags: ['REST APIs', 'Express', 'NestJS', 'JWT'] },
    { id: 'deployment-maintenance', name: 'Deployment & Maintenance', category: 'tools', iconName: 'Cloud', description: 'Setting up smooth web application hosting with environment configuration, SSL setup, zero-downtime deployment pipelines, and long-term bug fixing.', techTags: ['Vercel', 'Render', 'Netlify', 'Git/GitHub'] },
    { id: 'responsive-conversion-ui', name: 'Responsive UI & Conversion', category: 'frontend', iconName: 'MonitorSmartphone', description: 'Converting Figma designs into pixel-perfect, responsive web interfaces using Tailwind CSS with smooth animations, dark/light modes, and clean UX design.', techTags: ['Tailwind CSS', 'Framer Motion', 'Figma', 'HTML5/CSS3'] },
  ] as Skill[],

  projects: [
    {
      id: 'spend-wise',
      title: 'SpendWise — Personal Expense Tracker',
      subtitle: 'Full-stack finance app with budgets, recurring transactions, and spending analytics',
      category: 'fullstack',
      description: 'A personal finance platform where users track daily income and expenses, manage monthly and per-category budgets, automate recurring transactions, and receive configurable budget alerts.',
      longDescription: 'Built as a TypeScript pnpm monorepo with a React + Vite frontend, an Express 5 API server, and PostgreSQL via Drizzle ORM. API contracts live in a single OpenAPI spec that generates typed hooks and Zod schemas with Orval, so the client and server never drift apart. Authentication is handled by Clerk with cookie-based sessions.',
      keyFeatures: [
        'Dashboard with budget progress, income/expense summary, and spending charts',
        'Full transaction CRUD with search and filters by type, category, date range, and amount',
        'Overall monthly budget plus per-category budgets with live progress bars',
        'Monthly recurring transactions with manual trigger and active/inactive toggle',
        'Configurable budget alerts computed at query time from real transaction data',
        'Type-safe API layer generated from an OpenAPI spec via Orval and Zod'
      ],
      techStack: ['TypeScript', 'React', 'Vite', 'Express 5', 'PostgreSQL', 'Drizzle ORM', 'Tailwind CSS', 'Recharts', 'Zod', 'Clerk'],
      metrics: [
        { label: 'Workspace Packages', value: '6' },
        { label: 'App Pages', value: '8' },
        { label: 'Type Safety', value: '100%' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70',
      imageAlt: 'Budget paperwork, receipts, and a calculator laid out on a desk',
      githubUrl: 'https://github.com/FarhanArshad80/Spend-Wise',
      featured: true,
      architectureOverview: 'pnpm workspace monorepo: React + Vite client and Express 5 API server share an OpenAPI spec and Drizzle schema, backed by PostgreSQL with Clerk-managed auth.'
    },
    {
      id: 'task-manager',
      title: 'Task Manager — Productivity Workspace',
      subtitle: 'Multi-page React task app with dashboard, calendar, analytics, and progress views',
      category: 'fullstack',
      description: 'A React task management application for creating, organizing, and tracking work across a routed workspace with a dashboard, calendar planner, analytics, and progress tracking.',
      longDescription: 'Built with React 19 and React Router for client-side routing across dedicated pages, with global state handled through React Context. Styled with Tailwind CSS v4 and Lucide icons for a clean, responsive interface that works from mobile to desktop.',
      keyFeatures: [
        'Task CRUD with add, edit, delete, and completion tracking',
        'Routed multi-page workspace: Dashboard, Tasks, Calendar, Analytics, Progress',
        'Calendar view for scheduling and planning tasks by date',
        'Analytics and progress pages that visualize completion trends',
        'Shared state via React Context with a reusable UI component layer',
        'Fully responsive Tailwind CSS v4 layout with Lucide icon system'
      ],
      techStack: ['React 19', 'React Router', 'JavaScript', 'Vite', 'Tailwind CSS v4', 'Context API', 'Lucide React'],
      metrics: [
        { label: 'App Pages', value: '6' },
        { label: 'Bundle Tool', value: 'Vite' },
        { label: 'Responsive', value: '100%' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=70',
      imageAlt: 'Hand ticking off items on a handwritten checklist in a notebook',
      githubUrl: 'https://github.com/FarhanArshad80/Task-Manger',
      featured: true,
      architectureOverview: 'React 19 SPA with React Router page routing, Context API state, and a layered components structure split into layout, UI, and data modules.'
    },
    {
      id: 'habit-tracker',
      title: 'Constellation — Habit Tracker',
      subtitle: 'Streak tracker where every completed ritual lights up a point in a 14-day trail',
      category: 'fullstack',
      description: 'A habit tracking app that turns streaks into a visible constellation: each completed ritual lights up a star, and a connected trail shows your current run across the last 14 days.',
      longDescription: 'Built with React 19 and Vite, fully client-side with localStorage persistence so there is no backend or account required. Includes a Pomodoro-style focus timer that can automatically mark a linked habit complete when a session finishes, plus a stats dashboard for completion rates and streaks.',
      keyFeatures: [
        'Add and delete habits with custom name, icon, color, and weekly goal',
        'One-tap check-in for today plus back-fill toggling for any of the last 14 days',
        'Constellation streak trail rendering current and best streaks per habit',
        'Stats dashboard: completion rate, best streak, active rituals, all-time check-ins',
        'Pomodoro focus timer with 5/15/25/45 minute presets linked to habits',
        'Offline-first localStorage persistence with no backend or sign-up needed'
      ],
      techStack: ['React 19', 'JavaScript', 'Vite', 'Tailwind CSS', 'localStorage', 'Lucide React'],
      metrics: [
        { label: 'Streak Window', value: '14 days' },
        { label: 'Timer Presets', value: '4' },
        { label: 'Backend Needed', value: 'None' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=70',
      imageAlt: 'Monthly planner open to a goals page beside a cup of coffee',
      githubUrl: 'https://github.com/FarhanArshad80/Habit-Tracker',
      featured: true,
      architectureOverview: 'Client-only React 19 SPA built with Vite; all habit and streak state is persisted to browser localStorage with accessible, reduced-motion-aware animations.'
    },
    {
      id: 'ai-image-generator',
      title: 'AI Image Generator',
      subtitle: 'Text-to-image studio with model, aspect ratio, and batch count controls',
      category: 'ai',
      description: 'A text-to-image generation tool that turns written prompts into AI artwork, with selectable models, aspect ratios, batch counts, and a built-in library of example prompts.',
      longDescription: 'Built in vanilla JavaScript against the Hugging Face inference API, with the API key supplied through environment variables rather than hardcoded. The interface includes a responsive gallery grid, a random example-prompt generator, and a light/dark theme that respects the system preference and persists the user choice.',
      keyFeatures: [
        'Prompt-to-image generation through the Hugging Face inference API',
        'Selectable AI model, image count, and aspect ratio per generation',
        'Responsive gallery grid with per-image loading states',
        'Ten built-in example prompts with a surprise-me randomizer',
        'Dark and light theme with system-preference detection and localStorage persistence',
        'API key loaded from environment variables, never committed to the repo'
      ],
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Hugging Face API', 'Vite', 'Font Awesome'],
      metrics: [
        { label: 'Example Prompts', value: '10' },
        { label: 'Aspect Ratios', value: '3' },
        { label: 'Dependencies', value: '0' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70',
      imageAlt: 'The letters AI rendered in blue over a field of glowing nodes',
      githubUrl: 'https://github.com/FarhanArshad80/AI-Image-Generator',
      featured: false,
      architectureOverview: 'Zero-dependency vanilla JS front end that posts prompts to the Hugging Face inference endpoint and renders returned images into a responsive gallery grid.'
    }
  ] as Project[],

  experiences: [
    {
      id: 'exp-1',
      role: 'Full-Stack Engineer',
      company: 'Independent Freelancer',
      location: 'Remote',
      period: '2025 – Present',
      description: 'Delivering end-to-end MERN stack web platforms, custom REST APIs, and responsive web applications for international clients.',
      highlights: [
        'Architected and deployed production web applications using React, Express, Node.js, and MongoDB.',
        'Integrated payment gateways and authentication systems, and optimized databases for fast response times.'
      ],
      skills: ['React', 'Express', 'Node.js', 'MongoDB', 'REST APIs'],
      type: 'contract'
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'TechTide Corporate',
      location: 'Onsite',
      period: '2026',
      description: 'Engineering scalable web application modules, RESTful backend APIs, and collaborative frontend architectures.',
      highlights: [
        'Developed production-ready React components and integrated complex backend microservices.',
        'Optimized API endpoints and streamlined database queries within an agile engineering team.'
      ],
      skills: ['React', 'Node.js', 'NestJS', 'REST APIs', 'MongoDB'],
      type: 'full-time'
    },
    {
      id: 'exp-3',
      role: 'Associate Software Engineer',
      company: 'Qalam Software / Engineering Program',
      location: 'Onsite',
      period: '2025',
      description: 'Focused on modern web application architecture, database management, and clean code principles.',
      highlights: [
        'Built full-stack web modules using JavaScript toolchains, REST APIs, and structured database designs.'
      ],
      skills: ['JavaScript', 'React', 'REST APIs', 'MongoDB'],
      type: 'full-time'
    }
  ] as Experience[],

  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of Engineering & Technology (UET)',
      period: '2019 - 2023',
      details: 'Focused on Software Engineering, Web Technologies, Database Systems, Data Structures & Algorithms, and Distributed Computing.',
      badges: ['Web Technologies', 'Software Architecture', 'Database Systems']
    }
  ] as Education[],

  certifications: [
    {
      id: 'cert-1',
      title: 'Full Stack MERN Web Development Master Certification',
      issuer: 'Meta / Coursera',
      date: '2023',
      credentialId: 'MERN-CERT-99412'
    },
    {
      id: 'cert-2',
      title: 'Node.js & Express API Development Certification',
      issuer: 'OpenJS Foundation',
      date: '2023',
      credentialId: 'NODE-JS-88231'
    },
    {
      id: 'cert-3',
      title: 'NestJS Enterprise Applications & Architecture',
      issuer: 'NestJS Official Academy',
      date: '2022',
      credentialId: 'NEST-ARCH-44120'
    }
  ] as Certification[],

  testimonials: [
    {
      id: 'test-1',
      name: 'Usman Ali',
      role: 'CTO & Product Lead',
      company: 'TechCraft Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      content: 'Farhan is an exceptional MERN stack engineer. He writes super clean, well-tested TypeScript code and builds frontend UIs that look sleek and load lightning fast. Highly recommended!',
      rating: 5
    },
    {
      id: 'test-2',
      name: 'Sophia Reynolds',
      role: 'Founder',
      company: 'TaskFlow SaaS',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      content: 'Working with Farhan on our NestJS backend and React frontend was standard-setting. He delivered ahead of deadline and handled all our deployment and maintenance setup seamlessly.',
      rating: 5
    },
    {
      id: 'test-3',
      name: 'Hamza Khan',
      role: 'Engineering Manager',
      company: 'InnoTech Labs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      content: 'Farhan possesses an in-depth understanding of MongoDB performance tuning and Express REST design. He is proactive, super reliable, and a great communicator.',
      rating: 5
    }
  ] as Testimonial[]
};
