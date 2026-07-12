type RGB = readonly [number, number, number];

const lightColors: RGB[] = [
  [249, 248, 243],
  [232, 242, 231],
  [201, 223, 204],
  [143, 181, 149],
  [104, 151, 114],
];

const darkColors: RGB[] = [
  [18, 25, 20],
  [31, 47, 35],
  [52, 82, 59],
  [78, 119, 87],
  [106, 150, 115],
];

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(edgeStart: number, edgeEnd: number, value: number) {
  const amount = clamp((value - edgeStart) / (edgeEnd - edgeStart));
  return amount * amount * (3 - 2 * amount);
}

function mixColor(start: RGB, end: RGB, amount: number): RGB {
  return [
    Math.round(start[0] + (end[0] - start[0]) * amount),
    Math.round(start[1] + (end[1] - start[1]) * amount),
    Math.round(start[2] + (end[2] - start[2]) * amount),
  ];
}

function colorForField(colors: RGB[], field: number): RGB {
  if (field < 0.28) return colors[0];
  if (field < 0.42) return mixColor(colors[0], colors[1], smoothstep(0.28, 0.42, field));
  if (field < 0.56) return colors[1];
  if (field < 0.68) return mixColor(colors[1], colors[2], smoothstep(0.56, 0.68, field));
  if (field < 0.79) return colors[2];
  if (field < 0.9) return mixColor(colors[2], colors[3], smoothstep(0.79, 0.9, field));
  return mixColor(colors[3], colors[4], smoothstep(0.9, 1, field));
}

export function initAmbientBackground() {
  const start = () => {
    if (document.querySelector('.ambient-background')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'ambient-background';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let currentTheme = document.documentElement.getAttribute('theme') ?? 'light';

    const resize = () => {
      const renderScale = window.innerWidth < 700 ? 0.25 : 0.3;
      width = Math.max(210, Math.round(window.innerWidth * renderScale));
      height = Math.max(210, Math.round(window.innerHeight * renderScale));
      canvas.width = width;
      canvas.height = height;
    };

    const themeObserver = new MutationObserver(() => {
      currentTheme = document.documentElement.getAttribute('theme') ?? 'light';
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['theme'] });

    const draw = (time: number) => {
      if (!reducedMotion.matches && time - lastFrame < 42) {
        requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;

      const motionTime = reducedMotion.matches ? 0 : time;
      const colors = currentTheme === 'dark' ? darkColors : lightColors;
      const image = context.createImageData(width, height);
      const pixels = image.data;
      const primaryPhase = motionTime * 0.0000728;
      const secondaryPhase = motionTime * 0.0000434;

      for (let y = 0; y < height; y += 1) {
        const normalizedY = y / height;
        for (let x = 0; x < width; x += 1) {
          const normalizedX = x / width;
          const horizontalWarp =
            Math.sin(normalizedY * 5.2 + primaryPhase * 0.72) * 0.105 +
            Math.sin((normalizedX + normalizedY) * 3.1 - secondaryPhase) * 0.045;
          const verticalWarp =
            Math.cos(normalizedX * 4.4 - primaryPhase * 0.58) * 0.085 +
            Math.sin((normalizedX - normalizedY) * 2.8 + secondaryPhase * 0.8) * 0.04;
          const primaryTide = Math.sin(
            (normalizedX * 0.72 + normalizedY * 0.28 + horizontalWarp) * Math.PI * 2 - primaryPhase,
          );
          const crossingTide = Math.sin(
            (normalizedX * -0.18 + normalizedY * 0.82 + verticalWarp) * Math.PI * 1.46 + secondaryPhase,
          );
          const broadLift = Math.sin(
            (normalizedX * 0.34 - normalizedY * 0.2) * Math.PI * 2 + secondaryPhase * 0.62,
          );
          const normalizedField = clamp(0.5 + primaryTide * 0.22 + crossingTide * 0.095 + broadLift * 0.055);
          const color = colorForField(colors, normalizedField);
          const index = (y * width + x) * 4;
          pixels[index] = color[0];
          pixels[index + 1] = color[1];
          pixels[index + 2] = color[2];
          pixels[index + 3] = 255;
        }
      }

      context.putImageData(image, 0, 0);
      if (!reducedMotion.matches) requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    reducedMotion.addEventListener('change', () => requestAnimationFrame(draw));
    requestAnimationFrame(draw);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
