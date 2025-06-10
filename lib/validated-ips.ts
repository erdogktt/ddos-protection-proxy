const validatedIps = new Map<string, number>();

export function setValidatedIp(ip: string) {
  validatedIps.set(ip, Date.now());
}

export function isValidatedIp(ip: string, maxAgeMs = 10 * 60 * 1000): boolean {
  const ts = validatedIps.get(ip);
  if (!ts) return false;
  if (Date.now() - ts > maxAgeMs) {
    validatedIps.delete(ip);
    return false;
  }
  return true;
}
