export interface VidharaCreativeItem {
  id: number;
  numberTag: string;
  title: string;
  category: "Campaign" | "Social" | "Brand" | "Cultural";
  image: string;
  thumbnail: string;
  aspectRatio: string; // e.g. "4/5"
  caption: string;
  description: string;
}

export const VIDHARA_CREATIVES: VidharaCreativeItem[] = [
  {
    id: 1,
    numberTag: "01",
    title: "Vidhara Hero Launch Creative",
    category: "Campaign",
    image: "/projects/vidhara/creative-01.webp",
    thumbnail: "/projects/vidhara/creative-01-thumb.webp",
    aspectRatio: "4/5",
    caption: "Vidhara — Key Campaign Launch",
    description: "Bold typography and high-impact visual composition created for campaign announcement."
  },
  {
    id: 2,
    numberTag: "02",
    title: "Vidhara Brand Storytelling",
    category: "Brand",
    image: "/projects/vidhara/creative-02.webp",
    thumbnail: "/projects/vidhara/creative-02-thumb.webp",
    aspectRatio: "4/5",
    caption: "Vidhara — Brand Identity Narrative",
    description: "Editorial layout highlighting brand aesthetic, texture, and visual storytelling."
  },
  {
    id: 3,
    numberTag: "03",
    title: "Vidhara Cultural Reference Creative",
    category: "Cultural",
    image: "/projects/vidhara/creative-03.webp",
    thumbnail: "/projects/vidhara/creative-03-thumb.webp",
    aspectRatio: "4/5",
    caption: "Vidhara — Cultural Heritage Motif",
    description: "Blending traditional cultural motifs with contemporary digital design aesthetics."
  },
  {
    id: 4,
    numberTag: "04",
    title: "Vidhara Engagement Creative",
    category: "Social",
    image: "/projects/vidhara/creative-04.webp",
    thumbnail: "/projects/vidhara/creative-04-thumb.webp",
    aspectRatio: "4/5",
    caption: "Vidhara — Social Engagement Post",
    description: "Mobile-first composition designed for instant scroll-stopping visual engagement."
  },
  {
    id: 5,
    numberTag: "05",
    title: "Vidhara Promotional Feature",
    category: "Campaign",
    image: "/projects/vidhara/creative-05.webp",
    thumbnail: "/projects/vidhara/creative-05-thumb.webp",
    aspectRatio: "4/5",
    caption: "Vidhara — Campaign Promotion",
    description: "High-contrast visual hierarchy framing core brand messaging and product value."
  },
  {
    id: 6,
    numberTag: "06",
    title: "Vidhara Signature Showcase",
    category: "Brand",
    image: "/projects/vidhara/creative-06.webp",
    thumbnail: "/projects/vidhara/creative-06-thumb.webp",
    aspectRatio: "4/5",
    caption: "Vidhara — Signature Visual Identity",
    description: "Refined minimalist creative celebrating clean design structure and artistic balance."
  }
];

export const VIDHARA_CASE_STUDY_META = {
  title: "VIDHARA",
  heading: "Social Media Creative Campaign",
  supportingText: "Building a distinctive visual language for social media through bold composition, cultural references and consistent brand storytelling.",
  role: "Graphic Designer",
  category: "Social Media Design",
  deliverables: "Instagram Posts · Campaign Creatives · Brand Content",
  visualDirection: {
    heading: "Visual Direction",
    body: "Vidhara’s social media creatives use a recognizable visual language to make brand communication feel contemporary, culturally relevant and visually memorable.",
    points: [
      {
        number: "01",
        title: "VISUAL LANGUAGE",
        description: "Consistent typography, composition and visual treatment across social content."
      },
      {
        number: "02",
        title: "CULTURAL STORYTELLING",
        description: "Use cultural and visual references to make individual creatives more relatable and engaging."
      },
      {
        number: "03",
        title: "SOCIAL-FIRST DESIGN",
        description: "Designed specifically for fast visual recognition and mobile-first consumption."
      }
    ]
  }
};
