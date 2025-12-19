import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import portretImage from '../assets/portret.jpg';

/**
 * About Section with Apple-Style Scroll-Linked 3D Animation
 * 
 * Animation Philosophy (Apple iPhone Showcase Reference):
 * - Uses scroll progress (useScroll) for frame-perfect synchronization
 * - Multi-phase animation: image enters tilted, straightens, continues past center
 * - Spring physics for organic, non-robotic motion
 * - Hardware-accelerated properties ONLY (transform, opacity, filter)
 * - Deep 3D perspective with reflection plane for premium depth
 * 
 * Why Scroll Progress over Intersection Observer?
 * - Continuous feedback: animation progress = scroll position (Apple's "scrubbing" effect)
 * - Intersection Observer only triggers at thresholds, lacking frame-by-frame control
 */
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  // Extended scroll range for full section animation
  // - 0 when section top reaches viewport bottom
  // - 1 when section bottom reaches viewport top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]  // Full scroll range for extended animation
  });

  // Spring configuration: Apple-like physics
  // Low stiffness (100) + high damping (30) = smooth deceleration, no oscillation
  const springConfig = useMemo(() => ({ 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  }), []);

  // Smooth the scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  // ============================================
  // MULTI-PHASE 3D TRANSFORM SYSTEM
  // Inspired by Apple iPhone product page rotation
  // ============================================
  
  // Scale: starts smaller, scales up with slight overshoot, then settles
  // Creates "popping into existence" effect
  const scale = useTransform(smoothProgress, 
    [0, 0.25, 0.4, 0.6], 
    [0.75, 0.95, 1.02, 1]  // Slight overshoot at 0.4 for organic feel
  );
  
  // Opacity: fades in during first phase
  const opacity = useTransform(smoothProgress, [0, 0.35], [0, 1]);
  
  // 3D Rotation X: tilts back dramatically, comes to neutral
  // Like iPhone tilting forward as it enters view
  const rotateX = useTransform(smoothProgress, 
    [0, 0.3, 0.5], 
    [35, 10, 0]
  );
  
  // 3D Rotation Y: Multi-phase rotation (Apple's signature effect)
  // Enters from right angle → straightens → slight left tilt as you continue
  const rotateY = useTransform(smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [-25, -10, 0, 5, 12]  // Continuous rotation through scroll
  );
  
  // Y translation: parallax float-up effect
  const y = useTransform(smoothProgress, 
    [0, 0.4, 0.6], 
    [120, 20, 0]
  );
  
  // Z translation: "pop forward" depth effect
  // Creates sense of image coming toward viewer
  const translateZ = useTransform(smoothProgress,
    [0, 0.35, 0.5],
    [-80, 30, 0]
  );
  
  // Blur reveal: cinematic focus effect
  const blur = useTransform(smoothProgress, [0, 0.4], [12, 0]);

  // ============================================
  // AMBIENT GLOW & SHADOW SYSTEM
  // Dynamic lighting that responds to scroll
  // ============================================
  
  // Main glow behind portrait
  const glowOpacity = useTransform(smoothProgress, [0.2, 0.6], [0, 0.7]);
  const glowScale = useTransform(smoothProgress, [0.2, 0.6], [0.7, 1.15]);
  
  // Secondary accent glow (offset for depth)
  const secondaryGlowOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 0.5]);
  
  // Dynamic shadow that intensifies as image "lands"
  const shadowOpacity = useTransform(smoothProgress, [0.3, 0.6], [0, 0.4]);
  const shadowBlur = useTransform(smoothProgress, [0.3, 0.6], [20, 50]);
  const shadowY = useTransform(smoothProgress, [0.3, 0.6], [10, 30]);
  
  // Reflection opacity (fades in as image stabilizes)
  const reflectionOpacity = useTransform(smoothProgress, [0.4, 0.7], [0, 0.25]);

  // Helper to create CSS filter string from blur value
  const createBlurFilter = (blurValue: MotionValue<number>) => {
    return useTransform(blurValue, (v) => `blur(${v}px)`);
  };
  
  const blurFilter = createBlurFilter(blur);

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
              className="flex justify-center relative"
              style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}
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
                  z: translateZ,  // Z-translation for depth "pop"
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
              >
                {/* Primary ambient glow - gradient bloom */}
                <motion.div 
                  className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-2xl"
                  style={{
                    opacity: glowOpacity,
                    scale: glowScale,
                    background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.6) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)',
                    filter: 'blur(50px)',
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                  }}
                />
                
                {/* Secondary glow - offset for depth illusion */}
                <motion.div 
                  className="absolute -z-20 w-72 h-72 md:w-96 md:h-96 rounded-full"
                  style={{
                    opacity: secondaryGlowOpacity,
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 70%)',
                    filter: 'blur(60px)',
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-40%',
                  }}
                />
                
                {/* Main portrait container with glass effect */}
                <motion.div 
                  className="w-64 h-64 md:w-80 md:h-80 rounded-2xl glass overflow-hidden border-2 border-cyan-500/30 relative gpu-accelerated"
                  style={{
                    filter: blurFilter,
                    boxShadow: useTransform(
                      [shadowOpacity, shadowBlur, shadowY] as const,
                      ([op, bl, sy]: number[]) => 
                        `0 ${sy}px ${bl}px -12px rgba(0, 0, 0, ${op}), 
                         0 0 0 1px rgba(255,255,255,0.1) inset,
                         0 0 60px rgba(6, 182, 212, ${op * 0.3})`
                    ),
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 8,
                    rotateX: -5,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                >
                  {/* Premium shine overlay - animated highlight */}
                  <motion.div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.05) 100%)',
                      opacity: useTransform(smoothProgress, [0.3, 0.6], [0.5, 1]),
                    }}
                  />
                  
                  {/* Edge highlight for 3D effect */}
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.3)',
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
                
                {/* Reflection plane beneath portrait */}
                <motion.div 
                  className="absolute w-64 h-32 md:w-80 md:h-40 rounded-2xl overflow-hidden pointer-events-none"
                  style={{
                    top: '100%',
                    left: 0,
                    opacity: reflectionOpacity,
                    transform: 'rotateX(180deg) translateY(-8px)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                  }}
                >
                  <img 
                    src={portretImage} 
                    alt="" 
                    className="w-full h-full object-cover object-center"
                    style={{ filter: 'blur(2px) brightness(0.6)' }}
                    loading="lazy"
                    aria-hidden="true"
                  />
                </motion.div>
                
                {/* Floating accent elements for depth */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600"
                  style={{
                    opacity: useTransform(smoothProgress, [0.4, 0.7], [0, 0.85]),
                    scale: useTransform(smoothProgress, [0.4, 0.7], [0.3, 1]),
                    filter: 'blur(1px)',
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)',
                  }}
                />
                <motion.div 
                  className="absolute -bottom-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"
                  style={{
                    opacity: useTransform(smoothProgress, [0.5, 0.8], [0, 0.75]),
                    scale: useTransform(smoothProgress, [0.5, 0.8], [0.3, 1]),
                    filter: 'blur(1px)',
                    boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)',
                  }}
                />
                
                {/* Tertiary floating element - appearing later for layered entrance */}
                <motion.div 
                  className="absolute -top-2 -left-6 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500"
                  style={{
                    opacity: useTransform(smoothProgress, [0.55, 0.85], [0, 0.6]),
                    scale: useTransform(smoothProgress, [0.55, 0.85], [0.2, 1]),
                    filter: 'blur(1px)',
                    boxShadow: '0 0 20px rgba(244, 114, 182, 0.5)',
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
