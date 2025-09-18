import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";

const designImages = [
  {
    src: "/pl1.jpg",
    alt: "Grafický design 1",
    title: "Logo Design"
  },
  {
    src: "/pl2.jpg",
    alt: "Grafický design 2",
    title: "Brand Identity"
  },
  {
    src: "/pl3.jpg",
    alt: "Grafický design 3",
    title: "UI/UX Design"
  },
  {
    src: "/pl4.jpg",
    alt: "Grafický design 4",
    title: "Print Design"
  },
  {
    src: "/pl5.jpg",
    alt: "Grafický design 5",
    title: "Web Design"
  },
  {
    src: "/pl6.jpg",
    alt: "Grafický design 6",
    title: "Visual Design"
  },
  {
    src: "/pl7.jpg",
    alt: "Grafický design 7",
    title: "Graphic Elements"
  },
  {
    src: "/pl8.jpg",
    alt: "Grafický design 8",
    title: "Creative Assets"
  },
  {
    src: "/pl9.jpg",
    alt: "Grafický design 9",
    title: "Design System"
  },
  {
    src: "/pl10.jpg",
    alt: "Grafický design 10",
    title: "Digital Art"
  }
];

const DesignCard = ({
  src,
  alt,
  title,
}: {
  src: string;
  alt: string;
  title: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-64 w-48 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <img
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          alt={alt}
          src={src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="text-white text-sm font-semibold truncate">{title}</h4>
        </div>
      </div>
    </figure>
  );
};

export function GrafickyDesignMarquee() {
  const firstRow = designImages.slice(0, Math.ceil(designImages.length / 2));
  const secondRow = designImages.slice(Math.ceil(designImages.length / 2));

  return (
    <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s]" repeat={2}>
        {firstRow.map((image, index) => (
          <DesignCard key={image.src} {...image} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]" repeat={2}>
        {secondRow.map((image, index) => (
          <DesignCard key={image.src} {...image} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-neutral-900/90 to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-neutral-950/90 to-transparent"></div>
    </div>
  );
}
