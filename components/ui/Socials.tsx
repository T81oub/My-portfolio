'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { FileText, X } from 'lucide-react';
import { Resume } from '../resume';
import portfolio from '@/portfolio.config';
import { getSocialIcon } from '@/lib/icons';

export function Socials({ className }: { className?: string }) {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <div className={clsx('d-flex flex-wrap align-items-center gap-2', className)}>
        {portfolio.socials.map((social, i) => {
          const Icon = getSocialIcon(social.platform);
          return (
            <div key={social.url} className="fade-in-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="btn btn-glass btn-icon"
              >
                <Icon size={18} />
              </a>
            </div>
          );
        })}

        {portfolio.resumes.length > 0 && (
          <div className="fade-in-up" style={{ animationDelay: `${0.3 + portfolio.socials.length * 0.1}s` }}>
            <button
              type="button"
              onClick={() => setShowResume(true)}
              className="btn btn-brand rounded-pill px-4 d-inline-flex align-items-center gap-2 ms-1"
            >
              <FileText size={18} />
              View Resume
            </button>
          </div>
        )}
      </div>

      {showResume && (
        <>
          <div className="modal d-block modal-glass" tabIndex={-1} role="dialog" onClick={() => setShowResume(false)}>
            <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content p-2">
                <div className="modal-header border-0">
                  <h2 className="modal-title h4 section-title">Resume</h2>
                  <button
                    type="button"
                    className="btn btn-glass btn-icon ms-auto"
                    aria-label="Close resume"
                    onClick={() => setShowResume(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="modal-body pt-0">
                  <Resume />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}
    </>
  );
}
