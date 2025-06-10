import { NextResponse } from 'next/server';

/**
 * Processes and validates user-submitted CAPTCHA solutions
 */

export async function POST(request: Request) {
  const formData = await request.formData();
  const solution = formData.get('solution')?.toString() ?? '';
  const nextPath = formData.get('next')?.toString() ?? '/';

  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/captcha_text=([^;]+)/);
  const captchaText = match ? decodeURIComponent(match[1]) : '';

  const correct = solution.toLowerCase() === captchaText.toLowerCase();

  if (correct) {
    const response = NextResponse.json({ success: true, next: nextPath });
    response.cookies.set('captcha_pass', 'true', { maxAge: 3600 });
    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
