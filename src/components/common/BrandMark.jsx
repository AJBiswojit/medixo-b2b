import React from "react";

export default function BrandMark({ className = "size-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#202020" />
      <path
        d="M10.5 28V13.5h3.8l5.7 8.9 5.7-8.9h3.8V28h-3.4v-9.2l-5 7.6h-2.2l-5-7.6V28z"
        fill="#fff"
      />
      <circle cx="30.5" cy="9.5" r="2.35" fill="#ACC6C1" />
    </svg>
  );
}
