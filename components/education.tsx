"use client";

import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import portfolio from "@/portfolio.config";

const educationData = portfolio.education;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

export function Education() {
  if (!educationData || educationData.length === 0) {
    return null;
  }

  return (
    <section id="education" className="bg-white text-gray-900 overflow-hidden">
      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          className="relative mt-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Timeline vertical line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-300 md:left-1/2 md:-translate-x-1/2"></div>

          {educationData.map((edu, index) => (
            <motion.div
              key={`${edu.institution}-${edu.startDate}`}
              className="relative mb-12 pl-12 md:pl-0"
              variants={itemVariants}
            >
              {/* Timeline icon */}
              <div className="absolute top-0 left-4 md:left-1/2 md:-translate-x-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 ring-8 ring-white">
                  <FaGraduationCap className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Timeline card */}
              <div
                className={`relative md:w-1/2 ${
                  index % 2 === 0
                    ? "md:left-0 md:pr-8"
                    : "md:left-1/2 md:pl-8"
                }`}
              >
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="mt-1 text-base font-medium text-gray-600">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500">{edu.location}</p>
                    </div>
                    <p className="flex-shrink-0 whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mt-2 sm:mt-0">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
