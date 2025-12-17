import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import portretImage from '../assets/portret.jpg';

/**
 * About Section with Apple-Style Scroll-Linked 3D Animation
 * 
 * Animation Philosophy:
 * - Uses scroll progress (useScroll) instead of intersection observer for continuous,
 *   frame-synced animations that respond to exact scroll position
 * - Spring physics for natural deceleration and overshoot characteristics
 * - Hardware-accelerated properties only (transform, opacity) for 60fps
 * - 3D perspective transforms for depth and premium feel
 */
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  // Scroll progress tracking for the section
  // offset: ["start end", "end start"] means:
  // - 0 when section top reaches viewport bottom
  // - 1 when section bottom reaches viewport top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  // Spring configuration for Apple-like physics
  // Low stiffness + high damping = smooth, elegant deceleration
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Smooth the scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // Transform mappings for the 3D portrait animation
  // These create the "floating in from depth" effect seen on Apple pages
  
  // Scale: starts smaller, scales up to full size
  const scale = useTransform(smoothProgress, [0, 0.8], [0.7, 1]);
  
  // Opacity: fades in as you scroll
  const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  
  // 3D Rotation X: tilts back then comes to neutral (like iPhone rotating)
  const rotateX = useTransform(smoothProgress, [0, 1], [25, 0]);
  
  // 3D Rotation Y: subtle side rotation for depth
  const rotateY = useTransform(smoothProgress, [0, 1], [-15, 0]);
  
  // Y translation: parallax float-up effect
  const y = useTransform(smoothProgress, [0, 1], [80, 0]);
  
  // Blur reveal: starts slightly blurred, becomes sharp
  const blur = useTransform(smoothProgress, [0, 0.6], [8, 0]);

  // Glow animation intensity based on scroll
  const glowOpacity = useTransform(smoothProgress, [0.3, 1], [0, 0.6]);
  const glowScale = useTransform(smoothProgress, [0.3, 1], [0.8, 1.1]);

  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center py-20 px-4 overflow-hidden" 
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side - Apple-Style 3D Transform Animation */}
            <div 
              className="flex justify-center"
              style={{ perspective: '1200px' }}
              ref={imageContainerRef}
            >
              <motion.div 
                className="relative"
                style={{
                  scale,
                  opacity,
                  rotateX,
                  rotateY,
                  y,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
              >
                {/* Animated glow effect behind the image */}
                <motion.div 
                  className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600"
                  style={{
                    opacity: glowOpacity,
                    scale: glowScale,
                    filter: 'blur(40px)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
                
                {/* Main portrait container with glass effect */}
                <motion.div 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-2xl glass overflow-hidden border-2 border-cyan-500/30 relative"
                  style={{
                    filter: useTransform(blur, (v) => `blur(${v}px)`),
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: -5,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  {/* Premium shine overlay effect */}
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                    }}
                  />
                  
                  {/* Portrait image */}
                  <img 
                    src={portretImage} 
                    alt="Rakhmatullo Azizov" 
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                </motion.div>
                
                {/* Floating accent elements for depth */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600"
                  style={{
                    opacity: useTransform(smoothProgress, [0.5, 1], [0, 0.8]),
                    scale: useTransform(smoothProgress, [0.5, 1], [0.5, 1]),
                    filter: 'blur(1px)',
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.5)',
                  }}
                />
                <motion.div 
                  className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"
                  style={{
                    opacity: useTransform(smoothProgress, [0.6, 1], [0, 0.7]),
                    scale: useTransform(smoothProgress, [0.6, 1], [0.5, 1]),
                    filter: 'blur(1px)',
                    boxShadow: '0 0 25px rgba(168, 85, 247, 0.5)',
                  }}
                />
              </motion.div>
            </div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {t('about.paragraph1')}
              </p>

              <p className="text-lg text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {t('about.paragraph2')}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.div 
                  className="glass p-4 rounded-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 40px -10px rgba(34, 211, 238, 0.3)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <h3 className="text-cyan-400 font-semibold mb-2">{t('about.education')}</h3>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm">{t('about.educationValue')}</p>
                </motion.div>
                <motion.div 
                  className="glass p-4 rounded-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 40px -10px rgba(34, 211, 238, 0.3)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <h3 className="text-cyan-400 font-semibold mb-2">{t('about.experienceLabel')}</h3>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm">{t('about.experienceValue')}</p>
                </motion.div>
                <motion.div 
                  className="glass p-4 rounded-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.3)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <h3 className="text-cyan-400 font-semibold mb-2">{t('about.projectsLabel')}</h3>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm">{t('about.projectsValue')}</p>
                </motion.div>
                <motion.div 
                  className="glass p-4 rounded-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.3)'
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <h3 className="text-cyan-400 font-semibold mb-2">{t('about.location')}</h3>
                  <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm">{t('about.locationValue')}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
