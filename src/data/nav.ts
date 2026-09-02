export interface NavItem {
  label: string;
  href: string;
  title: string;
}

/** Primary site navigation, in the order the original site displayed it. */
export const navItems: NavItem[] = [
  { label: 'FEATURES', href: '/features/', title: 'Rhythm Rascal Features' },
  { label: 'DOWNLOAD', href: '/download/', title: 'Download Rhythm Rascal Software' },
  { label: 'REGISTER', href: '/register/', title: 'Register Rhythm Rascal' },
  { label: 'HEAR IT', href: '/samples/', title: 'Hear sample music created with Rhythm Rascal' },
  { label: 'FAQ', href: '/faq/', title: 'Frequently Asked Questions' },
  { label: 'SUPPORT', href: '/contact/', title: 'Contact Support' },
  { label: 'ABOUT', href: '/about/', title: 'About the Author' },
];

export const siteName = 'Rhythm Rascal - Software Drum Machine Program';
export const supportEmail = 'brown.randy@gmail.com';

/**
 * The ORIGINAL-MUSIC sample pack is 33 MiB, over the 25 MiB per-file limit of
 * Cloudflare Pages, so it is hosted as a GitHub Release asset instead of in public/.
 * The file lives locally in release-assets/ (gitignored). See README "Large files".
 */
export const sampleZipUrl =
  'https://github.com/randbrown/rhythmrascalweb/releases/download/assets/Original-Music-Free.zip';
