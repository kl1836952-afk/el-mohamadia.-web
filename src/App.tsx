import React, { useState } from "react";
import { TrackingRecord, CustomsService } from "./types";
import CustomsCalculator from "./components/CustomsCalculator";
import AIAdvisorChat from "./components/AIAdvisorChat";
import ChatInterface from "./components/ChatInterface";
import TransactionTracker from "./components/TransactionTracker";
import RequestConsultationForm from "./components/RequestConsultationForm";
import PromoHeroVideo from "./components/PromoHeroVideo";
import CarGallerySection from "./components/CarGallerySection";
import ImportExportSection from "./components/ImportExportSection";
import CustomsEncyclopedia from "./components/CustomsEncyclopedia";
import AboutCompanySection from "./components/AboutCompanySection";
import PremiumAdvantagesSection from "./components/PremiumAdvantagesSection";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  Globe,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Ship,
  ShieldCheck,
  Calculator,
  Bot,
  Clock,
  ClipboardCheck,
  ArrowUpRight,
  Navigation,
  Car,
  FileCheck2,
  CalendarDays,
  User,
  LogOut,
  Sun,
  Moon
} from "lucide-react";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, toggleTheme, isLight } = useTheme();
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [activeTab, setActiveTab] = useState<"home" | "calculator" | "chat" | "tracker" | "booking" | "encyclopedia" | "about">("home");

  const { user, profile, logout: signOut } = useAuth();

  // Storage for newly generated user booking records to track them in real-time
  const [localRecords, setLocalRecords] = useState<TrackingRecord[]>(() => {
    try {
      const saved = localStorage.getItem("local_customs_records");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  // Prefilled calculator data transferred to booking form
  const [prefilledCalc, setPrefilledCalc] = useState<any>(null);

  const isAr = lang === "ar";

  const handleApplyCalcToForm = (calcData: any) => {
    setPrefilledCalc(calcData);
    setActiveTab("booking");
  };

  const handleSelectCarForCalculation = (carParams: any) => {
    setPrefilledCalc(carParams);
    setActiveTab("calculator");
  };

  const handleNewRecordCreated = (newRecord: TrackingRecord) => {
    setLocalRecords((prev) => {
      const updated = [newRecord, ...prev];
      localStorage.setItem("local_customs_records", JSON.stringify(updated));
      return updated;
    });
    // Optionally focus the tracking tab so they witness its creation
    setTimeout(() => {
      setActiveTab("tracker");
    }, 2000);
  };

  const handleRecordUpdated = (updatedRecord: TrackingRecord) => {
    setLocalRecords((prev) => {
      const updated = prev.map(rec => rec.id === updatedRecord.id ? updatedRecord : rec);
      localStorage.setItem("local_customs_records", JSON.stringify(updated));
      return updated;
    });
  };

  const contactOptions = [
    {
      icon: <Phone className="h-5 w-5 text-blue-900" />,
      labelAr: "اتصل بنا مباشرة",
      labelEn: "Direct Call Office",
      value: "01274833844",
      href: "tel:01274833844"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-[#25D366]" />,
      labelAr: "واتساب متاح 24 ساعة",
      labelEn: "WhatsApp (24/7 Support)",
      value: "01274833844",
      href: "https://wa.me/201274833844"
    },
    {
      icon: <Mail className="h-5 w-5 text-amber-500" />,
      labelAr: "البريد الإلكتروني",
      labelEn: "Email Inquiry Desk",
      value: "eslamrezk80@gmail.com",
      href: "mailto:eslamrezk80@gmail.com"
    }
  ];

  const systemsSpecs = [
    {
      icon: <Clock className="h-6 w-6 text-blue-900" />,
      titleAr: "نظام التربيتيك (الإفراج المؤقت)",
      titleEn: "Triptyque Temporary Entry",
      descAr: "دخول مؤقت لسيارات المصريين المقيمين بالخارج والأجانب بدون رسوم جمركية كاملة وفقاً للقرارات والقوانين لنادي السيارات الدولي.",
      descEn: "Temporary entry for Egyptians abroad or foreigners, exempt from customs duties for a periodic legal stay."
    },
    {
      icon: <FileCheck2 className="h-6 w-6 text-blue-900" />,
      titleAr: "استيراد مالك أول",
      titleEn: "First Owner Guidelines",
      descAr: "استيراد السيارات في نفس سنة الموديل (جديدة تماماً) شريطة شرائها باسم صاحب الشحنة مباشرة للترخيص بالبلاد.",
      descEn: "Standard direct vehicle importing restricted to current year models, bought brand new under primary owner names."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-900" />,
      titleAr: "مبادرة المغتربين المصرية",
      titleEn: "Expatriate Vehicle Scheme",
      descAr: "استيراد سيارة شخصية معفاة 100% من الرسوم والجمارك والضرائب مقابل وديعة وديعية دولارية مستردة بعد 5 سنوات بالجنيه المصري.",
      descEn: "Import a personal car 100% tax and customs-free in return of a refundable dollar bank deposit held for 5 years."
    },
    {
      icon: <Ship className="h-6 w-6 text-blue-900" />,
      titleAr: "تخليص البضائع العامة والرسائل",
      titleEn: "Commercial Cargo Clearance",
      descAr: "إنهاء إجراءات الرسائل الاستيرادية والتجارية، المواد الخام، الحاويات المشتركة، والطرود بميناء الإسكندرية ومختلف الموانئ.",
      descEn: "Full logistics, documentation, and release of industrial commodities, full or shared containers (FCL/LCL)."
    },
    {
      icon: <Navigation className="h-6 w-6 text-blue-900" />,
      titleAr: "الإفراج الجمركي الدبلوماسي",
      titleEn: "Diplomatic Cargo Releases",
      descAr: "إجراءات حصرية وتسريع فوري وتخليص معافى لسيارات ومقتنيات القنصليات والبعثات الدبلوماسية الدولية والهيئات.",
      descEn: "Exceptional speed, specialized file representation and complete tariff waivers for embassies and consulate cargo."
    }
  ];

  return (
  
    <div className = {`min-h-screen ${isLight ? "light bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"} flex flex-col justify-between font-sans selection:bg-amber-400 selection:text-slate-950 maritime-grid shipping-lanes`
} dir = { isAr? "rtl": "ltr" } >

  {/* Visual Top Accent bar */ }
  <div className = "h-1.5 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-950" />

    {/* Main Navigation Header */ }
    <header className = "bg-blue-950 text-white sticky top-0 z-50 shadow-md" >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

        {/* Logo Brand Brand */}
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 bg-gradient-to-br from-blue-900 to-blue-950 rounded-xl flex items-center justify-center border border-amber-400/30 shadow-md">
            <Ship className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div>
            <span className="block text-[10px] tracking-wider text-amber-400 font-bold uppercase leading-none">
              {isAr ? "التخليص والاستخلاص الجمركي" : "Alex Customs Clearance"}
            </span>
            <h1 className="text-lg font-black font-sans leading-tight mt-1">
              {isAr ? "المحمدية للتخليص الجمركي" : "Al-Muhammadiyah"}
            </h1>
          </div>
        </div>

        {/* Desktop Tab Links */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "home" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "الرئيسية والخبرات" : "Home & Experience"}
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "about" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "معلومات عن الشركة" : "About Company"}
          </button>
          <button
            onClick={() => setActiveTab("encyclopedia")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "encyclopedia" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "الموسوعة الجمركية" : "Customs Encyclopedia"}
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "calculator" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "حاسبة الجمارك التفاعلية" : "Interactive Calculator"}
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "chat" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "مستشار القرارات والحلول" : "Solutions Wizard"}
          </button>
          <button
            onClick={() => setActiveTab("tracker")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "tracker" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "خبراتنا وموانئنا" : "Our Experience"}
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${activeTab === "booking" ? "bg-white/10 text-amber-300" : "text-blue-100 hover:bg-white/5"
              }`}
          >
            {isAr ? "تواصل معنا" : "Contact Us"}
          </button>
        </nav>

        {/* Controls: Language Toggler, Theme Toggler, & User Info */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
            title={isAr ? "تبديل المظهر للتلاؤم مع الإضاءة الشمسية العالية بالموانئ" : "Toggle theme to improve readability in sunny ports"}
            id="theme-toggle-btn"
          >
            {isLight ? (
              <>
                <Moon className="h-4 w-4 text-amber-300" />
                <span className="hidden sm:inline">{isAr ? "المظهر البحري" : "Maritime Mode"}</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-amber-400 font-bold" />
                <span className="hidden sm:inline">{isAr ? "مظهر الشمس" : "Sunny Port"}</span>
              </>
            )}
          </button>

          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20 transition-all cursor-pointer text-blue-100"
          >
            <Globe className="h-4 w-4 text-blue-200" />
            <span>{lang === "ar" ? "English" : "عربي"}</span>
          </button>

          <a
            href="https://wa.me/201274833844"
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-950 font-black px-3.5 py-1.5 rounded-lg text-xs cursor-pointer shadow-md transition-all shrink-0"
          >
            {isAr ? "اتصل بنا 📞" : "Contact us 📞"}
          </a>
        </div>
      </div>
      </header >

  {/* Tablet/Mobile sticky navigation bar */ }
  <div className = "lg:hidden bg-blue-[980] bg-[#070e1b] border-b border-blue-900/30 sticky top-[71px] z-40 px-3 py-2 flex items-center justify-between shadow-md overflow-x-auto gap-1" >
        <button
          onClick={() => setActiveTab("home")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "home" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "الرئيسية" : "Home"}
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "about" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "عن الشركة" : "About"}
        </button>
        <button
          onClick={() => setActiveTab("encyclopedia")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "encyclopedia" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "الموسوعة" : "Tariff"}
        </button>
        <button
          onClick={() => setActiveTab("calculator")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "calculator" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "الحاسبة" : "Calc"}
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "chat" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "مستشار حلول" : "Solutions"}
        </button>
        <button
          onClick={() => setActiveTab("tracker")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "tracker" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "خبراتنا" : "Experience"}
        </button>
        <button
          onClick={() => setActiveTab("booking")}
          className={`text-xs px-2.5 py-2 font-bold rounded-lg shrink-0 cursor-pointer transition-all ${
            activeTab === "booking" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "text-slate-300 hover:bg-white/5"
          }`}
        >
          {isAr ? "تواصل معنا" : "Contact"}
        </button>
      </div >

  {/* Mobile user state & logout strip */ }
{
  user && (
    <div className="lg:hidden bg-[#07162c] text-slate-100 border-b border-blue-900/30 px-4 py-2 flex items-center justify-between text-xs font-semibold">
      <div className="flex items-center gap-1.5">
        <User className="h-4 w-4 text-amber-400" />
        <span className="truncate max-w-[155px] font-mono font-medium text-[11px]">{user.email}</span>
        <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded font-black shrink-0">
          {profile?.role === "admin" ? (isAr ? "المشرف" : "Admin") : (isAr ? "عميل" : "Client")}
        </span>
      </div>
      <button
        onClick={() => signOut()}
        className="text-red-300 hover:text-white bg-red-950/30 hover:bg-red-700 font-extrabold flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-900/40 hover:border-red-700 transition-all text-xs cursor-pointer shadow-3xs"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>
      </button>
    </div>
  )
}

{/* Main Content Areas inside layout container */ }
<main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-12">

  {activeTab === "home" && (
    <div className="space-y-12">

      {/* Promo hero video map and radar */}
      <PromoHeroVideo lang={lang} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Premium Cars Catalog showcasing most imported vehicles */}
      <div className="relative p-0.5 rounded-3xl bg-gradient-to-r from-blue-900/30 via-amber-400/20 to-blue-950/30">
        <div className="bg-[#050a15] p-6 rounded-3.5xl border border-blue-900/30">
          <CarGallerySection
            lang={lang}
            onSelectCarForCalculation={handleSelectCarForCalculation}
          />
        </div>
      </div>

      {/* 8 Premium Advantages Matrix */}
      <PremiumAdvantagesSection lang={lang} />

      {/* Custom General Cargo Import and Export services cards */}
      <ImportExportSection lang={lang} />

      {/* Why choose Al-Muhammadiyah section info grid - Styled like Container cargo steel walls */}
      <div className="bg-[#091220] rounded-3xl border border-blue-900/50 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl relative overflow-hidden cargo-steel-sheet">
        <div className="space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-wider">
            🚢 {isAr ? "ريادة واستخلاص احترافي" : "Why choose Al-Muhammadiyah"}
          </span>

          <h3 className="text-xl md:text-2xl font-black text-white leading-tight font-sans">
            {isAr ? "دقة متناهية وإلمام متكامل بالقوانين الجمركية" : "Sourcing maximum precision within Egypt harbor codes."}
          </h3>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-light">
            {isAr
              ? "مجال الجمارك وتخليص السيارات يتمتع بمتغيرات قرارات ولوائح جمركية يومية وبنود تعسفية (تراخيص، ودائع المغتربين، معاينة الكشف، تحديد سعة المحرك بالـ CC، واتفاقيات المنشأ). فريقنا يتابع اللوائح لحظة بلحظة بمصلحة الجمارك المصرية لضمان معاملة قانونية دقيقة وسرعة إنهاء أوراق شاسيه ومطابقة المحركات."
              : "Egyptian customs is subjective to daily amendments regarding international certificates of origin, import license drafts, and Expat schedules. Our agency works direct inside Alexandria port docks to ensure maximum efficiency."}
          </p>

          <div className="flex flex-col gap-2.5 pt-2 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-[10px]">✓</div>
              <span>{isAr ? "نظام استعلام دولي لودائع المغتربين" : "Active simulator of expatriate MoF deposits."}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-[10px]">✓</div>
              <span>{isAr ? "معاينة مطابقة الكشف الفيزيائي برقم الشاسيه مع المرور" : "Chassis & Engine serial matching with port authority."}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-amber-400/20 rounded-full flex items-center justify-center text-amber-400 font-bold text-[10px]">✓</div>
              <span>{isAr ? "تجهيز فوري لورقة شهادة المنشأ يورو 1 (بشعار الاتحاد الأوروبي)" : "Validation profiles for Euro-1 certificates drops."}</span>
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="bg-[#050912]/95 rounded-2xl p-6 border border-blue-900/40 space-y-4">
          <h4 className="font-bold text-sm text-white">
            {isAr ? "تواصل مباشرة مع إدارة أ/ إسلام محمد" : "Connect Directly with CEO Eslam Mohamed"}
          </h4>
          <p className="text-xs text-slate-400">
            {isAr
              ? "يسعدنا الرد على مكالماتكم ورسائلكم لمراجعة فواتيرك وتخمين الجمارك قبل شحن سيارتك"
              : "Direct consultation portal to audit your invoices before shipping outbound."}
          </p>

          <div className="space-y-3.5">
            {contactOptions.map((opt, idx) => (
              <a
                key={idx}
                href={opt.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 bg-[#0b1329] rounded-xl border border-blue-900/30 hover:border-amber-400 hover:shadow-lg transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-950 rounded-lg">
                    {opt.icon}
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-100">{isAr ? opt.labelAr : opt.labelEn}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{opt.value}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-400 uppercase">
                  {isAr ? "تواصل" : "Link"} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  )}

  {activeTab === "about" && (
    <AboutCompanySection
      lang={lang}
    />
  )}

  {activeTab === "encyclopedia" && (
    // CUSTOMS ENCYCLOPEDIA VIEW WITH DIRECT PREFILL HOOK
    <CustomsEncyclopedia
      lang={lang}
      onApplyCalculationLink={(item) => {
        // Extract prefilled params back to interactive calculator directly
        let suggestedCc = 1600;
        if (item.id === "8703.11") suggestedCc = 999;
        else if (item.id === "8703.12") suggestedCc = 1500;
        else if (item.id === "8703.13") suggestedCc = 1990;
        else if (item.id === "8703.14") suggestedCc = 2200;

        setPrefilledCalc({
          carCc: suggestedCc,
          electric: item.id === "8703.20",
          hybrid: item.id === "8703.30",
          origin: item.id.includes("EUR1") || item.dutyRateAr.includes("الأوروبي") ? "EUROPEAN" : "STANDARD"
        });
        setActiveTab("calculator");
      }}
    />
  )}

  {activeTab === "calculator" && (
    // CALCULATOR VIEW
    <CustomsCalculator
      lang={lang}
      onApplyToForm={handleApplyCalcToForm}
    />
  )}

  {activeTab === "chat" && (
    // AI CHAT INTERFACE - Connects to backend API
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          {isAr ? "الدردشة الذكية مع المساعد" : "Smart AI Chat Assistant"}
        </h2>
        <p className="text-sm text-slate-400">
          {isAr 
            ? "تحدث مع مساعدنا الذكي واحصل على إجابات فورية حول خدمات التخليص الجمركي"
            : "Chat with our AI assistant and get instant answers about customs clearance services"}
        </p>
      </div>
      <ChatInterface lang={lang} />
    </div>
  )}

  {activeTab === "tracker" && (
    // TRACKER VIEW
    <TransactionTracker
      lang={lang}
      localRecords={localRecords}
      onRecordUpdated={handleRecordUpdated}
    />
  )}

  {activeTab === "booking" && (
    // CONSULTATION / DELEGATION COMPILING FORM
    <RequestConsultationForm
      lang={lang}
      prefilledData={prefilledCalc}
      onNewRecordCreated={handleNewRecordCreated}
    />
  )}

</main>

{/* Persistent WhatsApp Floating support widget */ }
<div className="fixed bottom-6 right-6 z-55 print:hidden">
  <a
    href="https://wa.me/201274833844"
    target="_blank"
    rel="noreferrer"
    title={isAr ? "دردشة واتساب مباشرة مع أ/ إسلام محمد" : "Direct WhatsApp Support with Eslam"}
    className="h-14 w-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all relative group"
  >
    <MessageSquare className="h-6 w-6" />
    <span className="absolute right-16 bg-emerald-950 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-emerald-800">
      {isAr ? "أ/ إسلام محمد جمرك" : "Call Mr. Eslam Mohamed"}
    </span>
    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-ping" />
  </a>
</div>

{/* Styled Footer */ }
<footer className="bg-blue-950 text-blue-100 mt-16 py-8 border-t border-blue-900 z-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="space-y-1.5 text-center md:text-right">
      <h4 className="font-extrabold text-sm text-white">
        {isAr ? "شركة المحمدية للتخليص جمارك الإسكندرية" : "Al-Muhammadiyah Customs Agency Alexandria"}
      </h4>
      <p className="text-xs text-blue-305 font-sans">
        {isAr
          ? "إشراف وإدارة أستاذ إسلام محمد - العنوان: 5 شارع النصر أمام باب 10، جمرك الإسكندرية"
          : "Supervised by Eslam Mohamed - 5 El-Nasr St, Opposite Gate 10, Alexandria Seaport"}
      </p>
    </div>

    <div className="flex flex-col items-center md:items-end gap-1 font-mono text-[11px] text-blue-300">
      <p>Phone: 01274833844</p>
      <p>Email: eslamrezk80@gmail.com</p>
      <p className="mt-1 text-[10px] text-blue-450">
        © {new Date().getFullYear()} {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
      </p>
    </div>
  </div>
</footer>

    </div >
  );
}
