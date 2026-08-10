// Privacy-conscious analytics abstractions for GA4, GTM, Meta Pixel, and LinkedIn Insight Tag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, data: Record<string, unknown>) => void;
  }
}

export type EventName =
  | "book_strategy_call_click"
  | "whatsapp_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "service_card_click"
  | "audit_request_click"
  | "download_cv_click"
  | "linkedin_profile_click";

export function trackEvent(eventName: EventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params || {});
  }

  // Google Tag Manager
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // Meta Pixel
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params || {});
  }

  // LinkedIn Tag
  if (typeof window.lintrk === "function") {
    window.lintrk("track", { conversion_id: eventName, ...params });
  }

  // Safe development log
  if (process.env.NODE_NODE_ENV === "development") {
    console.log(`[Analytics Event]: ${eventName}`, params);
  }
}
