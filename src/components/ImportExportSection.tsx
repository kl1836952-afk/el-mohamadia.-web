import React, { useState } from "react";
import { Ship, ArrowDownCircle, ArrowUpCircle, FileCheck, FileCode, CheckCircle2, ShieldCheck, HelpCircle, FileText, ArrowRightCircle, Anchor } from "lucide-react";

interface Props {
  lang: "ar" | "en";
  setActiveTab?: (tab: "home" | "calculator" | "chat" | "tracker" | "booking") => void;
}

export default function ImportExportSection({ lang, setActiveTab }: Props) {
  const isAr = lang === "ar";
  const [activeSubTab, setActiveSubTab] = useState<"import" | "export">("import");

  const importDocs = [
    { titleAr: "بوليصة الشحن الأصلية (B/L)", titleEn: "Original Bill of Lading (B/L)", required: true },
    { titleAr: "الفاتورة التجارية التفصيلية الموثقة", titleEn: "Commercial Invoice (Attested)", required: true },
    { titleAr: "شهادة المنشأ الرسمية (يورو 1 أو جـ1)", titleEn: "Certificate of Origin (Euro-1 / CO)", required: true },
    { titleAr: "كشف التعبئة المفصل للبضائع", titleEn: "Detailed Packing List", required: true },
    { titleAr: "موافقة الاستيراد أو الرقم الإحصائي (ACID)", titleEn: "ACID Cargo Registration (Nafeza)", required: true },
    { titleAr: "التوكيل الملاحي الإلكتروني الموجه لشركتنا", titleEn: "Delivery Order (D/O) Delegation via Nafeza", required: true }
  ];

  const exportDocs = [
    { titleAr: "الفاتورة التصديرية الرسمية المعتمدة", titleEn: "Commercial Export Invoice", required: true },
    { titleAr: "كشف بيان التعبئة والأوزان", titleEn: "Weight & Packing List", required: true },
    { titleAr: "شهادة المنشأ الصادرة من الغرفة التجارية", titleEn: "Chamber of Commerce Origin Certificate", required: true },
    { titleAr: "الشهادات الصحية أو الزراعية (للمنتجات الغذائية)", titleEn: "Phytosanitary/Health Certificate (Agri)", required: false },
    { titleAr: "موافقة الهيئة العامة للرقابة على الصادرات والواردات", titleEn: "GOEIC Export Control Authorization", required: true },
    { titleAr: "شهادة اليورو 1 للتصدير للاتحاد الأوروبي", titleEn: "Euro-1 Export Certificate Setup", required: false }
  ];

  const importSteps = [
    {
      num: "01",
      titleAr: "التسجيل المسبق على منصة نافذة (ACID)",
      titleEn: "Pre-arrival ACID Code Generation",
      descAr: "يقوم المستورد الأجنبي أو المصري برفع بيانات الشحن قبل تحركها بـ 48 ساعة للحصول على كود الشحنة الموحد لمنع ركود الموانئ.",
      descEn: "Submitting preliminary commercial drafts via Egypt's Nafeza single window network."
    },
    {
      num: "02",
      titleAr: "مراجعة المستندات مع مندوب المحمدية",
      titleEn: "Document Audit with Al-Muhammadiyah",
      descAr: "نفحص بدقة جميع الفواتير ومطابقة شهادات اليورو 1 لضمان زيرو جمارك وتجنب أي غرامات تأخير أو تعديل للوائح بالمرفق.",
      descEn: "We thoroughly audit origin letters to secure zero-customs EU exemptions and prevent delays."
    },
    {
      num: "03",
      titleAr: "الحاويات بالفحص الجمركي والمعاينة الفنية",
      titleEn: "Physical Committee Assessment",
      descAr: "حضور طاقم التخليص بالتنسيق مع مهندس المعاينة لمطابقة الشاسيه، المقاسات، والوزن وتنزيل القيمة المقدرة بدقة.",
      descEn: "Accompanying official customs inspectors to matches weights, specifications and values."
    },
    {
      num: "04",
      titleAr: "توريد الرسوم وإصدار إذن التسليم والخروج",
      titleEn: "Duty Settlement & Port Gating Release",
      descAr: "توريد الضرائب (أو إيصال الوديعة للمغتربين) بالبنك، وتفقد الحاويات واستخراج تصاريح البوابة وخروج آمن للوجهة.",
      descEn: "Settling official duties, printing official release logs and shipping to the final destination safely."
    }
  ];

  const exportSteps = [
    {
      num: "01",
      titleAr: "تجهيز الشحنة وحجز الحاوية الفارغة",
      titleEn: "Booking Containers & Pre-Carriage",
      descAr: "نقوم بحجز الحاويات المناسبة (ريفر مبرد للحاصلات، جاف للبضائع) من الخطوط الملاحية بميناء الإسكندرية وسحبها للمصنع فوراً.",
      descEn: "Requesting empty containers (reefers/dry) directly from Maersk, MSC, etc., and inland transport."
    },
    {
      num: "02",
      titleAr: "التبخير ومطابقة المواصفات الدولية",
      titleEn: "Fumigation & Custom Quality Checks",
      descAr: "للحاصلات والأخشاب، نشرف على عمليات التبخير والشهادة الفنية الزراعية لضمان مطابقة الشحنة للمواصفات الصحية للبلد المستورد.",
      descEn: "Managing professional container fumigation, health passes to ensure frictionless foreign harbor entry."
    },
    {
      num: "03",
      titleAr: "إنشاء الشهادة الجمركية الموحدة للتصدير",
      titleEn: "Export Customs Declaration Setup",
      descAr: "تنسيق فواتير الصادرات وإقرار التصدير، والمطابقة بساحة شحن الصادر وتسهيل خروج الحاويات من رصيف الشحن البحري.",
      descEn: "Finalizing custom books, export declaration values, and loading containers securely onto transit vessels."
    },
    {
      num: "04",
      titleAr: "الشحن وإرسال بوالص الشحن والأوراق للعميل",
      titleEn: "Sailing & Docs Despatch",
      descAr: "إصدار بوالص الشحن الأصلية وسرعة إرسالها إلكترونياً وبطرق آمنة لتسهيل استعلام واستلام الطرف المستورد الأجنبي للشحنة.",
      descEn: "Issuing original B/L sheets, sending them safely to buyers overseas to allow painless release."
    }
  ];

  return (
    <div className="bg-[#070e1b]/95 rounded-3xl p-6 md:p-8 border border-blue-900/40 shadow-xl space-y-6 relative overflow-hidden cargo-steel-sheet">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-blue-900/40">
        <div>
          <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <Anchor className="h-4 w-4 text-amber-400" />
            {isAr ? "دائرة الاستيراد والتصدير وجدول البضائع" : "Global Import/Export Logistics Division"}
          </span>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 font-sans">
            {isAr ? "قسم الشحن وعمليات الصادر والوارد" : "Unified Inbound & Outbound Cargo Division"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isAr 
              ? "نعمل على مدار الساعة بموانئ مصر (البحرية، الجوية، والبرية) لتيسير تدفق تجارتكم وإنهاء المعاملات الاستيرادية والتصديرية للبضائع" 
              : "Working round the clock inside all Egyptian sea, air, and dry ports protecting your commerce."}
          </p>
        </div>

        {/* Sub-tabs buttons */}
        <div className="flex items-center gap-1 bg-[#050a14] p-1.5 rounded-xl border border-blue-900/40">
          <button
            onClick={() => setActiveSubTab("import")}
            className={`px-4 py-2 rounded-lg cursor-pointer text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeSubTab === "import" 
                ? "bg-amber-400 text-slate-950 shadow-md" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ArrowDownCircle className="h-4 w-4" />
            <span>{isAr ? "شحنات البضائع الواردة" : "Inbound Imports"}</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab("export")}
            className={`px-4 py-2 rounded-lg cursor-pointer text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeSubTab === "export" 
                ? "bg-amber-400 text-slate-950 shadow-md" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ArrowUpCircle className="h-4 w-4" />
            <span>{isAr ? "قسم الصادرات والجمارك" : "Outbound Exports"}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Col: Step by step operational guide (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-1.5 uppercase">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {activeSubTab === "import" 
                ? (isAr ? "مراحل وخطوات التخليص الجمركي للوارد" : "Inbound Port Custom Clearance Steps")
                : (isAr ? "مراحل وخطوات تصدير الشحنات والبضائع" : "Outbound Cargo Prep & Export Flow")
              }
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(activeSubTab === "import" ? importSteps : exportSteps).map((step, idx) => (
                <div key={idx} className="bg-[#0b1329]/80 border border-blue-900/30 p-5 rounded-2xl hover:border-amber-400/50 transition-all flex items-start gap-4 shadow-sm">
                  <div className="h-10 w-10 font-mono font-black text-sm bg-slate-950 text-amber-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-900/40 shadow-sm">
                    {step.num}
                  </div>
                  <div className="space-y-1 text-right" dir={isAr ? "rtl" : "ltr"}>
                    <h4 className="font-bold text-xs text-white leading-tight">
                      {isAr ? step.titleAr : step.titleEn}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-light">
                      {isAr ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA banner */}
          <div className="bg-gradient-to-r from-blue-950 via-[#07152c] to-blue-950 text-white rounded-2xl p-5 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right" dir={isAr ? "rtl" : "ltr"}>
              <h4 className="font-bold text-xs text-amber-400">
                {activeSubTab === "import"
                  ? (isAr ? "هل لديك حاويات أو بضائع تريد استيرادها بموانئ مصر؟" : "Incoming vehicle or industrial cargo waiting?")
                  : (isAr ? "ترغب في فحص فواتير الصادر وتجهيز الحاويات؟" : "Planning outbound shipping to global ports?")
                }
              </h4>
              <p className="text-[10px] text-slate-300">
                {isAr 
                  ? "تواصل فورا مع مستشاري الجمارك لدينا لمراجعة شهادة منشأ ACID وتفادي التأثير المعاكس لغرامات الأرضية الكبرى."
                  : "We offer zero-tariff audits on agricultural/textile certificates. Secure your quota now."}
              </p>
            </div>

            <button
              onClick={() => setActiveTab("booking")}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-blue-950 font-black text-xs py-2.5 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-md"
            >
              {isAr ? "تقديم مستندات التخليص 📞" : "Apply representation files 📞"}
            </button>
          </div>
        </div>

        {/* Right Col: Required Documents Checklist (4 cols) */}
        <div className="lg:col-span-4 bg-[#0a1224]/90 border border-blue-900/40 p-6 rounded-3xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5 uppercase">
                <FileText className="h-4 w-4 text-amber-400" />
                {isAr ? "مستندات الجمارك الرسمية المطلوبة" : "Required Port Documents"}
              </h4>
              <p className="text-[10px] text-slate-400 leading-normal">
                {isAr 
                  ? "تأمين هذه المستندات يسرع التخليص ويحميك من غرامة الأرضيات بميناء الإسكندرية." 
                  : "Keep these safe to bypass port penalty. Attestation ensures maximum safety."}
              </p>
            </div>

            <div className="space-y-2.5">
              {(activeSubTab === "import" ? importDocs : exportDocs).map((doc, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-[#070e1b] p-3 rounded-xl border border-blue-900/20 shadow-inner">
                  <span className="h-5 w-5 bg-amber-400/15 rounded-full flex items-center justify-center text-amber-400 border border-amber-400/30 font-bold shrink-0 text-[10px]">
                    ✓
                  </span>
                  <div className="text-right" dir={isAr ? "rtl" : "ltr"}>
                    <span className="block font-bold text-[11px] text-slate-200 leading-tight">
                      {isAr ? doc.titleAr : doc.titleEn}
                    </span>
                    <span className="text-[9px] text-amber-400 uppercase font-black tracking-wider">
                      {doc.required ? (isAr ? "إلزامي جمركي" : "Mandatory") : (isAr ? "اختياري" : "Optional Entry")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee stamp */}
          <div className="bg-amber-400/5 border border-amber-400/20 p-3 rounded-xl flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-amber-400 shrink-0" />
            <div className="space-y-0.5 text-right" dir={isAr ? "rtl" : "ltr"}>
              <h5 className="font-bold text-[10.5px] text-amber-300 leading-tight">
                {isAr ? "ضمان المحمدية اللوجستي" : "Al-Muhammadiyah Security"}
              </h5>
              <p className="text-[9px] text-slate-300">
                {isAr 
                  ? "نضمن سرية مستنداتك وتجنيبك رسوم الاحتكار الموانئ بنسبة 100%."
                  : "We safeguard client proprietary lists and avoid demurrage fines."}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
