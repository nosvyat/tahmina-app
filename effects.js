const EFFECTS_ROOT = document.getElementById("effects-root");

function ensureEffectsRoot() {
  if (!EFFECTS_ROOT) {
    return null;
  }
  return EFFECTS_ROOT;
}

function createEffectPiece({
  className,
  content = "",
  left = 50,
  top = 50,
  duration = 900,
  size = 18,
  rotate = 0,
  driftX = 0,
  driftY = -60,
  color = ""
}) {
  const root = ensureEffectsRoot();
  if (!root) return null;

  const el = document.createElement("div");
  el.className = `fx-piece ${className}`;
  el.textContent = content;
  el.style.left = `${left}%`;
  el.style.top = `${top}%`;
  el.style.setProperty("--fx-duration", `${duration}ms`);
  el.style.setProperty("--fx-size", `${size}px`);
  el.style.setProperty("--fx-rotate", `${rotate}deg`);
  el.style.setProperty("--fx-drift-x", `${driftX}px`);
  el.style.setProperty("--fx-drift-y", `${driftY}px`);

  if (color) {
    el.style.setProperty("--fx-color", color);
  }

  root.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, duration + 120);

  return el;
}

function burstEmoji({
  emojis = ["✨"],
  count = 10,
  centerX = 50,
  centerY = 55,
  minSize = 16,
  maxSize = 26,
  minDuration = 700,
  maxDuration = 1200
}) {
  for (let i = 0; i < count; i += 1) {
    const emoji = emojis[i % emojis.length];
    const angle = (Math.PI * 2 * i) / count;
    const distance = 30 + Math.random() * 70;
    const driftX = Math.cos(angle) * distance;
    const driftY = Math.sin(angle) * distance - 50;
    const duration =
      minDuration + Math.floor(Math.random() * (maxDuration - minDuration));
    const size = minSize + Math.floor(Math.random() * (maxSize - minSize));
    const rotate = -40 + Math.random() * 80;

    createEffectPiece({
      className: "fx-piece--emoji",
      content: emoji,
      left: centerX,
      top: centerY,
      duration,
      size,
      rotate,
      driftX,
      driftY
    });
  }
}

function burstConfetti({
  count = 14,
  centerX = 50,
  centerY = 55
}) {
  const colors = ["#eb72ab", "#8c7af3", "#ffcfb1", "#a7dffd", "#ffd86f"];

  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count;
    const distance = 35 + Math.random() * 80;
    const driftX = Math.cos(angle) * distance;
    const driftY = Math.sin(angle) * distance - 70;
    const duration = 900 + Math.floor(Math.random() * 500);
    const size = 8 + Math.floor(Math.random() * 8);
    const rotate = Math.random() * 360;
    const color = colors[i % colors.length];

    createEffectPiece({
      className: "fx-piece--confetti",
      left: centerX,
      top: centerY,
      duration,
      size,
      rotate,
      driftX,
      driftY,
      color
    });
  }
}

function burstStars({
  count = 8,
  centerX = 50,
  centerY = 55
}) {
  burstEmoji({
    emojis: ["⭐", "✨"],
    count,
    centerX,
    centerY,
    minSize: 16,
    maxSize: 24,
    minDuration: 700,
    maxDuration: 1100
  });
}

function burstHearts({
  count = 8,
  centerX = 50,
  centerY = 55
}) {
  burstEmoji({
    emojis: ["💖", "🤍", "💗"],
    count,
    centerX,
    centerY,
    minSize: 18,
    maxSize: 26,
    minDuration: 800,
    maxDuration: 1200
  });
}

function burstSparkles({
  count = 10,
  centerX = 50,
  centerY = 55
}) {
  burstEmoji({
    emojis: ["✨", "💫", "⭐"],
    count,
    centerX,
    centerY,
    minSize: 16,
    maxSize: 24,
    minDuration: 650,
    maxDuration: 1000
  });
}

function launchSelectionEffects() {
  burstConfetti({ count: 10, centerX: 50, centerY: 52 });
  burstHearts({ count: 6, centerX: 52, centerY: 50 });
  burstStars({ count: 6, centerX: 48, centerY: 50 });
}

function launchFinaleEffects() {
  burstConfetti({ count: 22, centerX: 50, centerY: 50 });
  burstHearts({ count: 12, centerX: 50, centerY: 52 });
  burstStars({ count: 12, centerX: 50, centerY: 48 });
  burstSparkles({ count: 14, centerX: 50, centerY: 50 });

  setTimeout(() => {
    burstConfetti({ count: 16, centerX: 50, centerY: 45 });
    burstSparkles({ count: 10, centerX: 50, centerY: 48 });
  }, 260);
}

function clearEffects() {
  const root = ensureEffectsRoot();
  if (!root) return;
  root.innerHTML = "";
}

window.launchSelectionEffects = launchSelectionEffects;
window.launchFinaleEffects = launchFinaleEffects;
window.clearEffects = clearEffects;