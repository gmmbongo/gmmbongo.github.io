# Glodi Mbongo — Portfolio

A clean, professional portfolio built with plain **HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies.

🌐 **Live:** [glodimbongo.github.io/portfolio](https://glodimbongo.github.io/portfolio)

---

## ✨ Features

- **3 tracks** — Data Analytics (gold), Information Security (cyan), Web Development (blue)
- **6 sections** — Home, About, Skills, Projects, Certifications, Contact
- **Scroll animations** — IntersectionObserver fade-ups throughout
- **Animated skill bars** — fill on scroll into view
- **Animated stat counters** — count-up on certifications section
- **Canvas particle network** — hero background animation
- **Functional contact form** — validates inputs and opens mailto
- **Scroll-aware navbar** — highlights active section, mobile drawer
- **Fully responsive** — mobile, tablet, desktop
- **No dependencies** — runs by opening index.html

---

## 📁 File Structure

```
portfolio/
├── index.html          ← All content/markup
├── css/
│   ├── reset.css       ← CSS reset
│   ├── variables.css   ← Design tokens (colours, fonts, spacing)
│   ├── layout.css      ← Nav, footer, base layout
│   ├── components.css  ← Buttons, badges, cards, bars, tags, form
│   ├── sections.css    ← Hero, About, Skills, Projects, Certs, Contact
│   └── responsive.css  ← Media queries
├── js/
│   └── main.js         ← All JavaScript (nav, canvas, animations, form)
└── README.md
```

---

## 🚀 Getting Started

### View locally
Just open `index.html` in any browser — no server needed.

### Deploy to GitHub Pages

```bash
# 1. Create a new repo on GitHub named: your-username.github.io
#    or any repo name for a project page

# 2. Clone and add files
git clone https://github.com/glodimbongo/portfolio.git
cd portfolio

# 3. Add all files
git add .
git commit -m "Initial portfolio commit"
git push origin main

# 4. Enable GitHub Pages
# Go to repo Settings → Pages → Source: main branch → / (root)
# Your site will be live at: https://glodimbongo.github.io/portfolio
```

---

## ✏️ Customisation

| What to change | Where |
|---|---|
| Personal info, bio, email, links | `index.html` — hero & contact sections |
| Experience timeline entries | `index.html` — `#about` section |
| Skill bar percentages | `index.html` — `data-w` attributes on `.bar-fill` |
| Projects (title, desc, bullets, links) | `index.html` — `#projects` section |
| Certifications | `index.html` — `#certifications` section |
| Colour tokens | `css/variables.css` |
| Fonts | `css/variables.css` + `<link>` in `<head>` |

---

## 🎨 Design System

| Token | Value | Track |
|---|---|---|
| `--gold` | `#C9A84C` | Data Analytics |
| `--cyan` | `#3ECFCF` | Information Security |
| `--blue` | `#7AB4FF` | Web Development |
| `--navy` | `#07111F` | Background |
| `--font-display` | Playfair Display | Headings |
| `--font-body` | DM Sans | Body |

---

## 👤 About

**Glodi Mbongo** — Louisville, KY  
Business Administration student at the University of Louisville (GPA 3.71) · A.A.S. Information Assurance, JCTC (GPA 3.81) · Co-Founder, GM Digital

📧 [glodimbongo1@gmail.com](mailto:glodimbongo1@gmail.com)  
🔗 [linkedin.com/in/glodi-mbongo](https://linkedin.com/in/glodi-mbongo)  
💻 [github.com/glodimbongo](https://github.com/glodimbongo)
