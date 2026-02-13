"use client";

import { motion } from "framer-motion";
import { Briefcase, Check } from "lucide-react";
import portfolio from "@/portfolio.config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export function WorkExperiences() {
  const experiences = portfolio.experience;
  if (experiences.length === 0) return null;

  return (
    <section id="experience">
      <p className="eyebrow mb-2">Career</p>
      <h3 className="section-title mb-4">Work experience</h3>

      <motion.div
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {experiences.map((exp) => (
          <motion.div key={`${exp.company}-${exp.startDate}`} className="timeline-item mb-4" variants={itemVariants}>
            <span className="timeline-dot">
              <Briefcase size={13} />
            </span>

            <div className="glass-card hover-lift p-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                <div>
                  <h4 className="h5 fw-semibold mb-1">{exp.role}</h4>
                  <div className="text-muted-soft">
                    {exp.company}
                    {exp.location && <span className="small"> · {exp.location}</span>}
                  </div>
                </div>
                <span className="chip align-self-start text-nowrap">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>

              <p className="mt-3 mb-3">{exp.description}</p>

              <ul className="list-unstyled mb-0 d-grid gap-2">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="d-flex gap-2 small text-muted-soft">
                    <Check size={16} className="flex-shrink-0 mt-1" color="#a5b4fc" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
