import React, { useState, useEffect, useCallback } from 'react';
import { Truck, Phone, Heart, Clock, Shield, Star, CheckCircle, Users, Headphones, Quote, TrendingUp, Facebook, Instagram, Linkedin, Rss, CloudCog } from 'lucide-react';

// --- START: Simulated Creative Components ---
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

// --- END: Simulated Creative Components ---


export default function ELI() {
  const testimonialsData = [
    { text: "ELI makes me feel like I’ve got someone in the passenger seat who actually cares about my day.", author: "John D.", role: "Owner-Operator" },
    { text: "The service paid for itself in the first month when they caught a compliance issue before it became a fine.", author: "Maria R.", role: "Long-Haul Driver" },
    { text: "I don’t feel alone out there anymore — ELI keeps me connected with my family every week.", author: "Devon S.", role: "Fleet Driver" },
    { text: "I used to lose hours every week chasing paperwork and dispatch. With ELI, I can finally just drive and let them handle the rest. It’s like having a concierge who knows trucking.", author: "Owner-Operator", role: "Ohio" },
    { text: "What I love most? I don’t feel alone anymore. ELI checks in daily, and they even remind me of my son’s birthday when I’m out on the road.", author: "Long-haul Driver", role: "Texas" }
  ];

  const [activeTestimonial, setActiveTestIndex] = useAutoAdvance(testimonialsData.length);
  const [activeNav, setActiveNav] = useState('home');
  //Mobile navbar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleNavClick = (id) => {
    setActiveNav(id);
    scrollToSection(id);
  };

  // Revised useEffect to fix ScrollSpy for Features/Pricing
useEffect(() => {
  const handleScroll = () => {
    const sections = ['home', 'problem', 'solution', 'features', 'testimonials', 'pricing'];
    const NAV_HEIGHT = 80; // The navbar is 80px high

    // Find the currently active section
    let currentActive = 'home';
    
    // Iterate from bottom to top for more accurate detection
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Use getBoundingClientRect() for accurate position relative to viewport
        const rect = section.getBoundingClientRect();
        
        // A section is considered active if its top edge is above the top of the viewport 
        // minus the navbar's height (or slightly below the navbar)
        if (rect.top <= NAV_HEIGHT + 50) { // Added 50px buffer for stability
          currentActive = sectionId;
          break; 
        }
      }
    }
    
    // Only update state if it has changed to prevent unnecessary re-renders
    setActiveNav(currentActive);
  };

  // Run on mount and scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [setActiveNav]);

  // NAV ITEM ORDER 
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'Impact' },
    { id: 'solution', label: 'Solution' },
    { id: 'features', label: 'Features' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const featuresList = [
    {
      icon: Heart,
      color: "bg-red-600/20 text-red-400",
      border: "border-red-600",
      title: "Stress & Isolation Relief",
      desc: "Daily check-ins, family communication, and lifestyle support reduce loneliness and improve mental health.",
      features: ["Daily check-ins & mood monitoring", "Family communication assistance", "Lifestyle guidance & support"]
    },
    {
      icon: Shield,
      color: "bg-blue-600/20 text-blue-400",
      border: "border-blue-600",
      title: "Time & Compliance Savings",
      desc: "Proactive HOS reminders, paperwork prep, and dispatch coordination free up hours and prevent costly violations.",
      features: ["Proactive HOS reminders", "Paperwork preparation", "Dispatch coordination assistance", "Violation prevention alerts"]
    },
    {
      icon: Star,
      color: "bg-yellow-600/20 text-yellow-400",
      border: "border-yellow-600",
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
      features: ["All Basic features", "Bi-weekly wellness calls", "Appointment booking", "Compliance reminders", "Basic logistics coordination", "Expense tracking"]
    },
    {
      name: "Gold", price: "$59.99/month", popular: true,
      desc: "Full Co-Pilot support.",
      features: ["All Silver features", "Real-time rerouting", "Proactive maintenance scheduling", "Non-emergency breakdown coord.", "Family updates"]
    },
    {
      name: "Diamond", price: "$99.99/month", popular: false,
      desc: "Ultimate concierge.",
      features: ["All Gold features", "Dedicated EA/PA", "24/7 priority line", "Full compliance management", "Tax prep support", "Personal concierge services"]
    }
  ];

  const footerCtas = [
    { label: "Book a Demo", href: "#" },
    { label: "Start Free Trial", href: "#" },
    { label: "Speak to an AI Expert", href: "#" },
    { label: "Get Instant Access", href: "#" },
    { label: "Watch Sample Call", href: "https://drive.google.com/open?id=1OF2mbkf-nvYC8zZSwbz0iyYuOcFm3RsO" },
    { label: "Request Pricing", href: "https://eliroadlife.com/#plans" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/eliroadlife", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/eliroadlife", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/eliroadlife", label: "LinkedIn" },
    { icon: Rss, href: "https://tiktok.com/@eliroadlife", label: "TikTok" },
  ];



  return (
    <div className="min-h-screen bg-gray-900 antialiased overflow-x-hidden">

      {/* Navbar (FIXED for constant visibility) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/90 backdrop-blur-md shadow-xl transition-shadow duration-300 border-b border-blue-600/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* LOGO INTEGRATION */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <img
                src="https://assets.cdn.filesafe.space/z85Y59lHSYlMrA8d4Ydy/media/68e3c175ffcf3fd63488d66b.jpeg" // *** REPLACE WITH ACTUAL PUBLIC URL ***
                alt="ELI RoadLife Logo"
                className="h-10 transition duration-300 hover:scale-105 filter invert"
              />
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-lg font-medium transition duration-200 uppercase tracking-wide ${activeNav === item.id
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-300 hover:text-blue-400'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <button className="bg-blue-600 text-white px-7 py-3 rounded-full hover:bg-blue-500 transition font-bold shadow-xl shadow-blue-900/50 active:scale-95 duration-150 transform hover:translate-y-[-2px]">
                Start Trial
              </button>
            </div>

            {/* MOBILE HAMBURGER */}
            <div className="flex md:hidden items-center">
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

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-gray-800 p-4 space-y-4 z-40">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  handleNavClick(item.id);
                  setIsMobileMenuOpen(false); // close menu on click
                }}
                className="block w-full text-left text-white font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2">
              Start Trial
            </button>
          </div>
        )}
      </nav>


      {/* SPACER DIV: Reduced height to create less space */}
      <div className="h-2"></div>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* TAG: Using Accent color (#FFC107) */}
            <div className="inline-block bg-yellow-400 text-gray-900 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-4 shadow-xl transform hover:scale-[1.05] transition duration-300">
              Your Road, Your Co-Pilot, Your Peace of Mind.
            </div>

            {/* H1: "Your On-Call Co-Pilot Support for Every Mile." */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter text-shadow-xl text-blue-300">
              Your On-Call Co-Pilot Support for Every Mile
            </h1>

            {/* P1 (Slogan): "Drive Safe, Stress Less — ELI Handles the Rest." (Using Secondary color #20C997 for emphasis) */}
            <p className="text-xl md:text-2xl mb-4 text-teal-400 max-w-3xl mx-auto font-medium transition-opacity duration-500 delay-300">
              Drive Safe, Stress Less — ELI Handles the Rest.
            </p>

            {/* P2 (Detail): Detailed mission statement. */}
            <p className="text-lg md:text-xl mb-10 text-gray-400 max-w-3xl mx-auto font-normal transition-opacity duration-500 delay-500">
              ELI RoadLife Assistant is your on-call co-pilot for truck drivers across the U.S. and Canada.
              Unlike dispatchers or load-tracking apps, ELI focuses on the driver, combining genuine care with smart logistics.
              It anticipates needs, reduces stress, and keeps drivers connected while boosting revenue per mile.
              From compliance alerts and paperwork to hotel bookings, meals, and family reminders — ELI handles it all.
              Starting at $19.99/month, it’s affordable peace of mind for every mile on the road.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => handleNavClick('pricing')}
                // CTA Button uses Accent color (#FFC107)
                className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-xl text-xl font-bold hover:bg-yellow-500 transition shadow-2xl shadow-yellow-500/50 ring-4 ring-yellow-400/50 w-full sm:w-auto transform hover:rotate-1 active:rotate-0 duration-300"
              >
                Start Gold Trial <span className="text-sm font-medium ml-2">($7.99 Setup)</span>
              </button>
              <button
                // Secondary CTA Button uses Secondary color (#20C997)
                className="bg-transparent text-teal-400 px-10 py-4 rounded-xl text-xl font-bold border border-teal-400 hover:bg-teal-400/20 transition shadow-lg w-full sm:w-auto transform hover:-translate-y-1 active:scale-98 duration-150"
              >
                Request Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section (Asymmetrical Layout & Contrast) */}
      <section id="problem" className="py-24 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">

          <div className="lg:col-span-1">
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight border-l-4 border-red-600 pl-4"> {/* Using Alert color #DC3545 */}
              Facing the Road's Toughest Burdens
            </h2>
            <p className="text-xl text-gray-400 max-w-sm">
              Our ideal customers face long hours, heavy compliance, loneliness, and balancing family life.
            </p>
            <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-teal-400/50"> {/* Using Secondary color #20C997 */}
              <TrendingUp className="h-10 w-10 text-teal-400 mb-2 transform hover:rotate-3 transition duration-300" />
              <p className="text-teal-400 font-semibold">Goal: Reduce daily burdens and increase driver revenue per mile.</p>
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            {[
              { icon: Heart, title: "Stress & Isolation", desc: "Loneliness, relationship strain, and mental health challenges from days away." },
              { icon: Shield, title: "Heavy Compliance", desc: "Constant HOS monitoring, risk of violations, fines, and tedious paperwork." },
              { icon: Clock, title: "Work-Life Imbalance", desc: "Inability to focus on home responsibilities and personal life demands." },
              { icon: Phone, title: "Lack of Support", desc: "Feeling alone without a dedicated support system or concierge on the road." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-gray-700 border-t-4 border-red-600 hover:shadow-2xl shadow-red-900/50 transition duration-300 transform hover:scale-[1.02] group cursor-pointer"
              >
                <div className="inline-block p-4 bg-red-600/20 rounded-lg mb-4 ring-2 ring-red-600/50 transition duration-300">
                  <item.icon className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section (Formerly Features Section) */}
      <section id="solution" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
              ELI's Three Pillars of Driver Support
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our service anticipates needs, reduces stress, and keeps drivers connected and profitable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {featuresList.map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-gray-700/60 backdrop-blur-lg shadow-xl hover:shadow-2xl transition duration-500 transform hover:rotate-1 border border-b-8 ${feature.border} cursor-pointer`}
              >
                <div className={`inline-block p-4 ${feature.color} rounded-xl mb-6 ring-4 ring-white/10`}>
                  <feature.icon className="h-10 w-10 transform group-hover:scale-110 transition duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.desc}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" style={{ animationDelay: `${i * 0.2}s` }} />
                      <span className="font-medium text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Headline */}
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Features Built Around the Driver
          </h2>
          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12">
            Complete support for drivers on the road — personal, logistical, and financial tools, all in one plan.
          </p>

          {/* Feature List */}
          <div className="bg-gray-700/60 p-8 rounded-2xl shadow-2xl border-t-4 border-blue-600">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 text-left">
              {[
                "24/7 Support & Availability – Assistance whenever and wherever you need it.",
                "Bi-Weekly Wellness Check-ins – Stay supported and motivated on the road.",
                "Appointment Scheduling – Truck maintenance, medical visits, or personal errands, all coordinated.",
                "Compliance Alerts & Reminders – Never miss HOS, licensing, or regulatory deadlines.",
                "Logistics Coordination – Basic dispatch, route planning, and scheduling made simple.",
                "Expense Tracking & Reporting – Keep your finances organized with automated logging."
              ].map((feature, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => handleNavClick('pricing')}
            className="mt-12 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-500 transition shadow-lg transform hover:scale-[1.03] active:scale-98 duration-200"
          >
            See Pricing & Plan Details
          </button>
        </div>
      </section>

      {/* --- END FEATURE SECTION --- */}


      {/* Testimonials Section (Updated Content) */}
      <section id="testimonials" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Proof on the Pavement</h2>
            <p className="text-xl text-gray-400">Hear directly from the ELI RoadLife community.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-700/80 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-2xl border-t-8 border-yellow-400 relative overflow-hidden">
              <Quote className="h-10 w-10 text-yellow-400 mb-6 mx-auto" />
              <div className="min-h-[150px] flex flex-col justify-center animate-fade-in">
                <p className="text-2xl md:text-3xl text-gray-200 italic mb-8 text-center leading-snug transition-opacity duration-700 font-light">
                  "{testimonialsData[activeTestimonial].text}"
                </p>
              </div>
              <div className="text-center border-t border-gray-600 pt-6">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current mx-0.5" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <p className="font-bold text-white text-lg transition-opacity duration-700">{testimonialsData[activeTestimonial].author}</p>
                <p className="text-teal-400 font-medium transition-opacity duration-700">{testimonialsData[activeTestimonial].role}</p>
              </div>
            </div>
            <div className="flex justify-center mt-8 space-x-3">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestIndex(idx)}
                  className={`h-3 rounded-full transition-all duration-300 active:scale-95 ${activeTestimonial === idx ? 'bg-teal-400 w-8 shadow-md shadow-teal-500/50' : 'bg-gray-600 w-3 hover:bg-teal-600'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Updated Content & Colors) */}
      <section id="pricing" className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Investment in Your Future</h2>
            <p className="text-xl text-gray-400">Affordable peace of mind that saves time, money, and energy every single trip.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-center">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={`relative p-8 rounded-2xl border transition duration-300 transform ${plan.popular
                ? 'border-yellow-400 shadow-2xl shadow-yellow-800/50 bg-gray-700 animate-ring-pulse scale-[1.05] rotate-1'
                : 'border-gray-700 hover:shadow-xl bg-gray-800 hover:translate-y-[-4px]'
                }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-5 py-1 rounded-full text-sm font-extrabold shadow-lg uppercase">
                    ELI RECOMMENDED
                  </div>
                )}
                <h3 className="text-3xl font-extrabold text-white mb-1 tracking-tight">{plan.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">{plan.price.split('/')[0]}</span>
                  <span className="text-gray-400 text-lg">/{plan.price.split('/')[1]}</span>
                </div>

                <ul className="space-y-3 mb-8 min-h-[190px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <CheckCircle className="h-5 w-5 text-teal-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition text-lg active:scale-95 duration-150 transform hover:translate-y-[-2px] ${plan.popular
                  ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-xl shadow-yellow-600/50'
                  : 'bg-blue-600 text-white hover:bg-blue-500' // Primary Color #007BFF
                  }`}>
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
          <div className="text-center bg-gray-700/60 backdrop-blur-sm p-10 rounded-2xl max-w-4xl mx-auto border-l-8 border-yellow-400 hover:shadow-lg transition duration-300 cursor-pointer text-white">
            <h3 className="text-2xl font-bold mb-3 tracking-tight">15-Day Gold Welcome Trial</h3>
            <p className="text-lg text-gray-300 mb-4">
              Get full Gold features for **15 days** for just a <span className="text-yellow-400 font-extrabold">$7.99 setup fee</span>.
            </p>
            <p className="text-sm text-gray-600">Cancel anytime with 7 days' notice. 48-hour refund option for new signups.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section (Bold, High Contrast) */}
      <section className="py-24 bg-gradient-to-tr from-blue-700 to-teal-600 text-white border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-snug tracking-tighter">
            Never Drive Alone. ELI's Got Your Back.
          </h2>
          <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto">
            From Routes to Rest Stops, We’ve Got You Covered. Join the Concierge on Wheels.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-xl text-xl font-bold hover:bg-yellow-500 transition shadow-2xl shadow-yellow-500/50 ring-4 ring-yellow-400/50 transform hover:scale-[1.05] active:scale-100 duration-300">
              Start Your Gold Trial Now
            </button>
            <button className="bg-gray-900 text-white px-10 py-4 rounded-xl text-xl font-bold border-2 border-teal-400 hover:bg-gray-700 transition shadow-lg transform hover:-translate-y-[-2px] active:scale-98 duration-150">
              Speak to an AI Expert
            </button>
          </div>
        </div>
      </section>

      {/* Footer (Dark and Clean with new data) */}
      <footer id="footer" className="bg-gray-950 text-gray-300 py-16 border-t border-blue-600/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">

            {/* Column 1: Logo & Mission */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="mb-4">
                {/* LOGO INTEGRATION */}
                <img
                  src="https://assets.cdn.filesafe.space/z85Y59lHSYlMrA8d4Ydy/media/68e3c175ffcf3fd63488d66b.jpeg" // *** REPLACE WITH ACTUAL PUBLIC URL ***
                  alt="ELI RoadLife Logo"
                  className="h-10 filter invert transition duration-300"
                />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                ELI RoadLife Assistant is designed to feel like a concierge on wheels — blending trucking expertise with hospitality-driven service.
              </p>
              <p className="text-xs font-semibold text-gray-600">— Q. Ellick (Founder)</p>
            </div>

            {/* Column 2: Quick Links & CTAs */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">Get Started</h4>
              <ul className="space-y-3">
                {footerCtas.map((cta, index) => (
                  <li key={index}>
                    <a href={cta.href} className="hover:text-teal-400 transition text-sm">{cta.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info & Location */}
            <div className="md:col-span-2 lg:col-span-1">
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">Connect</h4>
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Email: <a href="mailto:support@eliroadlife.com" className='hover:text-teal-400'>support@eliroadlife.com</a>
                </p>
                <p className="text-gray-400 text-sm">
                  Phone: <span className="text-white font-bold">1-800-980-4162</span>
                </p>
                <p className="text-gray-400 text-sm">
                  Office: 2600 Douglas Rd Suite 800, Coral Gables, FL 33134
                </p>
                <p className="text-gray-400 text-sm">
                  <a href="https://drive.google.com/open?id=1Hk7dr2MAq64CGYxuBB9u3GeLD7MnoqMI" className='hover:text-teal-400'>View Press Kit</a> | <a href="https://drive.google.com/open?id=1CRM6URR7kfAEBWIFwmxUbom5zHSV5NtW" className='hover:text-teal-400'>View Investor Deck</a>
                </p>
              </div>
            </div>

            {/* Column 4: Policies and Company */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-teal-400 transition text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition text-sm">Careers</a></li>
                <li><a href="#" className="hover:text-teal-400 transition text-sm">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition text-sm">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Column 5: Social Media */}
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider border-b border-gray-700 pb-2">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-gray-400 hover:text-teal-400 transition transform hover:scale-125"
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-600 text-sm">© 2025 ELI RoadLife Assistant. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}