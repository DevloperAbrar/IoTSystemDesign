import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Mail, Phone, Linkedin } from 'lucide-react';

const GuidedBy = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faculty = {
    name: 'Dr. Priyanka Garg',
    department: 'Centre of Internet of Things',
    designation: 'Associate Professor',
    qualification: 'Ph.D. , M.Tech, B.Tech',
    specialization: 'IoT Systems, Embedded Systems, Machine Learning',
    experience: '15+ years in Teaching & Research',
    image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762883013/images_bhjzwb.jpg',
    email: 'suresh.sharma@university.edu',
    phone: '+91 98765 43210',
  };

  return (
    <section id="faculty" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-indigo-50/50 dark:via-indigo-900/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Guided By
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Under the expert guidance and mentorship of our esteemed faculty member
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="grid md:grid-cols-5 gap-8">
                {/* Image Section */}
                <div className="md:col-span-2 relative">
                  <div className="h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
                    <div className="h-full bg-white dark:bg-gray-800 p-8 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                        <img
                          src={faculty.image}
                          alt={faculty.name}
                          className="relative w-64 h-64 rounded-2xl object-cover shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-3 p-8 md:p-12">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                        {faculty.name}
                      </h3>
                      <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                        {faculty.designation}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {faculty.department}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Qualification</p>
                        <p className="text-gray-600 dark:text-gray-400">{faculty.qualification}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Specialization</p>
                        <p className="text-gray-600 dark:text-gray-400">{faculty.specialization}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      
                    </div>
                  </div>

                  {/* Contact Information */}
                  
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-indigo-200 dark:border-gray-600"
          >
            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "We extend our sincere gratitude to our mentor for the invaluable guidance, 
              constant support, and expert insights that made this project possible. 
              Their dedication to fostering innovation and excellence has been instrumental 
              in shaping our understanding of IoT systems and real-world applications."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidedBy;