"use client";

// Entirely static mock data — no backend endpoint for this section yet.
const STATIC_BLACKLISTED_WEBSITES = [
  { domain: "facebook.com", category: "Social Media", attempts: 142 },
  { domain: "instagram.com", category: "Social Media", attempts: 98 },
  { domain: "tiktok.com", category: "Social Media", attempts: 87 },
  { domain: "netflix.com", category: "Entertainment", attempts: 45 },
  { domain: "bet9ja.com", category: "Gambling", attempts: 23 },
];

export function useBlacklistedWebsites() {
  return {
    isLoading: false,
    websites: STATIC_BLACKLISTED_WEBSITES,
  };
}
