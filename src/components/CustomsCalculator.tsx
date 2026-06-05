import React, { useState, useEffect } from "react";
import { EngineType, OriginType, CustomsService } from "../types";
import { calculateCustoms } from "../utils/customsData";
import { Calculator, Shield, Percent, HelpCircle, Car, ArrowLeftRight, CheckCircle, Info } from "lucide-react";

interface Props {
  lang: "ar" | "en";
  onApplyToForm: (results: any) => void;
  prefilledData?: {
    service: CustomsService;
    engineCc: number;
    engineType: EngineType;
    origin: OriginType;
    carValueEgp: number;
    carNameAr: string;
    carNameEn: string;
  } | null;
}

const CAR_BRANDS = [
  { nameAr: "مرسيدس-بنز", nameEn: "Mercedes-Benz", origin: OriginType.European },
  { nameAr: "بي إم دبليو", nameEn: "BMW", origin: OriginType.European },
  { nameAr: "تويوتا", nameEn: "Toyota", origin: OriginType.Standard },
  { nameAr: "كيا / هيونداي", nameEn: "Kia / Hyundai", origin: OriginType.Standard },
  { nameAr: "تسلا", nameEn: "Tesla", origin: OriginType.Standard },
  { nameAr: "أودي", nameEn: "Audi", origin: OriginType.European },
  { nameAr: "بي واي دي", nameEn: "BYD", origin: OriginType.Standard },
  { nameAr: "فولكس فاجن", nameEn: "Volkswagen", origin: OriginType.European },
  { nameAr: "شيري / جيلي", nameEn: "Chery / Geely", origin: OriginType.Standard },
  { nameAr: "أخرى", nameEn: "Other / Direct Customize", origin: OriginType.Standard }
];

export default function CustomsCalculator({ lang, onApplyToForm, prefilledData }: Props) {
  // Input States
  const [selectedBrand, setSelectedBrand] = useState(CAR_BRANDS[0]);
  const [service, setService] = useState<CustomsService>(CustomsService.ExpatriateInitiative);
  const [engineCc, setEngineCc] = useState<number>(1598);
  const [engineType, setEngineType] = useState<EngineType>(EngineType.Petrol);
  const [origin, setOrigin] = useState<OriginType>(OriginType.European);
  const [carValueEgp, setCarValueEgp] = useState<number>(950000);
  const [yearModel, setYearModel] = useState<number>(2025);

  // Result state
  const [result, setResult] = useState<any>(null);

  // Sync prefilled data
  useEffect(() => {
    if (prefilledData) {
      setService(prefilledData.service);
      setEngineCc(prefilledData.engineCc);
      setEngineType(prefilledData.engineType);
      setOrigin(prefilledData.origin);
      setCarValueEgp(prefilledData.carValueEgp);
      
      const matchedBrand = CAR_BRANDS.find(brand => 
        prefilledData.carNameEn.toLowerCase().includes(brand.nameEn.toLowerCase()) || 
        prefilledData.carNameAr.includes(brand.nameAr)
      );
      if (matchedBrand) {
        setSelectedBrand(matchedBrand);
      } else {
        setSelectedBrand(CAR_BRANDS[CAR_BRANDS.length - 1]);
      }
    }
  }, [prefilledData]);

  // Re-calculate whenever inputs change
  useEffect(() => {
    const res = calculateCustoms({
      service,
      engineCc,
      engineType,
      origin,
      carValueEgp,
      isExpatriateDiscount: origin === OriginType.European
    });
    setResult(res);
  }, [service, engineCc, engineType, origin, carValueEgp]);

  const handleBrandChange = (brandIndex: number) => {
    const brand = CAR_BRANDS[brandIndex];
    setSelectedBrand(brand);
    if (brand.nameEn !== "Other / Direct Customize") {
      setOrigin(brand.origin);
    }
  };

  const handleSendToConsultation = () => {
    onApplyToForm({
      service,
      brand: lang === "ar" ? selectedBrand.nameAr : selectedBrand.nameEn,
      engineCc,
      engineType,
      origin,
      carValueEgp,
      yearModel,
      calculatedDetails: result
    });
  };

  const isAr = lang === "ar";

  return (
    <div className="bg-[#070e1b]/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-900/50 overflow-hidden" id="customs-calculator-container">
      {/* Title Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#022c22] to-emerald-950 text-amber-400 p-6 relative border-b border-emerald-900/40">
        <div className="absolute right-0 top-0 overflow-hidden opacity-10 pointer-events-none transform translate-x-12 -translate-y-8">
          <Calculator size={200} className="text-amber-400/40" />
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-white/5 rounded-xl border border-emerald-800/40">
            <Calculator className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans text-amber-400">
              {isAr ? "حاسبة جمارك السيارات الذكية" : "Interactive Customs & Fee Calculator"}
            </h2>
            <p className="text-xs text-amber-200/80 mt-1">
              {isAr ? "احسب جمارك وودائع سيارتك طبقاً للوائح المصرية ومبادرة المغتربين" : "Estimate vehicle duties and Expatriate Bank deposits accurately."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Parameters Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Service System */}
          <div>
            <label className="block text-sm font-bold text-slate-200 mb-2">
              {isAr ? "نظام الإفراج الجمركي المطلوب" : "Customs System Framework"}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setService(CustomsService.ExpatriateInitiative)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all ${
                  service === CustomsService.ExpatriateInitiative
                    ? "border-amber-400 bg-amber-400/10 text-amber-300 shadow-md"
                    : "border-blue-900/20 hover:border-blue-800/60 text-slate-400 bg-[#0b1528]"
                }`}
              >
                <Shield className="h-5 w-5 mb-1 text-amber-400" />
                <span className="font-extrabold text-xs">{isAr ? "مبادرة المغتربين" : "Expat Initiative"}</span>
                <span className="text-[10px] text-slate-300 mt-0.5">{isAr ? "وديعة مستردة بـ USD" : "Refundable USD Deposit"}</span>
              </button>

              <button
                type="button"
                onClick={() => setService(CustomsService.FirstOwner)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center transition-all ${
                  service === CustomsService.FirstOwner
                    ? "border-amber-400 bg-amber-400/10 text-amber-300 shadow-md"
                    : "border-blue-900/20 hover:border-blue-800/60 text-slate-400 bg-[#0b1528]"
                }`}
              >
                <Car className="h-5 w-5 mb-1 text-amber-400" />
                <span className="font-extrabold text-xs">{isAr ? "مالك أول / إفراج نهائي" : "First Owner / Standard"}</span>
                <span className="text-[10px] text-slate-300 mt-0.5">{isAr ? "سيارات زيرو مستوردة" : "Direct Import Cash"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* select brand */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">
                {isAr ? "ماركة / طراز السيارة" : "Vehicle Make / Brand"}
              </label>
              <select
                onChange={(e) => handleBrandChange(parseInt(e.target.value))}
                className="w-full bg-[#0b1528] border border-blue-900/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-450 focus:border-amber-450 text-white"
              >
                {CAR_BRANDS.map((brand, idx) => (
                  <option key={idx} value={idx}>
                    {isAr ? brand.nameAr : brand.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* select model year */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">
                {isAr ? "سنة الموديل (سنة الصنع)" : "Model Year"}
              </label>
              <select
                value={yearModel}
                onChange={(e) => setYearModel(parseInt(e.target.value))}
                className="w-full bg-[#0b1528] border border-blue-900/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-450 focus:border-amber-450 text-white"
              >
                {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Engine Capacity */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-bold text-slate-200">
                  {isAr ? "سعة المحرك (CC)" : "Engine Capacity (CC)"}
                </label>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                  {engineCc} CC
                </span>
              </div>
              <input
                type="range"
                min="900"
                max="3500"
                step="50"
                value={engineCc}
                onChange={(e) => setEngineCc(parseInt(e.target.value))}
                className="w-full h-2 bg-[#0b1528] border border-blue-900/20 rounded-lg cursor-pointer accent-amber-450"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>900 CC</span>
                <span>1600 CC ({isAr ? "الفئة الاقتصادية" : "Eco-limit"})</span>
                <span>2000 CC</span>
                <span>3500 CC</span>
              </div>
            </div>

            {/* Origin Agreement */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">
                {isAr ? "منشأ السيارة واتفاقية الشراكة" : "Agreement Eligibility / origin"}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrigin(OriginType.European)}
                  className={`flex-1 py-2 px-3 text-xs rounded-lg font-bold border text-center transition-all ${
                    origin === OriginType.European
                      ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                      : "bg-[#0b1528] text-slate-300 border-blue-900/30 hover:bg-[#12203d]"
                  }`}
                >
                  {isAr ? "🇩🇪🇪🇺 منشأ أوروبي (يورو 1)" : "🇩🇪🇪🇺 European (Euro-1)"}
                </button>
                <button
                  type="button"
                  onClick={() => setOrigin(OriginType.Standard)}
                  className={`flex-1 py-2 px-3 text-xs rounded-lg font-bold border text-center transition-all ${
                    origin === OriginType.Standard
                      ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                      : "bg-[#0b1528] text-slate-300 border-blue-900/30 hover:bg-[#12203d]"
                  }`}
                >
                  {isAr ? "🇯🇵🇺🇸 منشأ عالمي آخر" : "🇯🇵🇺🇸 Non-European / Standard"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Engine Type (Fuel) */}
            <div>
              <label className="block text-sm font-bold text-slate-200 mb-1.5">
                {isAr ? "نوع الدفع والمحرك" : "Engine Fuel Type"}
              </label>
              <div className="flex gap-1.5 bg-[#0b1528] p-1 rounded-lg border border-blue-900/30">
                {Object.values(EngineType).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEngineType(type)}
                    className={`flex-1 py-1.5 px-2 text-[11px] font-bold text-center rounded-md transition-all ${
                      engineType === type
                        ? "bg-amber-400 text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {type === EngineType.Petrol
                      ? (isAr ? "بنزين / ديزل" : "Petrol")
                      : type === EngineType.Electric
                      ? (isAr ? "كهربائي كامل" : "Electric")
                      : (isAr ? "هجين Hybrid" : "Hybrid")}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Value */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-bold text-slate-200">
                  {isAr ? "القيمة التقديرية للسيارة" : "Estimated Car Price Value"}
                </label>
                <span className="text-xs font-sans font-medium text-slate-400">
                  {isAr ? "تقريباً" : "Approx."}
                </span>
              </div>
              <div className="relative rounded-md shadow-xs">
                <input
                  type="number"
                  value={carValueEgp}
                  min="200000"
                  max="10000000"
                  step="50000"
                  onChange={(e) => setCarValueEgp(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#0b1528] border border-blue-900/30 rounded-lg pl-3 pr-12 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-450 text-white"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-amber-400 text-xs font-bold">{isAr ? "جنيه" : "EGP"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-900/30 flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[12px] text-slate-300 leading-relaxed font-sans font-light">
              {isAr ? (
                <span>
                  <strong>هل تعلم؟</strong> السيارات ذات المنشأ الأوروبي يطبق عليها خصم <strong>100%</strong> من الجمارك، والسيارات الكهربائية تتمتع بإعفاء جمركي كامل بالإضافة لإعفاء من ضريبة الجدول، مما يخفض قيمة الودائع والضرائب بشكل قياسي.
                </span>
              ) : (
                <span>
                  <strong>Did you know?</strong> European Origin vehicles pay <strong>0% base custom</strong> and Electric vehicles are fully exempt from custom duties and pay reduced VAT, heavily dropping your deposit amounts!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Calculated Receipt Output */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#09152a] to-[#040a15] text-white rounded-2xl p-6 relative flex flex-col justify-between shadow-2xl border border-blue-900/40 relative overflow-hidden cargo-steel-sheet">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-4">
              <span className="text-xs uppercase tracking-wider text-amber-305 font-black">
                {isAr ? "كشف حساب البيانات والضرائب" : "ESTIMATED RECEIPT SHEET"}
              </span>
              <span className="text-amber-400 font-mono text-xs">
                {isAr ? "Alex Customs" : "Alex Port Rate"}
              </span>
            </div>

            {/* Value Indicators */}
            {service === CustomsService.ExpatriateInitiative ? (
              // EXPAT DISPLAY (USD DEPOSIT IS CENTRAL)
              <div className="text-center py-4 bg-slate-950/80 rounded-xl border border-blue-900/35 shadow-inner">
                <span className="block text-xs text-amber-300 mb-1">
                  {isAr ? "قيمة الوديعة البنكية المطلوبة" : "REFUNDABLE BANK DEPOSIT VALUE"}
                </span>
                <span className="text-3xl font-black text-amber-400 font-mono">
                  ${result?.depositValueUsd?.toLocaleString() || "0"} <span className="text-lg">USD</span>
                </span>
                <span className="block text-[11px] text-slate-300 mt-1 font-sans">
                  {isAr ? `ما يعادل تقريباً ${result?.totalRequirements?.toLocaleString()} جنيه مصري` : `Equivalent to ~EGP ${result?.totalRequirements?.toLocaleString()}`}
                </span>
              </div>
            ) : (
              // DIRECT CUSTOM VALUE
              <div className="text-center py-4 bg-slate-950/80 rounded-xl border border-blue-900/35 shadow-inner">
                <span className="block text-xs text-amber-300 mb-1">
                  {isAr ? "إجمالي التكلفة الجمركية والرسوم" : "TOTAL TAXES & CLEARANCE ESTIMATE"}
                </span>
                <span className="text-3xl font-black text-amber-400 font-mono">
                  {result?.totalRequirements?.toLocaleString() || "0"} <span className="text-sm text-white">EGP</span>
                </span>
              </div>
            )}

            {/* Bill details */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>{isAr ? "ماركة وتاريخ السيارة" : "Brand & Model Year"}:</span>
                <span className="font-semibold text-white">
                  {isAr ? selectedBrand.nameAr : selectedBrand.nameEn} ({yearModel})
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>{isAr ? "المقاس الجمركي للسعة" : "Custom Categorization"}:</span>
                <span className="font-semibold text-white">
                  {engineCc} CC
                </span>
              </div>

              {service !== CustomsService.ExpatriateInitiative && (
                <>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isAr ? "رسم الوارد (الجمارك الأساسية)" : "Import Custom Duty"}:</span>
                    <span className="font-mono text-white">
                      {result?.estimatedCustomsTax === 0 ? (isAr ? "معفى شراكة أوروبية (0%)" : "Exempt EU (0%)") : `${result?.estimatedCustomsTax?.toLocaleString()} EGP`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isAr ? "ضريبة القيمة المضافة 14%" : "VAT Tax (14%)"}:</span>
                    <span className="font-mono text-white">
                      {result?.estimatedVat?.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isAr ? "ضريبة الجدول" : "Table Development Tax"}:</span>
                    <span className="font-mono text-white">
                      {result?.estimatedTableTax?.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400">
                    <span>{isAr ? "رسم التنمية والموارد" : "Resource Development Fee"}:</span>
                    <span className="font-mono text-white">
                      {result?.estimatedDevelopmentFee?.toLocaleString()} EGP
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center text-slate-300 border-t border-blue-900/30 pt-2.5">
                <span>{isAr ? "أتعاب التخليص اللوجستي والساحات" : "Logistic Agency & Port Fees"}:</span>
                <span className="font-semibold text-amber-300">
                  {result?.estimatedClearanceCosts?.toLocaleString()} EGP
                </span>
              </div>
            </div>

            {/* Notes List */}
            <div className="border-t border-blue-900/30 pt-4 space-y-1.5 bg-slate-950/70 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-amber-305 tracking-wider">
                {isAr ? "ملاحظات هامة ومستندات مطلوبة:" : "IMPORTANT LEGAL DISCLAIMERS:"}
              </p>
              {(isAr ? result?.notesAr : result?.notesEn)?.map((note: string, idx: number) => (
                <div key={idx} className="flex gap-1 items-start text-[10px] text-slate-300 leading-normal">
                  <CheckCircle className="h-3 w-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-905/30">
            <button
              onClick={handleSendToConsultation}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>{isAr ? "تقديم طلب تخليص جمركي بهذه البيانات" : "Apply for Clearance with this vehicle"}</span>
            </button>
            <p className="text-[9px] text-slate-400 text-center mt-2 leading-tight">
              {isAr ? "توفير كافة استشهادات التكاليف بالتعاون مع أ/ إسلام محمد - المحمدية جمرك الإسكندرية" : "Estimates backed by master Eslam Mohamed, Al-Muhammadiyah Customs Office"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
