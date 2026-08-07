# Lead .NET Interview Prep

A component-based React (Vite) rebuild of the single-file interview prep dashboard.

## Structure

```
src/
  data/categories.js       # CATEGORIES, STATUS_META, PRIORITY_COLOR, DAY_PLAN
  components/
    ProgressRing.jsx
    TopicRow.jsx
    CatCard.jsx
    NavItem.jsx
    Sidebar.jsx
    Dashboard.jsx
    CategoryContent.jsx
  App.jsx                  # top-level state (selected category, topic done/undone)
  main.jsx                 # React root
  index.css                # global styles / font import
index.html
```

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

Outputs static files to `dist/`, deployable anywhere (Netlify, Vercel, GitHub Pages, Azure Static Web Apps, etc.).
