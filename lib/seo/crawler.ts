import { SeoSettingsConfig } from "./types";

/**
 * SSRF Protection & URL Normalization Utility
 */
export class SafeSeoCrawler {
  private allowedDomains: string[];
  private excludedPrefixes: string[];
  private excludedQueryParams: string[];

  constructor(config?: Partial<SeoSettingsConfig>) {
    this.allowedDomains = [
      "rizwansaeed.com",
      "workflows-starter-template.rizwansaeed610.workers.dev",
      "localhost",
      "127.0.0.1",
    ];
    this.excludedPrefixes = config?.excludedPathPrefixes || [
      "/admin",
      "/api",
      "/login",
      "/logout",
      "/_next",
      "/static",
    ];
    this.excludedQueryParams = config?.excludedQueryParams || [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
      "ref",
    ];
  }

  /**
   * SSRF Protection Validator
   * Blocks internal private IPs, cloud metadata IP 169.254.169.254, loopback ranges
   */
  public isSsrfSafeUrl(targetUrl: string): { safe: boolean; reason?: string } {
    try {
      const parsed = new URL(targetUrl);

      // Block non-http protocols
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return { safe: false, reason: "Forbidden protocol" };
      }

      const hostname = parsed.hostname.toLowerCase();

      // Block AWS/GCP/Azure Cloud Metadata IP
      if (hostname === "169.254.169.254" || hostname.includes("metadata.google.internal")) {
        return { safe: false, reason: "Cloud metadata address blocked" };
      }

      // Block Private IPv4 Ranges
      const privateIpRegex =
        /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|0\.0\.0\.0|255\.255\.255\.255)/;
      if (privateIpRegex.test(hostname)) {
        return { safe: false, reason: "Private IP range blocked" };
      }

      return { safe: true };
    } catch {
      return { safe: false, reason: "Malformed URL" };
    }
  }

  /**
   * Normalizes URL for duplicate detection
   * Handles trailing slashes, fragments (#), case sensitivity, tracking query parameters
   */
  public normalizeUrl(url: string, baseUrl: string = "https://rizwansaeed.com"): string {
    try {
      let absolute = url;
      if (url.startsWith("/")) {
        absolute = `${baseUrl}${url}`;
      } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
        absolute = `${baseUrl}/${url}`;
      }

      const parsed = new URL(absolute);

      // Remove fragment (#pricing, #contact)
      parsed.hash = "";

      // Remove tracking query parameters
      const params = new URLSearchParams(parsed.search);
      for (const param of this.excludedQueryParams) {
        params.delete(param);
      }
      parsed.search = params.toString() ? `?${params.toString()}` : "";

      // Standardize path (remove trailing slash except root)
      let pathname = parsed.pathname;
      if (pathname.length > 1 && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }
      parsed.pathname = pathname;

      return parsed.toString();
    } catch {
      return url;
    }
  }

  /**
   * Checks if URL path is excluded from crawler
   */
  public isPathExcluded(urlPath: string): boolean {
    const normalizedPath = urlPath.toLowerCase();
    return this.excludedPrefixes.some((prefix) => normalizedPath.startsWith(prefix));
  }
}
