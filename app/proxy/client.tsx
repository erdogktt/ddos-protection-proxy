'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

/**
 * Captcha Verification Page
 */

export default function ProxyClient() {
  const [captchaUrl, setCaptchaUrl] = useState('');
  const [solution, setSolution] = useState('');
  const searchParams = useSearchParams();
  const nextPath = searchParams?.get('next') || '/';

  useEffect(() => {
    setCaptchaUrl(`/api/captcha?ts=${Date.now()}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/proxy/verify', {
      method: 'POST',
      body: new URLSearchParams({
        solution,
        next: nextPath,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await res.json();

    if (res.ok && data.success) {
      window.location.href = nextPath;
    } else {
      alert('Incorrect CAPTCHA! Please try again.');
      setCaptchaUrl(`/api/captcha?ts=${Date.now()}`);
      setSolution('');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl mb-4">Please verify you are human</h1>

      {captchaUrl && (
        <Image
          src={captchaUrl}
          alt="CAPTCHA"
          width={192}
          height={64}
          className="mb-4 w-48 h-auto border"
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
        <input
          name="solution"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          className="border p-2"
          placeholder="Enter CAPTCHA text"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Verify
        </button>
      </form>

      <button
        type="button"
        onClick={() => setCaptchaUrl(`/api/captcha?ts=${Date.now()}`)}
        className="mt-2 text-blue-600 underline"
      >
        Reload Captcha
      </button>
    </main>
  );
}
