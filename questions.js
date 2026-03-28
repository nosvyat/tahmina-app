const INTRO_SCREENS = [
  {
    id: "intro-1",
    type: "intro",
    badge: "✨ Маленький сюрприз специально для тебя",
    emoji: "🌷",
    title: "Привет, Тахмина",
    text: "Я сделал для тебя маленькое мини-приложение ко дню рождения — просто чтобы подарить тебе немного тепла, внимания и хорошего настроения."
  },
  {
    id: "intro-2",
    type: "intro",
    badge: "1 апреля 🎉",
    emoji: "🎂",
    title: "Сегодня твой день",
    text: "И мне захотелось сделать для тебя что-то необычное, красивое и личное — такое, что останется маленьким воспоминанием."
  },
  {
    id: "intro-3",
    type: "intro",
    badge: "Что тебя радует?",
    emoji: "💫",
    title: "Это не тест",
    text: "Скорее маленькая анкета с заботой от меня, чтобы узнать тебя чуть лучше и сохранить те детали, которые делают тебя счастливее."
  }
];

const CHOICE_QUESTIONS = [
  {
    id: "joy",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Что тебя обычно радует?",
    subtitle: "Выбери то, что откликается больше всего.",
    required: true,
    options: [
      "☕ Вкусный кофе",
      "🌆 Прогулка",
      "🌷 Цветы",
      "🎧 Музыка",
      "🤍 Внимание и забота"
    ]
  },
  {
    id: "flowers",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какие цветы тебе нравятся больше всего?",
    subtitle: "То, что тебе ближе по настроению.",
    required: true,
    options: [
      "🌸 Пионы",
      "🌹 Розы",
      "🌷 Тюльпаны",
      "🌼 Ромашки",
      "💐 Лилии"
    ]
  },
  {
    id: "drink",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Твой идеальный напиток — это…",
    subtitle: "Что ты бы выбрала чаще всего?",
    required: true,
    options: [
      "🧊 Айс латте",
      "☕ Капучино",
      "🍵 Чай",
      "🍋 Лимонад",
      "🧃 Сок"
    ]
  },
  {
    id: "walks",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Где тебе нравится гулять?",
    subtitle: "Тот вариант, который feels like you.",
    required: true,
    options: [
      "🌿 В парке",
      "🌃 По вечернему городу",
      "🕯️ В уютных кофейнях",
      "🌊 У воды или на набережной",
      "✨ Там, где поменьше людей"
    ]
  },
  {
    id: "color",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какой цвет тебе ближе всего?",
    subtitle: "Можно выбрать один вариант.",
    required: true,
    options: [
      "🤍 Белый",
      "🌸 Розовый",
      "💜 Сиреневый",
      "🌊 Голубой",
      "🖤 Чёрный"
    ]
  },
  {
    id: "dessert",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какой десерт тебе нравится больше всего?",
    subtitle: "Что бы ты выбрала без долгих раздумий?",
    required: true,
    options: [
      "🍰 Чизкейк",
      "🍫 Шоколадный десерт",
      "🧁 Пирожное",
      "🍓 Что-то ягодное",
      "🍨 Мороженое"
    ]
  },
  {
    id: "food",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какое блюдо тебе особенно нравится?",
    subtitle: "То, что всегда в радость.",
    required: true,
    options: [
      "🍝 Паста",
      "🍣 Суши",
      "🥗 Лёгкие салаты",
      "🍕 Пицца",
      "🍲 Что-то домашнее"
    ]
  },
  {
    id: "music",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какая музыка тебе ближе?",
    subtitle: "Что чаще попадает в твой вайб?",
    required: true,
    options: [
      "🎶 Спокойная и нежная",
      "🎧 Поп",
      "🌙 Лиричная",
      "🔥 Энергичная",
      "✨ По настроению"
    ]
  },
  {
    id: "movie",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какой жанр фильмов тебе нравится?",
    subtitle: "Выбери самый близкий.",
    required: true,
    options: [
      "💕 Романтика",
      "🎭 Драма",
      "😂 Комедия",
      "🕵️ Детектив",
      "✨ Что-то лёгкое и красивое"
    ]
  },
  {
    id: "series",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "А сериалы тебе какие нравятся?",
    subtitle: "То, что ты бы включила вечером.",
    required: true,
    options: [
      "💞 Про отношения",
      "👑 Атмосферные",
      "🧠 Сюжетные",
      "😂 Лёгкие и смешные",
      "🌙 Спокойные"
    ]
  },
  {
    id: "books",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Книги тебе ближе какие?",
    subtitle: "Если читаешь по настроению.",
    required: true,
    options: [
      "📖 Романтика",
      "🌿 Психология",
      "✨ Лёгкая проза",
      "🧠 Саморазвитие",
      "🤍 По-разному"
    ]
  },
  {
    id: "gift",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Что тебе приятнее получить?",
    subtitle: "Маленький, но приятный знак внимания.",
    required: true,
    options: [
      "🌷 Букет",
      "🍫 Сладкое",
      "💌 Открытку с тёплыми словами",
      "🎁 Милый сюрприз",
      "☕ Время вместе"
    ]
  },
  {
    id: "surprise",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Тебе ближе сюрприз или когда спрашивают заранее?",
    subtitle: "Как тебе комфортнее?",
    required: true,
    options: [
      "🎁 Люблю сюрпризы",
      "🤍 Лучше немного намекнуть",
      "✨ Зависит от ситуации",
      "💬 Лучше спросить заранее",
      "🌸 Главное — внимание"
    ]
  },
  {
    id: "weather",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какая погода тебе нравится больше?",
    subtitle: "Что создаёт самое уютное настроение?",
    required: true,
    options: [
      "☀️ Солнечная",
      "🌤️ Тёплая облачная",
      "🌧️ Дождливая",
      "❄️ Снежная",
      "🌙 Вечерняя прохлада"
    ]
  },
  {
    id: "season",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какое время года тебе ближе?",
    subtitle: "То самое настроение.",
    required: true,
    options: [
      "🌷 Весна",
      "☀️ Лето",
      "🍂 Осень",
      "❄️ Зима",
      "✨ Всё по-своему"
    ]
  },
  {
    id: "coffee",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Если кофе — то какой?",
    subtitle: "Выбери любимый формат.",
    required: true,
    options: [
      "☕ Капучино",
      "🧊 Айс латте",
      "🥛 Латте",
      "🍫 Раф / сладкий",
      "🤍 Не очень люблю кофе"
    ]
  },
  {
    id: "tea",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Если чай — то какой?",
    subtitle: "То, что больше по душе.",
    required: true,
    options: [
      "🍵 Зелёный",
      "🫖 Чёрный",
      "🌸 С цветами",
      "🍓 Фруктовый",
      "🤍 По настроению"
    ]
  },
  {
    id: "salad",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какой салат тебе ближе?",
    subtitle: "То, что заказала бы с удовольствием.",
    required: true,
    options: [
      "🥗 Цезарь",
      "🍅 Что-то лёгкое овощное",
      "🧀 С сыром",
      "🥑 С авокадо",
      "✨ Любой вкусный"
    ]
  },
  {
    id: "place",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Какое место тебе кажется особенно уютным?",
    subtitle: "Где тебе хорошо и спокойно.",
    required: true,
    options: [
      "☕ Кофейня",
      "🌿 Парк",
      "🌊 Набережная",
      "🏙️ Красивый город вечером",
      "🏡 Домашний уют"
    ]
  },
  {
    id: "weekend",
    type: "choice",
    sectionBadge: "Немного о тебе",
    title: "Идеальный выходной для тебя — это…",
    subtitle: "Самый приятный вариант.",
    required: true,
    options: [
      "🛌 Спокойно выспаться",
      "☕ Кофе и прогулка",
      "🎬 Фильм и отдых",
      "🌇 Поехать куда-то",
      "💞 Провести время с близкими"
    ]
  }
];

const OPEN_QUESTIONS = [
  {
    id: "warmth",
    type: "text",
    sectionBadge: "По желанию",
    title: "Что делает день теплее именно для тебя?",
    subtitle: "Можно написать пару слов — здесь нет правильных ответов.",
    required: false,
    placeholder: "Например: искреннее внимание, любимый напиток, спокойный вечер, музыка в наушниках..."
  },
  {
    id: "little-joys",
    type: "text",
    sectionBadge: "По желанию",
    title: "Какие маленькие вещи могут поднять тебе настроение?",
    subtitle: "То, что кажется мелочью, но приятно.",
    required: false,
    placeholder: "Например: сообщение, прогулка, кофе, цветы, музыка..."
  },
  {
    id: "ideal-day",
    type: "text",
    sectionBadge: "По желанию",
    title: "Как для тебя выглядит идеальный день?",
    subtitle: "Можешь описать его так, как чувствуешь.",
    required: false,
    placeholder: "Напиши здесь от себя..."
  },
  {
    id: "best-gift",
    type: "text",
    sectionBadge: "По желанию",
    title: "Какой подарок кажется тебе по-настоящему тёплым?",
    subtitle: "Не обязательно дорогой — скорее искренний.",
    required: false,
    placeholder: "Напиши здесь от себя..."
  },
  {
    id: "people-value",
    type: "text",
    sectionBadge: "По желанию",
    title: "Что ты особенно ценишь в людях?",
    subtitle: "Можно ответить совсем коротко.",
    required: false,
    placeholder: "Например: искренность, заботу, лёгкость, внимание..."
  },
  {
    id: "dream-place",
    type: "text",
    sectionBadge: "По желанию",
    title: "Есть ли место, куда тебе давно хотелось бы сходить или поехать?",
    subtitle: "Любая локация, которая тебе откликается.",
    required: false,
    placeholder: "Напиши здесь от себя..."
  },
  {
    id: "birthday-feeling",
    type: "text",
    sectionBadge: "По желанию",
    title: "Что тебе особенно нравится в дне рождения?",
    subtitle: "Атмосфера, люди, сюрпризы, внимание — всё, что хочется.",
    required: false,
    placeholder: "Напиши здесь от себя..."
  },
  {
    id: "care-sign",
    type: "text",
    sectionBadge: "По желанию",
    title: "Какой знак внимания тебе кажется особенно приятным?",
    subtitle: "То, что для тебя действительно чувствуется.",
    required: false,
    placeholder: "Напиши здесь от себя..."
  },
  {
    id: "cozy-moment",
    type: "text",
    sectionBadge: "По желанию",
    title: "Какой момент дня тебе кажется самым уютным?",
    subtitle: "Утро, вечер, прогулка, тишина, музыка — всё подходит.",
    required: false,
    placeholder: "Напиши здесь от себя..."
  },
  {
    id: "wish-free",
    type: "text",
    sectionBadge: "По желанию",
    title: "Если хочешь, можешь написать что-то от себя",
    subtitle: "Любую мысль, желание, настроение или маленький ответ в свободной форме.",
    required: false,
    placeholder: "Напиши здесь всё, что хочется..."
  }
];

const ALL_STEPS = [
  ...INTRO_SCREENS,
  ...CHOICE_QUESTIONS,
  ...OPEN_QUESTIONS,
  {
    id: "final",
    type: "final"
  }
];

const QUESTION_GROUPS = {
  intro: INTRO_SCREENS,
  choice: CHOICE_QUESTIONS,
  text: OPEN_QUESTIONS,
  all: ALL_STEPS
};

/* чтобы script.js видел данные */
window.INTRO_SCREENS = INTRO_SCREENS;
window.CHOICE_QUESTIONS = CHOICE_QUESTIONS;
window.OPEN_QUESTIONS = OPEN_QUESTIONS;
window.ALL_STEPS = ALL_STEPS;
window.QUESTION_GROUPS = QUESTION_GROUPS;