"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { CalendarDays, GitBranch, Construction } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const PLACEHOLDER_IMAGE = "/images/project-placeholder.svg";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
  }).format(new Date(date));
};

const statusColors: Record<Project["status"], string> = {
  Completed: "bg-blue-600 text-white",
  "In Progress": "bg-yellow-400 text-black",
  Archived: "bg-gray-400 text-white",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02] flex flex-col h-full group"
    >
      <div className="relative w-full h-56 sm:h-60">
        <Image
          src={project.image || PLACEHOLDER_IMAGE}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-blue-800">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">{project.description}</p>

        <div className="flex flex-wrap text-xs text-gray-500 mb-3 gap-x-4 gap-y-1">
          <div className="flex items-center">
            <CalendarDays size={14} className="mr-1.5 text-blue-500" />
            <span>Start: {formatDate(project.startDate)}</span>
          </div>
          <div className="flex items-center">
            {project.status === "In Progress" ? (
              <Construction size={14} className="mr-1.5 text-yellow-500" />
            ) : (
              <GitBranch size={14} className="mr-1.5 text-blue-600" />
            )}
            Status:
            <span className={`ml-1 px-1.5 py-0.5 rounded-sm text-xs ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tools.map((tool) => (
            <span key={tool} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
              {tool}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.liveDemoUrl) && (
          <div className="mt-auto pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-blue-800 font-medium py-2 px-4 rounded-lg text-sm active:scale-95 transition-all duration-150 ease-in-out"
              >
                View Code
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg text-sm py-2 px-4 font-medium text-white bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 active:scale-95 transition-all duration-150 ease-in-out"
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
