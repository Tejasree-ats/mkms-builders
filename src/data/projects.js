export const BUSINESS_SERVICES = [
  {
    id: 'housing-residential',
    icon: 'Building',
    title: 'Housing & Residential Projects',
    badge: 'Core Service',
    description: 'Turnkey residential developments ranging from individual luxury bungalows to multi-family housing complexes. Executed utilizing advanced reinforced concrete framing, structural steel, and modern light-gauge steel construction.',
    keyPoints: [
      'Multi-Storey Residential Towers',
      'RCC & Light-Gauge Steel Framing',
      'Earthquake Zone III Structural Compliance',
      'Complete Architectural Finishing & Handover'
    ]
  },
  {
    id: 'institutional-govt',
    icon: 'GraduationCap',
    title: 'Institutional & Major Projects',
    badge: 'Government & Public',
    description: 'Specialists in institutional educational campuses, university academic blocks, healthcare facilities, and administrative headquarters. Empanelled with PWD Tamil Nadu, CPWD, and Southern Railway.',
    keyPoints: [
      'Utility Public School, Kotturpuram (Completed)',
      'School & College Academic Wings',
      'Hospital Buildings & Civic Centers',
      'Southern Railway Station Infrastructure'
    ]
  },
  {
    id: 'industrial-commercial',
    icon: 'Factory',
    title: 'Industrial & Commercial Buildings',
    badge: 'Corporate',
    description: 'Design and construction of major and medium industrial factories, corporate headquarters, staff townships, and processing plants with heavy floor loadings and column-free spans.',
    keyPoints: [
      'Dharani Sugars Limited Township & Admin Block',
      'Chamiers Commercial Center, Nandanam',
      'Structural Steel Trusses & Portal Frames',
      'Staff Residential Quarters & Mess Facilities'
    ]
  },
  {
    id: 'wind-engineering',
    icon: 'Compass',
    title: 'Wind Engineering Projects',
    badge: 'Specialized Engineering',
    description: 'Expertise in specialized civil foundations for heavy wind turbine generators. Precision-engineered to withstand dynamic rotational torque, high wind shear loads, and variable soil mechanics.',
    keyPoints: [
      'High-Torque Wind Turbine Pedestals',
      'Dynamic Vibration Absorbing Sub-bases',
      'Deep Rock Anchoring & Pile Caps',
      'Tamil Nadu Wind Energy Corridor Execution'
    ]
  },
  {
    id: 'water-utilities',
    icon: 'Layers',
    title: 'Water Supply & Utility Infrastructure',
    badge: 'Municipal & Industrial',
    description: 'Execution of large-scale water treatment, subterranean storage reservoirs, municipal pumping stations, industrial pipeline grids, and high-performance elastomeric waterproofing systems.',
    keyPoints: [
      'High-Capacity Water Reservoirs & Sumps',
      'Industrial Pipeline Reticulation',
      'Crystalline & Elastomeric Waterproofing',
      'Stormwater Drainage & Rainwater Harvesting'
    ]
  },
  {
    id: 'framing-systems',
    icon: 'CheckCircle2',
    title: 'Advanced Structural Framing',
    badge: 'Engineering Systems',
    description: 'Comprehensive structural execution across reinforced cement concrete (M30 to M60), heavy structural steel fabrication, and eco-friendly light-gauge steel framing (LGSF).',
    keyPoints: [
      'Reinforced Concrete (RCC) Column-Beam',
      'Structural Steel Space Frames & Trusses',
      'Light Gauge Steel Construction (LGSF)',
      'Pre-stressed Concrete & Post-Tensioned Slabs'
    ]
  }
];

export const PROJECTS = [
  {
    id: 'utility-public-school',
    title: 'Utility Public School Campus',
    category: 'Institutional',
    tag: 'Recently Completed',
    client: 'Utility Educational Trust',
    location: 'Kotturpuram, Chennai, Tamil Nadu',
    status: 'Completed',
    area: '85,000 SQ. FT.',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1400&q=80',
    description: 'Turnkey civil construction of the comprehensive educational facility for Utility Public School in Kotturpuram, Chennai. Scope included reinforced concrete structural framing, high-span assembly spaces, acoustic classrooms, ventilation corridors, and child-safe architectural finishes.',
    specs: [
      { label: 'Project Typology', value: 'Educational & Institutional Campus' },
      { label: 'Location', value: 'Kotturpuram, Central Chennai' },
      { label: 'Structural Framework', value: 'RCC Column-Beam Frame & Thermal Roof Slab' },
      { label: 'Key Facilities', value: 'Multi-Level Academic Wings & Assembly Hall' },
      { label: 'Contract Type', value: 'Turnkey Civil & Structural Engineering' }
    ]
  },
  {
    id: 'dharani-sugars-complex',
    title: 'Dharani Sugars Staff Quarters & Admin Complex',
    category: 'Industrial',
    tag: 'Recently Completed',
    client: 'Dharani Sugars Limited',
    location: 'Kalayanallur near Kallakurichi, Tamil Nadu',
    status: 'Completed',
    area: '145,000 SQ. FT.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    description: 'Comprehensive industrial township development for Dharani Sugars Limited. Execution encompassed corporate administrative headquarters, multi-family executive staff residential quarters, utility piping networks, and heavy-duty structural concrete civil works.',
    specs: [
      { label: 'Client Organization', value: 'Dharani Sugars Limited' },
      { label: 'Scope of Execution', value: 'Corporate Admin Block & Staff Housing' },
      { label: 'Civil Engineering', value: 'Heavy Industrial Foundation & Utility Matrix' },
      { label: 'Regional Site', value: 'Kalayanallur, Kallakurichi District' },
      { label: 'Facilities', value: 'Township Roads, Sump, Quarters & Admin' }
    ]
  },
  {
    id: 'chamiers-commercial',
    title: 'Chamiers Commercial Centre & Corporate Offices',
    category: 'Commercial',
    tag: 'Recently Completed',
    client: 'Private Commercial Syndicate',
    location: 'Chamiers Road, Nandanam, Chennai',
    status: 'Completed',
    area: '62,000 SQ. FT.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1400&q=80',
    description: 'Multi-storey commercial development located on prestigious Chamiers Road (Pasumpon Muthuramalinga Thevar Road). Features modern structural glazing, column-free commercial floor plates, basement car parking, and precision weather-sealed exterior envelope.',
    specs: [
      { label: 'Location', value: 'Rathna Nagar, Nandanam Corridor' },
      { label: 'Construction System', value: 'Structural Steel & RCC Framing' },
      { label: 'Utility Integration', value: 'High-Capacity Water Harvesting & Waterproofing' },
      { label: 'Facade Treatment', value: 'Performance Glazing & Granite Cladding' },
      { label: 'Floors', value: 'Ground + 5 Commercial Storeys' }
    ]
  },
  {
    id: 'grand-residency-housing',
    title: 'Metropolitan Housing & Residential Enclave',
    category: 'Housing',
    tag: 'Housing Projects',
    client: 'Residential Housing Society',
    location: 'Chennai Metropolitan Region, Tamil Nadu',
    status: 'Completed',
    area: '110,000 SQ. FT.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    description: 'Multi-family residential apartment building project executing light-gauge steel construction blended with reinforced concrete shear framing. Complete with subterranean water sump, seismic joint detailing, and turnkey finishing.',
    specs: [
      { label: 'Project Category', value: 'Housing Projects & Group Living' },
      { label: 'Framing Used', value: 'Hybrid RCC & Light-Gauge Steel (LGSF)' },
      { label: 'Water Utility', value: 'Dual Sump & Advanced Waterproofing Membrane' },
      { label: 'Flooring & Finishes', value: 'Vitrified Tiles & Polished Granite Entrances' }
    ]
  },
  {
    id: 'wind-turbine-foundations',
    title: 'High-Torque Wind Turbine Foundations & Substructures',
    category: 'Wind & Utilities',
    tag: 'Specialized Projects',
    client: 'Clean Energy Developers & IPPs',
    location: 'Tamil Nadu Wind Energy Corridor',
    status: 'Completed / Active',
    area: 'SPECIALIZED FOUNDATIONS',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=80',
    description: 'Specialized civil engineering works including high-torque wind turbine foundation pedestals, heavy mass concrete pours with controlled hydration, deep rock anchoring, and dynamic vibration mitigation.',
    specs: [
      { label: 'Specialized Scope', value: 'Wind Turbine Foundations & Heavy Pedestals' },
      { label: 'Concrete Mix', value: 'M40/M50 Mass Concrete with Thermal Sensors' },
      { label: 'Dynamic Engineering', value: 'Cyclic Vibration & Torque Resistance' },
      { label: 'Geotechnical Base', value: 'Deep Anchor Bolts in Fractured Rock Strata' }
    ]
  },
  {
    id: 'southern-railway-pwd-under-progress',
    title: 'Public Works & Southern Railway Infrastructure',
    category: 'Institutional',
    tag: 'Under Progress',
    client: 'Southern Railway & State PWD',
    location: 'Chennai & Tamil Nadu Regional Hubs',
    status: 'Under Progress',
    area: 'CIVIL & INFRASTRUCTURE',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    description: 'Empanelled contractor execution for Southern Railway and State Public Works Department (PWD). Ongoing construction of administrative buildings, platform amenity structures, and public utility quarters.',
    specs: [
      { label: 'Empanelled Authority', value: 'Southern Railway & PWD Tamil Nadu' },
      { label: 'Current Status', value: 'Major Project Under Progress' },
      { label: 'Structural Steel', value: 'High-Tensile Structural Steel Trusses' },
      { label: 'Safety Standards', value: 'Indian Railway Civil Engineering Standards' }
    ]
  }
];

export const ENGINEERING_PHASES = [
  {
    phase: '01',
    title: 'Geotechnical Soil Investigation & Deep Foundations',
    tagline: 'Chennai Coastal Soil Dynamics & Bored Piling',
    description: 'Rigorous sub-surface borehole analysis calibrated for Chennai unique sedimentary clay, sand, and bedrock profiles. Execution of bored cast-in-situ piles and heavy raft foundations with anti-corrosion marine rebar.',
    stats: ['Geotechnical Core Boring', 'Sulfate-Resistant Cements', 'Seismic Zone III Standards']
  },
  {
    phase: '02',
    title: 'Structural Framing (RCC, Steel & Light Gauge)',
    tagline: 'Precision Column-Beam Erection & High-Span Slabs',
    description: 'Comprehensive framing capabilities spanning conventional M30-M50 reinforced cement concrete, structural steel trusses for industrial spans, and modern light-gauge steel framing for expedited commercial delivery.',
    stats: ['Concrete & Steel Framing', 'Light Gauge Steel Erection', 'Dharani Sugars & School Grade']
  },
  {
    phase: '03',
    title: 'Specialized Utilities, Wind & Waterproofing',
    tagline: 'Wind Engineering Pedestals & Hydraulic Infrastructure',
    description: 'Advanced MEP and civil utility integration: high-capacity overhead and subterranean water sumps, industrial piping, wind mast anchorages, and multi-layer crystalline waterproofing membranes.',
    stats: ['Wind Engineering Works', 'Industrial Water Supply', 'Elastomeric Waterproofing']
  },
  {
    phase: '04',
    title: 'Architectural Turnkey Realization & Handover',
    tagline: 'Managed by Reyaj (Proprietor) & Er. A. Shajahan Sait',
    description: 'Full-spectrum interior and exterior masonry, premium granite and vitrified tile flooring, acoustic ceiling treatments, and certified municipal completion documentation across 50+ delivered developments.',
    stats: ['40+ Years of Operations', 'Turnkey Building Handover', 'BAI Member Supervised']
  }
];

export const COMPANY_PROFILE = {
  name: 'M.K.M.S. Builders',
  legalName: 'M.K.M.S. Builders (Partnership Firm)',
  experience: '40+ Years of Excellence (Established 1980s)',
  tagline: 'Civil Engineering Contractors, Real Estate Builders, Developers & Building Consultants',
  keyPeople: [
    { name: 'Reyaj', role: 'Proprietor / Partner' },
    { name: 'Er. A. Shajahan Sait', role: 'Managing Partner / Chartered Civil Engineer' }
  ],
  accreditations: [
    'Empanelled Contractor — PWD (Public Works Department, Govt. of Tamil Nadu)',
    'Empanelled Contractor — CPWD (Central Public Works Department, Govt. of India)',
    'Registered Contractor — Southern Railway Civil Engineering Division',
    'Member — Builders Association of India (BAI)'
  ],
  trackRecord: '50+ Residential, Commercial, Industrial, Wind & Institutional Projects',
  address: 'New #23 / Old #15, Chamiers Road (Pasumpon Muthuramalinga Thevar Road), Rathna Nagar, Nandanam, Chennai – 600035, Tamil Nadu',
  phone: '+91 44 2435 2904',
  mobile: '+91 94440 21687',
  website: 'https://mkmsbuilders.com',
  websiteDisplay: 'mkmsbuilders.com',
  indiaMartUrl: 'https://www.indiamart.com/mkms-builders/?srsltid=AU7gw4WSYISJz-bOwth0AO0zRa9I0UDeQmPtWHwB23Ytx8g15AcSp2Eh'
};
