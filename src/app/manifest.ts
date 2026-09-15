import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ABHISHEK — Visual Creative & UI/UX Architect",
    short_name: "ABHISHEK",
    description:
      "Personal portfolio and digital design studio of Abhishek. Specializing in visual identities, 3D art direction, social campaign design & Next.js creative development.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F3",
    theme_color: "#FFB800",
    icons: [
      {
        src: "/my-image.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/my-image.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
