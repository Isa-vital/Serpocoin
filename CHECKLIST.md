# ✅ SERPO COIN WEBSITE - SETUP CHECKLIST

## 🎯 Complete This Checklist to Launch Your Website

---

## Phase 1: Local Setup (5 minutes)

### ☐ 1. XAMPP Installation
- [ ] XAMPP installed on your computer
- [ ] Apache service started (green in XAMPP)
- [ ] MySQL service started (green in XAMPP)
- [ ] Test: `http://localhost` shows XAMPP page

### ☐ 2. Database Setup
- [ ] Opened phpMyAdmin: `http://localhost/phpmyadmin`
- [ ] Created database named `serpocoin`
- [ ] Imported `database.sql` file successfully
- [ ] Verified 3 tables created: 
  - [ ] `contact_submissions`
  - [ ] `newsletter_subscribers`
  - [ ] `admins`

### ☐ 3. Website Access
- [ ] Opened: `http://localhost/serpocoin`
- [ ] Home page loads successfully
- [ ] 3D planet animation visible
- [ ] No console errors (press F12)

---

## Phase 2: Test All Features (10 minutes)

### ☐ 4. Page Navigation
- [ ] Home page (`index.html`) ✓
- [ ] About page (`about.html`) ✓
- [ ] Vision page (`vision.html`) ✓
- [ ] Utilities page (`utilities.html`) ✓
- [ ] Tokenomics page (`tokenomics.html`) ✓
- [ ] Roadmap page (`roadmap.html`) ✓
- [ ] Team page (`team.html`) ✓
- [ ] Contact page (`contact.html`) ✓

### ☐ 5. Interactive Elements
- [ ] Navigation menu works on all pages
- [ ] All buttons respond to hover
- [ ] Scroll animations trigger (AOS)
- [ ] Utility tabs switch correctly
- [ ] Tokenomics chart displays
- [ ] Roadmap loads from JSON

### ☐ 6. Contact Form Testing
- [ ] Fill out contact form
- [ ] Submit successfully
- [ ] See SweetAlert2 success message
- [ ] Check phpMyAdmin → `contact_submissions` table
- [ ] New entry appears with your data

### ☐ 7. Newsletter Testing
- [ ] Enter email in newsletter form
- [ ] Submit successfully
- [ ] See SweetAlert2 success message
- [ ] Check phpMyAdmin → `newsletter_subscribers` table
- [ ] Email appears in database

### ☐ 8. Responsive Testing
- [ ] Resize browser window (small → large)
- [ ] Test on mobile device (or browser DevTools)
- [ ] All content readable on small screens
- [ ] Navigation menu hamburger works on mobile (< 992px)
- [ ] Logo displays correctly (SVG with PNG fallback)
- [ ] All 8 pages have uniform navigation
- [ ] Touch targets minimum 44px × 44px
- [ ] Forms don't zoom on iOS input focus
- [ ] Test responsive-test.html for detailed checks
- [ ] Review MOBILE_RESPONSIVE.md for documentation

---

## Phase 3: Customization (30 minutes)

### ☐ 9. Branding (Optional but Recommended)
- [ ] Logo created/obtained
- [ ] Saved as `assets/images/logo.png` (500x500px)
- [ ] Saved as `assets/images/logo.svg` (vector version)
- [ ] Favicon created (64x64px)
- [ ] All pages show custom logo

### ☐ 10. Content Updates
- [ ] Updated social media links in footer
- [ ] Replaced placeholder Twitter handle
- [ ] Replaced placeholder Telegram handle
- [ ] Replaced placeholder Discord link
- [ ] Updated email address (contact@serpocoin.io)

### ☐ 11. Team Section
- [ ] Updated team member names (or kept defaults)
- [ ] Added team member photos (optional)
  - Saved in `assets/images/team/`
- [ ] Updated team member bios
- [ ] Updated social media links for team

### ☐ 12. Roadmap Updates
- [ ] Reviewed `data/roadmap.json`
- [ ] Updated phases to match your timeline
- [ ] Updated milestones
- [ ] Updated status (completed/in-progress/upcoming)

---

## Phase 4: Email Integration (10 minutes - Optional)

### ☐ 13. Mailjet Setup
- [ ] Signed up at Mailjet.com (free account)
- [ ] Verified email address
- [ ] Navigated to: Account → API Key Management
- [ ] Copied API Key
- [ ] Copied Secret Key

### ☐ 14. Configure contact.php
- [ ] Opened `contact.php` in text editor
- [ ] Found lines 12-14
- [ ] Replaced `'your_mailjet_api_key'` with actual key
- [ ] Replaced `'your_mailjet_secret_key'` with actual secret
- [ ] Updated `'contact@serpocoin.io'` with your email
- [ ] Saved file

### ☐ 15. Test Email Functionality
- [ ] Submitted contact form
- [ ] Checked admin email inbox
- [ ] Received contact notification
- [ ] Subscribed to newsletter
- [ ] Received welcome email

---

## Phase 5: Performance & Security (15 minutes)

### ☐ 16. Performance Check
- [ ] All pages load in under 3 seconds
- [ ] Images optimized (under 500KB each)
- [ ] No console errors or warnings
- [ ] Animations smooth (60fps)
- [ ] Mobile performance acceptable

### ☐ 17. Browser Testing
- [ ] Tested in Chrome ✓
- [ ] Tested in Firefox ✓
- [ ] Tested in Safari ✓
- [ ] Tested in Edge ✓

### ☐ 18. Mobile Testing
- [ ] Tested on iPhone (or simulator) ✓
- [ ] Tested on Android (or simulator) ✓
- [ ] Tablet view works ✓
- [ ] Landscape mode works ✓

### ☐ 19. Security Review
- [ ] Database credentials not in public files
- [ ] `.htaccess` file present and active
- [ ] Contact form validates inputs
- [ ] SQL injection protection (prepared statements)
- [ ] XSS protection enabled

---

## Phase 6: Pre-Launch Checks (10 minutes)

### ☐ 20. Content Review
- [ ] All text proofread (no typos)
- [ ] All links working (no 404s)
- [ ] All images loading
- [ ] Contact information correct
- [ ] Social media handles correct

### ☐ 21. SEO Basics
- [ ] Each page has unique title
- [ ] Meta descriptions present
- [ ] Alt text on all images
- [ ] Heading hierarchy correct (H1 → H6)

### ☐ 22. Final Visual Check
- [ ] Logo displays correctly everywhere
- [ ] Colors consistent across pages
- [ ] Fonts loading properly
- [ ] Icons showing (Font Awesome)
- [ ] No layout breaks on any page

---

## Phase 7: Production Deployment (Optional)

### ☐ 23. Choose Hosting
- [ ] Selected hosting provider
  - Recommended: Hostinger, Bluehost, SiteGround
- [ ] Purchased plan (or using free tier)
- [ ] Received hosting credentials

### ☐ 24. Upload Files
- [ ] Connected via FTP/cPanel File Manager
- [ ] Uploaded all website files
- [ ] Set correct file permissions (755 for folders, 644 for files)
- [ ] Verified all files uploaded successfully

### ☐ 25. Database Setup (Production)
- [ ] Created MySQL database via cPanel
- [ ] Imported `database.sql`
- [ ] Updated `contact.php` with production DB credentials
- [ ] Tested database connection

### ☐ 26. SSL Certificate
- [ ] Activated SSL/HTTPS via hosting panel
- [ ] Updated `.htaccess` to force HTTPS
- [ ] Tested: `https://yourdomain.com`
- [ ] All pages load via HTTPS

### ☐ 27. Domain Configuration
- [ ] Domain purchased (or using subdomain)
- [ ] DNS configured to point to hosting
- [ ] Domain propagated (24-48 hours)
- [ ] Website accessible via domain

### ☐ 28. Production Testing
- [ ] All pages load on live site
- [ ] Contact form works on production
- [ ] Newsletter works on production
- [ ] Email notifications sending
- [ ] Database storing submissions

---

## Phase 8: Post-Launch (Ongoing)

### ☐ 29. Analytics Setup
- [ ] Google Analytics added
- [ ] Tracking code in all pages
- [ ] Goals configured (contact form, newsletter)
- [ ] Real-time data showing

### ☐ 30. Monitoring
- [ ] Uptime monitoring enabled
- [ ] Form submissions tracking
- [ ] Error logging enabled
- [ ] Regular backups scheduled

### ☐ 31. Marketing
- [ ] Shared website on social media
- [ ] Posted in crypto communities
- [ ] Submitted to directories
- [ ] SEO optimization ongoing

---

## ✨ Completion Status

**Total Tasks**: 100+

**Completed**: _____ / 100+

**Progress**: _____%

---

## 🎯 Priority Levels

### 🔴 CRITICAL (Must Complete)
- Phase 1: Local Setup
- Phase 2: Test All Features
- Phase 6: Pre-Launch Checks

### 🟡 IMPORTANT (Should Complete)
- Phase 3: Customization
- Phase 4: Email Integration
- Phase 5: Performance & Security

### 🟢 OPTIONAL (Nice to Have)
- Phase 7: Production Deployment
- Phase 8: Post-Launch

---

## 🆘 Having Issues?

Refer to troubleshooting guides:
- `QUICK_START.md` - Quick fixes
- `README.md` - Full documentation
- `PROJECT_COMPLETE.md` - Feature overview

---

## 🎉 Congratulations!

Once you complete this checklist, your **Serpo Coin website is production-ready**!

<div align="center">

**🚀 Ready to Launch Your Cosmic Civilization! 🌌**

</div>
