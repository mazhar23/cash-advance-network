import fs from 'fs';

// Read the Vite-built index.html
const src = 'dist/index.html';
const dest = 'dist/advanceamerica-apply.html';

if (!fs.existsSync(src)) {
  console.error('❌ dist/index.html not found. Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(src, 'utf-8');

// Patch all meta tags to reflect Advance America branding
html = html
  .replace(
    /<title>[^<]*<\/title>/,
    '<title>Advance America | Bad Credit Loans – Apply Now</title>'
  )
  .replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    '$1Advance America | Guaranteed Repayment Options$2'
  )
  .replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    '$1Discover flexible lending solutions at Advance America. Same day approval. No credit score checks.$2'
  )
  .replace(
    /(<meta property="og:image" content=")[^"]*(")/,
    '$1https://usa-loan-hub-main.vercel.app/aaa-1.png$2'
  )
  .replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    '$1https://usa-loan-hub-main.vercel.app/advanceamerica-apply$2'
  )
  .replace(
    /(<meta property="og:site_name" content=")[^"]*(")/,
    '$1Advance America$2'
  )
  .replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    '$1Advance America | Bad Credit Loans$2'
  )
  .replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    '$1Discover flexible lending solutions at Advance America. Same day approval.$2'
  )
  .replace(
    /(<meta name="twitter:image" content=")[^"]*(")/,
    '$1https://usa-loan-hub-main.vercel.app/aaa-1.png$2'
  );

fs.writeFileSync(dest, html, 'utf-8');
console.log('✅ Generated dist/advanceamerica-apply.html with Advance America meta tags');
