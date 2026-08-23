import { Skill, Project, Experience, Education, Certification, Testimonial } from '../types';

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Farhan Arshad',
    title: 'Full-Stack MERN Engineer',
    tagline: 'Building high-performance MERN web apps and backend microservices that scale your business revenue.',
    bio: 'I am a Full-Stack Web Developer focused on building fast, maintainable, and production-ready web applications. My core expertise spans React, Node.js, Express, and MongoDB, along with building scalable microservices using NestJS.',
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
      role: 'Full-Stack Web Developer',
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
      location: 'Remote',
      period: '2026 – Present',
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
      location: 'Remote',
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
