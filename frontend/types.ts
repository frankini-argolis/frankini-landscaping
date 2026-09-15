export type Page = 'home' | 'services' | 'about' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
}