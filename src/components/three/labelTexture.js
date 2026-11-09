import * as THREE from 'three';

// Draws the bottle label on a <canvas> so we need no image files at all.
export function makeLabelTexture(name, accent = '#b8924a') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // paper
    ctx.fillStyle = '#f3ebdc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // frame
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1a1411';
    ctx.font = '500 54px "Playfair Display", Georgia, serif';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '18px';
    ctx.fillText('SÉRAPHINE', canvas.width / 2 + 9, 190);
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    ctx.fillStyle = accent;
    ctx.fillRect(canvas.width / 2 - 60, 232, 120, 3);
    ctx.fillStyle = '#1a1411';
    ctx.font = 'italic 500 86px "Playfair Display", Georgia, serif';
    ctx.fillText(name, canvas.width / 2, 372);
    ctx.font = '500 28px Inter, Arial, sans-serif';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '8px';
    ctx.fillStyle = '#6b5f50';
    ctx.fillText('EAU DE PARFUM', canvas.width / 2 + 4, 470);
    ctx.fillText('50 ML · 1.7 FL OZ', canvas.width / 2 + 4, 520);
    tex.needsUpdate = true;
  };

  draw();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  return tex;
}
