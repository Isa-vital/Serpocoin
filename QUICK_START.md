# ⚡ QUICK START GUIDE - 5 Minutes to Launch

## Step 1: Open XAMPP (30 seconds)
1. Launch XAMPP Control Panel
2. Click **Start** next to Apache
3. Click **Start** next to MySQL
4. Wait for green "Running" status

## Step 2: Setup Database (2 minutes)
1. Open browser: `http://localhost/phpmyadmin`
2. Click **"New"** in left sidebar
3. Database name: `serpocoin`
4. Click **"Create"**
5. Click **"Import"** tab
6. Choose file: `database.sql`
7. Click **"Go"** at bottom
8. ✅ Done! (3 tables created)

## Step 3: Access Website (10 seconds)
Open browser and go to:
```
http://localhost/serpocoin
```

## Step 4: Test Everything (2 minutes)

### ✅ Home Page
- See 3D planet spinning? ✅
- Smooth animations? ✅
- All links working? ✅

### ✅ Navigate Pages
- About → ✅
- Vision → ✅
- Utilities → ✅
- Tokenomics → ✅
- Roadmap → ✅
- Team → ✅
- Contact → ✅

### ✅ Contact Form
1. Fill out form
2. Click "Send Message"
3. See success alert? ✅
4. Check phpMyAdmin → serpocoin → contact_submissions
5. Your entry is saved? ✅

### ✅ Newsletter
1. Enter email
2. Click "Subscribe"
3. See success alert? ✅
4. Check phpMyAdmin → serpocoin → newsletter_subscribers
5. Email is saved? ✅

## Step 5: Add Your Logo (Optional - 1 minute)

1. Create or download a logo image
2. Save as: `assets/images/logo.png`
3. Refresh website
4. Logo appears! ✅

---

## 🎯 You're Done! Website is Live Locally!

### What Works:
✅ All 8 pages  
✅ 3D planet animation  
✅ Contact form with database  
✅ Newsletter subscription  
✅ Tokenomics chart  
✅ Dynamic roadmap  
✅ Responsive design  
✅ All animations  

### What's Optional:
⚪ Mailjet email (needs API keys)  
⚪ Custom logo/images  
⚪ Production hosting  

---

## 🚀 Optional: Enable Email Notifications

### Get Mailjet API Keys (Free):
1. Go to: https://www.mailjet.com
2. Sign up (free account)
3. Go to: Account → API Key Management
4. Copy **API Key** and **Secret Key**

### Configure:
1. Open `contact.php` in text editor
2. Find lines 12-14:
```php
define('MAILJET_API_KEY', 'your_mailjet_api_key');
define('MAILJET_SECRET_KEY', 'your_mailjet_secret_key');
define('ADMIN_EMAIL', 'contact@serpocoin.io');
```
3. Replace with your keys
4. Save file
5. Test contact form again
6. Check your email inbox! ✅

---

## 🎨 Optional: Customize Colors

Edit `assets/css/main.css` (lines 6-13):

```css
:root {
    --primary-cyan: #00ffff;      /* Change to your color */
    --primary-purple: #9d4edd;    /* Change to your color */
    --primary-blue: #4361ee;      /* Change to your color */
    --dark-bg: #0a0e27;           /* Change to your color */
}
```

Save and refresh browser!

---

## 📱 Test on Mobile

1. Find your computer's IP address:
   - Windows: `ipconfig` in CMD
   - Mac/Linux: `ifconfig` in Terminal
   
2. On your phone's browser:
   ```
   http://YOUR_IP_ADDRESS/serpocoin
   ```
   Example: `http://192.168.1.100/serpocoin`

3. Test all features on mobile! ✅

---

## 🔥 Troubleshooting (If Needed)

### Planet Not Showing?
- Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
- Check browser console (F12)
- Try different browser

### Contact Form Error?
- Is MySQL running in XAMPP? ✅
- Did you import database.sql? ✅
- Check phpMyAdmin for `serpocoin` database

### Page Not Found?
- Check XAMPP Apache is running ✅
- URL correct? `http://localhost/serpocoin`
- Files in `C:\xampp\htdocs\serpocoin`?

---

## 🎉 That's It!

**You now have a fully working crypto website in under 5 minutes!**

### Next Steps:
1. ⭐ Customize content
2. 🎨 Add your logo
3. 📧 Setup email (optional)
4. 🌐 Deploy online (optional)

### Need Help?
- Read: `README.md` (full documentation)
- Read: `PROJECT_COMPLETE.md` (feature overview)
- Check: `assets/images/README.md` (logo guide)

---

<div align="center">

**🚀 Happy Launching! 🌌**

*Built for Serpo Coin with ❤️*

</div>
