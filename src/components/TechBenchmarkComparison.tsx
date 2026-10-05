import React, { useState } from 'react';
import { TECH_COMPARISON_MATRIX } from '../data/bjTechnicalData';

export const TechBenchmarkComparison: React.FC = () => {
  const [annualVolume, setAnnualVolume] = useState<number>(25000);
  const [partComplexity, setPartComplexity] = useState<'Moderate' | 'High (Internal Channels)'>('High (Internal Channels)');
  const [partMassGrams, setPartMassGrams] = useState<number>(85);

  const mimToolingCapex = partComplexity === 'High (Internal Channels)' ? 95000 : 55000;
  const mimVariableCost = (partMassGrams / 1000) * 24 + 1.45;
  const mimUnitCost = Number((mimToolingCapex / annualVolume + mimVariableCost).toFixed(2));

  const bjVariableCost = (partMassGrams / 1000) * 32 + 3.1;
  const bjSetupAmortization = 1200 / annualVolume;
  const bjUnitCost = Number((bjSetupAmortization + bjVariableCost).toFixed(2));

  const lpbfSupportPenalty = partComplexity === 'High (Internal Channels)' ? 18.5 : 8.0;
  const lpbfUnitCost = Number(((partMassGrams / 1000) * 145 + lpbfSupportPenalty).toFixed(2));

  const recommendedProcess =
    annualVolume < 600
      ? 'Laser PBF or Binder Jetting (Zero Tooling)'
      : annualVolume <= 140000
      ? 'Metal Binder Jetting (Optimal Economic Sweet Spot)'
      : partComplexity === 'High (Internal Channels)'
      ? 'Metal Binder Jetting (Unmoldable Internal Geometry)'
      : 'Metal Injection Molding (Hard Tooling Amortized)';

  const maxCost = Math.max(bjUnitCost, mimUnitCost, lpbfUnitCost);

  return (
    <div className="space-y-8">
      <div className="bg-white border border-slate-200 overflow-x-auto">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono-tech text-slate-500">CROSS-TECHNOLOGY BENCHMARK MATRIX</div>
            <h3 className="text-base font-semibold text-slate-900">
              Binder Jetting (BJ) vs. Laser PBF (LPBF) vs. Metal Injection Molding (MIM) vs. Investment Casting
            </h3>
          </div>
          <span className="text-xs font-mono-tech text-slate-500">STANDARDIZED INDUSTRIAL METRICS</span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-[11px] font-mono-tech text-slate-500 uppercase">
              <th className="py-3.5 px-4">Engineering Criterion</th>
              <th className="py-3.5 px-4 bg-blue-50/50 text-blue-900 font-semibold border-l border-r border-slate-200">
                Binder Jetting (BJ)
              </th>
              <th className="py-3.5 px-4">Laser PBF (SLM / DMLS)</th>
              <th className="py-3.5 px-4">Metal Injection Molding (MIM)</th>
              <th className="py-3.5 px-4">Investment Casting</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {TECH_COMPARISON_MATRIX.map((row) => (
              <tr key={row.criterion} className="hover:bg-slate-50/80">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{row.criterion}</div>
                  <div className="text-[11px] font-mono-tech text-slate-500">{row.unit}</div>
                </td>
                <td className="py-3.5 px-4 font-mono-tech font-semibold text-blue-950 bg-blue-50/30 border-l border-r border-slate-200">
                  {row.binderJetting}
                </td>
                <td className="py-3.5 px-4 font-mono-tech text-slate-700">{row.lpbf}</td>
                <td className="py-3.5 px-4 font-mono-tech text-slate-700">{row.mim}</td>
                <td className="py-3.5 px-4 font-mono-tech text-slate-700">{row.investmentCasting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-slate-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono-tech text-slate-500">INDUSTRIAL MANUFACTURING ECONOMICS MODEL</div>
            <h4 className="text-xl font-serif-editorial font-semibold text-slate-900">
              Batch Break-Even Analyzer: BJ vs. LPBF vs. MIM
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adjust annual production volume, component mass, and internal geometry complexity to evaluate landed per-part cost including tooling amortization, powder feedstock, and post-sintering operations.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs">
                  <label htmlFor="vol-slider" className="font-medium text-slate-700">
                    Annual Production Volume (Parts / Year)
                  </label>
                  <span className="font-mono-tech font-semibold text-slate-900">
                    {annualVolume.toLocaleString()} units
                  </span>
                </div>
                <input
                  id="vol-slider"
                  type="range"
                  min={500}
                  max={200000}
                  step={500}
                  value={annualVolume}
                  onChange={(e) => setAnnualVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 accent-blue-600 cursor-pointer mt-1"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <label htmlFor="mass-slider" className="font-medium text-slate-700">
                    Finished Component Mass (17-4PH Steel)
                  </label>
                  <span className="font-mono-tech font-semibold text-slate-900">{partMassGrams} g</span>
                </div>
                <input
                  id="mass-slider"
                  type="range"
                  min={15}
                  max={450}
                  step={5}
                  value={partMassGrams}
                  onChange={(e) => setPartMassGrams(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 accent-blue-600 cursor-pointer mt-1"
                />
              </div>

              <div>
                <div className="text-xs font-medium text-slate-700 mb-1.5">
                  Geometric & Internal Feature Complexity
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Moderate', 'High (Internal Channels)'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setPartComplexity(level)}
                      className={`py-2 px-3 text-xs font-medium border text-left transition-colors cursor-pointer whitespace-nowrap truncate ${
                        partComplexity === level
                          ? 'border-blue-600 bg-blue-50/60 text-blue-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <span className="text-xs font-mono-tech text-slate-500">ESTIMATED LANDED COST PER PART</span>
              <span className="text-xs font-mono-tech font-semibold text-blue-700">
                RECOMMENDATION: {recommendedProcess.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-900">
                    Metal Binder Jetting (Zero Hard Tooling · Batch Sintered)
                  </span>
                  <span className="font-mono-tech font-bold text-blue-700">${bjUnitCost.toFixed(2)} / unit</span>
                </div>
                <div className="w-full h-3 bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-transform duration-150 origin-left"
                    style={{ transform: `scaleX(${Math.min(1, bjUnitCost / maxCost)})` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">
                    Metal Injection Molding (Includes ${mimToolingCapex.toLocaleString()} Mold Amortization)
                  </span>
                  <span className="font-mono-tech font-semibold text-slate-900">${mimUnitCost.toFixed(2)} / unit</span>
                </div>
                <div className="w-full h-3 bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-slate-600 transition-transform duration-150 origin-left"
                    style={{ transform: `scaleX(${Math.min(1, mimUnitCost / maxCost)})` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">
                    Laser Powder Bed Fusion (2D Nesting + Support Removal Machining)
                  </span>
                  <span className="font-mono-tech font-semibold text-slate-900">${lpbfUnitCost.toFixed(2)} / unit</span>
                </div>
                <div className="w-full h-3 bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-transform duration-150 origin-left"
                    style={{ transform: `scaleX(${Math.min(1, lpbfUnitCost / maxCost)})` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Economic Synthesis:</strong> Below ~5,000 units/year, MIM is penalized by high mold amortization (${(mimToolingCapex / annualVolume).toFixed(2)}/part in tooling alone) and 12-week tooling lead times. Meanwhile, LPBF cost remains flat regardless of volume because point-wise laser melting and 2D build-plate nesting prevent steep economies of scale. Binder Jetting bridges the 1,000 to 150,000 unit production gap.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
