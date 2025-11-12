import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail } from 'lucide-react';

const TeamMembers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const teamMembers = [
    {
      name: 'Mo Abrar Qureshi',
      branch: 'Internet of Things(IoT)',
      role: 'Team Leader & Backend Developer',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1747891625/abrar_o9ijbd.jpg',
      linkedin: 'https://www.linkedin.com/in/moabrarqureshi/', // Replace with actual LinkedIn URL
    },
    {
      name: 'Vansh Kulshrestha',
      branch: 'Internet of Things(IoT)',
      role: 'Hardware Specialist',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762881553/vansh_kaaazx.jpg',
      linkedin: 'https://www.linkedin.com/in/vanshkulshrestha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', // Replace with actual LinkedIn URL
    },
    {
      name: 'Harsh Sharma',
      branch: 'Internet of Things(IoT)',
      role: 'Frontend Developer',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762881595/harsh_kkxkas.png',
      linkedin: 'https://www.linkedin.com/in/harsharma7958', // Replace with actual LinkedIn URL
    },
    {
      name: 'Pragya Singh',
      branch: 'Internet of Things(IoT)',
      role: 'UI/UX Designer',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762881660/pragya_zr6vys.jpg',
      linkedin: 'https://www.linkedin.com/in/pragya-singh-393b3636b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', // Replace with actual LinkedIn URL
    },
    {
      name: 'Om Chouksey',
      branch: 'Internet of Things(IoT)',
      role: 'IoT Integration',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762881505/omchouksey_jbjipc.jpg',
      linkedin: 'https://www.linkedin.com/in/om-chouksey-931414284/?utm_source=', // Replace with actual LinkedIn URL
    },
    {
      name: 'Khushi Mishra',
      branch: 'Internet of Things(IoT)',
      role: 'Database Administrator',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762881700/khushi_jyvhm9.jpg',
      linkedin: 'https://www.linkedin.com/in/khushi-mishra-b2ab99290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', // Replace with actual LinkedIn URL
    },
    {
      name: 'Hitansh Ramtani',
      branch: 'Internet of Things(IoT)',
      role: 'Testing & Quality Assurance',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762915233/1710252182502_p2hpkx.jpg',
      linkedin: 'https://www.linkedin.com/in/hitanshramtani04082005?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', // Replace with actual LinkedIn URL
    },
    {
      name: 'Shubh Gupta',
      branch: 'Internet of Things(IoT)',
      role: 'Documentation & Research',
      image: 'https://res.cloudinary.com/dxtkbq48i/image/upload/v1762882049/shubh_uexhls.jpg',
      linkedin: 'https://www.linkedin.com/in/shubh-gupta-a9407a299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', // Replace with actual LinkedIn URL
    },
  ];

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-50/50 dark:via-green-900/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Our Team
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the talented individuals behind this innovative IoT project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Circular Image Container */}
                <div className="relative pt-8 pb-4 bg-gradient-to-br from-blue-400 to-purple-500">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  {/* <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {member.role}
                  </p> */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {member.branch}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors duration-300"
                      aria-label={`Visit ${member.name}'s LinkedIn profile`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    {/* <a
                      href="#"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-800 hover:text-white dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4" />
                    </a> */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;