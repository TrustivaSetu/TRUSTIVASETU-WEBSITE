"use client";

import { ButtonHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  event: string;
};

export default function TrackedButton({
  event,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
