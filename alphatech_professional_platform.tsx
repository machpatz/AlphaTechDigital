import React, { useState, useMemo } from 'react';
import { 
  Code, Palette, GraduationCap, Wrench, ChevronRight, CheckCircle2, 
  Send, Calendar, Clock, Filter, Search, Layers, ShieldCheck, 
  Sparkles, User, Mail, Phone, MessageSquare, Menu, X, Plus, 
  Trash2, Edit3, Eye, ArrowRight, ExternalLink, Award, BookOpen, 
  Star, Database, Terminal, Cpu, Monitor, Download, Check, LayoutGrid, AlertCircle
} from 'lucide-react';

// ==========================================
// MOCK INITIAL DATA & STATE MANAGEMENT
// ==========================================

const INITIAL_SERVICES = [
  {
    id: 'web-dev',
    title: 'Web & App Development',
    icon: Code,
    shortDesc: 'Custom responsive websites, web portals, and tailored web applications built with modern frameworks and robust backends.',
    pricing: 'Starting at $299',
    features: ['Custom Frontend & Backend Architecture', 'Database Design (MySQL/PostgreSQL)', 'SEO, Speed & Security Optimization', 'Fully Responsive & Mobile First'],
    category: 'Development'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Branding',
    icon: Palette,
    shortDesc: 'Stunning visual identities, promotional posters, modern vector logos, and complete social media branding suites.',
    pricing: 'Starting at $99',
    features: ['Brand Identity & Guidelines', 'Vector Logo Creation', 'Marketing Posters & Flyers', 'Print-Ready & High-Res Assets'],
    category: 'Design'
  },
  {
    id: 'tutoring',
    title: 'Tech & Coding Tutoring',
    icon: GraduationCap,
    shortDesc: 'One-on-one personalized mentorship in Web Dev (HTML/CSS/JS/PHP), Python, C++, SQL, and Computer Science fundamentals.',
    pricing: 'Starting at $25/hr',
    features: ['Structured 1-on-1 Lessons', 'Hands-on Real-world Projects', 'Beginner to Advanced Tracks', 'Flexible Weekly Scheduling'],
    category: 'Education'
  },
  {
    id: 'it-support',
    title: 'IT Support & Systems',
    icon: Wrench,
    shortDesc: 'Complete IT diagnostics, software troubleshooting, hardware upgrades, and database maintenance/backups.',
    pricing: 'Starting at $49/hr',
    features: ['System Diagnostics & Cleanups', 'Software Installation & Environment Setup', 'Database Backup & Disaster Recovery', 'Network Security & Audit Check'],
    category: 'Support'
  }
];

const INITIAL_PORTFOLIO = [
  {
    id: 'p1',
    title: 'Meditrack HMS',
    category: 'websites',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive Hospital Management System for patient records, appointment scheduling, billing, and pharmacy inventory.',
    tech: ['React', 'PHP', 'MySQL', 'Tailwind CSS'],
    demoUrl: '#',
    featured: true
  },
  {
    id: 'p2',
    title: 'Smart Attendance System',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Biometric and QR-code desktop attendance tracking system for educational institutions with automated reporting.',
    tech: ['Python', 'OpenCV', 'SQLite', 'PyQt'],
    demoUrl: '#',
    featured: true
  },
  {
    id: 'p3',
    title: 'Cyberpulse Brand Identity',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    description: 'Complete visual identity design package including scalable vector logos, business cards, and social media templates.',
    tech: ['Adobe Illustrator', 'Photoshop', 'Brand Strategy'],
    demoUrl: '#',
    featured: false
  },
  {
    id: 'p4',
    title: 'EcoVibe Tech Conference Poster',
    category: 'posters',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    description: 'High-impact digital and printable poster series designed for an international sustainability tech symposium.',
    tech: ['Photoshop', 'Typography', 'Color Theory'],
    demoUrl: '#',
    featured: false
  },
  {
    id: 'p5',
    title: 'OmniCalc Pro Engine',
    category: 'software',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    description: 'Advanced financial and scientific multi-tool desktop application built for high-performance data processing.',
    tech: ['C++', 'Qt Framework', 'Custom Math Engine'],
    demoUrl: '#',
    featured: false
  },
  {
    id: 'p6',
    title: 'Apex E-Commerce Hub',
    category: 'websites',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf40955?auto=format&fit=crop&w=600&q=80',
    description: 'Full-featured online marketplace platform with automated payment gateways and real-time inventory sync.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS3'],
    demoUrl: '#',
    featured: true
  },
  {
    id: 'p7',
    title: 'Aura Vector Logo Mark',
    category: 'logos',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
    description: 'Minimalist geometric logo mark designed for a next-gen cloud AI startup.',
    tech: ['Illustrator', 'Vector Design'],
    demoUrl: '#',
    featured: false
  }
];

const INITIAL_COURSES = [
  {
    id: 'c1',
    title: 'Full-Stack Web Development',
    level: 'Beginner to Advanced',
    duration: '8 Weeks',
    topics: ['HTML5, CSS3, Flexbox & Grid', 'JavaScript Fundamentals & DOM', 'PHP Backends & MySQL Databases', 'Deployment & Server Hosting'],
    icon: Code,
    price: '$199 full course'
  },
  {
    id: 'c2',
    title: 'Python Programming Masterclass',
    level: 'All Levels',
    duration: '6 Weeks',
    topics: ['Python Logic & Data Structures', 'Object-Oriented Programming (OOP)', 'Automation Scripts & Web Scraping', 'Intro to Data Analysis'],
    icon: Terminal,
    price: '$150 full course'
  },
  {
    id: 'c3',
    title: 'C++ Systems & Logic Engineering',
    level: 'Intermediate',
    duration: '6 Weeks',
    topics: ['Memory Management & Pointers', 'Data Structures & Algorithms', 'GUI Development with Qt', 'Code Optimization'],
    icon: Cpu,
    price: '$175 full course'
  },
  {
    id: 'c4',
    title: 'Graphic Design & Brand Creation',
    level: 'Beginner',
    duration: '4 Weeks',
    topics: ['Design Theory & Color Psychology', 'Typography & Layout Rules', 'Vector Creation in Illustrator', 'Designing Posters & Logos'],
    icon: Palette,
    price: '$120 full course'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Application Shared State
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [courses] = useState(INITIAL_COURSES);
  
  // Interactive Modal / Form States
  const [bookingModal, setBookingModal] = useState({ isOpen: false, course: null });
  const [bookings, setBookings] = useState([
    { id: 'b1', name: 'Alex Johnson', email: 'alex@example.com', course: 'Full-Stack Web Development', date: '2026-11-05', status: 'Confirmed' },
    { id: 'b2', name: 'Sarah Miller', email: 'sarah@example.com', course: 'Python Programming Masterclass', date: '2026-11-12', status: 'Pending' }
  ]);
  
  const [serviceRequests, setServiceRequests] = useState([
    { id: 'r1', name: 'David Smith', email: 'david@bakery.com', service: 'Web & App Development', budget: '$500 - $1000', details: 'Need an e-commerce website for a local bakery store with online ordering.', date: '2026-10-24', status: 'In Review' }
  ]);
  
  const [contacts, setContacts] = useState([
    { id: 'm1', name: 'Elena Rostova', email: 'elena@techcorp.com', subject: 'Inquiry on IT Consulting', message: 'Hello, we are interested in a bulk IT support contract for our team.', date: '2026-10-26' }
  ]);

  // Toast System
  const [notification, setNotification] = useState(null);
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Banner */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 px-5 py-3 rounded-xl shadow-2xl font-bold flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                Alpha<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Tech</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 block -mt-1 font-mono">Solutions & Education</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Me' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'learn', label: 'Learn' },
              { id: 'request', label: 'Request Service' },
              { id: 'contact', label: 'Contact' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'text-cyan-400 bg-slate-800/80 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Admin CTA & Mobile Drawer Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateTo('admin')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 border-transparent shadow-md shadow-indigo-500/20'
                  : 'border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Panel</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Responsive Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Me' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'learn', label: 'Learn with AlphaTech' },
              { id: 'request', label: 'Request a Service' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'admin', label: 'Admin Dashboard' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateTo(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeTab === tab.id ? 'bg-indigo-500/10 text-cyan-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN ROUTED SECTIONS */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeSection navigateTo={navigateTo} services={services} portfolio={portfolio} />}
        {activeTab === 'about' && <AboutSection navigateTo={navigateTo} />}
        {activeTab === 'services' && <ServicesSection services={services} navigateTo={navigateTo} />}
        {activeTab === 'portfolio' && <PortfolioSection portfolio={portfolio} />}
        {activeTab === 'learn' && (
          <LearnSection 
            courses={courses} 
            onBookModalOpen={(course) => setBookingModal({ isOpen: true, course })} 
          />
        )}
        {activeTab === 'request' && (
          <RequestServiceSection 
            services={services} 
            onSubmitRequest={(req) => {
              setServiceRequests([req, ...serviceRequests]);
              showNotification('Service request submitted successfully!');
              navigateTo('home');
            }} 
          />
        )}
        {activeTab === 'contact' && (
          <ContactSection 
            onSubmitContact={(msg) => {
              setContacts([msg, ...contacts]);
              showNotification('Your message has been sent!');
            }} 
          />
        )}
        {activeTab === 'admin' && (
          <AdminDashboardSection 
            services={services}
            setServices={setServices}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            bookings={bookings}
            setBookings={setBookings}
            serviceRequests={serviceRequests}
            setServiceRequests={setServiceRequests}
            contacts={contacts}
            showNotification={showNotification}
          />
        )}
      </main>

      {/* LESSON SCHEDULING MODAL */}
      {bookingModal.isOpen && (
        <BookingModal 
          course={bookingModal.course}
          onClose={() => setBookingModal({ isOpen: false, course: null })}
          onConfirm={(newBooking) => {
            setBookings([newBooking, ...bookings]);
            setBookingModal({ isOpen: false, course: null });
            showNotification(`Successfully booked standard session for ${newBooking.course}!`);
          }}
        />
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-slate-950">
                <Terminal className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-black text-white">Alpha<span className="text-cyan-400">Tech</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering clients and students through full-stack software development, striking branding, and practical tech tutoring.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition-colors">About Story</button></li>
              <li><button onClick={() => navigateTo('services')} className="hover:text-cyan-400 transition-colors">Our Services</button></li>
              <li><button onClick={() => navigateTo('portfolio')} className="hover:text-cyan-400 transition-colors">Portfolio Gallery</button></li>
              <li><button onClick={() => navigateTo('learn')} className="hover:text-cyan-400 transition-colors">Learn & Courses</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigateTo('services')}>Web & Systems Dev</li>
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigateTo('services')}>Graphic & Poster Design</li>
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigateTo('services')}>1-on-1 Coding Tutoring</li>
              <li className="hover:text-cyan-400 cursor-pointer" onClick={() => navigateTo('services')}>Hardware & IT Support</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Direct Contact</h4>
            <p className="text-sm text-slate-400 mb-2">Have a project or lesson query?</p>
            <button 
              onClick={() => navigateTo('contact')} 
              className="mt-2 w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-sm font-semibold border border-slate-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Directly</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AlphaTech. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with modern React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 2. HOME SECTION
// ==========================================
function HomeSection({ navigateTo, services, portfolio }) {
  const featuredProjects = portfolio.filter(p => p.featured).slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Banner */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INNOVATIVE SOFTWARE & DIGITAL ACADEMY</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500">Digital Solutions</span> & Mentoring Developers.
              </h1>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Welcome to <strong className="text-slate-200">AlphaTech</strong>. I engineer web platforms, build visual brand identities, and empower aspiring programmers through hands-on technical tutoring.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigateTo('request')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <span>Request a Service</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateTo('learn')}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Learn with AlphaTech</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg">
                <div>
                  <p className="text-2xl font-black text-white">50+</p>
                  <p className="text-xs text-slate-400">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">100+</p>
                  <p className="text-xs text-slate-400">Students Mentored</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">99%</p>
                  <p className="text-xs text-slate-400">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Code / Visual Terminal Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 block" />
                    <span className="w-3 h-3 rounded-full bg-green-500 block" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">alphatech_core.py</span>
                </div>
                <div className="font-mono text-xs text-slate-300 space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
                  <p className="text-slate-500"># Initializing AlphaTech Engine</p>
                  <p><span className="text-purple-400">class</span> <span className="text-yellow-400">AlphaTech</span>:</p>
                  <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(self):</p>
                  <p className="pl-8 text-cyan-400">self.skills = ["PHP", "Python", "C++", "SQL", "Design"]</p>
                  <p className="pl-8 text-cyan-400">self.mission = "Build Software & Teach Excellence"</p>
                  <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">execute</span>(self):</p>
                  <p className="pl-8 text-green-400">return "Client Success & Student Mastery!"</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 p-3.5 rounded-xl border border-indigo-500/20 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-medium text-slate-200">Quality Assured Engineering</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">What We Offer</h2>
          <h3 className="text-3xl font-bold text-white">Featured Services</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((serv) => {
            const IconComp = serv.icon || Code;
            return (
              <div 
                key={serv.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400 mb-5 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-cyan-400 group-hover:text-slate-950 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{serv.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{serv.shortDesc}</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-xs font-mono mb-4">{serv.pricing}</p>
                  <button 
                    onClick={() => navigateTo('services')}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>View Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Portfolio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900/50 py-10 rounded-3xl border border-slate-850">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400">Featured Gallery</h2>
            <h3 className="text-2xl font-bold text-white mt-1">Recent Projects Showcase</h3>
          </div>
          <button
            onClick={() => navigateTo('portfolio')}
            className="mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center space-x-1"
          >
            <span>Browse Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((item) => (
            <div key={item.id} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all">
              <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider bg-slate-800 text-cyan-400 px-2 py-1 rounded">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-slate-400 text-xs line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tech.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 3. ABOUT ME SECTION
// ==========================================
function AboutSection({ navigateTo }) {
  const skills = [
    { name: 'PHP & MySQL Architecture', level: 92, icon: Database },
    { name: 'HTML5 / CSS3 / JavaScript', level: 95, icon: Code },
    { name: 'SQL & Database Optimization', level: 88, icon: Layers },
    { name: 'Python Programming & Automation', level: 85, icon: Terminal },
    { name: 'C++ Systems Programming', level: 78, icon: Cpu },
    { name: 'Graphic Design & Vector Branding', level: 90, icon: Palette },
  ];

  const timeline = [
    {
      year: '2021 - Present',
      title: 'Founder & Lead Tech Engineer at AlphaTech',
      description: 'Architecting web solutions for corporate clients and mentoring students in programming languages and software logic.'
    },
    {
      year: '2019 - 2021',
      title: 'Systems Developer & Database Specialist',
      description: 'Built custom management portals, SQL database backends, and institutional desktop applications.'
    },
    {
      year: '2017 - 2019',
      title: 'Freelance Graphic Designer & Coding Tutor',
      description: 'Designed visual identity assets, promotional posters, and taught entry-level Python and web coding.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                alt="AlphaTech Founder" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white text-xs font-bold">5+ Years Experience</p>
                <p className="text-slate-400 text-[10px]">Development & Mentorship</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">About AlphaTech</span>
          <h1 className="text-4xl font-bold text-white">Engineering Systems & Inspiring Developers</h1>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            I am a full-stack engineer, graphic designer, and dedicated tech tutor. My journey combines structural logic with creative aesthetic design. Over the years, I've developed scalable software tools while helping individuals master modern programming languages from scratch.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl transition-all text-sm"
            >
              Get In Touch
            </button>
            <button
              onClick={() => navigateTo('learn')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors text-sm"
            >
              Tutoring Programs
            </button>
          </div>
        </div>
      </div>

      {/* Skill Progress Bars */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Technical Proficiency</h2>
          <h3 className="text-2xl font-bold text-white">Mastered Stack & Skills</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, i) => {
            const IconC = skill.icon;
            return (
              <div key={i} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-white font-medium text-sm">
                    <IconC className="w-4 h-4 text-cyan-400" />
                    <span>{skill.name}</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Career Journey Timeline */}
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">History</h2>
          <h3 className="text-2xl font-bold text-white">Professional Career Journey</h3>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-8 pl-6">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />
              <div className="md:absolute md:-left-36 md:top-0 text-xs font-mono text-cyan-400 mb-1 md:mb-0">
                {item.year}
              </div>
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SERVICES SECTION
// ==========================================
function ServicesSection({ services, navigateTo }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Solutions Portfolio</span>
        <h1 className="text-4xl font-bold text-white">Professional Services & Pricing</h1>
        <p className="text-slate-400 text-sm">
          High-caliber engineering, visual branding, and tech education tailored to individual learners and businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => {
          const IconComp = service.icon || Code;
          return (
            <div 
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-mono font-semibold">
                    {service.pricing}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{service.shortDesc}</p>

                <div className="border-t border-slate-800 pt-4 space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-400">Key Deliverables & Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-300 space-x-2">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('request')}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 5. PORTFOLIO SECTION
// ==========================================
function PortfolioSection({ portfolio }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return portfolio.filter((item) => {
      const matchesFilter = filter === 'all' || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [portfolio, filter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Our Work</span>
        <h1 className="text-4xl font-bold text-white">Project Showcase Gallery</h1>
        <p className="text-slate-400 text-sm">
          Explore web platforms, software systems, posters, vector logos, and branding projects developed by AlphaTech.
        </p>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        
        {/* Specific requested categories: Websites, Software Systems, Posters, Logos, Branding */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'websites', label: 'Websites' },
            { id: 'software', label: 'Software Systems' },
            { id: 'posters', label: 'Posters' },
            { id: 'logos', label: 'Logos' },
            { id: 'branding', label: 'Branding' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-850 space-y-3">
          <Filter className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-slate-400 text-sm">No projects found matching your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[10px] font-mono rounded-lg border border-slate-800 uppercase">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-850">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => e.preventDefault()}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-medium flex items-center justify-center space-x-2 border border-slate-700 transition-colors"
                >
                  <span>View Project Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. LEARN WITH ALPHATECH
// ==========================================
function LearnSection({ courses, onBookModalOpen }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Tutoring Options</span>
        <h1 className="text-4xl font-bold text-white">Learn with AlphaTech</h1>
        <p className="text-slate-400 text-sm">
          Accelerate your programming capabilities with personalized 1-on-1 tutoring, hands-on project builds, and structured course tracks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <BookOpen className="w-8 h-8 text-cyan-400 mb-2" />
          <h3 className="text-base font-bold text-white">Customized Curriculum</h3>
          <p className="text-slate-400 text-xs leading-relaxed">Lessons adapted to your exact speed and goals—whether for university exams, portfolio projects, or job readiness.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <Code className="w-8 h-8 text-cyan-400 mb-2" />
          <h3 className="text-base font-bold text-white">Hands-on Code Reviews</h3>
          <p className="text-slate-400 text-xs leading-relaxed">Line-by-line feedback on your code syntax, logic structuring, and database queries.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <Calendar className="w-8 h-8 text-cyan-400 mb-2" />
          <h3 className="text-base font-bold text-white">Flexible Lesson Scheduling</h3>
          <p className="text-slate-400 text-xs leading-relaxed">Book standard weekly lessons or intensive coding bootcamps at times that suit you best.</p>
        </div>
      </div>

      {/* Courses Outlines */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Course Tracks & Outlines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const IconComponent = course.icon || Code;
            return (
              <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-cyan-400">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{course.title}</h3>
                        <span className="text-xs text-slate-400">{course.level} • {course.duration}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                      {course.price}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase text-slate-400">Course Outline Highlights:</p>
                    <ul className="space-y-1.5">
                      {course.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center text-xs text-slate-300 space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onBookModalOpen(course)}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/10"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>Schedule / Book Lesson</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. REQUEST A SERVICE SECTION
// ==========================================
function RequestServiceSection({ services, onSubmitRequest }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: services[0]?.title || 'Web & App Development',
    budget: '$500 - $1000',
    details: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;
    
    onSubmitRequest({
      id: 'req_' + Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Inquiry Form</span>
        <h1 className="text-3xl font-bold text-white">Request a Service</h1>
        <p className="text-slate-400 text-sm">
          Select your required service option, project budget, and describe your goals for a customized project proposal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-300">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-300">Select Service Required</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
              <option value="Custom System Package">Custom System Package</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-slate-300">Estimated Budget</label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Under $200">Under $200</option>
              <option value="$200 - $500">$200 - $500</option>
              <option value="$500 - $1000">$500 - $1000</option>
              <option value="$1000+">$1000+</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-slate-300">Project / Requirement Details</label>
          <textarea
            required
            rows={5}
            placeholder="Outline your requirements, target features, timelines, or specific design preferences..."
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 text-sm flex items-center justify-center space-x-2"
        >
          <Send className="w-4 h-4 text-slate-950" />
          <span>Submit Request</span>
        </button>
      </form>
    </div>
  );
}

// ==========================================
// 8. CONTACT SECTION
// ==========================================
function ContactSection({ onSubmitContact }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    onSubmitContact({
      id: 'c_' + Date.now(),
      ...form,
      date: new Date().toISOString().split('T')[0]
    });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Connect With Us</span>
        <h1 className="text-4xl font-bold text-white">Contact AlphaTech</h1>
        <p className="text-slate-400 text-sm">
          Reach out directly via instant messaging, email, or fill out the interactive inquiry form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Direct Options */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase">WhatsApp Instant</p>
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-base font-bold text-white hover:text-green-400 transition-colors">
                +254 794839492
              </a>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-400 uppercase">Direct Email</p>
              <a href="mailto:contact@alphatech.com" className="text-base font-bold text-white hover:text-cyan-400 transition-colors">
                contact@alphatech.com
              </a>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
            <p className="text-xs font-mono text-slate-400 uppercase">Social & Technical Networks</p>
            <div className="flex flex-wrap gap-2">
              {['GitHub', 'LinkedIn', 'Twitter/X', 'YouTube'].map((net, i) => (
                <button key={i} className="px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium text-slate-300">
                  {net}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Send Message</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />

            <textarea
              rows={4}
              placeholder="Your Message..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 9. ADMIN DASHBOARD SECTION
// ==========================================
function AdminDashboardSection({ 
  services, setServices, 
  portfolio, setPortfolio, 
  bookings, setBookings, 
  serviceRequests, setServiceRequests,
  contacts, showNotification
}) {
  const [adminTab, setAdminTab] = useState('requests');

  const [newService, setNewService] = useState({ title: '', pricing: '', shortDesc: '' });
  const [newProject, setNewProject] = useState({ title: '', category: 'websites', description: '', image: '' });

  const addService = (e) => {
    e.preventDefault();
    if (!newService.title) return;
    setServices([...services, {
      id: 'serv_' + Date.now(),
      title: newService.title,
      pricing: newService.pricing || 'Custom Rate',
      shortDesc: newService.shortDesc || 'Custom defined service offering.',
      features: ['Tailored Execution', 'Direct Client Support'],
      icon: Code
    }]);
    setNewService({ title: '', pricing: '', shortDesc: '' });
    showNotification('New Service Added!');
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
    showNotification('Service Removed');
  };

  const addProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    setPortfolio([...portfolio, {
      id: 'proj_' + Date.now(),
      title: newProject.title,
      category: newProject.category,
      description: newProject.description || 'Project details.',
      image: newProject.image || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      tech: ['Custom Stack'],
      featured: false
    }]);
    setNewProject({ title: '', category: 'websites', description: '', image: '' });
    showNotification('New Project Added!');
  };

  const deleteProject = (id) => {
    setPortfolio(portfolio.filter(p => p.id !== id));
    showNotification('Project Removed');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-indigo-500/10 text-cyan-400 text-[10px] font-mono mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR MANAGEMENT PANEL</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'requests', label: `Service Requests (${serviceRequests.length})` },
            { id: 'bookings', label: `Student Bookings (${bookings.length})` },
            { id: 'services', label: `Manage Services (${services.length})` },
            { id: 'projects', label: `Manage Portfolio (${portfolio.length})` },
            { id: 'inquiries', label: `Inquiries (${contacts.length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setAdminTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                adminTab === t.id
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content 1: Service Requests */}
      {adminTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Client Service Requests</h3>
          {serviceRequests.length === 0 ? (
            <p className="text-slate-500 text-sm">No service requests submitted yet.</p>
          ) : (
            <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Client</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Scope Details</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {serviceRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-850/50">
                      <td className="p-4 font-bold text-white">
                        {r.name}
                        <span className="block text-[10px] text-slate-400 font-mono font-normal">{r.email}</span>
                      </td>
                      <td className="p-4 text-cyan-400 font-semibold">{r.service}</td>
                      <td className="p-4 font-mono">{r.budget}</td>
                      <td className="p-4 max-w-xs truncate">{r.details}</td>
                      <td className="p-4 text-slate-400 font-mono">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Student Bookings */}
      {adminTab === 'bookings' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Tutoring & Lesson Bookings</h3>
          <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course Track</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-850/50">
                    <td className="p-4 font-bold text-white">
                      {b.name}
                      <span className="block text-[10px] text-slate-400 font-mono font-normal">{b.email}</span>
                    </td>
                    <td className="p-4 text-cyan-400 font-semibold">{b.course}</td>
                    <td className="p-4 font-mono">{b.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        b.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 3: Manage Services */}
      {adminTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 h-fit">
            <h3 className="text-base font-bold text-white">Add New Service</h3>
            <form onSubmit={addService} className="space-y-3">
              <input
                type="text"
                placeholder="Service Title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Pricing Tag (e.g. Starting at $150)"
                value={newService.pricing}
                onChange={(e) => setNewService({ ...newService, pricing: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <textarea
                placeholder="Short Description"
                rows={3}
                value={newService.shortDesc}
                onChange={(e) => setNewService({ ...newService, shortDesc: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <button type="submit" className="w-full py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs">
                Add Service
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-base font-bold text-white">Active Services List</h3>
            {services.map((s) => (
              <div key={s.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{s.title}</h4>
                  <p className="text-xs text-cyan-400 font-mono">{s.pricing}</p>
                </div>
                <button 
                  onClick={() => deleteService(s.id)}
                  className="p-2 text-red-400 hover:bg-slate-800 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Manage Portfolio */}
      {adminTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 h-fit">
            <h3 className="text-base font-bold text-white">Add New Portfolio Project</h3>
            <form onSubmit={addProject} className="space-y-3">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="websites">Websites</option>
                <option value="software">Software Systems</option>
                <option value="posters">Posters</option>
                <option value="logos">Logos</option>
                <option value="branding">Branding</option>
              </select>
              <input
                type="text"
                placeholder="Image URL"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <textarea
                placeholder="Project Description"
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <button type="submit" className="w-full py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs">
                Add Project Item
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-base font-bold text-white">Gallery Projects ({portfolio.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between space-x-3">
                  <img src={p.image} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 truncate">
                    <h4 className="font-bold text-white text-xs truncate">{p.title}</h4>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{p.category}</span>
                  </div>
                  <button 
                    onClick={() => deleteProject(p.id)}
                    className="p-1.5 text-red-400 hover:bg-slate-800 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 5: Inquiries */}
      {adminTab === 'inquiries' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Contact Messages</h3>
          {contacts.length === 0 ? (
            <p className="text-slate-500 text-sm">No messages received.</p>
          ) : (
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span className="font-bold text-white">{c.name} ({c.email})</span>
                    <span className="font-mono">{c.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400">Subject: {c.subject || 'N/A'}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

// ==========================================
// LESSON BOOKING MODAL
// ==========================================
function BookingModal({ course, onClose, onConfirm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    onConfirm({
      id: 'book_' + Date.now(),
      name: formData.name,
      email: formData.email,
      course: course?.title || 'General Coding Session',
      date: formData.date,
      status: 'Confirmed'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Book Lesson Session</h3>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">{course?.title}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-300">Your Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Jane Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-300">Email Address</label>
            <input
              type="email"
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-300">Preferred Start Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-750 font-semibold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-indigo-500/20"
            >
              Confirm Booking
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
