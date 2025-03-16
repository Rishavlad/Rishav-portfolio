import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const clients = [
  {
    name: 'NEPLY',
    logo: 'https://github.com/user-attachments/assets/0c613d32-486b-4054-b294-9e532125d8f6'
  },
  {
    name: 'TechGiant',
    logo: 'https://github.com/user-attachments/assets/5d04dd3f-4098-4afc-b873-d37e0a02a377'
  },
  {
    name: 'Classic Wears',
    logo: 'https://github.com/user-attachments/assets/5eeebdd4-9712-47e2-b539-9376521b08ce'
  },
  {
    name: 'SMB',
    logo: 'https://github.com/user-attachments/assets/4c468e62-eeb9-40f6-8c38-881431f1ff57'
  },
  {
    name: 'Blue Ridge',
    logo: 'https://github.com/user-attachments/assets/b697b129-4e17-441a-a903-1d6a768043d7'
  },
  {
    name: 'Kthree Events',
    logo: 'https://github.com/user-attachments/assets/30f52fad-6436-4dd9-afb7-0b1806ed3494'
  },
  {
    name: 'Ryall Marketing',
    logo: 'https://github.com/user-attachments/assets/b6eb4a85-a887-4a95-a5f2-5e756ee54c74'
  },
  {
    name: 'Infinite Marketing',
    logo: 'https://github.com/user-attachments/assets/628da6b7-d8c1-463f-bde4-35d40c309a51'
  }
];

const Clients = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="clients" className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Companies Worked With</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're proud to work with amazing companies from around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-40 h-20 grayscale hover:grayscale-0 transition-all duration-300 shadow-custom bg-white p-4 rounded-lg flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
