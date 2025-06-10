const ipHits = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const oneSecAgo = now - 1000;

  const timestamps = ipHits.get(ip) || [];
  const recent = timestamps.filter(ts => ts > oneSecAgo);
  recent.push(now);

  ipHits.set(ip, recent);
  return recent.length > 5;
}
