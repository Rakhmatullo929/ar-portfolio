import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaTelegram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t('contact.email'),
      value: 'tillo3305@gmail.com',
      href: 'mailto:tillo3305@gmail.com',
      color: 'text-red-400',
      hoverColor: 'group-hover:text-red-300',
    },
    {
      icon: FaPhone,
      label: t('contact.phone'),
      value: '+998 90 511 33 05',
      href: 'tel:+998905113305',
      color: 'text-green-400',
      hoverColor: 'group-hover:text-green-300',
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/Rakhmatullo929',
      color: 'hover:text-gray-400',
      bgHover: 'hover:bg-gray-400/20',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rakhmatullo-azizov/ru/',
      color: 'hover:text-blue-500',
      bgHover: 'hover:bg-blue-500/20',
    },
    {
      icon: FaTelegram,
      label: 'Telegram',
      href: 'https://t.me/',
      color: 'hover:text-blue-400',
      bgHover: 'hover:bg-blue-400/20',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-center mb-16 text-lg">
            {t('contact.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-white dark:text-white light:text-slate-900">{t('contact.getInTouch')}</h3>
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass p-4 rounded-lg flex items-center gap-4 hover:bg-white/10 transition-all duration-300 group shine-effect"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className={`text-3xl ${info.color} ${info.hoverColor} transition-colors duration-300`}
                  >
                    <info.icon />
                  </motion.div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm">{info.label}</p>
                    <p className="text-white dark:text-white light:text-slate-900 font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <div className="glass p-8 rounded-xl glow-border">
                <h3 className="text-2xl font-bold mb-6 text-white dark:text-white light:text-slate-900">{t('contact.socialMedia')}</h3>
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-8 leading-relaxed">
                  {t('contact.socialDescription')}
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="flex gap-6 mb-8"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{ scale: 1.15, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 glass rounded-lg flex items-center justify-center text-2xl text-slate-400 ${social.color} ${social.bgHover} transition-all duration-300`}
                      aria-label={social.label}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </motion.div>

                <motion.a
                  href="mailto:tillo3305@gmail.com"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white text-center transition-all duration-300 shine-effect"
                >
                  {t('contact.writeMe')}
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 pt-8 border-t border-white/10 text-center"
          >
            <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">
              © {new Date().getFullYear()} {t('contact.copyright')}
            </p>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-500 dark:text-slate-500 light:text-slate-600 text-sm mt-2"
            >
              {t('contact.madeWith')}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

