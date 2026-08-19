# Internship Assignment — React + Vite Dashboard

A **Brevo-style campaign dashboard** built with React, Vite, CSS, and vanilla JavaScript.

## Tech Stack

- React 18
- Vite 5
- CSS3 (custom properties)
- Vanilla JavaScript
- No UI frameworks
- No jQuery

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Preview Build

```bash
npm run preview
```

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the GitHub repo
4. Framework: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

## Project Structure

```
internship-assignment/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx                # Root component (state management)
│   ├── index.css              # All styles (design system + responsive)
│   ├── components/
│   │   ├── Sidebar.jsx        # Left navigation drawer
│   │   ├── Header.jsx         # Top navigation bar
│   │   ├── StatCard.jsx       # Statistics card component
│   │   ├── CampaignTable.jsx  # Campaign list table
│   │   ├── CampaignModal.jsx  # Create/Edit campaign modal
│   │   ├── ActionMenu.jsx     # Three-dot action dropdown
│   │   ├── ConfirmModal.jsx   # Delete confirmation dialog
│   │   └── Toast.jsx          # Toast notifications
│   └── data/
│       └── campaigns.js       # Default campaign data
├── public/
└── README.md
```

## Features

- Responsive sidebar (drawer on mobile)
- Create / Edit / Duplicate / Delete campaigns
- Confirmation dialog for deletions
- Toast notifications (success, error, info)
- Keyboard accessible
- CSS variables design system
- Professional SaaS dashboard look
- No unnecessary dependencies
