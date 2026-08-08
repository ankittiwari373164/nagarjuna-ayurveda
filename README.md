# Singhal Medicare — Website + Admin Panel

A multipage doctor/clinic website for **Dr. Anup Kumar (Singhal Medicare / Nagarjuna Ayurveda & Kshar Sutra Centre)**,
built with React + Vite + Tailwind CSS, Supabase (database), and Excel export. Blue & white theme with rounded,
friendly typography (Fredoka + Nunito).

## What's included

**Public website**
- `/` Home — hero, services teaser, conditions grid, symptom self-check, why-us, walk-in reception form, CTA
- `/about` — Dr. Anup Kumar's profile, education, specialisations
- `/conditions` — full list of medical conditions treated
- `/services` — Leech Therapy, Agnikarma Therapy, Marma Therapy, Basti Chikitsa, Swarna Prashan Sanskar
- `/kshar-sutra` — Kshar Sutra therapy explainer (process + benefits)
- `/appointment` — appointment booking form with your UPI QR code for payment
- `/contact` — enquiry form + map

**Admin panel** (`/admin`, protected by a password stored in `.env`)
- Dashboard — patient/appointment counts, revenue, recent bookings
- Patients — list, search, delete, **Export to Excel**
- Add Patient — manual patient entry (same form receptionists use on the Home page)
- Appointments — list, search, filter by status, update booking + payment status, **Export to Excel**

## 1. Set up Supabase (database only — no Supabase Auth)

1. Create a project at supabase.com.
2. Open **SQL Editor** → paste the contents of `supabase_schema.sql` → Run.
   This creates `patients`, `appointments`, `enquiries` tables.
3. Go to **Project Settings → API** and copy the **Project URL** and **anon public key**.

> **Security note:** the admin panel is protected by a password kept in your own `.env` file
> (see below), not by Supabase's login system. That keeps setup simple — no need to create
> Supabase users — but it means anyone with your Supabase anon key and URL could technically
> read/write the database directly (bypassing your website). This is fine for a small clinic
> site where the anon key isn't shared beyond the built website itself. If you ever want
> database-level protection too, say the word and this can be upgraded to use Supabase Auth
> again alongside the `.env` password.

## 2. Configure environment variables

Copy `.env.example` to `.env` and fill in:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_ADMIN_EMAIL=admin@singhalmedicare.com
VITE_ADMIN_PASSWORD=set-a-strong-password-here
```

`VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` are what you type in at `/admin/login`. Change the
password before deploying, and never commit your real `.env` file to a public repo.

## 3. Payments — your UPI QR code

No payment gateway is used. The appointment form shows your UPI QR code
(`public/images/payment-qr.png` — already set to the "Anup Kumar / Bank of India" QR you sent)
and lets the patient tick "I've completed the UPI payment" before booking. That marks the
appointment `paid_pending_verification` in the admin panel, where you can confirm it to `Paid ✓`
once you've checked your bank/UPI app — no card processor, no fees, no API keys needed.

To swap in a different QR code, replace `public/images/payment-qr.png` with your new image
(same filename, or update the `src` in `src/components/AppointmentForm.jsx`).

## 4. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. Admin panel: `http://localhost:5173/admin/login`.

## 5. Build & deploy

```bash
npm run build
```

Outputs static files to `dist/` — deploy to Vercel, Netlify, Cloudflare Pages, or any static host.
Because this is a client-side single-page app, make sure your host redirects all routes to `index.html`.

## Design

Blue & white theme with rounded "bubble" typography — **Fredoka** for headings, **Nunito** for body
text — pill-shaped buttons, soft rounded cards, and scroll-reveal animations (Framer Motion),
matching the doctor-portfolio direction you shared.

## Notes for the receptionist form

The same patient-intake form appears in two places:
- On the **Home page** (`#reception`) for front-desk walk-ins — no login required.
- In **Admin panel → Add Patient** — for staff who are already logged in.

Both write to the same `patients` table, so every record shows up in Admin → Patients regardless of
where it was entered.
