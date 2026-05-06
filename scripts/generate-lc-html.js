import fs from 'fs';

// Read the Vite-built index.html
const src = 'dist/index.html';
const dest = 'dist/lendingclub-apply.html';

if (!fs.existsSync(src)) {
  console.error('❌ dist/index.html not found. Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(src, 'utf-8');

// Patch all meta tags to reflect LendingClub branding
html = html
  .replace(
    /<title>[^<]*<\/title>/,
    '<title>LendingClub | Personal Loans Online – Apply Now</title>'
  )
  .replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    '$1LendingClub | Personal Loans Starting at 5.96% APR$2'
  )
  .replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    '$1Get a personal loan up to $60,000 with rates as low as 5.96% APR. Check your rate in minutes — no impact to your credit score.$2'
  )
  .replace(
    /(<meta property="og:image" content=")[^"]*(")/,
    '$1https://usa-loan-hub-main.vercel.app/lc-hero.png$2'
  )
  .replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    '$1https://usa-loan-hub-main.vercel.app/lendingclub-apply$2'
  )
  .replace(
    /(<meta property="og:site_name" content=")[^"]*(")/,
    '$1LendingClub$2'
  )
  .replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    '$1LendingClub | Personal Loans Starting at 5.96% APR$2'
  )
  .replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    '$1Get a personal loan up to $60,000 with rates as low as 5.96% APR. No credit score impact.$2'
  )
  .replace(
    /(<meta name="twitter:image" content=")[^"]*(")/,
    '$1https://usa-loan-hub-main.vercel.app/lc-hero.png$2'
  );

fs.writeFileSync(dest, html, 'utf-8');
console.log('✅ Generated dist/lendingclub-apply.html with LendingClub meta tags');
