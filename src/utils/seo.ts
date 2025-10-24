// SEO utility functions for EduMentor+

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export const updatePageSEO = (metadata: SEOMetadata) => {
  // Update title
  document.title = metadata.title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', metadata.description);

  // Update or create meta keywords
  if (metadata.keywords && metadata.keywords.length > 0) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', metadata.keywords.join(', '));
  }

  // Update Open Graph tags
  updateMetaTag('og:title', metadata.title);
  updateMetaTag('og:description', metadata.description);
  if (metadata.ogImage) {
    updateMetaTag('og:image', metadata.ogImage);
  }

  // Update Twitter Card tags
  updateMetaTag('twitter:title', metadata.title);
  updateMetaTag('twitter:description', metadata.description);
  if (metadata.ogImage) {
    updateMetaTag('twitter:image', metadata.ogImage);
  }

  // Update canonical URL
  if (metadata.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', metadata.canonicalUrl);
  }
};

const updateMetaTag = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

// Page-specific SEO metadata
export const pageSEO = {
  home: {
    title: 'EduMentor+ | منصة التوجيه المهني الذكية',
    description: 'اكتشف مسارك المهني المثالي مع EduMentor+. تقييم شخصي ذكي، توصيات مخصصة، ومتابعة تقدمك في رحلتك التعليمية والمهنية.',
    keywords: ['توجيه مهني', 'تقييم شخصي', 'مسار مهني', 'تعليم إلكتروني', 'ذكاء اصطناعي']
  },
  assessment: {
    title: 'التقييم الشخصي | EduMentor+',
    description: 'أكمل التقييم الشخصي الذكي واكتشف المسار المهني الأنسب لك بناءً على مهاراتك واهتماماتك.',
    keywords: ['تقييم شخصي', 'اختبار مهني', 'RIASEC', 'Big Five', 'اكتشاف المهارات']
  },
  courses: {
    title: 'الدورات التدريبية | EduMentor+',
    description: 'استكشف الدورات التدريبية المخصصة لمسارك المهني. تعلم المهارات المطلوبة واحصل على شهادات معتمدة.',
    keywords: ['دورات تدريبية', 'تعليم إلكتروني', 'شهادات معتمدة', 'تطوير مهارات']
  },
  dashboard: {
    title: 'لوحة التحكم | EduMentor+',
    description: 'تتبع تقدمك، شاهد توصياتك الشخصية، وإدارة رحلتك التعليمية من لوحة التحكم.',
    keywords: ['لوحة تحكم', 'متابعة التقدم', 'إحصائيات شخصية']
  }
};
