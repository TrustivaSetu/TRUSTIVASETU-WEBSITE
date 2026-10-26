"use client";

interface AnimatedAvatarProps {
  name: string;
}

export default function AnimatedAvatar({ name }: AnimatedAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
      <div
        className="absolute inset-0 animate-avatar-spin"
        style={{
          background:
            "conic-gradient(from 0deg, #14532d, #bef264, #07111f, #3d1a78, #14532d)",
        }}
      />
      <div className="absolute inset-[7px] rounded-full bg-[#07111f]" />
      <span className="relative text-5xl md:text-6xl font-black text-lime-300 select-none animate-avatar-pulse">
        {initial}
      </span>
    </div>
  );
}
