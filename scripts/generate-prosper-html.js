import fs from 'fs';

const src = 'dist/index.html';
const dest = 'dist/prosper-apply.html';

if (!fs.existsSync(src)) {
  console.error('❌ dist/index.html not found. Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(src, 'utf-8');

html = html
  .replace(/<title>[^<]*<\/title>/, '<title>Prosper Personal Loans | Helping People Thrive Since 2005</title>')
  .replace(/(<meta property="og:title" content=")[^"]*(")/,'$1Prosper | Personal Loans up to $50K — Apply Now$2')
  .replace(/(<meta property="og:description" content=")[^"]*(")/,'$1Get a personal loan up to $50K with no impact to your credit score. Next-day funding. No prepay penalties. Helping people thrive since 2005.$2')
  .replace(/(<meta property="og:image" content=")[^"]*(")/,'$1https://usa-loan-hub-main.vercel.app/prosper-hero.png$2')
  .replace(/(<meta property="og:url" content=")[^"]*(")/,'$1https://usa-loan-hub-main.vercel.app/prosper-apply$2')
  .replace(/(<meta property="og:site_name" content=")[^"]*(")/,'$1Prosper$2')
  .replace(/(<meta name="twitter:title" content=")[^"]*(")/,'$1Prosper | Personal Loans up to $50K$2')
  .replace(/(<meta name="twitter:description" content=")[^"]*(")/,'$1Get a personal loan up to $50K with no credit impact. Helping people thrive since 2005.$2')
  .replace(/(<meta name="twitter:image" content=")[^"]*(")/,'$1https://usa-loan-hub-main.vercel.app/prosper-hero.png$2');

fs.writeFileSync(dest, html, 'utf-8');
console.log('✅ Generated dist/prosper-apply.html with Prosper meta tags');
