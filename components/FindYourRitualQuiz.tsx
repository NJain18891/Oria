'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  ShoppingBag, 
  CheckCircle, 
  Flame, 
  Dumbbell, 
  Coffee, 
  Sun, 
  X, 
  Sliders
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Question {
  id: number;
  title: string;
  subTitle: string;
  options: {
    label: string;
    value: string;
    description: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    bgImage: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "How does your body typically enter the morning?",
    subTitle: "Select your morning baseline.",
    options: [
      {
        label: "Intense Training",
        value: "physical",
        description: "Heavy athletic output.",
        icon: Dumbbell,
        bgImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop",
      },
      {
        label: "Cognitive Focus",
        value: "cognitive",
        description: "Deep mental output.",
        icon: Coffee,
        bgImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400&auto=format&fit=crop",
      },
      {
        label: "Mindful Warmup",
        value: "mindful",
        description: "Quiet, restorative entry.",
        icon: Sun,
        bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop",
      }
    ]
  },
  {
    id: 2,
    title: "What represents your optimal morning workflow?",
    subTitle: "Select your preparation window.",
    options: [
      {
        label: "Grab & Go",
        value: "grab",
        description: "Zero prep time.",
        icon: Sparkles,
        bgImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop",
      },
      {
        label: "Quick Blend",
        value: "shake",
        description: "Under 30 seconds.",
        icon: Flame,
        bgImage: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=400&auto=format&fit=crop",
      }
    ]
  },
  {
    id: 3,
    title: "Choose your primary physiological focus.",
    subTitle: "What is your main biological goal?",
    options: [
      {
        label: "Sustained Energy",
        value: "glycemic",
        description: "No sugar crash.",
        icon: Sparkles,
        bgImage: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=400&auto=format&fit=crop",
      },
      {
        label: "Stress Defense",
        value: "stress",
        description: "Maintain calm focus.",
        icon: Coffee,
        bgImage: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=400&auto=format&fit=crop",
      },
      {
        label: "Deep Hydration",
        value: "hydration",
        description: "Restore trace minerals.",
        icon: Dumbbell,
        bgImage: "https://plus.unsplash.com/premium_photo-1661512226839-c421e047b86f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGRyaW5raW5nJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D",
      }
    ]
  }
];

interface QuizRecommendation {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  sizeDesc: string;
  description: string;
  image: string;
  video?: string;
  nutrients: { label: string; val: string }[];
  accentText: string;
  urgencyTag?: string;

  matchReason: string;
}

// 1. SYNCED PRODUCT CATALOG
const PRODUCTS_MAP: Record<string, QuizRecommendation> = {
  bar: {
    id: 'oria-morning-fuel-bar',
    name: 'ORIA Morning Fuel Bar',
    subtitle: 'Ancient Millet & Cardamom Pods',
    price: 28,
    sizeDesc: 'Box of 12 Gourmet Bars',
    description: 'A dense, satisfying solid bar combining rolled organic millet grains, cold-extracted almond oil, raw botanical lavender, and wild honey.',
    image: "/Millet Product Photo.png",
    video: "/Millet Product vid.mp4",
    nutrients: [{ label: 'Whole Protein', val: '15g' },
        { label: 'Dietary Fiber', val: '6g' },
        { label: 'Insulin Impact', val: 'Minimal' }],
    accentText: 'Most Popular',
    urgencyTag: 'Limited Harvest',
    matchReason: 'A slow-digesting, slow-release fiber structure that prevents mid-morning cognitive fatigue and keeps your glucose stable.'
  },
  shake: {
    id: 'oria-rise-blend-shake',
      name: 'Rise Blend Shake',
      subtitle: 'Cardamom Vanilla & Ashwagandha',
      price: 34,
      sizeDesc: '15 Servings Recyclable Jar',
      description: 'Sleek botanical shake formulation featuring 10 ancient whole millet species supercharged with adaptogens to manage stress and sustain energy.',
      image: "/Millet Shake Photo.png",
      video: "/Millet Shake vid.mp4",
      accentText: 'Wellness Pick',
      urgencyTag: 'Low Stock - 14 Jars Left',
      nutrients: [
        { label: 'Organic Protein', val: '22g' },
        { label: 'Active Adaptogen', val: '600mg' },
        { label: 'Prebiotic Fibers', val: '4g' }
      ],
    matchReason: 'Crafted with essential adaptogens and sustainable protein to naturally control stress while providing clean energy.'
  },
  shards: {
    id: 'oria-millet-shards',
      name: 'Ancient Grain Shards',
      subtitle: 'Smoked Sea Salt & Toasted Cumin',
      price: 28,
      sizeDesc: 'Box of 6 Stay-Fresh Pouches',
      description: 'Stone-ground millet and popped grain crisps, light baked in cold-pressed avocado oil and finished with a pinch of fire-smoked hand-harvested sea salt.',
      image: "/Millet Crackers Photo.png",
      video: "/Millet Crackers vid.mp4",
      accentText: 'Best Seller',
      urgencyTag: 'Stone-Ground Harvest',
      nutrients: [
        { label: 'Slow Carbs / Fiber', val: '5g' },
        { label: 'Plant Protein', val: '6g' },
        { label: 'Trans-Fats / Sugars', val: '0g' }
      ],
    matchReason: 'Instantly delivers essential sea salt minerals and easily absorbable slow carbs to support physical replenishment and deep hydration balance.'
  }
};

function ConfettiEffect() {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; color: string; isRound: boolean; rotateTarget: number }>>([]);
  
  React.useEffect(() => {
    let active = true;
    const timeoutId = setTimeout(() => {
      if (!active) return;
      const rawPieces = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.2 + Math.random() * 2.5,
        size: 6 + Math.random() * 9,
        color: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#D0CD94'][Math.floor(Math.random() * 7)],
        isRound: Math.random() > 0.45,
        rotateTarget: 360 + Math.random() * 360,
      }));
      setPieces(rawPieces);
    }, 0);

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 1, 
            y: -20, 
            x: `${p.left}%`, 
            rotate: 0, 
            scale: 0.8 
          }}
          animate={{ 
            opacity: [1, 1, 0.8, 0],
            y: '100%', 
            rotate: p.rotateTarget,
            scale: [0.8, 1.2, 0.9, 0.5]
          }}
          transition={{ 
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
          className={`absolute ${p.isRound ? 'rounded-full' : 'rounded-sm'}`}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            top: -10,
          }}
        />
      ))}
    </div>
  );
}

const playChime = (type: 'navigate' | 'complete') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'navigate') {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.08, now + 0.04);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.32);
    } else if (type === 'complete') {
      const now = ctx.currentTime;
      const freqs = [659.25, 783.99, 987.77, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.62);
      });
    }
  } catch (err) {
    console.warn('Audio context playback failed:', err);
  }
};

export default function FindYourRitualQuiz() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0); 
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [addedPrompt, setAddedPrompt] = useState<boolean>(false);

  const startQuiz = () => {
    setCurrentStep(1);
    setAnswers({});
    setAddedPrompt(false);
    playChime('navigate');
  };

  const handleSelectOption = (questionId: number, val: string) => {
    const updated = { ...answers, [questionId]: val };
    setAnswers(updated);
    
    const nextStep = currentStep + 1;
    if (nextStep === 4) {
      playChime('complete');
    } else {
      playChime('navigate');
    }

    setTimeout(() => {
      setCurrentStep(nextStep);
    }, 250);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      playChime('navigate');
    }
  };

  // 2. UPDATED RECOMMENDATION ENGINE
  const calculateRecommendation = (): QuizRecommendation => {
    const energyStyle = answers[1]; 
    const flowStyle = answers[2];   
    const mainGoal = answers[3];    

    if (flowStyle === 'grab') {
      return PRODUCTS_MAP.bar;
    }
    // Updated to map "hydration" or "physical" directly to the new Shards product
    if (energyStyle === 'physical' || mainGoal === 'hydration') {
      return PRODUCTS_MAP.shards;
    }
    
    return PRODUCTS_MAP.shake;
  };

  const recommendedProduct = calculateRecommendation();

  const getSelectedLabel = (questionId: number): string => {
    const val = answers[questionId];
    if (!val) return '';
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    const option = question?.options.find(o => o.value === val);
    return option ? option.label : '';
  };

  return (
    <>
      <div 
        id="oria-quiz-chatbot-launcher"
        className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-45"
      >
        <button
          onClick={() => {
            setIsOpen(true);
            setCurrentStep(0); 
            setAnswers({});
            setAddedPrompt(false);
            playChime('navigate');
          }}
          className="relative group p-4 rounded-full bg-[#10B981] text-white shadow-xl hover:shadow-2xl shadow-[#10B981]/20 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-[#059669]/20"
          aria-label="Open morning ritual quiz chatbot"
        >
          <span className="absolute inset-0 rounded-full bg-[#10B981] opacity-35 animate-ping group-hover:animate-none scale-105 pointer-events-none" />
          <Sliders size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-brand-purple border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1 h-1 bg-white rounded-full animate-ping" />
          </span>
          <span className="absolute left-14 bg-[#1E2D24] text-white text-[10px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md whitespace-nowrap hidden sm:inline">
            Ritual Engine
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div 
            id="oria-quiz-popup-backdrop"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
            className="fixed inset-0 bg-brand-green/45 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[32px] sm:rounded-[40px] border border-brand-green/10 shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto relative scrollbar-none"
            >
              
              {currentStep === 4 && <ConfettiEffect />}

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-brand-green/15 bg-white text-brand-green hover:bg-brand-green/5 transition-all z-50 cursor-pointer"
                aria-label="Close configuration popup"
              >
                <X size={16} />
              </button>

              <div className="p-6 sm:p-10 md:p-12 text-center md:text-left relative">
                
                <div id="quiz-stepper-progress" className="mb-10 max-w-xl mx-auto">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-[#1E2D24]/5 rounded-full z-0 pointer-events-none" />
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-[#10B981] rounded-full z-0 transition-all duration-500 ease-out pointer-events-none"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                    {[
                      { step: 0, label: "Intro" },
                      { step: 1, label: "Routine" },
                      { step: 2, label: "Workflow" },
                      { step: 3, label: "Goal" },
                      { step: 4, label: "Result" }
                    ].map((item) => {
                      const isActive = currentStep === item.step;
                      const isCompleted = currentStep > item.step;
                      return (
                        <button
                          key={item.step}
                          id={`step-indicator-btn-${item.step}`}
                          disabled={item.step > currentStep && currentStep < 4}
                          onClick={() => {
                            if (item.step < currentStep || currentStep === 4) {
                              setCurrentStep(item.step);
                              playChime('navigate');
                            }
                          }}
                          className="relative z-10 flex flex-col items-center group focus:outline-none"
                          title={item.label}
                        >
                          <div 
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] font-serif font-bold transition-all duration-500 ${
                              isActive
                                ? 'bg-[#10B981] text-white ring-4 ring-[#10B981]/20 scale-105 shadow-md shadow-[#10B981]/10'
                                : isCompleted
                                ? 'bg-[#1E2D24] text-[#FBFBFA] hover:bg-[#10B981] cursor-pointer'
                                : 'bg-[#FAFBF9] text-brand-green/30 border border-brand-green/10 cursor-not-allowed'
                            }`}
                          >
                            {isCompleted ? '✓' : item.step}
                          </div>
                          <span 
                            className={`absolute top-9 whitespace-nowrap text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 hidden sm:inline ${
                              isActive ? 'text-[#10B981]' : isCompleted ? 'text-[#1E2D24]' : 'text-brand-green/30'
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="h-4 sm:h-7" />
                </div>
                
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left animate-fadeIn">
                    <div className="lg:col-span-7 space-y-6">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/5 px-3.5 py-1.5 rounded-full">
                        <Sparkles size={11} className="animate-pulse text-[#10B981]" /> Biometric Calibration Engine
                      </span>
                      
                      <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2D24] font-medium leading-[1.12]">
                        Calibrate Your Morning <br />
                        <span className="italic text-brand-purple">Biochemical Demand.</span>
                      </h2>

                      <div className="space-y-4 text-xs sm:text-sm text-brand-green/70 leading-relaxed font-serif font-light">
                        <p>
                          Every morning routine possesses its own distinct metabolic response. Rather than generic single-form supplements or processing-heavy isolates, Oria aligns with your natural endocrine cycle.
                        </p>
                        <p>
                          The Calibration Engine evaluates your morning lifestyle inputs across four core organic pillars to customize your perfect sprouted millet ritual:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3.5 rounded-2xl bg-brand-cream/40 border border-brand-green/5 space-y-1">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-green flex items-center gap-1.5">
                            <Coffee size={12} className="text-[#10B981]" /> 1. Cognitive Mode
                          </h4>
                          <p className="text-[11px] text-brand-green/60 leading-normal">
                            Calibrating slow-release nutrients to sustain neurotransmitter health without afternoon fatigue spikes.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-brand-cream/40 border border-brand-green/5 space-y-1">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-green flex items-center gap-1.5">
                            <Sparkles size={12} className="text-[#10B981]" /> 2. Glycemic Curve
                          </h4>
                          <p className="text-[11px] text-brand-green/60 leading-normal">
                            Adjusting the unrefined whole-grain fiber buffer to maintain flat insulin and steady energy curves.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-brand-cream/40 border border-brand-green/5 space-y-1">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-green flex items-center gap-1.5">
                            <Dumbbell size={12} className="text-[#10B981]" /> 3. Hydration Needs
                          </h4>
                          <p className="text-[11px] text-brand-green/60 leading-normal">
                            Calculating essential trace elements and mineral replenishment rates for active or restorative routines.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-brand-cream/40 border border-brand-green/5 space-y-1">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-green flex items-center gap-1.5">
                            <Flame size={12} className="text-[#10B981]" /> 4. Preparation Pace
                          </h4>
                          <p className="text-[11px] text-brand-green/60 leading-normal">
                            Matching your daily workflow timeline with 100% whole-food shakes, portable bars, or isotonic waters.
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-start">
                        <button
                          id="popup-start-btn"
                          onClick={startQuiz}
                          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#10B981] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#059669] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md cursor-pointer"
                        >
                          <span>Begin Calibration</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-cream border border-brand-green/5 shadow-inner hidden lg:block">
                      <Image
                        src="https://images.unsplash.com/photo-1517093602195-b40af9688b46?q=80&w=800&auto=format&fit=crop"
                        alt="Oria Raw Ancient Grain Handcrafted Bio-Assays Close-up Studio Photography"
                        fill
                        sizes="(max-w-7xl) 30vw, 400px"
                        className="object-cover scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply opacity-25" />
                      
                      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-brand-green/10 text-left">
                        <h4 className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#10B981]">
                          Purity Index Standard
                        </h4>
                        <p className="text-[10px] text-brand-green/70 leading-normal mt-1">
                          Our organic, sprouted millets are sustainably cultivated in biodynamic soils to unlock maximum nutritional density.
                        </p>
                      </div>
                    </div>

                  </div>
                )}

                {currentStep >= 1 && currentStep <= 3 && (
                  <div className="space-y-8 animate-fadeIn">
                    <div className="text-left">
                      <span className="text-[9px] font-serif text-brand-purple uppercase tracking-widest font-bold">
                        Pillar {currentStep} under Evaluation
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#1E2D24] font-medium leading-tight mt-1">
                        {QUIZ_QUESTIONS[currentStep - 1].title}
                      </h3>
                      <p className="text-xs text-brand-green/60 mt-1 font-light">
                        {QUIZ_QUESTIONS[currentStep - 1].subTitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch text-left">
                      {QUIZ_QUESTIONS[currentStep - 1].options.map((opt) => {
                        const OptIcon = opt.icon;
                        return (
                          <button
                            key={opt.value}
                            id={`popup-opt-${opt.value}`}
                            onClick={() => handleSelectOption(currentStep, opt.value)}
                            className="p-4 rounded-[28px] border border-brand-green/10 bg-[#FBFBFA] hover:border-[#10B981] hover:bg-white text-left transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer hover:shadow-xl hover:shadow-brand-green/5 overflow-hidden"
                          >
                            <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-brand-cream border border-brand-green/5">
                              <Image
                                src={opt.bgImage}
                                alt={opt.label}
                                fill
                                sizes="200px"
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
                            </div>

                            <div className="flex items-start gap-3 px-1">
                              <div className="w-8 h-8 rounded-lg bg-brand-green/[0.04] border border-brand-green/5 flex items-center justify-center text-brand-green group-hover:bg-[#10B981]/15 group-hover:text-[#10B981] transition-all flex-shrink-0 mt-0.5">
                                <OptIcon size={14} />
                              </div>
                              <div>
                                <h4 className="text-sm font-serif font-medium text-brand-green group-hover:text-brand-purple transition-colors">
                                  {opt.label}
                                </h4>
                                <p className="text-[11px] text-brand-green/60 mt-1 leading-relaxed">
                                  {opt.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-start border-t border-brand-green/5 pt-4">
                      <button
                        onClick={goBack}
                        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1E2D24]/60 hover:text-brand-green transition-colors"
                      >
                        <ArrowLeft size={12} />
                        <span>Back</span>
                      </button>
                    </div>

                  </div>
                )}

                {currentStep === 4 && (() => {
                  const q1 = answers[1] || 'cognitive';
                  const q2 = answers[2] || 'shake';
                  const q3 = answers[3] || 'stress';

                  let baseScore = 0;
                  if (q1 === 'physical') { baseScore += 34; }
                  else if (q1 === 'cognitive') { baseScore += 30; }
                  else { baseScore += 28; }

                  if (q2 === 'grab') { baseScore += 25; }
                  else { baseScore += 32; }

                  if (q3 === 'glycemic') { baseScore += 28; }
                  else if (q3 === 'stress') { baseScore += 34; }
                  else { baseScore += 30; }

                  let label = "High Synergy";
                  if (baseScore >= 95) {
                    label = "Bio-Synergy Maximum";
                  } else if (baseScore >= 90) {
                    label = "Optimal Metabolic Congruence";
                  } else {
                    label = "Balanced Physiological Alignment";
                  }

                  return (
                    <div className="space-y-8 text-left animate-fadeIn">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-sprout/10 rounded-full text-[10px] font-bold text-brand-purple uppercase tracking-widest">
                            <CheckCircle size={10} className="text-[#10B981]" /> Calibration Complete
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#10B981]/10 rounded-full text-[10px] font-bold text-[#10B981] uppercase tracking-widest font-serif">
                            System Biometric Score: {baseScore}/100 — {label}
                          </span>
                        </div>
                        <h3 className="font-serif text-3xl text-brand-green font-medium">Your Suggested Oria Ritual</h3>
                        <p className="text-xs text-brand-green/60 mt-1 max-w-xl font-light">
                          Our physiological matching algorithm successfully processed your morning energy pattern. This Oria formula is optimized for your schedule and muscle needs.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-cream/30 p-6 sm:p-8 rounded-[36px] border border-brand-green/5 relative">
                        
                        <div className="md:col-span-4 relative aspect-square w-full rounded-[24px] overflow-hidden bg-white border border-brand-green/5">
                          <Image
                            src={recommendedProduct.image}
                            alt={recommendedProduct.name}
                            fill
                            sizes="200px"
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest bg-brand-purple text-white font-bold font-serif">
                              Optimal Match
                            </span>
                          </div>
                        </div>

                        <div className="md:col-span-8 space-y-4 flex flex-col justify-between h-full">
                          <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                              <h4 className="font-serif text-xl sm:text-2xl text-brand-green font-medium">
                                {recommendedProduct.name}
                              </h4>
                              <span className="font-serif text-lg text-brand-green font-medium">
                                ${recommendedProduct.price}
                              </span>
                            </div>
                            
                            <p className="text-[11px] uppercase tracking-widest text-[#10B981] font-bold mt-1">
                              {recommendedProduct.subtitle}
                            </p>

                            <p className="text-xs text-brand-green/60 uppercase tracking-widest font-serif">
                              {recommendedProduct.sizeDesc}
                            </p>

                            <p className="text-xs text-brand-green/80 mt-3 leading-relaxed font-serif italic border-l-2 border-[#10B981] pl-3 py-0.5">
                              {recommendedProduct.matchReason}
                            </p>

                            <div className="p-4 rounded-2xl bg-white border border-brand-green/5 space-y-2 text-xs font-light text-brand-green/75 mt-3">
                              <h5 className="text-[9px] font-bold uppercase tracking-widest text-brand-purple">
                                Biometric Calibration Inputs:
                              </h5>
                              <div className="flex flex-wrap gap-2 text-[10px]">
                                <span className="px-2.5 py-1 bg-brand-cream/40 border border-brand-green/5 rounded-full">
                                  Routine: <strong className="text-brand-green">{getSelectedLabel(1)}</strong>
                                </span>
                                <span className="px-2.5 py-1 bg-brand-cream/40 border border-brand-green/5 rounded-full">
                                  Workflow: <strong className="text-brand-green">{getSelectedLabel(2)}</strong>
                                </span>
                                <span className="px-2.5 py-1 bg-brand-cream/40 border border-brand-green/5 rounded-full">
                                  Goal: <strong className="text-brand-green">{getSelectedLabel(3)}</strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-brand-green/5">
                            <button
                              id="popup-add-to-cart-btn"
                              onClick={() => {
                                addToCart({
                                  id: recommendedProduct.id,
                                  name: recommendedProduct.name,
                                  price: recommendedProduct.price,
                                  subtitle: recommendedProduct.subtitle,
                                  image: recommendedProduct.image,
                                });
                                setAddedPrompt(true);
                              }}
                              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-[#10B981] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#059669] transform active:scale-98 transition-all cursor-pointer"
                            >
                              <ShoppingBag size={12} />
                              <span>Reserve Ritual</span>
                            </button>

                            <button
                              id="popup-reset-btn"
                              onClick={startQuiz}
                              className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full border border-brand-green/10 text-brand-green text-[11px] font-semibold uppercase tracking-widest hover:bg-brand-green/5 transition-colors cursor-pointer"
                            >
                              <RefreshCw size={11} />
                              <span>Re-test</span>
                            </button>
                          </div>

                          {addedPrompt && (
                            <p className="text-[11px] font-medium text-[#10B981] flex items-center gap-1.5 animate-fadeIn mt-2">
                              <CheckCircle size={12} /> Added to Reserve Cart. Feel free to close the popup or checkout in the upper drawer.
                            </p>
                          )}
                        </div>

                      </div>

                    </div>
                  );
                })()}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}