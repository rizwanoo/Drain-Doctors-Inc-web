export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  highlights: string[];
  primaryImage: string;
  secondaryImage?: string;
  imageAlt: string;
  secondaryImageAlt?: string;
  themeBg: 'ivory' | 'sky' | 'blue' | 'mint' | 'aqua';
}

export interface ProjectWorkItem {
  id: string;
  title: string;
  category: 'Drain & Rooter' | 'Hydro Jetting' | 'Sewer & Camera';
  locationLabel: string;
  summary: string;
  image: string;
  alt: string;
}

export const BUSINESS_INFO = {
  name: 'Drain Doctors Inc.',
  positioning: 'Your SoCal Plumbing & Drain Experts.',
  tagline: 'Expert Drain Solutions. Fast Response. Lasting Results.',
  phoneDisplay: '(661) 874-6424',
  phoneHref: 'tel:+16618746424',
  email: 'draindoctorsinc@gmail.com',
  emailHref: 'mailto:draindoctorsinc@gmail.com',
  licenseNumber: '1112197',
  licenseClassification: 'California C-36 Plumbing Contractor',
  cslbVerifyUrl:
    'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1112197',
  baseCity: 'Lancaster, CA',
  region: 'Southern California',
  serviceAreas: [
    'Lancaster & Palmdale',
    'Antelope Valley',
    'Santa Clarita Valley',
    'San Fernando Valley',
  ],
  instagramUrl: 'https://www.instagram.com/draindrinc/',
  threadsUrl: 'https://www.threads.com/@draindrinc',
  websiteUrl: 'https://draindoctorsinc.com',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Lancaster,CA+93535&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Lancaster+CA+93535',
  logos: {
    horizontal: '/assets/images/drain-doctors/logo/website-logo.png',
    horizontalNoTagline:
      '/assets/images/drain-doctors/logo/logo-without-tagline.png',
    horizontalWithTagline:
      '/assets/images/drain-doctors/logo/logo-with-tagline.png',
    stacked: '/assets/images/drain-doctors/logo/stacked-logo.png',
    shieldIcon: '/assets/images/drain-doctors/logo/shield-icon.png',
    mascotLight: '/assets/images/drain-doctors/logo/mascot-logo-light.png',
  },
} as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'drain-cleaning',
    number: '01',
    slug: 'drain-cleaning',
    title: 'Professional Drain Cleaning',
    shortTitle: 'Drain Cleaning',
    summary:
      'Targeted clearing for kitchen sinks, bathroom drains, floor drains, and recurring backups across residential and commercial properties.',
    description:
      'A slow or clogged drain is almost always a symptom of deeper buildup inside the line. Instead of temporary chemical quick-fixes that can wear down older piping, Drain Doctors Inc. clears accumulated grease, soap residue, hair, and scale thoroughly so fixtures drain cleanly again.',
    highlights: [
      'Kitchen, bathroom, shower & floor drain clearing',
      'Cleanout access & P-trap disassembly when needed',
      'Safe mechanical clearing without harsh pipe-corroding chemicals',
      'Residential homes, multi-unit properties & commercial kitchens',
    ],
    primaryImage:
      '/assets/images/drain-doctors/drain-cleaning/cast-iron-cleanout-rooter.jpg',
    secondaryImage:
      '/assets/images/drain-doctors/drain-cleaning/floor-drain-clearing.png',
    imageAlt:
      'Drain Doctors Inc. rooter cable entering a cast-iron cleanout fitting during drain cleaning',
    secondaryImageAlt:
      'Technician clearing a tiled bathroom floor drain with a flexible clearing hose',
    themeBg: 'ivory',
  },
  {
    id: 'rooter-services',
    number: '02',
    slug: 'rooter-services',
    title: 'Rooter & Mechanical Cable Clearing',
    shortTitle: 'Rooter Services',
    summary:
      'Heavy-duty motorized rooter cable machines engineered to punch through compacted blockages and restore main line flow.',
    description:
      'When main building drains or stubborn branch lines back up, consumer snakes simply cannot reach or cut through dense obstructions. Our drum rooter equipment and specialty cutting heads clear compacted debris, paper buildup, and early-stage root intrusions safely through existing cleanouts.',
    highlights: [
      'Main sewer & branch line motorized cable clearing',
      'Under-sink and cleanout cable feeding with surface protection',
      'Eliminates recurring slow-drain backups',
      'Follow-up flow verification before we wrap up',
    ],
    primaryImage:
      '/assets/images/drain-doctors/rooter-services/rooter-drum-machine.png',
    secondaryImage:
      '/assets/images/drain-doctors/company-photography/under-sink-cable-clearing.png',
    imageAlt:
      'Commercial drum rooter cable machine staged next to residential copper water lines',
    secondaryImageAlt:
      'Technician guiding a drain clearing cable cleanly into an under-sink cleanout',
    themeBg: 'sky',
  },
  {
    id: 'hydro-jetting',
    number: '03',
    slug: 'hydro-jetting',
    title: 'High-Pressure Hydro Jetting',
    shortTitle: 'Hydro Jetting',
    summary:
      'Trailer-mounted high-pressure water jetting that scours grease, sludge, scale, and root intrusion wall-to-wall.',
    description:
      'Standard snaking pokes a path through soft grease—only for the clog to close right back up weeks later. Our trailer-mounted hydro jetting system delivers pressurized water jets around the full 360-degree interior circumference of qualifying pipes, stripping away years of grease, mineral scale, and debris without chemicals.',
    highlights: [
      '360-degree pipe-wall scouring for heavy grease & sludge',
      'Effective on commercial grease traps & main sewer lines',
      'Chemical-free, water-powered line restoration',
      'Ideal preventative maintenance after camera evaluation',
    ],
    primaryImage:
      '/assets/images/drain-doctors/sewer-and-drainage/hydro-jetting-operation.webp',
    secondaryImage:
      '/assets/images/drain-doctors/equipment/spartan-jetter-trailer.jpg',
    imageAlt:
      'Technician operating a trailer-mounted high-pressure hydro-jetter nozzle inside an open drain line',
    secondaryImageAlt:
      'Spartan Soldier trailer-mounted hydro jetting rig displaying California License #1112197',
    themeBg: 'blue',
  },
  {
    id: 'sewer-camera',
    number: '04',
    slug: 'sewer-camera-inspection',
    title: 'Sewer Camera Inspection',
    shortTitle: 'Sewer Camera',
    summary:
      'High-definition fiber-optic sewer camera diagnostics to pinpoint cracks, bellies, offsets, and tree root intrusion.',
    description:
      'Guesswork leads to unnecessary digging. Using professional Ridgid SeeSnake sewer inspection cameras and locators, we feed a live video probe directly through your sewer lateral to see exact pipe material, joint condition, root entry points, and blockage depth before any repair decision is made.',
    highlights: [
      'Real-time interior pipe inspection before major work',
      'Pinpoints root intrusion, cracks, offsets & collapsed sections',
      'Helps property buyers, landlords & managers assess sewer health',
      'Accurate line locating so excavation stays minimal',
    ],
    primaryImage:
      '/assets/images/drain-doctors/sewer-and-drainage/sewer-camera-inspection.png',
    secondaryImage:
      '/assets/images/drain-doctors/sewer-and-drainage/manhole-line-inspection.png',
    imageAlt:
      'Technician feeding a Ridgid SeeSnake sewer inspection camera reel into an exterior cleanout',
    secondaryImageAlt:
      'Technician inspecting an exterior underground sewer access shaft with camera line',
    themeBg: 'mint',
  },
  {
    id: 'sewer-repair-trenchless',
    number: '05',
    slug: 'sewer-line-repair',
    title: 'Sewer Line Repair & Trenchless Replacement',
    shortTitle: 'Sewer Repair',
    summary:
      'Targeted sewer line repairs and modern trenchless replacement options designed to minimize property and driveway disruption.',
    description:
      'When camera diagnostics reveal cracked clay, corroded cast iron, or shifted joints that cleaning alone cannot resolve, Drain Doctors Inc. delivers targeted sewer line repairs and qualifying trenchless replacements that protect your landscaping, walkways, and hardscaping.',
    highlights: [
      'Targeted spot repairs for damaged sewer segments',
      'Cleanout installation & PVC/ABS transition assemblies',
      'Low-disruption trenchless sewer replacement for qualifying lines',
      'Built for long-term Southern California residential & commercial reliability',
    ],
    primaryImage:
      '/assets/images/drain-doctors/sewer-and-drainage/sewer-trench-repair.png',
    secondaryImage:
      '/assets/images/drain-doctors/plumbing-projects/pvc-drain-pipe-assembly.png',
    imageAlt:
      'Technician fitting a replacement underground sewer pipe inside an excavated trench',
    secondaryImageAlt:
      'Plumber solvent-welding heavy-duty PVC drainage pipe elbows in a clean trench',
    themeBg: 'aqua',
  },
];

export const PROJECT_GALLERY: ProjectWorkItem[] = [
  {
    id: 'work-spartan-jetter',
    title: 'Spartan Soldier Hydro-Jetter Deployment',
    category: 'Hydro Jetting',
    locationLabel: 'Southern California',
    summary:
      'Trailer-mounted Spartan Soldier high-pressure water jetter staged on site with California Contractor License #1112197.',
    image: '/assets/images/drain-doctors/equipment/spartan-jetter-trailer.jpg',
    alt: 'Spartan Soldier trailer-mounted hydro-jetting unit on residential driveway with Lic #1112197',
  },
  {
    id: 'work-cleanout-cable',
    title: 'Cast-Iron Cleanout Rooter Clearing',
    category: 'Drain & Rooter',
    locationLabel: 'Lancaster & Antelope Valley',
    summary:
      'Mechanical cable feeding through an exposed cast-iron cleanout tee with protective floor tarping to keep the work area spotless.',
    image:
      '/assets/images/drain-doctors/drain-cleaning/cast-iron-cleanout-rooter.jpg',
    alt: 'Heavy-duty rooter cable feeding into an open cast-iron cleanout pipe over protective tarps',
  },
  {
    id: 'work-hydro-rig',
    title: 'High-Volume Main Line Hydro Jetting',
    category: 'Hydro Jetting',
    locationLabel: 'Antelope Valley',
    summary:
      'Pressurized multi-jet nozzle flushing heavy debris and buildup cleanly through large-diameter drainage piping.',
    image:
      '/assets/images/drain-doctors/sewer-and-drainage/hydro-jetting-operation.webp',
    alt: 'Trailer-mounted hydro jetter spraying high-pressure water inside a concrete drainage line',
  },
  {
    id: 'work-camera-seesnake',
    title: 'Ridgid SeeSnake Sewer Lateral Diagnostics',
    category: 'Sewer & Camera',
    locationLabel: 'Santa Clarita & Lancaster',
    summary:
      'Live fiber-optic camera feed inspecting underground lateral condition directly from an exterior cleanout cap.',
    image:
      '/assets/images/drain-doctors/sewer-and-drainage/sewer-camera-inspection.png',
    alt: 'Technician feeding an orange Ridgid SeeSnake sewer camera cable into a cleanout',
  },
  {
    id: 'work-drum-rooter',
    title: 'Commercial Drum Rooter Setup',
    category: 'Drain & Rooter',
    locationLabel: 'San Fernando Valley',
    summary:
      'Wheeled heavy-duty drum cable machine positioned for main line clearing on commercial and residential properties.',
    image:
      '/assets/images/drain-doctors/rooter-services/rooter-drum-machine.png',
    alt: 'Green and red wheeled drum rooter machine staged inside a utility room',
  },
  {
    id: 'work-trench-repair',
    title: 'Targeted Sewer Lateral Trench Repair',
    category: 'Sewer & Camera',
    locationLabel: 'Lancaster, CA',
    summary:
      'Precision underground pipe replacement and clean transition coupling installation following camera location.',
    image:
      '/assets/images/drain-doctors/sewer-and-drainage/sewer-trench-repair.png',
    alt: 'Technician aligning a replacement underground sewer pipe in a narrow trench',
  },
  {
    id: 'work-sink-trap',
    title: 'Kitchen & Vanity P-Trap Diagnostics',
    category: 'Drain & Rooter',
    locationLabel: 'Southern California',
    summary:
      'Disassembly, blockage removal, and re-sealing of residential drain traps and under-sink waste assemblies.',
    image:
      '/assets/images/drain-doctors/drain-cleaning/sink-trap-service.png',
    alt: 'Technician servicing a chrome sink P-trap assembly',
  },
  {
    id: 'work-cleanout-flush',
    title: 'Exterior Cleanout High-Flow Flushing',
    category: 'Hydro Jetting',
    locationLabel: 'Antelope Valley',
    summary:
      'Clearing impacted grease and mineral obstruction from an exterior PVC sanitary cleanout stack.',
    image:
      '/assets/images/drain-doctors/rooter-services/cleanout-jetting-flush.png',
    alt: 'Technician flushing a white PVC exterior cleanout stack with pressurized hose',
  },
];
