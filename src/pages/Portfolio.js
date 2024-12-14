import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ title, description, techStack, demoLink, githubLink }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-4">
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <FaExternalLinkAlt />
          <span>Live Demo</span>
        </a>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        >
          <FaGithub />
          <span>GitHub</span>
        </a>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce Dashboard",
      description: "A responsive dashboard with real-time data visualization and inventory management.",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management platform with real-time updates and team features.",
      techStack: ["React", "Firebase", "Material-UI", "Redux"],
      demoLink: "#",
      githubLink: "#"
    },
    {
      title: "Weather Application",
      description: "A weather forecast application with location-based services and detailed metrics.",
      techStack: ["React", "OpenWeather API", "Styled Components"],
      demoLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* Featured Demo Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Demo</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Interactive Dashboard</h3>
            {/* Add your featured demo component here */}
            <div className="bg-gray-100 p-4 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Interactive Demo Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
