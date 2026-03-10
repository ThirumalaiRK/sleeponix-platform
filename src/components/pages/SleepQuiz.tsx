import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, RefreshCw, CheckCircle2, ChevronRight,
    Thermometer, Shuffle, Users, Star,
    Feather, Sliders, Lock,
    Shield, Award, ClipboardList, Stethoscope,
    FileText, Flame, Bone, AlarmClock, Zap,
} from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

import heaven from '../../assets/heaven.webp';
import spinerelax from '../../assets/spinerelax.webp';
import bliss from '../../assets/bliss.webp';
import cocoon from '../../assets/cocoon.webp';
import orthobed from '../../assets/orthobed.webp';
import pillow1 from '../../assets/pillow1.webp';
import spillow3 from '../../assets/spillow3.webp';
import curve3 from '../../assets/curve3.webp';

/* ── Brand colours ── */
const BRAND = '#1B4D3E';
const GOLD = '#C6A878';

/* ──────────────────────────────────────────────────────
   SLEEP POSITION SVGs  (side / back / stomach / combo)
   Simple inline SVGs so the icon ACTUALLY looks like the position
────────────────────────────────────────────────────── */
const SideSleeper = () => <svg viewBox="0 0 40 40" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="27" cy="10" r="4" /><path d="M27 14c-4 0-8 2-10 6l-3 6H6" /><path d="M14 26l-2 6" /><path d="M6 20h8" /></svg>;
const BackSleeper = () => <svg viewBox="0 0 40 40" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="20" cy="7" r="4" /><path d="M8 15h24" /><path d="M12 15v14" /><path d="M28 15v14" /><path d="M20 15v14" /><path d="M9 29h22" /></svg>;
const StomachSleeper = () => <svg viewBox="0 0 40 40" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="12" r="4" /><path d="M14 12h14c2 0 4 2 4 4v8" /><path d="M8 16v8" /><path d="M8 24h6" /><path d="M32 24h-6" /></svg>;
const ComboSleeper = () => <svg viewBox="0 0 40 40" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="20" cy="8" r="4" /><path d="M12 18h16" /><path d="M8 24l6-6" /><path d="M32 24l-6-6" /><path d="M8 24h24" /><path d="M14 32V24" /><path d="M26 32V24" /></svg>;

/* ── Question data with correctly matched icons ── */
const questions = [
    {
        id: 'bothersome',
        step: 1,
        category: 'Sleep Concern',
        heroIcon: Stethoscope,
        prompt: 'Let\'s identify your issue',
        question: 'What is your primary sleep concern?',
        subtitle: 'Select the symptom affecting your rest most significantly.',
        options: [
            {
                text: 'Chronic Back Pain',
                sub: 'Lower / upper back discomfort on waking',
                Icon: Bone,          /* spine = bone icon ✓ */
                value: 'back_pain',
            },
            {
                text: 'Neck & Shoulder Pain',
                sub: 'Stiffness or soreness after sleep',
                Icon: Zap,           /* pain signal = zap ✓ */
                value: 'neck_pain',
            },
            {
                text: 'Sleeping Hot',
                sub: 'Night sweats, heat retention',
                Icon: Flame,         /* heat = flame ✓ */
                value: 'hot',
            },
            {
                text: 'Tossing & Turning',
                sub: 'Restless, fragmented sleep',
                Icon: Shuffle,       /* restless movement = shuffle ✓ */
                value: 'tossing',
            },
            {
                text: 'Partner Disturbance',
                sub: 'Motion transfer waking you up',
                Icon: Users,         /* couple = users ✓ */
                value: 'motion',
            },
            {
                text: 'General Upgrade',
                sub: 'Want better quality sleep overall',
                Icon: Star,          /* upgrade = star ✓ */
                value: 'upgrade',
            },
        ],
    },
    {
        id: 'position',
        step: 2,
        category: 'Sleep Position',
        heroIcon: AlarmClock,
        prompt: 'How do you sleep?',
        question: 'What is your dominant sleeping position?',
        subtitle: 'Your posture determines the ideal pressure-relief and support profile.',
        options: [
            {
                text: 'Side Sleeper',
                sub: 'Lateral; shoulder & hip pressure points',
                Icon: SideSleeper,    /* custom SVG of side-lying person ✓ */
                value: 'side',
            },
            {
                text: 'Back Sleeper',
                sub: 'Supine; lumbar support is critical',
                Icon: BackSleeper,    /* custom SVG of back-lying person ✓ */
                value: 'back',
            },
            {
                text: 'Stomach Sleeper',
                sub: 'Prone; low-profile support needed',
                Icon: StomachSleeper, /* custom SVG of stomach-lying person ✓ */
                value: 'stomach',
            },
            {
                text: 'Combination Sleeper',
                sub: 'Shifts between positions overnight',
                Icon: ComboSleeper,   /* custom SVG of multi-position ✓ */
                value: 'combo',
            },
        ],
    },
    {
        id: 'firmness',
        step: 3,
        category: 'Firmness Profile',
        heroIcon: Sliders,
        prompt: 'One last question',
        question: 'What support feel do you prefer?',
        subtitle: 'Firmness affects spinal alignment, pressure relief, and longevity.',
        options: [
            {
                text: 'Plush — Soft',
                sub: 'Deep body-contouring, cloud-like comfort',
                Icon: Feather,   /* feather = light/soft ✓ */
                value: 'soft',
            },
            {
                text: 'Medium — Balanced',
                sub: 'Optimal for most body types & positions',
                Icon: Sliders,   /* sliders = balanced/adjustable ✓ */
                value: 'medium',
            },
            {
                text: 'Firm — Supportive',
                sub: 'Orthopedic support, minimal sink',
                Icon: Lock,      /* lock = firm/rigid ✓ */
                value: 'firm',
            },
        ],
    },
];

/* ── Recommendation engine ── */
function getRecommendation(answers: Record<string, string>) {
    let mattress = { name: 'Hevea Heaven', image: heaven, link: '/products/hevea-heaven', reason: '100% natural latex delivers adaptive support and breathability — ideal for most sleepers and positions.' };
    let pillow = { name: 'Standard Latex Pillow', image: pillow1, link: '/products/pillows/standard-latex-pillow', reason: 'Consistent loft with neutral spinal alignment — the balanced choice for back and all-position sleepers.' };

    const { bothersome, position, firmness } = answers;

    if (bothersome === 'back_pain')
        mattress = { name: 'Ortho', image: orthobed, link: '/products/ortho', reason: 'Orthopedic support layer reduces lumbar pressure and promotes correct spinal curvature through the night.' };
    else if (bothersome === 'neck_pain')
        mattress = { name: 'SpineRelax', image: spinerelax, link: '/products/spine-relax', reason: 'Dual-density zoning targets cervical & thoracic vertebrae for clinical-grade pressure relief.' };
    else if (bothersome === 'motion' || bothersome === 'tossing')
        mattress = { name: 'Cocoon', image: cocoon, link: '/products/cocoon', reason: 'Micro-cell latex absorbs motion transfer and reduces sleep disturbances for couples.' };
    else if (firmness === 'soft')
        mattress = { name: 'Bliss', image: bliss, link: '/products/bliss', reason: 'High-ILD plush latex conforms to body contours, distributing weight evenly for zero-pressure sleep.' };
    else if (firmness === 'firm')
        mattress = { name: 'Ortho', image: orthobed, link: '/products/ortho', reason: 'High-density rebonded core ensures long-term postural support with minimal compression or sag.' };
    else if (bothersome === 'hot')
        mattress = { name: 'Hevea Heaven', image: heaven, link: '/products/hevea-heaven', reason: 'Open-cell natural latex allows continuous airflow, regulating temperature throughout the night.' };

    if (bothersome === 'neck_pain')
        pillow = { name: 'Curves Latex Pillow', image: curve3, link: '/products/pillows/curves-latex-pillow', reason: 'Ergonomic cervical contour maintains ideal C-spine alignment and reduces morning stiffness.' };
    else if (position === 'side')
        pillow = { name: 'Curves Latex Pillow', image: curve3, link: '/products/pillows/curves-latex-pillow', reason: 'Raised lateral zone fills the shoulder-to-ear gap for neutral cervical alignment in side sleepers.' };
    else if (position === 'stomach')
        pillow = { name: 'Shredded Latex Pillow', image: spillow3, link: '/products/pillows/shredded-latex-pillow', reason: 'Adjustable fill allows minimal loft to prevent neck hyperextension in prone sleeping.' };
    else if (bothersome === 'hot')
        pillow = { name: 'Shredded Latex Pillow', image: spillow3, link: '/products/pillows/shredded-latex-pillow', reason: 'Shredded fill maximises airflow through the pillow core for superior thermoregulation.' };

    return { mattress, pillow };
}

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
const SleepQuiz: React.FC = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [showFloating, setShowFloating] = useState(true);

    useSEO({
        title: 'Sleep Assessment | Sleeponix — Find Your Perfect Mattress',
        description: 'Expert sleep assessment for a clinically matched mattress & pillow recommendation — personalised to your position, symptoms, and firmness preference.',
        keywords: 'sleep assessment, best mattress quiz, mattress recommendation India, personalised mattress',
        canonicalPath: '/find-match',
    });

    /* Hide floating prompt after 4 s */
    useEffect(() => {
        const t = setTimeout(() => setShowFloating(false), 4000);
        return () => clearTimeout(t);
    }, [step]);

    const q = questions[step];
    const HeroIcon = q.heroIcon;

    const handleSelect = (value: string) => {
        setSelected(value);
        setTimeout(() => {
            const next = { ...answers, [q.id]: value };
            setAnswers(next);
            setSelected(null);
            setShowFloating(true);           // reset float for next step
            if (step < questions.length - 1) setStep(step + 1);
            else setShowResults(true);
        }, 280);
    };

    const reset = () => {
        setAnswers({}); setStep(0); setShowResults(false);
        setSelected(null); setShowFloating(true);
    };

    const rec = showResults ? getRecommendation(answers) : null;

    return (
        <div className="min-h-screen" style={{ background: '#F4F6F3' }}>

            {/* ══ HERO ══ */}
            <section
                className="relative overflow-hidden pt-28 pb-16"
                style={{ background: `linear-gradient(135deg,${BRAND} 0%,#153d30 100%)` }}
            >
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 1px,transparent 48px)' }} />
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
                    style={{ background: `${GOLD}18`, filter: 'blur(60px)' }} />

                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 mb-7"
                        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
                        <Stethoscope size={13} style={{ color: GOLD }} />
                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: GOLD }}>Expert Sleep Assessment</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="font-serif font-bold text-white leading-tight mb-4"
                        style={{ fontSize: 'clamp(2rem,5vw,3.25rem)' }}>
                        Find Your Clinically<br />
                        <span style={{ color: GOLD }}>Matched Mattress</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
                        className="text-white/65 max-w-lg mx-auto mb-10"
                        style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', lineHeight: 1.7 }}>
                        A 3-step evidence-based assessment personalised to your sleep position, symptoms, and comfort preference.
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                        className="flex flex-wrap justify-center gap-6">
                        {[
                            { I: Shield, l: '100% Natural Latex' },
                            { I: Award, l: 'Orthopaedic Endorsed' },
                            { I: ClipboardList, l: '3-Step Assessment' },
                        ].map(({ I, l }) => (
                            <div key={l} className="flex items-center gap-2">
                                <I size={14} style={{ color: GOLD }} />
                                <span className="text-white/55 text-sm">{l}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ BODY ══ */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

                {!showResults && (
                    <>
                        {/* ── Mobile floating prompt ── */}
                        <AnimatePresence>
                            {showFloating && (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: -18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -18 }}
                                    transition={{ duration: 0.35 }}
                                    className="flex sm:hidden items-center gap-3 rounded-2xl mb-4 px-5 py-4 shadow-lg"
                                    style={{ background: BRAND }}
                                >
                                    {/* Pulsing icon ring */}
                                    <div className="relative flex-shrink-0">
                                        <motion.div
                                            animate={{ scale: [1, 1.35, 1] }}
                                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                            className="absolute inset-0 rounded-full"
                                            style={{ background: `${GOLD}40` }}
                                        />
                                        <div className="relative w-11 h-11 rounded-full flex items-center justify-center"
                                            style={{ background: GOLD }}>
                                            <HeroIcon size={20} color="#fff" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm leading-tight">{q.prompt}</p>
                                        <p className="text-white/60 text-xs mt-0.5">Step {step + 1} of {questions.length} — tap an option below</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Quiz card ── */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">

                            {/* Card top bar */}
                            <div className="px-6 sm:px-8 py-4 flex items-center justify-between gap-4"
                                style={{ background: BRAND }}>
                                <div className="flex items-center gap-2">
                                    {questions.map((_, i) => (
                                        <React.Fragment key={i}>
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-400"
                                                style={{
                                                    background: i < step ? GOLD : i === step ? '#fff' : 'rgba(255,255,255,0.15)',
                                                    color: i < step ? '#fff' : i === step ? BRAND : 'rgba(255,255,255,0.4)',
                                                }}>
                                                {i < step ? <CheckCircle2 size={14} /> : String(i + 1).padStart(2, '0')}
                                            </div>
                                            {i < questions.length - 1 && (
                                                <div className="w-5 h-px flex-shrink-0"
                                                    style={{ background: i < step ? GOLD : 'rgba(255,255,255,0.2)' }} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase"
                                    style={{ color: GOLD }}>
                                    <HeroIcon size={13} /> {q.category}
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 w-full bg-gray-100">
                                <motion.div className="h-full" style={{ background: GOLD }}
                                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                    transition={{ duration: 0.45, ease: 'easeInOut' }} />
                            </div>

                            {/* Question body */}
                            <div className="px-5 sm:px-8 pt-7 pb-5">
                                <AnimatePresence mode="wait">
                                    <motion.div key={step}
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.26 }}>

                                        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: GOLD }}>
                                            Question {step + 1} of {questions.length}
                                        </p>
                                        <h2 className="font-serif font-bold text-xl sm:text-2xl mb-1" style={{ color: BRAND }}>
                                            {q.question}
                                        </h2>
                                        <p className="text-gray-400 text-sm mb-6">{q.subtitle}</p>

                                        {/* Options — 1 col on mobile, 2 col on sm+ */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                            {q.options.map((opt) => {
                                                const isActive = selected === opt.value;
                                                return (
                                                    <button key={opt.value} onClick={() => handleSelect(opt.value)}
                                                        className="flex items-center gap-3 rounded-xl border-2 w-full text-left transition-all duration-250 focus:outline-none"
                                                        style={{
                                                            padding: '13px 14px',
                                                            borderColor: isActive ? BRAND : '#E4E7E4',
                                                            background: isActive ? BRAND : '#FAFAFA',
                                                            transform: isActive ? 'scale(0.975)' : 'scale(1)',
                                                            boxShadow: isActive ? `0 4px 18px ${BRAND}28` : '0 1px 2px rgba(0,0,0,0.05)',
                                                        }}>

                                                        {/* Icon box */}
                                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-250"
                                                            style={{ background: isActive ? 'rgba(255,255,255,0.18)' : '#EEF3F0' }}>
                                                            <opt.Icon /* works for both Lucide + custom SVGs */
                                                                size={isActive ? undefined : undefined}
                                                                style={{ color: isActive ? '#fff' : BRAND, width: 18, height: 18 }}
                                                            />
                                                        </div>

                                                        {/* Label + sub-label */}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-sm leading-tight truncate"
                                                                style={{ color: isActive ? '#fff' : BRAND }}>
                                                                {opt.text}
                                                            </p>
                                                            <p className="text-xs mt-0.5 leading-snug"
                                                                style={{ color: isActive ? 'rgba(255,255,255,0.62)' : '#A0ABA5' }}>
                                                                {opt.sub}
                                                            </p>
                                                        </div>

                                                        <ChevronRight size={14} className="flex-shrink-0"
                                                            style={{
                                                                color: isActive ? 'rgba(255,255,255,0.55)' : '#D1D5DB',
                                                                transform: isActive ? 'translateX(2px)' : 'none',
                                                                transition: 'all 0.25s',
                                                            }} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Card footer */}
                            <div className="px-5 sm:px-8 py-3.5 border-t border-gray-100 flex items-center gap-2">
                                <Shield size={12} className="flex-shrink-0" style={{ color: BRAND }} />
                                <p className="text-xs text-gray-400">
                                    Your responses are used only to generate your recommendation. No data is stored.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}

                {/* ══ RESULTS ══ */}
                {showResults && rec && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">

                        {/* Report header */}
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
                            <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                                style={{ background: `linear-gradient(135deg,${BRAND} 0%,#153d30 100%)` }}>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText size={13} style={{ color: GOLD }} />
                                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: GOLD }}>
                                            Sleep Assessment Report
                                        </span>
                                    </div>
                                    <h2 className="font-serif font-bold text-white text-2xl sm:text-3xl mb-1">
                                        Your Expert Recommendation
                                    </h2>
                                    <p className="text-white/55 text-sm">Based on your symptoms, sleep position, and firmness preference.</p>
                                </div>
                                <div className="flex-shrink-0 rounded-xl px-5 py-3 text-center border border-white/20"
                                    style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', minWidth: 100 }}>
                                    <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: GOLD }}>Match</p>
                                    <p className="text-white font-bold text-3xl leading-tight">98<span className="text-base">%</span></p>
                                </div>
                            </div>

                            {/* Answer summary */}
                            <div className="px-5 sm:px-8 py-3 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-x-6 gap-y-2">
                                {Object.entries(answers).map(([key, val]) => {
                                    const qObj = questions.find(x => x.id === key);
                                    const optObj = qObj?.options.find(o => o.value === val);
                                    return (
                                        <div key={key} className="flex items-center gap-1.5">
                                            <CheckCircle2 size={11} style={{ color: BRAND }} />
                                            <span className="text-xs font-semibold text-gray-600">{qObj?.category}:</span>
                                            <span className="text-xs text-gray-400">{optObj?.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Product cards */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            {/* Mattress */}
                            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={rec.mattress.image} alt={rec.mattress.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-bold"
                                        style={{ background: BRAND }}>
                                        <Award size={10} /> Matched Mattress
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: GOLD }}>Natural Latex Mattress</p>
                                    <h3 className="font-serif font-bold text-xl mb-3" style={{ color: BRAND }}>{rec.mattress.name}</h3>
                                    <div className="rounded-xl px-4 py-3 mb-5 border-l-4 flex-1"
                                        style={{ background: '#F4FAF6', borderColor: BRAND }}>
                                        <p className="text-xs font-bold uppercase tracking-wide mb-1 text-gray-400">Clinical Rationale</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{rec.mattress.reason}</p>
                                    </div>
                                    <Link to={rec.mattress.link}
                                        className="flex items-center justify-center gap-2 rounded-xl py-3 text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                        style={{ background: BRAND }}>
                                        View Mattress <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Pillow */}
                            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="relative h-52 overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={rec.pillow.image} alt={rec.pillow.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white text-xs font-bold"
                                        style={{ background: GOLD }}>
                                        <Award size={10} /> Matched Pillow
                                    </div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: GOLD }}>Natural Latex Pillow</p>
                                    <h3 className="font-serif font-bold text-xl mb-3" style={{ color: BRAND }}>{rec.pillow.name}</h3>
                                    <div className="rounded-xl px-4 py-3 mb-5 border-l-4 flex-1"
                                        style={{ background: '#FBF7F1', borderColor: GOLD }}>
                                        <p className="text-xs font-bold uppercase tracking-wide mb-1 text-gray-400">Clinical Rationale</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{rec.pillow.reason}</p>
                                    </div>
                                    <Link to={rec.pillow.link}
                                        className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border-2 transition-all duration-200"
                                        style={{ borderColor: BRAND, color: BRAND }}
                                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = BRAND; el.style.color = '#fff'; }}
                                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = BRAND; }}
                                    >
                                        View Pillow <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="rounded-xl border border-gray-200 bg-white px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex gap-3 flex-1">
                                <Shield size={16} className="flex-shrink-0 mt-0.5" style={{ color: BRAND }} />
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    This recommendation is generated algorithmically based on sleep science research. For persistent medical conditions, consult a healthcare professional. All Sleeponix products carry a 5–10 year warranty.
                                </p>
                            </div>
                            <button onClick={reset}
                                className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2 border border-gray-200 transition-colors hover:border-gray-400"
                                style={{ color: BRAND }}>
                                <RefreshCw size={13} /> Retake
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SleepQuiz;
