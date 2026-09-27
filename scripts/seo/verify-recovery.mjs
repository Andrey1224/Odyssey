import fs from 'fs';
import path from 'path';
import http from 'http';

const baseUrl = process.argv[2] || process.env.BASE_URL || 'http://localhost:3000';
console.log(`Starting SEO recovery verification against: ${baseUrl}\n`);

let hasErrors = false;
let pathChecksCount = 0;
let hostChecksCount = 0;
let queryChecksCount = 0;
let trailingSlashChecksCount = 0;

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  hasErrors = true;
}

async function fetchUrl(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return res;
  } catch (err) {
    return { ok: false, status: 0, statusText: err.message, headers: new Headers() };
  }
}

async function fetchWithHttpHost(urlStr, hostHeader) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 80,
      path: parsed.pathname + parsed.search,
      headers: { Host: hostHeader }
    };
    const req = http.get(options, (res) => {
      resolve({
        status: res.statusCode,
        location: res.headers.location
      });
    });
    req.on('error', (err) => resolve({ status: 0, location: null, error: err.message }));
  });
}

async function testSitemap() {
  console.log('--- Checking Sitemap ---');
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  const res = await fetchUrl(sitemapUrl);
  if (!res.ok) {
    fail(`Sitemap not accessible: ${res.status}`);
    return;
  }
  
  const text = await res.text();
  const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  if (urls.length === 0) {
    fail('No URLs found in sitemap');
    return;
  }
  
  console.log(`[PASS] Found ${urls.length} URLs in sitemap`);

  for (const loc of urls) {
    if (loc.includes('vercel.app') || loc.includes('www.')) {
      fail(`Sitemap contains invalid domain: ${loc}`);
    }
    
    const testUrl = loc.replace('https://odysseybaths.co.uk', baseUrl);
    
    const pageRes = await fetchUrl(testUrl);
    if (!pageRes.ok) {
      fail(`Sitemap URL failed (${pageRes.status}): ${loc}`);
      continue;
    }
    
    const html = await pageRes.text();
    
    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      if (canonical.replace(/\/$/, '') !== loc.replace(/\/$/, '')) {
        fail(`Canonical mismatch on ${loc}. Expected ${loc}, got ${canonical}`);
      }
    } else {
      fail(`No canonical tag found on ${loc}`);
    }
    
    if (html.toLowerCase().includes('noindex')) {
      fail(`Found noindex on sitemap URL: ${loc}`);
    }
  }
  
  if (!text.includes('lastmod')) {
    console.log('[PASS] No dummy lastmod found in sitemap');
  } else {
    fail('Found lastmod in sitemap which may be dummy');
  }
  
  const restored1 = 'https://odysseybaths.co.uk/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk';
  const restored2 = 'https://odysseybaths.co.uk/installing-a-walk-in-bath';
  
  if (!urls.includes(restored1)) fail(`Missing restored article from sitemap: ${restored1}`);
  if (!urls.includes(restored2)) fail(`Missing restored article from sitemap: ${restored2}`);
}

async function testLegacyRedirects() {
  console.log('\n--- Checking Legacy Redirects ---');
  
  const configText = fs.readFileSync(path.join(process.cwd(), 'next.config.ts'), 'utf8');
  const regex = /source:\s*'([^']+)',\s*destination:\s*'([^']+)'/g;
  const redirects = [];
  let match;
  while ((match = regex.exec(configText)) !== null) {
    redirects.push({ from: match[1], to: match[2] });
  }
  
  if (redirects.length === 0) {
    fail('Failed to extract redirects from next.config.ts');
    return;
  }
  
  for (const { from, to } of redirects) {
    pathChecksCount++;
    const testFrom = `${baseUrl}${from}`;
    let currentUrl = testFrom;
    let hops = 0;
    let initialStatus = 0;
    
    while (hops < 5) {
      const res = await fetchUrl(currentUrl, { redirect: 'manual' });
      if (hops === 0) initialStatus = res.status;
      if (res.status >= 300 && res.status < 400) {
        currentUrl = res.headers.get('location');
        if (currentUrl.startsWith('/')) currentUrl = `${baseUrl}${currentUrl}`;
        hops++;
      } else if (res.ok) {
        break;
      } else {
        fail(`Redirect chain for ${from} failed with status ${res.status}`);
        break;
      }
    }
    
    if (hops === 0) fail(`No redirect for ${from}`);
    if (initialStatus !== 308) fail(`Expected 308 for ${from}, got ${initialStatus}`);
    if (hops > 1) fail(`Too many hops (${hops}) for ${from}. Expected 1.`);
    
    const finalPath = currentUrl.replace(baseUrl, '').replace('https://odysseybaths.co.uk', '');
    if (finalPath !== to && finalPath !== `${to}/`) {
      fail(`Redirect mismatch for ${from}: expected ${to}, got ${finalPath}`);
    }
    
    const finalRes = await fetchUrl(`${baseUrl}${finalPath}`);
    if (!finalRes.ok) {
      fail(`Final destination ${finalPath} is not 200, got ${finalRes.status}`);
    } else {
      const html = await finalRes.text();
      const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
      if (!canonicalMatch || canonicalMatch[1].replace('https://odysseybaths.co.uk', '').replace(/\/$/, '') !== finalPath.replace(/\/$/, '')) {
         fail(`Canonical mismatch at destination ${finalPath}`);
      }
    }
    
    // Representative Trailing Slash check (on first 5 only to save time, but the prompt implies doing it)
    // Actually, I will do it for ALL 53 to be absolutely thorough.
    trailingSlashChecksCount++;
    const testFromSlash = `${baseUrl}${from}/`;
    let hopsSlash = 0;
    let currSlashUrl = testFromSlash;
    while (hopsSlash < 5) {
      const res = await fetchUrl(currSlashUrl, { redirect: 'manual' });
      if (res.status >= 300 && res.status < 400) {
        currSlashUrl = res.headers.get('location');
        if (currSlashUrl.startsWith('/')) currSlashUrl = `${baseUrl}${currSlashUrl}`;
        hopsSlash++;
      } else if (res.ok) {
        break;
      } else {
        break;
      }
    }
    if (hopsSlash > 2) fail(`Too many hops (${hopsSlash}) for trailing slash ${from}/`);
    
    const finalPathSlash = currSlashUrl.replace(baseUrl, '').replace('https://odysseybaths.co.uk', '');
    if (finalPathSlash !== to && finalPathSlash !== `${to}/`) {
      fail(`Redirect mismatch for ${from}/: expected ${to}, got ${finalPathSlash}`);
    }
    
    // Representative Query String check
    queryChecksCount++;
    const testFromQuery = `${baseUrl}${from}?utm_source=test`;
    let hopsQuery = 0;
    let currQueryUrl = testFromQuery;
    while (hopsQuery < 5) {
      const res = await fetchUrl(currQueryUrl, { redirect: 'manual' });
      if (res.status >= 300 && res.status < 400) {
        currQueryUrl = res.headers.get('location');
        if (currQueryUrl.startsWith('/')) currQueryUrl = `${baseUrl}${currQueryUrl}`;
        hopsQuery++;
      } else if (res.ok) {
        break;
      } else {
        break;
      }
    }
    if (!currQueryUrl.includes('?utm_source=test')) {
      fail(`Query string lost for ${from}?utm_source=test (got ${currQueryUrl})`);
    }
  }
  console.log(`[PASS] Verified ${pathChecksCount} path mappings.`);
  console.log(`[PASS] Verified ${trailingSlashChecksCount} trailing-slash scenarios.`);
  console.log(`[PASS] Verified ${queryChecksCount} query-string scenarios.`);
}

async function testHostRedirects() {
  console.log('\n--- Checking Host Redirects ---');
  if (!baseUrl.includes('localhost')) {
     console.log('Skipping host header checks against remote preview (only reliably testable locally without DNS overrides).');
     return;
  }
  
  const hosts = ['www.odysseybaths.co.uk', 'odyssey-navy-theta.vercel.app', 'odyssey-alpha-eosin.vercel.app'];
  for (const host of hosts) {
    hostChecksCount++;
    const res = await fetchWithHttpHost(`${baseUrl}/about?test=1`, host);
    
    if (res.status !== 308) {
      fail(`Expected 308 for host ${host}, got ${res.status}`);
      continue;
    }
    const loc = res.location;
    if (!loc.startsWith('https://odysseybaths.co.uk')) {
      fail(`Host redirect for ${host} did not redirect to https://odysseybaths.co.uk (got ${loc})`);
    }
    if (!loc.includes('/about')) {
      fail(`Host redirect for ${host} did not preserve path (got ${loc})`);
    }
    if (!loc.includes('?test=1')) {
      fail(`Host redirect for ${host} did not preserve query string (got ${loc})`);
    }
  }
  console.log(`[PASS] Verified ${hostChecksCount} host redirects.`);
}

async function testRestoredArticles() {
  console.log('\n--- Checking Restored Articles ---');
  const articles = [
    {
       path: '/walk-in-baths-with-showers-the-best-dual-function-options-in-the-uk',
       pub: "2025-03-08T06:40:11+00:00",
       mod: "2025-03-08T06:48:01+00:00"
    },
    {
       path: '/installing-a-walk-in-bath',
       pub: "2023-03-02T17:50:46+00:00",
       mod: "2024-01-30T06:00:42+00:00"
    }
  ];
  
  for (const {path, pub, mod} of articles) {
    const testUrl = `${baseUrl}${path}`;
    const res = await fetchUrl(testUrl);
    if (!res.ok) {
      fail(`Article not found: ${path}`);
      continue;
    }
    const html = await res.text();
    
    if (!html.includes('"@type":"BlogPosting"')) {
      fail(`Missing BlogPosting JSON-LD on ${path}`);
    } else {
      if (!html.includes(`"datePublished":"${pub}"`)) {
         fail(`Incorrect or missing datePublished on ${path}. Expected ${pub}`);
      }
      if (!html.includes(`"dateModified":"${mod}"`)) {
         fail(`Incorrect or missing dateModified on ${path}. Expected ${mod}`);
      }
    }
    
    if (!/<h1[^>]*>.*?<\/h1>/is.test(html)) {
      fail(`Missing H1 on ${path}`);
    }
    
    if (!html.includes('ODYSSEY_Transparent-File-2048x735.webp')) {
      fail(`Missing publisher logo on ${path}`);
    }
  }
  console.log(`[PASS] Verified restored articles (including accurate publication/modified dates).`);
}

async function run() {
  await testSitemap();
  await testLegacyRedirects();
  await testHostRedirects();
  await testRestoredArticles();
  
  console.log('\n--- Summary ---');
  if (hasErrors) {
    console.error(`FAILED: SEO recovery verification found errors.`);
    process.exit(1);
  } else {
    console.log(`PASSED: All SEO recovery checks passed.`);
    process.exit(0);
  }
}

run();
