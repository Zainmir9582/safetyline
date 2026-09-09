import { useState } from 'react';
import { 
  Building2, 
  Copy, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  Sparkles, 
  Truck, 
  Scissors,
  Users,
  Settings as SettingsIcon,
  Tag,
  ChevronDown
} from 'lucide-react';
import { Settings } from '../types';
import { navigate } from '../lib/router';
import SEO from './SEO';
import factoryImg from '../assets/images/safetyline_exact_user_pic_1788337630939.jpg';

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
      icon: <Building2 className="w-5 h-5 text-[#FF5A36]" />,
      title: 'Family-Owned Since 2008',
      desc: 'Over 18 years of continuous manufacturing dedication and customer-first service.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#FF5A36]" />,
      title: '90 Full-Time Craftsmen',
      desc: 'Experienced artisans who excel at precision leathercraft, cutting, and stitching.'
    },
    {
      icon: <SettingsIcon className="w-5 h-5 text-[#FF5A36]" />,
      title: '70 Stitching Machines',
      desc: 'Complete in-house machinery array running in operational order in our Pakistan facility.'
    },
    {
      icon: <Scissors className="w-5 h-5 text-[#FF5A36]" />,
      title: 'State-of-the-Art Press Cutting',
      desc: 'Precision press cutting systems ensuring perfect ergonomic fit across all garments & gloves.'
    },
    {
      icon: <Tag className="w-5 h-5 text-[#FF5A36]" />,
      title: 'Custom OEM & Private Labeling',
      desc: 'Custom logos, embroidery, printing, blister packing, header cards, and hangtags.'
    },
    {
      icon: <Truck className="w-5 h-5 text-[#FF5A36]" />,
      title: 'Timely Global Deliveries',
      desc: 'Competitive pricing, verified quality workmanship, and reliable international logistics.'
    }
  ];

  return (
    <div id="about-us-container" className="bg-[#FAFCFB] min-h-screen pt-20 pb-24 font-sans text-[#1A1A1A]">
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B3D3B] text-white py-3.5 px-4 sm:px-8 border-b border-white/10 shadow-lg shadow-[#0B3D3B]/20 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="flex items-baseline space-x-1.5">
              <span className="font-display font-black text-sm uppercase tracking-wider">
                <span className="text-[#EA2227]">SAFETY</span> <span className="text-white">LINE</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#D9F0EC] font-bold">
                Company Profile
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => navigate('/')}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              Portal
            </button>
            <button
              onClick={() => navigate('/gearwear')}
              className="hover:text-[#FF5A36] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline"
            >
              Gearwear
            </button>
            <button
              onClick={() => navigate('/accessories')}
              className="hover:text-[#D9F0EC] text-white/90 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline"
            >
              Accessories
            </button>
            <button
              onClick={() => scrollToSection('company-profile-main')}
              className="bg-[#D9F0EC] hover:bg-white text-[#0B3D3B] px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer hidden md:inline-flex items-center gap-1 shadow-xs"
            >
              <span>Company Profile</span>
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-md shadow-[#FF5A36]/30"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contact Desk</span>
            </button>
          </div>
        </div>
      </header>

      <SEO 
        title="Company Profile & About Us | Safety Line"
        description="Official Company Profile of Safety Line. Leading international manufacturer and exporter of safety protective gloves and garments since 2008."
        keywords="Safety Line company profile, safety protective gloves manufacturer, garments exporter, OEM private labeling Sialkot, leathercraft craftsman Pakistan"
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pt-6">
        
        {/* Breadcrumbs & Quick Anchor */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500 print:hidden">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <span>/</span>
            <span className="text-slate-400">About</span>
            <span>/</span>
            <span className="text-[#0B3D3B] font-bold">Company Profile</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyProfile}
              className="inline-flex items-center gap-1.5 text-[#0B3D3B] hover:text-[#FF5A36] font-bold transition-colors cursor-pointer bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md text-[11px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Profile Text'}</span>
            </button>
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#D9F0EC] text-[#0B3D3B] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A36]" />
            <span>Manufacturing &amp; Exporting Since 2008</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#0B3D3B] tracking-tight">
            Company Profile
          </h1>
          <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            Leading international manufacturers &amp; exporters of Safety Protective gloves in all sorts and Garments.
          </p>
        </div>

        {/* Quick Highlights Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <span className="block text-3xl font-extrabold text-[#0B3D3B] font-display">2008</span>
            <span className="text-[11px] text-slate-500 font-mono uppercase font-bold tracking-wider">Established</span>
            <p className="text-[11px] text-slate-600 font-normal">Family-Owned Heritage</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <span className="block text-3xl font-extrabold text-[#FF5A36] font-display">90</span>
            <span className="text-[11px] text-slate-500 font-mono uppercase font-bold tracking-wider">Craftsmen</span>
            <p className="text-[11px] text-slate-600 font-normal">Full-Time Experienced Specialists</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <span className="block text-3xl font-extrabold text-[#0B3D3B] font-display">70</span>
            <span className="text-[11px] text-slate-500 font-mono uppercase font-bold tracking-wider">Machines</span>
            <p className="text-[11px] text-slate-600 font-normal">Stitching Units in Working Order</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
            <span className="block text-3xl font-extrabold text-[#0B3D3B] font-display">Press-Cut</span>
            <span className="text-[11px] text-slate-500 font-mono uppercase font-bold tracking-wider">Precision</span>
            <p className="text-[11px] text-slate-600 font-normal">State-of-the-Art Fitting System</p>
          </div>
        </div>

        {/* =========================================================================
            COMPLETE COMPANY PROFILE DOCUMENT BODY
           ========================================================================= */}
        <main id="company-profile-main" className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden divide-y divide-slate-100">
          
          {/* Header Banner */}
          <div className="bg-[#0B3D3B] text-white p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#D9F0EC] text-[#0B3D3B] text-[11px] font-mono font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>Letter of Introduction &amp; Corporate Profile</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Safety Line — Company Profile
              </h2>
              <p className="text-[#D9F0EC]/90 text-xs sm:text-sm font-normal leading-relaxed">
                Direct manufacturing facilities in Pakistan catering to international buyers, custom brand labeling, and global exports.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 print:hidden">
              <button
                onClick={handleCopyProfile}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 border border-white/15 shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Profile'}</span>
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white text-xs font-mono font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-md shadow-[#FF5A36]/30"
              >
                <span>Direct Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section 1: Introduction */}
          <section className="p-6 sm:p-10 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-lg bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-mono font-bold text-xs">
                01
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B3D3B]">
                Introduction
              </h3>
            </div>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal pl-0 sm:pl-11">
              We here at Safety Line are pleased to introduce ourselves as one of the leading international manufacturers &amp; exporters of Safety Protective gloves in all sorts and Garments. As a family owned business since 2008 we have been striving to provide the best quality workmanship to our customers, therefore we only employee experienced craftsman who excel at the art of leathercraft.
            </p>
          </section>

          {/* Section 2: Meeting Our Challenge */}
          <section className="p-6 sm:p-10 space-y-4 bg-slate-50/60">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-lg bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-mono font-bold text-xs">
                02
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B3D3B]">
                Meeting Our Challenge
              </h3>
            </div>
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal pl-0 sm:pl-11">
              <p>
                Quality products, customer service and customer satisfaction are our number one priority. Our commitment to quality and Service enables us to be able to ship products and make deliveries in a timely manner. Commitment and dedication has made us the quality choice for buyers worldwide. Our products are constructed from the finest available materials and assembled by some of the best leather workers in the industry. Our products are designed to meet any demands for performance, comfort and value. We boast a variety of styles and colors of all of our products offered.
              </p>
              <p>
                We customize all products in our manufacturing facilities for special needs and market conditions. Private labeling and custom logo printing and embroidery are available at low-cost prices. At Safety Line our priority is to meet and exceed our customer's expectations.
              </p>
            </div>
          </section>

          {/* Section 3: Your Own Designs & Brand Name */}
          <section className="p-6 sm:p-10 space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-lg bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-mono font-bold text-xs">
                03
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B3D3B]">
                Your Own Designs &amp; Brand Name
              </h3>
            </div>
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal pl-0 sm:pl-11">
              <p>
                For decades we have provided the highest standard of service to an international and culturally diverse loyal client base. Again, private labeling, custom logo printing and embroidery are offered since we fully appreciate that most customers have their own trademarked art and designs that they have developed in building their own individual brands.
              </p>
              <p>
                We commit to you that we will make your products according to your own specifications: <strong className="text-[#0B3D3B] font-bold">Brand names, Logos, Blister packing, Header cards, Hangtags etc.</strong>
              </p>
            </div>
          </section>

          {/* Section 4: Our Production Unit */}
          <section className="p-6 sm:p-10 space-y-4 bg-slate-50/60">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 rounded-lg bg-[#D9F0EC] text-[#0B3D3B] flex items-center justify-center font-mono font-bold text-xs">
                04
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0B3D3B]">
                Our Production Unit
              </h3>
            </div>
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-normal pl-0 sm:pl-11">
              <p>
                In our facility here in Pakistan alone, our company employs <strong className="text-[#0B3D3B] font-bold">Ninty (90) experienced craftsman</strong> working on a fulltime basis. We have <strong className="text-[#0B3D3B] font-bold">70-stitching machines</strong> in working order at our disposal as well as an outstanding selection of Safety protective materials and leather products. We use a state of the art press cutting system for the perfect fitting of any product we produce.
              </p>
              <p>
                We also have other facilities that we can sub-contract from for larger custom orders. For those of you who are not interested in private labeling we are able to offer you many other standard and in house designs that you may choose from.
              </p>
              <p>
                You can select any design according to your evaluation and approval. Our prices are very competitive and we guarantee quality workmanship and timely deliveries.
              </p>
            </div>
          </section>

          {/* Section 5: Letter of Closing & Direct Sourcing Invitation */}
          <section className="p-6 sm:p-10 space-y-6 bg-white">
            <div className="p-6 rounded-2xl bg-[#D9F0EC]/30 border border-[#0B3D3B]/20 space-y-4">
              <div className="flex items-center space-x-2 text-[#0B3D3B]">
                <ShieldCheck className="w-5 h-5 text-[#FF5A36]" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold">Summary &amp; Inquiry Invitation</span>
              </div>
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                Thanks for taking your time in reviewing the above content. We hope this letter of introduction has enlightened you a bit about our company, Safety Line. We hope that you will take advantage of our years of experience by furthering your inquiry. We are waiting to serve your quality buying needs.
              </p>
              <div className="pt-2 flex items-center justify-between flex-wrap gap-3 border-t border-[#0B3D3B]/10">
                <span className="font-display font-bold text-sm text-[#0B3D3B]">
                  Safety Line Management &amp; Production Team
                </span>
                <span className="font-mono text-xs text-slate-600">
                  Sialkot, Punjab, Pakistan
                </span>
              </div>
            </div>
          </section>

        </main>

        {/* Core Operational Capabilities Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono uppercase text-[#FF5A36] font-bold tracking-wider">Manufacturing Focus</span>
            <h3 className="font-display text-2xl font-extrabold text-[#0B3D3B]">
              Key Infrastructure &amp; Customization Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyHighlights.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                <div className="p-2.5 bg-[#D9F0EC] rounded-xl inline-block">
                  {item.icon}
                </div>
                <h4 className="font-display font-bold text-base text-[#0B3D3B]">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Factory Facility Photo Card */}
        <div className="rounded-3xl overflow-hidden shadow-xl relative border-4 border-white bg-slate-900 group">
          <div className="aspect-[21/9] sm:aspect-[24/9] w-full">
            <img
              src={factoryImg}
              alt="Safety Line Manufacturing Facility and Showroom, Sialkot, Pakistan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9F0EC] block font-bold">
                Direct Manufacturing Plant
              </span>
              <span className="text-sm sm:text-base font-semibold">
                Safety Line Industrial Complex, Sialkot, Pakistan
              </span>
            </div>
            <span className="px-3 py-1 rounded bg-[#25D366] text-xs font-mono text-white font-bold tracking-wider uppercase shadow-xs">
              Operational Facility
            </span>
          </div>
        </div>

        {/* Contact & Wholesale CTA Box */}
        <div className="bg-[#0B3D3B] text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl print:hidden">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D9F0EC] font-bold">
              Direct Wholesale &amp; Sourcing Inquiries
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Discuss Your Manufacturing Order?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Send us your specifications, sample requests, private labeling requirements, or tech packs. Our team responds promptly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Safety%20Line%20Management,%20I%20reviewed%20your%20Company%20Profile%20and%20would%20like%20to%20inquire%20about%20manufacturing.`}
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white font-mono font-bold text-xs px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Us (+92 3040000445)</span>
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="bg-[#FF5A36] hover:bg-[#e44e2b] text-white font-mono font-bold text-xs px-5 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-md shadow-[#FF5A36]/30 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Form &amp; RFQ</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-8 px-4 sm:px-8 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5A36]" />
            <span>Safety Line • Safety Protective Gloves &amp; Garments Manufacturers • Sialkot, Pakistan</span>
          </div>
          <div className="flex items-center space-x-4 uppercase font-bold">
            <button onClick={() => navigate('/')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Portal</button>
            <button onClick={() => navigate('/gearwear')} className="hover:text-[#FF5A36] transition-colors cursor-pointer">Gearwear</button>
            <button onClick={() => navigate('/accessories')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Accessories</button>
            <button onClick={() => scrollToSection('company-profile-main')} className="hover:text-[#FF5A36] transition-colors cursor-pointer">Company Profile</button>
            <button onClick={() => navigate('/contact')} className="hover:text-[#0B3D3B] transition-colors cursor-pointer">Contact Us</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
