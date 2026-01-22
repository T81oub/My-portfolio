"use client";

import { motion } from "framer-motion";
import portfolio from "@/portfolio.config";
import { getSkillIcon } from "@/lib/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Skills() {
  return (
    <div className="py-3 sm:py-6 bg-white relative">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {portfolio.skills.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50 p-6 shadow-lg"
            >
              <h3 className="mb-6 text-xl font-bold text-gray-800 text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
                {category.skills.map((skill) => {
                  const { icon: Icon, color } = getSkillIcon(skill.icon);
                  return (
                    <div key={skill.name} className="flex flex-col items-center gap-1 text-center">
                      <div className="h-16 flex items-start justify-center">
                        <Icon className="h-8 w-8" style={{ color }} />
                      </div>
                      <p className="text-sm font-medium text-gray-700 leading-tight">{skill.name}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
