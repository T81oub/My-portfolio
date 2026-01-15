"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, circOut } from "framer-motion";
import { Mail, MapPin, Rocket, UserRound } from "lucide-react";
import portfolio from "@/portfolio.config";

const { profile } = portfolio;

/** Renders **bold** segments of a bio paragraph. */
function renderRichText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-blue-700">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

const imageContainerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: circOut, delay: 0.3 },
  },
};

export function AboutMe() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-3 lg:gap-5 items-center bg-white">
      {/* Image Card */}
      <motion.div
        className="relative"
        variants={imageContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative aspect-[3/4] sm:aspect-square md:aspect-[4/5] rounded-xl overflow-hidden group">
          <Image
            src={profile.avatar}
            alt={`${profile.name} - ${profile.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transform transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          {profile.openToWork && (
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
              <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-md w-fit">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-900">Available for work</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        <div className="bg-gradient-to-br from-gray-200 to-gray-100 shadow-md rounded-xl p-4 sm:p-6">
          {profile.bio.map((paragraph, i) => (
            <p key={i} className={`text-lg text-gray-800 leading-relaxed ${i > 0 ? "mt-4" : ""}`}>
              {renderRichText(paragraph)}
            </p>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-4 pt-4 border-t border-gray-400">
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <UserRound className="h-4 w-4" /> Name
              </div>
              <div className="font-medium text-black">{profile.name}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <Mail className="h-4 w-4" /> Email
              </div>
              <Link href={`mailto:${profile.email}`} className="font-medium text-blue-600 hover:underline break-all">
                {profile.email}
              </Link>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <MapPin className="h-4 w-4" /> Location
              </div>
              <div className="font-medium text-black">{profile.location}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                <Rocket className="h-4 w-4" /> Availability
              </div>
              <div className={`font-medium ${profile.openToWork ? "text-green-600" : "text-gray-700"}`}>
                {profile.openToWork ? "Open to new opportunities" : "Not looking right now"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
