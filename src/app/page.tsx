"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X, Check, ChevronDown, Phone } from "lucide-react";

// ─── Logo ──────────────────────────────────────────────────────────────────────
function Logo({ onClick, light = false }: { onClick?: () => void; light?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);
  const letters = "PERFECTIONISTS".split("");
  const shouldRoll = isHovered || isAutoAnimating;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const interval = setInterval(() => {
      setIsAutoAnimating(true);
      timeout = setTimeout(() => setIsAutoAnimating(false), 950);
    }, 2800);
    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const base = light ? "text-white" : "text-black";
  const roll = light ? "text-[#5E0ED7]" : "text-[#5E0ED7]";

  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); if (onClick) onClick(); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center text-sm sm:text-base md:text-lg font-bold tracking-widest ${base} select-none cursor-pointer py-1`}
    >
      <span className="flex overflow-hidden">
        {letters.map((char, idx) => (
          <span key={idx} className="relative block overflow-hidden h-[1.2em]">
            <motion.span
              animate={{ y: shouldRoll ? "-100%" : "0%" }}
              transition={{ duration: 0.35, delay: idx * 0.02, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`block ${base}`}
            >{char}</motion.span>
            <motion.span
              animate={{ y: shouldRoll ? "-100%" : "0%" }}
              transition={{ duration: 0.35, delay: idx * 0.02, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`absolute top-full left-0 block ${roll}`}
            >{char}</motion.span>
          </span>
        ))}
      </span>
      <motion.span
        animate={{ scale: shouldRoll ? [1, 1.6, 1] : 1, color: shouldRoll ? (light ? "#fff" : "#000") : "#5E0ED7" }}
        transition={{ duration: 0.35 }}
        className="text-[#5E0ED7] ml-0.5 font-black"
      >.</motion.span>
    </a>
  );
}

// ─── Pricing Data ──────────────────────────────────────────────────────────────
const REGIONS = [
  { label: "🇺🇸 United States",    code: "US", currency: "USD", symbol: "$",    rate: 0.6    }, // 40% discount
  { label: "🇬🇧 United Kingdom",   code: "GB", currency: "GBP", symbol: "£",    rate: 0.47   }, // 40% discount
  { label: "🇿🇦 South Africa",     code: "ZA", currency: "ZAR", symbol: "R",    rate: 6.48   }, // 35% final rate (65% cut)
  { label: "🇪🇺 European Union",   code: "EU", currency: "EUR", symbol: "€",    rate: 0.55   }, // 40% discount
  { label: "🇦🇪 UAE",              code: "AE", currency: "AED", symbol: "د.إ",  rate: 2.2    }, // 40% discount
  { label: "🇳🇬 Nigeria",          code: "NG", currency: "NGN", symbol: "₦",    rate: 578    }, // 35% final rate (65% cut)
  { label: "🇦🇺 Australia",        code: "AU", currency: "AUD", symbol: "A$",   rate: 0.93   }, // 40% discount
  { label: "🇨🇦 Canada",           code: "CA", currency: "CAD", symbol: "C$",   rate: 0.82   }, // 40% discount
  { label: "🇳🇦 Namibia",          code: "NA", currency: "NAD", symbol: "N$",   rate: 6.48   }, // 35% final rate (65% cut)
  { label: "🇿🇼 Zimbabwe",         code: "ZW", currency: "USD", symbol: "$",    rate: 0.35   }, // 35% final rate (65% cut)
  { label: "🇿🇲 Zambia",           code: "ZM", currency: "ZMW", symbol: "K",    rate: 9.6    }, // 35% final rate (65% cut)
  { label: "🇹🇿 Tanzania",         code: "TZ", currency: "TZS", symbol: "TSh",  rate: 938    }, // 35% final rate (65% cut)
  { label: "🇧🇷 Brazil",           code: "BR", currency: "BRL", symbol: "R$",   rate: 3.06   }, // 40% discount
];

const PRICING_SERVICES = [
  { id: "strategy", label: "Brand Strategy & Consulting", minUSD: 1000,  maxUSD: 8000,  unit: "project" },
  { id: "design",   label: "UI/UX Design",                minUSD: 1500,  maxUSD: 10000, unit: "project" },
  { id: "web",      label: "Web Engineering",             minUSD: 2500,  maxUSD: 25000, unit: "project" },
  { id: "mobile",   label: "Mobile App Development",      minUSD: 8000,  maxUSD: 40000, unit: "project" },
  { id: "ai",       label: "AI Agents & Automation",      minUSD: 5000,  maxUSD: 30000, unit: "project" },
  { id: "social",   label: "Social Media Marketing",      minUSD: 1500,  maxUSD: 5000,  unit: "/ mo"    },
  { id: "hosting",  label: "Hosting & Infrastructure",    minUSD: 200,   maxUSD: 800,   unit: "/ mo"    },
];

function formatPrice(amount: number, symbol: string): string {
  if (amount >= 1_000_000) return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000)     return `${symbol}${Math.round(amount / 1000)}K`;
  return `${symbol}${Math.round(amount).toLocaleString()}`;
}

const HELLOS = ["Hello", "Hola", "Bonjour", "Hallo", "Ciao", "Olá", "Jambo", "こんにちは", "Molo", "你好"];
const AFRICAN_CODES = ["ZA", "NG", "NA", "ZW", "ZM", "TZ"];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 1000], [0, 400]);

  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [activeIdx,  setActiveIdx]    = useState(0);
  const [selectedRegion, setSelectedRegion]       = useState(REGIONS[0]);
  const [selectedServices, setSelectedServices]   = useState<Set<string>>(new Set());
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const isAfrican = AFRICAN_CODES.includes(selectedRegion.code);

  // Process timeline slider state
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Startup asset loader state
  const [isLoading, setIsLoading] = useState(true);
  const [helloIdx, setHelloIdx] = useState(0);

  // Run the preloader loop for exactly 2.2s to introduce the greetings loop.
  // Decoupled from document load listeners so that slow remote CDN videos cannot block user entry.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setHelloIdx(prev => (prev + 1) % HELLOS.length);
    }, 450);
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // Sticky scroll ref for services section
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start start", "end end"],
  });

  const services = [
    {
      num: "01", title: "Brand Strategy & Consulting",
      description: "Your brand is your first impression — and we make it impossible to ignore. We map your market, define your positioning, craft your voice, and build the strategic foundation that every great business runs on.",
      tags: ["Market Positioning", "Visual Identity", "Competitive Analysis", "Brand Voice", "Go-To-Market"],
    },
    {
      num: "02", title: "UI/UX Design",
      description: "We design interfaces that stop people mid-scroll. Every screen is deliberate, every interaction earns its place. From wireframes to high-fidelity prototypes — obsessively crafted around how real humans think.",
      tags: ["Figma Prototyping", "Design Systems", "Motion Design", "Usability Testing", "Responsive Layouts"],
    },
    {
      num: "03", title: "Web Engineering",
      description: "Fast. Flawless. Built to last. We write custom web applications in React and Next.js with zero templates and zero compromise. Your codebase will be as beautiful as your interface — clean, documented, ready to scale.",
      tags: ["React / Next.js", "TypeScript", "API Integration", "Performance", "SEO Architecture"],
    },
    {
      num: "04", title: "Mobile App Development",
      description: "Native-quality mobile experiences built with obsessive precision. iOS, Android, or cross-platform — we engineer apps that feel alive in your hand, with the polish that earns five-star reviews and keeps users coming back.",
      tags: ["React Native", "iOS & Android", "App Store Launch", "Push Notifications", "Offline-First"],
    },
    {
      num: "05", title: "AI Agents & Automation",
      description: "Intelligent systems that work while you sleep. We build AI-powered agents and automated workflows that eliminate repetition, reduce costs, and free your team to focus on what actually moves the needle.",
      tags: ["LLM Integration", "Workflow Automation", "AI Chat Agents", "Data Pipelines", "Custom Tooling"],
    },
    {
      num: "06", title: "Social Media Marketing",
      description: "Presence without strategy is just noise. We build campaigns that convert — content calendars, paid media, community management. Every post is intentional. Every resource spent is tracked and optimized.",
      tags: ["Content Strategy", "Paid Social Ads", "Community Management", "Analytics", "Brand Campaigns"],
    },
    {
      num: "07", title: "Hosting & Infrastructure",
      description: "Your product deserves infrastructure that never blinks. We deploy and monitor on world-class edge servers — lightning-fast load times, 99.9% uptime, and experts watching your stack around the clock.",
      tags: ["Vercel / AWS / Railway", "CI/CD Pipelines", "Domain Management", "SSL & Security", "24/7 Monitoring"],
    },
  ];

  const processSteps = [
    { num: "01", title: "Discovery",      description: "Deep-dive sessions to understand your goals, audience, and constraints. The right questions unlock the best solutions." },
    { num: "02", title: "Strategy",       description: "A bespoke blueprint before a single line of code. Architecture, design system, milestones — all mapped with precision." },
    { num: "03", title: "Build",          description: "Obsessive execution in focused sprints. Clean code, pixel-perfect design, relentless testing — with full transparency throughout." },
    { num: "04", title: "Launch & Scale", description: "We don't disappear at go-live. Performance audits, SEO tuning, continuous optimization. We scale with you." },
  ];

  // Track scroll → active service (optimized to avoid rendering loop lag)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * services.length), services.length - 1);
      setActiveIdx(curr => (curr === idx ? curr : idx));
    });
    return unsubscribe;
  }, [scrollYProgress, services.length]);

  // Pricing
  const toggleService = (id: string) => {
    setSelectedServices(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const calcTotal = () => {
    let min = 0, max = 0;
    PRICING_SERVICES.forEach(s => {
      if (selectedServices.has(s.id)) {
        const displayMinUSD = isAfrican ? (s.minUSD * 0.5) : s.minUSD;
        min += displayMinUSD * selectedRegion.rate;
        max += s.maxUSD * selectedRegion.rate;
      }
    });
    return { min, max };
  };
  const { min, max } = calcTotal();
  const hasSelection = selectedServices.size > 0;

  const navLinks = ["Services", "Pricing", "Process", "Contact"];

  const fadeDown = {
    initial: { opacity: 0, y: -20 },
    animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }),
  };
  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }),
  };
  const slideUp = {
    initial: { y: "110%" },
    animate: (i: number) => ({ y: 0, transition: { delay: 0.4 + i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }),
  };

  const headingWords = ["Strategy", "Design", "Engineering"];

  return (
    <main className="relative w-full text-black min-h-screen">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-between min-h-screen w-full overflow-hidden text-black uppercase tracking-widest font-sans font-bold">
        {/* BG Video */}
        <motion.div style={{ y: videoY }} className="absolute inset-0 -z-10 overflow-hidden bg-white">
          <video className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
            autoPlay loop muted playsInline />
        </motion.div>

        {/* Nav */}
        <nav className="flex items-center justify-between w-full px-5 sm:px-8 md:px-14 pt-6 md:pt-8 z-10">
          <motion.div custom={0} initial="initial" animate="animate" variants={fadeDown}>
            <Logo />
          </motion.div>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, idx) => (
              <motion.a key={link} custom={idx + 1} initial="initial" animate="animate" variants={fadeDown}
                href={`#${link.toLowerCase()}`}
                className="text-xs font-bold tracking-widest uppercase text-black hover:text-[#5E0ED7] transition-colors"
              >{link}</motion.a>
            ))}
          </div>
          <motion.button custom={5} initial="initial" animate="animate" variants={fadeDown}
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 rounded-full bg-black flex flex-col items-center justify-center gap-[5px] cursor-pointer hover:bg-black/80 transition-colors border-0 outline-none"
            aria-label="Open menu"
          >
            <span className="w-4 h-0.5 bg-white rounded-full" />
            <span className="w-4 h-0.5 bg-white rounded-full" />
            <span className="w-4 h-0.5 bg-white rounded-full" />
          </motion.button>
        </nav>

        {/* Bottom content */}
        <div className="px-5 sm:px-8 md:px-14 pb-8 md:pb-14 flex flex-col z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 w-full">
            <motion.div custom={7} initial="initial" animate="animate" variants={fadeUp}
              className="order-2 md:order-1 md:max-w-[420px] lg:max-w-[500px] shrink-0">
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase text-black text-left md:text-right leading-relaxed">
                Beautiful interfaces attract attention. We design and engineer software that solves real problems, simplifies complexity, and gives ambitious businesses the confidence to scale.
              </p>
            </motion.div>
            <h1 id="hero-main-heading"
              className="order-1 md:order-2 flex flex-col items-start md:items-end text-left md:text-right font-black uppercase text-black select-none"
              style={{ fontSize: "clamp(2rem, 8vw, 8.5rem)", lineHeight: "0.86" }}
            >
              {headingWords.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span custom={i} initial="initial" animate="animate" variants={slideUp} className="block">{word}</motion.span>
                </div>
              ))}
            </h1>
          </div>
          <div className="flex items-center justify-end mt-6 md:mt-6">
            <motion.div custom={6} initial="initial" animate="animate" variants={fadeUp}>
              <a href="#services"
                className="inline-flex items-center gap-2 text-sm sm:text-lg md:text-xl text-[#5E0ED7] font-black tracking-widest uppercase whitespace-nowrap group hover:underline"
              >
                <span>Work With Us</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between">
            <div className="flex items-center justify-between w-full px-5 sm:px-8 md:px-14 pt-6 md:pt-8">
              <Logo onClick={() => setIsMenuOpen(false)} />
              <button onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white cursor-pointer hover:bg-black/80 transition-colors border-0 outline-none"
                aria-label="Close menu"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-col px-5 sm:px-8 md:px-14 gap-6">
              {navLinks.map((link, idx) => (
                <motion.a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-black hover:text-[#5E0ED7] transition-colors"
                >{link}</motion.a>
              ))}
            </div>
            <div className="pb-14 px-5 sm:px-8 md:px-14">
              <a href="#services" onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-2 text-lg font-black tracking-widest uppercase text-[#5E0ED7] hover:underline">
                <span>Work With Us</span><ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. MARQUEE ──────────────────────────────────────────────────── */}
      <section className="w-full overflow-hidden bg-black py-4 sm:py-5 select-none relative z-10">
        <div className="flex w-[200%] animate-marquee whitespace-nowrap">
          {[0, 1].map(i => (
            <div key={i} className={`flex items-center gap-14 text-white text-[10px] sm:text-xs tracking-widest font-bold uppercase ${i === 1 ? "ml-14" : ""}`}>
              <span>OBSESSIVE QUALITY</span><span className="text-[#5E0ED7]">•</span>
              <span>CRAFTED IN CODE</span><span className="text-[#5E0ED7]">•</span>
              <span>ZERO TEMPLATES</span><span className="text-[#5E0ED7]">•</span>
              <span>FLAWLESS DELIVERY</span><span className="text-[#5E0ED7]">•</span>
              <span>BUILT FOR THE ELITE</span><span className="text-[#5E0ED7]">•</span>
              <span>YOUR BRAND. PERFECTED.</span><span className="text-[#5E0ED7]">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. SERVICES — Sticky Scroll Cards ───────────────────────────── */}
      <section id="services" ref={servicesSectionRef}
        style={{ height: `${services.length * 100}vh` }}
        className="relative bg-black"
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-black">

          {/* Section label + progress counter */}
          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-14 pt-8 md:pt-12 shrink-0">
            <span className="text-xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase text-white leading-none">
              What We Do
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-widest uppercase text-[#5E0ED7] font-mono">
              {String(activeIdx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </span>
          </div>

          {/* Card Container (Full-bleed, static background wrapper) */}
          <div className="relative z-10 flex-1 flex items-center overflow-y-auto md:overflow-visible">
            <div className="w-full bg-[#5E0ED7] text-white py-12 md:py-20 px-5 sm:px-8 md:px-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20 items-stretch md:items-center max-w-[1400px] mx-auto"
                >
                  {/* Left (Title) */}
                  <div className="flex flex-col gap-3 md:gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/60 font-mono">
                        /{services[activeIdx].num}
                      </span>
                      <div className="h-px flex-1 bg-white/20" />
                    </div>
                    <h2 className="font-black uppercase text-white leading-none text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                      {services[activeIdx].title}
                    </h2>
                  </div>

                  {/* Right (Description & Tags) */}
                  <div className="flex flex-col gap-4 md:gap-8">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90 leading-relaxed">
                      {services[activeIdx].description}
                    </p>
                    <div className="flex flex-col gap-2 md:gap-3">
                      <span className="text-[9px] font-bold tracking-widest uppercase text-white/50">Includes</span>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {services[activeIdx].tags.map(tag => (
                          <span key={tag} className="text-[9px] sm:text-xs font-bold tracking-wider uppercase bg-white/10 text-white px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white hover:text-[#5E0ED7] transition-colors">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 px-5 sm:px-8 md:px-14 pb-8 md:pb-10 shrink-0">
            <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                style={{
                  scaleX: scrollYProgress,
                  backgroundImage: "linear-gradient(90deg, #5E0ED7 0%, #8b5cf6 25%, #d8b4fe 50%, #8b5cf6 75%, #5E0ED7 100%)",
                  backgroundSize: "200% 100%",
                  transformOrigin: "left"
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%"]
                }}
                transition={{
                  backgroundPosition: { repeat: Infinity, duration: 2, ease: "linear" }
                }}
                className="absolute inset-0 rounded-full"
              />
            </div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/20 mt-3">
              Scroll to explore all services
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. PRICING CALCULATOR ───────────────────────────────────────── */}
      <section id="pricing" className="relative z-10 bg-white py-24 md:py-32 border-t border-black/8 overflow-hidden">
        {/* Coins BG Video */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover scale-100"
            src="https://videotourl.com/videos/1783776564861-291c67fb-af00-4287-881e-f65bba81ca4d.mp4"
            autoPlay loop muted playsInline preload="none"
          />
          <div className="absolute inset-0 bg-white/78" />
        </div>
        <div className="px-5 sm:px-8 md:px-14 max-w-[1400px] mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5E0ED7]">Transparent Pricing</span>
              <h2 className="font-black tracking-tighter uppercase text-black leading-[0.85] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                Build your<br />estimate.
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-black/50 tracking-wider uppercase max-w-sm leading-relaxed">
              Select your country and the services you need — we&apos;ll give you an instant ballpark figure in your currency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14">
            {/* Selectors */}
            <div className="lg:col-span-3 flex flex-col gap-10">

              {/* Region */}
              <div className="flex flex-col gap-4">
                <label className="text-xs font-black tracking-widest uppercase text-black">01 — Your Location</label>
                <div className="relative">
                  <button onClick={() => setRegionDropdownOpen(o => !o)}
                    className="w-full flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-2 border-black/10 rounded-xl bg-white hover:border-[#5E0ED7] transition-colors text-left">
                    <span className="font-bold tracking-wider uppercase text-xs sm:text-sm text-black">{selectedRegion.label}</span>
                    <motion.div animate={{ rotate: regionDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-black/40" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {regionDropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-black/8 rounded-xl shadow-2xl z-20 max-h-72 overflow-y-auto">
                        {REGIONS.map(region => (
                          <button key={region.code}
                            onClick={() => { setSelectedRegion(region); setRegionDropdownOpen(false); }}
                            className={`w-full flex items-center justify-between px-6 py-4 text-left hover:bg-black/[0.03] transition-colors text-xs sm:text-sm font-bold tracking-wider uppercase ${selectedRegion.code === region.code ? "text-[#5E0ED7]" : "text-black"}`}
                          >
                            <span>{region.label}</span>
                            <span className="text-black/30 font-mono text-xs">{region.currency}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-4">
                <label className="text-xs font-black tracking-widest uppercase text-black">02 — Select Services</label>
                <div className="flex flex-col gap-2.5">
                  {PRICING_SERVICES.map(s => {
                    const selected = selectedServices.has(s.id);
                    return (
                      <motion.button key={s.id} onClick={() => toggleService(s.id)} whileTap={{ scale: 0.98 }}
                        className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 px-5 py-4 sm:px-6 sm:py-5 rounded-xl border-2 transition-all duration-200 text-left ${selected ? "border-[#5E0ED7] bg-[#5E0ED7]/5" : "border-black/8 bg-white hover:border-black/20"}`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected ? "border-[#5E0ED7] bg-[#5E0ED7]" : "border-black/20"}`}>
                            {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                          </div>
                          <span className={`text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors ${selected ? "text-[#5E0ED7]" : "text-black"}`}>
                            {s.label}
                          </span>
                        </div>
                        <span className={`text-[11px] sm:text-xs font-bold font-mono shrink-0 sm:ml-4 ${selected ? "text-[#5E0ED7]" : "text-black/30"}`}>
                          {formatPrice((isAfrican ? s.minUSD * 0.5 : s.minUSD) * selectedRegion.rate, selectedRegion.symbol)}–{formatPrice(s.maxUSD * selectedRegion.rate, selectedRegion.symbol)} {s.unit}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Estimate Panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 flex flex-col gap-6 border-2 border-black/8 rounded-2xl p-6 sm:p-8 md:p-10 bg-white">
                <div>
                  <span className="text-xs font-black tracking-widest uppercase text-black/40">Your Estimate · {selectedRegion.currency}</span>
                </div>

                <AnimatePresence mode="wait">
                  {!hasSelection ? (
                    <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-black/30 leading-relaxed py-4">
                      Select services on the left to see your instant price estimate.
                    </motion.p>
                  ) : (
                    <motion.div key="est" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
                      <div>
                        <span className="text-xs font-black tracking-widest uppercase text-black/40">Estimated Range</span>
                        <motion.div key={`${min}-${max}`} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-none mt-2">
                          {formatPrice(min, selectedRegion.symbol)}
                          <span className="text-black/20 mx-2 sm:mx-3">–</span>
                          {formatPrice(max, selectedRegion.symbol)}
                        </motion.div>
                      </div>
                      <div className="flex flex-col gap-2.5 border-t-2 border-black/5 pt-5">
                        {PRICING_SERVICES.filter(s => selectedServices.has(s.id)).map(s => {
                          const displayMinUSD = isAfrican ? (s.minUSD * 0.5) : s.minUSD;
                          return (
                            <div key={s.id} className="flex items-center justify-between gap-3 text-[11px] sm:text-xs">
                              <span className="font-bold tracking-wider uppercase text-black/50 truncate">{s.label}</span>
                              <span className="font-bold font-mono text-black/35 shrink-0">
                                {formatPrice(displayMinUSD * selectedRegion.rate, selectedRegion.symbol)}+
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t-2 border-black/5 pt-6 flex flex-col gap-5">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-black/30 leading-relaxed">
                    Every project is different. Final pricing depends on scope, complexity, integrations, and timeline. Book a call for an accurate quotation.
                  </p>
                  <a href="https://calendar.app.google/79xGJrNVucjU4gjy8" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-black hover:bg-[#5E0ED7] text-white font-black tracking-widest uppercase text-xs px-6 py-4 rounded-full transition-all duration-300 group w-full">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Book a Free Call</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ──────────────────────────────────────────────────── */}
      <section id="process" className="py-24 md:py-32 relative z-10 bg-[#080808] text-white border-t border-white/5">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 px-5 sm:px-8 md:px-14">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#5E0ED7]">How We Work</span>
              <h2 className="font-black tracking-tighter uppercase text-white leading-[0.85] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                The Perfectionists<br />process.
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-medium text-white/35 tracking-wider uppercase max-w-xs leading-relaxed">
              From the first call to launch day — every step is deliberate, every decision documented.
            </p>
          </div>

          {/* Stepper info line (label + progress counter) */}
          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-14 pb-8 shrink-0 select-none">
            <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-widest uppercase text-white leading-none">
              How We Work
            </span>
            <span className="text-lg sm:text-xl font-bold tracking-widest uppercase text-[#5E0ED7] font-mono">
              {String(activeStepIdx + 1).padStart(2, "0")} / {String(processSteps.length).padStart(2, "0")}
            </span>
          </div>

          {/* Card Viewer - Full bleed with static purple background wrapper */}
          <div className="relative z-10 flex items-center w-full overflow-hidden">
            <div className="w-full bg-[#5E0ED7] text-white py-12 md:py-20 px-5 sm:px-8 md:px-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-20 items-stretch md:items-center max-w-[1400px] mx-auto"
                >
                  {/* Left (Title) */}
                  <div className="flex flex-col gap-3 md:gap-6">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/60 font-mono">
                        /{processSteps[activeStepIdx].num}
                      </span>
                      <div className="h-px flex-1 bg-white/20" />
                    </div>
                    <h2 className="font-black uppercase text-white leading-none text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                      {processSteps[activeStepIdx].title}
                    </h2>
                  </div>

                  {/* Right (Description) */}
                  <div className="flex flex-col gap-4 md:gap-8 justify-between h-full">
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90 leading-relaxed">
                      {processSteps[activeStepIdx].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="relative z-10 px-5 sm:px-8 md:px-14 pt-8 md:pt-12 flex items-center justify-between select-none">
            <button
              onClick={() => setActiveStepIdx(p => Math.max(p - 1, 0))}
              disabled={activeStepIdx === 0}
              className={`inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase transition-all select-none border-0 bg-transparent ${activeStepIdx === 0 ? "opacity-20 cursor-default text-white" : "text-white/60 hover:text-white hover:-translate-x-1 cursor-pointer"}`}
            >
              ← Back
            </button>

            <button
              onClick={() => {
                if (activeStepIdx < processSteps.length - 1) {
                  setActiveStepIdx(p => p + 1);
                } else {
                  setActiveStepIdx(0); // loop back
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-[#5E0ED7] hover:text-white hover:translate-x-1 transition-all select-none border-0 bg-transparent cursor-pointer"
            >
              <span>{activeStepIdx === processSteps.length - 1 ? "Start Over" : "Next Step"}</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ───────────────────────────────────────────────────── */}
      <footer id="contact" className="px-5 sm:px-8 md:px-14 pt-24 pb-14 flex flex-col gap-16 border-t border-black/8 relative z-10 bg-white">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-14">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-bold tracking-widest uppercase text-[#5E0ED7]">Get In Touch</span>
            <h2 className="font-black tracking-tighter uppercase text-black leading-[0.85] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
              Let&apos;s build<br />something<br /><span className="text-[#5E0ED7]">Perfect.</span>
            </h2>
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-black/45 max-w-md leading-relaxed mt-2">
              You have a vision. We have the craft. Every elite brand started with one honest conversation — let&apos;s have ours.
            </p>
          </div>
          <div className="flex flex-col gap-4 self-start md:self-end">
            <a id="footer-call-button" href="https://calendar.app.google/79xGJrNVucjU4gjy8" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#5E0ED7] hover:bg-[#4a0baa] text-white font-black tracking-widest uppercase text-xs sm:text-sm px-8 py-4 sm:px-9 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap group">
              <Phone className="w-4 h-4" /><span>Book a Free Call</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a id="footer-email" href="mailto:hello@perfectionists.co.za"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-black font-bold tracking-wider uppercase group hover:text-[#5E0ED7] transition-colors border-b-2 border-black/15 pb-1 hover:border-[#5E0ED7]">
              <span>hello@perfectionists.co.za</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-2 border-black/5 pt-8 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-black/30">
          <div>© {new Date().getFullYear()} The Perfectionists. All rights reserved.</div>
          <div className="flex gap-6">
            {["Services","Pricing","Process","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#5E0ED7] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Preloader Screen Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Top Bar for Logo alignment */}
            <div className="absolute top-0 left-0 w-full px-5 sm:px-8 md:px-14 pt-6 md:pt-8 flex justify-between z-10 pointer-events-none">
              <Logo />
            </div>

            {/* Pulse background circle */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-72 h-72 sm:w-[450px] sm:h-[450px] rounded-full bg-[#5E0ED7]/15 blur-2xl z-0"
            />

            {/* Hello loop */}
            <div className="h-24 sm:h-32 md:h-40 flex items-center justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={helloIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl sm:text-7xl md:text-9xl font-black uppercase text-black tracking-tighter"
                >
                  {HELLOS[helloIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
