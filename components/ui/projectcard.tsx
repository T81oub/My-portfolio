"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";

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
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

const statusClasses: Record<Project["status"], string> = {
  Completed: "text-bg-success",
  "In Progress": "text-bg-warning",
  Archived: "text-bg-secondary",
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "short" }).format(new Date(date));

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="project-card glass-card hover-lift h-100 d-flex flex-column"
    >
      <div className="project-thumb">
        <Image
          src={project.image || PLACEHOLDER_IMAGE}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-fit-cover"
        />
        <span className={`badge rounded-pill position-absolute top-0 end-0 m-3 ${statusClasses[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1">
        <div className="small text-muted-soft d-flex align-items-center gap-1 mb-2">
          <CalendarDays size={14} />
          {formatDate(project.startDate)}
          <span className="mx-1">·</span>
          {project.category}
        </div>

        <h4 className="h5 fw-semibold mb-2">{project.title}</h4>
        <p className="small text-muted-soft flex-grow-1 mb-3">{project.description}</p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          {project.tools.map((tool) => (
            <span key={tool} className="chip">
              {tool}
            </span>
          ))}
        </div>

        {(project.githubUrl || project.liveDemoUrl) && (
          <div className="d-flex gap-2 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-glass btn-sm flex-fill d-inline-flex align-items-center justify-content-center gap-2"
              >
                <Code2 size={16} />
                Code
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand btn-sm flex-fill d-inline-flex align-items-center justify-content-center gap-2"
              >
                <ExternalLink size={16} />
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
