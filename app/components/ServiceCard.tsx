import React from 'react';
import { cn } from '@/lib/utils';

interface CardContent {
  title: string;
  description: string;
}

const CardBody = ({
  cardContent,
  className = ''
}: {
  cardContent: CardContent;
  className?: string;
}) => (
  <div className={cn(
    'text-start p-5 md:p-7 lg:p-8',
    'transition-all duration-300 ease-out',
    'group-hover:transform group-hover:translate-y-[-2px]',
    className
  )}>
    <h3 className="text-xl md:text-2xl font-bold mb-3 text-zinc-100 leading-tight tracking-tight">
      {cardContent.title}
    </h3>
    <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
      {cardContent.description}
    </p>
  </div>
);

export { CardBody };

const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth="1"
      stroke="currentColor"
      {...rest}
      className={cn("dark:text-white text-black size-6 absolute", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export const SimpleCard_V3 = ({ cardContent }: { cardContent: CardContent }) => {
  return (
    <div>
      <div className="border border-dashed border-zinc-400 dark:border-zinc-700 relative">
        <Icon className="-top-3 -left-3" />
        <Icon className="-top-3 -right-3" />
        <Icon className="-bottom-3 -left-3" />
        <Icon className="-bottom-3 -right-3" />
        <CardBody cardContent={cardContent} className="p-6" />
      </div>
    </div>
  );
};

export const SimpleCard_V2 = ({ cardContent }: { cardContent: CardContent }) => {
  const Line = ({ className = "" }) => (
    <div
      className={cn(
        "h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500",
        className
      )}
    />
  );

  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mx-auto w-full px-4 sm:px-6 md:px-8">
      <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
      <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />

      <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
      <Line className="w-px bg-gradient-to-t left-2 sm:left-4 md:left-6 h-full inset-y-0" />
      <div className="relative z-20 mx-auto py-8">{children}</div>
    </div>
  );

  return (
    <Container>
      <div className="p-4 w-full center">
        <CardBody cardContent={cardContent} />
      </div>
    </Container>
  );
};

export const CardWithLines = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative w-full rounded-xl overflow-hidden",
        "bg-zinc-950/50 backdrop-blur-sm",
        "p-1 transition-all duration-300 ease-out",
        "hover:bg-zinc-950/70 hover:shadow-lg",
        "hover:shadow-zinc-900/20 hover:scale-[1.02]",
        "focus-within:ring-2 focus-within:ring-zinc-600/50 focus-within:ring-offset-2",
        "focus-within:ring-offset-zinc-950",
        className
      )}
    >
      <div className="size-full bg-[url(/svg/circle-ellipsis.svg)] bg-repeat bg-[length:32px_32px] relative">
        <div className="size-full bg-gradient-to-br from-zinc-950/90 via-zinc-950/70 to-zinc-900/20">
          <div className="relative z-10 size-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Service card contents
export const serviceCards = [
  {
    title: "Design značky",
    description: "Kompletní design identity značky včetně loga, barevné palety, typografie a směrnic značky."
  },
  {
    title: "Webový design",
    description: "Responzivní webový design s moderní estetikou a optimální uživatelskou zkušeností."
  },
  {
    title: "Tiskový design",
    description: "Poutavé tiskové materiály, které efektivně komunikují vaši zprávu."
  },
  {
    title: "Digitální marketing",
    description: "Grafika na sociální média a marketingové materiály, které zvyšují angažovanost."
  }
];
