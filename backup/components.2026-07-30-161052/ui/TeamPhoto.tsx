"use client";

import { useState } from "react";
import Image from "next/image";

interface TeamPhotoProps {
  src: string;
  alt: string;
  name: string;
  width?: number;
  height?: number;
}

const AVATAR_COLORS = [
  "#14532d", // deep green
  "#1e3a5f", // deep navy
  "#3d1a78", // deep violet
  "#7c2d12", // deep orange
  "#1a3a2f", // teal-green
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name: string): string {
  const code = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

export default function TeamPhoto({
  src,
  alt,
  name,
  width = 240,
  height = 240,
}: TeamPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-white font-black text-5xl select-none"
        style={{ backgroundColor: getAvatarColor(name) }}
        aria-label={name}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-cover object-top w-full h-full scale-110"
      onError={() => setFailed(true)}
    />
  );
}
