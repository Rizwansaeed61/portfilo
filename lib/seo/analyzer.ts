import { SeoPageAudit, SeoIssueItem, ImageSeoItem, LinkSeoItem, SchemaAuditItem } from "./types";

export class SeoPageAnalyzer {
  /**
   * Evaluates On-Page SEO parameters for a site route
   */
  public analyzePage(
    routePath: string,
    rawHtml: string = "",
    metaTitle: string = "",
    metaDescription: string = "",
    canonicalUrl?: string,
    noIndex: boolean = false,
    noFollow: boolean = false
  ): {
    audit: SeoPageAudit;
    issues: SeoIssueItem[];
    images: ImageSeoItem[];
    links: LinkSeoItem[];
    schemas: SchemaAuditItem[];
  } {
    const titleLen = metaTitle ? metaTitle.trim().length : 0;
    const descLen = metaDescription ? metaDescription.trim().length : 0;
    const issues: SeoIssueItem[] = [];

    // Title Tag Audits
    if (titleLen === 0) {
      issues.push({
        id: `issue-title-missing-${Date.now()}`,
        issueCode: "MISSING_TITLE",
        name: "Missing SEO Title Tag",
        category: "ON_PAGE",
        severity: "CRITICAL",
        priority: "P1",
        explanation: "The page has no meta title tag specified.",
        whyItMatters: "Title tags are the single most critical on-page SEO element for search engine rankings and CTR.",
        howToFix: "Add a descriptive SEO title between 50 and 60 characters containing your primary keyword.",
        affectedUrls: [routePath],
        firstDetected: new Date().toISOString(),
        lastDetected: new Date().toISOString(),
        status: "OPEN",
      });
    } else if (titleLen < 30) {
      issues.push({
        id: `issue-title-short-${Date.now()}`,
        issueCode: "SHORT_TITLE",
        name: "SEO Title Too Short",
        category: "ON_PAGE",
        severity: "MEDIUM",
        priority: "P3",
        explanation: `Title tag is only ${titleLen} characters long.`,
        whyItMatters: "Short title tags miss valuable keyword targeting opportunities.",
        howToFix: "Expand the title tag to 50–60 characters to include relevant modifier keywords.",
        affectedUrls: [routePath],
        firstDetected: new Date().toISOString(),
        lastDetected: new Date().toISOString(),
        status: "OPEN",
      });
    } else if (titleLen > 65) {
      issues.push({
        id: `issue-title-long-${Date.now()}`,
        issueCode: "LONG_TITLE",
        name: "SEO Title Too Long (SERP Truncation)",
        category: "ON_PAGE",
        severity: "MEDIUM",
        priority: "P3",
        explanation: `Title tag is ${titleLen} characters long and will be truncated on Google desktop SERPs.`,
        whyItMatters: "Truncated titles look messy and reduce click-through rates.",
        howToFix: "Shorten the title tag to 50–60 characters.",
        affectedUrls: [routePath],
        firstDetected: new Date().toISOString(),
        lastDetected: new Date().toISOString(),
        status: "OPEN",
      });
    }

    // Meta Description Audits
    if (descLen === 0) {
      issues.push({
        id: `issue-desc-missing-${Date.now()}`,
        issueCode: "MISSING_DESC",
        name: "Missing Meta Description Tag",
        category: "ON_PAGE",
        severity: "HIGH",
        priority: "P2",
        explanation: "The page has no meta description tag.",
        whyItMatters: "Meta descriptions dictate the snippet text displayed under your SERP headline.",
        howToFix: "Add a compelling 140–160 character meta description with a call to action.",
        affectedUrls: [routePath],
        firstDetected: new Date().toISOString(),
        lastDetected: new Date().toISOString(),
        status: "OPEN",
      });
    } else if (descLen < 110) {
      issues.push({
        id: `issue-desc-short-${Date.now()}`,
        issueCode: "SHORT_DESC",
        name: "Meta Description Too Short",
        category: "ON_PAGE",
        severity: "LOW",
        priority: "P4",
        explanation: `Meta description is only ${descLen} characters long.`,
        whyItMatters: "Short descriptions leave available snippet real estate unused on Google SERPs.",
        howToFix: "Expand description to 140–160 characters.",
        affectedUrls: [routePath],
        firstDetected: new Date().toISOString(),
        lastDetected: new Date().toISOString(),
        status: "OPEN",
      });
    }

    // Indexability Status
    let indexabilityStatus: SeoPageAudit["indexabilityStatus"] = "INDEXABLE";
    let indexabilityReason = "Page is indexable by search engines.";

    if (noIndex) {
      indexabilityStatus = "NOINDEX";
      indexabilityReason = "Meta robots tag contains noindex directive.";
      issues.push({
        id: `issue-noindex-${Date.now()}`,
        issueCode: "UNEXPECTED_NOINDEX",
        name: "Page Contains NoIndex Directive",
        category: "INDEXABILITY",
        severity: routePath === "/" ? "CRITICAL" : "HIGH",
        priority: routePath === "/" ? "P1" : "P2",
        explanation: "This page instructs search engines not to index its content.",
        whyItMatters: "Noindex pages will not appear in Google search results or receive organic traffic.",
        howToFix: "Remove noindex tag if this is a public landing page.",
        affectedUrls: [routePath],
        firstDetected: new Date().toISOString(),
        lastDetected: new Date().toISOString(),
        status: "OPEN",
      });
    }

    // Mock Sample Images for audit
    const sampleImages: ImageSeoItem[] = [
      {
        id: `img-1-${Date.now()}`,
        imageUrl: "/images/rizwan-saeed.png",
        sourcePageUrl: routePath,
        altText: "Rizwan Saeed — Digital Marketing Specialist",
        isDecorative: false,
        hasAltAttribute: true,
        width: 800,
        height: 800,
        fileSizeKb: 145,
        fileType: "png",
        status: "OK",
      },
    ];

    // Mock Sample Links for audit
    const sampleLinks: LinkSeoItem[] = [
      {
        id: `link-1-${Date.now()}`,
        sourceUrl: routePath,
        targetUrl: "/services",
        anchorText: "Explore Digital Growth Services",
        isInternal: true,
        statusCode: 200,
        status: "OK",
      },
      {
        id: `link-2-${Date.now()}`,
        sourceUrl: routePath,
        targetUrl: "/contact",
        anchorText: "Book a Strategy Call",
        isInternal: true,
        statusCode: 200,
        status: "OK",
      },
    ];

    // Sample Schemas
    const sampleSchemas: SchemaAuditItem[] = [
      {
        id: `schema-1-${Date.now()}`,
        pageUrl: routePath,
        schemaType: routePath === "/services" ? "ProfessionalService" : "Person",
        isValid: true,
        errors: [],
        jsonLdSnippet: JSON.stringify({
          "@context": "https://schema.org",
          "@type": routePath === "/services" ? "ProfessionalService" : "Person",
          name: "Rizwan Saeed",
          url: `https://rizwansaeed.com${routePath}`,
        }),
      },
    ];

    // Calculate SEO Score
    let seoScore = 100;
    if (titleLen === 0 || titleLen < 30 || titleLen > 65) seoScore -= 15;
    if (descLen === 0 || descLen < 110 || descLen > 175) seoScore -= 15;
    if (noIndex) seoScore -= 40;

    const audit: SeoPageAudit = {
      id: `audit-${routePath.replace(/\//g, "-") || "home"}`,
      url: `https://rizwansaeed.com${routePath}`,
      normalizedUrl: `https://rizwansaeed.com${routePath}`,
      statusCode: 200,
      title: metaTitle || "Rizwan Saeed Portfolio",
      titleLength: titleLen,
      metaDescription: metaDescription || "Digital growth consulting services.",
      metaDescriptionLength: descLen,
      canonicalUrl: canonicalUrl || `https://rizwansaeed.com${routePath}`,
      h1Text: metaTitle,
      h1Count: 1,
      headingsHierarchyValid: true,
      wordCount: 450,
      indexabilityStatus,
      indexabilityReason,
      noIndex,
      noFollow,
      seoScore: Math.max(seoScore, 40),
      internalInboundLinks: 8,
      internalOutboundLinks: 12,
      brokenLinksCount: 0,
      imagesMissingAltCount: 0,
      schemaTypes: [routePath === "/services" ? "ProfessionalService" : "Person"],
      ogImage: "/images/rizwan-saeed.png",
      responseTimeMs: 120,
      lastCrawledAt: new Date().toISOString(),
      clickDepth: routePath === "/" ? 0 : 1,
    };

    return {
      audit,
      issues,
      images: sampleImages,
      links: sampleLinks,
      schemas: sampleSchemas,
    };
  }
}
