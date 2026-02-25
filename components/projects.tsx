"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import ProjectCard from "@/components/ui/projectcard";
import portfolio from "@/portfolio.config";

const projects = [...portfolio.projects].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
);
const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p className="eyebrow mb-2">Portfolio</p>
          <h3 className="section-title mb-0">Selected projects</h3>
        </div>

        <div className="d-flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={clsx("btn filter-btn", selectedCategory === category ? "btn-brand" : "btn-glass")}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              className="col-md-6 col-xl-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
