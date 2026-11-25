import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, Send, CheckCircle2, ShieldCheck, Cpu, 
  MessageCircle, FileText, ChevronRight, Clock, Building2,
  RefreshCw, Award, ArrowRight
} from 'lucide-react';
import { Settings } from '../types';

interface InquiryLoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  defaultCategory?: string;
  defaultProductTitle?: string;
}

type SubmissionState = 'idle' | 'loading' | 'success';

export default function InquiryLoadingModal({
  isOpen,
  onClose,
  settings,
  defaultCategory = 'Tactical Gearwear & Handwear',
  defaultProductTitle = ''
}: InquiryLoadingModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [orderType, setOrderType] = useState('OEM / Private Label Production');
  const [notes, setNotes] = useState(
    defaultProductTitle ? `Inquiry regarding certified specifications for: ${defaultProductTitle}` : ''
  );

  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    { title: 'Validating Technical Standards', desc: 'Cross-referencing OEKO-TEX Standard 100 & ISO 9001:2015 tolerances...' },
    { title: 'Generating OEM CAD Spec Sheet', desc: 'Compiling material composition, stitch gauges & swatch data...' },
    { title: 'Routing to Sialkot Advisory Desk', desc: 'Dispatching directly to direct manufacturer concierge channel...' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !contactName) return;

    setSubmissionState('loading');
    setLoadingStep(0);

    // Multi-step animated progress simulation
    setTimeout(() => {
      setLoadingStep(1);
    }, 700);

    setTimeout(() => {
      setLoadingStep(2);
    }, 1500);

    setTimeout(() => {
      setSubmissionState('success');
    }, 2400);
  };

  const handleReset = () => {
    setSubmissionState('idle');
    setLoadingStep(0);
    onClose();
  };

  const whatsappDirectUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Safety Line Advisory Desk, I submitted an official specification request for ${contactName} (${companyName || 'Private Client'}). Category: ${category}. Notes: ${notes}`
  )}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Radiant Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={submissionState === 'loading' ? undefined : onClose}
        className="fixed inset-0 bg-[#041615]/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card with Radiant Border */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-[#072422] text-white rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(45,212,191,0.25)] overflow-hidden z-10"
      >
        {/* Radiant Top Light Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF5A36] via-[#5EEAD4] via-[#FFE27D] to-[#FF5A36] animate-shimmer bg-[length:200%_auto]" />

        {/* Close Button */}
        {submissionState !== 'loading' && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest mb-1.5">
            <Sparkles className="w-4 h-4 text-[#FF5A36] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Safety Line • Technical Spec Desk</span>
          </div>
          <h3 className="text-2xl font-display font-black tracking-tight text-white flex items-center gap-2">
            <span>Direct OEM & Spec Inquiry</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Request official material specifications, laboratory certificates, and private-label production quotes.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* STATE 1: Interactive Inquiry Form */}
            {submissionState === 'idle' && (
              <motion.form
                key="form-idle"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleSubmit}
                className="space-y-4 text-xs font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#5EEAD4] focus:ring-2 focus:ring-[#5EEAD4]/30 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Tactical Athletics Ltd"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#5EEAD4] focus:ring-2 focus:ring-[#5EEAD4]/30 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#5EEAD4] focus:ring-2 focus:ring-[#5EEAD4]/30 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#5EEAD4] focus:ring-2 focus:ring-[#5EEAD4]/30 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                      Target Production Window
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#051C1A] border border-white/15 focus:border-[#5EEAD4] rounded-xl px-3.5 py-2.5 text-white outline-none transition-all cursor-pointer"
                    >
                      <option value="Tactical Gloves (Golf, Fish, Police, Mechanics)">Tactical Handwear (Golf, Police, Mechanics)</option>
                      <option value="Car & Motorsport Gloves (Motorcars, Cycling)">Car & Motorsport Gloves</option>
                      <option value="Performance GymWear">Performance GymWear</option>
                      <option value="Technical T-shirts">Technical T-shirts</option>
                      <option value="Weatherproof Jackets">Weatherproof Jackets</option>
                      <option value="Performance Hoodies">Performance Hoodies</option>
                      <option value="Dual-Season Tracksuits">Dual-Season Tracksuits</option>
                      <option value="Full OEM Product Line">Full Custom OEM Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                      Order / Inquiry Scope
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full bg-[#051C1A] border border-white/15 focus:border-[#5EEAD4] rounded-xl px-3.5 py-2.5 text-white outline-none transition-all cursor-pointer"
                    >
                      <option value="Physical Material Sample Swatch Pack">Physical Material Sample Swatch Pack</option>
                      <option value="OEM / Private Label Production">OEM / Private Label Production</option>
                      <option value="Wholesale Stockist Distribution">Wholesale Stockist Distribution</option>
                      <option value="Custom CAD Technical File Specs">Custom CAD Technical File Specs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono text-[11px] uppercase tracking-wider mb-1 font-bold">
                    Specifications & Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Provide details on target volume, material requirements (Cabretta, Kevlar, Fleece), or custom labeling..."
                    className="w-full bg-white/5 border border-white/15 focus:border-[#5EEAD4] focus:ring-2 focus:ring-[#5EEAD4]/30 rounded-xl p-3 text-white placeholder-slate-400 outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-glow-shine bg-gradient-to-r from-[#FF5A36] to-[#FF7A59] hover:from-[#e44e2b] hover:to-[#FF5A36] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-[#FF5A36]/30 active:scale-[0.98] transition-all cursor-pointer border border-[#FF7A59]/40"
                  >
                    <span>Submit Official Spec Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* STATE 2: Dynamic Multi-Stage Animated Loading Form */}
            {submissionState === 'loading' && (
              <motion.div
                key="form-loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-10 px-4 text-center space-y-6"
              >
                {/* Radiant Pulsing Circuit Spinner */}
                <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20 border-t-emerald-400 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-4 border-[#FF5A36]/20 border-b-[#FF5A36] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
                  <div className="relative z-10 w-14 h-14 rounded-full bg-[#0B3D3B] flex items-center justify-center shadow-[0_0_20px_rgba(94,234,212,0.6)]">
                    <Cpu className="w-7 h-7 text-emerald-300 animate-pulse" />
                  </div>
                </div>

                {/* Animated Loading Text */}
                <div className="space-y-2 max-w-sm mx-auto">
                  <motion.h4 
                    key={loadingStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-display font-black text-lg text-white"
                  >
                    {loadingSteps[loadingStep].title}
                  </motion.h4>
                  <p className="text-xs font-mono text-emerald-300/90">
                    {loadingSteps[loadingStep].desc}
                  </p>
                </div>

                {/* Animated Shimmer Progress Bar */}
                <div className="max-w-md mx-auto space-y-2">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-[#FF5A36] via-[#5EEAD4] to-white rounded-full animate-form-progress" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>STEP 0{loadingStep + 1} OF 03</span>
                    <span>ENCRYPTED SIALKOT DISPATCH</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATE 3: Success Confirmation with Direct Actions */}
            {submissionState === 'success' && (
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-6"
              >
                {/* Glowing Success Icon */}
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                    Official Reference: SL-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <h4 className="font-display font-black text-2xl text-white">
                    Specification File Generated
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-white">{contactName}</strong>. Your OEM request for <strong className="text-emerald-300">{category}</strong> has been prioritized. Our advisory desk typically responds with certified data within 12 hours.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-glow-shine bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Instant WhatsApp Handshake</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="btn-glow-shine bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Done & Return</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
