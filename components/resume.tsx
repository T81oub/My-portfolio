"use client";

import { Download, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";
import portfolio from "@/portfolio.config";

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Resume() {
  const { resumes, profile } = portfolio;

  if (resumes.length === 0) {
    return <p className="py-4 text-center text-muted-soft mb-0">No resume has been added yet.</p>;
  }

  return (
    <section id="resume">
      <p className="text-muted-soft mb-4">
        Take a look at my professional experience and skills. View the resume online or download it.
      </p>

      <motion.div className="d-grid gap-3" variants={listVariants} initial="hidden" animate="visible">
        {resumes.map((resume) => (
          <motion.div
            key={resume.file}
            variants={itemVariants}
            className="glass-card p-3 p-sm-4 d-flex flex-column flex-sm-row align-items-sm-center gap-3"
          >
            <div className="d-flex align-items-center gap-3 flex-grow-1 min-w-0">
              <div className="chat-avatar rounded-3" style={{ width: "3rem", height: "3rem" }}>
                <FileText size={22} />
              </div>
              <div className="min-w-0">
                <div className="fw-semibold">{profile.name} - Resume</div>
                <div className="small text-muted-soft">{resume.label} · PDF</div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gradient d-inline-flex align-items-center gap-2"
              >
                <Eye size={18} />
                View
              </a>
              <a href={resume.file} download className="btn btn-glass d-inline-flex align-items-center gap-2">
                <Download size={18} />
                Download
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
