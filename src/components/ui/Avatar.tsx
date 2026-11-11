"use client";

import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  ring?: boolean;
  online?: boolean;
}

export function Avatar({
  src,
  alt,
  size = 44,
  className = "",
  ring = false,
  online = false,
}: AvatarProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`h-full w-full rounded-full object-cover ${
          ring ? "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]" : ""
        }`}
      />
      {online && (
        <span
          className="absolute bottom-0 right-0 block rounded-full border-2 border-[var(--surface)] bg-[var(--primary)]"
          style={{
            width: Math.max(10, Math.round(size * 0.24)),
            height: Math.max(10, Math.round(size * 0.24)),
          }}
        />
      )}
    </div>
  );
}
