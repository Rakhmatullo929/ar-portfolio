import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaPython,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaNodeJs,
} from 'react-icons/fa';
import {
  SiDjango,
  SiPostgresql,
  SiRedis,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiCelery,
  SiNginx,
} from 'react-icons/si';

// 3D Card component with tilt effect
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXVal = ((y - centerY) / centerY) * -8;
    const rotateYVal = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.backend'),
      skills: [
        { name: 'Python', icon: FaPython, color: 'text-blue-400' },
        { name: 'Django', icon: SiDjango, color: 'text-green-500' },
        { name: 'FastAPI', icon: SiFastapi, color: 'text-teal-400' },
        { name: 'Celery', icon: SiCelery, color: 'text-green-400' },
      ],
    },
    {
      title: t('skills.frontend'),
      skills: [
        { name: 'React', icon: FaReact, color: 'text-cyan-400' },
        { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-sky-400' },
        { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
      ],
    },
    {
      title: t('skills.databases'),
      skills: [
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-400' },
        { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
      ],
    },
    {
      title: t('skills.devops'),
      skills: [
        { name: 'Docker', icon: FaDocker, color: 'text-blue-500' },
        { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
        { name: 'Linux', icon: FaLinux, color: 'text-yellow-400' },
        { name: 'Nginx', icon: SiNginx, color: 'text-green-500' },
      ],
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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
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

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">{t('skills.title')}</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-center mb-16 text-lg">
            {t('skills.subtitle')}
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skillCategories.map((category) => (
              <motion.div key={category.title} variants={cardVariants}>
                <TiltCard>
                  <div className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 glow-border h-full">
                    <h3 className="text-xl font-bold mb-6 text-cyan-400">{category.title}</h3>
                    <motion.div
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    >
                      {category.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          variants={skillVariants}
                          className="flex items-center gap-3 group cursor-pointer"
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            <skill.icon className={`text-3xl ${skill.color} drop-shadow-lg`} />
                          </motion.div>
                          <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium group-hover:text-white dark:group-hover:text-white light:group-hover:text-slate-900 transition-colors duration-300">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

