import { Skill, Project, Experience, Education, Certification, Testimonial } from '../types';

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Farhan Arshad',
    title: 'Full Stack Developer | MERN & NestJS Specialist',
    tagline: 'Crafting high-performance MERN stack web applications, scalable NestJS microservices, and elegant user interfaces.',
    bio: 'Full Stack Developer with deep expertise in React, NestJS, MongoDB, Express, and Node.js. Specialized in architecting robust RESTful APIs, modern reactive frontends, clean database schemas, version control via Git & GitHub, cloud deployments, automated testing, and long-term code maintenance.',
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
    { label: 'Years Experience', value: '3+', suffix: '' },
    { label: 'Completed Projects', value: '30+', suffix: '' },
    { label: 'Client Satisfaction', value: '100%', suffix: '' },
    { label: 'GitHub Commits', value: '2.4k+', suffix: '' },
  ],
  skills: [
    // Frontend
    { id: 'react', name: 'React.js & Next.js', category: 'frontend', proficiency: 96, yearsOfExp: 3, iconName: 'Code2', description: 'Hooks, Redux Toolkit, Context API, SSR, performance optimization', featured: true },
    { id: 'typescript', name: 'TypeScript & JS (ES6+)', category: 'frontend', proficiency: 92, yearsOfExp: 3, iconName: 'FileCode', description: 'Strict typing, modern async/await patterns, clean modular code', featured: true },
    { id: 'tailwind', name: 'Tailwind CSS & UI Design', category: 'frontend', proficiency: 98, yearsOfExp: 3, iconName: 'Palette', description: 'Responsive fluid layouts, glassmorphism, animations, dark mode', featured: true },
    { id: 'framer', name: 'Motion / Animations', category: 'frontend', proficiency: 90, yearsOfExp: 2, iconName: 'Sparkles', description: 'Card 3D tilt, gesture interactions, page reveal triggers', featured: true },

    // Backend
    { id: 'nodejs', name: 'Node.js & Express.js', category: 'backend', proficiency: 95, yearsOfExp: 3, iconName: 'Server', description: 'Event loop architecture, REST API design, middleware pipeline', featured: true },
    { id: 'nestjs', name: 'NestJS Framework', category: 'backend', proficiency: 92, yearsOfExp: 2, iconName: 'Boxes', description: 'Enterprise TypeScript backend, dependency injection, modules', featured: true },
    { id: 'auth', name: 'Auth & Security (JWT, OAuth)', category: 'backend', proficiency: 94, yearsOfExp: 3, iconName: 'ShieldCheck', description: 'Bcrypt hashing, JWT access/refresh tokens, CORS, rate limiting', featured: true },
    { id: 'websockets', name: 'WebSockets & Socket.io', category: 'backend', proficiency: 88, yearsOfExp: 2, iconName: 'Zap', description: 'Real-time bidirectional messaging, live status, notifications', featured: false },

    // Database
    { id: 'mongodb', name: 'MongoDB & Mongoose', category: 'database', proficiency: 96, yearsOfExp: 3, iconName: 'HardDrive', description: 'Schema modeling, indexing, aggregation pipelines, transaction support', featured: true },
    { id: 'postgresql', name: 'PostgreSQL & SQL', category: 'database', proficiency: 88, yearsOfExp: 2, iconName: 'Database', description: 'Relational queries, foreign keys, Prisma/Sequelize ORMs', featured: true },
    { id: 'redis', name: 'Redis Caching', category: 'database', proficiency: 85, yearsOfExp: 2, iconName: 'Layers', description: 'Session management, high-speed API caching, rate limiting', featured: false },

    // Tools, Deployment, Testing & Maintenance
    { id: 'git', name: 'Git & GitHub', category: 'tools', proficiency: 96, yearsOfExp: 3, iconName: 'GitBranch', description: 'Branching strategies, PR code reviews, merge conflict resolution', featured: true },
    { id: 'deployments', name: 'Deployments & Cloud Hosting', category: 'tools', proficiency: 92, yearsOfExp: 3, iconName: 'Cloud', description: 'Vercel, Render, Netlify, Docker containerization, AWS S3', featured: true },
    { id: 'testing', name: 'Testing & Postman', category: 'tools', proficiency: 90, yearsOfExp: 3, iconName: 'CheckCircle', description: 'Jest unit tests, API integration tests with Postman suites', featured: true },
    { id: 'maintenance', name: 'Code Maintenance & Optimization', category: 'tools', proficiency: 94, yearsOfExp: 3, iconName: 'Wrench', description: 'Refactoring, bug fixes, database query tuning, security patches', featured: true },
  ] as Skill[],

  projects: [
    {
      id: 'nexus-mern-ecommerce',
      title: 'MERN Stack Omnichannel E-Commerce Platform',
      subtitle: 'Full-featured online store with React, Node.js, Express, MongoDB, and Stripe',
      category: 'fullstack',
      description: 'A comprehensive full-stack e-commerce engine with real-time inventory deduction, guest & user checkout, JWT authentication, Stripe payment processing, and an admin analytics portal.',
      longDescription: 'Built with React 19 and Tailwind CSS on the frontend and Express + MongoDB Mongoose on the backend. Includes advanced search filters, shopping cart persistence, invoice generation, and responsive mobile design.',
      keyFeatures: [
        'Secure JWT authentication & role-based admin controls',
        'Stripe payment gateway integration with webhooks',
        'Optimized MongoDB aggregation pipelines for fast search & category filtering',
        'Order tracking system with automated status updates',
        'Responsive dashboard with real-time sales visualizer'
      ],
      techStack: ['React 19', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Stripe API'],
      metrics: [
        { label: 'Page Load Speed', value: '0.8s' },
        { label: 'API Latency', value: '< 35ms' },
        { label: 'Test Coverage', value: '92%' }
      ],
      liveUrl: 'https://nexus-store.example.com',
      githubUrl: 'https://github.com/farhanarshad-dev/mern-ecommerce-suite',
      featured: true,
      architectureOverview: 'React frontend consumes Express REST endpoints protected by JWT middleware with MongoDB Atlas cloud database.',
      codeSnippet: {
        filename: 'productController.ts',
        language: 'typescript',
        code: `import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getFilteredProducts = async (req: Request, res: Response) => {
  const { category, search, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
  const query: any = {};

  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  if (minPrice || maxPrice) query.price = { $gte: Number(minPrice) || 0, $lte: Number(maxPrice) || 10000 };

  const products = await Product.find(query)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);
  res.json({ success: true, data: products, total, page: Number(page) });
};`
      }
    },
    {
      id: 'taskflow-nestjs-saas',
      title: 'TaskFlow NestJS Project & Sprint Manager',
      subtitle: 'Enterprise project workspace powered by NestJS microservices and React',
      category: 'saas',
      description: 'A multi-tenant project management SaaS with Kanban boards, sprint burndown charts, team permissions, and real-time activity feeds via WebSockets.',
      longDescription: 'Engineered using NestJS for strict dependency injection and modular design, paired with MongoDB for dynamic document structures and React for smooth drag-and-drop board interactions.',
      keyFeatures: [
        'NestJS modular architecture with Custom Decorators & Guards',
        'Drag-and-drop Kanban task boards with custom status columns',
        'Real-time team notification system using Socket.io',
        'Detailed PDF report exporter and CSV project data dump'
      ],
      techStack: ['NestJS', 'React', 'MongoDB', 'TypeScript', 'Socket.io', 'Tailwind CSS'],
      metrics: [
        { label: 'Concurrent Users', value: '5k+' },
        { label: 'System Uptime', value: '99.9%' }
      ],
      liveUrl: 'https://taskflow.example.com',
      githubUrl: 'https://github.com/farhanarshad-dev/taskflow-nestjs-saas',
      featured: true,
      architectureOverview: 'NestJS REST & Gateway services with MongoDB Mongoose schemas, Guard-protected endpoints, and Vite React frontend.',
      codeSnippet: {
        filename: 'tasks.service.ts',
        language: 'typescript',
        code: `@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async updateTaskStatus(id: string, status: TaskStatus, userId: string): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { status, lastModifiedBy: userId },
      { new: true }
    );
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}`
      }
    },
    {
      id: 'realtime-chat-connect',
      title: 'Real-Time Team Workspace & Chat Hub',
      subtitle: 'Instant messaging app with room channels, file attachments, and user presence',
      category: 'fullstack',
      description: 'A full stack real-time communication platform built with React, Express, Node.js, and Socket.io featuring direct messages, group rooms, and unread badges.',
      longDescription: 'Created to demonstrate low-latency WebSocket communication. Features typing indicators, online/offline status badges, persistent chat histories in MongoDB, and media uploads.',
      keyFeatures: [
        'Instant Socket.io event triggers for instant message delivery',
        'MongoDB message storage with cursor pagination',
        'File attachment preview with drag-and-drop upload zone',
        'Dark & light mode themes with clean glassmorphism UI'
      ],
      techStack: ['React', 'Express.js', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      metrics: [
        { label: 'Delivery Latency', value: '< 15ms' },
        { label: 'Max Active Rooms', value: '1,000+' }
      ],
      liveUrl: 'https://chathub.example.com',
      githubUrl: 'https://github.com/farhanarshad-dev/realtime-chat-mern',
      featured: true
    },
    {
      id: 'rest-api-boilerplate',
      title: 'Production-Ready Express & NestJS API Boilerplate',
      subtitle: 'Secure, tested, and pre-configured REST API engine with authentication',
      category: 'fullstack',
      description: 'An open-source production starter kit for Node.js backends featuring JWT auth, rate limiting, Winston logging, Swagger API documentation, and Docker Compose.',
      longDescription: 'Designed to streamline backend setup for developers. Built with clean code practices, Jest unit tests, input validation using Zod/Joi, and Docker deployment configurations.',
      keyFeatures: [
        'Complete auth suite: Signup, Login, Password Reset, Email Verification',
        'Swagger / OpenAPI interactive UI documentation',
        'Automated CI/CD workflows with GitHub Actions',
        'Jest integration tests with 90%+ branch coverage'
      ],
      techStack: ['Node.js', 'Express.js', 'NestJS', 'MongoDB', 'Docker', 'Jest'],
      metrics: [
        { label: 'GitHub Stars', value: '450+' },
        { label: 'Downloads', value: '10k+' }
      ],
      liveUrl: 'https://api-docs.example.com',
      githubUrl: 'https://github.com/farhanarshad-dev/node-express-backend-boilerplate',
      featured: false
    }
  ] as Project[],

  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Full Stack Developer (MERN Stack)',
      company: 'TechCraft Software Solutions',
      location: 'Lahore, PK (Hybrid / Remote)',
      period: '2023 - Present',
      description: 'Lead engineer developing high-scale web applications, REST APIs, and client platforms. Responsible for backend architecture in Node.js/NestJS and reactive frontends in React.',
      highlights: [
        'Architected and deployed 15+ custom MERN stack applications for international clients with 99.9% uptime.',
        'Engineered NestJS backend APIs reducing response times by 40% through MongoDB indexing and Redis caching.',
        'Established automated CI/CD deployment pipelines on Vercel and Docker servers via GitHub Actions.',
        'Maintained and refactored legacy codebases to improve maintainability, speed, and test coverage.'
      ],
      skills: ['React', 'Node.js', 'Express.js', 'NestJS', 'MongoDB', 'TypeScript', 'Git & GitHub'],
      type: 'full-time'
    },
    {
      id: 'exp-2',
      role: 'Full Stack Web Engineer',
      company: 'InnoTech Systems',
      location: 'Lahore, PK',
      period: '2022 - 2023',
      description: 'Engineered responsive web interfaces and Express REST microservices. Worked directly with client product managers to implement core business features.',
      highlights: [
        'Developed interactive React dashboards with real-time charts and data tables.',
        'Integrated third-party payment gateways (Stripe, PayPal) and RESTful third-party APIs.',
        'Performed unit & integration testing using Jest and Postman, ensuring zero critical production bugs.'
      ],
      skills: ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      type: 'full-time'
    },
    {
      id: 'exp-3',
      role: 'Freelance MERN Developer & Consultant',
      company: 'Upwork & Independent Clients',
      location: 'Remote',
      period: '2021 - 2022',
      description: 'Built custom websites, SaaS MVPs, e-commerce stores, and custom REST API integrations for startups and small businesses worldwide.',
      highlights: [
        'Successfully completed 20+ freelance contracts with 5-star ratings across web development.',
        'Helped clients optimize existing web app performance, fix database bottlenecks, and set up continuous deployments.',
        'Provided ongoing monthly technical support, security patching, and app maintenance.'
      ],
      skills: ['MERN Stack', 'React', 'Express', 'MongoDB', 'Git', 'Deployments'],
      type: 'contract'
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
