export const ROUTE_MAP = {
  // Desktop → Mobile route mapping
  "/": { mobile: "/mob/home", desktop: "/overview" },
  "/home": { mobile: "/mob/home", desktop: "/overview" },
  "/overview": { mobile: "/mob/home", desktop: "/overview" },
  "/gratitude": { mobile: "/mob/gratitude", desktop: "/gratitude" },
  "/bible": { mobile: "/mob/bible", desktop: "/bible" },
  "/challenges": { mobile: "/mob/challenges", desktop: "/challenges" },
  "/profile": { mobile: "/mob/profile", desktop: "/profile" },
} as const;
