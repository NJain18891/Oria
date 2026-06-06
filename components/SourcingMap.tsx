'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Shield, MapPin, Feather, Heart, FileText } from 'lucide-react';

interface SourcingZone {
  id: string;
  name: string;
  coordinates: string;
  milletType: string;
  ethics: string;
  soilPurity: string;
  waterUsage: string;
  fairTrade: string;
  mapDot: { x: number; y: number }; // Relative position on the clean stylized map
}

const SOURCING_ZONES: SourcingZone[] = [
  {
    id: 'zone-1',
    name: 'Upper Punjab Arid Plain',
    coordinates: '31.52° N, 74.35° E',
    milletType: 'Pearl Sprouted Millet (Bajra)',
    ethics: 'Rain-fed crop swap initiative supporting 45+ women-led family farms with pre-funded yields.',
    soilPurity: '100% Pesticide & Heavy Metal Free (Cert. ICP-MS Clean)',
    waterUsage: '94% less groundwater than sugarcane alternatives',
    fairTrade: 'Guaranteed 2.5x regional minimum wage floor',
    mapDot: { x: 34, y: 35 },
  },
  {
    id: 'zone-2',
    name: 'Thar Border Organic Belt',
    coordinates: '26.91° N, 70.90° E',
    milletType: 'Foxtail Ancient Millet (Kangni)',
    ethics: 'Ensuring zero soil degradation via strict traditional multi-row legume rotation techniques.',
    soilPurity: 'Rich natural silica, untouched by industrial nitrate fertilizers',
    waterUsage: 'Pure rainfall conservation basins only',
    fairTrade: 'Direct-to-cooperative purchasing, bypassing middlemen brokers',
    mapDot: { x: 40, y: 62 },
  },
  {
    id: 'zone-3',
    name: 'Sindh Basin Clay Lands',
    coordinates: '25.39° N, 68.27° E',
    milletType: 'Finger Mineral Millet (Ragi)',
    ethics: 'Preserving bio-diverse ancient seed repositories to resist structural climate shifting without GMO codes.',
    soilPurity: 'Tested heavy-metal flatline, alluvial nutrient dense silt',
    waterUsage: 'Sub-surface residual humidity hydration',
    fairTrade: 'Pension programs funded per box shipped back to local villages',
    mapDot: { x: 28, y: 80 },
  },
];

export default function SourcingMap() {
  const [activeZoneId, setActiveZoneId] = useState<string>('zone-1');
  const [showCertification, setShowCertification] = useState(false);

  const activeZone = SOURCING_ZONES.find((z) => z.id === activeZoneId) || SOURCING_ZONES[0];

  return (
    <section
      id="oria-sourcing-section"
      className="py-24 bg-[#FBFBFA] border-t border-brand-green/5 relative overflow-hidden"
    >
      {/* Structural background details */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-brand-green top-[-100px] left-[-100px]" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-brand-green bottom-[-200px] right-[-200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center md:text-left max-w-2xl mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#10B981] mb-3 flex items-center justify-center md:justify-start gap-1.5">
            <Compass size={12} className="text-brand-sprout animate-spin-slow" /> Geographical Integrity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E2D24] font-medium leading-[1.15] tracking-tight">
            Traceable Agriculture: <br />The Ancient Indus Soil System
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-brand-green/70 leading-relaxed font-sans">
            We do not mass-purchase raw grain from volatile commercial commodity brokers. Every grain of pearl, finger, and foxtail millet is traced directly to coordinates in the fertile, rain-fed clay plains of the dry Indus region.
          </p>
        </div>

        {/* Map and Info Layout Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Interactive Stylized Vector Map - 7 Columns on Large Screens */}
          <div className="lg:col-span-7 bg-brand-cream/45 rounded-[36px] p-6 sm:p-8 border border-brand-green/5 flex flex-col justify-between min-h-[420px] sm:min-h-[480px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-green/50">
                  Vector Map Layer // Indus Irrigation Grid
                </span>
                <span className="text-[10px] font-mono text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-ping" />
                  3 Active Farms Online
                </span>
              </div>
              <h3 className="text-sm font-semibold text-brand-green uppercase tracking-wide">
                Select Harvesting Coordinates
              </h3>
            </div>

            {/* Stylized Vector SVG Map Plot */}
            <div className="relative my-8 flex-grow h-[260px] w-full rounded-2xl border border-brand-green/5 overflow-hidden bg-[#F2F1EC]/60 flex items-center justify-center">
              
              {/* Clean decorative topographic grid */}
              <svg className="absolute inset-0 w-full h-full text-brand-green/[0.04]" width="100%" height="100%">
                <defs>
                  <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>

              {/* Stylized Indus Valley Boundary Line */}
              <svg 
                viewBox="0 0 300 400" 
                className="absolute inset-0 w-full h-full text-brand-green/[0.09] p-4 transition-all"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
              >
                {/* Simulated Mountain Contours on the Left */}
                <path d="M 10 50 Q 50 120 20 180 T 15 280 T 5 390" strokeDasharray="3,3" />
                
                {/* Core Indus River Path */}
                <motion.path 
                  d="M 120 10 Q 150 90 110 140 T 130 250 T 80 340 T 90 395" 
                  stroke="#10B981" 
                  strokeWidth="2" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />

                {/* Tributary branches */}
                <path d="M 134 75 Q 220 50 250 80" stroke="#10B981" strokeWidth="0.8" opacity="0.5" />
                <path d="M 120 120 Q 240 130 270 170" stroke="#10B981" strokeWidth="0.8" opacity="0.5" />
                <path d="M 112 170 Q 210 210 260 250" stroke="#10B981" strokeWidth="0.8" opacity="0.5" />

                {/* Regional names */}
                <text x="35" y="100" fill="currentColor" fontSize="10" className="font-mono opacity-40 uppercase tracking-widest">Hindu Kush</text>
                <text x="190" y="220" fill="currentColor" fontSize="10" className="font-mono opacity-40 uppercase tracking-widest">Thar Desert</text>
                <text x="50" y="380" fill="currentColor" fontSize="10" className="font-mono opacity-40 uppercase tracking-widest">Arabian Sea</text>
              </svg>

              {/* Dynamic Interactive Hotspot Nodes */}
              {SOURCING_ZONES.map((zone) => {
                const isActive = zone.id === activeZoneId;
                return (
                  <button
                    key={zone.id}
                    id={`map-node-${zone.id}`}
                    onClick={() => setActiveZoneId(zone.id)}
                    className="absolute group z-10 transition-transform duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110"
                    style={{ left: `${zone.mapDot.x}%`, top: `${zone.mapDot.y}%` }}
                    aria-label={`Select cooperative ${zone.name}`}
                  >
                    {/* Ring Pulse */}
                    <span className={`absolute inset-[-12px] rounded-full border transition-all duration-300 ${
                      isActive 
                        ? 'border-[#10B981] bg-[#10B981]/10 scale-105 animate-pulse' 
                        : 'border-transparent group-hover:border-brand-green/20 group-hover:scale-95'
                    }`} />
                    
                    {/* Glowing Core */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border shadow-md transition-colors duration-300 ${
                      isActive 
                        ? 'bg-[#1E2D24] border-[#10B981] text-brand-sprout' 
                        : 'bg-white border-brand-green/20 text-brand-green group-hover:bg-[#1E2D24] group-hover:text-white'
                    }`}>
                      <MapPin size={10} className={isActive ? 'animate-bounce' : ''} />
                    </div>

                    {/* Tooltip Hover Tag for Desktop */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-7 hidden group-hover:block pointer-events-none whitespace-nowrap bg-brand-green text-brand-cream border border-white/10 p-2 text-[9px] font-mono tracking-wider rounded shadow-lg transition-opacity duration-200 uppercase">
                      {zone.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick list selectors */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full border-t border-brand-green/5 pt-4">
              <span className="text-[10px] font-mono text-brand-green/40 uppercase tracking-wider">Explore Sites:</span>
              <div className="flex flex-wrap gap-2">
                {SOURCING_ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    id={`btn-zone-select-${zone.id}`}
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                      zone.id === activeZoneId
                        ? 'bg-[#1E2D24] text-brand-sprout border-[#1E2D24]'
                        : 'bg-white text-brand-green border-brand-green/10 hover:border-brand-green/30'
                    }`}
                  >
                    {zone.name.split(' ')[0]} Farms
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sourcing Zone Ethics Details - 5 Columns */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                id={`zone-details-card-${activeZone.id}`}
                className="bg-white rounded-[32px] p-8 border border-brand-green/5 hover:border-brand-green/10 shadow-sm space-y-6 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top Location Heading */}
                  <div className="flex items-start justify-between border-b border-brand-green/5 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#10B981] font-semibold uppercase tracking-wider">
                        Active Cooperative
                      </span>
                      <h4 className="font-serif text-lg text-brand-green font-medium mt-1">
                        {activeZone.name}
                      </h4>
                      <p className="text-[10px] font-mono text-brand-green/40 mt-1 flex items-center gap-1">
                        <MapPin size={10} /> {activeZone.coordinates}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-brand-purple/70 bg-brand-purple/5 border border-brand-purple/10 px-3 py-1 rounded-full uppercase font-medium">
                        Fair-Trade
                      </span>
                    </div>
                  </div>

                  {/* Primary Grain */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-brand-green/45 block">
                      Target Cultivar
                    </span>
                    <p className="text-xs font-semibold text-brand-green flex items-center gap-1.5">
                      <Feather size={12} className="text-[#10B981]" /> {activeZone.milletType}
                    </p>
                  </div>

                  {/* Farm Ethics Statement */}
                  <div className="space-y-2 bg-[#FBFBFA] p-4.5 rounded-2xl border border-brand-green/5 text-left">
                    <span className="text-[10px] font-mono uppercase text-[#10B981] font-bold block">
                      Socio-Ethical Practice
                    </span>
                    <p className="text-xs text-brand-green/80 leading-relaxed font-sans">
                      {activeZone.ethics}
                    </p>
                  </div>

                  {/* Critical Soil Assays */}
                  <div className="space-y-3.5 pt-2">
                    <div className="flex items-center gap-3 text-xs text-brand-green/80">
                      <span className="w-5 h-5 rounded-full bg-brand-sprout/10 border border-brand-sprout/20 flex items-center justify-center text-brand-sprout text-[10px] font-mono flex-shrink-0">
                        ✓
                      </span>
                      <div>
                        <span className="font-medium text-brand-green text-[11px] block">Soil Assays</span>
                        <span className="text-[10px] text-brand-green/60">{activeZone.soilPurity}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-brand-green/80">
                      <span className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] text-[10px] font-mono flex-shrink-0">
                        ✓
                      </span>
                      <div>
                        <span className="font-medium text-brand-green text-[11px] block">Ecological Hydration</span>
                        <span className="text-[10px] text-brand-green/60">{activeZone.waterUsage}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-brand-green/80">
                      <span className="w-5 h-5 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple text-[10px] font-mono flex-shrink-0">
                        ✓
                      </span>
                      <div>
                        <span className="font-medium text-brand-green text-[11px] block">Fair Wage Scale</span>
                        <span className="text-[10px] text-brand-green/60">{activeZone.fairTrade}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button anchor */}
                <button
                  id="inspect-laboratory-assays-btn"
                  onClick={() => setShowCertification(true)}
                  className="w-full mt-6 inline-flex items-center justify-center space-x-2 py-3 rounded-full bg-[#1E2D24] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#10B981] active:scale-98 transition-all duration-300"
                >
                  <FileText size={12} />
                  <span>View Lab Assay Certificates</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lab Assay Modal (Avoids window.alert for premium context) */}
      <AnimatePresence>
        {showCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="lab-assay-modal"
            className="fixed inset-0 bg-[#1E2D24]/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#FBFBFA] rounded-[36px] p-6 sm:p-8 max-w-lg w-full border border-brand-green/10 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-brand-green/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="text-[#10B981]" size={18} />
                  <h3 className="font-serif text-lg text-brand-green font-medium">Boutique Laboratory Assay</h3>
                </div>
                <button
                  onClick={() => setShowCertification(false)}
                  className="text-brand-green/45 hover:text-brand-green font-mono text-xs uppercase"
                >
                  [ Close ]
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans text-brand-green/80 leading-relaxed text-left">
                <p>
                  <strong>Certificate ID:</strong> #ORIA-ICPMC-2026-03
                </p>
                <p>
                  All raw, whole grain millet varieties produced within the <strong>Upper Punjab</strong>, <strong>Thar Border</strong>, and <strong>Sindh Basin</strong> fields undergo continuous ICP-MS heavy-metal spectroscopy batch scans.
                </p>
                <div className="bg-[#1E2D24]/5 p-4 rounded-2xl border border-brand-green/5 font-mono text-[10px] space-y-2 text-brand-green">
                  <div className="flex justify-between border-b border-brand-green/10 pb-1.5 font-bold text-[#1E2D24]">
                    <span>ELEMENT assayed</span>
                    <span>ORIA BATCH</span>
                    <span>WHO METRIC SAFE LIMIT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lead (Pb)</span>
                    <span className="text-[#10B981]">&lt; 0.002 ppm</span>
                    <span>0.100 ppm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arsenic (As)</span>
                    <span className="text-[#10B981]">&lt; 0.005 ppm</span>
                    <span>0.200 ppm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cadmium (Cd)</span>
                    <span className="text-[#10B981]">&lt; 0.001 ppm</span>
                    <span>0.050 ppm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mercury (Hg)</span>
                    <span className="text-[#10B981]">&lt; 0.001 ppm</span>
                    <span>0.010 ppm</span>
                  </div>
                </div>
                <p className="text-[10px] text-brand-green/60 mt-1">
                  *Scanned and validated at Source by Punjab Agri Labs Corporation. Heavy metals conform fully with FDA guidelines & WHO dietary safety criteria.
                </p>
              </div>

              <button
                onClick={() => setShowCertification(false)}
                className="w-full mt-6 py-3.5 bg-brand-green text-brand-cream rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#10B981] transition-colors"
              >
                Acknowledge laboratory assay purity
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
