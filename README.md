# DDoS Protection Proxy

A modern, high-performance DDoS protection proxy built with **Next.js App Router** and **TypeScript**.

This project acts as a protective layer in front of any origin site. It limits abusive traffic based on **requests per second (RPS)** per IP.  
If an IP exceeds the threshold, it is challenged with a CAPTCHA before any further requests can reach the origin.

---

## ✨ Features

- ⚡️ **Request-per-second (RPS) limit** per IP (configurable)
- 🔐 **Middleware-based rate limiting** using in-memory tracking
- 🧠 **SVG CAPTCHA challenge** with `svg-captcha`
- 🍪 **Cookie-based validation** after successful CAPTCHA
- 🔁 **Automatic redirection** back to the original page after solving CAPTCHA
- 🧱 Built with **Next.js App Router** (no legacy Express)
- 🟦 **TypeScript-first** codebase
- 🚀 Ready for further expansion (e.g. Redis, browser fingerprinting)

---

## 🧠 How It Works

1. User requests any page (e.g. `/dashboard`, `/profile`, etc.)
2. Middleware checks the number of requests per IP in the last second
3. If RPS exceeds the configured threshold, user is redirected to `/proxy?next=/original-path`
4. User sees a CAPTCHA (SVG-based)
5. If CAPTCHA is solved correctly, a cookie is set to validate the IP
6. User is redirected back to the original page
7. Validated IPs can continue accessing the site

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/) App Router
- [TypeScript](https://www.typescriptlang.org/)
- [svg-captcha](https://www.npmjs.com/package/svg-captcha)
- [PNPM](https://pnpm.io/)
- In-memory store for rate tracking and IP validation
- Middleware API (`middleware.ts`)
- No Express or external proxy dependencies

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ddos-protection-proxy.git
cd ddos-protection-proxy
pnpm i
pnpm run build
pnpm run start
```

### Configuration
Create a (`.env`) file in the root directory:

```.env.local
ORIGIN_URL=https://www.your-origin-server.com
```
