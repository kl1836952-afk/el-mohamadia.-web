import {
  Building2,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle2,
  Anchor
} from "lucide-react";

interface Props {
  lang: "ar" | "en";
}

export default function AboutCompanySection({ lang }: Props) {
  const isAr = lang === "ar";

  const advantages = [
    {
      titleAr: "موقعنا الاستراتيجي بالميناء",
      titleEn: "Strategic Seaport Location",
      descAr: "يتواجد مقرنا الرئيسي مباشرة بقلب الحركة اللوجستية في 5 شارع النصر أمام باب 10 للإسكندرية، مما يسمح لطاقمنا بالتحرك الفوري والتواجد الفعلي في دقيقة واحدة بساحات المعاينة والفحص ومجمع السيارات بالميناء.",
      descEn: "Located directly opposite Port Gate 10 at 5 El-Nasr Street, allowing our on-ground team to reach physical inspection docks and Customs Complex 40 in under 60 seconds."
    },
    {
      titleAr: "الخبرة القانونية واللوائح",
      titleEn: "Regulatory & Legal Experts",
      descAr: "قوانين الاستيراد وتخمين الجمارك والتعرفة متغيرة بشكل شبه يومي؛ نحن فخورون بإلمامنا الكامل بكافة نصوص قانون الجمارك المصري ولائحة مصلحة الجمارك وما يستجد من اتفاقيات إعفاء وتفضيل المنشأ الأوروبي (يورو 1)",
      descEn: "Customs and pricing laws change daily. We possess comprehensive mastery over Egyptian Customs Law, Nafeza single-window system, and origin tax-waiver protocols like Euro-1."
    },
    {
      titleAr: "حماية تامة من غرامات الأرضيات",
      titleEn: "Complete Demurrage Safeguard",
      descAr: "من أولى أولوياتنا توفير المال للعميل؛ نقوم بتدقيق وتنسيق الفواتير قبل شحن بضائعك لضمان عدم توقف الشحنة بالساحة الجمركية مطلقاً، مما يضمن التخليص خلال 48 ساعة فقط وتجنب غرامات الأرضيات المرتفعة.",
      descEn: "We perform proactive document audits prior to container loading, ensuring swift release within 48 hours to avoid severe port congestion and storage fees."
    },
    {
      titleAr: "إدارة مباشرة من أ/ إسلام محمد",
      titleEn: "Direct Supervision by Eslam Mohamed",
      descAr: "نحن لا نعتمد على وسطاء أو مخلصين مستجدين؛ كافة الملفات والتقديرات والاتفاقيات تتم بمتابعة وتوقيع مباشر من الأستاذ إسلام محمد شخصياً لضمان النزاهة التامة والأمان لشركائنا.",
      descEn: "No third-party brokers. Every estimate, document check, and negotiation is personally overseen and authorized by Mr. Eslam Mohamed to maintain absolute business integrity."
    }
  ];

  const coreServicesDetailed = [
    {
      titleAr: "مبادرة المغتربين لسيارات المصريين بالخارج",
      titleEn: "Automotive Expatriate Scheme & MoF Deposits",
      descAr: "نحن الوكلاء الأكثر خبرة بميناء الإسكندرية لإنهاء شحنات سيارات مبادرة المغتربين المعفاة 100% مقابل الوديعة الدولارية. نوجهك لرفع المستندات على تطبيق وزارة المالية للجمارك، ومطابقة الكشوفات والتحقق من طراز وسرد السيارة عند الرصيف وصرف رخص القيادة.",
      descEn: "We are the leading agency inside Alexandria seaport processing expatriate duty-free car imports against the MoF deposit. We guide you step-by-step from Nafeza online registration to vehicle matching.",
      pointsAr: [
        "تدقيق وتطابقة قيمة وديعة البنك طبقاً لمحرك الـ CC والمواصفات المعتمدة.",
        "تمثيل فوري أمام لجان مصلحة الجمارك المصرية لإنهاء الموافقات الاستيرادية.",
        "تسريع المعاينة الفيزيائية ومطابقة الأوراق ."
      ],
      pointsEn: [
        "Auditing dollar bank guarantees based on accurate engine capacities (CC) & options.",
        "Active face-to-face registration with port inspectors to seal import approvals.",
        "Expedited port-gating and terminal transit matching certificates of compliance."
      ]
    },
    {
      titleAr: "نظام التربيتيك (الإفراج الجمركي المؤقت للسيارات)",
      titleEn: "Triptyque Customs Clearing (Temporary Import Passports)",
      descAr: "للأجانب والسياح والمصريين المقيمين بالخارج الراغبين بدخول سياراتهم الخاصة لقضاء العطلة في مصر بدون دفع جمارك كاملة. نقوم بإتمام إجراءات الإفراج المؤقت عبر دفتر التربيتيك الدولي بالتنسيق مع نادي السيارات والرحلات المصري وإصدار لوحات المرور المؤقتة لمدد تصل إلى 6 أشهر.",
      descEn: "For tourists, guests, and returning citizens wishing to enter their vehicles inside Egypt temporarily without heavy duties. We process the Triptyque international car passport in coordination with ATCE Egypt.",
      pointsAr: [
        "مراجعة صلاحيات دفتر التربتيك الدولي والشروط القانونية من النادي الدولي المعتمد.",
        "إنهاء خطابات الضمان وبطاقات الإفراج الجمركية المؤقتة بمرور الموانئ فورا.",
        "متابعة خروج وإعادة تصدير السيارة أو تمديد صلاحية البقاء جمركياً بدون أي مخالفات."
      ],
      pointsEn: [
        "Reviewing the validity score of International car passports and triptyque booklets.",
        "Securing transit clearances and temporary license plate approvals inside Port Traffic Police.",
        "Ensuring seamless security deposit releases on outbound shipping or renewals."
      ]
    },
    {
      titleAr: "استيراد مالك أول وسيارات جديدة (زيرو)",
      titleEn: "First Owner Guidelines & Year Model Direct Import",
      descAr: "من اللوائح الأساسية لجمهورية مصر العربية اشتراط أن يكون مستورد السيارات المستعملة هو المالك الأول لها في سنة الموديل. نساعدك في التحقق من شروط الفاتورة وباقي الأوراق باسم صاحب الشحنة مباشرة وقرارات المرور للترخيص بالبلاد مع تفعيل إعفاء اليورو 1 الأوروبي.",
      descEn: "For importing used cars, Egyptian laws mandate that the importer must be the first owner in the manufacturing model-year. We audit your purchasing invoices and secure Euro-1 0% tariff exemptions cleanly.",
      pointsAr: [
        "مطابقة الفواتير والتحقق من تاريخ الشراء ببلد التصدير (أوروبا، الخليج، أمريكا).",
        "مراجعة شهادة يورو 1 لتطبيق الإعفاء الكامل من الرسوم الجمركية وضريبة القيمة المضافة.",
        "إتمام معاملات الجمارك وبنود التعرفة لشحن سيارتك موديل السنة."
      ],
      pointsEn: [
        "Validating purchasing history records from the export country to verify dates.",
        "Inspecting Euro-1 certs to safely exploit 0% customs duties without regulatory setbacks.",
        "Preparing the first owner file registration under Nafeza portal in seconds."
      ]
    },
    {
      titleAr: "تخليص البضائع العامة والمعاملات الاستيرادية والتصديرية",
      titleEn: "General Cargo Logistics & Industrial Port Clearances",
      descAr: "بجانب تخصصنا الرائد في قطاع السيارات، نمتلك أقوى السجلات في تخليص الرسائل الاستيرادية والتجارية، المواد الخام، الحاويات الكاملة والمشتركة (FCL/LCL)، الطرود والماكينات الصناعية، وخطوط الإنتاج بميناء الإسكندرية ومختلف الموانئ المصرية.",
      descEn: "Alongside our premier automotive line, we are fully licensed to clear commercial bulk cargo, machinery, container shipping imports, and production plants across all major Egyptian sea ports.",
      pointsAr: [
        "تنسيق إجراءات التسجيل المسبق والحصول المباشر على كود الشحنة (ACID).",
        "تنسيق الفحص الفني للحاصلات الزراعية والمواد الطبية لضمان سلامتها وصرف الموافقات.",
        "اتحاد وإنجاز بوالص الشحن والأوزان وتسهيل سحب وربط الحاويات بساحة الشحن البحرية."
      ],
      pointsEn: [
        "Managing pre-arrival ACID code generation directly under computerized Nafeza portals.",
        "Interfacing with agriculture, food safety, and GOEIC inspectors for compliance passes.",
        "Arranging FCL/LCL port logistics, container grounding, and securing trailers to factories."
      ]
    }
  ];

  return (
    <div className={`space-y-12 ${isAr ? "text-right" : "text-left"} animate-fadeIn`} dir={isAr ? "rtl" : "ltr"}>

      {/* Visual Corporate Banner Header */}
      <div className="bg-gradient-to-br from-blue-950 via-[#0a1e36] to-blue-950 text-white rounded-3xl p-8 md:p-12 border border-blue-900/40 relative overflow-hidden shadow-2xl relative" id="about-corporate-banner">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className={`max-w-4xl space-y-4 relative z-10 ${isAr ? "text-right" : "text-left"}`}>
          <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-350 font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-wide">
            <Building2 className="h-4 w-4 text-amber-450 animate-pulse" />
            <span>{isAr ? "العراقة والريادة الجمركية بالمرتبة الأولى" : "The Highest Standard of Customs Leadership"}</span>
          </span>

          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight font-sans">
            {isAr ? "مؤسسة المحمدية للتخليص والملاحة الجمركية" : "Al-Muhammadiyah Customs & Logistics Agency"}
          </h1>

          <p className="text-xs md:text-sm text-slate-300 font-sans font-light leading-relaxed">
            {isAr
              ? "نحن وكالة جمركية مصرية رائدة ومعتمدة، نتواجد مباشرة أمام بوابات ميناء الإسكندرية. تأسست شركتنا على معايير النزاهة المطلقة، السرعة الفائقة، والتدقيق الجمركي الفني بساحات الموانئ. تحت إدارة وإشراف مباشر من الأستاذ إسلام محمد، نمثل الدرع المالي والأمان القانوني للمواطنين المغتربين والشركات الاستيرادية على حد سواء."
              : "We are a premier licensed customs clearing house headquartered at Alexandria Port. Founded on principles of strict auditing, outstanding logistics speed, and legal integrity, our agency represents the secure portal for both corporate importers and returning expats under the responsive direct supervision of CEO Eslam Mohamed."}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-400">
            <div className="flex items-center gap-2 bg-[#050a14] border border-blue-900/30 px-3.5 py-2 rounded-xl">
              <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{isAr ? "الموقع الميداني: 5 شارع النصر، أمام باب 10، الإسكندرية" : "Official HQ: 5 El-Nasr St, Opposite Port Gate 10, Alexandria"}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#050a14] border border-blue-900/30 px-3.5 py-2 rounded-xl">
              <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
              <span>{isAr ? "المكتب التنفيذي لأ/ إسلام محمد: 01274833844" : "CEO Direct Hotline: 01274833844"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Visual Stats Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { labelAr: "الخبرة الجمركية المتراكمة", valueAr: "أكثر من 25 سنة", labelEn: "Years of Active Port Presence", valueEn: "25+ Years" },
          { labelAr: "إجمالي الرسائل المستخلصة", valueAr: "20,000+ جمرك سيارة", labelEn: "Total Handled Transactions", valueEn: "20k+ Vehicles" },
          { labelAr: "غرامات الركود والانتظار بالساحة", valueAr: "0% غرامات أرضية", labelEn: "Demurrage Penalties Score", valueEn: "0% Fine Rate" },
          { labelAr: "معدل الرضا والاتصال المباشر", valueAr: "100% نجاح وتسهيل", labelEn: "Customer Satisfaction Rate", valueEn: "100% Secured" }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#070e1b]/95 border border-blue-900/30 p-5 rounded-3xl text-center space-y-1 shadow-md">
            <span className="block text-amber-400 font-extrabold text-[10px] uppercase tracking-wider">{isAr ? item.labelAr : item.labelEn}</span>
            <span className="block text-base md:text-lg font-black text-white font-sans">{isAr ? item.valueAr : item.valueEn}</span>
          </div>
        ))}
      </div>

      {/* CORE ADVANTAGES SECTION */}
      <div className="bg-[#070e1b]/95 rounded-3xl p-6 md:p-8 border border-blue-900/40 shadow-xl space-y-6">
        <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2 font-sans pb-3 border-b border-blue-900/30">
          <Award className="h-5 w-5 text-amber-400" />
          <span>{isAr ? "ركائز التميز في المحراب الجمركي للمستوردين" : "Why Choose Our Port Logistics Agency?"}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {advantages.map((adv, idx) => (
            <div key={idx} className="bg-[#0a1329]/80 border border-blue-900/20 p-5 rounded-2xl flex items-start gap-4 transition-all hover:border-amber-400/40">
              <div className="h-10 w-10 bg-slate-950 text-amber-400 border border-blue-900/30 rounded-xl flex items-center justify-center shrink-0 shadow-sm text-xs font-black font-mono">
                0{idx + 1}
              </div>
              <div className={`space-y-1.5 ${isAr ? "text-right" : "text-left"}`} dir={isAr ? "rtl" : "ltr"}>
                <h4 className="font-extrabold text-xs text-white">
                  {isAr ? adv.titleAr : adv.titleEn}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-light">
                  {isAr ? adv.descAr : adv.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETAILED SERVICE SPECS */}
      <div className="space-y-6">
        <div className={`space-y-1 ${isAr ? "text-right" : "text-left"}`}>
          <span className="text-[10px] text-amber-400 uppercase font-black tracking-widest block">{isAr ? "تفاصيل تخصصاتنا الاحترافية" : "Our Specialized Port Clearance Verticals"}</span>
          <h2 className="text-xl md:text-2xl font-black text-white font-sans">{isAr ? "قائمة التخصُّصات الاستيرادية والتخليص بالتفصيل" : "In-Depth View of Our Automotive & Commercial Customs Portfolios"}</h2>
          <p className="text-xs text-slate-400 font-sans max-w-3xl">{isAr ? "نقدم لك دليلاً كاملاً لكافة الأنظمة الجمركية التي نتولاها بموجب ممارسة مستمرة بالموانئ وبتفاصيل دقيقة تحمي حقوقك." : "We manage each step under direct regulatory standards and custom MoF interfaces."}</p>
        </div>

        <div className="space-y-6">
          {coreServicesDetailed.map((service, idx) => (
            <div key={idx} className="bg-[#070e1b]/95 rounded-3xl border border-blue-900/40 p-6 md:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Left Column Description (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 font-mono font-black text-xs bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-black text-xs md:text-sm text-white leading-tight font-sans">
                      {isAr ? service.titleAr : service.titleEn}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-light">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                </div>

                {/* Company official seal tagline */}
                <div className="bg-[#050a14] border border-blue-900/20 p-3 rounded-xl flex items-center gap-2 text-[10px] text-slate-350 font-medium">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>
                    {isAr
                      ? "يخضع الملف للتدقيق الكامل تحت إشراف أستاذ إسلام محمد قبل الحضور بالمجمع"
                      : "File audited and cleared under CEO Eslam Mohamed before presenting to port officers."}
                  </span>
                </div>
              </div>

              {/* Right Column Core Checkpoint lists (5 cols) */}
              <div className="lg:col-span-5 bg-[#0b1329]/80 border border-blue-900/30 p-5 rounded-2xl flex flex-col justify-center space-y-3">
                <h4 className="font-extrabold text-[10px] text-amber-305 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 font-bold" />
                  <span>{isAr ? "آلية العمل وأوراق الفحص التي ننجزها" : "Operations & Verification Routines"}</span>
                </h4>

                <div className={`space-y-2 ${isAr ? "text-right" : "text-left"}`}>
                  {(isAr ? service.pointsAr : service.pointsEn).map((pt, jdx) => (
                    <div key={jdx} className="flex items-start gap-2 text-xs font-semibold text-slate-250">
                      <span className="text-amber-450 text-[11px] font-black shrink-0 mt-0.5">✓</span>
                      <span className="leading-tight font-sans font-light">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* OFFICIAL ADDRESS SECTION & GOOGLE LOCATION MAP BANNER */}
      <div className="bg-[#070e1b]/95 rounded-3xl p-6 md:p-8 border border-blue-900/40 shadow-xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Location Content description */}
          <div className={`space-y-4 ${isAr ? "text-right" : "text-left"}`} dir={isAr ? "rtl" : "ltr"}>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-extrabold block">
              {isAr ? "مقرنا ومواعيد العمل بالمكتب" : "Our Seaport Head office & Operational Hours"}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white font-sans leading-tight">
              {isAr ? "يسعدنا تشريفكم بمقرنا مقابل البوابة الرئيسية 10 لميناء الإسكندرية" : "Visit our central desk opposite Alexandria Port Gate 10"}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-light">
              {isAr
                ? "يقع مكتبنا في موقع استراتيجي لا مثيل له، حيث نأمل تمثيل مصالحك التجارية وتخليص سيارتك فور تواصلك. نحن نعمل طوال أيام الأسبوع باستثناء الإجازات الرسمية لمصلحة جمرك الإسكندرية. يمكنك عقد اجتماع معنا لمناقشة أوراقك أو إقساط جمرك المبادرة وتفقد فواتير التصدير الصينية والأوروبية."
                : "Our central hub sits opposite Alexandria Port Gate 10, bringing our engineers direct to the docks. We align with the official Egyptian Customs timeline. Meet us to inspect your documents, review Chinese/European purchase details, and audit EUR.1 certificates of origin."}
            </p>

            <div className="space-y-2.5 pt-1 text-xs font-semibold text-slate-200 font-sans">
              <div className="flex items-center gap-2.5">
                <div className="h-6.5 w-6.5 bg-amber-400/10 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0">📍</div>
                <span>{isAr ? "العنوان بالتفصيل: 5 شارع النصر، أمام باب 10، الإسكندرية." : "Address: 5 El-Nasr Street, Opposite Gate 10, Alexandria, Egypt."}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-6.5 w-6.5 bg-amber-400/10 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0">⏰</div>
                <span>{isAr ? "أوقات العمل: من السبت إلى الخميس، من 9:00 صباحاً حتى 6:00 مساءً." : "Working Hours: Saturday to Thursday, 9:00 AM - 6:00 PM."}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-6.5 w-6.5 bg-amber-400/10 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0">📱</div>
                <span>{isAr ? "الهاتف والواتس المباشر: 01274833844" : "Telephone & WhatsApp: 01274833844"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-6.5 w-6.5 bg-amber-400/10 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0">✉️</div>
                <span>{isAr ? "البريد الإلكتروني للإدارة: eslamrezk80@gmail.com" : "Corporate Inbox: eslamrezk80@gmail.com"}</span>
              </div>
            </div>
          </div>

          {/* Aesthetic map or illustration mockup */}
          <div className="bg-slate-950 border border-blue-900/40 rounded-2xl p-6 text-white min-h-[300px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 text-amber-450">
                <Anchor className="h-5 w-5 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? "موقع المكتب الرسمي على الخريطة" : "Official HQ Location Chart"}</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-blue-905/20">ALEXANDRIA HARBOUR</span>
            </div>

            <div className="my-6 space-y-4 text-center relative z-10">
              <div className="h-12 w-12 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-lg font-black mx-auto shadow-lg shadow-amber-400/20">
                📍
              </div>
              <div className="text-center">
                <h4 className="font-extrabold text-sm text-white font-sans">{isAr ? "مقر مكتب أ/ إسلام محمد" : "CEO Eslam Mohamed's Office"}</h4>
                <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans font-light mt-1 max-w-sm mx-auto">
                  {isAr
                    ? "5 شارع النصر، أمام باب 10 مباشرة - بجوار نادي المرور ونقابة المحامين ومصلحة الجمارك بميناء الإسكندرية."
                    : "5 El-Nasr Street, opposite Gate 10 docks. Immediate proximity with Port Customs HQ."}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-blue-900/20 p-3 rounded-xl flex items-center justify-between text-[11px] text-amber-300 relative z-10">
              <span>{isAr ? "ميناء الإسكندرية (مجمع جمارك السيارات 40)" : "Alexandria Port (Complex 40)"}</span>
              <span className="font-black text-white">→ 1 Min walking</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
