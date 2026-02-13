"use client";

import Image from "next/image";
import { motion, circOut } from "framer-motion";
import { Mail, MapPin, Rocket, UserRound } from "lucide-react";
import portfolio from "@/portfolio.config";

const { profile } = portfolio;

/** Renders **bold** segments of a bio paragraph. */
function renderRichText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-gradient">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

const imageVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: circOut, delay: 0.2 } },
};

const facts = [
  { label: "Name", value: profile.name, icon: UserRound },
  { label: "Email", value: profile.email, icon: Mail, href: `mailto:${profile.email}` },
  { label: "Location", value: profile.location, icon: MapPin },
  {
    label: "Availability",
    value: profile.openToWork ? "Open to new opportunities" : "Not looking right now",
    icon: Rocket,
  },
];

export function AboutMe() {
  return (
    <div className="row g-4 align-items-center">
      <motion.div
        className="col-md-5"
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="profile-frame">
          <div className="profile-inner">
            <Image
              src={profile.avatar}
              alt={`${profile.name} - ${profile.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-fit-cover"
              priority
            />
            {profile.openToWork && (
              <span className="chip position-absolute bottom-0 start-0 m-3 bg-dark bg-opacity-75">
                <span className="status-dot" />
                Available for work
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <div className="col-md-7">
        <p className="eyebrow mb-2">About me</p>
        <h3 className="section-title mb-3">{profile.title}</h3>
        {profile.bio.map((paragraph, i) => (
          <p key={i} className="text-muted-soft lh-lg">
            {renderRichText(paragraph)}
          </p>
        ))}

        <div className="row g-3 mt-2">
          {facts.map(({ label, value, icon: Icon, href }) => (
            <div key={label} className="col-sm-6">
              <div className="glass-card p-3 h-100 d-flex align-items-center gap-3">
                <div className="chat-avatar">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="small text-muted-soft">{label}</div>
                  {href ? (
                    <a href={href} className="fw-medium text-break link-underline-opacity-0">
                      {value}
                    </a>
                  ) : (
                    <div className="fw-medium">{value}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
