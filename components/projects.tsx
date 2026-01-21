"use client";

import { useState } from "react";
import portfolio from "@/portfolio.config";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/ui/projectcard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const projectsData = portfolio.projects;

const getCategories = (projects: Project[]) => {
  const categories = projects.map((p) => p.category);
  return ["All", ...Array.from(new Set(categories))];
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = getCategories(projectsData);
  const sortedProjects = [...projectsData].sort(
    (a, b) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const filteredProjects =
    selectedCategory === "All"
      ? sortedProjects
      : sortedProjects.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <section
      id="projects"
      className="py-6 sm:py-10 relative bg-white text-gray-900 overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-gradient-to-br from-silver via-white to-blue-100 rounded-full filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-gradient-to-br from-blue-100 to-gray-100 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/3 right-1/5 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-gray-100 to-white rounded-full filter blur-3xl opacity-15 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white",
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 "
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
