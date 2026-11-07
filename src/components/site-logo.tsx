import Image from "next/image";
import ourLadyOfKibehoNiche from "@/assets/logo/our-lady-of-kibeho-niche.png";

// The name beside the logo already labels the link, so the image is decorative.
export function SiteLogo(): React.JSX.Element {
  return (
    <Image
      src={ourLadyOfKibehoNiche}
      alt=""
      className="h-11 w-auto"
      sizes="36px"
    />
  );
}
