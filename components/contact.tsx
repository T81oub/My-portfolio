"use client";

import Link from "next/link";
import { motion, easeInOut } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";
import portfolio from "@/portfolio.config";
import { getSocialIcon } from "@/lib/icons";

const { profile, socials } = portfolio;

const contactDetails = [
  { name: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: getSocialIcon("email") },
  ...socials
    .filter((s) => s.platform !== "email")
    .map((s) => ({
      name: s.platform.charAt(0).toUpperCase() + s.platform.slice(1),
      value: s.label,
      href: s.url,
      icon: getSocialIcon(s.platform),
    })),
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
};

export function Contact() {
  return (
    <div id="contact" className="relative bg-white text-gray-900 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gray-100 border border-gray-300 rounded-xl p-6 sm:p-8 shadow-xl mt-10"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            <ul className="space-y-5 mb-8">
              {contactDetails.map((item) => (
                <li key={item.name} className="flex items-start gap-4">
                  <item.icon className="text-blue-600 w-5 h-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">{item.name}</p>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-blue-700 transition-colors break-all"
                    >
                      {item.value}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-300 pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Current Status</h4>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${profile.openToWork ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                ></div>
                <p className="text-sm text-gray-700">{profile.status}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 sm:p-8 shadow-xl mt-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Me a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
