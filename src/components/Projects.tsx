import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const projects = [
    {
      title: 'E-Commerce платформа',
      description: 'Полнофункциональная платформа электронной коммерции с системой платежей, управлением заказами и административной панелью.',
      technologies: ['Django', 'React', 'PostgreSQL', 'Redis', 'Stripe'],
      gradient: 'from-cyan-500 to-blue-600',
      icon: '🛒',
    },
    {
      title: 'Система управления задачами',
      description: 'Веб-приложение для управления проектами и задачами с функционалом канбан-досок, уведомлениями в реальном времени.',
      technologies: ['FastAPI', 'TypeScript', 'PostgreSQL', 'WebSocket'],
      gradient: 'from-purple-500 to-pink-600',
      icon: '📋',
    },
    {
      title: 'Аналитическая панель',
      description: 'Интерактивная панель с визуализацией данных, графиками и отчетами для бизнес-аналитики.',
      technologies: ['Django', 'React', 'D3.js', 'Celery'],
      gradient: 'from-green-500 to-teal-600',
      icon: '📊',
    },
    {
      title: 'REST API сервис',
      description: 'Масштабируемый API сервис с аутентификацией, кэшированием и документацией Swagger.',
      technologies: ['Django REST', 'Redis', 'Docker', 'Nginx'],
      gradient: 'from-orange-500 to-red-600',
      icon: '🔌',
    },
    {
      title: 'Социальная сеть',
      description: 'Платформа социальных медиа с профилями пользователей, лентой новостей, чатом.',
      technologies: ['Django', 'React', 'PostgreSQL', 'WebSocket'],
      gradient: 'from-blue-500 to-indigo-600',
      icon: '💬',
    },
    {
      title: 'Система бронирования',
      description: 'Онлайн система бронирования с календарем, уведомлениями и интеграцией с платежными системами.',
      technologies: ['FastAPI', 'Vue.js', 'PostgreSQL', 'Celery'],
      gradient: 'from-yellow-500 to-orange-600',
      icon: '📅',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-center mb-16 text-lg">
            {t('projects.subtitle')}
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="glass rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer shine-effect"
              >
                {/* Project Header with Gradient */}
                <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="text-6xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    {project.icon}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-black/20"
                    whileHover={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-400 font-medium hover:border-cyan-400/50 transition-colors duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05, x: 3 }}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      <FaGithub />
                      <span>{t('projects.viewCode')}</span>
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05, x: 3 }}
                      className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                    >
                      <FaExternalLinkAlt />
                      <span>{t('projects.viewDemo')}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

