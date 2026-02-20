"use client";

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
    <section id="contact">
      <p className="eyebrow mb-2">Get in touch</p>
      <h3 className="section-title mb-4">Let&apos;s work together</h3>

      <div className="row g-4">
        <motion.div
          className="col-lg-5"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="glass-card h-100 p-4">
            <h4 className="h5 fw-semibold mb-4">Contact information</h4>
            <ul className="list-unstyled d-grid gap-3 mb-4">
              {contactDetails.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center gap-3 text-reset text-decoration-none"
                  >
                    <span className="btn btn-glass btn-icon flex-shrink-0">
                      <item.icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="d-block small text-muted-soft">{item.name}</span>
                      <span className="d-block text-break">{item.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-top pt-4">
              <h5 className="h6 fw-semibold mb-2">Current status</h5>
              <div className="d-flex align-items-center gap-2 small text-muted-soft">
                <span className={`status-dot ${profile.openToWork ? "" : "off"}`} />
                {profile.status}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-lg-7"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="glass-card h-100 p-4">
            <h4 className="h5 fw-semibold mb-4">Send me a message</h4>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
