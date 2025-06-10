import type { NextApiRequest, NextApiResponse } from 'next';
import svgCaptcha from 'svg-captcha';
import { serialize } from 'cookie';

/**
 *  Generates and serves a CAPTCHA SVG image
 *  The CAPTCHA text will be saved in cookies
*/

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 3,
    color: true,
    background: '#ccf2ff',
  });

  res.setHeader(
    'Set-Cookie',
    serialize('captcha_text', captcha.text, {
      httpOnly: true,
      maxAge: 300,
      path: '/',
      sameSite: 'lax',
    })
  );

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(captcha.data);
}