import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import "./styles/animations.css";
import App from "./App";

// Configure canonical URL dynamically from VITE_CANONICAL_URL or active deployment URL
if (typeof document !== "undefined" && typeof window !== "undefined") {
  const configuredCanonical = (
    import.meta.env?.VITE_CANONICAL_URL || ""
  ).trim();
  const canonicalHref =
    configuredCanonical ||
    `${window.location.origin}${window.location.pathname}`;
  let linkEl = document.querySelector('link[rel="canonical"]');
  if (!linkEl) {
    linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "canonical");
    document.head.appendChild(linkEl);
  }
  linkEl.setAttribute("href", canonicalHref);
}

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
