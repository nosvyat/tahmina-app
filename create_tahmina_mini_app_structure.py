from pathlib import Path

PROJECT_NAME = "tahmina-mini-app"

STRUCTURE = {
    "index.html": "",
    "style.css": "",
    "script.js": "",
    "questions.js": "",
    "reactions.js": "",
    "postcard.js": "",
    "sounds.js": "",
    "effects.js": "",
    "assets": {
        "icons": {
            "heart.svg": "",
            "star.svg": "",
            "spark.svg": "",
            "flower-peony.svg": "",
            "flower-rose.svg": "",
            "flower-tulip.svg": "",
            "flower-daisy.svg": "",
            "flower-lily.svg": "",
        },
        "images": {
            "tahmina-photo.jpg": "",
            "intro-bg-1.jpg": "",
            "intro-bg-2.jpg": "",
            "intro-bg-3.jpg": "",
            "postcard-bg-pink.jpg": "",
            "postcard-bg-lilac.jpg": "",
            "postcard-bg-blue.jpg": "",
            "postcard-bg-white.jpg": "",
            "final-overlay.png": "",
        },
        "sounds": {
            "click.mp3": "",
            "option-select.mp3": "",
            "success.mp3": "",
            "sparkle.mp3": "",
            "background-music.mp3": "",
        },
    },
}

README = """# Tahmina Mini App

Структура проекта создана автоматически.

## Как использовать
1. Открой этот файл в PyCharm.
2. Запусти скрипт.
3. В текущей папке появится папка `tahmina-mini-app` со всей структурой.
4. Дальше можно поочередно заполнять файлы кодом.

## Примечание
Файлы изображений, иконок и звуков создаются как пустые заглушки.
Позже их можно заменить реальными файлами.
"""

def create_tree(base_path: Path, tree: dict) -> None:
    for name, content in tree.items():
        current_path = base_path / name
        if isinstance(content, dict):
            current_path.mkdir(parents=True, exist_ok=True)
            create_tree(current_path, content)
        else:
            current_path.parent.mkdir(parents=True, exist_ok=True)
            current_path.touch(exist_ok=True)

def main() -> None:
    root = Path.cwd() / PROJECT_NAME
    root.mkdir(parents=True, exist_ok=True)
    create_tree(root, STRUCTURE)

    readme_path = root / "README.md"
    if not readme_path.exists():
        readme_path.write_text(README, encoding="utf-8")

    print(f"Готово: структура проекта создана в {root}")

if __name__ == "__main__":
    main()
