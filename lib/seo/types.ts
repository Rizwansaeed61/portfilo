export type IssueSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type IssuePriority = "P1" | "P2" | "P3" | "P4";
export type IssueCategory =
  | "CRAWLABILITY"
  | "INDEXABILITY"
  | "ON_PAGE"
  | "CONTENT"
  | "IMAGES"
  | "LINKS"
  | "PERFORMANCE"
  | "SCHEMA"
  | "SITEMAP"
  | "ROBOTS";
export type IssueStatus = "OPEN" | "IN_PROGRESS" | "IGNORED" | "RESOLVED";

export interface SeoIssueItem {
  id: string;
  issueCode: string;
  name: string;
  category: IssueCategory;
  severity: IssueSeverity;
  priority: IssuePriority;
  explanation: string;
  whyItMatters: string;
  howToFix: string;
  affectedUrls: string[];
  evidence?: { url: string; detail: string }[];
  firstDetected: string;
  lastDetected: string;
  status: IssueStatus;
}

export interface SeoPageAudit {
  id: string;
  url: string;
  normalizedUrl: string;
  statusCode: number;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescriptionLength: number;
  canonicalUrl?: string;
  h1Text?: string;
  h1Count: number;
  headingsHierarchyValid: boolean;
  wordCount: number;
  indexabilityStatus: "INDEXABLE" | "NOINDEX" | "BLOCKED_ROBOTS" | "REDIRECTED" | "BROKEN" | "CANONICALIZED";
  indexabilityReason: string;
  noIndex: boolean;
  noFollow: boolean;
  seoScore: number;
  internalInboundLinks: number;
  internalOutboundLinks: number;
  brokenLinksCount: number;
  imagesMissingAltCount: number;
  schemaTypes: string[];
  ogImage?: string;
  responseTimeMs: number;
  lastCrawledAt: string;
  clickDepth: number;
}

export interface ImageSeoItem {
  id: string;
  imageUrl: string;
  sourcePageUrl: string;
  altText?: string;
  isDecorative: boolean;
  hasAltAttribute: boolean;
  width?: number;
  height?: number;
  fileSizeKb?: number;
  fileType?: string;
  status: "OK" | "MISSING_ALT" | "BROKEN" | "OVERSIZED" | "MISSING_DIMENSIONS";
}

export interface LinkSeoItem {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  isInternal: boolean;
  statusCode: number;
  status: "OK" | "BROKEN" | "REDIRECTED" | "TIMEOUT";
  redirectUrl?: string;
}

export interface SchemaAuditItem {
  id: string;
  pageUrl: string;
  schemaType: string;
  isValid: boolean;
  errors: string[];
  jsonLdSnippet: string;
}

export interface AuditScanRecord {
  id: string;
  scanType: "FULL" | "QUICK" | "PAGE";
  status: "COMPLETED" | "RUNNING" | "FAILED" | "CANCELLED";
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  pagesScanned: number;
  pagesIndexable: number;
  pagesNonIndexable: number;
  brokenLinksCount: number;
  criticalIssuesCount: number;
  highIssuesCount: number;
  mediumIssuesCount: number;
  lowIssuesCount: number;
  seoScore: number;
}

export interface SearchConsoleMetric {
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  changePercent?: number;
}

export interface CoreWebVitalsMetric {
  url: string;
  device: "MOBILE" | "DESKTOP";
  lcpMs: number;
  inpMs: number;
  cls: number;
  fcpMs: number;
  ttfbMs: number;
  performanceScore: number;
  status: "GOOD" | "NEEDS_IMPROVEMENT" | "POOR";
  lastChecked: string;
}

export interface SeoSettingsConfig {
  domain: string;
  sitemapUrl: string;
  crawlerConcurrency: number;
  requestTimeoutMs: number;
  maxPagesPerRun: number;
  excludedPathPrefixes: string[];
  excludedQueryParams: string[];
  autoScanFrequency: "MANUAL" | "DAILY" | "WEEKLY" | "MONTHLY";
  aiEnabled: boolean;
  searchConsoleConnected: boolean;
  pageSpeedApiKeyConfigured: boolean;
}
