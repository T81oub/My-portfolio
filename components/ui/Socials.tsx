'use client';

import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FileText, X } from 'lucide-react';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { Resume } from '../resume';
import portfolio from '@/portfolio.config';
import { getSocialIcon } from '@/lib/icons';

export function Socials({ className }: { className?: string }) {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <FadeInStagger role="list" className={clsx('flex items-center gap-x-4 text-blue-600 mt-1', className)}>
        {portfolio.socials.map((social) => {
          const Icon = getSocialIcon(social.platform);
          return (
            <FadeIn key={social.url}>
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="transition hover:text-blue-400/80 duration-200"
              >
                <Icon className="h-8 w-8" />
              </Link>
            </FadeIn>
          );
        })}

        {portfolio.resumes.length > 0 && (
          <FadeIn>
            <button
              onClick={() => setShowResume(true)}
              className="group relative px-5 py-2 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center gap-2 z-10 relative">
                <FileText className="w-5 h-5" />
                View Resume
              </span>
            </button>
          </FadeIn>
        )}
      </FadeInStagger>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-y-auto p-6">
            <Resume />
            <button
              onClick={() => setShowResume(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
              aria-label="Close resume"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
