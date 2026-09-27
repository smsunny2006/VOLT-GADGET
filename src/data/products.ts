import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "AeroSound Pro ANC Headphones",
    category: "Audio",
    price: 249.99,
    originalPrice: 299.99,
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 342,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Experience studio-grade acoustic clarity with custom hybrid Active Noise Cancellation (ANC), 45-hour playback, and high-res spatial audio drivers.",
    highlights: [
      "Hybrid Active Noise Cancellation with Transparency Mode",
      "45 Hours of continuous playback on a single charge",
      "Custom 40mm Titanium Drivers for punchy bass and crystalline highs",
      "Dual Beamforming HD Microphones for crystal clear calls"
    ],
    specs: {
      "Battery Life": "45 Hours (ANC Off) / 32 Hours (ANC On)",
      "Bluetooth": "v5.3 with LDAC / AAC / SBC",
      "Fast Charge": "10 min charge = 5 hours playback",
      "Weight": "250g",
      "Driver Size": "40mm Titanium Composite",
      "Warranty": "2 Years VoltCare Warranty"
    },
    inStock: true,
    inventoryCount: 14,
    reviews: [
      { id: "r1", userName: "Marcus Vance", rating: 5, date: "2 days ago", comment: "The noise cancellation easily rivals top brand headphones. Bass is deep without drowning vocal clarity!", verified: true },
      { id: "r2", userName: "Elena Rostova", rating: 5, date: "1 week ago", comment: "Battery life is absurdly long. Wore these on a 14-hour flight with ANC on and had 60% remaining.", verified: true },
      { id: "r3", userName: "David K.", rating: 4, date: "2 weeks ago", comment: "Super comfy plush earcups. Only wish the carrying case was slightly smaller.", verified: true }
    ]
  },
  {
    id: 2,
    name: "Apex Chrono Ultra Smartwatch",
    category: "Wearables",
    price: 189.99,
    originalPrice: 229.99,
    badge: "New Arrival",
    rating: 4.7,
    reviewCount: 198,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Rugged aerospace-grade titanium smartwatch featuring a bright 1.9-inch AMOLED display, dual-frequency GPS, ECG monitor, and 100m water resistance.",
    highlights: [
      "Ultra-bright 2000 nits Sapphire AMOLED Touchscreen",
      "Dual-Frequency L1/L5 Precision GPS for accurate tracking",
      "24/7 Heart Rate, SpO2, ECG, and Sleep Stage Analytics",
      "100m Water Resistant with SCUBA Dive Computer mode"
    ],
    specs: {
      "Display": "1.96\" Sapphire AMOLED (410x502)",
      "Battery": "14 Days Normal / 36h Full GPS Mode",
      "Sensors": "Optical HR, SpO2, ECG, Temperature, Altimeter",
      "Water Resistance": "10 ATM / 100 meters",
      "Connectivity": "Bluetooth 5.3, Wi-Fi, NFC",
      "Weight": "52g (Titanium Case)"
    },
    inStock: true,
    inventoryCount: 9,
    reviews: [
      { id: "r4", userName: "Sarah L.", rating: 5, date: "3 days ago", comment: "Replaced my old GPS watch with this. The screen in direct sunlight is unbelievably clear!", verified: true },
      { id: "r5", userName: "Alex Chen", rating: 4.5, date: "3 weeks ago", comment: "Sleep tracking accuracy is spot on. Great workout integration with Strava.", verified: true }
    ]
  },
  {
    id: 3,
    name: "Falcon 4K HDR Quadcopter Drone",
    category: "Cameras",
    price: 699.99,
    originalPrice: 799.99,
    badge: "Top Rated",
    rating: 4.9,
    reviewCount: 215,
    img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Shoot cinematic 4K video at 60fps with a 3-axis mechanical gimbal, 38-minute flight time, 12km HD video transmission, and 360° omnidirectional obstacle sensing.",
    highlights: [
      "1-inch CMOS Sensor shooting 4K/60fps & 20MP RAW photos",
      "Omnidirectional Obstacle Sensing with ActiveTrack 5.0",
      "38 Minutes max flight time per intelligent flight battery",
      "Foldable ultra-portable design weighing under 595g"
    ],
    specs: {
      "Camera Sensor": "1-inch CMOS 20MP",
      "Video Resolution": "4K/60fps, 2.7K/120fps, HDR 10-bit",
      "Max Flight Time": "38 Minutes",
      "Transmission Range": "12km O3+ HD Stream",
      "Top Speed": "68 km/h (Sport Mode)",
      "Storage": "32GB Internal + MicroSD up to 512GB"
    },
    inStock: true,
    inventoryCount: 6,
    reviews: [
      { id: "r6", userName: "Liam Hemsworth", rating: 5, date: "Yesterday", comment: "Footage looks straight out of a Hollywood movie! The ActiveTrack system locks onto cars and hikers flawlessly.", verified: true }
    ]
  },
  {
    id: 4,
    name: "Vortex Precision Wireless Gaming Mouse",
    category: "Gaming",
    price: 59.99,
    originalPrice: 79.99,
    badge: "Sale -20%",
    rating: 4.6,
    reviewCount: 412,
    img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Ultra-lightweight 54g gaming mouse equipped with 26,000 DPI Optical Sensor, sub-1ms wireless tech, optical switches rated for 90M clicks, and PTFE feet.",
    highlights: [
      "Featherlight 54g ergonomic honeycomb shell design",
      "26,000 DPI Custom Optical Sensor with 650 IPS tracking",
      "VoltSpeed 2.4GHz Ultra-low Latency Wireless Technology",
      "Up to 90 Hours of continuous gaming per charge"
    ],
    specs: {
      "DPI": "100 - 26,000 Adjustable",
      "Polling Rate": "1000Hz (1ms response)",
      "Weight": "54 grams",
      "Battery Life": "90 Hours (Rechargeable USB-C)",
      "Switches": "Optical Micro Switches (90M Click Life)"
    },
    inStock: true,
    inventoryCount: 28,
    reviews: [
      { id: "r7", userName: "GamerPro_99", rating: 5, date: "4 days ago", comment: "No wire drag, zero latency. My flick shots in FPS games improved immediately.", verified: true }
    ]
  },
  {
    id: 5,
    name: "Pulse True Wireless ANC Earbuds",
    category: "Audio",
    price: 129.99,
    originalPrice: 159.99,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 280,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Compact wireless earcups with adaptive ANC, IPX7 sweatproofing, wireless Qi charging case, and personalized sound profiling via mobile app.",
    highlights: [
      "Adaptive ANC auto-adjusts to external noise environments",
      "IPX7 Water & Sweat proofing for intense gym workouts",
      "30 Hours total playtime with wireless charging case",
      "Multipoint Bluetooth pairing connect to phone & laptop simultaneously"
    ],
    specs: {
      "Playtime": "8 Hours (Earbuds) + 22 Hours (Case)",
      "Waterproofing": "IPX7 Rated",
      "Charging": "USB-C + Qi Wireless Charging",
      "Codecs": "AAC, SBC, aptX Adaptive"
    },
    inStock: true,
    inventoryCount: 19
  },
  {
    id: 6,
    name: "CyberDeck RGB Mechanical Keyboard",
    category: "Gaming",
    price: 149.99,
    originalPrice: 179.99,
    badge: "Trending",
    rating: 4.9,
    reviewCount: 310,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Hot-swappable 75% wireless mechanical keyboard with lubricated mechanical switches, gasket-mount sound dampening foam, and per-key RGB backlight.",
    highlights: [
      "Gasket-Mounted Design for a thocky, cushioned typing sound",
      "Hot-Swappable PCB compatible with 3-pin and 5-pin switches",
      "Tri-Mode Connectivity: Bluetooth 5.1, 2.4Ghz, and Detachable Type-C",
      "Double-shot PBT Keycaps resistant to wear and shine"
    ],
    specs: {
      "Form Factor": "75% Compact (82 Keys)",
      "Switches": "Pre-lubed Volt Linear Yellow Switches",
      "Battery": "4000mAh (Up to 200 Hours RGB off)",
      "Keycaps": "Cherry Profile PBT Double-Shot"
    },
    inStock: true,
    inventoryCount: 11
  },
  {
    id: 7,
    name: "Halo 360 4K Waterproof Action Cam",
    category: "Cameras",
    price: 349.99,
    originalPrice: 399.99,
    badge: "Top Rated",
    rating: 4.8,
    reviewCount: 154,
    img: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Capture immersive 5.7K 360-degree videos or traditional 4K 60fps wide angle footage with horizon lock stabilization and 10m waterproof housing.",
    highlights: [
      "5.7K 360° Capture + 4K Single-Lens Mode",
      "FlowState Stabilization with 360° Horizon Lock",
      "Rugged & Waterproof down to 33ft (10m) without case",
      "Invisible Selfie Stick auto-removed from video output"
    ],
    specs: {
      "Video Specs": "5.7K@30fps, 4K@60fps, 1080p@200fps",
      "Photo Resolution": "72 Megapixel 360 Photos",
      "Screen": "2.29\" Toughened Touchscreen",
      "Audio": "4 Directional Mics with Wind Noise Reduction"
    },
    inStock: true,
    inventoryCount: 8
  },
  {
    id: 8,
    name: "Aura Smart Ambient Light Bar Duo",
    category: "Smart Home",
    price: 89.99,
    originalPrice: 109.99,
    badge: "New Arrival",
    rating: 4.6,
    reviewCount: 122,
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Smart RGBIC LED light bars that sync dynamically with screen movies, music, or game sound. Compatible with Alexa, Google Home, and Matter protocol.",
    highlights: [
      "Dynamic Audio & Screen Visualizer Syncing",
      "16 Million RGBIC Colors with multi-zone control",
      "Hands-Free Voice Control via Alexa & Google Assistant",
      "Includes Desk Stands & Monitor Back-Mount brackets"
    ],
    specs: {
      "Connectivity": "2.4GHz Wi-Fi + Bluetooth 5.0",
      "Voltage": "12V / 2A Power Adapter",
      "Length": "15.4 inches per bar",
      "Protocol": "Matter, Apple HomeKit, Google Home"
    },
    inStock: true,
    inventoryCount: 15
  },
  {
    id: 9,
    name: "VoltCharge 140W GaN Fast Wall Charger",
    category: "Power & Accessories",
    price: 69.99,
    originalPrice: 89.99,
    badge: "Sale -20%",
    rating: 4.9,
    reviewCount: 388,
    img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Next-gen Gallium Nitride (GaN III) 4-port fast charger delivering up to 140W power output. Fast charge a MacBook Pro to 50% in just 28 minutes.",
    highlights: [
      "140W PD 3.1 Ultra-Fast Power Delivery",
      "3x USB-C + 1x USB-A Ports charge 4 devices simultaneously",
      "Gallium Nitride III Technology for 40% smaller footprint",
      "Dynamic TempGuard protection prevents overheating"
    ],
    specs: {
      "Max Power": "140W PD 3.1",
      "Ports": "3x USB-C PD, 1x USB-A QC 4.0",
      "Compatibility": "Laptops, Tablets, iPhone, Android, Steam Deck",
      "Size": "2.9 x 2.9 x 1.2 inches"
    },
    inStock: true,
    inventoryCount: 32
  },
  {
    id: 10,
    name: "Titan Magnetic Wireless Power Bank 10,000mAh",
    category: "Power & Accessories",
    price: 49.99,
    originalPrice: 59.99,
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 264,
    img: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Slim MagSafe-compatible 10,000mAh portable charger with foldable kickstand, 15W wireless charging, and 20W PD bi-directional USB-C cable port.",
    highlights: [
      "Strong 1,200g Magnetic Snap-On Attachment",
      "Foldable Zinc-alloy Kickstand for hands-free video viewing",
      "10,000mAh Capacity provides 2 full phone recharges",
      "Pass-through charging support"
    ],
    specs: {
      "Capacity": "10,000mAh / 38.5Wh",
      "Wireless Output": "15W Max",
      "USB-C Output": "20W Power Delivery",
      "Weight": "210g"
    },
    inStock: true,
    inventoryCount: 22
  },
  {
    id: 11,
    name: "VisionPro 2.5K Ergonomic USB-C Webcam",
    category: "Cameras",
    price: 99.99,
    originalPrice: 129.99,
    badge: "Popular",
    rating: 4.6,
    reviewCount: 175,
    img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Upgrade your video calls with 2.5K QHD resolution, dual noise-reducing mics, HDR low-light adjustment, auto-framing, and physical magnetic privacy shutter.",
    highlights: [
      "2.5K QHD Sensor at 60fps for ultra-crisp video conferencing",
      "AI Smart Auto-Framing keeps you centered as you move",
      "Physical Magnetic Shutter for guaranteed privacy",
      "Dual Stereo Microphones with AI Noise Suppression"
    ],
    specs: {
      "Resolution": "1440p / 2.5K @ 60fps",
      "Field of View": "65° / 78° / 90° Adjustable",
      "Focus": "Phase Detection Autofocus (PDAF)",
      "Connection": "USB-C Plug and Play"
    },
    inStock: true,
    inventoryCount: 17
  },
  {
    id: 12,
    name: "Lumina Smart Robot Vacuum & Mop Combo",
    category: "Smart Home",
    price: 499.99,
    originalPrice: 599.99,
    badge: "Sale -30%",
    rating: 4.7,
    reviewCount: 189,
    img: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&auto=format&fit=crop&q=80"
    ],
    description: "LiDAR 3D navigation vacuum cleaner with 6,000Pa extreme suction power, auto-empty dust dock, sonic mopping, and carpet auto-lifting technology.",
    highlights: [
      "6,000Pa Max Suction Power tackles deep carpet dust",
      "LiDAR 3D Laser Mapping with multi-floor room memory",
      "Auto-Lifting Sonic Mop prevents carpet wetting",
      "60-Day Self-Emptying Dustbase included"
    ],
    specs: {
      "Suction": "6,000Pa Max",
      "Battery": "5200mAh (Up to 180 min runtime)",
      "Noise Level": "< 58dB in quiet mode",
      "Dust Bag Capacity": "2.5 Liters Self-Empty Base"
    },
    inStock: true,
    inventoryCount: 5
  }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' },
  { code: 'CAD', symbol: 'CA$', rate: 1.36, label: 'CAD (CA$)' },
  { code: 'JPY', symbol: '¥', rate: 149.5, label: 'JPY (¥)' }
] as const;

export function formatPrice(amountUSD: number, currencyRate: number = 1.0, currencySymbol: string = '$'): string {
  const converted = amountUSD * currencyRate;
  if (currencySymbol === '¥') {
    return `${currencySymbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currencySymbol}${converted.toFixed(2)}`;
}
