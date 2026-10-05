export interface ProcessStage {
  id: string;
  stepNumber: string;
  name: string;
  phase: 'Primary Printing' | 'Thermal Curing' | 'Post-Processing' | 'Densification';
  temperatureRange: string;
  atmosphere: string;
  durationRange: string;
  relativeDensity: string;
  summary: string;
  physicalMechanism: string;
  criticalParameters: {
    label: string;
    value: string;
    unit: string;
    note: string;
  }[];
  microstructureState: {
    porosityPct: number;
    neckingRatio: number;
    binderRemainingPct: number;
    shrinkageLinearPct: number;
    description: string;
  };
}

export interface BJMaterial {
  id: string;
  designation: string;
  name: string;
  category: 'Ferrous & Tool Steels' | 'Superalloys & Non-Ferrous' | 'Technical Ceramics & Carbides' | 'Foundry Sands & Polymers';
  particleSizeD50: string;
  binderSystem: string;
  consolidationRoute: 'Solid-State Sintering' | 'Liquid-Phase Sintering' | 'Capillary Infiltration' | 'Chemical Curing (No Sinter)' | 'Reaction Bonding';
  sinteringPeakTempC: number;
  linearShrinkagePct: number;
  finalDensityPct: number;
  yieldStrengthMPa: number;
  ultimateTensileMPa: number;
  elongationPct: number;
  hardnessValue: string;
  thermalConductivity: string;
  keyAdvantages: string[];
  processingChallenges: string[];
  industrialUseCases: string[];
}

export interface ApplicationSector {
  id: string;
  sector: string;
  subtitle: string;
  sweetSpotVolume: string;
  typicalBatchSize: string;
  leadTimeReduction: string;
  unitCostAdvantage: string;
  flagshipComponents: {
    partName: string;
    material: string;
    partMassKg: number;
    greenBoxCount: number;
    toleranceAchieved: string;
    engineeringRationale: string;
  }[];
  technicalDeepDive: string;
}

export interface StrengthLimitationItem {
  id: string;
  title: string;
  category: 'Thermodynamics' | 'Throughput & Economics' | 'Geometry & Microstructure' | 'Post-Processing & Metrology';
  metricBenchmark: string;
  mechanisticExplanation: string;
  comparisonVsLPBF: string;
  comparisonVsMIM: string;
  engineeringMitigation?: string;
}

export interface RoadmapHorizon {
  id: string;
  horizon: string;
  timeframe: string;
  trlLevel: string;
  headline: string;
  coreTechnologies: {
    name: string;
    description: string;
    impactMetric: string;
  }[];
  factoryIntegrationbottlenecksSolved: string[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'powder-spreading',
    stepNumber: '01',
    name: 'Powder Deposition & Counter-Rotating Compaction',
    phase: 'Primary Printing',
    temperatureRange: '20 – 25 °C (Ambient)',
    atmosphere: 'Conditioned Air (35–45% RH)',
    durationRange: '3 – 8 sec / layer',
    relativeDensity: '52.0 – 58.5%',
    summary:
      'A metered dose of bimodal spherical powder is ultrasonic-dispensed or hopper-fed ahead of a counter-rotating precision roller that shears and levels a uniform 30–100 µm layer across the build box.',
    physicalMechanism:
      'Counter-rotation generates a hydrodynamic lifting and shear force ahead of the roller nip, fluidizing fine satellite particles and packing bimodal distributions (e.g., 30 µm coarse + 5 µm fine) without disturbing fragile underlying bound layers.',
    criticalParameters: [
      { label: 'Layer Thickness', value: '35 – 100', unit: 'µm', note: '50 µm standard for MIM-grade metals; 150–300 µm for foundry silica sand' },
      { label: 'Roller Traverse Speed', value: '120 – 250', unit: 'mm/s', note: 'Governs shear rate and green bed packing homogeneity' },
      { label: 'Roller Rotational Speed', value: '250 – 400', unit: 'RPM', note: 'Counter-rotating slip ratio prevents powder dragging' },
      { label: 'Bimodal Packing Fraction', value: '56.4', unit: '%', note: 'Directly sets theoretical sintering shrinkage floor' },
    ],
    microstructureState: {
      porosityPct: 43.6,
      neckingRatio: 0,
      binderRemainingPct: 0,
      shrinkageLinearPct: 0,
      description: 'Loose bimodal spherical particles in point-contact equilibrium; interconnected open pore network ready for capillary imbibition.',
    },
  },
  {
    id: 'inkjet-deposition',
    stepNumber: '02',
    name: 'Piezoelectric Drop-on-Demand Binder Jetting',
    phase: 'Primary Printing',
    temperatureRange: '25 – 45 °C (Printhead Regulated)',
    atmosphere: 'Filtered Laminar Exhaust',
    durationRange: '1.5 – 4.0 sec / pass',
    relativeDensity: '56.4% (Solid) + 8% (Liquid Saturation)',
    summary:
      'High-frequency piezoelectric or thermal MEMS printheads containing up to 70,400 nozzles selectively jet picoliter polymeric binder droplets into the powder bed at up to 18 kHz.',
    physicalMechanism:
      'Upon ballistic impact (6–10 m/s), kinetic energy dissipates via powder rearrangement while capillary pressure rapidly draws the polymeric fluid into inter-particle throats, forming pendular and funicular liquid bridges.',
    criticalParameters: [
      { label: 'Droplet Volume', value: '1.2 – 35', unit: 'pL', note: 'Smaller droplets yield finer edge acuity and reduced ballistic cratering' },
      { label: 'Binder Saturation (S)', value: '55 – 75', unit: '% pore vol', note: 'Ratio of injected binder volume to local inter-particle void volume' },
      { label: 'Native Print Resolution', value: '1200 × 1200', unit: 'DPI', note: 'Single-pass carriage arrays span up to 500 mm width' },
      { label: 'Evaporative Inter-Layer Dry', value: '60 – 90', unit: '°C IR lamp', note: 'Partial solvent flash-off prevents interlayer bleeding' },
    ],
    microstructureState: {
      porosityPct: 43.6,
      neckingRatio: 0.05,
      binderRemainingPct: 100,
      shrinkageLinearPct: 0,
      description: 'Polymeric liquid menisci (pendular rings) bridge adjacent metal/ceramic granules, imparting initial wet capillary cohesion.',
    },
  },
  {
    id: 'curing-depowdering',
    stepNumber: '03',
    name: 'Low-Temperature Polymerization & Green Depowdering',
    phase: 'Thermal Curing',
    temperatureRange: '175 – 210 °C',
    atmosphere: 'Convection Air / Nitrogen',
    durationRange: '4 – 12 hours (Full Job Box)',
    relativeDensity: '56.0 – 58.0% (Green State)',
    summary:
      'The entire job box is transferred to a curing oven to crosslink the thermoset or thermoplastic binder, converting wet capillary bridges into solid polymer necks sufficient for manual or robotic depowdering.',
    physicalMechanism:
      'Solvent evaporation and condensation polymerization (e.g., furfuryl alcohol, phenolic, or aqueous acrylic-PEG systems) increase transverse rupture strength (TRS) to 3–8 MPa, enabling loose powder excavation via vacuum, vibration, and ionized air.',
    criticalParameters: [
      { label: 'Green Bending Strength (TRS)', value: '3.5 – 7.8', unit: 'MPa', note: 'Must exceed handling stresses during automated brush/air depowdering' },
      { label: 'Curing Soak Temperature', value: '190', unit: '°C', note: 'Below oxidation threshold of fine metallic powders' },
      { label: 'Unbound Powder Recyclability', value: '98.5', unit: '%', note: 'Zero thermal laser spatter or condensate contamination' },
      { label: 'Residual Moisture Target', value: '< 0.08', unit: 'wt%', note: 'Essential to prevent blistering during subsequent ramp' },
    ],
    microstructureState: {
      porosityPct: 42.5,
      neckingRatio: 0.12,
      binderRemainingPct: 92,
      shrinkageLinearPct: 0.1,
      description: 'Hardened polymeric bridges hold particles in rigid green scaffold; >98% of surrounding unbound powder is vacuum-reclaimed for immediate reuse.',
    },
  },
  {
    id: 'thermal-debinding',
    stepNumber: '04',
    name: 'Pyrolytic Debinding & Carbon Control',
    phase: 'Post-Processing',
    temperatureRange: '250 – 550 °C',
    atmosphere: 'Sweep H₂ / Ar or Partial Vacuum',
    durationRange: '6 – 14 hours',
    relativeDensity: '55.5% (Brown State)',
    summary:
      'Controlled slow thermal ramp decomposes the cured organic binder chains into volatile hydrocarbons that outgas through the open porous network, leaving a fragile "brown part" held together by van der Waals and nascent oxide/metallic contacts.',
    physicalMechanism:
      'Thermal scission of polymer backbones must proceed slower than gas diffusion through tortuous 2–10 µm pore channels. Incomplete pyrolysis leaves residual char (soot) that alters alloy carbon stoichiometry (e.g., sensitizing 316L or forming Cr-carbides).',
    criticalParameters: [
      { label: 'Heating Ramp Rate', value: '0.5 – 2.0', unit: '°C/min', note: 'Prevents internal gas overpressure and delamination cracks' },
      { label: 'Residual Carbon Pickup', value: '< 0.03', unit: 'wt%', note: 'Critical for low-carbon austenitic stainless steels (316L)' },
      { label: 'Brown Part Strength', value: '0.8 – 1.5', unit: 'MPa', note: 'Minimum strength state; requires ceramic setter support' },
      { label: 'Sweep Gas Flow', value: '15 – 40', unit: 'L/min', note: 'Flushes pyrolysis volatiles before condensation' },
    ],
    microstructureState: {
      porosityPct: 44.0,
      neckingRatio: 0.15,
      binderRemainingPct: 0.5,
      shrinkageLinearPct: 0.3,
      description: 'Polymer bridges cleanly volatilized; particles rest in fragile brown state with nascent atomic surface diffusion at contact points.',
    },
  },
  {
    id: 'high-temp-sintering',
    stepNumber: '05',
    name: 'Solid-State / Supersolidus Liquid-Phase Sintering',
    phase: 'Densification',
    temperatureRange: '1150 – 1600 °C (Alloy Dependent)',
    atmosphere: '100% Dry H₂ or High Vacuum (10⁻³ mbar)',
    durationRange: '8 – 24 hours (Full Furnace Cycle)',
    relativeDensity: '96.5 – 99.2% (Sintered)',
    summary:
      'At 80–92% of the absolute melting temperature (Tm), reduction of surface oxides and rapid atomic diffusion drive neck growth, pore spheroidization, and pore elimination, accompanied by 14–20% linear shrinkage.',
    physicalMechanism:
      'Driven by the reduction in high surface free energy of fine MIM powders (5–22 µm). Surface diffusion initiates necking, followed by grain boundary and lattice diffusion (Cobble and Nabarro-Herring creep). Gravity and setter friction induce anisotropic distortion unless pre-compensated.',
    criticalParameters: [
      { label: 'Isothermal Peak Hold', value: '1360 – 1385', unit: '°C (316L)', note: 'Tuned within ±5 °C across multi-zone Molybdenum hearth' },
      { label: 'Linear Shrinkage (X / Y)', value: '15.2 – 17.8', unit: '%', note: 'Isotropic in X-Y plane; governed by initial bed packing' },
      { label: 'Linear Shrinkage (Z-Axis)', value: '18.5 – 21.4', unit: '%', note: 'Higher due to gravity-assisted interlayer pore collapse' },
      { label: 'As-Sintered Density', value: '97.2 – 99.1', unit: '% theoretical', note: 'Can reach 99.8% with subsequent Hot Isostatic Pressing (HIP)' },
    ],
    microstructureState: {
      porosityPct: 1.8,
      neckingRatio: 0.94,
      binderRemainingPct: 0,
      shrinkageLinearPct: 17.5,
      description: 'Equiaxed recrystalline polyhedral grains with annealing twins; isolated spherical closed pores (<5 µm) and isotropic mechanical response.',
    },
  },
];

export const BJ_MATERIALS: BJMaterial[] = [
  {
    id: 'ss-316l',
    designation: 'AISI 316L / UNS S31603',
    name: 'Austenitic Stainless Steel 316L',
    category: 'Ferrous & Tool Steels',
    particleSizeD50: '9 – 22 µm (Gas Atomized)',
    binderSystem: 'Aqueous Acrylic-PEG Clean-Burn Binder',
    consolidationRoute: 'Solid-State Sintering',
    sinteringPeakTempC: 1380,
    linearShrinkagePct: 17.2,
    finalDensityPct: 98.2,
    yieldStrengthMPa: 215,
    ultimateTensileMPa: 530,
    elongationPct: 48,
    hardnessValue: '78 HRB',
    thermalConductivity: '16.2 W/m·K',
    keyAdvantages: [
      'Exceptionally high ductility (48% elongation) and corrosion resistance matching wrought ASTM A240',
      'Equiaxed microstructure free of the directional columnar grains typical of laser PBF',
      'Mature, repeatable sintering windows in 100% H₂ or partial vacuum furnaces',
    ],
    processingChallenges: [
      'Susceptible to carbon pickup >0.03 wt% if debinding sweep gas is poorly routed, causing grain-boundary chromium carbide sensitization',
      'High sintering temperature (1380 °C) increases gravitational slumping of unsupported overhangs >15 mm',
    ],
    industrialUseCases: [
      'Sanitary food & biopharma fluid manifolds',
      'Marine pump impellers and valve bodies',
      'Consumer luxury watch cases and surgical instrument jaws',
    ],
  },
  {
    id: 'ss-17-4ph',
    designation: 'SAE 17-4PH / EN 1.4542',
    name: 'Martensitic Precipitation-Hardening Steel',
    category: 'Ferrous & Tool Steels',
    particleSizeD50: '10 – 25 µm (Bimodal Blend)',
    binderSystem: 'Solvent/Polymeric Low-Residue Binder',
    consolidationRoute: 'Solid-State Sintering',
    sinteringPeakTempC: 1350,
    linearShrinkagePct: 16.8,
    finalDensityPct: 98.6,
    yieldStrengthMPa: 1090,
    ultimateTensileMPa: 1185,
    elongationPct: 11,
    hardnessValue: '39 HRC (H900 Condition)',
    thermalConductivity: '18.4 W/m·K',
    keyAdvantages: [
      'Combines >1100 MPa tensile strength (after H900 Cu-precipitation aging) with good atmospheric corrosion resistance',
      'Most widely qualified structural metal in commercial binder jetting production',
      'Cost-effective MIM-grade powder availability from global atomizers',
    ],
    processingChallenges: [
      'Delta-ferrite retention along grain boundaries if sintering temperature exceeds 1365 °C',
      'Sensitive to oxygen content in powder feedstock (>800 ppm O₂ impedes full pore closure)',
    ],
    industrialUseCases: [
      'Aerospace structural brackets and actuator housings',
      'Automotive fuel injection bodies and turbocharger actuators',
      'Robotic end-of-arm tooling and firearm receiver components',
    ],
  },
  {
    id: 'tool-m2-h13',
    designation: 'AISI M2 / H13 Tool Steel',
    name: 'High-Speed & Hot-Work Tool Steels',
    category: 'Ferrous & Tool Steels',
    particleSizeD50: '12 – 28 µm',
    binderSystem: 'Phenolic / Carbon-Tailored Binder',
    consolidationRoute: 'Liquid-Phase Sintering',
    sinteringPeakTempC: 1245,
    linearShrinkagePct: 15.5,
    finalDensityPct: 99.1,
    yieldStrengthMPa: 1420,
    ultimateTensileMPa: 1680,
    elongationPct: 4.5,
    hardnessValue: '62 – 64 HRC (Quenched & Tempered)',
    thermalConductivity: '24.5 W/m·K',
    keyAdvantages: [
      'Zero thermal-shock cracking during printing—unlike LPBF where high-carbon tool steels crack due to 10⁶ K/s cooling rates',
      'Uniform dispersion of fine MC and M₆C carbides without macro-segregation',
      'Enables complex internal conformal cooling channels in injection molding and die-casting inserts',
    ],
    processingChallenges: [
      'Extremely narrow supersolidus liquid-phase sintering window (±3 °C); overheating causes eutectic carbide networks and distortion',
      'Requires precise carbon stoichiometry balance between binder char and powder oxygen',
    ],
    industrialUseCases: [
      'Conformal-cooled plastic injection mold cores',
      'Aluminum high-pressure die casting (HPDC) inserts',
      'Metal cutting indexable mill bodies and cold-heading punches',
    ],
  },
  {
    id: 'in-718-625',
    designation: 'UNS N07718 / Inconel 718 & 625',
    name: 'Nickel-Chromium Superalloys',
    category: 'Superalloys & Non-Ferrous',
    particleSizeD50: '8 – 20 µm',
    binderSystem: 'Zero-Ash Polymeric Binder',
    consolidationRoute: 'Liquid-Phase Sintering',
    sinteringPeakTempC: 1285,
    linearShrinkagePct: 18.1,
    finalDensityPct: 98.8,
    yieldStrengthMPa: 1050,
    ultimateTensileMPa: 1290,
    elongationPct: 16,
    hardnessValue: '41 HRC (AMS 5662 Aged)',
    thermalConductivity: '11.4 W/m·K',
    keyAdvantages: [
      'Retains structural integrity and creep resistance up to 700 °C in oxidizing gas-turbine environments',
      'Avoids strain-age cracking during printing and eliminates expensive wire-EDM support removal required in laser PBF',
      'Boron or silicon trace sintering aids enable >98.8% density without HIP',
    ],
    processingChallenges: [
      'Stable Cr₂O₃, Al₂O₃, and TiO₂ surface films require ultra-high vacuum or high-purity hydrogen with low dew point (< -60 °C)',
      'Laves phase or continuous grain-boundary precipitates if cooling rate post-sintering is too slow',
    ],
    industrialUseCases: [
      'Turbine stator vanes, swirlers, and fuel nozzles',
      'Downhole petrochemical sensor housings and sour-gas valves',
      'High-temperature rocket thruster injector plates',
    ],
  },
  {
    id: 'cu-etp',
    designation: 'UNS C11000 / 99.9% Pure Cu',
    name: 'High-Conductivity Pure Copper',
    category: 'Superalloys & Non-Ferrous',
    particleSizeD50: '10 – 25 µm',
    binderSystem: 'Low-Temperature Organic Clean Binder',
    consolidationRoute: 'Solid-State Sintering',
    sinteringPeakTempC: 1045,
    linearShrinkagePct: 18.4,
    finalDensityPct: 97.6,
    yieldStrengthMPa: 75,
    ultimateTensileMPa: 215,
    elongationPct: 38,
    hardnessValue: '45 HRF',
    thermalConductivity: '365 W/m·K (94% IACS)',
    keyAdvantages: [
      'Optical reflectivity to 1064 nm IR lasers is irrelevant in BJ, solving the notorious laser reflection problem of pure copper in LPBF',
      'Achieves >92–96% IACS electrical conductivity and >360 W/m·K thermal conductivity after H₂ reduction sintering',
      'Ideal for dense micro-pin arrays and vapor chamber wicks',
    ],
    processingChallenges: [
      'Steam embrittlement ("hydrogen sickness") if internal Cu₂O reacts with H₂ too rapidly before open pores close; requires staged low-temp H₂ reduction at 350 °C',
      'Soft green and sintered state requires careful ceramic setter staging to prevent sag',
    ],
    industrialUseCases: [
      'AI data-center GPU cold plates and two-phase immersion heat exchangers',
      'EV traction motor hairpin windings and induction heating coils',
      'RF waveguides and particle accelerator cavities',
    ],
  },
  {
    id: 'ti-6al-4v',
    designation: 'ASTM Grade 5 / Grade 23 Ti-6Al-4V',
    name: 'Titanium Alpha-Beta Alloy',
    category: 'Superalloys & Non-Ferrous',
    particleSizeD50: '15 – 38 µm (Plasma Atomized)',
    binderSystem: 'Specialized Oxygen-Free Fugitive Binder',
    consolidationRoute: 'Solid-State Sintering',
    sinteringPeakTempC: 1390,
    linearShrinkagePct: 16.2,
    finalDensityPct: 97.8,
    yieldStrengthMPa: 860,
    ultimateTensileMPa: 950,
    elongationPct: 12,
    hardnessValue: '34 HRC',
    thermalConductivity: '6.7 W/m·K',
    keyAdvantages: [
      'High strength-to-weight ratio (density 4.43 g/cm³) and full biocompatibility',
      'Isotropic alpha-beta colony structure with lower residual stress than EBM or LPBF',
    ],
    processingChallenges: [
      'Titanium is a universal getter for Oxygen, Carbon, and Nitrogen above 400 °C; interstitial pickup >0.20 wt% O₂ causes severe embrittlement',
      'Requires expensive low-residue polymeric binders and high-vacuum (10⁻⁵ mbar) Y₂O₃-coated setter trays',
    ],
    industrialUseCases: [
      'Orthopedic spinal cages with controlled osseointegrative porous shells',
      'Aerospace hydraulic manifold blocks and satellite brackets',
      'Lightweight racing powertrain linkages',
    ],
  },
  {
    id: 'wc-co',
    designation: 'WC-12Co / WC-10Co',
    name: 'Tungsten Carbide - Cobalt Cermet',
    category: 'Technical Ceramics & Carbides',
    particleSizeD50: '15 – 30 µm (Spray-Dried Granules)',
    binderSystem: 'Organic Polyol-Acrylic Binder',
    consolidationRoute: 'Liquid-Phase Sintering',
    sinteringPeakTempC: 1430,
    linearShrinkagePct: 21.5,
    finalDensityPct: 99.6,
    yieldStrengthMPa: 2400,
    ultimateTensileMPa: 2850,
    elongationPct: 0.4,
    hardnessValue: '1380 – 1550 HV30 (89.5 HRA)',
    thermalConductivity: '85.0 W/m·K',
    keyAdvantages: [
      'Impossible to process crack-free via laser PBF without cobalt evaporation; BJ + Sinter-HIP produces full-density (>99.6%) cemented carbides',
      'Enables complex internal coolant helices and weight-reduced mining/drilling wear pads',
    ],
    processingChallenges: [
      'High linear shrinkage (20–23%) from spray-dried agglomerated granules requires high-fidelity FEM distortion compensation',
      'Carbon window is razor-thin: carbon deficiency forms brittle eta-phase (Co₃W₃C), carbon excess precipitates free graphite',
    ],
    industrialUseCases: [
      'Oil & gas polycrystalline diamond compact (PDC) drill bit bodies',
      'Indexable metalworking cutting drills with twisted internal coolant ports',
      'Abrasive slurry pump wear rings and extrusion dies',
    ],
  },
  {
    id: 'sic-al2o3',
    designation: 'RB-SiC / 99.5% Al₂O₃',
    name: 'Silicon Carbide & Technical Alumina',
    category: 'Technical Ceramics & Carbides',
    particleSizeD50: '10 – 45 µm',
    binderSystem: 'Phenolic Char-Yielding or Aqueous Binder',
    consolidationRoute: 'Reaction Bonding',
    sinteringPeakTempC: 1550,
    linearShrinkagePct: 1.2,
    finalDensityPct: 99.2,
    yieldStrengthMPa: 410,
    ultimateTensileMPa: 460,
    elongationPct: 0.1,
    hardnessValue: '2450 HV10',
    thermalConductivity: '145.0 W/m·K',
    keyAdvantages: [
      'Reaction-Bonded SiC (molten silicon capillary infiltration at 1500 °C) exhibits near-zero shrinkage (<1.5%), preserving ultra-tight dimensional tolerances across 500 mm parts',
      'Extreme specific stiffness, thermal shock stability, and chemical inertness',
    ],
    processingChallenges: [
      'Residual free silicon (8–12 vol%) in RB-SiC limits maximum operating temperature to ~1380 °C (melting point of Si)',
      'Solid-state sintered pure SiC or Al₂O₃ requires sub-micron powders that are difficult to spread dry without slurry binder jetting',
    ],
    industrialUseCases: [
      'Semiconductor EUV lithography wafer chucks and stages',
      'Space-based telescope mirror substrates',
      'Chemical reactor heat exchanger blocks and ballistic armor tiles',
    ],
  },
  {
    id: 'foundry-silica-cerabeads',
    designation: 'SiO₂ Silica / Synthetic Mullite Cerabeads',
    name: 'Foundry Casting Sands & Ceramic Cores',
    category: 'Foundry Sands & Polymers',
    particleSizeD50: '90 – 190 µm',
    binderSystem: 'Furan, Phenolic, or Inorganic Silicate',
    consolidationRoute: 'Chemical Curing (No Sinter)',
    sinteringPeakTempC: 25,
    linearShrinkagePct: 0.15,
    finalDensityPct: 58.0,
    yieldStrengthMPa: 3.2,
    ultimateTensileMPa: 4.8,
    elongationPct: 0.2,
    hardnessValue: '85 GF (Scratch Hardness)',
    thermalConductivity: '0.65 W/m·K',
    keyAdvantages: [
      'No thermal furnace sintering required—parts are chemically cured in the print bed via acid catalyst or mild thermal activation',
      'Massive build volumes (up to 4000 × 2000 × 1000 mm) running at >120 liters/hour',
      'Eliminates 12–16 weeks of hard pattern tooling for complex sand castings',
    ],
    processingChallenges: [
      'Organic furan binders evolve VOC gasses during molten metal pouring, requiring printed vent networks to prevent gas porosity in castings',
      'Inorganic sodium silicate binders eliminate emissions but have lower humidity shelf-life',
    ],
    industrialUseCases: [
      'Automotive cylinder blocks, cylinder heads, and EV mega-casting cores',
      'Large marine bronze propellers and hydroelectric Francis turbine runners',
      'Aerospace aluminum and magnesium sand-cast transmission housings',
    ],
  },
];

export const APPLICATION_SECTORS: ApplicationSector[] = [
  {
    id: 'automotive-mass-production',
    sector: 'Automotive Series Production',
    subtitle: 'High-Volume Powertrain, Chassis & Interior Structural Metal Hardware',
    sweetSpotVolume: '10,000 – 250,000 parts / year',
    typicalBatchSize: '450 – 1,800 parts / build box',
    leadTimeReduction: '75% vs. MIM hard tooling',
    unitCostAdvantage: '$1.80 – $12.50 / finished component',
    flagshipComponents: [
      {
        partName: 'Convertible Roof Kinematic Hinge Bracket (BMW i8 / Series)',
        material: '17-4PH / 316L Stainless Steel',
        partMassKg: 0.085,
        greenBoxCount: 640,
        toleranceAchieved: '±0.12 mm as-sintered (±0.015 mm CNC bore)',
        engineeringRationale:
          'Topology-optimized hollow lattice design reduced component mass by 44% while consolidating 3 welded sub-assemblies into a single sintered part.',
      },
      {
        partName: 'Gearshift Selector Fork & Hollow Transmission Synchronizer',
        material: 'Low-Alloy Case-Hardening Steel (4140 / 16MnCr5)',
        partMassKg: 0.21,
        greenBoxCount: 380,
        toleranceAchieved: '±0.15 mm profile',
        engineeringRationale:
          'Internal oil-routing channels printed directly inside the fork arms provide targeted lubrication to sliding pads, impossible via forging or MIM.',
      },
    ],
    technicalDeepDive:
      'Automotive OEMs utilize two distinct Binder Jetting tracks: (1) Direct Metal BJ for small-to-medium complex steel components (<250 g) where 3D nesting packs 500+ parts per 20-liter build box, out-competing Metal Injection Molding (MIM) when annual volumes sit below 150,000 units or design iterations are frequent; and (2) Indirect Sand BJ for rapid production of complex water-jacket cores in EV motor housings and cylinder heads.',
  },
  {
    id: 'aerospace-turbomachinery',
    sector: 'Aerospace & Defense Propulsion',
    subtitle: 'High-Temperature Superalloys, Fuel Swirlers & Lightweight Actuation',
    sweetSpotVolume: '250 – 15,000 parts / year',
    typicalBatchSize: '24 – 120 parts / build box',
    leadTimeReduction: '82% vs. investment casting',
    unitCostAdvantage: '45–60% lower cost than LPBF',
    flagshipComponents: [
      {
        partName: 'Combustor Fuel Injector Swirler Assembly',
        material: 'Inconel 718 / Haynes 282 (Sinter + HIP)',
        partMassKg: 0.34,
        greenBoxCount: 84,
        toleranceAchieved: '±0.10 mm after compensation & HIP',
        engineeringRationale:
          'Eliminates internal support structures inside tortuous fuel passages that cannot be mechanically or chemically removed in Laser Powder Bed Fusion.',
      },
      {
        partName: 'Satellite Reaction Wheel Titanium Mounting Spider',
        material: 'Ti-6Al-4V Grade 23',
        partMassKg: 0.62,
        greenBoxCount: 36,
        toleranceAchieved: '±0.18 mm overall envelope',
        engineeringRationale:
          'Isotropic grain structure after vacuum sintering + HIP avoids the anisotropic fatigue debit of z-axis LPBF builds.',
      },
    ],
    technicalDeepDive:
      'In aerospace propulsion, internal fluidic geometries (fuel nozzles, bleed-air manifolds, heat exchangers) suffer in LPBF because internal overhangs below 45° require sacrificial metal supports that are inaccessible to post-machining. Because BJ relies on the surrounding unbound powder bed for physical support during printing, complex helical passages print support-free. Subsequent Hot Isostatic Pressing (HIP) at 1180 °C and 100 MPa argon closes isolated internal pores to >99.8% density, satisfying Flight Critical Fatigue standards.',
  },
  {
    id: 'thermal-electronics-energy',
    sector: 'AI Data Center Thermal & Clean Energy',
    subtitle: 'Pure Copper Two-Phase Cold Plates, Electrolyzer Plates & SiC Reactors',
    sweetSpotVolume: '5,000 – 100,000 parts / year',
    typicalBatchSize: '150 – 400 cold plates / build box',
    leadTimeReduction: '65% vs. skived/brazed assemblies',
    unitCostAdvantage: '30% lower thermal resistance (Rth)',
    flagshipComponents: [
      {
        partName: '1500W AI Accelerator Micro-Pin & Gyroid Cold Plate',
        material: '99.9% Pure Copper (C11000)',
        partMassKg: 0.42,
        greenBoxCount: 190,
        toleranceAchieved: '±0.12 mm; 180 µm fin thickness',
        engineeringRationale:
          'Monolithic sintered copper eliminates solder/braze thermal interface resistance and leakage points while Graded TPMS gyroid structures boost convective heat transfer coefficient by 2.4×.',
      },
      {
        partName: 'Compact Modular Chemical Heat Exchanger Core',
        material: 'Reaction-Bonded Silicon Carbide (RB-SiC)',
        partMassKg: 3.8,
        greenBoxCount: 12,
        toleranceAchieved: '±0.08 mm (<1.2% linear shrinkage)',
        engineeringRationale:
          'Impervious to boiling sulfuric and hydrofluoric acids at 900 °C where superalloys corrode rapidly.',
      },
    ],
    technicalDeepDive:
      'Pure copper is notoriously difficult for infrared laser systems due to >95% optical reflectivity at 1064 nm. Because Binder Jetting decouples geometry creation (room-temperature inkjetting) from thermal consolidation (hydrogen furnace sintering at 1045 °C), it processes high-purity copper with ease. Furthermore, by controlling sintering temperature or adding fugitive pore formers, engineers can grade capillary wick porosity alongside solid manifold walls for high-flux vapor chambers.',
  },
  {
    id: 'heavy-foundry-tooling',
    sector: 'Heavy Foundry & Hard Tooling',
    subtitle: 'Digital Sand Casting Cores & Cemented Carbide Wear Components',
    sweetSpotVolume: '1 – 5,000 castings or tools / year',
    typicalBatchSize: '1 – 40 large sand cores / bed',
    leadTimeReduction: '90% (Days instead of 16 weeks)',
    unitCostAdvantage: 'Zero core-box tooling capital ($0 CAPEX)',
    flagshipComponents: [
      {
        partName: 'One-Piece Integrated Water-Jacket & Crankcase Sand Core Package',
        material: 'Furan-Bound Silica Sand / Cerabeads',
        partMassKg: 48.5,
        greenBoxCount: 8,
        toleranceAchieved: '±0.35 mm across 1,200 mm span',
        engineeringRationale:
          'Consolidates 14 separate glued sand cores into a single monolithic core with zero parting-line flash and integrated gas-venting channels.',
      },
      {
        partName: 'Oil & Gas PDC Drill Bit Crown with Twisted Coolant Ports',
        material: 'WC-12Co Cemented Carbide',
        partMassKg: 4.2,
        greenBoxCount: 18,
        toleranceAchieved: '±0.20 mm sintered-HIP',
        engineeringRationale:
          'Replaces manual graphite mold packing and infiltration with digital geometry freedom for erosion-resistant nozzle placement.',
      },
    ],
    technicalDeepDive:
      'Sand Binder Jetting represents the largest installed tonnage of additive manufacturing globally. By jetting furan or inorganic silicate binders into 150 µm foundry sand across 4-meter beds, foundries bypass core-box CNC machining entirely. Meanwhile, on the hard-metal side, WC-Co binder jetting produces full-density cemented carbides via liquid-phase sintering—a feat impossible in laser PBF without catastrophic thermal cracking.',
  },
];

export const STRENGTHS_DATA: StrengthLimitationItem[] = [
  {
    id: 'decoupled-physics',
    title: 'Decoupling of Geometry Creation from Thermal Consolidation',
    category: 'Thermodynamics',
    metricBenchmark: '0 K/s Thermal Gradient During Printing',
    mechanisticExplanation:
      'Unlike Laser or Electron Beam Powder Bed Fusion (LPBF/EB-PBF), which melt powder locally with extreme cooling rates (10⁵–10⁷ K/s), Binder Jetting forms geometry at ambient temperature (~25 °C). Consequently, green parts contain zero thermally induced residual stress, zero martensitic cracking during printing, and no directional columnar grain texture.',
    comparisonVsLPBF: 'Eliminates warping, build-plate detachment, and crack-susceptibility in refractory carbides, ceramics, and high-carbon tool steels.',
    comparisonVsMIM: 'Achieves identical furnace-sintered equiaxed microstructures without requiring $40k–$120k hard steel injection molds.',
  },
  {
    id: 'volumetric-throughput',
    title: 'Volumetric Line-Array Scalability & 3D Build Box Packing',
    category: 'Throughput & Economics',
    metricBenchmark: '2,000 – 15,000 cm³/hr (Metal) | >100,000 cm³/hr (Sand)',
    mechanisticExplanation:
      'Because binder is deposited by wide page-width piezoelectric printhead bars (up to 70,000+ nozzles firing simultaneously in a single carriage pass) rather than point-wise laser scanning, print time per layer (2–5 seconds) is independent of the cross-sectional area being bound. Furthermore, absence of anchored support structures allows true 3D volumetric nesting throughout the entire Z-height of the job box.',
    comparisonVsLPBF: '10× to 50× higher volumetric build rate than quad-laser LPBF; LPBF is restricted to 2D build-plate nesting.',
    comparisonVsMIM: 'Competitive per-part cost up to ~100,000 unit annual volumes, with instant digital changeover between batches.',
  },
  {
    id: 'support-free-powder-bed',
    title: 'Support-Free Overhangs & Internal Fluidic Passages',
    category: 'Geometry & Microstructure',
    metricBenchmark: '0 Sacrificial Metal Supports During Printing',
    mechanisticExplanation:
      'During the printing and curing stages, the surrounding unbound powder bed (55% packing density) physically supports all overhanging features, internal cavities, and floating sub-components. Depowdering is accomplished via dry brushing, vibration, and compressed air rather than wire-EDM, band-sawing, and CNC milling of welded metal supports.',
    comparisonVsLPBF: 'Saves 30–60% of post-print machining labor and unlocks inaccessible tortuous internal channels.',
    comparisonVsMIM: 'Enables undercut geometries, hollow lattices, and variable wall thicknesses that would lock a part inside a rigid MIM mold.',
  },
  {
    id: 'feedstock-economics',
    title: 'MIM-Grade Powder Compatibility & >98% Powder Recyclability',
    category: 'Throughput & Economics',
    metricBenchmark: '$18 – $45/kg MIM Powder vs. $60 – $140/kg LPBF Powder',
    mechanisticExplanation:
      'Binder Jetting thrives on fine (D50 = 9–22 µm) powders with high specific surface area to drive solid-state sintering. This matches the global Metal Injection Molding (MIM) supply chain. Moreover, because unbound powder never experiences laser spatter, plume condensate, or thermal oxidation during printing, >98.5% of loose powder is directly sieved and recycled.',
    comparisonVsLPBF: 'Uses higher-yield atomized fractions and avoids powder degradation from laser ejecta.',
    comparisonVsMIM: 'Uses the exact same alloy powder specifications without needing 40 vol% wax/polymer backbone compounding.',
  },
];

export const LIMITATIONS_DATA: StrengthLimitationItem[] = [
  {
    id: 'anisotropic-shrinkage',
    title: 'High Volumetric Shrinkage & Gravitational Slumping in Sintering',
    category: 'Thermodynamics',
    metricBenchmark: '15 – 22% Linear Shrinkage (~40–50% Volumetric)',
    mechanisticExplanation:
      'Consolidating a green part from ~56% packing density to >98% final density requires eliminating ~42 vol% void space. Shrinkage is inherently anisotropic: Z-axis shrinkage (18–21%) exceeds X-Y shrinkage (15–17%) due to interlayer packing stratification and gravity. Furthermore, as the alloy enters the ultra-soft diffusion regime at 0.85 Tm, unsupported spans sag under their own weight while bottom surfaces experience sliding friction ("setter drag") against alumina trays.',
    comparisonVsLPBF: 'LPBF parts print at >99.5% density directly on the build plate with <0.3% thermal contraction.',
    comparisonVsMIM: 'Similar shrinkage magnitude to MIM, but BJ green density (56%) is slightly lower than high-pressure injection molded green density (62–65%).',
    engineeringMitigation:
      'Physics-based Finite Element (FEM) sintering simulation (e.g., Live Sinter / Virfac) pre-deforms the STL/CAD geometry inversely before printing, reducing dimensional error from ±2.5% to ±0.15%, paired with sacrificial conformal ceramic setters.',
  },
  {
    id: 'green-fragility-depowdering',
    title: 'Fragile Green-State Handling & Blind Micro-Channel Depowdering',
    category: 'Post-Processing & Metrology',
    metricBenchmark: '3.5 – 8.0 MPa Green Strength | >1.5 mm Min Channel Ø',
    mechanisticExplanation:
      'After oven curing at 190 °C, cured polymer bridges only provide a transverse rupture strength comparable to hard chalk or dry plaster. Thin walls (<0.8 mm) or high-aspect-ratio pins can fracture during excavation. Additionally, fine cohesive MIM powders (10 µm) bridged by capillary moisture or electrostatic forces are notoriously difficult to evacuate from long, blind internal channels with length-to-diameter (L/D) ratios exceeding 8:1.',
    comparisonVsLPBF: 'LPBF parts have full metallic strength immediately after printing (though coarse 45 µm powder is still required to be drained).',
    comparisonVsMIM: 'MIM green parts contain 35–40 vol% solid wax/thermoplastic matrix, making them significantly tougher to handle by robots before debinding.',
    engineeringMitigation:
      'Development of high-strength nanoparticle-reinforced binders (>12 MPa TRS) and automated multi-axis acoustic/vibratory depowdering cells with computed tomography (CT) verification.',
  },
  {
    id: 'part-size-ceiling',
    title: 'Geometric Scale Ceiling & Wall-Thickness Debinding Bottlenecks',
    category: 'Geometry & Microstructure',
    metricBenchmark: 'Optimal Envelope < 200 mm | Max Wall Thickness < 20 mm',
    mechanisticExplanation:
      'In Direct Metal Binder Jetting, two physical phenomena cap maximum part size: (1) Gas pyrolysis products during debinding must diffuse out through micro-pores; cross-sections thicker than 20–25 mm require multi-day debinding ramps to prevent internal blistering or cracking; and (2) parts heavier than ~3–5 kg exert excessive gravitational frictional drag on the furnace setter plate during 17% linear contraction, causing tearing or severe warping.',
    comparisonVsLPBF: 'Large-frame LPBF systems routinely build 600 × 600 × 1000 mm monolithic aerospace stator housings.',
    comparisonVsMIM: 'Shares the same wall-thickness debinding physics as MIM (typically optimal at 1–10 mm wall thickness).',
    engineeringMitigation:
      'Design for Additive Manufacturing (DfAM) shelling—replacing solid cores with gyroid or honeycomb infills to keep effective wall thickness <8 mm while reducing mass and setter friction.',
  },
  {
    id: 'residual-porosity-fatigue',
    title: 'Residual Closed Microporosity & High-Cycle Fatigue Sensitivity',
    category: 'Geometry & Microstructure',
    metricBenchmark: '1.0 – 3.0% Residual Porosity (As-Sintered)',
    mechanisticExplanation:
      'Solid-state sintering typically asymptotes at 97.0–98.8% theoretical density as grain boundaries break away from isolated spherical pores (1–10 µm diameter). While static yield and ultimate tensile strengths match wrought specifications, residual spherical pores and occasional large printing inter-layer defects act as stress concentrators under cyclic loading, reducing High-Cycle Fatigue (HCF) endurance limits by 20–35% unless post-HIPed.',
    comparisonVsLPBF: 'LPBF achieves 99.7–99.9% density as-built (though LPBF also often requires HIP for critical aerospace fatigue due to lack-of-fusion pores).',
    comparisonVsMIM: 'Identical to MIM (97–98.5% as-sintered density).',
    engineeringMitigation:
      'Containerless Hot Isostatic Pressing (Sinter-HIP) once pores are closed (>93% density) collapses internal voids to >99.7% density, restoring wrought-equivalent fatigue endurance.',
  },
];

export const FUTURE_ROADMAP: RoadmapHorizon[] = [
  {
    id: 'horizon-1',
    horizon: 'Horizon 1: Near-Term Shop-Floor Standardization',
    timeframe: '2026 – 2028',
    trlLevel: 'TRL 8 – 9 (Commercial Deployment)',
    headline: 'Closed-Loop Optical Metrology & Physics-Driven Pre-Deformation',
    coreTechnologies: [
      {
        name: 'GPU-Accelerated Sintering Pre-Compensation',
        description:
          'Voxel-level visco-plastic Finite Element solvers predict gravitational sag, setter friction, and anisotropic Z-shrinkage in <15 minutes, outputting an inversely warped green CAD mesh that sinters into nominal tolerance on the first furnace run.',
        impactMetric: 'Reduces furnace trial-and-error iterations from 4 runs to 1; achieves ±0.10% linear dimensional repeatability.',
      },
      {
        name: 'In-Situ Coaxial Optical & Thermal Layer Tomography',
        description:
          'High-speed line-scan cameras and IR pyrometers mounted on the print carriage verify powder bed uniformity, detect nozzle outs (missing picoliter jets), and map local binder saturation layer-by-layer.',
        impactMetric: '100% digital twin birth certificate per serialized part; eliminates costly furnace sintering of defective green parts.',
      },
    ],
    factoryIntegrationbottlenecksSolved: [
      'Eliminates the "black art" of manual sintering shrinkage guesswork',
      'Prevents wasting 24 hours of furnace energy and hydrogen on green parts with hidden printhead streak defects',
    ],
  },
  {
    id: 'horizon-2',
    horizon: 'Horizon 2: Mid-Term Lights-Out Factory Automation',
    timeframe: '2028 – 2030',
    trlLevel: 'TRL 6 – 7 (Industrial Pilot Lines)',
    headline: 'Robotic Depowdering Cells & Continuous Pusher Sintering Furnaces',
    coreTechnologies: [
      {
        name: 'Automated Vision-Guided Acoustic Depowdering & Setter Loading',
        description:
          'Force-torque feedback 6-axis robots coupled with ultrasonic frequency sweeps, ionized air knives, and automated terahertz/X-ray inspection excavate fragile green parts from job boxes and place them directly onto ceramic sintering setters.',
        impactMetric: 'Cuts manual depowdering labor (currently 25–35% of total part cost) by 80% and eliminates human handling breakage.',
      },
      {
        name: 'Continuous Multi-Zone Walking-Beam & Pusher Furnaces',
        description:
          'Replacing batch vacuum furnaces with continuous hydrogen atmosphere tunnel furnaces borrowed from the automotive PM/MIM industry, featuring integrated catalytic thermal debinders and rapid cooling zones.',
        impactMetric: 'Reduces thermal energy consumption per kg of steel by 55% and matches printer throughput with continuous 24/7 sintering flow.',
      },
    ],
    factoryIntegrationbottlenecksSolved: [
      'Solves the primary economic bottleneck of Binder Jetting: manual technician labor at the powder excavation station',
      'Eliminates the batch queue mismatch between high-speed printers and slow batch furnaces',
    ],
  },
  {
    id: 'horizon-3',
    horizon: 'Horizon 3: Next-Gen Materials & Multi-Modal Consolidation',
    timeframe: '2030 – 2035+',
    trlLevel: 'TRL 4 – 5 (Advanced R&D)',
    headline: 'Nanoparticle Functional Inks, Reactive Aluminum & Graded Multi-Material Beds',
    coreTechnologies: [
      {
        name: 'Metal-Organic Decomposition (MOD) & Nanoparticle Reactive Binders',
        description:
          'Replacing passive fugitive polymers with inks loaded with metallic nanoparticles or organometallic salts that decompose into pure metal at 250 °C—eliminating carbon char while increasing green strength 3× and boosting initial neck density.',
        impactMetric: 'Lowers linear sintering shrinkage from 17% down to <11% and enables zero-carbon contamination in reactive Titanium and Aluminum.',
      },
      {
        name: 'Breakthrough in Sinterable 6000/7000-Series Aluminum Alloys',
        description:
          'Liquid-phase sintering strategies using trace Mg/Si/Sn eutectic activators that disrupt the tenacious native Al₂O₃ passivating skin during nitrogen/vacuum sintering.',
        impactMetric: 'Unlocks high-volume lightweight automotive and aerospace aluminum structural production via Binder Jetting.',
      },
    ],
    factoryIntegrationbottlenecksSolved: [
      'Breaks the longstanding barrier preventing commercial high-strength Aluminum Binder Jetting',
      'Enables voxel-level functional grading (e.g., jetting carbide-forming dopants selectively onto wear surfaces of a tough steel core)',
    ],
  },
];

export interface ComparisonTechMetric {
  criterion: string;
  unit: string;
  binderJetting: string;
  lpbf: string;
  mim: string;
  investmentCasting: string;
  bjScore: number; // 1-100 for radar visualization
  lpbfScore: number;
  mimScore: number;
}

export const TECH_COMPARISON_MATRIX: ComparisonTechMetric[] = [
  {
    criterion: 'Volumetric Build Throughput',
    unit: 'cm³/hr (Metal)',
    binderJetting: '2,500 – 12,000',
    lpbf: '80 – 450 (Quad Laser)',
    mim: '15,000 – 50,000 (Molded)',
    investmentCasting: '5,000 – 25,000',
    bjScore: 88,
    lpbfScore: 28,
    mimScore: 98,
  },
  {
    criterion: 'Upfront Tooling & Setup Avoidance',
    unit: 'Lead Time / CAPEX',
    binderJetting: '0 Tooling (Digital File)',
    lpbf: '0 Tooling (Digital File)',
    mim: '$50k – $120k Hard Mold (12 wks)',
    investmentCasting: '$15k – $60k Wax Die (8 wks)',
    bjScore: 96,
    lpbfScore: 96,
    mimScore: 15,
  },
  {
    criterion: 'Geometric Freedom & Internal Channels',
    unit: 'Overhang Capability',
    binderJetting: 'Full 3D (No Metal Supports)',
    lpbf: 'Requires Supports < 40°',
    mim: 'Restricted by Mold Parting & Slides',
    investmentCasting: 'Moderate (Ceramic Cores)',
    bjScore: 95,
    lpbfScore: 72,
    mimScore: 38,
  },
  {
    criterion: 'Material Breadth (Refractories & Ceramics)',
    unit: 'Crack Resistance',
    binderJetting: 'Metals, WC-Co, SiC, Cu, Sand',
    lpbf: 'Weldable Alloys Only (Cracks in WC)',
    mim: 'Steels, Ti, Superalloys, Ceramics',
    investmentCasting: 'Castable Alloys Only',
    bjScore: 94,
    lpbfScore: 55,
    mimScore: 85,
  },
  {
    criterion: 'As-Processed Dimensional Precision',
    unit: 'Linear Tolerance',
    binderJetting: '±0.15% – ±0.30% (17% Shrink)',
    lpbf: '±0.05% – ±0.12% (<0.3% Shrink)',
    mim: '±0.15% – ±0.25% (15% Shrink)',
    investmentCasting: '±0.25% – ±0.50%',
    bjScore: 68,
    lpbfScore: 92,
    mimScore: 76,
  },
  {
    criterion: 'As-Consolidated Mechanical Fatigue',
    unit: 'Relative Density',
    binderJetting: '97.5 – 99.0% (99.8% w/ HIP)',
    lpbf: '99.6 – 99.9% As-Built',
    mim: '97.0 – 98.8% Sintered',
    investmentCasting: '98.5 – 99.5% (Porosity Risk)',
    bjScore: 78,
    lpbfScore: 94,
    mimScore: 78,
  },
  {
    criterion: 'Max Economical Part Envelope',
    unit: 'Characteristic Span',
    binderJetting: '< 200 mm (Metal) / 4000 mm (Sand)',
    lpbf: 'Up to 800 × 800 × 1000 mm',
    mim: '< 100 mm (< 150 g Mass)',
    investmentCasting: 'Up to 1,500 mm',
    bjScore: 62,
    lpbfScore: 88,
    mimScore: 40,
  },
];
