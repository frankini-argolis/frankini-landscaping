import { ServiceItem, Testimonial } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'one-time-cut',
    title: 'One-Time Grass Cutting',
    shortDesc: 'On-demand mowing, edge trimming, and complete cleanup. No strings attached.',
    fullDesc: 'Need your lawn looking sharp for the weekend but don\'t want to sign a season-long contract? Our one-time grass cutting service is built for convenience. We show up, provide a precision mow, meticulously trim the edges, and clean up all clippings. Fast, easy, and completely on your terms.',
    iconName: 'Leaf',
    imageUrl: 'https://picsum.photos/seed/mowing/800/600'
  },
  {
    id: 'monthly-contract',
    title: 'Monthly Autopilot (Discounted)',
    shortDesc: 'Subscribe and save. We monitor your property and maintain it as needed.',
    fullDesc: 'Put your property care on autopilot. With our monthly subscription, you get a discounted rate and zero mental overhead. We monitor the weather and the growth of your lawn, showing up exactly when maintenance is needed. It is the ultimate "set it and forget it" landscaping experience.',
    iconName: 'CheckCircle',
    imageUrl: 'https://picsum.photos/seed/perfectlawn/800/600'
  },
  {
    id: 'fall-cleanup',
    title: 'Fall Leaf Clean Up',
    shortDesc: 'Rapid, thorough removal of autumn leaves and debris.',
    fullDesc: 'Don\'t spend your weekends bagging leaves. Our rapid-response fall cleanup team uses commercial-grade equipment to clear your yard of leaves, branches, and seasonal debris in a fraction of the time. One click, and your yard is spotless before the first snow hits.',
    iconName: 'Flower2',
    imageUrl: 'https://picsum.photos/seed/leaves/800/600'
  },
  {
    id: 'snow-ice',
    title: 'Winter Snow & Ice Melting',
    shortDesc: 'Reliable clearing and salting to keep your property safe and accessible.',
    fullDesc: 'When winter storms hit Long Island, you need a team that acts fast. We provide rapid snow clearing and professional-grade ice melting services. Keep your driveways and walkways safe without lifting a shovel. Just request service, and we\'ll handle the freeze.',
    iconName: 'Snowflake',
    imageUrl: 'https://picsum.photos/seed/snow/800/600'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    location: 'Rockville Centre, NY',
    text: 'Finally, a landscaping company that operates like a modern business! I got a quote through their bot in 30 seconds, and they mowed my lawn the next day. Incredible.'
  },
  {
    id: 't2',
    name: 'Michael T.',
    location: 'Oceanside, NY',
    text: 'I signed up for the monthly autopilot plan. I don\'t even have to call them; they just know when the yard needs work and they show up. Best decision I\'ve made for my house.'
  },
  {
    id: 't3',
    name: 'The Harrison Family',
    location: 'Rockville Centre, NY',
    text: 'No waiting days for a callback. No confusing estimates. Frankini is completely disrupting how property maintenance is done around here. Fast, clean, and super easy.'
  }
];

export const companyInfo = {
  name: 'Frankini Landscaping',
  phone: '(516) 555-0198',
  email: 'frankinihousing@gmail.com',
  address: 'Rockville Centre, NY 11570',
  serviceArea: 'Rockville Centre, Oceanside, Lynbrook, and surrounding South Shore communities.'
};
