interface SocialIconProps {
  icon: 'mail' | 'linkedin' | 'instagram' | 'github' | 'wix';
}

export function SocialIcon({ icon }: SocialIconProps) {
  const baseClass = 'block fill-current';

  if (icon === 'mail') {
    return (
      <svg aria-hidden="true" className={`${baseClass} w-[18px] h-[18px]`} viewBox="0 0 24 24">
        <rect className="fill-none stroke-current stroke-2" height="14" rx="2.5" width="18" x="3" y="5" />
        <path className="fill-none stroke-current stroke-2" d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (icon === 'linkedin') {
    return (
      <svg aria-hidden="true" className={`${baseClass} w-[17px] h-[17px]`} viewBox="0 0 24 24">
        <path d="M5.2 8.9H1.8V22h3.4V8.9ZM3.5 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7.3 6.9H7.5V22h3.4v-6.7c0-1.8.3-3.5 2.5-3.5 2.2 0 2.2 2 2.2 3.6V22H19v-7.5c0-3.7-.8-6.5-5.1-6.5-2 0-3.4 1.1-4 2.2h-.1V8.9Z" />
      </svg>
    );
  }

  if (icon === 'instagram') {
    return (
      <svg aria-hidden="true" className={`${baseClass} w-[17px] h-[17px]`} viewBox="0 0 24 24">
        <rect className="fill-none stroke-current stroke-2" height="17" rx="5" width="17" x="3.5" y="3.5" />
        <circle className="fill-none stroke-current stroke-2" cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.2" />
      </svg>
    );
  }

  if (icon === 'github') {
    return (
      <svg aria-hidden="true" className={`${baseClass} w-[17px] h-[17px]`} viewBox="0 0 24 24">
        <path d="M12 .8C5.8.8.8 5.8.8 12c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3.1 1.1.9-.2 1.8-.4 2.8-.4s1.9.1 2.8.4c2.1-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.3.8 1 .8 2.1v3.2c0 .3.2.7.8.6A11.2 11.2 0 0 0 23.2 12C23.2 5.8 18.2.8 12 .8Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={`${baseClass} w-[22px] h-[17px]`} viewBox="0 0 32 24">
      <path d="M2 6.5h3.1l2.1 8.1 2.4-8.1h2.6l2.4 8.1 2.1-8.1h3.1L16 19h-2.7L11 11.5 8.7 19H6L2 6.5Z" />
      <path d="M21.1 6.5h2.8V19h-2.8V6.5Z" />
      <path d="M29.8 6.5 27.2 11l2.8 8h-3l-1.5-4.6L22.9 19h-3l4.2-6.9-2-5.6h3l1.1 3.3 1.8-3.3h1.8Z" />
    </svg>
  );
}
