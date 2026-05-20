export interface SocialLink {
  platform: string;
  url: string;
}

export interface SupportItem {
  type: string;
  value: string;
}

export interface DevInfo {
  name: string;
  bio: string;
  about: string;
  profile_image: string;
  website: string;
  social_links: SocialLink[];
  support: SupportItem[];
}
