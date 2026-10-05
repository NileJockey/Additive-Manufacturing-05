/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  APPLICATION_SECTORS,
  STRENGTHS_DATA,
  LIMITATIONS_DATA,
  FUTURE_ROADMAP,
  BJ_MATERIALS,
  PROCESS_STAGES,
} from './data/bjTechnicalData';
import { ProcessMechanicsSimulator } from './components/ProcessMechanicsSimulator';
import { MaterialsMatrixExplorer } from './components/MaterialsMatrixExplorer';
import { TechBenchmarkComparison } from './components/TechBenchmarkComparison';
import { Download, Printer, ArrowRight, Check, Layers } from 'lucide-react';

export default function App() {
  const [activeAppSectorId, setActiveAppSectorId] = useState<string>(APPLICATION_SECTORS[0].id);
  const [activeStrengthView, setActiveStrengthView] = useState<'Both' | 'Strengths' | 'Limitations'>('Both');
  const [activeHorizonId, setActiveHorizonId] = useState<string>(FUTURE_ROADMAP[0].id);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const selectedSector =
    APPLICATION_SECTORS.find((s) => s.id === activeAppSectorId) || APPLICATION_SECTORS[0];

  const handleExportDossier = () => {
    const reportLines = [
      'BINDER JETTING (ISO/ASTM 52900) — TECHNICAL ENGINEERING DOSSIER',
      '====================================================================',
      '',
      '1. PROCESS OVERVIEW & PHYSICS',
      'Binder Jetting (BJ) is an additive manufacturing process in which a liquid bonding agent is selectively deposited via high-frequency piezoelectric or thermal inkjet printheads to join powder particles layer-by-layer at ambient temperature, followed by curing, depowdering, pyrolytic debinding, and high-temperature furnace sintering or melt infiltration.',
      '',
      '2. PROCESS STAGES:',
      ...PROCESS_STAGES.map(
        (s) => `  [${s.stepNumber}] ${s.name} (${s.temperatureRange}, Density: ${s.relativeDensity}) — ${s.summary}`
      ),
      '',
      '3. QUALIFIED INDUSTRIAL MATERIALS:',
      ...BJ_MATERIALS.map(
        (m) =>
          `  - ${m.name} (${m.designation}): Peak Sinter ${m.sinteringPeakTempC}°C | Linear Shrinkage ${m.linearShrinkagePct}% | Final Density ${m.finalDensityPct}% | Yield ${m.yieldStrengthMPa} MPa`
      ),
      '',
      '4. CORE STRENGTHS:',
      ...STRENGTHS_DATA.map((st) => `  + ${st.title} (${st.metricBenchmark}): ${st.mechanisticExplanation}`),
      '',
      '5. LIMITATIONS & MITIGATIONS:',
      ...LIMITATIONS_DATA.map(
        (lim) =>
          `  - ${lim.title} (${lim.metricBenchmark}): ${lim.mechanisticExplanation} [Mitigation: ${lim.engineeringMitigation}]`
      ),
      '',
      '6. INDUSTRIAL MANUFACTURING ROADMAP (2026-2035):',
      ...FUTURE_ROADMAP.map((h) => `  * ${h.horizon} (${h.timeframe}): ${h.headline}`),
    ];

    const blob = new Blob([reportLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Binder_Jetting_ISO52900_Technical_Review.txt';
    a.click();
    URL.revokeObjectURL(url);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-lg font-serif-editorial font-semibold tracking-tight text-slate-900 whitespace-nowrap"
        >
          Binder Jetting Review
        </a>

        {/* Zone 2: 5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-600">
          <a href="#process-physics" className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Process Physics
          </a>
          <a href="#allowed-materials" className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Materials Matrix
          </a>
          <a href="#applications" className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Applications
          </a>
          <a href="#strengths-limitations" className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Strengths & Limits
          </a>
          <a href="#industrial-outlook" className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap">
            Future Outlook
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Monograph</span>
          </button>
          <button
            type="button"
            onClick={handleExportDossier}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Dossier Exported' : 'Export Technical Spec'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-10 space-y-20">
        {/* Hero Monograph Header & Executive Synthesis */}
        <section className="border-b border-slate-200 pb-12">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-slate-500">
            <span>STANDARD CLASSIFICATION: ISO/ASTM 52900 (BJT)</span>
            <span aria-hidden="true">·</span>
            <span>MULTI-STEP POWDER BED ADDITIVE MANUFACTURING</span>
            <span aria-hidden="true">·</span>
            <span>EDITION 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif-editorial font-medium text-slate-900 leading-[1.15] tracking-tight [text-wrap:balance]">
                Binder Jetting (BJ) Additive Manufacturing: Process Physics, Material Systems & Industrial Integration
              </h1>
              <p className="text-base text-slate-700 leading-relaxed mt-5 max-w-[70ch]">
                Originating at MIT in 1993 as Three-Dimensional Printing (3DP), <strong className="font-semibold text-slate-900">Binder Jetting (BJ)</strong> fundamentally diverges from laser and electron-beam fusion by decoupling <em>geometric shaping</em> from <em>thermal consolidation</em>. High-density piezoelectric printheads selectively jet picoliter liquid binder droplets into a powder bed at room temperature, creating a "green" part that is subsequently cured, depowdered, debound, and furnace-sintered to near-full theoretical density.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <a
                  href="#process-physics"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <span>Explore 5-Stage Process Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#allowed-materials"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  <span>Inspect 9 Qualified Material Systems</span>
                </a>
              </div>
            </div>

            {/* Right 4 Cols: Key Quantitative Telemetry Benchmarks */}
            <div className="lg:col-span-4 bg-white border border-slate-200 divide-y divide-slate-200">
              <div className="p-4">
                <div className="text-[11px] font-mono-tech text-slate-500 uppercase">
                  VOLUMETRIC BUILD RATE (METAL / SAND)
                </div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tech font-bold text-slate-900">12,000</span>
                  <span className="text-xs font-mono-tech text-slate-500 ml-1.5">cm³/hr (Metal) · 120 L/hr (Sand)</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  10×–50× faster layer deposition than point-wise laser PBF
                </div>
              </div>

              <div className="p-4">
                <div className="text-[11px] font-mono-tech text-slate-500 uppercase">
                  TYPICAL SINTERING SHRINKAGE & DENSITY
                </div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tech font-bold text-blue-700">15.5 – 20.0%</span>
                  <span className="text-xs font-mono-tech text-slate-500 ml-1.5">LINEAR CONTRACTION</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Consolidates from ~56% green bed packing to 97.5–99.2% final density
                </div>
              </div>

              <div className="p-4">
                <div className="text-[11px] font-mono-tech text-slate-500 uppercase">
                  POWDER FEEDSTOCK SPECIFICATION
                </div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono-tech font-bold text-slate-900">9 – 22</span>
                  <span className="text-xs font-mono-tech text-slate-500 ml-1.5">µm D50 (MIM-GRADE SPHERICAL)</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  &gt;98.5% unbound powder recyclability with zero laser spatter degradation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: Process Architecture & Sintering Physics */}
        <section id="process-physics" className="scroll-mt-20 space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tech text-blue-700 font-semibold">
                SECTION 01 · PROCESS ARCHITECTURE & THERMODYNAMICS
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-slate-900 mt-1">
                01. Fundamental Mechanics of the Binder Jetting Process Chain
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Unlike direct energy melting, Binder Jetting is a two-stage powder metallurgy route: ambient-temperature capillary binding followed by solid-state or liquid-phase diffusion sintering.
            </p>
          </div>

          <ProcessMechanicsSimulator />

          {/* Editorial Deep-Dive Columns on Process Physics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white border border-slate-200 p-5">
              <div className="text-xs font-mono-tech text-slate-500">01.1 FLUID-POWDER BALLISTICS</div>
              <h3 className="text-base font-semibold text-slate-900 mt-1">
                Capillary Imbibition & Saturation Equilibrium
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                When a 10 pL droplet impacts a porous powder bed at 8 m/s, kinetic Weber number forces compete against capillary Washburn infiltration. The dimensionless <strong className="text-slate-900">Binder Saturation (S)</strong> defines the fraction of inter-particle pore volume filled with liquid. If <em>S</em> is too low (&lt;45%), weak pendular bridges cause green delamination; if <em>S</em> exceeds 80%, excess binder migrates laterally ("bleeding"), degrading dimensional sharpness.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5">
              <div className="text-xs font-mono-tech text-slate-500">01.2 BIMODAL PACKING PHYSICS</div>
              <h3 className="text-base font-semibold text-slate-900 mt-1">
                Overcoming the 55% Green Density Barrier
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Monomodal spherical powders spread by a counter-rotating roller pack to ~52–56% relative density. Because fine powders (&lt;15 µm) required for high sintering driving force suffer from high van der Waals inter-particle cohesion and poor flowability, industrial systems blend <strong className="text-slate-900">bimodal distributions</strong> (e.g., 70% 25 µm coarse + 30% 5 µm fine) so fine spheres occupy octahedral interstitial voids, raising green density to &gt;62% and cutting linear shrinkage to ~14%.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-5">
              <div className="text-xs font-mono-tech text-slate-500">01.3 DENSIFICATION ROUTES</div>
              <h3 className="text-base font-semibold text-slate-900 mt-1">
                Solid-State Sintering vs. Capillary Infiltration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Modern BJ utilizes three primary consolidation mechanisms: (1) <strong className="text-slate-900">Solid-State Sintering</strong> (316L, 17-4PH, Ti-6Al-4V, Cu) yielding single-alloy parts with 16–20% shrinkage; (2) <strong className="text-slate-900">Supersolidus Liquid-Phase Sintering</strong> (Tool steels, WC-Co, Inconel 718) where a 5–15 vol% liquid phase accelerates pore closure; and (3) <strong className="text-slate-900">Capillary Melt Infiltration</strong> (e.g., 420SS infiltrated with Bronze, or SiC infiltrated with molten Si) achieving &lt;1.5% shrinkage.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 02: Allowed Materials & Metallurgical Taxonomy */}
        <section id="allowed-materials" className="scroll-mt-20 space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tech text-blue-700 font-semibold">
                SECTION 02 · ALLOWED MATERIALS & FEEDSTOCK TAXONOMY
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-slate-900 mt-1">
                02. Qualified Material Classes & Metallurgical Properties
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Because printing occurs at room temperature without melting, Binder Jetting can process virtually any material available in powder form—including non-weldable carbides, reflective copper, technical ceramics, and foundry sands.
            </p>
          </div>

          <MaterialsMatrixExplorer />
        </section>

        {/* SECTION 03: Industrial Applications & Production Economics */}
        <section id="applications" className="scroll-mt-20 space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tech text-blue-700 font-semibold">
                SECTION 03 · INDUSTRIAL APPLICATIONS & PRODUCTION VOLUMES
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-slate-900 mt-1">
                03. Domain Applications & Real-World Production Architectures
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Select an industrial vertical below to inspect production batch economics, part consolidation metrics, and metallurgical rationale.
            </p>
          </div>

          {/* Sector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 bg-white divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {APPLICATION_SECTORS.map((sec) => {
              const isSelected = sec.id === selectedSector.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveAppSectorId(sec.id)}
                  className={`p-4 text-left transition-colors cursor-pointer relative ${
                    isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  {isSelected && <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />}
                  <div className="text-xs font-mono-tech text-slate-500">{sec.sweetSpotVolume}</div>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{sec.sector}</div>
                  <div className="text-xs text-slate-600 mt-0.5 line-clamp-1">{sec.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* Active Sector Detail Panel */}
          <div className="bg-white border border-slate-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono-tech text-blue-700 uppercase">
                  VERTICAL DOSSIER · {selectedSector.sector}
                </div>
                <h3 className="text-2xl font-serif-editorial font-semibold text-slate-900">
                  {selectedSector.subtitle}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedSector.technicalDeepDive}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                  <div className="bg-slate-50 border border-slate-200 p-3">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase">BATCH PACKING</div>
                    <div className="text-sm font-mono-tech font-bold text-slate-900 mt-0.5">
                      {selectedSector.typicalBatchSize}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase">LEAD TIME DELTA</div>
                    <div className="text-sm font-mono-tech font-bold text-emerald-700 mt-0.5">
                      {selectedSector.leadTimeReduction}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 col-span-2">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase">ECONOMIC BENCHMARK</div>
                    <div className="text-sm font-mono-tech font-bold text-slate-900 mt-0.5">
                      {selectedSector.unitCostAdvantage}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-mono-tech text-slate-500 uppercase">
                  FLAGSHIP PRODUCTION HARDWARE BENCHMARKS
                </div>
                <div className="space-y-4">
                  {selectedSector.flagshipComponents.map((comp) => (
                    <div key={comp.partName} className="border border-slate-200 bg-slate-50/60 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-base font-semibold text-slate-900">{comp.partName}</h4>
                        <span className="text-xs font-mono-tech font-semibold text-blue-700">
                          {comp.material}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-600 mt-2 pb-3 border-b border-slate-200">
                        <span>MASS: {comp.partMassKg} kg</span>
                        <span aria-hidden="true">·</span>
                        <span>3D BOX COUNT: {comp.greenBoxCount} units/build</span>
                        <span aria-hidden="true">·</span>
                        <span>TOLERANCE: {comp.toleranceAchieved}</span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed mt-3">
                        <strong className="text-slate-900">Engineering Rationale:</strong> {comp.engineeringRationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 04: Points of Strength, Drawbacks, Limitations & Benchmark Matrix */}
        <section id="strengths-limitations" className="scroll-mt-20 space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tech text-blue-700 font-semibold">
                SECTION 04 · CRITICAL ASSESSMENT: STRENGTHS VS. LIMITATIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-slate-900 mt-1">
                04. Points of Strength, Drawbacks, and Engineering Boundaries
              </h2>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1">
              {(['Both', 'Strengths', 'Limitations'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveStrengthView(mode)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeStrengthView === mode
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode === 'Both' ? 'Side-by-Side Analysis' : mode}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${
              activeStrengthView === 'Both' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
            } gap-8 items-start`}
          >
            {/* Points of Strength Column */}
            {(activeStrengthView === 'Both' || activeStrengthView === 'Strengths') && (
              <div className="space-y-4">
                <div className="border-b-2 border-emerald-600 pb-2 flex items-center justify-between">
                  <h3 className="text-lg font-serif-editorial font-semibold text-slate-900">
                    Points of Strength & Competitive Advantages
                  </h3>
                  <span className="text-xs font-mono-tech text-emerald-700 font-semibold">
                    4 CORE ADVANTAGES
                  </span>
                </div>

                {STRENGTHS_DATA.map((item, idx) => (
                  <div key={item.id} className="bg-white border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
                      <span>STRENGTH 0{idx + 1} · {item.category.toUpperCase()}</span>
                      <span className="text-emerald-700 font-semibold">{item.metricBenchmark}</span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{item.mechanisticExplanation}</p>
                    <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 border-l-2 border-blue-600">
                        <span className="font-mono-tech text-[10px] text-slate-500 block">VS. LASER PBF (LPBF)</span>
                        <span className="text-slate-700 mt-0.5 block">{item.comparisonVsLPBF}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 border-l-2 border-slate-500">
                        <span className="font-mono-tech text-[10px] text-slate-500 block">VS. METAL INJECTION (MIM)</span>
                        <span className="text-slate-700 mt-0.5 block">{item.comparisonVsMIM}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Drawbacks & Limitations Column */}
            {(activeStrengthView === 'Both' || activeStrengthView === 'Limitations') && (
              <div className="space-y-4">
                <div className="border-b-2 border-amber-500 pb-2 flex items-center justify-between">
                  <h3 className="text-lg font-serif-editorial font-semibold text-slate-900">
                    Drawbacks, Physical Limitations & Mitigations
                  </h3>
                  <span className="text-xs font-mono-tech text-amber-700 font-semibold">
                    4 CRITICAL CONSTRAINTS
                  </span>
                </div>

                {LIMITATIONS_DATA.map((item, idx) => (
                  <div key={item.id} className="bg-white border border-slate-200 p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
                      <span>LIMITATION 0{idx + 1} · {item.category.toUpperCase()}</span>
                      <span className="text-amber-700 font-semibold">{item.metricBenchmark}</span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-700 leading-relaxed">{item.mechanisticExplanation}</p>

                    {item.engineeringMitigation && (
                      <div className="bg-blue-50/50 border border-blue-200 p-3 text-xs text-slate-800 leading-relaxed">
                        <strong className="font-semibold text-blue-950">Industrial Mitigation Strategy: </strong>
                        {item.engineeringMitigation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cross-Technology Comparison Matrix & Interactive Break-Even Model */}
          <div className="pt-4">
            <TechBenchmarkComparison />
          </div>
        </section>

        {/* SECTION 05: Future Outlook for Industrial Manufacturing Integration */}
        <section id="industrial-outlook" className="scroll-mt-20 space-y-6">
          <div className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono-tech text-blue-700 font-semibold">
                SECTION 05 · FUTURE OUTLOOK & INDUSTRY 4.0 INTEGRATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-slate-900 mt-1">
                05. Future Outlook for Industrial Manufacturing Integration (2026–2035)
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md">
              Transitioning Binder Jetting from standalone R&D job boxes to lights-out, continuous automotive-grade factory production lines requires solving three integration bottlenecks: predictive distortion simulation, robotic depowdering, and continuous tunnel sintering.
            </p>
          </div>

          {/* Horizon Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 bg-white divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {FUTURE_ROADMAP.map((item) => {
              const isSelected = item.id === activeHorizonId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveHorizonId(item.id)}
                  className={`p-5 text-left transition-colors cursor-pointer relative ${
                    isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50'
                  }`}
                >
                  {isSelected && <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />}
                  <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
                    <span>{item.timeframe}</span>
                    <span className="text-blue-700 font-semibold">{item.trlLevel.split(' ')[0]} {item.trlLevel.split(' ')[1]}</span>
                  </div>
                  <div className="text-base font-semibold text-slate-900 mt-1">{item.horizon}</div>
                  <div className="text-xs text-slate-600 mt-1">{item.headline}</div>
                </button>
              );
            })}
          </div>

          {/* All 3 Horizons Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FUTURE_ROADMAP.map((horizon) => {
              const isHighlighted = horizon.id === activeHorizonId;
              return (
                <div
                  key={horizon.id}
                  onClick={() => setActiveHorizonId(horizon.id)}
                  className={`bg-white border p-6 flex flex-col justify-between transition-colors cursor-pointer ${
                    isHighlighted ? 'border-blue-600 shadow-xs' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
                      <span>{horizon.timeframe}</span>
                      <span>{horizon.trlLevel}</span>
                    </div>
                    <h3 className="text-lg font-serif-editorial font-semibold text-slate-900 mt-1">
                      {horizon.headline}
                    </h3>

                    <div className="mt-4 space-y-4">
                      {horizon.coreTechnologies.map((tech) => (
                        <div key={tech.name} className="border-t border-slate-200 pt-3">
                          <div className="text-xs font-semibold text-slate-900">{tech.name}</div>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">{tech.description}</p>
                          <div className="text-[11px] font-mono-tech text-blue-700 mt-1.5">
                            IMPACT: {tech.impactMetric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50 p-3">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase">
                      FACTORY INTEGRATION BOTTLENECKS SOLVED
                    </div>
                    <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
                      {horizon.factoryIntegrationbottlenecksSolved.map((b, i) => (
                        <li key={i} className="leading-snug">
                          · {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Integrated Lights-Out Factory Line Architecture Diagram */}
          <div className="bg-white border border-slate-200 p-6">
            <div className="text-xs font-mono-tech text-slate-500 uppercase">
              END-TO-END DIGITAL MANUFACTURING LINE ARCHITECTURE
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
              Lights-Out Automotive & Aerospace Binder Jetting Production Cell
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mt-5">
              {[
                {
                  step: 'NODE 01',
                  title: 'FEM Pre-Compensation',
                  desc: 'Inverse voxel mesh warping compensating Z-gravity sag & setter friction',
                },
                {
                  step: 'NODE 02',
                  title: 'High-Speed BJ Array',
                  desc: '1200 DPI single-pass piezo bar + coaxial optical layer tomography',
                },
                {
                  step: 'NODE 03',
                  title: 'Closed-Loop Powder Silo',
                  desc: 'Automated nitrogen pneumatic conveying, ultrasonic sieving & 98.5% recycling',
                },
                {
                  step: 'NODE 04',
                  title: 'Robotic Depowdering',
                  desc: '6-axis vision + acoustic vibration excavation & automated alumina setter staging',
                },
                {
                  step: 'NODE 05',
                  title: 'Continuous H₂ Tunnel Sinter',
                  desc: 'Multi-zone catalytic debinding + 1380 °C pure H₂ walking-beam densification',
                },
                {
                  step: 'NODE 06',
                  title: 'Inline CT & CNC Finish',
                  desc: 'Automated optical CMM check + 5-axis finish milling of critical bearing bores',
                },
              ].map((node) => (
                <div key={node.step} className="border border-slate-200 bg-slate-50/70 p-3.5">
                  <div className="text-[11px] font-mono-tech font-semibold text-blue-700">{node.step}</div>
                  <div className="text-xs font-semibold text-slate-900 mt-1">{node.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-1">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 mt-16">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Binder Jetting (ISO/ASTM 52900) Technical Monograph & Engineering Review · Reference Architecture
          </div>
          <div className="flex items-center gap-4">
            <a href="#process-physics" className="hover:text-slate-900">
              Process Physics
            </a>
            <span>·</span>
            <a href="#allowed-materials" className="hover:text-slate-900">
              Materials
            </a>
            <span>·</span>
            <a href="#strengths-limitations" className="hover:text-slate-900">
              Benchmarks
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={handleExportDossier}
              className="text-slate-700 font-medium hover:text-slate-900 cursor-pointer"
            >
              Download Plaintext Dossier
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
