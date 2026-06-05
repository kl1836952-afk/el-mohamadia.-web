import React, { useState } from "react";
import {
  Award,
  MapPin,
  Layers,
  Anchor,
  FileCheck,
  Scale,
  Sparkle,
  ShieldCheck,
  HelpCircle,
  Ship,
  Calendar,
  BadgeHelp,
  Flame,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

interface Props {
  lang: "ar" | "en";
  localRecords?: any[];
  onRecordUpdated?: (record: any) => void;
}

export default function TransactionTracker({ lang, localRecords, onRecordUpdated }: Props) {
  const isAr = lang === "ar";
  const [activePort, setActivePort] = useState<number>(0);

  const stats = [
    { value: "25+", labelAr: "عاماً من العطاء والخبرة الجمركية", labelEn: "Years of Customs Leadership" },
    { value: "20k+", labelAr: "سيارة وبضائع مفرج عنها بنجاح", labelEn: "Vehicles Successfully Cleared" },
    { value: "0%", labelAr: "نسبة الأخطاء أو غرامات الأرضية", labelEn: "Error / Demurrage Port Rate" },
    { value: "5/5", labelAr: "تقييم الرضا من كبار المستوردين", labelEn: "Satisfied Client Assessment" }
  ];

  const corePillars = [
    {
      icon: <Award className="h-6 w-6 text-amber-400" />,
      titleAr: "خبرة 25 عامًا في جميع الموانئ المصرية",
      titleEn: "25+ Years of All Egyptian Ports Domination",
      descAr: "منذ عام 2001، وشركتنا تمثل عموداً راسخاً في أروقة الجمارك بموانئ الإسكندرية، الدخيلة، دمياط، بورسعيد، السويس، وقرية البضائع بمطار القاهرة. نفهم كواليس التثمين والمعاينة ونحمي شحنتك بذكاء.",
      descEn: "Since 2001, we have stood tall inside harbor offices across Alexandria, Dekheila, Damietta, Port Said, Suez, and Cairo Cargo Village. We master the subtleties of audit scales to safeguard your freight."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-amber-400" />,
      titleAr: "استيراد وتخليص السيارات بمختلف الأنظمة",
      titleEn: "Mastery of Vehicle Imports & Compliance",
      descAr: "نحن الوجهة الأولى بالمحراب الجمركي لفك طلاسم جمارك السيارات. نتعامل بكفاءة مطلقة مع مبادرة المصريين بالخارج (ودائع المغتربين)، سيارات ذوي الهمم (القومسيون الطبي)، وسيارات المالك الأول والهايبرد والكهربائية بالكامل.",
      descEn: "Your absolute standard for automotive clearances. We confidently maneuver Expatriate initiatives, complex disability Commission guidelines, first-owner rules, hybrid discounts, and fully electric green vehicles."
    },
    {
      icon: <Layers className="h-6 w-6 text-amber-400" />,
      titleAr: "إصدار وتخليص دفتر التربتك الدولي (Triptyque)",
      titleEn: "Official International Triptyque Booklets Issuance",
      descAr: "نحن متميزون في إصدار وتخليص دفاتر التربتك الخاصة بالإفراج المؤقت لسيارات السياح والمغتربين القادمين لقضاء العطلات بمصر. ننهي الإجراءات فوراً مع نادي السيارات والرحلات المصري ونعفيك من الودائع المالية الباهظة.",
      descEn: "Renowned experts in issuing and wrapping temporary-entry Triptyque books for companion or expat tourist vehicles in Egypt. We manage direct integrations with the Egyptian Automobile Club in record hours."
    }
  ];

  const timelineSteps = [
    { year: "2001", titleAr: "تأسيس مكتب الجمارك بالإسكندرية", titleEn: "Alex Customs Bureau Launch", descAr: "بداية العمل الرسمي من مجمع جمارك السيارات 40 بميناء الإسكندرية لتثمين ورصد الشحنات.", descEn: "Starting direct representational services inside complex 40 of Alexandria seaport." },
    { year: "2007", titleAr: "التوسع لبورسعيد ودمياط", titleEn: "Expanding to Port Said & Damietta", descAr: "إنشاء فريق مخصص لإدارة حاويات البضائع والرسائل الاستيرادية والمواد الخام وصوامع الغذاء.", descEn: "Forming dedicated squads to manage general industrial cargo and grain silos." },
    { year: "2015", titleAr: "الريادة في التخليص الدبلوماسي والتربتك", titleEn: "Pioneering Diplomatic & Triptyque", descAr: "اعتماد مكتبنا لتمثيل البعثات الدبلوماسية وإصدار دفاتر التربتك للسيارات القادمة عبر ميناء السويس.", descEn: "Winning consulate trust and managing swift temporary booklets for luxury custom imports." },
    { year: "2020", titleAr: "التحول الرقمي المكامل مع (نافذة)", titleEn: "Nafeza Integration Champion", descAr: "تنصيب أنظمة التسجيل المسبق للشحنات (ACID) والتعرف التلقائي على المعايير الجمركية بدقة.", descEn: "Deploying deep pre-arrival Nafeza software interfaces to protect our clients from delays." },
    { year: "2026", titleAr: "الريادة بالذكاء الاصطناعي والدعم المباشر", titleEn: "2026 AI Advisor Integration", descAr: "إطلاق المساعد الجمركي الذكي المبني على جميني لتوفير استعلامات مجانية فورية للشعب والدول العربية.", descEn: "Unveiling modern Gemini AI structures allowing citizens to view exact tariff rates in milliseconds." }
  ];

  const managedPorts = [
    { nameAr: "ميناء الإسكندرية البحري", nameEn: "Alexandria Seaport", detailsAr: "موقعنا الرئيسي وبوابتنا الكبرى لإفراج السيارات بـ مجمع 40 الشهير.", detailsEn: "Our headquarters and central base for vehicle valuations inside Complex 40." },
    { nameAr: "ميناء بورسعيد (شرق وغرب)", nameEn: "Port Said Seaport", detailsAr: "الممر الملاحي العالمي لخدمات العبور السريع وتخليص البضائع الترنزيت والمنطقة الحرة.", detailsEn: "Global waterway nodes for fast-transit clearing and free trade zones." },
    { nameAr: "ميناء دمياط", nameEn: "Damietta Seaport", detailsAr: "بوابتنا لتخليص المواد الخام، الحديد والصلب، الحاصلات الزراعية، والجرارات الصديقة للبيئة.", detailsEn: "Specialized ports clearing construction steel, tractors, and agricultural items." },
    { nameAr: "ميناء السويس والأدبية", nameEn: "Suez & Adabiya Seaports", detailsAr: "تسيير إجراءات الاستيراد والتصدير من دول آسيا والخليج العربي مع عمليات التبخير والتعقيم.", detailsEn: "Executing seafarers and cargo clearing from Gulf nations and East Asia." },
    { nameAr: "مطار القاهرة (قرية البضائع)", nameEn: "Cairo Air Cargo", detailsAr: "الفناء الجوي الأساسي لتسهيل خروج الشحنات المستعجلة، الإلكترونيات، والأجهزة الجراحية.", detailsEn: "Air cargo gates releasing medical diagnostics and urgent electronics." },
    { nameAr: "قرية بضائع مطار برج العرب", nameEn: "Borg El Arab Air Cargo", detailsAr: "تخليص جمركي سريع لكافة الشحنات الجوية والطبية", detailsEn: "Fast customs clearance for all air and medical cargo" },
  ];

  return (
    <div id="experience-showcase-container" className="space-y-10 animate-fadeIn" dir={isAr ? "rtl" : "ltr"}>

      {/* Top Banner Display */}
      <div className="bg-gradient-to-br from-blue-950 via-[#0a1e36] to-blue-950 text-white rounded-3xl p-6 md:p-8 border border-blue-900/40 relative overflow-hidden text-right shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-right">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-extrabold px-3 py-1 rounded-full text-[10px] tracking-wide uppercase">
              <Award className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>{isAr ? "سجل وطني عريق بالخبرة الجمركية" : "Prestigious Record of Port Clearances"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight font-sans">
              {isAr ? "دائرة الخبرات والملاحة الجمركية المتكاملة" : "Consolidated Experience & Port Navigation"}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed font-sans">
              {isAr
                ? "تتميز شركتنا بالمعرفة الراسخة بآليات مصلحة الجمارك المصرية وقرارات وزارة المالية بمختلف موانئ الجمهورية. أكثر من ربع قرن من العطاء والتواصل المباشر يضمن لشحنتك وتجارتك خروجاً آمناً بدون غرامات تأخير أو ارتباكات قانونية."
                : "Our institution combines standard compliance structures with a quarter-century of direct proximity with ports inspectors. Secure your cars, spare parts or foods with our audited cargo release lines."}
            </p>
          </div>
          <div className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 rounded-2xl flex items-center justify-center border border-amber-350 shadow-xl self-start md:self-center shrink-0">
            <Anchor className="h-8 w-8 md:h-10 md:w-10 stroke-[2] animate-bounce" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-blue-900/30 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-xl md:text-2xl font-black text-amber-400 font-sans">
                {stat.value}
              </span>
              <span className="block text-[10px] md:text-xs text-slate-300 font-semibold">
                {isAr ? stat.labelAr : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* THREE CORE PILLARS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {corePillars.map((pillar, idx) => (
          <div key={idx} className="bg-[#070e1b]/95 rounded-3xl p-6 border border-blue-900/40 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="h-12 w-12 bg-slate-950 border border-blue-900/30 rounded-2xl flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-sm md:text-base font-black text-white leading-tight font-sans text-right" dir={isAr ? "rtl" : "ltr"}>
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-light text-right" dir={isAr ? "rtl" : "ltr"}>
                {isAr ? pillar.descAr : pillar.descEn}
              </p>
            </div>
            <div className="pt-3 border-t border-blue-900/30 flex items-center gap-1.5 text-[10.5px] font-black text-amber-400 uppercase tracking-wider justify-end">
              <span>{isAr ? "إدارة وتوقيع أ/ إسلام محمد" : "CEO Eslam Mohamed Desk"}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
          </div>
        ))}
      </div>

      {/* MANAGED PORTS GRID Showcase */}
      <div className="bg-[#070e1b]/95 rounded-3xl border border-blue-900/40 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="space-y-1.5 text-right">
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 block">
            {isAr ? "شبكة عملياتنا الكاملة بالجمهورية" : "Our Complete National Operational Grid"}
          </span>
          <h3 className="text-lg md:text-xl font-black text-white leading-tight font-sans">
            {isAr ? "نتعامل ونخلص المعاملات بكافة الموانئ والمنافذ الذكية" : "Providing direct clearance inside all major terminals"}
          </h3>
          <p className="text-xs text-slate-400 font-sans max-w-2xl">
            {isAr
              ? "نمتلك طواقم تخليص جمركي ذوي سوابق مشرفة ومستمرون يومياً في إنهاء إجراءات معاينة الكشف وسداد الرسوم وإصدار الجوازات بمختلف منافذ مصر."
              : "We deploy experienced clearance officers within all terminals to support continuous monitoring of physical committee inspections & bill auditing."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" dir={isAr ? "rtl" : "ltr"}>
          {managedPorts.map((port, idx) => {
            const isSelected = activePort === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActivePort(idx)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative ${isSelected
                  ? "bg-[#0b1c33] border-amber-400 text-white shadow-xl transform scale-[1.02]"
                  : "bg-[#050a14] border-blue-900/20 text-slate-300 hover:border-blue-500/40"
                  }`}
              >
                <div className="space-y-2">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-400">
                    0{idx + 1}
                  </div>
                  <h4 className="font-extrabold text-xs leading-snug text-white">
                    {isAr ? port.nameAr : port.nameEn}
                  </h4>
                  <p className="text-[10px] leading-relaxed font-sans font-light">
                    {isAr ? port.detailsAr : port.detailsEn}
                  </p>
                  <div className="pt-3 flex justify-end">
                    <span className={`text-[9px] font-bold ${isSelected ? "text-amber-400" : "text-blue-400"}`}>
                      {isAr ? "نشط وميداني" : "Active"} •
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* COLORFUL TIMELINE GRAPHIC */}
        <div className="bg-[#070e1b]/95 rounded-3xl border border-blue-900/40 p-6 md:p-8 space-y-6 shadow-xl">
          <h3 className="text-md md:text-lg font-black text-white text-right leading-tight font-sans">
            {isAr ? "مسيرتنا الجمركية وسجل العطاء (2001 - 2026)" : "Our Timeline & Milestone Record (2001 - 2026)"}
          </h3>
          <div className="relative pr-4 border-r md:border-r-0 md:border-t border-blue-900/40 pt-4 md:pt-8 flex flex-col md:flex-row justify-between gap-6 md:gap-4 text-right" dir={isAr ? "rtl" : "ltr"}>
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative md:w-1/5 space-y-2 text-right">
                <div className="hidden md:block absolute -top-11 right-1/2 translate-x-1/2 h-5 w-5 rounded-full bg-slate-950 border-4 border-amber-400 flex items-center justify-center shadow" />
                <div className="pt-1.5 md:pt-0">
                  <span className="inline-block font-mono font-black text-xs text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 mb-1">
                    {step.year}
                  </span>
                  <h4 className="font-extrabold text-xs text-white leading-tight">
                    {isAr ? step.titleAr : step.titleEn}
                  </h4>
                  <p className="text-[10px] text-slate-350 leading-normal font-sans font-light">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTIONABLE CARD */}
        <div className="bg-gradient-to-r from-blue-950 via-[#0a1e36] to-blue-950 text-white rounded-3xl p-6 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-right" dir={isAr ? "rtl" : "ltr"}>
            <h4 className="font-extrabold text-sm text-amber-400 flex items-center gap-1.5 justify-center sm:justify-start">
              <Flame className="h-4 w-4 animate-bounce text-amber-400" />
              <span>{isAr ? "ثق بمندوبي المحمدية لتسهيل استيراد سيارتك أو بضائعك" : "Inbound Expatriate or Tourist vehicles waiting?"}</span>
            </h4>
            <p className="text-xs text-slate-300">
              {isAr
                ? "تفادَ الرسوم الاحتكارية وحل كافة قضايا التثمين قبل خروج سيارتك من المركب بميناء الإسكندرية."
                : "Let our certified agents inspect your EUR.1 origin exemption forms beforehand."}
            </p>
          </div>
          <a
            href="https://wa.me/201274833844"
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-blue-950 font-black text-xs py-3.5 px-6 rounded-2xl transition-all whitespace-nowrap cursor-pointer shadow-md flex items-center gap-2"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>{isAr ? "افتح استشارة ومعاينة فورية مع أستاذ إسلام 📞" : "Request Free Inspection Desk 📞"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}