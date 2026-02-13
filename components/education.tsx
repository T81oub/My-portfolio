"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import portfolio from "@/portfolio.config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export function Education() {
  const education = portfolio.education;
  if (education.length === 0) return null;

  return (
    <section id="education">
      <p className="eyebrow mb-2">Background</p>
      <h3 className="section-title mb-4">Education</h3>

      <motion.div
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {education.map((edu) => (
          <motion.div key={`${edu.institution}-${edu.startDate}`} className="timeline-item mb-4" variants={itemVariants}>
            <span className="timeline-dot">
              <GraduationCap size={13} />
            </span>

            <div className="glass-card hover-lift p-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                <div>
                  <h4 className="h5 fw-semibold mb-1">{edu.degree}</h4>
                  <div className="text-muted-soft">{edu.institution}</div>
                  <div className="small text-muted-soft d-flex align-items-center gap-1 mt-1">
                    <MapPin size={13} />
                    {edu.location}
                  </div>
                </div>
                <span className="chip align-self-start text-nowrap">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
