const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, 'src', 'assets', 'tab_icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const ACTIVE_COLOR = '#FF5436';
const INACTIVE_COLOR = '#8A94A6';

// 1. Dashboard House Icon
const houseSvg = (color) => `
<svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3L2.5 11.5H5.5V20.5C5.5 21.05 5.95 21.5 6.5 21.5H10.5V15.5C10.5 15.22 10.72 15 11 15H13C13.28 15 13.5 15.22 13.5 15.5V21.5H17.5C18.05 21.5 18.5 21.05 18.5 20.5V11.5H21.5L12 3Z" fill="${color}"/>
</svg>
`;

// 2. Calls Phone Icon (slightly rotated to match Image 2)
const callsSvg = (color) => `
<svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(-12 12 12)">
    <path d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="${color}"/>
  </g>
</svg>
`;

// 3. Profile User Icon
const profileSvg = (color) => `
<svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="${color}"/>
</svg>
`;

// 4. Settings Gear Icon
const settingsSvg = (color) => `
<svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.73 8.87C2.61 9.08 2.65 9.34 2.85 9.48L4.88 11.06C4.83 11.36 4.8 11.69 4.8 12C4.8 12.31 4.83 12.64 4.88 12.94L2.85 14.52C2.67 14.66 2.62 14.93 2.73 15.13L4.65 18.45C4.77 18.67 5.02 18.74 5.24 18.67L7.63 17.71C8.13 18.09 8.66 18.41 9.25 18.65L9.61 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.08 16.38 17.71L18.77 18.67C18.99 18.75 19.24 18.67 19.36 18.45L21.28 15.13C21.4 14.91 21.35 14.66 21.16 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="${color}"/>
</svg>
`;

async function generate() {
  const configs = [
    { name: 'tab_dashboard_active.png', svg: houseSvg(ACTIVE_COLOR) },
    { name: 'tab_dashboard_inactive.png', svg: houseSvg(INACTIVE_COLOR) },
    { name: 'tab_calls_active.png', svg: callsSvg(ACTIVE_COLOR) },
    { name: 'tab_calls_inactive.png', svg: callsSvg(INACTIVE_COLOR) },
    { name: 'tab_profile_active.png', svg: profileSvg(ACTIVE_COLOR) },
    { name: 'tab_profile_inactive.png', svg: profileSvg(INACTIVE_COLOR) },
    { name: 'tab_settings_active.png', svg: settingsSvg(ACTIVE_COLOR) },
    { name: 'tab_settings_inactive.png', svg: settingsSvg(INACTIVE_COLOR) },
  ];

  for (const item of configs) {
    const filePath = path.join(outDir, item.name);
    await sharp(Buffer.from(item.svg))
      .resize(72, 72)
      .png()
      .toFile(filePath);
    console.log('Created:', item.name);
  }
}

generate().catch(console.error);
