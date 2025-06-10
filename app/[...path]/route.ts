import { ORIGIN_URL } from '@/lib/config';

/**
 * Redirects incoming GET requests to the target origin, preserving the original path and query parameters
 * forwards the response from the origin to the client
 */

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const target = `${ORIGIN_URL}${path}${url.search}`;

  const res = await fetch(target, {
    headers: request.headers,
  });

  const body = res.body;
  return new Response(body, {
    status: res.status,
    headers: res.headers,
  });
}
