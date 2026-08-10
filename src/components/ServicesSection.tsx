import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Brain, Plug, Cloud, Paintbrush } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SERVICES_LIST = [
  'Web Development', 'Mobile App Development', 'AI Solutions',
  'API Development', 'Cloud Deployment', 'UI/UX Design',
];

const SERVICES = [
  { id: 'web-dev', title: 'Web Development', icon: Globe, description: 'Full-stack MERN web applications with React frontends, Node.js/NestJS APIs, and MongoDB — built for performance, scalability, and long-term maintenance.', tags: ['React', 'Node.js', 'MongoDB', 'NestJS'] },
  { id: 'mobile-app', title: 'Mobile App Development', icon: Smartphone, description: 'Cross-platform mobile apps using React Native, with smooth UX, API integration, push notifications, and App Store / Play Store deployment.', tags: ['React Native', 'Expo', 'REST APIs'] },
  { id: 'ai-solutions', title: 'AI Solutions', icon: Brain, description: 'AI-powered features and integrations — chatbots, recommendation engines, content generation, and OpenAI / Gemini API embedding in your product.', tags: ['OpenAI', 'Gemini', 'LangChain', 'NLP'] },
  { id: 'api-dev', title: 'API Development', icon: Plug, description: 'Production-ready REST and GraphQL APIs with clean architecture, JWT authentication, Swagger docs, rate limiting, and full test coverage.', tags: ['REST', 'GraphQL', 'Swagger', 'JWT'] },
  { id: 'cloud-deployment', title: 'Cloud Deployment', icon: Cloud, description: 'End-to-end DevOps — Docker containerisation, CI/CD pipelines, Vercel / Render / AWS deployments, environment configuration, and ongoing monitoring.', tags: ['Docker', 'AWS', 'Vercel', 'CI/CD'] },
  { id: 'ui-ux', title: 'UI/UX Design', icon: Paintbrush, description: 'Pixel-perfect, responsive interfaces with Tailwind CSS, Figma-to-code conversions, smooth animations, dark/light modes, and accessibility best practices.', tags: ['Tailwind CSS', 'Figma', 'Framer Motion'] },
];

export const ServicesSection: React.FC = () => {
  const { currentTheme, setHireMeModalOpen } = useTheme();

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#f5f0e6]/15" />
            <span className="text-xs font-mono text-[#5a5650] tracking-widest uppercase">What I Offer</span>
            <div className="h-px w-8 bg-[#f5f0e6]/15" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f5f0e6]">
            Services & <span className={`bg-gradient-to-r ${currentTheme.gradientClass} bg-clip-text text-transparent`}>Expertise</span>
          </h2>
          <p className="text-[#8a8680] text-base sm:text-lg">End-to-end software solutions tailored to your business — from ideation and design to deployment and ongoing maintenance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }} whileHover={{ y: -5 }}
                className="group relative flex flex-col p-6 rounded-3xl bg-[#161616] border border-[#f5f0e6]/[0.07] hover:border-[#b7f34a]/30 transition-all duration-300 shadow-lg hover:shadow-[#b7f34a]/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#b7f34a] flex items-center justify-center mb-5 shadow-lg shadow-[#b7f34a]/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#0d0d0d]" />
                </div>
                <h3 className="text-lg font-bold text-[#f5f0e6] mb-2">{service.title}</h3>
                <p className="text-sm text-[#8a8680] leading-relaxed flex-1">{service.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#f5f0e6]/[0.07]">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-md bg-[#0d0d0d] border border-[#f5f0e6]/[0.07] text-[10px] font-mono text-[#8a8680]">{tag}</span>
                  ))}
                </div>
                <button onClick={() => setHireMeModalOpen(true, service.title)}
                  className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold text-[#0d0d0d] bg-[#b7f34a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                >
                  Select This Service →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
