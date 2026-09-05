import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const HERO_IMAGE = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png-EslKdscYhdWOUeP4RBajclEejxh8iO.jpeg';
const CHAOS_VIDEO = `${import.meta.env.BASE_URL}chaos-mode.mp4`;
const PIECE_IMAGES = {
  verde: 'https://v0-katachi-ho.vercel.app/green-velvet-modular-chair.png',
  terracotta: 'https://v0-katachi-ho.vercel.app/terracotta-cloud-chair.png',
  sage: 'https://v0-katachi-ho.vercel.app/sage-copper-lounge-chair.png',
};

type Product = {
  id: string;
  name: string;
  material: string;
  price: string;
  badge: string;
  image: string;
  color: string;
  detail: string;
};

const products: Product[] = [
  {
    id: 'verde',
    name: 'Verde Modular Chair',
    material: 'Copper Frame, Premium Velvet',
    price: '€4,890',
    badge: 'New',
    image: PIECE_IMAGES.verde,
    color: '#6d806d',
    detail: 'A generous, modular silhouette in deep botanical velvet. Designed to be rearranged as your room changes.',
  },
  {
    id: 'terracotta',
    name: 'Terracotta Cloud Chair',
    material: 'Copper Frame, Terracotta Velvet',
    price: '€5,250',
    badge: 'New',
    image: PIECE_IMAGES.terracotta,
    color: '#b4674e',
    detail: 'Soft volume, warm colour, and a hand-finished copper frame make this the room’s natural centre of gravity.',
  },
  {
    id: 'sage',
    name: 'Sage Copper Lounge',
    material: 'Copper Frame, Sage Velvet',
    price: '€4,675',
    badge: 'Limited',
    image: PIECE_IMAGES.sage,
    color: '#a5ae91',
    detail: 'An easy, low lounge with a calm sage seat and a quiet glint of copper under every curve.',
  },
];

const collections = [
  ['MODERN SEATING', '8 pieces', 'https://v0-katachi-ho.vercel.app/modern-armchair-pillows.png'],
  ['MODULAR DESIGN', '6 pieces', 'https://v0-katachi-ho.vercel.app/modular-cushion-bench.png'],
  ['CLOUD COLLECTION', '4 pieces', 'https://v0-katachi-ho.vercel.app/cloud-white-sofa.png'],
  ['ARTISTIC PIECES', '5 pieces', 'https://v0-katachi-ho.vercel.app/distressed-artistic-chair.png'],
  ['CONTEMPORARY', '7 pieces', 'https://v0-katachi-ho.vercel.app/green-modular-loveseat.png'],
  ['TEXTURAL CRAFT', '3 pieces', 'https://v0-katachi-ho.vercel.app/braided-rope-loveseat.png'],
  ['MAXIMALIST ART', '4 pieces', 'https://v0-katachi-ho.vercel.app/colorful-patchwork-sofa.png'],
  ['SCANDINAVIAN COMFORT', '6 pieces', 'https://v0-katachi-ho.vercel.app/minimalist-boucle-loveseat.png'],
  ['ABSTRACT FORMS', '5 pieces', 'https://v0-katachi-ho.vercel.app/abstract-artistic-sofa.png'],
  ['LUXURY TEXTURES', '8 pieces', 'https://v0-katachi-ho.vercel.app/textured-cream-loveseat.png'],
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (id: string) => {
    scrollToId(id);
    setMenuOpen(false);
  };
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-5 py-4 text-[#f5f0e8] mix-blend-difference md:px-10">
      <button data-testid="button-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus-ring display-font text-lg font-semibold tracking-[.16em]">
        KATACHI<span className="text-[#c3523b]">.</span>
      </button>
      <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-5 right-5 top-16 flex-col gap-5 rounded-2xl border border-white/15 bg-[#19211d]/95 p-6 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`}>
        {[
          ['The pieces', 'pieces'],
          ['Collections', 'collections'],
          ['Our material', 'material'],
        ].map(([label, id]) => (
          <button key={id} data-testid={`button-nav-${id}`} onClick={() => navigate(id)} className="focus-ring mono-label text-left text-[#f5f0e8]/80 transition-colors hover:text-white">
            {label}
          </button>
        ))}
        <button data-testid="button-nav-journal" onClick={() => navigate('newsletter')} className="focus-ring mono-label text-left text-[#f5f0e8]/80 transition-colors hover:text-white">Journal ↗</button>
      </nav>
      <div className="flex items-center gap-5">
        <span className="mono-label hidden text-[#f5f0e8]/70 sm:block">BE / 2026</span>
        <button data-testid="button-menu" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)} className="focus-ring mono-label md:hidden">{menuOpen ? 'Close' : 'Menu'}</button>
      </div>
    </header>
  );
}

function ChaosIntro() {
  return (
    <section className="dark-panel relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-10 pt-28 text-[#f4efe6] md:px-10 md:pb-14">
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_IMAGE}
        src={CHAOS_VIDEO}
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-65"
      />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_67%_45%,rgba(205,167,117,.22),transparent_24%),linear-gradient(90deg,rgba(10,14,12,.92),rgba(10,14,12,.3))]" />
      <div className="absolute right-[-6vw] top-[18%] z-[1] h-[55vw] w-[55vw] rounded-full border border-white/10 md:h-[36vw] md:w-[36vw]" />
      <div className="absolute right-[9vw] top-[32%] z-[1] h-[21vw] w-[21vw] rounded-full bg-[#967d63]/20 blur-3xl" />
      <div className="relative z-10 max-w-[820px]">
        <p className="mono-label reveal mb-8 flex items-center gap-3 text-[#e0a08e]"><span className="h-px w-9 bg-[#c3523b]" /> WITH OTHER SPACES</p>
        <h1 className="display-font reveal reveal-delay-1 text-[clamp(4.2rem,14vw,11rem)] font-bold leading-[.78] tracking-[-.08em]">
          CHAOS<br /><span className="outlined-type">MODE</span>
        </h1>
        <p className="reveal reveal-delay-2 mt-9 max-w-[260px] font-mono text-[.7rem] leading-relaxed text-white/60">
          Delays. Noise. Papers flying.<br />A squirrel on your keyboard.<br />No system. Just scramble.
        </p>
        <button data-testid="button-scroll-contain" onClick={() => scrollToId('transition')} className="focus-ring reveal reveal-delay-3 mt-12 flex items-center gap-3 mono-label text-white/70 transition-colors hover:text-white">
          Scroll to contain <ArrowDown size={13} strokeWidth={1.5} />
        </button>
      </div>
      <div className="absolute bottom-7 right-5 z-10 flex items-center gap-2 mono-label text-white/55 md:right-10"><span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#c3523b]" /> CHAOS // LIVE</div>
    </section>
  );
}

function Transition() {
  return (
    <section id="transition" className="dark-panel relative overflow-hidden px-5 py-24 text-[#f4efe6] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <p className="mono-label text-white/45">TRANSITION / 01—02</p>
        <div className="mt-12 grid items-end gap-12 md:grid-cols-[1fr_1.4fr]">
          <h2 className="display-font text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[.8] tracking-[-.08em]">
            CHAOS<br /><span className="outlined-type">TO</span><br />CONTROL
          </h2>
          <div className="max-w-md pb-2">
            <p className="mono-label mb-5 text-[#e0a08e]">WITH KATACHI</p>
            <p className="display-font text-2xl leading-tight text-white/85 md:text-4xl">Same energy. Contained. Directed.</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">A room can hold the beautiful mess of living and still leave space to breathe.</p>
            <button data-testid="button-enter-katachi" onClick={() => scrollToId('world')} className="focus-ring mt-8 flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 mono-label transition-colors hover:bg-white hover:text-[#17201b]">Enter the quiet <ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
      <div className="marquee-track pointer-events-none mt-28 flex gap-10 whitespace-nowrap font-mono text-[.6rem] tracking-[.3em] text-white/15">
        {Array.from({ length: 6 }).map((_, i) => <span key={i}>FORM / FEEL / FUNCTION / FORM / FEEL / FUNCTION /</span>)}
      </div>
    </section>
  );
}

function KatachiHero() {
  return (
    <section id="world" className="relative min-h-[88svh] overflow-hidden bg-[#52685a] text-[#f7f1e8]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg,rgba(20,33,25,.24),rgba(20,33,25,.55)),url(${HERO_IMAGE})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#14231c]/25 via-transparent to-[#14231c]/60" />
      <div className="relative z-10 flex min-h-[88svh] flex-col items-center justify-center px-5 pt-20 text-center">
        <p className="mono-label reveal mb-7 text-white/75">KATACHI / OBJECTS FOR LIVING</p>
        <h2 className="display-font reveal reveal-delay-1 max-w-5xl text-[clamp(3rem,8.4vw,8.5rem)] font-semibold leading-[.84] tracking-[-.075em]">
          Design furniture for<br /><em className="font-normal">spaces that breathe.</em>
        </h2>
        <p className="reveal reveal-delay-2 mt-8 max-w-md text-sm leading-relaxed text-white/80">Designed in Belgium, crafted to endure — timeless pieces for modern living.</p>
      </div>
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/25 bg-black/10 px-5 py-3 text-[.65rem] backdrop-blur-sm">
        <span className="text-[#cbd3b6]">●</span> Free shipping <span className="text-white/30">/</span> <span className="text-[#df9b75]">↗</span> Delivered in 6 weeks <span className="text-white/30">/</span> Lifetime guarantee
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <p className="mono-label mb-5 text-[#c3523b]">{eyebrow}</p>
        <h2 className="display-font max-w-2xl text-5xl font-semibold leading-[.92] tracking-[-.06em] md:text-7xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FeaturedPieces({ onOpen }: { onOpen: (product: Product) => void }) {
  return (
    <section id="pieces" className="bg-[#ede7db] px-5 py-24 md:px-10 md:py-36">
      <SectionIntro eyebrow="01 / THE PIECES" title={<>A softer kind<br /><em className="font-normal">of statement.</em></>}>
        <p className="max-w-xs text-sm leading-relaxed text-[#5a635a]">Discover our most beloved pieces, each crafted with meticulous attention to detail and timeless design principles.</p>
      </SectionIntro>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product, index) => (
          <article key={product.id} className={`group ${index === 1 ? 'md:translate-y-16' : ''}`}>
            <button data-testid={`button-product-${product.id}`} onClick={() => onOpen(product)} className="focus-ring relative block w-full overflow-hidden rounded-[1.5rem] text-left" style={{ backgroundColor: product.color }}>
              <div className="absolute left-5 top-5 z-10 rounded-full bg-[#f5f0e8]/85 px-3 py-1.5 mono-label text-[#26382d]">{product.badge}</div>
              <img data-testid={`img-product-${product.id}`} src={product.image} alt={product.name} className="product-shadow aspect-[.86] w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
              <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f0e8]/90 text-[#17261e] opacity-0 transition-opacity group-hover:opacity-100"><ChevronRight size={18} /></span>
            </button>
            <div className="flex items-start justify-between gap-4 px-1 pt-5">
              <div><h3 className="display-font text-xl font-semibold tracking-[-.03em]">{product.name}</h3><p className="mt-1 text-sm text-[#697069]">{product.material}</p></div>
              <span className="whitespace-nowrap font-mono text-sm">{product.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Collections() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: 'left' | 'right') => ref.current?.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
  return (
    <section id="collections" className="bg-[#f4eee3] px-5 py-24 md:px-10 md:py-36">
      <SectionIntro eyebrow="02 / COLLECTIONS" title={<>Find your<br /><em className="font-normal">room's rhythm.</em></>}>
        <div className="flex gap-2">
          <button data-testid="button-collections-left" aria-label="Previous collections" onClick={() => move('left')} className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-[#b8b5a8] transition-colors hover:bg-[#26382d] hover:text-[#f4eee3]"><ArrowLeft size={16} /></button>
          <button data-testid="button-collections-right" aria-label="Next collections" onClick={() => move('right')} className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-[#b8b5a8] transition-colors hover:bg-[#26382d] hover:text-[#f4eee3]"><ArrowRight size={16} /></button>
        </div>
      </SectionIntro>
      <div ref={ref} className="flex snap-x gap-4 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {collections.map(([name, count, image], index) => (
          <button data-testid={`button-collection-${index}`} key={name} className="group relative min-w-[74vw] snap-start overflow-hidden rounded-[1.5rem] bg-[#899585] text-left sm:min-w-[36vw] lg:min-w-[24vw]">
            <img src={image} alt={name} className="aspect-[.85] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#15221b]/85 to-transparent p-5 pt-20 text-[#f6f0e6]">
              <p className="mono-label text-white/65">{count}</p><h3 className="display-font mt-2 text-2xl font-semibold">{name}</h3>
            </div>
            <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white opacity-0 transition-opacity group-hover:opacity-100"><ArrowRight size={15} /></span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-center mono-label text-[#7d837b]">← Drag to explore collections →</p>
    </section>
  );
}

function MaterialStory() {
  const [scene, setScene] = useState('Pistachio');
  const scenes: Record<string, { image: string; copy: string }> = {
    Pistachio: { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/new-source_bloom_max_1x.jpg-t1V6yfeAZKKcEvWEkPn7Pfx7hkHDMf.jpeg', copy: 'Every piece begins with the finest materials, carefully selected for their beauty, durability, and sustainable origins.' },
    Lunar: { image: 'https://v0-katachi-ho.vercel.app/lunar-gray-interior.png', copy: 'Quiet tones and considered texture let the light move through a room, changing the feeling hour by hour.' },
    Martian: { image: 'https://v0-katachi-ho.vercel.app/martian-red-interior.png', copy: 'Warm mineral colour makes a home feel grounded — a little unexpected, always deeply livable.' },
  };
  return (
    <section id="material" className="relative overflow-hidden bg-[#263c31] px-5 py-24 text-[#f4eee3] md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.05fr_.95fr]">
        <div className="relative overflow-hidden rounded-[1.6rem]">
          <img data-testid="img-material-scene" src={scenes[scene].image} alt={`${scene} interior`} className="aspect-[.9] w-full object-cover transition-opacity duration-500 md:aspect-[.82]" />
          <span className="absolute left-5 top-5 rounded-full bg-[#f4eee3]/90 px-3 py-1.5 mono-label text-[#263c31]">MATERIAL STUDY / {scene}</span>
        </div>
        <div>
          <p className="mono-label mb-5 text-[#d88d71]">03 / OUR MATERIAL</p>
          <h2 className="display-font text-5xl font-semibold leading-[.9] tracking-[-.06em] md:text-7xl">Made to be<br /><em className="font-normal">lived with.</em></h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">{scenes[scene].copy}</p>
          <blockquote className="mt-9 border-l border-[#d88d71] pl-5 text-xl leading-snug text-white/90">“We believe in creating furniture that transcends trends—pieces that become more beautiful with age, carrying stories and memories through generations.”</blockquote>
          <div className="mt-10 flex gap-2">
            {Object.keys(scenes).map((name) => <button data-testid={`button-material-${name.toLowerCase()}`} key={name} onClick={() => setScene(name)} className={`focus-ring rounded-full px-4 py-2 mono-label transition-colors ${scene === name ? 'bg-[#d88d71] text-[#263c31]' : 'border border-white/25 text-white/65 hover:border-white/60 hover:text-white'}`}>{name}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  return (
    <section id="newsletter" className="relative overflow-hidden bg-[#d18b6e] px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end">
          <div><p className="mono-label mb-5 text-[#354a3c]">A NOTE FROM KATACHI</p><h2 className="display-font max-w-3xl text-6xl font-semibold leading-[.84] tracking-[-.07em] text-[#24372b] md:text-8xl">Stay ahead of<br /><em className="font-normal">quiet luxury.</em></h2></div>
          <div>
            <p className="max-w-sm text-lg leading-relaxed text-[#354a3c]">Be the first to discover new collections, design insights, and exclusive access to limited pieces.</p>
            <form onSubmit={submit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input data-testid="input-newsletter-email" id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="focus-ring min-w-0 flex-1 rounded-full border border-[#354a3c]/35 bg-[#e4a184]/70 px-5 py-3.5 text-sm text-[#24372b] placeholder:text-[#4c5b4d]" />
              <button data-testid="button-newsletter-submit" type="submit" className="focus-ring rounded-full bg-[#263c31] px-6 py-3.5 mono-label text-[#f5efe5] transition-transform hover:-translate-y-0.5">{submitted ? 'Subscribed' : 'Subscribe'}</button>
            </form>
            <p data-testid="status-newsletter" aria-live="polite" className="mt-4 flex min-h-5 items-center gap-2 text-xs text-[#354a3c]">{submitted && <><Check size={14} /> You're on the list. See you in the quiet.</>}</p>
            <p className="mt-4 text-xs text-[#354a3c]/75">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-24 -right-10 display-font text-[22rem] font-bold leading-none text-[#e2a184]/55">K</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#17231d] px-5 py-10 text-[#eee8dc] md:px-10">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div><p className="display-font text-3xl font-semibold tracking-[-.05em]">KATACHI<span className="text-[#d58a70]">.</span></p><p className="mt-3 max-w-xs text-sm text-white/45">Belgian design furniture for spaces that breathe.</p></div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-3 mono-label text-white/55"><button data-testid="button-footer-pieces" onClick={() => scrollToId('pieces')} className="focus-ring text-left hover:text-white">The pieces</button><button data-testid="button-footer-collections" onClick={() => scrollToId('collections')} className="focus-ring text-left hover:text-white">Collections</button><button data-testid="button-footer-material" onClick={() => scrollToId('material')} className="focus-ring text-left hover:text-white">Materials</button><button data-testid="button-footer-newsletter" onClick={() => scrollToId('newsletter')} className="focus-ring text-left hover:text-white">Newsletter</button></div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 mono-label text-white/35 sm:flex-row"><span>© KATACHI STUDIO / BELGIUM</span><span>Free shipping · Lifetime guarantee</span><span>Privacy / Terms</span></div>
    </footer>
  );
}

function QuickLook({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [product, onClose]);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#111813]/70 p-0 backdrop-blur-sm md:items-center md:p-8" role="dialog" aria-modal="true" aria-label={`Quick look at ${product.name}`}>
      <button data-testid="button-quicklook-backdrop" aria-label="Close quick look" onClick={onClose} className="absolute inset-0 cursor-default" />
      <div className="relative z-10 grid max-h-[92svh] w-full max-w-4xl overflow-auto rounded-t-[1.8rem] bg-[#f4eee3] md:grid-cols-2 md:rounded-[1.8rem]">
        <div className="relative min-h-[340px]" style={{ backgroundColor: product.color }}><img src={product.image} alt={product.name} className="h-full min-h-[340px] w-full object-cover" /></div>
        <div className="relative p-7 md:p-12"><button data-testid="button-quicklook-close" aria-label="Close quick look" onClick={onClose} className="focus-ring absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#263c31]/20 hover:bg-[#263c31] hover:text-[#f4eee3]"><X size={17} /></button><p className="mono-label text-[#c3523b]">{product.badge} / KATACHI OBJECT</p><h2 className="display-font mt-12 text-4xl font-semibold leading-[.9] tracking-[-.06em] md:text-6xl">{product.name}</h2><p className="mt-5 text-sm text-[#5f685f]">{product.material}</p><p className="mt-8 text-base leading-relaxed text-[#455248]">{product.detail}</p><div className="mt-10 flex items-center justify-between border-t border-[#263c31]/15 pt-5"><span className="font-mono text-lg">{product.price}</span><button data-testid={`button-inquire-${product.id}`} onClick={() => { onClose(); scrollToId('newsletter'); }} className="focus-ring rounded-full bg-[#263c31] px-5 py-3 mono-label text-[#f4eee3]">Enquire ↗</button></div><p className="mt-5 mono-label text-[#7b8279]">Delivered in 6 weeks · Lifetime guarantee</p></div>
      </div>
    </div>
  );
}

function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  return (
    <div className="site-shell grain">
      <Header />
      <main>
        <ChaosIntro />
        <Transition />
        <KatachiHero />
        <FeaturedPieces onOpen={setSelectedProduct} />
        <Collections />
        <MaterialStory />
        <Newsletter />
      </main>
      <Footer />
      <QuickLook product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  useEffect(() => {
    document.title = 'KATACHI — Design furniture for spaces that breathe.';
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', 'KATACHI — Design furniture for spaces that breathe. Designed in Belgium, crafted to endure.');
  }, []);
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;