import CompassMenu from './components/CompassMenu';
import { CardWithLines, CardBody, serviceCards } from './components/ServiceCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100">
      {/* Compass Navigation Menu */}
      <CompassMenu />

      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-6 pt-20 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight text-white">
            CODE<span style={{color: '#9B52D8'}}>&lt;/&gt;</span>GRIP
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-400 tracking-wide">
            DESIGNÉR
          </h2>
          <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed text-gray-300">
            Vytvářím poutavé grafické šablony, které zvýrazní vaši firmu, ušetří vám čas a pomohou získat více zákazníků.
          </p>
          <button className="text-white px-8 py-4 rounded-full text-lg font-medium transition-colors hover:opacity-90" style={{backgroundColor: '#9B52D8'}}>
            Zarezervovat hovor
          </button>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center tracking-wide text-white">
            Nejnovější projekt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group cursor-pointer relative overflow-hidden">
              <div className="aspect-square bg-neutral-900 mb-4 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img src="/p1.png" alt="Project 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-white text-2xl font-bold mb-2">sdsped.cz</h4>
                    <p className="text-gray-300 text-sm">Moderní webové aplikační rozhraní</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer relative overflow-hidden">
              <div className="aspect-square bg-neutral-900 mb-4 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img src="/p2.png" alt="Project 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-white text-2xl font-bold mb-2">egn-stav.cz</h4>
                    <p className="text-gray-300 text-sm">Design SaaS platformy</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer relative overflow-hidden">
              <div className="aspect-square bg-neutral-900 mb-4 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img src="/p3.png" alt="Project 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-white text-2xl font-bold mb-2">purefurniture.cz</h4>
                    <p className="text-gray-300 text-sm">Responzivní mobilní aplikace</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer relative overflow-hidden">
              <div className="aspect-square bg-neutral-900 mb-4 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img src="/p4.png" alt="Project 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-white text-2xl font-bold mb-2">hsgroup.cz</h4>
                    <p className="text-gray-300 text-sm">Kompletní systém designu značky</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer relative overflow-hidden">
              <div className="aspect-square bg-neutral-900 mb-4 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img src="/p5.png" alt="Project 5" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-white text-2xl font-bold mb-2">darksalon.cz</h4>
                    <p className="text-gray-300 text-sm">Přepracování online obchodu</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer relative overflow-hidden">
              <div className="aspect-square bg-neutral-900 mb-4 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105">
                <img src="/ikonka.png" alt="Project 6" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="text-white text-2xl font-bold mb-2">CodeGrip</h4>
                    <p className="text-gray-300 text-sm">Identita značky a design loga</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-white">
            O mně
          </h2>
          <p className="text-lg font-light leading-relaxed mb-8 text-gray-300">
            Jsem vášnivý designer s více než 5 lety zkušeností v tvorbě krásných a funkčních designů.
            Moje práce se zaměřuje na čistou estetiku, uživatelsky orientovaný design a pozornost k detailům.
          </p>
          <p className="text-lg font-light leading-relaxed text-gray-300">
            Když nepracuji na designu, můžete mě najít při zkoumání nových designových trendů, učení se o nových technologiích nebo práci na osobních projektech, které zkoušejí mou kreativitu.
          </p>
        </div>
      </section>

      {/* My Products Section */}
      <section id="products" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center tracking-wide text-white">
            Moje produkty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-800 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white">
                🎨
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">Šablony designu</h3>
              <p className="text-gray-400 mb-6">Připravené šablony pro různé designové potřeby</p>
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Zobrazit kolekci
              </button>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-800 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white">
                📱
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">UI kity</h3>
              <p className="text-gray-400 mb-6">Kompletní knihovny UI komponent pro rychlejší vývoj</p>
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Zobrazit kolekci
              </button>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-800 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white">
                🎯
              </div>
              <h3 className="text-xl font-medium mb-4 text-white">Aktiva značky</h3>
              <p className="text-gray-400 mb-6">Kompletní balíčky identity značky pro startupy</p>
              <button className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Zobrazit kolekci
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* My Services Section */}
      <section
        className="py-24 px-6 bg-gradient-to-b from-transparent via-zinc-950/30 to-transparent"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-20">
            <h2
              id="services-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-center tracking-wide text-white leading-tight"
            >
              Naše služby
            </h2>
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
                <CardWithLines>
                  <CardBody cardContent={card} />
                </CardWithLines>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-white">
            Spolupracujme
          </h2>
          <p className="text-lg font-light mb-12 text-gray-300">
            Připraveni uvést vaši vizi do života? Rád bych slyšel o vašem projektu.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
            Zarezervovat hovor
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center tracking-wide text-white">
            Recenze
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 p-8 rounded-lg shadow-sm">
              <blockquote className="text-gray-300 mb-6 leading-relaxed">
                "Lanin design je vysoce škálovatelný! V podstatě mám dnes kompletně funkční a nastavitelný systém designu."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-neutral-800 rounded-full mr-4"></div>
                <div>
                  <div className="font-medium text-white">Dean Kresh</div>
                  <div className="text-sm text-gray-400">Manažer</div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg shadow-sm">
              <blockquote className="text-gray-300 mb-6 leading-relaxed">
                "Spolupráce s Lanou byla absolutní potěšení. Její pozornost k detailům a kreativní vize překročily naše očekávání."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-neutral-800 rounded-full mr-4"></div>
                <div>
                  <div className="font-medium text-white">Sarah Johnson</div>
                  <div className="text-sm text-gray-400">Kreativní ředitelka</div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg shadow-sm">
              <blockquote className="text-gray-300 mb-6 leading-relaxed">
                "Kvalita Laniny práce je vynikající. Dodala přesně to, co jsme potřebovali, včas a v rámci rozpočtu."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-neutral-800 rounded-full mr-4"></div>
                <div>
                  <div className="font-medium text-white">Michael Chen</div>
                  <div className="text-sm text-gray-400">Zakladatel startupu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stacks Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-center tracking-wide text-white">
            Nástroje
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">TS</span>
              </div>
              <h3 className="font-medium mb-2 text-white">TypeScript</h3>
              <p className="text-sm text-gray-400">Typovaný JavaScript</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">WP</span>
              </div>
              <h3 className="font-medium mb-2 text-white">WordPress</h3>
              <p className="text-sm text-gray-400">CMS platforma</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">▲</span>
              </div>
              <h3 className="font-medium mb-2 text-white">Next.js</h3>
              <p className="text-sm text-gray-400">React framework</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl">V</span>
              </div>
              <h3 className="font-medium mb-2 text-white">Vue.js</h3>
              <p className="text-sm text-gray-400">JavaScript framework</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light mb-6 text-white">KONTAKTUJTE MĚ POLEPŠÍME SPOLEČNĚ 👍</h3>
              <p className="text-gray-300 mb-6">
                Připraveni začít váš další projekt? Rád bych od vás slyšel a prodiskutoval, jak můžeme spolupracovat.
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Zarezervovat hovor
              </button>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Moje sociální sítě</h4>
              <p className="text-gray-300 text-sm mb-4">
                Sledujte nás na sociálních sítích pro nejnovější aktualizace a inspirace.
              </p>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-white">Stránky</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-300 hover:text-white transition-colors">O mně</a>
                <a href="#projects" className="block text-gray-300 hover:text-white transition-colors">Projekty</a>
                <a href="#products" className="block text-gray-300 hover:text-white transition-colors">Služby</a>
              </div>
              <h4 className="font-medium mb-4 mt-6 text-white">Užitečné odkazy</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">By Base Supply</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Made in Framer</a>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors">Použít tuto šablonu</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lana Davies. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
