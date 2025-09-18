'use client';
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import NextImage from 'next/image';
import { AnimeNavBar } from '@/components/ui/anime-navbar';
import { projects } from './data/projects';
import { ProjectCard } from './components/ProjectCard';
import { CardWithLines, CardBody, serviceCards } from './components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiTypescript, SiWordpress, SiNextdotjs, SiVuedotjs } from 'react-icons/si';
import { Home as HomeIcon, FileText, CreditCard, Info } from 'lucide-react';
import { RotateWords } from './components/RotateWords';
import { useScrollTrigger, fadeInUp, staggerChildren, scaleIn, cardReveal, cardSlideIn, cardBounce, cardFlip } from './hooks/useGSAPScrollTrigger';
import { Preloader } from './components/Preloader';
import { TestimonialsMarquee } from './components/TestimonialsMarquee';
import { GrafickyDesignMarquee } from './components/GrafickyDesign';
import { CookieBanner, useCookieConsent } from './components/ui/cookie-banner';
import { HeroSection } from './components/ui/hero-section';
import HeroNew from './components/ui/heronew';
import { TextScramble } from "@/components/ui/text-scramble"
import Script from 'next/script'


const navItems = [
  { name: 'Home', url: '#', icon: HomeIcon },
  { name: 'O nás', url: '#about', icon: FileText },
  { name: 'Služby', url: '#services-heading', icon: CreditCard },
  { name: 'Kontakt', url: '#contact', icon: Info },
];

const TypingAnimation = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Cursor blink speed

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div>
      <pre className="text-white leading-tight select-none">
      </pre>
      <div className="text-white mt-2">
        $ {showCursor ? '█' : ' '}
      </div>
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { consent, acceptCookies, rejectCookies, updatePreferences } = useCookieConsent();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show preloader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Preloader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      <div className="min-h-screen bg-neutral-950 text-gray-100">
        {/* Navigation Menu - AnimeNavBar */}
        {!isLoading && <AnimeNavBar items={navItems} defaultActive="Home" />}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroNew
          title="Moderní webové řešení pro vaši značku"
          description="Specializujeme se na tvorbu moderních webových aplikací, e-shopů a digitálních řešení. Pomáháme firmám růst prostřednictvím inovativních technologií."
          backgroundUrl="/ikonka.png"
          showBadge={false}
          rotatingPrefix="Moderní řešení pro"
          rotatingWords={[
            "vaši značku",
            "váš web",
            "váš e-shop",
            "vaši mobilní aplikaci",
            "váš grafický design",
          ]}
          badgeText="CodeGrip"
          badgeLabel="New"
          ctaButtons={[
            { text: "Začít projekt", href: "#footer", primary: true },
            { text: "Naše služby", href: "#services-heading" }
          ]}
          microDetails={["React & Next.js", "Moderní design", "Rychlý vývoj"]}
        />
      </section>

      

      {/* Enhanced Projects Section */}
      <section
        ref={useScrollTrigger((element) => {
          const cardElement = element.querySelector('.card-content');
          const titleElement = element.querySelector('h2');
          const descriptionElement = element.querySelector('p');

          const cardAnimation = cardElement ? cardReveal(cardElement as HTMLElement, 0) : gsap.timeline();
          const titleAnimation = titleElement ? fadeInUp(titleElement, 0.3) : gsap.timeline();
          const descriptionAnimation = descriptionElement ? fadeInUp(descriptionElement, 0.5) : gsap.timeline();

          const cardsAnimation = staggerChildren(element, '.group', 0.7);

          return gsap.timeline()
            .add(cardAnimation)
            .add(titleAnimation, '-=0.8')
            .add(descriptionAnimation, '-=0.6')
            .add(cardsAnimation, '-=0.4');
        })}
        id="projects"
        className="min-h-screen flex items-center justify-center py-24 px-6"
      >
        <div className="card-content w-full max-w-7xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-purple-500/20 p-12 md:p-16">
          <div className="text-center mb-20">
            <TextScramble
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-center tracking-wide text-white leading-tight"
              duration={1.2}
              speed={0.02}
            >
              Naše projekty
            </TextScramble>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Představujeme výběr našich nejnovějších projektů, které ukazují naši schopnost vytvářet inovativní řešení
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                imageSrc={p.imageSrc}
                imageAlt={p.imageAlt}
                title={p.title}
                description={p.description}
                tags={p.tags}
                category={p.category}
                categoryColor={p.categoryColor}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-8 text-lg">
              Máte projekt v hlavě? Pojďme ho uvést do života.
            </p>
            <a href="#footer" className="hero-cta group px-8 py-4 text-lg font-light tracking-wide rounded-full border-2 text-white border-white hover:bg-white/5 hover:border-white/60 hover:text-white transition-all duration-500 transform hover:scale-105 bg-transparent inline-flex items-center justify-center">
              <span className="relative z-10">Začít projekt</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        ref={useScrollTrigger((element) => {
          const cardElement = element.querySelector('.card-content');
          const titleElement = element.querySelector('h2');
          const textElements = element.querySelectorAll('p');

          const cardAnimation = cardElement ? cardSlideIn(cardElement as HTMLElement, 'left', 0) : gsap.timeline();
          const titleAnimation = titleElement ? fadeInUp(titleElement, 0.3) : gsap.timeline();

          return gsap.timeline()
            .add(cardAnimation)
            .add(titleAnimation, '-=0.8')
            .add(gsap.fromTo(textElements, {
              opacity: 0,
              x: -50
            }, {
              opacity: 1,
              x: 0,
              duration: 1,
              stagger: 0.2,
              ease: 'power2.out'
            }), '-=0.5');
        })}
        id="about"
        className="min-h-screen flex items-center justify-center py-20 px-6"
      >
        <div className="card-content w-full max-w-6xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-blue-500/20 p-12 md:p-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20">
                <NextImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Team collaboration and development work"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <div className="flex-1 text-left">
            <TextScramble
              as="h2"
              className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-white"
              duration={1.0}
              speed={0.03}
            >
              O nás
            </TextScramble>
            <p className="text-lg font-light leading-relaxed mb-8 text-gray-300">
              Jsme tým vášnivých vývojářů a designerů s více než 8 lety zkušeností v tvorbě moderních webových aplikací,
              e-shopů a digitálních řešení. Naše práce se zaměřuje na čistou estetiku, uživatelsky orientovaný design
              a pozornost k technickým detailům.
            </p>
            <p className="text-lg font-light leading-relaxed text-gray-300">
              CodeGrip kombinuje kreativní design s pokročilými technologiemi, aby vytvářel řešení, která nejen vypadají
              skvěle, ale také přinášejí skutečnou hodnotu našim klientům. Specializujeme se na React, Next.js,
              Node.js a moderní designové systémy.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* My Services Section */}
      <section
        ref={useScrollTrigger((element) => {
          const cardElement = element.querySelector('.card-content');
          const titleElement = element.querySelector('h2');
          const descriptionElement = element.querySelector('p');

          const cardAnimation = cardElement ? cardBounce(cardElement as HTMLElement, 0) : gsap.timeline();
          const titleAnimation = titleElement ? fadeInUp(titleElement, 0.3) : gsap.timeline();
          const descriptionAnimation = descriptionElement ? fadeInUp(descriptionElement, 0.5) : gsap.timeline();

          const cardsAnimation = staggerChildren(element, 'article', 0.7);

          return gsap.timeline()
            .add(cardAnimation)
            .add(titleAnimation, '-=0.8')
            .add(descriptionAnimation, '-=0.6')
            .add(cardsAnimation, '-=0.4');
        })}
        className="min-h-screen flex items-center justify-center py-24 px-6"
        aria-labelledby="services-heading"
      >
        <div className="card-content relative w-full max-w-7xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-purple-500/20 ring-1 ring-white/10 p-12 md:p-16">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
          <header className="text-center mb-20">
            <div id="services-heading">
              <TextScramble
                as="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-center tracking-wide text-white leading-tight"
                duration={1.4}
                speed={0.025}
              >
                Naše služby
              </TextScramble>
            </div>
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Profesionální designové služby pro vaši značku a digitální přítomnost
            </p>
          </header>

          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-10"
            role="list"
            aria-label="Seznam služeb"
          >
            {serviceCards.map((card: { title: string; description: string }, index: number) => (
              <article key={index} role="listitem" className="group">
                <CardWithLines index={index}>
                  <CardBody cardContent={card} />
                </CardWithLines>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Promo Section */}
      <section
        ref={useScrollTrigger((element) => {
          const cardElement = element.querySelector('.promo-card');
          const titleElement = element.querySelector('h2');
          const subtitleElement = element.querySelector('h3');
          const descriptionElement = element.querySelector('p');
          const badgeElement = element.querySelector('.promo-badge');
          const benefits = element.querySelectorAll('.benefit-item');

          const cardAnimation = cardElement ? cardReveal(cardElement as HTMLElement, 0) : gsap.timeline();
          const titleAnimation = titleElement ? fadeInUp(titleElement, 0.3) : gsap.timeline();
          const subtitleAnimation = subtitleElement ? fadeInUp(subtitleElement, 0.5) : gsap.timeline();
          const descriptionAnimation = descriptionElement ? fadeInUp(descriptionElement, 0.7) : gsap.timeline();
          const badgeAnimation = badgeElement ? cardBounce(badgeElement as HTMLElement, 0.9) : gsap.timeline();

          const benefitsAnimation = staggerChildren(element, '.benefit-item', 1.1);

          return gsap.timeline()
            .add(cardAnimation)
            .add(titleAnimation, '-=0.8')
            .add(subtitleAnimation, '-=0.6')
            .add(descriptionAnimation, '-=0.4')
            .add(badgeAnimation, '-=0.2')
            .add(benefitsAnimation, '-=0.1');
        })}
        className="min-h-screen flex items-center justify-center py-24 px-6 bg-gradient-to-br from-neutral-950 via-neutral-900/50 to-neutral-950 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="promo-card w-full max-w-7xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-purple-500/20 p-12 md:p-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="text-left">
              {/* Exclusive Badge */}
              <div className="promo-badge inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-purple-300 text-sm font-medium">Exkluzivní nabídka pro všechny klienty</span>
              </div>

              <TextScramble
                as="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-wide text-white leading-tight"
                duration={1.6}
                speed={0.022}
              >
                Hosting + Doména ZDARMA na 1 rok
              </TextScramble>

              <h3 className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                S každou objednávkou webových stránek získáte hosting a doménu zcela zdarma na celý první rok.
              </h3>

              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                Tato exkluzivní nabídka je dostupná pro všechny klienty CodeGrip bez ohledu na velikost projektu.
                Ušetřete tisíce korun a spusťte svůj projekt bez počátečních nákladů.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-10">
                <div className="benefit-item flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Rychlé SSD hostingové řešení</span>
                </div>
                <div className="benefit-item flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Premium doména v ceně</span>
                </div>
                <div className="benefit-item flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Automatické zálohování</span>
                </div>
                <div className="benefit-item flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">24/7 technická podpora</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="hero-cta group px-8 py-4 text-lg font-light tracking-wide rounded-full border-2 text-white border-white hover:bg-white/5 hover:border-white/60 hover:text-white transition-all duration-500 transform hover:scale-105 bg-transparent inline-flex items-center justify-center">
                  <span className="relative z-10">Využít nabídku</span>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative group">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 ring-1 ring-white/10">
                <NextImage
                  src="https://images.unsplash.com/photo-1667036679091-6da384768075?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Professional web developer typing website URL in browser address bar"
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3),transparent_60%)]"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Development Section */}
      <section
        ref={useScrollTrigger((element) => {
          // Set initial state
          gsap.set(element, { opacity: 1, y: 0 });

          const titleElement = element.querySelector('h2');
          const descriptionElement = element.querySelector('p');
          const listItems = element.querySelectorAll('li');

          const titleAnimation = titleElement ? fadeInUp(titleElement, 0) : gsap.timeline();
          const descriptionAnimation = descriptionElement ? fadeInUp(descriptionElement, 0.2) : gsap.timeline();

          return gsap.timeline()
            .add(titleAnimation)
            .add(descriptionAnimation, '-=0.3')
            .add(gsap.fromTo(listItems, {
              opacity: 0,
              x: -30
            }, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out'
            }), '-=0.2');
        })}
        className="py-24 px-6 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="text-left">
              <TextScramble
                as="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 tracking-wide text-white leading-tight"
                duration={1.1}
                speed={0.028}
              >
                Mobilní aplikace
              </TextScramble>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Vytváříme moderní mobilní aplikace pro iOS a Android s ohledem na uživatelskou zkušenost a výkon.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Nativní iOS a Android aplikace</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">React Native a Flutter řešení</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">UI/UX design pro mobilní zařízení</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Integrace s cloudovými službami</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Mobile app development - smartphone with app interface"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* My Products Section */}
      <section
        ref={useScrollTrigger((element) => {
          const cardElement = element.querySelector('.card-content');
          const titleElement = element.querySelector('h2');
          const descriptionElement = element.querySelector('p');

          const cardAnimation = cardElement ? cardFlip(cardElement as HTMLElement, 0) : gsap.timeline();
          const titleAnimation = titleElement ? fadeInUp(titleElement, 0.3) : gsap.timeline();
          const descriptionAnimation = descriptionElement ? fadeInUp(descriptionElement, 0.5) : gsap.timeline();

          const cardsAnimation = staggerChildren(element, '.group', 0.7);

          return gsap.timeline()
            .add(cardAnimation)
            .add(titleAnimation, '-=0.8')
            .add(descriptionAnimation, '-=0.6')
            .add(cardsAnimation, '-=0.4');
        })}
        id="products"
        className="min-h-screen flex items-center justify-center py-24 px-6"
      >
        <div className="card-content w-full max-w-7xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-cyan-500/20 p-12 md:p-16">
          <div className="text-center mb-20">
            <TextScramble
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-wide text-white leading-tight"
              duration={1.5}
              speed={0.024}
            >
              Naše produkty
            </TextScramble>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Profesionální nástroje a řešení pro moderní vývoj a design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* WordPress Plugins */}
            <div className="group relative">
              {/* Enhanced glassmorphism background layers */}
              <div className="absolute -inset-2 bg-gradient-to-r from-custom-color-1/30 via-custom-color-2/20 to-custom-color-5/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-custom-color-1/20 to-custom-color-2/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 hover:border-blue-300/50 transition-all duration-500 hover:scale-[1.02] shadow-2xl shadow-blue-500/10 hover:shadow-blue-400/30 group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:via-white/15 group-hover:to-white/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/80 to-blue-600/80 backdrop-blur-xl rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-white/20">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" role="img" viewBox="0 0 24 24" color="white" height="36" width="36" xmlns="http://www.w3.org/2000/svg" style={{color: 'white'}}>
                      <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">WordPress pluginy</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Rozšiřte funkcionalitu vašich WordPress stránek profesionálními pluginy. Optimalizované pro výkon a bezpečnost.</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full backdrop-blur-sm border border-blue-400/30">PHP</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full backdrop-blur-sm border border-blue-400/30">MySQL</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full backdrop-blur-sm border border-blue-400/30">REST API</span>
                  </div>
                </div>
              </div>
            </div>

            {/* UI Kits */}
            <div className="group relative">
              {/* Enhanced glassmorphism background layers */}
              <div className="absolute -inset-2 bg-gradient-to-r from-custom-color-2/30 via-custom-color-4/20 to-custom-color-1/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-custom-color-2/20 to-custom-color-4/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 hover:border-purple-300/50 transition-all duration-500 hover:scale-[1.02] shadow-2xl shadow-purple-500/10 hover:shadow-purple-400/30 group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:via-white/15 group-hover:to-white/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500/80 to-purple-600/80 backdrop-blur-xl rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-white/20">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                      <rect x="7" y="7" width="10" height="2" fill="white"/>
                      <rect x="7" y="11" width="6" height="2" fill="white"/>
                      <rect x="7" y="15" width="8" height="2" fill="white"/>
                      <rect x="16" y="11" width="6" height="2" stroke="white" strokeWidth="2"/>
                      <rect x="16" y="15" width="4" height="2" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">UI komponenty</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Kompletní knihovna moderních UI komponent pro rychlejší vývoj aplikací a webů.</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full backdrop-blur-sm border border-purple-400/30">React</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full backdrop-blur-sm border border-purple-400/30">Vue.js</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full backdrop-blur-sm border border-purple-400/30">Figma</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Assets */}
            <div className="group relative">
              {/* Enhanced glassmorphism background layers */}
              <div className="absolute -inset-2 bg-gradient-to-r from-custom-color-3/30 via-custom-color-5/20 to-custom-color-2/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-custom-color-3/20 to-custom-color-5/30 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"></div>

              <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 hover:border-green-300/50 transition-all duration-500 hover:scale-[1.02] shadow-2xl shadow-green-500/10 hover:shadow-green-400/30 group-hover:bg-gradient-to-br group-hover:from-white/10 group-hover:via-white/15 group-hover:to-white/10">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500/80 to-green-600/80 backdrop-blur-xl rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border border-white/20">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                      <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="1" fill="white"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-green-300 transition-colors duration-300">Značková identita</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Kompletní balíčky firemní identity pro startupy a firmy. Logo, barvy, typografie a brand guidelines.</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full backdrop-blur-sm border border-green-400/30">Logo Design</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full backdrop-blur-sm border border-green-400/30">Brand Guidelines</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full backdrop-blur-sm border border-green-400/30">Typography</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-8 text-lg">
              Máte specifické požadavky? Kontaktujte nás pro individuální řešení.
            </p>
          </div>
        </div>
      </section>

      {/* Grafický Design Section */}
      <section
        className="min-h-screen flex items-center justify-center py-20 px-6"
      >
        <div className="card-content w-full max-w-7xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-indigo-500/20 p-12 md:p-16">
          <div className="text-center mb-16">
            <TextScramble
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-wide text-white leading-tight"
              duration={1.3}
              speed={0.026}
            >
              Grafický design
            </TextScramble>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Naše kolekce grafických designů a kreativních řešení pro vaši značku
            </p>
          </div>
          <div className="py-8">
            <GrafickyDesignMarquee />
          </div>
        </div>
      </section>
      <section
        className="min-h-screen flex items-center justify-center py-20 px-6"
      >
        <div className="card-content w-full max-w-6xl mx-auto bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl shadow-2xl shadow-orange-500/20 p-12 md:p-16">
          <TextScramble
            as="h2"
            className="text-3xl md:text-4xl font-light mb-16 text-center tracking-wide text-white"
            duration={0.9}
            speed={0.035}
          >
            Recenze
          </TextScramble>
          <div className="py-8">
            <TestimonialsMarquee />
          </div>
        </div>
      </section>

      {/* Contact Info Box */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800/60 rounded-2xl shadow-2xl">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-custom-color-1/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-custom-color-2/10 rounded-full blur-3xl"></div>
            </div>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-light mb-3 tracking-wide text-white">Kontakt</h3>
              <p className="text-gray-400 mb-8">Ozvěte se nám – odpovíme zpravidla do 24 hodin.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
                {/* Email */}
                <div className="group relative border border-neutral-800/60 rounded-xl p-5 hover:border-custom-color-1/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-9 h-9 rounded-lg bg-custom-color-1/15 text-custom-color-1 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">E-mail</div>
                      <a href="mailto:info@codegrip.cz" className="text-white hover:underline break-all">info@codegrip.cz</a>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="secondary"
                          className="h-8 px-3 bg-neutral-800/60 hover:bg-neutral-700/60 text-gray-200 border border-white/10"
                          onClick={() => navigator.clipboard.writeText('info@codegrip.cz')}
                          aria-label="Kopírovat e-mail"
                        >
                          Zkopírovat
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group relative border border-neutral-800/60 rounded-xl p-5 hover:border-custom-color-2/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-9 h-9 rounded-lg bg-custom-color-2/15 text-custom-color-2 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Telefon</div>
                      <a href="tel:+420720329593" className="text-white hover:underline">+ 420 720 329 593</a>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="secondary"
                          className="h-8 px-3 bg-neutral-800/60 hover:bg-neutral-700/60 text-gray-200 border border-white/10"
                          onClick={() => navigator.clipboard.writeText('+420720329593')}
                          aria-label="Kopírovat telefon"
                        >
                          Zkopírovat
                        </Button>
                        <a
                          href="tel:+420720329593"
                          className="inline-flex items-center h-8 px-3 rounded-md bg-custom-color-2/20 text-custom-color-2 border border-custom-color-2/30 hover:bg-custom-color-2/30 transition-colors"
                          aria-label="Zavolat"
                        >
                          Zavolat
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="group relative border border-neutral-800/60 rounded-xl p-5 hover:border-custom-color-3/60 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-9 h-9 rounded-lg bg-custom-color-3/15 text-custom-color-3 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Adresa</div>
                      <div className="text-white">Brno, Česká Republika</div>
                      <div className="mt-3 flex gap-2">
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Brno%2C%20%C4%8Cesk%C3%A1%20Republika"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center h-8 px-3 rounded-md bg-custom-color-3/20 text-custom-color-3 border border-custom-color-3/30 hover:bg-custom-color-3/30 transition-colors"
                          aria-label="Otevřít v Mapách"
                        >
                          Otevřít v Mapách
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="py-16 px-6 bg-gradient-to-br from-neutral-950 to-neutral-900 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
                <div className="flex items-center mb-6">
                  <img
                    src="/ikonka.png"
                    alt="CodeGrip Logo"
                    className="w-12 h-12 mr-4"
                  />
                </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Specializujeme se na tvorbu moderních webových aplikací, e-shopů a digitálních řešení.
                Pomáháme firmám růst prostřednictvím inovativních technologií.
              </p>
              <div className="flex space-x-4">
                <Button size="icon" className="bg-custom-color-2 hover:bg-custom-color-1 text-white border border-white/20 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.44.645-1.44 1.44s.645 1.44 1.44 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Button>
                <Button size="icon" className="bg-custom-color-5 hover:bg-custom-color-3 text-white border border-white/20 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Button>
                <Button size="icon" className="bg-custom-color-3 hover:bg-custom-color-4 text-white border border-white/20 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
              </div>
            </div>

            {/* Services Section */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-6 text-white text-lg">Služby</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#web" className="text-gray-300 hover:text-custom-color-1 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-1 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Webové aplikace
                  </a>
                </li>
                <li>
                  <a href="#eshop" className="text-gray-300 hover:text-custom-color-2 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-2 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    E-shopy
                  </a>
                </li>
                <li>
                  <a href="#mobile" className="text-gray-300 hover:text-custom-color-3 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-3 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Mobilní aplikace
                  </a>
                </li>
                <li>
                  <a href="#design" className="text-gray-300 hover:text-custom-color-4 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-4 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    UI/UX Design
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold mb-6 text-white text-lg">Rychlé odkazy</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-custom-color-1 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-1 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    O nás
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-300 hover:text-custom-color-2 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-2 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Projekty
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-custom-color-3 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 bg-custom-color-3 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Kontakt
                  </a>
                </li>
                <li>
                  {/* Blog link removed */}
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-3">
              <h4 className="font-semibold mb-6 text-white text-lg">Kontaktujte nás</h4>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-custom-color-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@codegrip.cz</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-custom-color-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+ 420 720 329 593</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-5 h-5 mr-3 text-custom-color-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Brno, Česká Republika</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; 2024 CodeGrip. Všechna práva vyhrazena.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-custom-color-1 transition-colors">Zásady ochrany osobních údajů</a>
                <a href="#" className="hover:text-custom-color-2 transition-colors">Obchodní podmínky</a>
                <a href="#" className="hover:text-custom-color-3 transition-colors">Zásady používání cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Cookie Banner */}
      <CookieBanner
        onAccept={acceptCookies}
        onReject={rejectCookies}
        onCustomSettings={updatePreferences}
      />

      {/* ElevenLabs Convai Widget */}
      <elevenlabs-convai agent-id="agent_7901k5ezk73efz5tc1mmamrb6b95"></elevenlabs-convai>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" async />
    </div>
    </>
  );
}
