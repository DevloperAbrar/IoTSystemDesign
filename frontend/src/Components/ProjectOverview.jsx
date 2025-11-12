import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Lightbulb, CheckCircle, TrendingUp } from 'lucide-react';

const ProjectOverview = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sections = [
    {
      icon: Target,
      title: 'Project Objective',
      content: 'To design and implement a comprehensive IoT system that enables real-time monitoring and control of connected devices through a web-based interface, leveraging ESP32 microcontroller technology for seamless hardware-software integration.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      content: 'Our system integrates cutting-edge IoT technology with modern web frameworks, providing an intuitive dashboard for device control, real-time data visualization, and intelligent analytics, making IoT accessible and manageable.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: CheckCircle,
      title: 'Key Features',
      content: 'Remote device control, real-time sensor monitoring, interactive data visualization, automated alerts, historical data analysis, responsive design, secure communication, and scalable architecture.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Future Scope',
      content: 'Integration with AI/ML for predictive maintenance, voice control compatibility, mobile app development, cloud storage solutions, multi-device support, and energy optimization algorithms.',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="project-overview" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 dark:via-blue-900/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Project Overview
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive IoT solution integrating hardware and software for intelligent device management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl"
                   style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
              
              <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${section.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <section.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {section.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['ESP32', 'React', 'Tailwind CSS', 'Vite', 'REST API', 'Sensors', 'Framer Motion', 'Recharts'].map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl text-center font-semibold text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectOverview;