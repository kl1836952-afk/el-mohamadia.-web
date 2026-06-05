import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CUSTOMS_TARIFF_DATA, 
  CUSTOMS_EXEMPTIONS, 
  TariffItem,
  GENERAL_CUSTOMS_FAQ
} from "../data/customsTariffData";
import { 
  BookOpen, 
  Search, 
  Scale, 
  HelpCircle, 
  CheckCircle, 
  FileText, 
  Calculator, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ShieldAlert, 
  Sparkles,
  ArrowUpRight,
  Sparkle,
  GraduationCap,
  Bookmark,
  Share2,
  Copy,
  Check
} from "lucide-react";

export interface TerminologyItem {
  key: string;
  termEn: string;
  termAr: string;
  abbr: string;
  definitionEn: string;
  definitionAr: string;
  impactEn: string;
  impactAr: string;
  category: "shipping" | "regulation" | "finance" | "treaty";
  categoryAr: string;
  categoryEn: string;
}

const CUSTOMS_TERMINOLOGY: TerminologyItem[] = [
  {
    key: "acid",
    termEn: "Advanced Cargo Information Declaration",
    termAr: "نظام التسجيل المسبق للشحنات (ACID)",
    abbr: "ACID",
    definitionEn: "A mandatory 19-digit identification number issued electronically via the Egyptian Nafeza platform 48 hours prior to cargo shipping. It binds importer, exporter, and commodity details.",
    definitionAr: "رقم تعريفي إلزامي فريد من نوعه مكون من 19 رقماً يصدر إلكترونياً عن منصة 'نافذة' الموحدة قبل شحن البضائع بـ 48 ساعة على الأقل. يربط بين بيانات المستورد، المصدر، والسلعة المشحونة.",
    impactEn: "Failing to obtain or print the ACID on import bills of lading prevents cargo offloading at Egyptian ports, forcing ships to return cargo at exporter cost.",
    impactAr: "عدم الحصول على كارت ACID أو إهمال تدوينه على بوالص الشحن يترتب عليه حظر تام لتفريغ الشحنة برصيف الميناء، وإعادتها فوراً على حساب المصدر.",
    category: "regulation",
    categoryEn: "Port Regulations",
    categoryAr: "اللوائح والموانئ"
  },
  {
    key: "euro1",
    termEn: "EUR.1 Movement Certificate",
    termAr: "شهادة الحركة والمرور الأوروبية (يورو 1)",
    abbr: "Euro-1",
    definitionEn: "An official trade origin certificate issued by custom authorities in EU countries, certifying that the goods comply with preferential rules under the Egypt-EU Association Agreement.",
    definitionAr: "وثيقة حركة رسمية تثبت المنشأ وتصدرها مصلحة جمارك الدول الأعضاء بالاتحاد الأوروبي لتأكيد تصنيع السلع بالكامل داخل أوربا، تفعيلاً لشراكتها مع جمهورية مصر العربية.",
    impactEn: "Grants 100% complete waiver of basic customs tariffs upon arrival at Alexandria port, though remaining subject to VAT, development fee, and applicable table tax.",
    impactAr: "تمنح المستورد خصماً وإعفاءً فورياً بنسبة 100% من الفئة الجمركية الأساسية عند الرصيف، بينما يظل ملتزماً بسداد القيمة المضافة ورسم التنمية وضريبة الجدول المقررة.",
    category: "treaty",
    categoryEn: "Trade Treaties",
    categoryAr: "اتفاقيات التبادل"
  },
  {
    key: "demurrage",
    termEn: "Shipping Demurrage & Storage Fees",
    termAr: "غرامات الأرضية والتأخير (Demurrage)",
    abbr: "Demurrage",
    definitionEn: "Fines and storage fees charged in USD per day by container owners (shipping lines) for holding cargo inside the seaport's container yard beyond the allowed free days boundary.",
    definitionAr: "رسوم وغرامات مالية عقابية تُحسب بالدولار الأمريكي عن كل يوم تأخير للحاوية بساحات الميناء بعد انقضاء الوقت المجاني المتفق عليه مع الخط الملاحي (عادة بين 7 إلى 14 يوماً).",
    impactEn: "Slow custom clearance and mechanical inspection delays cause demurrage to rapidly snowball, eating up business profit margins. Early compliance review mitigates this entirely.",
    impactAr: "التأخير في المعاينة والمطابقة يراكم هذه الرسوم مسبباً خسائر تجارية باهظة للمستوردين. يتدخل مكتب أ/ إسلام محمد لسرعة المعاينة الفيزيائية وإنهاء الإفراج.",
    category: "finance",
    categoryEn: "Customs Finances",
    categoryAr: "المالية الجمركية"
  },
  {
    key: "nafeza",
    termEn: "Nafeza Single Window Platform",
    termAr: "النافذة الوطنية الموحدة لتسهيل التجارة",
    abbr: "Nafeza",
    definitionEn: "Egypt's integrated digital platform designed to streamline export and import trade workflows, unifying harbor control units, customs, health testing entities, and GOEIC portals under one digital dashboard.",
    definitionAr: "المنصة الإلكترونية السيادية الموحدة لوزارة المالية المصرية، تجمع وتنسق كافة إجراءات المعاينة والمطابقة، وتقديم المستندات والتحقق من كود ACID لكافة المنافذ البحرية والجوية بالمصلحة.",
    impactEn: "Accelerates cargo clearance speeds, shifting physical paperwork queues over to online instant validation panels, drastically slashing overall transit times.",
    impactAr: "تنهي طوابير الانتظار الكلاسيكية وتحول المعاملات الورقية لمعالجة إلكترونية فورية لإنهاء تقدير وتثمين الطرود الجمركية.",
    category: "regulation",
    categoryEn: "Port Regulations",
    categoryAr: "اللوائح والموانئ"
  },
  {
    key: "bill_of_lading",
    termEn: "Bill of Lading (B/L)",
    termAr: "بوليصة الشحن البحرية (B/L)",
    abbr: "B/L",
    definitionEn: "A primary transportation contract issued by the maritime shipping carrier detailing product descriptions, container weight parameters, port of origin, and destination, serving as a binding document of cargo ownership.",
    definitionAr: "وثيقة رسمية تصدرها خطوط الشحن والوكلاء البحريون مبين فيها وزن الحاويات، وعدد الكراتين تفصيلياً، وتفاصيل بائع ببلد التصدير والمرسل إليه بمصر، وتعتبر سنداً قانونياً للملكية.",
    impactEn: "Essential for customs clearance. The consignee name must precisely match the company commercial register or official expat papers to legally register inputs for ACID verification.",
    impactAr: "وثيقة جوهرية للتخليص لا غنى عنها. يجب أن يتطابق اسم المستلم فيها بدقة متناهية مع اسم السجل التجاري للشركة أو شهادة المغترب تفادياً لإيقاف الرسالة.",
    category: "shipping",
    categoryEn: "Maritime Freight",
    categoryAr: "الشحن والنقل"
  },
  {
    key: "fob",
    termEn: "Free On Board (Incoterm)",
    termAr: "التسليم على ظهر السفينة (FOB)",
    abbr: "FOB",
    definitionEn: "An international commercial term specifying that the seller clears the goods for export and bears all costs until safely loaded onto the vessel. The buyer handles all insurance, freight, and destination custom tolls.",
    definitionAr: "شرط شحن دولي يعاد فيه تحميل تكلفة نقل البضائع للميناء وتجهيز أوراق التصدير ووضعها داخل الباخرة على حساب المصدر بالخارج، ثم تنتقل كافة المخاطر الملاحية والمالية للمستورد عند خط الحركة.",
    impactEn: "Under FOB agreements, the importer is responsible for contracting the shipping carrier and negotiating free yard storage periods to shield themselves from immediate demurrage rates.",
    impactAr: "تحت هذا الشرط، يتولى المستورد بمصر واجب التفاوض مع الخطوط الملاحية بنفسه لتأمين مدد استبقاء مجاني كافية وتجنب فخ التأخير بالأرصفة.",
    category: "shipping",
    categoryEn: "Maritime Freight",
    categoryAr: "الشحن والنقل"
  },
  {
    key: "cif",
    termEn: "Cost, Insurance & Freight (Incoterm)",
    termAr: "شامل التكلفة والشحن والتأمين (CIF)",
    abbr: "CIF",
    definitionEn: "An Incoterm meaning the seller pays for cargo freight and trans-oceanic insurance to the destination port. This cumulative CIF valuation is used by Egyptian customs as the base amount to calculate duties.",
    definitionAr: "شرط تسعير وتوريد دولي يعني شمول الفاتورة لسعر المنتج وتكاليف شحن الحاوية بحراً وقيمة بوليصة التأمين الملاحية مؤمنة لغاية ميناء الإسكندرية أو الدخيلة.",
    impactEn: "When cargo is bought FOB, Egyptian customs calculations will automatically add estimated transport and insurance values over the invoice to construct an equivalent CIF value, which acts as the duty base.",
    impactAr: "إذا كانت فاتورتك فوب (FOB)، ستقوم مصلحة الجمارك بإضافة نسب افتراضية للشحن البحري وقسط التأمين لتركيب قيمة (CIF) كوعاء لوعاء حساب ضريبة الوارد.",
    category: "shipping",
    categoryEn: "Maritime Freight",
    categoryAr: "الشحن والنقل"
  },
  {
    key: "hs_code",
    termEn: "Harmonized System Code (HS Code)",
    termAr: "الرمز الجمركي المنسق (HS Code)",
    abbr: "HS Code",
    definitionEn: "A standardized numeral coding pattern implemented worldwide to uniform commercial commodity listings, letting port authorities index exact tariff percentages and trigger required agency approvals.",
    definitionAr: "نظام تصنيف وتكويد رقمي منسق دولياً لتوصيف كل سلعة مستوردة برمز ثابت يسهل على لجان الفحص والتقدير تمييز السعر الأساسي والجهات الرقابية المسؤولة عن سلامة الشحنات.",
    impactEn: "Choosing a faulty HS Code error prompts severe misclassification penalty fines or leads to immediate cargo quarantine blockages if the required regulatory seals (like NFSA or NTRA) are omitted.",
    impactAr: "تحديد بند خاطئ أو غير حقيقي يدفع المصلحة لفرض غرامات 'التهريب أو الترحيل الجمركي'، أو حجز الطرد لتفادي سحب عينات رقابة إضافية.",
    category: "regulation",
    categoryEn: "Port Regulations",
    categoryAr: "اللوائح والموانئ"
  },
  {
    key: "goeic",
    termEn: "General Organization for Export & Import Control",
    termAr: "الهيئة العامة للرقابة على الصادرات والواردات (GOEIC)",
    abbr: "GOEIC",
    definitionEn: "An Egyptian government entity operating inside all seaports, executing strict qualitative, physical, and safety compliance sampling testing for general consumer commodities before allowing custom release.",
    definitionAr: "هيئة حكومية سيادية رصينة تابعة لوزارة التجارة بجمهورية مصر العربية، تدير المعامل واللجان الإجبارية بمصلحة الجمارك لفحص مطابقة الأجهزة الكهربائية والملابس والكيماويات للمقاييس المصرية.",
    impactEn: "Cargo items failing to match GOEIC's approved criteria must either be cross-shipped back out of Egyptian territories or ordered for immediate physical destruction at importer cost.",
    impactAr: "أي رسائل تجارية تصدر لجان GOEIC تقريراً برفض جودتها، يُفرض على المستورد ردها خارج البلاد أو إعدامها مصلحياً على نفقته.",
    category: "regulation",
    categoryEn: "Port Regulations",
    categoryAr: "اللوائح والموانئ"
  },
  {
    key: "triptyque",
    termEn: "Triptyque Customs Carnet",
    termAr: "دفتر التربيتيك الجمركي الدولي",
    abbr: "Triptyque",
    definitionEn: "A standardized international customs permit issued by recognized motoring clubs, allowing expats to temporarily enter their foreign-licensed private vehicles into Egypt for tourism or vacation stays duty-free.",
    definitionAr: "دفتر جمركي دولي صادر عن نوادي السيارات الدولية المعترف بها، يسمح للزوار أو المغتربين بإدخال سياراتهم بغرض النزهة أو الإجازات لفترات محددة دون مطالبات ضريبية.",
    impactEn: "Strictly bypasses standard high automotive customs. The car is given temporary orange license plates, but must be shipped back overseas once the 3-to-6 month allowed period has lapsed.",
    impactAr: "يوفر إعفاءً جمركياً مؤقتاً تاماً مقابل تسليم المركبة بلوحات برتغالية مؤقتة، ويحظر بقاؤها بالبلاد أو بيعها متى انقضت الأشهر القانونية المرخص بها.",
    category: "treaty",
    categoryEn: "Trade Treaties",
    categoryAr: "اللوائح والموانئ"
  }
];

interface Props {
  lang: "ar" | "en";
  onApplyCalculationLink?: (tariff: any) => void;
}

export default function CustomsEncyclopedia({ lang, onApplyCalculationLink }: Props) {
  const isAr = lang === "ar";
  
  // Tab states: "tariff" (البنود والتعريفة), "exemptions" (قواعد الإعفاءات), "faq" (الأسئلة الشائعة), "terminology" (المصطلحات الجمركية)
  const [activeSubTab, setActiveSubTab] = useState<"tariff" | "exemptions" | "faq" | "terminology">("tariff");
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<string>("all");

  // Terminology search state
  const [termSearchQuery, setTermSearchQuery] = useState("");
  const [selectedTermCategory, setSelectedTermCategory] = useState<string>("all");
  
  // Expanded card state
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Active exemption category filter
  const [exemptionCategory, setExemptionCategory] = useState<string>("all");

  // Chapter categories extraction
  const chapters = useMemo(() => {
    const set = new Set<string>();
    CUSTOMS_TARIFF_DATA.forEach(item => {
      set.add(isAr ? item.chapterAr : item.chapterEn);
    });
    return ["all", ...Array.from(set)];
  }, [isAr]);

  // Filter tariff items
  const filteredTariff = useMemo(() => {
    return CUSTOMS_TARIFF_DATA.filter(item => {
      const matchChapter = selectedChapter === "all" || 
        (isAr ? item.chapterAr === selectedChapter : item.chapterEn === selectedChapter);
      
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || 
        item.hsCode.toLowerCase().includes(query) ||
        item.nameAr.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        item.descriptionAr.toLowerCase().includes(query) ||
        item.descriptionEn.toLowerCase().includes(query);

      return matchChapter && matchSearch;
    });
  }, [selectedChapter, searchQuery, isAr]);

  const toggleExpandItem = (id: string) => {
    setExpandedItemId(prev => prev === id ? null : id);
  };

  // Copied term key tracking
  const [copiedTermKey, setCopiedTermKey] = useState<string | null>(null);

  const handleCopyTerm = (key: string, text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedTermKey(key);
      setTimeout(() => {
        setCopiedTermKey(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Filter terminology items
  const filteredTerminology = useMemo(() => {
    const query = termSearchQuery.toLowerCase().trim();
    return CUSTOMS_TERMINOLOGY.filter(item => {
      const matchQuery = !query || 
        item.termEn.toLowerCase().includes(query) ||
        item.termAr.toLowerCase().includes(query) ||
        item.abbr.toLowerCase().includes(query) ||
        item.definitionEn.toLowerCase().includes(query) ||
        item.definitionAr.toLowerCase().includes(query) ||
        item.impactEn.toLowerCase().includes(query) ||
        item.impactAr.toLowerCase().includes(query);
      
      const matchCategory = selectedTermCategory === "all" || item.category === selectedTermCategory;
      return matchQuery && matchCategory;
    });
  }, [termSearchQuery, selectedTermCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Title & Banner Badge */}
      <div className="bg-gradient-to-br from-blue-950 via-[#0a1e36] to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-blue-900/40 text-right overflow-hidden relative">
        {/* Abstract Background Visuals */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-800/20 rounded-full blur-3xl -translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 text-right" dir={isAr ? "rtl" : "ltr"}>
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/15 text-amber-300 font-extrabold px-3 py-1 rounded-full text-[10px] tracking-wide uppercase border border-amber-400/35">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{isAr ? "الدليل الموحد لموانئ ومنافذ مصر بالسيارات والبضائع" : "Official Egyptian Ports Tariff Guidebook"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              {isAr ? "الموسوعة الجمركية التفاعلية" : "Consolidated Customs Encyclopedia"}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
              {isAr 
                ? "قاعدة البيانات الرسمية للبند والتعريفة الموحدة (HS Code) وقوانين مصلحة الجمارك بميناء الإسكندرية. ابحث في أبواب الاستيراد، وتعرف على موافقات مجمعات فحص الشاسيه والكشف والوزن، وشهادات يورو 1 ومبادرة المغتربين." 
                : "Your extensive handbook of harmonized tariff systems (HS Codes) and port authority regulations. Search structured clauses, required agencies, and Expat or European EUR-1 waiver frameworks."}
            </p>
          </div>

          <div className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 rounded-2xl flex items-center justify-center border border-amber-300 shadow-xl self-start md:self-center shrink-0">
            <BookOpen className="h-8 w-8 md:h-10 md:w-10 stroke-[1.8]" />
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2.5 mt-8 border-t border-blue-900/40 pt-5 justify-start text-right" dir={isAr ? "rtl" : "ltr"}>
          <button
            onClick={() => setActiveSubTab("tariff")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeSubTab === "tariff" 
                ? "bg-amber-400 text-blue-950 shadow font-black" 
                : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 border border-blue-900/40"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>{isAr ? "كود البنود والتعريفة الجمركية" : "HS Code Tariff Database"}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("exemptions")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeSubTab === "exemptions" 
                ? "bg-amber-400 text-blue-950 shadow font-black" 
                : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 border border-blue-900/40"
            }`}
          >
            <Scale className="h-4 w-4" />
            <span>{isAr ? "لوائح وإعفاءات الجمارك الرسمية" : "Customs Exemption Rules"}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("faq")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeSubTab === "faq" 
                ? "bg-amber-400 text-blue-950 shadow font-black" 
                : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 border border-blue-900/40"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>{isAr ? "الأسئلة والأحكام التفسيرية" : "Interpretative Port FAQ"}</span>
          </button>

          <button
            onClick={() => setActiveSubTab("terminology")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeSubTab === "terminology" 
                ? "bg-amber-400 text-blue-950 shadow font-black" 
                : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-900 border border-blue-900/40"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            <span>{isAr ? "قاموس المصطلحات الجمركية" : "Customs Terminology"}</span>
          </button>
        </div>
      </div>

      {/* INNER VIEW CONTENT */}
      {activeSubTab === "tariff" && (
        <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
          {/* Live search filters block */}
          <div className="bg-[#070e1b]/95 rounded-2xl border border-blue-900/40 p-5 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-3.5">
              {/* Search input */}
              <div className="flex-1 relative">
                <Search className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? "ابحث بالبند الجمركي، اسم السلعة، الكود الرمزى HS أو الوصف..." : "Search by product keyword, HS Code or description..."}
                  className="w-full pr-10 pl-4 py-3 bg-slate-950 border border-blue-900/30 focus:border-amber-400 focus:bg-slate-900 rounded-xl text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none text-right"
                />
              </div>

              {/* Clear search query helper */}
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="bg-slate-900 text-slate-200 hover:text-white font-bold px-4 py-3 rounded-xl hover:bg-slate-800 transition-all text-xs shrink-0 cursor-pointer border border-blue-900/30"
                >
                  {isAr ? "مسح البحث" : "Clear Search"}
                </button>
              )}
            </div>

            {/* Structured chapter categories selector */}
            <div className="space-y-2 text-right">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                {isAr ? "تصفية سريعة حسب مجالات الاستيراد:" : "Filter by Customs Chapters:"}
              </span>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {chapters.map((ch, idx) => {
                  const displayLabel = ch === "all" ? (isAr ? "جميع الأبواب الفقهية" : "All Chapters") : ch;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedChapter(ch)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        selectedChapter === ch 
                          ? "bg-amber-400 text-blue-950 border-amber-450 font-black shadow" 
                          : "bg-slate-950 text-slate-400 border-blue-900/30 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      {displayLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Display Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1 text-right">
              <span>
                {isAr 
                  ? `تم العثور على ${filteredTariff.length} بند جمركي مسجل وموثق` 
                  : `Found ${filteredTariff.length} registered tariff clauses`
                }
              </span>
              <span>{isAr ? "*تحت تدقيق ومراجعة مكتب أ/ إسلام محمد الجمركي" : "*Reviewed under Master Eslam Desk"}</span>
            </div>

            {filteredTariff.length === 0 ? (
              <div className="bg-[#070e1b]/95 rounded-2xl border border-dashed border-blue-900/40 p-12 text-center text-slate-400 space-y-3">
                <ShieldAlert className="h-10 w-10 text-amber-500 mx-auto" />
                <h4 className="font-bold text-sm text-white">
                  {isAr ? "لم نجد بنود جمركية مطابقة لبحثك" : "No matching tariff items encountered"}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {isAr 
                    ? "حاول استخدام كلمات أبسط مثل (سيارات، مبادرة، أجهزة، طرازات) أو اسأل المستشار الذكي للتخمين المباشر." 
                    : "Try searching simple phrases (e.g. cars, laptop, wheat, active spare parts) or consult our AI chat bot."}
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedChapter("all"); }}
                  className="bg-[#050a14] text-amber-300 font-bold text-xs py-2 px-4 rounded-xl border border-blue-900/40 hover:border-amber-400 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  {isAr ? "إعادة تعيين مرشحات البحث" : "Reset Active Filters"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {filteredTariff.map((item) => {
                  const isExpanded = expandedItemId === item.id;
                  return (
                    <div 
                      key={item.id}
                      className={`bg-[#070e1b]/95 rounded-2xl border transition-all overflow-hidden ${
                        isExpanded 
                          ? "border-amber-400 shadow-2xl ring-1 ring-amber-400/20" 
                          : "border-blue-900/30 hover:border-blue-900/50 hover:shadow-lg"
                      }`}
                    >
                      {/* Accordion Trigger Head Line */}
                      <button
                        onClick={() => toggleExpandItem(item.id)}
                        className="w-full text-right p-4 md:p-5 flex items-start md:items-center justify-between gap-4 cursor-pointer text-xs"
                      >
                        <div className="space-y-1.5 text-right flex-1 select-none">
                          {/* HS Code Badge & Chapter Tag */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[11px] font-black text-amber-300 bg-amber-450/10 px-2.5 py-1 rounded-md border border-amber-400/20 uppercase tracking-widest">
                              HS {item.hsCode}
                            </span>
                            <span className="text-[10px] text-slate-405 font-bold bg-[#050a14] px-2 py-1 rounded border border-blue-900/20">
                              {isAr ? item.chapterAr : item.chapterEn}
                            </span>
                          </div>

                          {/* Item Primary Name */}
                          <h4 className="text-sm md:text-base font-black text-white leading-tight font-sans">
                            {isAr ? item.nameAr : item.nameEn}
                          </h4>
                        </div>

                        {/* Duty Rate Summary & Chevron */}
                        <div className="flex items-center gap-3.5 mr-auto pl-1 shrink-0">
                          <div className="text-left md:text-right hidden sm:block">
                            <span className="block text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">{isAr ? "الجمارك الأساسية" : "Base Duty Rate"}</span>
                            <span className="text-xs font-black text-amber-400 font-serif">
                              {isAr ? item.dutyRateAr : item.dutyRateEn}
                            </span>
                          </div>

                          <div className="p-1.5 bg-[#050a14] rounded-lg text-slate-400 border border-blue-900/35 group-hover:bg-[#0b1c33]">
                            {isExpanded ? <ChevronUp className="h-4 w-4 text-amber-400" /> : <ChevronDown className="h-4 w-4" />}
                          </div>
                        </div>
                      </button>

                      {/* Dropdown details content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="border-t border-blue-900/30 bg-[#050a14]/60"
                          >
                            <div className="p-4 md:p-6 space-y-5 text-right text-xs">
                              {/* Descriptive Paragraph */}
                              <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-blue-900/30">
                                <span className="text-[10px] text-amber-400 font-black flex items-center gap-1">
                                  <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                  <span>{isAr ? "الشرح والاستقراء الجمركي المستفيض" : "Customs Regulatory Remarks"}</span>
                                </span>
                                <p className="text-xs text-slate-200 leading-relaxed pt-1 font-sans font-light">
                                  {isAr ? item.descriptionAr : item.descriptionEn}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Duty calculations sheet */}
                                <div className="bg-slate-950 p-4 rounded-xl border border-blue-900/30 space-y-3">
                                  <h5 className="font-bold text-white border-b border-blue-900/20 pb-2 text-[11px] uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                    <Scale className="h-3.5 w-3.5 text-amber-400" />
                                    <span>{isAr ? "تحليل جدول الرسوم والضرائب الهيكلية" : "Tax & Duty Structure Schedule"}</span>
                                  </h5>

                                  <div className="space-y-2 text-xs font-semibold text-slate-300">
                                    <div className="flex items-center justify-between border-b border-dashed border-blue-900/20 pb-1.5">
                                      <span className="text-slate-450 font-medium">{isAr ? "الضريبة الجمركية الواردة:" : "Incoming customs duty:"}</span>
                                      <span className="font-black text-amber-400">{isAr ? item.dutyRateAr : item.dutyRateEn}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-blue-900/20 pb-1.5">
                                      <span className="text-slate-450 font-medium">{isAr ? "ضريبة القيمة المضافة الإجبارية (VAT):" : "Value Added Tax (VAT):"}</span>
                                      <span className="font-mono text-white">{item.vatRate}%</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-dashed border-blue-900/20 pb-1.5">
                                      <span className="text-slate-450 font-medium">{isAr ? "رسم تنمية الموارد والمالية:" : "Resource Development Fee:"}</span>
                                      <span className="font-mono text-white">{item.devFee}%</span>
                                    </div>
                                    {item.tableTax !== undefined && (
                                      <div className="flex items-center justify-between border-b border-dashed border-blue-900/20 pb-1.5">
                                        <span className="text-slate-450 font-medium">{isAr ? "ضريبة الجدول الاستهلاكية النوعية:" : "Surtax / Table Tax:"}</span>
                                        <span className="font-mono text-white">{item.tableTax}%</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Food / Drug / Telecom Agency approvals needed in Egypt seaports */}
                                <div className="bg-slate-950 p-4 rounded-xl border border-blue-900/30 space-y-3">
                                  <h5 className="font-bold text-white border-b border-blue-900/20 pb-2 text-[11px] uppercase tracking-wider text-red-455 flex items-center gap-1.5">
                                    <ShieldAlert className="h-3.5 w-3.5 text-amber-450 animate-pulse" />
                                    <span>{isAr ? "موافقات الجهات الرقابية وهيئة السلامة" : "Required GOEIC & Authority Approvals"}</span>
                                  </h5>
                                  
                                  <div className="space-y-2">
                                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                                      {isAr ? item.agencyRequirementsAr : item.agencyRequirementsEn}
                                    </p>
                                    <div className="bg-[#050a14] rounded-lg p-2.5 border border-amber-400/10 text-[10px] text-amber-300 leading-relaxed font-semibold">
                                      ⚠️ {isAr 
                                        ? "عدم تقديم موافقة هذا الكيان مصلحياً يترتب عليه حظر الإفراج وتحويل الحاوية للمهمل بجمارك الإسكندرية." 
                                        : "Failure to produce these certifications at port prompts cargo quarantine or return clauses."
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Interactive Action: apply to calculator/form */}
                              {onApplyCalculationLink && (
                                <div className="flex justify-end pt-2">
                                  <button
                                    onClick={() => {
                                      if (onApplyCalculationLink) {
                                        onApplyCalculationLink(item);
                                      }
                                    }}
                                    className="bg-amber-400 hover:bg-amber-300 font-extrabold text-[#050a14] px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all text-xs shadow-md"
                                  >
                                    <Calculator className="h-4 w-4" />
                                    <span>{isAr ? "احسب الرسوم الإجمالية الفورية لهذه السلعة" : "Simulate total clearance cost"}</span>
                                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-800" />
                                  </button>
                                </div>
                              )}

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === "exemptions" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" dir={isAr ? "rtl" : "ltr"}>
          {/* Informative Side Rules Checklist */}
          <div className="lg:col-span-8 space-y-5">
            {CUSTOMS_EXEMPTIONS.map((ex, idx) => {
              return (
                <div key={idx} className="bg-[#070e1b]/95 rounded-2xl border border-blue-900/40 p-6 space-y-4 shadow-xl text-right">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="h-9 w-9 bg-slate-950 rounded-full flex items-center justify-center text-amber-400 border border-blue-900/30 shrink-0">
                      <Scale className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <h4 className="font-extrabold text-sm text-white">
                        {isAr ? ex.titleAr : ex.titleEn}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        {ex.category === "expatriate" ? (isAr ? "توطين سيارات مصريين بالخارج" : "Expat scheme") : ex.category === "disability" ? (isAr ? "سيارات ذوي الهمم والقومسيون الطبي" : "Heallth waiver") : (isAr ? "شراكة ملاحية واتفاقية زيرو جمارك" : "Trade Treaty")}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-blue-900/20 pt-3.5 space-y-3">
                    {isAr ? ex.detailsAr.map((det, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed font-sans font-light justify-start">
                        <CheckCircle className="h-4 w-4 text-amber-400 stroke-[3] mt-0.5 shrink-0" />
                        <span>{det}</span>
                      </div>
                    )) : ex.detailsEn.map((det, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed justify-start">
                        <CheckCircle className="h-4 w-4 text-emerald-500 stroke-[3] mt-0.5 shrink-0" />
                        <span>{det}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guidelines Sidebar summary card */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-gradient-to-br from-slate-950 via-[#0a1e36] to-slate-950 text-white rounded-2xl p-5 border border-blue-900/40 shadow-xl space-y-3.5 text-right">
              <div className="font-black text-xs text-amber-400 flex items-center gap-1.5 uppercase tracking-wider justify-end">
                <Sparkle className="h-4 w-4 text-amber-400 shrink-0 animate-pulse" />
                <span>{isAr ? "توجيهات مصلحة جمارك الإسكندرية" : "Alex Customs Compliance Policy"}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                {isAr 
                  ? "تخضع الإعفاءات لتدقيق مزدوج ورصين بساحة المعاينة. نوصي بتجهيز كافة شهادات الإقامة وجوازات السفر وفواتير شراء بلد المولد مصادقاً عليها من سفارة مصر بتلك الدولة لضمان تسيير المعاملة فوراً."
                  : "All customs exemption quotas undergo dual audits in the quarantine dock. Clients must ensure consulate seals are present over basic bills of lading and purchase certificates physically."}
              </p>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-900/30 text-[10px] text-amber-300 font-semibold leading-relaxed">
                👉 {isAr 
                  ? "مكتب أ/ إسلام محمد يوفر تمثيلاً رسمياً أمام لجان التفتيش والنزاعات وتثمين الطرود لتلافي غرامات جماركياً." 
                  : "We offer professional representation fronting dispute boards and weight assessment bodies to avoid fines."
                }
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "faq" && (
        <div className="space-y-4" dir={isAr ? "rtl" : "ltr"}>
          <div className="bg-[#070e1b]/95 rounded-2xl border border-blue-900/40 p-5 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-right">
            
            <div className="md:col-span-8 space-y-2 text-right">
              <h3 className="font-black text-sm text-white">
                {isAr ? "هل تواجه مشكلة في تكييف المعاملة جمركياً؟" : "Struggling to find the right HS Code tariff category?"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr 
                  ? "بعض البضائع والرسائل تتكون من أجزاء متعددة وتخضع لتبويبات رقابية متشابكة (كالمعدات المدمجة). المستشار أ/ إسلام محمد لديه الحكمة لتسوية الأوراق فوراً بميناء الإسكندرية."
                  : "Complex commodities composed of mixed elements (e.g. glassware with polymer moldings) face classification issues. Our port expert handles representational duties dynamically."}
              </p>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <a 
                href="https://wa.me/201274833844" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-blue-950 font-black text-xs px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow w-full justify-center md:w-auto transition-all"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{isAr ? "اسأل أستاذ إسلام جمركياً" : "Consult Mr. Eslam Directly"}</span>
              </a>
            </div>

          </div>

          {/* General customs FAQ database */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GENERAL_CUSTOMS_FAQ.map((faq, idx) => {
              return (
                <div key={idx} className="bg-[#070e1b]/95 rounded-2xl border border-blue-900/20 p-5 space-y-3 hover:border-amber-400/40 transition-all shadow-xl text-right">
                  <div className="flex items-start gap-2.5 justify-start">
                    <HelpCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <h4 className="font-black text-xs md:text-sm text-white leading-snug">
                      {isAr ? faq.qAr : faq.qEn}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pr-6 font-sans font-light">
                    {isAr ? faq.aAr : faq.aEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === "terminology" && (
        <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
          {/* Live Search and Category Filters block */}
          <div className="bg-[#070e1b]/95 rounded-2xl border border-blue-900/40 p-5 shadow-xl space-y-4 text-right">
            <div className="flex flex-col md:flex-row gap-3.5">
              {/* Search input with icons */}
              <div className="flex-1 relative">
                <Search className={`absolute ${isAr ? "right-3.5" : "left-3.5"} top-3.5 h-4 w-4 text-slate-400`} />
                <input
                  type="text"
                  value={termSearchQuery}
                  onChange={(e) => setTermSearchQuery(e.target.value)}
                  placeholder={isAr ? "ابحث بالمصطلح (مثال: ACID، غرامات، يورو، بوليصة)..." : "Search term (e.g., ACID, Demurrage, Euro-1, FOB)..."}
                  className={`w-full ${isAr ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 bg-slate-950 border border-blue-900/30 focus:border-amber-400 focus:bg-slate-900 rounded-xl text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none`}
                />
              </div>

              {/* Clear button */}
              {termSearchQuery && (
                <button
                  onClick={() => setTermSearchQuery("")}
                  className="bg-slate-900 text-slate-200 hover:text-white font-bold px-4 py-3 rounded-xl hover:bg-slate-800 transition-all text-xs shrink-0 cursor-pointer border border-blue-900/30"
                >
                  {isAr ? "مسح البحث" : "Clear Search"}
                </button>
              )}
            </div>

            {/* Category Quick Pills */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                {isAr ? "تصنيف المصطلحات:" : "Terminology Categories:"}
              </span>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {[
                  { id: "all", ar: "جميع المصطلحات", en: "All Terms" },
                  { id: "regulation", ar: "اللوائح والموانئ", en: "Port Regulations" },
                  { id: "shipping", ar: "الشحن والنقل", en: "Maritime Freight" },
                  { id: "finance", ar: "المالية الجمركية", en: "Customs Finances" },
                  { id: "treaty", ar: "اتفاقيات ومناشئ", en: "Trade Treaties" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTermCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      selectedTermCategory === cat.id
                        ? "bg-amber-400 text-blue-950 border-amber-450 font-black shadow"
                        : "bg-slate-950 text-slate-400 border-blue-900/30 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {isAr ? cat.ar : cat.en}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Overview */}
          <div className="space-y-4">
            <div className={`flex items-center justify-between text-xs font-bold text-slate-400 px-1 ${isAr ? "text-right" : "text-left"}`}>
              <span>
                {isAr
                  ? `تم العثور على ${filteredTerminology.length} مصطلح تجاري وجمركي موثق`
                  : `Found ${filteredTerminology.length} documented customs terms`}
              </span>
              <span>{isAr ? "*مسرد معرفي تفاعلي دائم التحديث" : "*Interactive Glossary of Trade Terms"}</span>
            </div>

            {filteredTerminology.length === 0 ? (
              <div className="bg-[#070e1b]/95 rounded-2xl border border-dashed border-blue-900/40 p-12 text-center text-slate-400 space-y-3">
                <ShieldAlert className="h-10 w-10 text-amber-500 mx-auto" />
                <h4 className="font-bold text-sm text-white">
                  {isAr ? "لم نجد مصطلحات جمركية مطابقة لبحثك" : "No matching terms encountered"}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {isAr
                    ? "تأكد من كتابة المصطلح بشكل صحيح (مثال: ACID، يورو 1، غرامة) أو قم بتغيير تصنيف التصفية الفعال."
                    : "Verify your spelling (e.g. ACID, Demurrage, Euro-1) or clear the category filters."}
                </p>
                <button
                  onClick={() => { setTermSearchQuery(""); setSelectedTermCategory("all"); }}
                  className="bg-[#050a14] text-amber-300 font-bold text-xs py-2 px-4 rounded-xl border border-blue-900/40 hover:border-amber-400 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  {isAr ? "إعادة تعيين مرشحات البحث" : "Reset Terminology Filters"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTerminology.map((item) => (
                  <motion.div
                    key={item.key}
                    layoutId={`term-card-${item.key}`}
                    className="bg-[#070e1b]/95 rounded-3xl border border-blue-900/20 p-5 md:p-6 hover:border-amber-400/45 transition-all shadow-xl flex flex-col justify-between space-y-4 text-right"
                  >
                    <div className="space-y-3">
                      {/* Abbr Badge & Category Pill */}
                      <div className="flex items-center justify-between font-sans">
                        <span className="font-mono text-xs font-black text-amber-300 bg-amber-450/10 px-3 py-1 rounded-lg border border-amber-400/20 uppercase tracking-widest">
                          {item.abbr}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold bg-[#050a14] px-2.5 py-1 rounded border border-blue-900/25">
                          {isAr ? item.categoryAr : item.categoryEn}
                        </span>
                      </div>

                      {/* Title block */}
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-white leading-tight font-sans">
                          {isAr ? item.termAr : item.termEn}
                        </h4>
                        <span className="text-[11px] text-slate-400 block font-sans italic">
                          {isAr ? item.termEn : item.termAr}
                        </span>
                      </div>

                      {/* Explanation Divider */}
                      <div className="border-t border-blue-900/15 pt-3 space-y-2">
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                          {isAr ? item.definitionAr : item.definitionEn}
                        </p>

                        {/* Impact Container */}
                        <div className="bg-amber-400/5 rounded-xl p-3 border border-amber-400/10 space-y-1 mt-2">
                          <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wide flex items-center gap-1 justify-start">
                            <Info className="h-3 w-3 text-amber-400 shrink-0" />
                            <span>{isAr ? "الأثر والتبعات الجمركية بالموانئ" : "Functional Custom Clearance Impact"}</span>
                          </span>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
                            {isAr ? item.impactAr : item.impactEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions Row */}
                    <div className="flex items-center justify-between border-t border-blue-900/15 pt-3">
                      {/* Copy code button */}
                      <button
                        onClick={() => handleCopyTerm(item.key, `${isAr ? item.termAr : item.termEn}: ${isAr ? item.definitionAr : item.definitionEn}`)}
                        className="bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white font-bold p-2 rounded-lg border border-blue-900/30 transition-all flex items-center gap-1.5 text-[11px] cursor-pointer"
                        title={isAr ? "نسخ المفهوم" : "Copy Definition"}
                      >
                        {copiedTermKey === item.key ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">{isAr ? "تم النسخ" : "Copied"}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>{isAr ? "نسخ التعريف" : "Copy definition"}</span>
                          </>
                        )}
                      </button>

                      {/* WhatsApp consultation button */}
                      <a
                        href={`https://wa.me/201274833844?text=${encodeURIComponent(
                          isAr 
                            ? `مرحباً أستاذ إسلام، أود الاستفسار من مكتبكم حول شروط وأثر المصطلح الجمركي: "${item.termAr}"`
                            : `Hello Mr. Eslam, I would like to consult your customs desk about: "${item.termEn}"`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold py-1.5 px-3 rounded-lg border border-[#25D366]/20 transition-all flex items-center gap-1.5 text-[11px] cursor-pointer"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span>{isAr ? "استفسار جمركي مباشر" : "Query desk"}</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </motion.div>
  );
}
