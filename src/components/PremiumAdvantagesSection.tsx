import React from "react";
import { 
  Zap, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  FileCheck2, 
  Calendar, 
  Scale, 
  Award, 
  HeartHandshake, 
  Anchor, 
  UserCheck, 
  TrendingUp, 
  Sparkles,
  BookmarkCheck
} from "lucide-react";

interface Props {
  lang: "ar" | "en";
}

export default function PremiumAdvantagesSection({ lang }: Props) {
  const isAr = lang === "ar";

  const advantages8 = [
    {
      id: 1,
      icon: <Cpu className="h-6 w-6 text-amber-400 animate-pulse" />,
      titleAr: "تدقيق منصة (نافذة ACI) الموثق بـ 0% خطأ",
      titleEn: "Certified 0% Error 'Nafeza ACI' Portal Auditing",
      badgeAr: "تقنية مسبقة تضمن المعاملة",
      badgeEn: "Pre-checked clearance tech",
      descAr: "نقوم بمطابقة الفاتورة التجارية والباركود مع نظام الجمارك الموحد لمنع رفض الشحنة أو تأخير إصدار كود ACID، مما يضمن تدفقاً جمركياً فورياً عند الرصيف.",
      descEn: "We perform automated verification on purchase codes and commercial drafts under Nafeza to ensure perfect ACID compliance before goods leave the export port."
    },
    {
      id: 2,
      icon: <Calendar className="h-6 w-6 text-amber-400" />,
      titleAr: "تمديد مجاني لفترات الإعفاء من غرامات الحاويات (حتى 21 يوماً)",
      titleEn: "Up to 21 Days Free Shipping Line Demurrage Extension",
      badgeAr: "حصرياً للمحمدية مع كبرى الخطوط",
      badgeEn: "Direct Elite Shipping Alliances",
      descAr: "بفضل شراكتنا الوثيقة مع خطوط Maersk, MSC, CMA CGM، نؤمن فترات سماح إضافية لتخزين الحاويات بفرع الإسكندرية لتجنيبك رسوم الغرامات المتراكمة بالدولار.",
      descEn: "Our direct shipping relationships enable extended free-time container stays at Alexandria yards, giving you extra protection against high maritime delay fines."
    },
    {
      id: 3,
      icon: <UserCheck className="h-6 w-6 text-amber-400" />,
      titleAr: "طاقم فحص فيزيائي معتمد متواجد بساحة مجمع 40",
      titleEn: "On-Ground Professional Inspection Taskforce at Gate 40",
      badgeAr: "معاينة ومطابقة في 3 ساعات",
      badgeEn: "Rapid Chassis Inspection Team",
      descAr: "لا ننتظر دور اللجان العشوائية؛ فريقنا متواجد بصفة دائمة داخل الساحات لمطابقة أرقام الشاسيه والموتور يداً بيد مع الفحص الجمركي لتقليل زمن الانتظار لأقل من 3 ساعات.",
      descEn: "Our in-port officers conduct immediate, physical chassis-and-engine serial matches, cooperating with customs commissions to reduce inspection times."
    },
    {
      id: 4,
      icon: <BookmarkCheck className="h-6 w-6 text-amber-400" />,
      titleAr: "الاستفادة الفورية القصوى والتأكيد لشهادات اليورو 1 (بنسبة 100%)",
      titleEn: "Guaranteed 100% Application of Euro-1 Customs Exemption",
      badgeAr: "تخفيض التعريفة لـ 0%",
      badgeEn: "Zero-Customs Legal Protocol",
      descAr: "التحقق المسبق من صياغة جملة مطابقة المنشأ 'Declaration on Origin' على مستندات التصدير الأوروبية لتفادي رفض شهادة اليورو 1 وسداد كتل جمركية باهظة.",
      descEn: "We audit and certify origin declarations on European import files in advance, ensuring you secure 100% duty-free passage without generic port rejections."
    },
    {
      id: 5,
      icon: <TrendingUp className="h-6 w-6 text-amber-400" />,
      titleAr: "حاسبة تخمين وتنبؤ السعر الجمركي الاستقصائي بدقة 98%",
      titleEn: "Pre-Shipment Predictive Customs Evaluation Score",
      badgeAr: "أمان كامل مسبق",
      badgeEn: "Financial Risk Mitigation",
      descAr: "احصل على كشف دقيق للغاية بالفواتير والضرائب المتوقعة لرسالتك أو مركبتك قبل مغادرتها الميناء الخارجي بناءً على أرشيف جمارك الإسكندرية المحدث يومياً.",
      descEn: "Get a highly precise breakdown of expected custom charges and tariffs before your cargo leaves foreign docks, strictly backed by updated daily portal archives."
    },
    {
      id: 6,
      icon: <Truck className="h-6 w-6 text-amber-400" />,
      titleAr: "تأمين الشحن واللوجستيات لخطوط البضائع العامة والمعدات الثقيلة",
      titleEn: "General Cargo & Heavy Machinery Logistics Escort",
      badgeAr: "إشراف شامل على الرصيف",
      badgeEn: "Direct Seaport Handling",
      descAr: "نوفر روافع متخصصة وفريقاً مخلصاً للإشراف المباشر على تفريغ البضائع العامة غير الحاوية لتجنب الفقد والتلفيات وتخفيف تكاليف الأرضيات بالمخازن المشتركة.",
      descEn: "We provide specialized handlers and direct supervisors during the unloading of physical bulk general cargo to eliminate delays and warehouse fees."
    },
    {
      id: 7,
      icon: <HeartHandshake className="h-6 w-6 text-amber-400" />,
      titleAr: "متابعة وتأهيل ملفات ذوي الهمم وتخليصها بأمان قانوني",
      titleEn: "Flawless Medical Exemption & Companion File Clearance",
      badgeAr: "رعاية قانونية مستحقة",
      badgeEn: "Determined Persons Companion",
      descAr: "ننسق الكشف الطبي واستقبال الودائع البنكية وتسهيل الإفراج عن سيارات ذوي الهمم دون لجوء لوسطاء العمولات المستنزفة مع الالتزام باللوائح الطبية الصارمة.",
      descEn: "Complete direct logistics support for companions and medical condition cars, including board procedures and custom approvals."
    },
    {
      id: 8,
      icon: <Award className="h-6 w-6 text-amber-400" />,
      titleAr: "إخراج واستلام فوري لدفتر التربتك بمقر الإسكندرية",
      titleEn: "Instant Triptyque Booklet & Customs Clearance Dispatch",
      badgeAr: "سرعة في يوم واحد",
      badgeEn: "Triptyque Custom Guarantee",
      descAr: "إصدار وتخليص مؤقت سريع لتسهيل تنقلات المصريين المغتربين وزائري مصر الأجانب بسياراتهم الشخصية عبر تيسير كفالات أندية السيارات الرسمية.",
      descEn: "We enable immediate booklet applications and temporary customs entry validation for expat or tourist cars entering Egypt under triptyque parameters."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn" id="premium-advantages-matrix">
      
      {/* Dynamic Visual Section Introductions */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" style={{ animationDuration: "10s" }} />
          <span>{isAr ? "لماذا يخشى المنافسون فكر المحمدية؟" : "Eslam Mohamed's Competitor Shield Matrix"}</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight">
          {isAr ? "8 مزايا ريادية حصرية تنفرد بها مؤسسة المحمدية" : "8 Pioneer Advantages Set Us Apart in Egypt Customs"}
        </h2>
        
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans font-light">
          {isAr 
            ? "ندمج الخبرة الميدانية بالساحات البرية مع حلول رقمية وقانونية تضمن حماية أموالك بالكامل بساحات جمارك الإسكندرية. تفاصيل قمنا بصياغتها خصيصاً لجذب كبار المستوردين وإبهار الأوساط اللوجستية."
            : "We combine decades of seaport ground-force logic with dynamic predictive legal expertise to ensure zero overcharges and expedited port exits at Alexandria seaport."}
        </p>
      </div>

      {/* Grid of 8 Premium Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {advantages8.map((adv) => (
          <div 
            key={adv.id}
            id={`advantage-card-${adv.id}`}
            className="group bg-[#091122]/80 rounded-3xl p-6 border border-blue-900/40 hover:border-amber-400/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 text-right flex flex-col justify-between relative overflow-hidden cargo-steel-sheet"
          >
            {/* Corner numbers background */}
            <div className="absolute top-4 left-6 text-5xl font-black text-slate-800/15 pointer-events-none font-mono group-hover:text-amber-400/10 transition-colors">
              0{adv.id}
            </div>

            <div className="space-y-4 relative z-10 text-right" dir={isAr ? "rtl" : "ltr"}>
              {/* Icon layout */}
              <div className="h-12 w-12 rounded-2xl bg-[#050a14] border border-blue-900/40 flex items-center justify-center text-amber-400 group-hover:bg-slate-900 group-hover:border-amber-400/40 transition-all shadow-md">
                {adv.icon}
              </div>

              <div className="space-y-2">
                <span className="inline-block text-[9px] font-bold tracking-wider uppercase text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                  {isAr ? adv.badgeAr : adv.badgeEn}
                </span>

                <h3 className="font-extrabold text-xs md:text-sm text-white leading-snug font-sans group-hover:text-amber-300 transition-colors">
                  {isAr ? adv.titleAr : adv.titleEn}
                </h3>

                <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-light">
                  {isAr ? adv.descAr : adv.descEn}
                </p>
              </div>
            </div>

            {/* Micro aesthetic element */}
            <div className="h-1 w-0 bg-amber-400 mt-6 rounded group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>

      {/* Trust & Conversion bar underneath */}
      <div className="bg-gradient-to-r from-blue-950 via-[#07152c] to-blue-900 p-5 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-900/50 shadow-2xl relative overflow-hidden cargo-steel-sheet">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="h-10 w-10 bg-amber-400 text-blue-950 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
            🥇
          </div>
          <div className="text-right">
            <span className="block font-black text-xs text-amber-400">{isAr ? "ضمان المحمدية الفضي والذهبي للجمارك" : "Al-Muhammadiyah Golden Shield Customs Protection"}</span>
            <span className="block text-[10.5px] text-slate-300 mt-0.5 leading-normal">{isAr ? "إذا توقفت سيارتك بالمجمع لخلل بأوراق قمنا بمراجعتها وتأكيدها، نتحمل غرامات الأرضية بالكامل!" : "We fully absorb container port demurrage storage fines if caused directly due to document audit oversights."}</span>
          </div>
        </div>

        <a
          href="https://wa.me/201274833844?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%B3%D8%AA%D8%A7%D8%B0%20%D8%A5%D8%B3%D9%84%D8%A7%D9%85%20%D9%85%D8%AD%D9%85%D8%AF%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%AA%D9%81%D8%B9%20%D8%A7%D9%84%D9%85%D8%B2%D8%A7%D9%8A%D8%A0%20%D8%A7%D9%84%D9%85%D9%85%D8%AA%D8%A7%D8%B2%D8%A9%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D8%A8%D9%84%D9%8A%D8%A9%20%D9%84%D8%AA%D8%AE%D9%84%D9%8A%D8%B5%2520%D8%B4%D8%AD%D9%86%D8%AA%D9%8I%20%D9%85%D8%AC%D8%A7%D9%86%D8%A7%D9%8B."
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-blue-950 font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md transition-all whitespace-nowrap relative z-10"
        >
          {isAr ? "تفعيل المزايا الثمانية بالمجمع مجاناً ⚡" : "Activate Your Premium Shield Free ⚡"}
        </a>
      </div>

    </div>
  );
}
