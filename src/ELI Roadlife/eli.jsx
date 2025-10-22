import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Truck, Phone, Heart, Clock, Shield, Star, CheckCircle, Users, Headphones, Quote, TrendingUp, Facebook, Instagram, Linkedin, Rss, CloudCog } from 'lucide-react';
import { motion } from "framer-motion";


const slides = [
  { img: "/images/problem1.jpg", title: "Stress & Isolation", desc: "Loneliness, relationship strain, and mental health challenges from days away." },
  { img: "/images/problem2.jpg", title: "Heavy Compliance", desc: "Constant HOS monitoring, risk of violations, fines, and tedious paperwork." },
  { img: "/images/problem3.jpg", title: "Work-Life Imbalance", desc: "Inability to focus on home responsibilities and personal life demands." },
  { img: "/images/problem4.jpg", title: "Lack of Support", desc: "Feeling alone without a dedicated support system or concierge on the road." },
];

const StaggeredText = ({ text, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={`inline-block transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } ${className}`}
    >
      {text}
    </span>
  );
};

const useAutoAdvance = (totalItems, interval = 8000) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % totalItems);
    }, interval);
    return () => clearInterval(timer);
  }, [totalItems, interval]);

  return [activeIndex, setActiveIndex];
};

function ProblemCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  const handlePrev = () => setActiveIndex(prev => (prev - 1 + total) % total);
  const handleNext = () => setActiveIndex(prev => (prev + 1) % total);

  return (
    <section id="problem" className="relative py-24 bg-gradient-to-b from-white via-blue-50 to-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-[#1e40af] text-center">
          Facing the Road's Toughest Burdens
        </h2>

        <div className="relative flex justify-center items-center gap-6 overflow-hidden h-[360px] cursor-grab active:cursor-grabbing">
          {slides.map((slide, idx) => {
            let position = "scale-80 opacity-0 translate-x-0";

            const prevIndex = (activeIndex - 1 + total) % total;
            const nextIndex = (activeIndex + 1) % total;

            if (idx === activeIndex) {
              position = "scale-100 opacity-100 z-30 translate-x-0";
            } else if (idx === prevIndex) {
              position = "scale-90 opacity-70 z-20 -translate-x-32 md:-translate-x-40";
            } else if (idx === nextIndex) {
              position = "scale-90 opacity-70 z-20 translate-x-32 md:translate-x-40";
            } else if (idx === (activeIndex + 2) % total) {
              position = "scale-80 opacity-0 translate-x-80 md:translate-x-96";
            } else if (idx === (activeIndex - 2 + total) % total) {
              position = "scale-80 opacity-0 -translate-x-80 md:-translate-x-96";
            }

            const isActive = idx === activeIndex;

            return (
              <div
                key={idx}
                className={`absolute w-72 md:w-80 lg:w-96 flex-shrink-0 transition-all duration-700 ease-out 
                                 transform cursor-pointer shadow-xl rounded-xl
                                 ${position}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="w-full h-72 md:h-80 bg-white border border-blue-400 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x400/1e40af/ffffff?text=Alert';
                    }}
                  />
                </div>

                <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-800/60 rounded-xl flex flex-col justify-end p-6 text-white transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-all duration-700 transform ${isActive ? 'translate-y-0' : 'translate-y-10'}`}>
                    {slide.title}
                  </h3>
                  <p className={`text-sm md:text-lg transition-all duration-700 delay-150 transform ${isActive ? 'translate-y-0' : 'translate-y-10'}`}>
                    {slide.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-16 space-x-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-700 transition active:scale-95"
            aria-label="Previous problem"
          >
            &larr;
          </button>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-3 rounded-full transition-all duration-300 active:scale-95 ${activeIndex === idx ? 'bg-[#1e40af] w-8 shadow-md' : 'bg-blue-300 w-3 hover:bg-[#1e40af]'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-blue-200 hover:bg-blue-300 text-blue-700 transition active:scale-95"
            aria-label="Next problem"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * NEW HOOK: Use to check if an element is in the viewport and apply an animation class.
 */
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // Stop observing once visible
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      const currentRef = ref.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

/**
 * NEW COMPONENT: Renders an individual feature card with scroll-based animation.
 */
const SolutionFeatureCard = ({ feature, idx }) => {
  // Use the scroll animation hook for each card
  const [ref, isVisible] = useScrollAnimation(0.2);

  // Calculate animation delay for a staggered effect (0ms, 100ms, 200ms)
  const delay = 100 * idx;

  return (
    <div
      ref={ref}
      key={idx}
      className={`relative p-8 rounded-3xl shadow-xl 
              transition-all duration-700 ease-out 
              transform hover:shadow-2xl hover:-translate-y-2
              cursor-pointer border border-blue-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: `${delay}ms`,
        backgroundImage: `url(${feature.bg})`,   // <-- NEW: background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

      {/* Content stays relative to overlay */}
      <div className="relative flex flex-col justify-between h-full">
        <div className="flex justify-between items-center mb-6">
          <div className={`inline-block p-4 ${feature.color} rounded-xl`}>
            <feature.icon className="h-10 w-10" />
          </div>
          <div className="text-sm font-extrabold px-3 py-1 rounded-full bg-blue-600 text-white shadow-md">
            {feature.features.length} Key Services
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
        <p className="text-white mb-6 leading-relaxed">{feature.desc}</p>

        <ul className="space-y-3">
          {feature.features.map((item, i) => (
            <li key={i} className="flex items-start text-white">
              <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
              <span className="font-medium text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};



export default function App() {
  const testimonialsData = [
    { text: "ELI makes me feel like I've got someone in the passenger seat who actually cares about my day.", author: "John D.", role: "Owner-Operator" },
    { text: "The service paid for itself in the first month when they caught a compliance issue before it became a fine.", author: "Maria R.", role: "Long-Haul Driver" },
    { text: "I don't feel alone out there anymore — ELI keeps me connected with my family every week.", author: "Devon S.", role: "Fleet Driver" },
    { text: "I used to lose hours every week chasing paperwork and dispatch. With ELI, I can finally just drive and let them handle the rest.", author: "Owner-Operator", role: "Ohio" },
    { text: "What I love most? I don't feel alone anymore. ELI checks in daily, and they even remind me of my son's birthday.", author: "Long-haul Driver", role: "Texas" }
  ];

  const [activeTestimonial, setActiveTestIndex] = useAutoAdvance(testimonialsData.length);
  const [activeNav, setActiveNav] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavClick = (id) => {
    setActiveNav(id);
    scrollToSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'problem', 'solution', 'features', 'testimonials', 'pricing', 'contact'];
      const NAV_HEIGHT = 80;

      let currentActive = 'home';

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const section = document.getElementById(sectionId);

        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= NAV_HEIGHT + 50) {
            currentActive = sectionId;
            break;
          }
        }
      }

      setActiveNav(currentActive);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'Impact' },
    { id: 'solution', label: 'Solution' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const featuresList = [
    {
      icon: Heart,
      color: "bg-red-500/20 text-red-500",
      bg: "/images/solution1.jpg",   // <-- NEW
      title: "Stress & Isolation Relief",
      desc: "Daily check-ins, family communication, and lifestyle support reduce loneliness and improve mental health.",
      features: ["Daily check-ins & mood monitoring", "Family communication assistance", "Lifestyle guidance & support"]
    },
    {
      icon: Shield,
      color: "bg-blue-500/20 text-blue-500",
      bg: "/images/solution2.jpg",   // <-- NEW
      title: "Time & Compliance Savings",
      desc: "Proactive HOS reminders, paperwork prep, and dispatch coordination free up hours and prevent costly violations.",
      features: ["Proactive HOS reminders", "Paperwork preparation", "Dispatch coordination assistance", "Violation prevention alerts"]
    },
    {
      icon: Star,
      color: "bg-amber-500/20 text-amber-500",
      bg: "/images/solution3.jpg",   // <-- NEW
      title: "Lifestyle & Financial Balance",
      desc: "Meal bookings, wellness nudges, loyalty rewards, and expense tracking create healthier routines and better financial control.",
      features: ["Meal & hotel bookings", "Wellness nudges and reminders", "Loyalty rewards optimization", "Expense tracking & reporting"]
    }
  ];


  const pricingPlans = [
    {
      name: "Basic", price: "$19.99/month", popular: false,
      desc: "Essential support.",
      features: ["Daily wellness nudges", "Hydration reminders", "Rest stop suggestions", "Emergency contact setup"]
    },
    {
      name: "Silver", price: "$39.99/month", popular: false,
      desc: "Enhanced features for better road management.",
      features: ["All Basic features", "Bi-weekly wellness calls", "Appointment booking", "Compliance reminders", "Foundational logistics coordination", "Expense tracking"]
    },
    {
      name: "Gold", price: "$59.99/month", popular: true, // This is your 'Most Popular'
      desc: "Full Co-Pilot support.",
      features: ["All Silver features", "Real-time rerouting", "Proactive maintenance scheduling", "Non-emergency breakdown coord.", "Family updates"]
    },
    {
      name: "Platinum", price: "$79.99/month", popular: false, // NEW: Platinum Tier
      desc: "Concierge-level support.",
      features: ["All Gold features", "Priority incident management", "Quarterly IFTA Prep", "Personalized Concierge Support"]
    },
    {
      name: "Diamond", price: "$99.99/month", popular: false,
      desc: "Ultimate concierge.",
      features: ["All Platinum features", "Dedicated EA/PA", "24/7 priority line", "Full compliance management", "Tax prep support", "Personal concierge services"],
      premium: true, // Flag for unique styling
    }
  ];

  const getPlanColors = (planName) => {
    switch (planName) {
      case 'Basic':
      case 'Silver': // Silver is now blue
      case 'Diamond':
        return { headerBg: 'bg-blue-600', headerText: 'text-white', buttonBg: 'bg-blue-600', buttonHover: 'hover:bg-blue-700' };
      case 'Platinum': // Platinum remains Amber/Gold
        return { headerBg: 'bg-amber-500', headerText: 'text-blue-900', buttonBg: 'bg-amber-500', buttonHover: 'hover:bg-amber-600' };
      case 'Gold':
        // Use emerald (green) for the highlighted plan
        return { headerBg: 'bg-emerald-500', headerText: 'text-white', buttonBg: 'bg-emerald-500', buttonHover: 'hover:bg-emerald-600' };
      default:
        return { headerBg: 'bg-blue-600', headerText: 'text-white', buttonBg: 'bg-blue-600', buttonHover: 'hover:bg-blue-700' };
    }
  };


  // Helper function to boldly color plan names in feature text
  const highlightPlanNames = (text) => {
    const names = ['Basic', 'Silver', 'Gold', 'Platinum', 'Diamond'];
    // Create a RegExp to search for any of the names globally (g) and case-insensitively (i)
    const regex = new RegExp(`(${names.join('|')})`, 'gi');

    // Split the text by the matched plan names and wrap the names in <span>
    const parts = text.split(regex).map((part, i) => {
      // Check if the part is one of the plan names
      if (names.includes(part.trim())) {
        // trim() added for safety, as plan names in features might be preceded/followed by spaces
        return <span key={i} className="font-extrabold text-blue-600">{part}</span>;
      }
      return part;
    });

    return parts;
  };

  const footerCtas = [
    { label: "Book a Demo", href: "#" },
    { label: "Start Free Trial", href: "#" },
    { label: "Speak to an AI Expert", href: "#" },
    { label: "Get Instant Access", href: "#" },
    { label: "Watch Sample Call", href: "https://drive.google.com/open?id=1OF2mbkf-nvYC8zZSwbz0iyYuOcFm3RsO" },
    { label: "Pricing", href: "#pricing" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/eliroadlife", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/eliroadlife", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/eliroadlife", label: "LinkedIn" },
    { icon: Rss, href: "https://tiktok.com/@eliroadlife", label: "TikTok" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white antialiased overflow-x-hidden">

      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-white border-b border-blue-300 shadow-lg">
        {/* Left side: Logo + ELI ROADLIFE text */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-3">
            <img
              src="https://assets.cdn.filesafe.space/z85Y59lHSYlMrA8d4Ydy/media/68e3c175ffcf3fd63488d66b.jpeg"
              alt="Eliroad Logo"
              className="h-16 md:h-20 transition duration-300 hover:scale-105 cursor-pointer"
            />
            {/* Red text beside logo */}
            <span className="text-red-700 font-extrabold text-xl md:text-2xl tracking-wide">
              ELI ROADLIFE
            </span>
          </div>
        </div>

        {/* Right side: Start Trial Button */}
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold shadow-md hover:shadow-blue-400/50 transition">
          Start Trial
        </button>
      </div>


      {/* Navbar */}
      <nav className="h-9 fixed top-[87px] md:top-[105px] left-0 right-0 z-40 bg-gradient-to-r from-blue-600 to-blue-500 backdrop-blur-md shadow-lg border-b border-blue-400/50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start items-center h-9">

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-base font-medium transition duration-200 uppercase tracking-wide ${activeNav === item.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* MOBILE HAMBURGER */}
            <div className="flex md:hidden items-center absolute right-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 bg-blue-700 p-4 space-y-4 z-40">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white font-medium py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="h-6"></div>

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900 overflow-hidden font-sans pt-[30px] md:pt-[20px]"
      >
        
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-10"
          style={{
            backgroundImage: "url('/images/truckimage1.jpg')"
          }}
        ></div>

        <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 md:w-80 h-64 md:h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-block bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4 shadow-xl hover:scale-105 transition duration-300">
              Your Road, Your Co-Pilot, Your Peace of Mind.
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tighter text-blue-900">
              {/* ADJUSTED HEADLINE: Better break after "Support" */}
              {["Your On-Call Co-Pilot Support", "for Every Mile"].map((phrase, phraseIndex) => (
                <span key={phraseIndex} className="block">
                  {phrase.split(' ').map((word, index) => (
                    <StaggeredText
                      key={`${phraseIndex}-${index}`}
                      text={word}
                      // Increased delay slightly to 500ms total start time
                      delay={500 + (phraseIndex * 200) + (index * 60)}
                      className="mr-2"
                    />
                  ))}
                </span>
              ))}
            </h1>

            {/* ANIMATED SUB-HEADER */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-4 text-blue-800 max-w-3xl mx-auto font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }} // Appears after headline animation (500ms + 60*words + 100ms buffer)
            >
              Drive Smarter. Stress Less. ELI Handles the Rest.
            </motion.p>

            {/* ANIMATED DESCRIPTION */}
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto font-normal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }} // Appears slightly after sub-header
            >
              ELI RoadLife Assistant is your on-call co-pilot for truck drivers across the U.S. and Canada.
              Unlike dispatchers or load-tracking apps, ELI focuses on the driver, combining genuine care with smart logistics.
              It anticipates needs, reduces stress, and keeps drivers connected while boosting revenue per mile.
              From compliance alerts and paperwork to hotel bookings, meals, and family reminders — ELI handles it all.
              Starting at $19.99/month, it's affordable peace of mind for every mile on the road.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => handleNavClick('pricing')}
                className="bg-yellow-400 text-blue-900 border-2 border-yellow-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-bold hover:bg-yellow-500 transition shadow-2xl shadow-yellow-400/70 w-full sm:w-auto transform hover:scale-105 active:scale-100 duration-300"
              >
                Start Gold Trial <span className="text-xs sm:text-sm font-medium ml-2">($7.99 Setup)</span>
              </button>
              <button
                onClick={() => handleNavClick('testimonials')}
                className="bg-transparent text-blue-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-bold border-2 border-blue-600 hover:bg-blue-100 transition shadow-lg w-full sm:w-auto duration-150"
              >
                See Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <ProblemCarousel />


      {/* Solution Section */}
      <section id="solution" className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">
              {/* The header now uses StaggeredText */}
              <StaggeredText text="ELI's Three Pillars" className="mr-3" />
              <StaggeredText text="of Driver Support" delay={300} />
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our service anticipates needs, reduces stress, and keeps drivers connected and profitable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* The feature cards now use the new animated component */}
            {featuresList.map((feature, idx) => (
              <SolutionFeatureCard key={idx} feature={feature} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight text-center">
            Features Built Around the Driver
          </h2>
          <p className="text-xl text-gray-700 mb-12 text-center">
            Complete support for drivers on the road — personal, logistical, and financial tools, all in one plan.
          </p>

          <div className="flex flex-col md:flex-row items-center mb-12 md:mb-20">
            {/* SINGLE IMAGE */}
            <motion.img
              src="/images/feature1.jpg" // only one image
              alt="feature"
              className="w-full md:w-1/2 rounded-2xl shadow-lg"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />

            {/* FEATURES LIST */}
            <motion.div
              className="mt-6 md:mt-0 md:ml-12 w-full md:w-1/2 text-left"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                "24/7 Support & Availability – Assistance whenever and wherever you need it.",
                "Bi-Weekly Wellness Check-ins – Stay supported and motivated on the road.",
                "Appointment Scheduling – Truck maintenance, medical visits, or personal errands, all coordinated.",
                "Compliance Alerts & Reminders – Never miss HOS, licensing, or regulatory deadlines.",
                "Logistics Coordination – Basic dispatch, route planning, and scheduling made simple.",
                "Expense Tracking & Reporting – Keep your finances organized with automated logging."
              ].map((feature, i) => (
                <div key={i} className="flex items-start mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleNavClick('pricing')}
              className="mt-12 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition shadow-lg transform hover:scale-105 active:scale-95 duration-200"
            >
              See Pricing & Plan Details
            </button>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-4 tracking-tight">
              Proof on the Pavement
            </h2>
            <p className="text-xl text-gray-700">
              Hear directly from the ELI RoadLife community.
            </p>
          </div>

          {/* Infinite Horizontal Scroll */}
          <div className="overflow-hidden relative">
            <motion.div
              className="flex space-x-6 animate-scroll"
              style={{ width: 'max-content' }}
            >
              {[...testimonialsData, ...testimonialsData].map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white backdrop-blur-md p-10 rounded-3xl shadow-2xl border-t-8 border-blue-500 min-w-[360px] max-w-sm flex-shrink-0 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 cursor-pointer overflow-hidden"
                >
                  <Quote className="h-10 w-10 text-blue-500 mb-6 mx-auto" />
                  <p className="text-gray-800 italic mb-4 text-center leading-snug font-light">
                    "{testimonial.text}"
                  </p>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-blue-500 fill-current mx-0.5" />
                    ))}
                  </div>
                  <p className="font-bold text-blue-900 text-center">{testimonial.author}</p>
                  <p className="text-blue-600 font-medium text-center">{testimonial.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tailwind CSS animation keyframes */}
        <style jsx>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      display: flex;
      animation: scroll 20s linear infinite;
    }
  `}</style>
      </section>


      {/* Pricing Section */}
      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Custom Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-2 tracking-tight">
              OUR PLANS
            </h2>
            <h3 className="text-3xl font-semibold text-gray-700 mb-4">
              Pick the Plan That’s Right for You
            </h3>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              What plan are you looking for today? Affordable peace of mind that saves time, money, and energy every single trip.
            </p>
          </div>

          {/* Featured 3-Card Row (Rotated/Centered) */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.slice(0, 3).map((plan, idx) => {
                const isGold = plan.name === 'Gold' || plan.popular;
                const { headerBg, headerText, buttonBg, buttonHover } = getPlanColors(plan.name);

                // Subtle rotation logic for the featured cards
                let rotationClass = '';
                if (plan.name === 'Basic') rotationClass = 'lg:-rotate-1 lg:translate-y-4';
                if (plan.name === 'Gold') rotationClass = 'lg:rotate-1 lg:translate-y-4';

                // Set specific borders for the first row cards
                const planBorder = (plan.name === 'Silver' || plan.name === 'Basic') ? "border-blue-400" : "border-emerald-500";

                // Helper function to boldly color plan names in feature text
                const highlightPlanNames = (text) => {
                  const names = ['Basic', 'Silver', 'Gold', 'Platinum', 'Diamond'];
                  const regex = new RegExp(`(${names.join('|')})`, 'gi');

                  // Split the text by the plan names and wrap the names in <span>
                  const parts = text.split(regex).map((part, i) => {
                    if (names.includes(part)) {
                      return <span key={i} className="font-extrabold text-blue-600">{part}</span>;
                    }
                    return part;
                  });

                  return parts;
                };


                return (
                  <div
                    key={idx}
                    // Card Size: Fixed width on LG for uniform look
                    className={`relative w-80 p-0 pt-8 pb-8 rounded-3xl border transition duration-500 transform 
    ${rotationClass} 
    ${rotationClass ? 'hover:scale-[1.05] hover:translate-y-0 hover:rotate-0' : 'hover:scale-[1.03]'} 
    shadow-xl overflow-hidden 
    ${isGold
                        // Gold is the featured card here
                        ? `${planBorder} shadow-2xl shadow-emerald-400/50 bg-white z-20`
                        : `${planBorder} bg-white z-0`
                      }`}
                  >
                    {/* Colored Header Bar */}
                    <div className={`absolute top-0 left-0 right-0 py-2 text-center text-sm font-extrabold uppercase ${headerBg} ${headerText} shadow-md`}>
                      {plan.name}
                    </div>

                    <div className='p-6'>
                      {/* Plan Description - FONT SIZE INCREASED */}
                      <p className="text-gray-900 mb-4 text-base min-h-[50px] mt-2">{plan.desc}</p>

                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-5xl font-extrabold text-blue-900">{plan.price.split('/')[0]}</span>
                        <span className="text-gray-600 text-lg">/{plan.price.split('/')[1]}</span>
                      </div>

                      {/* Button */}
                      <button
                        className={`w-full py-3 rounded-xl font-bold transition text-lg active:scale-95 duration-200 text-white shadow-lg 
                                            ${buttonBg} ${buttonHover}`}
                      >
                        Start {plan.name}
                      </button>

                      {/* Audience */}
                      <p className="text-gray-700 mt-4 mb-6 text-sm font-medium border-t pt-4 border-gray-100">
                        {plan.name === 'Basic' && "For Regional Drivers, Beginners"}
                        {plan.name === 'Silver' && "For Long-haul Drivers, Owner-Operators"}
                        {plan.name === 'Gold' && "For Experienced Long-haul Drivers"}
                      </p>

                      {/* Features List */}
                      {/* 'Inclusions' BOLDED */}
                      <h4 className='text-sm font-bold text-gray-900 uppercase mb-3'>Inclusions</h4>
                      <ul className="space-y-3 min-h-[190px]">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <CheckCircle className={`h-5 w-5 ${isGold ? 'text-emerald-500' : 'text-blue-500'} mr-2 mt-0.5 flex-shrink-0`} />
                            {/* Feature text lightened and plan names highlighted */}
                            <span className="text-base font-normal">{highlightPlanNames(feature)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Second Row: Platinum and Diamond (Standard Layout, Centered) */}
          <h3 className='text-center text-3xl font-semibold text-blue-900 mb-8 mt-12'>Level up your support:</h3>

          {/* Grid for Platinum and Diamond - Max width set to center them */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            {pricingPlans.slice(3).map((plan, idx) => {
              const isDiamond = plan.name === 'Diamond' || plan.premium;
              const { headerBg, headerText, buttonBg, buttonHover } = getPlanColors(plan.name);

              return (
                <div
                  key={idx + 3}
                  // Card Size Reduced: Added w-full for small screens and max-w-sm for larger screens to shrink them slightly
                  className={`relative p-0 pt-8 pb-8 rounded-3xl border transition duration-500 transform hover:shadow-2xl hover:scale-[1.03] overflow-hidden w-full lg:max-w-sm mx-auto
                                ${isDiamond
                      ? "border-blue-600 shadow-xl bg-blue-50 z-10"
                      : "border-amber-500 shadow-xl bg-white z-0" // Platinum style
                    }`}
                >
                  {/* Colored Header Bar */}
                  <div className={`absolute top-0 left-0 right-0 py-2 text-center text-sm font-extrabold uppercase ${headerBg} ${headerText} shadow-md`}>
                    {plan.name}
                  </div>

                  <div className='p-6'>
                    {/* Plan Description - FONT SIZE INCREASED */}
                    <p className="text-gray-900 mb-4 text-base min-h-[50px] mt-2">{plan.desc}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-5xl font-extrabold text-blue-900">{plan.price.split('/')[0]}</span>
                      <span className="text-gray-600 text-lg">/{plan.price.split('/')[1]}</span>
                    </div>

                    {/* Button */}
                    <button
                      className={`w-full py-3 rounded-xl font-bold transition text-lg active:scale-95 duration-200 text-white shadow-lg 
                                        ${buttonBg} ${buttonHover}`}
                    >
                      Start {plan.name}
                    </button>

                    {/* Audience */}
                    <p className="text-gray-700 mt-4 mb-6 text-sm font-medium border-t pt-4 border-gray-100">
                      {plan.name === 'Platinum' && "For Fleet Drivers, High Volume Operators"}
                      {plan.name === 'Diamond' && "For Elite Operators, Business-minded Drivers"}
                    </p>

                    {/* Features List */}
                    {/* 'Inclusions' BOLDED */}
                    <h4 className='text-sm font-bold text-gray-900 uppercase mb-3'>Inclusions</h4>
                    <ul className="space-y-3 min-h-[190px]">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <CheckCircle className={`${isDiamond ? 'text-blue-600' : 'text-amber-500'} h-5 w-5 mr-2 mt-0.5 flex-shrink-0`} />
                          {/* Feature text lightened and plan names highlighted */}
                          <span className="text-base font-normal">{highlightPlanNames(feature)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trial Box */}
          <div className="text-center bg-blue-100 backdrop-blur-sm p-10 rounded-2xl max-w-4xl mx-auto border-l-8 border-blue-600 shadow-lg transition duration-300 cursor-pointer text-blue-900 hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-3 tracking-tight">15-Day Gold Welcome Trial</h3>
            <p className="text-lg text-gray-700 mb-4">
              Get full Gold features for <span className="font-extrabold">15 days</span> for just a{" "}
              <span className="text-blue-600 font-extrabold">$7.99 setup fee</span>.
            </p>
            <p className="text-sm text-gray-600">
              Cancel anytime with 7 days' notice. 48-hour refund option for new signups.
            </p>
          </div>
        </div>
      </section>

      {/* END REPLACEMENT HERE */}



      {/* Final CTA Section */}
      <section
        id="contact"
        className="relative py-24 text-white border-t border-blue-400 overflow-hidden flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/images/truck1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Subtle Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* ORIGINAL HEADLINE */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-snug tracking-tighter text-white">
            Never Drive Alone. ELI's Got Your Back.
          </h2>

          {/* ORIGINAL SUB-TEXT */}
          <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
            From Routes to Rest Stops, We've Got You Covered. Join the Concierge on Wheels.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* ORIGINAL BUTTON 1 (Restored to White/Blue) */}
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl text-xl font-bold hover:bg-blue-50 transition shadow-2xl transform hover:scale-105 active:scale-100 duration-300">
              Start Your Gold Trial Now
            </button>

            {/* ORIGINAL BUTTON 2 */}
            <button className="bg-blue-700 text-white px-10 py-4 rounded-xl text-xl font-bold border-2 border-white hover:bg-blue-800 transition shadow-lg transform hover:scale-105 active:scale-95 duration-150">
              Speak to an AI Expert
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-blue-900 text-blue-100 py-16 border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">

            {/* Column 1: Logo & Mission */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <img
                  src="https://assets.cdn.filesafe.space/z85Y59lHSYlMrA8d4Ydy/media/68e3c175ffcf3fd63488d66b.jpeg"
                  alt="ELI RoadLife Logo"
                  className="h-10 transition duration-300"
                />
              </div>
              <p className="text-blue-300 text-sm mb-4">
                ELI RoadLife Assistant is designed to feel like a concierge on wheels — blending trucking expertise with hospitality-driven service.
              </p>
              <p className="text-xs font-semibold text-blue-400">— Q. Ellick (Founder)</p>
            </div>

            {/* Column 2: Quick Links & CTAs */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-blue-700 pb-2">Get Started</h4>
              <ul className="space-y-3">
                {footerCtas.map((cta, index) => (
                  <li key={index}>
                    <a href={cta.href} className="hover:text-white transition text-sm">{cta.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-blue-700 pb-2">Connect</h4>
              <div className="space-y-3">
                <p className="text-blue-300 text-sm">
                  Email: <a href="mailto:support@eliroadlife.com" className='hover:text-white'>support@eliroadlife.com</a>
                </p>
                <p className="text-blue-300 text-sm">
                  Phone: <span className="text-white font-bold">1-800-980-4162</span>
                </p>
                <p className="text-blue-300 text-sm">
                  Office: 2600 Douglas Rd Suite 800, Coral Gables, FL 33134
                </p>
                <p className="text-blue-300 text-sm">
                  <a href="https://drive.google.com/open?id=1Hk7dr2MAq64CGYxuBB9u3GeLD7MnoqMI" className='hover:text-white'>View Press Kit</a> | <a href="https://drive.google.com/open?id=1CRM6URR7kfAEBWIFwmxUbom5zHSV5NtW" className='hover:text-white'>View Investor Deck</a>
                </p>
              </div>
            </div>

            {/* Column 4: Company */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-blue-700 pb-2">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-white transition text-sm">Careers</a></li>
                <li><a href="#" className="hover:text-white transition text-sm">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition text-sm">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Column 5: Social Media */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-blue-700 pb-2">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-blue-300 hover:text-white transition transform hover:scale-125"
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-blue-700 pt-8 text-center">
            <p className="text-blue-400 text-sm">© 2025 ELI RoadLife Assistant. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}