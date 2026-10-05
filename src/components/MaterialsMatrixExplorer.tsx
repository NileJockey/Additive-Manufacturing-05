import React, { useState } from 'react';
import { BJ_MATERIALS, BJMaterial } from '../data/bjTechnicalData';
import { ArrowUpDown, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

const CATEGORIES = [
  'All Materials',
  'Ferrous & Tool Steels',
  'Superalloys & Non-Ferrous',
  'Technical Ceramics & Carbides',
  'Foundry Sands & Polymers',
] as const;

export const MaterialsMatrixExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Materials');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(BJ_MATERIALS[0].id);
  const [sortBy, setSortBy] = useState<'sinteringPeakTempC' | 'yieldStrengthMPa' | 'linearShrinkagePct'>('yieldStrengthMPa');

  const filteredMaterials = BJ_MATERIALS.filter((mat) =>
    selectedCategory === 'All Materials' ? true : mat.category === selectedCategory
  ).sort((a, b) => b[sortBy] - a[sortBy]);

  const activeMaterial: BJMaterial =
    BJ_MATERIALS.find((m) => m.id === selectedMaterialId) || filteredMaterials[0] || BJ_MATERIALS[0];

  return (
    <div className="space-y-6">
      {/* Interactive Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                const firstInCat = BJ_MATERIALS.find((m) =>
                  category === 'All Materials' ? true : m.category === category
                );
                if (firstInCat) setSelectedMaterialId(firstInCat.id);
              }}
              className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === category
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono-tech">SORT MATRIX BY:</span>
          <button
            type="button"
            onClick={() => setSortBy('yieldStrengthMPa')}
            className={`px-2.5 py-1 border font-mono-tech cursor-pointer whitespace-nowrap ${
              sortBy === 'yieldStrengthMPa'
                ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Yield Strength
          </button>
          <button
            type="button"
            onClick={() => setSortBy('sinteringPeakTempC')}
            className={`px-2.5 py-1 border font-mono-tech cursor-pointer whitespace-nowrap ${
              sortBy === 'sinteringPeakTempC'
                ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Sinter Temp
          </button>
          <button
            type="button"
            onClick={() => setSortBy('linearShrinkagePct')}
            className={`px-2.5 py-1 border font-mono-tech cursor-pointer whitespace-nowrap ${
              sortBy === 'linearShrinkagePct'
                ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-semibold'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Shrinkage %
          </button>
        </div>
      </div>

      {/* Main Split View: Tabular Data Matrix + Material Deep-Dive Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Quantitative Materials Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-mono-tech text-slate-500 uppercase">
                <th className="py-3 px-4">Alloy / Material System</th>
                <th className="py-3 px-3">Consolidation</th>
                <th className="py-3 px-3 text-right">Peak Temp</th>
                <th className="py-3 px-3 text-right">Shrinkage</th>
                <th className="py-3 px-3 text-right">Density</th>
                <th className="py-3 px-4 text-right">Yield / TRS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredMaterials.map((mat) => {
                const isSelected = mat.id === activeMaterial.id;
                return (
                  <tr
                    key={mat.id}
                    onClick={() => setSelectedMaterialId(mat.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        {isSelected && <span className="w-1.5 h-1.5 bg-blue-600 inline-block shrink-0" />}
                        <span>{mat.name}</span>
                      </div>
                      <div className="text-[11px] font-mono-tech text-slate-500 mt-0.5">
                        {mat.designation} · D50: {mat.particleSizeD50.split(' ')[0]} µm
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">{mat.consolidationRoute}</td>
                    <td className="py-3.5 px-3 text-right font-mono-tech text-slate-800">
                      {mat.sinteringPeakTempC === 25 ? 'Ambient' : `${mat.sinteringPeakTempC} °C`}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-tech text-slate-800">
                      {mat.linearShrinkagePct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-tech font-medium text-slate-900">
                      {mat.finalDensityPct.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-tech font-semibold text-slate-900">
                      {mat.yieldStrengthMPa} <span className="text-[10px] font-normal text-slate-500">MPa</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right 5 Cols: Active Material Metallurgical & Process Dossier */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6">
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>{activeMaterial.category.toUpperCase()}</span>
            <span>{activeMaterial.designation}</span>
          </div>
          <h3 className="text-2xl font-serif-editorial font-semibold text-slate-900 mt-1">
            {activeMaterial.name}
          </h3>
          <div className="text-xs text-slate-600 mt-1">
            Binder Chemistry: <span className="font-medium text-slate-900">{activeMaterial.binderSystem}</span>
          </div>

          {/* 6-Metric Quantitative Grid */}
          <div className="grid grid-cols-3 gap-px bg-slate-200 border border-slate-200 my-5">
            <div className="bg-slate-50 p-3">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase">UTS / Tensile</div>
              <div className="text-base font-mono-tech font-bold text-slate-900 mt-0.5">
                {activeMaterial.ultimateTensileMPa} <span className="text-[10px] font-normal text-slate-500">MPa</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase">Elongation</div>
              <div className="text-base font-mono-tech font-bold text-slate-900 mt-0.5">
                {activeMaterial.elongationPct}%
              </div>
            </div>
            <div className="bg-slate-50 p-3">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase">Hardness</div>
              <div className="text-sm font-mono-tech font-bold text-slate-900 mt-0.5 truncate">
                {activeMaterial.hardnessValue}
              </div>
            </div>
            <div className="bg-slate-50 p-3">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase">Powder D50</div>
              <div className="text-xs font-mono-tech font-semibold text-slate-900 mt-0.5">
                {activeMaterial.particleSizeD50}
              </div>
            </div>
            <div className="bg-slate-50 p-3">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase">Thermal Cond.</div>
              <div className="text-xs font-mono-tech font-semibold text-slate-900 mt-0.5">
                {activeMaterial.thermalConductivity}
              </div>
            </div>
            <div className="bg-slate-50 p-3">
              <div className="text-[10px] font-mono-tech text-slate-500 uppercase">Linear Shrink</div>
              <div className="text-xs font-mono-tech font-semibold text-blue-700 mt-0.5">
                {activeMaterial.linearShrinkagePct}% Isotropic
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="font-semibold text-slate-900 uppercase tracking-wide mb-1.5">
                Why Process via Binder Jetting
              </div>
              <ul className="space-y-1.5 text-slate-700">
                {activeMaterial.keyAdvantages.map((adv, i) => (
                  <li key={i} className="leading-relaxed pl-3 border-l-2 border-emerald-600">
                    {adv}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="font-semibold text-slate-900 uppercase tracking-wide mb-1.5">
                Metallurgical & Sintering Constraints
              </div>
              <ul className="space-y-1.5 text-slate-700">
                {activeMaterial.processingChallenges.map((chal, i) => (
                  <li key={i} className="leading-relaxed pl-3 border-l-2 border-amber-500">
                    {chal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="font-semibold text-slate-900 uppercase tracking-wide mb-1">
                Qualified Production Components
              </div>
              <div className="text-slate-600 leading-relaxed">
                {activeMaterial.industrialUseCases.join(' · ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
