#!/usr/bin/env node

// Generate sitemap.xml for EduMentor+
// Usage: SITE_ORIGIN="https://yourapp.com" SUPABASE_URL="..." SUPABASE_SERVICE_ROLE_KEY="..." node scripts/gen_sitemap.mjs > public/sitemap.xml

import { createClient } from '@supabase/supabase-js';

const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://yourapp.com';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Static pages
const staticPages = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/auth', changefreq: 'monthly', priority: '0.5' },
  { loc: '/assessment', changefreq: 'weekly', priority: '0.9' },
  { loc: '/courses', changefreq: 'weekly', priority: '0.8' },
  { loc: '/dashboard', changefreq: 'daily', priority: '0.7' },
  { loc: '/achievements', changefreq: 'weekly', priority: '0.6' },
  { loc: '/settings', changefreq: 'monthly', priority: '0.5' },
  { loc: '/coach', changefreq: 'weekly', priority: '0.7' },
];

async function generateSitemap() {
  const now = new Date().toISOString();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  staticPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_ORIGIN}${page.loc}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  // Fetch dynamic content (tracks from assessment results)
  try {
    const { data: tracks } = await supabase
      .from('assessment_results')
      .select('track_id')
      .order('created_at', { ascending: false })
      .limit(100);

    const uniqueTracks = [...new Set(tracks?.map(t => t.track_id) || [])];
    
    uniqueTracks.forEach(trackId => {
      xml += '  <url>\n';
      xml += `    <loc>${SITE_ORIGIN}/tracks/${trackId}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
  } catch (error) {
    console.error('Error fetching dynamic content:', error);
  }

  xml += '</urlset>\n';
  
  console.log(xml);
}

generateSitemap().catch(console.error);
