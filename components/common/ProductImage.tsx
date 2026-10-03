'use client';

import React, { useState } from 'react';
import { 
  Headphones, 
  Watch, 
  Shirt, 
  ShoppingBag, 
  Sparkles, 
  Home, 
  Activity, 
  Cpu, 
  Volume2, 
  Flame, 
  BatteryCharging,
  Layers,
  Compass
} from 'lucide-react';

interface ProductImageProps {
  imageKey: string;
  name: string;
  category?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export const ProductImage: React.FC<ProductImageProps> = ({
  imageKey,
  name,
  category,
  className = '',
  aspectRatio = 'square',
}) => {
  const [hasError, setHasError] = useState(false);

  // Aspect ratio classes
  const aspectClass =
    aspectRatio === 'wide'
      ? 'aspect-[16/10]'
      : aspectRatio === 'tall'
      ? 'aspect-[3/4]'
      : 'aspect-square';

  // Category and visual styling mapping
  const getTheme = () => {
    switch (imageKey) {
      case 'earbuds_black':
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950',
          accent: 'text-indigo-400',
          icon: Headphones,
          badge: '42dB HYBRID ANC',
          detail: '11mm LCP Audio Drivers',
        };
      case 'speaker_cylindrical':
        return {
          bg: 'bg-gradient-to-br from-zinc-800 via-slate-900 to-blue-950',
          accent: 'text-blue-400',
          icon: Volume2,
          badge: 'IPX7 WATERPROOF',
          detail: '24W 360° Omnidirectional',
        };
      case 'smartwatch_sport':
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-neutral-900 to-amber-950/60',
          accent: 'text-amber-400',
          icon: Watch,
          badge: '1.43" AMOLED 60Hz',
          detail: 'Optical SpO2 & Heart Rate',
        };
      case 'headphones_overear':
        return {
          bg: 'bg-gradient-to-br from-zinc-900 via-stone-900 to-slate-950',
          accent: 'text-slate-300',
          icon: Headphones,
          badge: 'HI-RES TITANIUM',
          detail: '40mm Driver · 50h Playtime',
        };
      case 'powerbank_sleek':
        return {
          bg: 'bg-gradient-to-br from-slate-800 via-zinc-900 to-cyan-950',
          accent: 'text-cyan-400',
          icon: BatteryCharging,
          badge: '65W PD LAPTOP FAST',
          detail: '20,000 mAh High-Density',
        };
      case 'shirt_linen':
        return {
          bg: 'bg-gradient-to-br from-stone-100 via-stone-200 to-amber-100/50',
          accent: 'text-stone-700',
          icon: Shirt,
          badge: '100% EUROPEAN FLAX',
          detail: 'Garment Washed · Mother of Pearl',
          darkText: true,
        };
      case 'bag_tote':
        return {
          bg: 'bg-gradient-to-br from-amber-950/40 via-stone-900 to-neutral-950',
          accent: 'text-amber-300',
          icon: ShoppingBag,
          badge: 'ECO VEGAN PEBBLE',
          detail: 'Padded 14" Laptop Sleeve',
        };
      case 'sneakers_sport':
        return {
          bg: 'bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900',
          accent: 'text-indigo-300',
          icon: Activity,
          badge: 'CLOUD CUSHION EVA',
          detail: 'Engineered Air-Mesh',
        };
      case 'tshirt_cotton':
        return {
          bg: 'bg-gradient-to-br from-neutral-800 via-stone-900 to-zinc-950',
          accent: 'text-neutral-300',
          icon: Shirt,
          badge: '240 GSM COMBED',
          detail: 'Pre-Shrunk Heavyweight Cut',
        };
      case 'hoodie_cozy':
        return {
          bg: 'bg-gradient-to-br from-stone-800 via-slate-900 to-neutral-900',
          accent: 'text-stone-300',
          icon: Shirt,
          badge: 'BRUSHED FLEECE 380 GSM',
          detail: 'Double-Layer Contoured Hood',
        };
      case 'lamp_ceramic':
        return {
          bg: 'bg-gradient-to-br from-amber-900/30 via-stone-900 to-neutral-900',
          accent: 'text-amber-300',
          icon: Home,
          badge: 'WARM TOUCH DIMMER',
          detail: 'Handcrafted Ribbed Ceramic',
        };
      case 'serum_dropper':
        return {
          bg: 'bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-stone-900',
          accent: 'text-amber-400',
          icon: Sparkles,
          badge: '15% VITAMIN C + FERULIC',
          detail: 'Antioxidant Collagen Booster',
        };
      case 'backpack_urban':
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900',
          accent: 'text-slate-300',
          icon: ShoppingBag,
          badge: '900D CORDURA WATERPROOF',
          detail: '16" Laptop Suspended Pocket',
        };
      case 'wallet_leather':
        return {
          bg: 'bg-gradient-to-br from-amber-950/80 via-yellow-950/40 to-stone-900',
          accent: 'text-amber-300',
          icon: Layers,
          badge: 'FULL-GRAIN PULL-UP',
          detail: 'Certified RFID Protection',
        };
      case 'sunglasses_classic':
        return {
          bg: 'bg-gradient-to-br from-stone-900 via-neutral-900 to-amber-950/40',
          accent: 'text-amber-400',
          icon: Compass,
          badge: 'TAC POLARIZED UV400',
          detail: 'Hand-Cut Italian Acetate',
        };
      case 'watch_dress':
        return {
          bg: 'bg-gradient-to-br from-slate-950 via-neutral-900 to-zinc-900',
          accent: 'text-sky-300',
          icon: Watch,
          badge: 'ULTRA-SLIM 6.8MM',
          detail: 'Sapphire Crystal · Miyota Quartz',
        };
      case 'charging_stand':
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-indigo-950',
          accent: 'text-indigo-400',
          icon: Cpu,
          badge: '3-IN-1 MAGSAFE 15W',
          detail: 'Aerospace Folding Aluminum',
        };
      case 'water_bottle':
        return {
          bg: 'bg-gradient-to-br from-emerald-950/60 via-slate-900 to-stone-900',
          accent: 'text-emerald-400',
          icon: Activity,
          badge: '24H COLD / 12H HOT',
          detail: '18/8 Double Vacuum Steel',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-800',
          accent: 'text-slate-300',
          icon: ShoppingBag,
          badge: 'AJASIAGO CERTIFIED',
          detail: 'Quality Inspected',
        };
    }
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl flex flex-col justify-between p-5 select-none ${theme.bg} ${className}`}
    >
      {/* Background ambient circular glow */}
      <div
        className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-8 -bottom-8 w-44 h-44 rounded-full bg-black/20 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top row: Subtle tech badge & Brand Mark */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded-full ${
            theme.darkText
              ? 'bg-stone-900/10 text-stone-800'
              : 'bg-white/10 text-slate-200 border border-white/10'
          }`}
        >
          {theme.badge}
        </span>
        <span
          className={`text-[11px] font-bold tracking-tight opacity-70 ${
            theme.darkText ? 'text-stone-800' : 'text-white'
          }`}
        >
          AjasiaGO
        </span>
      </div>

      {/* Center Artwork / Icon Visual */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-2">
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${
            theme.darkText
              ? 'bg-stone-900/5 text-stone-900 border border-stone-900/10'
              : 'bg-white/10 text-white border border-white/15 backdrop-blur-sm'
          }`}
        >
          <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.accent}`} />
        </div>
      </div>

      {/* Bottom row: Feature Spec Callout */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
        <span
          className={`font-medium truncate pr-2 ${
            theme.darkText ? 'text-stone-700' : 'text-slate-300'
          }`}
        >
          {theme.detail}
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider shrink-0 ${
            theme.darkText ? 'text-stone-500' : 'text-slate-400'
          }`}
        >
          {category || 'In Stock'}
        </span>
      </div>
    </div>
  );
};
