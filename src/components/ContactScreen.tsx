/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Send,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface FormState {
  fullName: string;
  email: string;
  projectName: string;
  serviceCategory: string;
  estimatedBudget: string;
  messageBody: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  email: '',
  projectName: '',
  serviceCategory: 'Digital Engineering',
  estimatedBudget: '$10k - $25k',
  messageBody: ''
};

export default function ContactScreen() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});

  // FAQ active indexes
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const budgetOptions = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+'
  ];

  const categoryOptions = [
    'Digital Engineering',
    'Brand Storytelling',
    'Experiential UI/UX',
    'Strategic Architecture',
    'Marketing & SEO Growth'
  ];

  const FAQS = [
    {
      q: 'What is Deemvmedia’s standard project kickoff timeline?',
      a: 'Typically, once we complete the initial scope alignment and sign off on project deliverables, blueprint engineering starts in 5 to 7 business days.'
    },
    {
      q: 'Do you work with non-disclosure agreements (NDAs) at scoping?',
      a: 'Absolutely. We hold client confidentiality to extreme standard. We can co-sign modern secure NDAs before reviewing detailed backend parameters or intellectual property.'
    },
    {
      q: 'Will my team have direct access to lead engineers?',
      a: 'Yes. We run a lean organizational hierarchy. You will communicate directly with Devon Chen or your assigned lead visual architect, ensuring zero communication lag.'
    },
    {
      q: 'Do you offer ongoing web maintenance or hosting?',
      a: 'Yes, we curate custom edge hosting and server SLA guarantees, running automated uptime health checks and platform caching updates.'
    }
  ];

  const validateForm = (): boolean => {
    const errors: Partial<FormState> = {};
    if (!form.fullName.trim()) errors.fullName = 'Full name is required';
    if (!form.messageBody.trim()) errors.messageBody = 'Message cannot be empty';

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Please provide a valid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (formErrors[name as keyof FormState]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsSubmitting(false);
    }
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setForm(INITIAL_FORM);
    setSubmitSuccess(false);
    setFormErrors({});
  };

  return (
    <div id="contact-screen-root" className="w-full bg-transparent text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        {/* Header Title Grid */}
        <section id="contact-header-section" className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Let's Collaborate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Let's Create Something <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Extraordinary</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 font-sans text-base sm:text-lg leading-relaxed text-balance"
          >
            Whether you have a fully drafted PRD blueprint or just a seed concept written on a napkin, our visual engineering team is ready to unpack options.
          </motion.p>
        </section>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT: Contact Coordinates & Details */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-28">
            <div className="space-y-6">
              <h3 className="font-display text-white font-semibold text-lg tracking-wide">
                Direct Channels
              </h3>
              <p className="text-zinc-550 text-xs">
                Prefer direct messaging instead? Ping our mailbox or call directly during East Coast hours.
              </p>
            </div>

            <div className="space-y-5">
              <div className="bg-zinc-900/20 border border-zinc-900/60 p-5 rounded-xl flex items-start gap-4">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase text-zinc-550">Principal Studio</span>
                  <p className="text-xs text-zinc-300 font-sans mt-1">
                    Deemvmedia Studio, VGC<br />
                    Ajah, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="bg-zinc-900/20 border border-zinc-900/60 p-5 rounded-xl flex items-start gap-4">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase text-zinc-550">General Inquiry</span>
                  <a href="mailto:hello@deemvmedia.com" className="block text-xs text-zinc-300 font-sans hover:text-white transition-colors mt-1">
                    ceo@deemvmedia.com
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900/20 border border-zinc-900/60 p-5 rounded-xl flex items-start gap-4">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase text-zinc-550">Scoping Desk</span>
                  <span className="block text-xs text-zinc-300 font-sans mt-1">
                    +234 904 177 1909
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-900/60 pt-8">
              <div className="flex items-center gap-2 text-zinc-550">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest">Office active now</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form Frame */}
          <div className="lg:col-span-8 bg-zinc-900/40 p-6 sm:p-10 rounded-2xl border border-zinc-900">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  id="collaboration-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Marcus Aurelius"
                        className={`w-full bg-zinc-950 border ${formErrors.fullName ? 'border-rose-500/80 focus:border-rose-500' : 'border-zinc-850 focus:border-zinc-700'
                          } px-4 py-3 rounded-lg text-xs outline-none text-white font-sans transition-all`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[10px] text-rose-400 font-mono">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="e.g. you@company.com"
                        className={`w-full bg-zinc-950 border ${formErrors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-zinc-850 focus:border-zinc-700'
                          } px-4 py-3 rounded-lg text-xs outline-none text-white font-sans transition-all`}
                      />
                      {formErrors.email && (
                        <p className="text-[10px] text-rose-400 font-mono">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Nickname */}
                    <div className="space-y-2">
                      <label htmlFor="projectName" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        Project / Organization
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={form.projectName}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Platform V2"
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-4 py-3 rounded-lg text-xs outline-none text-white font-sans transition-all"
                      />
                    </div>

                    {/* Service Category Selection */}
                    <div className="space-y-2">
                      <label htmlFor="serviceCategory" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                        Focus Area
                      </label>
                      <select
                        id="serviceCategory"
                        name="serviceCategory"
                        value={form.serviceCategory}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-950 border border-zinc-850 focus:border-zinc-700 px-4 py-3 rounded-lg text-xs outline-none text-white font-sans transition-all"
                      >
                        {categoryOptions.map((opt, idx) => (
                          <option key={idx} value={opt} className="bg-zinc-950">{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                      Estimated Project Investment Budget
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((b) => {
                        const isS = form.estimatedBudget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm({ ...form, estimatedBudget: b })}
                            className={`px-3 py-2.5 text-[11px] font-mono rounded-lg border text-center transition-all cursor-pointer ${isS
                                ? 'bg-sky-500 border-sky-500 text-zinc-950 font-bold'
                                : 'bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                              }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="space-y-2">
                    <label htmlFor="messageBody" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                      Tell us about your objectives *
                    </label>
                    <textarea
                      id="messageBody"
                      name="messageBody"
                      rows={5}
                      value={form.messageBody}
                      onChange={handleInputChange}
                      placeholder="Briefly describe the features, targets, or specific visual narratives you require built..."
                      className={`w-full bg-zinc-950 border ${formErrors.messageBody ? 'border-rose-500/80 focus:border-rose-500' : 'border-zinc-850 focus:border-zinc-700'
                        } px-4 py-3 rounded-lg text-xs outline-none text-white font-sans transition-all resize-none`}
                    />
                    {formErrors.messageBody && (
                      <p className="text-[10px] text-rose-400 font-mono">{formErrors.messageBody}</p>
                    )}
                  </div>

                  {/* Form Submission Bar */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900/60">
                    <span className="text-[10px] font-mono text-zinc-500">
                      * Required informational coordinates.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 font-sans font-bold text-xs tracking-wider uppercase px-7 py-3.5 rounded-lg transition-all shadow-lg cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          Locking Message...
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        </>
                      ) : (
                        <>
                          Lock Strategic Brief
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Success Layout block */
                <motion.div
                  id="form-success-wrapper"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-center py-8"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white">Extraordinary Message Locked!</h3>

                  <p className="text-zinc-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                    Our principal partners have logged your project configuration. We will perform an initial competitive analysis of your sector and respond via <span className="text-white font-medium">{form.email}</span> within 8 business hours.
                  </p>

                  <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-850 max-w-md mx-auto text-left text-xs text-zinc-400 space-y-3">
                    <h4 className="font-mono text-[9px] uppercase tracking-wider text-zinc-550 border-b border-zinc-900 pb-2">Your Logged Specifications</h4>
                    <div><span className="text-zinc-550">Partner Name:</span> {form.fullName}</div>
                    <div><span className="text-zinc-550">Focus Area:</span> {form.serviceCategory}</div>
                    <div><span className="text-zinc-550">Budget Bracket:</span> {form.estimatedBudget}</div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-6 py-2.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs font-mono uppercase tracking-wide text-zinc-400 hover:text-white transition-all cursor-pointer border border-zinc-850"
                    >
                      Submit Secondary Brief
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* F.A.Q Section */}
        <section id="onboarding-faq-section" className="mt-32 border-t border-zinc-900/60 pt-24 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase font-semibold">
              Onboarding Q&A
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2">
              Frequently Asked Coordination Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  id={`faq-node-${idx}`}
                  key={idx}
                  className="bg-zinc-900/30 border border-zinc-900/80 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-900/40 select-none outline-none"
                  >
                    <span className="font-display font-medium text-white text-xs sm:text-sm flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-350 ${isOpen ? 'rotate-180 text-sky-400' : ''
                      }`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-5 pt-0 border-t border-zinc-900 text-xs md:text-sm text-zinc-400 leading-relaxed font-sans pl-11">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
