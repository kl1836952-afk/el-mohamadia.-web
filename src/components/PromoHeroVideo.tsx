import React, { useState, useEffect } from "react";
import {
  Ship,
  MapPin,
  Sparkles,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
  Download,
  PhoneCall,
  Share2,
  FileCheck2,
  Anchor,
  Activity
} from "lucide-react";

interface Props {
  lang: "ar" | "en";
  activeTab: string;
  setActiveTab: (tab: "home" | "calculator" | "chat" | "tracker" | "booking") => void;
}

export default function PromoHeroVideo({ lang, activeTab, setActiveTab }: Props) {
  const isAr = lang === "ar";
  const [pulseActive, setPulseActive] = useState(true);
  const [activePort, setActivePort] = useState<string>("alexandria");

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const egyptianPorts = [
    { id: "alexandria", labelAr: "ميناء الإسكندرية / الدخيلة", labelEn: "Alexandria / Dekheila Port", coords: { x: "42%", y: "45%" }, descAr: "المركز الرئيسي لتخليص السيارات ومجمع جمارك 40", descEn: "Central Automotive Clearance Bureau & Complex 40" },
    { id: "damietta", labelAr: "ميناء دمياط البحري", labelEn: "Damietta Seaport", coords: { x: "58%", y: "38%" }, descAr: "متخصص في الحاويات والسلع الاستراتيجية والصلب", descEn: "Primary bulk cargo, strategic grain & rebar clearance" },
    { id: "portsaid", labelAr: "ميناء بورسعيد (شرق/غرب)", labelEn: "Port Said Seaport (East/West)", coords: { x: "72%", y: "41%" }, descAr: "إنقاء فوري لوظائف الترانزيت ومناطق لوجستية حرة", descEn: "Transit harbor logs & Free-Zone customs representation" },
    { id: "suez", labelAr: "ميناء السويس / الأدبية", labelEn: "Suez / Adabiya Seaport", coords: { x: "78%", y: "65%" }, descAr: "بوابتنا الرئيسية على البحر الأحمر للواردات والتبخير", descEn: "Red Sea freight tracking, fumigation & import gateway" },
    { id: "cairoAir", labelAr: "قرية بضائع مطار القاهرة", labelEn: "Cairo Air Cargo Terminal", coords: { x: "63%", y: "58%" }, descAr: "التخليص المستعجل للأجهزة الطبية وقطع الغيار الحيوية", descEn: "Express clearances for diagnostics & urgent aviation cargo" },
    {
      id: "borgElArabAir",
      labelAr: "قرية بضائع مطار برج العرب",
      labelEn: "Borg El Arab Airport Cargo Village",
      coords: { x: "32%", y: "51%" },
      descAr: "تخليص الواردات الجوية والتجارة الإقليمية لغرب الإسكندرية",
      descEn: "Express air import clearance and regional trade in West Alexandria"
    }
  ];

  return (
    <div id="promo-hero-container" className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-blue-900/40 bg-blue-950 mb-10">
      {/* Self-contained CSS animations for radar/sea graphics */}
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ripple-pulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes wave-slide {
          0% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
          100% { transform: translateX(0); }
        }
        @keyframes ship-gently-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }
        @keyframes light-beam-sweep {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(40deg); }
        }
        .grid-cyber {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(30, 41, 59, 0.25) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(30, 41, 59, 0.25) 1px, transparent 1px);
        }
      `}</style>

      {/* Absolute Glow Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 pointer-events-none" />
      <div className="absolute inset-0 grid-cyber opacity-40 pointer-events-none" />

      {/* Main Container Layout */}
      <div className="relative min-h-[480px] flex flex-col xl:flex-row items-stretch justify-between z-10" dir={isAr ? "rtl" : "ltr"}>

        {/* LEFT COLL: High prestige corporate overview & download incentives */}
        <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between space-y-8 xl:max-w-3xl text-white">

          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 py-1.5 px-4 rounded-full text-xs font-black tracking-wide">
              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
              {isAr ? "الريادة الوطنية في التخليص الجمركي وإصدار الدفاتر" : "National Pioneer in Port Clearances & Triptyque Permits"}
            </span>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {isAr ? (
                <>
                  مؤسسة <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">المحمدية الجمركية</span>
                </>
              ) : (
                <>
                  Al-Muhammadiyah <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">Customs Bureau</span>
                </>
              )}
            </h1>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed font-sans font-medium opacity-90 max-w-2xl">
              {isAr
                ? "خبرتنا تغطي أكثر من 25 سنة بكافة موانئ مصر ومجمعات جمارك السيارات. نحن نوفر دقة فائقة، رقابة متناهية، وأمان مالي لا يضاهى لضمان زيرو غرامات على شحنتك، مع تمثيل قانوني مالي معتمد."
                : "More than 25 years of supreme regulatory leadership in all Egyptian sea, air, and dry ports. We guarantee seamless zero-penalty shipping, certified Triptyque booklets, and complete financial safety frameworks."}
            </p>
          </div>

          {/* Golden download incentives block */}
          <div className="space-y-3.5">
            <h3 className="font-extrabold text-amber-300 text-xs uppercase tracking-widest flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400 shrink-0" />
              {isAr ? "لماذا يتكلم عنا الجميع؟" : "Why we are the industry standard (App Benefits):"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div id="benefit-item-1" className="bg-blue-900/30 border border-blue-800/40 hover:border-amber-400/40 p-3.5 rounded-2xl flex items-start gap-2.5 transition-all">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-black text-white">{isAr ? "ضمان زيرو غرامات أرضية" : "Zero Demurrage Guarantee"}</h4>
                  <p className="text-blue-200/90 leading-relaxed font-sans">{isAr ? "نراجع فواتيرك ونسقها جمركياً قبل شحن الحاوية برصيف التصدير" : "Prior audits on invoices before loading seaports to prevent fines"}</p>
                </div>
              </div>

              <div id="benefit-item-2" className="bg-blue-900/30 border border-blue-800/40 hover:border-amber-400/40 p-3.5 rounded-2xl flex items-start gap-2.5 transition-all">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-black text-white">{isAr ? "الخدمة الذكية الفورية بجميني" : "AI-Powered Customs Encyclopedia"}</h4>
                  <p className="text-blue-200/90 leading-relaxed font-sans">{isAr ? "احصل على بند التعرفة لسلعتك أو سيارتك فورا وبدون انتظار" : "Determine tariffs, HS Codes, and exact import laws in seconds"}</p>
                </div>
              </div>

              <div id="benefit-item-3" className="bg-blue-900/30 border border-blue-800/40 hover:border-amber-400/40 p-3.5 rounded-2xl flex items-start gap-2.5 transition-all">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-black text-white">{isAr ? "موافقة فورية لدفتر التربتك" : "Express Triptyque Booklet Setup"}</h4>
                  <p className="text-blue-200/90 leading-relaxed font-sans">{isAr ? "نقود المعاملات لاستخراج الدفاتر وإعادة تصدير السيارات السياحية ببراعة" : "Perfect representation for tourist vehicles and international permits"}</p>
                </div>
              </div>

              <div id="benefit-item-4" className="bg-blue-900/30 border border-blue-800/40 hover:border-amber-400/40 p-3.5 rounded-2xl flex items-start gap-2.5 transition-all">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="font-black text-white">{isAr ? "خبراتنا الممتدة لأكثر من 25 سنة" : "More than 25 Years of Experience"}</h4>
                  <p className="text-blue-200/90 leading-relaxed font-sans">{isAr ? "خبرة عريقة في جميع الموانئ المصرية لتخليص سيارات التربيتيك والمغتربين والمالك الأول والرسائل التجارية" : "Serving with absolute prestige in Alexandria and all Egyptian custom yards"}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="benefit-item-5" className="bg-blue-900/30 border border-blue-800/40 hover:border-blue-700/60 rounded-xl p-3 flex gap-3 items-start transition-colors">
            <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="font-black text-white">{isAr ? "شحن من جميع أنحاء أوروبا" : "Shipping from all over Europe"}</h4>
              <p className="text-blue-200/90 leading-relaxed font-sans">{isAr ? "نغطي كافة الموانئ الأوروبية لنقل سياراتك وبضائعك بأمان وسرعة وبأفضل الأسعار." : "We cover all European ports to transport your cars and goods safely and quickly."}</p>
            </div>
          </div>

          <div id="benefit-item-6" className="bg-blue-900/30 border border-blue-800/40 hover:border-blue-700/60 rounded-xl p-3 flex gap-3 items-start transition-colors">
            <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="font-black text-white">{isAr ? "مخزن في ميناء أنتورب في بلجيكا" : "Warehouse in Port of Antwerp, Belgium"}</h4>
              <p className="text-blue-200/90 leading-relaxed font-sans">{isAr ? "نوفر ساحات تخزين ومستودعات مؤمنة بالكامل في قلب أوروبا لتسهيل عمليات التجميع والشحن." : "We provide fully secured storage yards and warehouses in the heart of Europe."}</p>
            </div>
          </div>
          {/* Info Details Footer Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-amber-300/90">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Anchor className="h-4 w-4 text-amber-400" />
              <span>{isAr ? "جميع الموانئ المصرية معتمدة جمركياً" : "All Egyptian seaports legally certified"}</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{isAr ? "رقم موثق: 01274833844" : "Hotline: 01274833844"}</span>
            </span>
          </div>

          {/* CTA Nav Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setActiveTab("calculator")}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2.5 text-sm shadow-lg shadow-amber-500/10 cursor-pointer border border-amber-300/20"
            >
              <span>{isAr ? "📋 احسب جمرك وتكلفة سيارتك الآن" : "📋 Simulate Vehicle Customs Duty"}</span>
            </button>

            <button
              onClick={() => setActiveTab("booking")}
              className="bg-blue-900/50 hover:bg-blue-900 border border-blue-700/60 text-white font-extrabold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <PhoneCall className="h-4 w-4 text-amber-400" />
              <span>{isAr ? "📞 تواصل معنا فاعلاً" : "📞 Contact Our Desk Now"}</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLL: Animated Interactive Radar & Ship Simulator Layout */}
        <div className="flex-1 min-h-[380px] md:min-h-[440px] xl:w-[480px] relative p-6 flex flex-col justify-between overflow-hidden bg-slate-950 border-t xl:border-t-0 xl:border-r border-blue-900/20">

          {/* Animated SVG Radar Screen */}
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#070b19] overflow-hidden">

            {/* Maritime coordinate grid layout */}
            <div className="absolute w-[90%] h-[90%] border border-blue-900/10 rounded-full" />
            <div className="absolute w-[60%] h-[60%] border border-blue-900/20 rounded-full" />
            <div className="absolute w-[30%] h-[30%] border border-blue-900/30 rounded-full" />

            {/* Constant Sweeper Line */}
            <div className="absolute w-[45%] h-[45%] origin-bottom-left bottom-1/2 right-1/2 pointer-events-none z-10"
              style={{
                background: "linear-gradient(50deg, rgba(245, 158, 11, 0.2) 0%, transparent 80%)",
                transformOrigin: "bottom right",
                animation: "radar-sweep 7s linear infinite"
              }}
            />

            {/* Sweep light beams representing Lighthouse */}
            <div className="absolute top-[20%] left-[20%] w-[120px] h-[120px]"
              style={{
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)"
              }}
            />

            {/* Glowing wave paths - SVG Animated */}
            <svg className="absolute inset-0 w-full h-full opacity-35 z-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 320 Q 150 250 250 350 T 500 300" fill="none" stroke="#1e3a8a" strokeWidth="1" />
              <path d="M 0 340 Q 120 270 280 370 T 500 320" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4,8" style={{ animation: "wave-slide 10s ease-in-out infinite" }} />
              <path d="M 0 360 Q 180 300 320 390 T 500 340" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Sailing Cargo Ship Icon - bobbing vertically */}
            <div className="absolute bottom-[28%] left-[25%] z-20 text-amber-400 select-none pointer-events-none"
              style={{ animation: "ship-gently-bob 4.5s ease-in-out infinite" }}>
              <Ship className="h-16 w-16 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]" />
              <div className="absolute -bottom-1 left-2 h-1.5 w-12 bg-white/10 rounded-full blur-xs" />
            </div>

            {/* Port coordinates clickable beacons */}
            {egyptianPorts.map((port) => {
              const isSelected = activePort === port.id;
              return (
                <button
                  key={port.id}
                  onClick={() => setActivePort(port.id)}
                  className="absolute z-20 cursor-pointer focus:outline-none group"
                  style={{ left: port.coords.x, top: port.coords.y }}
                >
                  <span className="relative flex h-4 w-4">
                    {/* Ring Pulse animation for the active beacon */}
                    {isSelected && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-4 w-4 border border-white/20 shadow ${isSelected
                      ? "bg-amber-400 shadow-amber-500/50"
                      : "bg-blue-600 hover:bg-amber-500 hover:scale-110 transition-transform"
                      }`} />
                  </span>

                  {/* Floating tooltip preview of port */}
                  <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-950/95 border border-amber-400/40 rounded-lg px-2.5 py-1 text-[10px] text-white pointer-events-none shadow-xl transition-all ${isSelected ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"
                    }`}>
                    {isAr ? port.labelAr : port.labelEn}
                  </div>
                </button>
              );
            })}

            {/* Scanning line animation layer */}
            <div className="absolute inset-x-0 h-0.5 bg-blue-500/10 top-0 pointer-events-none z-10"
              style={{
                animation: "grid-scroll 15s linear infinite",
                backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.45) 10%, transparent 10%)"
              }}
            />
          </div>

          {/* Active Port Info Overlay Widget (Bottom Left on map overlay) */}
          <div className="relative z-10 self-start bg-slate-900/90 backdrop-blur-md border border-blue-800/40 p-4 rounded-2xl max-w-xs shadow-2xl">
            <div className="flex items-center gap-2 text-amber-300">
              <Compass className="h-5 w-5 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? "رصد جمركي نشط بميناء" : "Active Harbour Dispatch"}</span>
            </div>

            {(() => {
              const port = egyptianPorts.find(p => p.id === activePort) || egyptianPorts[0];
              return (
                <div className="mt-2 space-y-1 text-right" dir={isAr ? "rtl" : "ltr"}>
                  <h4 className="font-extrabold text-xs text-white">
                    {isAr ? port.labelAr : port.labelEn}
                  </h4>
                  <p className="text-[11px] text-blue-200 leading-normal font-sans">
                    {isAr ? port.descAr : port.descEn}
                  </p>
                </div>
              );
            })()}
          </div>

          {/* Map Legend (Upper Right or absolute corner placement) */}
          <div className="relative z-10 self-end flex items-center bg-blue-950/90 border border-blue-800/40 p-2 rounded-xl text-[9px] font-mono text-blue-300 gap-2">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-bounce" />
              <span>ALEXANDRIA (HQ)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
              <span>PORTS SYSTEM</span>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
