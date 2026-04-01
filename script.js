(() => {
  const tg = window.Telegram?.WebApp;

  if (tg) {
    tg.ready();
    tg.expand();

    if (typeof tg.onEvent === 'function') {
      tg.onEvent('fullscreen_changed', () => {
        console.log('fullscreen changed');
      });

      tg.onEvent('fullscreen_failed', (e) => {
        console.log('fullscreen failed', e);
      });
    }

    if (typeof tg.requestFullscreen === 'function') {
      tg.requestFullscreen().catch((e) => {
        console.log('requestFullscreen error', e);
      });
    }
  }

  const appContent = document.getElementById("app-content");
  const bottomActions = document.getElementById("bottom-actions");
  const stepIndicator = document.getElementById("step-indicator");

  const introTemplate = document.getElementById("intro-screen-template");
  const choiceTemplate = document.getElementById("choice-question-template");
  const textTemplate = document.getElementById("text-question-template");
  const finalTemplate = document.getElementById("final-screen-template");
  const joyMapTemplate = document.getElementById("joy-map-screen-template");
  const resultItemTemplate = document.getElementById("result-item-template");
  const optionButtonTemplate = document.getElementById("option-button-template");
  const actionButtonTemplate = document.getElementById("action-button-template");

  // ===== EFFECTS =====
  const EFFECT_EMOJIS = ["✨", "💖", "🌸", "🫶", "💫", "🌷"];
  const CONFETTI_COLORS = ["#eb72ab", "#8c7af3", "#ffcfb1", "#a7dffd", "#f7b2d0", "#c9b8ff"];

  const effectsRoot = ensureEffectsRoot();

  function ensureEffectsRoot() {
    let root = document.getElementById("effects-root");

    if (!root) {
      root = document.createElement("div");
      root.id = "effects-root";
      root.className = "effects-root";
      document.body.appendChild(root);
    }

    return root;
  }

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function createFxPiece({ x, y, className, size, driftX, driftY, rotate, duration, text, color }) {
    const piece = document.createElement("div");
    piece.className = `fx-piece ${className}`;
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.setProperty("--fx-size", typeof size === "number" ? `${size}px` : size);
    piece.style.setProperty("--fx-drift-x", `${driftX}px`);
    piece.style.setProperty("--fx-drift-y", `${driftY}px`);
    piece.style.setProperty("--fx-rotate", `${rotate}deg`);
    piece.style.setProperty("--fx-duration", `${duration}ms`);

    if (color) {
      piece.style.setProperty("--fx-color", color);
    }

    if (text) {
      piece.textContent = text;
    }

    piece.addEventListener("animationend", () => {
      piece.remove();
    });

    effectsRoot.appendChild(piece);
  }

  function burstFromPoint(x, y, options = {}) {
    const { emojiCount = 6, confettiCount = 10 } = options;

    for (let i = 0; i < emojiCount; i++) {
      createFxPiece({
        x,
        y,
        className: "fx-piece--emoji",
        text: randomFrom(EFFECT_EMOJIS),
        size: randomBetween(18, 28),
        driftX: randomBetween(-90, 90),
        driftY: randomBetween(-120, -35),
        rotate: randomBetween(-80, 80),
        duration: randomBetween(700, 1050)
      });
    }

    for (let i = 0; i < confettiCount; i++) {
      createFxPiece({
        x,
        y,
        className: "fx-piece--confetti",
        size: randomBetween(8, 14),
        driftX: randomBetween(-120, 120),
        driftY: randomBetween(-140, 50),
        rotate: randomBetween(-220, 220),
        duration: randomBetween(800, 1150),
        color: randomFrom(CONFETTI_COLORS)
      });
    }
  }

  function burstFromElement(el, options = {}) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    burstFromPoint(x, y, options);
  }

  function stopRainEffect() {
    if (rainIntervalId) {
      clearInterval(rainIntervalId);
      rainIntervalId = null;
    }

    const rainPieces = effectsRoot.querySelectorAll(".fx-piece--rain");
    rainPieces.forEach((piece) => piece.remove());
  }

  function createRainPiece({ type = "emoji" } = {}) {
    const piece = document.createElement("div");
    piece.className = `fx-piece fx-piece--rain fx-piece--rain-${type}`;

    const startX = Math.random() * window.innerWidth;
    const driftX = randomBetween(-40, 40);
    const duration = randomBetween(2600, 4200);
    const delay = randomBetween(0, 300);

    piece.style.left = `${startX}px`;
    piece.style.top = `-30px`;
    piece.style.setProperty("--rain-drift-x", `${driftX}px`);
    piece.style.setProperty("--rain-duration", `${duration}ms`);
    piece.style.animationDelay = `${delay}ms`;

    if (type === "emoji") {
      piece.textContent = randomFrom(EFFECT_EMOJIS);
      piece.style.fontSize = `${randomBetween(18, 30)}px`;
    } else {
      piece.style.width = `${randomBetween(8, 14)}px`;
      piece.style.height = `${randomBetween(12, 18)}px`;
      piece.style.background = randomFrom(CONFETTI_COLORS);
      piece.style.borderRadius = `${randomBetween(3, 6)}px`;
      piece.style.transform = `rotate(${randomBetween(-25, 25)}deg)`;
    }

    piece.addEventListener("animationend", () => {
      piece.remove();
    });

    effectsRoot.appendChild(piece);
  }

  function startRainEffect() {
    stopRainEffect();

    for (let i = 0; i < 18; i++) {
      createRainPiece({ type: i % 2 === 0 ? "emoji" : "confetti" });
    }

    rainIntervalId = setInterval(() => {
      const piecesCount = Math.floor(randomBetween(2, 5));

      for (let i = 0; i < piecesCount; i++) {
        createRainPiece({
          type: Math.random() > 0.5 ? "emoji" : "confetti"
        });
      }
    }, 260);
  }

  function syncRainEffect() {
    const currentStep = getCurrentStep();
    const shouldRain = isJoyMapStep || isFinalStep(currentStep);

    if (shouldRain) {
      startRainEffect();
    } else {
      stopRainEffect();
    }
  }

  const appConfig = window.APP_CONFIG || {
    appTitle: "Что тебя радует?",
    personName: "Тахмина",
    authorName: "ТВОЁ ИМЯ",
    personalMessage: "С днём рождения!",
    photoPath: "./assets/images/tahmina-photo.jpg"
  };

  const steps = Array.isArray(window.ALL_STEPS) ? window.ALL_STEPS : [];
  const answers = {};

  let currentStepIndex = 0;
  let isJoyMapStep = false;
  let rainIntervalId = null;

  function getCurrentStep() {
    return steps[currentStepIndex];
  }

  function isIntroStep(step) {
    return step && step.type === "intro";
  }

  function isChoiceStep(step) {
    return step && step.type === "choice";
  }

  function isTextStep(step) {
    return step && step.type === "text";
  }

  function isFinalStep(step) {
    return step && step.type === "final";
  }

  function getQuestionSteps() {
    return steps.filter((step) => step.type === "choice" || step.type === "text");
  }

  function getCurrentQuestionIndex(stepId) {
    const questionSteps = getQuestionSteps();
    return questionSteps.findIndex((step) => step.id === stepId);
  }

  function getQuestionProgress(step) {
    const questionSteps = getQuestionSteps();
    const index = getCurrentQuestionIndex(step.id);

    if (index === -1) {
      return {
        current: 0,
        total: questionSteps.length,
        percent: 0
      };
    }

    const current = index + 1;
    const total = questionSteps.length;
    const percent = Math.round((current / total) * 100);

    return { current, total, percent };
  }

  function updateStepIndicator() {
    const totalSteps = steps.length + 1;

    if (isJoyMapStep) {
      stepIndicator.textContent = `${steps.length + 1} / ${totalSteps}`;
      return;
    }

    stepIndicator.textContent = `${currentStepIndex + 1} / ${totalSteps}`;
  }

  function clearContent() {
    appContent.innerHTML = "";
    bottomActions.innerHTML = "";
  }

  function createActionButton({
    text,
    variant = "primary",
    onClick,
    disabled = false
  }) {
    const buttonFragment = actionButtonTemplate.content.cloneNode(true);
    const button = buttonFragment.querySelector('[data-role="action-button"]');

    button.textContent = text;
    button.classList.add(`action-button--${variant}`);

    if (variant === "primary") {
      button.classList.add("action-button--primary");
    }

    if (variant === "secondary") {
      button.classList.add("action-button--secondary");
    }

    if (disabled) {
      button.disabled = true;
      button.classList.add("is-disabled");
    }

    button.addEventListener("click", onClick);
    return button;
  }

  function renderBottomActions(step) {
    bottomActions.innerHTML = "";

    if (isJoyMapStep) {
      const backButton = createActionButton({
        text: "Назад",
        variant: "primary",
        onClick: goPrev
      });

      const copyButton = createActionButton({
        text: "Скопировать",
        variant: "primary",
        onClick: copyAnswers
      });

      const restartButton = createActionButton({
        text: "Пройти заново",
        variant: "primary",
        onClick: restartApp
      });

      bottomActions.appendChild(backButton);
      bottomActions.appendChild(copyButton);
      bottomActions.appendChild(restartButton);
      return;
    }

    const isFirst = currentStepIndex === 0;
    const isLast = currentStepIndex === steps.length - 1;

    if (!isFirst) {
      const backButton = createActionButton({
        text: "Назад",
        variant: "secondary",
        onClick: goPrev
      });
      bottomActions.appendChild(backButton);
    }

    let primaryText = "Далее";

    if (isIntroStep(step) && currentStepIndex === 2) {
      primaryText = "Начать";
    }

    if (isTextStep(step) && isStepLastQuestion(step)) {
      primaryText = "Завершить";
    }

    if (isFinalStep(step)) {
      primaryText = "Далее";
    }

    const nextButton = createActionButton({
      text: primaryText,
      variant: "primary",
      onClick: handlePrimaryAction
    });

    bottomActions.appendChild(nextButton);

    if (isLast && !isFinalStep(step)) {
      nextButton.textContent = "Готово";
    }
  }

  function isStepLastQuestion(step) {
    const questionSteps = getQuestionSteps();
    const lastQuestion = questionSteps[questionSteps.length - 1];
    return lastQuestion && lastQuestion.id === step.id;
  }

  function render() {
    clearContent();
    updateStepIndicator();

    if (isJoyMapStep) {
      renderJoyMapScreen();
      renderBottomActions(null);
      syncRainEffect();
      return;
    }

    const step = getCurrentStep();

    if (!step) {
      renderFallback();
      return;
    }

    if (isIntroStep(step)) {
      renderIntroScreen(step);
    } else if (isChoiceStep(step)) {
      renderChoiceQuestion(step);
    } else if (isTextStep(step)) {
      renderTextQuestion(step);
    } else if (isFinalStep(step)) {
      renderFinalScreen();
    }

    renderBottomActions(step);
    syncRainEffect();
  }

  function renderIntroScreen(step) {
    const fragment = introTemplate.content.cloneNode(true);

    const badge = fragment.querySelector('[data-role="badge"]');
    const emoji = fragment.querySelector('[data-role="emoji"]');
    const title = fragment.querySelector('[data-role="title"]');
    const text = fragment.querySelector('[data-role="text"]');

    badge.textContent = step.badge || "";
    emoji.textContent = step.emoji || "✨";
    title.textContent = step.title || "";
    text.textContent = step.text || "";

    appContent.appendChild(fragment);
  }

  function renderChoiceQuestion(step) {
    const fragment = choiceTemplate.content.cloneNode(true);

    const progressText = fragment.querySelector('[data-role="progress-text"]');
    const progressFill = fragment.querySelector('[data-role="progress-fill"]');
    const sectionBadge = fragment.querySelector('[data-role="section-badge"]');
    const title = fragment.querySelector('[data-role="question-title"]');
    const subtitle = fragment.querySelector('[data-role="question-subtitle"]');
    const optionsList = fragment.querySelector('[data-role="options-list"]');
    const reactionBox = fragment.querySelector('[data-role="reaction-box"]');

    const progress = getQuestionProgress(step);

    progressText.textContent = `Вопрос ${progress.current} из ${progress.total}`;
    progressFill.style.width = `${progress.percent}%`;
    sectionBadge.textContent = step.sectionBadge || "Немного о тебе";
    title.textContent = step.title || "";
    subtitle.textContent = step.subtitle || "";

    const selectedValue = answers[step.id];

    step.options.forEach((optionText) => {
      const optionFragment = optionButtonTemplate.content.cloneNode(true);
      const button = optionFragment.querySelector('[data-role="option-button"]');

      button.textContent = optionText;

      if (selectedValue === optionText) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", () => {
        answers[step.id] = optionText;
        renderChoiceReaction(reactionBox, step, optionText);

        burstFromElement(button, {
          emojiCount: 5,
          confettiCount: 12
        });

        render();
      });

      optionsList.appendChild(button);
    });

    if (selectedValue) {
      renderChoiceReaction(reactionBox, step, selectedValue);
    }

    appContent.appendChild(fragment);
  }

  function renderChoiceReaction(reactionBox, step, selectedValue) {
    if (!reactionBox) return;

    const reactionText =
      window.getReactionForAnswer &&
      window.getReactionForAnswer(step.id, selectedValue);

    if (!reactionText) {
      reactionBox.classList.add("hidden");
      reactionBox.textContent = "";
      return;
    }

    reactionBox.classList.remove("hidden");
    reactionBox.textContent = reactionText;
  }

  function renderTextQuestion(step) {
    const fragment = textTemplate.content.cloneNode(true);

    const progressText = fragment.querySelector('[data-role="progress-text"]');
    const progressFill = fragment.querySelector('[data-role="progress-fill"]');
    const sectionBadge = fragment.querySelector('[data-role="section-badge"]');
    const title = fragment.querySelector('[data-role="question-title"]');
    const subtitle = fragment.querySelector('[data-role="question-subtitle"]');
    const textarea = fragment.querySelector('[data-role="text-answer"]');
    const note = fragment.querySelector('[data-role="question-note"]');

    const progress = getQuestionProgress(step);

    progressText.textContent = `Вопрос ${progress.current} из ${progress.total}`;
    progressFill.style.width = `${progress.percent}%`;
    sectionBadge.textContent = step.sectionBadge || "По желанию";
    title.textContent = step.title || "";
    subtitle.textContent = step.subtitle || "";

    if (step.placeholder) {
      textarea.placeholder = step.placeholder;
    }

    if (answers[step.id]) {
      textarea.value = answers[step.id];
    }

    if (step.required) {
      note.textContent = "Этот вопрос желательно заполнить.";
    } else {
      note.textContent = "Этот вопрос можно пропустить, если не хочется отвечать.";
    }

    textarea.addEventListener("input", (event) => {
      answers[step.id] = event.target.value;
    });

    appContent.appendChild(fragment);
  }

  function renderFinalScreen() {
    const fragment = finalTemplate.content.cloneNode(true);

    const postcardPhoto = fragment.getElementById
      ? fragment.getElementById("postcard-photo")
      : fragment.querySelector("#postcard-photo");

    const postcardMessage = fragment.querySelector("#postcard-message");
    const postcardSignature = fragment.querySelector("#postcard-signature");
    const postcardFlower = fragment.querySelector("#postcard-flower");
    const postcard = fragment.querySelector("#postcard");

    if (postcardPhoto) {
      postcardPhoto.src = appConfig.photoPath;
      postcardPhoto.alt = `Фото ${appConfig.personName}`;
    }

    if (postcardMessage) {
      postcardMessage.textContent = buildPersonalMessage();
    }

    if (postcardSignature) {
      postcardSignature.textContent = `— ${appConfig.authorName}`;
    }

    if (postcardFlower) {
      postcardFlower.textContent = resolveFlowerEmoji(answers.flowers);
    }

    if (postcard) {
      postcard.style.setProperty("--postcard-theme", resolvePostcardTheme(answers.color));
      postcard.classList.add(resolvePostcardClass(answers.color));
    }

    appContent.appendChild(fragment);
  }

  function renderJoyMapScreen() {
    if (!joyMapTemplate) {
      renderFallback("Не найден шаблон joy-map-screen-template в index.html");
      return;
    }

    const fragment = joyMapTemplate.content.cloneNode(true);
    const resultsList = fragment.querySelector("#results-list");

    const resultItems = buildResultItems();

    resultItems.forEach(({ label, value }) => {
      const itemFragment = resultItemTemplate.content.cloneNode(true);
      const labelNode = itemFragment.querySelector('[data-role="result-label"]');
      const valueNode = itemFragment.querySelector('[data-role="result-value"]');

      labelNode.textContent = label;
      valueNode.textContent = value || "Не указано";

      resultsList.appendChild(itemFragment);
    });

    appContent.appendChild(fragment);
  }

  function buildResultItems() {
    const labels = {
      joy: "Что радует",
      flowers: "Любимые цветы",
      drink: "Идеальный напиток",
      walks: "Любимое место для прогулок",
      color: "Любимый цвет",
      dessert: "Любимый десерт",
      food: "Любимое блюдо",
      music: "Любимая музыка",
      movie: "Жанр фильмов",
      series: "Сериалы",
      books: "Книги",
      gift: "Что приятнее получить",
      surprise: "Сюрпризы",
      weather: "Погода",
      season: "Время года",
      coffee: "Кофе",
      tea: "Чай",
      salad: "Салат",
      place: "Уютное место",
      weekend: "Идеальный выходной",
      warmth: "Что делает день теплее",
      "little-joys": "Маленькие радости",
      "ideal-day": "Идеальный день",
      "best-gift": "Тёплый подарок",
      "people-value": "Что ценишь в людях",
      "dream-place": "Место, куда хочется",
      "birthday-feeling": "Что нравится в дне рождения",
      "care-sign": "Приятный знак внимания",
      "cozy-moment": "Самый уютный момент дня",
      "wish-free": "Ответ от себя"
    };

    return Object.keys(labels).map((key) => ({
      label: labels[key],
      value: answers[key] || ""
    }));
  }

  function buildPersonalMessage() {
    if (appConfig.personalMessage && appConfig.personalMessage.trim()) {
      return appConfig.personalMessage;
    }

    const personName = appConfig.personName || "Тахмина";
    const flowers = normalizeForSentence(answers.flowers, "цветов");
    const drink = normalizeForSentence(answers.drink, "любимого напитка");

    return `${personName}, с днём рождения! Пусть в твоей жизни будет больше того, что ты любишь: ${flowers}, ${drink}, тёплых моментов, искреннего внимания и красивых дней. Мне хотелось сделать для тебя что-то личное и приятное 🤍`;
  }

  function normalizeForSentence(value, fallback) {
    if (!value) return fallback;
    return value.toLowerCase();
  }

  function resolveFlowerEmoji(flowersValue) {
    if (!flowersValue) return "🌷";
    if (flowersValue.includes("Пионы")) return "🌸";
    if (flowersValue.includes("Розы")) return "🌹";
    if (flowersValue.includes("Тюльпаны")) return "🌷";
    if (flowersValue.includes("Ромашки")) return "🌼";
    if (flowersValue.includes("Лилии")) return "💐";
    return "🌷";
  }

  function resolvePostcardTheme(colorValue) {
    if (!colorValue) return "linear-gradient(135deg, #fff1f7, #f4efff)";
    if (colorValue.includes("Розовый")) return "linear-gradient(135deg, #ffe6f2, #f7efff)";
    if (colorValue.includes("Сиреневый")) return "linear-gradient(135deg, #f0e8ff, #eef2ff)";
    if (colorValue.includes("Голубой")) return "linear-gradient(135deg, #e8f7ff, #eef5ff)";
    if (colorValue.includes("Белый")) return "linear-gradient(135deg, #fffdfd, #f5f2ff)";
    if (colorValue.includes("Чёрный")) return "linear-gradient(135deg, #f3ecf5, #ebe7f7)";
    return "linear-gradient(135deg, #fff1f7, #f4efff)";
  }

  function resolvePostcardClass(colorValue) {
    if (!colorValue) return "postcard--default";
    if (colorValue.includes("Розовый")) return "postcard--pink";
    if (colorValue.includes("Сиреневый")) return "postcard--lilac";
    if (colorValue.includes("Голубой")) return "postcard--blue";
    if (colorValue.includes("Белый")) return "postcard--white";
    if (colorValue.includes("Чёрный")) return "postcard--dark";
    return "postcard--default";
  }

  function handlePrimaryAction() {
    const step = getCurrentStep();

    if (!step) return;

    if (isChoiceStep(step)) {
      if (step.required && !answers[step.id]) {
        showTemporaryWarning("Выбери один вариант, чтобы продолжить ✨");
        return;
      }

      goNext();
      return;
    }

    if (isTextStep(step)) {
      const textarea = appContent.querySelector('[data-role="text-answer"]');
      if (textarea) {
        answers[step.id] = textarea.value.trim();
      }

      goNext();
      return;
    }

    if (isIntroStep(step)) {
      goNext();
      return;
    }

    if (isFinalStep(step)) {
      goNext();
      return;
    }

    goNext();
  }

  function showTemporaryWarning(message) {
    const existing = document.querySelector(".temporary-warning");
    if (existing) existing.remove();

    const warning = document.createElement("div");
    warning.className = "temporary-warning";
    warning.textContent = message;

    document.body.appendChild(warning);

    requestAnimationFrame(() => {
      warning.classList.add("is-visible");
    });

    setTimeout(() => {
      warning.classList.remove("is-visible");
      setTimeout(() => warning.remove(), 250);
    }, 1800);
  }

  function goNext() {
    const currentStep = getCurrentStep();

    if (isFinalStep(currentStep) && !isJoyMapStep) {
      isJoyMapStep = true;
      render();
      scrollToTop();
      return;
    }

    if (currentStepIndex < steps.length - 1) {
      currentStepIndex += 1;
      render();
      scrollToTop();
    }
  }

  function goPrev() {
    if (isJoyMapStep) {
      isJoyMapStep = false;
      render();
      scrollToTop();
      return;
    }

    if (currentStepIndex > 0) {
      currentStepIndex -= 1;
      render();
      scrollToTop();
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartApp() {
    Object.keys(answers).forEach((key) => {
      delete answers[key];
    });

    currentStepIndex = 0;
    isJoyMapStep = false;
    stopRainEffect();
    render();
    scrollToTop();
  }

  async function copyAnswers() {
    const shareText = buildShareText();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareText);
        showTemporaryWarning("Ответы скопированы ✨");
        return;
      } catch (error) {}
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      showTemporaryWarning("Ответы скопированы ✨");
      return;
    } catch (error) {}

    showTemporaryWarning("Не удалось скопировать ответы");
  }

  function buildShareText() {
    const lines = [
      `${appConfig.appTitle} — ${appConfig.personName}`,
      ""
    ];

    buildResultItems().forEach(({ label, value }) => {
      lines.push(`${label}: ${value || "Не указано"}`);
    });

    return lines.join("\n");
  }

  function renderFallback(customMessage) {
    stopRainEffect();

    const fallback = document.createElement("section");
    fallback.className = "screen screen--fallback";
    fallback.innerHTML = `
      <div class="screen-card question-card">
        <h2 class="question-title">Не удалось загрузить шаги</h2>
        <p class="question-subtitle">
          ${customMessage || "Проверь, что файл questions.js подключён правильно и содержит ALL_STEPS."}
        </p>
      </div>
    `;
    appContent.appendChild(fallback);
  }

  render();
})();

document.addEventListener("click", () => {
  playMusic();
}, { once: true });

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  playClick();
  vibratePhone(20);
});
