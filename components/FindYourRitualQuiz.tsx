'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, CheckCircle, Flame, Dumbbell, Coffee, Sun } from 'lucide-react';
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
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "How does your body typically enter the morning?",
    subTitle: "Select the setting that best reflects your morning baseline.",
    options: [
      {
        label: "Intense Physical Effort",
        value: "physical",
        description: "Heavy weightlifting sessions, sprint runs, high-tempo cycling, or demanding dynamic training.",
        icon: Dumbbell,
      },
      {
        label: "Desk-bound Cognitive Sprints",
        value: "cognitive",
        description: "Deep coding tasks, long creative design, rapid financial analysis, or writing under intense deadlines.",
        icon: Coffee,
      },
      {
        label: "Gentle Mindful Warmup",
        value: "mindful",
        description: "Slower entries consisting of restorative yoga, quiet breathwork, stretch flows, or deep meditation.",
        icon: Sun,
      }
    ]
  },
  {
    id: 2,
    title: "What represents your optimal morning workflow?",
    subTitle: "Let’s calibrate based on your available morning preparation windows.",
    options: [
      {
        label: "Grab-and-Go Convenience",
        value: "grab",
        description: "I need dense organic nutrients requiring absolutely zero seconds of setup or cleanup.",
        icon: Sparkles,
      },
      {
        label: "Swift Liquid Fueling",
        value: "shake",
        description: "Under 30 seconds of elegant blending with filtered water or organic nut milk is perfect.",
        icon: Flame,
      }
    ]
  },
  {
    id: 3,
    title: "Choose your primary physiological focus.",
    subTitle: "What is your main biological goal for the hours leading to midday?",
    options: [
      {
        label: "Glycemic Stability & Hunger Control",
        value: "glycemic",
        description: "Eliminating the classic 11:00 AM insulin crash and avoiding brain fog.",
        icon: Sparkles,
      },
      {
        label: "Advanced Stress Adaptation",
        value: "stress",
        description: "Managing systemic cortisol spikes and maintaining clean focus.",
        icon: Coffee,
      },
      {
        label: "Intracellular Hydration & Recovery",
        value: "hydration",
        description: "Replenishing trace minerals and maintaining lean fluid homeostasis.",
        icon: Dumbbell,
      }
    ]
  }
];

interface QuizRecommendation {
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  description: string;
  matchReason: string;
  sizeDesc: string;
}

const PRODUCTS_MAP: Record<string, QuizRecommendation> = {
  bar: {
    productId: 'oria-morning-fuel-bar',
    name: 'Morning Fuel Bar',
    subtitle: 'Ancient Millet & Cardamom Pods',
    price: 28,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600&auto=format&fit=crop",
    sizeDesc: 'Box of 12 Gourmet Bars',
    description: 'A dense, satisfying solid bar combining rolled organic millet grains, cold-extracted almond oil, raw botanical lavender, and wild honey.',
    matchReason: 'Based on your desire for zero-friction grab-and-go energy and glycemic stability, the Morning Fuel Bar provides intact raw millet fiber structures that digest slowly, preventing mid-morning cognitive fatigue.'
  },
  shake: {
    productId: 'oria-rise-blend-shake',
    name: 'Rise Blend Shake',
    subtitle: 'Cardamom Vanilla & Ashwagandha',
    price: 34,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop",
    sizeDesc: '15 Servings Recyclable Jar',
    description: 'Sleek botanical shake formulation featuring 10 ancient whole millet species supercharged with adaptogens to manage stress and sustain energy.',
    matchReason: 'Given your morning focus on adaptogenic defense and active nutritional blending, the Rise Blend Shake uses Ashwagandha to modulate stress levels while delivering 22g of clean protein.'
  },
  water: {
    productId: 'oria-hydra-protein-water',
    name: 'Hydra-Protein Water',
    subtitle: 'Sprout-Green & Coconut Marine',
    price: 32,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=600&auto=format&fit=crop",
    sizeDesc: 'Pack of 12 Glass Bottles',
    description: 'A crystal-clear, refreshing coconut water base containing trace marine minerals and plant-based isolated protein structure.',
    matchReason: 'Since your habits focus on intense physical output and cellular electrolyte hydration, the Hydra-Protein Water delivers 72+ volcanic ionic trace elements alongside bioavailable vegan proteins to immediately restore cellular reserves.'
  }
};

export default function FindYourRitualQuiz() {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Welcome, 1, 2, 3: Questions, 4: Results
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [addedPrompt, setAddedPrompt] = useState<boolean>(false);

  const startQuiz = () => {
    setCurrentStep(1);
    setAnswers({});
    setAddedPrompt(false);
  };

  const handleSelectOption = (questionId: number, val: string) => {
    const updated = { ...answers, [questionId]: val };
    setAnswers(updated);
    
    // Automatically advance to the next step with a subtle delay
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 250);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Safe weighted engine for recommendation calculating
  const calculateRecommendation = (): QuizRecommendation => {
    const energyStyle = answers[1]; // physical, cognitive, mindful
    const flowStyle = answers[2];   // grab, shake
    const mainGoal = answers[3];    // glycemic, stress, hydration

    // Strongly prioritize grab convenience to recommend bar
    if (flowStyle === 'grab') {
      return PRODUCTS_MAP.bar;
    }
    // Strongly prioritize active physical workflow or hydration to recommend Hydra Protein Water
    if (energyStyle === 'physical' || mainGoal === 'hydration') {
      return PRODUCTS_MAP.water;
    }
    // Default or mindfulness adaptogenic focus to recommend Rise Blend
    return PRODUCTS_MAP.shake;
  };

  const recommendedProduct = calculateRecommendation();
  const percentageProgress = currentStep === 4 ? 100 : Math.ceil(((currentStep) / 3) * 100);

  return (
    <section
      id="find-your-ritual"
      className="py-24 bg-[#FAF9F5] border-t border-brand-green/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-[15%] w-px h-full bg-brand-green/[0.03] pointer-events-none" />
      <div className="absolute top-0 left-[25%] w-px h-full bg-brand-green/[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10 transition-all">
        
        {/* Card Frame wrapping the quiz journey */}
        <div className="bg-white rounded-[40px] border border-brand-green/5 shadow-2xl p-8 sm:p-12 md:p-16 text-center md:text-left">
          
          {/* Welcome Screen (Step 0) */}
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#10B981] mb-3">
                    <Sparkles size={12} className="animate-pulse" /> Botanical Configurator
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E2D24] font-medium leading-[1.12]">
                    Find Your Oria <br />Morning Ritual
                  </h2>
                  <p className="mt-4 text-xs sm:text-sm text-brand-green/70 leading-relaxed font-sans font-light max-w-xl">
                    Every morning routine possesses its own distinct biochemical demand. Answer three short curated questions about your morning workflow, mental outputs, and hydration baselines to calibrate your optimized millet protein ritual.
                  </p>
                </div>

                <div className="flex justify-center md:justify-start">
                  <button
                    id="start-ritual-quiz-btn"
                    onClick={startQuiz}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#10B981] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#059669] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <span>Begin calibration</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Interactive Questions Screen (Step 1, 2, 3) */}
            {currentStep >= 1 && currentStep <= 3 && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Micro Header with progress */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-green/5 pb-4">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-brand-purple uppercase tracking-widest font-bold">
                      Step {currentStep} of 3
                    </span>
                    <h3 className="text-xs font-semibold text-brand-green/40 uppercase tracking-widest mt-0.5">
                      Ritual Calibration Engine
                    </h3>
                  </div>
                  {/* Progress Line */}
                  <div className="flex items-center gap-3 w-full sm:w-48">
                    <div className="w-full bg-brand-green/5 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#10B981] h-full rounded-full transition-all duration-300"
                        style={{ width: `${percentageProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-brand-green/60">{percentageProgress}%</span>
                  </div>
                </div>

                {/* Question Texts */}
                <div className="text-left">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1E2D24] font-medium leading-tight">
                    {QUIZ_QUESTIONS[currentStep - 1].title}
                  </h3>
                  <p className="text-xs text-brand-green/60 mt-1.5 font-light">
                    {QUIZ_QUESTIONS[currentStep - 1].subTitle}
                  </p>
                </div>

                {/* Option Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch text-left">
                  {QUIZ_QUESTIONS[currentStep - 1].options.map((opt) => {
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        id={`quiz-option-${opt.value}`}
                        onClick={() => handleSelectOption(currentStep, opt.value)}
                        className="p-6 rounded-[24px] border border-brand-green/10 bg-[#FBFBFA] hover:border-[#10B981] hover:bg-white text-left transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer hover:shadow-xl hover:shadow-brand-green/5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-brand-green/[0.03] border border-brand-green/5 flex items-center justify-center text-brand-green group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-all">
                          <OptIcon size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif font-medium text-brand-green group-hover:text-brand-purple transition-colors">
                            {opt.label}
                          </h4>
                          <p className="text-[11px] text-brand-green/60 mt-2 leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back Link */}
                <div className="flex items-center justify-start border-t border-brand-green/5 pt-4">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#1E2D24]/60 hover:text-brand-green transition-colors"
                  >
                    <ArrowLeft size={12} />
                    <span>Back</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Screen (Step 4) */}
            {currentStep === 4 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 text-left"
              >
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-sprout/10 rounded-full text-[10px] font-bold text-brand-purple uppercase tracking-widest mb-3">
                    <CheckCircle size={10} className="text-[#10B981]" /> Calibration Complete
                  </span>
                  <h3 className="font-serif text-3xl text-brand-green font-medium">Your Suggested Oria Ritual</h3>
                  <p className="text-xs text-brand-green/60 mt-1 max-w-xl font-light">
                    Our physiological matching algorithm successfully processed your morning energy pattern. This Oria formula is optimized for your schedule and muscle needs.
                  </p>
                </div>

                {/* Result Recommendation Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-cream/30 p-6 sm:p-8 rounded-[36px] border border-brand-green/5">
                  
                  {/* Left Column product image wrapper */}
                  <div className="md:col-span-4 relative aspect-square w-full rounded-[24px] overflow-hidden bg-white border border-brand-green/5">
                    <Image
                      src={recommendedProduct.image}
                      alt={recommendedProduct.name}
                      fill
                      sizes="(max-w-7xl) 25vw, 250px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest bg-brand-purple text-white font-bold font-mono">
                        Optimal Match
                      </span>
                    </div>
                  </div>

                  {/* Right Column details */}
                  <div className="md:col-span-8 space-y-4 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-serif text-xl sm:text-2xl text-brand-green font-medium">
                          {recommendedProduct.name}
                        </h4>
                        <span className="font-serif text-lg text-brand-green font-medium">
                          ${recommendedProduct.price}
                        </span>
                      </div>
                      
                      <p className="text-[11px] uppercase tracking-widest text-brand-sprout font-bold">
                        {recommendedProduct.subtitle}
                      </p>

                      <p className="text-xs text-brand-green/60 uppercase tracking-widest font-mono mt-1">
                        {recommendedProduct.sizeDesc}
                      </p>

                      <p className="text-xs text-brand-green/80 mt-3 leading-relaxed font-sans italic border-l-2 border-[#10B981] pl-3 py-0.5">
                        {recommendedProduct.matchReason}
                      </p>
                    </div>

                    {/* Integrated Add to Cart workflow */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-brand-green/5">
                      <button
                        id="quiz-add-to-cart-btn"
                        onClick={() => {
                          addToCart({
                            id: recommendedProduct.productId,
                            name: recommendedProduct.name,
                            price: recommendedProduct.price,
                            subtitle: recommendedProduct.subtitle,
                            image: recommendedProduct.image,
                          });
                          setAddedPrompt(true);
                        }}
                        className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full bg-[#10B981] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#059669] transform active:scale-98 transition-all"
                      >
                        <ShoppingBag size={12} />
                        <span>Reserve Ritual</span>
                      </button>

                      <button
                        id="quiz-reset-btn"
                        onClick={startQuiz}
                        className="inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-full border border-brand-green/10 text-brand-green text-[11px] font-semibold uppercase tracking-widest hover:bg-brand-green/5 transition-colors"
                      >
                        <RefreshCw size={11} />
                        <span>Re-test</span>
                      </button>
                    </div>

                    {addedPrompt && (
                      <p className="text-[11px] font-medium text-[#10B981] flex items-center gap-1.5 animate-fadeIn">
                        <CheckCircle size={12} /> Added to Reserve Cart. Ready to checkout in upper drawer.
                      </p>
                    )}
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
