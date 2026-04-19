/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  Timer, 
  MapPin, 
  Phone, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Menu, 
  X,
  Stethoscope,
  Scissors,
  MessageSquare,
  ArrowRight,
  Clock,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
interface Transformation {
  id: number;
  title: string;
  before: string;
  after: string;
  description: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  highValue?: boolean;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 1,
    title: "Advanced Dental Implants",
    description: "Replace missing teeth with permanent, natural-looking solutions using our 3D surgical planning.",
    icon: <Stethoscope className="w-6 h-6" />,
    highValue: true
  },
  {
    id: 2,
    title: "Laser Dentistry",
    description: "Experience painless fillings and gum treatments with our state-of-the-art WaterLase technology.",
    icon: <Scissors className="w-6 h-6" />,
    highValue: true
  },
  {
    id: 3,
    title: "Smile Makeovers (Veneers)",
    description: "Transform your confidence with custom-crafted porcelain veneers for a flawless, aesthetic smile.",
    icon: <Sparkles className="w-6 h-6" />,
    highValue: true
  },
  {
    id: 4,
    title: "Pediatric Dentistry",
    description: "Gentle, fear-free care for the youngest members of your family in a comfortable environment.",
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: 5,
    title: "Orthodontics",
    description: "Straighten your smile with modern braces or clear aligners for life-long confidence.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    id: 6,
    title: "Emergency Care",
    description: "Urgent dental support for pain, fractures, or infections available outside regular hours.",
    icon: <Timer className="w-6 h-6" />,
  },
];

const TRANSFORMATIONS: Transformation[] = [
  {
    id: 1,
    title: "Full Arch Rehabilitation",
    before:
      "https://res.cloudinary.com/dvh0codc1/image/upload/v1776588079/Gemini_Generated_Image_ju042fju042fju04_t6s5zk.png",
    after:
      "https://res.cloudinary.com/dvh0codc1/image/upload/v1776588079/Gemini_Generated_Image_ju042fju042fju04_t6s5zk.png",
    description:
      "Complete restoration using 4-point implants for a patient with severe tooth loss.",
  },
  {
    id: 2,
    title: "Cosmetic Veneers",
    before:
      "https://www.bayavenuedentalcentre.com/wp-content/uploads/2025/12/smile-makeover-with-veneers-in-dubai-bay-avenue.jpg",
    after:
      "https://www.bayavenuedentalcentre.com/wp-content/uploads/2025/12/smile-makeover-with-veneers-in-dubai-bay-avenue.jpg",
    description:
      "Corrected spacing and staining issues with 8 premium porcelain E-max veneers.",
  },
  {
    id: 3,
    title: "Laser Gum Contouring",
    before:
      "https://ardentsidcup.co.uk/wp-content/uploads/2025/10/laser-gum-contouring-bf4.jpg",
    after:
      "https://ardentsidcup.co.uk/wp-content/uploads/2025/10/laser-gum-contouring-bf4.jpg",
    description: "Reshaped a gummy smile in just one session with no downtime.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    author: "Amit Sharma",
    text: "Got my implants done by Dr. Risha. Transparent pricing and the surgical precision was mind-blowing. Virar's best clinic hands down.",
    rating: 5
  },
  {
    id: 2,
    author: "Priya Varma",
    text: "Painless laser surgery! I was terrified of dentists but Risha Dental Care changed that. 128 reviews don't lie.",
    rating: 5
  }
];

// --- Components ---

const BeforeAfterSlider = ({ before, after }: { before: string; after: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-platinum cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsResizing(true)}
      onMouseUp={() => setIsResizing(false)}
      onMouseLeave={() => setIsResizing(false)}
      onTouchStart={() => setIsResizing(true)}
      onTouchEnd={() => setIsResizing(false)}
    >
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" referrerPolicy="no-referrer" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden" 
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={before} 
          className="absolute inset-0 object-cover max-w-none h-full" 
          style={{ width: containerWidth }} 
          alt="Before" 
          referrerPolicy="no-referrer" 
        />
      </div>
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl flex items-center justify-center pointer-events-none" 
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-prestige-blue">
          <ChevronLeft className="w-4 h-4 text-prestige-blue -mr-1" />
          <ChevronRight className="w-4 h-4 text-prestige-blue -ml-1" />
        </div>
      </div>
      <div className="absolute bottom-6 left-6 bg-ink/80 text-white text-[10px] uppercase font-bold tracking-[0.3em] px-4 py-2 rounded-full backdrop-blur-md">Before</div>
      <div className="absolute bottom-6 right-6 bg-laser-blue text-white text-[10px] uppercase font-bold tracking-[0.3em] px-4 py-2 rounded-full backdrop-blur-md">After</div>
    </div>
  );
};

const SectionTitle = ({ subtitle, title, centered = false }: { subtitle: string; title: string, centered?: boolean }) => (
  <div className={`mb-10 lg:mb-16 ${centered ? "text-center" : ""}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-[10px] font-black uppercase tracking-[0.3em] text-laser-blue mb-4 lg:mb-6 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl lg:text-6xl font-serif text-prestige-blue leading-[1.15]"
    >
      {title}
    </motion.h2>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Smile Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 h-16 lg:h-20 ${
      isScrolled ? "bg-white shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-serif text-lg lg:text-xl italic select-none shadow-md ${
            isScrolled ? "bg-prestige-blue text-white" : "bg-white text-prestige-blue"
          }`}>R</div>
          <span className={`text-base lg:text-xl font-bold tracking-tight serif italic ${
            isScrolled ? "text-prestige-blue" : "text-white"
          }`}>
            Risha <span className={isScrolled ? "font-light not-italic text-ink" : "font-light not-italic text-platinum/80"}>Dental Care</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                isScrolled ? "text-ink/70 hover:text-laser-blue" : "text-white/80 hover:text-laser-blue"
              }`}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#booking" 
            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all shadow-xl ${
              isScrolled ? "bg-prestige-blue text-white hover:bg-laser-blue" : "bg-white text-prestige-blue hover:bg-laser-blue hover:text-white"
            }`}
          >
            Book 24/7 AI-Consult
          </a>
        </div>

        <button 
          className={`lg:hidden transition-colors ${isScrolled ? "text-prestige-blue" : "text-white"}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-b border-platinum p-6 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm font-bold uppercase tracking-widest text-ink block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#booking" 
              className="bg-prestige-blue text-white w-full py-4 rounded-xl text-center font-bold text-sm block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book 24/7 AI-Consult
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SmileGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % TRANSFORMATIONS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TRANSFORMATIONS.length) % TRANSFORMATIONS.length);

  return (
    <section id="gallery" className="py-16 lg:py-24 px-5 lg:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-center">
          <div>
            <SectionTitle 
              subtitle="Precision Outcome" 
              title="Drag to Compare Results" 
            />
            
            <BeforeAfterSlider 
              before={TRANSFORMATIONS[activeIndex].before} 
              after={TRANSFORMATIONS[activeIndex].after} 
            />
          </div>

          <div className="bg-paper p-6 lg:p-10 rounded-[2.5rem] border border-platinum shadow-xl relative mt-8 lg:mt-0">
            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-12 h-12 lg:w-16 lg:h-16 bg-laser-blue text-white rounded-full flex items-center justify-center font-serif text-lg lg:text-xl italic shadow-lg">#0{activeIndex + 1}</div>
            
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl lg:text-3xl font-serif italic text-prestige-blue mb-4 lg:mb-6">{TRANSFORMATIONS[activeIndex].title}</h3>
              <p className="text-base lg:text-lg text-ink/70 leading-relaxed mb-6 lg:mb-8">{TRANSFORMATIONS[activeIndex].description}</p>
              
              <div className="flex items-center gap-4 border-t border-platinum pt-6 lg:pt-8">
                <button onClick={prev} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-platinum flex items-center justify-center hover:bg-prestige-blue hover:text-white transition-all">
                  <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                <div className="flex-1 text-center text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-ink/30">Case Study 2026</div>
                <button onClick={next} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-platinum flex items-center justify-center hover:bg-prestige-blue hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIConsultant = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    phone: ""
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-2xl border border-platinum relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-laser-blue/5 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-700" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-laser-blue flex items-center justify-center text-white animate-pulse">
           <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-ink">AI Scheduling Assistant</h4>
          <p className="text-[10px] text-laser-blue font-bold uppercase tracking-widest">Online 24/7 | Afternoon Break Active</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <p className="text-sm font-medium text-ink/80 mb-6">Hello! I'm your digital concierge. Which premium service are you interested in?</p>
            <div className="grid gap-3">
              {["Dental Implants", "Laser Smile Design", "Clear Aligners", "General Checkup"].map((s) => (
                <button 
                  key={s} 
                  onClick={() => { setFormData({...formData, service: s}); nextStep(); }}
                  className="w-full text-left p-4 rounded-xl border border-platinum hover:border-prestige-blue hover:bg-platinum/20 transition-all font-medium text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
             <p className="text-sm font-medium text-ink/80 mb-6">Excellent choice. Who should we book this for?</p>
             <input 
                type="text" 
                placeholder="Your Full Name" 
                className="w-full p-4 rounded-xl border border-platinum focus:border-laser-blue outline-none mb-6"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
             />
             <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 border border-platinum text-ink py-4 rounded-xl font-bold hover:bg-platinum/20 transition-all">Back</button>
                <button onClick={nextStep} className="flex-[2] bg-prestige-blue text-white py-4 rounded-xl font-bold shadow-lg shadow-prestige-blue/20 hover:bg-laser-blue transition-all">Next Step</button>
             </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
             <p className="text-sm font-medium text-ink/80 mb-6">Almost done, {formData.name}. Your WhatsApp number for confirmation?</p>
             <input 
                type="tel" 
                placeholder="+91 WhatsApp Number" 
                className="w-full p-4 rounded-xl border border-platinum focus:border-laser-blue outline-none mb-6"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
             />
             <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 border border-platinum text-ink py-4 rounded-xl font-bold hover:bg-platinum/20 transition-all">Back</button>
                <button onClick={nextStep} className="flex-[2] bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:opacity-90 transition-all">
                  Confirm WhatsApp
                </button>
             </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <h4 className="text-xl font-bold mb-2">Pre-Booked Successfully!</h4>
             <p className="text-sm text-ink/60">We've received your request. Our team will WhatsApp you at peak efficiency when we resume from the break.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-laser-blue selection:text-white">
      <Navbar />

      {/* Hero Section - Fixed Responsive */}
      {/* Hero Section - Fully Fixed */}
      <section
        id="home"
        className="relative flex flex-col lg:flex-row lg:min-h-screen bg-prestige-blue"
      >
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-[60%] px-5 py-16 md:px-12 md:py-20 lg:px-20 lg:py-0 flex flex-col justify-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-6 lg:mb-10">
              <span className="w-8 lg:w-12 h-[1px] bg-laser-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-laser-blue">
                Virar West Premier Surgical Clinic
              </span>
            </div>

            <h1 className="text-[2.4rem] md:text-6xl lg:text-[110px] font-serif font-light leading-[1.1] tracking-tight mb-8 lg:mb-12">
              Precision <br className="hidden md:block" />
              <span className="italic">Implants &</span>{" "}
              <br className="hidden md:block" />
              <span className="font-sans text-[0.7em] font-bold block mt-2">
                Laser Care.
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end max-w-3xl">
              <p className="text-base md:text-lg text-platinum/70 leading-relaxed italic">
                A legacy of 18+ years in Datt Mandir Road. We move Virar West
                toward a new era of painless surgical dentistry.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="#booking"
                  className="bg-laser-blue text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all text-center"
                >
                  Consult Specialist
                </a>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-prestige-blue object-cover"
                        src={`https://picsum.photos/seed/patient-v${i}/100/100`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-platinum/40">
                    128+ Success Cases
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-[40%] relative h-[260px] sm:h-[320px] lg:h-auto overflow-hidden">
          <img
            src="https://img.freepik.com/free-photo/vertical-closeup-orthodontist-checking-patient-s-teeth_181624-49711.jpg"
            alt="Clinic"
            className="w-full h-full object-cover object-center grayscale-[0.2] max-h-[500px] lg:max-h-none"
          />
          <div className="absolute inset-0 bg-prestige-blue/20 mix-blend-multiply" />
        </div>

        {/* TECH BAR - PREMIUM FINAL */}
        <div
          className="
    w-full
    bg-white/5 backdrop-blur-sm border-t border-white/10
    px-5 py-6 lg:px-20 lg:py-8
    lg:absolute lg:bottom-0 lg:left-0 lg:right-0
  "
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Clinical Precision", val: "0.01mm" },
              { label: "Experience", val: "18 Years" },
              { label: "Painless Tech", val: "WaterLase™" },
              { label: "Success Rate", val: "99.8%" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`
          flex flex-col items-start justify-center gap-1
          px-5 py-2
          rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-[0_8px_30px_rgba(0,0,0,0.2)]
          transition-all duration-300
          hover:-translate-y-1 hover:bg-white/20
          ${i === 3 ? "bg-laser-blue/20 border-laser-blue/40" : ""}
        `}
              >
                {/* Top Row (dot + label) */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-laser-blue" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">
                    {stat.label}
                  </span>
                </div>

                {/* Value */}
                <span className="text-[16px] font-semibold text-white ml-4">
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Bar - Marquee Redesign */}
      <section className="bg-platinum/50 py-10 border-y border-platinum overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-platinum to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-platinum to-transparent z-10" />

        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-6 items-center flex-nowrap"
          >
            {[
              "WaterLase™ Certified",
              "3Shape Digital Scanning",
              "Ivoclar Vivadent",
              "Straumann Implants",
              "WaterLase™ Certified",
              "3Shape Digital Scanning",
              "Ivoclar Vivadent",
              "Straumann Implants",
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-white border border-platinum px-8 py-3 rounded-full shadow-sm flex items-center gap-3 group hover:border-prestige-blue transition-colors cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-laser-blue" />
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-prestige-blue whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 lg:py-24 px-5 lg:px-6 bg-paper">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="Clinical Authority"
            title="Surgical Excellence"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -10 }}
                className={`p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] transition-all border duration-500 ${
                  s.highValue
                    ? "bg-prestige-blue text-white shadow-2xl border-transparent"
                    : "bg-white text-ink border-platinum shadow-lg"
                }`}
              >
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mb-6 lg:mb-10 ${
                    s.highValue
                      ? "bg-white text-prestige-blue"
                      : "bg-platinum text-ink"
                  }`}
                >
                  {s.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
                  {s.title}
                </h3>
                <p
                  className={`text-xs lg:text-sm leading-relaxed mb-8 lg:mb-10 ${s.highValue ? "opacity-70" : "opacity-50"}`}
                >
                  {s.description}
                </p>
                <button
                  className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 ${s.highValue ? "text-laser-blue" : "text-prestige-blue"}`}
                >
                  Learn Procedure <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <SmileGallery />

      {/* AI Assistant & Why Choose Us Section */}
      <section
        id="booking"
        className="py-16 lg:py-24 px-5 lg:px-6 bg-platinum/30 border-y border-platinum"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div className="flex flex-col justify-center">
            <SectionTitle
              subtitle="The Risha Advantage"
              title="Modern Care for Virar"
            />
            <div className="grid gap-6 lg:gap-8">
              {[
                {
                  title: "Surgical Authority",
                  desc: "18+ years of dedicated experience in complex implants and oral cosmetics.",
                },
                {
                  title: "24/7 Connectivity",
                  desc: "Never wait for an answer. Our AI assistant manages bookings even during lunch closures.",
                },
                {
                  title: "Painless Laser Tech",
                  desc: "Minimally invasive WaterLase technology for superior healing and zero fear.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 lg:gap-6 items-start group">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-white border border-platinum flex items-center justify-center text-laser-blue flex-shrink-0 group-hover:bg-prestige-blue group-hover:text-white transition-all shadow-sm">
                    <CheckCircle i={i} />
                  </div>
                  <div>
                    <h5 className="text-base lg:text-lg font-bold mb-1 lg:mb-2">
                      {item.title}
                    </h5>
                    <p className="text-xs lg:text-sm opacity-60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <AIConsultant />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 lg:py-24 px-5 lg:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-1/2">
            <SectionTitle subtitle="Visit Us" title="Datt Mandir Road, Virar" />
            <div className="bg-paper p-6 lg:p-10 rounded-[2rem] border border-platinum space-y-8 lg:space-y-10">
              <div className="flex gap-4 lg:gap-6">
                <MapPin className="text-laser-blue w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                <div>
                  <h6 className="font-bold text-base lg:text-lg mb-1">
                    Clinic Address
                  </h6>
                  <p className="opacity-60 text-xs lg:text-sm">
                    Shop No. 4, Prestige Plaza, Datt Mandir Road, Virar West,
                    Maharashtra 401303
                  </p>
                </div>
              </div>
              <div className="flex gap-4 lg:gap-6">
                <Clock className="text-laser-blue w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
                <div>
                  <h6 className="font-bold text-base lg:text-lg mb-1">
                    Consultation Hours
                  </h6>
                  <div className="grid grid-cols-2 gap-x-4 lg:gap-x-10 gap-y-1 text-xs lg:text-sm opacity-60">
                    <span>Mon - Sat</span> <span>10:00 - 13:00</span>
                    <span className="col-span-1 italic text-laser-blue">
                      Afternoon Break
                    </span>{" "}
                    <span className="italic text-laser-blue font-bold text-[8px] lg:text-[10px] uppercase">
                      AI Ready
                    </span>
                    <span>Evening</span> <span>17:00 - 21:00</span>
                    <span>Sunday</span>{" "}
                    <span className="font-bold text-red-500">By Appt.</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="tel:+919999999999"
                  className="flex-1 bg-prestige-blue text-white py-4 rounded-full text-center font-bold text-xs lg:text-sm hover:bg-laser-blue transition-all"
                >
                  Call Reception
                </a>
                <a
                  href="https://wa.me/919999999999"
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-full text-center font-bold text-xs lg:text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-[350px] lg:h-[500px] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-2 lg:border-4 border-white grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15041.514781682885!2d72.8016556!3d19.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a96030c6a5bb%3A0xc3c9451433069b13!2sVirar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1713430000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-prestige-blue py-16 lg:py-24 px-5 lg:px-6 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 lg:mb-20">
            <div>
              <div className="text-2xl lg:text-3xl font-serif italic mb-6 lg:mb-8">
                Risha
                <span className="not-italic text-sm ml-2 opacity-50 font-sans tracking-widest uppercase">
                  Dental
                </span>
              </div>
              <p className="opacity-40 text-xs lg:text-sm leading-relaxed">
                Virar West's leading clinical authority on specialized laser
                surgery and implant rehabilitation. Over 18 years of
                transformative care.
              </p>
            </div>
            <div>
              <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-laser-blue mb-6 lg:mb-8">
                Navigation
              </h6>
              <div className="flex flex-col gap-3 lg:gap-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-60">
                <a href="#home" className="hover:text-white transition-opacity">
                  Home
                </a>
                <a
                  href="#services"
                  className="hover:text-white transition-opacity"
                >
                  Surgical Services
                </a>
                <a
                  href="#gallery"
                  className="hover:text-white transition-opacity"
                >
                  Smile Gallery
                </a>
                <a
                  href="#contact"
                  className="hover:text-white transition-opacity"
                >
                  Find Us
                </a>
              </div>
            </div>
            <div>
              <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-laser-blue mb-6 lg:mb-8">
                Digital Support
              </h6>
              <p className="text-[10px] lg:text-xs opacity-60 mb-6 leading-relaxed">
                Our AI assistant is active 24/7. Book during breaks for priority
                evening slots.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-prestige-blue transition-all cursor-pointer">
                  <Facebook className="w-3 h-3 lg:w-4 lg:h-4" />
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-prestige-blue transition-all cursor-pointer">
                  <Instagram className="w-3 h-3 lg:w-4 lg:h-4" />
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-laser-blue mb-6 lg:mb-8">
                Reputation
              </h6>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl lg:text-3xl font-bold italic serif">
                  4.7
                </div>
                <div className="flex text-yellow-500">
                  <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />
                </div>
              </div>
              <p className="text-[10px] font-medium opacity-60">
                Verified by 128+ Search Reviews
              </p>
            </div>
          </div>
          <div className="pt-8 lg:pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6">
            <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 italic font-serif text-center md:text-left">
              Risha Dental Care – Virar West © 2026
            </span>
            <div className="flex gap-6 lg:gap-10 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 justify-center">
              <span>Clinic Safety</span>
              <span>Sterilization Guarantee</span>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Floating Button */}
      <div className="fixed bottom-6 lg:bottom-8 right-6 lg:right-8 z-[100] group">
        <div className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-xl text-[10px] font-bold text-prestige-blue shadow-xl border border-platinum opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap hidden lg:block">
          Consult AI Now
        </div>
        <a
          href="#booking"
          className="w-12 h-12 lg:w-16 lg:h-16 bg-laser-blue text-white rounded-full shadow-2xl shadow-laser-blue/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <MessageSquare className="w-6 h-6 lg:w-7 lg:h-7" />
        </a>
      </div>
    </div>
  );
}

function CheckCircle({ i }: { i: number }) {
  return (
    <div className="relative">
      <ShieldCheck className="w-6 h-6" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-laser-blue rounded-full border-2 border-white shadow-sm" />
    </div>
  );
}
