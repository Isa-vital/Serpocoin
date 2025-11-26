# Contact Form Email Setup - Quick Start Guide

## 📧 Setting Up Mailjet API

### Step 1: Get Mailjet API Credentials

1. **Create a Mailjet Account** (if you don't have one):
   - Go to: https://www.mailjet.com/
   - Click "Sign Up" and create a free account
   - Free tier includes: 6,000 emails/month, 200 emails/day

2. **Get Your API Keys**:
   - Log in to Mailjet
   - Navigate to: https://app.mailjet.com/account/api_keys
   - You'll see two keys:
     - **API Key** (Public Key)
     - **Secret Key** (Private Key)
   - Copy both keys

### Step 2: Verify Your Sender Email

1. In Mailjet Dashboard, go to:
   - **Account Settings** → **Sender Addresses**
   
2. Click **"Add a Sender Address"**

3. Enter: `contact@serpocoin.io`

4. Mailjet will send a verification email to this address

5. Click the verification link in the email

6. Wait for verification approval (usually instant)

### Step 3: Configure Your .env File

1. Open the `.env` file in the root directory

2. Update the Mailjet credentials:

```env
# Mailjet API Configuration
MAILJET_API_KEY=your_actual_api_key_here
MAILJET_SECRET_KEY=your_actual_secret_key_here

# Email Configuration
ADMIN_EMAIL=contact@serpocoin.io
FROM_EMAIL=contact@serpocoin.io
FROM_NAME=Serpo Coin
```

3. **Replace**:
   - `your_actual_api_key_here` → Your Mailjet API Key
   - `your_actual_secret_key_here` → Your Mailjet Secret Key

4. **Save** the file

### Step 4: Set Up Database

1. Open **phpMyAdmin**: http://localhost/phpmyadmin

2. Click **"Import"** tab

3. Choose file: `database_setup.sql`

4. Click **"Go"** to execute

   **OR** run manually:

   - Click **"New"** to create database
   - Name it: `serpocoin`
   - Go to SQL tab and paste contents of `database_setup.sql`
   - Click **"Go"**

### Step 5: Test the Contact Form

1. Start XAMPP (Apache + MySQL must be running)

2. Navigate to: http://localhost/serpocoin/contact.html

3. Fill out the contact form with test data

4. Submit the form

5. **Check**:
   - Form shows success message
   - Email arrives at `contact@serpocoin.io`
   - Submission appears in database:
     ```sql
     SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 1;
     ```

## 🔒 Security Checklist

- ✅ `.env` file is in `.gitignore` (already configured)
- ✅ Never commit API keys to GitHub
- ✅ Use environment variables for sensitive data
- ✅ Verify sender email in Mailjet
- ✅ Keep Composer packages updated

## 📊 Monitoring Emails

### View Email Statistics:
- Mailjet Dashboard: https://app.mailjet.com/stats
- See delivery rates, opens, clicks, etc.

### Check Failed Emails:
- Go to: https://app.mailjet.com/messages
- Filter by "Failed" status
- View error messages

## 🆘 Troubleshooting

### Problem: "Email not sending"

**Solution 1**: Check API credentials
```bash
# Verify .env file has correct keys
cat .env | grep MAILJET
```

**Solution 2**: Check sender verification
- Go to Mailjet → Sender Addresses
- Ensure `contact@serpocoin.io` has green checkmark

**Solution 3**: Check PHP error logs
```bash
# View Apache error log
tail -f c:\xampp\apache\logs\error.log
```

### Problem: "Database connection failed"

**Solution**: Check MySQL is running
- Open XAMPP Control Panel
- Start MySQL service
- Verify credentials in `.env` match MySQL settings

### Problem: "Autoload not found"

**Solution**: Run Composer install
```bash
composer install
```

## 📝 Testing Checklist

- [ ] Composer packages installed (`vendor/` folder exists)
- [ ] `.env` file created with real API keys
- [ ] Sender email verified in Mailjet
- [ ] Database tables created
- [ ] Apache and MySQL running in XAMPP
- [ ] Test email sent successfully
- [ ] Email received in inbox
- [ ] Database record created

## 🌐 Production Deployment

When deploying to production:

1. **Update .env** with production values
2. **Set APP_ENV=production**
3. **Set APP_DEBUG=false**
4. **Use HTTPS** (required for Mailjet in production)
5. **Add rate limiting** to prevent spam
6. **Backup database** regularly

## 📚 Resources

- Mailjet API Docs: https://dev.mailjet.com/
- PHP SDK GitHub: https://github.com/mailjet/mailjet-apiv3-php
- DotEnv Docs: https://github.com/vlucas/phpdotenv

## ✅ You're All Set!

Your contact form is now configured to send emails via Mailjet API! 🚀

For support, check the logs or contact the development team.
