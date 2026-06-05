import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Phone, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Flame, 
  MessageSquare,
  Compass,
  Zap,
  BookOpen
} from "lucide-react";

interface Props {
  lang: "ar" | "en";
}

type CargoType = "car" | "cargo" | null;
type SchemeType = "expat" | "triptyque" | "first_owner" | "disabled" | "commercial" | null;
type DetailFilterType = "under_1600" | "above_1600" | "gulf" | "europe" | "current_year" | "used_car" | "machinery" | "food" | "textile" | null;

export default function AIAdvisorChat({ lang }: Props) {
  const isAr = lang === "ar";

  // State for Decision Tree
  const [cargoType, setCargoType] = useState<CargoType>(null);
  const [scheme, setScheme] = useState<SchemeType>(null);
  const [detailFilter, setDetailFilter] = useState<DetailFilterType>(null);
  const [activeSecret, setActiveSecret] = useState<number | null>(null);

  // Restart wizard
  const handleRestartWizard = () => {
    setCargoType(null);
    setScheme(null);
    setDetailFilter(null);
  };

  // WhatsApp generation link based on current decisions
  const handleGenerateWhatsAppLink = () => {
    let text = "";
    if (isAr) {
      text = `مرحباً أستاذ إسلام محمد، قمت باستخدام مستشار المسار التفاعلي بالموقع وحددت اختياراتي الجمركية كالتالي:\n\n`;
      text += `• نوع الشحنة: ${cargoType === "car" ? "سيارات ومركبات" : "بضائع ورسائل تجارية"}\n`;
      if (scheme) {
        const schemeLabel = {
          expat: "مبادرة المغتربين المصرية",
          triptyque: "نظام التربيتيك (الإفراج المؤقت)",
          first_owner: "استيراد مالك أول (سيارة زيرو)",
          disabled: "سيارات مخصصة لذوي الهمم ومرافقين",
          commercial: "بضائع عامة ورسائل استيرادية"
        }[scheme];
        text += `• نظام الاستيراد: ${schemeLabel}\n`;
      }
      if (detailFilter) {
        const filterLabel = {
          under_1600: "محرك أقل من 1600 سي سي",
          above_1600: "محرك أكبر من 1600 سي سي",
          gulf: "دول الخليج العربي",
          europe: "الاتحاد الأوروبي (لوحات يورو 1)",
          current_year: "موديل نفس السنة (زيرو)",
          used_car: "سيارة مستعملة بطلب استثنائي",
          machinery: "معدات ومصانع ثقيلة",
          food: "غذاء وحاصلات زراعية",
          textile: "منسوجات وأقمشة تجارية"
        }[detailFilter];
        text += `• تفاصيل الشحنة: ${filterLabel}\n`;
      }
      text += `\nيرجى التواصل معي لتلقي الفواتير والمستندات بساحة ميناء الإسكندرية والتحقق الفوري من الإجراءات مجاناً. شكراً لكم!`;
    } else {
      text = `Hello Mr. Eslam Mohamed, I simulated my customs pathway on your web wizard with these results:\n\n`;
      text += `• Cargo Type: ${cargoType === "car" ? "Automotive" : "General Commercial Cargo"}\n`;
      if (scheme) text += `• Scheme: ${scheme}\n`;
      if (detailFilter) text += `• Selection: ${detailFilter}\n`;
      text += `\nPlease guide me regarding required invoice audits and Alexandria seaport container release. Thank you!`;
    }

    return `https://wa.me/201274833844?text=${encodeURIComponent(text)}`;
  };

  // Pre-configured Secrets dataset - highly attractive & authoritative information
  const SECRETS_AR = [
    {
      title: "سر تفعيل شهادة يورو 1 ومطابقتها (توفير جمارك 100%) 🇪🇺",
      badge: "وفر لغاية 500,000 ج.م",
      desc: "الاتفاقية الأوروبية تمنحك إعفاءً كاملاً من التعريفة الجمركية شريطة أن تخرج السيارة بشهادة يورو 1 صادرة ومكتوبة بشكل صحيح من جمارك دولة المنشأ الأوروبية باسمك. أستاذ إسلام يساعدك في التحقق من وجود جملة 'Declaration on Origin' بالشكل المعتمد دولياً لتفادي إلغاء الإعفاء ومطالبة مصلحة الجمارك بالرسوم الكاملة بأثر رجعي.",
      impact: "تجنب غرامات بآلاف الدولارات واستلم الإعفاء فوراً بالرصيف."
    },
    {
      title: "فخ غرامات الحاويات والمهمل بساحة باب 10 وباب 40 ⚓",
      badge: "هام جداً للمستوردين",
      desc: "أي تأخير في تفريغ الحاوية بعد 7 إلى 14 يوماً من وصولها يترتب عليه رسوم تخزين (دمرج) تدفع لصالح الخطوط الملاحية بالدولار. نحن في شركة المحمدية ننهي الكشف الفيزيائي برقم الشاسيه ونطابق الأوراق مع لجان المعاينة قبل وصول المركبة بفترة كافية لتفادي نقل الشحنة إلى ساحة 'المهمل' بالميناء وعرضها للبيع الجبري بالمزاد العلني.",
      impact: "وفر حتى 200 دولار يومياً من رسوم الأرضية وغرامات الخطوط الملاحية."
    },
    {
      title: "لوائح وقرارات سيارات ذوي الهمم (المرافقين) والأقارب الجمركية ♿",
      badge: "تعديل قرارات 2026",
      desc: "السيارات المجهزة طبياً معفاة من الضرائب والجمارك بالكامل، لكن اللائحة تشترط بقاء السيارة محظور بيعها تجارياً لمدة 3 أو 5 سنوات. نوجهك بأمان تام لكيفية كتابة الإفراج والتعامل مع الكشف الطبي المعتمد بمجالس الموانئ وتفادي إلغاء الترخيص أو مصادرتها نتيجة مخالفة شروط استخدام المرافقين.",
      impact: "حماية قانونية متكاملة لضمان بقاء الشحنة مرخصة بلا ثغرات."
    },
    {
      title: "فحص كود ACID المسبق وتجنب رفض الرسائل التجارية 🧱",
      badge: "دليل المنافسين والتجار",
      desc: "تطبق مصلحة الجمارك المصرية نظام التسجيل المسبق للشحنات (ACI) إجبارياً لمطابقة بيانات المصدر والوارد قبل الشحن بـ 48 ساعة على الأقل. أي شحنة تصل دون كود ACID مسجل على بوليصة الشحن سيتم إعادتها فوراً على حساب المصدر! نقوم في مكتب الإسكندرية بمراجعة رقم الفاتورة والباركود لضمان الموافقة الفورية.",
      impact: "منع إعادة الشحنة للخارج وحفظ استقرارك المالي."
    }
  ];

  const SECRETS_EN = [
    {
      title: "Euro-1 Euro Exemption Protocol (Save 100% Import Fees) 🇪🇺",
      badge: "Saves up to $15,000",
      desc: "EU agreements provide 0% tariff waivers if the certificate of origin (Euro-1) is drafted exactly behind the custom rules. We audit Euro-1 paperwork in advance to secure valid 100% compliance at Alexandria seaport docks.",
      impact: "Bypasses default high customs, instantly lowering import tax bills legally."
    },
    {
      title: "The Port Storage Demurrage Fine Trap (Gate 10/40 Alert) ⚓",
      badge: "Crucial Expat Info",
      desc: "Delays past 7 to 14 free days will incur container storage fees in USD. Our agents complete chassis inspections and engine matching ahead of arrivals, preventing expensive warehouse transfers and auction seizures.",
      impact: "Saves $150 to $200 per day in unnecessary shipping line penalty charges."
    },
    {
      title: "Disabled Citizens Medical Vehicles Rules & Limits ♿",
      badge: "New 2026 Directives",
      desc: "Medically retrofitted cars are custom-free but subject to a 3-5 year selling constraint. We guide families on handling official medical commissions and avoiding illegal companion licenses that lead to impounding.",
      impact: "Secures seamless licensing and ensures absolute regulatory safety."
    },
    {
      title: "Guarding ACID Pre-Registration Codes of Commercial Cargo 🧱",
      badge: "B2B Logistics Standard",
      desc: "Egyptian Customs enforces Advanced Cargo Information (ACI) globally. Cargo shipped without a pre-registered ACID number is blocked and re-shipped on parent expense. We configure Nafeza platform codes perfectly.",
      impact: "Guarantees 100% landing permission and saves time at Alexandria custom yards."
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn" id="interactive-solutions-hub" dir={isAr ? "rtl" : "ltr"}>
      
      {/* Visual Header / Title Spot */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black border border-amber-400/20 uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          <span>{isAr ? "مستشار المسارات التخليصية التفاعلي" : "Interactive Decision & Solution Master"}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight">
          {isAr ? "شحص شحنتك الموانئية واحصل على خارطة الإجراءات فورا" : "Simulate Your Customs Pathway in Seconds"}
        </h2>
        <p className="text-xs md:text-sm text-slate-350 font-sans font-light leading-relaxed">
          {isAr 
            ? "وداعاً لانتظار الردود الطويلة. اختر نوع مركبتك أو بضائعك والشهادة المرافقة وسيخطط المستشار التفاعلي كروت أوراقك المصلحية ومطابقة الشاسيه بمجمع الإسكندرية."
            : "Skip the waiting times and AI response delays. Click options below to map your required official files, discover port rate exemptions, and generate custom solutions."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Dynamic Journey Box (Left / 7 Cols) */}
        <div className="lg:col-span-7 bg-[#070e1b]/95 rounded-3xl p-6 md:p-8 shadow-2xl border border-blue-900/40 relative overflow-hidden space-y-6">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 h-1.5 bg-gradient-to-r from-amber-450 via-amber-300 to-blue-900 w-full" />
          
          <div className="flex items-center justify-between border-b border-blue-900/20 pb-4">
            <div className="flex items-center gap-2.5">
              <Compass className="h-5 w-5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
              <h3 className="font-extrabold text-base text-white">
                {isAr ? "دليل مسار شحنتك الذاتي" : "Your Customs Voyage Simulator"}
              </h3>
            </div>
            
            {(cargoType || scheme || detailFilter) && (
              <button
                onClick={handleRestartWizard}
                className="text-xs font-bold text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer"
              >
                {isAr ? "إعادة تعيين المسار ↺" : "Reset Wizard ↺"}
              </button>
            )}
          </div>

          {/* STEP 1: Choose Cargo Type */}
          {!cargoType && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block text-right">
                {isAr ? "الخطوة الأولى: حدد جنس المركبات أو السلع" : "Step 1: Choose incoming cargo category"}
              </span>
              <h4 className="text-sm font-bold text-white text-right">
                {isAr ? "ما الفئات والواردات التي بصدد تفتيشها جمركياً بالدولة؟" : "What is the primary nature of your shipped items?"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setCargoType("car")}
                  className="bg-slate-950 border border-blue-900/40 hover:border-amber-400 p-5 rounded-2xl text-right md:text-center space-y-3 cursor-pointer hover:bg-[#0b1c33]/40 transition-all duration-300 group flex md:flex-col items-center gap-4 md:gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#050a14] border border-blue-900/30 text-amber-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    🚗
                  </div>
                  <div className="text-right md:text-center">
                    <h5 className="font-black text-xs text-white">{isAr ? "سيارات ومركبات خاصة" : "Automotive & Personal Cars"}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{isAr ? "مبادرة المغتربين، سيارات التربتيك المؤقت، ملاك أوائل من المعرض، ذوي الهمم والأقارب" : "Expat schemes, temporary entry, medical releases, tourist cars"}</p>
                  </div>
                </button>

                <button
                  onClick={() => setCargoType("cargo")}
                  className="bg-slate-950 border border-blue-900/40 hover:border-amber-400 p-5 rounded-2xl text-right md:text-center space-y-3 cursor-pointer hover:bg-[#0b1c33]/40 transition-all duration-300 group flex md:flex-col items-center gap-4 md:gap-3"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#050a14] border border-blue-900/30 text-amber-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                    📦
                  </div>
                  <div className="text-right md:text-center">
                    <h5 className="font-black text-xs text-white">{isAr ? "بضائع عامة ورسائل تجارية" : "General Commercial Cargo"}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{isAr ? "شحنات المستوردين، الطرود، المواد الأولية، حاويات كاملة ومشتركة، خطوط إنتاج" : "Full or shared containers, raw industrial materials, Machinery ports"}</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Import Scheme */}
          {cargoType === "car" && !scheme && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block text-right">
                {isAr ? "الخطوة الثانية: حدد نظام وقوانين الإفراج المطبقة" : "Step 2: Choose customs import scheme"}
              </span>
              <h4 className="text-sm font-bold text-white text-right">
                {isAr ? "تحت أي نظام مالي تود الحصول على رخص سيارتك؟" : "Under which regulation do you import your car?"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setScheme("expat")}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-start gap-3"
                >
                  <label className="text-xl mt-1 leading-none shrink-0 font-serif">✈️</label>
                  <div className="text-right">
                    <h6 className="font-extrabold text-xs text-amber-300">{isAr ? "مبادرة المصريين بالخارج (الوديعة)" : "Expatriate Initiative"}</h6>
                    <p className="text-[10px] text-slate-400 mt-1">{isAr ? "إعفاء جمركي 100% مقابل ربط وديعة بنكية تستحق الصرف بعد 5 سنوات بالكامل بالجنيه" : "100% duty-free against a dollar deposit held for 5 years"}</p>
                  </div>
                </button>

                <button
                  onClick={() => setScheme("triptyque")}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-start gap-3"
                >
                  <label className="text-xl mt-1 leading-none shrink-0 font-serif">🗺️</label>
                  <div className="text-right">
                    <h6 className="font-extrabold text-xs text-amber-300">{isAr ? "دفتر التربيتيك الدولي (مؤقت)" : "Triptyque (Temporary Entry)"}</h6>
                    <p className="text-[10px] text-slate-400 mt-1">{isAr ? "دخول سيارات المغتربين لقضاء العطل مع لوحات برتقالية لمدة 6 أشهر دون تجميد أموال" : "Enter for holiday stay (up to 6 months) without full custom costs"}</p>
                  </div>
                </button>

                <button
                  onClick={() => setScheme("first_owner")}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-start gap-3"
                >
                  <label className="text-xl mt-1 leading-none shrink-0 font-serif">🆕</label>
                  <div className="text-right">
                    <h6 className="font-extrabold text-xs text-amber-300">{isAr ? "استيراد نظام المالك الأول (زيرو)" : "First Owner Scheme"}</h6>
                    <p className="text-[10px] text-slate-400 mt-1">{isAr ? "شراء مركبة بمواصفات سنة الموديل وتوفير فواتير موثقة ومطابقة شاسيه من المصنع" : "Import used/new car bought inside its release year as primary owner"}</p>
                  </div>
                </button>

                <button
                  onClick={() => setScheme("disabled")}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-start gap-3"
                >
                  <label className="text-xl mt-1 leading-none shrink-0 font-serif">♿</label>
                  <div className="text-right">
                    <h6 className="font-extrabold text-xs text-amber-300">{isAr ? "سيارات ذوي الهمم والقومسيون" : "Disabled Citizens Vehicles"}</h6>
                    <p className="text-[10px] text-slate-400 mt-1">{isAr ? "إعفاءات جمركية وضرائب كاملة للمستحقين مع حظر التصرف فيها بالبيع لـ 3-5 سنوات" : "Subsidized medical cars with legal sale restriction tags"}</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Commercial Scheme */}
          {cargoType === "cargo" && !scheme && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block text-right">
                {isAr ? "الخطوة الثانية: تصنيف رسالتك التجارية المعتمدة" : "Step 2: Choose commercial category"}
              </span>
              <h4 className="text-sm font-bold text-white text-right">
                {isAr ? "ما هي السلع والمعدات الاستيرادية التي تنقلها؟" : "What category of bulk goods do you import?"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => { setScheme("commercial"); setDetailFilter("machinery"); }}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-center cursor-pointer hover:bg-[#0b1c33]/45 transition-all space-y-2"
                >
                  <label className="text-2xl block font-serif">🏭</label>
                  <span className="block font-bold text-xs text-white">{isAr ? "معدات وماكينات ثقيلة" : "Heavy Machinery"}</span>
                </button>

                <button
                  onClick={() => { setScheme("commercial"); setDetailFilter("food"); }}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-center cursor-pointer hover:bg-[#0b1c33]/45 transition-all space-y-2"
                >
                  <label className="text-2xl block font-serif">🍎</label>
                  <span className="block font-bold text-xs text-white">{isAr ? "حاصلات زراعية وأغذية" : "Agri & Foods"}</span>
                </button>

                <button
                  onClick={() => { setScheme("commercial"); setDetailFilter("textile"); }}
                  className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-center cursor-pointer hover:bg-[#0b1c33]/45 transition-all space-y-2"
                >
                  <label className="text-2xl block font-serif">🧶</label>
                  <span className="block font-bold text-xs text-white">{isAr ? "ملابس ومنسوجات" : "Apparel & Textiles"}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Detail Filter */}
          {cargoType === "car" && scheme && !detailFilter && (
            <div className="space-y-4 animate-fadeIn" dir={isAr ? "rtl" : "ltr"}>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block text-right">
                {isAr ? "الخطوة الثالثة والأخيرة: تفاصيل الشحنة والمحرك" : "Step 3: Choose dynamic sub-category"}
              </span>
              <h4 className="text-sm font-bold text-white text-right">
                {isAr ? "حدد مواصفات مركبتك لحساب فوارق الرسوم والشهادات:" : "Almost there! Specify parameters to finalize compliance roadmaps:"}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {scheme === "expat" && (
                  <>
                    <button
                      onClick={() => setDetailFilter("under_1600")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <Zap className="h-4 w-4 text-amber-450 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "سعة المحرك أقل من 1600 CC" : "Engine Capacity < 1600 CC"}</span>
                    </button>
                    <button
                      onClick={() => setDetailFilter("above_1600")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <AlertTriangle className="h-4 w-4 text-red-450 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "سعة محرك أعلى من 1600 CC (قيم وديعة مختلفة)" : "Engine Capacity > 1600 CC"}</span>
                    </button>
                  </>
                )}

                {scheme === "triptyque" && (
                  <>
                    <button
                      onClick={() => setDetailFilter("gulf")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <Compass className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "دول الخليج العربي وعربيات المغتربين" : "Gulf States (Saudi, UAE, Kuwait)"}</span>
                    </button>
                    <button
                      onClick={() => setDetailFilter("europe")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <Layers className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "أوربا بمطابقة شهادات يورو 1" : "Europe / Western Countries"}</span>
                    </button>
                  </>
                )}

                {scheme === "first_owner" && (
                  <>
                    <button
                      onClick={() => setDetailFilter("current_year")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "سيارة جديدة بالكامل سنة الموديل (زيرو)" : "Direct Brand New Year Model"}</span>
                    </button>
                    <button
                      onClick={() => setDetailFilter("used_car")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "سيارات مستعملة استثنائياً" : "Used Car (Special owner approval needed)"}</span>
                    </button>
                  </>
                )}

                {scheme === "disabled" && (
                  <>
                    <button
                      onClick={() => setDetailFilter("under_1600")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "حجم أقل من 1600 CC (إعفاء كامل)" : "Standard Match < 1600 CC"}</span>
                    </button>
                    <button
                      onClick={() => setDetailFilter("above_1600")}
                      className="bg-slate-950 border border-blue-900/30 hover:border-amber-400 p-4 rounded-xl text-right cursor-pointer hover:bg-[#0b1c33]/40 transition-all flex items-center gap-3.5"
                    >
                      <AlertTriangle className="h-4 w-4 text-red-450 shrink-0" />
                      <span className="font-extrabold text-xs text-white">{isAr ? "أكبر من 1600 CC (نسب رسوم مضافة)" : "Requires Special Med-Approval"}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* FINAL REPORT PATHWAY METADATA PANEL */}
          {cargoType && scheme && detailFilter && (
            <div className="bg-[#050a14] rounded-2xl p-5 border border-amber-400/20 space-y-5 relative text-right" dir={isAr ? "rtl" : "ltr"}>
              <span className="absolute top-4 left-4 text-xs font-mono font-black text-[#050a14] bg-amber-400 px-2.5 py-0.5 rounded shadow">
                PASSED ✓
              </span>

              <div className="flex items-center gap-2 justify-start">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                <h4 className="font-black text-sm text-white font-sans">
                  {isAr ? "خطة الإفراج والمطابقة الميكانيكية المعتمدة" : "Your Generated Import Action Roadmap"}
                </h4>
              </div>

              {/* ARABIC DETAILS */}
              {isAr ? (
                <div className="space-y-4 text-xs text-slate-200 font-sans leading-relaxed text-right">
                  
                  {/* Scheme Expat */}
                  {scheme === "expat" && (
                    <>
                      <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/30">
                        <span className="block font-extrabold text-amber-400">💡 المستندات المطلوبة فوراً:</span>
                        <p className="mt-1 font-light text-slate-300">إقامة قانونية سارية بالخارج مع جواز سفر مفعل، كشف حساب بنكي مؤرخ بـ 3 أشهر يثبت حركة المبالغ والوديعة، وتصديق بوليصة بلد التصدير.</p>
                      </div>

                      <div className="p-3 bg-red-950/20 text-red-200 rounded-xl border border-red-900/40">
                        <span className="block font-extrabold text-red-400">⚠️ فخ جمركي قاتل للمغتربين:</span>
                        <p className="mt-1 font-light text-slate-350">يجب رفع المستندات على منصة (نافذة) للحصول على كود ACID المسبق قبل شحن المركبات بنحو 48 ساعة. شحن السيارة دونه يعرضها للرفض الملاحي الفوري وغرامات المهمل بموانئ مصر.</p>
                      </div>

                      <div className="p-3 bg-blue-950/40 text-slate-200 rounded-xl border border-blue-900/40">
                        <span className="block font-extrabold text-amber-300">💼 دور أستاذ إسلام معك بالمرسى:</span>
                        <p className="mt-1 font-light text-slate-300">يقوم طاقم شركة المحمدية بملازمة لجان المعاينة بمجمع الجمارك 40 لسلامة مطابقة الشاسيه، وفحص فوارق الموديلات لإنهاء المستند بالكامل في أقل من 72 ساعة.</p>
                      </div>
                    </>
                  )}

                  {/* Scheme Triptyque */}
                  {scheme === "triptyque" && (
                    <>
                      <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/30">
                        <span className="block font-extrabold text-amber-400">💡 أوراق دفتر التربيتيك المطلوبة بالبوابة:</span>
                        <p className="mt-1 font-light text-slate-300">وجود دفتر التربيتيك الدولي ساري من النادي المعتمد، رخصة قيادة أجنبية باسم مالك السيارة أو توكيل سياحة معتمد مرصود مسبقاً.</p>
                      </div>

                      <div className="p-3 bg-red-950/20 text-red-200 rounded-xl border border-red-900/40">
                        <span className="block font-extrabold text-red-400">⚠️ تحذير الصلاحيات والمواقيت:</span>
                        <p className="mt-1 font-light text-slate-350">فترة الإجازة المعتمدة للسيارة التربيتيك هي 3 إلى 6 أشهر كحد أقصى. كسر هذه المدة دون تجديد المعاملة يعرض السيارة للإيقاف واعتبارها تحت شبهة تهريب جمركي.</p>
                      </div>

                      <div className="p-3 bg-blue-950/40 text-slate-200 rounded-xl border border-blue-900/40">
                        <span className="block font-extrabold text-amber-300">💼 خطوة الإفراج الفوري السريع:</span>
                        <p className="mt-1 font-light text-slate-300">يربط الأستاذ إسلام محمد كشوفات الدفتر بميناء الإسكندرية مع إخراج لوحات المرور البرتقالية المؤقتة فور وصول الشحنة لتسليمها لسيادتكم معافاة.</p>
                      </div>
                    </>
                  )}

                  {/* Scheme First Owner */}
                  {scheme === "first_owner" && (
                    <>
                      <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/30">
                        <span className="block font-extrabold text-amber-400">💡 شروط وضوابط المالك الأول:</span>
                        <p className="mt-1 font-light text-slate-300">شراء السيارة باسمك وتاريخ الفاتورة متطابق مع موديل سنة الصنع. يوصى بوجود شهادة 'Euro 1' لتجهيز إعفاء جمارك 100%.</p>
                      </div>

                      <div className="p-3 bg-red-950/20 text-red-200 rounded-xl border border-red-900/40">
                        <span className="block font-extrabold text-red-400">⚠️ تنويه المعارض والوكلاء:</span>
                        <p className="mt-1 font-light text-slate-350">شراء وثيقة ملاك أوائل مصادق عليها دون مطابقة الكشوفات من مصلحة التثمين يعرض شحنتك للإيقاف ويحرمها من الخروج بصالة جمرك 40.</p>
                      </div>

                      <div className="p-3 bg-blue-950/40 text-slate-200 rounded-xl border border-blue-900/40">
                        <span className="block font-extrabold text-amber-300">💼 حماية المحمدية بالرصيف:</span>
                        <p className="mt-1 font-light text-slate-300">نقوم بتدقيق وتفتيش الأوراق وملفات ACID ونادي السيارات بمكتب الإسكندرية لمنع غرامات الأرضية الملاحية تماماً.</p>
                      </div>
                    </>
                  )}

                  {/* Scheme Disabled */}
                  {scheme === "disabled" && (
                    <>
                      <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/30">
                        <span className="block font-extrabold text-amber-400">💡 مستندات وطلبات ذوي الهمم:</span>
                        <p className="mt-1 font-light text-slate-300">بطاقة الخدمات المتكاملة للمستفيد، كارت مواعيد الكشف الطبي بالموانئ المصرية، والتوكيلات المصاحبة لقيادة المرافق.</p>
                      </div>

                      <div className="p-3 bg-red-950/20 text-red-200 rounded-xl border border-red-900/40">
                        <span className="block font-extrabold text-red-405">⚠️ ضوابط بيع ونقل ملكية المركبة:</span>
                        <p className="mt-1 font-light text-slate-350">حظر مصلحي جازم يمنع التصرف في السيارة بالبيع أو التفريد التجاري قبل انتهاء مدة 3 إلى 5 سنوات تلافياً للوقوع تحت طائلة القانون.</p>
                      </div>
                    </>
                  )}

                  {/* Scheme Commercial General Items */}
                  {scheme === "commercial" && (
                    <>
                      <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/30">
                        <span className="block font-extrabold text-amber-400">💡 ضوابط الرسائل الاستيرادية والتجارية:</span>
                        <p className="mt-1 font-light text-slate-300">تجهيز الفاتورة التجارية الأصلية، شهادة فحص بلد المنشأ، بالإضافة لموافقة سلامة الصادرات والواردات، وقوانين التسجيل لـ ACID.</p>
                      </div>

                      <div className="p-3 bg-blue-950/40 text-slate-205 rounded-xl border border-blue-900/40">
                        <span className="block font-extrabold text-amber-300">💼 تأمين الإجراء بمكتب أ/ إسلام:</span>
                        <p className="mt-1 font-light text-slate-300">ميزة طاقمنا تكمن في الدخول للساحة فورا وسحب العينات لتلافي بقاء الحاوية بساحة المهمل وزيادة غرامات الخطوط الملاحية.</p>
                      </div>
                    </>
                  )}

                </div>
              ) : (
                <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed text-right">
                  <div className="p-3 bg-slate-950 rounded-xl border border-blue-900/30">
                    <span className="block font-extrabold text-amber-400">💡 Required Documents:</span>
                    <p className="mt-1 font-light">Provide valid residence id/passport. Bank statements dating 3 months back showing necessary fund flows, plus embassy legal stamp stamps at port of export.</p>
                  </div>

                  <div className="p-3 bg-red-950/20 text-red-200 rounded-xl border border-red-900/40">
                    <span className="block font-extrabold text-red-400">⚠️ Critical Fine Warnings:</span>
                    <p className="mt-1 font-light">Pre-arrange your ACID code draft inside the Nafeza platform inside Egypt seawaters 48 hours ahead of departure. Failure blocks shipping permissions.</p>
                  </div>
                </div>
              )}

              {/* ACTION CALLS */}
              <div className="pt-4 border-t border-blue-900/20 flex flex-col md:flex-row gap-3 text-right">
                <a
                  href={handleGenerateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-750 text-white font-black py-3 px-4 rounded-xl text-xs text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-500/20"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>
                    {isAr 
                      ? "إرسال هذا التقرير لـ أ/ إسلام بالواتساب للمطابقة الفورية 🟢" 
                      : "Send Report to Mr. Eslam on WhatsApp 🟢"}
                  </span>
                </a>
                
                <button
                  onClick={handleRestartWizard}
                  className="bg-slate-950 hover:bg-slate-900 text-slate-350 font-bold py-3 px-4 rounded-xl text-xs cursor-pointer text-center transition-all border border-blue-900/40"
                >
                  {isAr ? "ابدأ من جديد" : "Start Brand New"}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Competitor-Wowing Insights Vault & Emergency Center (Right / 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SECRETS VAULT - EXTREMELY HIGH QUALITY SHINY CARD */}
          <div className="bg-[#070e1b]/95 rounded-3xl p-6 shadow-2xl border border-amber-400/35 relative overflow-hidden">
            
            {/* Ambient gold glow effect */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 border-b border-blue-900/20 pb-4 text-right">
              <div className="flex items-center gap-2 justify-start">
                <Flame className="h-5 w-5 text-amber-400 animate-pulse" />
                <h3 className="font-sans font-black text-sm text-white">
                  {isAr ? "قبو أسرار وتثمين جمارك ميناء الإسكندرية" : "Alexandria Seaport Secret Tactics Vault"}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">
                {isAr 
                  ? "معلومات جمركية توفر لك مئات الآلاف يغفل عنها المستوردون الجدد!" 
                  : "Industry benchmarks Eslam Mohamed implements to save fortunes."}
              </p>
            </div>

            {/* Accordion Elements */}
            <div className="space-y-3 pt-4 text-right">
              {(isAr ? SECRETS_AR : SECRETS_EN).map((sec, idx) => {
                const isOpen = activeSecret === idx;
                return (
                  <div 
                    key={idx}
                    className="border-b border-blue-900/20 pb-3 last:border-0 last:pb-0 text-right"
                  >
                    <button
                      onClick={() => setActiveSecret(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-right font-semibold text-xs py-2 text-amber-350 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                    >
                      <span className="flex items-center gap-2 pl-2">
                        <span className="bg-amber-400/10 text-amber-405 text-[9px] px-1.5 py-0.5 rounded uppercase font-black tracking-wide shrink-0">
                          {sec.badge}
                        </span>
                        <span className="font-extrabold text-start leading-tight">{sec.title}</span>
                      </span>
                      <span className="text-xs shrink-0">{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {isOpen && (
                      <div className="pt-2 text-[11px] leading-relaxed text-slate-300 space-y-2 pl-2 font-sans font-light animate-fadeIn text-right">
                        <p>{sec.desc}</p>
                        <div className="bg-slate-950 border border-blue-900/30 rounded-lg p-2 flex items-start gap-1.5 text-amber-300 font-extrabold justify-start">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{isAr ? "النتيجة والأثر التوفيري:" : "Impact:"} {sec.impact}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* EMERGENCY CORNER FOR CURRENTLY STUCK CUSTOMERS */}
          <div className="bg-red-950/20 border border-red-800/40 rounded-3xl p-6 space-y-4 text-right">
            <div className="flex items-center gap-2 justify-start">
              <AlertTriangle className="h-5 w-5 text-red-500 animate-bounce" />
              <h4 className="font-sans font-extrabold text-sm text-red-200">
                {isAr ? "خطة الطوارئ: سيارتك محجوزة أو Stuck بالرصيف؟" : "Emergency Plan: Stuck Cargo at Alexandria?"}
              </h4>
            </div>

            <p className="text-[11px] text-red-100/80 leading-relaxed font-sans font-light text-right">
              {isAr 
                ? "إذا كانت شحنتك أو سيارتك موجودة حالياً في جمارك الإسكندرية وتواجه غرامات أرضية تراكمية، أو خطأ في الأوراق المصادقة، اتبع ما يلي فوراً للاحتواء المالي السريع:"
                : "If your container or car is currently placed inside Alexandria port facing mounting storage fines, take immediate actions for swift recovery:"}
            </p>

            <div className="space-y-2 text-[11px] font-sans text-red-100 font-medium text-right pr-3">
              <p>{isAr ? "1. اطلب فوراً من وكيل الخط الملوكي وقف تفريغ الطرود لتفادي زيادة الفواتير المروعة." : "1. Stop standard container storage counters through direct shipping line commands."}</p>
              <p>{isAr ? "2. لا تمضي على أوراق تعديل الكشف الميداني إلا بحضور مخلص مصلحي مرخص وموثق." : "2. Strictly avoid signing mechanical sheet amendments without certified agent attendance."}</p>
              <p>{isAr ? "3. تواصل فوراً بأستاذ إسلام محمد على الخط المباشر لإشهار طاقمنا في ساحة جمرك 40." : "3. Reach out with your current shipping logs for gate 10 urgent relief files."}</p>
            </div>

            <a
              href="https://wa.me/201274833844?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%A5%D8%B3%D9%84%D8%A7%D9%85%20%D9%85%D8%AD%D9%85%D8%AF%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%B4%D8%AD%D9%86%D8%A9%20%D8%B9%D8%A7%D9%84%D9%82%D8%A9%20%D8%A8%D8%A7%D9%84%D9%85%D9%8A%D9%86%D8%A7%D8%A1%20%D9%88%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9%20%D8%B7%D9%88%D8%A7%D8%B1%D8%A6%20%D8%B9%D8%A7%D8%AC%D9%84%D8%A9%20%D9%8اجد."
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-red-800 hover:bg-red-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer border border-red-500/20 shadow-md"
            >
              {isAr ? "🚨 اتصل الفوري بالطوارئ: أ/ إسلام محمد" : "🚨 Direct Emergency Assistance Now"}
            </a>
          </div>

          {/* FAQS Accordion link strip */}
          <div className="bg-[#070e1b]/95 rounded-2xl border border-blue-900/40 p-5 flex items-center justify-between shadow-xl text-right">
            <div className="flex items-center gap-3 justify-start">
              <div className="h-9 w-9 bg-slate-950 text-amber-400 border border-blue-900/30 rounded-lg flex items-center justify-center font-bold">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="text-right">
                <span className="block font-black text-xs text-white">{isAr ? "الموسوعة الجمركية التفاعلية" : "Customs Encyclopedia Hub"}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{isAr ? "تصفح 25+ دليل كامل لرموز الـ HS Code والشرائح" : "Read complete tariff compliance indexes"}</span>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-extrabold cursor-pointer hover:underline transition-all pr-2 shrink-0">
              {isAr ? "افتتاح" : "Open"} →
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
