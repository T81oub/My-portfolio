"use client";

import Link from "next/link";
import { Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import portfolio from "@/portfolio.config";

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
};

const buttonsContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
};

export function Resume() {
  const { resumes } = portfolio;

  if (resumes.length === 0) {
    return <p className="py-6 text-center text-gray-600">No resume has been added yet.</p>;
  }

  return (
    <div id="resume" className="py-2 sm:py-4 relative bg-white text-gray-900 text-center overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-gray-300 to-blue-300 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-gray-200 to-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.p
          variants={paragraphVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto mt-10"
        >
          Take a look at my professional experience and skills. You can view my resume online or download it.
        </motion.p>

        <motion.div
          variants={buttonsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="space-y-12 max-w-xl mx-auto"
        >
          {resumes.map((resume) => (
            <div key={resume.file} className="space-y-4">
              {resumes.length > 1 && (
                <p className="text-base font-semibold text-gray-800">{resume.label}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-6 py-3 text-lg"
                >
                  <Link href={resume.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <Eye size={20} className="mr-2" />
                    View Online
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-500 text-gray-700 hover:text-black hover:bg-gray-100 font-medium rounded-lg px-6 py-3 text-lg"
                >
                  <Link href={resume.file} download className="inline-flex items-center">
                    <Download size={20} className="mr-2" />
                    Download
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
