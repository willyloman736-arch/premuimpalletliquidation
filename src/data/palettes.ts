import type { Palette } from '@/types/palette';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

/** Category filters shown across the catalogue. */
export const categories = ["All","Footwear","Clothing","Electronics","Tools","Appliances","Cosmetics","Accessories","Toys","General Merchandise"] as const;

/** Condition grades used by the catalogue and admin. */
export const conditions = ["Grade A+","Grade A","Grade A-B","Grade B+","Grade B","Grade C"] as const;

/**
 * Catalogue imported from the Wholesale Ninjas product export
 * (exports/plf-products-generic.csv) — 41 wholesale liquidation pallets.
 * Prices shown in USD. Connect Supabase (NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY) to override.
 */
export const seedPalettes: Palette[] = [
  {
    "id": 1,
    "title": "iPhone Premium Mix Wholesale Pallet — 30 Units, Grade A+, Unlocked",
    "description": "Wholesale iPhone pallet — 30 unlocked Grade A+ Apple smartphones, tested and ready to resell. Mixed recent models, USD pricing, ships worldwide from US warehouses.",
    "price": 3500,
    "original_price": 5500,
    "condition": "Grade A+",
    "quantity": 30,
    "available": true,
    "featured": false,
    "limitedTime": true,
    "category": "Electronics",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.9,
    "estimatedProfit": "+57%",
    "content": [
      "Apple iPhone",
      "30 units per pallet",
      "Grade A+ — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/iphone-premium-mix-pallet-30-units/01.jpg",
      "https://wholesalenijas.com/images/products/iphone-premium-mix-pallet-30-units/02.jpg",
      "https://wholesalenijas.com/images/products/iphone-premium-mix-pallet-30-units/03.jpg",
      "https://wholesalenijas.com/images/products/iphone-premium-mix-pallet-30-units/04.jpg",
      "https://wholesalenijas.com/images/products/iphone-premium-mix-pallet-30-units/05.jpg",
      "https://wholesalenijas.com/images/products/iphone-premium-mix-pallet-30-units/06.jpg"
    ]
  },
  {
    "id": 2,
    "title": "Nike Air Force 1 Wholesale Pallet — 150 Pairs, Grade A+, Original Boxes",
    "description": "Wholesale Nike Air Force 1 pallet — 150 authentic pairs, Grade A+ with original boxes. Mixed colorways including limited editions, USD pricing, ships worldwide.",
    "price": 2000,
    "original_price": 2800,
    "condition": "Grade A+",
    "quantity": 150,
    "available": true,
    "featured": false,
    "limitedTime": true,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.9,
    "estimatedProfit": "+40%",
    "content": [
      "Nike Air Force 1",
      "150 units per pallet",
      "Grade A+ — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/01.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/02.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/03.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/04.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/05.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/06.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/07.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/08.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/09.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/10.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/11.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/12.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-authentic-pallet-150-units/13.jpg"
    ]
  },
  {
    "id": 3,
    "title": "Nike Air Force 1 Low Wholesale Pallet — 100 Pairs, Mixed Colorways, Grade A",
    "description": "Wholesale Nike Air Force 1 Low pallet — 100 authentic pairs, Grade A, mixed colorways. USD pricing, freight-friendly, ships from US warehouses worldwide.",
    "price": 1500,
    "original_price": 2000,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+33%",
    "content": [
      "Nike Air Force 1 Low",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-one-low-pallet-100-pairs/09.jpg"
    ]
  },
  {
    "id": 4,
    "title": "Professional Power Tools Wholesale Pallet — 100 Pieces, Grade A",
    "description": "Wholesale power tools pallet, Grade A, 100 pieces manifested. Drills, grinders, saws, sanders, hand tools. Ships 48h from US. Resell on Amazon, eBay, retail.",
    "price": 2500,
    "original_price": 3300,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Tools",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+32%",
    "content": [
      "Assorted professional-grade brands across cordless power tools, corded shop tools, and contractor hand tools. Mix typically includes recognizable nameplates from the drill, grinder, saw, and sander categories alongside trade-quality hand tool brands.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/professional-power-tools-pallet-100-items/01.jpg",
      "https://wholesalenijas.com/images/products/professional-power-tools-pallet-100-items/02.jpg",
      "https://wholesalenijas.com/images/products/professional-power-tools-pallet-100-items/03.jpg",
      "https://wholesalenijas.com/images/products/professional-power-tools-pallet-100-items/04.jpg"
    ]
  },
  {
    "id": 5,
    "title": "Premium Kitchen Small Appliances Wholesale Pallet — 100 Units, Grade A",
    "description": "Wholesale kitchen appliances pallet: 100 Grade A units — air fryers, toasters, juicers, vacuums. Brand-name liquidation lot for Amazon FBA & resellers.",
    "price": 650,
    "original_price": 1200,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Appliances",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+85%",
    "content": [
      "Recognized kitchen brands — assorted mix across air fryers, toasters, juicers, cyclone vacuums, and accessories",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/01.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/02.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/03.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/04.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/05.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/06.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/07.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/08.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/09.jpg",
      "https://wholesalenijas.com/images/products/premium-kitchen-small-appliances-pallet-100-units/10.jpg"
    ]
  },
  {
    "id": 6,
    "title": "Mixed Cosmetics Wholesale Pallet — 350 Units, Grade A, New Sealed",
    "description": "Wholesale cosmetics pallet, 350 Grade A new sealed units of makeup, skincare and haircare. Mixed brands liquidation lot for Amazon FBA, eBay, TikTok Shop.",
    "price": 350,
    "original_price": 950,
    "condition": "Grade A",
    "quantity": 350,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Cosmetics",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+171%",
    "content": [
      "Assorted name-brand drugstore and prestige cosmetics, makeup, face care, and hair care — mixed brands, all new sealed in blister/retail packaging",
      "350 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/01.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/02.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/03.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/04.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/05.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/06.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/07.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/08.jpg",
      "https://wholesalenijas.com/images/products/cosmetics-assorted-pallet-350-units/09.jpg"
    ]
  },
  {
    "id": 7,
    "title": "SHEIN Womens Fashion Wholesale Pallet — 200 Units, Grade A, New Sealed",
    "description": "SHEIN women's wholesale pallet — 200 units, Grade A, new sealed bikinis, lingerie, dresses, tops. US warehouse, freight-forwarder friendly. Order today.",
    "price": 500,
    "original_price": 950,
    "condition": "Grade A",
    "quantity": 200,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+90%",
    "content": [
      "SHEIN — single-brand pallet, 100% authentic SHEIN women's fashion across bikinis, lingerie, dresses, tops, and trend accessories",
      "200 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/shein-womens-fashion-pallet-200-units/01.jpg",
      "https://wholesalenijas.com/images/products/shein-womens-fashion-pallet-200-units/02.jpg",
      "https://wholesalenijas.com/images/products/shein-womens-fashion-pallet-200-units/03.jpg",
      "https://wholesalenijas.com/images/products/shein-womens-fashion-pallet-200-units/04.jpg",
      "https://wholesalenijas.com/images/products/shein-womens-fashion-pallet-200-units/05.jpg",
      "https://wholesalenijas.com/images/products/shein-womens-fashion-pallet-200-units/06.jpg"
    ]
  },
  {
    "id": 8,
    "title": "Premium Handbags Wholesale Pallet — 85 Units, Grade A-B, Mixed Styles",
    "description": "Wholesale handbags pallet: 85 units Grade A-B mixed leather, faux leather, canvas. Liquidation lot for Poshmark, eBay, Etsy, Amazon resellers. Ships 48h.",
    "price": 400,
    "original_price": 1000,
    "condition": "Grade A-B",
    "quantity": 85,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Accessories",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.5,
    "estimatedProfit": "+150%",
    "content": [
      "Assorted brands — mixed designer-inspired and contemporary fashion labels across leather, faux leather, and canvas constructions.",
      "85 units per pallet",
      "Grade A-B — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/premium-handbags-pallet-85-units/01.jpg",
      "https://wholesalenijas.com/images/products/premium-handbags-pallet-85-units/02.jpg",
      "https://wholesalenijas.com/images/products/premium-handbags-pallet-85-units/03.jpg",
      "https://wholesalenijas.com/images/products/premium-handbags-pallet-85-units/04.jpg",
      "https://wholesalenijas.com/images/products/premium-handbags-pallet-85-units/05.jpg",
      "https://wholesalenijas.com/images/products/premium-handbags-pallet-85-units/06.jpg"
    ]
  },
  {
    "id": 9,
    "title": "Kids Toys Mixed Wholesale Pallet — 300 Units, Grade A-B, Ages 0-12",
    "description": "Wholesale kids toys pallet, 300 units Grade A-B, LEGO, Funko Pop, plush, educational, ages 0-12. Manifested liquidation lot for Amazon FBA and eBay resellers.",
    "price": 350,
    "original_price": 800,
    "condition": "Grade A",
    "quantity": 300,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Toys",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+129%",
    "content": [
      "Assorted name brands including LEGO, Funko Pop, and popular plush, educational, and electronic toy lines",
      "300 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/kids-toys-mixed-pallet-300-units/01.jpg",
      "https://wholesalenijas.com/images/products/kids-toys-mixed-pallet-300-units/02.jpg",
      "https://wholesalenijas.com/images/products/kids-toys-mixed-pallet-300-units/03.jpg",
      "https://wholesalenijas.com/images/products/kids-toys-mixed-pallet-300-units/04.jpg",
      "https://wholesalenijas.com/images/products/kids-toys-mixed-pallet-300-units/05.jpg",
      "https://wholesalenijas.com/images/products/kids-toys-mixed-pallet-300-units/06.jpg"
    ]
  },
  {
    "id": 10,
    "title": "Milwaukee Branded Power Tools Wholesale Pallet — 60 Pieces, Grade A",
    "description": "Milwaukee wholesale pallet, 60 pieces Grade A power tools. Drills, M18 batteries, drivers, chargers. US warehouse, manifested, ships in 48h.",
    "price": 1500,
    "original_price": 2000,
    "condition": "Grade A",
    "quantity": 60,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Tools",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+33%",
    "content": [
      "100% Milwaukee branded power tools and accessories",
      "60 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/milwaukee-power-tools-pallet-60-pieces/01.jpg",
      "https://wholesalenijas.com/images/products/milwaukee-power-tools-pallet-60-pieces/02.jpg",
      "https://wholesalenijas.com/images/products/milwaukee-power-tools-pallet-60-pieces/03.jpg",
      "https://wholesalenijas.com/images/products/milwaukee-power-tools-pallet-60-pieces/04.jpg",
      "https://wholesalenijas.com/images/products/milwaukee-power-tools-pallet-60-pieces/05.jpg"
    ]
  },
  {
    "id": 11,
    "title": "Mixed Home + Gaming Electronics Wholesale Pallet — 80 Units, Grade B+",
    "description": "Wholesale liquidation pallet: 80 mixed home, gaming, and kitchen electronics, Grade B+. Drones, headsets, knives. Resale-ready for Amazon FBA, eBay, flea markets.",
    "price": 600,
    "original_price": 1000,
    "condition": "Grade B+",
    "quantity": 80,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "General Merchandise",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.4,
    "estimatedProfit": "+67%",
    "content": [
      "Mixed assortment of unbranded and generic-brand gaming peripherals, kitchen tools, household items, and consumer electronics with occasional name-brand inclusions across the 80-unit lot.",
      "80 units per pallet",
      "Grade B+ — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/01.jpg",
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/02.jpg",
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/03.jpg",
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/04.jpg",
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/05.jpg",
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/06.jpg",
      "https://wholesalenijas.com/images/products/home-electronics-mixed-pallet-80-units/07.jpg"
    ]
  },
  {
    "id": 12,
    "title": "Womens Sandals Wholesale Pallet — 180 Pairs, Grade A, Mixed Styles",
    "description": "Wholesale womens sandals pallet liquidation: 180 pairs Grade A, mixed flats, wedges and heels. Bulk lot for resale, ships from US in 48 hours.",
    "price": 650,
    "original_price": 1600,
    "condition": "Grade A",
    "quantity": 180,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+146%",
    "content": [
      "Mixed-brand assortment of new womens sandals spanning flats, mid-heels, wedges, and strappy slide silhouettes built for warm-weather resale demand.",
      "180 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/womens-sandals-pallet-180-pairs/09.jpg"
    ]
  },
  {
    "id": 13,
    "title": "Ninja Kitchen Appliances Wholesale Pallet — 35 Units, Grade A, Branded",
    "description": "Wholesale Ninja kitchen appliances pallet — 35 Grade A branded units: blenders, air fryers, grills, coffee makers. Manifested liquidation lot, ships from US.",
    "price": 600,
    "original_price": 1400,
    "condition": "Grade A",
    "quantity": 35,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Appliances",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+133%",
    "content": [
      "100% Ninja-branded small kitchen appliances — blenders, air fryers, electric grills, food processors, and premium coffee makers in Grade A condition.",
      "35 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/01.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/02.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/03.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/04.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/05.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/06.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/07.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/08.jpg",
      "https://wholesalenijas.com/images/products/ninja-kitchen-appliances-pallet-35-units/09.jpg"
    ]
  },
  {
    "id": 14,
    "title": "Baccarat Rouge Crystal Luxury Fragrance Wholesale Pallet — 25 Units, Grade A",
    "description": "Wholesale liquidation pallet: 25 Grade A Baccarat Rouge crystal luxury fragrance units. US warehouse, manifested, freight-forwarder ready, 50-150 percent margins.",
    "price": 250,
    "original_price": 625,
    "condition": "Grade A",
    "quantity": 25,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Cosmetics",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+150%",
    "content": [
      "Baccarat Rouge crystal-bottle luxury fragrance, prestige beauty resale stock with premium gift-grade packaging.",
      "25 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/baccarat-crystal-luxury-fragrance-pallet-25-units/01.jpg",
      "https://wholesalenijas.com/images/products/baccarat-crystal-luxury-fragrance-pallet-25-units/02.jpg",
      "https://wholesalenijas.com/images/products/baccarat-crystal-luxury-fragrance-pallet-25-units/03.jpg",
      "https://wholesalenijas.com/images/products/baccarat-crystal-luxury-fragrance-pallet-25-units/04.jpg"
    ]
  },
  {
    "id": 15,
    "title": "Dior Sauvage Premium Fragrance Wholesale Pallet — 15 Units, Grade A+",
    "description": "Wholesale Dior Sauvage pallet — 15 authentic Grade A+ luxury fragrance gift sets. Manifested liquidation lot for Amazon FBA, Sephora flippers, eBay resellers.",
    "price": 1000,
    "original_price": 2250,
    "condition": "Grade A+",
    "quantity": 15,
    "available": true,
    "featured": true,
    "limitedTime": true,
    "category": "Cosmetics",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.9,
    "estimatedProfit": "+125%",
    "content": [
      "100% Dior Sauvage — authentic gift sets pairing the iconic eau de parfum with coordinated grooming and skincare items. Single-brand luxury fragrance pallet, no mixed-brand filler.",
      "15 units per pallet",
      "Grade A+ — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/dior-sauvage-fragrance-pallet-15-units/01.jpg",
      "https://wholesalenijas.com/images/products/dior-sauvage-fragrance-pallet-15-units/02.jpg",
      "https://wholesalenijas.com/images/products/dior-sauvage-fragrance-pallet-15-units/03.jpg"
    ]
  },
  {
    "id": 16,
    "title": "Womens Boots Wholesale Pallet — 100 Pairs, Grade A, Real + Faux Leather",
    "description": "Wholesale womens boots pallet — 100 pairs Grade A, real and faux leather, ankle to thigh-high. US warehouse, freight-forwarder friendly, manifested liquidation lot.",
    "price": 500,
    "original_price": 1200,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+140%",
    "content": [
      "Mixed-brand assortment of womens elegant and trend-driven boots in real leather and quality faux leather. Includes ankle boots, mid-shaft boots, and over-the-knee thigh-high styles in seasonal black, brown, tan, and neutral tones.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/09.jpg",
      "https://wholesalenijas.com/images/products/womens-boots-leather-pallet-100-pairs/10.jpg"
    ]
  },
  {
    "id": 17,
    "title": "Mixed Sport Shoes Wholesale Pallet — 180 Pairs, Grade A, All Ages",
    "description": "Wholesale sneaker pallet — 180 pairs of Grade A sport shoes, mens, womens, kids. Brand-name liquidation lot for StockX, GOAT, eBay resellers. Ships US in 48h.",
    "price": 899,
    "original_price": 2400,
    "condition": "Grade A",
    "quantity": 180,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+167%",
    "content": [
      "Recognized sport and lifestyle sneaker labels across mens, womens, and kids sizing — running, training, court, and casual silhouettes in Grade A new condition.",
      "180 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/mixed-sport-shoes-pallet-180-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-shoes-pallet-180-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-shoes-pallet-180-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-shoes-pallet-180-pairs/04.jpg"
    ]
  },
  {
    "id": 18,
    "title": "Nike Mixed Shoes Liquidation Pallet — 100 Pairs, Grade A, Boxed",
    "description": "Wholesale Nike sneaker liquidation pallet — 100 pairs, Grade A, boxed. Resale-ready for StockX, GOAT, eBay. Ships US warehouse in 48 hours, freight forwarder ok.",
    "price": 1000,
    "original_price": 2500,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": true,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+150%",
    "content": [
      "100 percent Nike across running, training, and lifestyle silhouettes — boxed, Grade A, ready for resale channels.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/nike-shoes-liquidation-pallet-100-pairs/09.jpg"
    ]
  },
  {
    "id": 19,
    "title": "Winter Hooded Jackets Wholesale Pallet — 70 Pieces, Grade A-B",
    "description": "Wholesale liquidation pallet of 70 winter hooded jackets, Grade A-B. Padded, fleece-lined, faux fur trim. Assorted sizes and colors for Depop, Vinted, eBay resale.",
    "price": 400,
    "original_price": 750,
    "condition": "Grade A-B",
    "quantity": 70,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.5,
    "estimatedProfit": "+88%",
    "content": [
      "Mixed high-street and trend-led winter outerwear: padded and fleece-lined hooded jackets, faux fur trim parkas, varsity-style puffers, and quilted anoraks in assorted colorways and sizes pitched at the Depop, Vinted, and TikTok Shop crowd.",
      "70 units per pallet",
      "Grade A-B — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/winter-hooded-jackets-pallet-70-pieces/01.jpg",
      "https://wholesalenijas.com/images/products/winter-hooded-jackets-pallet-70-pieces/02.jpg",
      "https://wholesalenijas.com/images/products/winter-hooded-jackets-pallet-70-pieces/03.jpg",
      "https://wholesalenijas.com/images/products/winter-hooded-jackets-pallet-70-pieces/04.jpg",
      "https://wholesalenijas.com/images/products/winter-hooded-jackets-pallet-70-pieces/05.jpg",
      "https://wholesalenijas.com/images/products/winter-hooded-jackets-pallet-70-pieces/06.jpg"
    ]
  },
  {
    "id": 20,
    "title": "Primark Pyjamas Wholesale Pallet — 500 Units, Grade A",
    "description": "Wholesale Primark pyjamas pallet liquidation: 500 units Grade A sleepwear for men, women, kids. Bulk lot for Depop, Vinted, eBay, Poshmark resellers.",
    "price": 1000,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 500,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+50%",
    "content": [
      "100% Primark pyjamas and loungewear — two-piece sets, cotton blends, lightweight summer styles and warmer winter cuts across men, women, and kids.",
      "500 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/01.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/02.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/03.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/04.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/05.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/06.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/07.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/08.jpg",
      "https://wholesalenijas.com/images/products/primark-pyjamas-pallet-500-units/09.jpg"
    ]
  },
  {
    "id": 21,
    "title": "Hugo Boss Sneakers Wholesale Pallet — 100 Pairs, Grade A, Premium",
    "description": "Wholesale Hugo Boss sneakers pallet — 100 pairs, Grade A premium designer footwear. Liquidation bulk lot ready for StockX, GOAT, eBay resale. Ships from US.",
    "price": 1000,
    "original_price": 1200,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+20%",
    "content": [
      "Hugo Boss premium sneakers, modern urban lifestyle silhouettes with elevated leather and knit uppers in core neutrals.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/boss-sneakers-pallet-100-pairs/09.jpg"
    ]
  },
  {
    "id": 22,
    "title": "Nike Mixed Model Sneakers Wholesale Pallet — 200 Pairs, Grade A",
    "description": "Wholesale Nike sneaker pallet — 200 pairs, Grade A mixed models. Liquidation lot from US warehouse, ships in 48h. Resell on StockX, GOAT, eBay with 30-90% margins.",
    "price": 2000,
    "original_price": 2500,
    "condition": "Grade A",
    "quantity": 200,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+25%",
    "content": [
      "100% Nike across mixed silhouettes — running, training, lifestyle, and court styles in Grade A condition.",
      "200 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/09.jpg",
      "https://wholesalenijas.com/images/products/nike-mixed-sneakers-pallet-200-pairs/10.jpg"
    ]
  },
  {
    "id": 23,
    "title": "DeWalt Branded Power Tools Wholesale Pallet — 60 Pieces, Grade A",
    "description": "Wholesale DeWalt power tools pallet, 60 pieces Grade A. Liquidation lot for resellers, Amazon FBA, eBay flippers. Ships from US in 48 hours.",
    "price": 1500,
    "original_price": 2500,
    "condition": "Grade A",
    "quantity": 60,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Tools",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+67%",
    "content": [
      "100% DeWalt-branded power tools and accessories, Grade A condition, mixed drills, drivers, saws, and hand power equipment in OEM packaging.",
      "60 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/dewalt-power-tools-pallet-60-pieces/01.jpg",
      "https://wholesalenijas.com/images/products/dewalt-power-tools-pallet-60-pieces/02.jpg",
      "https://wholesalenijas.com/images/products/dewalt-power-tools-pallet-60-pieces/03.jpg",
      "https://wholesalenijas.com/images/products/dewalt-power-tools-pallet-60-pieces/04.jpg"
    ]
  },
  {
    "id": 24,
    "title": "HOKA Performance Sneakers Wholesale Pallet — 200 Pairs, Grade A",
    "description": "Wholesale HOKA sneaker pallet — 200 pairs, Grade A. Running, trail, and lifestyle models for resale on StockX, GOAT, eBay, and Amazon. Ships in 48h.",
    "price": 1500,
    "original_price": 1800,
    "condition": "Grade A",
    "quantity": 200,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+20%",
    "content": [
      "100% HOKA performance sneakers — running, trail, and lifestyle silhouettes built around the brand's signature max-cushion midsoles and meta-rocker geometry.",
      "200 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/09.jpg",
      "https://wholesalenijas.com/images/products/hoka-sneakers-pallet-200-pairs/10.jpg"
    ]
  },
  {
    "id": 25,
    "title": "Premium Kids Shoes Wholesale Pallet — 120 Units, Grade A, European Brands",
    "description": "Wholesale kids shoes pallet — 120 units, Grade A European brands. Sneakers, sandals, boots, school shoes. Liquidation bulk lot ships from US in 48 hours.",
    "price": 1000,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 120,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+50%",
    "content": [
      "Mixed European children's footwear brands across sneakers, sandals, ankle boots, and school shoes — Grade A, brand-new with original packaging where supplied.",
      "120 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/01.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/02.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/03.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/04.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/05.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/06.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/07.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/08.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/09.jpg",
      "https://wholesalenijas.com/images/products/kids-shoes-european-brands-pallet-120-units/10.jpg"
    ]
  },
  {
    "id": 26,
    "title": "Air Jordan Authentic Sneakers Wholesale Pallet — 50 Pairs, Grade A",
    "description": "Wholesale Air Jordan pallet: 50 pairs Grade A authentic sneakers, AJ1 AJ4 AJ6 with original boxes. Resell on StockX, GOAT, eBay. Ships from US in 48h.",
    "price": 2000,
    "original_price": 4500,
    "condition": "Grade A",
    "quantity": 50,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+125%",
    "content": [
      "100% authentic Air Jordan retro silhouettes including AJ1, AJ4, AJ6 and assorted premium editions, all with original boxes.",
      "50 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/air-jordan-authentic-sneakers-pallet-50-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/air-jordan-authentic-sneakers-pallet-50-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/air-jordan-authentic-sneakers-pallet-50-pairs/03.jpg"
    ]
  },
  {
    "id": 27,
    "title": "Zara Pants Wholesale Pallet — 500 Units, Grade A",
    "description": "Wholesale Zara pants pallet liquidation. 500 Grade A units, single-brand manifest, ships 48h from US warehouse. Resale-ready for Depop, Vinted, Poshmark.",
    "price": 1000,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 500,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+50%",
    "content": [
      "Single-brand Zara assortment of women's and men's pants spanning trousers, denim, joggers, and tailored bottoms in current and recent fast-fashion silhouettes.",
      "500 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/01.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/02.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/03.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/04.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/05.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/06.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/07.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/08.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/09.jpg",
      "https://wholesalenijas.com/images/products/zara-pants-pallet-500-units/10.jpg"
    ]
  },
  {
    "id": 28,
    "title": "Mixed Sport Sneakers Wholesale Pallet — 200 Pairs, Grade A",
    "description": "Wholesale sneaker pallet liquidation — 200 pairs mixed sport shoes, Grade A. Ship in 48h from US warehouse. Resell on StockX, GOAT, eBay, Mercari.",
    "price": 800,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 200,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+88%",
    "content": [
      "Mixed mainstream sport sneaker assortment — running silhouettes, court trainers, low-top lifestyle pairs, and chunky dad-shoe styles across men's, women's, and unisex sizing in Grade A condition.",
      "200 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/09.jpg",
      "https://wholesalenijas.com/images/products/mixed-sport-sneakers-pallet-200-pairs/10.jpg"
    ]
  },
  {
    "id": 29,
    "title": "Zara Kids Clothing Wholesale Pallet — 250 Units, Grade A",
    "description": "Wholesale Zara Kids clothing pallet — 250 Grade A units of branded childrenswear for resale. Tops, dresses, outerwear, sets. Ships 48h from US warehouse.",
    "price": 850,
    "original_price": 1200,
    "condition": "Grade A",
    "quantity": 250,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+41%",
    "content": [
      "100% Zara Kids — branded fast-fashion childrenswear spanning tops, bottoms, dresses, sets, outerwear, and seasonal pieces.",
      "250 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/zara-kids-clothing-pallet-250-units/01.png",
      "https://wholesalenijas.com/images/products/zara-kids-clothing-pallet-250-units/02.png",
      "https://wholesalenijas.com/images/products/zara-kids-clothing-pallet-250-units/03.png",
      "https://wholesalenijas.com/images/products/zara-kids-clothing-pallet-250-units/04.png",
      "https://wholesalenijas.com/images/products/zara-kids-clothing-pallet-250-units/05.png"
    ]
  },
  {
    "id": 30,
    "title": "Zara Jackets Wholesale Pallet — 100 Units, Grade A",
    "description": "Wholesale Zara jackets pallet, 100 units Grade A liquidation lot. Branded outerwear bulk buy for Depop, Vinted, Poshmark resale. US warehouse, ships in 48h.",
    "price": 1500,
    "original_price": 2000,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+33%",
    "content": [
      "Zara fast-fashion outerwear — seasonal jackets, blazers, puffers, denim and faux-leather styles in mixed sizes and colorways.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/zara-jackets-pallet-100-units/01.jpg",
      "https://wholesalenijas.com/images/products/zara-jackets-pallet-100-units/02.jpg",
      "https://wholesalenijas.com/images/products/zara-jackets-pallet-100-units/03.jpg",
      "https://wholesalenijas.com/images/products/zara-jackets-pallet-100-units/04.jpg",
      "https://wholesalenijas.com/images/products/zara-jackets-pallet-100-units/05.jpg"
    ]
  },
  {
    "id": 31,
    "title": "Nike Air Force 1 White Sneakers Wholesale Pallet — 100 Pairs, Grade A+",
    "description": "Wholesale liquidation pallet: 100 pairs Nike Air Force 1 White sneakers, Grade A+, sealed in original boxes. Bulk lot for StockX, GOAT, eBay resellers.",
    "price": 1000,
    "original_price": 1300,
    "condition": "Grade A+",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": true,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.9,
    "estimatedProfit": "+30%",
    "content": [
      "100% Nike Air Force 1 Triple White low-tops, an evergreen silhouette with steady year-round resale demand across StockX, GOAT, and marketplace channels.",
      "100 units per pallet",
      "Grade A+ — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/nike-air-force-1-white-sneakers-pallet-100-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/nike-air-force-1-white-sneakers-pallet-100-pairs/02.jpg"
    ]
  },
  {
    "id": 32,
    "title": "Mixed Kids Clothing Wholesale Pallet — 500 Units, Grade A-B, Ages 0-14",
    "description": "Wholesale kids clothing pallet, 500 units Grade A-B, ages 0-14. New-with-tags overstock and boutique returns for Depop, Vinted, eBay, and boutique resale.",
    "price": 700,
    "original_price": 1200,
    "condition": "Grade A-B",
    "quantity": 500,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.5,
    "estimatedProfit": "+71%",
    "content": [
      "High street and mall-brand kids fashion mix: tops, bottoms, dresses, outerwear, and sets sourced from end-of-season runs and boutique returns. Expect a rotating blend of recognizable European and US high street labels alongside private-label basics, with a healthy share of new-with-tags pieces and lightly handled shelf pulls.",
      "500 units per pallet",
      "Grade A-B — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/01.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/02.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/03.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/04.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/05.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/06.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/07.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/08.jpg",
      "https://wholesalenijas.com/images/products/kids-clothing-mixed-pallet-500-units/09.jpg"
    ]
  },
  {
    "id": 33,
    "title": "Vans Sneakers Wholesale Pallet — 100 Pairs, Grade A",
    "description": "Wholesale Vans sneaker pallet, 100 pairs Grade A. Old Skool, Sk8-Hi, Slip-On mix for StockX, GOAT, eBay resale. Manifested lot ships in 48 hours from US.",
    "price": 1200,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+25%",
    "content": [
      "All-Vans pallet weighted toward core skate silhouettes — Old Skool, Sk8-Hi, Authentic, Era, and Slip-On — across mixed colorways and US sizes for men, women, and kids.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/vans-sneakers-pallet-100-pairs/09.jpg"
    ]
  },
  {
    "id": 34,
    "title": "Haglofs Outdoor Jackets Wholesale Pallet — 100 Units, Grade A",
    "description": "Wholesale liquidation pallet of 100 Haglofs outdoor jackets, Grade A. Branded technical outerwear lot for Depop, Vinted, eBay, and boutique resellers worldwide.",
    "price": 1500,
    "original_price": 2500,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+67%",
    "content": [
      "All Haglofs branded outdoor jackets — premium Swedish technical outerwear including shells, insulated parkas, and lightweight performance layers across men's and women's sizing.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/01.jpg",
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/02.jpg",
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/03.jpg",
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/04.jpg",
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/05.jpg",
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/06.jpg",
      "https://wholesalenijas.com/images/products/haglofs-jackets-pallet-100-units/07.jpg"
    ]
  },
  {
    "id": 35,
    "title": "Mixed Brand Jeans Wholesale Pallet — 500 Pieces, Grade A, Levis Diesel Wrangler",
    "description": "Wholesale jeans liquidation pallet, 500 pieces Grade A branded denim with Levi's, Diesel, Wrangler and Lee in mixed sizes, slim, regular and bootcut cuts.",
    "price": 1500,
    "original_price": 2100,
    "condition": "Grade A",
    "quantity": 500,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+40%",
    "content": [
      "Branded denim mix anchored by Levi's, Diesel, Wrangler and Lee, with slim, regular and bootcut cuts across assorted men's and women's sizes.",
      "500 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/mixed-brand-jeans-pallet-500-pieces/01.jpg",
      "https://wholesalenijas.com/images/products/mixed-brand-jeans-pallet-500-pieces/02.jpg",
      "https://wholesalenijas.com/images/products/mixed-brand-jeans-pallet-500-pieces/03.jpg",
      "https://wholesalenijas.com/images/products/mixed-brand-jeans-pallet-500-pieces/04.jpg",
      "https://wholesalenijas.com/images/products/mixed-brand-jeans-pallet-500-pieces/05.jpg"
    ]
  },
  {
    "id": 36,
    "title": "Zara Mixed Clothing Wholesale Pallet — 300 Units, Grade A, Men + Women",
    "description": "Wholesale Zara clothing pallet, 300 Grade A units, mixed mens and womens fast fashion. Liquidation lot for Depop, Vinted, Poshmark, eBay resellers.",
    "price": 1000,
    "original_price": 1600,
    "condition": "Grade A",
    "quantity": 300,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+60%",
    "content": [
      "Single-brand Zara pallet, mixed mens and womens fast fashion in current and recent seasonal styles, Grade A condition.",
      "300 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/01.jpg",
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/02.jpg",
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/03.jpg",
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/04.jpg",
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/05.jpg",
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/06.jpg",
      "https://wholesalenijas.com/images/products/zara-mixed-clothing-pallet-300-units/07.jpg"
    ]
  },
  {
    "id": 37,
    "title": "Zara Spring Womens Collection Wholesale Pallet — 300 Units, Grade A",
    "description": "Wholesale Zara spring womens pallet — 300 units, Grade A, single-brand liquidation. Ships 48h from US warehouse, freight-forwarder friendly, ocean or air.",
    "price": 1000,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 300,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+50%",
    "content": [
      "100 percent Zara womenswear from the current spring collection — dresses, blouses, knits, denim, and lightweight outerwear in trend-driven cuts and colorways.",
      "300 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/01.webp",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/02.webp",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/03.webp",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/04.webp",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/05.jpg",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/06.webp",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/07.webp",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/08.jpg",
      "https://wholesalenijas.com/images/products/zara-spring-womens-collection-pallet-300-units/09.webp"
    ]
  },
  {
    "id": 38,
    "title": "Kids Sneakers Mixed Sizes Wholesale Pallet — 300 Pairs, Grade A",
    "description": "Wholesale kids sneakers pallet, 300 pairs Grade A mixed sizes. Liquidation footwear lot for resale on eBay, Mercari, Poshmark. Ships from US warehouse.",
    "price": 700,
    "original_price": 1000,
    "condition": "Grade A",
    "quantity": 300,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Footwear",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+43%",
    "content": [
      "Mixed assortment of kids athletic sneakers in popular sport silhouettes and casual lace-up profiles, spanning toddler through pre-teen sizes in current-season colorways.",
      "300 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/01.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/02.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/03.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/04.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/05.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/06.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/07.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/08.jpg",
      "https://wholesalenijas.com/images/products/kids-sneakers-mixed-pallet-300-pairs/09.jpg"
    ]
  },
  {
    "id": 39,
    "title": "Zara Winter Puffer Jackets Wholesale Pallet — 100 Units, Grade A",
    "description": "Wholesale liquidation pallet: 100 Zara winter puffer jackets, Grade A, original tags. Ships US in 48h, freight-forwarder friendly. Resale-ready for Depop and Vinted.",
    "price": 1000,
    "original_price": 1500,
    "condition": "Grade A",
    "quantity": 100,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+50%",
    "content": [
      "100% Zara — quilted zip-front puffer jackets in core winter colorways, original tags attached.",
      "100 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/zara-winter-puffer-jackets-pallet-100-units/01.jpg",
      "https://wholesalenijas.com/images/products/zara-winter-puffer-jackets-pallet-100-units/02.jpg",
      "https://wholesalenijas.com/images/products/zara-winter-puffer-jackets-pallet-100-units/03.jpg",
      "https://wholesalenijas.com/images/products/zara-winter-puffer-jackets-pallet-100-units/04.jpg"
    ]
  },
  {
    "id": 40,
    "title": "Trendy Adjustable Caps Wholesale Pallet — 200 Pieces, Grade A, Mixed Styles",
    "description": "Wholesale liquidation pallet of 200 Grade A adjustable trend caps. Mixed styles and colors for Amazon, eBay, Mercari, and boutique resale. Ships from US.",
    "price": 500,
    "original_price": 850,
    "condition": "Grade A",
    "quantity": 200,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Accessories",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+70%",
    "content": [
      "Mixed-style trend caps in assorted colorways — snapback, dad-hat, curved-brim, and trucker silhouettes built for everyday streetwear and resale flips.",
      "200 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/adjustable-caps-pallet-200-pieces/01.jpg",
      "https://wholesalenijas.com/images/products/adjustable-caps-pallet-200-pieces/02.jpg",
      "https://wholesalenijas.com/images/products/adjustable-caps-pallet-200-pieces/03.jpg",
      "https://wholesalenijas.com/images/products/adjustable-caps-pallet-200-pieces/04.jpg",
      "https://wholesalenijas.com/images/products/adjustable-caps-pallet-200-pieces/05.jpg",
      "https://wholesalenijas.com/images/products/adjustable-caps-pallet-200-pieces/06.jpg"
    ]
  },
  {
    "id": 41,
    "title": "Mixed T-shirts Wholesale Pallet — 300 Pieces, Grade A, Multi-size",
    "description": "Wholesale t-shirt pallet liquidation: 300 Grade A mixed tees, multi-size, multi-color. Ships from US in 48h. Built for Depop, Vinted, Poshmark, TikTok Shop resellers.",
    "price": 600,
    "original_price": 1200,
    "condition": "Grade A",
    "quantity": 300,
    "available": true,
    "featured": false,
    "limitedTime": false,
    "category": "Clothing",
    "origin": "Wholesale Ninjas — verified bulk lot",
    "rating": 4.7,
    "estimatedProfit": "+100%",
    "content": [
      "Mixed assortment of soft-touch cotton and cotton-blend t-shirts in assorted colors, prints, and sizes — a fast-fashion-leaning lot suited to high-volume resale on social marketplaces.",
      "300 units per pallet",
      "Grade A — inspected & graded",
      "Manifested lot · ships from US warehouse"
    ],
    "images": [
      "https://wholesalenijas.com/images/products/mixed-tshirts-pallet-300-pieces/01.jpg",
      "https://wholesalenijas.com/images/products/mixed-tshirts-pallet-300-pieces/02.jpg",
      "https://wholesalenijas.com/images/products/mixed-tshirts-pallet-300-pieces/03.jpg",
      "https://wholesalenijas.com/images/products/mixed-tshirts-pallet-300-pieces/04.jpg"
    ]
  }
];

/** Normalise a row coming from Supabase into the local Palette shape. */
function normalize(row: Record<string, unknown>): Palette {
  return {
    id: Number(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    price: Number(row.price ?? 0),
    original_price: Number(row.original_price ?? 0),
    condition: String(row.condition ?? 'Grade A'),
    quantity: Number(row.quantity ?? 0),
    weight: row.weight ? String(row.weight) : undefined,
    dimensions: row.dimensions ? String(row.dimensions) : undefined,
    available: row.available !== false,
    featured: Boolean(row.featured),
    limitedTime: Boolean(row.limitedTime ?? row.limited_time),
    category: String(row.category ?? 'All'),
    origin: row.origin ? String(row.origin) : undefined,
    rating: Number(row.rating ?? 4.5),
    content: Array.isArray(row.content) ? (row.content as string[]) : [],
    images:
      Array.isArray(row.images) && row.images.length
        ? (row.images as string[])
        : ['/images/products/placeholder.jpg'],
    estimatedProfit: String(row.estimatedProfit ?? row.estimated_profit ?? ''),
  };
}

/**
 * Returns the catalogue. Uses Supabase when configured, otherwise the bundled
 * seed data. Safe to call from Server Components.
 */
export async function getPalettes(): Promise<Palette[]> {
  if (!isSupabaseConfigured()) return seedPalettes;
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase!.from('palettes').select('*');
    if (error || !data || data.length === 0) return seedPalettes;
    return data.map(normalize);
  } catch {
    return seedPalettes;
  }
}

export const getFeaturedPalettes = (list: Palette[]): Palette[] => list.filter((p) => p.featured);

export const getAvailablePalettes = (list: Palette[]): Palette[] => list.filter((p) => p.available);

export const getPaletteById = (list: Palette[], id: number | string): Palette | undefined =>
  list.find((p) => p.id === Number(id));
