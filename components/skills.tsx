"use client";

import { motion } from "framer-motion";
import portfolio from "@/portfolio.config";
import { getSkillIcon } from "@/lib/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Skills() {
  return (
    <section id="skills">
      <p className="eyebrow mb-2">Toolbox</p>
      <h3 className="section-title mb-4">Skills</h3>

      <motion.div
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {portfolio.skills.map((category) => (
          <motion.div key={category.title} className="col-lg-4 col-md-6" variants={itemVariants}>
            <div className="glass-card h-100 p-4">
              <h4 className="h6 fw-semibold text-uppercase text-muted-soft mb-3" style={{ letterSpacing: "0.08em" }}>
                {category.title}
              </h4>
              <div className="row row-cols-3 g-2">
                {category.skills.map((skill) => {
                  const { icon: Icon, color } = getSkillIcon(skill.icon);
                  return (
                    <div key={skill.name} className="col">
                      <div className="skill-tile h-100 text-center">
                        <div className="skill-icon">
                          <Icon size={24} style={{ color }} />
                        </div>
                        <span className="small fw-medium lh-sm">{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
