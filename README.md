# 🛸 Serpo Coin - Official Website

<div align="center">

![Serpo Coin](assets/images/logo.png)

**A Cosmic Legend Reborn in Web3**

[![TON Network](https://img.shields.io/badge/Network-TON-00ffff?style=for-the-badge)](https://ton.org)
[![License](https://img.shields.io/badge/License-MIT-9d4edd?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-00ff00?style=for-the-badge)]()

</div>

---

## 🌌 About Serpo Coin

Serpo Coin is a visionary Web3 project inspired by **Project Serpo**, the alleged 1960s exchange between Earth and beings from the Zeta Reticuli system. Reimagined for the blockchain era, Serpo Coin transforms this legend into a living digital civilization where community, technology, and imagination unite.

### ✨ Key Features

- **100% Community Owned** - Renounced contract, no centralized control
- **Fixed Supply** - 1 billion SERPO tokens, deflationary model
- **Built on TON Network** - Lightning-fast, secure, and scalable
- **Fair Launch** - Launched exclusively on Blum Meme Pad
- **Real Utilities** - Wallet, DAO, Metaverse, Partnerships, and more

---

## 🚀 Quick Start

### Prerequisites

- **XAMPP** or any local server (Apache + MySQL + PHP 7.4+)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, JavaScript, and PHP

### Installation

1. **Clone or Download** this project to your local machine:
   ```bash
   git clone https://github.com/yourusername/serpocoin.git
   ```

2. **Move to XAMPP Directory**:
   ```bash
   # Windows
   C:\xampp\htdocs\serpocoin
   
   # Mac/Linux
   /Applications/XAMPP/htdocs/serpocoin
   ```

3. **Start XAMPP Services**:
   - Start Apache
   - Start MySQL

4. **Setup Database**:
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create a new database named `serpocoin`
   - Import the `database.sql` file from the project root

5. **Configure Mailjet (Optional)**:
   - Sign up at [Mailjet](https://www.mailjet.com/)
   - Get your API Key and Secret Key
   - Open `contact.php` and replace:
     ```php
     define('MAILJET_API_KEY', 'your_mailjet_api_key');
     define('MAILJET_SECRET_KEY', 'your_mailjet_secret_key');
     define('ADMIN_EMAIL', 'your-email@example.com');
     ```

6. **Access the Website**:
   ```
   http://localhost/serpocoin
   ```

---

## 📁 Project Structure

```
serpocoin/
├── index.html              # Home page with 3D planet animation
├── about.html              # About Serpo Coin
├── vision.html             # Our vision and philosophy
├── utilities.html          # Core utilities showcase
├── tokenomics.html         # Token economics with chart
├── roadmap.html            # Dynamic roadmap timeline
├── team.html               # Team members
├── contact.html            # Contact form + newsletter
├── contact.php             # PHP backend for forms
├── database.sql            # MySQL database setup
│
├── assets/
│   ├── css/
│   │   └── main.css        # Main stylesheet (cosmic theme)
│   │
│   ├── js/
│   │   ├── main.js         # Main JavaScript
│   │   ├── planet-animation.js    # Three.js planet animation
│   │   ├── tokenomics-chart.js   # Chart.js integration
│   │   ├── roadmap.js      # Dynamic roadmap loader
│   │   ├── contact.js      # Contact form handler
│   │   └── parallax.js     # Parallax effects
│   │
│   ├── images/             # Logo, favicon, team photos
│   └── models/             # 3D models (if needed)
│
├── data/
│   └── roadmap.json        # Roadmap milestones data
│
└── README.md               # This file
```

---

## 🎨 Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom animations and transitions
- **Tailwind CSS** - Utility-first styling framework
- **Bootstrap 5** - Responsive grid system
- **JavaScript (ES6+)** - Modern vanilla JavaScript
- **GSAP** - Advanced animations
- **AOS (Animate On Scroll)** - Scroll animations
- **Three.js** - 3D planet visualization
- **Chart.js** - Tokenomics chart

### Backend
- **PHP 7.4+** - Server-side logic
- **MySQL** - Database management
- **Mailjet API** - Email notifications

### Fonts & Icons
- **Orbitron** - Futuristic heading font
- **Inter** - Clean body font
- **Font Awesome 6** - Icons

### Responsive Design
- **Mobile-First Approach** - Optimized for all devices
- **6 Breakpoints** - From 320px to 1400px+
- **Touch-Friendly** - 44px minimum touch targets
- **Uniform Navigation** - Consistent across all 8 pages
- **SVG Logo** - Scalable with PNG fallback

📱 See [MOBILE_RESPONSIVE.md](MOBILE_RESPONSIVE.md) for detailed responsive design documentation.

---

## 🌟 Key Features Breakdown

### 1. **Home Page**
- Animated 3D planet using Three.js
- Glowing particle effects
- Smooth scroll animations
- Quick links to utilities
- Cosmic message section

### 2. **About Page**
- Project origin story
- Web3 transformation narrative
- Network and token details
- Feature highlights

### 3. **Vision Page**
- Parallax star field background
- Three pillars of vision
- Journey timeline
- Core values section

### 4. **Utilities Page**
- Tabbed interface for 6 core utilities
- Detailed feature lists
- Interactive hover effects
- CTA buttons

### 5. **Tokenomics Page**
- Animated pie chart (Chart.js)
- Token distribution breakdown
- Key features with icons
- Buy CTA section

### 6. **Roadmap Page**
- Dynamic JSON-based timeline
- 6-phase development plan
- Status indicators (completed, in-progress, upcoming)
- Scroll animations

### 7. **Team Page**
- Team member cards
- Social media links
- Hover overlay effects
- Join team CTA

### 8. **Contact Page**
- AJAX-powered contact form
- Newsletter subscription
- SweetAlert2 notifications
- Mailjet email integration
- MySQL storage

---

## 🔧 Configuration

### Database Configuration
Edit `contact.php` to match your database credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'serpocoin');
```

### Email Configuration
Configure Mailjet API in `contact.php`:
```php
define('MAILJET_API_KEY', 'your_api_key');
define('MAILJET_SECRET_KEY', 'your_secret_key');
define('ADMIN_EMAIL', 'admin@serpocoin.io');
```

### Customization

#### Change Colors
Edit CSS variables in `assets/css/main.css`:
```css
:root {
    --primary-cyan: #00ffff;
    --primary-purple: #9d4edd;
    --primary-blue: #4361ee;
    --dark-bg: #0a0e27;
}
```

#### Update Roadmap
Edit `data/roadmap.json` to modify milestones.

#### Add Team Members
Edit `team.html` to add/remove team member cards.

---

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px - 767px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktops (1025px+)
- 🖥️ Large screens (1440px+)

---

## 🎯 Performance Optimization

- **Lazy loading** for images
- **Minified** CSS and JS (for production)
- **CDN** for external libraries
- **Efficient** animations with requestAnimationFrame
- **Optimized** Three.js rendering

---

## 🔒 Security Features

- **Input sanitization** in PHP
- **SQL injection prevention** with prepared statements
- **XSS protection** with htmlspecialchars
- **CSRF protection** (recommended to add tokens)
- **Email validation** on both client and server

---

## 🚀 Deployment

### For Production:

1. **Minify Assets**:
   - Minify CSS and JavaScript files
   - Optimize images
   - Enable gzip compression

2. **Update Configuration**:
   - Change database credentials
   - Add real Mailjet API keys
   - Update admin email

3. **Security Hardening**:
   - Add CSRF tokens to forms
   - Use HTTPS (SSL certificate)
   - Implement rate limiting
   - Hide error messages

4. **SEO Optimization**:
   - Add meta descriptions
   - Create sitemap.xml
   - Add robots.txt
   - Implement Open Graph tags

---

## 🎨 Logo & Assets

### Required Images

Place the following in `assets/images/`:
- `logo.png` - Main Serpo logo (transparent PNG, 500x500px recommended)
- `favicon.png` - Browser favicon (32x32px or 64x64px)

You can create these using:
- Adobe Illustrator / Photoshop
- Figma
- Canva
- AI generators (DALL-E, Midjourney)

### Recommended Theme
- **Space/Cosmic** aesthetic
- **Neon glowing** effects
- **Blue, purple, cyan** color palette
- **UFO, planet, star** motifs

---

## 🧪 Testing

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Mobile Testing
- ✅ iOS Safari
- ✅ Chrome Mobile
- ✅ Samsung Internet

---

## 📞 Support

For questions, issues, or contributions:

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/serpocoin/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/serpocoin/discussions)
- 📧 **Email**: contact@serpocoin.io
- 💬 **Telegram**: @SerpoCoinOfficial
- 🎮 **Discord**: discord.gg/serpocoin

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Credits

### Libraries & Frameworks
- [Three.js](https://threejs.org/) - 3D graphics
- [GSAP](https://greensock.com/gsap/) - Animation library
- [AOS](https://michalsnik.github.io/aos/) - Scroll animations
- [Chart.js](https://www.chartjs.org/) - Charts
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS
- [SweetAlert2](https://sweetalert2.github.io/) - Beautiful alerts
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

### Special Thanks
- The TON Network community
- Blum Meme Pad team
- All Serpo Coin holders and supporters

---

## 🛸 The Message

> *"Serpo is not just a token — it's a transmission of unity,*
> *merging worlds through imagination, trade, and technology.*
> *A signal from the stars, reborn through the blockchain."*

---

<div align="center">

**Built with 💙 by the Serpo Council**

[Website](https://serpocoin.io) • [Twitter](https://twitter.com/serpocoin) • [Telegram](https://t.me/serpocoin) • [Discord](https://discord.gg/serpocoin)

⭐ **Star this repo if you believe in the cosmic vision!** ⭐

</div>
