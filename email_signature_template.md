# Email Signature Template & Setup Guide

This document contains copy-pasteable email signature templates (both HTML for advanced clients and Markdown/Rich Text for standard clients like Gmail or Apple Mail) and instructions on setting up your custom business email for Google Calendar bookings.

---

## 1. Rich Text Template (For Gmail, Apple Mail, Outlook)

Copy and paste the section below directly into your email client's signature box:

---

[Insert `email_signature_banner_white.jpg` image here]

**Your Name**  
*Founder / Director*  
**The Perfectionists**  

[Book a Free Consultation ➔](https://calendar.app.google/79xGJrNVucjU4gjy8)  
[hello@perfectionists.co.za](mailto:hello@perfectionists.co.za) | [perfectionists.co.za](https://perfectionists.co.za)  

---

## 2. HTML Template (For Advanced Signature Builders)

If your email client or CRM supports HTML signatures, use this code:

```html
<div style="font-family: Arial, sans-serif; color: #111111; line-height: 1.5; max-width: 500px;">
  <!-- Banner Image -->
  <div style="margin-bottom: 16px;">
    <img src="https://perfectionists.co.za/email_signature_banner_white.jpg" alt="PERFECTIONISTS Banner" style="width: 100%; max-width: 500px; display: block; border: 0;" />
  </div>
  
  <!-- Sender Details -->
  <div style="margin-bottom: 12px;">
    <strong style="font-size: 16px; color: #000000; display: block; margin-bottom: 2px;">Your Name</strong>
    <span style="font-size: 13px; color: #555555; font-style: italic; display: block; margin-bottom: 2px;">Founder / Director</span>
    <strong style="font-size: 13px; color: #5E0ED7; display: block;">The Perfectionists</strong>
  </div>

  <!-- Contact & Links -->
  <div style="font-size: 12px; border-top: 1px solid #eeeeee; padding-top: 12px;">
    <a href="https://calendar.app.google/79xGJrNVucjU4gjy8" target="_blank" style="color: #5E0ED7; font-weight: bold; text-decoration: none; display: inline-block; margin-right: 15px;">Book a Free Consultation &#10142;</a>
    <a href="mailto:hello@perfectionists.co.za" style="color: #111111; text-decoration: none; display: inline-block; margin-right: 15px;">hello@perfectionists.co.za</a>
    <a href="https://perfectionists.co.za" target="_blank" style="color: #111111; text-decoration: none; display: inline-block;">perfectionists.co.za</a>
  </div>
</div>
```

---

## 3. How to Set Up Your Business Email for Google Calendar Bookings

To configure your business email (`hello@perfectionists.co.za`) to handle client booking schedules, choose one of the options below:

### Option A: Google Workspace (Highly Recommended & Most Professional)
If you host your business email with Google Workspace:
1. Log in to your Google Workspace account (e.g. `hello@perfectionists.co.za`).
2. Go to **Google Calendar** ([calendar.google.com](https://calendar.google.com)).
3. Click the **"+ Create"** button in the top left and select **"Appointment Schedule"**.
4. Configure your booking page options:
   * **Title**: e.g., "30-Minute Free Consultation"
   * **Appointment Duration**: Select slot sizes (e.g., 30 or 45 mins).
   * **Availability**: Define your working hours and days.
   * **Booking Window**: Limit how far in advance appointments can be made.
   * **Booking Form**: Customize details you want to collect (Name, Email, Project Brief).
5. Click **"Save"**.
6. Click the **"Share"** button on the appointment page card to copy your unique booking link, then paste it in your email signature links above.

### Option B: Free Google Account linked to Custom Email Alias
If your business email forwards to a free `@gmail.com` account and you send mail using SMTP:
1. Go to **Google Calendar** on your personal Gmail account.
2. Click **"+ Create"** ➔ **"Appointment Schedule"** (available on free accounts, though with fewer customization options than Workspace).
3. Configure the slots and save.
4. Add the booking link in your email signature.
5. In Gmail settings under **"Accounts and Import"**, make sure your custom business email (`hello@perfectionists.co.za`) is selected as your default sender address, so confirmation notifications and invites appear to come directly from your domain.
