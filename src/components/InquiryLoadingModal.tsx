import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Send, CheckCircle2, MessageCircle
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
  const [referenceCode, setReferenceCode] = useState('');

  useEffect(() => {
    setCategory(defaultCategory);
    setNotes(defaultProductTitle ? `Inquiry regarding certified specifications for: ${defaultProductTitle}` : '');
  }, [defaultCategory, defaultProductTitle, isOpen]);

  const loadingSteps = [
    { title: 'Validating Technical Standards', desc: 'Cross-referencing OEKO-TEX Standard 100 & ISO 9001:2015 tolerances...' },
    { title: 'Compiling OEM Specification File', desc: 'Preparing material composition, stitch gauges & swatch parameters...' },
    { title: 'Routing to Sialkot Advisory Desk', desc: 'Preparing direct handover for manufacturing specialist review...' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !contactName) return;

    setReferenceCode(`SL-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmissionState('loading');
    setLoadingStep(0);

    setTimeout(() => setLoadingStep(1), 650);
    setTimeout(() => setLoadingStep(2), 1400);
    setTimeout(() => setSubmissionState('success'), 2200);
  };

  const handleReset = () => {
    setSubmissionState('idle');
    setLoadingStep(0);
    onClose();
  };

  const whatsappDirectUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Safety Line Advisory Desk, I submitted an official specification request (${referenceCode || 'NEW'}) for ${contactName} (${companyName || 'Private Client'}). Category: ${category}. Notes: ${notes}`
  )}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.16 }}
        onClick={submissionState === 'loading' ? undefined : onClose}
        className="fixed inset-0 bg-[#0E1A19]/75 backdrop-blur-xs"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-white text-[#141918] rounded-sm border border-[#E2DFD7] shadow-2xl overflow-hidden z-10"
      >
        <div className="h-1 w-full bg-[#D92227]" />

        {submissionState !== 'loading' && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-sm text-[#525957] hover:text-[#141918] hover:bg-[#F7F6F2] transition-colors cursor-pointer z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8 pb-5 border-b border-[#E2DFD7] bg-[#F7F6F2]">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-[#D92227] block mb-1.5">
            Safety Line · OEM Specification Desk
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-[#141918]">
            Direct OEM &amp; Sample Inquiry
          </h3>
          <p className="text-xs text-[#525957] mt-1">
            Request material specifications, laboratory compliance sheets, and private-label quotes.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {submissionState === 'idle' && (
              <motion.form
                key="form-idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4 text-xs font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-[#141918] placeholder-[#8A908E] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                      Company / Brand Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Tactical Athletics Ltd"
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-[#141918] placeholder-[#8A908E] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-[#141918] placeholder-[#8A908E] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-[#141918] placeholder-[#8A908E] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                      Production Line
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-[#141918] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Tactical Gloves (Golf, Fish, Police, Mechanics)">Tactical Handwear (Golf, Police, Mechanics)</option>
                      <option value="Car & Motorsport Gloves (Motorcars, Cycling)">Car &amp; Motorsport Gloves</option>
                      <option value="Performance GymWear">Performance GymWear</option>
                      <option value="Technical T-shirts">Technical T-shirts</option>
                      <option value="Weatherproof Jackets">Weatherproof Jackets</option>
                      <option value="Performance Hoodies">Performance Hoodies</option>
                      <option value="Dual-Season Tracksuits">Dual-Season Tracksuits</option>
                      <option value="Full OEM Product Line">Full Custom OEM Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                      Inquiry Scope
                    </label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm px-3.5 py-2.5 text-[#141918] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Physical Material Sample Swatch Pack">Physical Material Sample Swatch Pack</option>
                      <option value="OEM / Private Label Production">OEM / Private Label Production</option>
                      <option value="Wholesale Stockist Distribution">Wholesale Stockist Distribution</option>
                      <option value="Custom CAD Technical File Specs">Custom CAD Technical File Specs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#525957] font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                    Specifications &amp; Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Provide target volume, material requirements (Cabretta, Kevlar, Fleece), or custom branding notes..."
                    className="w-full bg-[#F7F6F2] border border-[#E2DFD7] focus:border-[#141918] focus:bg-white rounded-sm p-3 text-[#141918] placeholder-[#8A908E] outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#D92227] hover:bg-[#B5191D] text-white font-semibold text-xs uppercase tracking-[0.12em] py-3.5 px-6 rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Submit Specification Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            )}

            {submissionState === 'loading' && (
              <motion.div
                key="form-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 px-4 text-center space-y-6"
              >
                <div className="space-y-2 max-w-sm mx-auto">
                  <span className="text-[11px] font-mono font-semibold text-[#D92227] uppercase tracking-widest tabular-nums">
                    Step 0{loadingStep + 1} of 03
                  </span>
                  <h4 className="font-display font-bold text-lg text-[#141918]">
                    {loadingSteps[loadingStep].title}
                  </h4>
                  <p className="text-xs text-[#525957]">
                    {loadingSteps[loadingStep].desc}
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <div className="h-1.5 w-full bg-[#ECE9E1] rounded-sm overflow-hidden">
                    <div className="h-full bg-[#122B29] animate-form-progress" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#525957] uppercase tracking-wider">
                    <span>ISO 9001:2015</span>
                    <span>Sialkot Manufacturing Desk</span>
                  </div>
                </div>
              </motion.div>
            )}

            {submissionState === 'success' && (
              <motion.div
                key="form-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 text-center space-y-6"
              >
                <div className="w-14 h-14 mx-auto rounded-sm bg-[#ECE9E1] text-[#122B29] flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D92227] tabular-nums">
                    Reference: {referenceCode}
                  </span>
                  <h4 className="font-display font-bold text-2xl text-[#141918]">
                    Specification File Prepared
                  </h4>
                  <p className="text-xs text-[#525957] leading-relaxed">
                    Thank you, <strong className="text-[#141918]">{contactName}</strong>. Your OEM inquiry for <strong className="text-[#141918]">{category}</strong> is ready. Connect directly via WhatsApp for immediate material confirmation.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#122B29] hover:bg-[#0E1A19] text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-4 rounded-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-[#ECE9E1] hover:bg-[#E2DFD7] text-[#141918] font-semibold text-xs uppercase tracking-wider py-3.5 px-5 rounded-sm transition-colors cursor-pointer"
                  >
                    Done
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
