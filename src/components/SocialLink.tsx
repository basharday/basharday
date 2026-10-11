import { Github, Linkedin, type LucideIcon } from 'lucide-react';
import { safeExternalUrl } from '../lib/links';

type Platform = 'github' | 'linkedin';
const icons: Record<Platform, LucideIcon> = { github: Github, linkedin: Linkedin };
export function SocialLink({ platform, url, variant = 'icon' }: {
  platform: Platform;
  url: string | null;
  variant?: 'icon' | 'text';
}) {
  const Icon = icons[platform];
  const label = platform === 'github' ? 'GitHub' : 'LinkedIn';
  const href = safeExternalUrl(url);
  const content = <><Icon size={18} strokeWidth={1.8} /><span className={variant === 'icon' ? 'sr-only' : ''}>{label}</span></>;
  const classes = variant === 'icon'
    ? 'social-icon'
    : 'inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600';
  return href ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in new tab)`}>{content}</a>
  ) : (
    <span className={`${classes} cursor-not-allowed opacity-45`} title={`Add your ${label} URL in src/data/portfolio.ts`} aria-label={`${label} link not configured`}>{content}</span>
  );
}
