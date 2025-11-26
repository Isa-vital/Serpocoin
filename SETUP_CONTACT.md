# Serpo Coin - Contact Form Setup

This document explains how to set up the contact form with Mailjet email integration.

## Prerequisites

- PHP 7.4 or higher
- Composer (PHP dependency manager)
- MySQL database
- Mailjet account

## Installation Steps

### 1. Install Composer Dependencies

```bash
cd c:\xampp\htdocs\serpocoin
composer require vlucas/phpdotenv mailjet/mailjet-apiv3-php
```

### 2. Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your Mailjet credentials:
   - Get your API keys from: https://app.mailjet.com/account/api_keys
   - Replace `your_mailjet_api_key_here` with your actual API key
   - Replace `your_mailjet_secret_key_here` with your actual secret key

### 3. Create Database Tables

Run the following SQL commands in phpMyAdmin or MySQL:

```sql
CREATE DATABASE IF NOT EXISTS serpocoin;

USE serpocoin;

-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_submitted_at (submitted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_subscribed_at (subscribed_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 4. Verify Mailjet Sender Email

1. Log in to your Mailjet account
2. Go to Account Settings → Sender Addresses
3. Add and verify `contact@serpocoin.io` as a sender email
4. Follow the verification instructions sent to your email

### 5. Test the Contact Form

1. Navigate to: http://localhost/serpocoin/contact.html
2. Fill out the contact form
3. Submit and check if you receive an email at contact@serpocoin.io

## Troubleshooting

### Email Not Sending

1. Check Mailjet API credentials in `.env`
2. Verify sender email is validated in Mailjet dashboard
3. Check PHP error logs: `c:\xampp\apache\logs\error.log`
4. Enable debug mode in `.env`: `APP_DEBUG=true`

### Database Connection Issues

1. Verify XAMPP MySQL is running
2. Check database credentials in `.env`
3. Ensure database and tables exist

### Composer Issues

If Composer is not installed:
1. Download from: https://getcomposer.org/download/
2. Install for Windows
3. Restart command prompt
4. Run: `composer --version` to verify

## Security Notes

- Never commit `.env` file to version control
- `.env` is already in `.gitignore`
- Keep API keys secure
- Use HTTPS in production
- Implement rate limiting for production use

## Support

For issues, contact the development team or check Mailjet documentation:
- Mailjet Docs: https://dev.mailjet.com/
- PHP SDK: https://github.com/mailjet/mailjet-apiv3-php
