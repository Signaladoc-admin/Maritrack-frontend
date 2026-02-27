import React from "react";

export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#25D366" />
    <path
      d="M17.472 16.058C17.138 15.891 15.496 15.076 15.189 14.965C14.882 14.854 14.659 14.798 14.436 15.132C14.213 15.466 13.573 16.218 13.378 16.441C13.183 16.664 12.988 16.692 12.654 16.525C12.32 16.358 11.243 16.001 9.966 14.862C8.953 13.959 8.27 12.844 7.936 12.259C7.602 11.674 7.899 11.365 8.066 11.2C8.213 11.054 8.392 10.821 8.559 10.626C8.726 10.431 8.837 10.292 8.948 10.069C9.059 9.846 9.003 9.651 8.92 9.484C8.837 9.317 8.141 7.603 7.852 6.917C7.569 6.255 7.286 6.347 7.082 6.347C6.897 6.338 6.684 6.338 6.47 6.338C6.257 6.338 5.913 6.421 5.625 6.736C5.337 7.051 4.521 7.821 4.521 9.391C4.521 10.96 5.662 12.475 5.829 12.698C5.996 12.921 8.083 16.287 11.373 17.609C12.155 17.923 12.765 18.11 13.245 18.262C14.006 18.504 14.708 18.466 15.262 18.384C15.88 18.291 17.166 17.603 17.435 16.834C17.704 16.065 17.704 15.406 17.63 15.276C17.556 15.146 17.333 15.086 17.009 14.919L17.472 16.058Z"
      fill="white"
    />
  </svg>
);

export const NetflixIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="black" />
    <path
      d="M7 5V19C8.33333 19 9.66667 19 11 19V9.5L13 19C14.3333 19 15.6667 19 17 19V5C15.6667 5 14.3333 5 13 5V14.5L11 5C9.66667 5 8.33333 5 7 5Z"
      fill="#E50914"
    />
  </svg>
);

export const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#FF0000" />
    <path d="M10 15V9L15 12L10 15Z" fill="white" />
  </svg>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
    <circle cx="18" cy="6" r="1" fill="white" />
    <defs>
      <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD600" />
        <stop offset="0.5" stopColor="#FF0069" />
        <stop offset="1" stopColor="#7638FA" />
      </linearGradient>
    </defs>
  </svg>
);

export const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0F1419" />
    <path
      d="M18.244 4.5h-3.308l-5.084 6.75-.02.023L5.432 4.5H1.5l6.575 8.73-6.575 8.77h3.308l5.44-7.227L15.356 22H19.29l-7.003-9.303L18.244 4.5zm-5.367 15.54h-1.832L6.145 5.923h1.832l6.9 14.117z"
      fill="white"
    />
  </svg>
);

export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#000000" />
    <path
      d="M16.5 8.5C16.5 8.5 15 8.5 14 7.5C13 6.5 13 5 13 5H10V15.5C10 17 9 18 7.5 18C6 18 5 17 5 15.5C5 14 6 13 7.5 13C8 13 8.5 13.2 9 13.5V10.5C8.5 10.2 8 10 7.5 10C4.5 10 2 12.5 2 15.5C2 18.5 4.5 21 7.5 21C10.5 21 13 18.5 13 15.5V10C14 11 15.5 11.5 17 11.5V8.5H16.5Z"
      fill="white"
    />
    <path
      d="M16.7 8.7C16.7 8.7 15.2 8.7 14.2 7.7C13.2 6.7 13.2 5.2 13.2 5.2H10.2V15.7C10.2 17.2 9.2 18.2 7.7 18.2C6.2 18.2 5.2 17.2 5.2 15.7C5.2 14.2 6.2 13.2 7.7 13.2C8.2 13.2 8.7 13.4 9.2 13.7V10.7C8.7 10.4 8.2 10.2 7.7 10.2C4.7 10.2 2.2 12.7 2.2 15.7C2.2 18.7 4.7 21.2 7.7 21.2C10.7 21.2 13.2 18.7 13.2 15.7V10.2C14.2 11.2 15.7 11.7 17.2 11.7V8.7H16.7Z"
      fill="#FE2C55"
    />
  </svg>
);
