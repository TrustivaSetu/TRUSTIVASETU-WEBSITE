"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { MouseEvent, ReactNode } from "react";

type Props = {
  href: string;
  event: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export default function TrackedLink({
  href,
  event,
  children,
  className,
  target,
  rel,
}: Props) {
  const onClick = (_e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, {
      href,
    });
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={className}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
