// Simple sliding window in-memory rate limiter for server actions
interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const trackerMap = new Map<string, RateLimitTracker>();

export function checkRateLimit(identifier: string, limit = 5, windowMs = 60 * 1000): { success: boolean; resetInSeconds: number } {
  const now = Date.now();
  const record = trackerMap.get(identifier);

  if (!record || now > record.resetTime) {
    trackerMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, resetInSeconds: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= limit) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { success: false, resetInSeconds };
  }

  record.count += 1;
  return { success: true, resetInSeconds: Math.ceil((record.resetTime - now) / 1000) };
}
