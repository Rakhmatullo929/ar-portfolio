import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const experiences = [
    {
      type: 'work',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Company',
      period: '2022 - Настоящее время',
      description: [
        'Разработка и поддержка веб-приложений на Django и React',
        'Оптимизация производительности баз данных PostgreSQL',
        'Внедрение CI/CD процессов с использованием Docker',
        'Менторинг junior разработчиков',
      ],
    },
    {
      type: 'work',
      title: 'Full-Stack Developer',
      company: 'Startup',
      period: '2020 - 2022',
      description: [
        'Создание REST API с использованием Django REST Framework',
        'Разработка интерфейсов на React и TypeScript',
        'Интеграция с внешними сервисами и API',
        'Настройка и поддержка серверной инфраструктуры',
      ],
    },
  ];

  const education = [
    {
      type: 'education',
      title: 'Бакалавр компьютерных наук',
      company: 'Технический Университет',
      period: '2016 - 2020',
      description: [
        'Специализация: Программная инженерия',
        'Средний балл: 4.5/5.0',
      ],
    },
  ];

  const allItems = [...experiences, ...education];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -60 : 60,
      scale: 0.95,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section id="experience" className="min-h-screen flex items-center py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">{t('experience.title')}</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-center mb-16 text-lg">
            {t('experience.subtitle')}
          </p>

          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(to bottom, #06b6d4, #3b82f6, #8b5cf6)',
              }}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-12"
            >
              {allItems.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 shine-effect"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.type === 'work' ? (
                            <FaBriefcase className="text-cyan-400 text-xl" />
                          ) : (
                            <FaGraduationCap className="text-purple-400 text-xl" />
                          )}
                        </motion.div>
                        <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">{item.title}</h3>
                      </div>
                      <p className="text-cyan-400 font-semibold mb-2">{item.company}</p>
                      <p className="text-slate-400 text-sm mb-4">{item.period}</p>
                      <ul className="space-y-2 text-slate-300 dark:text-slate-300 light:text-slate-700">
                        {item.description.map((desc, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.3 + i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{desc}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    variants={dotVariants}
                    className="relative flex items-center justify-center"
                  >
                    <motion.div
                      className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 z-10 ring-4 ring-slate-900"
                      whileHover={{ scale: 1.3 }}
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(6, 182, 212, 0.4)',
                          '0 0 0 10px rgba(6, 182, 212, 0)',
                          '0 0 0 0 rgba(6, 182, 212, 0)',
                        ],
                      }}
                      transition={{
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.5,
                        },
                      }}
                    />
                  </motion.div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

