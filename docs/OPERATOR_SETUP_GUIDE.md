# 📖 Vance Autonomous SDR — Operator & Client Setup Guide

This guide details how to configure workspaces, outbound sending mailboxes, offer blueprints, and deliverability shields in Vance with **zero code changes**.

---

## 🚀 1. Outbound Mailbox Setup (Google Workspace & Gmail)

To send automated outbound emails via Google Workspace or personal Gmail without trigger-blocking:

### Step-by-Step Google App Password Generation:
1. Open your Google Account Security settings: **[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)**.
2. If prompted, ensure **2-Step Verification** is turned ON for the account.
3. In the **App name** field, enter: `Vance SDR` and click **Create**.
4. Google will display a **16-character password** (e.g., `abcd efgh ijkl mnop`).
5. Return to Vance Dashboard:
   - Go to **Engine & Ops** (`#controls`).
   - In **02. Sending Mailbox & Safety Gate**:
     - **Provider Mode**: Select `Google Workspace (OAuth / App Password)`.
     - **Outbound Email**: Enter your Google email (e.g., `mangal@trackkaroai.com`).
     - **Mailbox Password**: Paste the 16-character App Password (spaces will be automatically handled).
     - **SMTP Host & Port**: Automatically set to `smtp.gmail.com` and `465`.
6. Click **Test SMTP Ping**:
   - You should see an instant green notification: `⚡ SMTP Handshake Success! Verified Live 200 OK!`.
7. Click **Save & Apply Engine Config**.

---

## ⚡ 2. Custom SMTP Setup (Resend, AWS SES, Mailforge)

If you use high-volume cold email infrastructure:

1. In **02. Sending Mailbox & Safety Gate**, select **Custom SMTP**.
2. Fill in your SMTP provider details:
   - **Resend**: Host: `smtp.resend.com` | Port: `587` | User: `resend` | Password: `re_...` API key.
   - **AWS SES**: Host: `email-smtp.<region>.amazonaws.com` | Port: `587` | User: SES SMTP User | Password: SES SMTP Password.
3. Click **Test SMTP Ping** to confirm live socket TLS handshake.
4. Click **Save & Apply Engine Config**.

---

## 🎯 3. Offer & ICP Blueprint Tuning

Define your product positioning so the AI Scout and Writer agents target the exact decision-makers:

- **Product / Offer Name**: The exact service (e.g., `Dubai & India Speed-to-Lead` or `B2B AI SDR Retainer`).
- **Core Offer / Hook**: The single strongest value proposition (e.g., `Sub-15s lead response for Real Estate & Clinics`).
- **Target Decision Maker Titles**: Comma-separated list (e.g., `Founder, CEO, Managing Director, Head of Growth, VP Sales`).
- **Target Geography**: Comma-separated target markets (e.g., `Dubai, UAE, India, US`).
- **Meeting Booking Link**: Your Calendly or Cal.com URL (e.g., `https://cal.com/mangal/15min`).

> **Zero Code Required**: Saving this card automatically updates both `.env` and `harvey.yaml` so subsequent prospecting cycles reflect these parameters.

---

## 🛡️ 4. Deliverability & Safety Rules

- **Daily Send Cap**: Recommended setting is **20–25 emails/day** per mailbox during the first 30 days of cold outreach to protect sender reputation.
- **Outbox Approval Gate**: Keep this checkbox **CHECKED** during initial onboarding.
  - Every email Vance writes will pause in the **Review Desk** (`#today` / `#outbox`).
  - You can inspect the email, approve with <kbd>A</kbd>, reject with <kbd>R</kbd>, or edit the copy with 1 click.
  - Once confidence is 100%, you can disable approval for full autonomous dispatch.
- **MX Deliverability Shield**: Contacts without deliverable emails are automatically tagged as `Needs Email` rather than sent blind, keeping domain bounce rates strictly under 2.5%.
