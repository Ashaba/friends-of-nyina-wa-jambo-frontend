// Photos from the Kibeho shrine that rarely change, so they ship with the site
// instead of coming from the CMS. Static imports give Next.js their size and a
// blur placeholder at build time, so they never shift the layout while loading.
import altarBanner from "@/assets/photos/altar-banner.jpg";
import altarDuringMass from "@/assets/photos/altar-during-mass.jpg";
import cloudsAndLight from "@/assets/photos/clouds-and-light.jpg";
import offertoryProcession from "@/assets/photos/offertory-procession.jpg";
import ourLadyStatue from "@/assets/photos/our-lady-statue.jpg";
import outdoorAltar from "@/assets/photos/outdoor-altar.jpg";
import pathToTheShrine from "@/assets/photos/path-to-the-shrine.jpg";
import pilgrimsAtTheChurch from "@/assets/photos/pilgrims-at-the-church.jpg";
import shrineChurch from "@/assets/photos/shrine-church.jpg";
import shrineGarden from "@/assets/photos/shrine-garden.jpg";
import shrineGroundsSky from "@/assets/photos/shrine-grounds-sky.jpg";
import shrineLawns from "@/assets/photos/shrine-lawns.jpg";
import type { SitePhoto } from "@/types/site-photo";

export const sitePhotos = {
  altarBanner: {
    src: altarBanner,
    alt: "The outdoor altar at Kibeho under a banner reading Nyina wa Jambo, Udusabire",
  },
  altarDuringMass: {
    src: altarDuringMass,
    alt: "The statue of Our Lady beside the altar during Mass at Kibeho",
  },
  cloudsAndLight: {
    src: cloudsAndLight,
    alt: "Sunlight breaking through clouds over Kibeho",
  },
  offertoryProcession: {
    src: offertoryProcession,
    alt: "Women in blue carrying offerings in procession at the Kibeho shrine",
  },
  ourLadyStatue: {
    src: ourLadyStatue,
    alt: "The statue of Our Lady of Kibeho in front of the shrine church",
  },
  outdoorAltar: {
    src: outdoorAltar,
    alt: "The statue of Our Lady above the outdoor altar at Kibeho",
  },
  pathToTheShrine: {
    src: pathToTheShrine,
    alt: "The path leading to the shrine church at Kibeho",
  },
  pilgrimsAtTheChurch: {
    src: pilgrimsAtTheChurch,
    alt: "Pilgrims gathered in front of the shrine church at Kibeho",
  },
  shrineChurch: {
    src: shrineChurch,
    alt: "The shrine church of Our Lady of Kibeho in the evening light",
  },
  shrineGarden: {
    src: shrineGarden,
    alt: "The gardens beside the shrine church at Kibeho",
  },
  shrineGroundsSky: {
    src: shrineGroundsSky,
    alt: "The grounds of the Kibeho shrine under a wide blue sky",
  },
  shrineLawns: {
    src: shrineLawns,
    alt: "Pilgrims walking across the lawns of the Kibeho shrine",
  },
} satisfies Record<string, SitePhoto>;
