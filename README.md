# pdf-to-book

Локальный веб-парсер **PDF → Markdown / DOCX**, работающий полностью в браузере без отправки файлов на сервер.

## Деплой сайта на GitHub Pages (YAML-билд)

В репозитории настроен GitHub Actions workflow `.github/workflows/deploy.yml`, который автоматически собирает статический веб-билд в папку `dist/` и публикует его на **GitHub Pages**.

### Как включить сайт на GitHub:
1. Запушьте код в ветку `main` (или `master`) на GitHub.
2. Откройте в репозитории **Settings → Pages**.
3. В разделе **Build and deployment → Source** выберите **GitHub Actions**.
4. После пуша (или ручного запуска **Actions → Deploy Web Site to GitHub Pages → Run workflow**) сайт автоматически соберётся и станет доступен по адресу:
   `https://<ваш-логин>.github.io/<имя-репозитория>/`

## Локальный запуск и сборка

```bash
npm install
npm run dev      # локальный веб-сервер на http://localhost:3000
npm run build    # статическая сборка для GitHub Pages в ./dist
npm test         # запуск автотестов сервера и сборки
```