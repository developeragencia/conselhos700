const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const svgTemplate = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dy=".35em">🔮</text>
</svg>`;

sizes.forEach(size => {
  const svg = svgTemplate(size);
  fs.writeFileSync(`icon-${size}x${size}.png`, svg.replace('svg', 'svg'));
  console.log(`Gerado: icon-${size}x${size}.png`);
});

const shortcutSvg = (emoji, color) => `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="19.2" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="38" fill="white" text-anchor="middle" dy=".35em">${emoji}</text>
</svg>`;

fs.writeFileSync('tarot-shortcut.png', shortcutSvg('🃏', '#8b5cf6'));
fs.writeFileSync('astro-shortcut.png', shortcutSvg('⭐', '#06b6d4'));
fs.writeFileSync('dashboard-shortcut.png', shortcutSvg('📊', '#10b981'));

console.log('Todos os ícones PWA foram gerados!');
