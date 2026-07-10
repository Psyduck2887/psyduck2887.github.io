type RGB = readonly [number, number, number];

interface FluidSource {
  originX: number;
  originY: number;
  travelX: number;
  travelY: number;
  scaleX: number;
  scaleY: number;
  speed: number;
  phase: number;
  strength: number;
}

const lightColors: RGB[] = [
  [249, 248, 243],
  [226, 238, 225],
  [171, 207, 178],
  [96, 145, 107],
  [48, 93, 61],
];

const darkColors: RGB[] = [
  [18, 25, 20],
  [27, 43, 32],
  [44, 76, 54],
  [72, 119, 84],
  [116, 162, 124],
];

const sources: FluidSource[] = [
  { originX: 0.08, originY: 0.1, travelX: 0.3, travelY: 0.2, scaleX: 0.42, scaleY: 0.58, speed: 0.000075, phase: 0, strength: 1.06 },
  { originX: 0.76, originY: 0.08, travelX: 0.24, travelY: 0.28, scaleX: 0.48, scaleY: 0.4, speed: 0.00009, phase: 1.7, strength: 0.98 },
  { originX: 0.28, originY: 0.78, travelX: 0.3, travelY: 0.18, scaleX: 0.46, scaleY: 0.48, speed: 0.000064, phase: 3.2, strength: 1.12 },
  { originX: 0.84, originY: 0.74, travelX: 0.2, travelY: 0.25, scaleX: 0.38, scaleY: 0.52, speed: 0.000082, phase: 4.8, strength: 0.94 },
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
  if (field < 0.31) return colors[0];
  if (field < 0.45) return mixColor(colors[0], colors[1], smoothstep(0.31, 0.45, field));
  if (field < 0.58) return colors[1];
  if (field < 0.7) return mixColor(colors[1], colors[2], smoothstep(0.58, 0.7, field));
  if (field < 0.79) return colors[2];
  if (field < 0.89) return mixColor(colors[2], colors[3], smoothstep(0.79, 0.89, field));
  return mixColor(colors[3], colors[4], smoothstep(0.89, 1, field));
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
      const sourcePositions = sources.map((source) => ({
        ...source,
        x: source.originX + Math.sin(motionTime * source.speed + source.phase) * source.travelX,
        y: source.originY + Math.cos(motionTime * source.speed * 0.82 + source.phase) * source.travelY,
      }));
      const image = context.createImageData(width, height);
      const pixels = image.data;

      for (let y = 0; y < height; y += 1) {
        const normalizedY = y / height;
        for (let x = 0; x < width; x += 1) {
          const normalizedX = x / width;
          let field = 0;

          for (const source of sourcePositions) {
            const deltaX = (normalizedX - source.x) / source.scaleX;
            const deltaY = (normalizedY - source.y) / source.scaleY;
            field += Math.exp(-(deltaX * deltaX + deltaY * deltaY) * 1.72) * source.strength;
          }

          const contour =
            Math.sin(normalizedX * 8.2 + motionTime * 0.00011) * 0.045 +
            Math.sin(normalizedY * 7.4 - motionTime * 0.00009) * 0.04 +
            Math.sin((normalizedX + normalizedY) * 5.1 + motionTime * 0.00006) * 0.035;
          const normalizedField = clamp((field + contour - 0.36) / 1.28);
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
