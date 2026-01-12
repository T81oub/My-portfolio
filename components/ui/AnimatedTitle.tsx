'use client';

import { useEffect, useState } from 'react';
import portfolio from '@/portfolio.config';

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const HOLD_TIME = 1200;

/** Typewriter effect cycling through profile.roles from portfolio.config.ts */
export function AnimatedTitle() {
  const roles = portfolio.profile.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;
    const current = roles[roleIndex % roles.length];

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), HOLD_TIME);
    } else if (deleting && text === '') {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="inline-flex text-blue-600">
      {text}
      <span className="ml-0.5 animate-pulse">|</span>
    </span>
  );
}
