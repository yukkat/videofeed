# Video Feed

Вертикальная лента коротких видео (TikTok / Reels) на vanilla JavaScript.

## Запуск

Проект нужно открывать через локальный HTTP-сервер — при `file://` видео могут не загружаться.

```bash
npx serve . -l 3000
```

Откройте в браузере http://localhost:3000.

## Видео

Файлы лежат в папке `videos/`. Список подключённых роликов — в `data/videos.js`.

Чтобы добавить новое видео:

1. Положите `.mp4` в `videos/`
2. Добавьте путь в массив `videoSources` в `data/videos.js`

## Структура

```
index.html          — точка входа
css/styles.css      — layout, scroll-snap
js/main.js          — инициализация
js/feed.js          — рендер слайдов
data/videos.js        — список видеофайлов
videos/             — локальные .mp4
```
