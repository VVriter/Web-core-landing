export default defineEventHandler((event) => {
  const siteUrl = 'https://web-core.agency'
  const currentDate = new Date().toISOString().split('T')[0]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Головна сторінка -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${siteUrl}/og-image.jpg</image:loc>
      <image:title>WebCore Agency - Професійна веб-розробка</image:title>
    </image:image>
  </url>
  
  <!-- Основні сторінки -->
  <url>
    <loc>${siteUrl}/services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/projects</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${siteUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Сторінки послуг -->
  <url>
    <loc>${siteUrl}/services/web-development</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/services/mobile-apps</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/services/ui-ux-design</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/services/ecommerce</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/services/seo</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}/services/maintenance</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Статті блогу -->
  <url>
    <loc>${siteUrl}/blog/seo-guide-2024</loc>
    <lastmod>2024-11-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${siteUrl}/images/blog/seo-guide-hero.jpg</image:loc>
      <image:title>SEO в 2024 році: повний гід по просуванню сайту в Google</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}/blog/ecommerce-development-guide</loc>
    <lastmod>2024-10-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${siteUrl}/images/blog/ecommerce-development-hero.jpg</image:loc>
      <image:title>Розробка інтернет-магазину в 2024: від ідеї до прибуткового бізнесу</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}/blog/website-redesign-guide</loc>
    <lastmod>2024-10-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${siteUrl}/images/blog/website-redesign-hero.jpg</image:loc>
      <image:title>Редизайн сайту в 2024: як збільшити конверсію на 200% за 3 місяці</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}/blog/landing-page-optimization</loc>
    <lastmod>2024-11-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${siteUrl}/images/blog/landing-page-hero.jpg</image:loc>
      <image:title>Як створити ефективний landing page: повний гід по конверсії</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}/blog/web-design-trends-2024</loc>
    <lastmod>2024-10-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${siteUrl}/images/blog/design-trends-hero.jpg</image:loc>
      <image:title>Тренди веб-дизайну 2024: що буде актуально</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}/blog/website-speed-optimization</loc>
    <lastmod>2024-10-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${siteUrl}/images/blog/speed-optimization-hero.jpg</image:loc>
      <image:title>Оптимізація швидкості сайту: покроковий гід по прискоренню</image:title>
    </image:image>
  </url>
  
  <!-- Корпоративні сторінки -->
  <url>
    <loc>${siteUrl}/team</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${siteUrl}/careers</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${siteUrl}/case-studies</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${siteUrl}/testimonials</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Ресурси та підтримка -->
  <url>
    <loc>${siteUrl}/documentation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/help-center</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Правові сторінки -->
  <url>
    <loc>${siteUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${siteUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${siteUrl}/cookies</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=7200')
  
  return sitemap
})

