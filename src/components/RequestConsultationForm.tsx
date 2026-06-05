import React, { useState, useRef } from "react";
import { CustomsService, TrackingRecord, StepStatus } from "../types";
import { generateTrackingSteps } from "../utils/customsData";
import { 
  FileUp, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  X, 
  File, 
  Printer, 
  MessageSquare, 
  LogOut, 
  MapPin, 
  Sparkle, 
  Inbox, 
  Clock 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthInterface from "./AuthInterface";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Props {
  lang: "ar" | "en";
  prefilledData: any; 
  onNewRecordCreated: (rec: TrackingRecord) => void;
}

interface MockUploadedFile {
  name: string;
  size: string;
  type: string;
  progress: number;
}

export default function RequestConsultationForm({ lang, prefilledData, onNewRecordCreated }: Props) {
  const isAr = lang === "ar";
  const { user, profile, logout } = useAuth();

  // Contact parameters requested by the user
  const PHONE_NUMBER = "01274833844";
  const EMAIL_ADDRESS = "eslamrezk80@gmail.com";

  // Form States
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState(user?.email || "");
  const [service, setService] = useState<CustomsService>(prefilledData?.service || CustomsService.ExpatriateInitiative);
  const [cargoName, setCargoName] = useState("");
  const [cargoDetails, setCargoDetails] = useState("");

  // Prefill hook if user clicks "Apply with calculation"
  React.useEffect(() => {
    if (prefilledData) {
      if (prefilledData.service) setService(prefilledData.service);
      const cap = prefilledData.engineCc ? `${prefilledData.engineCc} CC` : "";
      const b = prefilledData.brand || "";
      const energy = prefilledData.engineType ? `(${prefilledData.engineType})` : "";
      setCargoName(`${b} ${prefilledData.yearModel || ""} ${cap} ${energy}`.trim());
      
      const calcStr = prefilledData.calculatedDetails
        ? `إجمالي الرسوم المقدرة: ${prefilledData.calculatedDetails.totalRequirements?.toLocaleString()} جنيه مصري`
        : "";
      setCargoDetails(calcStr);
    }
  }, [prefilledData]);

  // Upload simulation states
  const [uploadedFiles, setUploadedFiles] = useState<MockUploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Completed State
  const [submittedRecord, setSubmittedRecord] = useState<TrackingRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Email Simulation States
  const [isSimulatingEmail, setIsSimulatingEmail] = useState(false);
  const [simulatedEmailStatus, setSimulatedEmailStatus] = useState<{
    sent: boolean;
    email: string;
    subject: string;
    body: string;
    timestamp: string;
  } | null>(null);

  // Mock File Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const addMockFiles = (names: string[]) => {
    const newFiles = names.map((name) => ({
      name,
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      type: name.endsWith(".pdf") ? "application/pdf" : "image/jpeg",
      progress: 0
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((f) => {
      let currentProg = 0;
      const interval = setInterval(() => {
        currentProg += 20;
        setUploadedFiles((prev) => 
          prev.map((item) => item.name === f.name ? { ...item, progress: currentProg } : item)
        );
        if (currentProg >= 100) {
          clearInterval(interval);
        }
      }, 150);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileNames = Array.from(e.dataTransfer.files).map((f: any) => f.name);
      addMockFiles(fileNames);
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map((f: any) => f.name);
      addMockFiles(fileNames);
    }
  };

  const removeFile = (name: string) => {
    setUploadedFiles((prev) => prev.filter(f => f.name !== name));
  };

  const triggerMockUpload = () => {
    const presets = isAr 
      ? ["بوليصة_الشحن_المبدئية.pdf", "رخصة_تسيير_السيارة.jpg", "الفاتورة_التجارية.png"]
      : ["Draft_Bill_of_Lading.pdf", "Foreign_Car_Registration.jpg", "Commercial_Invoice_Receipt.png"];
    
    addMockFiles(presets);
  };

  // Submission handler (Saves request to Firestore database in background as backup, but prioritizes WhatsApp)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) {
      alert(isAr ? "يرجى كتابة الاسم ورقم الهاتف للتواصل." : "Please fill in your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const randomId = `ALM-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const newRecord: TrackingRecord = {
      id: randomId,
      clientId: user?.uid || "guest-user",
      clientName: fullName,
      phone: phoneNumber,
      service: service,
      cargoDescription: cargoName || (isAr ? "استشارة تخليص جمركي عامة" : "General port customs clearance request"),
      creationDate: todayStr,
      lastUpdated: todayStr,
      steps: generateTrackingSteps(StepStatus.DocumentReview, false),
      additionalNotesAr: `تم تسجيل طلب وتوجيه مستنداتك عبر الواتساب للأستاذ إسلام محمد بالرمز المرجعي: ${randomId}.`,
      additionalNotesEn: `Your contact request has been registered and redirected to Eslam Mohamed on WhatsApp under ID ${randomId}.`,
      uploadedFiles: uploadedFiles.map(f => ({ name: f.name, size: f.size }))
    };

    try {
      // Save directly to Firestore as an optional background system backup
      try {
        await setDoc(doc(db, "requests", randomId), {
          ...newRecord,
          createdAt: new Date().toISOString(),
          targetEmail: EMAIL_ADDRESS
        });
      } catch (fbErr) {
        console.warn("Firestore backup write skipped or offline:", fbErr);
        // Note: We silently swallow Firestore permission/network errors so they never block WhatsApp routing!
      }

      const recipientMail = emailAddress.trim() || user?.email || "guest@visitor.com";
      const todayTimestamp = new Date().toLocaleString(isAr ? "ar-EG" : "en-US", {
        dateStyle: "medium",
        timeStyle: "medium"
      });

      const emailSubject = isAr 
        ? `📩 تأكيد استلام طلب التواصل - رقم المعاملة ${randomId} | مكتب المحمدية`
        : `📩 Contact Receipt & Customs Mandate Ticket #${randomId}`;

      const serviceDisplay = {
        [CustomsService.Triptyque]: isAr ? "تربيتيك إفراج مؤقت" : "Triptyque Temporary Entry",
        [CustomsService.FirstOwner]: isAr ? "مالك أول سيارة زيرو" : "First Owner Car Import",
        [CustomsService.ExpatriateInitiative]: isAr ? "مبادرة المغتربين سيارات" : "Expatriate Vehicle Scheme",
        [CustomsService.GeneralCargo]: isAr ? "بضائع عامة ورسائل تجارية" : "Commercial Cargo Clearance",
        [CustomsService.DiplomaticRelease]: isAr ? "إفراج دبلوماسي استثنائي" : "Diplomatic Cargo Releases"
      }[newRecord.service];

      const emailBody = isAr 
        ? `أهلاً بك يا ${fullName}،\n\nنشكرك على تواصلك معنا بالموقع لتسجيل مستندات التخليص جمركياً تحت إشراف أستاذ إسلام محمد.\n\nتفاصيل طلبك الإلكتروني المرسل للمكتب:\n------------------------------------------------\n- رمز المعاملة: ${randomId}\n- نظام الإفراج: ${serviceDisplay}\n- مواصفات الشحنة: ${newRecord.cargoDescription}\n- رقم الجوال للتواصل: ${phoneNumber}\n- الوقت والتاريخ: ${todayTimestamp}\n- الملفات المرفقة: ${uploadedFiles.length > 0 ? uploadedFiles.map(f => f.name).join(", ") : "بانتظار الإرسال الفوري"}\n------------------------------------------------\n\nتم إرسال نسخة من الفواتير والملخص إلكترونياً لصندوق بريد أ/ إسلام محمد الرسمي: ${EMAIL_ADDRESS} للمطابقة بمجمع جمارك الإسكندرية.\n\nمع تحيات,\nشركة المحمدية للتخليص جمارك الإسكندرية\nأستاذ إسلام محمد - ${PHONE_NUMBER}`
        : `Dear ${fullName},\n\nThank you for choosing Al-Muhammadiyah Customs Agency. Your details have been sent to CEO Eslam Mohamed's official desk.\n\nYour logged application details:\n------------------------------------------------\n- Ticket ID: ${randomId}\n- Clearance Scheme: ${serviceDisplay}\n- Cargo: ${newRecord.cargoDescription}\n- Mobile Number: ${phoneNumber}\n- Timestamp: ${todayTimestamp}\n- Recipient Executive Email: ${EMAIL_ADDRESS}\n------------------------------------------------\n\nSincerely,\nAl-Muhammadiyah Customs Office Alexandria\nEslam Mohamed Hotline: ${PHONE_NUMBER}`;

      // Simulate sending to the user's requesting email
      setIsSimulatingEmail(true);
      setSimulatedEmailStatus({
        sent: false,
        email: recipientMail,
        subject: emailSubject,
        body: emailBody,
        timestamp: todayTimestamp
      });

      setSubmittedRecord(newRecord);
      onNewRecordCreated(newRecord);

      // Construct and directly trigger WhatsApp URL callback to fulfill "بدل مايتبعت ع السيستم يتبعت علي الواتس"
      const waUrl = getWhatsAppLink(newRecord);
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank");
      }

      setTimeout(() => {
        setSimulatedEmailStatus((prev) => prev ? { ...prev, sent: true } : null);
        setIsSimulatingEmail(false);
      }, 1500);

    } catch (err: any) {
      console.error("Customs contact upload error:", err);
      setSubmissionError(err.message || String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName("");
    setPhoneNumber("");
    setEmailAddress("");
    setCargoName("");
    setCargoDetails("");
    setUploadedFiles([]);
    setSubmittedRecord(null);
    setSimulatedEmailStatus(null);
    setIsSimulatingEmail(false);
  };

  const getWhatsAppLink = (rec: TrackingRecord) => {
    const serviceLabel = {
      [CustomsService.Triptyque]: "تربيتيك إفراج مؤقت",
      [CustomsService.FirstOwner]: "مالك أول سيارة زيرو",
      [CustomsService.ExpatriateInitiative]: "مبادرة المغتربين سيارات",
      [CustomsService.GeneralCargo]: "بضائع عامة ورسائل تجارية",
      [CustomsService.DiplomaticRelease]: "إفراج دبلوماسي استثنائي"
    }[rec.service];

    // Formulate a beautiful rich text message to be sent directly on WhatsApp
    let message = isAr
      ? `مرحباً أستاذ إسلام محمد، قمت بملء طلب تواصل وتخليص جمركي عبر الموقع:\n\n` +
        `👤 *الاسم:* ${rec.clientName}\n` +
        `📞 *هاتف التواصل:* ${rec.phone}\n` +
        `🚢 *نظام الإفراج:* ${serviceLabel}\n` +
        `🚗 *السيارة الشحنة:* ${rec.cargoDescription}\n`
      : `Hello Mr. Eslam Mohamed, I filled a customs clearance & contact request:\n\n` +
        `👤 *Name:* ${rec.clientName}\n` +
        `📞 *Phone:* ${rec.phone}\n` +
        `🚢 *Service:* ${serviceLabel}\n` +
        `🚗 *Cargo/Vehicle:* ${rec.cargoDescription}\n`;

    if (cargoDetails) {
      message += isAr
        ? `📝 *ملاحظات الطلب:* ${cargoDetails}\n`
        : `📝 *Special Notes:* ${cargoDetails}\n`;
    }

    if (uploadedFiles.length > 0) {
      const fileNames = uploadedFiles.map(f => f.name).join(", ");
      message += isAr
        ? `📎 *الملفات المقترنة:* ${fileNames}\n`
        : `📎 *Attached Files:* ${fileNames}\n`;
    }

    message += isAr
      ? `\n🔢 *رقم المعاملة المرجعي:* ${rec.id}\n\nيرجى تأكيد الاستلام ومراجعة مستندات تخليص جمارك ميناء الإسكندرية. شكراً جزيلاً!`
      : `\n🔢 *Reference ID:* ${rec.id}\n\nPlease review these files for Alexandria port clearance steps. Thank you!`;

    return `https://wa.me/20${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-[#070e1b]/95 border border-blue-900/40 rounded-3xl shadow-2xl overflow-hidden" id="request-consult-container" dir={isAr ? "rtl" : "ltr"}>
      {!submittedRecord ? (
        // FORM VIEW
        <div>
          {/* Glowing Header in Blue-Amber Theme */}
          <div className="bg-gradient-to-r from-blue-950 via-[#0a1e36] to-blue-950 text-white p-6 md:p-8 relative border-b border-blue-900/40">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-right">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl text-blue-950 shadow-md">
                  <Phone className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black font-sans text-white">
                    {isAr ? "مسؤول معتمد: أ/ إسلام محمد" : "Contact Port Agent: Eslam Mohamed"}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 font-sans font-light">
                    {isAr ? "سجل بياناتك واستشارتك وأرفق أوراق سيارتك أو بضائعك لمطابقتها فورياً بموانئ الإسكندرية" : "Provide car sheets and cargo documents to review with Eslam Mohamed."}
                  </p>
                </div>
              </div>

              {/* Direct links block */}
              <div className="flex items-center gap-3 bg-slate-950/70 p-2 rounded-xl border border-blue-900/40 text-xs font-mono">
                <span className="text-amber-400 font-bold">{isAr ? "الخط الساخن المباشر:" : "Hotline:"}</span>
                <span className="text-white font-black">{PHONE_NUMBER}</span>
              </div>
            </div>
          </div>

          {/* Core Contacts Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-8 pt-6">
            <a 
              href={`tel:20${PHONE_NUMBER}`}
              className="bg-[#0b1329]/80 border border-blue-900/20 p-4 rounded-2xl flex items-center gap-3 hover:border-amber-400/40 transition-all text-xs"
            >
              <div className="h-10 w-10 bg-slate-950 text-amber-400 rounded-xl flex items-center justify-center font-bold border border-blue-900/20">
                📞
              </div>
              <div className="text-right">
                <span className="block text-slate-450 font-extrabold text-[9px] uppercase tracking-wider">{isAr ? "الهاتف والاتصال المباشر" : "Direct Calling"}</span>
                <span className="block font-black text-white">{PHONE_NUMBER}</span>
              </div>
            </a>

            <a 
              href={`https://wa.me/20${PHONE_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0b1329]/80 border border-blue-900/20 p-4 rounded-2xl flex items-center gap-3 hover:border-amber-400/40 transition-all text-xs"
            >
              <div className="h-10 w-10 bg-slate-950 text-[#25D366] rounded-xl flex items-center justify-center font-black border border-blue-900/20">
                💬
              </div>
              <div className="text-right">
                <span className="block text-slate-450 font-extrabold text-[9px] uppercase tracking-wider">{isAr ? "الواتساب الفوري المباشر" : "WhatsApp Chat"}</span>
                <span className="block font-black text-white">{PHONE_NUMBER}</span>
              </div>
            </a>

            <a 
              href={`mailto:${EMAIL_ADDRESS}`}
              className="bg-[#0b1329]/80 border border-blue-900/20 p-4 rounded-2xl flex items-center gap-3 hover:border-amber-400/40 transition-all text-xs"
            >
              <div className="h-10 w-10 bg-slate-950 text-amber-450 rounded-xl flex items-center justify-center font-bold border border-blue-900/20">
                📩
              </div>
              <div className="text-right">
                <span className="block text-slate-450 font-extrabold text-[9px] uppercase tracking-wider">{isAr ? "البريد الإلكتروني للإدارة" : "Executive Mailbox"}</span>
                <span className="block font-black text-white">{EMAIL_ADDRESS}</span>
              </div>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1.5 uppercase tracking-wider text-right">
                  {isAr ? "الاسم الكامل الكريم" : "Your Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={isAr ? "مثال: أستاذ إسلام رزق" : "e.g., Eslam Rezk"}
                  className="w-full bg-[#050a14] border border-blue-900/40 focus:border-amber-400 focus:bg-slate-950 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none font-sans text-right"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1.5 uppercase tracking-wider text-right">
                  {isAr ? "رقم الجوال لتلقي التحديثات والجدولة" : "Mobile / WhatsApp Number"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={isAr ? "مثال: 01274833844" : "e.g., 01274833844"}
                  className="w-full bg-[#050a14] border border-blue-900/40 focus:border-amber-400 focus:bg-slate-950 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none font-sans font-medium text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Optional Email */}
              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1.5 uppercase tracking-wider text-right">
                  {isAr ? "بريدك الإلكتروني (لتلقي كشف التأكيد)" : "Your Email address"}
                </label>
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="client@mail.com"
                  className="w-full bg-[#050a14] border border-blue-900/40 focus:border-amber-400 focus:bg-slate-950 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none font-sans text-right"
                />
              </div>

              {/* Systems selecting */}
              <div>
                <label className="block text-xs font-extrabold text-slate-200 mb-1.5 uppercase tracking-wider text-right">
                  {isAr ? "نظام استيراد السلع والسيارات البوابي" : "Automotive clearance Type"}
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as CustomsService)}
                  className="w-full bg-[#050a14] border border-blue-900/40 focus:border-amber-400 focus:bg-slate-950 rounded-xl px-4 py-3 text-xs font-extrabold text-amber-300 outline-none font-sans text-right"
                >
                  <option value={CustomsService.ExpatriateInitiative}>{isAr ? "مبادرة المصريين بالخارج (وديعة المغتربين)" : "Expatriates Vehicle Scheme"}</option>
                  <option value={CustomsService.Triptyque}>{isAr ? "إصدار وتخليص دفتر التربتك الدولي" : "Triptyque Booklet Entry"}</option>
                  <option value={CustomsService.FirstOwner}>{isAr ? "نظام سيارات المالك الأول (زيرو)" : "First Owner Year Model import"}</option>
                  <option value={CustomsService.GeneralCargo}>{isAr ? "بضائع ورسائل تجارية عامة" : "Commercial port FCL / LCL cargo"}</option>
                  <option value={CustomsService.DiplomaticRelease}>{isAr ? "التخليص الدبلوماسي والقنصلي" : "Diplomatic consulate waivers"}</option>
                </select>
              </div>
            </div>

            {/* Inbound make model */}
            <div>
              <label className="block text-xs font-extrabold text-slate-200 mb-1.5 uppercase tracking-wider text-right">
                {isAr ? "طراز السيارة، الحجم، أو مواصفات البضائع" : "Vehicle make / model spec"}
              </label>
              <input
                type="text"
                value={cargoName}
                onChange={(e) => setCargoName(e.target.value)}
                placeholder={isAr ? "مثال: مرسيدس C200 موديل 2024 - 1500 CC أو حاوية أدوات صحية" : "e.g., Tucson 2023 1600cc"}
                className="w-full bg-[#050a14] border border-blue-900/40 focus:border-amber-400 focus:bg-slate-950 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none font-sans text-right"
              />
            </div>

            {/* Details */}
            <div>
              <label className="block text-xs font-extrabold text-slate-200 mb-1.5 uppercase tracking-wider text-right">
                {isAr ? "ملاحظات جمركية أو قيم الفواتير للاستعلام" : "Special notes / calculation records"}
              </label>
              <textarea
                value={cargoDetails}
                onChange={(e) => setCargoDetails(e.target.value)}
                rows={3}
                placeholder={isAr ? "تفاصيل بلد الشحن، شهادة يورو 1، أو استفسارات جمركية خاصة بمستندات التخليص..." : "Describe origin certificates or specify extra invoice details..."}
                className="w-full bg-[#050a14] border border-blue-900/40 focus:border-amber-400 focus:bg-slate-950 rounded-xl px-4 py-3 text-xs font-semibold text-white placeholder:text-slate-500 transition-all outline-none font-sans text-right"
              />
            </div>

            {/* Prefill calculators cue */}
            {prefilledData && (
              <div className="bg-amber-400/5 text-[10.5px] p-3 rounded-lg border border-amber-400/30 text-amber-300 leading-normal font-semibold text-right animate-pulse">
                ✨ {isAr ? "تم إدراج طراز سيارتك وتقديرات حاسبتك فورا إلى حقول المراجعة والاتصال الموثق." : "Calculated values have been prefilled safely from active simulator."}
              </div>
            )}

            {/* Drag Dropping Area */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-widest text-right">
                {isAr ? "إقران ورفع مستندات الشحنة والجمارك للمطابقة" : "Attach Cargo invoice copies or PDF files"}
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-amber-400 bg-amber-400/5"
                    : "border-blue-900/35 hover:border-amber-400/60 bg-[#050a14]/60"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleManualUpload}
                  className="hidden"
                />
                <FileUp className="h-8 w-8 text-amber-400 mx-auto mb-2 opacity-80 animate-pulse" />
                <p className="text-xs font-extrabold text-slate-200 text-center">
                  {isAr ? "اسحب وأفلت صور الفاتورة أو بوليصة الشحن هنا، أو تصفح ملفات المخدم" : "Drag and drop invoice prints here, or click to browse"}
                </p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-md mx-auto leading-normal text-center">
                  {isAr ? "صور جواز السفر، رخصة السيارة الأجنبية، كشف يورو 1، أو كشف الشاسيه (تنسيق PDF, PNG, JPG)" : "Passports, registration drafts, Bill of Lading, or chassis details (PDF, JPG)"}
                </p>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); triggerMockUpload(); }}
                  className="mt-3.5 inline-flex items-center gap-1.5 bg-[#050a14] border border-blue-900/40 hover:border-amber-400 text-amber-300 py-1.5 px-3.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer shadow mx-auto"
                >
                  <span>{isAr ? "⚡ أرفق مستندات استيراد نموذجية (بوليصة، فاتورة) تجريبياً" : "⚡ Load Typical Commercial Mock Invoices"}</span>
                </button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="bg-[#050a14] rounded-2xl p-3 border border-blue-900/30 divide-y divide-blue-900/20">
                  {uploadedFiles.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-xs text-right">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <File className="h-4 w-4 text-amber-450 shrink-0" />
                        <div className="truncate text-right">
                          <span className="font-extrabold text-slate-200 block truncate">{f.name}</span>
                          <span className="text-[9px] text-slate-450 font-mono">{f.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {f.progress < 100 ? (
                          <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-400 h-full transition-all duration-150" style={{ width: `${f.progress}%` }} />
                          </div>
                        ) : (
                          <span className="text-[9px] font-black text-amber-350 bg-amber-405/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                            {isAr ? "جاهز ومقترن" : "Ready"}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeFile(f.name); }}
                          className="text-slate-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-blue-900/30">
              {submissionError && (
                <div className="p-3 bg-red-400/10 border border-red-500/30 text-red-350 rounded-lg text-xs leading-relaxed mb-4 text-right">
                  ⚠️ {isAr ? "فشل ترحيل بيانات الاستيراد. يرجى مراجعة اتصال المنصة: " : "Submission failed: "} {submissionError}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-605 text-blue-950 font-black py-4 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 font-sans font-black">
                    <span className="w-4 h-4 border-2 border-blue-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>{isAr ? "جاري ترحيل طلب ومستندات المطابقة..." : "Uploading documents and registering in ports queue..."}</span>
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>{isAr ? "المتابعة لإرسال أوراق الشحنة وتثبيت التواصل المباشر" : "Upload Documents & Connect With Master Eslam"}</span>
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                {isAr 
                  ? "سيقوم المخدم بتهيئة المعاملة للمطابقة الفورية بالساحات وإرسالها للأستاذ إسلام محمد" 
                  : `This prepares a secure representational docket inside Eslam's desk and mirrors to ${EMAIL_ADDRESS}`}
              </p>
            </div>
          </form>
        </div>
      ) : (
        // COMPLETED STATE & RECEIPT VIEW
        <div className="p-6 md:p-8 space-y-6 text-right animate-fade-in">
          <div className="text-center space-y-3 py-6 max-w-xl mx-auto">
            {/* Pulsating green ring for WhatsApp */}
            <div className="h-16 w-16 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] mx-auto border border-[#25D366]/30 shadow-md animate-bounce">
              <MessageSquare className="h-9 w-9" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-white font-sans">
              {isAr ? "جاهز للإرسال الفوري عبر واتساب!" : "Ready for Instant WhatsApp Transmission!"}
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              {isAr 
                ? "تم تجهيز وتجميع مستندات وبيانات المعاملة جمركياً. يرجى الضغط على الزر الأخضر أدناه لفتح المحادثة الفورية مع الأستاذ إسلام محمد ومطابقة مستندات تخليص جمارك ميناء الإسكندرية." 
                : "Your documentation docket is compiled and prepared. Please click the green button below to chat and submit directly to Mr. Eslam Mohamed."}
            </p>

            {/* DIRECT WHATSAPP ACTION BUTTON */}
            <div className="pt-4 pb-2">
              <a
                href={getWhatsAppLink(submittedRecord)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd56] text-blue-950 font-black py-4 px-6 rounded-2xl text-sm md:text-base transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="h-5.5 w-5.5 stroke-[2.5]" />
                <span>{isAr ? "فتح محادثة واتساب وإرسال الأوراق الآن" : "Launch WhatsApp Chat & Submit Now"}</span>
              </a>
              <p className="text-[10px] text-emerald-400 mt-2 font-medium">
                {isAr ? "🟢 سيفتح هذا الزر لتأكيد ومراجعة مستنداتك فورا" : "🟢 Opens direct verified chat link instantly"}
              </p>
            </div>
          </div>

          {/* TICKET DETAILS FOR REASSURANCE AND PRINTING */}
          <div className="border border-blue-900/40 bg-[#0a1224]/90 rounded-2xl p-6 space-y-5 max-w-xl mx-auto shadow-2xl text-right text-xs" id="printable-customs-ticket">
            <div className="flex justify-between items-start border-b border-blue-900/30 pb-4">
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold text-amber-400 block">{isAr ? "مؤسسة المحمدية للتخليص والملاحة الجمركية" : "AL-MUHAMMADIYAH CUSTOMS"}</span>
                <h4 className="font-extrabold text-[13px] text-white font-sans">{isAr ? "بطاقة مراجعة الاستخلاص المقترحة" : "Customs Docket Preview"}</h4>
                <p className="text-[9px] text-slate-400">{isAr ? "تحت إشراف مباشر للأستاذ إسلام محمد - أمام باب 10 جمرك الإسكندرية" : "Under supervision of Chief Eslam Mohamed"}</p>
              </div>
              <div className="text-left font-mono">
                <span className="text-xs font-black text-slate-950 bg-amber-400 px-3 py-1.5 rounded-lg border border-amber-450 shadow">
                  {submittedRecord.id}
                </span>
                <p className="text-[9px] text-slate-405 mt-1">{submittedRecord.creationDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-5 text-xs text-slate-305">
              <div className="text-right">
                <span className="block text-[9px] text-slate-400 uppercase font-bold">{isAr ? "صاحب الطلب" : "Client"}</span>
                <span className="font-bold text-white text-[11px]">{submittedRecord.clientName}</span>
              </div>
              <div className="text-right">
                <span className="block text-[9px] text-slate-400 uppercase font-bold">{isAr ? "رقم الهاتف" : "WhatsApp"}</span>
                <span className="font-bold text-white text-[11px]">{submittedRecord.phone}</span>
              </div>
              <div className="col-span-2 border-t border-blue-900/20 pt-2.5 text-right">
                <span className="block text-[9px] text-slate-400 uppercase font-bold">{isAr ? "مواصفات الشحنة أو طراز السيارة" : "Cargo Item"}</span>
                <span className="font-bold text-white text-[11px]">{submittedRecord.cargoDescription}</span>
              </div>
              <div className="col-span-2 border-t border-blue-900/20 pt-2.5 text-right">
                <span className="block text-[9px] text-slate-400 uppercase font-bold">{isAr ? "النظام الاستيرادي المطبق" : "Cleared System Option"}</span>
                <span className="font-sans px-2.5 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full font-black text-[10px] inline-block mt-0.5">
                  {isAr 
                    ? {
                        [CustomsService.Triptyque]: "تربيتيك (إفراج مؤقت للسيارات)",
                        [CustomsService.FirstOwner]: "مالك أول سيارة مستعملة",
                        [CustomsService.ExpatriateInitiative]: "مبادرة المصريين بالخارج (وديعة)",
                        [CustomsService.GeneralCargo]: "بضائع عامة ورسائل تجارية",
                        [CustomsService.DiplomaticRelease]: "الإفراج الجمركي الدبلوماسي"
                      }[submittedRecord.service]
                    : submittedRecord.service
                  }
                </span>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="border-t border-blue-900/20 pt-2.5 text-right">
                <span className="block text-[9px] text-slate-400 uppercase font-bold mb-1">{isAr ? "المستندات الملحقة بالإرسال:" : "Prepared Documents:"}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {uploadedFiles.map((f, i) => (
                    <span key={i} className="bg-slate-950 px-2 py-1 rounded text-[10px] text-slate-350 font-mono border border-blue-900/10">
                      📎 {f.name} ({f.size})
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-dashed border-blue-900/30 pt-3 flex justify-between text-[9px] text-slate-400 font-mono">
              <span>Hotline: {PHONE_NUMBER}</span>
              <span>Client Email: {emailAddress || "N/A"}</span>
            </div>
          </div>

          {/* PRINT & UTILITY ACTIONS ROW */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto pt-4">
            <button
              onClick={() => window.print()}
              className="w-full sm:flex-1 bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-blue-900/40 cursor-pointer shadow-md"
            >
              <Printer className="h-4 w-4 text-amber-450" />
              <span>{isAr ? "طباعة بطاقة المعاينة جمركياً" : "Print Ticket"}</span>
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:flex-1 bg-blue-950/45 hover:bg-blue-950 text-amber-300 font-bold py-3.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-blue-900/35 cursor-pointer shadow-md"
            >
              <span>{isAr ? "تعديل البيانات أو تقديم نموذج آخر" : "Edit / Fill Another Request"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple isomorphic environment helper
function isIsomorphic() {
  return typeof window !== "undefined";
}
