"use client";

import { useState, useRef, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918217206292";
const PHONE_DISPLAY = "82172 06292";

interface ServicesProps {
  onOpenEnquiry?: (category?: string) => void;
}

export type ServiceCategory = "all" | "ai" | "software";

export interface ServiceItem {
  num: string;
  id: string;
  category: "ai" | "software";
  categoryLabel: string;
  title: string;
  subtitle: string;
  short: string;
  description: string;
  whatWeProvide: string[];
  usefulFor: string;
  badge: string;
}

export const servicesList: ServiceItem[] = [
  // ─── AI Automation Services (from Elostara Solutions) ───────────────
  {
    num: "01",
    id: "ai-chatbots",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "AI Website Chatbots",
    subtitle: "Answer questions and capture leads.",
    short: "24/7 intelligent chat agents on your website that answer visitor questions and capture verified leads automatically.",
    description:
      "An intelligent conversational chatbot trained directly on your business data, pricing, and FAQs. It greets visitors, answers their questions immediately, and sends qualified lead details directly to your WhatsApp.",
    whatWeProvide: [
      "24/7 instant visitor response with zero wait time",
      "Trained on your business pricing, catalog & FAQs",
      "Captures visitor name & phone to WhatsApp & CRM",
      "Seamless escalation to human staff when needed",
    ],
    usefulFor: "Websites, Service Businesses, Retail, Real Estate, Clinics",
    badge: "24/7 LEAD CAPTURE",
  },
  {
    num: "02",
    id: "ai-customer-support",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "AI Customer Support",
    subtitle: "Handle customer inquiries automatically.",
    short: "Auto-resolves 80%+ of repetitive customer questions across your website, WhatsApp, and social media.",
    description:
      "Automated multi-channel customer service that resolves repetitive inquiries around the clock. Handles order status, business timings, policy questions, and routing to live agents for complex cases.",
    whatWeProvide: [
      "Resolves common customer questions automatically",
      "Order status, timings, policy & pricing lookups",
      "Unified support on Website and WhatsApp",
      "Transfers high-priority cases to your staff",
    ],
    usefulFor: "Retail Stores, Agencies, Clinics, Hospitality, Co-working",
    badge: "80%+ AUTO RESOLVED",
  },
  {
    num: "03",
    id: "lead-generation",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "Lead Generation & Lead Management",
    subtitle: "Collect and organize potential customers.",
    short: "Collect, qualify, and organize inbound prospects so no potential customer is ever lost.",
    description:
      "Systematic capture, qualification, and routing of high-intent prospects so no inbound inquiry ever falls through the cracks or goes cold.",
    whatWeProvide: [
      "Automated lead qualification questionnaires",
      "Instant sync with Google Sheets, Airtable, or CRM",
      "Instant WhatsApp alert to your sales team in 5 seconds",
      "Tagging, lead scoring & prospect segmentation",
    ],
    usefulFor: "Real Estate, Consultants, Coaching, High-ticket Services",
    badge: "ZERO LOST LEADS",
  },
  {
    num: "04",
    id: "appointment-booking",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "Appointment Booking Automation",
    subtitle: "Let customers book appointments easily.",
    short: "Let clients pick available slots, book appointments, and get WhatsApp reminders automatically.",
    description:
      "Frictionless self-service booking system that allows clients to pick available slots, pay deposits, and receive automatic confirmations without back-and-forth phone calls.",
    whatWeProvide: [
      "Direct live calendar sync (Google Calendar, Outlook)",
      "Zero double-bookings with automated conflict checks",
      "Automated WhatsApp & SMS confirmation messages",
      "Smart reminder pings 24h & 2h before the appointment",
    ],
    usefulFor: "Doctors, Clinics, Salons, Spas, Consultants, Tutors",
    badge: "NO NO-SHOWS",
  },
  {
    num: "05",
    id: "business-workflow",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "Business Workflow Automation",
    subtitle: "Automate repetitive business tasks.",
    short: "Connect your disconnected tools and spreadsheets so invoices, receipts, and order updates run automatically.",
    description:
      "Stop spending hours every day copy-pasting customer details, writing manual receipts, and sending status updates. We connect your tools so your daily workflow runs hands-free.",
    whatWeProvide: [
      "Automatic invoice & receipt PDF generation",
      "Webhooks connecting WhatsApp, Payment Gateways & CRM",
      "Automated staff task assignments upon new order",
      "Replaces hours of daily copy-pasting across systems",
    ],
    usefulFor: "Operations Teams, Wholesalers, Growing SMEs, Service Firms",
    badge: "SAVES 15+ HRS/WEEK",
  },
  {
    num: "06",
    id: "automated-email",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "Automated Email Follow-ups",
    subtitle: "Stay connected with potential customers.",
    short: "Smart automated follow-up sequences that nurture leads, follow up after quotes, and win repeat clients.",
    description:
      "Personalized, timely email and messaging drip campaigns that nurture cold inquiries, follow up after quotes, and systematically turn one-time buyers into repeat clients.",
    whatWeProvide: [
      "Intelligent drip sequences based on user actions",
      "Automated post-quote follow-up sequences",
      "Customer re-engagement after 30, 60, or 90 days",
      "Automated Google review requests after service",
    ],
    usefulFor: "B2B Companies, Professional Firms, E-commerce, Freelancers",
    badge: "HIGHER CONVERSIONS",
  },
  {
    num: "07",
    id: "voice-assistants",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "AI Voice Assistants",
    subtitle: "Answer calls and assist customers.",
    short: "Human-sounding AI voice agents that answer incoming phone calls 24/7 without hold times.",
    description:
      "Natural-sounding AI voice agents capable of handling incoming customer phone calls, answering FAQs, taking down caller requirements, and scheduling appointments 24/7.",
    whatWeProvide: [
      "Ultra-realistic, natural voice conversation in real time",
      "Answers phone calls 24/7 without hold times or busy tones",
      "Captures caller name, requirement & records call notes",
      "Books appointments & transfers high-priority calls to you",
    ],
    usefulFor: "Clinics, Restaurants, Real Estate, Service Centers, Contractors",
    badge: "NEVER MISS A CALL",
  },
  {
    num: "08",
    id: "dashboards-reporting",
    category: "ai",
    categoryLabel: "AI Automation",
    title: "Business Dashboards & Reporting",
    subtitle: "Track business performance with useful insights.",
    short: "See your daily sales, inquiries, and customer activity in one clean screen — no spreadsheet chaos.",
    description:
      "Single-pane executive dashboards that consolidate daily revenue, lead counts, conversion rates, and pending tasks without wrestling with messy spreadsheets.",
    whatWeProvide: [
      "Live daily sales, inquiries & appointment counts",
      "Automated daily/weekly summary sent to WhatsApp/Email",
      "Connects to Google Sheets, Razorpay/Stripe, or SQL databases",
      "Clear visual KPIs designed for fast business decisions",
    ],
    usefulFor: "Founders, Store Owners, Multi-branch Businesses, Directors",
    badge: "TOTAL CLARITY",
  },

  // ─── Software & Web Development Services ────────────────────────────
  {
    num: "09",
    id: "website-dev",
    category: "software",
    categoryLabel: "Software & Web",
    title: "Website & Web App Development",
    subtitle: "Custom business websites and web applications.",
    short: "Your digital shop front — beautiful, fast, and works perfectly on every phone.",
    description:
      "A professional website your customers trust immediately — designed to look great, load fast, and make it easy for them to contact you, book, or order.",
    whatWeProvide: [
      "Custom Business Websites & Portals",
      "High-Converting Landing Pages",
      "Mobile Friendly & Responsive on Any Phone",
      "Instant WhatsApp Contact Button Integration",
    ],
    usefulFor: "Restaurants, Retail Shops, Salons, Clinics, Professional Services",
    badge: "MOST POPULAR",
  },
  {
    num: "10",
    id: "mobile-apps",
    category: "software",
    categoryLabel: "Software & Web",
    title: "Mobile App Development",
    subtitle: "Native and cross-platform mobile apps.",
    short: "A real app your customers download and use — for bookings, loyalty rewards, delivery, or ordering.",
    description:
      "We build straightforward, easy-to-use apps for Android and iPhone. Your customers download it once and stay connected to your business every day.",
    whatWeProvide: [
      "Android & iPhone Mobile Applications",
      "Booking & Appointment Apps",
      "Loyalty & Rewards Customer Cards",
      "Published to Google Play Store & Apple App Store",
    ],
    usefulFor: "Delivery Services, Booking Platforms, Field Services",
    badge: "MOBILE FIRST",
  },
  {
    num: "11",
    id: "custom-portals",
    category: "software",
    categoryLabel: "Software & Web",
    title: "Custom Business Software",
    subtitle: "Bespoke internal software and management tools.",
    short: "Software built exactly for your business — not a generic tool that kind of fits.",
    description:
      "We build simple, custom tools for managing your clients, bookings, team tasks, or quotations — designed exactly for how your business actually works, no complicated training needed.",
    whatWeProvide: [
      "Customer & Client Management Systems",
      "Staff & Team Task Tracking",
      "Booking & Membership Portals",
      "Custom Quote & Order Calculation Forms",
    ],
    usefulFor: "Service businesses, Consultancies, Real Estate, Field Teams",
    badge: "BUILT FOR YOU",
  },
  {
    num: "12",
    id: "online-store",
    category: "software",
    categoryLabel: "Software & Web",
    title: "Online Catalog & Digital Menu",
    subtitle: "Interactive product catalogs and QR menus.",
    short: "Show your products or menu online — customers order directly on WhatsApp or pay by UPI.",
    description:
      "A beautiful online catalog with your photos, clear prices, and a simple order button. Customers browse, pick what they want, and message you directly — no app required.",
    whatWeProvide: [
      "Product or Menu Catalog with High-Res Photos",
      "Direct Online Ordering via WhatsApp",
      "UPI & Card Payment Link Integration",
      "Easy Inventory & Order Management for You",
    ],
    usefulFor: "Retail stores, Boutiques, Manufacturers, Wholesalers",
    badge: "SELL ONLINE EASILY",
  },
];

export default function Services({ onOpenEnquiry }: ServicesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(servicesList[0].id);
  const [expandedItems, setExpandedItems] = useState<string[]>([servicesList[0].id]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return servicesList;
    return servicesList.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const activeService = useMemo(() => {
    return (
      servicesList.find((s) => s.id === selectedServiceId) ||
      filteredServices[0] ||
      servicesList[0]
    );
  }, [selectedServiceId, filteredServices]);

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    setSelectedServiceId(id);
  };

  const whatsappDirectUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Elostara Solutions, I would like to discuss your services for my business."
  )}`;

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-12 lg:py-20 overflow-hidden bg-[#F8F8F5] text-[#0A0A0D]"
    >
      <div className="section-wrap relative z-10 space-y-8 sm:space-y-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="badge-plum mb-2">SERVICES WE PROVIDE</span>
          <h2 className="display-section-title text-[#0A0A0D]">
            What We <span className="highlight-lime">Build & Automate For You.</span>
          </h2>
          <p className="text-[#50505C] text-base sm:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            AI business automations, custom websites, mobile applications, and intelligent operational systems built for everyday business growth.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#0A0A0D] text-[#FAFAF8] shadow-md"
                  : "bg-[#0A0A0D]/05 text-[#50505C] hover:bg-[#0A0A0D]/10 hover:text-[#0A0A0D]"
              }`}
            >
              All Services ({servicesList.length})
            </button>
            <button
              onClick={() => setActiveCategory("ai")}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeCategory === "ai"
                  ? "bg-[#28113B] text-[#CCFF00] shadow-md"
                  : "bg-[#0A0A0D]/05 text-[#50505C] hover:bg-[#0A0A0D]/10 hover:text-[#0A0A0D]"
              }`}
            >
              AI Automation (8)
            </button>
            <button
              onClick={() => setActiveCategory("software")}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                activeCategory === "software"
                  ? "bg-[#0A0A0D] text-[#FAFAF8] shadow-md"
                  : "bg-[#0A0A0D]/05 text-[#50505C] hover:bg-[#0A0A0D]/10 hover:text-[#0A0A0D]"
              }`}
            >
              Software & Web (4)
            </button>
          </div>
        </motion.div>

        {/* Asymmetric Editorial Layout: Left Spotlight + Right Numbered Expandable List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Deep-Dive Featured Spotlight (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="rounded-3xl bg-[#28113B] text-[#FAFAF8] p-6 sm:p-8 lg:p-9 border border-white/10 shadow-[0_20px_45px_rgba(40,17,59,0.18)] space-y-5 sm:space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <span className="font-mono text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#CCFF00] text-[#0A0A0D] uppercase tracking-widest">
                  {activeService.badge}
                </span>
                <span className="font-mono text-xs text-white/50">
                  {activeService.categoryLabel} • {activeService.num} / 12
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black text-[#FAFAF8] tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#CCFF00]">
                  {activeService.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal pt-1">
                  {activeService.description}
                </p>
              </div>

              {/* What We Deliver In This Service */}
              <div className="space-y-3 pt-4 border-t border-white/10 relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#CCFF00] font-bold block">
                  DELIVERABLE SPECIFICATIONS:
                </span>
                <div className="space-y-2">
                  {activeService.whatWeProvide.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                      <span className="text-[#CCFF00] font-bold select-none leading-none mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Useful For Pill */}
              <div className="p-3.5 rounded-2xl bg-white/06 border border-white/10 font-mono text-xs text-white/75 space-y-1 relative z-10">
                <span className="text-[10px] uppercase text-[#CCFF00] font-bold block">
                  IDEAL USE CASES:
                </span>
                <span>{activeService.usefulFor}</span>
              </div>

              {/* Action Trigger */}
              <div className="pt-2 relative z-10">
                <button
                  onClick={() =>
                    onOpenEnquiry
                      ? onOpenEnquiry(activeService.title)
                      : window.open(
                          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `Hi Elostara Solutions, I'd like to get started with ${activeService.title}.`
                          )}`,
                          "_blank"
                        )
                  }
                  className="btn-zip-lime w-full py-4 rounded-full font-mono text-xs tracking-widest text-[#0A0A0D] flex items-center justify-center cursor-pointer shadow-md"
                >
                  <span>REQUEST THIS CAPABILITY →</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Numbered Expandable Service Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {filteredServices.map((service, idx) => {
              const isSelected = selectedServiceId === service.id;
              const isExpanded = expandedItems.includes(service.id);

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? "bg-[#FFFFFF] border-[#28113B] shadow-md ring-1 ring-[#28113B]/20"
                      : "bg-[#FFFFFF] border-[#0A0A0D]/10 hover:border-[#0A0A0D]/25 shadow-xs"
                  }`}
                >
                  <div
                    onClick={() => {
                      toggleExpand(service.id);
                    }}
                    className="p-4 sm:p-5 lg:p-6 cursor-pointer flex items-start justify-between gap-3 sm:gap-4 select-none"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#848492] mt-1">
                        {service.num}
                      </span>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base lg:text-lg font-bold text-[#0A0A0D]">
                            {service.title}
                          </h4>
                          <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0D]/05 text-[#50505C]">
                            {service.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#28113B] font-semibold">
                          {service.subtitle}
                        </p>
                        <p className="text-xs text-[#50505C] font-normal leading-relaxed pt-0.5 line-clamp-2">
                          {service.short}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#0A0A0D]/05 font-mono text-sm font-bold flex items-center justify-center text-[#0A0A0D] flex-shrink-0 mt-0.5 select-none">
                      {isExpanded ? "−" : "+"}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="px-4 sm:px-6 lg:px-7 pb-5 sm:pb-6 pt-2 border-t border-[#0A0A0D]/06 space-y-3"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {service.whatWeProvide.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2 text-xs text-[#0A0A0D] font-medium"
                            >
                              <span className="text-[#28113B] font-bold select-none">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 text-xs font-mono border-t border-[#0A0A0D]/06">
                          <span className="text-[#848492]">For: {service.usefulFor}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedServiceId(service.id);
                              if (onOpenEnquiry) onOpenEnquiry(service.title);
                            }}
                            className="text-[#28113B] font-bold hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
                          >
                            <span>GET FIXED QUOTE →</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Callout Banner matching the flyer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-[#0A0A0D] text-[#FAFAF8] p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Left Column: Heading & Tagline */}
            <div className="space-y-2 text-center lg:text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-white/60 font-semibold block">
                Ready to automate your business?
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                <span className="text-[#CCFF00]">Let&apos;s make it happen.</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-lg font-normal">
                Tell us which tasks slow your team down or what you need built. We configure, connect, and deliver practical systems tailored to your business.
              </p>
            </div>

            {/* Right Column: Direct Phone / WhatsApp from Flyer */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-end">
              <div className="text-center sm:text-right">
                <span className="font-mono text-xs uppercase tracking-widest text-[#CCFF00] font-bold block mb-1">
                  Call or WhatsApp us
                </span>
                <a
                  href={`tel:+91${WHATSAPP_NUMBER}`}
                  className="font-mono text-2xl sm:text-3xl lg:text-4xl font-black text-white hover:text-[#CCFF00] transition-colors tracking-tight no-underline block"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zip-lime py-3.5 px-6 rounded-full font-mono text-xs tracking-wider text-[#0A0A0D] flex items-center justify-center no-underline flex-1 sm:flex-initial shadow-lg hover:scale-105 transition-transform"
                >
                  <span>WHATSAPP US →</span>
                </a>

                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry("General Services Consultation")}
                  className="btn-zip-plum py-3.5 px-6 rounded-full font-mono text-xs tracking-wider text-white border border-white/20 hover:border-[#CCFF00] flex items-center justify-center cursor-pointer flex-1 sm:flex-initial"
                >
                  <span>REQUEST QUOTE</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
