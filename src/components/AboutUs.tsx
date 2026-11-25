import { useState } from 'react';
import {
  Copy,
  Check,
  ArrowRight,
  PhoneCall,
  Mail,
  ShieldCheck,
  Building2,
  Briefcase,
} from 'lucide-react';
import { Settings } from '../types';
import { navigate } from '../lib/router';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import ownerImg from '../assets/images/mujassam_face.png';
import factoryImg from '../assets/images/factory.jpeg';

interface AboutUsProps {
  settings: Settings;
}

export default function AboutUs({ settings }: AboutUsProps) {
  const [copied, setCopied] = useState(false);

  const fullCompanyProfileText = `
Company Profile
Introduction.

We here at Safety Line are pleased to introduce ourselves as one of the leading international manufacturers & exporters of Safety Protective gloves in all sorts and Garments. As a family owned business since 2008 we have been striving to provide the best quality workmanship to our customers, therefore we only employee experienced craftsman who excel at the art of leathercraft.

Meeting Our Challenge.

Quality products, customer service and customer satisfaction are our number one priority. Our commitment to quality and Service enables us to be able to ship products and make deliveries in a timely manner. commitment, and dedication has made us the quality choice for buyers worldwide. Our products are constructed from the finest available materials and assembled by some of the best leather workers in the industry. Our products are designed to meet any demands for performance, comfort and value. We boast a variety of styles and colors of all of our products offered.

We customize all products in our manufacturing facilities for special needs and market conditions. Private labeling and custom logo printing and embroidery are available at low-cost prices. At Safety Line our priority is to meet and exceed our customer's expectations.

Your Own Designs & Brand Name

For decades we have provided the highest standard of service to an international and culturally diverse loyal client base. Again, private labeling, custom logo printing and embroidery are offered since we fully appreciate that most customers have their own trademarked art and designs that they have developed in building their own individual brands. We commit to you that we will make your products according to your own specifications. Brand names, Logos, Blister packing, Header cards, Hangtags etc.

Our Production Unit

In our facility here in Pakistan alone, our company employs Ninty experienced craftsman working on a fulltime basis. We have 70-stitching machines in working order at our disposal as well as an outstanding selection of Safety protective materials and leather products. We use a state of the art press cutting system for the perfect fitting of any product we produce. We also have other facilities that we can sub-contract from for larger custom orders. For those of you who are not interested in private labeling we are able to offer you many other standard and in house designs that you may choose from.

You can select any design according to your evaluation and approval. Our prices are very competitive and we guarantee quality workmanship and timely deliveries.

Thanks for taking your time in reviewing the above content. We hope this letter of introduction has enlightened you a bit about our company, Safety Line. We hope that you will take advantage of our years of experience by furthering your inquiry. We are waiting to serve your quality buying needs.
  `.trim();

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(fullCompanyProfileText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyHighlights = [
    {
      index: '01',
      title: 'Family-Owned Since 2008',
      desc: 'Over 18 years of continuous manufacturing dedication and customer-first service.'
    },
    {
      index: '02',
      title: '90 Full-Time Craftsmen',
      desc: 'Experienced artisans who excel at precision leathercraft, cutting, and stitching.'
    },
    {
      index: '03',
      title: '70 Stitching Machines',
      desc: 'Complete in-house machinery array running in operational order in our Pakistan facility.'
    },
    {
      index: '04',
      title: 'State-of-the-Art Press Cutting',
      desc: 'Precision press cutting systems ensuring perfect ergonomic fit across all garments & gloves.'
    },
    {
      index: '05',
      title: 'Custom OEM & Private Labeling',
      desc: 'Custom logos, embroidery, printing, blister packing, header cards, and hangtags.'
    },
    {
      index: '06',
      title: 'Timely Global Deliveries',
      desc: 'Competitive pricing, verified quality workmanship, and reliable international logistics.'
    }
  ];

  const whatsappDirectUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Mr. Muhammad Mujassam Maqsood, I am reaching out regarding Safety Line manufacturing and orders.'
  )}`;

  const whatsappProfileUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Safety Line Management, I reviewed your Company Profile and would like to inquire about manufacturing.'
  )}`;

  return (
    <div id="about-us-container" className="bg-[#F7F6F2] min-h-screen font-sans text-[#141918] flex flex-col">
      <SEO
        title="Company Profile & About Us | Safety Line"
        description="Official Company Profile of Safety Line. Leading international manufacturer and exporter of safety protective gloves and garments since 2008."
        keywords="Safety Line company profile, safety protective gloves manufacturer, garments exporter, OEM private labeling Sialkot, leathercraft craftsman Pakistan"
      />

      <SiteHeader
        variant="obsidian"
        ctaLabel="Contact Desk"
        ctaAction={() => navigate('/contact')}
      />

      {/* Editorial Obsidian Page Hero */}
      <section className="bg-[#0E1A19] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 text-xs font-mono text-white/50">
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('/')} className="hover:text-white transition-colors cursor-pointer">
                Portal
              </button>
              <span>/</span>
              <span>About</span>
              <span>/</span>
              <span className="text-white">Company Profile</span>
            </div>

            <div className="flex items-center gap-4 print:hidden">
              <button
                type="button"
                onClick={() => scrollToSection('owner-leadership')}
                className="text-white/75 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Owner &amp; Leadership
              </button>
              <button
                type="button"
                onClick={handleCopyProfile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Profile Text'}</span>
              </button>
            </div>
          </div>

          <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#D92227]">
                Manufacturing &amp; Exporting Since 2008
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.04]">
                Company Profile
              </h1>
              <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl">
                Leading international manufacturers &amp; exporters of Safety Protective gloves in all sorts and Garments — built on family ownership, master leathercraft, and direct global trust.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => scrollToSection('company-profile-main')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Read Letter of Introduction</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Unboxed 4-Column Manufacturing Proof Ledger */}
      <section className="bg-white border-b border-[#E2DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E2DFD7]">
            <div className="py-7 md:px-6 first:md:pl-0">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tabular-nums block">2008</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#D92227] font-semibold mt-1 block">Established</span>
              <p className="text-xs text-[#525957] mt-1">Family-Owned Heritage</p>
            </div>
            <div className="py-7 md:px-6 pl-4">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tabular-nums block">90</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#D92227] font-semibold mt-1 block">Craftsmen</span>
              <p className="text-xs text-[#525957] mt-1">Full-Time Experienced Specialists</p>
            </div>
            <div className="py-7 md:px-6">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] tabular-nums block">70</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#D92227] font-semibold mt-1 block">Machines</span>
              <p className="text-xs text-[#525957] mt-1">Stitching Units in Working Order</p>
            </div>
            <div className="py-7 md:px-6 pl-4 last:md:pr-0">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#141918] block">Press-Cut</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#D92227] font-semibold mt-1 block">Precision</span>
              <p className="text-xs text-[#525957] mt-1">State-of-the-Art Fitting System</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-16 flex-grow w-full">

        {/* Official Company Profile Editorial Document */}
        <main id="company-profile-main" className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden">
          {/* Document Header Strip */}
          <div className="bg-[#0E1A19] text-white p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-white/60">
                <Building2 className="w-3.5 h-3.5 text-[#D92227]" />
                <span>Letter of Introduction &amp; Corporate Profile</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Safety Line — Official Dossier
              </h2>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Direct manufacturing facilities in Pakistan catering to international buyers, custom brand labeling, and global exports.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 print:hidden">
              <button
                type="button"
                onClick={handleCopyProfile}
                className="bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold px-4 py-2.5 rounded-sm transition-colors cursor-pointer inline-flex items-center gap-2 border border-white/15"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Profile'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-mono font-bold px-4 py-2.5 rounded-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Direct Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4-Section Editorial Grid Layout */}
          <div className="divide-y divide-[#E2DFD7]">
            {/* Section 01 */}
            <section className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[#D92227] tracking-widest">SECTION 01</span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141918]">
                  Introduction
                </h3>
              </div>
              <div className="lg:col-span-8">
                <p className="text-[#373E3C] text-base leading-relaxed">
                  We here at Safety Line are pleased to introduce ourselves as one of the leading international manufacturers &amp; exporters of Safety Protective gloves in all sorts and Garments. As a family owned business since 2008 we have been striving to provide the best quality workmanship to our customers, therefore we only employee experienced craftsman who excel at the art of leathercraft.
                </p>
              </div>
            </section>

            {/* Section 02 */}
            <section className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-[#F7F6F2]/50">
              <div className="lg:col-span-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[#D92227] tracking-widest">SECTION 02</span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141918]">
                  Meeting Our Challenge
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-4 text-[#373E3C] text-base leading-relaxed">
                <p>
                  Quality products, customer service and customer satisfaction are our number one priority. Our commitment to quality and Service enables us to be able to ship products and make deliveries in a timely manner. Commitment and dedication has made us the quality choice for buyers worldwide. Our products are constructed from the finest available materials and assembled by some of the best leather workers in the industry. Our products are designed to meet any demands for performance, comfort and value. We boast a variety of styles and colors of all of our products offered.
                </p>
                <p>
                  We customize all products in our manufacturing facilities for special needs and market conditions. Private labeling and custom logo printing and embroidery are available at low-cost prices. At Safety Line our priority is to meet and exceed our customer&apos;s expectations.
                </p>
              </div>
            </section>

            {/* Section 03 */}
            <section className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[#D92227] tracking-widest">SECTION 03</span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141918]">
                  Your Own Designs &amp; Brand Name
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-4 text-[#373E3C] text-base leading-relaxed">
                <p>
                  For decades we have provided the highest standard of service to an international and culturally diverse loyal client base. Again, private labeling, custom logo printing and embroidery are offered since we fully appreciate that most customers have their own trademarked art and designs that they have developed in building their own individual brands.
                </p>
                <p>
                  We commit to you that we will make your products according to your own specifications: <strong className="text-[#141918] font-semibold">Brand names, Logos, Blister packing, Header cards, Hangtags etc.</strong>
                </p>
              </div>
            </section>

            {/* Section 04 */}
            <section className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-[#F7F6F2]/50">
              <div className="lg:col-span-4 space-y-1">
                <span className="font-mono text-xs font-bold text-[#D92227] tracking-widest">SECTION 04</span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#141918]">
                  Our Production Unit
                </h3>
              </div>
              <div className="lg:col-span-8 space-y-4 text-[#373E3C] text-base leading-relaxed">
                <p>
                  In our facility here in Pakistan alone, our company employs <strong className="text-[#141918] font-semibold">Ninty (90) experienced craftsman</strong> working on a fulltime basis. We have <strong className="text-[#141918] font-semibold">70-stitching machines</strong> in working order at our disposal as well as an outstanding selection of Safety protective materials and leather products. We use a state of the art press cutting system for the perfect fitting of any product we produce.
                </p>
                <p>
                  We also have other facilities that we can sub-contract from for larger custom orders. For those of you who are not interested in private labeling we are able to offer you many other standard and in house designs that you may choose from.
                </p>
                <p>
                  You can select any design according to your evaluation and approval. Our prices are very competitive and we guarantee quality workmanship and timely deliveries.
                </p>
              </div>
            </section>

            {/* Section 05: Sign-Off */}
            <section className="p-6 sm:p-10 bg-white">
              <div className="p-6 sm:p-8 bg-[#F7F6F2] border border-[#E2DFD7] rounded-sm space-y-5">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#525957] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#D92227]" />
                  <span>Summary &amp; Inquiry Invitation</span>
                </div>
                <p className="text-[#141918] font-serif italic text-lg sm:text-xl leading-relaxed">
                  &ldquo;Thanks for taking your time in reviewing the above content. We hope this letter of introduction has enlightened you a bit about our company, Safety Line. We hope that you will take advantage of our years of experience by furthering your inquiry. We are waiting to serve your quality buying needs.&rdquo;
                </p>
                <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-[#E2DFD7]">
                  <div>
                    <span className="font-display font-extrabold text-base text-[#141918] block">
                      Muhammad Mujassam Maqsood
                    </span>
                    <span className="text-xs text-[#525957] font-mono block mt-0.5">
                      Owner &amp; Managing Director · Safety Line
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection('owner-leadership')}
                      className="text-xs font-mono font-bold text-[#D92227] hover:text-[#141918] transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      View Owner Profile &amp; Statement &rarr;
                    </button>
                    <span className="font-mono text-xs text-[#525957] bg-white px-3 py-1.5 rounded-sm border border-[#E2DFD7]">
                      Sialkot, Punjab, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Executive Ownership Asymmetric Obsidian Spread */}
        <section id="owner-leadership" className="bg-[#0E1A19] text-white border border-white/10 rounded-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Portrait Column */}
            <div className="lg:col-span-5 bg-[#122B29]/50 border-b lg:border-b-0 lg:border-r border-white/10 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-sm overflow-hidden border border-white/20 bg-[#0E1A19]">
                <img
                  src={ownerImg}
                  alt="Muhammad Mujassam Maqsood — Owner of Safety Line"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="mt-5 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
                  Direct Ownership · Est. 2008
                </span>
                <span className="text-xs font-mono text-white/60 block">
                  Sialkot, Punjab, Pakistan
                </span>
              </div>
            </div>

            {/* Leadership Statement & Credentials Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-white/55">
                  <Briefcase className="w-3.5 h-3.5 text-[#D92227]" />
                  <span>Company Owner &amp; Managing Director</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Muhammad Mujassam Maqsood
                </h2>

                <blockquote className="pt-4 border-t border-white/10 font-serif italic text-white/90 text-lg sm:text-xl leading-relaxed">
                  &ldquo;Since 2008, our heritage has been built on an uncompromising dedication to master leathercraft, ethical manufacturing, and direct client trust. From our facility in Sialkot, I personally oversee our 90 experienced craftsmen and every production milestone to ensure world-class quality for buyers across the globe.&rdquo;
                </blockquote>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#D92227] hover:bg-[#B5191D] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WhatsApp Owner Direct ({settings.contactPhone})</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Executive Inquiry Desk</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Operational Capabilities Architectural Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E2DFD7] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-[#D92227] font-semibold tracking-[0.16em]">
                Manufacturing Infrastructure
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#141918] mt-1">
                Key Infrastructure &amp; Customization Capabilities
              </h3>
            </div>
            <span className="text-xs font-mono text-[#525957]">6 Core Industrial Pillars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white border border-[#E2DFD7] divide-y md:divide-y-0 md:divide-x divide-[#E2DFD7]">
            {keyHighlights.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 space-y-2.5 ${idx >= 3 ? 'md:border-t border-[#E2DFD7]' : ''}`}
              >
                <span className="font-mono text-xs font-bold text-[#D92227] tracking-wider block">
                  {item.index}
                </span>
                <h4 className="font-display font-bold text-base text-[#141918]">
                  {item.title}
                </h4>
                <p className="text-sm text-[#525957] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Factory Facility Photographic Spread */}
        <section className="bg-white border border-[#E2DFD7] rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 aspect-[16/9] lg:aspect-auto bg-[#0E1A19] overflow-hidden">
            <img
              src={factoryImg}
              alt="Safety Line Manufacturing Facility and Showroom, Sialkot, Pakistan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lg:col-span-4 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
                Direct Manufacturing Plant
              </span>
              <h3 className="font-display text-2xl font-extrabold text-[#141918]">
                Safety Line Industrial Complex
              </h3>
              <p className="text-sm text-[#525957] leading-relaxed">
                Equipped with hydraulic press-cutting stations, 70 stitching units, raw leather grading rooms, and export packaging lines in Sialkot, Pakistan.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2DFD7] flex items-center justify-between text-xs font-mono text-[#141918]">
              <span>Operational Facility</span>
              <span className="text-[#525957]">ISO 9001:2015</span>
            </div>
          </div>
        </section>

        {/* Direct Sourcing & OEM Callout Bar */}
        <section className="bg-[#0E1A19] text-white p-8 sm:p-10 rounded-sm border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#D92227] font-semibold block">
              Direct Wholesale &amp; Sourcing Inquiries
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Discuss Your Manufacturing Order?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Send us your specifications, sample requests, private labeling requirements, or tech packs. Our team responds promptly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={whatsappProfileUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-mono font-bold text-xs px-5 py-3.5 rounded-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#D92227]" />
              <span>WhatsApp ({settings.contactPhone})</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="bg-[#D92227] hover:bg-[#B5191D] text-white font-mono font-bold text-xs px-5 py-3.5 rounded-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Form &amp; RFQ</span>
            </button>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
