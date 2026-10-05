import React, { useState } from 'react';
import { PROCESS_STAGES, ProcessStage } from '../data/bjTechnicalData';
import { ChevronRight, Play, RotateCcw, Layers, Flame, Thermometer, ShieldCheck, Sliders } from 'lucide-react';

export const ProcessMechanicsSimulator: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [binderSaturation, setBinderSaturation] = useState<number>(65); // %
  const [layerThicknessUm, setLayerThicknessUm] = useState<number>(50); // µm
  const [sinterHoldTempOffset, setSinterHoldTempOffset] = useState<number>(0); // -25 to +25 °C

  const activeStage: ProcessStage = PROCESS_STAGES[activeIndex];

  // Computed physical telemetry based on interactive sliders
  const computedGreenDensity = Number((58.2 - (layerThicknessUm - 35) * 0.045).toFixed(1));
  const computedGreenStrengthMPa = Number(
    (2.1 + (binderSaturation / 100) * 6.8 - (layerThicknessUm - 50) * 0.02).toFixed(2)
  );
  const bleedingRisk =
    binderSaturation > 78
      ? 'ELEVATED (Dimensional Growth)'
      : binderSaturation < 48
      ? 'LOW SATURATION (Delamination Risk)'
      : 'NOMINAL (Capillary Equilibrium)';

  const computedLinearShrinkageXY = Number(
    (100 * (1 - Math.cbrt(computedGreenDensity / 98.4))).toFixed(2)
  );
  const computedLinearShrinkageZ = Number((computedLinearShrinkageXY * 1.14).toFixed(2));
  const computedFinalDensity = Number(
    Math.min(
      99.4,
      Math.max(93.5, 98.2 + sinterHoldTempOffset * 0.06 - (layerThicknessUm - 50) * 0.015)
    ).toFixed(2)
  );
  const slumpingRisk =
    sinterHoldTempOffset > 12
      ? 'HIGH (Supersolidus Slumping)'
      : sinterHoldTempOffset < -12
      ? 'UNDER-SINTERED (Open Porosity)'
      : 'OPTIMAL DIFFUSION WINDOW';

  return (
    <div className="bg-white border border-slate-200 rounded-none shadow-xs">
      {/* Top Stage Selector Ribbon */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-500">
            <span>ISO/ASTM 52900 PROCESS CHAIN</span>
            <span aria-hidden="true">·</span>
            <span>5-STAGE THERMOMECHANICAL WORKFLOW</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
            Interactive Process Architecture & Microstructural Evolution
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROCESS_STAGES.length - 1))}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Previous Stage
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % PROCESS_STAGES.length)}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Advance Process Step ({activeIndex + 1}/5)</span>
          </button>
        </div>
      </div>

      {/* Stepper Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 border-b border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
        {PROCESS_STAGES.map((stage, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`p-4 text-left transition-colors cursor-pointer relative ${
                isSelected ? 'bg-white' : 'bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className={isSelected ? 'text-blue-600 font-semibold' : 'text-slate-400'}>
                  STEP {stage.stepNumber}
                </span>
                <span className="text-slate-400">{stage.temperatureRange.split(' ')[0]}°C</span>
              </div>
              <div
                className={`text-sm font-semibold mt-1 line-clamp-1 ${
                  isSelected ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {stage.name.split('&')[0].trim()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 truncate">{stage.phase}</div>
            </button>
          );
        })}
      </div>

      {/* Main Split Console: Schematic Visualization + Microstructure & Physics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left 7 Cols: Interactive SVG Cross-Sectional Physics Stage */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-[#0B0F17] text-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
              <span>STAGE {activeStage.stepNumber}: {activeStage.phase.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono-tech text-slate-300">
              <span>TEMP: {activeStage.temperatureRange}</span>
              <span aria-hidden="true">·</span>
              <span>ATM: {activeStage.atmosphere}</span>
            </div>
          </div>

          {/* Custom Dynamic Engineering SVG Schematic */}
          <div className="my-6 relative flex flex-col items-center justify-center min-h-[270px] border border-slate-800/80 bg-[#070A10] p-4">
            {activeIndex === 0 && (
              <svg viewBox="0 0 600 230" className="w-full h-auto max-h-[240px]">
                {/* Grid lines */}
                <defs>
                  <pattern id="techGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="230" fill="url(#techGrid)" />

                {/* Build Box Walls */}
                <path d="M 80 60 L 80 200 L 520 200 L 520 60" fill="none" stroke="#64748B" strokeWidth="3" />
                <rect x="82" y="135" width="436" height="63" fill="#1E293B" />

                {/* Previous layers */}
                <line x1="82" y1="155" x2="518" y2="155" stroke="#334155" strokeDasharray="4 2" />
                <line x1="82" y1="175" x2="518" y2="175" stroke="#334155" strokeDasharray="4 2" />

                {/* Active Layer being spread */}
                <rect x="82" y="120" width="260" height="15" fill="#0EA5E9" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1" />

                {/* Counter-Rotating Roller */}
                <circle cx="350" cy="100" r="24" fill="#334155" stroke="#E2E8F0" strokeWidth="2" />
                <circle cx="350" cy="100" r="5" fill="#38BDF8" />
                {/* Counter-rotation arrow */}
                <path d="M 335 85 A 18 18 0 0 1 365 85" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <polygon points="332,88 336,80 340,87" fill="#38BDF8" />

                {/* Traverse arrow */}
                <line x1="385" y1="100" x2="445" y2="100" stroke="#F59E0B" strokeWidth="2" />
                <polygon points="445,96 455,100 445,104" fill="#F59E0B" />
                <text x="385" y="90" fill="#F59E0B" fontSize="10" fontFamily="IBM Plex Mono">
                  TRAVERSE: 180 mm/s →
                </text>

                {/* Powder heapwave in front of roller */}
                <path d="M 342 124 Q 375 102 405 135 L 342 135 Z" fill="#94A3B8" fillOpacity="0.6" />

                {/* Annotations */}
                <text x="95" y="112" fill="#38BDF8" fontSize="11" fontFamily="IBM Plex Mono">
                  LEVELED LAYER: {layerThicknessUm} µm (PACKING: {computedGreenDensity}%)
                </text>
                <text x="95" y="190" fill="#94A3B8" fontSize="10" fontFamily="IBM Plex Mono">
                  Z-STAGE PISTON INDEX: -{layerThicknessUm} µm / CYCLE
                </text>
              </svg>
            )}

            {activeIndex === 1 && (
              <svg viewBox="0 0 600 230" className="w-full h-auto max-h-[240px]">
                <rect width="600" height="230" fill="#070A10" />
                {/* Powder Bed */}
                <rect x="80" y="130" width="440" height="75" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                {/* Bound Regions */}
                <rect x="140" y="130" width="130" height="50" fill="#0284C7" fillOpacity="0.45" stroke="#38BDF8" strokeWidth="1.5" />
                <rect x="330" y="130" width="110" height="50" fill="#0284C7" fillOpacity="0.45" stroke="#38BDF8" strokeWidth="1.5" />

                {/* Piezo Printhead Assembly */}
                <rect x="310" y="30" width="140" height="42" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
                <text x="322" y="55" fill="#F8FAFC" fontSize="10" fontFamily="IBM Plex Mono">
                  PIEZO MEMS BAR (1200 DPI)
                </text>

                {/* Falling Picoliter Droplets */}
                {[340, 355, 370, 385, 400, 415, 430].map((xPos, i) => (
                  <g key={xPos}>
                    <circle cx={xPos} cy={85 + (i % 3) * 14} r="2.5" fill="#38BDF8" />
                    <circle cx={xPos} cy={105 + (i % 2) * 12} r="2.5" fill="#38BDF8" />
                  </g>
                ))}

                {/* IR Drying Lamp following carriage */}
                <rect x="160" y="42" width="80" height="24" fill="#451A03" stroke="#F59E0B" strokeWidth="1.5" />
                <path d="M 170 68 L 155 125 M 200 68 L 200 125 M 230 68 L 245 125" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                <text x="168" y="58" fill="#FCD34D" fontSize="9" fontFamily="IBM Plex Mono">
                  IR LAMP 75°C
                </text>

                <text x="140" y="198" fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">
                  BINDER SATURATION S = {binderSaturation}% | DROPLET VELOCITY = 8.2 m/s
                </text>
              </svg>
            )}

            {activeIndex === 2 && (
              <svg viewBox="0 0 600 230" className="w-full h-auto max-h-[240px]">
                <rect width="600" height="230" fill="#070A10" />
                {/* Curing Oven Envelope */}
                <rect x="60" y="25" width="480" height="180" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="75" y="45" fill="#F59E0B" fontSize="10" fontFamily="IBM Plex Mono">
                  CONVECTION CURING OVEN: 190 °C CROSSLINKING + DEPOWDERING EXCAVATION
                </text>

                {/* Green Parts Suspended in Unbound Powder */}
                <rect x="120" y="75" width="360" height="110" fill="#1E293B" fillOpacity="0.5" stroke="#475569" />

                {/* Nested 3D Green Parts */}
                <polygon points="150,160 150,110 220,110 240,135 240,160" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
                <polygon points="270,130 270,90 340,90 340,130" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
                <circle cx="410" cy="130" r="28" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
                <circle cx="410" cy="130" r="10" fill="#070A10" stroke="#38BDF8" strokeWidth="1.5" />

                {/* Vacuum Depowdering Nozzle */}
                <path d="M 300 45 L 300 80" stroke="#A7F3D0" strokeWidth="6" />
                <text x="150" y="178" fill="#E2E8F0" fontSize="10" fontFamily="IBM Plex Mono">
                  GREEN TRS: {computedGreenStrengthMPa} MPa | 98.5% UNBOUND POWDER RECLAIMED
                </text>
              </svg>
            )}

            {activeIndex === 3 && (
              <svg viewBox="0 0 600 230" className="w-full h-auto max-h-[240px]">
                <rect width="600" height="230" fill="#070A10" />
                {/* Alumina Setter Tray */}
                <rect x="110" y="165" width="380" height="16" fill="#D6D3D1" />
                <text x="215" y="177" fill="#1C1917" fontSize="9" fontWeight="bold" fontFamily="IBM Plex Mono">
                  HIGH-PURITY ALUMINA (Al₂O₃) SETTER PLATE
                </text>

                {/* Brown Part with Open Pore Channels */}
                <rect x="180" y="90" width="240" height="75" fill="#78350F" fillOpacity="0.45" stroke="#F59E0B" strokeWidth="2" />

                {/* Outgassing Polymer Volatiles Arrows */}
                {[210, 255, 300, 345, 390].map((x) => (
                  <g key={x}>
                    <path d={`M ${x} 135 Q ${x - 8} 95 ${x + 5} 55`} fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 2" />
                    <polygon points={`${x + 2},55 ${x + 5},47 ${x + 8},55`} fill="#FBBF24" />
                  </g>
                ))}

                <text x="155" y="38" fill="#FCD34D" fontSize="10" fontFamily="IBM Plex Mono">
                  PYROLYSIS OUTGASSING (250–550 °C): CₓHᵧO₂ → CO₂ + H₂O + VOLATILES
                </text>
                <text x="185" y="132" fill="#FDE68A" fontSize="11" fontFamily="IBM Plex Mono">
                  BROWN STATE: 44% OPEN INTERCONNECTED POROSITY
                </text>
              </svg>
            )}

            {activeIndex === 4 && (
              <svg viewBox="0 0 600 230" className="w-full h-auto max-h-[240px]">
                <rect width="600" height="230" fill="#070A10" />
                {/* Alumina Setter Tray */}
                <rect x="110" y="170" width="380" height="16" fill="#D6D3D1" />

                {/* Ghost Outline of Green Part Before Shrinkage */}
                <rect
                  x="160"
                  y="65"
                  width="280"
                  height="105"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <text x="168" y="82" fill="#94A3B8" fontSize="9" fontFamily="IBM Plex Mono">
                  GREEN ENVELOPE (56% DENSE)
                </text>

                {/* Consolidated Dense Metal Part After 17-20% Linear Shrinkage */}
                <rect
                  x="192"
                  y="90"
                  width="216"
                  height="80"
                  fill="#0284C7"
                  fillOpacity="0.6"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
                <text x="218" y="132" fill="#F8FAFC" fontSize="11" fontWeight="bold" fontFamily="IBM Plex Mono">
                  SINTERED METAL ({computedFinalDensity}% DENSE)
                </text>

                {/* Shrinkage Vector Arrows */}
                <path d="M 162 125 L 188 125" stroke="#F43F5E" strokeWidth="2" />
                <polygon points="186,121 192,125 186,129" fill="#F43F5E" />
                <path d="M 438 125 L 412 125" stroke="#F43F5E" strokeWidth="2" />
                <polygon points="414,121 408,125 414,129" fill="#F43F5E" />
                <path d="M 300 67 L 300 86" stroke="#F43F5E" strokeWidth="2" />
                <polygon points="296,84 300,90 304,84" fill="#F43F5E" />

                <text x="145" y="205" fill="#38BDF8" fontSize="10" fontFamily="IBM Plex Mono">
                  ΔX/Y SHRINKAGE: -{computedLinearShrinkageXY}% | ΔZ SHRINKAGE: -{computedLinearShrinkageZ}% (GRAVITY ASSISTED)
                </text>
              </svg>
            )}
          </div>

          {/* Bottom Microstructural Necking Progression Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
            <div className="bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[11px] font-mono-tech text-slate-400">VOID POROSITY</div>
              <div className="text-lg font-mono-tech font-semibold text-white mt-0.5">
                {activeStage.microstructureState.porosityPct}%
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[11px] font-mono-tech text-slate-400">NECK-TO-PARTICLE (X/D)</div>
              <div className="text-lg font-mono-tech font-semibold text-cyan-400 mt-0.5">
                {activeStage.microstructureState.neckingRatio.toFixed(2)}
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[11px] font-mono-tech text-slate-400">RESIDUAL BINDER</div>
              <div className="text-lg font-mono-tech font-semibold text-amber-400 mt-0.5">
                {activeStage.microstructureState.binderRemainingPct}%
              </div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3">
              <div className="text-[11px] font-mono-tech text-slate-400">CUMULATIVE SHRINK</div>
              <div className="text-lg font-mono-tech font-semibold text-emerald-400 mt-0.5">
                {activeStage.microstructureState.shrinkageLinearPct}%
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Mechanistic Physics & Parameter Sensitivity Sandbox */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
              <span>STAGE {activeStage.stepNumber} SPECIFICATION</span>
              <span>DURATION: {activeStage.durationRange}</span>
            </div>
            <h4 className="text-xl font-serif-editorial font-semibold text-slate-900 mt-1">
              {activeStage.name}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed mt-2">
              {activeStage.summary}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-900 tracking-wide uppercase">
                Governing Physical Mechanism
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                {activeStage.physicalMechanism}
              </p>
            </div>

            {/* Key Process Window Table */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="text-xs font-semibold text-slate-900 tracking-wide uppercase mb-2.5">
                Standard Industrial Operating Window
              </div>
              <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {activeStage.criticalParameters.map((param) => (
                  <div key={param.label} className="py-2 flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-slate-800">{param.label}</div>
                      <div className="text-[11px] text-slate-500">{param.note}</div>
                    </div>
                    <div className="text-right shrink-0 font-mono-tech">
                      <span className="text-xs font-semibold text-slate-900">{param.value}</span>
                      <span className="text-[10px] text-slate-500 ml-1">{param.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Process Sensitivity Calibration Box */}
          <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Process Parameter Sensitivity Sandbox (316L Ref)</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBinderSaturation(65);
                  setLayerThicknessUm(50);
                  setSinterHoldTempOffset(0);
                }}
                className="text-[11px] font-mono-tech text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs">
                  <label htmlFor="slider-layer" className="text-slate-700 font-medium">
                    Spread Layer Thickness
                  </label>
                  <span className="font-mono-tech font-semibold text-slate-900">{layerThicknessUm} µm</span>
                </div>
                <input
                  id="slider-layer"
                  type="range"
                  min={30}
                  max={100}
                  step={5}
                  value={layerThicknessUm}
                  onChange={(e) => setLayerThicknessUm(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 accent-blue-600 cursor-pointer mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <label htmlFor="slider-saturation" className="text-slate-700 font-medium">
                    Binder Saturation Ratio (S)
                  </label>
                  <span className="font-mono-tech font-semibold text-slate-900">{binderSaturation}%</span>
                </div>
                <input
                  id="slider-saturation"
                  type="range"
                  min={40}
                  max={90}
                  step={1}
                  value={binderSaturation}
                  onChange={(e) => setBinderSaturation(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 accent-blue-600 cursor-pointer mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <label htmlFor="slider-sinter" className="text-slate-700 font-medium">
                    Peak Sintering Hold Offset (Base 1380 °C)
                  </label>
                  <span className="font-mono-tech font-semibold text-slate-900">
                    {sinterHoldTempOffset >= 0 ? `+${sinterHoldTempOffset}` : sinterHoldTempOffset} °C
                  </span>
                </div>
                <input
                  id="slider-sinter"
                  type="range"
                  min={-25}
                  max={25}
                  step={5}
                  value={sinterHoldTempOffset}
                  onChange={(e) => setSinterHoldTempOffset(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 accent-blue-600 cursor-pointer mt-1"
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono-tech">
              <div>
                <span className="text-slate-500 block text-[10px]">PREDICTED GREEN TRS</span>
                <span className="font-semibold text-slate-900">{computedGreenStrengthMPa} MPa</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">SINTERED DENSITY / Z-SHRINK</span>
                <span className="font-semibold text-slate-900">
                  {computedFinalDensity}% / -{computedLinearShrinkageZ}%
                </span>
              </div>
              <div className="col-span-2 text-[11px] text-slate-600 mt-0.5">
                <span className="font-semibold text-slate-800">Diagnostic:</span> {bleedingRisk} · {slumpingRisk}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
