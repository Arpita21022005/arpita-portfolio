# Arpita — Developer Portfolio (React + Vite + Tailwind)

## Run locally
npm install
npm run dev

## Build for deploy
npm run build  # outputs 'dist/'

## GitHub Pages
- Repo name assumed: arpita-portfolio
- Vite base configured in vite.config.js as /arpita-portfolio/

### Deploy locally then push
git init
git add .
git commit -m "first deploy"
git branch -M main
git remote add origin https://github.com/<your-username>/arpita-portfolio.git
git push -u origin main

GitHub will run the Pages workflow in .github/workflows/deploy.yml and publish automatically.
