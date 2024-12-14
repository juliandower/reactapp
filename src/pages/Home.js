import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiVercel } from 'react-icons/si';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-screen flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm <span className="text-blue-600">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          A passionate React Developer building amazing web experiences
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View My Work
        </motion.button>
      </motion.section>

      {/* About Me Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p>Started my journey in web development</p>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p>Mastered React and modern web technologies</p>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <p>Built numerous projects and gained real-world experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
            >
              <FaReact className="text-5xl text-blue-500 mb-4" />
              <p className="font-semibold">React</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
            >
              <SiNextdotjs className="text-5xl text-black mb-4" />
              <p className="font-semibold">Next.js</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
            >
              <SiTypescript className="text-5xl text-blue-700 mb-4" />
              <p className="font-semibold">TypeScript</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
